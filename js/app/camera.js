define( ["three", "container"], function ( THREE, container ) {
  
  var sizeOfCamera = 50;
  var camera = new THREE.PerspectiveCamera( sizeOfCamera, 1, 0.1, 100000 );
  camera.position.z = 70;
  camera.position.y = 0;

  var updateSize = function () {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
  };
  window.addEventListener( 'resize', updateSize, false );
  updateSize();

  return camera;
} );
