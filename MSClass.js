<!--
/*MSClass (Class Of Marquee Scrollͨ�ò���Ϲ���JS��װ��) Ver 1.4*\

������ʱ��:2006-08-29 (Ver 0.5)
������ʱ��:2006-08-31 (Ver 0.8)
������ʱ��:2006-12-11 (Ver 1.4)
������˵��: + ���빦�� * ����������
	1.4.061211
		+ �����ͣ�ı�������� (�����ͣ�������ҹ���)
		* �����ĵ����ع��������»�ȡ�ĸ߶�/��Ȳ�׼ȷ
		* ������������� (IE��FF��Opera��NS��MYIE)
	1.2.060922
		+ ָ����Χ��Ъ����
		* �������
		* ������Ъ����ֹͣ�Ĵ���
	1.0.060901
		+ ���¡����ҹ���
		+ ��ʼ�ȴ�ʱ��
		+ ��������
		* ����ʱ�䵥λ
		* �������
		* �����ѭ��
		* ��ǿ����
		* �����Ż�
	0.8.060829
		  ������������ϡ��������

����ʾ��ַ:http://www.popub.net/script/MSClass.html
�����ص�ַ:http://www.popub.net/script/MSClass.js

��Ӧ��˵��:ҳ�����<script type="text/javascript" src="MSClass.js"></script>

	����ʵ��:new Marquee("marquee",0,1,760,52,50,5000,3000)
		 new Marquee("marquee",0,1,760,104,50,5000,3000,52)

	����˵��:marquee	����ID
		 0		���Ϲ���(0���� 1���� 2���� 3����)
		 1		�����Ĳ���(��ֵԽ��,����Խ��)
		 760		�������ӿ��
		 52		�������Ӹ߶�
		 50		��ʱ��(��ֵԽС,�������ٶ�Խ�� 1000=1��,���鲻С��20)
		 5000		��Ъͣ���ӳ�ʱ��(0Ϊ��ͣ��,1000=1��)
		 3000		��ʼʱ�ĵȴ�ʱ��(0Ϊ���ȴ�,1000=1��)
		 (52)		��Ъ�������(��ѡ,����ֵ���ӳپ�Ϊ0��Ϊ�����ͣ����)
��ʹ�ý���:
		1������ֱ�Ӹ�����������ʾ����Ŀ�Ⱥ͸߶ȣ���(<div id="marquee" style="width:760px;height:52px;">......</div>)
		2������Ϊ���������ʽoverflow = auto����(<div id="marquee" style="width:760px;height:52px;overflow:auto;">......</div>)
		3��Ϊ�˸�׼ȷ�Ļ�ȡ��������Ŀ�Ⱥ͸߶ȣ��뾡���ܽ���������λֱ�Ӹ�����ȷ��߶�
		4������TABLE��ǵĺ����������Ҫ��TABLE�����ʽdisplay = inline����(<div id="marquee" style="width:760px;height:52px;overflow:auto;"><table style="display:inline">......</table></div>)
		5�����ڷ����������Ъ������Ҫע���������λ��ļ�࣬ͬʱ��Ҫ�������Ŀ��Ӹ߶ȺͿ��ӿ������׼ȷ�����ã����ڸ�������λ��ļ�����ͨ�������м����ߵ�Ԫ��ĸ߿�������е���
		6������LI�Զ����е�������ʱû�и��õĽ���취�����齫��ת���ɱ��(TABLE)����ʽ���ﵽͬ�ȵ�Ч��

\***��������/��Ȩ����:������(333) E-Mail:zhadan007@21cn.com ��ַ:http://www.popub.net***/


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