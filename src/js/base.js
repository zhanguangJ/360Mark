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

    $('#pageBtnWrap').click(function(){
        //点击缓慢回到顶部
        var scrollTop=window.setInterval(function(){
            //pageYOffset获取窗口离上面的距离
            var pop=window.pageYOffset;
            if(pop>0){
                window.scrollTo(0,pop-3);
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



//登录注册
loginResgin();



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

    //点击详情页加入购物车
    $(".gInfoBtn-addcart").click(function(){
        $('.quc-login').css('display','block');//登录界面
        $('.quc-panel-large').css('display','none');//注册界面
        $('.quc-mask').css('display','block');//遮罩
    })  
    //点击详情页喜欢
    $(".favorite").click(function(){
        $('.quc-login').css('display','block');//登录界面
        $('.quc-panel-large').css('display','none');//注册界面
        $('.quc-mask').css('display','block');//遮罩     
    }) 
    //列表页点击加入购物车
    $('.list-item').on('click', '.add-cart', function(event) {
        $('.quc-login').css('display','block');//登录界面
        $('.quc-panel-large').css('display','none');//注册界面
        $('.quc-mask').css('display','block');//遮罩
    });     

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
        console.log(111);
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
            $('.quc-mobile>input').attr('type','mobile').attr('placeholder','验证码次数不够所以没做请切换到账号登录').attr('maxlength','11');
            $('.quc-psw>input').attr('type','smscode').attr('placeholder','短信验证码');
            $('.quc-input-append').css('display','block');
        }else{
            //360账号登录
            $('.quc-mobile>input').attr('type','userName').attr('placeholder','手机号/用户名/邮箱/试用账号123456');
            $('.quc-psw>input').attr('type','password').attr('placeholder','密码/密码123456');
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



//点击获取验证码
var validCode=true;
$(".quc-input-append").click(function(){
    var tel =  $(this).parent().prev().prev().children('input').val();
    var Code = $(this).prev().prev().val();
    if(tel != ""){
        isOk3 = true;
        var time=10;
        var code=$(this);
        if (validCode) {
            validCode=false;
            code.addClass("msgs1");
            code.css('color','#818080');
            //发送ajax请求
            //输入的验证码

            $.ajax({
                type : 'post',
                url : '/360Mark/src/api/duanxin.php',
                data :{
                    userphone : tel
                },
                success : function(str){
                    var arr = JSON.parse(str);
                    $('#SMS').on('blur',function() {
                        var yzm = $('#SMS').val();
                        // console.log(yzm);       
                        if (arr.phonecode == yzm) {
                            isOk3 = true;
                            $(".phoneRegister").children('div').eq(2).children('div').eq(1).next().html('验证通过').css({
                                color: '#58bc58',
                                fontSize: '12px'
                            });
                        }else{
                            $(".phoneRegister").children('div').eq(2).children('div').eq(1).next().html('验证码错误！请重新输入！').css({
                                    color: 'red',
                                    fontSize: '12px'
                                });
                        }    
                    });
                }
            })
            var t=setInterval(function() {
                time--;
                code.html(time+"秒");
                if (time==0) {
                    clearInterval(t);
                    code.html("重新获取");
                    code.css('color','#58bc58');
                    validCode=true;
                    code.removeClass("msgs1");
                }
            },1000)
        }
    }else{
        alert("请先输入手机号码");
    }
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
        alert('成功注册,点击确定后跳转首页');
        $('.quc-panel-large').css('display','none');
        $('.topNavMyOrder').css('display','block');
        loginOf(phone);
        ssCart();
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
        url : '/360Mark/src/api/login.php',
        data : {
            phoneLogin : phoneLogin,
            pswLogin : pswLogin,
            time : new Date()
        },
        success : function(str){
            var arr = JSON.parse(str);
            var res2 = arr.result2;
            if (res2 == 1) {
                //登录成功 设置cookie
                loginOf(phoneLogin);
                location.reload(true);
            }else{
                alert("账号或密码错误");
            }
        }
    })
});

//设置cookie
function loginOf(name){
    $('.loginbefore').css('display','none');
    $('.loginafter').css('display','block');
    $('.quc-login').css('display','none');
    $('.quc-mask').css('display','none');
    $('.cart-tips').css('display','none');
    $('.cart-info').css('display','block');
    setCookie('username',name,1);
    uName();
}
uName();

//渲染用户名
function uName(){
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
                </ul>
            </div>`;
    $('.loginWrap').html($html1);

}


//渲染小购物车
function ssCart(){
    var username = getCookie('username');
    var p = new Promise(function(succfn){
        $.ajax({
            type : 'get',
            url : '/360Mark/src/api/order.php',
            data : {
                username : username,
                time : new Date()
            },
            success : function(str){

                succfn(str);

            }
        })        
    })
    
    p.then(function(str){
        var str1 = str.replace(/\}(.+?)\{/g,"},{");
        if (!str1) {
            str1 = '{'+str1+'}';
        }
        var arr = JSON.parse(str1);
        //渲染购物车
        if (arr.length) {
            $html = arr.map(function(item) {
                 return `<li class="cart-item" data-id="${item.id}">
                            <a href="javascript:;">
                                <img src="/360Mark/src/img/${item.title}${item.bigimg}.jpg">
                                    <span class="cart-item-text">
                                        <strong>${item.name}</strong>
                                    </span>
                            </a>
                            <span class="cart-item-price">
                                <span class="yen">¥</span>
                                ${item.price}.00
                            </span>
                            
                        </li>`;
            }).join('');
        }else{
            $html = `快去购买商品吧`;
        }
        $(".cart-list").html($html);

        $.ajax({
            type : 'get',
            url : '/360Mark/src/api/showcart.php',
            data : {
                username : username,
                time : new Date()
            },
            success : function(str){
                let arr = JSON.parse(str);
                for(let i = 0; i < arr.length;i++){
                    $ht = `<span class="cart-item-num"> ×${arr[i]['num']}</span>
                            <a class="cart-item-del" href="javascript:;"></a>`
                    $(".cart-item").eq(i).append($ht);
                }
            }
        })


    }).then(function(){
        $.ajax({
            type : 'get',
            url : '/360Mark/src/api/shopcart.php',
            data : {
                data : 1,
                username : username,
                time : new Date()
            },
            //渲染价格
            success : function(str){
                var arr = JSON.parse(str);
                var goodsnum = arr[0]["sum(num)"];
                $.ajax({
                    type : 'get',
                    url : '/360Mark/src/api/shopcart.php',
                    data : {
                        data : 2,
                        username : username,
                        time : new Date()
                    },
                    success : function(str){
                        if ($('.cart-list').children('li').size()==0) {
                            $html = ` <span>
                                    共<b class="cartNum">0</b>
                                    件商品 总计：
                                    <b>
                                        <span class="yen">￥</span>
                                        0
                                    </b>
                                </span>
                                <a href="javascript:;" class="cart-buy">去购物车</a>`;
                        }else{
                            var arr = JSON.parse(str);
                            var total = arr[0]["sum(totalprice)"];
                            $html = ` <span>
                                    共<b class="cartNum">${goodsnum}</b>
                                    件商品 总计：
                                    <b>
                                        <span class="yen">￥</span>
                                        ${total}
                                    </b>
                                </span>
                                <a href="javascript:;" class="cart-buy">去购物车</a>`;
                        }
                        $(".cart-count").html($html);
                        $(".cart-buy").click(function(){
                            window.location.href= '/360Mark/src/html/cart.html';
                        })
                    }
                })
            }
        })
    })
}


undateStatus();

//看是否存在cookie
function undateStatus(){
    var username = getCookie('username');
    if (username) {
        ssCart();
        $('.quc-panel-large').css('display','none');
        $('.loginbefore').css('display','none');
        $('.loginafter').css('display','block');
        $('.cart-tips').css('display','none');
        $('.cart-info').css('display','block');
        //我的订单
        $('.topNavMyOrder').css('display','block');
        $('.popUsername').html(username);

        //详情页点击加入购物车 
        $(".gInfoBtn-addcart").click(function(){
            //确定哪个用户
            var username = getCookie('username');
            //通过url获取商品ID
            var url = decodeURI(location.search);
            var obj =   url.split('?')[1];

            //获取数量值
            var num = $('.ng-pristine').val();
            
            //数组发送ajax请求 ,把数组插入数据库 
            $.ajax({
                type : 'get',
                url : '/360Mark/src/api/cart.php',
                data : {
                    username : username,
                    goodsId : obj,
                    num1 : num,
                    time : new Date()
                },
                success : function(str){
                    //如果成功返回1 发送ajax请求 查询购物车订单表
                    if (str == 1) {
                        //渲染小购物车
                        ssCart();
                    };
                }

            })
        })
        //点击喜欢 未完成...................................................................
        $(".favorite").click(function(){
            console.log(222);
        })

        //点击列表页加入购物车渲染小购物车
        $('.list-item').on('click', '.add-cart', function() {
            //确定哪个用户
            var username = getCookie('username');
            //商品ID
            var goodsId = $(this).parent().attr("data-id");
            
            //数组发送ajax请求 ,把数组插入数据库 
            $.ajax({
                type : 'get',
                url : '/360Mark/src/api/cart.php',
                data : {
                    username : username,
                    goodsId : goodsId,
                    time : new Date()
                },
                success : function(str){
                    //如果成功返回1 发送ajax请求 查询购物车订单表
                    if (str == 1) {
                        //渲染小购物车
                        alert('成功加入购物车');
                        ssCart();
                    }else{
                        alert('加入购物车失败');
                    }
                }

            })

        });
        //小购物车的数量提示-----------------------------------------------------
        $.ajax({
            type : 'get',
            url : '/360Mark/src/api/shopcart.php',
            data : {
                data : 1,
                username : username,
                time : new Date()
            },
            //渲染价格
            success : function(str){
                var arr = JSON.parse(str);
                var goodsnum = arr[0]["sum(num)"];
                var ht = '('+goodsnum+')';
            }
        })
        

    }else{
        $('.loginbefore').css('display','block');
        $('.loginafter').css('display','none');
        $('.cart-tips').css('display','block');
        $('.cart-info').css('display','none');  
        //我的订单
        $('.topNavMyOrder').css('display','none');
        //详情页点击加入购物车 
        loginResgin();
    }
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

//点击X按钮删除一个订单 要获取用户ID 根据父节点获取商品ID
$(".cart-list").on('click','.cart-item-del',function(){
    var username = getCookie('username');
    var gid = $(this).parent('li').attr("data-id");
    $.ajax({
        type : 'get',
        url : '/360Mark/src/api/delete.php',
        data : {
            username : username,
            gid : gid,
            time : new Date()
        },
        success : function(str){
            if (str ==1) {
                ssCart();
            }else{
                alert('删除失败');
            }
        }
    })
})




