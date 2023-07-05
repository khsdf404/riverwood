let areaItem; 
const isPhone = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)
}
function RiverPage(riverItem) {
    if (riverItem) {
        localStorage.setItem('riverItem', JSON.stringify(riverItem));
        window.location.href = '../River/river.html';
    }
}


const Settings = () => { 
    const $settings =       $js(`.header-settings`) 
    const settingsSpeed =   350;
    const mediaWidth =      768;
    let SETTINGS_ACTIVE =   false;
    
 
    const ShowSettings = () => {
        $js(`#settingsBtn`).addClass('active-btn');
        $settings.animate({'transform': 'translateX(0px)'}, settingsSpeed);
        SETTINGS_ACTIVE = true;
    }
    const HideSettings = () => {
        $js(`#settingsBtn`).removeClass('active-btn');
        $settings.animate({'transform': 'translateX(260px)'}, settingsSpeed / 1.5);
        SETTINGS_ACTIVE = false;
    }
     

    (isPhone() || window.innerWidth < mediaWidth) &&  LanguagesObj.TranslatePage(true);




    $js(`#settingsBtn`).onEvent('mousedown', () => { 
        SETTINGS_ACTIVE ? 
            HideSettings() : 
            ShowSettings();
    })
    $js(`main`).onClick((e) => {
        if (!isPhone()) return;
        HideSettings();
    });
} 
const InfiniteScroll = () => {
    let scrollAllowed = true;
    let prevDelta = 0;
    const $main = $js(`main`)
    const $views = $js(`main article`);
    const $viewsList = $views.toJSF(); 
    const $navs = $js(`#scrollNav span`);
    const $navsList = $navs.toJSF();
    let currentIndex = 0;
    let timer; 
    // phone touch events
    let touchEvent = null;
    let direction = null;

    // hotfix for transitionless first scroll
    for(let i = currentIndex; i < $viewsList.size(); i++) {
        $viewsList.get(i).css({
            'transform': `translateY(0%)`
        });
    }

    function scrollNext(index = null) {
        index = index != null ? index : (currentIndex + 1) % $navs.size()
        if (currentIndex == $navs.size() - 1 && index == 0) return scrollPrev(0)

        $navsList.get(currentIndex).removeClass(`active`);
        $navsList.get(index).addClass(`active`)

        for(let i = currentIndex; i < index; i++) {
            $viewsList.get(i).css({
                'transform': `translateY(-${(i + 1) * 100}%)`
            });
        }
        currentIndex = index;
        $viewsList.get(currentIndex).css({
            'transform': `translateY(${currentIndex * -1 * 100}%)`
        });
    }
    function scrollPrev(index = null) {
        index = index != null ? index : ($navs.size() + currentIndex - 1) % $navs.size()
        if (currentIndex == 0 && index == $navs.size() - 1) return scrollNext($navs.size() - 1)

        $navsList.get(currentIndex).removeClass(`active`);
        $navsList.get(index).addClass(`active`)


        for(let i = currentIndex; i > index; i--) {
            $viewsList.get(i).css({
                'transform': `translateY(0%)`
            });
        }
        currentIndex = index;
        $viewsList.get(currentIndex).css({
            'transform': `translateY(${currentIndex * -1 * 100}%)`
        }); 
    }
    $main.onEvent('mousewheel', (el, e) => {
        if (!scrollAllowed && Math.abs(e.deltaY) > prevDelta)
            prevDelta = Math.abs(e.deltaY);
        if (Math.abs(e.deltaY) == 0) prevDelta = 0;
        if (scrollAllowed && Math.abs(e.deltaY) >= prevDelta) {
            prevDelta = Math.abs(e.deltaY);
            scrollAllowed = false; 
            e.deltaY >= 0 ? scrollNext() : scrollPrev()
            clearTimeout(timer)
            timer = setTimeout(() => { 
                scrollAllowed = true;
            }, 1000);
        }
    });
    
    $main.onEvent("touchmove", (e, event) => {
        touchEvent = touchEvent || event;
        direction = (event.touches[0].pageY - touchEvent.touches[0].pageY) > 0;
    });
    $main.onEvent("touchend", () => {
        if (touchEvent) {
            direction ? scrollPrev() : scrollNext();
            touchEvent = null;
            direction = null;  
        }
    });

    $navs.onClick((el, e, i) => {
        if (el.hasClass(`active`)) return;
        if (i > currentIndex) scrollNext(i);
        else scrollPrev(i);
    })
}



