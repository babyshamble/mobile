App.page('launch',function(){
    this.show = function() {
        $('#launch-status-vol').on('tap', function() {
            App.page('launch').mask = 'open';
            J.Router.goTo('#information_section');
        });

        $('#launch-status-web').on('tap', function() {
            App.page('launch').mask = 'close';
            J.Router.goTo('#information_section');
        });

       
        setTimeout(function() { 
            text1();
        }, 100); 

        setTimeout(function() { 
            text2();
        }, 900); 

        setTimeout(function() { 
            text3();
        }, 1600); 
    };

    function text1() {
        $('#text1').addClass('text1');
    };

    function text2() {
        $('#text2').addClass('text2');
    };

    function text3() {
        $('#text3').addClass('text3');
    };

});

