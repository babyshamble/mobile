/*TMODJS:{"version":7,"md5":"5f0301409d7ba5299869642917d72ad9"}*/
template('views/many',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(data,function(value,$index){
$out+=' <li class="site-prop-many-li" isdir=';
$out+=$escape(1);
$out+=' id=';
$out+=$escape(value.id);
$out+='> ';
$out+=$escape(value.name);
$out+=' </li> ';
});
$out+=' ';
return new String($out);
});