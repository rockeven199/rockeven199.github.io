function onEle(onEle) {
    console.log(onEle)
    onEle.style.cssText = "background-image:url('../img/19186sAkacEsSN2.jpg');transition:all 0.5s;"
}

function outEle(outEle) {
    outEle.style.cssText = "url(../img/OIP-C.jfif);transition:all 0.5s;"

}


// aside

$(".nav-menu").click(()=>{
    $(".header-nav").css("transform","translateX(0)")
})

//自适应

window.onload = () => {
    if (($(window).width() >= 360 && $(window).width() <= 500) && ($(window).height() >= 600 && $(window).height() <= 800)) {

    }
}