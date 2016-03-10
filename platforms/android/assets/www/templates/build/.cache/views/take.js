/*TMODJS:{"version":36,"md5":"79e87b3bc0f842f173b07ae3038b007c"}*/
template('views/take',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(data,function(value,$index){
$out+=' <li class="site-prop-choose-li" isdir=1 id=';
$out+=$escape(value.id);
$out+=' > ';
$out+=$escape(value.name);
$out+=' </li> ';
});
$out+=' ';
return new String($out);
});