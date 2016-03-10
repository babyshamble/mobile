/*TMODJS:{"version":21,"md5":"a8d1fb2abdbe2ba72ca4feddd2896893"}*/
template('views/affairs/cate',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,counter=$data.counter,$each=$utils.$each,cates=$data.cates,category=$data.category,ci=$data.ci,$escape=$utils.$escape,$out='';if(counter = 0){
}
$out+=' ';
$each(cates,function(category,ci){
$out+=' <li class="square_item"> <div data-cid="';
$out+=$escape(category.id);
$out+='" data-end="';
$out+=$escape(category.end);
$out+='" >';
$out+=$escape(category.name);
$out+=' </div> <i></i> </li> ';
});
$out+=' ';
return new String($out);
});