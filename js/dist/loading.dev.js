"use strict";

document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    document.querySelector(".loading").style.animation = "loading-complete 4s forwards";
    document.documentElement.removeAttribute("style");
    var temp = setTimeout(function () {
      document.querySelector(".prograss-pic").removeAttribute("style");
      document.querySelector("body").removeAttribute("style");
      clearTimeout(temp);
    }, 4000);
  } else {
    document.documentElement.style.overflow = "hidden";
    document.querySelector(".prograss-pic").style.display = "none";
    var fontColor = ['#2BD52B', '#E6E61A', '#DD2222', '#2B6FD5', '#CC33CC', '#E6941A'];
    var realDom = document.querySelectorAll("span");
    realDom.forEach(function (element) {
      element.style.color = fontColor[Math.floor(Math.random() * (6 - 1 + 1))];
    });
  }
};