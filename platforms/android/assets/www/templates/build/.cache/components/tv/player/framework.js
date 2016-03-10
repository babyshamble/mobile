/*TMODJS:{"version":1,"md5":"36a197e06d0de2305338419dafe0ecea"}*/
template('components/tv/player/framework',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,itename=$data.itename,name=$data.name,$each=$utils.$each,sentences=$data.sentences,chapter=$data.chapter,ci=$data.ci,sentence=$data.sentence,si=$data.si,$out='';$out+='<h3 id="screen-site">';
$out+=$escape(itename);
$out+='</h3> <div id="screen-framework"></div> <div id="screen-title">';
$out+=$escape(name);
$out+='</div> <div id="screen-lantern"> <ul> <li class="show">即将开始播放...</li> ';
$each(sentences,function(chapter,ci){
$out+=' ';
$each(chapter,function(sentence,si){
$out+=' <li data-chapterIndex="';
$out+=$escape(ci);
$out+='" data-sentenceIndex="';
$out+=$escape(si);
$out+='">';
$out+=$escape(sentence);
$out+='</li> ';
});
$out+=' ';
});
$out+=' </ul> </div> ';
return new String($out);
});