(function(){

    //登录注册
    loginResgin();

    window.onresize=window.onscroll=function(){
        //回到顶部
        toTop();

    }

    //下拉搜索数据渲染
    function search(){
        var p = new Promise(function(succfn){
            $.ajax({
                type : 'get',
                url : '/360Mark/src/api/main.php',
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
            window.open('list.html?' + name);
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
                    window.open('list.html?' + name);
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
            window.open('list.html?' + name.trim());

        })
    }


    //根据过来的url中的id查询数据库 进行数据渲染
    var url = decodeURI(location.search);
    var obj =   url.split('?')[1];

    //发送ajax查询数据库
    //放大镜
    detail();

    function detail(){
      var p = new Promise(function(succfn){
        $.ajax({
            type : 'get',
            url : '/360Mark/src/api/shanpin.php',
            async : true,
            data : 'id='+obj,
            success : function(str){
                succfn(str);
            }
        })
        
      })
      p.then(function(str){
        var arr = JSON.parse(str)[0];
        var sImg = arr.smallimg.split(',');

        $html1 = `<div class="prodIntro con">
                        <div class="sPic">
                          <div class="magnifier" id="magnifier1">
                            <div class="magnifier-container">
                                <div class="images-cover"></div>
                                <!--当前图片显示容器-->
                                <div class="move-view"></div>
                                <!--跟随鼠标移动的盒子-->
                            </div>
                            <div class="magnifier-assembly">
                                <div class="magnifier-btn">
                                    <span class="magnifier-btn-left">&lt;</span>
                                    <span class="magnifier-btn-right">&gt;</span>
                                </div>
                                <!--按钮组-->
                                <div class="magnifier-line">
                                    <ul class="clearfix animation03">`

        // 小图渲染
        $html2 = sImg.map(function(item){
            return  `<li>
                        <div class="small-img">
                            <img src="../img/${arr.title}${item}.jpg" />
                        </div>
                    </li>`
        }).join('');

        $html3 = `  </ul>
                </div>
                        <!--缩略图-->
                    </div>
                    <div class="magnifier-view"></div>
                    <!--经过放大的图片显示容器-->
                </div>
                </div>
                <div class="sInfo">
                    <div class="tr nobdr">
                        <strong>${arr.name}</strong>
                        <p class="solgan"></p>
                    </div>
                     <div class="tr nobdr tr1">
                       <div class="txt">
                           <strong class="nowprice">
                               <em>￥</em>
                               ${arr.price}.00
                           </strong>
                       </div>
                      <div class="txt">
                           <div id="item-cate">
                               <div class="cate">
                                   <span class="cate-label">分类</span>
                                   <ul class="cate-list">
                                       <li class="cate-item"><a href="javascript:;">标准版</a></li>
                                   </ul>
                               </div>
                           </div>
                       </div>
                       <div class="txt">
                           <span>数量</span>
                           <div class="gcIpt">
                               <a href="javascript:;" class="disable decrement">-</a>
                               <input type="text" value="1" class='ng-pristine'/>
                               <a href="javascript:;" class="increment">+</a>
                           </div>
                       </div>
                    </div>
                    <div class="tr nobdr btns">
                        <a href="javascript:;" class="gInfoBtn gInfoBtn-addcart">
                            <span class="gInfoBtn-icon gInfoBtn-icon-cart "></span>
                                加入购物车
                        </a>
                        <a href="javascript:;" class="favorite nofav">
                            <span class="gInfoBtn-icon gInfoBtn-icon-heart"></span>
                            喜欢
                        </a>
                    </div>`

        $html = $html1+$html2+$html3;

        $(".gdetail").html($html);
      }).then(function(){
          var magnifierConfig = {
          magnifier : "#magnifier1",//最外层的大容器
          width : 480,//承载容器宽
          height : 480,//承载容器高
          moveWidth : null,//如果设置了移动盒子的宽度，则不计算缩放比例
          zoom : 3//缩放比例
        };

        var _magnifier = magnifier(magnifierConfig);

        undateStatus();

      })
    }


    $('.gdetail').on('click','.increment',function(){
        var num = $(this).prev().val();
        // console.log(num);
        // 库存
        num++;
        if (num > 10) {
            num = 10;
        };
        $(this).prev().val(num);
    })

    $('.gdetail').on('click','.decrement',function(){
        var num = $(this).next().val();
        num--;
        console.log(num);
        if (num <= 1) {
            num = 1;
        };
        $(this).next().val(num);
    })

    //手动改变数量
    $('.gdetail').on('keyup','.ng-pristine',function(){
        var num = $(this).val();
        if (num > 10) {
            num = 10;
        }else if(num <=1){
            num = 1;
        }
        $(this).val(num);
    })    


       //点击商品图片跳转到详情页
    $('.list').on('click','img',function(){
        // console.log($(this).attr('data-id'));
        var id = $(this).attr('data-id')
        window.open('../html/details.html?' + id);
    })

    //点击商品名字跳转到详情页
     $('.list').on('click','span',function(){
        // console.log($(this).attr('data-id'));
        var id = $(this).attr('data-id')
        window.open('../html/details.html?' + id);
    })   

     //点击导航旁边的字跳转到列表页
    $('.topfrist').on('click', function() {
            window.open('list.html');        
    });


    //点击导航旁边的字跳转到列表页
    $('.navbar').on('click', 'li', function() {
        if ($(this).attr('data-name')) {
            var name = $(this).attr('data-name')
            window.open('list.html?' + name);        
        };
    });

    //点击中文跳转就对了
    $('.searchKey').on('click','a',function(){
        // console.log($(this).attr('data-id'));
        var id = $(this).attr('data-id')
        window.open('details.html?' + id);
    })   

    //点击logo回到首页
    $("h1").click(function(){
        window.open('index.html');
    })

    
    //用户退出 回到首页
    function quit(){
        $(".quit").click(function(){
            var username = getCookie('username');
            removeCookie('username');
            $('.loginbefore').css('display','block');
            $('.loginafter').css('display','none'); 
            $('.cart-tips').css('display','block');
            $('.cart-info').css('display','none');
            window.location.href="../../index.html";
        }) 
    }
    quit();
    
})()
