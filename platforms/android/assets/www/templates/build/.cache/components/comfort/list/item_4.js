/*TMODJS:{"version":1,"md5":"945848e9504befe7967b40f6f53c4e2c"}*/
template('components/comfort/list/item_4',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,item=$data.item,$escape=$utils.$escape,cate=$data.cate,site=$data.site,mapId=$data.mapId,area=$data.area,$out='';if(item.imgs && item.imgs.length){
$out+=' <div class="list-item templet-4 yx-read" id="';
$out+=$escape(item.id);
$out+='"> ';
}else{
$out+=' <div class="list-item templet-4 no-img yx-read" id="';
$out+=$escape(item.id);
$out+='"> ';
}
$out+=' <div class="clearfix"> ';
if(item.imgs && item.imgs.length){
$out+=' <div class="pic-t4"> <a href="#/creader/';
$out+=$escape(cate.cid);
$out+='/';
$out+=$escape(site.id);
$out+='/';
$out+=$escape(mapId);
$out+='/';
$out+=$escape(item.id);
$out+='" class="tiptitleImg" style="background: url(';
$out+=$escape($helpers. firstImg(item.imgs ));
$out+=') center 30% no-repeat;)"></a> </div> ';
}
$out+=' <div class="txt-t4"> <p class="title title-4"> <a href="#/creader/';
$out+=$escape(cate.cid);
$out+='/';
$out+=$escape(site.id);
$out+='/';
$out+=$escape(mapId);
$out+='/';
$out+=$escape(item.id);
$out+='">';
$out+=$escape(item.name);
$out+='</a> </p> <p class="cont cont-4">';
$out+=$escape(item.info || '这篇文章没有简介');
$out+='</p> </div> </div> <p class="info info-2"> <span class="time">';
$out+=$escape(area.name);
$out+='&nbsp;&nbsp;';
$out+=$escape(item.ptime);
$out+='</span> </p> </div> ';
return new String($out);
});