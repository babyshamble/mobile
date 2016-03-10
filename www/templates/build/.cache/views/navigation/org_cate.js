/*TMODJS:{"version":5,"md5":"0786578ee4fd41fc938e4aa838e36b7e"}*/
template('views/navigation/org_cate',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,child=$data.child,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(child,function(value,$index){
$out+=' <li class="original_cata_list_e" id=';
$out+=$escape(value.id);
$out+='> <div> ';
$out+=$escape(value.name);
$out+=' </div> </li> ';
});
return new String($out);
});