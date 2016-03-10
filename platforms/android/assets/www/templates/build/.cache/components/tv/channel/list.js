/*TMODJS:{"version":1,"md5":"313fed794bacda9ff9d4c26f6f697521"}*/
template('components/tv/channel/list',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,list=$data.list,$each=$utils.$each,area=$data.area,i=$data.i,$escape=$utils.$escape,item=$data.item,j=$data.j,$out='';if(list.length === 0){
$out+=' <p>此频道下暂时没有文章</p> ';
}else{
$out+=' ';
$each(list,function(area,i){
$out+=' <div data-areaIndex="';
$out+=$escape(i);
$out+='" data-areaName="';
$out+=$escape(area.name);
$out+='" data-areaType="';
$out+=$escape(area.type);
$out+='"> <ul> ';
$each(area.links,function(item,j){
$out+=' <li rel="';
$out+=$escape(j);
$out+='" data-id="';
$out+=$escape(item.id);
$out+='"> <a href="';
$out+=$escape(item.url);
$out+='"> ';
if(area.name){
$out+=' <span style="color:#FF8A8A;">[';
$out+=$escape(area.name);
$out+=']</span> ';
}
$out+=' ';
$out+=$escape(item.name);
$out+=' </a> </li> ';
});
$out+=' </ul> </div> ';
});
$out+=' ';
}
$out+=' ';
return new String($out);
});