const input = $(`#searchInput`);
const prevMark = $(`.input-btn`).eq(0);
const nextMark = $(`.input-btn`).eq(1);
const cleanInput = $(`.input-btn`).eq(2);

const riverList = $(`#riverList`);
const sidebarList = $(`#sidebarList`);

RIVERS__RU.forEach(river => {
    riverList.append(`
        <li>
            <a href="${river.link}">${river.name}</a>
        </li>
    `)
});

const aList = $(`#riverList a`);


var newSearch = true;
var currentIndex = -1;
var scrollSpeed = 300;
var clock;
const scrollToElem = (index) => {
    let length = $(`.search-target`).length; 
    if (length > 0) {
        let height = $(`#riverList li`).outerHeight() + 4;
        let currentTarget = $(`.search-target`).eq(index % length); 
        riverList.animate({
            'scrollTop': height * aList.index(currentTarget)
        }, scrollSpeed);
    }
}
$(`.input-btn`).fadeOut(0);



input.on(`input`, () => {
    let val = input.val();
    if (!val) {
        riverList.scrollTop(0);
        riverList.fadeOut(200);
        clearTimeout(clock);
        clock = setTimeout(() => {
            sidebarList.fadeIn(200);
        }, 250);
        
        $(`.input-btn`).fadeOut(200);

        newSearch = true;
        return;
    }
    if (newSearch == true) {
        sidebarList.fadeOut(200);
        clearTimeout(clock);
        clock = setTimeout(() => {
            riverList.fadeIn(200, () => {
                currentIndex = -1;
                nextMark.trigger('click');
            });
        }, 250);
        
        $(`.input-btn`).fadeIn(200);
    }

    $(`.search-target`).removeClass('search-target');
    $(`#riverList a`).each(function() {
        let text = $(this).text();
        $(this).html(text.replace(/<[/]*mark>/g, ``));
        if (text.indexOf(val) > -1) {
            $(this).addClass('search-target');
            $(this).html(text.replace(val, `<mark>${val}</mark>`));
        }
    })
    

    
    if (!newSearch) {
        currentIndex = -1;
        nextMark.trigger('click');
    }
    newSearch = false;
});



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

