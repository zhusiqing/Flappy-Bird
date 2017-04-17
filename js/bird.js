(function(Fly){
	"use strict";
	var Bird=function(picObjs){
		this.birdImg=picObjs.birds;
		//bird的宽高
		this.imgWidth=this.birdImg.width/3;
		this.imgHeight=this.birdImg.height;
		//初始x坐标
		this.birdX=50;
		//当前帧
		this.frame=0;
		//速度
		this.speed=0;
		//最大速度
		this.maxSpeed=0.5;
		//加速度
		this.a=0.0005;
		//当前高度
		this.curHeight=100;
		//初始帧的时间
		this.oldFrameTime=new Date();
		//当前角度
		this.curAngle=0;
		//最大角度
		this.maxAngle=45;

		// this.birdMove();
		this.birdFly();
	};
	Bird.prototype={
		constructor:Bird,
		birdMove:function(){
			var ctx=Fly.ctx;
			ctx.save();
			//当前帧
			var curFrameTime=new Date();
			//两帧时间差
			var frameTime=curFrameTime-this.oldFrameTime;
			//保存当前帧的时间
			this.oldFrameTime=curFrameTime;
			//当前速度
			this.speed+=this.a*frameTime;
			//速度限制
			if(this.speed>=this.maxSpeed){
				this.speed=this.maxSpeed;
			}
			//当前高度
			this.curHeight+=this.speed*frameTime+0.5*this.a*Math.pow(frameTime,2);
			//this.curHeight+=0.5*this.a*Math.pow(frameTime,2);
			//根据当前速度改变角度
			this.curAngle=this.speed/this.maxSpeed*this.maxAngle;
			//将坐标轴原点移动到bird中心
			ctx.translate(this.birdX+this.imgWidth, this.curHeight+this.imgHeight);
			//旋转
			ctx.rotate(this.toRadian(this.curAngle));
			//描绘
			ctx.drawImage(this.birdImg, this.frame*this.imgWidth, 0,this.imgWidth,this.imgHeight,this.imgWidth/-2,this.imgHeight/-2,this.imgWidth,this.imgHeight);
			ctx.restore();
			//当前帧数加1
			this.frame++;
			if(this.frame>=3){
				this.frame=0;
			}
		},
		birdFly:function(){
			var that=this;
			//点击跳动
			// window.onmousedown=function(){
			// 	that.speed=-0.3;
			// }
			document.addEventListener("mousedown",function(){
				that.speed=-0.3;
			});
			document.addEventListener("touchstart",function(){
				that.speed=-0.3;
			});
		},
		//角度转弧度
		toRadian:function (angle) {
        	return angle / 180 * Math.PI;
        	
    	}
	};
	Fly.Bird=Bird;
})(Fly)