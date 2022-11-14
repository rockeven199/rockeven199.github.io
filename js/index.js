function onEle(onEle) {
    console.log(onEle)
    onEle.style.cssText = "background-image:url('../img/19186sAkacEsSN2.jpg');transition:all 0.5s;"
}

function outEle(outEle) {
    outEle.style.cssText = "url(../img/OIP-C.jfif);transition:all 0.5s;"

}


// aside
window.onload = () => {
    var phoneMenuStatus = false;
    $(".nav-menu").click(() => {
        if (phoneMenuStatus == false) {
            $(".header-nav").css("transform", "translateX(0)").css("transition","all 0.7s");
            phoneMenuStatus = true;
            // test log
            console.log(phoneMenuStatus)
        } else {
            $(".header-nav").css("transform", "translateX(100%)").css("transition","all 0.7s");
            //test log
            phoneMenuStatus = false;
            console.log(phoneMenuStatus)
        }
    })
}

//自适应

window.onresize = () => {
    if (($(window).width() >= 360 && $(window).width() <= 500) && ($(window).height() >= 600 && $(window).height() <= 800)) {

    }
}