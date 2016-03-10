/*TMODJS:{"version":7,"md5":"50ac34c845781f7663d2743ff322949f"}*/
template('information/category',function($data,$filename
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