/*TMODJS:{"version":13,"md5":"81dbb02b632e94596f5b7c89664590b8"}*/
template('views/dprop/dprop_header',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,id=$data.id,name=$data.name,$out='';$out+='<div class="dprop_header" id="';
$out+=$escape(id);
$out+='" >';
$out+=$escape(name);
$out+=' &nbsp &nbsp·</div> ';
return new String($out);
});