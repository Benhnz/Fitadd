var settings = new Store("settings", {
    "spEnabled": true,
    "spDocPath": "documentation\\fixtures\\html\\",
	"editShortcut": true,
	"saveShortcut": true,
	"autoFormat": true,
	"cloneShortcut": true
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    if (request.method == "getSettings")
	{
		sendResponse(settings.toObject());
	}
    else
	{
		sendResponse({}); // snub them.
	}
});