function init() {
    $.getJSON("items.json", itemsOut);

}
function itemsOut(data) {
    //var items = JSON.parse(data);
    console.log(data);
   var out='';
    for (var key in data) {
        //out+='<div class="books">';
        //out+=`<div class="smallThumbnail">${data[key].smallThumbnail}</div>`;
        //out+='<div class="list">';
        //out+='<ul class="ul">';
       // out+=`<li class="title">${data[key].title}</li>`;
        //out+=`<li class="authors">${data[key].authors}</li>`;
       // out+=`<li class="publisher">${data[key].publisher}</li>`;
       // out+=`<li class="publisherDate">${data[key].publisherDate}</li>`;
       // out+=`<li class="description">${data[key].description}</li>`;
       // out+='</ul>';
       // out+='</div>';
        //out+='</div>';

   // }
    out+='<div class="books">';
    out+='<div class="smallThumbnail">'+data[key].name+'</div>';
    out+='<div class="list">';
    out+='<ul class="ul">';
    out+='<li class="title">'+data[key].title+'</li>';
    out+='<li class="authors">'+data[key].authors+'</li>';
    out+='<li class="publisher">'+data[key].publisher+'</li>';
    out+='<li class="publiserDate">'+data[key].publisherData+'</li>';
    out+='<li class="description">'+data[key].description+'</li>';
    out+='</ul>';
    out+='</div>';
    out+='</div>';
}

    $('.items-out').html(out);
}
$(document).ready(function () {
    init();

});

