/*TMODJS:{"version":8,"md5":"2e0e5877bd24cf84b0bf5598745a7be6"}*/
template('views/navigation/list_department_navi',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,child=$data.child,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(child,function(value,$index){
$out+=' <li class="department_list_navi_e" id=';
$out+=$escape(value.id);
$out+='> ';
$out+=$escape(value.name);
$out+=' </li> ';
});
return new String($out);
});