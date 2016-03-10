/*TMODJS:{"version":135,"md5":"1db5f0f6ba85f807bc204e1485a43a05"}*/
template('views/navi',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(data,function(value,$index){
$out+=' <li class="site-navi-li" id=';
$out+=$escape(value.id);
$out+=' isdir=';
$out+=$escape(value.isdir);
$out+='> <div> ';
$out+=$escape(value.name);
$out+=' </div> </li> ';
});
$out+=' ';
return new String($out);
});