 var container;
 var camera, controls, scene, renderer;
 var arrows = [];
 var plane = new THREE.Plane();
 var raycaster = new THREE.Raycaster();
 var mouse = new THREE.Vector2(),
     offset = new THREE.Vector3(),
     intersection = new THREE.Vector3(),
     INTERSECTED, SELECTED;


 var prismX = document.getElementById("widthInput").value;
 var prismY = document.getElementById("lengthInput").value;
 var prismZ = document.getElementById("heightInput").value;
 var arrow1Y, arrow2X, arrow3Z;
 var lineX, lineY, lineZ;
 var glowLineX, glowLineY, glowLineZ;
 //some how i reverse glowlineX and glowlineY so remeber that

 var playbox = document.getElementsByClassName("playBox")[0];
 var threeHeight = 500;
 var threeWidth = 500;

 var mainGeometry = new THREE.BoxGeometry(40, 40, 40);

 var mainMaterial = new THREE.MeshLambertMaterial({
     color: 0x000ff0
 });

 var mainObj = new THREE.Mesh(mainGeometry, mainMaterial);
 init();
 animate();



 var arrowGeometry;
 var arrowMaterial;
 var arrXRotaion;
 var arrYRotaion;
 var arrXRotaion;

 function init() {

     container = document.createElement('div');
     playbox.appendChild(container);

     camera = new THREE.PerspectiveCamera(10, threeWidth / threeHeight, 1, 10000000);
     camera.position.z = 1000;
     camera.position.y = 600;
     camera.position.x = 800;

     renderer = new THREE.WebGLRenderer({
         antialias: true
     });
     renderer.setClearColor(0x000000);
     renderer.setPixelRatio(window.devicePixelRatio);
     renderer.setSize(threeWidth, threeHeight);
     renderer.sortObjects = false;

     renderer.shadowMap.enabled = true;
     renderer.shadowMap.type = THREE.PCFShadowMap;

     container.appendChild(renderer.domElement);





     renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
     renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
     renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);

     controls = new THREE.TrackballControls(camera, renderer.domElement);
     controls.rotateSpeed = 1.0;
     controls.zoomSpeed = 0.2;
     controls.panSpeed = 0.9;
     controls.noZoom = false;
     controls.noPan = true;
     controls.staticMoving = true;
     controls.dynamicDampingFactor = 0.3;
     controls.minDistance = 10;
     controls.maxDistance = 10000;

     scene = new THREE.Scene();

     scene.add(new THREE.AmbientLight(0x505050));

     var light = new THREE.SpotLight(0x909090, 1.5);
     light.position.set(0, 500, 2000);
     light.castShadow = true;

     light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50, 1, 200, 10000));
     light.shadow.bias = -0.00022;

     light.shadow.mapSize.width = threeWidth;
     light.shadow.mapSize.height = threeHeight;

     scene.add(light);
     
     var light2 = new THREE.SpotLight(0x909090, 1.5);
     light2.position.set(0, 500, -2000);
     light2.castShadow = true;

     light2.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50, 1, 200, 10000));
     light2.shadow.bias = -0.00022;

     light2.shadow.mapSize.width = threeWidth;
     light2.shadow.mapSize.height = threeHeight;

     scene.add(light2);

     scene.add(mainObj);




     glowLineGeometry = new THREE.CylinderGeometry(1, 1, 40);
     glowLineMaterial = new THREE.LineBasicMaterial({
         color: 0xffffff,
         transparent: true,
         opacity: 0.8
     });

     glowLineX = new THREE.Mesh(glowLineGeometry, glowLineMaterial);
     glowLineX.position.x = 20;
     glowLineX.position.z = 20;
     glowLineX.visible = false;
     scene.add(glowLineX);

     glowLineY = new THREE.Mesh(glowLineGeometry, glowLineMaterial);
     glowLineY.position.y = 20;
     glowLineY.position.z = 20;
     glowLineY.visible = false;
     glowLineY.rotation.x = 1.569;
     glowLineY.rotation.z = 1.569;
     scene.add(glowLineY);

     glowLineZ = new THREE.Mesh(glowLineGeometry, glowLineMaterial);

     glowLineZ.position.x = 20;
     glowLineZ.position.y = 20;
     glowLineZ.visible = false;
     glowLineZ.rotation.x = 1.569;
     scene.add(glowLineZ);






     lineGeometry = new THREE.CylinderGeometry(0.1, 0.1, 100000);
     lineMaterial = new THREE.LineBasicMaterial({
         color: 0xffffff
     });

     lineY = new THREE.Mesh(lineGeometry, lineMaterial);
     scene.add(lineY);

     lineZ = new THREE.Mesh(lineGeometry, lineMaterial);
     lineZ.rotation.x = 1.569;
     scene.add(lineZ);

     lineX = new THREE.Mesh(lineGeometry, lineMaterial);
     lineX.rotation.z = 1.569;
     scene.add(lineX);


     arrowGeometry = new THREE.ConeGeometry(10, 1);
     arrowMaterialG = new THREE.MeshLambertMaterial({
         color: 0x00B700
     });
     arrowMaterialB = new THREE.MeshLambertMaterial({
         color: 0x4C4CFF
     });
     arrowMaterialR = new THREE.MeshLambertMaterial({
         color: 0xFF0000
     });




     for (i = 0; i < 3; i++) {


         if (i === 0) {
             var arrow = new THREE.Mesh(arrowGeometry, arrowMaterialG);
             arrow1Y = arrow.position.y = 60;
             arrow.position.x = 0;
             arrow.position.z = 0;
             arrXRotaion = 0;
             arrYRotaion = 0;
             arrZRotaion = 0;
         } else if (i === 1) {
             var arrow = new THREE.Mesh(arrowGeometry, arrowMaterialB);
             arrow.position.y = 0;
             arrow2X = arrow.position.x = 60;
             arrow.position.z = 0;
             arrXRotaion = 0;
             arrYRotaion = 0;
             arrZRotaion = -1.6;
         } else if (i === 2) {
             var arrow = new THREE.Mesh(arrowGeometry, arrowMaterialR);
             arrow.position.y = 0;
             arrow.position.x = 0;
             arrow3Z = arrow.position.z = -60;
             arrXRotaion = -1.6;
             arrYRotaion = 0;
             arrZRotaion = 0;
         }


         arrow.rotation.x = arrXRotaion;
         arrow.rotation.y = arrYRotaion;
         arrow.rotation.z = arrZRotaion;

         arrow.scale.x = 4;
         arrow.scale.y = 20;
         arrow.scale.z = 0.5;

         arrow.castShadow = true;
         arrow.receiveShadow = true;


         scene.add(arrow);

         arrows.push(arrow);
     }


     updateFormulas();

 }


 function onDocumentMouseMove(event) {
     event.preventDefault();

     var scrollLeft = $(window).scrollLeft() ;
     var scrollTop = $(window).scrollTop() ;
     mouse.x = ((event.clientX - (shapeOffsetX-scrollLeft)) / 500) * 2 - 1;
     mouse.y = -((event.clientY - (shapeOffsetY-scrollTop)) / 500) * 2 + 1;
     //                  ^  affects how it tracks mouse in three js for dragging

     raycaster.setFromCamera(mouse, camera);

     if (SELECTED) {

         if (raycaster.ray.intersectPlane(plane, intersection)) {
             SELECTED.position.copy(intersection.sub(offset));
             if (SELECTED.rotation.x === -1.6) {
                 console.log("z");

                 SELECTED.position.x = 0;
                 SELECTED.position.y = 0;
                 var spacingZ = (-41 - SELECTED.position.z);
                 mainObj.scale.z = spacingZ / (prismZ / 2);

                 glowLineZ.scale.y = spacingZ / (prismZ / 2);

                 glowLineX.position.z = spacingZ;

                 glowLineY.position.z = spacingZ;
                 //                    console.log(SELECTED.position);
                 if (SELECTED.position.z >= -41) {
                     SELECTED.position.z = -41;
                     mainObj.scale.z = 0.025;
                     glowLineZ.scale.y = 0.025;
                     glowLineX.position.z = 0.5;
                     glowLineY.position.z = 0.5;
                 }
             } else if (SELECTED.rotation.z === -1.6) {
                 //                        SELECTED.position.copy(intersection.sub(offset));
                 console.log("x");
                 SELECTED.position.y = 0;
                 SELECTED.position.z = 0;
                 var spacingX = (SELECTED.position.x - 41);

                 mainObj.scale.x = spacingX / (prismX / 2);

                 glowLineY.scale.y = spacingX / (prismX / 2);

                 glowLineX.position.x = spacingX;

                 glowLineZ.position.x = spacingX;


                 //                    console.log(SELECTED.position);
                 if (SELECTED.position.x <= 41) {
                     SELECTED.position.x = 41;
                     mainObj.scale.x = 0.025;
                     glowLineY.scale.y = 0.025;
                     glowLineX.position.x = 0.5;
                     glowLineZ.position.x = 0.5;
                 }
             } else {
                 //                        SELECTED.position.copy(intersection.sub(offset));
                 console.log("y");
                 SELECTED.position.x = 0;
                 SELECTED.position.z = 0;
                 var spacingY = (SELECTED.position.y - 41);

                 mainObj.scale.y = spacingY / (prismY / 2);

                 glowLineX.scale.y = spacingY / (prismX / 2);

                 glowLineY.position.y = spacingY;

                 glowLineZ.position.y = spacingY;
                 //                    console.log(SELECTED.position);
                 if (SELECTED.position.y <= 41) {
                     SELECTED.position.y = 41;
                     mainObj.scale.y = 0.025;
                     glowLineX.scale.y = 0.025;
                     glowLineY.position.y = 0.5;
                     glowLineZ.position.y = 0.5;
                 }
             }
             updateInputs();
             updateFormulas();
         }

         return;
     }


     var intersects = raycaster.intersectObjects(arrows);

     if (intersects.length > 0) {

         if (INTERSECTED != intersects[0].object) {
             //                                             not ^a naming thing, required
             if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);

             INTERSECTED = intersects[0].object;
             INTERSECTED.currentHex = INTERSECTED.material.color.getHex();

             plane.setFromNormalAndCoplanarPoint(
                 camera.getWorldDirection(plane.normal),
                 INTERSECTED.position);

         }

         container.style.cursor = 'pointer';

     } else {

         if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);

         INTERSECTED = null;

         container.style.cursor = 'auto';

     }
 }


 function onDocumentMouseDown(event) {

     event.preventDefault();

     raycaster.setFromCamera(mouse, camera);

     var intersects = raycaster.intersectObjects(arrows);

     if (intersects.length > 0) {

         controls.enabled = false;

         SELECTED = intersects[0].object;

         if (raycaster.ray.intersectPlane(plane, intersection)) {
             offset.copy(intersection).sub(SELECTED.position);


         }

         container.style.cursor = 'move';

     }

 }


 function onDocumentMouseUp(event) {

     event.preventDefault();

     controls.enabled = true;

     if (INTERSECTED) {

         SELECTED = null;

     }

     container.style.cursor = 'auto';

 }


 function animate() {

     requestAnimationFrame(animate);

     render();


 }

 function render() {

     controls.update();

     renderer.render(scene, camera);

 }

 function resetCanvas() {
     scene.remove(mainObj);
     controls.reset();

     prismX = document.getElementById("widthInput").value = 40;
     prismY = document.getElementById("lengthInput").value = 40;
     prismZ = document.getElementById("heightInput").value = 40;
     mainGeometry = new THREE.BoxGeometry(prismX, prismY, prismZ);
     mainObj = new THREE.Mesh(mainGeometry, mainMaterial);
     for (i = 0; i < 3; i++) {
         if (i === 0) {
             arrows[i].position.y = (prismY) + 20;
         } else if (i === 1) {
             arrows[i].position.x = (prismX) + 20;
         } else if (i === 2) {
             arrows[i].position.z = -(prismZ) - 20;
         }
     }
     resetGlowLines();
     scene.add(mainObj);
     updateFormulas();
 }

 function updateShape() {
     scene.remove(mainObj);
     prismX = 1 * document.getElementById("widthInput").value;
     prismY = 1 * document.getElementById("lengthInput").value;
     prismZ = 1 * document.getElementById("heightInput").value;
     var prismColor = document.getElementById("colorInput").value;
     mainGeometry = new THREE.BoxGeometry(prismX, prismY, prismZ);
     mainObj = new THREE.Mesh(mainGeometry, mainMaterial);
     mainObj.material.color.setHex('0x'+prismColor);
     scene.add(mainObj);

     if (prismX < 1) {
         prismX = 1;
         document.getElementById("widthInput").value = 1;
     }

     if (prismY < 1) {
         prismY = 1;
         document.getElementById("lengthInput").value = 1;
     }

     if (prismZ < 1) {
         prismZ = 1;
         document.getElementById("heightInput").value = 1;
     }

     for (i = 0; i < 3; i++) {
         if (i === 0) {
             arrow1Y = arrows[i].position.y = (prismY) + 20;
             //             console.log(arrows[i].position.y+ " : " + (prismY));
         } else if (i === 1) {
             arrow2X = arrows[i].position.x = (prismX) + 20;
         } else if (i === 2) {
             arrow3Z = arrows[i].position.z = -(prismZ) - 20;
         }
     }
     updateGLines();
     updateFormulas();
 }

 function updateInputs() {
     var arrowY = arrows[0].position.y;
     var arrowX = arrows[1].position.x;
     var arrowZ = -arrows[2].position.z;

     var wInput = document.getElementById("widthInput");
     var lInput = document.getElementById("lengthInput");
     var hInput = document.getElementById("heightInput");

     wInput.value = Math.round(mainObj.scale.x * 40);
     lInput.value = Math.round(mainObj.scale.y * 40);
     hInput.value = Math.round(mainObj.scale.z * 40);

 }

 function updateFormulas() {

     var wInput = document.getElementById("widthInput");
     var lInput = document.getElementById("lengthInput");
     var hInput = document.getElementById("heightInput");

     document.getElementById("surfaceAreaAnsr").innerText = prismSurfaceArea(wInput.value, lInput.value, hInput.value);
     document.getElementById("volumeAnsr").innerText = prismVolume(wInput.value, lInput.value, hInput.value);

 }



 var isGlowing = false;


 function toggleGlow() {
     if (isGlowing === false) {
         document.getElementById("toggleGlow").innerText = "Unhighlight Measurements";
         isGlowing = true;
         glowLineX.visible = true;
         glowLineY.visible = true;
         glowLineZ.visible = true;

     } else {
         document.getElementById("toggleGlow").innerText = "Highlight Measurements";
         isGlowing = false;
         glowLineX.visible = false;
         glowLineY.visible = false;
         glowLineZ.visible = false;
     }
 }

 function resetGlowLines() {
     glowLineX.position.x = 20;
     glowLineX.position.z = 20;
     glowLineX.scale.y = 1;


     glowLineY.position.y = 20;
     glowLineY.position.z = 20;
     glowLineY.scale.y = 1;


     glowLineZ.position.x = 20;
     glowLineZ.position.y = 20;
     glowLineZ.scale.y = 1;

 }

 function updateGLines() {

     glowLineZ.scale.y = prismZ / 40;

     glowLineX.position.z = prismZ / 2;

     glowLineY.position.z = prismZ / 2;

     glowLineY.scale.y = prismX / 40;

     glowLineX.position.x = prismX / 2;

     glowLineZ.position.x = prismX / 2;

     glowLineX.scale.y = prismY / 40;

     glowLineY.position.y = prismY / 2;

     glowLineZ.position.y = prismY / 2;
 }


 //yo