define( ["three", "scene"], function ( THREE, scene )
Creator = function ()
 {
    this.numCr = "alfa";
    this.createText =  function(sizeX,sizeY,posX,posY)
    {	
		var text2 = document.createElement('div');
		text2.style.position = 'absolute';
		text2.style.width = sizeX;
		text2.style.height = sizeY;
		text2.innerHTML = "hi there!";
		text2.style.top = posX + 'px';
		text2.style.left = posY + 'px';
		text2.style.color = "red";
		document.body.appendChild(text2);
		return text2;
    }
    this.createSphere = function(posX,posY)
	{
		var sphere = new THREE.Mesh(new THREE.SphereGeometry(10, 4, 2), new THREE.MeshNormalMaterial());
		
		sphere.position = new THREE.Vector3(posX,posY,0);	 
		sphere.name = " sphere_";
		scene.add(sphere);	
		
		return sphere;
    }
  });

