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
                url : '../api/main.php',
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


    //分页
    var num = 20; //每页条数
    var page = 1;//当前页
    var types = '';//排序类型
    var order = '';//排序方式
    var baobei = '';

    //从url中获取baobei
    var url = decodeURI(location.search);
    var obj =   url.split('?')[1];
    baobei = obj;

    //渲染搜索结果标题位置
    //如果url有带值过来则渲染成新的
    function drawing(){
        if (obj) {
            $html = `<span class="default_path">
                        <a href="javascript:;">首页</a>
                        <i>></i>
                        <a href="javascript:;">全部搜索结果</a>
                        <i>></i>
                        <a href="javascript:;">${obj}</a>
                    </span>`;
            //渲染分类
            $html2 = `<a href="javascript:;" title="${obj}">${obj}</a>`;
        }else{
            $html = `<span class="default_path">
                        <a href="javascript:;">首页</a>
                        <i>></i>
                        <a href="javascript:;">全部搜索结果</a>
                    </span>`;
            $html2 = `  <a href="javascript:;" title="智能家居">智能家居</a>
                        <a href="javascript:;" title="智能穿戴">智能穿戴</a>
                        <a href="javascript:;" title="汽车用品">汽车用品</a>
                        <a href="javascript:;" title="母婴玩具">母婴玩具</a>`;
        }

        
        $(".default_path").html($html);
        $(".unspread").html($html2);
    }
    drawing();



    init(page,order,baobei);
    getPage();

    //初始化
    function init(page,order,baobei){
        var p = new Promise(function(succfn){
            $.ajax({
                type : 'get',
                url : '../api/list.php',
                data : {
                    num : num,
                    page : page,
                    order : order,
                    baobei : baobei,
                    time : new Date()
                },
                success : function(str){
                    succfn(str);
                }
            })
        })
        p.then(function(str){
            var arr = JSON.parse(str);
            if (arr.total) {
                $html = arr.content.map(function(item){
                    return `<li class="list-item">
                            <dl class="desc">
                                <dt class="pic">
                                    <a href="javascript:;">
                                        <img src="../img/${item.title}${item.bigimg}.jpg" class="lazy" data-id="${item.id}"/>
                                    </a>
                                </dt>
                                <dd class="cont">
                                    <a href="javascript:;">
                                        <span class="title" data-id="${item.id}">
                                            ${item.name}
                                        </span>
                                        <span class="price" data-id="${item.id}">
                                            <span>￥</span>
                                            ${item.price}
                                        </span>
                                    </a>
                                </dd>
                                <dd class="addbtns"  data-id="${item.id}">
                                    <a href="javascript:;" class="add-cart" color="#fa5437">
                                        加入购物车
                                    </a>
                                </dd>
                            </dl>
                            <div class="addSuccess">成功添加至购物车</div>
                        </li>`
                }).join('');
                $(".list").html($html);
            }else{
                $(".list").html("抱歉，没有找到您搜索的相关商品");
            }
        }).then(function(){
            undateStatus();
        })
    }

    //分页
    function getPage(){
        $.ajax({
            type : 'get',
            url : '../api/list.php',
            data : {
                num : num,
                page : page,
                order : order,
                baobei : baobei,
                time : new Date()
            },
            success : function(str){
                var res = JSON.parse(str);                
                //总数量
                var total = res.total;
                var curr = 1;

                layui.use('laypage', function(){
                    var laypage = layui.laypage;         
                    //执行一个laypage实例
                    laypage.render({
                        elem: 'pageBtnWrap', //注意，这里如果是 ID，不用加 # 号
                        count: total, //数据总数，从服务端得到
                        limit: num,   //每页条数设置
                        curr: curr || 1,
                        jump: function(obj, first){
                            currPage = obj.curr;//当前页
                            if (!first) {
                                init(currPage,order,baobei);
                            };
                        }
                    });
                });                 
            }
        })            

    }



    //默认排序
    $('.default').click(function(){
        order = '';
        $(this).next().children('span').html("");
        init(page,order,baobei);
        getPage();
    })


    //点击价格 //点击第一次升序，第二次降序
    var isok = true;
    $(".pricesort").click(function(){
        types = 'price';//排序类型 价格
        if (isok) {
            order = 'ASC';
            $(this).children('span').html("↑");
        }else{
            order = 'DESC';
            $(this).children('span').html("↓");
        }
        isok = !isok;
        init(page,order,baobei);
        getPage();
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
