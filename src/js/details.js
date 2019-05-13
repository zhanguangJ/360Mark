(function(){

    //登录注册
    loginResgin();

    //回到顶部
    toTop();


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
            url : '../api/shanpin.php',
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
      })
    }

    
})()
