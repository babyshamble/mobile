/*TMODJS:{"version":4,"md5":"a6a9eb922b5146544a31fcb9d1c40a85"}*/
template('views/card/item-without-thumbnail',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,id=$data.id,name=$data.name,brief=$data.brief,from=$data.from,time=$data.time,$out='';$out+='<li class="list-item nothumbnail" data-id="';
$out+=$escape(id);
$out+='" mask="#article_section?aid=';
$out+=$escape(id);
$out+='"> <div class="list-thumbnail" style="background-image: none"></div> <div class="list-content"> <div class="list-title">';
$out+=$escape(name);
$out+='</div> <p class="list-brief">';
$out+=$escape(brief);
$out+='</p> </div> <div class="list-footprint"> <span class="list-source">';
$out+=$escape(from);
$out+='</span> <span class="list-date">';
$out+=$escape(time);
$out+='</span> </div> </li> ';
return new String($out);
});