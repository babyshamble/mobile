/*TMODJS:{"version":1,"md5":"7758d38f85eeb2572602367fd99e980e"}*/
template('components/tv/player/text-only',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,chapter=$data.chapter,sentence=$data.sentence,si=$data.si,$escape=$utils.$escape,$out='';$out+='<div id="screen-textblocks-wrapper"> <div id="screen-textblocks-fordotline"> <div id="screen-textblocks-inner-wrapper"> <div id="screen-textblocks-chapter"> ';
$each(chapter,function(sentence,si){
$out+=' <span data-index="';
$out+=$escape(si);
$out+='">';
$out+=$escape(sentence);
$out+='，</span> ';
});
$out+=' </div> </div> </div> </div> ';
return new String($out);
});