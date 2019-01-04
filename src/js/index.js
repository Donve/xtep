$(document).ready(function(){

	//购物车


	//gotop
	$(".gotop").on("click",function(){
		$("html").stop().animate({"scrollTop":0},1000);
	})

	//购物车数量
	showcart();
	//显示用户名
	$("#posi .store").on("mouseenter","a",function(){
		$("#posi .wdright h2").html($(this).html());
	})
	
	//轮播图
	{
		$lunbos =$("#lunbo img");
		$lunbobt = $("#lunbo li");
		var index = 0;
		autoplay();
		var timer = setInterval(autoplay,3000);
		function autoplay(){
			if (index >= $lunbos.size()) {
				index = 0;
			}
			// console.log(index)
			$lunbobt.eq(index).addClass('on').siblings().removeClass();
			$lunbos.eq(index).addClass("active").fadeIn(800).siblings().not("ul,span").fadeOut(800).removeClass();
			index++;
		}
		$lunbobt.mouseenter(function() {
			index = $(this).index();
			clearInterval(timer);
			// console.log(index);
			autoplay();
		}).mouseleave(function() {
			timer = setInterval(autoplay,3000);
		});
		$lunbos.mouseenter(function() {
			clearInterval(timer);
			index = $(this).index();
			// console.log(index)
			// autoplay();
		}).mouseleave(function() {
			timer = setInterval(autoplay,3000);
		});

	}
	
	//吸顶
	$(function(){
		var $offsetTop=$("#nav").offset().top;
		$(window).scroll(function(){
			var $high=$(window).scrollTop();
			if($high>=$offsetTop){
				$("#nav").css({
					"position":"fixed",
					"top":"0"
				})
			}else{
				$("#nav").css("position","static")
			}
		})
	})
	
//放大镜

/*

{
	/*
		思路
			1、鼠标移入移出到 small上  显示和隐藏mask、big
			2、鼠标在small上移动时， 设置mask跟随鼠标移动
			3、大图随着mask的反方向移动
		* */
		$small=$("#small");
		$mask=$("#mask");
		$big=$("#big");
		$box=$("#box");
		$bigImg=$("#bigImg");
		$small.mouseover(function(e){
			$mask.css("display","block");
			$big.css("display","block");
		}).mouseout(function(){
			$mask.css("display","none")
			$big.css("display","none")
		}).mousemove(function(e){
			$x = e.pageX - ($mask.offset().width)/2 - $box.offset().left;
			$y = e.pageY - ($mask.offset().height)/2 - $box.offset().top;
			//获取mask的最大的left和top值
			$maxL = $box.offset().width - $mask.offset().width ;
			$maxT = $box.offset().height - $mask.offset().height ;
			
			//边界处理
			$x = $x < 0 ? 0 : ( $x > $maxL ? $maxL : $x );
			$y = $y < 0 ? 0 : ( $y > $maxT ? $maxT : $y );
			
			//获取大图向左和向上移动的距离 x1  y1
			//大图移动的距离x1/(大图宽度-大图可视区宽度)  =  mask移动的距离 / (小图宽度-mask宽度)
			//如果保证mask的放大区域 准确的显示到 大图显示区中，存在一个比例关系：
			//  小图显示区的宽度 /大图显示区的宽度  = 小图宽度/大图宽度  = mask移动的距离/大图移动的距离
			/*var x1 = x*(bigImg.offsetWidth-big.offsetWidth)/(box.offsetWidth - mask.offsetWidth);
			var y1 = y*(bigImg.offsetHeight-big.offsetHeight)/(box.offsetHeight - mask.offsetHeight);
			*/	
			
			$x1 = $x*($bigImg.offset().width)/($box.offset().width);
			$y1 = $y*($bigImg.offset().height)/($box.offset().height);
	
			//设置mask的left和top值
			$mask.css("left",x + "px");
			$mask.css("top",y + "px");
			//设置大图移动的距离left 和 top  方向和mask相反
			$bigImg.css("left ",-$x1 + "px");
			$bigImg.css("top" , -$y1 + "px")
		})


// $(".htleft a").eq(2).html(`退出登录`);



})//onload 结束标签

