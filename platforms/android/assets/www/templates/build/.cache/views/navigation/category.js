/*TMODJS:{"version":2,"md5":"6e1155d2522f0963f46e7dacea3488dd"}*/
template('views/navigation/category',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,cates=$data.cates,cate=$data.cate,index=$data.index,$escape=$utils.$escape,$out='';$out+='<sliderbar class="clearfix"> <div id="slider-bar" class="slider-bar-background icons-navigation icons-navigation-bg"> <ul> ';
$each(cates,function(cate,index){
$out+=' <li data-view="party"> <a href="#/navigation/';
$out+=$escape(cate.cid);
$out+='"><i class="icons-navigation icons-navigation-';
$out+=$escape(cate.cid);
$out+='"></i>';
$out+=$escape(cate.cname);
$out+='</a> </li> ';
});
$out+=' </ul> </div> </sliderbar> ';
return new String($out);
});