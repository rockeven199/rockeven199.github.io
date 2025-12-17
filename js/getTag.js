//侧边栏tag渲染
$.ajax({
  type: "get",
  url: "./article/article_tag.json",
  data: "data",
  dataType: "json",
  success: function (tagRes) {
    let asideTag = "";
    let tempAsideTag = ``;
    for (_i = 0; _i < tagRes.length; _i++) {
      tempAsideTag = `<li class="item-tag" 
                    style="background-color:${tagRes[_i].color};" 
                    onclick="submit(this)" data-tag="${tagRes[_i].name}"><a style="color: white !important;">${tagRes[_i].name}</a></li>`;
      asideTag = tempAsideTag + asideTag;
    }
    $(".article-tag").append(asideTag);
  },
});

function submit(element) {
  sessionStorage.setItem("searchTag", element.dataset.tag);
  location.href = "../search.html";
}
