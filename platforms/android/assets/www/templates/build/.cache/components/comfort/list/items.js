/*TMODJS:{"version":1,"md5":"ff2192b4944dc5db93a94a6589c8c059"}*/
template('components/comfort/list/items',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,areas=$data.areas,area=$data.area,ai=$data.ai,item=$data.item,li=$data.li,data=$data.data,cate=$data.cate,mapId=$data.mapId,site=$data.site,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$each(areas,function(area,ai){
$out+=' ';
$each(area.links,function(item,li){
$out+=' ';
if(data = {cate: cate, mapId: mapId, site: site, area: area, item: item} ){
}
$out+=' ';
include('./item_4',data);
$out+=' ';
});
$out+=' ';
});
$out+=' ';
return new String($out);
});