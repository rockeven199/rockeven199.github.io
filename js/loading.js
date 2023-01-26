document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        document.querySelector(".prograss-pic").removeAttribute("style");
        document.querySelector(".loading").style.animation = "loading-complete 5s forwards"
        document.querySelector("body").style.overflow = "";
        // 临时样式
        // document.querySelector(".prograss-pic").style.display = "none";
    }
    else {
        document.querySelector("body").style.overflow = "hidden";
        document.querySelector(".prograss-pic").style.display = "none";
        var fontColor = ['#2BD52B', '#E6E61A', '#DD2222', '#2B6FD5', '#CC33CC', '#E6941A'];
        var realDom = document.querySelectorAll("span");

        realDom.forEach(element => {
            element.style.color = fontColor[Math.floor(Math.random() * (6 - 1 + 1))];
        })
    }
}