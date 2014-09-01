var canvasWidth = 800;
var canvasHeight = 600;
var refreshTime = 16;
var elapsedTime = 0;

var ship = new Ship("shipSprite_2.png", (canvasWidth/2)-16, 50);

window.onload = function() {

	var canvas = document.getElementById('canvas');
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	var ctx = canvas.getContext('2d');
	
	var ground = new Ground(canvasWidth,canvasHeight);
	var scale = new Scale(canvasWidth, canvasHeight);
	
	setInterval(function()
		{
			ctx.clearRect(0, 0, canvasWidth, canvasHeight);
			scale.draw(ctx);
			elapsedTime += refreshTime;
			ship.move(elapsedTime, scale);
			ground.draw(ctx);
			ship.draw(ctx);
		}, refreshTime);
	
	window.onkeydown = function(event)
	{
		var e = event || window.event;
		var key = e.which || e.keyCode;
		
		switch(key) {
			case 38 :
				ship.boost();
				break;
			case 40 :
				ship.explode();
				break;
			case 37 :
				ship.rotate(DIRECTION.LEFT);
				break;
			case 39 :
				ship.rotate(DIRECTION.RIGHT);
				break;
			default : 
				// Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
				return true;
		}
		
		return false; // avoir default behavior
	};
	
	window.onkeyup = function(event)
	{
		var e = event || window.event;
		var key = e.which || e.keyCode;
	
		switch(key) {
			case 38 :
				ship.stopBoost();
				break;
			default : 
				// Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
				return true;
		}
	}
}