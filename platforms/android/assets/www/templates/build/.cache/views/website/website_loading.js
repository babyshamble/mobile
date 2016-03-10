/*TMODJS:{"version":1,"md5":"ed3e5c39f1f757ff5dec1f1bebce3f05"}*/
template('views/website/website_loading',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<div id="website-mask"></div> <div id="website-loading" class="view-container view-container-website"> ';
include('../loading');
$out+=' </div> ';
return new String($out);
});