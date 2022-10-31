var log = console.log.bind(document)
var infobox = document.getElementsByClassName('infobox')[0];
var tableCell = infobox.getElementsByTagName('tr');
var infoboxImage = document.getElementsByClassName('infobox-image');
var link, riverName, length, pool, consumption, head, estuary, locate, image;
const contains = (e, str) => {
    return e.innerText.lastIndexOf(str) != -1;
}
const getText = (e) => {
    return e.getElementsByTagName('td')[0].innerText;
}
const setClipboard = (text) => { 
    var copyFrom = document.createElement("textarea"); 
    copyFrom.textContent = text; 
    document.body.appendChild(copyFrom); 
    copyFrom.select(); 
    document.execCommand('copy');
    document.body.removeChild(copyFrom);
  }


riverName = document.getElementsByClassName('infobox-above')[0].innerText;
link = window.location.href;
if (infoboxImage.length != 0) image = infoboxImage[0].getElementsByTagName('img').src;

for (let tr of tableCell) {
    if (contains(tr, "Длина"))
        length = getText(tr);
    if (contains(tr, "Бассейн"))
        pool = getText(tr);
    if (contains(tr, "Расход воды"))
        consumption = getText(tr);
    if (contains(tr, 'Исток'))
        head = getText(tr);
    if (contains(tr, 'Устье'))
        estuary = getText(tr);
    if (contains(tr, 'Стран'))
        locate = getText(tr);
}

var riverObjString = `{
    'name': '${riverName}',
    'link': '${link}',
    'image': '${image}',
    'length': '${length}',
    'pool': '${pool}',
    'consumption': '${consumption}',
    'head': '${head}',
    'estuary': '${estuary}',
    'location': '${locate}',
},
`

console.log(riverObjString);
setClipboard(riverObjString);
