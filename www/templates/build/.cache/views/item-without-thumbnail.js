/*TMODJS:{"version":1,"md5":"722b32de807973e26f442716b43ed176"}*/
template('views/item-without-thumbnail',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,aid=$data.aid,name=$data.name,info=$data.info,submap=$data.submap,ptime=$data.ptime,$out='';$out+='<li class="list-item nothumbnail" data-id="';
$out+=$escape(aid);
$out+='"> <a href="#article_section?aid=';
$out+=$escape(aid);
$out+='" data-target="section"> <div class="list-thumbnail" style="background-image: none"></div> <div class="list-content"> <h3 class="list-title">';
$out+=$escape(name);
$out+='</h3> <p class="list-brief">';
$out+=$escape(info);
$out+='</p> </div> <div class="list-footprint"> <span class="list-source">';
$out+=$escape(submap);
$out+='</span> <span class="list-date">';
$out+=$escape(ptime);
$out+='</span> </div> </a> </li> ';
return new String($out);
});