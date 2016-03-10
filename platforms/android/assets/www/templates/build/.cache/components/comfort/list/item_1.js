/*TMODJS:{"version":1,"md5":"870e2dbfc80177748ff13c56c03a0b86"}*/
template('components/comfort/list/item_1',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,id=$data.id,link=$data.link,imgs=$data.imgs,title=$data.title,brief=$data.brief,timestamp=$data.timestamp,$out='';$out+='<div class="list-item templet-1" id="';
$out+=$escape(id);
$out+='"> <p> <a href="';
$out+=$escape(link);
$out+='" class="tiptitleImg"> <img width="610" height="350" src="';
$out+=$escape(imgs[0]);
$out+='" alt="';
$out+=$escape(title);
$out+='"> </a> </p> <p class="title title-1"><a href="{link';
$out+=$escape(title);
$out+='</a></p> <p class="cont cont-1">';
$out+=$escape(brief);
$out+='</p> <p class="info info-1"> <span class="time">';
$out+=$escape(timestamp);
$out+='</span> </p> </div> ';
return new String($out);
});