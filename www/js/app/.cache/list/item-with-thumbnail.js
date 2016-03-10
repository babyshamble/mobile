/*TMODJS:{"version":19,"md5":"0db1441d128649c7792c5753291645dd"}*/
template('list/item-with-thumbnail',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,thumbnail=$data.thumbnail,aid=$data.aid,name=$data.name,info=$data.info,submap=$data.submap,ptime=$data.ptime,$out='';$out+='<li class="list-item" data-image="';
$out+=$escape(thumbnail[0]);
$out+='" data-id="';
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