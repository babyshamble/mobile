/*TMODJS:{"version":1,"md5":"0e3b0557e20c388cc941d3021e4caf39"}*/
template('components/tv/channel/channel',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,sitemap=$data.sitemap,map=$data.map,i=$data.i,$escape=$utils.$escape,$out='';$out+='<ul> ';
$each(sitemap,function(map,i){
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
});
$out+=' </ul> ';
return new String($out);
});