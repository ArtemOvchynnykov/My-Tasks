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
    out+='<div class="smallThumbnail">'+data[key].volumeInfo.imageLinks.smallThumbnail+'</div>';
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

$.fn.highlight = function(pat) {
    function innerHighlight(node, pat) {
        var skip = 0;
        if (node.nodeType == 3) {
            var pos = node.data.toUpperCase().indexOf(pat);
            if (pos >= 0) {
                var spannode = document.createElement('span');
                spannode.className = 'highlight';
                var middlebit = node.splitText(pos);
                var endbit = middlebit.splitText(pat.length);
                var middleclone = middlebit.cloneNode(true);
                spannode.appendChild(middleclone);
                middlebit.parentNode.replaceChild(spannode, middlebit);
                skip = 1;
            }
        }
        else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
            for (var i = 0; i < node.childNodes.length; ++i) {
                i += innerHighlight(node.childNodes[i], pat);
            }
        }
        return skip;
    }
    return this.each(function() {
        innerHighlight(this, pat.toUpperCase());
    });
};

$.fn.removeHighlight = function() {
    function newNormalize(node) {
        for (var i = 0, children = node.childNodes, nodeCount = children.length; i < nodeCount; i++) {
            var child = children[i];
            if (child.nodeType == 1) {
                newNormalize(child);
                continue;
            }
            if (child.nodeType != 3) { continue; }
            var next = child.nextSibling;
            if (next == null || next.nodeType != 3) { continue; }
            var combined_text = child.nodeValue + next.nodeValue;
            new_node = node.ownerDocument.createTextNode(combined_text);
            node.insertBefore(new_node, child);
            node.removeChild(child);
            node.removeChild(next);
            i--;
            nodeCount--;
        }
    }

    return this.find("span.highlight").each(function() {
        var thisParent = this.parentNode;
        thisParent.replaceChild(this.firstChild, this);
        newNormalize(thisParent);
    }).end();
};