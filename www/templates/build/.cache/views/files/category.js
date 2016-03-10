/*TMODJS:{"version":2,"md5":"33b3bab6b9168ef522f5b2679a4b5610"}*/
template('views/files/category',function($data,$filename
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
$out+='" data-end="';
$out+=$escape(category.end);
$out+='">';
$out+=$escape(category.name);
$out+='</li> ';
});
$out+=' ';
return new String($out);
});