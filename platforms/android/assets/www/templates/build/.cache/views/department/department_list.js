/*TMODJS:{"version":17,"md5":"c5e657a92a8f7b3971887acfff1fbc97"}*/
template('views/department/department_list',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,id=$data.id,$out='';$out+='<div class="department_title" id="department_title_';
$out+=$escape(id);
$out+='"></div> <div class="department_list_navi"> <div class="department_list_navi_main" id="department_list_navi_';
$out+=$escape(id);
$out+='"> </div> <div class="department_list_navi_more"> +更多 </div> </div> <div class="department_list_main" id="department_list_main_';
$out+=$escape(id);
$out+='"></div>';
return new String($out);
});