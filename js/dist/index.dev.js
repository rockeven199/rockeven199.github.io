"use strict";

window.onload = function () {
  // 手机端侧边栏
  aside(); // 屏幕自适应

  deviceFlex(); // 渲染文章

  var openLoadTimeOut = setTimeout(function () {
    renderHtml();
    clearTimeout(openLoadTimeOut);
  }, 600); // 手机端返回顶部

  document.querySelector(".phone-back-top").addEventListener("click", function () {
    backTop();
  }); // 电脑端顶部导航栏

  var showNav = true;
  showNav = resetHeaderNavPosition(showNav, deviceFlex()[0], deviceFlex()[1]); // 初始化页面样式

  initPageStyle(); // 切换页面主题

  changePageStyle();
};

window.onresize = function () {
  resetHeaderNavPosition();
};

window.onscroll = function () {
  // 顶部菜单
  document.body.scrollTop + 10 || document.documentElement.scrollTop + 10 >= document.querySelector(".header-nav").offsetHeight ? document.querySelector(".header-nav").style.position = "fixed" : document.querySelector(".header-nav").style.position = "absolute";
};
/**
 * @name renderHtml
 * @description 渲染文章
 */


function renderHtml() {
  // 数据请求
  var XMLHttp;
  listRes = null;
  XMLHttp = new XMLHttpRequest();

  XMLHttp.onreadystatechange = function () {
    if (XMLHttp.readyState == 4 && XMLHttp.status == 200) {
      listRes = XMLHttp.responseText;
    }
  };

  XMLHttp.open("GET", "../article/article_list.json", false);
  XMLHttp.send();
  var listRes = JSON.parse(listRes); //获取文章总数

  var listlen = listRes.length;
  var tempHtml = "";
  var temptempHTML = "";
  var article_number = -1;

  for (var a = 0; a < listlen; a++) {
    var pubDate = listRes[a].pubDate;
    var pubAuthor = listRes[a].authorName;
    var articleTitle = listRes[a].articleTitle;
    var articleContent = listRes[a].articleContent;
    var tagTemplate = "";
    article_number++;

    try {
      for (var b = 0; b < listRes[a].Tag.length; b++) {
        for (var c = 0; c < listRes[a].Tag.length; c++) {
          temptempHTML = "";

          if (listRes[a].Tag[b][3] == "blue") {
            temptempHTML = "<div class=\"article-header-about-tag\"><span class=\"about-title\" style=\"margin-left:5px\">".concat(listRes[a].Tag[b][0], "</span><a class=\"about-link\">").concat(listRes[a].Tag[b][1], "</a></div>");
          } else if (listRes[a].Tag[b][3] == "green") {
            temptempHTML = "<div class=\"article-header-about-tag\"><span class=\"about-title\" style=\"margin-left:5px\">".concat(listRes[a].Tag[b][0], "</span><a class=\"about-object\">").concat(listRes[a].Tag[b][1], "</a></div>");
          } else {
            temptempHTML = "<div class=\"article-header-about-tag\"><span class=\"about-title\" style=\"margin-left:5px\">".concat(listRes[a].Tag[b][0], "</span><a class=\"about-tag\">").concat(listRes[a].Tag[b][1], "</a></div>");
          }
        }

        tagTemplate = tagTemplate + temptempHTML;
      }
    } catch (error) {}

    var html = "<div class=\"article-main\">\n            <div class=\"article-header\">\n                <div class=\"pub-time\">".concat(pubDate, "</div>\n                <span class=\"point\" style=\"color: rgba(24, 24, 24, 0.623);\">\xB7</span>\n                <div class=\"pub-author\">").concat(pubAuthor, "</div>\n            </div>\n            <div class=\"article-title\" id=\"article-title\">\n                <h1>").concat(articleTitle, "</h1>\n            </div>\n            <div class=\"article-about\">\n            ").concat(tagTemplate, "\n            </div>\n            <div class=\"article-content\" onclick=\"goToArticle(this)\" data-num=\"").concat(article_number, "\">").concat(articleContent, "</div>\n        </div>"); // 模板定义

    if (tempHtml != "") {
      tempHtml = tempHtml + html;
    } else {
      tempHtml = html;
    }
  } // 渲染


  var temp = ejs.render("<%- tempHtml %>", {
    tempHtml: tempHtml
  });
  $(".article-section").html(temp);
}
/**
 * @description 手机端顶部导航栏
 * @name aside
 */


