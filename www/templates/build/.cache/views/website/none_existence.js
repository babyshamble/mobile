/*TMODJS:{"version":1,"md5":"2cba3f042aec4e3a32730e01fe8395c7"}*/
template('views/website/none_existence',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,siteId=$data.siteId,$out='';$out+='<div id="website-none-existence" class="view-container view-container-website"> <h1>很抱歉，您选择的站点并不存在</h1> <p>ENOTFOUND : 未知的网站编号 ';
$out+=$escape(siteId);
$out+='</p> </div> ';
return new String($out);
});