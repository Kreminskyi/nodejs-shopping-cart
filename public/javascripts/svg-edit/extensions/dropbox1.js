/*globals svgEditor, svgedit, svgCanvas, canvg, $*/
/*jslint eqeq: true, browser:true*/
/*
 * ext-server_opensave.js
 *
 * Licensed under the MIT License
 *
 * Copyright(c) 2010 Alexis Deveria
 *
 */
 
 /*globals svgEditor, svgedit, svgCanvas, $*/
/*jslint vars: true, eqeq: true*/
/*
 * Dropbox.js
 *
 *
 * Copyright(c) 2010 CloudCanvas, Inc.
 * All rights reserved
 *
 */
  
 	

svgEditor.addExtension('dropBox', function(S){'use strict';
var Utils = svgedit.utilities;

	

		
	function UploadDropbox(){
		var options;
		var xmlstr;
		var str64;
		
options = {

    // Required. Called when a user selects an item in the Chooser.
    success: function(files) {
        alert("Here's the file link: " + );
		str64=files[0].link;
    },

    // Optional. Called when the user closes the dialog without selecting a file
    // and does not include any parameters.
    cancel: function() {

    },

    // Optional. "preview" (default) is a preview link to the document for sharing,
    // "direct" is an expiring link to download the contents of the file. For more
    // information about link types, see Link types below.
    linkType: "direct", // or "direct"

    // Optional. A value of false (default) limits selection to a single file, while
    // true enables multiple file selection.
    multiselect: false, // or true

    // Optional. This is a list of file extensions. If specified, the user will
    // only be able to select files with these extensions. You may also specify
    // file types, such as "video" or "images" in the list. For more information,
    // see File types below. By default, all extensions are allowed.
    extensions: ['.svg', '.doc', '.docx'],

    // Optional. A value of false (default) limits selection to files,
    // while true allows the user to select both folders and files.
    // You cannot specify `linkType: "direct"` when using `folderselect: true`.
    folderselect: false, // or true
};
	Dropbox.choose(options);
			        $('#dialog_box').hide();
				    xmlstr = Utils.decode64(str64);
					svgCanvas.clear();
					svgCanvas.setSvgString(xmlstr);
					svgEditor.updateCanvas();		
	}

	return {
		name: 'Extension Panning',
		svgicons: svgEditor.curConfig.extPath + 'ext-panning.xml',
		buttons: [{
			id: 'ext-panning',
			type: 'mode',
			title: 'Panning',
				click: function(){
					UploadDropbox();
				}
			}
		}]

	};
});