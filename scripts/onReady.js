function isPhone() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent))
}
function AreaPage(areaStr) {
    localStorage.setItem('areaName', areaStr);
    window.location.href = 'Area/area.html';
}


function removeDuplicates(array, key) {
    let lookup = new Set();
    return array.filter(obj => !lookup.has(obj[key]) && lookup.add(obj[key]));
}


class AsideObj { 
    static $list;

    static CreateListElem(text, length) {
        return `
            <li>
                <h6 class="list-title">${text}
                    <span class="arealist-amount non-select">
                        [${length}]
                    </span>
                    <span class="arealist-href-icon non-select">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" style="align-self: center; height: 24px; color: var(--list-linkColor)" fill="currentColor">
                            <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/> 
                            <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                        </svg>
                    </span>
                </h6>
            </li>
        `;
    }
    static CreateRiversList(riversArr) {
        let div = `<div>`;
        riversArr.forEach(el => {
            div += `
                <a class="non-select" href="${el.link}" target="_blank" rel="noopener noreferrer">
                    <span>➝</span>
                    <ins>${el.name}</ins>
                </a>
            `
        }); 
        div += `</div>`
        return div;
    }
    static ClickEvent = (e) => {
        const $listWrap =       $js(`.list-wrap`);
        let parent = e.parent('li'); 
        if (parent.hasClass((`sidebar-active-item`))) {
            return parent.removeClass().find('div').get().outerHTML = '';
        }
        $js(`.sidebar-active-item`).removeClass().find('div').ohtml('')


        $listWrap.get().scrollTo({
            top: parent.get().offsetTop,
            behavior: "smooth",
            block: "start"
        });

        parent.get().innerHTML += AsideObj.CreateRiversList(
            AreaObj.currentList[$js(`#areaList li`).index(parent)].rivers
        )
        parent.find('h6').onClick(AsideObj.ClickEvent)
        parent.addClass('sidebar-active-item');
    }

    static Recreate() {
        const $areaList =       $js(`#areaList`);
        let newHTML = ''; 
        AreaObj.currentList.forEach(area => {
            newHTML += AsideObj.CreateListElem(area.name, area.rivers.length);
        });
        $areaList.ihtml(newHTML);

        AsideObj.$list = $js(`.list-title`);

        AsideObj.$list.onClick(AsideObj.ClickEvent)
    }
}






