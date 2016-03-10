/*TMODJS:{"version":1,"md5":"79451e4feb330e1f2c5bfd557793e907"}*/
template('views/side',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,metro=$data.metro,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(metro,function(value,$index){
$out+=' <li class="site-side-nav" code="';
$out+=$escape(value.code);
$out+='"> ';
$out+=$escape(value.name);
$out+=' </li> ';
});
$out+=' ';
return new String($out);
});