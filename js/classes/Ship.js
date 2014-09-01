var DIRECTION =
{
	"DOWN" : 0,
	"LEFT" : 1,
	"RIGHT" : 2,
	"UP" : 3
}

var SPRITE_SIZE = 32;

var G = 9.81;

function Ship(url, x, y)
{
	this.sprite = new Image();
	this.sprite.refShip = this;
	this.x = x;
	this.y = y;
	this.degrees = 0;
	this.boostState = -1;
	this.explodeState = -1;
	
	this.y0 = y
	
	this.sprite.onload = function()
	{
		if(!this.complete)
		{
			throw "Erreur de chargement du sprite nommé \"" + url + "\".";
		}
		this.refShip.width = this.width;
		this.refShip.height = this.height;
	}
	
	this.sprite.src = "./images/" + url;
}

Ship.prototype.draw= function(ctx)
{
	var halfSpriteSize = SPRITE_SIZE/2;

	ctx.save();
	ctx.translate(this.x + halfSpriteSize,this.y + halfSpriteSize);
	ctx.rotate(this.degrees*Math.PI/180);
	ctx.translate(-this.x - halfSpriteSize,-this.y - halfSpriteSize);
	
	var spriteNb = this.boostState + 1;
	
	if(this.explodeState < 0)
	{
		ctx.drawImage(this.sprite,
		spriteNb*32,
		0,
		SPRITE_SIZE,
		SPRITE_SIZE,
		this.x,
		this.y,
		SPRITE_SIZE,
		SPRITE_SIZE);
	}
	else if(Math.floor(this.explodeState/10) < 30)
	{
		ctx.drawImage(this.sprite,
		Math.floor(this.explodeState/10)*32,
		SPRITE_SIZE+1,
		SPRITE_SIZE,
		SPRITE_SIZE,
		this.x,
		this.y,
		SPRITE_SIZE,
		SPRITE_SIZE);
		this.explodeState++;
	}
	
	ctx.restore();
}

Ship.prototype.boost = function()
{
	this.boostState = (this.boostState + 1)%2;
}

Ship.prototype.stopBoost = function()
{
	this.boostState = -1;
}

Ship.prototype.explode = function()
{
	this.explodeState = 0;
}

Ship.prototype.rotate = function(direction)
{
	switch(direction)
	{
		/*case DIRECTION.DOWN :
			this.y++;
			break;*/
		case DIRECTION.LEFT:
			this.degrees--;
			break;
		case DIRECTION.RIGHT:
			this.degrees++;
			break;
		/*case DIRECTION.UP:
			this.y--;
			break;*/
	}
}

Ship.prototype.move= function(t, scale)
{
	this.y = -scale.convertMeterToPixel(-1/2*G*(Math.pow(t/1000,2))) + this.y0;
}