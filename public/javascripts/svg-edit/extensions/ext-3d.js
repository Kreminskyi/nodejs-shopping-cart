/*globals svgEditor, svgedit, svgCanvas, $*/
/*jslint vars: true, eqeq: true*/
/*
 * ext-star.js
 *
 *
 * Copyright(c) 2010 CloudCanvas, Inc.
 * All rights reserved
 *
 */
  
 	

svgEditor.addExtension('star', function(S){'use strict';

	var // NS = svgedit.NS,
		// svgcontent = S.svgcontent,
		selElems,
		// editingitex = false,
		// svgdoc = S.svgroot.parentNode.ownerDocument,
		started,
		newFO,
		// edg = 0,
		// newFOG, newFOGParent, newDef, newImageName, newMaskID,
		// undoCommand = 'Not image',
		// modeChangeG, ccZoom, wEl, hEl, wOffset, hOffset, ccRgbEl, brushW, brushH,
		shape;
		var renderer;
	

		
	function show3DPanel(){
				
		if (typeof renderer === 'undefined'){
			$('#can').draggable({handle: '.windowTop'});
			//$('#info').style.left = "892px";
			//$('#info').style.top = "65px";
		if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

			var container, stats;

			var camera, controls, scene, objects;
			var particleLight;
			var dae;
	
			var loader = new THREE.ColladaLoader();
			loader.options.convertUpAxis = true;
			loader.load('collada/12_5X10X4FO427.DAE', function ( collada ) {

				dae = collada.scene;
				dae.traverse( function ( child ) {

					if ( child instanceof THREE.SkinnedMesh ) {

						var animation = new THREE.Animation( child, child.geometry.animation );
						animation.play();

					}

				} );

				dae.scale.x = dae.scale.y = dae.scale.z = 0.02;
				dae.updateMatrix();

				init();
				animate();

			} );

			function init() {

//renderer = new THREE.WebGLRenderer();
//renderer.setSize( 200, 200 );
//container.appendChild( renderer.domElement );
//renderer.setSize(container.offsetWidth, container.offsetHeight);

				container = document.getElementById( 'can' );
				//dialog=document.getElementById('info');
				//dialog.appendChild( container );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.set( 8, 12, 13 );

                controls = new THREE.OrbitControls( camera );
                controls.enablePan = false;
                controls.enableDamping = true;
                controls.dampingFactor = 0.07;
                controls.rotateSpeed = 0.07;

				scene = new THREE.Scene();

				// Grid

				// Add the COLLADA

                var setMaterial = function(node, material) {
                    node.material = material;
                    if (node.children) {
                        for (var i = 0; i < node.children.length; i++) {
                            setMaterial(node.children[i], material);
                        }
                    }
                };

                //setMaterial(dae, new THREE.MeshStandardMaterial({color: 0xffffff}));

				scene.add( dae );
				scene.background = new THREE.Color( 0xffffff );

				particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
				scene.add( particleLight );

				// Lights

				scene.add( new THREE.AmbientLight( 0xcccccc ) );

				var directionalLight = new THREE.DirectionalLight(/*Math.random() * 0xffffff*/0xeeeeee );
				directionalLight.position.x = Math.random() - 0.5;
				directionalLight.position.y = Math.random() - 0.5;
				directionalLight.position.z = Math.random() - 0.5;
				directionalLight.position.normalize();
				scene.add( directionalLight );

				var pointLight = new THREE.PointLight( 0xffffff, 4 );
				particleLight.add( pointLight );

				renderer = new THREE.WebGLRenderer({canvas: document.getElementById('ext3DCanv')});
				renderer.setPixelRatio( window.devicePixelRatio );
				//renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.setSize(300, 300);
				container.appendChild( renderer.domElement );

				//stats = new Stats();
				//container.appendChild( stats.dom );

				//

				//window.addEventListener( 'resize', onWindowResize, false );
				container.onmousedown=function(){
					
					function loadTextureImage (texture) {
						var dataURL;
						var Utils = svgedit.utilities;
						//console.log($('#export_canvas')[0]);
						var c3d,data3d;
						data3d=svgCanvas.svgCanvasToString();
						if(!$('#export_canvas').length) {
							$('<canvas>', {id: 'export_canvas'}).hide().appendTo('body');
						}
						c3d = $('#export_canvas')[0];
						c3d.width = svgCanvas.contentW;
						c3d.height = svgCanvas.contentH;

						Utils.buildCanvgCallback(function () {
							canvg(c3d, data3d, {renderCallback: function() {
									}});
									})();
								 //if (!customExportImage) {
								//	openExportWindow();
								//}
								//var quality = parseInt($('#image-slider').val(), 10)/100;
								//svgCanvas.rasterExport('PNG', 50, exportWindowName);
							 //var myCanvas = $(document).find('#svgcanvas');
							//var dataURL = new Image();
							dataURL = ($('#export_canvas')[0]).toDataURL();
							 //url = url + '?' + Math.random();
							 var loader = new THREE.ImageLoader();
							 loader.load( dataURL, function ( image ) {
								 texture.image = image;
								 texture.needsUpdate = true;
							} );
					}

					loadTextureImage(dae.children["0"].children["0"].children["0"].material.materials["0"].map);
					//dae.children["0"].children["0"].children["0"].material.materials["0"].map.needsUpdate = true;
					//dae.children["0"].children["0"].children["0"].material.materials["0"].needsUpdate = true;
				}

			}

			//function onWindowResize() {

				//camera.aspect = window.innerWidth / window.innerHeight;
				//camera.updateProjectionMatrix();

				//renderer.setSize( window.innerWidth, window.innerHeight );

			//}

			

			function animate() {

				requestAnimationFrame( animate );

				render();
				//stats.update();

			}

			var clock = new THREE.Clock();

			function render() {

				var timer = Date.now() * 0.0001;

				/*camera.position.x = Math.cos( timer ) * 10;
				camera.position.y = 2;
				camera.position.z = Math.sin( timer ) * 10;*/

				camera.lookAt( scene.position );
				controls.update();

				particleLight.position.x = Math.sin( timer * 4 ) * 3009;
				particleLight.position.y = Math.cos( timer * 5 ) * 4000;
				particleLight.position.z = Math.cos( timer * 4 ) * 3009;

				THREE.AnimationHandler.update( clock.getDelta() );

				renderer.render( scene, camera );

			};	
		
		
		
	}
	$('#info').toggle();
	}

	return {
		name: 'star',
		svgicons: svgEditor.curConfig.extPath + 'star-icons.svg',
		buttons: [{
			id: 'tool_star',
			type: 'mode',
			title: 'Star Tool',
			position: 12,
			events: {
				click: function(){
					show3DPanel();
				}
			}
		}]

	};
});
