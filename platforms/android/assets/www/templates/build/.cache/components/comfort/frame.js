/*TMODJS:{"version":1,"md5":"a98328b4473c92b8f7748c7c6bea088a"}*/
template('components/comfort/frame',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,site=$data.site,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+=' <div class="website-mapping"> <div class="website-mapping-container"> </div> </div>  <div id="website-content"> <div id="website-context"> <div id="website-context-logo"> <h2 class="">';
$out+=$escape(site.name);
$out+='<br>LOGO</h2> </div> <div id="website-context-search"> <input id="search-key"type="text" name="inpsearch" class="inp_search" value=""> <input id="search-submit" class="bt_search" type="submit" value=""> </div> <div id="website-context-navbox"></div> <div id="website-context-system-hot"> </div> <div id="website-context-site-hot"> </div> </div> <div id="website-list"> <div id="website-mapping-3rd"></div> <div id="website-feeds"> ';
include('./list/loading');
$out+=' </div> <div class="website-downloading"> <div class="downloadingbg"> <p class="load"><a href="javascript:;">点击加载更多</a></p> <p class="onloading"><img src="http://static.jian.news.baidu.com/static/jian/widget/loading/downloading_d04a658.gif"><b>正在加载，请稍候...</b></p> <p class="nocontent"><b>没有更多内容了！</b></p> </div> </div> </div> </div> ';
return new String($out);
});