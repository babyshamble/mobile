/*TMODJS:{"version":10,"md5":"43755e76558ca433c0baeb6049a0a60e"}*/
template('views/navigation/themelist',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<ul id="themelist"> ';
$each(data,function(value,$index){
$out+=' <li class="theme_li_e" id=';
$out+=$escape(value.id);
$out+='> ';
$out+=$escape(value.name);
$out+=' </li> ';
});
$out+=' </ul> ';
return new String($out);
});