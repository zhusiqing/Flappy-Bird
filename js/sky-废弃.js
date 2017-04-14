(function (window) {
	"use strict";
	function Sky(ctx1,oldTime){
	   
       this.variable();
       this.skyMove(ctx1,oldTime,this.skyX);
	}
	Sky.prototype={
		variable:function(){
			this.skyX=0;
       		window.skyWidth=sky.width;
       		window.skyHeight=sky.height;
		},
		skyMove:function(ctx1,oldTime,skyX){
			var that=this;
			(function render(){
	            ctx1.save();
	            ctx1.clearRect(0, 0, cv1.width, cv1.height);
	            ctx1.drawImage(sky, skyX-=worldStep, 0);
	            var secondSky=skyX;
	            ctx1.translate(skyWidth, 0);
	            ctx1.drawImage(sky, secondSky, 0);
	            if(Math.abs(secondSky)>=sky.width){
	                skyX=0;
	            }
	            ctx1.restore();
	            if(b.birdHeight<=0||b.birdHeight>=cv.height){
	                    return;
	                }
	            requestAnimationFrame(render);
        	})();
		}
	};
	window.Sky=Sky;
})(window)