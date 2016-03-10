/*TMODJS:{"version":11,"md5":"b0292c6ca49f238a841e7f5c6fe07ba4"}*/
template('list/list',function($data,$filename
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
if(item.type === 'multithumbnails'){
$out+=' ';
include('./item-with-multi-thumbnails',item);
$out+=' ';
}
$out+=' ';
});
$out+=' ';
return new String($out);
});