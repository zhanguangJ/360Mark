"use strict";!function(){loginResgin(),window.onresize=window.onscroll=function(){toTop()},new Promise(function(i){$.ajax({type:"get",url:"/360Mark/src/api/main.php",async:!0,data:{id:55,time:new Date},success:function(n){i(n)}})}).then(function(n){var i=JSON.parse(n);$html=i.map(function(n){return'<li data-name="'+n.name+'" class="">\n                            <div class="sug-item">\n                                '+n.name+'\n                            </div>\n                            <div class="desc">约有'+n.sum+"件</div>\n                        </li>"}).join(""),$(".__mall_suggest__").html($html)}).then(function(){!function(){$(".text").click(function(n){$(".__mall_suggest__").css("display","block"),n.stopPropagation()}),$(".__mall_suggest__").on("click","li",function(){var n=$(this).attr("data-name");window.open("/360Mark/src/html/list.html?"+n)});var t=-1,s=$(".__mall_suggest__ li").size();$(document).ready(function(){$(".text").keydown(function(n){if(40===n.keyCode){t++;for(var i=0;i<s;i++)$(".__mall_suggest__ li").eq(i).removeClass("active");s-1<t&&(t=0),$val=$(".__mall_suggest__ li").eq(t).children("div").eq(0).html().trim(),$(".text").attr("placeholder",""),$(".text").val($val),$(".__mall_suggest__ li").eq(t).addClass("active")}if(38===n.keyCode){for(t--,i=0;i<s;i++)$(".__mall_suggest__ li").eq(i).removeClass("active");t<0&&(t=s-1),$val=$(".__mall_suggest__ li").eq(t).children("div").eq(0).html().trim(),$(".text").attr("placeholder",""),$(".text").val($val),$(".__mall_suggest__ li").eq(t).addClass("active")}if(13===n.keyCode){var a=$(".__mall_suggest__ li").eq(t).children("div").eq(0).html().trim();window.open("/360Mark/src/html/list.html?"+a)}})}),$(document).click(function(){$(".__mall_suggest__").css("display","none"),$(".text").attr("placeholder","360儿童手表"),$(".text").val("")}),$(".search").click(function(){var n=$(".text").attr("placeholder")+$(".text").val();window.open("/360Mark/src/html/list.html?"+n.trim())})}()});var n=decodeURI(location.search).split("?")[1];new Promise(function(i){$.ajax({type:"get",url:"/360Mark/src/api/shanpin.php",async:!0,data:"id="+n,success:function(n){i(n)}})}).then(function(n){var i=JSON.parse(n)[0],a=i.smallimg.split(",");$html1='<div class="prodIntro con">\n                        <div class="sPic">\n                          <div class="magnifier" id="magnifier1">\n                            <div class="magnifier-container">\n                                <div class="images-cover"></div>\n                                \x3c!--当前图片显示容器--\x3e\n                                <div class="move-view"></div>\n                                \x3c!--跟随鼠标移动的盒子--\x3e\n                            </div>\n                            <div class="magnifier-assembly">\n                                <div class="magnifier-btn">\n                                    <span class="magnifier-btn-left">&lt;</span>\n                                    <span class="magnifier-btn-right">&gt;</span>\n                                </div>\n                                \x3c!--按钮组--\x3e\n                                <div class="magnifier-line">\n                                    <ul class="clearfix animation03">',$html2=a.map(function(n){return'<li>\n                        <div class="small-img">\n                            <img src="../img/'+i.title+n+'.jpg" />\n                        </div>\n                    </li>'}).join(""),$html3='  </ul>\n                </div>\n                        \x3c!--缩略图--\x3e\n                    </div>\n                    <div class="magnifier-view"></div>\n                    \x3c!--经过放大的图片显示容器--\x3e\n                </div>\n                </div>\n                <div class="sInfo">\n                    <div class="tr nobdr">\n                        <strong>'+i.name+'</strong>\n                        <p class="solgan"></p>\n                    </div>\n                     <div class="tr nobdr tr1">\n                       <div class="txt">\n                           <strong class="nowprice">\n                               <em>￥</em>\n                               '+i.price+'.00\n                           </strong>\n                       </div>\n                      <div class="txt">\n                           <div id="item-cate">\n                               <div class="cate">\n                                   <span class="cate-label">分类</span>\n                                   <ul class="cate-list">\n                                       <li class="cate-item"><a href="javascript:;">标准版</a></li>\n                                   </ul>\n                               </div>\n                           </div>\n                       </div>\n                       <div class="txt">\n                           <span>数量</span>\n                           <div class="gcIpt">\n                               <a href="javascript:;" class="disable decrement">-</a>\n                               <input type="text" value="1" class=\'ng-pristine\'/>\n                               <a href="javascript:;" class="increment">+</a>\n                           </div>\n                       </div>\n                    </div>\n                    <div class="tr nobdr btns">\n                        <a href="javascript:;" class="gInfoBtn gInfoBtn-addcart">\n                            <span class="gInfoBtn-icon gInfoBtn-icon-cart "></span>\n                                加入购物车\n                        </a>\n                        <a href="javascript:;" class="favorite nofav">\n                            <span class="gInfoBtn-icon gInfoBtn-icon-heart"></span>\n                            喜欢\n                        </a>\n                    </div>',$html=$html1+$html2+$html3,$(".gdetail").html($html)}).then(function(){magnifier({magnifier:"#magnifier1",width:480,height:480,moveWidth:null,zoom:3}),undateStatus()}),$(".gdetail").on("click",".increment",function(){var n=$(this).prev().val();10<++n&&(n=10),$(this).prev().val(n)}),$(".gdetail").on("click",".decrement",function(){var n=$(this).next().val();n--,console.log(n),n<=1&&(n=1),$(this).next().val(n)}),$(".gdetail").on("keyup",".ng-pristine",function(){var n=$(this).val();10<n?n=10:n<=1&&(n=1),$(this).val(n)})}();