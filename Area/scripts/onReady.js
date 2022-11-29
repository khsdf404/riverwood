const START_THEME =     localStorage.getItem('theme') ? 
        JSON.parse(localStorage.getItem('theme')) : 
        ThemesObj.Light;
const START_LANG =      localStorage.getItem('lang') ? 
    JSON.parse(localStorage.getItem('lang')) : 
    LanguagesObj.LANGTYPES.en;
var SETTINGS_ACTIVE;
var CURRENT_THEME, CURRENT_LANG;

const $themeAnim = $js(`#themeAnimation`)

const isPhone = () => {
return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)
}




const Header = () => { 
    LanguagesObj.Start(START_LANG); 
    ThemesObj.Start(START_THEME); 
    

    if (isPhone()) { 
        const HideSettings = () => {
            if (SETTINGS_ACTIVE) {
                SETTINGS_ACTIVE = false; 
                $js(`#settingsBtn`).removeClass('active-btn');
                $js(`.header-settings`).animate({
                    'right': '-250px' 
                }, 200) 
            }
        }
        $js(`#settingsBtn`).onClick(function(e) {
            SETTINGS_ACTIVE ? 
                e.removeClass('active-btn') :
                e.addClass('active-btn')
                
            $js(`.header-settings`).animate({
                'right': !SETTINGS_ACTIVE ? '10px' : '-250px' 
            }, !SETTINGS_ACTIVE ? 300 : 200) 
            SETTINGS_ACTIVE = !SETTINGS_ACTIVE;
        })
        
        $js(`main`).onClick(() => {
            HideSettings();
        });
    }    
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
        if (scrollAllowed && Math.abs(e.deltaY) > prevDelta) {
            prevDelta = Math.abs(e.deltaY);
            scrollAllowed = false; 
            e.deltaY >= 0 ? scrollNext() : scrollPrev()
            clearTimeout(timer)
            timer = setTimeout(() => { 
                scrollAllowed = true;
            }, 1000);
        }
    });


    $navs.onClick((el, e, i) => {
        if (el.hasClass(`active`)) return;
        if (i > currentIndex) scrollNext(i);
        else scrollPrev(i);
    })
}


(function onReady() { 
    let areaStr = localStorage.getItem('areaName');  
    $js(`#introduction h2`).text(`${areaStr} in development...`);
    $js(`.header-logo a`).onClick(() => {
        localStorage.removeItem('areaName');
    })
    Header();
    InfiniteScroll()
})()