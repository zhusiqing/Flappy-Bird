(function(Fly){
	"use strict";
	var Game=function(){
		//获取图片名字的数组
		this.picList=["birds","land","pipe1","pipe2","sky"];
		//世界初始时间
		this.initTime=new Date();
		//当前世界时间
		this.currentTime=0;
		//时间差值
		this.timeLength=0;
		//时间秒的转换
		this.timeS=0;
		//世界进度
		this.worldStep=2;
		//判断游戏是否结束
		this.flag=true;
		
		
		//碰撞点检测
		this.f1=this.f2=this.f3=this.f4=this.f5=true;
	};
	Game.prototype={
		constructor:Game,
		//init
		init:function(picObjs){
			this.bObj=new Fly.Bird(picObjs);
			this.sObj=new Fly.Sky(picObjs);
			this.lObj=new Fly.Land(picObjs);
			this.pObj=new Fly.Pipe(picObjs);
		},
		//start
		gameStart:function(id){
			Fly.ctx=Fly.createCv(id);
			var that=this;
			Fly.loadImgs(this.picList,function(picObjs){
				that.init(picObjs);
				that.render();

			})
		},
		//end
		gameEnd:function(){
			//Game Over
			if(this.f1||this.f2||this.f3||this.f4||this.f5|| this.bObj.curHeight+this.bObj.imgHeight<=0|| this.bObj.curHeight+this.bObj.imgHeight>=Fly.ctx.canvas.height-this.lObj.landHeight){
				this.flag=false;
			}
		},
		//render
		render:function(){
			var that=this;
			(function draw(){
				var cv=Fly.ctx.canvas;
				Fly.ctx.clearRect(0, 0, cv.width, cv.height);
				that.sObj.skyMove(that.worldStep);
				that.pObj.pipeMove(that.worldStep);
				that.bObj.birdMove(that.worldStep);
				that.lObj.landMove(that.worldStep);
				//碰撞检测
				that.inPath();
				//time
				that.gameTime();
				//level
				that.gameLevel();
				//end
				that.gameEnd();

				if(that.flag){
					requestAnimationFrame(draw);
				}
			})();
		},
		//碰撞检测
		inPath:function(){
			var ctx=Fly.ctx;
				//右下
				this.f1=ctx.isPointInPath(this.bObj.birdX+this.bObj.imgWidth+10, this.bObj.curHeight+this.bObj.imgHeight+8);
				//右上
				this.f2=ctx.isPointInPath(this.bObj.birdX+this.bObj.imgWidth+10, this.bObj.curHeight+this.bObj.imgHeight-10);
				//右中
				this.f3=ctx.isPointInPath(this.bObj.birdX+this.bObj.imgWidth+10, this.bObj.curHeight+this.bObj.imgHeight);
				//中上
				this.f4=ctx.isPointInPath(this.bObj.birdX+this.bObj.imgWidth, this.bObj.curHeight+this.bObj.imgHeight-5);
				//中下
				this.f5=ctx.isPointInPath(this.bObj.birdX+this.bObj.imgWidth, this.bObj.curHeight+this.bObj.imgHeight+5);
		},
		//time
		gameTime:function(){
			var ctx=Fly.ctx;
			//当前世界时间
			this.currentTime=new Date();
			//历时
			this.timeLength=this.currentTime-this.initTime;
			this.timeS=Math.floor(this.timeLength/1000)<10?"0"+Math.floor(this.timeLength/1000):Math.floor(this.timeLength/1000);
			var timeM=Math.floor(this.timeS/60)<10?"0"+Math.floor(this.timeS/60):Math.floor(this.timeS/60);
			var timeText="历时"+timeM+"分"+this.timeS+"秒"+this.timeLength%1000;
			ctx.font="25px 微软雅黑";
			ctx.textBaseline="top";
			ctx.textAlign="left";
			ctx.fillStyle="red";
			ctx.fillText(timeText,ctx.canvas.width-210, 0);
		},
		//level
		gameLevel:function(){
			var ctx=Fly.ctx;
			//速度升级！！！
			if(this.timeS%30==0&&this.timeS>2){
				this.worldStep+=0.01;
				ctx.fillText("是不是已经习惯这个速度了？",250,30);
				ctx.fillText("那就加速吧！！",320,60);
			}
		}
	};
	Fly.Game=Game;
})(Fly)