/*TMODJS:{"version":15,"md5":"fa9190927dd88aade33f72a1d0e53db3"}*/
template('views/search/list',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,item=$data.item,$index=$data.$index,$escape=$utils.$escape,$out='';$each(list,function(item,$index){
$out+=' <li class="list-item nothumbnail" mask="#article_section?aid=';
$out+=$escape(item.id);
$out+='"> ';
$out+=$escape(item.name);
$out+=' </li> ';
});
$out+=' ';
return new String($out);
});