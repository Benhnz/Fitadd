fitadd.fitnesseui = fitadd.fitnesseui || {};

fitadd.fitnesseui.RegisterSaveShortcut = function(){
	$(window).bind('keydown', 'ctrl+s', function(){
		fitadd.fitnesseui.ClickSaveButton();
		return false;
	});
	
	$('#pageContent').bind('keydown', 'ctrl+s', function(){
		fitadd.fitnesseui.ClickSaveButton();
		return false;
	});
	
}

fitadd.fitnesseui.RegisterAutoFormatOnSave = function(){
	document.addEventListener('click', function(event) {
		// event.target is the element that was clicked
		try
		{
			var btn = event.target;
			if (fitadd.fitnesseui.IsFitnesseEditSaveButton(btn)){
				// Do formatting than continue on as normal.
				fitadd.fitnesseui.ClickFormatButton();
			}
		}catch(err)
		{
			// log errors and show user.
			console.dir(err)
			alert('An error occured when trying to auto format.');
		}
		
		// if you want to prevent the default click action
		// (such as following a link), use these two commands:
		var preventClick = false;
		if (preventClick){
			event.stopPropagation();
			event.preventDefault();
		}
	}, true);
}

fitadd.fitnesseui.RegisterEditShortcut = function(){
	$(window).bind('keydown', 'e', function(){
		fitadd.fitnesseui.GoToEditPage();
		return false;
	});
}

fitadd.fitnesseui.RegisterCloneLink = function(){
	fitadd.fitnesseui.AddCloneMenuItem();
}

fitadd.fitnesseui.IsFitnesseEditSaveButton = function(btn){
	
	if (btn.value == "Save" && btn.type == "submit"){
		return true;
	}
	
	return false;
}

// Actions that can be called on pages.

fitadd.fitnesseui.ClickSaveButton = function(){
	$('input[type=submit]').each(function(){
		
		if ($(this).val() == "Save"){
			$(this).click();
		}
	});
}

fitadd.fitnesseui.ClickFormatButton = function(){
	document.getElementById("tt-format-wiki").click();
}

fitadd.fitnesseui.GoToEditPage = function()
{
	window.location = fitadd.fitnesseui.GetEditUrl();
}

fitadd.fitnesseui.GetEditUrl = function()
{
	var url = '';

	// use edit link in menu so we don't have to keep updating link if they change it.
	$('.navbar a').each(function(){
		if ($(this).html() == "Edit"){
			url = $(this).attr("href");
		}
	});
	
	return url;
}

fitadd.fitnesseui.AddCloneMenuItem = function()
{
	$('#tools .dropdown-menu li:nth-child(4)').after('<li><a href="/ReportingTeam.SuperReports.SuperStream.AccumFundByFixedAmt?new" id="clone">Clone</a></li>')
	
	$('#clone').click(function() {
		fitadd.fitnesseui.ClonePage();
		
		return false;
	});
}

fitadd.fitnesseui.GetPageName = function()
{
	return $('body header h1')
				.clone()    //clone the element
				.children() //select all the children
				.remove()   //remove all the children
				.end()  //again go back to selected element
				.text();
}



fitadd.fitnesseui.ClonePage = function()
{
	// take current url
	// via ajax open up in edit mode 
	var editUrl = fitadd.fitnesseui.GetEditUrl();
	
	var parentPageUrl = $('.breadcrumb li:last a').attr("href");
		
	// parse the content from the help text, tags and main content
	$.get(editUrl, function(data){
		var pageName = fitadd.fitnesseui.GetPageName().trim();
		var pageData = fitadd.fitnesseui.GetPageContents(pageName, data);

		// save into local storage (wipe any old stuff there if needed).
		fitadd.fitnesseui.SavePageContentsToLocalStorage(pageData);
		fitadd.fitnesseui.SetCloneFlag(true);
	
		// redirect to clone page (add page) but up one level
		window.location = parentPageUrl + '?new';

	});
}

fitadd.fitnesseui.LoadClonedContentIfNeeded = function()
{
	// detect if there is cloned content in local storage.
	var flag = fitadd.fitnesseui.GetCloneFlag();
	
	//convert to boolean
	var flag = (flag === "true")
	
	if (!flag){
		return;
	}
	
	// load content into memory.
	var pageContent = fitadd.fitnesseui.GetPageContentsFromLocalStorage();
	
	// delete from local storage.
	fitadd.fitnesseui.SetCloneFlag(false);
	
	// populate page with content.
	fitadd.fitnesseui.SetAddPageFields(pageContent);
}

fitadd.fitnesseui.SetAddPageFields = function(pageContent)
{
	$('#pagename').val(pageContent.name);
	$('#helptext').val(pageContent.helpText);
	$('#pageContent').val(pageContent.content);
} 

fitadd.fitnesseui.SetCloneFlag = function(hasBeenSet)
{
	localStorage.setItem('CloneContentSet', hasBeenSet)
} 

fitadd.fitnesseui.GetCloneFlag = function()
{
	var flag = localStorage.getItem('CloneContentSet');

	if (flag == null){
		return false;
	}
	
	return flag;
} 

fitadd.fitnesseui.SavePageContentsToLocalStorage = function(data)
{
	localStorage.setItem('Fitnesse.Clone.PageContents', JSON.stringify(data))
}

fitadd.fitnesseui.GetPageContentsFromLocalStorage = function()
{
	var pageContents = localStorage.getItem('Fitnesse.Clone.PageContents');
	
	if (pageContents == null){
		return '';
	}

	return JSON.parse(pageContents);
}

fitadd.fitnesseui.GetPageContents = function(name, pageHtml)
{
	var helpText = $(pageHtml).find('#helptext').val();
	var content = $(pageHtml).find('#pageContent').val();

	var pageData = {
						name: name,
						helpText: helpText,
						content: content
						};
						
	return pageData;
}