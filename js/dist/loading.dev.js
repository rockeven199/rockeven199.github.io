"use strict";

document.addEventListener("readystatechange", function () {
  scrollTo(0, 0);

  if (document.readyState == "complete") {
    document.querySelector(".loading").style.animation = "loading-complete 4s forwards";
    var temp = setTimeout(function () {
      document.querySelector(".prograss-pic").removeAttribute("style");
      document.querySelector("body").removeAttribute("style");
    }, 4000);
  } else {
    document.querySelector("body").style.overflow = "hidden";
    document.querySelector(".prograss-pic").style.display = "none";
    var fontColor = ['#2BD52B', '#E6E61A', '#DD2222', '#2B6FD5', '#CC33CC', '#E6941A'];
    var realDom = document.querySelectorAll("span");
    realDom.forEach(function (element) {
      element.style.color = fontColor[Math.floor(Math.random() * (6 - 1 + 1))];
    });
  }
});

window.onload = function () {};