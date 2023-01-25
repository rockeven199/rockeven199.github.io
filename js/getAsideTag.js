//侧边栏tag渲染
$.ajax({
    type: "get",
    url: "./article/article_tag.json",
    data: "data",
    dataType: "json",
    success: function (tagRes) {
        var asideTag = "";
        var tempAsideTag = "";
        for (let a = 1; a < Object.keys(tagRes).length + 1; a++) {
            tempAsideTag = "<li class='item-tag' onclick='submit(this)' data-tag='" + tagRes[a] + "'><a>" + tagRes[a] + "</a></li>";
            if (asideTag == "") {
                asideTag = tempAsideTag;
            } else {
                asideTag = asideTag + tempAsideTag;
            }
        }
        $(".article-tag").append(asideTag)
    }
})

function submit(element) {
    sessionStorage.setItem('searchTag', element.dataset.tag);
    location.href = "../search.html";
}