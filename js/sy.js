jQuery||require("jquery")
// 爱心特效
function love(){
    (function(window,document,undefined){
        var hearts = [];
        window.requestAnimationFrame = (function(){
                return window.requestAnimationFrame || 
                           window.webkitRequestAnimationFrame ||
                           window.mozRequestAnimationFrame ||
                           window.oRequestAnimationFrame ||
                           window.msRequestAnimationFrame ||
                           function (callback){
                                   setTimeout(callback,1000/60);
                           }
        })();
        init();
        function init(){
                css(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}");
                attachEvent();
                gameloop();
        }
        function gameloop(){
                for(var i=0;i<hearts.length;i++){
                    if(hearts[i].alpha <=0){
                            document.body.removeChild(hearts[i].el);
                            hearts.splice(i,1);
                            continue;
                    }
                    hearts[i].y--;
                    hearts[i].scale += 0.004;
                    hearts[i].alpha -= 0.013;
                    hearts[i].el.style.cssText = "left:"+hearts[i].x+"px;top:"+hearts[i].y+"px;opacity:"+hearts[i].alpha+";transform:scale("+hearts[i].scale+","+hearts[i].scale+") rotate(45deg);background:"+hearts[i].color;
            }
            requestAnimationFrame(gameloop);
        }
        function attachEvent(){
                var old = typeof window.onclick==="function" && window.onclick;
                window.onclick = function(event){
                        old && old();
                        createHeart(event);
                }
        }
        function createHeart(event){
            var d = document.createElement("div");
            d.className = "heart";
            hearts.push({
                    el : d,
                    x : event.clientX - 5,
                    y : event.clientY - 5,
                    scale : 1,
                    alpha : 1,
                    color : randomColor()
            });
            document.body.appendChild(d);
    }
    function css(css){
            var style = document.createElement("style");
                style.type="text/css";
                try{
                    style.appendChild(document.createTextNode(css));
                }catch(ex){
                    style.styleSheet.cssText = css;
                }
                document.getElementsByTagName('head')[0].appendChild(style);
    }
        function randomColor(){
                return "rgb("+(~~(Math.random()*255))+","+(~~(Math.random()*255))+","+(~~(Math.random()*255))+")";
        }
    })(window,document);
}


// 搜索框
function search(){
    $(".inp").focus(function(){
        $(".search-xs").animate({height: '400px'}, 200)
    })
    $(".inp").focusout(function(){
        $(".search-xs").animate({height: '0px'}, 200)
    })
    $(".inp").keyup(function(){
        // 组装查询地址
        var sugurl = "http://suggestion.baidu.com/su?wd=#content#&cb=window.baidu.sug";
    
        // 获取输入内容  
        var content = String($(".inp").val());
        sugurl = sugurl.replace("#content#", content);
        if(content == false){
            $(".search-xs-ul").empty();
            $(".search-xs-ul").append(
                "<li><a href='https://www.bilibili.com'>特朗普曾在中国缴税?中方回应</a></li>" +
                "<li><a href='https://www.bilibili.com'>暂不恢复旅行社出入境团队旅游</a></li>" +
                "<li><a href='https://www.bilibili.com'>近300名留美人员遭美方滋扰盘查</a></li>"+
                "<li><a href='https://www.bilibili.com'>易烊千玺弟弟创魔方世界纪录</a></li>"+
                "<li><a href='https://www.bilibili.com'>点外卖恶意差评获利上千元被批捕</a></li>"+
                "<li><a href='https://www.bilibili.com'>猪肉价格连续7周回落</a></li>"+
                "<li><a href='https://www.bilibili.com'>东北大学清退52名博士生研究生</a></li>"+
                "<li><a href='https://www.bilibili.com'>张家界志愿者绝壁捡垃圾</a></li>"+
                "<li><a href='https://www.bilibili.com'>河北境内4车相撞致7人死亡</a></li>"+
                "<li><a href='https://www.bilibili.com'>全球六分之一儿童处于极端贫困</a></li>"
            );
        }
        //定义回调函数
        window.baidu = {
            sug: function(json) {
                console.log(json)
                // 放之前把之前加入的标签全部删掉
                $(".search-xs-ul").empty()
                for(var i=0; i<10; i++){
                    if(json.s[i] == undefined){
                        console.log("undefined");
                        $(".search-xs").animate({height: '0px'}, 0)
                    }else{
                        var lj = "https://www.baidu.com/baidu?word=" + json.s[i];
                        var ys = "<li><a href=" + lj +">" + json.s[i] + "</a></li>";
                        $(".search-xs-ul").append(ys);
                    }
                } 
            }
        }
        //动态添加JS脚本
        var script = document.createElement("script");
        script.src = sugurl;
        document.getElementsByTagName("head")[0].appendChild(script);
    })
}

// 禁止右击菜单
// 写在了body标签内
function doNothing(){  
    window.event.returnValue=false;  
    return false;  
}

// 英语小练习
function englishPractice(){
    function formatterDateTime() {
        var date=new Date()
        var month=date.getMonth() + 1
        var datetime = date.getFullYear()
          + ""// "年"
          + (month >= 10 ? month : "0"+ month)
          + ""// "月"
          + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
          + ""
          + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours())
          + ""
          + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
          + ""
          + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
        return datetime;
      }
      
      $.ajax({
        type: 'post',
        url: 'http://route.showapi.com/1211-1',
        dataType: 'json',
        data: {
          "showapi_timestamp": formatterDateTime(),
          "showapi_appid": '395733', //这里需要改成自己的appid
          "showapi_sign": 'a71c2369c10647a59f5ad7dd384ac80a',  //这里需要改成自己的应用的密钥secret
          "count":"10"
        },
      
        error: function(XmlHttpRequest, textStatus, errorThrown) {
            alert("操作失败!");
        },
        success: function(result) {
            var i = 0;
            // console.log(result) //console变量在ie低版本下不能用
            // alert(result.showapi_res_code)
            function english(){
                $(".lzdx-my").html(result.showapi_res_body.data[i].english);
                $(".lzdx-sm").html(result.showapi_res_body.data[i].chinese);
            }
            english();
            $(".lzdx-button").on("click",function(){
                i++;
                if(i>9){i=0;}
                english();
            })
        }
      });
}