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
        }else{
	        this.canvx.fillText(d.text, d.l, d.t);  
        }
		this.drawing( n + 1 );

	},
	canvas_img: function(d, n){
		var img = new Image;
		img.crossOrigin = 'Anonymous'; //解决跨域
		img.src = d.url;
		var _this = this;
		if(d.rotate) this.canvx.rotate( d.rotate * Math.PI / 180);
		img.onload = function(){
			if(d.repeat){
				_this.canvx.fillStyle = _this.canvx.createPattern(img, d.repeat);
				_this.canvx.fillRect(d.repeat_l, d.repeat_t, _this.c.width, _this.c.height);
			}
			_this.canvx.drawImage(img, d.l, d.t, d.w, d.h);
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
		var over_img1 = this.c.toDataURL("image/jpeg");
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