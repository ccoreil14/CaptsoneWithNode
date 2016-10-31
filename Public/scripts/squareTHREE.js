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

 var arrow1Y, arrow2X;
 var lineX, lineY;
 var glowLineX, glowLineY

 var playbox = document.getElementsByClassName("playBox")[0];
 var threeHeight = 500;
 var threeWidth = 500;

 var mainGeometry = new THREE.BoxGeometry(40, 40, 0.1);

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
 var arrZRotaion;

 function init() {

     container = document.createElement('div');
     playbox.appendChild(container);

     camera = new THREE.PerspectiveCamera(10, threeWidth / threeHeight, 1, 10000000);
     camera.position.z = 1000;
     camera.position.y = 0;
     camera.position.x = 0;

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
     controls.rotateSpeed = 0;
     controls.zoomSpeed = 0.2;
     controls.panSpeed = 0.9;
     controls.noZoom = false;
     controls.noPan = true;
     controls.staticMoving = true;
     controls.dynamicDampingFactor = 0.3;

     scene = new THREE.Scene();

     scene.add(new THREE.AmbientLight(0x505050));

     var light = new THREE.SpotLight(0x505050, 1.5);
     light.position.set(0, 500, 2000);
     light.castShadow = true;

     light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50, 1, 200, 10000));
     light.shadow.bias = -0.00022;

     light.shadow.mapSize.width = threeWidth;
     light.shadow.mapSize.height = threeHeight;

     scene.add(light);

     scene.add(mainObj);




     glowLineGeometry = new THREE.CylinderGeometry(1, 1, 40);
     glowLineMaterial = new THREE.LineBasicMaterial({
         color: 0xffffff,
         transparent: true,
         opacity: 0.8
     });

     glowLineX = new THREE.Mesh(glowLineGeometry, glowLineMaterial);
     glowLineX.position.x = 20;
     glowLineX.visible = false;
     scene.add(glowLineX);

     glowLineY = new THREE.Mesh(glowLineGeometry, glowLineMaterial);
     glowLineY.position.y = 20;
     glowLineY.visible = false;
     glowLineY.rotation.x = 1.569;
     glowLineY.rotation.z = 1.569;
     scene.add(glowLineY);





     lineGeometry = new THREE.CylinderGeometry(0.1, 0.1, 100000);
     lineMaterial = new THREE.LineBasicMaterial({
         color: 0xffffff,
         transparent: true,
         opacity: 0.8
     });

     lineY = new THREE.Mesh(lineGeometry, lineMaterial);
     scene.add(lineY);


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



     for (i = 0; i < 2; i++) {


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
     mouse.x = ((event.clientX - (363-scrollLeft)) / 500) * 2 - 1;
     mouse.y = -((event.clientY - (405-scrollTop)) / 500) * 2 + 1;
     //                  ^  affects how it tracks mouse in three js for dragging

     raycaster.setFromCamera(mouse, camera);

     if (SELECTED) {

         if (raycaster.ray.intersectPlane(plane, intersection)) {
             SELECTED.position.copy(intersection.sub(offset));
             if (SELECTED.rotation.z === -1.6) {
                 //                        SELECTED.position.copy(intersection.sub(offset));
                 console.log("x");
                 SELECTED.position.y = 0;
                 SELECTED.position.z = 0;
                 var spacingX = (SELECTED.position.x - 41);
                 mainObj.scale.x = spacingX / (prismX / 2);
                 glowLineY.scale.y = spacingX / (prismX / 2);

                 glowLineX.position.x = spacingX;
                 //                    console.log(SELECTED.position);
                 if (SELECTED.position.x <= 41) {
                     SELECTED.position.x = 41;
                     mainObj.scale.x = 0.025;
                     glowLineY.scale.y = 0.025;
                     glowLineX.position.x = 0.5;
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

                 //                    console.log(SELECTED.position);
                 if (SELECTED.position.y <= 41) {
                     SELECTED.position.y = 41;
                     mainObj.scale.y = 0.025;
                     glowLineX.scale.y = 0.025;
                     glowLineY.position.y = 0.5;
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
     mainGeometry = new THREE.CubeGeometry(prismX, prismY, 0.1);
     mainObj = new THREE.Mesh(mainGeometry, mainMaterial);
     for (i = 0; i < 2; i++) {
         if (i === 0) {
             arrows[i].position.y = (prismY) + 20;
         } else if (i === 1) {
             arrows[i].position.x = (prismX) + 20;
         }
     }
     scene.add(mainObj);
     resetGlowLines();
     updateFormulas();
 }

 function updateShape() {
     var lInput = 1 * document.getElementById("lengthInput").value;
     var wInput = 1 * document.getElementById("widthInput").value;

     var squareColor = document.getElementById("colorInput").value;
     if (wInput < 1) {
         wInput = 1;
         document.getElementById("widthInput").value = 1;
     } else if (lInput < 1) {
         lInput = 1;
         document.getElementById("lengthInput").value = 1;
     }
     scene.remove(mainObj);
     prismX = wInput;
     prismY = lInput;

     mainGeometry = new THREE.BoxGeometry(prismX, prismY, 0.1);
     mainObj = new THREE.Mesh(mainGeometry, mainMaterial);

     mainObj.material.color.setHex('0x' + squareColor);
     scene.add(mainObj);

     for (i = 0; i < 2; i++) {
         if (i === 0) {
             arrow1Y = arrows[i].position.y = (prismY) + 20;
             //             console.log(arrows[i].position.y+ " : " + (prismY));
         } else if (i === 1) {
             arrow2X = arrows[i].position.x = (prismX) + 20;
         }
     }
     updateGLines();
     updateFormulas();
 }

 function updateInputs() {
     var arrowY = arrows[0].position.y;
     var arrowX = arrows[1].position.x;

     var wInput = document.getElementById("widthInput");
     var lInput = document.getElementById("lengthInput");

     wInput.value = Math.round(arrowY) - 20;
     lInput.value = Math.round(arrowX) - 20;

 }

 function updateFormulas() {

     var wInput = document.getElementById("widthInput");
     var lInput = document.getElementById("lengthInput");

     document.getElementById("PerimeterAnsr").innerText = perimeter(wInput.value, lInput.value);
     document.getElementById("RectAreaAnsr").innerText = rectArea(wInput.value, lInput.value);

 }



 var isGlowing = false;


 function toggleGlow() {
     if (isGlowing === false) {
         document.getElementById("toggleGlow").innerText = "Glow On";
         isGlowing = true;
         glowLineX.visible = true;
         glowLineY.visible = true;

     } else {
         document.getElementById("toggleGlow").innerText = "Glow Off";
         isGlowing = false;
         glowLineX.visible = false;
         glowLineY.visible = false;
     }
 }

 function resetGlowLines() {
     glowLineX.position.x = 20;
     glowLineX.scale.y = 1;


     glowLineY.position.y = 20;
     glowLineY.scale.y = 1;


 }

 function updateGLines() {

     glowLineX.position.x = prismX / 2;
     glowLineX.scale.y = prismY / 40;

     glowLineY.scale.y = prismX / 40;
     glowLineY.position.y = prismY / 2;
 }




 //yo