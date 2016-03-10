/*TMODJS:{"version":4,"md5":"8a193b8f9a12b4ea91697901749162ef"}*/
template('views/files/mapstair',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,counter=$data.counter,$each=$utils.$each,mapstair=$data.mapstair,map=$data.map,mi=$data.mi,$escape=$utils.$escape,$out='';if(counter = 0){
}
$out+=' ';
$each(mapstair,function(map,mi){
$out+=' <li ';
if(counter++ === 0){
$out+='class="active"';
}
$out+=' data-mid="';
$out+=$escape(map.id);
$out+='" data-sid="';
$out+=$escape(map.sid);
$out+='" data-code="';
$out+=$escape(map.code);
$out+='">';
$out+=$escape(map.name);
$out+='</li> ';
});
$out+=' ';
return new String($out);
});