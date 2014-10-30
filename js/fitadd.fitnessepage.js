fitadd.fitnessepage = fitadd.fitnessepage || {};

fitadd.fitnessepage.IsFitnesse = function(){
	// Quick hack to see if we are on a fitnesse page by checking if any of the css files have fitnesse in their path/name.
	var links = document.getElementsByTagName('link');
	
	for (var i = 0; i < links.length; i++){
		if (links[i].getAttribute('href').indexOf('fitnesse') > -1){
			return true;
		}
	}
	
	return false;
}

fitadd.fitnessepage.AreEditing = function(){

	if (typeof(fitadd.urls.getParams().edit) !== 'undefined'){
		return true;
	}
	
	if (typeof(fitadd.urls.getParams().new) !== 'undefined'){
		return true;
	}
	
	return false;
}

fitadd.fitnessepage.AreAdding = function(){
	
	if (typeof(fitadd.urls.getParams().new) !== 'undefined'){
		return true;
	}
	
	return false;
}