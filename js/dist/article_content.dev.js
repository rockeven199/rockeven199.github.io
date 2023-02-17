"use strict";

window.onload = function () {
  // 样式设置
  var showFlag = false;
  var element = document.querySelector(".aside");
  var content = document.querySelector(".content");
  var icon = document.querySelector("#control-icon");
  icon.addEventListener('click', function () {
    if (showFlag == true) {
      element.classList = "aside slideIn";
      content.style.width = "90%";
      icon.style.transform = "rotate(-180deg)";
      icon.style.transition = "1s ease";
      showFlag = false;
    } else {
      element.classList = "aside slideOut";
      content.style.width = "70%";
      icon.style.transform = "rotate(0deg)";
      icon.style.transition = "1s ease";
      showFlag = true;
    }
  }); //获取文章内容

  $.get(sessionStorage.getItem("articleUrl"), function (data, status) {
    document.querySelector(".content").innerHTML = marked.parse(data);
  }, "text");
}; // 文章信息


function renderInfo() {
  var position = sessionStorage.getItem("articleNum");
  var temptempHTML = "";
  var articleList = "";
  $.ajax({
    type: "GET",
    url: "../article/article_list.json",
    data: "data",
    dataType: "json",
    success: function success(response) {
      // 设置作者、文章标签、发布时间
      document.querySelector(".author span").innerHTML = response[position].authorName;
      document.querySelector(".article-title").innerHTML = response[position].articleTitle;
      document.querySelector(".pub-time span").innerHTML = response[position].pubDate.slice(0, 4) + "-" + response[position].pubDate.slice(4, 6) + "-" + response[position].pubDate.slice(6, 8);

      for (a in response[position].Tag) {
        if (response[position].Tag[a][3] == "blue") {
          temptempHTML += "<div class=\"tag-group\"><span class=\"about-title\" style=\"margin-left:5px\">".concat(response[position].Tag[a][0], "</span><a class=\"about-link\">").concat(response[position].Tag[a][1], "</a></div></div>");
        } else if (response[position].Tag[a][3] == "green") {
          temptempHTML += "<div class=\"tag-group\"><span class=\"about-title\" style=\"margin-left:5px\">".concat(response[position].Tag[a][0], "</span><a class=\"about-object\">").concat(response[position].Tag[a][1], "</a></div></div>");
        } else {
          temptempHTML += "<div class=\"tag-group\"><span class=\"about-title\" style=\"margin-left:5px\">".concat(response[position].Tag[a][0], "</span><a class=\"about-tag\">").concat(response[position].Tag[a][1], "</a></div></div>");
        }
      }

      document.querySelector(".article-header-about-tag").innerHTML = temptempHTML; // 文章列表

      for (var _c = 0; _c < response.length; _c++) {
        articleList += "<li class='article-item'>" + response[_c].articleTitle + "</li>";
      } // 窗口标题


      document.querySelector("title").innerHTML = response[c].articleTitle; // 文章列表

      document.querySelector(".article-group").innerHTML = articleList;
    }
  });
}

renderInfo();