/*TMODJS:{"version":11,"md5":"96eefebd1ac201438016aa980689a432"}*/
template('views/navigation/list_navi',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,child=$data.child,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(child,function(value,$index){
$out+=' <li class="list_navi_list_e" id=';
$out+=$escape(value.id);
$out+='> ';
$out+=$escape(value.name);
$out+=' &nbsp &nbsp· </li> ';
});
return new String($out);
});