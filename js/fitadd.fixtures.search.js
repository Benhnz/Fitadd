fitadd.fixtures.search = fitadd.fixtures.search || {};

var searchOptions

fitadd.fixtures.search.RegisterHandlers = function(options){
	searchOptions = options;

	$(window).bind('keydown', 'ctrl+shift+f', function(){
		fitadd.fixtures.search.OpenSidePanel();
		return false;
	});
	
	$('#pageContent').bind('keydown', 'ctrl+shift+f', function(){
		fitadd.fixtures.search.OpenSidePanel();
		return false;
	});
}

fitadd.fixtures.search.OpenSidePanel = function(){
	fitadd.fixtures.search.InjectSidePanelIntoPage();
	
	$('.navmenu').offcanvas('show')
	
	fitadd.fixtures.search.FocusOnSearchText();
}

fitadd.fixtures.search.PopulateSearchResults = function(searchText){

	var fixtureUrl = fitadd.fixtures.search.getFixtureUrl();
	$.get(fixtureUrl, function(data) {
			var pages = fitadd.fixtures.search.GetFixturePagesFromUrl(data);
			
			var fixtureClasses = fitadd.fixtures.search.GetFixturesFromPages(pages);

			// TODO: cache results locally.
			
			$('#fixture-search-results').empty();
			
			var options = {
				keys: ['name', 'namespace'] 
			};
			
			var f = new Fuse(fixtureClasses, options);
			var result = f.search(searchText);

			$(result).each(function(index, value) {	
				fitadd.fixtures.search.AppendResult(value);
			});

			/*
			$(fixtureClasses).each(function(index, value) {	
				if (fitadd.fixtures.search.ResultMatchesSearch(searchText, value)){
					fitadd.fixtures.search.AppendResult(value);				
				}
			});
			*/
			
		});
		
}

fitadd.fixtures.search.GetSearchText = function(){
	return $('#fixture-search-text').val();
}

fitadd.fixtures.search.ResultMatchesSearch = function(searchText, fixtureResult){

	if (fixtureResult.name.toLowerCase().indexOf(searchText) != -1){
		return true;
	}
	
	/*
	if (fixtureResult.namespace.toLowerCase().indexOf(searchText) != -1){
		return true;
	}
	*/
	
	return false;
}

fitadd.fixtures.search.AppendResult = function(fixtureResult){
	
	var html = fitadd.fixtures.search.GetResultsLi(fixtureResult);
	
	$('#fixture-search-results').append(html);
}

fitadd.fixtures.search.GetResultsLi = function(fixtureResult){

	return '<li><a href="' + fixtureResult.url + '" target="_blank">' + fixtureResult.namespace + '.' + fixtureResult.name + '</></li>'

}

fitadd.fixtures.search.InjectSidePanelIntoPage = function(){

	// only if not already there.

	// add into just before end body.
	if(!$('#myNavmenu').length)
	{

		var url = chrome.extension.getURL("html/fitadd.fixtures.search.sidepanel.html");
		$('body').append($('<nav id="myNavmenu" class="navmenu navmenu-default navmenu-fixed-left offcanvas" role="navigation">').load(url, function() {
		
			fitadd.fixtures.search.FocusOnSearchText();
		
			$( '#fixture-search-btn' ).click(function() {
				var searchText = fitadd.fixtures.search.GetSearchText();
				fitadd.fixtures.search.PopulateSearchResults(searchText);
				fitadd.fixtures.search.FocusOnSearchText();
				
				return false;
			});
		}));
		
	}
}

fitadd.fixtures.search.FocusOnSearchText = function(){
	$('#fixture-search-text').select().focus();
}

fitadd.fixtures.search.GetFixturesFromPages = function(pages){
	
	var fixtures = [];
	
	$(pages).each(function(index, value) {	
		var fixture = fitadd.fixtures.search.GetFixtureFromPage(value);
		
		if (fixture != null){
			fixtures.push(fixture);
		}
	});
	
	return fixtures;
}

fitadd.fixtures.search.GetFixtureFromPage = function(page){
	var suffix = '.html';
	var prefix = 'class_';
	
	//e.g. class_pay_roll_fitnesse_1_1_tax_calculators_1_1_new_zealand_1_1_validate_tax_1_1_validate_tax_data_store.html
	
	var url = page;
	
	// replace separator
	page = page.replace(/_1_1_/g, '.');
	
	// remove suffix
	page = page.substring(0, page.length - suffix.length);
	
	// remove prefix
	page = page.substring(prefix.length);
	
	// remove _ and . and uppercase first char after each.
	page = fitadd.fixtures.search.FormatCasing(page);
	
	// Get where to split namespace and name.
	var whereToSplit = page.lastIndexOf('.');
	if (whereToSplit == -1){
		return null;
	}
	
	// split namespace and class name
	namespace = page.substring(0, whereToSplit);
	name = page.substr(whereToSplit + '.'.length);
	
	
	var fixtureClass = {
						url: fitadd.fixtures.search.getFixtureUrl() + url,
						namespace: namespace,
						name: name,
						};
	
	
	return fixtureClass;
}

fitadd.fixtures.search.FormatCasing = function(value){
	value = fitadd.fixtures.search.ucwords(value);
	value = value.replace(/_/g, '');

	return value;
}

fitadd.fixtures.search.getFixtureUrl = function(){
	
	var docPath = searchOptions.spDocPath; 
	
	// default
	if (docPath === ''){
		docPath = 'documentation\\fixtures\\html\\';
	}
	
	var fixtureUrl = fitadd.fixtures.search.replaceAll('files\\' + docPath, '\\', '/');

	return fixtureUrl;
}

fitadd.fixtures.search.replaceAll = function(string, find, replace) {
  return string.replace(new RegExp(fitadd.fixtures.search.escapeRegExp(find), 'g'), replace);
}

fitadd.fixtures.search.escapeRegExp = function(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

fitadd.fixtures.search.ucwords = function(input) {
    var words = input.split(/(\.|_)+/),
        output = [];

    for (var i = 0, len = words.length; i < len; i += 1) {
        output.push(words[i][0].toUpperCase() +
                    words[i].toLowerCase().substr(1));
    }

    return output.join('');
}

fitadd.fixtures.search.GetFixturePagesFromUrl = function(html){
	var result = $(html).find('.dirListing tbody tr td:first-child a');
	
	var pages = []; 
	
	result.each(function(index, value) {	
		var a = $(value);		
		var page = a.attr('href');
			  
		// Doxygen specific checks	  
	  	if (page.substr(0, 5) === 'class' && page.substr(-5) === '.html' && page.substr(-13) != '-members.html'){
			pages.push(page);
		}	
	});

	return pages;
}