const Significant = () => {
    function TopByLength(areaItem) {
        let arr = [];
        for (let i = 0; i < areaItem.rivers.length; i++) {
            let river = areaItem.rivers[i];
            if (arr.length < 3) arr.push(river)
            else {
                let first = parseInt(arr[0].length.replace(/\s+/, ''));
                let second = parseInt(arr[1].length.replace(/\s+/, ''));
                let third = parseInt(arr[2].length.replace(/\s+/, ''));
                let current = parseInt(river.length.replace(/\s+/, ''))
                if (current > first) arr[0] = river
                else if (current > second) arr[1] = river
                else if (current > third) arr[2] = river
            }
        }
        return arr;
    }
    function HidingText(topRivers) {
        let rect = $js(`#significant section p`).rect();
        let step = (Math.pow(Math.log(rect.width), 2.2) * rect.width / rect.height) * 1.5;
        for(let i = 0; i < topRivers.length; i++) {
            let opacity = 1;
            let html = '';
            let words = LanguagesObj.TranslateInfo(topRivers[i]).split(' ');
            for(let j = 0; j < step; j++) {
                html += `<span style="opacity:${opacity}">${words[j]} </span>`;
                opacity -= 1/step;
            }
            $js(`#significant section p`).find(i).ihtml(html);
        }
    }
    let topRivers = TopByLength(areaItem); 
    $js(`#significant section h3`).find(0).text(topRivers[0].name.replace(/\([\D\d^\)]+\)/g, ''));
    $js(`#significant section h3`).find(1).text(topRivers[1].name.replace(/\([\D\d^\)]+\)/g, ''));
    $js(`#significant section h3`).find(2).text(topRivers[2].name.replace(/\([\D\d^\)]+\)/g, ''));


    if (!isPhone() && !window.innerWidth < 768)
        HidingText(topRivers) 
    $js([window]).onEvent('resize', e => {
        HidingText(topRivers)
    })

    $js(`#significant section button`).onClick((e) => {
        let index = e.parent('div').parent(`div`).index()
        RiverPage(topRivers[index]);
    })
    
}