function aside() {
  var phoneMenuStatus = false;
  $(".nav-menu").on("click", function () {
    if (phoneMenuStatus === false) {
      $(".nav-menu").css("transform", "rotate(-270deg)").css("transition", "all 0.5s");
      $(".header-nav").css("transform", "translateX(0)");
      document.querySelector(".nav-menu").setAttribute("fill", "#000000");
      phoneMenuStatus = true;
    } else {
      $(".header-nav").css("transform", "translateY(-100%)");
      $(".nav-menu").css("transform", "rotate(-180deg)").css("transition", "all 0.5s");
      document.querySelector(".nav-menu").setAttribute("fill", "#ffffff");
      phoneMenuStatus = false;
    }
  });
}
/**
 * @param {*} showFlag
 * @param {*} screenW
 * @param {*} screenH
 * @name resetHeaderNavPosition
 * @description 大屏设备导航栏
 */


function resetHeaderNavPosition(showFlag, screenW, screenH) {
  var headerNav = document.querySelector(".header-nav");
  var openIcon = document.querySelector(".close-nav");
  var eleArr = [headerNav, openIcon];
  headerNav.style.marginRight = ($(window).width() - $(".header-nav").width()) / 2 + "px";

  if (screenW >= 400 && screenH >= 600) {
    eleArr.reduce(function (pre, item, index) {
      item.addEventListener("click", function () {
        if (showFlag === true) {
          headerNav.style.top = "0px";
          return showFlag = false;
        } else {
          headerNav.style.top = "-2.1875rem";
          return showFlag = true;
        }
      });
    });
  }
}
/**
 * @name initPageStyle
 * @description 初始化页面样式
 */


function initPageStyle() {
  // 清空搜索框
  document.querySelector("#search-input").value = ""; // 返回顶部

  scrollTo(0, 0); // 手机端默认菜单图标样式

  document.querySelector(".nav-menu").setAttribute("fill", "#ffffff");
}
/**
 * @name deviceFlex
 * @description 设备适配
 * @return {[deviceH,device]}
 */


function deviceFlex() {
  var winH = $(window).height();
  var winW = $(window).width();

  if (winW >= 360 && winW <= 450) {
    $(document).scroll(function () {
      $(".prograss").height($(document).scrollTop() / ($(document).height() - $(window).innerHeight()).toFixed(2) * 85 + "%");
    });
    $(".footer p").css("fontSize", "10px");
  }

  if (winW >= 451 && winW <= 800) {
    $(document).scroll(function () {
      $(".prograss").height($(document).scrollTop() / ($(document).height() - $(window).innerHeight()).toFixed(2) * 90 + "%");
    });
    $(".footer p").css("fontSize", "10px");
  }

  if (winW >= 800 && winW <= 1200) {
    $(document).scroll(function () {
      $(".prograss").height($(document).scrollTop() / ($(document).height() - $(window).innerHeight()).toFixed(2) * 95 + "%");
    });
    $(".footer p").css("fontSize", "10px");
  }

  if (winW >= 1201 && winW <= 1499) {
    $(document).scroll(function () {
      $(".prograss").height($(document).scrollTop() / ($(document).height() - $(window).innerHeight()).toFixed(2) * 95 + "%");
    });
    $(".footer p").css("fontSize", "10px");
  }

  if (winW >= 1500 && winW <= 1920) {
    $(document).scroll(function () {
      $(".prograss").height($(document).scrollTop() / ($(document).height() - $(window).innerHeight()).toFixed(2) * 95 + "%");
    });
    $("#nav-search-item").css("display", "none");
    document.querySelector(".header-nav").style.marginRight = ($(window).width() - $(".header-nav").width()) / 2 + "px";
  }

  return [winH, winW];
}
/**
 * @description 失败提示信息
 * @name errorTips
 * @param {String} content
 */


function errorTips(content) {
  $(".error-tips p").text(content);
  var flag = false;

  if (flag == false) {
    setTimeout(function () {
      flag = true;
      $(".error-tips").css("top", "40px");
      document.querySelector(".tips-progress").style.animation = "tipsProgress 2s forwards";
      setTimeout(function () {
        $(".error-tips").css("top", "-50px");
        document.querySelector(".tips-progress").removeAttribute("style");
        flag = false;
      }, 2000);
    }, 5);
  }

  return 0;
}
/**
 * @description 成功提示信息
 * @name successTips
 * @param {String} content
 * @returns
 */


