/*TMODJS:{"version":1,"md5":"480ab9e7dd25f0952f09a862ec33d151"}*/
template('views/creader/pure',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,name=$data.name,time=$data.time,$string=$utils.$string,art=$data.art,imgs=$data.imgs,$out='';$out+='<div class="topnav"> <div class="topnav-container"> </div> </div> <a class="ep-close" id="ep-close"></a> <div id="creader-content"> <div class="ep-content-bg clearfix"> <div class="ep-content-main" id="epContentLeft"> <h1 id="h1title" class="ep-h1">';
$out+=$escape(name);
$out+='</h1> <div class="clearfix"> <div class="ep-info cDGray hide"><div class="left">';
$out+=$escape(time);
$out+=' 来源: <a href="" target="_blank" >新华网</a> 作者: 评论员</div> </div> </div> <div id="endText"> ';
$out+=$string(art);
$out+=' <!--';
$out+=$escape(imgs);
$out+='--> </div> </div> </div> </div> <div class="ep-sidetools ep-lefttools"> <a class="ep-nav ep-nav-pc ep-nav-left" data-action="navleft" href="/docs/2/2015032808/ALPIIVC3000300B1.html" target="_self"><i></i><label>上一篇：</label><span id="ep-prev">《复联2》导演乔斯韦登将来华宣传 携手钢铁侠</span></a> </div> <div class="ep-sidetools ep-righttools"> <a data-action="navright" href="/docs/66/2015032501/PHOTGUIO000300AJ.html" class="ep-nav ep-nav-pc ep-nav-right" target="_self"><i></i><label>下一篇：</label><span id="ep-next">周韦彤陪妈做发型晒合影 母女俩被赞姐妹花</span></a> </div> </div> ';
return new String($out);
});