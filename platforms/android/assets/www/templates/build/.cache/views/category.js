/*TMODJS:{"version":1,"md5":"98fb44a15963b367efb3479ea04e7397"}*/
template('views/category',function($data,$filename
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
$out+='" data-code="';
$out+=$escape(category.code);
$out+='">';
$out+=$escape(category.name);
$out+='</li> ';
});
$out+=' ';
return new String($out);
});