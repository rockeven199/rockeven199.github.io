"use strict";

window.onload = function () {
  var url = window.location.search;
  var SearchParams = new URLSearchParams(url);
  getAricle(SearchParams.get("article_number")); // 样式设置

  function style() {
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
    });
    var arr = [];
    var showCode = document.querySelector("code").innerText;
    var temp = showCode.indexOf(";", 0);

    while (temp != -1) {
      temp = showCode.indexOf(";", temp + 1);
      arr.push(temp);
    }
  }

  style();
}; // 查找文章


function getAricle(data) {
  $.ajax({
    type: "get",
    url: "../article/article_list.json",
    data: "data",
    dataType: "json",
    success: function success(response) {
      for (var a = 0; a < response.length; a++) {
        if (a == data) {
          var article = $("#article_title").html(response[a].articleTitle);
          $.ajax({
            type: "get",
            url: response[a].article_url,
            data: "data",
            dataType: "text",
            success: function success(content) {
              $("#article_content").html(content);
            }
          });
          break;
        }
      }
    }
  });
}