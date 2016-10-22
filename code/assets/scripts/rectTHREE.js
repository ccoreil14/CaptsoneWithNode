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
     controls.noPan = false;
     controls.staticMoving = true;
     controls.dynamicDampingFactor = 0.3;

     scene = new THREE.Scene();

     scene.add(new THREE.AmbientLight(0x505050));

     var light = new THREE.SpotLight(0xffffff, 1.5);
     light.position.set(0, 500, 2000);
     light.castShadow = true;

     light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50, 1, 200, 10000));
     light.shadow.bias = -0.00022;

     light.shadow.mapSize.width = threeWidth;
     light.shadow.mapSize.height = threeHeight;

     scene.add(light);

     scene.add(mainObj);



     lineGeometry = new THREE.CylinderGeometry(0.1, 0.1, 100000);
     lineMaterial = new THREE.LineBasicMaterial({
         color: 0xffffff,
         transparent: true,
         opacity: 0.8
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
     arrowMaterial = new THREE.MeshLambertMaterial({
         color: 0xffffff
     });




     var i;
     for (i = 0; i < 3; i++) {
         var arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);

         if (i === 0) {

             arrow1Y = arrow.position.y = 60;
             arrow.position.x = 0;
             arrow.position.z = 0;
             arrXRotaion = 0;
             arrYRotaion = 0;
             arrZRotaion = 0;
         } else if (i === 1) {
             arrow.position.y = 0;
             arrow2X = arrow.position.x = 60;
             arrow.position.z = 0;
             arrXRotaion = 0;
             arrYRotaion = 0;
             arrZRotaion = -1.6;
         } else if (i === 2) {
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




 }


 function onDocumentMouseMove(event) {
     event.preventDefault();

     //     var topSize = document.getElementById("mainBody").clientHeight;
     //     console.log(topSize);
     mouse.x = ((event.clientX - 363) / 500) * 2 - 1;
     mouse.y = -((event.clientY - 405) / 500) * 2 + 1;
     //                  ^  affects how it tracks mouse in three js for dragging

     raycaster.setFromCamera(mouse, camera);

     if (SELECTED) {

         if (raycaster.ray.intersectPlane(plane, intersection)) {
             SELECTED.position.copy(intersection.sub(offset));
             if (SELECTED.rotation.x === -1.6) {
                 console.log("z");

                 SELECTED.position.x = 0;
                 SELECTED.position.y = 0;
                 mainObj.scale.z = ((arrow3Z - SELECTED.position.z) + 20) / (prismZ/2);
                 //                    console.log(SELECTED.position);
                 if (SELECTED.position.z >= (arrow3Z)) {
                     SELECTED.position.z = arrow3Z;
                     mainObj.scale.z = 1;
                 }
             } else if (SELECTED.rotation.z === -1.6) {
                 //                        SELECTED.position.copy(intersection.sub(offset));
                 console.log("x");
                 SELECTED.position.y = 0;
                 SELECTED.position.z = 0;
                 mainObj.scale.x = ((SELECTED.position.x - arrow2X) + 20) / (prismX/2);
                 //                    console.log(SELECTED.position);
                 if (SELECTED.position.x <= (arrow2X)) {
                     SELECTED.position.x = arrow2X;
                     mainObj.scale.x = 1;
                 }
             } else {
                 //                        SELECTED.position.copy(intersection.sub(offset));
                 console.log("y");
                 SELECTED.position.x = 0;
                 SELECTED.position.z = 0;
                 mainObj.scale.y = ((SELECTED.position.y - arrow1Y) + 20) / (prismY/2);
                 //                    console.log(SELECTED.position);
                 if (SELECTED.position.y <= (arrow1Y)) {
                     SELECTED.position.y = arrow1Y;
                     mainObj.scale.y = 1;
                 }
             }
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

 //

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
             arrows[i].position.y = (prismY)+20;
         } else if (i === 1) {
             arrows[i].position.x = (prismX)+20;
         } else if (i === 2) {
             arrows[i].position.z = -(prismZ)-20;
         }
     }
     scene.add(mainObj);
 }

 function updateShape() {
     scene.remove(mainObj);
     prismX = 1*document.getElementById("widthInput").value;
     prismY = 1*document.getElementById("lengthInput").value;
     prismZ = 1*document.getElementById("heightInput").value;
     mainGeometry = new THREE.BoxGeometry(prismX, prismY, prismZ);
     mainObj = new THREE.Mesh(mainGeometry, mainMaterial);
     scene.add(mainObj);
     
     for (i = 0; i < 3; i++) {
         if (i === 0) {
             arrows[i].position.y = ((prismY)+20);
//             console.log(arrows[i].position.y+ " : " + (prismY));
         } else if (i === 1) {
             arrows[i].position.x = (prismX)+20;
         } else if (i === 2) {
             arrows[i].position.z = -(prismZ)-20;
//              console.log(arrows[i].position.y+ " : " + (prismZ));
         }
     }
 }

 function updateInputs() {

 }