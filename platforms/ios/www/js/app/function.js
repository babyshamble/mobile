function getChapter(e){
    var cache = [];
    var newCache = [];
    var chapter=[];

    TRANSFORMER = /<p[^>]*>|<\/p[^>]*>|<br[^>]*>|<span[^>]*>|<\/span[^>]*>|<table[^>]*>|<\/table[^>]*>/g;

    e = e.replace(/(&gt;)/ig,">").replace(/(&lt;)/ig,"<").replace(/(&nbsp;)/ig,"");
    cache = e.split(TRANSFORMER);

    for(var i=0; i<cache.length; i++){
        if(cache[i] !== '' && cache[i] !== '　　'){
           newCache.push(cache[i]);
        }
    }

    for(var i=0; i<newCache.length; i++){
        var div = document.createElement('DIV');
        div.innerHTML = newCache[i];
        var nodes = $('img', div);
        if(nodes.length > 0){   //说明包含img标签
            for(var n=0; n<div.childNodes.length; n++){
                var node = div.childNodes[n];
                if(node.nodeName == 'IMG' || node.nodeName == 'img'){//
                    var inner = "<div class='text_img'>"
                                    +"<img src='"+ node.src +"'>"
                                +"</div>"
                    chapter.push({type: 'image', value: inner});
                }
                else if(node.nodeName == '#text'){  //这是文本 直接把p里的内容丢进去
                    chapter.push({type: 'text', value: node.nodeValue});
                }
            }
        }
        else{
            //没有图片的情况但是有html标签
            //过滤掉所有<> 还原纯文本
            newCache[i] = newCache[i].replace(/<[^<>]*>|&nbsp/g,"");
            chapter.push({type: 'text', value: newCache[i]});
        }
    }
    return chapter; 
}

function showArt(e,container){
    $(container).empty();

    for(var i=0; i<e.length; i++){
        if(e[i].type == 'text'){
            var text = "<p>"
                            +e[i].value
                        +"</p>";
            $(container).append(text);
        }
        else if(e[i].type == 'image'){ //图片
            $(container).append(e[i].value);
        }

    }
}


function showNav1(container,data){
    $(container).empty();
    for(var g in data){
        var nav1 = "<li class='left li_color' iam='"+g+"'>" 
                        +data[g].name
                    +"</li>";
        $(container).append(nav1);            
    }   
}

function showNav2(container,data){
    $(container).empty();
    for(var m in data){
        var nav2 = "<li code="+data[m].code+">" 
                    +data[m].name
                +"</li>";
        $(container).append(nav2);
    }
}

function changeNav2Width(e){
    var nav2_width = 'translate(0px,0px)';
    e.css({
        'transform': nav2_width,
        '-webkit-transform': nav2_width,
        '-ms-transform': nav2_width,
        '-moz-transform': nav2_width,
        '-o-transform': nav2_width,
    });
}

function showTitle(btn,container,data){
    $(btn).on('click','li',function(){
        $(container).empty();

        var code = $(this).attr('code');
        code = $(this).attr('code') ? $(this).attr('code') : '1-1';
        var mcode = code.substr(0,1);
        
        // s      
        // switch(n){
        //     case 1:
        //       执行代码块 1
        //       break;
        //     case 2:
        //       执行代码块 2
        //       break;
        //     default:
        //       n 与 case 1 和 case 2 不同时执行的代码
        // }

        for(var g in data[mcode].metro[code].grids){
            var did = data[mcode].metro[code].grids[g].did;
            var mask = did ? data[mcode].metro[code].grids[g].did : data[mcode].metro[code].grids[g].id;
            var des = did ? '#text_section?did='+mask+'' : '#list_section?did='+mask+'';
            var text = 
                        "<li class='list_scroll'>" 
                            +"<a data-target='section' href="+des+">"
                                +"<div class='list_scrolltxt'>"
                                +data[mcode].metro[code].grids[g].name
                                +"</div>"
                            +"</a>"
                        +"</li>";

            $(container).append(text);           
        }

        $(btn).find('li').removeClass('first_li').addClass('li_color');
        $(this).removeClass('li_color').addClass('first_li');
    })

    $(btn).find('li:eq(0)').trigger('click');
}

function bind_click(click_btn,container,data){
    $(click_btn).on('click','li',function(){
            var iam = $(this).attr('iam');
            var nav = data[iam].metro
            showNav2($(container),nav);
            changeNav2Width($(container));

            $(click_btn).find('li').removeClass('first_li').addClass('li_color');
            $(this).removeClass('li_color').addClass('first_li');

            $(container).find('li').removeClass('first_li').addClass('li_color');
    })
}