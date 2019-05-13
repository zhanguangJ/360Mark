(function(){
    //登录注册
    loginResgin();

    //回到顶部
    toTop();

    //分页
    var num = 20; //每页条数
    var page = 1;//当前页

    init(page);
    getPage();

    //初始化
    function init(page){
        $.ajax({
            type : 'get',
            url : '../api/list.php',
            data : {
                num : num,
                page : page,
                time : new Date()
            },
            success : function(str){
                var arr = JSON.parse(str);
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
                                init(currPage);
                            };
                        }
                    });
                });
            }
        })
    }

    //默认排序
    
    //点击价格 //点击第一次升序，第二次降序
    var isOk = true;
    $(".pricesort").click(function(){
        console.log(111);
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
