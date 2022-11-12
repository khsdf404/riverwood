const input =       $(`#searchInput`);
const controls =    $(`.input-btn`);
const counter =     controls.eq(0);
const prevMark =    controls.eq(1);
const nextMark =    controls.eq(2);
const cleanInput =  controls.eq(3);


const riverList = $(`#riverList`);
const areaList = $(`#areaList`);

RIVERS__RU.forEach(river => {
    riverList.append(`
        <li>
            <a href="${river.link}" target="_blank" rel="noopener noreferrer">
                ${river.name}
            </a>
        </li>
    `)
});

const aList = $(`#riverList a`);



var scrollSpeed = 300;
var removeOthers = false;
var newSearch = true;
var currentIndex = -1;
var clock;
const scrollToElem = (index) => {
    let length = $(`.search-target`).length; 
    if (length > 0) {
        let height = $(`#riverList li`).outerHeight() + 4;
        let currentTarget = $(`.search-target`).eq(index % length); 
        riverList.animate({
            'scrollTop': height * aList.index(currentTarget)
        }, scrollSpeed);
        counter.text(`${index > -1 ? index % length + 1 : length - Math.abs(index + 1) % length}/${length}`)
    }
}



controls.fadeOut(0);


input.on(`input`, () => {
    let val = input.val();
    if (!val) {
        riverList.scrollTop(0);
        riverList.fadeOut(200);
        controls.fadeOut(200);

        clearTimeout(clock);
        clock = setTimeout(() => {
            areaList.fadeIn(200);
        }, 250);
    
        newSearch = true;
        return;
    }
    if (newSearch == true) {
        areaList.fadeOut(200);

        clearTimeout(clock);
        controls.fadeIn(200);
        clock = setTimeout(() => {
            riverList.fadeIn(200, () => {
                currentIndex = -1;
                nextMark.trigger('click');
            });
        }, 250);
    }

    counter.text(`0/0`);
    $(`.search-target`).removeClass('search-target');
    if (removeOthers) riverList.find('li').css({'display': 'list-item'});
    aList.each(function() { 
        let text = $(this).text();
        $(this).html(text.replace(/<[/]*mark>/g, ``));
        let indexOf = text.toUpperCase().indexOf(val.toUpperCase());
        if (indexOf > -1) {
            $(this).addClass('search-target');
            let part = text.slice(indexOf, indexOf + val.length)
            $(this).html(text.replace(part, `<mark>${part}</mark>`));
        }
        else if (removeOthers) $(this).parent('li').css({'display': 'none'});
    });
   

    
    if (!newSearch) {
        currentIndex = -1;
        nextMark.trigger('click');
    }
    newSearch = false;
});
input.on('keyup', e => { 
    if (e.key == 'Enter')
        nextMark.trigger('click');
    else if (e.key == 'ArrowDown')
        nextMark.trigger('click');
    else if (e.key == 'ArrowUp')
        prevMark.trigger('click');
    else if (e.key == 'Escape')
        cleanInput.trigger('click');
})



nextMark.click(() => {
    scrollToElem(++currentIndex);
   
})
prevMark.click(() => {
    scrollToElem(--currentIndex); 
})
cleanInput.click(() => {
    input.val('');
    input.trigger('input');
})