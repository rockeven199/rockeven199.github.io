"use strict";

window.onload = function () {
  // 样式设置
  var showFlag = false;
  showFlag = slideMenu(showFlag);
  slideMenu(showFlag);
  renderInfo();
  getArticleContent(sessionStorage.getItem("articleUrl"));
  var loadTimer = setTimeout(function () {
    articleList();
    clearTimeout(loadTimer);
  }, 2000);
};
/**
 * @name 侧边菜单栏
 */


function slideMenu(showFlag) {
  var element = document.querySelector(".aside");
  var content = document.querySelector(".content");
  var icon = document.querySelector("#control-icon");
  icon.addEventListener('click', function () {
    if (showFlag == true) {
      element.classList = "aside slideIn";
      content.style.width = "90%";
      icon.style.transform = "rotate(-180deg)";
      icon.style.transition = "0.5s ease";
      showFlag = false;
    } else {
      element.classList = "aside slideOut";
      content.style.width = "70%";
      icon.style.transform = "rotate(0deg)";
      icon.style.transition = "0.5s ease";
      showFlag = true;
    }
  });
}
/**
 * @name  获取文章内容
 */


function getArticleContent(url) {
  $.get(url, function (data, status) {
    document.querySelector(".content").innerHTML = marked.parse(data);
  }, "text");
}

function getJosn() {
  fetch('../article/article_list.json', {
    method: 'GET'
  }).then(function (data) {
    data.json().then(function (data) {
      return data;
    });
  });
}

getJosn();
/**
 * @name 文章列表
 */

function articleList() {
  var temptempHTML = "";
  var articleList = "";
  document.querySelectorAll('.article-item').forEach(function (item) {
    item.addEventListener('click', function (item) {
      getArticleContent(item.target.dataset.url);
      sessionStorage.setItem("articleNum", item.target.dataset.index);
      location.reload(); // document.querySelector('.author span').innerHTML = ""
      // document.querySelector('.pub-time span').innerHTML = ""
      // document.querySelectorAll('.tag-group').forEach(item => {
      //   item.remove()
      // })
      // var url = item.target.dataset.index
      // $.ajax({
      //   type: "GET",
      //   url: "../article/article_list.json",
      //   data: "data",
      //   dataType: "json",
      //   success: function (response) {
      //     // 设置作者、文章标签、发布时间、页面标题
      //     document.querySelector(".author span").innerHTML = response[url].authorName;
      //     document.querySelector(".article-title").innerHTML = response[url].articleTitle;
      //     document.querySelector(".pub-time span").innerHTML = response[url].pubDate;
      //     document.title = response[url].articleTitle;
      //     for (a in response[url].Tag) {
      //       if (response[url].Tag[a][3] == "blue") {
      //         temptempHTML += `<div class="tag-group"><span class="about-title" style="margin-left:5px">${response[url].Tag[a][0]}</span><a class="about-link">${response[url].Tag[a][1]}</a></div></div>`
      //       } else if (response[url].Tag[a][3] == "green") {
      //         temptempHTML += `<div class="tag-group"><span class="about-title" style="margin-left:5px">${response[url].Tag[a][0]}</span><a class="about-object">${response[url].Tag[a][1]}</a></div></div>`
      //       } else {
      //         temptempHTML += `<div class="tag-group"><span class="about-title" style="margin-left:5px">${response[url].Tag[a][0]}</span><a class="about-tag">${response[url].Tag[a][1]}</a></div></div>`
      //       }
      //     }
      //     for (let c = 0; c < response.length; c++) {
      //       articleList += "<li class='article-item' data-url='" + response[c].articleUrl + "' data-index=" + c + ">" + response[c].articleTitle + "</a></li>";
      //     }
      //     render(articleList, temptempHTML)
      //   }
      // });
    }); // function render(articleList, temptempHTML) {
    //   document.querySelector(".article-group").innerHTML = articleList;
    //   document.querySelector(".article-header-about-tag").innerHTML = temptempHTML;
    // }
  });
}
/**
 * @name 文章信息
 */


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
      // 设置作者、文章标签、发布时间、页面标题
      document.querySelector(".author span").innerHTML = response[position].authorName;
      document.querySelector(".article-title").innerHTML = response[position].articleTitle;
      document.querySelector(".pub-time span").innerHTML = response[position].pubDate;
      document.title = response[position].articleTitle;

      for (a in response[position].Tag) {
        // if (response[position].Tag[a][3] == "blue") {
        //   temptempHTML += `<div class="tag-group"><span class="about-title" style="margin-left:5px">${response[position].Tag[a][0]}</span><a class="about-link">${response[position].Tag[a][1]}</a></div></div>`
        // } else if (response[position].Tag[a][3] == "green") {
        //   temptempHTML += `<div class="tag-group"><span class="about-title" style="margin-left:5px">${response[position].Tag[a][0]}</span><a class="about-object">${response[position].Tag[a][1]}</a></div></div>`
        // } else {
        temptempHTML += "<div class=\"tag-group\"><span class=\"about-title\" style=\"margin-left:5px\">".concat(response[position].Tag[a][0], "</span><a class=\"about-tag\">").concat(response[position].Tag[a][1], "</a></div></div>"); // }
      }

      document.querySelector(".article-header-about-tag").innerHTML = temptempHTML;

      for (var c = 0; c < response.length; c++) {
        articleList += "<li class='article-item' data-url='" + response[c].articleUrl + "' data-index=" + c + ">" + response[c].articleTitle + "</a></li>";
      }

      document.querySelector(".article-group").innerHTML = articleList;
    }
  });
}