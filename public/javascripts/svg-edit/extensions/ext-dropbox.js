/*globals svgEditor, svgCanvas*/
/*jslint eqeq: true*/
/*
 * ext-panning.js
 *
 * Licensed under the MIT License
 *
 * Copyright(c) 2013 Luis Aguirre
 *
 */
 
/* 
	This is a very basic SVG-Edit extension to let tablet/mobile devices panning without problem
*/
svgEditor.addExtension('dropBox', function() {'use strict';
function UploadDropbox(){
	var xmlstr;
	var str64;
var options = {

    // Required. Called when a user selects an item in the Chooser.
    success: function(files) {
		$('#dialog_box').hide();
			    str64=files[0].link;
        			svgCanvas.clear();
					svgEditor.loadFromURL(str64);
					svgEditor.updateCanvas();
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

}

	return {
		name: 'ext-dropbox',
		svgicons: svgEditor.curConfig.extPath + 'ext-dropbox.xml',
		buttons: [{
			id: 'ext-dropbox',
			type: 'mode',
			title: 'Panning',
			events: {
				click: function() {
					UploadDropbox();
				}
			}
		}]
	
	};
});
