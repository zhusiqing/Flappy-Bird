(function(Fly){
	"use strict";
	var Pipe=function(picObjs){
		this.pipeUp=picObjs.pipe2;
		this.pipeDown=picObjs.pipe1;
		//上下管道之间的固定间隔
		this.pipeSpace=120;
		//上管道的y坐标
		this.pipeUpY=-280;  
		//下管道的y坐标
		this.pipeDownY=0;
		//上管道图片高
		this.pipeUpHeight=this.pipeUp.height;
		//管道图片宽度
		this.pipeWidth=this.pipeUp.width;
		//管道的x坐标
		this.pipeX=350;
		//左右管道之间的距离
		this.pipeSpaceX=this.pipeWidth*3;
		//存放随机y值的数组
		this.arr=[];
		//锁定随机数组
		this.flag=true;
	};
	Pipe.prototype={
		constructor:Pipe,
		pipeMove:function(worldStep){
			var ctx=Fly.ctx;
			//判断是否改变数组
			if(this.flag){
				for(var i=0;i<7;i++){
					//随机y值的范围  (this.pipeUpY)  -150  -350
					this.pipeUpY=Math.floor(-150*Math.random())-150;
					this.arr.push(this.pipeUpY);
				}
					this.flag=false;
				}
			this.pipeX-=worldStep;
			ctx.beginPath();
			//描绘
			for(var i=0;i<7;i++){
				//设置固定间隔
				this.pipeDownY=this.arr[i]+this.pipeUpHeight+this.pipeSpace;
				ctx.rect(this.pipeX+i*this.pipeSpaceX, this.arr[i], this.pipeWidth, this.pipeUpHeight);
				ctx.drawImage(this.pipeUp, this.pipeX+i*this.pipeSpaceX, this.arr[i]);
				ctx.rect(this.pipeX+i*this.pipeSpaceX, this.pipeDownY, this.pipeWidth, this.pipeUpHeight);
				ctx.drawImage(this.pipeDown, this.pipeX+i*this.pipeSpaceX, this.pipeDownY)
			}
			//判断管道是否已经隐藏，隐藏就改变数组，同时无缝连接
			if(this.pipeX<=(this.pipeSpaceX*-1-this.pipeWidth)){
				this.pipeX=this.pipeWidth*-1;
				this.arr.shift();
				this.arr.push(Math.floor(-150*Math.random())-200);
			}
		}
	};
	Fly.Pipe=Pipe;
})(Fly)