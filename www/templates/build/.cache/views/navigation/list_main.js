/*TMODJS:{"version":22,"md5":"7faba35577d09412daae00d47aa328f2"}*/
template('views/navigation/list_main',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(data,function(value,$index){
$out+=' <li class="list_main_e" id=';
$out+=$escape(value.id);
$out+=' > <i></i> <span>';
$out+=$escape(value.name);
$out+='</span> </li> ';
});
return new String($out);
});