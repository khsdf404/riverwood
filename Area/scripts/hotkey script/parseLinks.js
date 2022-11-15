var block = document.getElementsByClassName('mw-content-ltr')[0];
var list = block.getElementsByTagName('ul')[1];
var listCells = list.getElementsByTagName('li');

var links = [];
var cnt = 200;

const OpenNext = () => {
    window.open(links[cnt--], '_blank');
    console.clear();
}
const Open = (c) => {
    cnt = c - 1;
    while (cnt > -1) {
        OpenNext();
    }
}

for (let i = 0; i < listCells.length; i++) { links.push(listCells[i].getElementsByTagName('a')[0].href) };
console.clear();