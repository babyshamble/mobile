/*TMODJS:{"version":1,"md5":"63d0a52e33067c034b56d6ea48e427ca"}*/
template('views/aside-system-list',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,counter=$data.counter,$each=$utils.$each,systems=$data.systems,system=$data.system,si=$data.si,$escape=$utils.$escape,counter2=$data.counter2,site=$data.site,ssi=$data.ssi,$out='';if(counter = 0){
}
$out+=' ';
$each(systems,function(system,si){
$out+=' ';
if(counter++){
}
$out+=' <div class="header">';
$out+=$escape(system.name);
$out+='</div> <ul class="menu"> ';
if(counter2 = 0){
}
$out+=' ';
$each(system.sites,function(site,ssi){
$out+=' ';
if(counter2++){
}
$out+=' <li data-wid="';
$out+=$escape(site.id);
$out+='"> <a href="#web_section?wid=';
$out+=$escape(site.id);
$out+='" target="section">';
$out+=$escape(site.name);
$out+='</a> </li> ';
});
$out+=' ';
if(counter2 === 0){
$out+=' <li>此分类下暂时没有数据</li> ';
}
$out+=' </ul> ';
});
$out+=' ';
if(counter === 0){
$out+=' <div id="web-aside-nodata"> <p>暂时没有数据</p> </div> ';
}
$out+=' ';
return new String($out);
});