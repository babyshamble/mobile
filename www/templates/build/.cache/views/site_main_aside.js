/*TMODJS:{"version":7,"md5":"dec6fcdc6b387494a48a6a5ff395f55c"}*/
template('views/site_main_aside',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,metro=$data.metro,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(metro,function(value,$index){
$out+=' <li class="site-aside-move-li" id="';
$out+=$escape(value.id);
$out+='"> ';
$out+=$escape(value.name);
$out+=' </li> ';
});
$out+=' ';
return new String($out);
});