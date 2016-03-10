/*TMODJS:{"version":1,"md5":"074c04ab6d68955ec6d94764af8d1008"}*/
template('components/comfort/context/hot_site',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,hot=$data.hot,item=$data.item,index=$data.index,j=$data.j,$escape=$utils.$escape,cate=$data.cate,site=$data.site,mapId=$data.mapId,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<h3>本站最新</h3> <ul class="list_hot"> ';
$each(hot,function(item,index){
$out+=' ';
if(j++){
}
$out+=' <li class="clearfix"> ';
if(index < 3){
$out+=' <span class="num_hot num_top">';
$out+=$escape(index + 1);
$out+='</span> ';
}else{
$out+=' <span class="num_hot">';
$out+=$escape(index + 1);
$out+='</span> ';
}
$out+=' <a class="yx-read" href="#/creader/';
$out+=$escape(cate.cid);
$out+='/';
$out+=$escape(site.id);
$out+='/';
$out+=$escape(mapId);
$out+='/';
$out+=$escape(item.id);
$out+='">';
$out+=$escape(item.name);
$out+='</a> </li> ';
});
$out+=' </ul> ';
if(hot.length===0){
$out+=' ';
include('./none');
$out+=' ';
}
$out+=' ';
return new String($out);
});