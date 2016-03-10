/*TMODJS:{"version":3,"md5":"aa9b4343973baedf0a4ade6174af3f5b"}*/
template('views/navigation/list_title',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,name=$data.name,$out='';$out+='<span id="list_data">2015.8.21 周</span> <span id="list_title">';
$out+=$escape(name);
$out+='</span> ';
return new String($out);
});