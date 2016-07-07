$(window).on('load',function(){
	waterFall();//运行主函数
	var dataInt = {"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"}]};//设置后续数据来源
	var oFragment = document.createDocumentFragment();//创建文件碎片
	$(window).scroll(function(){
		//检查是否需要加载图片
		console.log(checkScroll());
		if (checkScroll()) {
			$.each(dataInt.data,function(index,element){
				var $oImg = $('<img></img>').attr('src','./images/'+dataInt.data[index].src);
				var $oBox = $('<div></div>').addClass('box').append($oImg);
				var $oPin = $('<div></div>').addClass('pin').append($oBox);
				var oFra = oFragment.appendChild($oPin[0]);
				$('#main').append(oFragment);
			})//如果按这个顺序插入还有必要使用文件碎片吗？
			waterFall();
		};
	})
	
	//封装主函数
	function waterFall(){
		//var $oPins = $('#wrap .pin');//这样写会有bug，可能是ID选择后接类会有问题?
		var $oPins = $('#main>div');//获取图片集
		var $oPinW = $oPins.eq(0).outerWidth();//获取单张图片宽度
		var num = Math.floor($(window).width()/$oPinW);//计算每行图片数量
		$('#main').css({'width':$oPinW*num+'px'});//设置包裹层宽度，实现居中对齐
		var pinsHarr = [];//初始化数组，用于存储每列图片的高度
		$.each($oPins,function(index,element){
			if (index < num) {
				pinsHarr.push($oPins.eq(index).outerHeight());//把高度值存入数组
			}else{
				var pinHmin = Math.min.apply(null,pinsHarr);//计算同一行中图片高度的最小值
				var minIndex = $.inArray(pinHmin,pinsHarr);//获取最小高度图片的索引
				$(element).css({
					'position':'absolute',
					'top':pinHmin,
					'left':$oPinW*minIndex
				})//设置下一张图片的相关样式
			}
			pinsHarr[minIndex] += $oPins.eq(index).outerHeight();//更新最小高度列的高度值
		})
	}

	//封装检测是否加载图片的函数
	function checkScroll(){
		var lastOne = $('#main>div').last();//获取最后一张图片
		var toChangeH = lastOne.offset().top + lastOne.outerHeight()/2;//计算临界高度
		var nowH = $(window).height() + $(window).scrollTop();//计算实际高度
		return toChangeH < nowH?true:false;//根据比较结果返回相应布尔值
	}
})