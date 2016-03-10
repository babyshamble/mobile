/*TMODJS:{"version":1,"md5":"cdac170812d9f3f8affbb122c52be712"}*/
template('components/comfort/context/load_error',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,errMsg=$data.errMsg,$escape=$utils.$escape,$out='';$out+='<p style="colo: red;">加载失败';
if(errMsg){
$out+=', ';
$out+=$escape(errMsg);
}
$out+='</p> ';
return new String($out);
});