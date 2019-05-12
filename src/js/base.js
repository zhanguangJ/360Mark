//回到顶部
function toTop(){
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

//随机验证码

$(function(){
    var show_num = [];
    draw(show_num);

    $("#canvas").on('click',function(){
        draw(show_num);
    })
    $(".change").on('click',function(){
        draw(show_num);
    })
    $("#input-val").on('blur',function(){
        var val = $("#input-val").val().toLowerCase();
        var num = show_num.join("");
        if(val==''){
            $(".output2").html('请输入验证码！').css('color','red').css('fontSize','12px');
        }else if(val == num){
            $(".output2").html('验证码正确').css('color','#58bc58').css('fontSize','12px');
            $(".input-val").val('');
            draw(show_num);

        }else{
            $(".output2").html('验证码错误！请重新输入！').css('color','red').css('fontSize','12px');
            $("#input-val").val('');
            draw(show_num);
        }
    })
})




function draw(show_num) {
    var canvas_width=$('#canvas').width();
    var canvas_height=$('#canvas').height();
    var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
    var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0,z,x,c,v,b,n,m,a,s,d,f,g,h,j,k,l,q,w,e,r,t,y,u,i,o,p";
    var aCode = sCode.split(",");
    var aLength = aCode.length;//获取到数组的长度
    
    for (var i = 0; i <= 3; i++) {
        var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
        var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
        var txt = aCode[j];//得到随机的一个内容
        show_num[i] = txt.toLowerCase();
        var x = 10 + i * 20;//文字在canvas上的x坐标
        var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
        context.font = "bold 23px 微软雅黑";

        context.translate(x, y);
        context.rotate(deg);

        context.fillStyle = randomColor();
        context.fillText(txt, 0, 0);

        context.rotate(-deg);
        context.translate(-x, -y);
    }
    for (var i = 0; i <= 5; i++) { //验证码上显示线条
        context.strokeStyle = randomColor();
        context.beginPath();
        context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.stroke();
    }
    for (var i = 0; i <= 30; i++) { //验证码上显示小点
        context.strokeStyle = randomColor();
        context.beginPath();
        var x = Math.random() * canvas_width;
        var y = Math.random() * canvas_height;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
    }
}

function randomColor() {//得到随机的颜色值
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}


function loginResgin(){
         //登录注册 弹窗遮罩
     //点击登录 出现登录弹窗界面
    $("#login").click(function(){
        $('.quc-login').css('display','block');//登录界面
        $('.quc-panel-large').css('display','none');//注册界面
        $('.quc-mask').css('display','block');//遮罩
    }) 

    //点击快速注册
    $(".quc-left").click(function(){
        $('.quc-login').css('display','none');//登录界面
        $('.quc-mask').css('display','block');//遮罩           
        setTimeout(function(){
            $('.quc-panel-large').css('display','block');//注册界面
        }, 50)
    })


    //点击关闭按钮
    $('.quc-icon-close').click(function(){
        $('.quc-login').css('display','none');
        $('.quc-panel-large').css('display','none');
        $('.quc-mask').css('display','none');
    })
    //点击注册 出现注册弹窗界面
    $("#resgin").click(function(){
        $('.quc-login').css('display','none');//登录界面
        $('.quc-mask').css('display','block');//遮罩    
        $('.quc-panel-large').css('display','block');//注册界面             
    })

    //点击直接登录
    $(".Direct-login").click(function(){
        setTimeout(function(){
            $('.quc-login').css('display','block');//登录界面
        }, 50)
        $('.quc-panel-large').css('display','none');//注册界面
        $('.quc-mask').css('display','block');//遮罩        
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
}