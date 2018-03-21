function init() {
    $.getJSON("items.json", itemsOut);

}
function itemsOut(data) {
    //var items = JSON.parse(data);
    console.log(data);
   var out='';
    for (var key in data) {
        //out+='<div class="books">';
        //out+=`<div class="smallThumbnail">${data[key].volumeInfo.imageLinks.smallThumbnail}</div>`;
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
    out+='<li class="title">'+data[key].volumeInfo.title+'</li>';
    out+='<li class="authors">'+data[key].volumeInfo.authors+'</li>';
    out+='<li class="publisher">'+data[key].volumeInfo.publisher+'</li>';
    out+='<li class="publiserDate">'+data[key].volumeInfo.publisherData+'</li>';
    out+='<li class="description">'+data[key].volumeInfo.description+'</li>';
    out+='</ul>';
    out+='</div>';
    out+='</div>';
}




    $('.items-out').html(out);
}
$(document).ready(function () {
    init();

});
$(document).ready(function(){
    var minlen = 3; // минимальная длина слова
    var paddingtop = 30; // отступ сверху при прокрутке
    var scrollspeed = 200; // время прокрутки
    var keyint = 1000; // интервал между нажатиями клавиш
    var term = '';
    var n = 0;
    var time_keyup = 0;
    var time_search = 0;

    $('body').delegate('#spgo', 'click', function(){
        $('body,html').animate({scrollTop: $('span.highlight:first').offset().top-paddingtop}, scrollspeed); // переход к первому фрагменту
    });

    function dosearch() {
        term = $('#spterm').val();
        $('span.highlight').each(function(){ //удаляем старую подсветку
            $(this).after($(this).html()).remove();
        });
        var t = '';
        $('div#content').each(function(){ // в селекторе задаем область поиска
            $(this).html($(this).html().replace(new RegExp(term, 'ig'), '<span class="highlight">$&</span>')); // выделяем найденные фрагменты
            n = $('span.highlight').length; // количество найденных фрагментов
            console.log('n = '+n);
            if (n==0)
                $('#spresult').html('Ничего не найдено');
            else
                $('#spresult').html('Результатов: '+n+'. <span class="splink" id="spgo">Перейти</span>');
            if (n>1) // если больше одного фрагмента, то добавляем переход между ними
            {
                var i = 0;
                $('span.highlight').each(function(i){
                    $(this).attr('n', i++); // нумеруем фрагменты, более простого способа искать следующий элемент не нашел
                });
                $('span.highlight').not(':last').attr({title: 'Нажмите, чтобы перейти к следующему фрагменту'}).click(function(){ // всем фрагментам, кроме последнего, добавляем подсказку
                    $('body,html').animate({scrollTop: $('span.highlight:gt('+$(this).attr('n')+'):first').offset().top-paddingtop}, scrollspeed); // переход к следующему фрагменту
                });
                $('span.highlight:last').attr({title: 'Нажмите, чтобы вернуться к форме поиска'}).click(function(){
                    $('body,html').animate({scrollTop: $('#spterm').offset().top-paddingtop}, scrollspeed); // переход к форме поиска
                });
            }
        });
    }

    $('#spterm').keyup(function(){
        var d1 = new Date();
        time_keyup = d1.getTime();
        if ($('#spterm').val()!=term) // проверяем, изменилась ли строка
            if ($('#spterm').val().length>=minlen) { // проверяем длину строки
                setTimeout(function(){ // ждем следующего нажатия
                    var d2 = new Date();
                    time_search = d2.getTime();
                    if (time_search-time_keyup>=keyint) // проверяем интервал между нажатиями
                        dosearch(); // если все в порядке, приступаем к поиску
                }, keyint);
            }
            else
                $('#spresult').html(' '); // если строка короткая, убираем текст из DIVа с результатом
    });

    if (window.location.hash!="") // бонус
    {
        var t = window.location.hash.substr(1, 50); // вырезаем текст
        $('#spterm').val(t).keyup(); // вставляем его в форму поиска
        $('#spgo').click(); // переходим к первому фрагменту
    }
});
