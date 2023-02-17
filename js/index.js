window.onload = function () {
    document.querySelector(".header-nav").style.marginRight = ($(window).width() - $(".header-nav").width()) / 2 + "px";

    // 手机端侧边栏
    function aside() {
        var phoneMenuStatus = false;
        $(".nav-menu").on('click', function () {
            if (phoneMenuStatus === false) {
                $(".nav-menu").css("transform", "rotate(-270deg)").css("transition", "all 0.5s");
                $(".header-nav").css("transform", "translateX(0)");
                phoneMenuStatus = true;
            } else {
                $(".header-nav").css("transform", "translateY(-100%)");
                $(".nav-menu").css("transform", "rotate(-180deg)").css("transition", "all 0.5s");
                phoneMenuStatus = false;
            }
        })
    }
    aside();

    //打字机特效插件
    var options = {
        strings: ['Rockeven199的小屋'],
        typeSpeed: 60
    };
    var typed = new Typed('.blog-title', options);

    function renderHtml() {
        // 数据请求
        var XMLHttp;
        listRes = null;
        XMLHttp = new XMLHttpRequest();
        XMLHttp.onreadystatechange = () => {
            if (XMLHttp.readyState == 4 && XMLHttp.status == 200) {
                listRes = XMLHttp.responseText;
            }
        }
        XMLHttp.open("GET", "../article/article_list.json", false);
        XMLHttp.send();

        var listRes = JSON.parse(listRes)

        //获取文章总数
        var listlen = listRes.length;
        var tempHtml = "";
        var temptempHTML = ``
        var article_number = -1;

        for (var a = 0; a < listlen; a++) {
            var pubDate = listRes[a].pubDate;
            var pubAuthor = listRes[a].authorName;
            var articleTitle = listRes[a].articleTitle;
            var articleContent = listRes[a].articleContent;
            var tagTemplate = ``;
            article_number++;
            try {
                for (var b = 0; b < listRes[a].Tag.length; b++) {
                    for (var c = 0; c < listRes[a].Tag.length; c++) {
                        temptempHTML = ``
                        if (listRes[a].Tag[b][3] == "blue") {
                            temptempHTML = `<div class="article-header-about-tag"><span class="about-title" style="margin-left:5px">${listRes[a].Tag[b][0]}</span><a class="about-link">${listRes[a].Tag[b][1]}</a></div>`
                        } else if (listRes[a].Tag[b][3] == "green") {
                            temptempHTML = `<div class="article-header-about-tag"><span class="about-title" style="margin-left:5px">${listRes[a].Tag[b][0]}</span><a class="about-object">${listRes[a].Tag[b][1]}</a></div>`
                        } else {
                            temptempHTML = `<div class="article-header-about-tag"><span class="about-title" style="margin-left:5px">${listRes[a].Tag[b][0]}</span><a class="about-tag">${listRes[a].Tag[b][1]}</a></div>`
                        }

                    }
                    tagTemplate = tagTemplate + temptempHTML
                }
            } catch (error) {

            }

            var html = `<div class="article-main">
                <div class="article-header">
                    <div class="pub-time">${pubDate}</div>
                    <span class="point" style="color: rgba(24, 24, 24, 0.623);">·</span>
                    <div class="pub-author">${pubAuthor}</div>
                </div>
                <div class="article-title" id="article-title">
                    <h1>${articleTitle}</h1>
                </div>
                <div class="article-about">
                ${tagTemplate}
                </div>
                <div class="article-content" onclick="goToArticle(this)" data-num="${article_number}">${articleContent}</div>
            </div>`

            // 模板定义
            if (tempHtml != "") {
                tempHtml = tempHtml + html;
            } else {
                tempHtml = html;
            }
        }

        // 渲染
        var temp = ejs.render('<%- tempHtml %>', { tempHtml });
        $(".article-section").html(temp);
    }
    var openLoadTimeOut = setTimeout(() => {
        renderHtml();
        clearTimeout(openLoadTimeOut);
    }, 600);

    // 搜索框
    document.querySelector('#search-input').value = "";
}

window.onresize = function () {
    document.querySelector(".header-nav").style.marginRight = ($(window).width() - $(".header-nav").width()) / 2 + "px";
}

window.onscroll = function () {
    // 顶部菜单
    document.body.scrollTop + 10 || document.documentElement.scrollTop + 10 >= document.querySelector(".header-nav").offsetHeight ? document.querySelector(".header-nav").style.position = "fixed" : document.querySelector(".header-nav").style.position = "absolute";
}

