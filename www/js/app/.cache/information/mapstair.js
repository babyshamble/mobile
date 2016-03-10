/*TMODJS:{"version":2,"md5":"7a723abfa237dca91a4f8f09126993da"}*/
template('information/mapstair',function($data,$filename
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
$out+='" data-code="';
$out+=$escape(map.code);
$out+='">';
$out+=$escape(map.name);
$out+='</li> ';
});
$out+=' ';
return new String($out);
});