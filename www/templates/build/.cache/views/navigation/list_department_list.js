/*TMODJS:{"version":19,"md5":"ecf56b4401869766b51c98a4aca85a4b"}*/
template('views/navigation/list_department_list',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,id=$data.id,$out='';$out+='<div class="department_delayer_e"> <div class="department_list_title" id="department_list_title_';
$out+=$escape(id);
$out+='"></div> <div class="department_list_navi" id="department_list_navi_';
$out+=$escape(id);
$out+='"></div> <div class="department_list_main" id="department_list_main_';
$out+=$escape(id);
$out+='"></div> </div> ';
return new String($out);
});