define( ["three", "camera", "renderer", 
"scene","dat","KeyboardState"],
function ( THREE, camera, renderer, scene) {
  var app = {
  
    GuiVarHolder : null,
			
	camera,
	scene, 
	renderer,

	projector : null,
    keyboardInteraction : null,
	text : [],
	sceneObjects : [],
	clock : 0,
			
	FizzyText :function()
	{
	    this.message = 'dat.gui';	  		  
	},
			
	randomIntFromInterval : function(min,max)
	{
		return Math.floor(Math.random()*(max-min+1)+min);
	},
	randomFloatFromInterval : function(min,max)
	{
		return Math.random()*(max-min+1)+min;
	},

	
	initializeGUI : function()
	{
		var guiImg = new dat.GUI();			  
	    this.GuiVarHolder = new this.FizzyText();
	        var gui = new dat.GUI();  		
	},
	

    init: function () 
    {
        this.initializeGUI();
	    this.keyboardInteraction = new THREEx.KeyboardState();
	 	this.createText(10,10,10,10);
        this.text[0].innerHTML = "hello"
        projector = new THREE.Projector();
	    renderer.setClearColor( 0xff0000, 1 );
	    
	    
	    for(var i = 0;i<100;i++)
	    {
	       this.createSphere(0,0);
	   }
	   window.requestAnimationFrame( app.animate );
    },
		

	render :function ()
	{
		renderer.render( scene, camera );
		this.keyboardInfo();
		app.clock+=1;
		
	},
	
	keyboardInfo : function ()
    {
    },
    
    animate: function () 
    {
        for(var i = 0;i<app.sceneObjects.length;i++)
        {
            var alfa = app.sceneObjects[i];
            if(alfa.isMoving)
            {
                alfa.moveByVector();
            }
        }
        window.requestAnimationFrame( app.animate );
		app.render();
		
    },	
    
    getBezierPosition(x1,x2,x3,x4,y1,y2,y3,y4,t)
    {
        var point = function()
        { 
            this.x = 0;
            this.y = 0;
        }
        point.x = Math.pow(1 - t,3)*x1 + Math.pow(1 - t,2)*t*3*x2 +(1 -t)*Math.pow(t,2)*x3*3 + x4*Math.pow(t,3);
        
        point.y = Math.pow(1 -t,3)*y1 + Math.pow(1 -t,2)*t*3*y2 + (1 -t)*Math.pow(t,2)*y3*3 + y4*Math.pow(t,3);
        
        return point;
    },
    	
	createText : function(sizeX,sizeY,posX,posY)
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
        app.text.push(text2);
	},
	
	createSphere : function(posX,posY)
	{
		var sphere = new THREE.Mesh(new THREE.SphereGeometry(0.3, 1, 1  ), new THREE.MeshNormalMaterial());
		this.sceneObjects.push({
                object : sphere,
                t : 0 , 
                startX : posX,
                startY : posY,
                endX : 0, 
                endY : 20, 
                mid1X : 20,
                mid1Y : 0,
                mid2X : 20,
                mid2Y : 20,
                isMoving : true,
                frontVector : new THREE.Vector3(0,1,0),
                stepSize : 0.5,
                speed : 0.05,
                randomAngle : app.randomFloatFromInterval(-Math.PI,Math.PI),
                oldPosition : new THREE.Vector3(0,0,0),
                lineDeb : [],
                debugMove : 0,
                
                
                moveBezier : function()
                {
                   if(this.t < 1)
                   {
                       var point =  app.getBezierPosition(this.startX,this.mid1X,this.mid2X,this.endX,
                                                  this.startY,this.mid1Y,this.mid2Y,this.endY,this.t);
                       this.t+=this.speed;
                       this.object.position = new THREE.Vector3(point.x,point.y,0);
                   }
                   this.isMoving = false;
                },
                resetAndRandomizeBezier : function()
                {
                   this.startX = this.object.position.x;
                   this.startY = this.object.position.y;
                   
                   this.endX = app.randomFloatFromInterval(0,0);
                   this.endY = app.randomFloatFromInterval(0,0);
                   this.mid1X = app.randomFloatFromInterval(-30,30);
                   this.mid1Y = app.randomFloatFromInterval(-30,30);
                   this.mid2X = app.randomFloatFromInterval(-30,30);
                   this.mid2Y = app.randomFloatFromInterval(-30,30);
                   this.t = 0;
                   
                   this.isMoving = true;
                },  
                
                moveByVector()
                {
                   if(this.t < 1)
                   {
                       var tempVector = this.frontVector.clone()
                       var temptemp = this.object.position.clone();
                       this.object.position.add(tempVector.multiplyScalar(this.stepSize));
                       
                       
                       this.debugMove +=  this.object.position.distanceTo(temptemp);
                       
                       this.t+=this.speed;
                       this.frontVector.applyAxisAngle(new THREE.Vector3(0,0,1),this.randomAngle*this.speed);
                       
                       if(this.object.position.y > 27)
                            this.object.position.y = -27;
                       if(this.object.position.y < -27)
                            this.object.position.y = 27;
                       if(this.object.position.x > 50)
                            this.object.position.x = -50;
                       if(this.object.position.x < -50)
                            this.object.position.x = 50;
                       
                   }
                   else
                    {
                        this.isMoving = false;
                        this.randomizeByVector();
                    }
                },
                
                randomizeByVector()
                {
                    
                    this.t = 0;
                    this.debugMove = 0;
                    this.randomAngle =  app.randomFloatFromInterval(-Math.PI*0.5,Math.PI*0.5);
                    this.isMoving = true;
 
                    this.oldPosition = this.object.position.clone();
                    
                },
                
                /*checkIfOkay()
                {
                    var circleRadius = (5.5 )/this.randomAngle;
                    var hyber = (circleRadius*Math.sin(this.randomAngle))/Math.sin(Math.PI - 2*this.randomAngle);
                    
                    var x = Math.cos( this.randomAngle)*hyber;
                    var y = Math.sin( this.randomAngle)*hyber;
                    
                    if(x > -50 && y > -50  && x < 50 && y < 50)
                    { 
                        console.log(this.object.position.distanceTo(new THREE.Vector3(x,y)) + "distance estimated");
                        console.log(this.randomAngle);
                        console.log(hyber);
                        app.createLine(this.object.position,new THREE.Vector3(x,y,0),0xff0000);
                        
                        return true;
                    }
                    else
                    {   
                        return false;
                     }
                }*/
               
        });
		
		sphere.position = new THREE.Vector3(posX,posY,0);	 
		sphere.name = " sphere_";
		scene.add(sphere);	
    },
    
    createLine : function(pointA,pointB,colorA)
			{
				var geometry = new THREE.Geometry();
				var material = new THREE.LineBasicMaterial({
						color: colorA
					});
			
				geometry.vertices.push(pointA);
				geometry.vertices.push(pointB); 
			
				var line = new THREE.Line(geometry, material);
				scene.add(line);
			},
    createLineArray : function(array,colorA)
			{
				var geometry = new THREE.Geometry();
				var material = new THREE.LineBasicMaterial({
						color: colorA
					});
					
			    for(var i = 0;i<array.length;i++)
			    {
				    geometry.vertices.push(array[i]);
                }
			
				var line = new THREE.Line(geometry, material);
				scene.add(line);
			},			

	
  };
  return app;
} );