const ListLayout = () => {
    function CreateItem(river, index) {
        return `<span id="${index == 0 ? 'listTemplate' : ''}" style="width: ${cellRect.width}px; height: ${cellRect.height}px">${index + 1}. <a>${river.name.replace(/\([\D\d^\)]+\)/g, '')}</a></span>`
    }
    function getCols() { 
        if (window.innerWidth < 700) return 2;
        else if (window.innerWidth < 900) return 3;
        else return 4;
    }
    const $list = $js(`#listWrap`); 
 
    let rect = $list.rect();
    let cellRect = $js(`#nextBtn`).rect();
    cellRect = {
        width: Math.floor(Math.max(105, rect.width / getCols())),
        height: $js(`#listTemplate`).rect().height + 4
    }
    log(cellRect)
    

    let col = getCols()
    let row = Math.floor(rect.height / (cellRect.height))

    log(`wrap: ${rect.width}, ${rect.height}`)
    log(`cell: ${cellRect.width}, ${cellRect.height}`)
    log(`table: ${col}x${row}`)


    let newHTML = '';
    let current = 0;
    let mod = 0;
    let riversAmount = areaItem.rivers.length;
    while (current < riversAmount) {
        let pageHTML = '<div>';
        for (let i = 0; i < col && current < riversAmount; i++) {
            for (let j = 0; j < row && current < riversAmount; j++) {
                current++;
                pageHTML += CreateItem(areaItem.rivers[i * (row) + j + mod], i * (row) + j + mod); 
            }
        }
        mod = current; 
        newHTML += pageHTML + '</div>';
    }


    $list.ihtml(newHTML);
    $list.find(`a`).onClick((e, event, index) => {
        RiverPage(areaItem.rivers[index])
    })
    ListSwipes(); 
}
const ListSwipes = () => { 
    const $views = $js(`#listWrap div`);
    const $viewsList = $views.toJSF();
    const $listPage = $js(`#listPage`);
    const transition = 'all 700ms ease-in-out';
    let currentIndex = 0; 


    
    
    if ($views.size() > 1) {
        // hotfix for transitionless first scroll
        for(let i = currentIndex; i < $viewsList.size(); i++) {
            $viewsList.get(i).css({
                'transform': `translateX(0%)`
            });
        }
        // for cycle-effect
        $viewsList.get($views.size() - 1).css({
            'transform': `translateX(${$views.size() * -1 * 100}%)`
        });
    }
    
    $listPage.value(`1/${$views.size()}`);


    function scrollNext(index = null) {
        index = index != null ? index : (currentIndex + 1) % $views.size()
        if (currentIndex == $views.size() - 1 && index == 0) {
            $viewsList.get(0).css({
                'transform': `translateX(${(1) * 100}%)`
            });
            currentIndex = index;
            setTimeout(() => {
                $viewsList.get($views.size() - 1).animate({
                    'transform': `translateX(${$views.size() * -1 * 100}%)`
                }, transition); 
                
                $viewsList.get(currentIndex).animate({
                    'transform': `translateX(${currentIndex * -1 * 100}%)`
                }, transition);


                for(let i = currentIndex + 1; i < $views.size() - 1; i++) {
                    $viewsList.get(i).css({
                        'transform': `translateX(${(i - 1) * -1 * 100}%)`
                    }); 
                } 
            }, 1);
            return;
        } 

        for(let i = 0; i < currentIndex; i++) {
            $viewsList.get(i).animate({
                'transform': `translateX(${(i + 1) * -1 * 100}%)`
            }, transition);
        }
        $viewsList.get(currentIndex).animate({
            'transform': `translateX(${(currentIndex + 1) * -1 * 100}%)`
        }, transition); 
        currentIndex = index;
        $viewsList.get(currentIndex).animate({
            'transform': `translateX(${currentIndex * -1 * 100}%)`
        }, transition);
        for(let i = currentIndex + 1; i < $views.size(); i++) {
            $viewsList.get(i).css({
                'transform': `translateX(${(i - 1) * -1 * 100}%)`
            }); 
        } 
    }
    function scrollPrev(index = null) {
        index = index != null ? index : ($views.size() + currentIndex - 1) % $views.size()
        if (currentIndex == 0 && index == $views.size() - 1) {
            $viewsList.get($views.size() - 1).css({
                'transform': `translateX(${$views.size() * -1 * 100}%)`
            });
            currentIndex = index;
            setTimeout(() => {
                $viewsList.get(0).animate({
                    'transform': `translateX(100%)`
                }, transition);  
                $viewsList.get(currentIndex).animate({
                    'transform': `translateX(${currentIndex * -1 * 100}%)`
                }, transition);

                for(let i = 1; i < $views.size() - 1; i++) {
                    $viewsList.get(i).css({
                        'transform': `translateX(${(i + 1) * -1 * 100}%)`
                    }); 
                } 
            }, 1);
            return;
        }

        

        for(let i = currentIndex + 1; i < $views.size(); i++) {
            $viewsList.get(i).animate({
                'transform': `translateX(${(i - 1) * -1 * 100}%)`
            }, transition); 
        }
        $viewsList.get(currentIndex).animate({
            'transform': `translateX(${(currentIndex - 1) * -1 * 100}%)`
        }, transition); 
        currentIndex = index;
        $viewsList.get(currentIndex).animate({
            'transform': `translateX(${currentIndex * -1 * 100}%)`
        }, transition);
        for(let i = 0; i < currentIndex; i++) {
            $viewsList.get(i).css({
                'transform': `translateX(${(i + 1) * -1 * 100}%)`
            });
        }
    }
    function setText() {
        log(currentIndex)
        $listPage.value(`${currentIndex + 1}/${$views.size()}`);
    }

    $js(`#prevBtn`).onClick(e => {
        if ($views.size() > 1) {
            scrollPrev();
            setText();
        }
    })
    $js(`#nextBtn`).onClick(e => {
        if ($views.size() > 1) {
            scrollNext();
            setText()
        }
    })

    $listPage.onClick((e) => {
        e.value('');
    })
    $listPage.onEvent('keydown', (e, event) => {
        log(event)
        if (event.keyCode == 13) {
            let num = parseInt(e.value()) - 1
            if (num > $views.size() || num < 0 || num == currentIndex)
                return setText();
            num > currentIndex ? 
                scrollNext(num) :
                scrollPrev(num);
            setText()
            e.get().blur()
        }
    })
}

document.addEventListener("DOMContentLoaded", () => { 
    areaItem =  JSON.parse(localStorage.getItem('areaItem'));
    log(areaItem.rivers.length)


    ThemesObj.Start()
    LanguagesObj.Start()
    
    
    Settings(); 
    InfiniteScroll();

 

    Significant();
    ListLayout();
    $js([window]).onEvent('resize', ListLayout)
});  

 