(function(){

    //登录注册
    loginResgin();

    //回到顶部
    toTop();


    //根据过来的url中的id查询数据库 进行数据渲染
    var url = decodeURI(location.search);
    var obj =   url.split('?')[1];

    //发送ajax查询数据库
    $.ajax({
        type : 'get',
        url : '../api/shanpin.php',
        async : true,
        data : 'id='+obj,
        success : function(str){
            var arr = JSON.parse(str)[0];
            var sImg = arr.smallimg.split(',');

            $html1 = `<div class="prodIntro con">
                            <div class="sPic">
                               <dl class="picbox">
                           <dt class="bigImg">
                               <div style="none" id="winSelector"></div>
                               <img src="../img/${arr.title}${arr.bigimg}.jpg" alt="" />
                           </dt>
                           <dd class="pic-selector" id="pic-selector">
                               <i class="left leftdisabled"></i>
                               <div class="scorll">
                                    <div class="scroll-items">`

            $html2 = sImg.map(function(item){
                return  `<a href="javascript:;" class="tinypic">
                            <img src="../img/${arr.title}${item}.jpg" alt="" />
                        </a>`
            }).join('');

            $html3 = `</div>
                               </div>
                               <i class="right rightdisabled"></i> 
                           </dd>
                               </dl>
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
                                   <input type="text" value="1" />
                                   <a href="javascript:;" class="increment">+</a>
                               </div>
                           </div>
                        </div>
                        <div class="tr nobdr btns">
                            <a href="" class="gInfoBtn gInfoBtn-addcart">
                                <span class="gInfoBtn-icon gInfoBtn-icon-cart "></span>
                                    加入购物车
                            </a>
                            <a href="" class="favorite nofav">
                                <span class="gInfoBtn-icon gInfoBtn-icon-heart"></span>
                                喜欢
                            </a>
                        </div>
                            </div>
                        </div>`

            /*console.log($html1);
            console.log($html2);
            console.log($html3);*/

            $html = $html1+$html2+$html3;

            $(".gdetail").html($html);
        }
    })
})()
