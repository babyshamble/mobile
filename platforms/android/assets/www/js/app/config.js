if(typeof undefined === typeof YX) YX = {};
if(typeof undefined === typeof YX.Mobile) YX.Mobile = {};

YX.Mobile.Config = function(){
    var config = this;

    var 
        $config = $('#app_config_list');
        $config.html(template('views/config/config'));
    
    var 
        $color = $('#config_color_list'),
        $font = $('#config_font_list'),
        $reader = $('#config_reader_list');

    $color.on('tap','li', function(){   
        var color = $(this).attr('mask');
        if (color == 'gray') {
            App.theme.apply('re', 'background-color', 'css/re.css');
        } else if(color == 'red'){
            App.theme.release('re', 'background-color');
        }   
    });

    $font.on('tap','li', function(){
        $font.find('li').removeClass('active');
        $(this).addClass('active');
        
        var font = $(this).attr('id');
        if (font == 'config_font_big') {
            App.theme.apply('re-font', 'fontsize', 'css/re-font.css');
        } else if(font == 'config_font_small'){
            App.theme.release('re-font', 'fontsize');
        }   
    });

    $reader.on('tap', 'li', function() {
        $reader.find('li').removeClass('active');
        $(this).addClass('active');

        if ($(this).attr('id') == 'config_reader_start') {
            App.page('launch').mask = 'open';
            App.speaker.open();
        }
        else if ($(this).attr('id') == 'config_reader_stop') {
            App.page('launch').mask = 'close';
            App.speaker.close();
        }
    });

    return config;
};

YX.Mobile.TestVolStu = function(){
    $('#config_reader_list').find('li').removeClass('active');
    if (!App.page('launch').mask || App.page('launch').mask == 'open') {
        $('#config_reader_start').addClass('active');
        App.speaker.open();
    } else if (App.page('launch').mask == 'close'){
        $('#config_reader_stop').addClass('active');
        App.speaker.close();
    }
};

