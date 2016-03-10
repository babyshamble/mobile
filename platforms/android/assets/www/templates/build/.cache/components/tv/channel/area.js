/*TMODJS:{"version":1,"md5":"8e37060609d0ef35922db5fffc9c2b7e"}*/
template('components/tv/channel/area',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,sitemap=$data.sitemap,map=$data.map,i=$data.i,offset=$data.offset,page=$data.page,$escape=$utils.$escape,subsection=$data.subsection,j=$data.j,resolved=$data.resolved,$out='';$each(sitemap,function(map,i){
$out+=' ';
if(offset = 0){
}
$out+=' ';
if(page = 0){
}
$out+=' <div class="area" rel="';
$out+=$escape(i);
$out+='"> <ul class="clearfix" data-pos="0"> ';
$each(map.subsections,function(subsection,j){
$out+=' ';
if(offset++ === 0){
$out+=' ';
if(resolved = false){
}
$out+=' <li> ';
}
$out+=' <i rel="';
$out+=$escape(i);
$out+='" data-code="';
$out+=$escape(subsection.code);
$out+='" data-id="';
$out+=$escape(subsection.id);
$out+='"> <a href="';
$out+=$escape(subsection.url);
$out+='">';
$out+=$escape(subsection.name);
$out+='</a> </i> ';
if(offset >=8){
$out+=' <i class="icons-website icons-website-left"></i> <i class="icons-website icons-website-right"></i> </li> ';
if(offset = 0){
}
$out+=' ';
if(resolved = true){
}
$out+=' ';
if(page++){
}
$out+=' ';
}
$out+=' ';
});
$out+=' ';
if(!resolved){
$out+=' ';
if(page++){
}
$out+=' ';
if(page > 1){
$out+=' ';
if(offset === 3){
$out+='<div style="height: 120px"></div>';
}
$out+=' ';
if(offset === 6){
$out+='<div style="height: 180px"></div>';
}
$out+=' <i class="icons-website icons-website-left"></i> ';
}
$out+=' </li> ';
}
$out+=' </ul> </div> ';
});
$out+=' ';
return new String($out);
});