// 设备适配
function deviceFlex() {
    var winH = $(window).height();
    var winW = $(window).width();

    if (winW >= 360 && winW <= 450) {
        $(document).scroll(() => {
            $(".prograss").height($(document).scrollTop() / ($(document).height() - $(window).innerHeight()).toFixed(2) * 85 + '%');
        })

        $(".footer p").css("fontSize", "10px");
    }

    if (winW >= 451 && winW <= 800) {
        $(document).scroll(() => {
            $(".prograss").height($(document).scrollTop() / ($(document).height() - $(window).innerHeight()).toFixed(2) * 90 + '%');
        })

        $(".footer p").css("fontSize", "10px");
    }
    if (winW >= 800 && winW <= 1200) {
        $(document).scroll(() => {
            $(".prograss").height($(document).scrollTop() / ($(document).height() - $(window).innerHeight()).toFixed(2) * 95 + '%');
        })

        $(".footer p").css("fontSize", "10px");
    }

    if (winW >= 1201 && winW <= 1499) {
        $(document).scroll(() => {
            $(".prograss").height($(document).scrollTop() / ($(document).height() - $(window).innerHeight()).toFixed(2) * 95 + '%');
        })

        $(".footer p").css("fontSize", "10px");
    }

    if (winW >= 1500 && winW <= 1920) {
        $(document).scroll(() => {
            $(".prograss").height($(document).scrollTop() / ($(document).height() - $(window).innerHeight()).toFixed(2) * 95 + '%')
        })

        $("#nav-search-item").css("display", "none");
    }
}
deviceFlex();

// 提示信息
function errorTips(content) {
    $(".error-tips p").text(content);
    var flag = false;
    if (flag == false) {
        setTimeout(() => {
            flag = true;
            $(".error-tips").css("top", "40px");
            document.querySelector(".tips-progress").style.animation = "tipsProgress 2s forwards";
            setTimeout(() => {
                $(".error-tips").css("top", "-50px");
                document.querySelector(".tips-progress").removeAttribute("style");
                flag = false;
            }, 2000);
        }, 5);
    }
    return 0;
}

function successTips(content) {
    $(".tips-progress").css("width", "100%")
    $(".success-tips p").text(content);
    setTimeout(() => {
        $(".success-tips").css("top", "20px",);
        $(".tips-progress").css({
            width: "0px"
        })
        setTimeout(() => {
            $(".success-tips").css("top", "-50px");
            setTimeout(() => {
                $(".tips-progress").css("width", "100%");
            }, 200)
        }, 2000);
    }, 5);

    return 0;
}

// 监听输入框内容
function inputChange(ele) {
    var __this = ele;
    __this.dataset.search = __this.value
}

// 搜索
function searchContent(searchButton) {
    this.__this = searchButton;
    this.getUA = __this.dataset.ua;
    this.searchWay = __this.previousElementSibling;
    if (getUA === "pc") {
        if (__this.parentElement.parentElement.children[0].dataset.search == "") {
            __this.setAttribute("type", "button");
            errorTips("搜索内容不能为空");
        } else {
            __this.setAttribute("type", "submit");
        }
    }
}


// 获取文章内容并跳转
function goToArticle(pageNum) {
    var xhr = new XMLHttpRequest();
    var articleNum = pageNum.dataset.num;
    var articleArray = undefined;
    var articleUrl = "";
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 || xhr.status == 200) {
            articleArray = eval(xhr.responseText);
            articleUrl = articleArray[articleNum].articleUrl;
            sessionStorage.setItem("articleUrl", articleUrl);
            sessionStorage.setItem("articleNum", pageNum.dataset.num);
            location.href = "../article_content.html"
        }
    }
    xhr.open('GET', '../article/article_list.json', true);
    xhr.send();
    return 0;
}

// 点击按钮返回页面顶部
function backTop() {
    var temp = document.documentElement.scrollTop;
    if (temp != 0) {
        var backTopTimer = setInterval(() => {
            var backTopTimer2 = setInterval(() => {
                var backTopTimer3 = setInterval(() => {
                    var backTopTimer4 = setInterval(() => {
                        if (temp <= 0) {
                            clearInterval(backTopTimer)
                            clearInterval(backTopTimer2)
                            clearInterval(backTopTimer3)
                            clearInterval(backTopTimer4)
                        }
                        scrollTo(0, temp);
                        temp -= 1;
                    }, 10)
                }, 10)
            }, 10)
        }, 10)
    }
}

