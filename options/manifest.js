
this.manifest = {
    "name": "Fitadd Options",
    "icon": "icon.png",
    "settings": [
		{
            "tab": i18n.get("Helpers"),
            "group": i18n.get("Note"),
            "type": "description",
            "text": "When ever you make changes to the options please refresh any page you are on for the changes to take affect on that page. <br/> \
					Any new pages opened will work as expected."
        },
		{
            "tab": i18n.get("Helpers"),
            "group": i18n.get("Shortcuts"),
            "name": "editShortcut",
            "type": "checkbox",
            "label": i18n.get("E to Edit")
        },
		{
            "tab": i18n.get("Helpers"),
            "group": i18n.get("Shortcuts"),
            "name": "saveShortcut",
            "type": "checkbox",
            "label": i18n.get("Ctrl + S to save")
        },

		
		{
            "tab": i18n.get("Helpers"),
            "group": i18n.get("Auto Format"),
            "name": "autoFormat",
            "type": "checkbox",
            "label": i18n.get("Enable auto format of content when saving.")
        },
	
		{
            "tab": i18n.get("Helpers"),
            "group": i18n.get("Clone"),
            "name": "cloneShortcut",
            "type": "checkbox",
            "label": "Enable tool menu option to clone current page",
        },
	
        {
            "tab": i18n.get("Fixtures"),
            "group": i18n.get("Search Panel"),
            "name": "spEnabled",
            "type": "checkbox",
            "label": i18n.get("Enable")
        },
		{
            "tab": i18n.get("Fixtures"),
            "group": i18n.get("Search Panel"),
            "type": "description",
            "text": "When pressing 'Shift + Ctrl + F' on a fitnesse edit page it shows an overlay panel on the left that allows you to search for fixtures."
        },
		{
            "tab": "Fixtures",
            "group": i18n.get("Search Panel"),
            "name": "spDocType",
            "type": "popupButton",
            "label": "Source Documentation Type:",
            "options": {
                "values": [
                    {
                        "value": "Doxygen",
                        "text": "Doxygen",
                    }
                ],
            },
        },
		{
            "tab": i18n.get("Fixtures"),
            "group": i18n.get("Search Panel"),
            "name": "spDocPath",
            "type": "text",
            "label": i18n.get("Documentation Folder Path: {FitnesseRoot}\\files\\"),
            "text": i18n.get("documentation\\fixtures\\html\\")
        },
		{
            "tab": i18n.get("Fixtures"),
            "group": i18n.get("Search Panel"),
            "type": "description",
            "text": "Default is <b>documentation\\fixtures\\html\\</b> \
					<br/><br/>\
					Currently this uses Doxygen generated files as the source for the fixtures search, these must be in the fitnesse files area. <br/><br/> \
					These files must be in the format <b>class_pay_roll_fitnesse_1_1_tax_calculators_1_1_new_zealand_1_1_validate_tax_1_1_validate_tax_data_store.html</b> <br/> \
					So separated by <b>_1_1_</b> and starting with <b>class</b> and ending with <b>.html</b>.  everything after the last break is the name of the class and everything before the namespace. <br/><br/> \
					There must be one html file for each class."
        },

    ]
};
