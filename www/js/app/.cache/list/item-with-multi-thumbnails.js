/*TMODJS:{"version":6,"md5":"eab0644dead38fe79e209da8ed63ca69"}*/
template('list/item-with-multi-thumbnails',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,thumbnail=$data.thumbnail,$escape=$utils.$escape,aid=$data.aid,$out='';$out+='<li class="list-item';
if(thumbnail){
$out+=' no-thumbnail';
}
$out+='" data-image="';
$out+=$escape(thumbnail);
$out+='" data-id="';
$out+=$escape(aid);
$out+='"> <a href="#article_section?aid=';
$out+=$escape(aid);
$out+='" data-target="section"> <div class="list-thumbnail" style="background-image: none"></div> <div class="list-content"> <h3 class="list-title">中信银行：发挥集团性综合优势助力“一带一路”走向深化</h3> <p class="list-brief">测试文章简介</p> </div> <div class="list-footprint"> <span class="list-source">经济工作</span> <span class="list-date">07/10 10:40</span> </div> </a> </li> ';
return new String($out);
});