function successTips(content) {
  $(".tips-progress").css("width", "100%");
  $(".success-tips p").text(content);
  setTimeout(function () {
    $(".success-tips").css("top", "20px");
    $(".tips-progress").css({
      width: "0px"
    });
    setTimeout(function () {
      $(".success-tips").css("top", "-50px");
      setTimeout(function () {
        $(".tips-progress").css("width", "100%");
      }, 200);
    }, 2000);
  }, 5);
  return 0;
}
/**
 * @description 监听输入框内容
 * @name inputChange
 * @param {*} element
 */


function inputChange(ele) {
  var __this = ele;
  __this.dataset.search = __this.value;
}
/**
 * @description 搜索
 * @name searchContent
 * @param {*} searchButton
 */


function searchContent(searchButton) {
  this.__this = searchButton;
  this.getUA = __this.dataset.ua;
  this.searchWay = __this.previousElementSibling;

  if (getUA === "pc") {
    if (__this.parentElement.parentElement.children[0].dataset.search == "") {
      __this.setAttribute("type", "button");

      errorTips("搜索内容不能为空");
    } else {
      __this.setAttribute("type", "submit");
    }
  }
}
/**
 * @description 获取文章内容并跳转
 * @name goToArticle
 * @param {*} pageNum
 * @return
 */


function goToArticle(pageNum) {
  var xhr = new XMLHttpRequest();
  var articleNum = pageNum.dataset.num;
  var articleArray = undefined;
  var articleUrl = "";

  xhr.onreadystatechange = function () {
    try {
      if (xhr.readyState == 4 || xhr.status == 200) {
        articleArray = eval(xhr.responseText);
        articleUrl = articleArray[articleNum].articleUrl;
        sessionStorage.setItem("articleUrl", articleUrl);
        sessionStorage.setItem("articleNum", pageNum.dataset.num);
        location.href = "../article_content.html";
      }
    } catch (error) {}
  };

  xhr.open("GET", "../article/article_list.json", true);
  xhr.send();
  return 0;
}
/**
 * @description 返回页面顶部
 * @name backTop
 */


function backTop() {
  var temp = document.documentElement.scrollTop;

  if (temp != 0) {
    var backTopTimer = setInterval(function () {
      var backTopTimer2 = setInterval(function () {
        var backTopTimer3 = setInterval(function () {
          var backTopTimer4 = setInterval(function () {
            if (temp <= 0) {
              clearInterval(backTopTimer);
              clearInterval(backTopTimer2);
              clearInterval(backTopTimer3);
              clearInterval(backTopTimer4);
            }

            scrollTo(0, temp);
            temp -= 1;
          }, 10);
        }, 10);
      }, 10);
    }, 10);
  }
}
/**
 * @name changePageStyle
 * @description 切换页面的样式
 */


function changePageStyle() {
  var menu = document.querySelector(".change-page-menu");
  var nightIcon = document.querySelector(".night-icon");
  var lightIcon = document.querySelector(".light-icon");
  var showFlag = false;
  var darkFlag = false;
  menu.addEventListener("click", function () {
    if (showFlag === false) {
      nightIcon.classList.replace("changePageStyleNightDown", "changePageStyleNightIn");
      lightIcon.classList.replace("changePageStyleLightDown", "changePageStyleLightIn");
      showFlag = true;
    } else {
      nightIcon.classList.replace("changePageStyleNightIn", "changePageStyleNightDown");
      lightIcon.classList.replace("changePageStyleLightIn", "changePageStyleLightDown");
      showFlag = false;
    }
  });
  nightIcon.addEventListener("click", function () {
    if (showFlag === true) {
      if (darkFlag === false) {
        var createElement = document.createElement("style");
        createElement.setAttribute("id", "pageStyleChange");
        document.querySelector("head").append(createElement);
        document.querySelector("#pageStyleChange").innerText = "\n      .article-content,.article-title,.pub-time,.pub-author,.point,.item-tag,.tag-title,.search-area-title,#search_button,.article,.header-nav,.show-next,.page-header::before {\n        filter: invert(100%);\n      }\n      ";
        darkFlag = true;
        console.log(darkFlag);
      }
    }
  });
  lightIcon.addEventListener("click", function () {
    if (showFlag === true) {
      if (darkFlag === true) {
        document.querySelector("#pageStyleChange").remove();
        darkFlag = false;
      }
    }
  });
}