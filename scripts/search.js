const removeOthers = false;
let newSearch = true;
let currentIndex = -1;
let clock;


const $input =       $js(`#searchInput`);
const $controls =    $js(`.input-btn`);
const $counter =     $controls.find(0);
const $prevMark =    $controls.find(1);
const $nextMark =    $controls.find(2);
const $cleanInput =  $controls.find(3);


$controls.fadeOut(0);
RIVERS__RU.forEach(river => {
    $riverList
        .append(`<li></li>`)
        .append(`
            <a href="${river.link}" target="_blank" rel="noopener noreferrer">
                ${river.name}<mark></mark><ins></ins>
            </a>
        `)
});
const $aList = $js(`#riverList a`);
const $markList = $js(`#riverList mark`);
const $insList = $js(`#riverList ins`);



function ScrollToElem(index) {
    let length = $js(`.search-target`).size();
    if (length > 0) {
        let currentTarget = $js(`.search-target`).get(index % length); 
        $riverList.get().scrollTo({
            top: currentTarget.offsetTop,
            behavior: "smooth", // or "auto" or "instant"
            block: "start" // or "end"
        });
        $counter.text(`${index > -1 ? index % length + 1 : length - Math.abs(index + 1) % length}/${length}`)
    }
}
function HideSearch() {
    $input.value('')

    $riverList.scroll(0, 0);
    $riverList.fadeOut(200);
    $controls.fadeOut(200);

    clearTimeout(clock);
    clock = setTimeout(() => {
        $areaList.fadeIn(200);
    }, 250);

    newSearch = true;
}





$input.onEvent(`input`, () => {
    let val = $input.value();
    if (!val) return HideSearch();


    if (newSearch == true) {
        $areaList.fadeOut(200);

        clearTimeout(clock);
        $controls.fadeIn(200);
        clock = setTimeout(() => {
            $riverList.fadeIn(200, () => {
                currentIndex = -1;
                $nextMark.trigger('click');
            });
        }, 250);
    }

    $counter.text(`0/0`);
    $js(`.search-target`).removeClass('search-target');
    if (removeOthers) $riverList.find('li').css({'display': 'list-item'});
    
    $aList.each((e, i) => { 
        let text = e.text();
        let indexOf = text.toUpperCase().indexOf(val.toUpperCase());
        if (indexOf > -1) {
            e.text(text.slice(0, indexOf))
                .addClass('search-target');
            $markList.get(i).innerText = text.slice(indexOf, indexOf + val.length);
            $insList.get(i).innerText = text.slice(indexOf + val.length, text.length);
        }
        else if (removeOthers) e.parent('li').css({'display': 'none'});
    });
   
    
    if (!newSearch) {
        currentIndex = -1;
        ScrollToElem(++currentIndex);
    }
    newSearch = false;
});
$input.onEvent('keyup', (e, event) => {
    if (event.key == 'Enter')
        ScrollToElem(++currentIndex); // $nextMark.trigger('click')
    else if (event.key == 'ArrowDown')
        ScrollToElem(++currentIndex); // $nextMark.trigger('click')
    else if (event.key == 'ArrowUp')
        ScrollToElem(--currentIndex); // $prevMark.trigger('click')
    else if (event.key == 'Escape') { // $cleanInput.trigger('click')
        HideSearch()
    } 
})



$nextMark.onClick((e) => { 
    ScrollToElem(++currentIndex);
})
$prevMark.onClick((e) => {
    ScrollToElem(--currentIndex); 
})
$cleanInput.onClick((e) => {
    HideSearch()
})