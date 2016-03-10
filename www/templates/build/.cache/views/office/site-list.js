/*TMODJS:{"version":14,"md5":"16f5ee426188c3e4c5d3314aea471531"}*/
template('views/office/site-list',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,sites=$data.sites,item=$data.item,$index=$data.$index,$escape=$utils.$escape,$out='';$each(sites,function(item,$index){
$out+=' <li class="square_item" data-id="';
$out+=$escape(item.id);
$out+='"> <a href="#olist_section?lid=';
$out+=$escape(item.id);
$out+='" data-target="section"> <table> <tbody> <tr> <td> ';
$out+=$escape(item.name);
$out+=' </td> </tr> </tbody> </table> </a> </li> ';
});
return new String($out);
});