window.onload=function(){ "use strict";
	/*var w=document.documentElement.clientWidth;
	var h=document.documentElement.clientHeight;*/
	var ww=320;
	var hh=480;

	var canvas=document.querySelector("#canvas");
	var box=document.querySelector(".box");
	var tu=document.querySelector("#tu");
	var ctx=canvas.getContext("2d");
	canvas.width=ww;
	canvas.height=hh;
	//小鸟
	var bird={
		x:140,
		y:220,
		w:40,
		h:40
	}
	var r;
	//管道
	var guandaos=
	[
	{
		top:{x:300,y:0,   w:70,h:150},
		bottom:{x:300,y:300,w:70,h:500}
	},
	{	
		top:{x:500,y:0,    w:70,h:120},
		bottom:{x:500,y:300,w:70,h:500}
	}
	]
	var kaishi=function(){


	 canvas.addEventListener('click',function(e){
    bird.y -= 20;
  },false);
  canvas.addEventListener('touchend',function(e){
    bird.y -= 20;
  },false);
	//画小鸟
	var aa=1;
		/////// 检测矩形之间的碰撞
		var recvsrec =  function(rect0,rect1){
			if (rect0.x >= rect1.x && rect0.x >= rect1.x + rect1.w) {
				return false;
			} else if (rect0.x <= rect1.x && rect0.x + rect0.w <= rect1.x) {
				return false;
			} else if (rect0.y >= rect1.y && rect0.y >= rect1.y + rect1.h) {
				return false;
			} else if (rect0.y <= rect1.y && rect0.y + rect0.h <= rect1.y) {
				return false;
			}
			return true;
		};
	var draw=function(){
		ctx.clearRect(0,0,ww,hh);
		aa+=0.05;
		bird.y+=aa;
		ctx.drawImage(tu,272,86,423,416,bird.x,bird.y,40,40);
		//ctx.fillRect(bird.x,bird.y,bird.w,bird.h);
		
		////////画管道
		var a;
		for(var i=0;i<guandaos.length;i++){
			var d=guandaos[i];
			d.top.x-=3;
			d.bottom.x-=3;
			var jb=ctx.createLinearGradient(0,0,d.top.w,d.top.h);
			jb=ctx.createLinearGradient(320,420,d.bottom.w,d.bottom.h);
			jb.addColorStop(0.3,"#514095");
			jb.addColorStop(1,"#12142d");
			ctx.fillStyle=jb;
			ctx.fillRect(d.top.x,d.top.y,d.top.w,d.top.h);
			ctx.fillRect(d.bottom.x,d.bottom.y,d.bottom.w,d.bottom.h);
			if(recvsrec(bird,d.top)||recvsrec(bird,d.bottom)){
				a=true;
			}
			if(a){
				alert("游戏失败！");
				return;
			}
			if(d.top.x<=-d.top.w){
				d.top.x=350;
				d.bottom.x=350;
				d.top.h=Math.floor(Math.random()*80+170);
				d.bottom.y=d.top.h+150;
			}
		}
		////////边界判断
		if(bird.y>=440){
			ctx.fillRect(140,440,bird.w,bird.h);
		}
		else if(bird.y<=0){
			ctx.fillRect(140,0,bird.w,bird.h);
		}
		else{
			window.requestAnimationFrame(draw);
		}
	}
	r=requestAnimationFrame(draw);

	canvas.onclick = function(){
		bird.y -=20;
		aa=1;
	}
	}
	kaishibtn.onclick=function(){
		this.style.display="none";
		kaishi();
	}
}







































