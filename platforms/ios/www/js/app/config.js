if(typeof undefined === typeof YX) YX = {};
if(typeof undefined === typeof YX.Mobile) YX.Mobile = {};

YX.Mobile.Config = function(){

    var 
        $config = $('#app_config_list');
        $config.html(template('views/config/config'));
    
    var 
        TRANSFORMER = ' none repeat scroll 0% 0% / auto padding-box border-box',
        $color = $('#config_color_list'),
        $font = $('#config_font_list'),
        $reader = $('#config_reader_list');

        $color.on('tap','li', function(){
            window.color = $(this).css('background').replace(TRANSFORMER,'');
            $('header').css('background-color', window.color);
            $('.header-secondary').css('background-color', window.color);
        });

        $font.on('tap','li', function(){
            window.font = $(this).css('font-size');
            
            $('article').css('font-size', window.font);
            $('footer').css('font-size', window.font);
            $('.header-secondary').css('font-size', window.font);
            $('td').css('font-size', window.font);

            $font.find('li').removeClass('active');
            $(this).addClass('active');
        });

        $reader.on('tap', 'li', function() {
            $reader.find('li').removeClass('active');
            $(this).addClass('active');

            if ($(this).attr('id') == 'config_reader_start') {
                App.speaker.open();
            }
            else if ($(this).attr('id') == 'config_reader_stop') {
                App.speaker.close();
            }
        })
};
