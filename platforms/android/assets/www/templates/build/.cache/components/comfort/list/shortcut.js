/*TMODJS:{"version":1,"md5":"2b91790560747caa60d94bc9ef70f3b5"}*/
template('components/comfort/list/shortcut',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,siteMap=$data.siteMap,siteMapItem=$data.siteMapItem,index=$data.index,$escape=$utils.$escape,$out='';$out+='<ul class="clearfix"> ';
$each(siteMap,function(siteMapItem,index){
$out+=' ';
if(index < 12){
$out+=' <li data-siteid="';
$out+=$escape(siteMapItem.id);
$out+='"><a href="#/web/';
$out+=$escape(siteMapItem.id);
$out+='">';
$out+=$escape(siteMapItem.name);
$out+='</a></li> ';
}
$out+=' ';
});
$out+=' <li><a href="#/web/sitemap">更多</a></li> </ul> ';
return new String($out);
});