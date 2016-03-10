/*TMODJS:{"version":2,"md5":"f7a63eb3edce466eea80c6474f0af7c3"}*/
template('views/navigation/matrix',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,j=$data.j,$each=$utils.$each,navigation=$data.navigation,nav=$data.nav,i=$data.i,limit=$data.limit,$escape=$utils.$escape,$out='';if(j = 0){
}
$out+=' <div id="card_stage"> <div id="card_container">  ';
$each(navigation,function(nav,i){
$out+=' ';
if((0 === j%limit)){
$out+=' <div id="col';
$out+=$escape($helpers. col(j/limit ));
$out+='" class="card_col"> ';
}
$out+=' <a id="';
$out+=$escape(nav.id);
$out+='" class="card" rel="" href=""> <div class="card_cont"> <div class="card_text"> ';
$out+=$escape(nav.name);
$out+=' </div> </div> </a> ';
if(((limit-1) === j%limit)){
$out+=' </div> ';
}
$out+=' ';
if(j++){
}
$out+=' ';
});
$out+=' </div> </div> </div> ';
return new String($out);
});