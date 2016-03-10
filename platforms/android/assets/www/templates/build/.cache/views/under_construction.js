/*TMODJS:{"version":1,"md5":"4fb8c4388a534021e54e14bdcb07d3fe"}*/
template('views/under_construction',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,product=$data.product,$out='';$out+='<div class="view-container view-construction-panel"> <h1>很遗憾, ';
$out+=$escape(product || '这项');
$out+='产品目前正在开发中</h1> <p>您可以在稍后再次尝试</p> </div> ';
return new String($out);
});