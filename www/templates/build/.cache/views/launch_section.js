/*TMODJS:{"version":17,"md5":"a3fc0efa021a4c3465f510e0518b5d20"}*/
template('views/launch_section',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,name=$data.name,$out='';$out+='<section id="launch_section" class="active"> <div id="launch-status"> <div id="launch-status-vol">语音版</div> <div id="launch-status-web">网页版</div> </div> <div id="text1"> ';
$out+=$escape(name);
$out+='政务信息公共服务平台 </div> <div id="text2"> 为您提供整体、全面、及时的 </div> <div id="text3"> 政务信息和办事服务 </div> </section> ';
return new String($out);
});