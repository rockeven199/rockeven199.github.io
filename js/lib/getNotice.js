$.ajax({
    type: "get",
    url: "./article/get_notice.json",
    data: "data",
    dataType: "json",
    success: function (response) {
        var renderHtml = "";
        var temp;
        for (let a = 1; a < Object.keys(response).length+1; a++) {
            temp=`<div class="notice-content">${response[a]}</div>`;
            if(renderHtml==""){
                renderHtml=temp;
            }
            else{
                renderHtml=renderHtml+temp;
            }
        }
        $(".notice-title").after(renderHtml);
    }
});