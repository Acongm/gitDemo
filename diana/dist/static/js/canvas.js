/* 
     * canvas.js v2.0.0 (2019-07-11 11:25:14)',
     * User: acongm',
     * description: 戴妃学院公众号项目',
     * Licensed under the ISC license',
*/
// 绘制圆角图片
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    var min_size = Math.min(w, h);
    if (r > min_size / 2) r = min_size / 2;
    // 开始绘制
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.stroke();
    this.closePath();
    return this;
}
// 画圆封装了一个简单的方法
function circleImg(ctx, img, x, y, r) {
	ctx.save();
	var d =2 * r;
	var cx = x + r;
	var cy = y + r;
	ctx.arc(cx, cy, r, 0, 2 * Math.PI);
	ctx.clip();
	ctx.drawImage(img, x, y, d, d);
	ctx.restore();
}
function Canvas(opt){
	this.opt = opt || {};
	this.w = this.opt.w || 320;
	this.h = this.opt.h || 200;

	this.tim1 = "";
	this.tim2 = '';
}
Canvas.prototype = {
	drawing: function(n){
		var d = this.data[n];
		if(n < this.len){
			this.canvas_files(d, n)
		}else{
			this.canvas_over();
		}
	},
	canvas_files: function(d, n){
		switch(d.type){
			// 绘制文字
			case 'text':
				return this.canvas_text(d, n);
			// 绘制图片
			case 'img':
				return this.canvas_img(d, n);
			// 绘制背景颜色
			case 'fill':
				return this.canvas_fill(d, n);
			// 绘制矩形实心
			case 'rect':
				return this.canvas_rect(d, n);
			// 绘制矩形空心
			case 'rect_stroke':
				return this.canvas_rect_stroke(d, n);
		}
	},
	canvas_fill: function(d, n){
		this.canvx.fillStyle = d.color;  
	    this.canvx.fillRect(0,0,this.w,this.h);  
		this.drawing( n + 1 );
	},
	canvas_text: function(d, n){
		this.canvx.fillStyle = d.color;  
        this.canvx.font = d.font;
        // this.canvx.textBaseline = "middle";  
        if(d.w){
        	this.drawText(d.text, d.l, d.t, d.w, d.h); 
        }else if(d.aline){
        	this.drawTextAline(d.text,d.t, d.aline); 
        }
		this.drawing( n + 1 );

	},
	canvas_img: function(d, n){
		var img = new Image;
		img.crossOrigin = 'Anonymous'; //解决跨域
		// img.setAttribute('crossOrigin', 'Anonymous');
		img.src = d.url;
		var _this = this;
		if(d.rotate) this.canvx.rotate( d.rotate * Math.PI / 180);
		img.onload = function(){
			if(d.repeat){
				_this.canvx.fillStyle = _this.canvx.createPattern(img, d.repeat);
				_this.canvx.fillRect(d.repeat_l, d.repeat_t, _this.c.width, _this.c.height);
			}
			if(d.name=='radius'){
				circleImg(_this.canvx, img, d.l, d.t, d.w)
			}else{
				if(d.full=="full"){
					console.error(d.size)

					let bar = d.bar||1;
					let w = _this.w*bar;
					let h = (d.size == "cover"?d.h:(d.h/d.w*w));
					let l = (_this.w-w)/2;
					let t = d.t;
					_this.canvx.drawImage(img, l, t, w, h);
					// _this.canvx.drawImage(img, d.l, d.t, d.w, d.h);
				}else{
					_this.canvx.drawImage(img, d.l, d.t, d.w, d.h);
				}
			}
			_this.drawing( n + 1 );
		}
	},
	canvas_rect: function(d, n){
		this.canvx.fillStyle = d.color;
		if(d.rotate) this.canvx.rotate( d.rotate * Math.PI / 180);
		this.canvx.fillRect(d.l, d.t, d.w, d.h);
		this.drawing(n + 1);
	},
	canvas_rect_stroke: function(d, n){
		this.canvx.lineWidth = d.lw; 
		this.canvx.strokeStyle = d.color; 
		this.canvx.strokeRect(d.l, d.t, d.w, d.h); 
		this.drawing(n + 1);
	},
	// 
	canvas_over: function(){
		this.canvx.stroke();
		var _this = this;
		var over_img1 = this.c.toDataURL("image/jepg");
		$(".canvas-img img").attr("src", over_img1);
		this.tim2 = new Date();
	},
	 /* 绘制文字 */
	drawText: function(t,x,y,w,h){
		/****绘制自动换行的字符串****/
	    var chr = t.split("");
	    var temp = "";              
	    var row = [];
	    var lin_ind = 0;
	    chr.map((item, index)=>{
	    	if( this.canvx.measureText(temp).width < w ){
	            ;
	        }else{
	            row.push(temp);
	        	lin_ind = 0;
	            temp = "";
	        }
	        if(item === "\n"&&temp.length!==0){
        		lin_ind = 0;
        		row.push(temp);
            	temp = "";
			   	;
	        }
	        if(lin_ind===0&&(item === "，"||item === "。")){
			    	;
	        }else{
		        temp += item;
	        }
	    })
	    lin_ind = 0;
	    row.push(temp);
	    row.map((item, index)=>{
	        this.canvx.fillText(item, x, y + (index + 1) * h);
	    })
	},
	drawTextAline(t, y, aline){
		let w = this.w;
		let x = 0;
		if(aline=="center"){
	    	if( this.canvx.measureText(t).width < w*.8 ){
	    		x = (w - this.canvx.measureText(t).width)/2
	    		this.canvx.fillText(t, x, y);
	    	}else{
	    		this.drawText(t,w*.1,y,w*.8, 30)
	    	}
		}

	},

	start: function(data, Id){
		this.c = Id;
		this.data = data;
		this.len = this.data.length;
		this.canvx = this.c.getContext('2d');
		this.c.width = this.w;
		this.c.height = this.h;
		this.canvx.clearRect(0, 0, this.w, this.h);
		this.drawing(0);
	},
	auto_wh: function(data, Id, ind, user_img, fn){
		this.tim1 = new Date();
		var da_img = data[ind]; 
		if(da_img.url){
			var img_url = da_img.url + '?' + Date.parse(new Date());
			// 创建对象
			var img = new Image();
			var _this = this;
			img.src = img_url;
			// 改变图片的src
			img.onload = function(){
				var img_bar = user_img.w/user_img.h;
			    var img_bar1 = img.width/img.height;
			    	if(img_bar1>img_bar){
			    		da_img.w = user_img.w;
			    		da_img.h = user_img.w / img_bar1;
			    		da_img.t = user_img.t + (user_img.h - da_img.h) / 2;
			    	}else{
			    		da_img.h = user_img.h;
			    		da_img.w = user_img.h * img_bar1;
			    		da_img.l = user_img.l + (user_img.w - da_img.w) / 2;
			    	}
			    	data[ind] = da_img;
			    	if(fn){
			    		fn();
			    	}
					_this.start(data, Id);
			}
		}
	}
};
/* 调用方法，前者调用画图，后者增加修改主图位置大小 */
// 直接绘制数据， 画板id
// Canx.start(data_list, c);
// 修改参数配置后绘制， 画板id， 主要图位于数据位置， 模板参数， 可添加函数
// Canx.auto_wh(data_list, c, 2, user_img);


/* 所需数据结构 */
/*var user_img = {
	w: 470,
	h: 619,
	l: 128,
	t: 120,
};
var data_list = [
	{
		color: "#fff",
		l: 73,
		t: 101,
		w: 590,
		h: 724,
		rotate: -1,
		type: "rect"
	}
]*/