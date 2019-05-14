(function(){
    //登录注册
    loginResgin();

    //回到顶部
    toTop();

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
                                    <dd class="addbtns">
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
            }
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

})()
