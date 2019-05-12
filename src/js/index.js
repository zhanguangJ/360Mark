(function(){

    //轮播图
    //swiper基本款
    var s1 = new Swiper('.swiper-container',{
        simulateTouch : false,
        autoplay : {//自动轮播
            delay : 2000,//间隔时间
        },
        loop : true,//无缝 环路
        navigation: {//上下按钮
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {//焦点跟随
            el: '.swiper-pagination',
            clickable: true,//点击焦点跳到指定图片
            renderBullet: function(index, className) {
                return '<span class="' + className + '"></span>';//生成焦点
            }
        },
        effect : 'fade',
        fade: {
          crossFade: false,
        }
    });

    var oBox=document.getElementById('swiper-container');

    oBox.onmouseover=function(){//鼠标经过停止
        s1.autoplay.stop();
    }

    oBox.onmouseout=function(){//鼠标离开就运动
        s1.autoplay.start();
    }   

    //登录注册
    loginResgin();


    window.onresize=window.onscroll=function(){
        //浮动二维码
        var csFloor = document.getElementsByClassName("fixed-code")[0];
        var iScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        setTimeout(function() {
            clearInterval(csFloor.timer);
            var iTop = parseInt((document.documentElement.clientHeight - csFloor.offsetHeight) / 2) + iScrollTop ;
            csFloor.timer = setInterval(function() {
                var iSpeed = (iTop - csFloor.offsetTop) / 8;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                csFloor.offsetTop == iTop ? clearInterval(csFloor.timer) : (csFloor.style.top = csFloor.offsetTop + iSpeed-25 + "px");
          },
        15)},100)

        //回到顶部
        toTop();

    }

    //关闭浮动二维码
    $('.close-icon').click(function(){
        $('.big-box').css('display','none');
        $('.small-box').css('display','block');
    })

    //点击热门活动的li 跳转到对应的详情页
    
    $('.hot-list').on('click','li',function(){
        // console.log($(this).attr('data-id'));
        var id = $(this).attr('data-id')
        window.open('src/html/details.html?' + id);
    })

    //d点击热门商品跳转到详情页
    $('.mod-hodGoods').on('click','li',function(){
        // console.log($(this).attr('data-id'));
        var id = $(this).attr('data-id')
        window.open('src/html/details.html?' + id);
    })


    //首页商品数据渲染

    //ajax发送请求，渲染数据
    //渲染热门活动
    $.ajax({
        type : 'get',
        url : 'src/api/index.php',
        data : 'id=1',
        async : true,
        success : function(str){
            var arr = JSON.parse(str);
            $html = arr.map(function(item) {
                return `<li data-id="${item.id}">
                            <a href="javascript:;">
                                <div class="prd-detail">
                                    <span class="name">${item.name}</span>
                                    <span class="price">
                                        ￥${item.price}
                                    </span>
                                </div>
                                <div class="imgbox">
                                    <img src="src/img/${item.title}${item.bigimg}.png" height="140" width="140"/>
                                </div>
                            </a>
                        </li>`;
            }).join('');
            $(".hot-list").html($html);
        }
    })

    

    //热门商品数据渲染
    
    //路由器
    $.ajax({
        type : 'get',
        url : 'src/api/index.php',
        async : true,
        data : 'id=2',
        success : function(str){
            // console.log(str);
            var arr = JSON.parse(str);
            $html = arr.map(function(item) {
                return `<li data-id="${item.id}">
                            <a href="javascript:;">
                                <div class="imgbox">
                                    <img class="js-lazyload" src="src/img/${item.title}${item.bigimg}.jpg">
                                </div>
                                <h4 class="proname">${item.name}</h4>
                                <p class="proprice">¥${item.price}</p>
                            </a>
                        </li>`;                    
            }).join('');
            console.log($html);
            $(".luyouqi").html($html);
        }
    })

    //儿童守护
    $.ajax({
        type : 'get',
        url : 'src/api/index.php',
        async : true,
        data : 'id=3',
        success : function(str){
            // console.log(str);
            var arr = JSON.parse(str);
            $html = arr.map(function(item) {
                return `<li data-id="${item.id}">
                            <a href="javascript:;">
                                <div class="imgbox">
                                    <img class="js-lazyload" src="src/img/${item.title}${item.bigimg}.jpg">
                                </div>
                                <h4 class="proname">${item.name}</h4>
                                <p class="proprice">¥${item.price}</p>
                            </a>
                        </li>`;                    
            }).join('');
            console.log($html);
            $(".childpro").html($html);
        }
    })

    //家庭安防
     $.ajax({
        type : 'get',
        url : 'src/api/index.php',
        async : true,
        data : 'id=3',
        success : function(str){
            // console.log(str);
            var arr = JSON.parse(str);
            $html = arr.map(function(item) {
                return `<li data-id="${item.id}">
                            <a href="javascript:;">
                                <div class="imgbox">
                                    <img class="js-lazyload" src="src/img/${item.title}${item.bigimg}.jpg">
                                </div>
                                <h4 class="proname">${item.name}</h4>
                                <p class="proprice">¥${item.price}</p>
                            </a>
                        </li>`;                    
            }).join('');
            console.log($html);
            $(".familpro").html($html);
        }
    })   

    //行车安全
     $.ajax({
        type : 'get',
        url : 'src/api/index.php',
        async : true,
        data : 'id=2',
        success : function(str){
            // console.log(str);
            var arr = JSON.parse(str);
            $html = arr.map(function(item) {
                return `<li data-id="${item.id}">
                            <a href="javascript:;">
                                <div class="imgbox">
                                    <img class="js-lazyload" src="src/img/${item.title}${item.bigimg}.jpg">
                                </div>
                                <h4 class="proname">${item.name}</h4>
                                <p class="proprice">¥${item.price}</p>
                            </a>
                        </li>`;                    
            }).join('');
            console.log($html);
            $(".carsc").html($html);
        }
    })       


     //扫地机器人
     $.ajax({
        type : 'get',
        url : 'src/api/index.php',
        async : true,
        data : 'id=3',
        success : function(str){
            // console.log(str);
            var arr = JSON.parse(str);
            $html = arr.map(function(item) {
                return `<li data-id="${item.id}">
                            <a href="javascript:;">
                                <div class="imgbox">
                                    <img class="js-lazyload" src="src/img/${item.title}${item.bigimg}.jpg">
                                </div>
                                <h4 class="proname">${item.name}</h4>
                                <p class="proprice">¥${item.price}</p>
                            </a>
                        </li>`;                    
            }).join('');
            console.log($html);
            $(".rab").html($html);
        }
    }) 





})()



