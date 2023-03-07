"use strict";

window.onload = function () {
  // var url = window.location.search
  // var searchParmas = new URLSearchParams(url);
  var Urlparam = new URLSearchParams(window.location.search);
  var serach_content = Urlparam.get("search_content");
  var serach_option = Urlparam.get("search_option");
  var articleLen; // var showPoor;
  // var chooseOption;

  $.ajax({
    type: "get",
    url: "../article/article_list.json",
    data: "data",
    dataType: "json",
    success: function success(resData) {
      articleLen = resData.length;

      for (var a = 0; a < articleLen; a++) {
        if (resData[a].articleContent.includes(serach_content)) {
          $.ajax({
            type: "get",
            url: resData[a].articleUrl,
            data: "data",
            dataType: "text",
            success: function success(response) {
              $("div").append("<p>" + response + "</p>");
            }
          });
        }
      } // 查找传过来的内容
      // if (serach_option == "content") {
      //     // 通过文章内容查找
      //     for (var a = 0; a < articleLen; a++) {
      //         if (resData[a].articleContent == serach_content) {
      //             $.ajax({
      //                 type: "get",
      //                 url: resData[a].articleUrl,
      //                 data: "data",
      //                 dataType: "text",
      //                 success: function (response) {
      //                     $("div").append("<p>" + response + "</p>")
      //                 }
      //             });
      //         }
      //     }
      // } else if (serach_option == "author") {
      //     // 通过文章作者查找
      //     for (var a = 0; a < articleLen; a++) {
      //         if (resData[a].authorName == serach_content) {
      //             $.ajax({
      //                 type: "get",
      //                 url: resData[a].articleUrl,
      //                 data: "data",
      //                 dataType: "text",
      //                 success: function (response) {
      //                     $("div").append("<p>" + response + "</p>")
      //                 }
      //             });
      //         }
      //     }
      // } else if (serach_option == "title") {
      //     // 通过文章标题查找
      //     for (var a = 0; a < articleLen; a++) {
      //         if (resData[a].articleTitle == serach_content) {
      //             $.ajax({
      //                 type: "get",
      //                 url: resData[a].articleUrl,
      //                 data: "data",
      //                 dataType: "text",
      //                 success: function (response) {
      //                     $("div").append("<p>" + response + "</p>")
      //                 }
      //             });
      //         }
      //     }
      // } else if (serach_option == "date") {
      //     // 通过发布日期查找
      //     for (var a = 0; a < articleLen; a++) {
      //         if (resData[a].pubDate == serach_content) {
      //             $.ajax({
      //                 type: "get",
      //                 url: resData[a].articleUrl,
      //                 data: "data",
      //                 dataType: "text",
      //                 success: function (response) {
      //                     $("div").append("<p>" + response + "</p>")
      //                 }
      //             });
      //         }
      //     }
      // } else {
      //     // 通过标签查找
      //     for (var a = 0; a < articleLen; a++) {
      //         for (var b = 0; b < resData[a].Tag.length; b++) {
      //             for (var c = 0; c < resData[a].Tag[b].length; c++) {
      //                 if (resData[a].Tag[b][c] == sessionStorage.getItem("searchTag")) {
      //                     $.ajax({
      //                         type: "get",
      //                         url: resData[a].articleUrl,
      //                         data: "data",
      //                         dataType: "text",
      //                         success: function (response) {
      //                             $("div").append("<p>" + response + "</p>")
      //                         }
      //                     });
      //                 }
      //             }
      //         }
      //     }
      // }

    }
  });
};