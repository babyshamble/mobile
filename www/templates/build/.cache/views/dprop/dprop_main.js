/*TMODJS:{"version":13,"md5":"5c1f2c161ae8d45daf61a734f7f195d9"}*/
template('views/dprop/dprop_main',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(data,function(value,$index){
$out+=' <li class="dprop_main" id=';
$out+=$escape(value.id);
$out+='> <i></i> <span>';
$out+=$escape(value.name);
$out+='</span> </li> ';
});
$out+=' ';
return new String($out);
});