/*TMODJS:{"version":9,"md5":"da80a4aa17326529a15a0132f3aaaafe"}*/
template('views/navigation/many',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data1=$data.data1,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(data1,function(value,$index){
$out+=' <li class="site-prop-many-li" code=';
$out+=$escape(value.code);
$out+=' isdir=';
$out+=$escape(value.isdir);
$out+=' id=';
$out+=$escape(value.id);
$out+=' mid=';
$out+=$escape(value.mid);
$out+=' sid=';
$out+=$escape(value.sid);
$out+='> ';
$out+=$escape(value.name);
$out+=' </li> ';
});
$out+=' ';
return new String($out);
});