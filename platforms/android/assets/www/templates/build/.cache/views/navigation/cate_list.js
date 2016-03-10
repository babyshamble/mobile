/*TMODJS:{"version":7,"md5":"6667996137b21c6f4f9c1c9c573961ef"}*/
template('views/navigation/cate_list',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,child=$data.child,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(child,function(value,$index){
$out+=' <li class="navigation_cata_list_e" id=';
$out+=$escape(value.id);
$out+='> <div> ';
$out+=$escape(value.name);
$out+=' </div> </li> ';
});
$out+=' ';
return new String($out);
});