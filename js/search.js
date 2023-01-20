window.onload = function () {
    var url = window.location.search
    var searchParmas = new URLSearchParams(url);
    var Urlparam = new URLSearchParams(window.location.search);
    var serach_content = Urlparam.get("search_content");
    var serach_option = Urlparam.get("search_option")
    var articleLen;
    var showPoor;
    var chooseOption;

    $.ajax({
        type: "get",
        url: "../article/article_list.json",
        data: "data",
        dataType: "json",
        success: function (resData) {
            articleLen = resData.length;
            // 查找传过来的内容
            if (serach_option == "content") {
                // 通过内容查找
                for (var a = 0; a < articleLen; a++) {
                    if (resData[a].articleContent == serach_content) {
                        ""
                        $.ajax({
                            type: "get",
                            url: resData[a].article_url,
                            data: "data",
                            dataType: "text",
                            success: function (response) {
                                $("div").append("<p>" + response + "</p>")
                            }
                        });
                    }
                }
            } else if (serach_option == "author") {
                document.write("通过作者查找")
                // 通过作者查找
            } else if (serach_option == "title") {
                document.write("通过标题查找")
                // 通过标题查找
            } else {
                document.write("通过日期查找")
                // 通过日期查找
            }
        },
    });

}