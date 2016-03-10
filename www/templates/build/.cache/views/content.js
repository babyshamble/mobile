/*TMODJS:{"version":1,"md5":"6b4f6b263ace8b205ae2c7fdca8d8e89"}*/
template('views/content',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,grids=$data.grids,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(grids,function(value,$index){
$out+=' <li class="site-content-li"> <div class="site-content-div" sid="';
$out+=$escape(value.sid);
$out+='"> ';
$out+=$escape(value.name);
$out+=' </div> </li> ';
});
$out+=' ';
return new String($out);
});