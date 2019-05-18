
require.config({
    paths : {
        'jquery' : '/360Mark/src/lib/jquery-1.10.1.min',
        'swiper' : '../lib/swiper.min'       
    },
    shim : {//设置依赖关系
        'swiper' : ['jquery'],
        'base' : ['jquery','swiper'],
        'index' : ['jquery','swiper','base']
    }
})

require(["swiper","jquery","base","index"],function(){

})