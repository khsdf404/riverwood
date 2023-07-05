var block = document.getElementsByClassName(`mw-content-ltr`)[0];

var links = [];
var cnt = 200;

const OpenNext = () => {
    window.open(links[cnt--], `_blank`);
    console.clear();
}
const Open = (c) => {
    cnt = c - 1;
    while (cnt > -1) {
        OpenNext();
    }
}

for (let j = 1; j  <  block.getElementsByTagName(`ul`).length; j++) {
    let list = block.getElementsByTagName(`ul`)[j];
    let listCells = list.getElementsByTagName(`li`);
    for (let i = 0; i < listCells.length; i++) { links.push(listCells[i].getElementsByTagName(`a`)[0].href) };
}

Open(200);
console.clear();