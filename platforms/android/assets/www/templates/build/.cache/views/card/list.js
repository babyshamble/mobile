/*TMODJS:{"version":1,"md5":"6385a44e67ea95312e16f84bf0e00d4e"}*/
template('views/card/list',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,item=$data.item,ii=$data.ii,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$each(list,function(item,ii){
$out+=' ';
if(item.type === 'thumbnail'){
$out+=' ';
include('./item-with-thumbnail',item);
$out+=' ';
}
$out+=' ';
if(item.type === 'nothumbnail'){
$out+=' ';
include('./item-without-thumbnail',item);
$out+=' ';
}
$out+=' ';
});
$out+=' ';
return new String($out);
});