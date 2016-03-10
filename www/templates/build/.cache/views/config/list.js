/*TMODJS:{"version":1,"md5":"29d1f7310f0ac2cbb4956762e3d16547"}*/
template('views/config/list',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,lists=$data.lists,item=$data.item,$index=$data.$index,$escape=$utils.$escape,$out='';$each(lists,function(item,$index){
$out+=' <li class="list-item nothumbnail"> <a href="#article_section?aid=';
$out+=$escape(item.id);
$out+='" data-target="section"> <div class="list-content"> <h3 class="list-title"> ';
$out+=$escape(item.name);
$out+=' </h3> </div>  </a> </li> ';
});
$out+=' ';
return new String($out);
});