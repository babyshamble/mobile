/*TMODJS:{"version":1,"md5":"3f2aa3b79684acabd4b9b032ef9cbe88"}*/
template('components/tv/channel/channel-clicked',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,current=$data.current,sitemap=$data.sitemap,$each=$utils.$each,map=$data.map,i=$data.i,$out='';$out+='<ul> <li rel="';
$out+=$escape(current);
$out+='" data-url="';
$out+=$escape(sitemap[current].url);
$out+='" data-id="';
$out+=$escape(sitemap[current].id);
$out+='"> <a href="';
$out+=$escape(sitemap[current].url);
$out+='">';
$out+=$escape(sitemap[current].name);
$out+='</a> </li> ';
$each(sitemap,function(map,i){
$out+=' ';
if(i != current){
$out+=' <li rel="';
$out+=$escape(i);
$out+='" data-url="';
$out+=$escape(map.url);
$out+='" data-id="';
$out+=$escape(map.id);
$out+='"> <a href="';
$out+=$escape(map.url);
$out+='">';
$out+=$escape(map.name);
$out+='</a> </li> ';
}
$out+=' ';
});
$out+=' </ul> ';
return new String($out);
});