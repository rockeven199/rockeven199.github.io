window.onload = function () {
    var url = window.location.search;
    var SearchParams = new URLSearchParams(url);
    getAricle(SearchParams.get("article_number"))
}

// 查找文章
function getAricle(data) {
    $.ajax({
        type: "get",
        url: "../article/article_list.json",
        data: "data",
        dataType: "json",
        success: function (response) {
            for (var a = 0; a < response.length; a++) {
                if (a == data) {
                    var article=$("#article_title").html(response[a].articleTitle)
                    $.ajax({
                        type: "get",
                        url: response[a].article_url,
                        data: "data",
                        dataType: "text",
                        success: function (content) {
                            $("#article_content").html(content)
                        }
                    });
                    break;
                }
            }
        }
    });
}