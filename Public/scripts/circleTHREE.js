 var container;
 var camera, controls, scene, renderer;
 var arrows = [];
 var plane = new THREE.Plane();
 var raycaster = new THREE.Raycaster();
 var mouse = new THREE.Vector2(),
     offset = new THREE.Vector3(),
     intersection = new THREE.Vector3(),
     INTERSECTED, SELECTED;

    
 var radius = document.getElementById("radiusInput").value;

 var diameter = radius * 2;
 var arrow2X;
 var lineX;
 var radius;

 var playbox = document.getElementsByClassName("playBox")[0];
 var threeHeight = 500;
 var threeWidth = 500;

 var mainGeometry = new THREE.CircleGeometry(20, 64);

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
     camera.position.z = 1500;

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
     controls.minDistance = 10;
     controls.maxDistance = 10000;

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




     radiusLineGeometry = new THREE.CylinderGeometry(1, 1, 20);
     radiusLineMaterial = new THREE.LineBasicMaterial({
         color: 0xffffff,
         transparent: true,
         opacity: 0.8
     });

     radiusLine = new THREE.Mesh(radiusLineGeometry, radiusLineMaterial);
     radiusLine.position.x = 10;
     radiusLine.rotation.z = 7.85;
     radiusLine.visible = false;
     scene.add(radiusLine);






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
     arrowMaterial = new THREE.MeshLambertMaterial({
         color: 0xffffff
     });




     for (i = 0; i < 1 ;i++) {
         var arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);

         if (i === 0)  {
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
     mouse.x = ((event.clientX - (shapeOffsetX-scrollLeft)) / 500) * 2 - 1;
     mouse.y = -((event.clientY - (shapeOffsetY-scrollTop)) / 500) * 2 + 1;
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
                 var spacing = (SELECTED.position.x - 41)  ;
                 mainObj.scale.x = spacing/ (diameter / 2);
                 mainObj.scale.y = spacing/ (diameter / 2);
                 radiusLine.scale.y = spacing/ (diameter / 2);
                 radiusLine.position.x = spacing/2;
                 //                    console.log(SELECTED.position);
                 if (SELECTED.position.x <= 41) {
                     SELECTED.position.x = arrow2X;
                     mainObj.scale.x = 0.025;
                     mainObj.scale.y = 0.025;
                     radiusLine.scale.y = 0.025;
                     radiusLine.position.x = 0.5;
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

     radius = document.getElementById("radiusInput").value = 20;

     diameter = radius * 2 ;

     mainGeometry = new THREE.CircleGeometry(radius, 64);
     mainObj = new THREE.Mesh(mainGeometry, mainMaterial);
     for (i = 0; i < 1; i++) {
         if (i === 0) {
             arrows[i].position.x = (diameter) + 20;
         }
     }
     scene.add(mainObj);
     resetGlowLines();
     updateFormulas();
 }

 function updateShape() {
     scene.remove(mainObj);
     radius =1 * document.getElementById("radiusInput").value;
     var circleColor = document.getElementById("colorInput").value;
     if(radius < 1 ){
         radius = 1;
         document.getElementById("radiusInput").value = 1;
     }
     diameter = radius * 2;
     mainGeometry = new THREE.CircleGeometry(radius, 64);
     mainObj = new THREE.Mesh(mainGeometry, mainMaterial);
     mainObj.material.color.setHex('0x' + circleColor);

     scene.add(mainObj);

     for (i = 0; i < 1; i++) {
         if (i === 0) {
             arrow2X = arrows[i].position.x = (diameter) + 20;
         }
     }
     updateGLines();
     updateFormulas();
 }

 function updateInputs() {
     var arrowX = arrows[0].position.x;

     var rInput = document.getElementById("radiusInput");

     rInput.value = (Math.round(arrowX) - 20) / 2;

 }

 function updateFormulas() {

     var rInput = document.getElementById("radiusInput");

     document.getElementById("CircumferenceAnsr").innerText = circumfrence(rInput.value);
     document.getElementById("CircAreaAnsr").innerText = circArea(rInput.value);

 }



 var isGlowing = false;


 function toggleGlow() {
     if (isGlowing === false) {
         document.getElementById("toggleGlow").innerText = "Unhighlight Measurements";
         isGlowing = true;
         radiusLine.visible = true;

     } else {
         document.getElementById("toggleGlow").innerText = "Highlight Measurements";
         isGlowing = false;
         radiusLine.visible = false;
     }
 }

 function resetGlowLines() {
     radiusLine.position.x = 10;
     radiusLine.scale.y = 1;


 }

 function updateGLines() {

     radiusLine.position.x = radius/2;
     radiusLine.scale.y = diameter / 40;

 }


 //yo