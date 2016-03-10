/*TMODJS:{"version":21,"md5":"71ec4b5b57259e5d855d4cb14d9a302f"}*/
template('views/olist/list',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,lists=$data.lists,item=$data.item,$index=$data.$index,$escape=$utils.$escape,$out='';$each(lists,function(item,$index){
$out+=' <li class="list-item nothumbnail" mask="#article_section?aid=';
$out+=$escape(item.id);
$out+='" button="false"> <div class="list-content"> <div class="list-title"> ';
$out+=$escape(item.name);
$out+=' </div> </div>  </li> ';
});
$out+=' ';
return new String($out);
});