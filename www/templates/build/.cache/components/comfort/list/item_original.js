/*TMODJS:{"version":1,"md5":"fe3debfaaee73a4ff0ccbfa452825ec0"}*/
template('components/comfort/list/item_original',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,j=$data.j,$each=$utils.$each,list=$data.list,item=$data.item,index=$data.index,$escape=$utils.$escape,cate=$data.cate,site=$data.site,mapId=$data.mapId,$out='';if(j=0){
}
$out+=' ';
$each(list,function(item,index){
$out+=' ';
if(j++){
}
$out+=' ';
if(item.imgs && item.imgs.length){
$out+=' <div class="list-item templet-4" id="';
$out+=$escape(item.id);
$out+='"> ';
}else{
$out+=' <div class="list-item templet-4 no-img" id="';
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
$out+='</a> </p> <p class="cont cont-4">市场传言的央行下午针对二套房贷首付下调召开新闻发布会，并导致地产股直线拉升，但央行对澎湃新闻回应称，下午并没有新闻发布会</p> </div> </div> <p class="info info-2"> <span class="time">';
$out+=$escape(item.ptime);
$out+='</span> </p> </div> ';
});
$out+=' ';
if(j===0){
$out+='   ';
}
$out+=' ';
return new String($out);
});