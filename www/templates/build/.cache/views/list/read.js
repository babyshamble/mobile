/*TMODJS:{"version":1,"md5":"46954363b0f1496121aff73ae10f77ba"}*/
template('views/list/read',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,name=$data.name,ptime=$data.ptime,content=$data.content,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<h2 class="article-title">';
$out+=$escape(name);
$out+='</h2> <div class="article-meta"> <span class="article-time">';
$out+=$escape(ptime);
$out+='</span> </div> <div class="article-content">';
$out+=$escape(content);
$out+='</div> ';
include('./recommend');
$out+=' ';
return new String($out);
});