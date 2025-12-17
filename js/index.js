window.onload = function () {
  // 手机端侧边栏
  aside();

  // 屏幕自适应
  deviceFlex();

  // 渲染文章
  var openLoadTimeOut = setTimeout(() => {
    renderHtml();
    clearTimeout(openLoadTimeOut);
  }, 600);

  // 手机端返回顶部
  document.querySelector(".phone-back-top").addEventListener("click", () => {
    backTop();
  });

  // 电脑端顶部导航栏
  let showNav = true;
  showNav = resetHeaderNavPosition(showNav, deviceFlex()[0], deviceFlex()[1]);

  // 初始化页面样式
  initPageStyle();

  // 切换页面主题
  changePageStyle();
};

window.onresize = function () {
  resetHeaderNavPosition();
};

window.onscroll = function () {
  // 顶部菜单
  document.body.scrollTop + 10 ||
  document.documentElement.scrollTop + 10 >=
    document.querySelector(".header-nav").offsetHeight
    ? (document.querySelector(".header-nav").style.position = "fixed")
    : (document.querySelector(".header-nav").style.position = "absolute");
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
  XMLHttp.onreadystatechange = () => {
    if (XMLHttp.readyState == 4 && XMLHttp.status == 200) {
      listRes = XMLHttp.responseText;
    }
  };
  XMLHttp.open("GET", "../article/article_list.json", false);
  XMLHttp.send();

  var listRes = JSON.parse(listRes);

  //获取文章总数
  var listlen = listRes.length;
  var tempHtml = "";
  var temptempHTML = ``;
  var article_number = -1;

  for (var a = 0; a < listlen; a++) {
    var pubDate = listRes[a].pubDate;
    var pubAuthor = listRes[a].authorName;
    var articleTitle = listRes[a].articleTitle;
    var articleContent = listRes[a].articleContent;
    var tagTemplate = ``;
    article_number++;
    try {
      for (var b = 0; b < listRes[a].Tag.length; b++) {
        for (var c = 0; c < listRes[a].Tag.length; c++) {
          temptempHTML = ``;
          temptempHTML = `<div class="article-header-about-tag"><span class="about-title">${listRes[a].Tag}</span></div>`;
        }
        tagTemplate = tagTemplate + temptempHTML;
      }
    } catch (error) {}

    var html = `<div class="article-main">
                <div class="article-title" id="article-title" style="font-size:25px;">
                <p>${articleTitle}</p>
            </div>
            <div class="article-header" style="height:min-content;">
                <div class="pub-time"><?xml version="1.0" encoding="UTF-8"?><svg style="margin-right:5px;height:15px;" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 19H43V40C43 41.1046 42.1046 42 41 42H7C5.89543 42 5 41.1046 5 40V19Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/><path d="M5 9C5 7.89543 5.89543 7 7 7H41C42.1046 7 43 7.89543 43 9V19H5V9Z" stroke="#333" stroke-width="4" stroke-linejoin="round"/><path d="M16 4V12" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M32 4V12" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M28 34H34" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 34H20" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M28 26H34" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 26H20" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>${pubDate}</div>
                <span class="point" style="color: rgba(24, 24, 24, 0.623);">·</span>
                <div class="pub-author">${pubAuthor}</div>
            </div>
            <div class="article-about">
            ${tagTemplate}
            </div>
            <div class="article-content" onclick="goToArticle(this)" data-num="${article_number}">${articleContent}</div>
        </div>`;

    // 模板定义
    if (tempHtml != "") {
      tempHtml = tempHtml + html;
    } else {
      tempHtml = html;
    }
  }

  // 渲染
  var temp = ejs.render("<%- tempHtml %>", {
    tempHtml,
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
      $(".nav-menu")
        .css("transform", "rotate(-270deg)")
        .css("transition", "all 0.5s");
      $(".header-nav").css("transform", "translateX(0)");
      document.querySelector(".nav-menu").setAttribute("fill", "#000000");
      phoneMenuStatus = true;
    } else {
      $(".header-nav").css("transform", "translateY(-100%)");
      $(".nav-menu")
        .css("transform", "rotate(-180deg)")
        .css("transition", "all 0.5s");
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
  let headerNav = document.querySelector(".header-nav");
  let openIcon = document.querySelector(".close-nav");
  const eleArr = [headerNav, openIcon];

  headerNav.style.marginRight =
    ($(window).width() - $(".header-nav").width()) / 2 + "px";
  if (screenW >= 400 && screenH >= 600) {
    eleArr.reduce((pre, item, index) => {
      item.addEventListener("click", () => {
        if (showFlag === true) {
          headerNav.style.top = "0px";
          return (showFlag = false);
        } else {
          headerNav.style.top = "-2.1875rem";
          return (showFlag = true);
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
  document.querySelector("#search-input").value = "";

  // 返回顶部
  scrollTo(0, 0);

  // 手机端默认菜单图标样式
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
    $(document).scroll(() => {
      $(".prograss").height(
        ($(document).scrollTop() /
          ($(document).height() - $(window).innerHeight()).toFixed(2)) *
          85 +
          "%"
      );
    });

    $(".footer p").css("fontSize", "10px");
  }

  if (winW >= 451 && winW <= 800) {
    $(document).scroll(() => {
      $(".prograss").height(
        ($(document).scrollTop() /
          ($(document).height() - $(window).innerHeight()).toFixed(2)) *
          90 +
          "%"
      );
    });

    $(".footer p").css("fontSize", "10px");
  }
  if (winW >= 800 && winW <= 1200) {
    $(document).scroll(() => {
      $(".prograss").height(
        ($(document).scrollTop() /
          ($(document).height() - $(window).innerHeight()).toFixed(2)) *
          95 +
          "%"
      );
    });

    $(".footer p").css("fontSize", "10px");
  }

  if (winW >= 1201 && winW <= 1499) {
    $(document).scroll(() => {
      $(".prograss").height(
        ($(document).scrollTop() /
          ($(document).height() - $(window).innerHeight()).toFixed(2)) *
          95 +
          "%"
      );
    });

    $(".footer p").css("fontSize", "10px");
  }

  if (winW >= 1500 && winW <= 1920) {
    $(document).scroll(() => {
      $(".prograss").height(
        ($(document).scrollTop() /
          ($(document).height() - $(window).innerHeight()).toFixed(2)) *
          95 +
          "%"
      );
    });

    $("#nav-search-item").css("display", "none");
    document.querySelector(".header-nav").style.marginRight =
      ($(window).width() - $(".header-nav").width()) / 2 + "px";
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
    setTimeout(() => {
      flag = true;
      $(".error-tips").css("top", "10vh").css("opacity", "1");
      document.querySelector(".tips-progress").style.animation =
        "tipsProgress 2s forwards";
      setTimeout(() => {
        $(".error-tips").css("top", "-10vh").css("opacity", "0");
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
  setTimeout(() => {
    $(".success-tips").css("top", "20px");
    $(".tips-progress").css({
      width: "0px",
    });
    setTimeout(() => {
      $(".success-tips").css("top", "-50px");
      setTimeout(() => {
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
    // if (__this.parentElement.parentElement.children[0].dataset.search.trim() == "") {
    if (document.querySelector("#search-input").value.trim() == "") {
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
    var backTopTimer = setInterval(() => {
      var backTopTimer2 = setInterval(() => {
        var backTopTimer3 = setInterval(() => {
          var backTopTimer4 = setInterval(() => {
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
  // const menu = document.querySelector(".change-page-menu");
  // const nightIcon = document.querySelector(".night-icon");
  // const lightIcon = document.querySelector(".light-icon");

  let showFlag = false;
  let darkFlag = false;

  // menu.addEventListener("click", () => {
  //   if (showFlag === false) {
  //     nightIcon.classList.replace(
  //       "changePageStyleNightDown",
  //       "changePageStyleNightIn"
  //     );
  //     lightIcon.classList.replace(
  //       "changePageStyleLightDown",
  //       "changePageStyleLightIn"
  //     );

  //     showFlag = true;
  //   } else {
  //     nightIcon.classList.replace(
  //       "changePageStyleNightIn",
  //       "changePageStyleNightDown"
  //     );
  //     lightIcon.classList.replace(
  //       "changePageStyleLightIn",
  //       "changePageStyleLightDown"
  //     );

  //     showFlag = false;
  //   }
  // });

  // nightIcon.addEventListener("click", () => {
  //   if (showFlag === true) {
  //     if (darkFlag === false) {
  //       const createElement = document.createElement("style");
  //       createElement.setAttribute("id", "pageStyleChange");
  //       document.querySelector("head").append(createElement);
  //       document.querySelector(".notice").style.filter="invert(100%)"

  //       document.querySelector("#pageStyleChange").innerText = `
  //     .article-content,.article-title,.pub-time,.pub-author,.point,.item-tag,.tag-title,.search-area-title,#search_button,.article,.header-nav,.show-next,.page-header::before {
  //       filter: invert(100%);
  //     }
  //     `;
  //       darkFlag = true;
  //       console.log(darkFlag);
  //     }
  //   }
  // });

  // lightIcon.addEventListener("click", () => {
  //   if (showFlag === true) {
  //     if (darkFlag === true) {
  //       document.querySelector("#pageStyleChange").remove();
  //       darkFlag = false;
  //     } document.querySelector(".notice").removeAttribute("style");
  //   }
  // });
}
