/*TMODJS:{"version":2,"md5":"cd02bac77981e109f0e29eb202e185a8"}*/
template('views/artcle/read',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,name=$data.name,ptime=$data.ptime,$out='';$out+='<h2 class="article-title">';
$out+=$escape(name);
$out+='</h2> <div class="article-meta"> <span class="article-time">';
$out+=$escape(ptime);
$out+='</span> </div> <div class="article-content"></div> ';
return new String($out);
});