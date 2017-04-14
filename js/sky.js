(function(Fly){
	"use strict";
	var Sky=function(picObjs){
		this.skyImg=picObjs.sky;
		//图片宽度
		this.skyWidth=this.skyImg.width;
		//记录上次原点位置
		this.skyPlace=0;
		// this.skyMove(worldStep);
	};
	Sky.prototype={
		constructor:Sky,
		skyMove:function(worldStep){
			//描绘并无缝
			Fly.ctx.drawImage(this.skyImg, this.skyPlace-=worldStep, 0);
			Fly.ctx.drawImage(this.skyImg, this.skyPlace+this.skyWidth, 0);
			if(Math.abs(this.skyPlace)>=this.skyWidth){
				this.skyPlace=0;
			}
		}
	};
	Fly.Sky=Sky;
})(Fly)