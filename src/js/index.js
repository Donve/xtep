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
	
	


// $(".htleft a").eq(2).html(`退出登录`);



})//onload 结束标签

