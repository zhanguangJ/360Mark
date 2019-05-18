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
            window.open('/360Mark/src/html/list.html?' + name);
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
                    window.open('/360Mark/src/html/list.html?' + name);
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
            window.open('../html/list.html?' + name.trim());

        })
    }


    mycart();
    function mycart(){
        //根据uid获取查询商品
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
                     return `<tr class="ng-scope goods" data-id="${item.id}">
                                <td class="col1">
                                    <span><input type="checkbox" /></span>
                                </td>
                                <td class="col2">
                                    <a href="" target="_blank">
                                        <img class="item-image" src="../img/${item.title}${item.bigimg}.jpg"/>
                                    </a>
                                </td>
                                <td class="col3">
                                    <a href="" target="_blank">
                                        ${item.name}
                                    </a>
                                </td>
                                <td class="col4 ng-binding">￥${item.price}.00</td>
                                <td class="col7">
                                    <a href="javascript:;" class="delete" data-id="${item.id}">X</a>
                                </td>                                
                            </tr>`;
                }).join('');
            }else{
                $html = `<p>快去购买商品吧</p>`;
            }
            $(".cartbody").html($html);
            

            $.ajax({
                type : 'get',
                url : '/360Mark/src/api/showcart.php',
                data : {
                    username : username,
                    time : new Date()
                },
                success : function(str){
                    let arr = JSON.parse(str);
                    for(let i = 0; i<arr.length;i++){

                        $ht = `<td class="col5 center ng-scope">
                                    <div class="number-editor">
                                        <a href="javascript:;" class='cutnum'>-</a>
                                        <input type="text" class="ng-pristine ng-valid" value="${arr[i]['num']}" />
                                        <a href="javascript:;" class='addnum'>+</a>
                                    </div>
                                </td>
                                <td class="total-price col6 ng-binding">￥${arr[i]['totalprice']}.00</td>`

                        $(".goods").eq(i).append($ht);
                    }

                }
            })


        })

    }

    
    $('.cartbody').on('click','.addnum',function(){
        var username = getCookie('username');
        var num = $(this).prev().val();
        var gId = $(this).parent().parent().parent().attr("data-id");
        // 库存
        num++;
        if (num > 10) {
            num = 10;
        };
        $(this).prev().val(num);
        xiaoji($(this));
        all();

        var xJ = $(this).parent().parent().next().html();
        var totalprice = xJ.slice(2,);

        $.ajax({
            type : 'get',
            url : '/360Mark/src/api/updatecart.php',
            data : {
                num : num,
                username : username,
                gId : gId,
                totalprice : totalprice,
                time : new Date()
            },
            success : function(str){
                console.log(str);
            }
        })
    })

    $('.cartbody').on('click','.cutnum',function(){
        var username = getCookie('username');
        var num = $(this).next().val();
        var gId = $(this).parent().parent().parent().attr("data-id");
        num--;
        console.log(num);
        if (num <= 1) {
            num = 1;
        };
        $(this).next().val(num);
        xiaoji($(this));
        all();

        var xJ = $(this).parent().parent().next().html();
        var totalprice = xJ.slice(2,);

        $.ajax({
            type : 'get',
            url : '/360Mark/src/api/updatecart.php',
            data : {
                num : num,
                username : username,
                gId : gId,
                totalprice : totalprice,
                time : new Date()
            },
            success : function(str){
                console.log(str);
            }
        })
    })

    //手动改变数量
    $('.cartbody').on('keyup','.ng-pristine',function(){
        var username = getCookie('username');
        var num = $(this).val();
        var gId = $(this).parent().parent().parent().attr("data-id");

        if (num > 10) {
            num = 10;
        }else if(num <=1){
            num = 1;
        }
        $(this).val(num);
        xiaoji($(this));
        all();

        var xJ = $(this).parent().parent().next().html();
        var totalprice = xJ.slice(2,);

        $.ajax({
            type : 'get',
            url : '/360Mark/src/api/updatecart.php',
            data : {
                num : num,
                username : username,
                gId : gId,
                totalprice : totalprice,
                time : new Date()
            },
            success : function(str){
                console.log(str);
            }
        })

    })

    //点击删除
    $('.cartbody').on('click','.delete',function(){
        var res = confirm("确定删除？");
        if (res) {
            //发送ajax 删除该条数据
            $(this).parent().parent().remove();  
            var username = getCookie('username');
            //获取id-------
            var gid = $(this).attr("data-id");
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
        }
        all();
    })

    //优惠券
    $('.icon-toggle').click(function(){
        $(".ng-hide").toggleClass("area");
    })
        
    //全选
    $('.statistics input').on('click',function(){
        //所有checked被选中
        var isok = $('.statistics input').prop('checked');
        $('.col1 input').prop('checked',isok);
        all();
    })

    //继续购物
    $('.backtoshopping').click(function(){
        window.location.href='/360Mark/index.html';
    })

    //全部选中，全选给选中
    $('.cartbody').on('click','.col1 input',function(){
        var len = $('.col1 input:checked').size();
        var total = $('.col1 input').size();
        if (len == total) {
            $('.statistics input').prop('checked',true);
        }else{
            $('.statistics input').prop('checked',false);
        }
        all();
    })
    
    //小计
    function xiaoji(now){
        //数量
        var num = $(now).parent().find('.ng-pristine').val();
        //单价
        var price = $(now).parent().parent().prev().prev().text().slice(1);
        //小计
        var total = (num*price).toFixed(2);
        $(now).parent().parent().next().html('￥ '+total);
        all();
    }

    //总数量 总价格
    var arr = [];
    function all(){
        $('.col1 input').each(function(i,item){
            if($(item).prop('checked')){
                arr.push(i);
            }
        })

        var num = 0;
        var price = 0;
        arr.forEach(function(item){
            num += $('.ng-pristine').eq(item).val()*1;
            price += $('.total-price').eq(item).text().slice(1)*1;
        })

        $ht = ` 已选择
                <strong class="ng-binding">${num}</strong>
                件,共
                <strong class="ng-binding">${num}</strong>
                件`;
        $ht2 = `合计:
                    <strong class="ng-binding">
                        <span class="unit">￥</span>
                        ${price.toFixed(2)}
                    </strong>`
       $('#allnum').html($ht);
       $('.main').html($ht2); 
       arr = [];
    }
    all();



})()