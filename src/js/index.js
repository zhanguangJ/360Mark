(function(){
    //轮播图
    //swiper基本款
    var s1 = new Swiper('.swiper-container',{
        simulateTouch : false,
        autoplay : {//自动轮播
            delay : 2000,//间隔时间
            disableOnInteraction:false//拖拽完后还能继续自动轮播
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
     //登录注册 弹窗遮罩
    $("#login").click(function(){
        $('.quc-panel').css('display','block');
        $('.quc-mask').css('display','block');
    }) 
    $('.quc-icon-close').click(function(){
        $('.quc-panel').css('display','none');
        $('.quc-mask').css('display','none');
    })

    //登录切换
    $('.quc-tab-list').on( 'click',"div",function(){
        $(this).addClass('quc-tab-item-active')
        $(this).siblings('div').removeClass('quc-tab-item-active');
        // console.log($(this).children().html());
        var content = $(this).children().html();
        if (content) {
            //短信验证
            $('.quc-mobile>input').attr('type','mobile').attr('placeholder','手机号').attr('maxlength','11');
            $('.quc-psw>input').attr('type','smscode').attr('placeholder','短信验证码');
            $('.quc-input-append').css('display','block');
        }else{
            //360账号登录
            $('.quc-mobile>input').attr('type','userName').attr('placeholder','手机号/用户名/邮箱');
            $('.quc-psw>input').attr('type','password').attr('placeholder','密码');
            $('.quc-input-append').css('display','none');
        }
    })



    

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
        //滚动距离:滚动事件里面使用，并且在滚动中才能获取
        var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
        if(scrollTop>=600){
            //当滚动到300px的时候，盒子显示，否则隐藏
            $('.toback').css('display','block');
        }
        else{
            $('.toback').css('display','none');
        }
        
        $('.toback').click(function(){
            //点击缓慢回到顶部
            var scrollTop=window.setInterval(function(){
                //pageYOffset获取窗口离上面的距离
                var pop=window.pageYOffset;
                if(pop>0){
                    window.scrollTo(0,pop-1);
                }
                else{
                    window.clearInterval(scrollTop);
                }
            },30);            
        })

    }


    //关闭浮动二维码
    $('.close-icon').click(function(){
        $('.big-box').css('display','none');
        $('.small-box').css('display','block');
    })


})()

