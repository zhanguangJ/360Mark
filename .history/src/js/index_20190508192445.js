window.onload = function(){
    layui.use('carousel', function(){
        var carousel = layui.carousel;
        //建造实例
        carousel.render({
            elem: '#test1'
            ,interval: 1800
            ,anim: 'fade'
            ,height: '120px'
        });
    });
}

