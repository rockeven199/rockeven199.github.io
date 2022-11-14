//侧边栏tag渲染
$.ajax({
    type: "get",
    url: "./article/article_tag.json",
    data: "data",
    dataType: "json",
    success: function (tagRes) {
        var asideTag="";
        var tempAsideTag="";
        for(let a=1;a<Object.keys(tagRes).length+1;a++){
            tempAsideTag=`<li class="item-tag"><a>${tagRes[a]}</a></li>`
            if(asideTag==""){
                asideTag=tempAsideTag;
            }else{
                asideTag=asideTag+tempAsideTag;
            }
        }
        $(".article-tag").append(asideTag)
    }
})