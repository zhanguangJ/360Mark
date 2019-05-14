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

var isOk1 = false;
var isOK2 = false;
var isOk3 = false;
var isOK4 = false;
var isOk5 = false;

var phone = '';
var password = '';
 
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
            isOK2 = true;
            $(".input-val").val('');
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


//登录注册 弹窗遮罩
//购物车点击登录
//点击登录 出现登录弹窗界面
function loginResgin(){
    $("#login").click(function(){
        $('.quc-login').css('display','block');//登录界面
        $('.quc-panel-large').css('display','none');//注册界面
        $('.quc-mask').css('display','block');//遮罩
    }) 

    $(".tip-login").click(function(){
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
        $('.quc-input-append').css('display','block');         
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






//注册表单验证
//手机号验证
$(".phoneRegister").children('div').eq(0).children('input').on('keyup',function(){
    phone = $(this).val();
    // console.log($(this).next().html('111').css("color","#58bc58"));
    if (phone) {
        if(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(phone)){   
            //发送ajax 验证手机号是否被注册
            $.ajax({
                type : 'get',
                url : 'src/api/login.php',
                data : {
                    phone : phone,
                    time : new Date()
                },
                success : function(str){
                    var arr = JSON.parse(str);
                    var res = arr.result1;
                    if (res != 1) {
                        $(".phoneRegister").children('div').eq(0).children('input').next().html('验证通过').css({
                            color: '#58bc58',
                            fontSize: '12px'
                        });
                        isOk1 = true;                         
                    }else{
                         $(".phoneRegister").children('div').eq(0).children('input').next().html('该手机号已经注册，请直接用手机号登录').css({
                            color: 'red',
                            fontSize: '12px'
                        });                      
                    }
                }
            })                  
        }else{
            $(this).next().html('手机号码格式不正确').css({
                color: 'red',
                fontSize: '12px'
            });;
            isOk1 = false;
        }
    }else{
        $(this).next().html('请填写手机号码').css({
            color: 'red',
            fontSize: '12px'
        });            
    }
})

//短信验证码
$(".phoneRegister").children('div').eq(2).children('input').on('blur',function(){
    isOk3 = false;
})
//验证密码
$(".phoneRegister").children('div').eq(3).children('input').on('blur',function(){
    password = $(this).val();
    if (password) {
        if (password.length >= 8) {
            if(/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S+$/.test(password)){
                $(this).next().html('');
                isOk4 = true;                       
            }else{                
                $(this).next().html('至少包含数字/字母/字符两种组合，请重新输入').css({
                    color: 'red',
                    fontSize: '12px'
                }); 
            }
        }else{
            $(this).next().html('密码不能少于8位字符，请重新输入').css({
                color: 'red',
                fontSize: '12px'
            });            
        }
    }else{
        $(this).next().html('请填写密码').css({
            color: 'red',
            fontSize: '12px'
        });
    }
})

//判断是否勾选中了
$(".phoneRegister").children('div').eq(4).find('input').on('blur',function(){
    if ($(this).is(':checked')) {
        isOk5 = true;
    }else{
        isOk5 = false;
    }    
})

//点击注册按钮
$(".phoneRegister").children('div').eq(5).children('input').on('click',function(){
    if (isOk1 && isOK2 && isOk3 && isOk4 && isOk5) {
        //发送ajax 插入数据库
        $.ajax({
            type : 'post',
            url : 'src/api/register.php',
            data : {
                phone : phone,
                password : password,
                time : new Date()
            },
            success : function(str){
                console.log(str);
            }
        })
        // 未完成...................................................................
        alert('成功注册,点击确定后跳转首页');
        loginOf(phone);
    }else{
        alert('请填写完整的信息');
    }
})

//登录验证
//手机号
$('.log-in').children('div').eq(2).children('input').click( function() {
    var phoneLogin = $('.log-in').children('div').eq(0).children('input').val().trim();
    var pswLogin = $('.log-in').children('div').eq(1).children('input').val().trim();
    $.ajax({
        type : 'post',
        url : 'src/api/login.php',
        data : {
            phoneLogin : phoneLogin,
            pswLogin : pswLogin,
            time : new Date()
        },
        success : function(str){
            var arr = JSON.parse(str);
            console.log(arr);
            var res2 = arr.result2;
            if (res2 == 1) {
                //登录成功 设置cookie
                loginOf(phoneLogin);
            }else{
                alert("账号或密码错误");
            }
        }
    })
});


function loginOf(name){
    $('.loginbefore').css('display','none');
    $('.loginafter').css('display','block');
    $('.quc-login').css('display','none');
    $('.quc-mask').css('display','none');
    setCookie('username',name,1);
    uName();
}
uName();

function uName(){
    //渲染用户名
    var username = getCookie('username');
    $html1 = `<span class="top-uname popUsername">
                            ${username}
                        </span>
            <div class="popbox">
                <a href="javascript:;" class="top-uname popUsername">${username}</a>
                <ul class="topuserbox" >
                    <li>
                        <a href="javascript:;">我的订单</a>
                    </li>
                    <li>
                        <a href="javascript:;">我的优惠券</a>
                    </li>
                    <li>
                        <a href="javascript:;">我的喜欢</a>
                    </li>
                    <li>
                        <a href="javascript:;">我的积分</a>
                    </li>
                    <li>
                        <a href="javascript:;">收货地址</a>
                    </li>
                    <li>
                        <a href="javascript:;">账号设置</a>
                    </li>
                    <li class="quit">
                        <a href="javascript:;">退出登录</a>
                    </li>
                </ul>`;
    $('.loginWrap').html($html1);

}


//看是否存在cookie
function undateStatus(){
    var username = getCookie('username');
    if (username) {
        $('.loginbefore').css('display','none');
        $('.loginafter').css('display','block');
        $('.cart-tips').css('display','none');
        $('.cart-info').css('display','block');
        $('.popUsername').html(username);
    }else{
        $('.loginbefore').css('display','block');
        $('.loginafter').css('display','none');
        $('.cart-tips').css('display','none');
        $('.cart-info').css('display','block');   
    }
}
undateStatus();

//用户退出
function quit(){
    $(".quit").click(function(){
        var username = getCookie('username');
        removeCookie('username');
        $('.loginbefore').css('display','block');
        $('.loginafter').css('display','none'); 
    })   
}
quit();




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

function setCookie(key, val, iday) {
    //key:键名  val:键值  iday：失效时间
    //document.cookie = 'name=malin;expires=date;path=/';
    var now = new Date();
    now.setDate(now.getDate() + iday); //iday==5:5天后失效，-1：立即失效
    document.cookie = key + '=' + val + ';expires=' + now + ';path=/';
}

function getCookie(key) {
    var str = document.cookie; //name=malin; psw=123456
    var arr = str.split('; '); //[name=malin,psw=123456]
    for(var ele of arr) {
        var arr2 = ele.split('='); //[name,malin]
        if(key == arr2[0]) {
            return arr2[1];
        }
    }
}

function removeCookie(key) {
    setCookie(key, '', -2);
}


