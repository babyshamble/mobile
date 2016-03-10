/*TMODJS:{"version":14,"md5":"5cd6c2fe00c2a48ff5fc78dd86ce2ac0"}*/
template('views/navigation/list_department_block',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,id=$data.id,$out='';$out+='<div class="department_delayer_e"> <div class="department_block_title" id="department_block_title_';
$out+=$escape(id);
$out+='"></div> <div class="department_block_main" id="department_block_main_';
$out+=$escape(id);
$out+='"></div> </div';
return new String($out);
});