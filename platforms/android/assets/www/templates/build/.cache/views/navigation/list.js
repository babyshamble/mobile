/*TMODJS:{"version":16,"md5":"c5852cc7c8cd72016e4cf76cda93ebfe"}*/
template('views/navigation/list',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,name=$data.name,$out='';$out+='<span id="list_data">2015.8.21 周</span> <span id="list_title">';
$out+=$escape(name);
$out+='</span> <i id="list_close"></i>  ';
return new String($out);
});