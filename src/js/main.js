
require.config({
    paths : {
        'jquery' : '../lib/jquery-1.10.1.min',
        'swiper' : '../lib/swiper.min'       
    },
    shim : {//设置依赖关系
        'swiper' : ['jquery'],
        'index' : ['jquery','swiper']
    }
})

require(["swiper","jquery","index"],function(){

})