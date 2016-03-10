/*TMODJS:{"version":1,"md5":"6ba8143127bad6d8856c22e53e41d61a"}*/
template('views/card/item-with-thumbnail',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,thumbnail=$data.thumbnail,id=$data.id,name=$data.name,info=$data.info,submap=$data.submap,ptime=$data.ptime,$out='';$out+='<li class="list-item" data-image="';
$out+=$escape(thumbnail[0]);
$out+='" data-id="';
$out+=$escape(id);
$out+='" mask="#article_section?aid=';
$out+=$escape(id);
$out+='"> <div class="list-thumbnail" style="background-image: none"></div> <div class="list-content"> <div class="list-title">';
$out+=$escape(name);
$out+='</div> <p class="list-brief">';
$out+=$escape(info);
$out+='</p> </div> <div class="list-footprint"> <span class="list-source">';
$out+=$escape(submap);
$out+='</span> <span class="list-date">';
$out+=$escape(ptime);
$out+='</span> </div> </li> ';
return new String($out);
});