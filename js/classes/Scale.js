//nbPixel représentent le nombre de pixel utilisé pour représenter 100m
var realHeight = 10000;
var graduation = 500; // représente la distance en m entre chaque graduation

function Scale(width, height)
{
	this.width = width;
	this.height = height;
	this.pixelGraduation = graduation * this.height / realHeight;

}

Scale.prototype.draw = function(ctx)
{

	ctx.beginPath();
	var actualHeight = realHeight;
	for(var y=this.pixelGraduation; y<this.height; y+=this.pixelGraduation)
	{
		actualHeight -= graduation;
		ctx.moveTo(this.width, y);
		ctx.lineTo(this.width-5, y);
		ctx.fillText(actualHeight+ ' m', this.width-50, y)
		ctx.stroke();
	}
}

Scale.prototype.convertMeterToPixel = function(meter)
{
	return meter * this.pixelGraduation / graduation;
}