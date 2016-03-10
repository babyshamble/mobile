/*TMODJS:{"version":1,"md5":"b37e0840361f1e0fbcea54fa21ba174d"}*/
template('views/website/website',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+=' <div id="website-mask"></div>  <a id="website-prev" class="website-nav website-nav-left" data-action="nav-prev" href=""> <i></i> <label>上一个站点</label> <span>...</span> </a>  <a id="website-next" class="website-nav website-nav-right" data-action="nav-next" href=""> <i></i> <label>下一个站点</label> <span>...</span> </a>  <div id="website-box">  <div id="website-wrapper">  <i id="website-close" class="icons-website icons-website-close"></i>  <div id="website-sidetool"> <ul id="sidetool-changeMode"> <li class="icons-website icons-website-tab_comfort" data-mode="comfort"></li> <li class="icons-website icons-website-tab_original" data-mode="original"></li> <li class="icons-website icons-website-tab_tv hide" data-mode="tv"></li> </ul> </div>  <div id="website-container"> ';
include('./website_loading');
$out+=' </div> </div> </div> ';
return new String($out);
});