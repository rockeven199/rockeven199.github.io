window.onload = function () {
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
        strings: ['Rockeven199的博客'],
        typeSpeed: 60
    };
    var typed = new Typed('.blog-title', options);

    // 数据请求
    var XMLHttp;
    listRes = null;
    XMLHttp = new XMLHttpRequest();
    XMLHttp.onreadystatechange = () => {
        if (XMLHttp.readyState == 4 && XMLHttp.status == 200) {
            listRes = XMLHttp.responseText;
        }
    }
    XMLHttp.open("GET", "../article/list.json", false);
    XMLHttp.send();

    var listRes = JSON.parse(listRes)

    //获取文章总数
    var listlen = listRes.length;
    var tempHtml = "";
    var tempBlank = "";

    for (a = 0; a < listlen; a++) {
        var pubDate = listRes[a].pubDate;
        var pubAuthor = listRes[a].authorName;
        var articleTitle = listRes[a].articleTitle;
        var articleContent = listRes[a].articleContent;

        var html = `<div class="article-main">
        <div class="article-header">
            <div class="pub-time">${pubDate}</div>
            <span class="point" style="margin:0px 20px;color: rgba(24, 24, 24, 0.623);">·</span>
            <div class="pub-author">${pubAuthor}</div>
        </div>
        <div class="article-title" id="article-title">
            <h1>${articleTitle}</h1>
        </div>
        <div class="article-about">
        <span class="about-title">Open Source</span><a class="about-link" href="">Github</a>
        <span class="about-title">Home</span><a class="about-link" href="">123</a>
        <span class="about-title">Tag</span><a class="about-tag" href="">Other</a>
        </div>
        <div class="article-content">${articleContent}</div>
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


    // 适配
    var winH = $(window).height();
    var winW = $(window).width();
    //w:360-647,h:647-800
    if ((winW >= 360 && winW <= 450) && (winH >= 647 && winH <= 800)) {
        $(".footer").css("marginTop", winH* 1.45 - $("footer").height() + "px")
        $(".footer p").css("fontSize", "10px");
        $(".footer").css("padding", "3px");
    }
    if ((winW >= 1500 && winW <= 1920)) {
        $(".footer").css("marginTop", winH * 1.3 - $("footer").height() + "px")
    }
    // alert(docH)
}
