/*TMODJS:{"version":1,"md5":"22531d7139d72f63496543fc5954e092"}*/
template('header/channel',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,cates=$data.cates,cate=$data.cate,index=$data.index,$escape=$utils.$escape,$out='';$out+='<ul> ';
$each(cates,function(cate,index){
$out+=' <li> <a href="#/navigation/';
$out+=$escape(cate.cid);
$out+='">';
$out+=$escape(cate.cname);
$out+='</a> </li> ';
});
$out+=' </ul> ';
return new String($out);
});