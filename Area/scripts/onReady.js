const isPhone = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)
}



const Phone = () => { 
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
function HidingText(topLength) {
    let rect = $js(`#significant section p`).rect();
    let step = (Math.log(rect.width) * Math.log(rect.width) * rect.width / rect.height) * 1.5;
    log(rect.width)
    log(rect.height)
    log(step)
    for(let i = 0; i < topLength.length; i++) {
        let opacity = 1;
        let html = '';
        let words = topLength[i].info.split(' ');
        for(let j = 0; j < step; j++) {
            html += `<span style="opacity:${opacity}">${words[j]} </span>`;
            opacity -= 1/step;
        }
        $js(`#significant section p`).find(i).ihtml(html);
    }
}




document.addEventListener("DOMContentLoaded", () => { 
    
    let areaItem =  JSON.parse(localStorage.getItem('areaItem'));

    $js(`#introduction h2`).text(`${areaItem.name} in development...`);


    let topLength = TopByLength(areaItem); 
    $js(`#significant section h3`).find(0).text(topLength[0].name);
    $js(`#significant section h3`).find(1).text(topLength[1].name);
    $js(`#significant section h3`).find(2).text(topLength[2].name);


    



    if (!isPhone() &&  !window.innerWidth < 768) { 
        HidingText(topLength)
    }
    window.onresize = () => {
        HidingText(topLength)
    }











    Phone();
    InfiniteScroll()
});  

 