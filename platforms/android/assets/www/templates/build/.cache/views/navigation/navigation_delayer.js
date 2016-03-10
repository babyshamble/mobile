/*TMODJS:{"version":1,"md5":"f3884feced50dc7efff706bac0185c37"}*/
template('views/navigation/navigation_delayer',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,id=$data.id,name=$data.name,$out='';$out+='<div class="navigation_matrix_e" id="navigation_matrix_';
$out+=$escape(id);
$out+='"> <div class="navigation_matrix_title"> ';
$out+=$escape(name);
$out+=' </div> <div class="navigation_matrix_main" id="navigation_matrix_delayer_';
$out+=$escape(id);
$out+='"> </div> </div>';
return new String($out);
});