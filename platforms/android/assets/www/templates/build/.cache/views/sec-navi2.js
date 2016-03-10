/*TMODJS:{"version":11,"md5":"d0ac903cf5c8dff81eeacc3dd26f64c5"}*/
template('views/sec-navi2',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,metro=$data.metro,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(metro,function(value,$index){
$out+=' <li class="content-other-li fl" id="';
$out+=$escape(value.id);
$out+='"> <div> ';
$out+=$escape(value.name);
$out+=' </div> </li> ';
});
$out+=' ';
return new String($out);
});