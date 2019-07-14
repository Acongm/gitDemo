/* 
     * json.js v2.0.0 (2019-07-11 11:25:14)',
     * User: acongm',
     * description: 戴妃学院公众号项目',
     * Licensed under the ISC license',
*/
var user_img = {
	w: 470,
	h: 619,
	l: 128,
	t: 120,
};
var data_list1 = [{url:"/postermodel/2019/07/02/jpg/201907021217184.jpg",l:0,t:0,w:750,bar: 1,h:468,size:'cover',full:'full',type:'img'},{url:"/userPhoto/2019/05/31/jpg/2019053118293242.jpg",l:1221,t:121,w:12,h:12,type:'img'},{text:"末那大叔",l:211,t:121,w:121,h:"2DED43,2DED43,2DED43",type:'text'},{url:"/userPhoto/2019/05/31/jpg/2019053118293242.jpg",l:1212,t:121,w:12,h:12,type:'img'}]
var data_list = [
	{
		// 画布底色
		color: "#fff",
		type: "fill"
	},
	{
		// 绘制矩形,选择旋转
		color: "#000",
		l: 73,
		t: 101,
		w: 590,
		h: 724,
		rotate: -1,
	// 	rotate: 1,
		type: "rect"
	},
	{
		// 绘制普通图片
		// url: "./img/icon1.png",
		url: "../static/images/teacher_bg.png",
		l: 312,
		t: 766,
		w: 148,
		h: 54,
		type: "img"
	},
	{
		// 绘制用户头像图片 radius表示圆角图片
		// url: "./img/canvas4.png",
		url: "../static/images/teacher_bg.png",
		l: 128,
		t: 140,
		w: 170,
		h: 119,
		name: "radius",
		type: "img"
	},
	{
		// 绘制背景图片
		// cover表示平铺展开, auto表示宽高自适应展开
		url: "../static/images/teacher_bg.png",
		l: 0,
		t: 0,
		w: 750,
		h: 374,
		full: "full",
		size:'cover',
		type: "img"
	},

	{
		// 绘制文字, 超过一行自动换行,需设置宽高
		text: "1相信每个人有许多话不好意思当面讲\n特别是内敛的人/总是不会亲口对妈妈讲\n借母亲节/对妈妈来一次不同的表白~",
		color: "#f63270",
		font: "24px Microsoft JhengHei,STHeiti",
		l: 124,
		t: 100,
		w: 480,
		h: 42,
		type: "text"
	},
	{
		// 普通绘制文字, 可设置文字对齐方式
		text: "女人的幸福密码",
		color: "#666",
		font: "24px Microsoft JhengHei,STHeiti",
		t: 290,
		aline: "center",
		type: "text"
	}
];
