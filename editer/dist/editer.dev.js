"use strict";

window.onload = function () {
  //创建
  document.querySelector("#submitForm").addEventListener('click', function () {
    var getPubDate = document.querySelector("#date").value;
    var getAuthorName = document.querySelector("#author").value;
    var getArticleTitle = document.querySelector("#articleTitle").value;
    var getArticleContent = document.querySelector("#articleContent").value;
    var tempArr = [];
    var template = {
      "pubDate": getPubDate,
      "authorName": getAuthorName,
      "articleTitle": getArticleTitle,
      "articleContent": getArticleContent,
      "Tag": [],
      "articleUrl": "../article/content/" + getPubDate.replace(/[-]/g, "") + ".md"
    };
    var countTag = 0;

    if (document.querySelectorAll("form input").forEach(function (item) {
      item.value != "" || item.value != " ";
    })) {
      document.querySelectorAll(".set-tag-content").forEach(function (item, index) {
        if (countTag == 3) {
          template.Tag.push(tempArr);
          tempArr = [];
          countTag = 0;
        }

        tempArr.push(item.value);
        countTag++;
      });
    } else {
      document.querySelectorAll("form input").forEach(function (item) {
        if (item.value == " " || item.value == "") {
          item.style.outline = "2px solid red";
          item.classList.add("animate__shakeX");
        } else {
          item.style.outline = "none";
          item.classList.remove("animate__shakeX");
        }
      });
      axios({
        methods: "get",
        url: "../article/article_list.json",
        responseType: "json"
      }).then(function (res) {
        var response = res.data;
        response.push(template);
        var sendData = JSON.stringify(response);
        axios({
          type: "get",
          url: "./editer.php",
          params: {
            "sendData": sendData
          }
        }).then(function (success) {});
      });
    }
  }); // 添加

  document.querySelector("#addTag").addEventListener('click', function () {
    var ele = document.createElement("div");
    var setTagContainer = document.querySelector(".set-tag").appendChild(ele);
    ele.classList.add("set-tag-group");
    ele.appendChild(document.createElement("div")).classList.add("tag-content");
    ele.lastElementChild.appendChild(document.createElement('input')).setAttribute("type", "checkbox");
    ele.lastElementChild.lastElementChild.setAttribute("name", "tag-select-box");
    ele.lastElementChild.appendChild(document.createElement("label")).innerHTML = "标题";
    ele.lastElementChild.appendChild(document.createElement("input")).classList.add("set-tag-content");
    ele.lastElementChild.lastElementChild.setAttribute("type", "text");
    ele.lastElementChild.lastElementChild.setAttribute("name", "tag-content");
    ele.lastElementChild.appendChild(document.createElement("label")).innerHTML = "内容";
    ele.lastElementChild.appendChild(document.createElement("input")).classList.add("set-tag-content");
    ele.lastElementChild.lastElementChild.setAttribute("type", "text");
    ele.lastElementChild.lastElementChild.setAttribute("name", "tag-content");
    setTagContainer.append(document.createElement("div"));
    setTagContainer.lastElementChild.appendChild(document.createElement("label")).innerHTML = "颜色";
    setTagContainer.lastElementChild.classList.add("tag-color");
    setTagContainer.lastElementChild.appendChild(document.createElement("input")).setAttribute("name", "tag-color");
    setTagContainer.lastElementChild.lastElementChild.setAttribute("type", "color");
    setTagContainer.lastElementChild.lastElementChild.classList.add("set-tag-content");
    window.location.hash = '#bottom';
  }); // 移除

  document.querySelector("#removeTag").addEventListener("click", function () {
    // 元素列表
    var checkedElement = [];
    document.querySelectorAll("[name=tag-select-box]").forEach(function (item) {
      item.checked ? checkedElement.push(item) : "";
    }); // 移除选定的元素

    function removeSelectElement(checkedElement) {
      checkedElement.map(function (item) {
        item.parentElement.parentElement.remove();
      });
    } // 移除最后一个元素


    function removeLastElement() {
      document.querySelector(".set-tag").lastElementChild.remove();
    } // 判断是否有标签


    if (document.querySelectorAll("[name=tag-select-box]").length != 0) {
      checkedElement.length == 0 ? removeLastElement() : removeSelectElement(checkedElement);
    } else {
      document.querySelector("#dialog").style.display = "block";
    }
  }); // 全选

  window.flag = false;
  document.querySelector("#select-all-tag").addEventListener("click", function () {
    if (window.flag === false) {
      document.querySelectorAll("[name=tag-select-box]").forEach(function (item) {
        item.checked = false;
        item.checked = true;
      });
      window.flag = true;
    } else {
      document.querySelectorAll("[name=tag-select-box]").forEach(function (item) {
        item.checked = true;
        item.checked = false;
      });
      window.flag = false;
    }
  }); // 关闭遮罩层

  document.querySelector("#closeDialog").addEventListener("click", function () {
    document.querySelector("#dialog").style.display = "none";
  }); // 显示文章

  axios({
    methods: "get",
    url: "../article/article_list.json",
    responseType: "json"
  }).then(function (res) {
    var response = res.data;
    var template = "";

    for (var a = 0; a < response.length; a++) {
      template = template + "<div class=\"article-group\">\n                <input type=\"checkbox\" name=\"\" id=\"checkbox\">\n                <div class=\"article-item\">".concat(response[a].articleTitle, "</div>\n            </div>");
    }

    document.querySelector(".render-article-area").innerHTML = template;
  }); // 文章列表

  var controlIcon = false;
  document.querySelector("#control-icon").addEventListener("click", function () {
    if (controlIcon == false) {
      document.querySelector("#control-icon").style.transform = "rotate(0deg)";
      document.querySelector(".article-list").style.transform = "translateX(0)";
      controlIcon = true;
    } else {
      document.querySelector("#control-icon").style.transform = "rotate(180deg)";
      document.querySelector(".article-list").style.transform = "translateX(100%)";
      controlIcon = false;
    }
  }); // 文章编写预览

  document.querySelector("textarea").addEventListener("input", function () {
    document.querySelector(".preview-area").innerHTML = marked.parse(document.querySelector("textarea").value);
  }); // 全选文章

  window.hasChecked = false;
  document.querySelector(".select-all-article").addEventListener("click", function () {
    if (window.hasChecked === false) {
      document.querySelectorAll(".article-group input[type=checkbox]").forEach(function (item) {
        item.checked = false;
        item.checked = true;
      });
      window.hasChecked = true;
    } else {
      document.querySelectorAll(".article-group input[type=checkbox]").forEach(function (item) {
        item.checked = true;
        item.checked = false;
      });
      window.hasChecked = false;
    }
  }); // 删除文章

  document.querySelector(".delete-article").addEventListener("click", function () {
    var checked = [];
    document.querySelectorAll(".article-group input[type=checkbox]").forEach(function (item) {
      item.checked ? checked.push(item) : "";
    }); // 全选状态

    if (document.querySelectorAll(".article-group input[type=checkbox]").length == checked.length) {
      document.querySelectorAll(".article-group input[type=checkbox]").forEach(function (item) {
        item.checked ? item.parentElement.remove() : "";
      });
    } // 单独选择
    else if (checked.length > 0 && document.querySelectorAll(".article-group input[type=checkbox]").length != checked.length) {
        document.querySelectorAll(".article-group input[type=checkbox]").forEach(function (item) {
          item.checked ? item.parentElement.remove() : "";
        });
      } // 未选择
      else {
          document.querySelector(".render-article-area").lastElementChild.remove();
        }
  });
};