const Phone = () => {
    const $mainChilds =     $js();
        $mainChilds.e = [$js(`main aside`).get(), $js(`main article`).get()]
    const $settings =       $js(`.header-settings`)
    const scrollSpeed =     500; 
    const settingsSpeed =   350;
    const mediaWidth =      768;
    let GLOBE_ACTIVE =      true; 
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
    
    const ShowGlobe = () => {
        GLOBE_ACTIVE = true; 
        $mainChilds.animate({'transform': 'translateY(-100%)'}, scrollSpeed);
        LanguagesObj.TranslatePage(GLOBE_ACTIVE)
        return true;
    }
    const ShowList = () => {
        GLOBE_ACTIVE = false; 
        $mainChilds.animate({'transform': 'translateY(0%)'}, scrollSpeed);
        LanguagesObj.TranslatePage(GLOBE_ACTIVE)
        return true;
    }

    

    (isPhone() || window.innerWidth < mediaWidth) && ShowGlobe() &&  LanguagesObj.TranslatePage(true);
    window.onresize = (e) => { 
        (!isPhone() && window.innerWidth < mediaWidth && ShowGlobe() && HideSettings()) || 
        (window.innerWidth >= mediaWidth && ShowList() && ShowSettings())
    }

   
    $js(`#settingsBtn`).onEvent('mousedown', () => { 
        SETTINGS_ACTIVE ? 
            HideSettings() : 
            ShowSettings();
    })
    $js(`#scrollBtn`).onEvent('mousedown', () => {
        GLOBE_ACTIVE ? 
            ShowList() :
            ShowGlobe()
        setTimeout(() => {
            HideSettings();
            LanguagesObj.TranslatePage(GLOBE_ACTIVE);
        }, scrollSpeed * (6/10));
    })



    $js(`main`).onClick((e) => {
        if (!isPhone()) return;
        HideSettings();
    });
}
const About = () => {
    const toggleDuration = 700;
    const btnDuration = 400;
    const errorDuration = 700;
    const errorDelay = 5000;

    const $aboutWrap = $js(`#aboutWrap`);
    const $emailAddress = $aboutWrap.find(`#emailAddress`);
    const $emailName = $aboutWrap.find(`#emailName`);
    const $emailLetter = $aboutWrap.find(`#emailLetter`);
    const $errorState = $aboutWrap.find(`#aboutError`);
    const $sendEmail = $aboutWrap.find(`#sendEmail`);
    let oldValue = '';

    $aboutWrap.css({'transition': `.${toggleDuration}s all`})

    $js(`#aboutBtn`).onClick(() => {
        log('sdf')
        $aboutWrap.css({
            'transform': 'translateX(0%)',
            'opacity': '1'
        }) 
    })

    $js(`#aboutClose`).onClick(() => {
        $aboutWrap.animate({
            'transform': 'translateX(100%)'
        }, toggleDuration, () => {
            $aboutWrap.css({ 
                'opacity': '0'
            });
            $emailAddress.value('');
            $emailName.value('');
            $emailLetter.value('');
            $errorState.value('');
            setBtn(false)
        }) 
    })

    function showError(err) {
        if ($sendEmail.hasClass(`btn-active`))
                $sendEmail.removeClass(`btn-active`)


        $errorState.text(err);
        $errorState.animate({
            'opacity': '1'
        }, errorDuration, () => {
            setTimeout(() => {
                $errorState.animate({
                    'opacity': '0'
                }, errorDuration);
            }, errorDelay);
        });
    }
    function validateAddress() {
        const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
        return regexExp.test($emailAddress.value());
    }
    function setBtn(state) {
        if (state) { 
            if (!$sendEmail.hasClass(`btn-active`)) {
                $sendEmail.animate({
                    'opacity': '0'
                }, btnDuration, () => {
                    $sendEmail.text('Send a letter');
                    $sendEmail.addClass(`btn-active`);
                    $sendEmail.animate({
                        'opacity': '1'
                    }, btnDuration)
                })
            }
        }
        else {
            if ($sendEmail.hasClass(`btn-active`)) {
                $sendEmail.animate({
                    'opacity': '0'
                }, btnDuration, () => {
                    $sendEmail.text('Contact me');
                    $sendEmail.removeClass(`btn-active`)
                    $sendEmail.animate({
                        'opacity': '1'
                    }, btnDuration)
                })
            }
                
        }
    }



   $sendEmail.onClick((e, event) => {
        if (e.hasClass(`btn-active`)) {
            Email.send({
                SecureToken: "0e080ffd-8308-425e-8cf9-093fb6419f45",
                To : 'kaarst@ya.ru',
                From : "kaarst@ya.ru", // fixme 
                Subject: 'Riverwood: ' + $emailName.value(),
                Body : $emailLetter.value() + '\n\n From ' + $emailAddress.value()
            })
            e.text('Sent!')
            $emailAddress.value('');
            $emailName.value('');
            $emailLetter.value('');
            $errorState.value('');
            e.css({
                'color': 'var(--based-color)',
                'background': 'var(--accent-color)'
            })
            setTimeout(() => {
                setBtn(false);
                e.css({
                    'color': '#',
                    'background': '#'
                })
            }, 3000);
        }
        else {
            showError(`Why did you... click me...`)
        }
    })



   
    $emailAddress.onEvent('keyup', (e, event) => {
        if (validateAddress()) {
            if (event.key == 'Enter')
                $emailName.get().focus();
        }
        if (event.key == 'ArrowDown') {
            $emailName.get().focus();
        }
    })
    $emailName.onEvent('keyup', (e, event) => { 
        if (event.key == 'ArrowDown' || e.value() != '' && event.key == 'Enter')
            $emailLetter.get().focus(); 
        else if (event.key == 'ArrowUp') 
            $emailAddress.get().focus();
    })
    $emailLetter.onEvent('keydown', (e, event) => {
        oldValue = e.value();
        if (event.key == 'ArrowUp') {
            $emailName.get().focus();
        }
    })



    $emailAddress.onEvent('input', (e, event) => {
        if (validateAddress()) {
            if (event.key == 'Enter')
                $emailName.get().focus();
            if ($emailName.value() != '' && $emailLetter.value() != '')
                setBtn(true);
        }
        else 
            setBtn(false)
        if (event.key == 'ArrowDown') {
            $emailName.get().focus();
        }
    })
    $emailName.onEvent('input', (e) => {
        if ($emailAddress.value() == '') {
            e.value('');
            $emailAddress.get().focus()
            return showError('Your@email first');
        }
        if (!validateAddress()) {
            e.value('');
            $emailAddress.get().focus()
            return showError('Incorrect @mail address :c');
        }
        if (e.value() == '' || $emailLetter.value() == '') 
            return setBtn(false)
        setBtn(true)
    })
    $emailLetter.onEvent('input', (e) => {
        if ($emailAddress.value() == '') {
            e.value('');
            $emailAddress.get().focus()
            return showError('Your@email first');
        }
        if (!validateAddress()) {
            e.value('');
            $emailAddress.get().focus()
            return showError('Incorrect @mail address :c');
        }
        if ($emailName.value() == '') {
            e.value('');
            $emailName.get().focus()
            return showError('Please, introduse yourself');
        }
    
        setBtn(e.value() != '');
    })
    $emailLetter.onEvent('input', (e) => {
        let val = e.value();
        if (e.get().scrollHeight > e.rect().height) {
            e.value(oldValue);
            showError('Brevity is the sister of talent..')
            return;
        }
        if (e.get().scrollWidth > e.rect().width) {
            log('fd')
            if (!e.hasClass('align-left'))
                e.addClass(`align-left`)
        }
        if (val.length < 25)  {
            e.removeClass(`align-left`)
        }
    })


}
const Search = () => {
    const removeOthers =    false;
    let newSearch =         true;
    let currentIndex =      -1;
    let clock;

    const $listWrap =       $js(`.list-wrap`);
    const $areaList =       $js(`#areaList`);
    const $riverList =      $js(`#riverList`);
    const $input =          $js(`#searchInput`);
    const $controls =       $js(`.input-btn`);
    const $counter =        $controls.find(0);
    const $prevMark =       $controls.find(1);
    const $nextMark =       $controls.find(2);
    const $cleanInput =     $controls.find(3);



    let riversHTML = '';
    RIVERS.forEach(river => {
        riversHTML += `
            <li>
                <a href="${river.link}" target="_blank" rel="noopener noreferrer">
                    ${river.name}
                </a>
            </li>
        `
    });
    $riverList.ihtml(riversHTML);

    const $aList = $js(`#riverList a`);



    function ScrollToElem(index) {
        let length = $js(`.search-target`).size();
        if (length > 0) {
            let currentTarget = $js(`.search-target`).get(index % length);
            $listWrap.get().scrollTo({
                top: currentTarget.offsetTop - 6,
                behavior: "smooth",
                block: "start"
            });
            $counter.text(`${index > -1 ? index % length + 1 : length - Math.abs(index + 1) % length}/${length}`)
        }
    }
    function HideSearch() {
        $input.value('')

        $listWrap.scroll(0, 0);
        $riverList.fadeOut(200);
        $controls.fadeOut(200);

        clearTimeout(clock);
        clock = setTimeout(() => {
            $areaList.fadeIn(200, 'block');
        }, 250);

        newSearch = true;
    }





    $input.onEvent(`input`, () => {
        let val = $input.value();
        if (!val) return HideSearch();


        if (newSearch) {
            $areaList.fadeOut(200);

            clearTimeout(clock);
            $controls.fadeIn(200, 'flex');
            clock = setTimeout(() => {
                $riverList.fadeIn(200, 'block', () => {
                    currentIndex = -1;
                    ScrollToElem(++currentIndex); // $nextMark.trigger('click');
                });
            }, 250);
        }

        $counter.text(`0/0`);
        if (removeOthers) $riverList.find('li').css({'display': 'list-item'});


        let newHTML = ''
        $aList.every((e, i) => {
            let text =  e.innerText
            let indexOf = text.toUpperCase().indexOf(val.toUpperCase());

            newHTML += `<li ${removeOthers ? 'style="display:none">' : '>'}`; 
            if (indexOf > -1) {
                newHTML += `<a class="search-target" href="${RIVERS[i].link}" target="_blank" rel="noopener noreferrer">${text.slice(0, indexOf)}`
                    newHTML += `<mark>${text.slice(indexOf, indexOf + val.length)}</mark>`;
                    newHTML += `${text.slice(indexOf + val.length, text.length)}`;
                newHTML += '</a>'
            }
            else {
                
                newHTML += `<a href="${RIVERS[i].link}" target="_blank" rel="noopener noreferrer">${text}`
                newHTML += '</a>'
            }
            newHTML += '</li>'
        
        }); 
        $riverList.ihtml(newHTML)
        
        
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
}



document.addEventListener("DOMContentLoaded", () => { 
    var riversJSON = document.createElement('script');
    riversJSON.src = 'src/rivers.json';
    riversJSON.async = false;
    document.head.appendChild(riversJSON);


    riversJSON.onload = () => {
        for (let i = 0; i < AreaObj.COUNTRIES.length; i++) {
            let country = AreaObj.COUNTRIES[i];
            country.name = LanguagesObj.TranslateObj(country);
            let arr = [];
            for(let j = 0, l = RIVERS.length; j < l; j++) {
                if (RIVERS[j].location.indexOf(country.ru) > -1)
                    arr.push(RIVERS[j])
            }
            country.rivers = arr.sort((a, b) => { return a.name < b.name ? -1 : 1 });
        } 
        for (let i = 0; i < AreaObj.REGIONS.length; i++) {
            let reg = AreaObj.REGIONS[i]
            reg.name = LanguagesObj.TranslateObj(reg);
            let regArr = [];
            for(let j = 0, l = reg.obj.length; j < l; j++) {
                let country = reg.obj[j]
                country.name = LanguagesObj.TranslateObj(country); 
                for(let k = 0, L = RIVERS.length; k < L; k++) {
                    if (RIVERS[k].location.indexOf(country.ru) > -1)
                        regArr.push(RIVERS[k])
                }
            } 
            reg.rivers = removeDuplicates(regArr, 'name').sort((a,b) => a.name > b.name ? 1 : -1)
        } 
     
        log(RIVERS.length)


     
        
        Phone();  
        EarthReady();



        AsideObj.Recreate();
        About();
        Search();
    }
});  


