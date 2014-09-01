var nbLandingArea = 3;

function Ground(width, height)
{
	var minY = Math.floor(height*2/3);
	var intervalX = Math.floor(width/100);
	
	this.groundPoints = new Array();
	
	var currentNbLandingArea = 0;
	for(var x=0; x<=width; x+=intervalX)
	{
		if(x < (width/3-50) * (currentNbLandingArea+1))
		{
			//le point y doit être compris entre le bas du canvas (height) et le minY
			var y = Math.floor((Math.random() * (height-minY)) + 400);
		}
		else
		{
			this.groundPoints.push(new Point(x,y));
			x+=intervalX;
			this.groundPoints.push(new Point(x,y));
			x+=intervalX;
			this.groundPoints.push(new Point(x,y));
			x+=intervalX;
			this.groundPoints.push(new Point(x,y));
			x+=intervalX;
			currentNbLandingArea++;
		}
		
		this.groundPoints.push(new Point(x,y));
	}
}

Ground.prototype.draw = function(ctx)
{
	ctx.beginPath();
	
	var p0 = this.groundPoints[0];
	ctx.moveTo(p0.x,p0.y);
	for(var i=1; i<this.groundPoints.length; i++)
	{
		var p = this.groundPoints[i];
		ctx.lineTo(p.x,p.y);
	}
    ctx.stroke();
}

