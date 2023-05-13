document.addEventListener("readystatechange", function () {
	scrollTo(0, 0)
	if (document.readyState == "complete") {
		document.querySelector(".loading").style.animation = "loading-complete 4s forwards";
		var temp = setTimeout(() => {
			document.querySelector(".prograss-pic").removeAttribute("style");
			document.querySelector("body").removeAttribute("style");
		}, 4000);
	}
	else {
		document.querySelector("body").style.overflow = "hidden";
		document.querySelector(".prograss-pic").style.display = "none";
		var fontColor = ['#2BD52B', '#c7c727', '#c12121', '#2661b8', '#b127b1', '#b7791d'];
		var realDom = document.querySelectorAll("span");
		realDom.forEach(element => {
			element.style.color = fontColor[Math.floor(Math.random() * (6 - 1 + 1))];
		});
	}
});