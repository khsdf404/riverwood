var block = document.getElementsByClassName('mw-content-ltr')[0];
var list = block.getElementsByTagName('ul')[1];
var listCells = list.getElementsByTagName('li');

var links = [];
var cnt = 0;

const OpenNext = () => {
    window.open(links[cnt++], " ");
    console.clear();
}

for (let i = 0; i < listCells.length; i++) { links.push(listCells[i].getElementsByTagName('a')[0].href) };
console.clear();