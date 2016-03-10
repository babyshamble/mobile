/*TMODJS:{"version":3,"md5":"059cccfdfb75f9b481db9608b99cc3a5"}*/
template('views/olist/category',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,counter=$data.counter,$each=$utils.$each,systems=$data.systems,category=$data.category,ci=$data.ci,$escape=$utils.$escape,$out='';if(counter = 0){
}
$out+=' ';
$each(systems,function(category,ci){
$out+=' <li';
if(counter++ === 0){
$out+=' class="active"';
}
$out+=' data-cid="';
$out+=$escape(category.id);
$out+='">';
$out+=$escape(category.name);
$out+='</li> ';
});
$out+=' ';
return new String($out);
});