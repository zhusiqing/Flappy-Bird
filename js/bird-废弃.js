/**
 * Created by 清 on 2017/4/9.
 */
(function(window){
    "use strict";
    var Bird=function(ctx,oldTime){
        //var img=new Image();
        //img.src="../imgs/birds.png";
        this.variable();
        this.birdMove(ctx,oldTime);
        var that=this;
        cv.addEventListener("mousedown",function(){
            that.speed=-0.3;
        });
    }
    Bird.prototype={
        constructor:Bird,
        variable:function(){
            this.imgW = bird.width / 3;
            this.imgH = bird.height;
            //帧数
            this.frame = 0;
            //加速度
            this.a = 0.0005;
            //速度
            this.speed = 0;
            //最大速度
            this.maxSpeed = 0.5;
            //当前时间
            this.currentTime;
            
            //两帧之间时间间隔
            this.intervalTime = 0;
            //bird当前高度
            this.birdHeight = 100;
            //当前旋转角度
            this.birdRotate = 0;
            //最大旋转角度
            this.maxRotate = 45;
        },

        birdMove:function(ctx,oldTime){
            var that=this;
            (function render() {
                var maxSpeed=that.maxSpeed;
                var a=that.a;
                that.currentTime = new Date();
                that.intervalTime = that.currentTime - oldTime;
                oldTime = that.currentTime;
                ctx.save();
                ctx.clearRect(0, 0, cv.width, cv.height);
                //当前速度
                that.speed = that.speed + a * that.intervalTime;
                //最大速度限制
                if (Math.abs(that.speed) >= maxSpeed) {
                    that.speed =that.speed>0? maxSpeed:-1*maxSpeed;
                }
                //当前高度
                that.birdHeight += that.speed * that.intervalTime + 0.5 * a * Math.pow(that.intervalTime, 2);
                //当前旋转角度
                that.birdRotate = that.speed / maxSpeed * that.maxRotate;
                ctx.translate(100,that.birdHeight);
                ctx.rotate(toRadian(that.birdRotate));
                ctx.drawImage(bird, that.frame * that.imgW, 0, that.imgW, that.imgH, -0.5*that.imgW, -0.5*that.imgH, that.imgW, that.imgH);
                ctx.restore();
                that.frame++;
                that.frame %= 3;
                // console.log(that.birdHeight);
                // console.log(cv.height);
                if(that.birdHeight<=0||that.birdHeight>=cv.height){
                    return;
                }
                requestAnimationFrame(render);
            })();
        }
    }
    window.Bird=Bird;
})(window)
