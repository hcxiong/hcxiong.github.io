<!--
/*MSClass (Class Of Marquee Scroll通用不间断滚动JS封装类) Ver 1.4*\

　制作时间:2006-08-29 (Ver 0.5)
　发布时间:2006-08-31 (Ver 0.8)
　更新时间:2006-12-11 (Ver 1.4)
　更新说明: + 加入功能 * 修正、完善
	1.4.061211
		+ 鼠标悬停改变滚动方向 (鼠标悬停控制左右滚动)
		* 由于文档下载过慢而导致获取的高度/宽度不准确
		* 浏览器兼容问题 (IE、FF、Opera、NS、MYIE)
	1.2.060922
		+ 指定范围间歇滚动
		* 程序调整
		* 连续间歇滚动停止的错误
	1.0.060901
		+ 向下、向右滚动
		+ 开始等待时间
		+ 连续滚动
		* 调整时间单位
		* 滚动误差
		* 随机死循环
		* 加强性能
		* 程序优化
	0.8.060829
		  翻屏不间断向上、向左滚动

　演示地址:http://www.popub.net/script/MSClass.html
　下载地址:http://www.popub.net/script/MSClass.js

　应用说明:页面包含<script type="text/javascript" src="MSClass.js"></script>

	创建实例:new Marquee("marquee",0,1,760,52,50,5000,3000)
		 new Marquee("marquee",0,1,760,104,50,5000,3000,52)

	参数说明:marquee	容器ID
		 0		向上滚动(0向上 1向下 2向左 3向右)
		 1		滚动的步长(数值越大,滚动越快)
		 760		容器可视宽度
		 52		容器可视高度
		 50		定时器(数值越小,滚动的速度越快 1000=1秒,建议不小于20)
		 5000		间歇停顿延迟时间(0为不停顿,1000=1秒)
		 3000		开始时的等待时间(0为不等待,1000=1秒)
		 (52)		间歇滚动间距(可选,该数值与延迟均为0则为鼠标悬停控制)
　使用建议:
		1、建议直接赋予容器的显示区域的宽度和高度，如(<div id="marquee" style="width:760px;height:52px;">......</div>)
		2、建议为容器添加样式overflow = auto，如(<div id="marquee" style="width:760px;height:52px;overflow:auto;">......</div>)
		3、为了更准确的获取滚动区域的宽度和高度，请尽可能将各滚动单位直接赋予正确宽高度
		4、对于TABLE标记的横向滚动，需要对TABLE添加样式display = inline，如(<div id="marquee" style="width:760px;height:52px;overflow:auto;"><table style="display:inline">......</table></div>)
		5、对于翻屏滚动或间歇滚动，要注意各滚动单位间的间距，同时需要对容器的可视高度和可视宽度做好准确的设置，对于各滚动单位间的间距可以通过设置行间距或者单元格的高宽度来进行调整
		6、对于LI自动换行的问题暂时没有更好的解决办法，建议将其转换成表格(TABLE)的形式来达到同等的效果

\***程序制作/版权所有:崔永祥(333) E-Mail:zhadan007@21cn.com 网址:http://www.popub.net***/


function Marquee()
{
	this.ID = document.getElementById(arguments[0]);
	this.Direction = arguments[1];
	this.Step = this.BakStep = arguments[2];
	this.Width = arguments[3];
	this.HalfWidth = Math.round(arguments[3] / 2);
	this.Height = arguments[4];
	this.Timer = arguments[5];
	this.DelayTime = arguments[6];
	this.WaitTime = arguments[7];
	if(arguments[8] || arguments[8]==0)
		this.ScrollStep = arguments[8]
	else
		this.ScrollStep = this.Direction > 1 ? this.Width : this.Height;
	this.Correct = this.CTL = this.StartID = this.Stop = this.MouseOver = 0;
	this.ID.style.overflow = this.ID.style.overflowX = this.ID.style.overflowY = "hidden";
	this.ID.noWrap = true;
	this.ID.style.width = this.Width;
	this.ID.style.height = this.Height;
	this.ClientScroll = this.Direction > 1 ? this.ID.scrollWidth : this.ID.scrollHeight;
	this.ID.innerHTML += this.ID.innerHTML;
	this.IsNotOpera = (navigator.userAgent.toLowerCase().indexOf("opera") == -1);
	if(arguments.length >= 8)this.Start(this,this.Timer,this.DelayTime,this.WaitTime);
}

