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
		    clock : 0,
			
			 FizzyText :function(){
			  this.message = 'dat.gui';	  		  
			},
			

			randomIntFromInterval : function(min,max)
			{
				return Math.floor(Math.random()*(max-min+1)+min);
			},

	
	initializeGUI : function(){

			var guiImg = new dat.GUI();
				  
	        this.GuiVarHolder = new this.FizzyText();
			  var gui = new dat.GUI();  
			
			
			},
	

    init: function () {
     this.initializeGUI();
	
	 this.keyboardInteraction = new THREEx.KeyboardState();
	 				
	this.createText(10,10,10,10);

	this.text[0].innerHTML = "hello"

	
	projector = new THREE.Projector();
	renderer.setClearColor( 0xff0000, 1 );
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
    animate: function () {

		app.render();
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
			

	
  };
  return app;
} );
