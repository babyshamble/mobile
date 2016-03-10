/*TMODJS:{"version":1,"md5":"4e38988d16713cd8e4b832b444e18790"}*/
template('views/creader/error',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,errMsg=$data.errMsg,$out='';$out+='<div id="creader-none-existence" class="view-container view-creader-panel"> <h1>很抱歉，您需要的内容尚未准备好</h1> <p>ENOTREADY : ';
$out+=$escape(errMsg);
$out+='</p> </div> ';
return new String($out);
});