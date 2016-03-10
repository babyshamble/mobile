/*TMODJS:{"version":16,"md5":"eee3e7c0d95daf12c92fdb5c9eeedf6d"}*/
template('views/sec-navi',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,name=$data.name,$out='';$out+='<li class="content-first-li fl"> ';
$out+=$escape(name);
$out+=' </li> ';
return new String($out);
});