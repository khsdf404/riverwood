var log = console.log.bind(document)
var infobox = document.getElementsByClassName("infobox")[0];
var tableCell = infobox.getElementsByTagName("tr");
var infoboxImage = document.getElementsByClassName("infobox-image");
var link, riverName, length, pool, consumption, head, estuary, locate, image, information;
const contains = (e, strList) => {
    for (let str of strList) {
        if (e.innerText.lastIndexOf(str) != -1)
            return true;
    }
    return false;
}
const getText = (e) => {
    return e.getElementsByTagName("td")[0].innerText;
}
const setClipboard = (text) => { 
    var copyFrom = document.createElement("textarea"); 
    copyFrom.textContent = text; 
    document.body.appendChild(copyFrom); 
    copyFrom.select(); 
    document.execCommand("copy");
    document.body.removeChild(copyFrom);
}
const getInfo = () => {
    let output = "";
    let content = document.getElementById("mw-content-text");
    var childs = content.getElementsByClassName("mw-parser-output")[0].childNodes;
    for(let i = 0; i < childs.length; i++) {
        if (output.length > 1200)
            break;
        if (("" + childs[i]) == "[object HTMLParagraphElement]")
            output += childs[i].innerText;
    }
    return output;
}


riverName = document.getElementsByClassName("mw-page-title-main")[0].innerText;
link = window.location.href;
if (infoboxImage.length != 0) image = infoboxImage[0].getElementsByTagName("img")[0].src;
information = getInfo();
for (let tr of tableCell) {
    if (contains(tr,  ["Длина","Length"]))
        length = getText(tr);
    if (contains(tr,  ["Бассейн","Basin size"]))
        pool = getText(tr);
    if (contains(tr,  ["Расход воды","Discharge"]))
        consumption = getText(tr);
    if (contains(tr,  ["Исток","Source"]))
        head = getText(tr);
    if (contains(tr,  ["Устье","Mouth"]))
        estuary = getText(tr);
    if (contains(tr,  ["Стран","Country"]))
        locate = getText(tr);
}

var riverObjString = `{
    "name": "${riverName}",
    "link": "${link}",
    "image": "${image}",
    "length": "${length}",
    "pool": "${pool}",
    "consumption": "${consumption}",
    "head": "${head}",
    "estuary": "${estuary}",
    "location": "${locate}",
    "info": "${information}"
},
`

console.log(riverObjString);
setClipboard(riverObjString);

window.close();

// var hr = document.getElementsByClassName("interwiki-en")[0].getElementsByTagName("a")[0].href;
// if (hr) window.location.href = hr