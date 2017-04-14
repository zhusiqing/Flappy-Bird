(function(Fly){
	"use strict";
	var Land=function(picObjs){
		this.landImg=picObjs.land;
		//图片宽高
		this.landWidth=this.landImg.width;
		this.landHeight=this.landImg.height;
		//记录上次原点位置
		this.landPlace=0;

		// this.landMove(worldStep);
	};
	Land.prototype={
		constructor:Land,
		landMove:function(worldStep){
			this.landPlace-=worldStep
			for(var i=0;i<4;i++){
				//描绘
				Fly.ctx.drawImage(this.landImg, this.landPlace+this.landWidth*i, Fly.ctx.canvas.height-this.landHeight);
				//无缝
				if(Math.abs(this.landPlace)<=this.landImg){
					this.landPlace=0;
				}
			}			
			if(Math.abs(this.landPlace)>=this.landWidth){
				this.landPlace=0;
			}
		}
	};
	Fly.Land=Land;
})(Fly)