var options;

chrome.runtime.sendMessage({method: "getSettings"}, function(response) {
	options = response;
  
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			WireUp();
			clearInterval(readyStateCheckInterval);
		}
	}, 10);
  
});

function WireUp(){
	if (fitadd.fitnessepage.IsFitnesse()){

		if (fitadd.fitnessepage.AreAdding()){	
			if (options.cloneShortcut){
				fitadd.fitnesseui.LoadClonedContentIfNeeded();
			}
		}
	
		if (options.spEnabled){
			fitadd.fixtures.search.RegisterHandlers(options);
		}
	
		if (fitadd.fitnessepage.AreEditing()){
			if (options.saveShortcut){
				fitadd.fitnesseui.RegisterSaveShortcut();
			}
			
			if (options.autoFormat){
				fitadd.fitnesseui.RegisterAutoFormatOnSave();
			}
			
		}else{
			if (options.editShortcut){
				fitadd.fitnesseui.RegisterEditShortcut();
				
				if (options.cloneShortcut){
					fitadd.fitnesseui.RegisterCloneLink();
				}
			}	
		}

	}
}

