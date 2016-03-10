/*TMODJS:{"version":17,"md5":"dfa28757b16cb43f0796dbdffdd2cba4"}*/
template('views/list/item-with-multi-thumbnails',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,thumbnail=$data.thumbnail,$escape=$utils.$escape,id=$data.id,$out='';$out+='<li class="list-item';
if(thumbnail){
$out+=' no-thumbnail';
}
$out+='" data-image="';
$out+=$escape(thumbnail);
$out+='" data-id="';
$out+=$escape(id);
$out+='" mask="#article_section?aid=';
$out+=$escape(id);
$out+='"> <div class="list-thumbnail" style="background-image: none"></div> <div class="list-content"> <div class="list-title">中信银行：发挥集团性综合优势助力“一带一路”走向深化</div> <p class="list-brief">测试文章简介</p> </div> <div class="list-footprint"> <span class="list-source">经济工作</span> <span class="list-date">07/10 10:40</span> </div> </li> ';
return new String($out);
});