(function(window){
	"use strict";
	//全局对象
	var Fly={};
	Fly.createCv=function(id){
		var cv=document.createElement("canvas");
		cv.width=800;
		cv.height=600;
		cv.style.border = '1px solid gray';
		var bd=document.getElementById(id);
		bd.appendChild(cv);
		var ctx=cv.getContext("2d");
		return ctx;
	}
	//图片加载状态判断函数
	Fly.loadImgs=function(picList,callback){
		//记录加载完成的个数
		var loadedCount=0;
		//存放图片信息的对象
		var picObjs={};
		//获取当前图片个数
		var picLength=picList.length;
		//循环设置图片地址，并存放到一个对象中返回
		picList.forEach(function(val){
			//拼接地址
			var picSrc="imgs/"+val+".png";
			//创建图片对象
			var img=new Image();
			img.src=picSrc;
			picObjs[val]=img;
			img.onload=function(){
				loadedCount++;
				if(loadedCount>=picLength){
					callback(picObjs);
				}
			};
		});
	}
	
	window.Fly=Fly;
})(window)