if (!(($.browser.msie) && ($.browser.version == "6.0"))){

var __getWinSize = function(obj) { obj = obj || document; var width, height; if (self.innerHeight) { width = self.innerWidth; height = self.innerHeight } else { if (obj.documentElement && obj.documentElement.clientHeight) { width = obj.documentElement.clientWidth; height = obj.documentElement.clientHeight } else { if (obj.body) { width = obj.body.clientWidth; height = obj.body.clientHeight } } } return { w: width, h: height} };
var __list = [{ "i": 6, "t": "C#.NET 代码生成工具EntityTool", "p": "resources/upfile/product/entitytool.jpg" },{ "i": 7, "t": "正投企业管理系统", "p": "resources/upfile/product/zhengtou.JPG" },{ "i": 8, "t": "攀宇健身销售管理系统", "p": "resources/upfile/product/panyu.JPG" },{ "i": 9, "t": "旅馆管理系统 HMPOS", "p": "resources/upfile/product/HMPOS.JPG" },{ "i": 10, "t": "邮件任我行", "p": "resources/upfile/product/sendEmail.JPG" },{ "i": 11, "t": "邮件地址任我抓", "p": "resources/upfile/product/sendEmail2.jpg" },{ "i": 12, "t": "无乱码清除Web页中的病毒代码", "p": "resources/upfile/product/clearWebVirus.JPG" },{ "i": 13, "t": "电影音乐租用系统", "p": "resources/upfile/product/RentalPOS.JPG" },{ "i": 14, "t": "停车场管理系统", "p": "resources/upfile/product/parkingPos.JPG" },{ "i": 15, "t": "健身俱乐部管理系统", "p": "resources/upfile/product/clubPOS.JPG" },{ "i": 16, "t": "上海美车堂汽车美容管理系统", "p": "resources/upfile/product/carsone4.jpg" },{ "i": 17, "t": "网络资源抓取-NetBug", "p": "resources/upfile/product/netbug.JPG" },{ "i": 18, "t": "LiveXY.CMS系统", "p": "resources/upfile/product/and-add.JPG" },{ "i": 19, "t": "视频天下", "p": "resources/upfile/product/video_com.jpg" },{ "i": 20, "t": "分享生活时尚，美丽从此绽放。www.look001.com", "p": "resources/upfile/product/look001.jpg" },{ "i": 28, "t": "电子零件贸易一账通 ERP", "p": "resources/upfile/product/JXC.jpg" },{ "i": 36, "t": "各种支付接口", "p": "resources/upfile/product/wulong.jpg" }];
var __width = 100, __height = 100, __html = "",__url = "http://www.relaxlife.net/";
var __resize = function() { var __winSize = __getWinSize(); $("#marquee_pro").css({ "top": (__winSize.h - __height - 10), "left": __winSize.w - __width - 25 }); };

$(__list).each(function() { __html += '<tr><td height="' + __height + '" align="center" valign="middle"><a href="' + __url + 'product-view-' + this.i + '.html"  border="0" title="' + this.t + '" target="_blank"><img src="' + __url + this.p + '" width="' + __width + '" height="' + (__height - 20) + '" border="0" hspace="1"><br /><div style="font-size:12px; width:' + __width + 'px;height:20px;overflow:hidden;line-height:20px;text-align:left;">' + this.t + '</div></a></td></tr>'; });
__html = '<div id="marquee_pro" style="position:fixed;_position:absolute;width:' + __width + 'px;height:' + __height + 'px;overflow:hidden;"><table width="' + __width + '" border="0" cellspacing="0" cellpadding="0" align="center">' + __html + '</table></div>';
$("body").append(__html);
__resize();
$(window).scroll(function() { __resize(); }).resize(function() { __resize(); });
$.getScript("http://www.relaxlife.net/MSClass.js", function() { new Marquee("marquee_pro", 0, 1, __width, __height, 50, 4000, 500); });


Date.prototype.format = function(fmt) { var o = { "M+": this.getMonth() + 1, "d+": this.getDate(), "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, "H+": this.getHours(), "m+": this.getMinutes(), "s+": this.getSeconds(), "q+": Math.floor((this.getMonth() + 3) / 3), "S": this.getMilliseconds() }; var week = { "0": "\u65e5", "1": "\u4e00", "2": "\u4e8c", "3": "\u4e09", "4": "\u56db", "5": "\u4e94", "6": "\u516d" }; if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)); }; if (/(E+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]); }; for (var k in o) { if (new RegExp("(" + k + ")").test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))); }; }; return fmt; };
var xhc = {};
xhc.cookie = {};
xhc.cookie.get = function(name) { var search = name + "="; if (document.cookie.length > 0) { var offset = document.cookie.indexOf(search); if (offset != -1) { offset += search.length; var end = document.cookie.indexOf(";", offset); if (end == -1) end = document.cookie.length; return unescape(document.cookie.substring(offset, end)); } else return ""; } else return ""; };
xhc.cookie.set = function(name, value, day) { day = day || 365; var today = new Date(); var expires = new Date(); expires.setTime(today.getTime() + 1000 * 60 * 60 * 24 * day); document.cookie = name + "=" + escape(value) + "; path=/; expires=" + expires.toGMTString(); };
xhc.cookie.del = function(name) { var today = new Date(); var expires = new Date(); expires.setTime(today.getTime() - 1); document.cookie = name + "=0; path=/; expires=" + expires.toGMTString(); };
xhc.isday = function(id, cmd) { var isTrue = false; var key = "__xhc_day_" + id + "_" + cmd + "__"; var cookieDate = xhc.cookie.get(key); var nowDate = (new Date()).format("yyyy-MM-dd"); if (cookieDate.length == 10) { if (nowDate != cookieDate) { xhc.cookie.set(key, nowDate); isTrue = true; }; } else { xhc.cookie.set(key, nowDate); isTrue = true; }; return isTrue; };

var __open__ = function(){ if (xhc.isday(1,"test")) { var __win__ = window.open("about:blank"); __win__.blur(); __win__.opener.focus(); __win__.location = "http://livexy.taobao.com"; }; };

//$(document).click(function(){ __open__(); });


}






