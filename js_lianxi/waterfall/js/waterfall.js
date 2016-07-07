window.onload = function(){
	waterFall('main','pin');//调用主函数
	var dataInt = {"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"}]};//设置后续数据来源
    window.onscroll = function(){
    	//检查是否满足加载图片的条件
    	if (checkScroll()) {
    		var doc = document;
    		//获取父元素，并创建文件碎片
		    var	oParent = doc.getElementById('main'),
	    	    oFragment = doc.createDocumentFragment();
	    	//把图片源中的图片动态添加到已创建的文件碎片中
    	    for (var i = 0,ilen = dataInt.data.length; i < ilen; i++) {
    	    	var oImg = doc.createElement('img');
    	    	oImg.src = './images/' + dataInt.data[i].src;
    	    	var oBox = doc.createElement('div');
		    	oBox.className = 'box';
		    	oBox.appendChild(oImg);
    	    	var oPin = doc.createElement('div');
    	    	oPin.className = 'pin';
    	    	oPin.appendChild(oBox);
    	    	oFragment.appendChild(oPin);
    	    	oParent.appendChild(oFragment);
			};
    	    waterFall('main','pin');
    	}
    }
}

//封装主函数
function waterFall(parentId,cls){
	var oParent = document.getElementById(parentId);//获取父元素
	var oPins = getByClass(oParent,cls);//获取图片元素集
	var pinW = oPins[0].offsetWidth;//获取子元素的宽度
	var clientW = document.documentElement.clientWidth;//获取页面宽度
	var num = Math.floor(clientW/pinW);//计算每一行的图片数量
	var pinsH = [];//用于存储每一列图片的高度
	oParent.style.width = pinW*num + 'px';//设置父容器的宽度，实现居中对齐
	for (var j = 0,jlen = oPins.length; j < jlen; j++) {
		if (j<num) {
			pinsH.push(oPins[j].offsetHeight);//把图片高度逐个添加到存储数组中
		}else{
			var minH = Math.min.apply(null,pinsH);//计算存储高度中的最小值
			var minIndex = getIndex(minH,pinsH);//获取最小高度对象的索引
			oPins[j].style.position = 'absolute';
			oPins[j].style.top = minH +'px';
			//oPins[j].style.left = oPins[minIndex].offsetLeft + 'px';
			oPins[j].style.left = minIndex*pinW + 'px';
			pinsH[minIndex] +=oPins[j].offsetHeight;//更新原最小高度值对应列的高度值
		}
	};
}

//封装通过父元素和元素的类获取元素集的函数
function getByClass(parent,cls){
	var children = parent.getElementsByTagName('*');//获取所有子元素
	var result = [];//初始化存储结果的数组
	for (var k = 0,klen = children.length; k < klen; k++) {
		var classname = children[k].className;
		if (classname === cls) {
			result.push(children[k]);//把满足条件的元素加入数组中保存
		}
	}
	return result;//返回数组
}
	
//封装获取数组索引的函数
function getIndex(value,arry){
	for (var m in arry){
		if (arry[m] === value) {
			return m;
		}
	}
}

//封装检查加载图片条件的函数
function checkScroll(){
	var oParent = document.getElementById('main');//获取父元素
	var oPins = getByClass(oParent,'pin');//获取图片元素集
	var lastOne = oPins[oPins.length-1];//最后一个图片
	var toChangeH = lastOne.offsetTop + Math.floor(lastOne.offsetHeight/2);//临界高度值
	var clientH = document.documentElement.clientHeight;//页面高度 
	var scrollH = document.documentElement.scrollTop||document.body.scrollTop;//滚动高度
	return (toChangeH<clientH+scrollH)?true:false;//如果超过临界高度，则返回true
}

