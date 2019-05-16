(function(){
    //下拉搜索数据渲染
    function search(){
        var p = new Promise(function(succfn){
            $.ajax({
                type : 'get',
                url : 'src/api/main.php',
                async : true,
                data : {
                    id : 55,
                    time : new Date()
                },
                success : function(str){
                    succfn(str);
                }
            })
        })
        p.then(function(str){
            var arr = JSON.parse(str);
            $html = arr.map(function(item) {
                return `<li data-name="${item.name}" class="">
                            <div class="sug-item">
                                ${item.name}
                            </div>
                            <div class="desc">约有${item.sum}件</div>
                        </li>`;                    
            }).join('');
            $(".__mall_suggest__").html($html);        
        }).then(function(){
            //下拉搜索
            find();            
        })
    }
    //下拉搜索菜单
    search();



    //下拉搜索框
    function find(){
        //点击搜索框出项下拉菜单
        $(".text").click(function(ev){
            $(".__mall_suggest__").css("display",'block');
            ev.stopPropagation();
        })

        //点击那个li就跳转到列表页
        $(".__mall_suggest__").on('click', 'li', function() {
            var name = $(this).attr('data-name')
            window.open('src/html/list.html?' + name);
        });

        //键盘事件
        //在文档加载后激活函数
        var index = -1;
        //li的长度
        var lisize = $(".__mall_suggest__ li").size();
        $(document).ready(function() {
            $(".text").keydown(function(ev) {
                //往下走
                if (ev.keyCode === 40) {
                    index ++;
                    for(var i = 0; i < lisize; i++){
                        $(".__mall_suggest__ li").eq(i).removeClass('active');
                    }
                    if (index > lisize-1) {
                        index = 0;
                    };
                    $val = $(".__mall_suggest__ li").eq(index).children('div').eq(0).html().trim();
                    $(".text").attr('placeholder','');
                    $(".text").val($val);
                    $(".__mall_suggest__ li").eq(index).addClass('active');
                };
                //往上走
                if (ev.keyCode === 38) {
                    index --;
                    for(var i = 0; i < lisize; i++){
                        $(".__mall_suggest__ li").eq(i).removeClass('active');
                    }
                    if (index < 0) {
                        index = lisize-1;
                    };
                    $val = $(".__mall_suggest__ li").eq(index).children('div').eq(0).html().trim();
                    $(".text").attr('placeholder','');
                    $(".text").val($val);
                    $(".__mall_suggest__ li").eq(index).addClass('active');
                };
                if (ev.keyCode === 13) {
                    var name = $(".__mall_suggest__ li").eq(index).children('div').eq(0).html().trim();
                    window.open('src/html/list.html?' + name);
                };
            });
        });

        $(document).click(function(){
            $(".__mall_suggest__").css("display",'none');
            $(".text").attr('placeholder','360儿童手表');
            $(".text").val('');
        })


        //点击搜索按钮发送表单内的内容到列表页
        $(".search").click(function(){
            var name = $(".text").attr('placeholder')+$(".text").val();
            window.open('src/html/list.html?' + name.trim());

        })
    }


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


    timeToBuy();
    //限时购
    function timeToBuy(){
        var endTime = new Date("2019-05-13 10:00:00");
        //把年月日时分秒的时间转换成为毫秒数
        endSeconds = endTime.getTime();//结束时间的毫秒数
        //定义变量  天数 小时 分钟  秒数  
        var d = h = m = s =  0;
        //设置定时器  实现一个秒杀效果
        var timer = setInterval(qiang,1000);
        
        function qiang(){
            // 获取当前系统时间
            var nowTime = new Date();
            // 获取当前时间差---nowTime.getTime()现在时间的毫秒数
            var remain = parseInt((endSeconds-nowTime.getTime())/1000);
            //判断秒杀是否过期
            if(remain>0){
                //1.计算剩余天数  （除以60*60*24  取整数  获取剩余天数）
                d = parseInt(remain/86400)
                //2.计算剩余小时（除以60*60 转换成为小时了  与24进行取模   获取剩余小时）
                h = parseInt((remain/3600) % 24);
                //3.计算剩余分钟（除以60  转换成为分钟了  与60进行取模   获取剩余分钟）
                m = parseInt((remain/60) % 60);
                //4.计算剩余秒数（与60进行取模   获取剩余秒数）
                s = parseInt((remain) % 60);
                
                //统一利用两位数 表示 剩余的天、小时、分钟、秒
                d= d < 10 ? '0' + d:d;
                h= h < 10 ? '0' + h:h;
                m= m < 10 ? '0' + m:m;
                s= s < 10 ? '0' + s:s;
                
            }else{
                // 秒杀过期  清除老的定时器 开启新一轮定时器 
                clearInterval(timer);
                //开启新的定时器   12个小时
                endSeconds = endSeconds + 43200000;
                timer = setInterval(qiang,1000);
                // d = h = m = s = '00' 
            }
            //将剩余的天数、小时、分钟、秒  小时到指定网页中去
            $('.countdown span').eq(0).html(h);
            $('.countdown span').eq(2).html(m);
            $('.countdown span').eq(4).html(s);
        }

    }

    //限时购商品数据渲染
    $.ajax({
        type : 'get',
        url : 'src/api/main.php',
        data : {
            id : 99,
            time : new Date()
        },
        async : true,
        success : function(str){
            var arr = JSON.parse(str);
            $html = arr.map(function(item) {
                return `<li class="kill-item">
                            <div class="kill-item-box">
                                <div class="prod-img">
                                        <img src="src/img/${item.title}${item.bigimg}.jpg">
                                </div>
                                <div class="text-box">
                                    <p class="name">${item.name}</p>
                                    <p class="price">
                                        <b class="cur-price">￥${item.newprice}</b>
                                        <del>￥${item.oldprice}</del>
                                    </p>
                                    <p class="info">
                                        <span class="num"></span>
                                        <a href="javascript:;" class="killbtn ${item.classNa}"  data-id="${item.dataId}">${item.qiang}</a>
                                    </p>
                                </div>
                            </div>
                        </li>`;
            }).join('');
            $(".kill-list").html($html);
        }
    })

    //限时购跳转详情页
    $(".kill-list").on('click', '.abled', function() {
        var id = $(this).attr('data-id')
        window.open('src/html/details.html?' + id);        
    });


    //点击轮播图跳转
    $('#lunbotu').on('click','img',function(){
        // console.log($(this).attr('data-id'));
        var id = $(this).attr('data-id')
        window.open('src/html/details.html?' + id);
    })       

    //点击热门活动的li 跳转到对应的详情页   
    $('.hot-list').on('click','li',function(){
        // console.log($(this).attr('data-id'));
        var id = $(this).attr('data-id')
        window.open('src/html/details.html?' + id);
    })

    //点击热门商品的广告跳转到列表页
    $('.mod-hodGoods').on('click','.prod-tit',function(){
        // console.log($(this).attr('data-name'));
        var name = $(this).attr('data-name')
        window.open('src/html/list.html?' + name);
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
        url : 'src/api/main.php',
        data : {
            id : 1,
            time : new Date()
        },
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
        url : 'src/api/main.php',
        async : true,
        data : {
            id : 2,
            time : new Date()
        },
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
            $(".luyouqi").html($html);
        }
    })

    //儿童守护
    $.ajax({
        type : 'get',
        url : 'src/api/main.php',
        async : true,
        data : {
            id : 3,
            time : new Date()
        },
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
            $(".childpro").html($html);
        }
    })

    //家庭安防
     $.ajax({
        type : 'get',
        url : 'src/api/main.php',
        async : true,
        data : {
            id : 4,
            time : new Date()
        },
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
            $(".familpro").html($html);
        }
    })   

    //行车安全
     $.ajax({
        type : 'get',
        url : 'src/api/main.php',
        async : true,
        data : {
            id : 2,
            time : new Date()
        },
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
            $(".carsc").html($html);
        }
    })       


    //扫地机器人
    $.ajax({
        type : 'get',
        url : 'src/api/main.php',
        async : true,
        data : {
            id : 3,
            time : new Date()
        },
        success : function(str){
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
            $(".rab").html($html);
        }
    }) 



})()



