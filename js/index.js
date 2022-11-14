window.onload = function () {
    // 手机端侧边栏
    function aside() {
        var phoneMenuStatus = false;
        $(".nav-menu").on('click', function () {
            if (phoneMenuStatus === false) {
                $(".header-nav").css("transform", "translateX(0)");
                phoneMenuStatus = true;
            } else {
                $(".header-nav").css("transform", "translateX(100%)");
                phoneMenuStatus = false;
            }
        })
    }
    aside();


    //手机端自适应
    window.onresize = () => {
        if (($(window).width() >= 360 && $(window).width() <= 500) && ($(window).height() >= 600 || $(window).height() <= 800)) {
        }
    }

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
        <span class="about-title">Home</span><a class="about-link" href="">Rockeven199</a>
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
    
    // 页脚设置
    $(".footer").css("marginTop", $(document).height() * 0.5)
}