Marquee.prototype.Start = function(msobj,timer,delaytime,waittime)
{
	msobj.StartID = function(){msobj.Scroll()}
	msobj.Continue = function()
				{
					if(msobj.MouseOver == 1)
					{
						setTimeout(msobj.Continue,delaytime);
					}
					else
					{	clearInterval(msobj.TimerID);
						msobj.CTL = msobj.Stop = 0;
						msobj.TimerID = setInterval(msobj.StartID,timer);
					}
				}

	msobj.Pause = function()
			{
				msobj.Stop = 1;
				clearInterval(msobj.TimerID);
				setTimeout(msobj.Continue,delaytime);
			}

	msobj.Begin = function()
		{
			msobj.ID.onmousemove = function(event)
						{
							if(msobj.ScrollStep == 0 && msobj.Direction > 1)
							{
								var event = event || window.event;
								if(window.event)
								{
									if(msobj.IsNotOpera)
									{
										msobj.EventLeft = event.srcElement.id == msobj.ID.id ? event.offsetX - msobj.ID.scrollLeft : event.srcElement.offsetLeft - msobj.ID.scrollLeft + event.offsetX;
									}
									else
									{
										msobj.ScrollStep = null;
										return;
									}
								}
								else
								{
									msobj.EventLeft = event.layerX - msobj.ID.scrollLeft;
								}
								msobj.Direction = msobj.EventLeft > msobj.HalfWidth ? 3 : 2;
								msobj.AbsCenter = Math.abs(msobj.HalfWidth - msobj.EventLeft);
								msobj.Step = Math.round(msobj.AbsCenter * (msobj.BakStep*2) / msobj.HalfWidth);
							}
						}
			msobj.ID.onmouseover = function()
						{
							if(msobj.ScrollStep == 0)return;
							msobj.MouseOver = 1;
							clearInterval(msobj.TimerID);
						}
			msobj.ID.onmouseout = function()
						{
							if(msobj.ScrollStep == 0)
							{
								if(msobj.Step == 0)msobj.Step = 1;
								return;
							}
							msobj.MouseOver = 0;
							if(msobj.Stop == 0)
							{
								clearInterval(msobj.TimerID);
								msobj.TimerID = setInterval(msobj.StartID,timer);
							}
						}
			msobj.TimerID = setInterval(msobj.StartID,timer);
		}
	setTimeout(msobj.Begin,waittime);
}

Marquee.prototype.Scroll = function()
{
	if(this.Correct == 0 && this.CTL > this.ClientScroll)
	{
		this.ClientScroll = this.Direction > 1 ? Math.round(this.ID.scrollWidth / 2) : Math.round(this.ID.scrollHeight / 2);
		this.Correct = 1;
	}

	switch(this.Direction)
	{
		case 0:
			this.CTL += this.Step;
			if(this.CTL >= this.ScrollStep && this.DelayTime > 0)
			{
				this.ID.scrollTop += this.ScrollStep + this.Step - this.CTL;
				this.Pause();
				return;
			}
			else
			{
				if(this.ID.scrollTop >= this.ClientScroll)
				{
					this.ID.scrollTop -= this.ClientScroll;
				}
				this.ID.scrollTop += this.Step;
			}
		break;

		case 1:
			this.CTL += this.Step;
			if(this.CTL >= this.ScrollStep && this.DelayTime > 0)
			{
				this.ID.scrollTop -= this.ScrollStep + this.Step - this.CTL;
				this.Pause();
				return;
			}
			else
			{
				if(this.ID.scrollTop <= 0)
				{
					this.ID.scrollTop += this.ClientScroll;
				}
				this.ID.scrollTop -= this.Step;
			}
		break;

		case 2:
			this.CTL += this.Step;
			if(this.CTL >= this.ScrollStep && this.DelayTime > 0)
			{
				this.ID.scrollLeft += this.ScrollStep + this.Step - this.CTL;
				this.Pause();
				return;
			}
			else
			{
				if(this.ID.scrollLeft >= this.ClientScroll)
				{
					this.ID.scrollLeft -= this.ClientScroll;
				}
				this.ID.scrollLeft += this.Step;
			}
		break;

		case 3:
			this.CTL += this.Step;
			if(this.CTL >= this.ScrollStep && this.DelayTime > 0)
			{
				this.ID.scrollLeft -= this.ScrollStep + this.Step - this.CTL;
				this.Pause();
				return;
			}
			else
			{
				if(this.ID.scrollLeft <= 0)
				{
					this.ID.scrollLeft += this.ClientScroll;
				}
				this.ID.scrollLeft -= this.Step;
			}
		break;
	}
}
//-->