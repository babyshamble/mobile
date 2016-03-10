/*TMODJS:{"version":8,"md5":"0234eec32d7b4f1e44b801044fbdbc88"}*/
template('article/title',function($data,$filename
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