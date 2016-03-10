/*TMODJS:{"version":1,"md5":"604bd9316e3f56ca86a2ab29f8af17cd"}*/
template('components/comfort/mapping_items',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,maps=$data.maps,map=$data.map,index=$data.index,$escape=$utils.$escape,runtime=$data.runtime,cate=$data.cate,site=$data.site,$out='';$each(maps,function(map,index){
$out+=' <li class="website-mapping-item" data-mapid="';
$out+=$escape(map.id);
$out+='"> <a href="#/website/';
$out+=$escape(runtime.websiteMode);
$out+='/';
$out+=$escape(cate.cid);
$out+='/';
$out+=$escape(site.id);
$out+='/';
$out+=$escape(map.id);
$out+='">';
$out+=$escape(map.name);
$out+='</a> <i class="icons-website icons-website-remove"></i> <i class="icons-website icons-website-add"></i> </li> ';
});
$out+=' ';
return new String($out);
});