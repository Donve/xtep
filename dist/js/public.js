//函数封装
//支持完美运动和前面的几个运动
//obj  代表 操作的元素
//json  代表要操作的多个属性和目标值
//callback  代表一个函数  当一个函数作为参数时，这样的参数叫做 回调函数
function startMove( obj , json , callback ){
	clearInterval( obj.timer );
	obj.timer = setInterval( function(){
		var flag = true;//假设值为 true时 可以停止定时器
		for( var attr in json ){
			var current = 0;//用于接收非行内元素样式值
			if( attr == "opacity" ){
				current = parseFloat( getStyle(obj,attr) ) * 100;
			}else if( attr == "zIndex" ){
				current = parseInt( getStyle(obj,attr) ) ;
			}else{
				current = parseInt( getStyle(obj,attr) ) ;//获取元素的实际样式值
			}
			
			var speed = (json[attr] - current)/10;
			speed = speed>0?Math.ceil(speed) : Math.floor(speed);
			if( json[attr] != current ){
				flag = false;//没有达到目标值  flag要做改变
			}
			
			//没有达到目标值 继续设置运动物体的样式改变
			if( attr == "opacity" ){
				obj.style["opacity"] = (current + speed)/100;
			}else if( attr == "zIndex" ){
				obj.style[attr] = json[attr];
			}else{
				obj.style[attr] = current + speed + "px";
			}
		}

		if( flag ){//达到目标值
			clearInterval( obj.timer );
			//进入到下一个动作（可变功能）
			if( callback ){
				callback();
			}
		}
	},30 )
}


//获取非行内元素样式值
//attr参数表示 样式属性
//obj  表示操作的元素
function getStyle(obj,attr){
	if( getComputedStyle ){
		return window.getComputedStyle(obj,false)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}


//1. 淡入淡出轮播图封装
//$imgs是轮播的图片
//$dots
//t 是时间
function lunbo($imgs,t,$dots){
	var index = 0;
	autoplay();
	var timer = setInterval(autoplay,t);
	function autoplay(){
		if (index >= $imgs.size()) {
			index = 0;
		}
		if ($dots) {
			$dots.eq(index).css("background","pink").siblings().css("background","");
		}

		$imgs.eq(index).fadeIn("slow").siblings('img').fadeOut("slow");
		// $imgs.eq(index).css("display","block").siblings('img').css("display","none");
		index++;
	}
}




//函数封装
//1. 淡入淡出轮播图封装
//$imgs是轮播的图片
//$dots
//t 是时间
function lunbo2($xxk,t){
	var ind = 0;
	var timer2 = setInterval(autoplay2,t);
	// console.log(autoplay2)
	function autoplay2(){
		if (ind == $xxk.size()) {
			ind = 0;
		}
		$xxk.eq(ind).css("color","#000").siblings().css("color","#fff");
		ind++;
	}
	$xxk.mouseenter(function(){
		clearInterval(timer2);
	}).mouseleave(function(){
		ind = $(this).index();
		autoplay2();
		timer2 = setInterval(autoplay2,t);
	});
}


//封装函数，显示购物车里面的内容
function showcart(){
	var procount =0;
	$(".gwclist").html(" ");
	if (localStorage.prolist) {
		var brr = JSON.parse(localStorage.prolist);
		if (brr) {
			for(var i = 0 ; i < brr.length ; i++){	
				if (brr[i].count>0) {
					procount += brr[i].count;
					var $li = $("<li>");
					var str = `<li>名称：${brr[i].pname}<span> 数量：${brr[i].count}</span></li>`;
					$li.html(str);
					$(".gwclist").append($li);
					$(".gwclist").css("z-index",9)
				}			
			}
		}
		
		$(".procount").html(procount);				
	}

//显示用户名
	function fn(){
		// console.log("自己执行");
		// console.log(localStorage.username);
		if (localStorage.username) {
			// console.log($(".hrleft a").eq(0));
			$(".htleft a").eq(0).html(localStorage.username);
			$(".htleft a").eq(1).html(`您是普通会员`);
			$(".htleft a").eq(2).html(`退出登录`);
		}
	}
	setTimeout(fn,200);
//转向购物车
	$(".gwc").click(function(){
		location.href="../html/cart.html";
	})

	//退出登录
	$(".htleft a").eq(2).on("click",function(){
		if ($(".htleft a").eq(2).html()=="注册") {
			// console.log("注册！！！");
			location.href = "../html/register.html";
		}else{
			var username = localStorage.username;
			var prolist = localStorage.prolist;
			if (!prolist) {
				prolist = 'null';
			}
			$.ajax({
				type:"get",
				url:`http://10.9.26.196/phpmine/save.php?username=${username}&prolist=${prolist}`,
				success:function(msg){
					localStorage.clear();
					location.href = "../html/login.html"
				}
			})
		}
	})
}



//cookie的封装
//  value值  类型是一个  对象
function setCookie(key,value,days){
	if( days ){
		var now = new Date();
		now.setTime(now.getTime() + days*24*60*60*1000 ) 
		document.cookie=key+"="+value + ";path=/;expires="+now;
	}else{
		document.cookie=key+"="+value;
	}
}
function getCookie(key){
	//如果cookie中有数据  才可以获取数据
	if(document.cookie){		
		var cookieInfo = document.cookie;
		//cookie中可能会包含一些 额外的数据，这些数据特点是由   分号和空格间隔的
		//所以 先将 分号和空格  替换掉   替换成  ;
		var arr = cookieInfo.replace(/;\s/g,';').split(";");	
		for(var i=0;i<arr.length;i++){
			item = arr[i].split("=");
			if(item[0] == key){
				brr = item[1];
				return JSON.parse(brr);//如果找到 我们想要的键，将值转成数组返回 
			}
		}
		//如果cookie中 没有我们想获取的键值，直接返回一个空数组
		return [];
	}
	//如果cookie中没有数据，直接返回一个空数组
	return [];
}
function removeCookie(key){
	setCookie(key,"",-1);
}


