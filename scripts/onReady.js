function isPhone() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent))
}
function AreaPage(areaItem) {
    if (areaItem) {
        localStorage.setItem('areaItem', JSON.stringify(areaItem));
        window.location.href = 'Area/area.html';
    }
}
function RiverPage(riverItem) {
    if (riverItem) {
        localStorage.setItem('riverItem', JSON.stringify(riverItem));
        window.location.href = 'River/river.html';
    }
}


function toFloat(str) {
    return str.replace(/[^0-9,.]+/g, '')
}
function removeDuplicates(array, key) {
    let lookup = new Set();
    return array.filter(obj => !lookup.has(obj[key]) && lookup.add(obj[key]));
}




function toRiversShort() {
    let t = 'RIVERS = [';
        RIVERS.forEach(river => {
            let ru = river.name.replace('(река)', '').replace(/^\s+|\s+$/g, ''); 
            let location = river.location.replace('" ', '').replace(' "', '').replace(/^\s+|\s+$/g, '')
            delete river[`name`]
            delete river[`length`]
            delete river[`pool`]
            delete river[`consumption`]
            delete river[`link`]
            delete river[`head`]
            delete river[`estuary`]
            delete river[`info`]
            delete river[`image`]
            delete river[`location`]

            
            river.ru = ru;
            river.en = ru;
            river.fr = ru;
            river.sp = ru; 
            river.location = location 

            t += JSON.stringify(river, null, 2);
            t += ',\n';
        })
        log(t + "]")
}
function toRivers() {
    let t = 'RIVERS = [';
        RIVERS.forEach(river => {
            let ru = river.name.replace('(река)', '').replace(/^\s+|\s+$/g, '')
            let length = toFloat(river.length);
            let pool = toFloat(river.pool);
            let consumption = toFloat(river.consumption);

            let link = river.link.replace('https://ru.wikipedia.org/wiki/', '')
            let head =  river.head.replace('" ', '').replace(' "', '').replace(/^\s+|\s+$/g, '')
            let estuary = river.estuary.replace('" ', '').replace(' "', '').replace(/^\s+|\s+$/g, '')
            let image = river.image.replace('https://upload.wikimedia.org/wikipedia/commons/thumb/', '')
            let location = river.location.replace('" ', '').replace(' "', '').replace(/^\s+|\s+$/g, '')
            let info = river.info.replace('" ', '').replace(' "', '').replace(/^\s+|\s+$/g, '').replace(/\s*\([а-яА-Я]*[^а-яА-Я\)]+[^\n\)]*\)+/g, '')
            delete river[`name`]
            delete river[`length`]
            delete river[`pool`]
            delete river[`consumption`]
            delete river[`link`]
            delete river[`head`]
            delete river[`estuary`]
            delete river[`info`]
            delete river[`image`]
            delete river[`location`]

            
            river.ru = ru;
            river.en = ru;
            river.fr = ru;
            river.sp = ru;
            river.ruLink = link
            river.enLink = link
            river.frLink = link
            river.spLink = link
           
 

            river.length = length
            river.pool = pool
            river.consumption = consumption
 
            river.location = location


            river.ruHead = head
            river.enHead = head
            river.frHead = head
            river.spHead = head

            river.ruEstuary = estuary
            river.enEstuary = estuary
            river.frEstuary = estuary
            river.spEstuary = estuary
  
            river.image = image;
            river.ruInfo = info;
            river.enInfo = info;
            river.frInfo = info;
            river.spInfo = info;

            t += JSON.stringify(river, null, 2);
            t += ',\n';
        })
        log(t + "]")
}




function LoadScript(src, async) {
    var script = document.createElement('script');
    script.src = src;
    script.async = async;
    document.head.appendChild(script);
    return script;
}

class AsideObj { 
    static $list;

    static CreateListElem(text, length) {
        return `
            <li>
                <h6>
                    <span class="list-title">${text}</span>
                    <span class="arealist-amount non-select">
                        [${length}]
                    </span>
                    <svg class="arealist-href-icon non-select" viewBox="0 0 18 18" style="align-self: center; height: 24px; color: var(--list-linkColor)" fill="currentColor">
                        <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/> 
                        <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                    </svg>
                </h6>
            </li>
        `;
    }
    static CreateRiversList(riversArr) {
        let div = `<div>`;
        riversArr.forEach(el => {
            div += `
                <a class="non-select" target="_blank" rel="noopener noreferrer">
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
        let index = $js(`#areaList li`).index(parent)

        $listWrap.get().scrollTo({
            top: parent.get().offsetTop,
            behavior: "smooth",
            block: "start"
        });

        parent.get().innerHTML += AsideObj.CreateRiversList(
            AreaObj.currentList[index].rivers
        )
        parent.find('.list-title').onClick(AsideObj.ClickEvent) 
        parent.find(`.arealist-href-icon`).onClick((e) => {
            AreaPage(AreaObj.currentList[index]);
        })
        parent.addClass('sidebar-active-item');


        parent.find(`a`).onClick((el) => {
            RiverPage(AreaObj.currentList[index].rivers[el.index()])
        })
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
    let RiversLight = LoadScript(`src/RiversLight.js`, false); 


    RiversLight.onload = () => {
        for (let i = 0; i < AreaObj.COUNTRIES.length; i++) {
            let country = AreaObj.COUNTRIES[i];
            country.name = LanguagesObj.TranslateObj(country);
            let arr = [];
            for(let j = 0, l = RIVERS.length; j < l; j++) {
                RIVERS[j].name = LanguagesObj.TranslateObj(RIVERS[j]);
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




        let RiversFull = LoadScript(`src/Rivers.js`, true);
        RiversFull.onload = () => {
            log('loaded')
            for (let i = 0; i < AreaObj.COUNTRIES.length; i++) {
                let country = AreaObj.COUNTRIES[i];
                country.name = LanguagesObj.TranslateObj(country);
                let arr = [];
                for(let j = 0, l = RIVERS.length; j < l; j++) {
                    RIVERS[j].name = LanguagesObj.TranslateObj(RIVERS[j]);
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
        }
    }

    
});  




function toRivers123() {
    RIVERS123 = [{
        "name": "Абава",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B1%D0%B0%D0%B2%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Abava_River%283%29.jpg/250px-Abava_River%283%29.jpg",
        "length": "129 км",
        "pool": "2042 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Вента",
        "location": " Латвия",
        "info": "А́бава — река в Латвии, правый приток реки Вента. Река берёт начало в болоте Лестенес-Энавас пурвс, расположенном на восточном склоне Восточно-Курземской возвышенности. Высота истока — 54 м над уровнем моря.[источник не указан 1407 дней] Длина реки — 129 км. Площадь водосборного бассейна — 2042 км².[источник не указан 1407 дней]Амула, Дуньупите, Имула, Иванде, Валгале, Ведзеле, Виесате, Олупите, Озолупите, Земите, Жиду-Страутс.Бебрупе, Дзелзамурупе, Дзирупе, Кароне, Кроя, Лашупе, Лигупе, Меллупите, Пуре, Семе, Вецупе, Вегупите, Вирбупе.Долина Абавы образовалась в ледниковый период. Склоны обширной долины сплошь изрыты глубокими оврагами, ручьями и речушками."
     },
     {
        "name": "Абакан (река)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B1%D0%B0%D0%BA%D0%B0%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/%D0%90%D0%B1%D0%B0%D0%BA%D0%B0%D0%BD-.jpg/250px-%D0%90%D0%B1%D0%B0%D0%BA%D0%B0%D0%BD-.jpg",
        "length": "514 км",
        "pool": "32 000 км²",
        "consumption": "378 м³/с",
        "head": " ",
        "estuary": "Красноярское водохранилище",
        "location": " Россия",
        "info": "Абака́н (в верховье Большой Абакан[2][3], у истока Тюргенсу[2][3]; хак. Ағбан) — река в Хакасии, один из крупнейших левобережных притоков Енисея. Длина реки — 514 км, площадь водосборного бассейна — 32 000 км²[2][3]. Средний расход воды — 378 м³/с.[4]Верхний участок бассейна охраняется в составе Хакасского заповедника.Река Абакан изучалась ещё в середине XIX века. Было установлено, что начало она берёт в Абаканских горах Западного Саяна, где её истоки обнаружил в 1842 году Пётр Чихачёв[5]. Длина реки оценивалась в 496 вёрст. Отмечалось, что низовья реки сравнительно густо заселены, ведётся золотодобыча. Крупнейшим русским селением на Абакане являлось село Усть-Абаканское Минусинского округа, 2000 жителей, на берегах в то время жили кочующие татары, финны и другие абаканские инородцы. У реки находили Чудские памятники и могилы.[6]Есть два широко известных толкования происхождения названия[7]:В пойме Абакана расположена территория пяти (из восьми существующих в республике) административных районов: Аскизского, Алтайского, Бейского, Таштыпского, Усть-Абаканского.Берёт начало под названием Тюргенсу на северном склоне Абаканского хребта[8] у горы Тудой[9]. Впадает в Красноярское водохранилище у подножья горы Самохвал."
     },
     {
        "name": "Абакашис",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B1%D0%B0%D0%BA%D0%B0%D1%88%D0%B8%D1%81",
        "image": "undefined",
        "length": "610 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Мадейра",
        "location": " Бразилия",
        "info": "Абакаши́с[1] (порт. Rio Abacaxis)[2] — река в Южной Америке[3]. Правый приток нижнего рукава реки Мадейра[2].Находится в Бразилии. Река берёт начало в юго-восточной части штата Амазонас. Длина реки составляет около 610 км. Течёт с запада на восток. Имеет ряд крупных притоков. Впадает в реку Мадейра, приток Амазонки, является одним из крупнейших её притоков.[4]Период высокой воды длится с октября по апрель-май.[источник не указан 313 дней]"
     },
     {
        "name": "Абан ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B1%D0%B0%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Aban_River.jpg/250px-Aban_River.jpg",
        "length": "151 км",
        "pool": "1970 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Усолка",
        "location": " Россия",
        "info": "А́бан — река в Красноярском крае России. Правый приток реки Усолки (бассейн Ангары).Длина реки — 151 км. Площадь бассейна — 1970 км².На реке расположены населённые пункты: Сенное, Петропавловка, Абан, Воробьёвка, Никольск, Суздалево, Самойловка.(км от устья)"
     },
         {
        "name": "Абаэте ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B1%D0%B0%D1%8D%D1%82%D0%B5_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Abaet%C3%A9_River.PNG/250px-Abaet%C3%A9_River.PNG",
        "length": "270 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Сан-Франсиску",
        "location": " Бразилия",
        "info": "Абаэте (порт. Rio Abaeté) — река в штате Минас-Жерайс на юго-востоке Бразилии. Река берёт своё начало в западной части муниципалитета Сан-Готарду, затем течёт на север и впадает в реку Сан-Франсиску. Район устья реки Абаэте является важным местом нереста рыб.Длина реки Абаэте составляет 270 километров, её ширина варьируется от 61 метра до 150 метров. Это высокогорная река с каменным дном и большим количеством водопадов, содержащая глинистые отложения. Она протекает по территории девяти муниципалитетов штата Минас-Жерайс:Алмазы впервые были обнаружены в реке в период 1780—1785 годов. Некоторые из крупнейших алмазов, найденных в Бразилии, были найдены именно здесь, хотя чаще встречаются камни среднего и низкого качества. В 1791 году группа золотодобытчиков нашла в реке алмаз, известный как «бриллиант Абаэте».Помимо гранатов, золота, иридия, яшмы, осмия и платины, в речном гравии содержится ещё 30 минералов. Платина без примесей палладия, обнаруженная в реке Абаэте, обладает сильными магнитными свойствами и богата железом."
     },
           {
        "name": "Абитиби ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B1%D0%B8%D1%82%D0%B8%D0%B1%D0%B8_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Abitibi_River.JPG/250px-Abitibi_River.JPG",
        "length": "547 км",
        "pool": "29 500 км²",
        "consumption": "undefined",
        "head": "Абитиби",
        "estuary": "Мус",
        "location": " Канада",
        "info": "Абити́би (англ. Abitibi River, фр. Rivière Abitibi) — река на северо-востоке канадской провинции Онтарио.Протекает на северо-запад из озера Абитиби, впадая в реку Мус, которая, в свою очередь, впадает в залив Джеймс. Длина — 547 км, перепад высот — 265 метров. Площадь водосборного бассейна — 29500 км².Название (букв. — «Вода на полпути»: abitah — середина, nipi — вода) заимствовано французскими поселенцами из америндских языков и изначально относилось к племени индейцев-алгонкинов, живущему рядом с одноимённым озером между факториями на Гудзоновом заливе и на реке Оттава.В прошлом была важным торговым путём для вывоза пушнины Компанией Гудзонова залива, играла роль в деревообрабатывающей промышленности, сосредоточенной в городке Ирокуой-Фолз.На реке расположена построенная в 1930-х годах гидроэлектростанция Abitibi Canyon Generating Station. В регионе развит туризм и золотодобыча.Геодезические работы для строительства гидроэлектростанции в данном районе послужили сюжетом для песни Уэйда Хемсворта The Blackfly Song, одного из наиболее известных образцов канадской фолк-музыки."
     },
         {
        "name": "Абрамовка ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B1%D1%80%D0%B0%D0%BC%D0%BE%D0%B2%D0%BA%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "102 км",
        "pool": "1610 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Илистая",
        "location": " Россия",
        "info": "Абра́мовка (до 1972 года — Чихеза) — река в Приморском крае России. Берёт начало в 1 км к северо-западу от села Прилуки у подножий холмистой гряды, служащей водоразделом с рекой Мельгуновка, течёт в юго-восточном направлении, впадает в реку Илистая слева на 95 км от её устья.Длина — 102 км, площадь бассейна — 1610 км², общее падение реки 75,4 м. Ширина реки средняя — 10 м, наибольшая — до 42 м. Глубины реки изменяются от 0,8 до 4 м.Основные притоки: Козловка (л. б., 88-й км), Охотенка (п. б., 71-й км), Липовцы (п. б., 64-й км), Осиновка (п.б., 13-й км).Населённые пункты на реке: Приозёрное, Новожатково, Абрамовка, Павловка, Перелётный."
     },
      {
        "name": "Абукума",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B1%D1%83%D0%BA%D1%83%D0%BC%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Abukuma_River%2C_Fukushima_City%2C_Japan.JPG/250px-Abukuma_River%2C_Fukushima_City%2C_Japan.JPG",
        "length": "239 км",
        "pool": "5400 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Сендай",
        "location": " Япония",
        "info": "Абу́кума (яп. 阿武隈川) — река в Японии, протекает по префектурам Мияги и Фукусима. Длина реки — 239 км. Площадь водосборного бассейна — 5400 км².Исток реки расположен на склоне горы Асахи (яп. 旭岳, высотой 1835 м). Абукума течёт на север через центральную часть префектуры Фукусима — Накадори (中通り),- по пути в неё впадают реки Отакине (大滝根川), Аракава (荒川), Суриками (摺上川). Река протекает через ущелье Абукума и попадает в префектуру Мияги. После объединения с рекой Сироиси (白石川) она впадает в Тихий океан.Около 79 % бассейна реки занимает природная растительность, около 18 % — сельскохозяйственные земли, около 3 % застроено.На реке расположены города Какуда, Иванума, Сиракава, Сукагава, Корияма, Нихоммацу и Фукусима."
     },
     {
        "name": "Абуна ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B1%D1%83%D0%BD%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Bolivia_north.jpg/250px-Bolivia_north.jpg",
        "length": "375 км",
        "pool": "25 870 км²",
        "consumption": "undefined",
        "head": "слияние рек: Шипаману и Караману",
        "estuary": "Мадейра",
        "location": "undefined",
        "info": "Абуна́ (на тер. Боливии; исп. Río Abuná), также Абуна́н (на тер. Бразилии; порт. Rio Abunã) — река на севере Боливии и западе Бразилии. Длина — 375[источник не указан 3039 дней] км. Площадь бассейна — 25870[источник не указан 3039 дней] км². Левый приток реки Мадейру.Берёт начало от слияния рек Шипаману и Караману."
     },
     {
        "name": "Абырабыт (приток Яны)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B1%D1%8B%D1%80%D0%B0%D0%B1%D1%8B%D1%82_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%AF%D0%BD%D1%8B)",
        "image": "undefined",
        "length": "120 км",
        "pool": "2570 км²",
        "consumption": "undefined",
        "head": "слияние рек: Семейка и Бадяй",
        "estuary": "Яна",
        "location": " Россия",
        "info": "Абырабыт (Абыраабыт) — река в Якутии, правый приток Яны.Образуется слиянием рек Семейка и Бадяй на высоте 220 м над уровнем моря. Течёт на северо-запад по территории Верхоянского района. Устье реки Абырабыт находится в 435 км по правому берегу реки Яны. Длина реки составляет 120 км (от истока р. Семейки — 153 км). Площадь водосборного бассейна — 2570 км². Питание снеговое и дождевое. Лёд на реке становится в октябре, а вскрывается во второй декаде мая. Крупнейший приток — Сасыл-Юрях.По данным государственного водного реестра России и геоинформационной системы водохозяйственного районирования территории РФ, подготовленной Федеральным агентством водных ресурсов:"
     },
     {
        "name": "Аварское Койсу",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B2%D0%B0%D1%80%D1%81%D0%BA%D0%BE%D0%B5_%D0%9A%D0%BE%D0%B9%D1%81%D1%83",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/%D0%9C%D0%B5%D1%81%D1%82%D0%BE_%D1%81%D0%BB%D0%B8%D1%8F%D0%BD%D0%B8%D1%8F_%D1%80%D0%B5%D0%BA_%D0%90%D0%B2%D0%B0%D1%80%D1%81%D0%BA%D0%BE%D0%B5_%D0%9A%D0%BE%D0%B9%D1%81%D1%83_%D0%B8_%D0%90%D0%BD%D0%B4%D0%B8%D0%B9%D1%81%D0%BA%D0%BE%D0%B5_%D0%9A%D0%BE%D0%B9%D1%81%D1%83.jpg/250px-%D0%9C%D0%B5%D1%81%D1%82%D0%BE_%D1%81%D0%BB%D0%B8%D1%8F%D0%BD%D0%B8%D1%8F_%D1%80%D0%B5%D0%BA_%D0%90%D0%B2%D0%B0%D1%80%D1%81%D0%BA%D0%BE%D0%B5_%D0%9A%D0%BE%D0%B9%D1%81%D1%83_%D0%B8_%D0%90%D0%BD%D0%B4%D0%B8%D0%B9%D1%81%D0%BA%D0%BE%D0%B5_%D0%9A%D0%BE%D0%B9%D1%81%D1%83.jpg",
        "length": "178 км",
        "pool": "7660 км²",
        "consumption": "95 м³/с (село Майданское)",
        "head": " ",
        "estuary": "Сулак",
        "location": " Россия",
        "info": "Аварское Койсу (в верховьях — Джурмут) — река в Дагестане, правая составляющая Сулака. Длина реки — 178 км.Название «койсу» получило от тюркского (кумыкского) «къой сув» — овечья вода. П. П. Семенов-Тян-Шанский считал, что это название получали реки, которые могли вброд преодолевать бараны. Аварское означает расположение реки на территории проживания аварцев. До середины XX века название «Къойсу» носила река Сулак.Берёт начало на склоне г. Гутон (Главный Кавказский хребет), течёт, огибая хр. Нукатль, в узкой долине, часто каньоне. Протекая преимущественно в северо-восточном направлении, она сливается с рекой Андийское Койсу в 6 километрах восточнее с. Чиркота, образует реку Сулак.Длина реки 178 км, общее падение 2440 м, площадь водосбора 7660 км², средняя его высота 2160 м. Площадь оледенения в бассейне реки составляет 6,8 км². Высота истока — 2740 м над уровнем моря. Уклон реки — 13,7 м/км.Водосбор реки на северо-западе ограничен Богосским хребтом, на юго-западе Главным Кавказским хребтом, на юге массивом Дюльты-Даг и хребтом Сарфун-Ял. Значительная часть площади лежит выше 1500 м над уровнем моря, в том числе 10 % выше 3000 м.Река Аварское Койсу характеризуется весенне-летним половодьем и низкой зимней меженью. Распределение стока внутри года происходит не равномерно. Наиболее многоводной река бывает в период с мая по август, в течение которого проходит до 65 % годового объёма стока."
     },
     {
        "name": "Авача",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B2%D0%B0%D1%87%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Avacha_river.jpg/250px-Avacha_river.jpg",
        "length": "122 км",
        "pool": "5090 км²",
        "consumption": "138 м³/с",
        "head": " ",
        "estuary": "Авачинская бухта",
        "location": " Россия",
        "info": "Ава́ча — река в юго-восточной части полуострова Камчатка. Протяжённость 122 км, площадь бассейна 5090 км². По площади бассейна Авача занимает 18-е место среди рек Камчатского края и 140-е — в России.На реке Аваче находится город Елизово — административный центр Елизовского района Камчатского края.На берегах расположены вулканы Бакенинг, Авачинская сопка и Костакан.Первое картографическое изображение реки создано Иваном Козыревским в 1715 г.Название предположительно от ительм. эвыч — «чавыча», которое в свою очередь возможно заимствовано из корякского языка. По другой версии название реки происходит от ительм. «суаачу» (название одного из племен) или «кшуабач» («Залив-Отец», «Отец заливов»). Ранее на картах отмечалась как Сувачу, Савача, Овача, Вовача и др.Вытекает из Верхне-Авачинского озера, протекает сперва по узкой горной долине, затем по низменности; образуя небольшую дельту, впадает в Авачинскую губу — бухту Тихого океана, на берегу которой расположен город Петропавловск-Камчатский.Питание снеговое, дождевое, грунтовое и ледниковое. Замерзает в конце декабря (в устье — в ноябре), вскрывается в марте. Среднегодовой расход воды у города Елизово — 138 м³/с. Зимой характерны зажоры и заторы."
     },
     {
        "name": "Аваш ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B2%D0%B0%D1%88_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Awash_river.jpg/250px-Awash_river.jpg",
        "length": "1200 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "слияние рек: Коре и Керенса",
        "estuary": "Аббе",
        "location": " Эфиопия",
        "info": "Ава́ш (устаревшее Гаваш; амх. አዋሽ) — река в Эфиопии, в северной части Восточно-Африканской рифтовой долины. Плодородные почвы долины реки используются для выращивания хлопка и сахарного тростника. Крупные города, расположенные на реке: Гэлемсо, Гоуане, Тэндахо и Асайита.В верховьях реки расположен национальный парк Аваш, в котором водятся антилопы и газели.Аваш является основной рекой бессточной области, расположенной на территории регионов Оромия и Афар. Исток реки расположен к западу от города Аддис-Абеба, основные притоки — Кэсэм, Кабенна и Леди. В период высокой воды река поднимается на 15—20 метров.Берёт начало у поселения Гынчи от слияния рек Коре и Керенса.Река впадает в озеро Аббе у границы с Джибути, на расстоянии около 100 км от западной конечности Аденского залива — залива Таджура. В засушливые годы река распадается на цепь солёных озёр во впадине Данакиль, не доходя до Аббе.Аваш обладает гидроэнергетическим потенциалом — крупнейшая плотина была построена в 1960 году на расстоянии около 75 км от Аддис-Абебы, в результате чего на реке образовалось водохранилище Кока.Человек жил в долине реки Аваш со времён возникновения рода Homo. Также здесь были найдены многочисленные останки дочеловеческих гоминид (австралопитеки). Палеонтологические находки имеют возраст около 3—4 млн лет и являются свидетельствами эволюции человека. В 1974 году были обнаружены 52 фрагмента скелета знаменитой Люси. На левом притоке Аваша реке Када Гона в местонахождении Када Гона найдены галечные орудия (чопперы) возрастом 2,55—2,58 млн л. н., которые более архаичны, чем классические орудия олдувайской культуры, но более прогрессивны, чем орудия из слоя Бокол Дора 1 в Леди-Герару."
     },
          {
        "name": "Авекова ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B2%D0%B5%D0%BA%D0%BE%D0%B2%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "205 км",
        "pool": "3040 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Охотское море",
        "location": " Россия",
        "info": "Авекова (корякск. Авʼъек, Авʼъеквʼаям) — река в России, протекает по Северо-Эвенскому району Магаданской области. Протяжённость реки 205 км (по другим данным — 204 км). Площадь водосбора 3040 км².Начинается на северном склоне Тайнынотского хребта северо-западнее вершины 1072 у границы Магаданской и Камчатской областей. В верховьях течёт по гористой местности с юга на север, затем выходит в холмистую местность и приобретает западное направление течения. От места слияния с правым притоком Стремительным река поворачивает на запад и течет по болотистой тундре. Русло реки на этом участке очень извилистое. Между устьями Стремительного и Ягодного ширина русла реки — 23 метра, глубина — 0,3 метра, скорость течения воды — 1 м/с. Далее река расширяется (ниже устья Озёрного имеет ширину 58 м) и входит в достаточно узкую межгорную долину. На этом участке река петляет. Выше устья Гранитного её ширина достигает 80 м. На левом берегу, у устья Пилгына, стоят нежилые избы. В низовьях протекает по болотистой, обильной озёрами, равнине. Впадает в Гижигинскую губу Охотского моря. Устье реки образует мелководную лагуну. Около устья, на левом берегу лагуны, расположена нежилая деревня Авекова."
     },
      {
        "name": "Аверон ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B2%D0%B5%D1%80%D0%BE%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Pont_saint_blaise_najac.jpg/250px-Pont_saint_blaise_najac.jpg",
        "length": "290,9 км",
        "pool": "5170 км²",
        "consumption": "56,5 м³/с (Муниципалитет Пикекос)",
        "head": " ",
        "estuary": "Тарн",
        "location": " Франция",
        "info": "Аверо́н (фр. Aveyron) — река на юге Франции.Длина реки составляет 290,9 км, площадь водосборного бассейна — около 5170 км². Средний расход воды — 56,5 м³/с.[источник не указан 2096 дней] Высота устья — 71 м над уровнем моря.[источник не указан 2096 дней] Высота истока — 735 м над уровнем моря.[источник не указан 2096 дней] Исток находится в Центральном массиве Франции. Протекает через город Родез и впадает в реку Тарн у города Монтобан. Направление течения реки — с востока на запад.Французский департамент Аверон назван в честь реки Аверон."
     },
                  {
        "name": "Автаткууль",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B2%D1%82%D0%B0%D1%82%D0%BA%D1%83%D1%83%D0%BB%D1%8C",
        "image": "undefined",
        "length": "197 км",
        "pool": "1290 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Анадырский лиман",
        "location": " Россия",
        "info": "Автаткуу́ль (Автоткуль) — река на Дальнем Востоке России, в пределах Анадырского района Чукотского автономного округа. Протекает в восточной части Нижнеанадырской низменности, впадает в Анадырский лиман Берингова моря.Название в переводе с чук. автат-ык — «перегонная река».Вблизи реки обнаружено крупное Верхне-Эчинское нефтяное месторождение.Автаткууль является равнинной, медленно текущей рекой, её общая длина составляет 197 км. Площадь водосборного бассейна — 1290 км². В долине реки находится множество старично-термокарстовых озёр глубиной до 1,5-2,0 м. Здесь характерны высокие (до 30 м) песчаные обрывы. В нижнем течении реки дважды в сутки происходит противотечение, вызванное приливными процессами Берингова моря, вследствие чего происходит интенсивный перенос твёрдых веществ, из-за чего вода обладает повышенной мутностью. В дельте реки вязкий заиленный берег полого уходит в залив, опускаясь на 1 м за 3-4 км, при этом полоса ила и грязи во время отлива обнажается на 50-100 м. Эта местность получила название Гнилой угол.Река замерзает в октябре и остаётся под ледяным покровом до июня. Питание имеет в основном снеговое, поэтому максимальный сток приходится на период половодья в конце июня."
     },
      {
        "name": "Авъенваям",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B2%D1%8A%D0%B5%D0%BD%D0%B2%D0%B0%D1%8F%D0%BC",
        "image": "undefined",
        "length": "155 км",
        "pool": "1330 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Залив Корфа",
        "location": " Россия",
        "info": "Авъенваям (Тиличики) (Авьяваям, Авъе́вая́м, Авьеваям, Авья; устар. Теличинская; Авья-Ваям; корякск. Ав’ъев’аям) — река на северо-востоке полуострова Камчатка. Протекает по территории Олюторского района Камчатского края. Впадает в бухту Скрытую.Длина реки — 155 км. Площадь водосборного бассейна — 1330 км². Высота истока — 500 м.Название в переводе с корякск. Ав’ъев’аям — «пастбищная река», происходит от корякск. ав’ъны «пастбище, кормовоще» + корякск. в’аям «река». С. П. Крашенинников в 1740 году упоминал её как речку Теличинскую, вблизи которой располагался корякский острожек Теллечи (название происходит от «тэллычан» — «дверь жилища»).Река расположена на пути между Тиличиками и Корфом с одной стороны и Хаилино — с другой. Моста не существует. В летнее время река пересекается вброд или на водоплавающей технике, в зимнее — по льду, что иногда приводит к человеческим жертвам и потерям техники.В реке постоянно обитают хариусы и гольцы, нерестятся другие виды лососевых (чавыча, нерка, кижуч, горбуша). Популярна, как место спортивной и любительской рыбалки. Вблизи реки обнаружены два источника вод, условно отнесённых к минеральным."
     },
       {
        "name": "Ага (приток Онона)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B3%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9E%D0%BD%D0%BE%D0%BD%D0%B0)",
        "image": "undefined",
        "length": "167 км",
        "pool": "8000 км²",
        "consumption": "undefined",
        "head": "слияние рек: Урда-Ага и Хойто-Ага",
        "estuary": "Онон",
        "location": "Россия",
        "info": "Ага — река в Забайкальском крае России, левый приток Онона. Длина реки — 167 км, площадь водосборного бассейна — 8000 км².За исток принято считать место слияния рек Урда-Ага и Хойто-Ага. Высота истока — 695 м над уровнем моря.[источник не указан 369 дней] Протекает по городскому округу посёлок Агинское, Агинскому, Могойтуйскому и Шилкинскому районам.Гидрологический режим реки относится к дальневосточному типу с резким преобладанием дождевого стока. Ширина реки — 10—30 м, притоков — 5—10 м. Преобладающее питание — дождевое. Исследованиями выявлены две фазы водности реки — полноводная и маловодная, каждая из которых длится в среднем от девяти до пятнадцати лет. Маловодная фаза длилась с 1995 года. В мае 2010 года произошло наводнение.Наиболее крупные притоки — Усть-Аргалей, Цаган-Челутай, Хара-Шибирь, Хила. На берегах и долине реки находятся (от истока к устью):Булактуй, Амитхаша, Агинское, Хусатуй, Ага-Хангил, Уронай, Остречная, Ара-Булак, Улан-Сарта, Цаган-Ола, Нарин, Усть-Нарин, Усть-Ножовая. Напротив устья реки, на правом берегу Онона — Усть-Ага.По одной из версий название происходит от эвенк. аги — «равнина открытая, а местами таёжная»."
     },
       {
        "name": "Аган",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B3%D0%B0%D0%BD",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/%D0%92%D0%B0%D1%80%D1%8C%D1%91%D0%B3%D0%B0%D0%BD.jpg/250px-%D0%92%D0%B0%D1%80%D1%8C%D1%91%D0%B3%D0%B0%D0%BD.jpg",
        "length": "544 км",
        "pool": "32 200 км²",
        "consumption": "274,65 м³/с (87 км от устья)",
        "head": "Менсавэмтор",
        "estuary": "Тромъёган",
        "location": " Россия",
        "info": "Ага́н — река в Ханты-Мансийском автономном округе России, левый приток Тромъёгана, близ его впадения в Обь. Протекает по территории Нижневартовского и Сургутского районов. Длина реки — 544 км, площадь водосборного бассейна — 32 200 км². Является крупнейшим по длине и площади бассейна притоком Тромъёгана.Впервые нанесена на карту под современным названием в XIX веке. Гидроним произошёл от хантыйского ёхан — «река».Согласно верованиям местных ненцев и хантов, название связано с богиней Агана — великой женщиной, покровительницы обитателей реки.Истоки Агана расположены на возвышенном болотистом водоразделе бассейна реки Пур и правых притоков Оби, в озере Менсавэмтор на высоте 78 м над уровнем моря. Протекает в центральной части Западно-Сибирской равнины. В среднем и нижнем течении река образует широкую (до 4,5 км, в приустьевом участке до 8 км) сегментно-гривистую двухстороннюю пойму с многочисленными изогнутыми старичными озёрами, протоками, берега которых поросли хвойными деревьями и березняком. Правобережная часть бассейна вдвое больше левобережной. Высота устья — 33 м над уровнем моря.Преимущественно снеговое и дождевое питание. Среднегодовой расход в районе посёлка Аган (87 км от устья) — 274,65 м³/с. Ледостав — с конца ноября по май. Половодье с мая по июль, с резким подъёмом уровней и затяжным спадом. Осенью как правило дождевые паводки. Объём стока — 8,679 км³/год, половина которого приходится на половодье."
     },
     {
        "name": "Агано ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B3%D0%B0%D0%BD%D0%BE_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Agano_River.jpg/250px-Agano_River.jpg",
        "length": "210 км",
        "pool": "7710 км²",
        "consumption": "451 м³/с",
        "head": " ",
        "estuary": "Японское море",
        "location": " Япония",
        "info": "Ага́но (яп. 阿賀野川 и яп. 阿賀川) — река в районе Хокурику острова Хонсю, Япония.Протекает по территории префектур Фукусима и Ниигата. Длина реки составляет 210 км, на территории её бассейна (7710 км²) проживает около 560 тыс. человек. Согласно японской классификации, Агано является рекой первого класса. Средний расход воды — 451 м³/с.[нет в источнике]Сначала течёт на север, затем принимает приток Ниппаси (яп. 日橋川), текущий из озера Инавасиро, а потом поворачивает на запад и впадает в Японское море. В 1964 году в реку попала ртуть."
     },
     {
        "name": "Агапа ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B3%D0%B0%D0%BF%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "396 км",
        "pool": "26 000 км²",
        "consumption": "310 м³/с",
        "head": "слияние рек: Верхняя Агапа и Нижняя Агапа",
        "estuary": "Пясина",
        "location": " Россия",
        "info": "Ага́па — река в Красноярском крае России, левый приток Пясины. Длина реки — 396 км, площадь бассейна примерно равна 26 тыс. км². Протекает по территории Таймырского Долгано-Ненецкого района.Река образуется в результате слияния рек Верхняя Агапа и Нижняя Агапа, течёт по Северо-Сибирской низменности. В бассейне Агапы более 13 тысяч озёр общей площадью 1445,7 км². Среднегодовой расход воды — в нижнем течении — 310 м³/с.180 км реки относятся к заказнику краевого значения «Агапа». Границы заказника обозначены по длине устьем реки Огортыяха и устьем Агапы, и берегами реки на этом протяжении по 2,5 км на каждую сторону от русла — по ширине.Заказник был образован с целью сохранения единого ландшафтного комплекса как среду обитания объектов животного мира, палеонтологических и минералогических объектов.Объектами охраны являются редкие и находящиеся под угрозой исчезновения виды диких животных, занесенные в Красную книгу Российской Федерации и Красную книгу Красноярского края, и их покровители: хрустан, песочник-красношейка, дупель, песчанка, белоклювая гагара, краснозобая казарка и её покровители зимняк и восточная клуша, малый лебедь, степной лунь, орлан-белохвост, сапсан, чернозобая гагара, западный тундровый гуменник, дербник, галстучник, гаршнеп, средний кроншнеп, белая сова."
     },
      {
        "name": "Агаякан ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B3%D0%B0%D1%8F%D0%BA%D0%B0%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "160 км",
        "pool": "7630 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Кюенте",
        "location": " Россия",
        "info": "Агаякан — река в России, протекает по территории Оймяконского района Якутии. Длина реки — 160 км, площадь водосборного бассейна — 7630 км². При слиянии с рекой Сунтар образует реку Кюенте (приток Индигирки).Река протекает в малонаселённой местности, в районе устья на реке расположено одноимённое село — Агаякан.По данным государственного водного реестра России относится к Ленскому бассейновому округу, речной бассейн реки — Индигирка, водохозяйственный участок реки — Индигирка от истока до впадения реки Неры.Код объекта в государственном водном реестре — 18050000112117700039064."
     },
      {
        "name": "Агеда ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B3%D0%B5%D0%B4%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Puente_antiguo_sobre_el_r%C3%ADo_%C3%81gueda_%28Ciudad_Rodrigo%29.jpg/250px-Puente_antiguo_sobre_el_r%C3%ADo_%C3%81gueda_%28Ciudad_Rodrigo%29.jpg",
        "length": "130 км",
        "pool": "2409 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Дуэро",
        "location": " Испания Португалия",
        "info": "А́геда (порт. Rio Águeda) — река в Испании и Португалии. Приток реки Дуэро. Длина — 130 км.[источник не указан 2102 дня] Площадь бассейна около 2409 км².Берёт начало на территории Испании, большая часть течения является естественной границей между Испанией и Португалией.Агеда — место обитания жемчужницы, барбуса и голавля."
     },
        {
        "name": "Агитка",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B3%D0%B8%D1%82%D0%BA%D0%B0",
        "image": "undefined",
        "length": "183 км",
        "pool": "3590 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Вагай",
        "location": " Россия",
        "info": "Агитка — река в Тюменской области России, правый приток Вагая (бассейн Иртыша), протекает на юге Западно-Сибирской равнины. Длина реки 183 км, площадь бассейна 3590 км².Агитка начинается в нескольких километрах на юго-запад от села Вершинская Вагайского района Тюменской области. Течёт по заболоченной равнинной местности сначала на северо-восток, потом на север и северо-запад; недалеко от объединения с рекой Вагай поворачивает на восток. Агитка впадает в Вагай на 70 км от его устья, возле села Копотилы, расположенного немного выше по течению реки Вагай.В бассейне Агитки много болот и мелких озёр, которые играют важную роль в регулировании её стока.Среднегодовой сток 7,33 м³/с. Измерения стока проводилось на протяжении 34 лет (с 1957 по 1990) в селе Митькинское в 27 км от устья на высоте 38,4 м. Многогодовой минимум стока наблюдается в бассейне (0,97 м³/с), максимум — в мае (33,84 м³/с). За период наблюдений абсолютный минимум месячного стока (0,40 м³/с) наблюдался в марте 1989, абсолютный максимум (130 м³/с) — в мае 1987 года.Агитка замерзает в начале ноября, а лёд сходит в мае. Питание реки смешанное, в основном снегом. Минимум стока в летний период, когда речка свободна от льда, наблюдалось в августе и сентябре 1989 года — 0,62 м³/с."
     },
        {
        "name": "Агно ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B3%D0%BD%D0%BE_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Agno%2CPampanga%2CPangasinanjf7756_20.JPG/250px-Agno%2CPampanga%2CPangasinanjf7756_20.JPG",
        "length": "206 км",
        "pool": "5952 км²",
        "consumption": "660 м³/с (устье)",
        "head": " ",
        "estuary": "Лингаен",
        "location": " Филиппины",
        "info": "Агно (англ. Agno River, тагальск. Ilog Agno) — река на острове Лусон (Филиппины).Длина реки составляет 206 километров, площадь водосборного бассейна — 5952 км² (третья по этому показателю река Лусона после рек Кагаян и Пампанга, и пятая в стране). Тип русла — многорукавный. Исток Агно расположен на горе Дата (Центральная Кордильера) на высоте 2090 метров над уровнем моря. Вначале река течёт с севера на юг, но в последней четверти делает разворот почти на 180° и впадает в южную часть залива Лингаен. Агно характеризуется довольно быстрым течением, так как её уклон составляет более 10 метров на километр длины.На реке выстроены три гидроэлектростанции: Амбуклао, Бинга и Сан-Рок (39-е место в списке самых высоких плотин мира).Агно склонна к наводнениям, так как на неё ежегодно выливается от 2000 до 4000 миллиметров (в разных районах) осадков. Крупнейший приток — Тарлак.Впервые река была исследована в XVI веке испанскими путешественниками, которые сообщили, что устье Агно представляет собой обширные марши, покрытые толстым слоем аллювия. Местность изобиловала манграми и нипой, в которых кипела разнообразная дикая жизнь. В наше время водосборный бассейн Агно подвергается сильному обезлесению, девственный лес почти полностью вырублен, по крайней мере на высотах до 800 метров над уровнем моря, и сейчас замещён травянистыми сообществами и пахотными землями."
     },
     {
        "name": "Агонья",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B3%D0%BE%D0%BD%D1%8C%D1%8F",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Fiume_Agogna.jpg/250px-Fiume_Agogna.jpg",
        "length": "140 км",
        "pool": "997 км²",
        "consumption": "21,22 м³/с",
        "head": " ",
        "estuary": "По",
        "location": " Италия",
        "info": "Аго́нья (итал. Agogna) — река на северо-западе Италии. Левый приток реки По. Длина 140 км, площадь бассейна 997 км². Средний расход воды в устье — 21,22 м³/с.Течёт на востоке Пьемонта (провинции Вербано-Кузио-Оссола и Новара) и на западе Ломбардии (провинция Павия).Исток между озёрами Орта и Лаго-Маджоре. Высота истока — 1117 м над уровнем моря. Недалеко от города Новара реку пересекает канал Кавур (Canale Cavour). Течёт большей частью по Паданской равнине, впадает в реку По на территории Ломбардии, недалеко от границы с Пьемонтом. Высота устья — 70 м над уровнем моря.[источник не указан 36 дней] Питает оросительные каналы.Во время завоевания Италии Наполеоном I именем реки был назван один из департаментов с центром в Новаре.[источник не указан 36 дней]Главный приток — река Эрбоньоне.[источник не указан 36 дней]"
     },
     {
        "name": "Агри ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B3%D1%80%D0%B8_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Porto_turistico_di_Policoro_-_1.jpg/250px-Porto_turistico_di_Policoro_-_1.jpg",
        "length": "136 км",
        "pool": "1770 км²",
        "consumption": "20 м³/с",
        "head": " ",
        "estuary": "Ионическое море",
        "location": " Италия",
        "info": "А́гри (итал. Agri) — река на востоке области Базиликата в южной Италии. Длина 136 км, площадь бассейна 1770 км² (или 1686 км²).Исток реки находится в Луканских Апеннинах к западу от Кальвелло в провинции Потенца, чуть западнее истока Базенто. Река течет на юг до Патерно, после чего поворачивает на юго-восток. Она протекает недалеко от Трамутолы, Виджано и Грументо-Нова, а затем впадает в озеро Пьетра-ди-Пертусильо. После озера река течет на восток мимо Арменто, Миссанелло, Алиано и Сант-Арканджело. Между Арменто и Миссанелло в реку справа впадает Раканелло. От Миссанелло до впадения Сауро река является границей между провинциями Потенца и Матера.В бассейне Агри основная часть осадков выпадает весной и осенью, лето бывает засушливым. На реке расположено три водохранилища, используемые, в основном, для сельскохозяйственных нужд: Марсико Нуово (26 км², построено в 1996 году), Пертусильо (630 км², построено в 1963 году), Ганнано (1490 км², построено в 1959 году).В верхнем течении Агри протекает через доломиты, известняк, брекчию. Позже она течёт через илистые глины, песок, и пелиты.Основными притоками являются Алли, Сауро, Шаура, Раканелло, Каволо и Малья."
     },
        {
        "name": "Агу ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B3%D1%83_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Castres_%2881%29%2C_Maisons_sur_l%27Ago%C3%BBt.JPG/250px-Castres_%2881%29%2C_Maisons_sur_l%27Ago%C3%BBt.JPG",
        "length": "194,39 км",
        "pool": "3500 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Тарн",
        "location": " Франция",
        "info": "Агу́ (фр. Agout, окс. Agot) — река на юге Франции, в регионе Окситания. Длина — 194,39 км, площадь бассейна — около 3500 км²[источник не указан 360 дней]. Приток Тарна.Истоки реки находятся на юге Центрального массива на территории природного национального парка Верхний Лангедок, далее река протекает по территории департаментов Эро и Тарн, после чего впадает слева в реку Тарн.Крупнейшие населённые пункты на реке — Кастр и Лавор.[источник не указан 360 дней]"
     },
     {
        "name": "Агуа-Фриа",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B3%D1%83%D0%B0-%D0%A4%D1%80%D0%B8%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/AguaFriaCan.jpeg/250px-AguaFriaCan.jpeg",
        "length": "193 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Хила",
        "location": " США",
        "info": "Агуа-Фриа (англ. Agua Fria River) — река в штате Аризона, США. Берёт начало примерно в 20 милях к юго-востоку от города Прескотт, округ Явапаи. Течёт главным образом в южном направлении, протекая через территорию округов Явапаи и Марикопа. Длина составляет около 193 км.Впадает в реку Хила недалеко от города Толлесон. В засушливое время года русло реки часто пересыхает и не достигает устья. На реке имеется плотина Нью-Уаддел, расположенная в 56 км к северо-западу от Финикса."
     },
     {
        "name": "Агуан",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B3%D1%83%D0%B0%D0%BD",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Rio_Aguan.jpg/250px-Rio_Aguan.jpg",
        "length": "395 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Карибское море",
        "location": " Гондурас",
        "info": "Агуа́н — река на севере Гондураса. Берёт начало в департаменте Йоро западнее Сан-Лоренцо и, протекая в восточном направлении через департамент Колон, впадает в Карибское море у города Санта-Роса-де-Агуан. Общая протяжённость реки составляет около 395 километров. Имеет несколько притоков.Земли, находящиеся в долине реки, используются в основном в сельском хозяйстве. В верхнем и среднем течении выращивают кукурузу, бобы и овощи. В нижнем — платан, масличную пальму, рис и цитрусовые.Нередко случаются наводнения и ураганы. В 1974 году произошли крупные наводнения, вызванные ураганом Фифи. В 1998 году ураган Митч снова вызвал наводнения. Все мосты были разрушены, погибло более тысячи человек, Санта-Роса-де-Агуан был полностью затоплен.В ноябре 2014 года река приобрела печальную известность после того, как на берегу Агуан были найдены обезображенные тела «Мисс Гондурас-2014» Марии Хосе Альварадо (Maria Jose Alvarado) и её старшей сестры, которые были цинично расстреляны за неделю до этого бойфрендом последней."
     },
     {
        "name": "Агул ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B3%D1%83%D0%BB_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/%D0%A1%D1%82%D0%B0%D0%BD_%D0%BD%D0%B0_%D1%80.%D0%90%D0%B3%D1%83%D0%BB.jpg/250px-%D0%A1%D1%82%D0%B0%D0%BD_%D0%BD%D0%B0_%D1%80.%D0%90%D0%B3%D1%83%D0%BB.jpg",
        "length": "347 км",
        "pool": "11 600 км²",
        "consumption": "136 м³/с (10 км от устья)",
        "head": " ",
        "estuary": "Кан",
        "location": " Россия",
        "info": "Агу́л (в верховьях — Большой Агул) — река в Иркутской области и Красноярском крае России, правый приток реки Кан. Среднегодовой расход воды — 136 м³/с.Длина — 347 км (62 км в границах Тофаларского природного заказника), площадь бассейна — 11 600 км². Берёт начало на северных склонах Агульских Белков в Восточном Саяне. В верхнем течении протекает через горное Агульское озеро. Течёт на север по узкой долине, далее — по предгорьям Восточного Саяна. Река Агул — сплавная.По данным государственного водного реестра России относится к Енисейскому бассейновому округу, водохозяйственный участок реки — Кан, речной подбассейн реки — Енисей между слиянием Большого и Малого Енисея и впадением Ангары. Речной бассейн реки — Енисей.Код объекта в государственном водном реестре — 17010300412116100021924.(расстояние от устья)"
     },
     {
        "name": "Агусан",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B3%D1%83%D1%81%D0%B0%D0%BD",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Agusan_river_watershed.png/250px-Agusan_river_watershed.png",
        "length": "350 км",
        "pool": "10 921 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Минданао",
        "location": " Филиппины",
        "info": "Агу́сан — третья по величине бассейна река Филиппин. Длина — 350 км, площадь водосборного бассейна — 10 921 км². Протекает в северо-восточной части острова Минданао, по территории пяти провинций: Восточный Давао, Северный Давао, Долина Компостела, Южный Агусан и Северный Агусан. Берёт начало в провинции Восточный Давао, около горы Тагубуд, 1651 м над уровнем моря. Впадает в залив Бутуан (море Минданао), в районе города Бутуан.Протекает по долине Компостела шириной от 32 до 48 км.Территория величиной около 20 000 гектаров покрыта как дикорастущей флорой, так и сельскохозяйственными угодьями. Немалая часть долины заболочена.Главные притоки — Катгасан и Умаян.Географически бассейн Агусана делится на три под-бассейна, по топографическому признаку: верхний, средний и нижний."
     },
     {
        "name": "Агуца",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B3%D1%83%D1%86%D0%B0",
        "image": "undefined",
        "length": "120 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "слияние рек: Барун-Агуца и Зун-Агуца",
        "estuary": "Онон",
        "location": "undefined",
        "info": "Агуца (монг. Агацын гол) — река в Забайкальском крае России и аймаке Хэнтий Монголии. Левый приток реки Онон, относится к бассейну стока Тихого океана.Берёт начало в седловине между горами Сохондо и Быркытын-Янг на абсолютной высоте около 1800 м. Верховье находится на территории Сохондинского заповедника. Впадает в реку Онон в 615 км от устья. Длина 120 км. Нижнее течение (46 км) находится на территории монгольского аймака Хэнтий. Из 2230 км² площади водосбора 1680 км² приходится на Забайкальский край. В Монголии носит название Агацын-Гол, имеет 48 притоков, длина 41 из них составляет менее 10 км. Наиболее крупные притоки (от устья к истоку): Дуэкт-гол, Передний Алтан, Курейкан, Алия Быркыкта, Баданда и Сопкоя Бутырэн. На берегу Агуцы расположено село Алтан Кыринского района."
     },
               {
        "name": "Адаха",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B4%D0%B0%D1%85%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/El_Adaja_en_Villalba_de_Adaja.JPG/250px-El_Adaja_en_Villalba_de_Adaja.JPG",
        "length": "163 км",
        "pool": "5328 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Дуэро",
        "location": " Испания",
        "info": "Адаха (исп. Río Adaja) — река в Испании. Длина — 163 км, площадь бассейна — 5328 км².Истоки реки находятся в горах Сьерра-де-ла-Парамера в Центральных Кордильерах на территории провинции Авила. Адаха протекает по территории Месеты (провинции Авила, Сеговия и Вальядолид), после чего впадает в реку Дуэро на территории муниципалитета Тордесильяс. На берегах реки расположен исторический город Авила.Расход воды в реке резко отличается в зависимости от сезона.Высота истока — 1300 м над уровнем моря.[источник не указан 2031 день] Высота устья — 675 м над уровнем моря.[источник не указан 2031 день]Так как река протекает в засушливой местности, вид её берегов отличается от окружающей территории. Если в Месете преобладают травянистые растения и кустарники, то в долине реки распространены виды ивы и тополя, ясень, вяз, тёрн и другие деревья. В самой реке обитают рыбы и раки, свойственные для Дуэро и Пиренейского полуострова."
     },
     {
        "name": "Адда",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B4%D0%B4%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Adda_at_Canonica_d%E2%80%99Adda_%28Ian_Spackman_2007-007-19%29.jpg/250px-Adda_at_Canonica_d%E2%80%99Adda_%28Ian_Spackman_2007-007-19%29.jpg",
        "length": "313 км",
        "pool": "7800 км²",
        "consumption": "250 м³/с (в нижнем течении)",
        "head": " ",
        "estuary": "По",
        "location": " Италия",
        "info": "А́дда (итал. Adda, лат. Addua) — река на севере Италии, левый приток реки По.Длина 313 км, площадь бассейна 7800 км².Берёт начало из озера Канкано в Ретийских Альпах на южном склоне Вормской цепи к западу от массива Ортлес, близ тирольской границы; образует на протяжении 15 км водоскат высотой 754 м.В верховье течёт по троговой долине Вальтеллина; у Теглии поворачивает на запад, протекает Лаго-ди-Мецола и через озеро Комо, образует на своём пути Лаго-ди-Ольгинато. Далее проходит предгорья Ломбардских Предальп и течёт по Ломбардской низменности (где на протяжении около 124 км является судоходной). Впадает в реку По у Ретино.Средний расход воды около 250 м³/с в нижнем течении. На реке имеется ГЭС.В нижнем течении от Адды прорыты каналы, в том числе Мартезана до Милана длиной 56 км.С левой стороны Адда принимает Брембо и Серио, с правой — посредством каналов соединяется с Ламбро.Во времена Римской империи река являлась стратегической линией обороны во время войн.Река известна также сражением, происшедшим на её берегах во время Итальянского похода Суворова 1799 года."
     },
       {
        "name": "Аделейд ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B4%D0%B5%D0%BB%D0%B5%D0%B9%D0%B4_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Adelaide_River.JPG/250px-Adelaide_River.JPG",
        "length": "180 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Адам",
        "location": " Австралия",
        "info": "Аделейд (англ. Adelaide River) — судоходная река в Австралии, протекающая через Северную территорию страны и впадающая в Тиморское море примерно в 50 км к северо-востоку от города Дарвин. Длина — 180 км.Образуется из слияния двух рек. Высота истока — 149 м НУМ.На реке Аделейд находится небольшой городок Аделейд-Ривер.Река Аделейд была открыта Джоном Лортом Стоксом (англ. John Lort Stokes) и Л. Р. Фицморисом (англ. L.R. Fitzmaurice) в 1839 году во время исследования побережья Северной территории на корабле «Beagle». Путешественники назвали реку в честь королевы Аделаиды Саксен-Майнинген, супруги британского короля Вильгельма IV. Впоследствии река была исследована Джоном Макдоуэллом Стюартом (англ. John McDouall Stuart) в 1862 году.Из-за высокого плодородия почв в пойме реки в 1881 году поселенцы стали заниматься орошаемым земледелием, пытаясь выращивать кофе, сахарный тростник, каучук. Однако из-за тяжёлых климатических условий в 1886 году местность была покинута. В 1954 году были предприняты попытки выращивать рис, однако они провалились.Поскольку река расположена в субэкваториальном поясе, на ней различают два сезона: сухой и влажный. В сухой сезон в верхнем течении пересыхает, а в нижнем мелеет. И наоборот — во влажный сезон разливается в связи с тропическими дождями."
     },
       {
        "name": "Аджи-Чай",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B4%D0%B6%D0%B8-%D0%A7%D0%B0%D0%B9",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Aji_Chay_Talkhe_Roud_%D8%A2%D8%AC%DB%8C_%DA%86%D8%A7%DB%8C_%D8%AA%D8%B1%D8%AE%D9%87_%D8%B1%D9%88%D8%AF.jpg/250px-Aji_Chay_Talkhe_Roud_%D8%A2%D8%AC%DB%8C_%DA%86%D8%A7%DB%8C_%D8%AA%D8%B1%D8%AE%D9%87_%D8%B1%D9%88%D8%AF.jpg",
        "length": "200 км",
        "pool": "8100 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Урмия",
        "location": " Иран",
        "info": "Аджи-Чай (Аджичай; перс. آجی‌چای, азерб. آجی چای Acı çay), также Тельхеруд (перс. تلخه رود) — река на северо-западе Ирана. Находится в провинции Восточный Азербайджан. Длина реки — 200 км. Площадь водосборного бассейна выше Тебриза — 8100 км².Тельхеруд берёт начало на склонах горы Себелан. К северу-востоку от Тебриза в реку впадает приток Куричай."
     },
           {
        "name": "Адур",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B4%D1%83%D1%80",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Adour.jpg/250px-Adour.jpg",
        "length": "335 км",
        "pool": "16 927 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Бискайский залив",
        "location": " Франция",
        "info": "Аду́р (фр. Adour, окс. Ador, баск. Aturri) — река на юго-западе Франции, протекает по департаментам Верхние Пиренеи, Пиренеи Атлантические, Ланды и Жер. Длина реки — 335 км, площадь бассейна — 16 927 км². Река судоходна до города Сен-Север, но своё значение как транспортная артерия утратила. Используется для орошения; ГЭС.Исток реки находится в центральных Пиренеях, на склонах горы Миди-де-Бигорр (2877 м) рядом с перевалом Турмалет. Течёт на север по долине Кампана и через курорт Баньер-де-Бигор, затем выходит на равнину у города Табр и минует Мобургет. После слияния с рекой Аррос поворачивает на запад, протекает через города Эр-сюр-Адур и Сен-Север. Перед Даксом принимает воды реки Лу, после него — реки Люи. Ниже слияния с объединёнными водами рек Гав-де-По и Гав-д’Олорон на Адуре стоят города Байонна и Англет, у которых река впадает в Бискайский залив Атлантического океана. Ранее устье Адура располагалось на 28 км севернее, у селения Вьё-Буко, пока в 1579 году русло не изменили для того, чтобы «смыть» мель перед Байонской гаванью, которая после этого стала блуждающей.Адур протекает по южной части Гароннской низменности. К западу от бассейна Адура находится сходный по характеристикам бассейн реки Гаронна, а к западу за хребтами Пиренеев — небольшой бассейн реки Бидасоа. К северу от устья реки расположен Серебряный берег, южнее — Берег басков."
     },
       {
        "name": "Адыча",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B4%D1%8B%D1%87%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Yana_river.png/250px-Yana_river.png",
        "length": "715 км",
        "pool": "89 800 км²",
        "consumption": "512,5 м³/с (26 км от устья)",
        "head": " ",
        "estuary": "Яна",
        "location": " Россия",
        "info": "Ады́ча (якут. Адыаччы) (в верховьях Боронг) — река в Якутии, правый приток Яны.Длина — 715 км, площадь водосборного бассейна — 89,8 тыс. км². Берёт начало с западных склонов хребта Черского. Течёт в широкой долине по территории Томпонского и Верхоянского районов. Впадает в Яну в 648 км от её устья.Питание снеговое и дождевое. Среднегодовой расход воды в 26 км от устья составляет 512,5 м³/с, в 212 км — 327,76 м³/с, в 334 км — 300,92 м³/с. Замерзает в октябре, зимой перемерзает от 1 до 4,5 месяцев; вскрывается в конце мая. Характерны огромные наледи.(расстояние от устья)Река судоходна. Участок протяжённостью 223 км от с. Ойун-Хомото до устья входит в перечень внутренних водных путей Российской Федерации.В конце советского периода на реке планировалось строительство Адычанской ГЭС, но перестройка и экономические трудности в стране похоронили этот проект.По данным государственного водного реестра России и геоинформационной системы водохозяйственного районирования территории РФ, подготовленной Федеральным агентством водных ресурсов:"
     },
     {
        "name": "Ай ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B9_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Ford_across_Ai_river.jpg/250px-Ford_across_Ai_river.jpg",
        "length": "549 км",
        "pool": "15 000 км²",
        "consumption": "84 м³/с (в устье)",
        "head": " ",
        "estuary": "Уфа",
        "location": " Россия",
        "info": "Ай (башк. Әй) — река на Южном Урале, левый и самый крупный приток реки Уфы.В XVIII веке В. Н. Татищев предположил что наименование реки означает — «светлая, как луна», «светлая», «луна». По другой версии — «красивая, как луна». Гидроним с башкирского языка переводится как «месяц», «луна».Ничего общего с действительностью не имеет легенда о том, что название происходит от междометия «ай» (будто бы так кричали богатые люди, испугавшиеся прихода пугачёвцев).По предположению некоторых учёных, гидроним мог возникнуть от названия башкирского родоплеменного объединения Айле (Ай), проживающего в долине реки, которое имело тамгу в виде полумесяца.Длина — 549 км (из них: 271 км в Челябинской области, 278 км в Республике Башкортостан), общее падение — 714 м, площадь бассейна — 15 тыс. км². Средний уклон уменьшается с 4,3 % в истоке до 2,2 % у с. Лаклы и до 1,3 % в нижнем течении. По физико-географическим условиям бассейн реки делится на горную (от истока до села Лаклы Салаватского района) и равнинную (до устья) части. Горная часть расположена в пределах складчатых гор и предгорий Южного Урала. Равнинная часть лежит на Юрюзано-Айской равнине и Уфимском плато. Берёт начало из болота Клюквенное, расположенного на стыке хребтов Уреньга и Аваляк Южного Урала, в 2 км к юго-западу от кордона Южный и в 70 км к юго-юго-западу от города Златоуст. В верховьях течёт с северо-востока на юго-запад по территории Челябинской области. На территории Республики Башкортостан протекает с юго-востока на северо-запад через Кигинский, Салаватский, Дуванский и Мечетлинский районы и впадает в реку Уфа в 392 км от её устья на высоте менее 161 м над уровнем моря."
     },
                                        {
        "name": "Ай-Коликъёган",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B9-%D0%9A%D0%BE%D0%BB%D0%B8%D0%BA%D1%8A%D1%91%D0%B3%D0%B0%D0%BD",
        "image": "undefined",
        "length": "120 км",
        "pool": "1160 км²",
        "consumption": "undefined",
        "head": "Моракиголэмтор",
        "estuary": "Коликъёган",
        "location": " Россия",
        "info": "Ай-Коликъёган (также Ай-Колекъёган) (устар. Ай-Колик-Ёган) — река в России, протекает по территории Нижневартовского района Ханты-Мансийского автономного округа. Устье реки находится в 104 км от устья по левому берегу реки Коликъёган. Длина реки — 120 км, площадь водосборного бассейна — 1160 км².Основные притоки: Нелкеёган, Энтль-Ульёган.По данным государственного водного реестра России относится к Верхнеобскому бассейновому округу, водохозяйственный участок реки — Вах, речной подбассейн реки — бассейны притоков (Верхней) Оби от Васюгана до Ваха. Речной бассейн реки — (Верхняя) Обь до впадения Иртыша."
     },
           {
        "name": "Ай-Курусъях",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B9-%D0%9A%D1%83%D1%80%D1%83%D1%81%D1%8A%D1%8F%D1%85",
        "image": "undefined",
        "length": "123 км",
        "pool": "659 км?",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Большой Юган",
        "location": " Россия",
        "info": "Ай-Курусъях (устар. Ай-Курус-Ях) — река в России, протекает по Ханты-Мансийскому АО Устье реки находится в 362 км по правому берегу реки Большой Юган. Длина реки составляет 123 км.Высота устья — 41,7 м над уровнем моря.[источник не указан 588 дней] Высота истока — 86 м над уровнем моря.[источник не указан 588 дней]По данным государственного водного реестра России относится к Верхнеобскому бассейновому округу, водохозяйственный участок реки — Обь от города Нефтеюганск до впадения реки Иртыш, речной подбассейн реки — Вах. Речной бассейн реки — (Верхняя) Обь до впадения Иртыша."
     },
                                          {
        "name": "Ай-Пим",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B9-%D0%9F%D0%B8%D0%BC",
        "image": "undefined",
        "length": "258 км",
        "pool": "1780 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Пим",
        "location": " Россия",
        "info": "Ай-Пим — река в России, протекает по территории Сургутского района Ханты-Мансийского автономного округа. Устье реки находится в 153 км по правому берегу реки Пим. Длина реки — 258 км, площадь водосборного бассейна — 1780 км².(км от устья)По данным государственного водного реестра России относится к Верхнеобскому бассейновому округу, водохозяйственный участок реки — Обь от города Нефтеюганск до впадения реки Иртыш, речной подбассейн реки — Обь ниже Ваха до впадения Иртыша. Речной бассейн реки — (Верхняя) Обь до впадения Иртыша."
     },
                                                      {
        "name": "Айваседапур",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B9%D0%B2%D0%B0%D1%81%D0%B5%D0%B4%D0%B0%D0%BF%D1%83%D1%80",
        "image": "undefined",
        "length": "178 км",
        "pool": "26 100 км?",
        "consumption": "260 м?/с",
        "head": "слияние рек: Етыпур и Еркалнадейпур",
        "estuary": "Пур",
        "location": " Россия",
        "info": "Айваседапу?р (устар. Айваседа-Пур) — река в России, протекает по территории Пуровского района Ямало-Ненецкого автономного округа. Длина реки — 178 км. Площадь водосборного бассейна — 26 100 км?. Средний расход воды — 260 м?/с.Правая образующая реки Пур, сливается с Пякупуром около города Тарко-Сале. Образована слиянием рек Етыпур и Еркалнадейпур.Питание реки преимущественно снеговое, 280 км от устья судоходны.По данным государственного водного реестра России относится к Нижнеобскому бассейновому округу, водохозяйственный участок реки — Пур. Речной бассейн реки — Пур.Пур — название принимающей реки, Айваседа — название её левой составляющей. Образовано русской адаптацией ненецкого Нгэвасяда («безголовые»), названия одного из родов лесных ненцев, живших на этой реке. В целом может быть осмыслено как «Пур рода Айваседа»."
     },
     {
        "name": "Айвиексте",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B9%D0%B2%D0%B8%D0%B5%D0%BA%D1%81%D1%82%D0%B5",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Aiviekste_upe.jpg/250px-Aiviekste_upe.jpg",
        "length": "114 км",
        "pool": "9160 км²",
        "consumption": "undefined",
        "head": "Лубанс",
        "estuary": "Западная Двина",
        "location": " Латвия",
        "info": "А́йвиексте (латыш. Aiviekste) — река в восточной части Латвии, правый приток Даугавы.Длина реки составляет 114 км, площадь бассейна 9160 км². Падение реки — 26,9 м.Берёт исток из озера Лубанс на границе Мадонского и Резекненского краёв. Далее Айвиексте протекает по границе с Балвским и Ругайским краем, по Лубанскому и Мадонскому краю. В нижнем течении по реке проходит граница между Плявиньским и Крустпилсским краями. Имеет правый приток — Педедзе.На реке находится Айвиекстская ГЭС мощностью 0,8 МВт. Создателями гидроэлектростанции были K. Zadde, E. Lūsis и F. Ansons. Первую энергию станция дала в 1925 году. Это была первая крупная гидроэлектростанция в Латвии и до постройки Кегумской ГЭС, то есть до 1938 года, Айвиекстская ГЭС была самой мощной в Латвии. В настоящее время Айвиекстская ГЭС вместе с Айнажской ветроэлектростанцией (ВЭС) с мощностью 1,2 МВт относится к самым малым электростанциям, входящим в компанию Latvenergo. Сегодня она генерирует приблизительно 0,1 % всей энергии, производимой в Латвии.Река богата рыбой. Здесь ловятся щука, лещ, окунь, плотва, линь, угорь, местами встречаются карп и сом. Правилами рыбалки в Латвии запрещено рыболовство на реке Айвиексте в зоне 500 метров вниз по течению от плотины Айвиекстской ГЭС."
     },
     {
        "name": "Айвишак",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B9%D0%B2%D0%B8%D1%88%D0%B0%D0%BA",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Upper_Ivishak_River_Valley.jpg/250px-Upper_Ivishak_River_Valley.jpg",
        "length": "153 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Сагаваниркток",
        "location": " США",
        "info": "Айвишак (англ.  Ivishak River) — река на северо-западе Северной Америки. Протекает по территории боро Норт-Слоп штата Аляска, США.Длина реки составляет около 153 км. Верховья Айвишак питаются ледниками; река течёт сперва на северо-восток, а затем на северо-запад через горы Филип-Смит и северные предгорья Национального Арктического заповедника. Впадает в реку Сагаваниркток на прибрежной равнине, в 89 км к югу от населённого пункта Прадхо-Бей."
     },
        {
        "name": "Айгурка",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B9%D0%B3%D1%83%D1%80%D0%BA%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/%D0%AF%D0%B3%D1%83%D1%80%D0%BA%D0%B0.JPG/250px-%D0%AF%D0%B3%D1%83%D1%80%D0%BA%D0%B0.JPG",
        "length": "137 км",
        "pool": "2260 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Калаус",
        "location": " Россия",
        "info": "Айгу́рка (от тюрк. айгыр — жеребец) — река в России, правый приток Калауса. В верхнем течении называется Ягу́рка. Протекает в Туркменском, Апанасенковском и Ипатовском районах Ставропольского края.Входит в «Перечень объектов, подлежащих региональному государственному надзору в области использования и охраны водных объектов на территории Ставропольского края», утверждённый постановлением Правительства Ставропольского края от 5 мая 2015 года № 187-п.Название реки предположительно образовано от тюркского слова айгыр («жеребец») и могло быть связано с её «бурным нравом во время половодья». По данным ставропольского краеведа В. Г. Гниловского, иногда обозначается как Кев-Айгур («сивый жеребец»).Длина реки — 137 км. Площадь водосборного бассейна — 2260 км².Исток реки находится на западной окраине села Малые Ягуры. Река течёт в пределах Туркменского, Апанасенковского и Ипатовского районов, образуя большую петлю. До посёлка Поперечного преимущественное направление — на восток, затем река поворачивает на северо-восток и в районе села Рагули резко поворачивает на северо-запад. Впадает в Калаус около посёлка Двуречного, на высоте 62,9 м над уровнем моря."
     },
     {
        "name": "Айдар ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B9%D0%B4%D0%B0%D1%80_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Aidar_River.jpg/250px-Aidar_River.jpg",
        "length": "264 км",
        "pool": "7420 км²",
        "consumption": "15,4 м³/с",
        "head": " ",
        "estuary": "Северский Донец",
        "location": "undefined",
        "info": "Айда́р — река в Белгородской области России и Луганской области Украины, левый приток Северского Донца. Длина — 264 км, площадь водосборного бассейна — 7420 км². Расход воды — 15,4 м³/с. Уклон — 0,34 м/км.Берёт начало на южных склонах Средне-Русской возвышенности у села Новоалександровка Ровеньского района Белгородской области, впадает в Северский Донец на 344 километре от его истока. Верхнее течение зарегулировано Новоалександровским водохранилищем (площадь 72 га, объём воды 2,32 млн м³). Длина реки — 264 км, в том числе в пределах Белгородской области — 65 км. В Белгородской области на Айдаре находятся также: хутор Клиновый, хутор Озёрный, село Нагольное и село Айдар Айдарского сельского поселения.Крупнейший населённый пункт расположенный на реке — административный центр Старобельского района Луганской области — город Старобельск. У реки, в Новоайдарском районе Луганской области, расположен памятник природы — «Айдарская терраса», также на реке находится административный центр района — пгт. Новоайдар (ранее, с 1778 года, город Айдар). На реке расположен Айдарский ихтиологический заказник.Вблизи места впадения Айдара в Северский Донец в конце 16 века была основана небольшая крепость, носившая название «Айдарская сторожа»."
     },
     {
        "name": "Айдер ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B9%D0%B4%D0%B5%D1%80_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Eidersperrwerk_ty20060715r0012451.jpg/250px-Eidersperrwerk_ty20060715r0012451.jpg",
        "length": "188 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "Боткампер-Зе",
        "estuary": "Северное море",
        "location": " Германия",
        "info": "А́йдер (устар. Эйдер; нем. Eider, дат. Ejderen, лат. Egdor, Egdore) — река в Германии, самая длинная в земле Шлезвиг-Гольштейн. Длина реки составляет 188 км, из которых около 20 было использовано для прокладки Кильского канала.Айдер начинается из озера Боткампер-Зе, затем протекает недалеко от Бордесхольма и поворачивает на север, к городу Киль. На южных окраинах Киля, всего в 4 км от залива Килер-Фёрде Балтийского моря, река образует небольшое озеро Шулензе и затем продолжает свой путь на запад, в Северное море. Недалеко от Киля Айдер впадает в озеро Вестензе, из которого вытекает на север, минует Ахтервер и соединяется с Кильским каналом. Канал был проложен по идущему на запад руслу реки, минуя коммуну Зеэштедт, до городов Бюдельсдорф и Рендсбург. Там река и канал разделяются, и Айдер, сменив своё течение на северо-запад и меандрируя, протекает мимо коммун Тиленхемме, Дельфе и Зюдерстапель.У города Фридрихштадт в Айдер справа впадает самый крупный приток — Трене, после чего река течёт на юго-запад и у города Тённинг образует эстуарий. Вода в эстуарии солоноватая, местами встречаются ватты. В месте впадения Айдера в Ваттовое море располагается защитный штормовой барьер Айдершперрверк, построенный в 1967—1973 годах."
     },
         {
        "name": "Айёган (приток Корылькы)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B9%D1%91%D0%B3%D0%B0%D0%BD_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9A%D0%BE%D1%80%D1%8B%D0%BB%D1%8C%D0%BA%D1%8B)",
        "image": "undefined",
        "length": "114 км",
        "pool": "1570 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Корылькы",
        "location": " Россия",
        "info": "Айёган (устар. Ай-Ёган) — река в России, протекает по территории Ямало-Ненецкого автономного округа. Устье реки находится в 107 км по правому берегу реки Корылькы. Длина реки — 114 км, площадь водосборного бассейна — 1570 км².По данным государственного водного реестра России относится к Нижнеобскому бассейновому округу, водохозяйственный участок реки — Таз, речной подбассейн реки — подбассейн отсутствует. Речной бассейн реки — Таз."
     },
                   {
        "name": "Айкаёган",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B9%D0%BA%D0%B0%D1%91%D0%B3%D0%B0%D0%BD",
        "image": "undefined",
        "length": "183 км",
        "pool": "2880 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Ватьёган",
        "location": " Россия",
        "info": "Айкаёган — река в России, протекает по Ханты-Мансийскому АО. Впадает в реку Ватьёган справа, в 79 км от устья. Длина реки составляет 183 км, площадь водосборного бассейна 2880 км². Высота устья — 55 м над уровнем моря.[источник не указан 600 дней]По данным государственного водного реестра России относится к Верхнеобскому бассейновому округу, водохозяйственный участок реки — Обь от впадения реки Вах до города Нефтеюганск, речной подбассейн реки — Обь ниже Ваха до впадения Иртыша. Речной бассейн реки — (Верхняя) Обь до впадения Иртыша.По данным геоинформационной системы водохозяйственного районирования территории РФ, подготовленной Федеральным агентством водных ресурсов."
     },
              {
        "name": "Айова ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B9%D0%BE%D0%B2%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Iowa_River.jpg/250px-Iowa_River.jpg",
        "length": "520 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "Кристал-Лейк",
        "estuary": "Миссисипи",
        "location": " США",
        "info": "Айо́ва (англ. Iowa River) — река в штате Айова в США, приток Миссисипи. Длина реки — 520 км, речное судоходство возможно на расстоянии около 105 км от устья. Главный приток Айовы — река Сидар.У своих истоков в округе Хэнкок Айова делится на две ветви — Западную и Восточную, обе около 61 км длиной. Они сливаются у города Бэлмонд, далее река течёт в юго-восточном направлении до своего впадения в Миссисипи.Айова известна рыболовным туризмом и коммерческим ловом рыбы. В реке водятся большеротый и малоротый окунь, судак, щука, канальный сомик, оливковый сомик. В речных резервуарах разводят карпов и буффало.На реке имеется государственный заповедник Пайн-Лейк в городе Элдора.Айова часто разливается, затапливая прибрежные города. Серьёзные наводнения происходили в 1993 году и в июне 2008 года."
     },
          {
        "name": "Айричай (приток Алазани)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B9%D1%80%D0%B8%D1%87%D0%B0%D0%B9_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%90%D0%BB%D0%B0%D0%B7%D0%B0%D0%BD%D0%B8)",
        "image": "undefined",
        "length": "134 км",
        "pool": "1810 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Алазани",
        "location": " Азербайджан",
        "info": "Айричай (азерб. Əyriçay) — река в Азербайджане, левый приток Ганыха (Алазани). Протекает по территории Огузского, Шекинского и Гахского районов. Длина — 134 км, площадь бассейна — 1810 км².Исток Айричая расположен на южном склоне Главного Кавказского хребта, на высоте 3200 м. Река питается в основном подземными и дождевыми водами. Самые крупные притоки — Кюнгютчай, Кишчай, Шинчай, Кашкачай. Вода Айричая используется для орошения.Название состоит из слов «айри» (азерб. اكری) — кривой и «чай» (азерб. چای) — река, и означает «кривая, извилистая река»."
     },
                                    {
        "name": "Айюва",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%B9%D1%8E%D0%B2%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Pechora.svg/250px-Pechora.svg.png",
        "length": "193 км",
        "pool": "2950 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Ижма",
        "location": " Россия",
        "info": "Айюва — река в Республике Коми, правый приток реки Ижма (бассейн Печоры). Длина 193 км, площадь водосборного бассейна — 2950 км².Питание смешанное, с преобладанием снегового. Крупнейший приток — Вонъю (левый).Айюва начинается на восточных склонах Тиманского кряжа. Течёт в верховьях по ненаселённой местности сначала на запад, затем на юг. Берега лесистые, сильно заболоченные. Русло извилистое.В нижнем течении протекает посёлок Керки, стоящий на железной дороге Котлас — Ухта — Воркута. После устья Вонъю Айюва вновь поворачивает на запад и впадает в Ижму рядом с городом Сосногорск.На берегах Айювы были обнаружены важные палеонтологические находки, в том числе ископаемые остатки ихтиозавра и других динозавров. В нижнем течении реки большие залежи глинозёмов.Объекты перечислены по порядку от устья к истоку."
     },
             {
        "name": "Ак-Буура ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BA-%D0%91%D1%83%D1%83%D1%80%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Osh_03-2016_img17_Ak-Buura_River.jpg/250px-Osh_03-2016_img17_Ak-Buura_River.jpg",
        "length": "148 км",
        "pool": "2540 км²",
        "consumption": "21,4 м³/с (пост Тулейкен)",
        "head": "слияние рек: Чал-Куйрук и Сары-Кой",
        "estuary": "Шахрихансай",
        "location": " Киргизия Узбекистан",
        "info": "Ак-Буура (Акбура; кирг. Ак-Буура, узб. Oqboʻyra) — река в Киргизии и Узбекистане, является левым притоком Шахрихансая.Длина реки составляет 148 км[источник не указан 1231 день], а водосбор занимает 2540 км². Средний многолетний расход реки на гидропосте Тулейкен (южная граница Оша) составляет 21,4 м³/сек, приток во время половодья (июнь — июль) составляет 50-67 м³/сек, в межень (январь) 5-6 м³/сек.[источник не указан 1231 день]Река образуется на северных склонах Алайского хребта при слиянии реки Чал-Куйрук и реки Сары-Кой у села Ак-Джылга. Выше Оша на реке расположено Папанское водохранилище. За ним от Ак-Бууры отделяются слева Арван-Арбурикский канал и арык Каирма. Миновав Ош река выходит на территорию Андижанской области Узбекистана и впадает слева в канал Шахрихансай.Название реки переводится как «белый верблюд-производитель» и, возможно, происходит от названия одноимённого рода."
     },
     {
        "name": "Ак-Суг",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BA-%D0%A1%D1%83%D0%B3",
        "image": "undefined",
        "length": "160 км",
        "pool": "3170 км²",
        "consumption": "14 м³/с",
        "head": " ",
        "estuary": "Хемчик",
        "location": " Россия",
        "info": "Ак-Суг (в верховье Ак-Хем) — река в Республике Тыва, приток реки Хемчик.Длина реки — 160 км, площадь её водосборного бассейна — 3170 км². Среднегодовой расход воды — 14 м³/с. В долине развито сельское хозяйство с орошением. Годовое водопотребление составляет 1 % годового стока реки (15 млн м³).Река Ак-Суг — левый приток реки Хемчик, впадает на 99 км от устья. Река имеет 46 притоков менее 10 км, общая длина которых составляет 173 км, также на водосборе расположены 82 озера, общая площадь которых составляет 10,23 км².В истоках реки Ак-Суг расположена гора Кызыл-Тайга.Бора-Тайга — село в Сут-Хольского кожууне."
     },
         {
        "name": "Акалаха",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BA%D0%B0%D0%BB%D0%B0%D1%85%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Ukok_Ak-Alakha.jpg/250px-Ukok_Ak-Alakha.jpg",
        "length": "126 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Аргут",
        "location": " Россия",
        "info": "Акалаха (устар. Ак-Алаха) — река в России, в Кош-Агачском районе Республики Алтай. Длина — 126 км. Является водосбором для всех рек плоскогорья Укок.Берёт начало из Канасского ледника северного склона хребта Южный Алтай, западнее перевала Канас. При слиянии с рекой Джазатор образует реку Аргут.Высота истока — 2370 м над уровнем моря. Высота устья — 1531,4 м над уровнем моря.В долине реки на плоскогорье Укок находится курганный могильник пазырыкской культуры Ак-Алаха-1.Объекты по порядку от устья к истоку ( км от устья: ← левый приток | → правый приток | — объект на реке ):"
     },
     {
        "name": "Акара ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BA%D0%B0%D1%80%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Trilha_do_Cacau_-_Bel%C3%A9m_do_Par%C3%A1_-_Barco_Hacker_08.jpg/250px-Trilha_do_Cacau_-_Bel%C3%A9m_do_Par%C3%A1_-_Barco_Hacker_08.jpg",
        "length": "390 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Пара",
        "location": " Бразилия",
        "info": "Акара́ (порт. Acará) — река в Бразилии в штате Пара. Длина — 390 км.Исток реки находится в тропических лесах юго-западнее города Томе-Асу. Оттуда она течёт в общем направлении на север, немного отклоняясь к востоку. После города Акара она сливается с рекой Можу, и они вместе впадают через бухту Гуажара возле города Белен в залив Маражо — устье реки Пара."
     },
     {
        "name": "Акарай ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BA%D0%B0%D1%80%D0%B0%D0%B9_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Salto_del_Rio_Acaray_-_panoramio.jpg/250px-Salto_del_Rio_Acaray_-_panoramio.jpg",
        "length": "160 км",
        "pool": "9681 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Парана",
        "location": " Парагвай",
        "info": "Акара́й (исп. Río Acaray) — река в восточной части Парагвая в департаментах Каагуасу и Альто-Парана. Длина — 160 км, площадь бассейна — 9681 км². Впадает в реку Парана справа на её 698 км.Формируется на юго-восточных склонах гор Сьерра-де-Каагуасу и течёт на юго-восток. В низовье протекает между городами Эрнандарьяс (на левом берегу) и Сьюдад-дель-Эсте (на правом). Здесь на Акарае для аккумуляции воды было построено водохранилище, используемое гидроэлектростанцией Акарай, запущенной в 1968 году.По порядку от устья:"
     },
         {
        "name": "Акдарья (приток Кашкадарьи)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BA%D0%B4%D0%B0%D1%80%D1%8C%D1%8F_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9A%D0%B0%D1%88%D0%BA%D0%B0%D0%B4%D0%B0%D1%80%D1%8C%D0%B8)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Ak-Dar%27ya_%28Kitab%29.jpg/250px-Ak-Dar%27ya_%28Kitab%29.jpg",
        "length": "154 км",
        "pool": "1280 км²",
        "consumption": "12,3 м³/с",
        "head": " ",
        "estuary": "Кашкадарья",
        "location": " Узбекистан",
        "info": "Акдарья́ (в верховье Аксу) — река в Кашкадарьинской области Узбекистана.Длина реки составляет 154 км, площадь бассейна — 1280 км². Акдарья берёт начало на склонах Гиссарского хребта и впадает в реку Кашкадарья. Питание снежно-ледниковое. Половодье приходится на период с марта по сентябрь с максимальными расходами с мая по июнь. Средний расход воды составляет 12,3 м³/с (у кишлака Хазарнова). Ниже сток разбирается на орошение. Средний расход взвешенных наносов — 12 кг/с. В нижнем течении река пересыхает, русло зарастает. Вода гидрокарбонатно-кальциевая, средняя минерализация — 200—240 мг/л. На берегу Акдарьи расположен город Китаб."
     },
     {
        "name": "Акера",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BA%D0%B5%D1%80%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Berdzor075.JPG/250px-Berdzor075.JPG",
        "length": "170 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "слияние рек: Гочазсу и Шальва",
        "estuary": "Аракс",
        "location": " Азербайджан Армения",
        "info": "Акера также Хакари (азерб. Həkəri, арм. Հակարի) — левый приток Аракса. Протекает по Азербайджану, на небольшом участке служит в качестве границы с Арменией. Исток реки расположен на Карабахском нагорье.Образуется слиянием рек Гочазсу и Шальва. В середине XX века считалась левым притоком Воротана/Базарчая.Протекает по узкому и глубокому ущелью, в среднем течении долина расширяется. В верховьях русло Акера прокладывает в осадочных, вулканических породах, протекает в поросших дубами и грабами берегах. Основное питание снеговыми и дождевыми водами. Используется для орошения. Половодье в мае-июне.Средний расход воды:Река богата рыбными ресурсами, развито рыболовство.Притоки: Воротан/Базарчай (крупнейший), Мейдандереси, Забухчай, Кичик-Акера.В древности служила границей между армянскими историческими областями Сюник и Арцах (Нагорный Карабах)."
     },
        {
        "name": "Акишма",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BA%D0%B8%D1%88%D0%BC%D0%B0",
        "image": "undefined",
        "length": "196 км",
        "pool": "4010 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Ниман",
        "location": " Россия",
        "info": "Аки́шма — река на Дальнем Востоке России, правый приток Нимана.Длина — 196 км, площадь бассейна — 4010 км². Исток — на южных склонах хребта Эзоп в Хабаровском крае. Большей частью протекает по территории Амурской области.Населённых пунктов на реке нет. В 30 км восточнее верховий Акишмы расположен посёлок Софийск Верхнебуреинского района Хабаровского края, примерно в 150 км к северо-западу — пос. Ольгинск Селемджинского района Амурской области.Предположительно название реки произошло от эвенкийского аргиш — «караван, упряжка оленей».По данным государственного водного реестра России относится к Амурскому бассейновому округу, речной бассейн реки — Амур, речной подбассейн реки — Бурея, водохозяйственный участок реки — Бурея от истока до Бурейского гидроузла.Код объекта в государственном водном реестре — 20030500112118100042788.Объекты перечислены по порядку от устья к истоку."
     },
     {
        "name": "Акканбурлык ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BA%D0%BA%D0%B0%D0%BD%D0%B1%D1%83%D1%80%D0%BB%D1%8B%D0%BA_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "176 км",
        "pool": "6720 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Ишим",
        "location": " Казахстан",
        "info": "Акканбурлык (каз. Аққанбұрлық — Верхний Бурлык) — река в Северо-Казахстанской и Акмолинской областях Казахстана, правый и самый многоводный приток Ишима (бассейн Иртыша). Входит в Ишимский водохозяйственный бассейн Республики Казахстан. Длина — 176 км. Высота устья — 170 м над уровнем моря.[источник не указан 723 дня] Высота истока — 440 м над уровнем моря.[источник не указан 723 дня] Площадь водосборного бассейна — 6720 км².[источник не указан 723 дня]Акканбурлык называют ещё Верхним Бурлыком, в отличие от Нижнего — Иманбурлыка.Берёт начало на западе возвышенности Кокшетау. В верхнем течении протекает через озеро Жаксы-Жалгызтау. Общее направление течения с востока на запад. Впадает в реку Ишим с правой стороны, к востоко-юго-востоку от села Урожайного. Река протекает по территории Айыртауского и им. Габита Мусрепова районов Северо-Казахстанской области. Крупные притоки: Кулаайгыр (левый); Бабыкбурлык (~80 км), Тайсары, Шарык (~85 км) (правые).Сток реки имеет сильно выраженную сезонную и многолетнюю неравномерность. Расходы воды в разные годы могут различаться в десятки и сотни раз, что значительно осложняет хозяйственное использование ресурсов реки.На реке расположено 20 сёл, наиболее крупные:"
     },
     {
        "name": "Акобо ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BA%D0%BE%D0%B1%D0%BE_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "434 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Пибор",
        "location": "undefined",
        "info": "Акобо (англ. Akobo) — пограничная река в Восточной Африке, протекает по территории Эфиопии и Южного Судана. Правый приток реки Пибор. Длина реки составляет 434 км.Начало берёт со склонов западной окраины южной части Эфиопского нагорья на высоте, примерно, 1500 метров над уровнем моря. От истока, расположенного северо-западнее города Маджи в Области Народностей Южной Эфиопии, до устья, находящегося восточнее одноименного южносуданского города, основным направлением течения реки является северо-запад.В верхнем течении, до места впадения левого притока — реки Кая, протекает в юго-западной части Эфиопии, далее до самого устья по руслу реки Акобо проходит граница между Южным Суданом и Эфиопией. Акобо впадает в Пибор с правой стороны на высоте 401 м над уровнем моря.Граница по реке Акобо была проведена в 1899 году майорами Чарльзом Гвинном (англ. Charles W. Gwynn) и Остином (англ. H. H. Austin) из Корпуса королевских инженеров Британской армии и закреплена англо-эфиопским договором в 1902 году."
     },
     {
        "name": "Аконкагуа (река)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BA%D0%BE%D0%BD%D0%BA%D0%B0%D0%B3%D1%83%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Rio_Aconcagua_2.jpg/250px-Rio_Aconcagua_2.jpg",
        "length": "142 км",
        "pool": "7200 км²",
        "consumption": "39 м³/с",
        "head": "слияние рек: Хункаль и Рио-Бланко",
        "estuary": "Тихий океан",
        "location": " Чили",
        "info": "Аконкагуа (исп. Río Aconcagua) — река в области Вальпараисо Чили.Река берёт начало в Андах на высоте 1430 метров над уровнем моря при слиянии рек Хункаль (36 км) и Рио-Бланко (35 км). Течет в западном направлении по широкой долине Валье-дель-Аконкагуа, впадает в Тихий океан севернее города Винья-дель-Мар. На берегах реки расположены города Лос-Андес, Сан-Фелипе, Ла-Калера, Кильота и Конкон. По долине реки проложена часть чилийского участка Трансандинской железной дороги и отдельные участки шоссе № 5 и шоссе № 60.Общая площадь бассейна реки составляет 7200 км², длина реки — 142 км (177 км, если истоком реки считать исток реки Хункаль)."
     },
     {
        "name": "Акри ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BA%D1%80%D0%B8_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Expedi%C3%A7%C3%A3o_Rio_Acre_estuda_nova_rela%C3%A7%C3%A3o_do_rio_com_as_cidades_%2826015147215%29.jpg/250px-Expedi%C3%A7%C3%A3o_Rio_Acre_estuda_nova_rela%C3%A7%C3%A3o_do_rio_com_as_cidades_%2826015147215%29.jpg",
        "length": "680 км",
        "pool": "35 000 км²",
        "consumption": "до 1200 м³/с",
        "head": " ",
        "estuary": "Пурус",
        "location": " Перу Боливия Бразилия",
        "info": "А́кри (порт. Rio Acre) — река в центральной части Южной Америки, правый приток Пуруса.Находится на северо-западе Бразилии, Перу и севере Боливии. Длина — 680 км. Берёт своё начало в перуанских Андах, после чего протекая в восточном направлении образуя часть границы между Боливией и Бразилией. Является правым притоком реки Пурус. Площадь речного бассейна составляет 35000 км², а его расход воды колеблется от 30 до 1200 м³/с. Крупнейшим притоком Акри является река Риозиньо-ду-Рола, к прочим притокам относятся реки Шапури, Антимари и Андира. Река судоходна ниже впадения реки Шапури.В водах Акри обитают 80 видов рыб из 26 семейств и 9 отрядов. Наибольшим видовым богатством обладает отряд сомообразных (37 видов).Важнейшими факторами влияющими на облик территории в бассейне реки являются лесные пожары, вырубка лесов и сельское хозяйство. Для сохранения верховьев бассейна реки Акри в 1981 году была создана экологическая станция."
     },
     {
        "name": "Аксай (приток Акташа)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BA%D1%81%D0%B0%D0%B9_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%90%D0%BA%D1%82%D0%B0%D1%88%D0%B0)",
        "image": "undefined",
        "length": "144 км",
        "pool": "1390 км²",
        "consumption": "5,17 м³/с (село Ишхой-Юрт)",
        "head": " ",
        "estuary": "Акташ",
        "location": " Россия",
        "info": "Акса́й (устар. Асагалыль, кум. Яхсайсув, в верховье Бенойясси; чечен. Яьсси) — река, протекающая по территории Ножай-Юртовского и Гудермесского районов Чечни, Ботлихского, Новолакского, Бабаюртовского и Хасавюртовского районов Дагестана. Уклон реки — 14,5 м/км.Берёт начало на северном склоне Андийского хребта. Высота истока — 2080 м над уровнем моря. Впадает в Аксайское водохранилище, которое соединено каналом с рекой Акташ. Длина составляет 144 км, площадь водосбора — 1390 км², средняя его высота — 444 м. Большая часть бассейна (87 %) расположена ниже 1000 м, 11 % территории лежит ниже отметки 0 м.Режим реки до 1994 года изучался на гидрологических постах: первоначально Ишхой-Юрт, а затем Согунты. С 2008 года организован сезонный пост при входе в Аксайское водохранилище — Чагаротар. Также в разные годы гидрологические посты размешались в сёлах Герзель-Аул, Борагангечув, Аксай и Чагаротар.Характер реки меняется с высотой — в верхнем течении она горная, а в низовьях становится равнинной. Питание Аксая в основном подземное. Река характеризуется паводочным режимом в тёплую часть года и низкой зимней меженью. Естественный водный режим ниже села Герзель-Аул искажён интенсивным забором воды на орошение."
     },
        {
        "name": "Аксай Есауловский",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BA%D1%81%D0%B0%D0%B9_%D0%95%D1%81%D0%B0%D1%83%D0%BB%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9",
        "image": "undefined",
        "length": "179 км",
        "pool": "2588 км²",
        "consumption": "38 м³/с",
        "head": " ",
        "estuary": "Цимлянское водохранилище",
        "location": " Россия",
        "info": "Акса́й Есау́ловский (Акса́й, Гнило́й Акса́й) — река в Волгоградской области России, левый приток Дона (впадает в Цимлянское водохранилище, которым затоплено нижнее течение реки). Длина 179 км, площадь водосборного бассейна 2588 км².Берёт начало в Ергенях, русло извилистое. Питание в основном снеговое. Средний расход около 38 м³/сек. Летом в верховьях пересыхает. Замерзает в начале декабря, вскрывается в середине марта. Используется для орошения.На реке расположен райцентр Октябрьского района — посёлок Октябрьский.По данным государственного водного реестра России относится к Донскому бассейновому округу, водохозяйственный участок реки — Дон от города Калач-на-Дону до Цимлянского гидроузла, без реки Чир, речной подбассейн реки — Дон между впадением Хопра и Северского Донца. Речной бассейн реки — Дон (российская часть бассейна).Аксай — типичная равнинная река с небольшим уклоном и медленным течением. Исток реки находится в Светлоярском районе Волгоградской области в районе посёлка Краснопартизанский, в пределах Ергенинской возвышенности, на высоте около 110 метров над уровнем моря. От истока река течёт преимущественно в юго-западном направлении. Ниже села Аксай река меняет направлении на субмеридиональное, по направлению к западу. Устье реки расположено на высоте 36 метров в районе хуторов Новоаксайский и Генераловский"
     },
     {
        "name": "Аксай Курмоярский",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BA%D1%81%D0%B0%D0%B9_%D0%9A%D1%83%D1%80%D0%BC%D0%BE%D1%8F%D1%80%D1%81%D0%BA%D0%B8%D0%B9",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Aksay_Kurmoyarsky.jpg/250px-Aksay_Kurmoyarsky.jpg",
        "length": "101 км",
        "pool": "1843 км²",
        "consumption": "undefined",
        "head": "Балка Уманкина",
        "estuary": "Цимлянское водохранилище",
        "location": "Россия",
        "info": "Акса́й Курмоя́рский — река на юге Европейской части России, протекает по Сарпинскому району Республики Калмыкия и Котельниковском районе Волгоградской области. Левый приток Дона, впадает в Цимлянское водохранилище.Длина реки — 101 км, площадь водосборного бассейна — 1843 км². Впадает в Цимлянское водохранилище в 397 км выше устья Дона По данным государственного водного реестра России относится к Донскому бассейновому округу, водохозяйственный участок реки — Дон от города Калач-на-Дону до Цимлянского гидроузла, без реки Чир, речной подбассейн реки — Дон между впадением Хопра и Северского Донца. Речной бассейн реки — Дон (российская часть бассейна).Аксай Курмоярский берёт начало в балке Уманкина, примерно в 20 км к юго-востоку от села Садовое Республики Калмыкия.Долина Аксая отличается относительно высокой плотностью населения. На берегах реки расположены посёлок Шарнут Республики Калмыкия, хутора Дарганов, Пимено-Черни, Нижние Черни, Караичев, Ленина, Котельников, город Котельниково, хутора Захаров и Похлебин Котельниковского района Волгоградской области.Вплоть до хутора Пимено-Черни Аксай течёт преимущественно с востока на запад, ниже меняет направление на юго-восточно-восточное, от хутора Караичев и до города Котельниково вновь течёт преимущественно с запада на восток, далее меняет направление течения на северо-западное. При впадении в Цимлянское водохранилище образует обширный залив. В среднем и нижнем течении Аксай образует многочисленные меандры, значительно увеличивающие его длину."
     },
                {
        "name": "Акстафа ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BA%D1%81%D1%82%D0%B0%D1%84%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Agstev3.JPG/250px-Agstev3.JPG",
        "length": "133 км",
        "pool": "2589 км²",
        "consumption": "8,22 м³/с",
        "head": " ",
        "estuary": "Кура",
        "location": "undefined",
        "info": "Акстафа (Агстев; арм. Աղստև, азерб. Ağstafaçay) — река в Армении и Азербайджане, правый приток Куры. Длина 133 км, площадь бассейна 2589 км².Берёт начало на территории Армении, на северо-западном склоне горы Тежлер — одной из вершин Памбакского хребта. В верховьях Агстев — горная река, текущая в узком лесистом ущелье, несколько расширяющемся у города Дилижан. Ниже протекает в более широкой долине.Средний расход воды — 8,22 м³/с, годовой сток — 256 млн м³. Воды реки используются для орошения виноградников.Крупнейшие притоки — Блдан, Сарнаджур, Воскепар, Гетик, Агдан.На реке расположены города Дилижан, Иджеван, Казах, а также два русских поселения Армении — Лермонтово и Фиолетово.По Агстевской долине когда-то проходил один из древних торговых путей Армении и Закавказья.На перевалах и в глухих ущельях, на шоссейных и просёлочных дорогах в долине реки Агстев встречаются родники, искусно оформленные мастерами-каменотёсами из розово-сиреневого камня"
     },
     {
        "name": "Аксу (приток Арыса)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BA%D1%81%D1%83_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%90%D1%80%D1%8B%D1%81%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Aksu_river_%28tributary_of_Arys%29.jpg/250px-Aksu_river_%28tributary_of_Arys%29.jpg",
        "length": "133 км",
        "pool": "766 км²",
        "consumption": "9,68 м³/с (аул Саркырама)",
        "head": " ",
        "estuary": "Арыс",
        "location": " Казахстан",
        "info": "Аксу (каз. Ақсу өзені) — река в Толебийском и Сайрамском районах Туркестанской области, левый приток реки Арыс.Длина 133 км, площадь бассейна 766 км². Начинается с ледников северных склонов Таласского Алатау, на высоте около 4000 м. В верхней течении протекает по узкой долине, в нижней части ширина долины 150—200 м, широта поймы до 40—50 м. Питание преимущественно снегово-ледниковое. Средне-годовой расход воды (у аула Саркырама) 9,68 м³/с. Вода пресная, минерализация — 0,2—0,4 г/л. В бассейне Аксу находится Аксу-Жабаглинский заповедник."
     },
     {
        "name": "Аксу (приток Тарима)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BA%D1%81%D1%83_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A2%D0%B0%D1%80%D0%B8%D0%BC%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/%D0%9F%D1%80%D0%B5%D1%81%D0%BD%D1%8F%D0%BA%D0%BE%D0%B2_%D0%9C._%D0%90._%D0%90%D1%88%D1%83%D1%82%D1%83%D0%BB%D0%BE%D1%80_%D0%B2%D0%BF%D0%B0%D0%B4%D0%B0%D0%B5%D1%82_%D0%B2_%D0%A1%D0%B0%D1%80%D1%8B-%D0%94%D0%B6%D0%B0%D0%B7.jpg/250px-%D0%9F%D1%80%D0%B5%D1%81%D0%BD%D1%8F%D0%BA%D0%BE%D0%B2_%D0%9C._%D0%90._%D0%90%D1%88%D1%83%D1%82%D1%83%D0%BB%D0%BE%D1%80_%D0%B2%D0%BF%D0%B0%D0%B4%D0%B0%D0%B5%D1%82_%D0%B2_%D0%A1%D0%B0%D1%80%D1%8B-%D0%94%D0%B6%D0%B0%D0%B7.jpg",
        "length": "282 км",
        "pool": "12 900 км²",
        "consumption": "208 м³/с",
        "head": "Ледник Семёнова",
        "estuary": "Тарим",
        "location": "undefined",
        "info": "Аксу́ (в верхнем течении Сарыджа́з (Сары-Джаз), в среднем — Кумарык; кирг. Сары-Жаз, кит. трад. 阿克苏河, пиньинь Ākèsù hé, уйг. ئاقسۇ دەرياسى) — река в Центральном Тянь-Шане, левая составляющая Тарима. Протекает по территории Иссык-Кульской области Киргизии и Синьцзян-Уйгурского автономного района Китая.Длина реки составляет 282 км. Площадь водосборного бассейна — 12 900 км². Истоки реки расположены на склонах хребтов Тескей-Ала-Тоо и Чон-Ашу-Тор.В верховьях характер течения горный, при выходе из Тянь-Шаня на Таримскую равнину становится спокойным. Средний расход воды в нижнем течении составляет 208 м³/с. Питание снего-дождевое. Половодье приходится на летний период. Воды реки орошают Аксуйский оазис в Китае.В Аксу впадает река Таушкандарья."
     },
     {
        "name": "Аксу (приток Чу)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BA%D1%81%D1%83_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A7%D1%83)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Ak-Suu_at_Jardy-Suu.jpg/250px-Ak-Suu_at_Jardy-Suu.jpg",
        "length": "155 км",
        "pool": "483 км²",
        "consumption": "4,74 м³/с",
        "head": " ",
        "estuary": "Чу",
        "location": "undefined",
        "info": "Аксу (кирг. Ак-Суу, каз. Ақсу өзені) — река в Киргизии и Казахстане, левый приток Чу.Длина 155 км, площадь бассейна 483 км². Берёт начало с северных склона Киргизского хребта. Впадает в Тасоткельское водохранилище. Имеет 5 небольших притоков общей длины 70 км. В долине реки несколько небольших озёр общей площадью 4,2 км². Питание снегово-ледниковое. Среднемноголетний расход воды равен 4,74 м³/с. Вода пресная, минерализация — 0,13—0,14 г/л.При написании этой статьи использовался материал из издания «Казахстан. Национальная энциклопедия» (1998—2007), предоставленного редакцией «Қазақ энциклопедиясы» по лицензии Creative Commons BY-SA 3.0 Unported."
     },
     {
        "name": "Аксу (река, впадает в Балхаш)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BA%D1%81%D1%83_(%D1%80%D0%B5%D0%BA%D0%B0,_%D0%B2%D0%BF%D0%B0%D0%B4%D0%B0%D0%B5%D1%82_%D0%B2_%D0%91%D0%B0%D0%BB%D1%85%D0%B0%D1%88)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Balkhash_labeled_ru.jpg/250px-Balkhash_labeled_ru.jpg",
        "length": "316 км",
        "pool": "5040 км²",
        "consumption": "11,2 м³/с (село Жансугуров)",
        "head": " ",
        "estuary": "Балхаш",
        "location": " Казахстан",
        "info": "Аксу́ — небольшая маловодная река в северной части Алматинской области Аксуского района Республики Казахстан. Длина около 316 км, площадь бассейна составляет порядка 5040 км². В переводе с казахского языка название реки означает «белая вода».Питание ледниковое, снеговое, дождевое и подземное. Берёт начало в ледниках Джунгарского Алатау высоте 3700-3800 метров над уровнем моря[источник не указан 1182 дня], далее течёт на северо-восток. При выходе из гор принимает равнинный характер, протекает по пескам Жалкум и Люккум Балхаш-Алакольской котловине, не получая притоков, но разветвляясь на теряющиеся в песках рукава, вокруг которых пролегают зелёные ленты оазисов.Далее воды реки разбираются на орошение полей и хоз. нужды. Однако в 20 км ниже по течению Аксу принимает свой главный приток — Сарканд и вновь наполняется. Впадает в залив Кукан озера Балхаш.Недалеко в озеро впадает также и река Лепсы.Дельта Аксу заболочена. Половодье наблюдается с апреля по август, максимальный сток происходит в мае — июне. Среднегодовой расход воды у райцентра Аксуского района Алматинской области, села Жансугуров, составляет порядка 11,2 м³/с.Воды Аксу отличаются высоким содержанием гидрокарбонатов и повышенной натриево-кальциевая с минерализацией с концентрацией около 450 мг/л. В бассейне часто меняющей русло реки расположено много мелких озёр-стариц, паводковых водоёмов, а также ГЭС и водохранилища общей площадью 33,1 км², которые регулируют сток реки. Паводки часто стихийны и довольно разрушительны. Прорыв плотины в Кызылагаше в соседнем бассейне реки Биен, произошедший 12 марта 2010 года, унёс жизни 43 человек."
     },
     {
        "name": "Аксу (река, впадает в Средиземное море)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BA%D1%81%D1%83_(%D1%80%D0%B5%D0%BA%D0%B0,_%D0%B2%D0%BF%D0%B0%D0%B4%D0%B0%D0%B5%D1%82_%D0%B2_%D0%A1%D1%80%D0%B5%D0%B4%D0%B8%D0%B7%D0%B5%D0%BC%D0%BD%D0%BE%D0%B5_%D0%BC%D0%BE%D1%80%D0%B5)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/%D0%90%D0%BA%D1%81%D1%83_%28%D1%80%D0%B5%D0%BA%D0%B0%2C_%D0%B2%D0%BF%D0%B0%D0%B4%D0%B0%D0%B5%D1%82_%D0%B2_%D0%A1%D1%80%D0%B5%D0%B4%D0%B8%D0%B7%D0%B5%D0%BC%D0%BD%D0%BE%D0%B5_%D0%BC%D0%BE%D1%80%D0%B5%29.jpg/250px-%D0%90%D0%BA%D1%81%D1%83_%28%D1%80%D0%B5%D0%BA%D0%B0%2C_%D0%B2%D0%BF%D0%B0%D0%B4%D0%B0%D0%B5%D1%82_%D0%B2_%D0%A1%D1%80%D0%B5%D0%B4%D0%B8%D0%B7%D0%B5%D0%BC%D0%BD%D0%BE%D0%B5_%D0%BC%D0%BE%D1%80%D0%B5%29.jpg",
        "length": "162 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Средиземное море",
        "location": " Турция",
        "info": "Аксу́ (тур. Aksu), в древности Ке́строс (греч. Κεστρoς) — река на юго-западе Турции, в провинции Анталья. Берёт начало в горах Тавр. Аксу протекает между рекой Дюден (тур. Düden Çayı) к западу и рекой Кёпрючай (тур. Köprüçay) к востоку. Название Аксу означает в переводе с турецкого «белая вода» (ak — белый, su — вода).Помпоний Мела говорит о реке как о судоходной вплоть до города Перга, расположенном в 60 стадиях от устья, по словам Страбона.Ширина Аксу — 100 м в устье реки, глубина — 3 м в пределах полосы наносов в устье, при этом река настолько мелководна в дельте, что несудоходна для лодок с осадкой более 30 см. Морской прибой, встречаясь с течением реки, даёт сильную волну.В верховьях реки находится озеро Ковада, а ниже его — водохранилище Караджаорен (Karacaören Dam).В устье реки, что в городском районе Аксу (Анталья), находится отель Mardan Palace."
     },
     {
        "name": "Алабуга (приток Нарына)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B0%D0%B1%D1%83%D0%B3%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9D%D0%B0%D1%80%D1%8B%D0%BD%D0%B0)",
        "image": "undefined",
        "length": "180 км",
        "pool": "5820 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Нарын",
        "location": " Киргизия",
        "info": "Алабуга[1] (в верховьях — Арпа[2], Джаманты[3]) (кирг. Алабуга Дарыясы) — левый приток реки Нарын в Нарынской области Кыргызстана. Длина реки насчитывает 180 километров, площадь водосборного бассейна — 5820 км²[2].Река начинается в Арпинской впадине, где получает 70 % своей воды[2]. Течёт на запад вдоль южных склонов хребта Джаманты[3]. В дальнейшем поворачивает на север[4], пересекает хребет по узкому каньону, выходит в Алабугинскую впадину и течёт по ней на протяжении 85 километров[2] в северо-восточном направлении вдоль хребтов Акшийрак[1].В низовьях реки её долина имеет ширину 2 — 4,5 километра и глубину 500—800 метров относительно неогеновых и четвертичных озёрных отложений[2]. Долина на 50-150 метров заполнена галечно-валунным аллювием, в который врезается современный каньон реки глубиной 50-130 метров и шириной до 1 километра[2]. Из-за большого уклона река имеет большую скорость врезания, в среднем 10-20 сантиметров в год[2].В IX—X веках по долине реки проходила одна из ветвей Великого Шёлкового пути[2].Основные притоки — Гуюксу (Джамандаван, пр)[5], Макмал[6] (лв), Джергетал[6] (пр), Пычан[6] (лв), Кашкасу[4] (пр), Каракал[3] (лв).Среднегодовой сток воды — 903 млн м³[2].Поселения, расположенные вдоль берегов реки Алабуга, включают Кош-Дюбе[6], Джерге-Тал[6] и Конорчок[5]."
     },
     {
        "name": "Алагнак",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B0%D0%B3%D0%BD%D0%B0%D0%BA",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Alagnak_River_Rapids.jpg/250px-Alagnak_River_Rapids.jpg",
        "length": "103 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Квичак",
        "location": " США",
        "info": "Алагнак (англ. Alagnak River) — река на юго-западе штата Аляска, США. В административном отношении протекает по территории боро Лейк-энд-Пенинсула.Берёт начало вытекая из озера Кукаклек на территории национального парка Катмай. Первые 6 миль река протекает в зоне тундры, ниже растительность сменяется на хвойные леса (главным образом ель). Долина реки постепенно сужается, на 7-14 милях своего течения Алагнак протекает через узкий каньон. На двадцатой миле своего течения принимает приток Нонвианук. В нижнем течении река меандрирует по территории полуострова Аляска. Впадает в реку Квичак, которая в свою очередь несёт свои воды в Бристольский залив Берингова моря. Длина реки составляет 103 км; площадь бассейна — приблизательно 3600 км².Благодаря большому количеству лосося, летом и осенью в районе реки имеется значительная популяция гризли и барибала. Большая часть бассейна является местом обитания карибу; встречаются также лоси. Широко распространены вдоль реки бобры, лисы, россомахи, норки, выдры и волки. В водах Алагнака встречается несколько видов лососевых, в том числе нерка, горбуша, кета, чавыча и кижуч. Водятся также микижа, гольцы, щука. Растительность вдоль берегов включает ель, иву, несколько видов ягод."
     },
     {
        "name": "Алагон ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B0%D0%B3%D0%BE%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Rio_Alagon_Sotoserrano_015.jpg/250px-Rio_Alagon_Sotoserrano_015.jpg",
        "length": "201 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Тахо",
        "location": " Испания",
        "info": "Алагон (исп. Río Alagón) — река в Испании, самый длинный приток реки Тахо. Длина реки — 201 км.[источник не указан 369 дней] Высота устья — 200 м над уровнем моря.[источник не указан 369 дней] Высота истока — 1060 м над уровнем моря.[источник не указан 369 дней]Берёт начало в провинции Саламанка на западе Испании. В верхнем и среднем течении течёт через слабозаселённые территории Кастилии. В 50 км от устья протекает через единственный город Кориа. На реке расположены 3 плотины."
     },
     {
        "name": "Алазани",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B0%D0%B7%D0%B0%D0%BD%D0%B8",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Alazani_River_2.jpg/250px-Alazani_River_2.jpg",
        "length": "351 км",
        "pool": "10 800 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Кура",
        "location": "undefined",
        "info": "Алаза́ни, Алаза́нь (груз. ალაზანი , азерб. Qanıx , авар. Алазан, чечен. Алаз, цахур. Дур) — река на востоке Грузии и западе Азербайджана, частично формирующая границу между двумя республиками. Ныне впадает в Мингечевирское водохранилище, ранее являлась одним из крупнейших левых притоков реки Куры. Длина Алазани — 351 км (по другим данным — 391 км), площадь водосбора — 10 800 км².С левой стороны она принимает множество притоков, стекающих с Главного Кавказского хребта; эти реки обильны водой и никогда не пересыхают. Малочисленные правые притоки, стекающие с Кахетинского хребта, весной представляют собой бурные потоки, а летом — пересохшие овраги. В нижнем течении на протяжении более 100 км Алазани справа не принимает ни одного притока. Бассейн реки Алазани является главным селеопасным районом Кавказа. Самый большой приток Алазани — река Иори.Другие крупные притоки Алазани — реки Катехчай, Дуруджи, Инцоба, Курмухчай (все левые)."
     },
     {
        "name": "Алазея",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B0%D0%B7%D0%B5%D1%8F",
        "image": "undefined",
        "length": "1520 км",
        "pool": "64 700 км²",
        "consumption": "320 м³/с",
        "head": "слияние рек: Кадылчан и Нелькан",
        "estuary": "Восточно-Сибирское море",
        "location": " Россия",
        "info": "Алазе́я (якут. Алаһыай) — большая река в России, протекает на северо-востоке Якутии. К востоку от Индигирки впадает в Восточно-Сибирское море.Длина реки — 1520 км (в некоторых источниках указывается длина 1590 км — вместе с левой образующей Нелькан). По разным оценкам площадь водосборного бассейна составляет от 64 700 км² до 74 700 км².Образуется слиянием рек Нелькан и Кадылчан на Алазейском плоскогорье, в верховьях на протяжении примерно 100 км от истока имеет горный характер. Далее протекает по тундре, на этом участке реки её русло сильно меандрирующее, протоками сообщается с многочисленными озёрами.Русло Алазеи извилисто; у устья река разделяется на ряд протоков, из них наиболее крупные — Логашкина и Тынялькут. Для водного режима реки характерно растянутое весенне-летнее половодье, чему, вероятно, способствует значительная озёрность её бассейна: в бассейне Алазеи расположено свыше 24 тысяч небольших озёр.К востоку от устья Индигирки впадает в Восточно-Сибирское море.Питание реки преимущественно снеговое и дождевое. Средний расход в устье 320 м³/с. Река замерзает в конце сентября — начале октября, обычно полностью перемерзает с середины декабря до середины мая, вскрывается в конце мая — начале июня."
     },
      {
        "name": "Алакит",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B0%D0%BA%D0%B8%D1%82",
        "image": "undefined",
        "length": "232 км",
        "pool": "11 800 км²",
        "consumption": "undefined",
        "head": "Алакит-Кюёль",
        "estuary": "Оленёк",
        "location": " Россия",
        "info": "Алакит — река в России, протекает по территории Якутии. Правый приток реки Оленёк. Длина реки — 232 км, площадь водосборного бассейна — 11800 км².Протекает по северо-восточной окраине Среднесибирского плоскогорья. В верхней части реки на ней расположен одноимённый нежилой посёлок Алакит.Вытекает из озёр Алакит-Кюёль на высоте 628 м над уровнем моря."
     },
     {
        "name": "Алакнанда",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B0%D0%BA%D0%BD%D0%B0%D0%BD%D0%B4%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Devprayag_Bhagirathi_Alaknanda_01.jpg/250px-Devprayag_Bhagirathi_Alaknanda_01.jpg",
        "length": "240 км",
        "pool": "10 237 км²",
        "consumption": "до 3000 м³/с",
        "head": "Гималаи",
        "estuary": "Ганг",
        "location": " Индия",
        "info": "Алакнанда (устар.: Алакнанда-Ганга, Алакананда; хинди अलकनन्दा नदी, англ. Alaknanda) — река в Гималаях. Находится в индийском штате Уттаракханд, меньшая из двух рек (с Бхагиратхи), которые при слиянии формируют реку Ганг. Длина реки оценивается 229 или 240 км. Площадь речного бассейна составляет 10237 км². Исток находится в горах на высоте 3800 м над уровнем моря. Верховье реки протекает через узкие и глубокие ущелья. Левыми притоками являются реки Сарасвати, Дхаулиганга, Гарунганга, Паталганга, Бирехиганга, Нандакини и Пиндар, а правым — Мандакини.Питание реки преимущественно за счет таяния снега и льда двух ледников Сатопантх и Бхагиратх-Карак, а также муссонных дождей. Осадки выпадают с июля по сентябрь, их количество от 1000 до 1600 мм. В течение сезона наблюдаются большие перепады расхода воды, минимальное значение составляет 85 м³/с, максимальное — 3000 м³/с. Максимальный сток приходится на период с июня по сентябрь.Материнские породы в бассейне реки представлены осадочными и сильно метаморфизованными гнейсовидными породами. В верхнем течении выходят на поверхность мигматизированные и гранитизированные отложения архейского периода. В среднем течении после выхода с кристаллического щита река проходит сквозь известняковые, мраморные и кварцитные отложения формаций Теджам и Беринаг. В нижнем течении преобладают известняки и доломитсодержащие породы формации Уттаркаши и выходы филлитовых и слюдистых граувакков формации Чандпур."
     },
      {
        "name": "Аламбай",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B0%D0%BC%D0%B1%D0%B0%D0%B9",
        "image": "undefined",
        "length": "140 км",
        "pool": "1960 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Чумыш",
        "location": " Россия",
        "info": "Аламбай (в верховье — Степной Аламбай) — река в Заринском районе Алтайского края России.Длина реки — 140 км.[источник не указан 603 дня] Площадь водосборного бассейна — 1960 км².[источник не указан 603 дня]Берёт своё начало в низкогорье Салаирского кряжа, впадает в реку Чумыш справа, у восточной окраины города Заринск.В верхнем течении Аламбай представляет собой типично горную реку, с многочисленными перевалами и перекатами. Нижнее течение спокойное. Река покрыта льдом с начала ноября до начала апреля.По данным государственного водного реестра России относится к Верхнеобскому бассейновому округу, водохозяйственный участок реки — Чумыш, речной подбассейн реки — Обь от впадения Чулыма без Томи. Речной бассейн реки — (Верхняя) Обь до впадения Иртыша."
     },
     {
        "name": "Алатна (река)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B0%D1%82%D0%BD%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Alatna.jpg/250px-Alatna.jpg",
        "length": "300 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "Круглое",
        "estuary": "Коюкук",
        "location": " США",
        "info": "Алатна (англ. Alatna) — река, протекающая по одноименной статистически обособленной местности на Юкон-Коюкуке, штат Аляска, США. Река представляет собой большую туристическую важность, поскольку благодаря своему относительно спокойному течению, открывается возможность полюбоваться окружающими пейзажами, что включают в себя весьма обширные территории нетронутой арктической природы, часть из которых входят в состав национального заповедника «Гейтс-оф-те-Арктик»[1][2].Первое упоминание реки под названием Алатна состоялось в 1909 году, когда Филипп Смит после её исследования и общения с эскимосами внес её на карту. При этом, в оригинале языка местных племен её название звучит, как «Arrigetch» — «палец вытянутой руки». Когда в 1929 году в эту местность прибыл исследователь Роберт Маршал, то на берегу он обнаружил лишь две деревни коренного населения — Алатна и Аллакакет. Две культуры пересеклись на берегах реки: на севере эскимосов племени Кувуунгмиит (англ. Kuvuungmiit), а на юге — англ. Koyukukhotana Athapaskans [3].Река Алатна расположена на территории штата Аляска, исток которой находится на озере Круглое у центрального хребта Брукс. Первые шестьдесят километров водного потока проходится на скалистую местность и довольно маловодная. Далее река начинает разливаться сильнее и протекает через горы Эндикотта, пик Арригетч, озеро Такахула и холмы Хелпмиджек. Последняя часть реки проходит вдоль холмов Алатна и затем впадает в реку Койукук. Общая протяжённость реки составляет около 300 км. Особенностью реки, помимо прозрачности воды I и II класса, является её извилистость[4]. При этом Алатна имеет очень равномерное течение, поэтому давно завоевала популярность среди путешественников, любящих сплавляться[5]. Часть реки Аланта протекает через территорию Национального парка Гейтс-оф-те-Арктик, или «Ворота Арктики», который особенный тем, земли, входящие в его состав, полностью располагаются за полярным кругом[3]."
     },
     {
        "name": "Алатырь ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B0%D1%82%D1%8B%D1%80%D1%8C_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Rator_lej_Ordanjbye.jpg/250px-Rator_lej_Ordanjbye.jpg",
        "length": "296 км",
        "pool": "11 200 км²",
        "consumption": "42,6 м³/с",
        "head": " ",
        "estuary": "Сура",
        "location": " Россия",
        "info": "Ала́тырь (чуваш. Улатăр, эрз. Ратор) — река в России, протекает в Нижегородской области, Мордовии и Чувашии. Устье находится в 277 км от устья по левому берегу Суры. Длина — 296 км, площадь бассейна — 11,2 тыс. км².Исток примерно в 10 км западнее города Первомайска. Генеральное направление течения — восток. В верховьях образует границу между Нижегородской областью и Мордовией, затем течёт по территориям Первомайского, Лукояновского и Починковского районов Нижегородской области, Ичалковского и Ардатовского районов Мордовии, нижнее течение находится в Алатырском районе Чувашии. Впадает в Суру на северных окраинах города Алатыря.Река протекает по северной части Приволжской возвышенности, по лесистой местности. Основные лесные массивы расположены по левому берегу. Правый берег ниже села Мадаево почти безлесен.Долина реки плотно заселена, на берегах реки расположено множество населённых пунктов, крупнейшие из которых города Алатырь (Чувашия) и Ардатов (Мордовия); посёлок городского типа Тургенево (Мордовия); крупные сёла Ахматово (Чувашия), Каласево, Луньга, Луньгинский Майдан, Тарханово, Береговые Сыреси, Новые Ичалки, Кемля, Кергуды, Гуляево и Кендя (Мордовия), Кочкурово, Ильинское, Байково, Пузская Слобода, Мадаево, Новомихайловка, Шутилово и Обухово (Нижегородская область)."
     },
      {
        "name": "Алаш ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B0%D1%88_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "172 км",
        "pool": "4630 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Хемчик",
        "location": " Россия",
        "info": "Ала́ш (в верховье Чульча) — река в России, течёт по территории Барун-Хемчикского, Бай-Тайгинского и Сут-Хольского кожуунов Республики Тыва. Левый приток Хемчика. Длина реки составляет 172 км, площадь водосборного бассейна — 4630 км². Нижнее течение реки проходит по Алашскому плато.По данным государственного водного реестра России относится к Енисейскому бассейновому округу. Речной бассейн озера — Енисей, речной подбассейн озера — Енисей между слиянием Большого и Малого Енисея и впадением Ангары, водохозяйственный участок озера — Енисей от истока до Саяно-Шушенского гидроузла.Код объекта в государственном водном реестре — 17010300112116100009277."
     },
          {
        "name": "Алгама",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B3%D0%B0%D0%BC%D0%B0",
        "image": "undefined",
        "length": "426 км",
        "pool": "21 500 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Гонам",
        "location": " Россия",
        "info": "Алгама́ (устар. Алгома, якут. Алгама) — река в Якутии и Хабаровском крае России, правый приток Гонама, бассейн Алдана и Лены. Название реки происходит из эвенкийского, в котором «алга» означает благословение.По правому берегу реки проходит железная дорога Улак — Эльга к Эльгинскому месторождению каменного угля. Летом используется для сплавов туристами.Длина реки — 426 км, площадь бассейна — 21 500 км². Берёт начало с северных склонов Станового хребта. Высота истока — 1200 м над уровнем моря. Течёт в северо-восточном направлении по Алданскому нагорью, впадает в Гонам в 3,5 км от места его впадения в Учур. По всей длине имеет черты горной реки, в нижнем течении достигает ширины 100—150 м. Высота устья — 289 м над уровнем моря.Река принимает 47 притоков длиной более 10 км, основной — река Идюм, впадает справа. В бассейне реки около 1500 озёр, крупнейшим из них является озеро Большое Токо тектонически-ледникового происхождения площадью 85,2 км². Острова на Алгаме редки, в основном встречаются в нижнем течении.Питание Алгамы дождевое и снеговое. Вскрывается от льда в конце мая, замерзает в конце октября. Среднегодовой расход воды в значительной степени непостоянен и сильно зависит от количества осадков в пределах бассейна. При сильных дождях в летний период уровень воды в реке может подниматься на несколько метров в течение нескольких часов.[источник не указан 383 дня]"
     },
     {
        "name": "Алгети",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B3%D0%B5%D1%82%D0%B8",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Algeti_River.jpg/250px-Algeti_River.jpg",
        "length": "108 км",
        "pool": "763 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Кура",
        "location": " Грузия",
        "info": "Алгети (груз. ალგეთი) — река в южной части Грузии, приток Куры. Крупнейшая река края Квемо-Картли, основные притоки — Дахвисхеви и Гударехисцкали. На реке расположено Алгетское водохранилище. Длина реки — 108 км. Площадь водосборного бассейна — 763 км².[источник не указан 960 дней]В долине реки, недалеко от истока, находится Алгетский национальный парк, раскинувшийся на северных склонах Триалетского хребта и занимающий площадь 6822 га. На реке также расположен город Марнеули.Переводится с армянского как «солёная река» (Ał get)."
     },
     {
        "name": "Алдан ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B4%D0%B0%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/%D0%A0%D0%B5%D0%BA%D0%B0_%D0%90%D0%BB%D0%B4%D0%B0%D0%BD_%D0%B2_%D0%A2%D0%BE%D0%BC%D0%BC%D0%BE%D1%82%D0%B5.JPG/250px-%D0%A0%D0%B5%D0%BA%D0%B0_%D0%90%D0%BB%D0%B4%D0%B0%D0%BD_%D0%B2_%D0%A2%D0%BE%D0%BC%D0%BC%D0%BE%D1%82%D0%B5.JPG",
        "length": "2273 км",
        "pool": "729 000 км²",
        "consumption": "5245,85 м³/с (151 км от устья)",
        "head": " ",
        "estuary": "Лена",
        "location": " Россия",
        "info": "Алда́н — река на Дальнем Востоке России, крупнейший правый приток Лены. Самая многоводная река-приток в России и шестая по объёму стока среди всех российских рек. Протекает в Якутии, водосбор также включает северо-западную часть Хабаровского края. Длина реки — 2273 км, площадь водосборного бассейна — 729 тыс. км².Предполагается, что слово Алдан имеет тунгусское происхождение и связано с обозначением рыбы. Другое объяснение: алдан — береговая весенняя наледь (эвенк.).Бассейн Алдана расположен в зоне развития многолетней мерзлоты и неглубокого залегания коренных кристаллических пород. Река берёт начало на северном склоне Станового хребта. В пределах Алданского нагорья течёт в каменистом русле со множеством перекатов. Между устьями Учура и Маи протекает по широкой долине, далее — по межгорной равнине. В пойме расположены многочисленные озера. В нижнем течении река дробится на ряд рукавов. Впадает в Лену в 1311 км от её устья.Питание снеговое и дождевое. Половодье наблюдается с мая по июль, когда уровень воды повышается на 7—10 м, а расход достигает 30—48 тыс. м³/с. Паводки наблюдаются также в августе и сентябре. Зимний расход мал (4 % годового), в феврале-апреле обычно не превышает 230—300 м³/с. Ледостав длится около семи месяцев, замерзание начинается в конце октября, вскрытие — в мае. Вода по химическому составу гидрокарбонатно-кальциевая, максимальное содержание растворённых солей до 0,3 г/л (в зимнюю межень)."
     },
     {
        "name": "Алдома ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B4%D0%BE%D0%BC%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Maya%28riv%29.png/250px-Maya%28riv%29.png",
        "length": "118 км",
        "pool": "3440 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Охотское море",
        "location": " Россия",
        "info": "Алдо́ма — река в Аяно-Майском районе Хабаровского края России.Длина реки — около 118 км. Площадь водосборного бассейна — 3440 км². Впадает в бухту Алдома Охотского моря.В устье находится монтёрский пункт Алдома.По данным государственного водного реестра России и геоинформационной системы водохозяйственного районирования территории РФ, подготовленной Федеральным агентством водных ресурсов:"
     },
     {
        "name": "Алей ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B5%D0%B9_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/%D0%90%D0%BB%D0%B5%D0%B9_%D0%B2_%D0%90%D0%BB%D0%B5%D0%B9%D1%81%D0%BA%D0%BE%D0%BC_%D1%80%D0%B0%D0%B9%D0%BE%D0%BD%D0%B5.jpg/250px-%D0%90%D0%BB%D0%B5%D0%B9_%D0%B2_%D0%90%D0%BB%D0%B5%D0%B9%D1%81%D0%BA%D0%BE%D0%BC_%D1%80%D0%B0%D0%B9%D0%BE%D0%BD%D0%B5.jpg",
        "length": "858 км",
        "pool": "21 100 км²",
        "consumption": "33,8 м³/с",
        "head": " ",
        "estuary": "Обь",
        "location": " Россия",
        "info": "Але́й (в верховье — Восточный Алей) — река в Алтайском крае России, левый приток Оби.Длина — 858 км (без Восточного Алея — 828 км), площадь водосборного бассейна — около 21 100 км². Впадает в Обь на 3461 километре от её устья, в 4 км к северо-востоку от села Усть-Алейка). Самая длинная река Алтайского края.По характеру долины и руслу река делится на три части:В верховьях Алей протекает в отрогах Тигирецкого хребта на высоте 810 метров над уровнем моря и Колыванского хребта, в среднем и нижнем течении — по Приобскому плато вдоль ложбины древнего стока.В верховьях, до впадения реки Глубокой, Алей представляет полугорный поток со средним уклоном в межень 10,9 %. Русло узкое, каменистое, не разветвлённое. На втором и третьем участке река представляет собой меандрирующий по пойме поток шириной 25—40 м, её уклон резко уменьшается (1,47—0,88 %). Для всей верхней части характерны значительные скорости течения. На втором и третьем участках наблюдаются интенсивные русловые деформации.Высота устья — 136 м над уровнем моря.Ширина долины в верхнем течении на участке от села Староалейского до села Локоть достигает 3—5 км. Правый склон крутой, расчленён долинами притоков, логами и балками; левый склон большей частью обрывистый. Высота берегов достигает 10—13 м. Ниже села Локоть долина достигает 5—8 км ширины."
     },
                   {
        "name": "Алеун",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B5%D1%83%D0%BD",
        "image": "undefined",
        "length": "207 км",
        "pool": "2340 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Томь",
        "location": " Россия",
        "info": "Алеу́н — река в Амурской области России, левый приток Томи.Предположительно название реки произошло от эвенкийского алаён — «летовье».Река берёт начало на западных склонах хребта Турана и является водоразделом между ним и Алеунским хребтом. Протекает по заболоченной территории. Русло извилистое, течение медленное. Населённых пунктов на реке Алеун нет. Впадает в реку Томь в северной части Зейско-Буреинской равнины. Высота устья около 200 метров над уровнем моря.Длина — 207 км, площадь водосборного бассейна — 2340 км².По данным государственного водного реестра России относится к Амурскому бассейновому округу, речной бассейн реки Амур, речной подбассейн реки — Зея, водохозяйственный участок реки — Зея от впадения р. Селемджи до устья.Код объекта в государственном водном реестре — 20030400412118100040579.Объекты перечислены по порядку от устья к истоку."
     },
                   {
        "name": "Алима ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B8%D0%BC%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Alima_-_Congo.JPG/250px-Alima_-_Congo.JPG",
        "length": "500 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Конго",
        "location": " Республика Конго",
        "info": "Алима́ (устар. Альима; в верхнем течении — Лекети) — река в Центральной Африке, правый приток Нижнего Конго.Протекает в Республике Конго, по территории департаментов Кювет и Плато. Начинается на границе департаментов Лекуму и Плато, к западу от города Джамбала на плоской возвышенности Акакуе, проходит через бывшие колониальные французские станции Диелэ, Альиму и Лекати и оканчивается по ту сторону Монпуренюи. В верховье Алима отличается быстротой течения, но начиная от Лекати судоходна. С правой стороны в Алиму впадают в верхнем течении Лекети и Парма, а в нижнем — Мпама.Длина реки 500 км судоходна на протяжении 320 км. Воды реки характеризуются низким уровнем pH, высоким содержанием органики, низким содержанием неорганических веществ.Река Алима была открыта в 1878 году Пьером Саворньяном де Бразза, основавшим посты Диелэ и Алиму.По верхнему её течению живут батеки, по среднему и нижнему — убанги."
     },
          {
        "name": "Аллагаш",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%BB%D0%B0%D0%B3%D0%B0%D1%88",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Allagash_River_2003.jpg/250px-Allagash_River_2003.jpg",
        "length": "105 км",
        "pool": "3831 км²",
        "consumption": "undefined",
        "head": "Озеро Черчилл",
        "estuary": "Сент-Джон",
        "location": " США",
        "info": "Аллагаш (англ. Allagash River) — река в штате Мэн, правый приток реки Сент-Джон.Длина реки составляет 105 км, площадь бассейна реки — 3831 км². Средний сток реки равен 56 м³/сек, максимальный сток — 1160 м³/сек. Высота истока — 283 м над уровнем моря. Высота устья — 180 м над уровнем моря.[источник не указан 769 дней]Аллагаш берёт начало в озере Черчилл (ранее называлось Херон) в округе Пискатакис, течёт в общем направлении на северо-восток через цепь естественных озёр, впадает в реку Сент-Джон южнее посёлка Аллагаш, близ государственной границы с Канадой. Большая часть течения реки и её устье находится на территории округа Арустук.До 1841 года сток из озёр Аллагаш, Чеймберлин и Телос шёл по реке Аллагаш, но после строительства плотины Телос у озера Чеймберлин и канала Кат сток из этих озёр перенаправлен в систему реки Пенобскот. Это позволило осуществлять сплав леса к атлантическому побережью штата, но в наши дни существование этой плотины вызывает неоднозначную оценку.Так как Аллагаш протекает по местам почти не тронутым рукой человека, то в летнее время по реке часто сплавляются каноисты. В 1857 году известный американский писатель и аболиционист Генри Дэвид Торо вместе со своими друзьями совершил на каноэ путешествие к верховьям реки (к озеру Херон); впечатления от этого путешествия легли в основу его рассказа «Аллагаш и Восточный рукав», который был опубликован уже после его смерти."
     },
          {
        "name": "Аллах-Юнь ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%BB%D0%B0%D1%85-%D0%AE%D0%BD%D1%8C_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Aldan.png/250px-Aldan.png",
        "length": "586 км",
        "pool": "24 200 км²",
        "consumption": "169 м³/с",
        "head": "Ампарынджа",
        "estuary": "Алдан",
        "location": " Россия",
        "info": "Алла́х-Юнь (якут. Ааллаах-Үүн) — река в Якутии и Хабаровском крае, правый приток Алдана.Длина реки — 586 км, площадь водосборного бассейна — 24 200 км². Вытекает из озера Ампарынджа в горах к юго-востоку от Верхоянского хребта на границе Хабаровского края и Якутии, далее Аллах-Юнь течёт по северо-западной окраине Юдомо-Майского нагорья, образуя глубокую и узкую долину, в низовье выходит на равнину, где течение реки приобретает спокойный характер.Питание снеговое и дождевое. Весной уровень воды поднимается на 3—5 м. Продолжительность ледостава около 200 дней. Среднегодовой расход воды — 169 м³/с.Главные притоки: Анча (левый) и Сахара (правый).В бассейне реки — золотоносные россыпи. Населённые пункты (сверху вниз) — Аллах-Юнь, Звёздочка, Солнечный, Усть-Ыныкчан."
     },
     {
        "name": "Аллегейни ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%BB%D0%B5%D0%B3%D0%B5%D0%B9%D0%BD%D0%B8_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Freeport_bridge.jpg/250px-Freeport_bridge.jpg",
        "length": "516 км",
        "pool": "30 300 км²",
        "consumption": "559 м³/с",
        "head": " ",
        "estuary": "Огайо",
        "location": " США",
        "info": "Аллеге́йни (Аллегани; англ. Allegheny River) — река в Северной Америке, исток реки Огайо. Длина реки — 516 км, площадь бассейна — 30 300 км². Средний расход воды — 559 м³/с.Аллегейни начинается в округе Поттер штата Пенсильвания (США), в горах Аппалачи (Аллеганское плато), на высоте 410 метров, вблизи озера Жин и Сускеганны; она поворачивает сначала к северо-востоку на территорию штата Нью-Йорк, где она принимает Гриет-Валли-Эрик и касается Олина; затем, изгибаясь к юго-западу, возвращается в Пенсильванию и при Питтсбурге соединяется с Мононгахилой, которой она уступает по ширине, но превосходит её по количеству воды и быстроте течения; обе реки вместе образуют здесь широкую, в 540 м, реку Огайо (Огио).На протяжении 416 километров, до Олина, Аллегейни судоходна для лодок, на протяжении 320 км — для небольших пароходов.Канал, ведущий от Олина до канала Эри, поддерживает важное сообщение Аллегейни с озером Онтарио, Гудзоновой рекой и Нью-Йорком.Важнейшие города по берегам Аллегейни: Олеан, Уоррен, Ойл-Сити, Франклин, Нью-Кенсингтон и Питтсбург."
     },
     {
        "name": "Аллер",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%BB%D0%B5%D1%80",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Aller_Vorsfelde.jpg/250px-Aller_Vorsfelde.jpg",
        "length": "263 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Везер",
        "location": " Германия",
        "info": "А́ллер (нем. Aller) — река в Германии, правый приток Везера, протекает по территории Нижней Саксонии и Саксонии-Анхальта. Длина реки составляет 263 км. Половодье весной.Берёт начало на возвышенности Бёрде близ Зехаузена, в 30 км к западу от Магдебурга, на высоте всего 156 м над уровнем моря. Течёт на северо-запад по широкой долине, в болотистой части которой восточнее Вольфсбурга создан национальный биосферный заповедник Дрёмлинг. Пересекается с Среднегерманским каналом. На последних 117 км, от города Целле до устья, Аллер судоходная. На Аллере расположены города Вольфсбург, Целле и Ферден.Притоки: Окер, Фузе, Вице, Лайне, Изе, Лахте, Эрце, Беме."
     },
              {
        "name": "Алоля",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%BE%D0%BB%D1%8F",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Rivers_Alol.JPG/250px-Rivers_Alol.JPG",
        "length": "105 км",
        "pool": "860 км²",
        "consumption": "undefined",
        "head": "Арно",
        "estuary": "Великая",
        "location": " Россия",
        "info": "Алоля (Алоль) — река в Псковской области России.Исток реки расположен на Бежаницкой возвышенности (озеро Арно) на территории Болгатовской волости Опочецкого района, а далее течёт по Кудеверской волости Бежаницкого района. Затем погранично по территориям Опочецкого района (Глубоковская волость) и Пустошкинского района (Щукинская и Алольская волости).Протекает через несколько озёр, крупнейшими из которых являются Кудеверское и Бардово. В 29 км от устья по левому берегу впадает река Ципилянка.Устье реки находится в Пустошкинском районе Псковской области в 323 км по правому берегу реки Великая, возле деревни Усохи. Длина реки — 105 км, площадь водосборного бассейна — 860 км².По данным государственного водного реестра России относится к Балтийскому бассейновому округу, водохозяйственный участок реки — Великая. Относится к речному бассейну реки Нарва (российская часть бассейна).Код объекта в государственном водном реестре — 01030000112102000027727."
     },
     {
        "name": "Алсек",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D1%81%D0%B5%D0%BA",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Confluence_of_Alsek_and_Tatshenshini_rivers2.JPG/250px-Confluence_of_Alsek_and_Tatshenshini_rivers2.JPG",
        "length": "250 км",
        "pool": "undefined",
        "consumption": "324 м³/с",
        "head": " ",
        "estuary": "Аляска",
        "location": "",
        "info": "Алсек (англ. Alsek River) — река на северо-западе Северной Америки. Течёт по территории Юкон, по провинции Британская Колумбия в Канаде, а также и по штату Аляска США. Впервые нанесена на карту в 1852 году русским гидрографом Михаилом Тебеньковым.. Средний расход воды — 324 м³/с.[источник не указан 962 дня]Питаясь от огромных ледников гор Святого Ильи, второго по величине в мире прибрежного горного хребта, река берет своё начало в национальном парке Клуэйн, в юго-западном углу территории Юкон в окружении величественных гор, сияющих ледников и широких долин. Началом реки считается место слияния трёх стекающих с ледников рек: Дизадеш (Dezadeash), Каскавалш (Kaskawulsh) и Дасти (Dusty) на высоте 600 м. При слиянии образуется широкое водное кружево из переплетающихся рукавов длиной 16 км, затем следует 74 км стремнин, каньонов, ледников, и плавающих айсбергов. Река течёт на юг в северо-западный угол Британской Колумбии, где на территории провинциального парка Татшеншини-Алсек с ней сливается река Татшеншини. Свой последний участок река проходит по территории США и впадает в залив Драй-Бей южнее Якутат и приносит много ила и наносов. Длина реки составляет около 250 км. Самое опасное место на реке — Каньон Тёрнбэк (Turnback Canyon) — считается несудоходным и сплав через него очень опасен, то тем не менее опытные и квалифицированные каноисты рискуют преодолевать его."
     },
       {
        "name": "Алтата ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D1%82%D0%B0%D1%82%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "142 км",
        "pool": "3780 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Большой Узень",
        "location": " Россия",
        "info": "Алтата (Алтыата) — река в России, протекает в Дергачёвском и у устья в Ершовском районах Саратовской области. Устье реки находится в 541 км по левому берегу реки Большой Узень напротив села Осинов Гай. Длина реки составляет 142 км, ширина в среднем и нижнем течении — до 65 м, глубина — более 4 метров. Площадь водосборного бассейна — 3780 км². Имеет чрезвычайно извилистое русло.Основные притоки: Турмак, Камышлейка, Камышевка, Чёрненькая и Песчанка.На берегу реки расположены населённые пункты: Петропавловка, Дергачи, Советский.По данным государственного водного реестра России относится к Уральскому бассейновому округу, водохозяйственный участок реки — Большой Узень. Речной бассейн реки — Бассейны рек Малый и Большой Узень (российская часть бассейнов).Код объекта в государственном водном реестре — 12020000212112200000411."
     },
     {
        "name": "Алтаэльв",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D1%82%D0%B0%D1%8D%D0%BB%D1%8C%D0%B2",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Altaelva_canyon.JPG/250px-Altaelva_canyon.JPG",
        "length": "229 км",
        "pool": "8963 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Алта-фьорд",
        "location": " Норвегия",
        "info": "Алтаэльв[1] (норв. Altaelva, сев.‑саам. Álttáeatnu) — река в Норвегии, впадает в Алта-фьорд (акватория Норвежского моря).Находится в муниципалитете (коммуне) Алта фюльке Финнмарк . Протекает в одном из крупнейших каньонов Европы.Длина реки составляет 229 км. Площадь её водосборного бассейна — 8963 км². На реке в 1970-х годах была построена гидроэлектростанция."
     },
     {
        "name": "Алфиос",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D1%84%D0%B8%D0%BE%D1%81",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/112Alpheos_rivier.jpg/250px-112Alpheos_rivier.jpg",
        "length": "112 км",
        "pool": "3600 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": " ",
        "location": " Греция",
        "info": "Алфио́с, Алфе́й (греч. Αλφειός, др.-греч. Ἀλφειός, лат. Alpheus) — река в Греции. Алфиос и Эвротас — крупнейшие реки на Пелопоннесе. Длина реки — 112 (110) километров, это самая длинная река на Пелопоннесе. Площадь водосборного бассейна — 3600 квадратных километров. Исток находится у западного подножия Парнона в Аркадии, к югу от Триполиса. Течёт на юг до Мегалополис, затем поворачивает и течёт в северо-западном направлении к древней Герее, поворачивает на запад, течёт через Элиду и впадает мимо Олимпии в северную часть залива Кипарисиакос Ионического моря.Стремительная в Аркадии река становится в Элиде более спокойной. Крупнейшие притоки — правые: Ладон и Эримантос. Более мелкие притоки также правые: Энипеас, Лусиос (Гортиний), Кладеос  (англ.) рус. и другие. Левые притоки: Карнион, Селинус, Ахерон и другие.Алфиос и Кладеос ограничивают с юга и запада священный участок (Алтис) в Олимпии.Река переносит огромное количество отложений, которые образовали обширную аллювиальную равнину и озера, бывшие ранее морскими лагунами: Кайафа и Агулиница, эстуарий сместился на четыре километра с античных времён. В 1962 году построена плотина и мост на реке у села Флокас и создано одноимённое водохранилище для орошения, а с 2010 года — гидроэлектростанция."
     },
     {
        "name": "Алчан (приток Бикина)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D1%87%D0%B0%D0%BD_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%91%D0%B8%D0%BA%D0%B8%D0%BD%D0%B0)",
        "image": "undefined",
        "length": "170 км",
        "pool": "3860 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Бикин",
        "location": " Россия",
        "info": "Алча́н — река в Приморском крае России.Берёт начало на западных склонах безымянной горной гряды, которая относится к западной части горной системы Сихотэ-Алиня. Впадает в реку Бикин справа, в 52 км от её устья, на административной границе Приморского и Хабаровского края.Алчан — самый большой приток реки Бикин.Длина реки 170 км, площадь бассейна 3860 км², общее падение реки 304 м. Ширина её до 60 м, глубина достигает от 0,3 до 2 м.Основные притоки реки: Улитка, Правая, Левая, Широкая.В летнее время часты паводки, вызываемые интенсивными продолжительными дождями.Единственный населённый пункт на реке — село Верхний Перевал Пожарского района."
     },
     {
        "name": "Алчедат (приток Золотого Китата)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D1%87%D0%B5%D0%B4%D0%B0%D1%82_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%97%D0%BE%D0%BB%D0%BE%D1%82%D0%BE%D0%B3%D0%BE_%D0%9A%D0%B8%D1%82%D0%B0%D1%82%D0%B0)",
        "image": "undefined",
        "length": "116 км",
        "pool": "1060 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Золотой Китат",
        "location": " Россия",
        "info": "Алчедат (в верховье Большой Алчедат) — река в Кемеровской области России. Протекает по территории Чебулинского, Ижморского, и Яйского районов. Устье реки находится в 8 км от устья по правому берегу реки Золотой Китат.Длина реки составляет 116 км, площадь водосборного бассейна — 1060 км².По данным государственного водного реестра России:"
     },
      {
        "name": "Алымка (приток Боровой)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D1%8B%D0%BC%D0%BA%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%91%D0%BE%D1%80%D0%BE%D0%B2%D0%BE%D0%B9)",
        "image": "undefined",
        "length": "235 км",
        "pool": "4050 км²",
        "consumption": "undefined",
        "head": "Андреевское",
        "estuary": "Боровая",
        "location": " Россия",
        "info": "Алымка — река в России, протекает по Тюменской области. Устье реки находится в 11 км по левому берегу реки Боровая. Длина реки составляет 235 км. Площадь водосборного бассейна — 4050 км².(км от устья)По данным государственного водного реестра России относится к Иртышскому бассейновому округу, водохозяйственный участок реки — Иртыш от впадения реки Тобол до города Ханты-Мансийск (выше), без реки Конда, речной подбассейн реки — бассейны притоков Иртыша от Тобола до Оби. Речной бассейн реки — Иртыш.Код объекта в государственном водном реестре — 14010700112115300013210."
     },
           {
        "name": "Альдикон",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D1%8C%D0%B4%D0%B8%D0%BA%D0%BE%D0%BD",
        "image": "undefined",
        "length": "183 км",
        "pool": "2780 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Селемджа",
        "location": " Россия",
        "info": "Альдикон — река в Амурской области России, левый приток Селемджи.Исток — в 12 км к северо-западу от станции «Исикан» Дальневосточной железной дороги. Протекает по территории Мазановского и Селемджинского районов по равнине в подзоне тайги. Устье — ниже села Норск. Длина — 183 км, площадь водосборного бассейна — 2780 км².В 2002 году в бассейне реки был создан заказник — Государственное природное водно-болотное угодье областного значения «Альдикон» — с целью сохранения и восстановления ценных природных комплексов, ресурсов животного и растительного мира, редких и исчезающих видов животных и растений и их генофонда.Предположительно название реки произошло от эвенкийского альдун — «каменистое дно».По данным государственного водного реестра России относится к Амурскому бассейновому округу, речной бассейн реки Амур, речной подбассейн реки — Зея, водохозяйственный участок реки — Селемджа.Код объекта в государственном водном реестре — 20030400312118100038379.(расстояние от устья)"
     },
     {
        "name": "Алье ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D1%8C%D0%B5_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Brioude_pont.JPEG/250px-Brioude_pont.JPEG",
        "length": "421 км",
        "pool": "14 321 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Луара",
        "location": " Франция",
        "info": "Алье́ (фр. Allier) — река в Центральной Франции, один из крупных притоков Луары. Длина 421 км, средний расход воды 140 м³/с. Площадь бассейна 14321 км².Река Алье с зимним паводком, с декабря по март включительно максимум в январе-феврале. Самый низкий уровень воды в реке летом, в период с июля по сентябрь включительно. Её источник находится в Центральном массиве. Она течёт в целом по направлению на север. На Алье стоит Мулен — столица одноимённого реке французского департамента.Река Алье для южной части Европы уникальна тем, что пресноводный хариус здесь встречается в естественной среде обитания."
     },
                   {
        "name": "Альтмюль",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D1%8C%D1%82%D0%BC%D1%8E%D0%BB%D1%8C",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Panorama_altmuehltal6.jpg/250px-Panorama_altmuehltal6.jpg",
        "length": "220 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Дунай",
        "location": " Германия",
        "info": "А́льтмюль (нем. Altmühl) — река в Германии, левый приток реки Дунай. Свои истоки река берёт на севере гряды Франкенхёэ. Общая протяжённость составляет 220 км из которых только 30 км пригодны для судоходства. Соединена Людвигс-каналом и каналом Рейн — Майн — Дунай с системой реки Майн. В долине реки Альтмюль расположен одноимённый природный парк.У города Дольнштайна от долины реки на юг ответвляется другая долина, представляющая собой прежнее русло Прадуная. Река внезапно изменила своё направление после образования астроблемы, вызванной падением метеорита около 15 млн лет тому назад.Название реки связывают с локализованным у её устья кельтским поселением, в источнике II века упомянутым как Αλχιμοεννίς. Вероятно, данный топоним происходит от индоевропейского *aleq- («защищать», «охранять», «ограждать») и кельтского *moniio («горы»), что позволяет толковать его как «поток, который кончается у защитной гряды». Впрочем, согласно другой версии, вторая часть названия имеет значение «поток» или «река». Начиная с XII века, вторая часть топонима интерпретируется как «мельница», от средневерхненемецкого mül, müle."
     },
           {
        "name": "Альякмон",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D1%8C%D1%8F%D0%BA%D0%BC%D0%BE%D0%BD",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Aliakmonas_bridge.jpg/250px-Aliakmonas_bridge.jpg",
        "length": "300 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Термаикос",
        "location": " Греция",
        "info": "Алья́кмон (устар. Вистрица, греч. Αλιάκμονας) — крупнейшая река греческой Македонии и длиннейшая река Греции, протяжённостью около 300 километров (согласно БСЭ — 314 километров, по данным Британской энциклопедии — 297 километров).Берёт начало у границы с Албанией, в горах Пинд, на склонах горного массива Грамос, и течёт на юго-восток. По дороге сливается с притоком, часто называемым тем же именем и также берущим начало у границы с Албанией. Собрав воду с бассейна озера Кастория, в среднем течении вдоль подошвы склона восточного Пинда протекает по узким теснинам. Возле Сьятисты в Альякмон впадает река Праморица, а далее на юг — Венетико. Обогнув южную оконечность гор Вуринос, река делает широкую петлю к северо-востоку, встречаясь с протянувшимся с северо-востока на юго-запад массивом Камвуния. Вытекает между горами Вермион и Пиерия на Салоникскую равнину, где близ деревни Кулура  (англ.) рус. в него по каналу 66  (греч.) рус. впадает последний приток — река Могленицас, бассейн которой покрывает историческую область Алмопия. Впадает в залив Термаикос Эгейского моря.Около города Верия на реке расположена плотина, до постройки которой по реке было возможно малотоннажное судоходство."
     },
     {
        "name": "Амазар ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BC%D0%B0%D0%B7%D0%B0%D1%80_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Mogocha.jpg/250px-Mogocha.jpg",
        "length": "290 км",
        "pool": "11 100 км²",
        "consumption": "29,3 м³/с (п. Амазар)",
        "head": "слияние рек: Большой Амазар и Малый Амазар",
        "estuary": "Амур",
        "location": " Россия",
        "info": "Амаза́р — река в Забайкальском крае России, левый приток Амура.Длина реки — 290 км. Площадь бассейна — 11 100 км². Образуется слиянием Большого Амазара и Малого Амазара, берущих начало на юго-востоке Олёкминского Становика. Высота истока — 634 м над уровнем моря.[источник не указан 2085 дней] Течёт вдоль северных склонов Амазарского хребта, затем пересекает его и впадает в Амур ниже впадения Шилки.Замерзает в октябре, вскрывается в конце апреля — начале мая. С дождём летом бывают паводки. Зимой местами промерзает до дна (на 3—5 месяцев). Средний расход у пгт Амазар составляет 29,3 м³/с. В бассейне реки 104 озера общей площадью 2,55 км².Во второй трети XVIII века академик Миллер, побывав в Нерчинске, выдвинул гипотезу о том, что в XVII веке река носила названия Горбица или Большая Горбица, в отличие от впадающей в Шилку речки Горбицы (ныне Горбичанка, устье у села Горбица Верхне-Куларкинского сельского поселения; не путать с речкой Горбицей, впадающей в Куэнгу у села Усть-Горбица Бакачачинского с. п.) в 200 км восточнее, по которой в то время (и до 1858 года) проходила российско-китайская граница. В результате этого в академическом Атласе Российском граница была проведена по реке Амазар, и хотя реального развития возникший пограничный спор не получил, информация о старых названиях реки попала в ЭСБЕ, БСЭ и Сибирскую советскую энциклопедию."
     },
     {
        "name": "Амазонка",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BC%D0%B0%D0%B7%D0%BE%D0%BD%D0%BA%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Rio_Amazonas_-_Parintins.jpg/250px-Rio_Amazonas_-_Parintins.jpg",
        "length": "6400/7100 км",
        "pool": "7 180 000 км²",
        "consumption": "230 000 м³/с",
        "head": "слияние рек: Мараньон и Укаяли",
        "estuary": "Атлантический океан",
        "location": " Перу,  Колумбия, Бразилия",
        "info": "Амазо́нка (исп. и порт. Amazonas) — крупнейшая река на Земле по длине, площади бассейна и полноводности. Протекает по Южной Америке. Длина Амазонки является в научном сообществе дискуссионным вопросом и по различным измерениям составляет: от истока реки Мараньон — около 6400 км, от истока реки Апачет — 6992 км, от истока Укаяли — около 7100 км. Амазонка со своим длиннейшим истоком претендует, вместе с Нилом, на статус самого длинного водотока в мире.Площадь бассейна с учётом притока Токантинс — 7 180 000 км²; это заметно превышает другие крупнейшие бассейны рек (Уругвай и Парана вместе — 4140 тысяч км²; Конго — около 3700 тысяч км²).Образуется слиянием рек Мараньон и Укаяли. На участке до впадения Риу-Негру носит название Солимойнс. Длина этого участка реки — около 1600 км, площадь водосборного бассейна — 2 200 000 км², расход воды — 100 000 м³/с.Протекая в основном по Амазонской низменности в субширотном направлении близ экватора южнее его, Амазонка впадает в Атлантический океан, образуя одну из самых больших в мире дельт (площадью свыше 100 тысяч км² и включающую один из самых больших в мире речных островов — Маражо).Амазонку питают многочисленные притоки, наиболее значительные из которых: правые — Журуа, Пурус, Мадейра, Тапажос, Шингу, Токантинс; левые — Путумайо, Жапура, Риу-Негру."
     },
       {
        "name": "Аманина",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BC%D0%B0%D0%BD%D0%B8%D0%BD%D0%B0",
        "image": "undefined",
        "length": "181 км",
        "pool": "1960 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Залив Шелихова",
        "location": " Россия",
        "info": "Аманина — река на полуострове Камчатка в России.Длина реки — 181 км. Площадь водосборного бассейна — 1960 км². Протекает по территории Тигильского района Камчатского края. Впадает в залив Шелихова Охотского моря.Названа в начале 18 века русскими казаками по имени коряка Омана, проживавшего близ реки. Ранее имела местное название Ветлюн, вероятно от корякского Вэллан — «стоящая». Современное корякское название — Вэхльнун.Объекты перечислены по порядку от устья к истоку.По данным государственного водного реестра России относится к Анадыро-Колымскому бассейновому округу.Код водного объекта в государственном водном реестре — 19080000112120000035696."
     },
            {
        "name": "Амга",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BC%D0%B3%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Amga.jpg/250px-Amga.jpg",
        "length": "1462 км",
        "pool": "69 300 км²",
        "consumption": "178 м³/с",
        "head": " ",
        "estuary": "Алдан",
        "location": " Россия",
        "info": "Амга́ (якут. Амма) — река в Якутии, левый, самый длинный приток Алдана. Длина — 1462 км, площадь водосборного бассейна — 69 300 км².Название происходит от эвенкийского слова амнга — ущелье.Берёт начало с Алданского нагорья, где образует узкую глубокую долину с каменистым руслом. Ниже села Тёгюльте-Тёрдё долина расширяется, течение реки приобретает спокойный характер. Протекает по территории шести районов Якутии (от истока к устью) — Олёкминского, Алданского, Амгинского, Чурапчинского, Таттинского и Томпонского.Питание Амга имеет в основном снеговое и дождевое. Очень высокое весеннее половодье — подъём воды более 7 метров, частые летние паводки и очень низкий зимний сток. Ледостав с первой половины октября по май. Зимой наледи. В низовье Амга судоходна.Среднегодовой расход воды в 137 км от устья составляет 191,42 м³/с, в 436 км — 183,98 м³/с, в 932 км — 121,79 м³/с.(расстояние от устья)По данным государственного водного реестра России и геоинформационной системы водохозяйственного районирования территории РФ, подготовленной Федеральным агентством водных ресурсов:У Николая Глазкова есть стихотворение «Река Амга».Одно из произведений Софрона Данилова называется «Красавица Амга»."
     },
     {
        "name": "Амгунь",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BC%D0%B3%D1%83%D0%BD%D1%8C",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Taiga_of_Far_East_near_Imeni_Poliny_Osipenko_village%2C_Khabarovsk_Krai.jpg/250px-Taiga_of_Far_East_near_Imeni_Poliny_Osipenko_village%2C_Khabarovsk_Krai.jpg",
        "length": "723 км",
        "pool": "55 500 км²",
        "consumption": "500 м³/с (193 км от устья)",
        "head": "слияние рек: Сулук и Аякит",
        "estuary": "Амур",
        "location": " Россия",
        "info": "Амгу́нь (местн. устар. Хымгунь, эвенк. Амӈун; нивх. Ӽыӈгр) — река в Хабаровском крае России, левый приток Амура.Образуется слиянием рек Сулук (Суду, Холук) и Аякит на склонах Буреинского хребта.Длина реки — 723 км, площадь бассейна — 55,5 тыс. км². Средний уклон — 1,82 ‰. В бассейне реки около 4,5 тыс. озёр суммарной площадью 647 км².Протекает по заболоченной тайге, по вечной мерзлоте. В верховьях — типичная горная река, в низовьях сообщается с озером Дальжа по протоке из озера Далган.Среднемноголетний расход воды в нижнем течении Амгуни — 488 м³/с (объём стока — 15,402 км³/год). Средний годовой расход в 193 км от устья — 500 м³/с. Максимальные расходы воды достигают 2000 м³/с.Питание реки в основном дождевое. Весеннее половодье продолжается 1—1,5 месяца. Температура воды в верховьях летом — не более 18 °C, в среднем течении — 20—21 °C, в нижнем достигает 26 °C. Часты дождевые паводки — в горной части бассейна их число доходит до 12, в низовьях — от 4 до 10 за сезон, подъёмы уровня воды при этом достигают соответственно 2—4 и 4—8 м и более. С мая по октябрь в верхнем течении реки проходит до 97 % годового стока; в нижнем течении — 92—94 %. Наиболее сильные паводки наблюдаются в августе."
     },
     {
        "name": "Амгуэма",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BC%D0%B3%D1%83%D1%8D%D0%BC%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Amguema.png/250px-Amguema.png",
        "length": "498 км",
        "pool": "28 100 км²",
        "consumption": "267 м³/с (121 км от устья)",
        "head": " ",
        "estuary": "Чукотское море",
        "location": " Россия",
        "info": "Амгуэ́ма (Амгуема, в верховье — Оʼмваам, Вульвывее́м) — река на Дальнем Востоке России, протекающая по территории Иультинского района Чукотского автономного округа.Длина реки 498 км. По площади бассейна (28,1 тыс. км²) Амгуэма занимает второе место среди рек Чукотки (после Анадыря) и 41-е — в России.Ранее происхождение названия предполагалось от чук. Оʼмваам — «широкая река» (от чук. уʼм-/оʼм- «широкий» + -вээм/-ваам «река»). Сейчас за исходную форму принимается чук. омваан — «широкое место», то есть по долине, по которой она протекает. На картах XVIII — начала XIX веков название приводилось как Омгаян, Амкеян, Амуян, позже Амгуема. На карте Н. Дауркина отмечена как Амгуян, современное название закреплено И. Биллингсом.Климат субарктический, резко континентальный. Среднегодовая температура составляет от −8 до −10 °C. Зима продолжается до 8 месяцев. Средняя температура июля +13 °C, вода в реках прогревается до +5…+11 °C. В летний сезон случаются снегопады. Годовая сумма осадков — 350 мм, запасы воды в снежном покрове — 150 мм.Берёт начало у южных отрогов Паляваамского хребта на Чукотском нагорье, впадает в Чукотское море. Главный приток — река Чантальвэргыргын (левый). Бассейну Амгуэмы принадлежит озеро Янранайгытгын."
     },
     {
        "name": "Амедичи",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BC%D0%B5%D0%B4%D0%B8%D1%87%D0%B8",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Aldan.png/250px-Aldan.png",
        "length": "313 км",
        "pool": "6020 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Алдан",
        "location": " Россия",
        "info": "Амедичи[2][3] (якут. Амедичи) — река в Якутии, левый приток реки Алдан (бассейн Лены)[4].Гидроним «Амедичи» произошёл от якут. слова «амут» — озеро. Река имеет много озёр[5][6].Длина 313 км, площадь бассейна 6020 км²[3]. Начинается на северных склонах Станового хребта[7], течёт по Алданскому нагорью[7][8][9][10][11][12][4]. Питание смешанное, с преобладанием дождевого. Летом бурные паводки, зимой перемерзает. Характерны наледи[13].Амедичи — золотоносная река. В конце 20-х — начале 30-х годов исследователем Н. И. Зайцевым в верховьях Амедичи наряду в впадающими реками Кабактан[7][14] и Налдыкан[7][15] открыты залежи рассыпного золота[16]. Вплоть до 1992 года выдавались лицензии золотодобывающим компаниям на добычу золота на реке Амедичи[17].В бассейне реки находятся археологические памятники — стоянки Алдакай-I, Алдакай-II, Ягодный-I и Ягодный-II. Они были обнаружены Среднеленским отрядом археолого-этнографической экспедиции Музея археологии и этнографии Якутского государственного университета под руководством Н. Н. Кочмара в экспедициях 1997—2001 гг[18]. Наиболее сохранился памятник Алдакай-I, представляющий собой поселение с остатками жилищ, которые ранее на территории Якутии не встречались[19]. Исследователь С. А. Воробьев относит поселение Алдакай-I к эпохе бронзы[19][20]."
     },
                    {
        "name": "Амня",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BC%D0%BD%D1%8F",
        "image": "undefined",
        "length": "374 км",
        "pool": "7210 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Казым",
        "location": " Россия",
        "info": "Амня — река или протока в России, протекает по территории Белоярского района Ханты-Мансийского автономного округа, левый приток реки Казыма. На реке вблизи устья расположено село Казым.Высота устья — 18,3 м над уровнем моря.[источник не указан 605 дней]Протекает по северной части Западно-Сибирской равнины. Длина реки — 374 км, площадь водосборного бассейна — 7210 км². Долина сильно заболочена; русло извилистое. Питание главным образом снеговое. Замерзает в начале ноября, вскрывается во 2-й половине мая.(км от устья)По данным государственного водного реестра России относится к Нижнеобскому бассейновому округу, водохозяйственный участок реки — Обь от впадения Иртыша до впадения реки Северная Сосьва, речной подбассейн реки — бассейны притока Оби от Иртыша до впадения Северной Сосьвы. Речной бассейн реки — (Нижняя) Обь от впадения Иртыша.Код объекта в государственном водном реестре — 15020100112115300021200."
     },
     {
        "name": "Ампкуа ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BC%D0%BF%D0%BA%D1%83%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Umpqua_River_%28Douglas_County%2C_Oregon_scenic_images%29_%28douD0031%29.jpg/250px-Umpqua_River_%28Douglas_County%2C_Oregon_scenic_images%29_%28douD0031%29.jpg",
        "length": "179 км",
        "pool": "11 163 км²",
        "consumption": "208 м³/с (Элктон — 91,6 км от устья; 2007 год)",
        "head": "слияние рек: Норт-Ампкуа и Саут-Ампкуа",
        "estuary": "Тихий океан",
        "location": " США",
        "info": "Ампкуа (англ. Umpqua River) — река в округе Дуглас, штат Орегон, США, в регионе Орегонское побережье. Длина — 179 км. Площадь бассейна — 11 163 км². Средний расход воды — 208 м³/с.[источник не указан 1409 дней] Уклон реки — 0,61 м/км.[источник не указан 1409 дней]Ампкуа берёт свой исток от слияния рек Норт-Ампкуа и Саут-Ампкуа близ города Роузберг на высоте 110 метров над уровнем моря. Общее направление течения — с юго-востока на северо-запад. Пересекая Орегонский береговой хребет, впадает в Тихий океан близ поселения Уинчестер-Бей. На реке развито спортивно-туристическое рыболовство, вдоль неё проложен автомобильный туристический маршрут.По берегам реки издавна селились индейцы племени ампква (от этого названия река и получила, собственно, своё имя) и калапуйя. Название реке дал шотландский ботаник Дэвид Дуглас в 1825 году. В 1854 году местные индейцы уступили эти земли Правительству США, откочевав в резервацию в близлежащий округ Линкольн. У устья выстроен маяк, функционирующий с 1857 года. В 1862 году река Ампкуа, как и многие другие реки региона, поднялась до невиданного уровня, на 3—4,5 метра, причинив огромный ущерб местным жителям. В 1936 году через реку был построен мост, по которому проходит автомагистраль US-101. Ещё одно заметное наводнение на реке случилось в ноябре 1996 — январе 1997 года."
     },
     {
        "name": "Ампута",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BC%D0%BF%D1%83%D1%82%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Amputa-joki_on_j%C3%A4%C3%A4ss%C3%A4%2C_avannosta_haetaan_vett%C3%A4_-_SUK1279-11_%28musketti.M012-SUK1279-11%29.jpg/250px-Amputa-joki_on_j%C3%A4%C3%A4ss%C3%A4%2C_avannosta_haetaan_vett%C3%A4_-_SUK1279-11_%28musketti.M012-SUK1279-11%29.jpg",
        "length": "181 км",
        "pool": "4220 км²",
        "consumption": "undefined",
        "head": "Тягамальто",
        "estuary": "Аган",
        "location": " Россия",
        "info": "Ампута — река в России, протекает в Ханты-Мансийском автономном округе. Вытекает из озера Тягамальто, устье реки находится на 285 км реки Аган. Длина реки — 181 км, площадь водосборного бассейна — 4220 км².Ненцы произносят название как Вампу-та (ненецкие слова не начинаются с гласного). Ханты называют реку Кавахын.Как и на многих других реках региона, на реке вследствие падения в неё деревьев образуются заломы, которые сохраняются иногда десятилетиями. Так, один и тот же залом наблюдался в 1923 году и в 1953.Верховья реки являются зоной расселения лесных ненцев (Иуси — род Бобра (Махи)) и зоны этнокультурного контакта между ханты и ненцами.В старину вдоль реки зимой пролегала «Большая Царская дорога», по которой шли упряжки для закупки товаров на ярмарке в Сургуте.На берегу озера Тягамальто, истока реки, ранее находился вахтовый посёлок Ампутинка, от которого сохранилась вертолётная площадка, используемая в настоящее время.По данным государственного водного реестра России относится к Верхнеобскому бассейновому округу, водохозяйственный участок реки — Обь от впадения реки Вах до города Нефтеюганск, речной подбассейн реки — Обь ниже Ваха до впадения Иртыша. Речной бассейн реки — (Верхняя) Обь до впадения Иртыша."
     },
           {
        "name": "Амударья",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BC%D1%83%D0%B4%D0%B0%D1%80%D1%8C%D1%8F",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Afghanistan_-_Tajikistan_Bridge_Completion.jpg/250px-Afghanistan_-_Tajikistan_Bridge_Completion.jpg",
        "length": "1415 км",
        "pool": "309 000 км²",
        "consumption": "около 2000 м³/с (близ города Керки)",
        "head": "слияние рек: Пяндж и Вахш",
        "estuary": "Большое Аральское море",
        "location": "",
        "info": "Амударья́ (устар. Аму-Дарья) (пушту د آمو سيند, тадж. Амударё, Омударё, Дарёи Ому, туркм. Amyderýa, узб. Amudaryo, каракалп. Әмиўдәрья, от перс. آمو Аму — названия исторического города Амуль и перс. دریا дарья — «река», «море»; др.-греч. Ὦξος, лат. Oxus, араб. جيحون) — вторая по длине (после Сырдарьи) и крупнейшая по полноводности река в Средней Азии.Длина 1415 км (2620 км — от истока Пянджа с рекой Вахандарья). Площадь бассейна (выше города Керки, 1045 км от устья) 309 тысяч км² (без бассейнов рек Зеравшан и Кашкадарья, сток которых практически не поступает в Амударью), сток воды осуществляется с 227 тыс. км².Образуется слиянием рек Пяндж и Вахш, впадает в Аральское море, образуя дельту. В среднем течении в Амударью впадают три крупных правых притока (Кафирниган, Сурхандарья, Шерабад) и один левый приток (Кундуз). Далее до Аральского моря она не получает ни одного притока.Питание реки в основном составляют талые снеговые и ледниковые воды, поэтому максимальные расходы наблюдаются летом, а наименьшие — в январе — феврале. Протекая по равнине, от Керки до Нукуса, Амударья теряет большую часть своего стока на испарение, инфильтрацию и орошение. По мутности Амударья занимает первое место в Центральной Азии и одно из первых мест в мире. Основной сток Амударьи формируется на территории Таджикистана (80 %) и частично в Северном Афганистане. Затем река протекает вдоль границы Афганистана с Узбекистаном, пересекает Туркмению, далее течет вдоль туркмено-узбекской границы, вновь возвращается в Узбекистан и впадает в Аральское море. В настоящее время воды реки доходят до Аральского моря лишь в период наиболее сильных весенних паводков, так как забираются на орошение."
     },
     {
        "name": "Амур",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BC%D1%83%D1%80",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Amur_River_in_Habarovsk.jpg/250px-Amur_River_in_Habarovsk.jpg",
        "length": "2824 км",
        "pool": "1 856 000 км²",
        "consumption": "12 800 м³/с (Устье)",
        "head": "слияние рек: Аргунь и Шилка",
        "estuary": "Амурский лиман",
        "location": "",
        "info": "Аму́р (кит. трад. 黑龍江, упр. 黑龙江, пиньинь Hēilóng-jiāng, палл. Хэйлунцзян) — река на Дальнем Востоке в Восточной Азии. Протекает по территории России и границе России и КНР. Длина — 2824 км (от слияния Шилки и Аргуни), площадь бассейна — 1 856 тысяч км². Впадает в Охотское море или Японское море. Годовой сток составляет 403,66 км³.Наименование реки произошло от общей для тунгусо-маньчжурских языков основы амар, дамур — «большая река». Китайцы называли Амур «Хэйхэ» (кит. 黑河) — «чёрная река», затем «Хэйлунцзян» — (кит. 黑龙江) — «Река чёрного дракона». Согласно легенде, в давние времена чёрный дракон, обитавший в реке и олицетворявший добро, победил злого, белого, дракона, который топил лодки на реке, мешал людям рыбачить и вообще нападал на любое живое существо. Победитель остался жить на дне реки в районе Хинганских щёк, что на границе Амурской и Еврейской автономной областей. С тех пор эта река и называется рекой Чёрного Дракона.«Хвост» Чёрного Дракона находится в степях Монголии и Даурии, «туловище» лежит в четырёх российских регионах и в одной китайской провинции. Две левые «лапы» дотягиваются до самого Станового хребта, где берут начало притоки Амура — Зея и Бурея, а две правые «лапы» — притоки Сунгари и Уссури — в Китае и в Приморье. «Голова» Дракона упирается в Охотское море, и он «пьёт воду» Татарского пролива. Длина «тела» Чёрного Дракона от «хвоста» до «головы» — более 4500 км, а площадь его (бассейн Амура) достигает 1,8 млн км²."
     },
         {
        "name": "Амыл",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BC%D1%8B%D0%BB",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Amyl_River.JPG/250px-Amyl_River.JPG",
        "length": "257 км",
        "pool": "9500 км²",
        "consumption": "211,42 м³/с (11 км от устья)",
        "head": " ",
        "estuary": "Туба",
        "location": " Россия",
        "info": "Амы́л — река в Красноярском крае России.Слиянием с рекой Казыр образует реку Тубу, впадающую в Енисей, являясь её левым притоком. Длина — 257 км, площадь водосборного бассейна — 9500 км². Исток — на северных склонах Куртушибинского хребта Западного Саяна. Протекает по территории Саянских гор, в основном — Каратузского района Красноярского края. С 1834 года на реке разрабатываются золотые прииски, входящие в состав так называемого Минусинского золотопромышленного района, в освоении которого активное участие принимали, в том числе, и иностранцы. Несудоходна.У сёл Уджей и Копь на реке Амыл находятся наиболее восточные памятники тагарской культуры.Ледостав с конца октября — начала декабря по апрель — начало мая. По данным наблюдений с 1936 года по 1993 год среднегодовой расход воды в районе села Качулька (11 км от устья) составляет 211,42 м³/с.(расстояние от устья)По данным государственного водного реестра России и геоинформационной системы водохозяйственного районирования территории РФ, подготовленной Федеральным агентством водных ресурсов:"
     },
      {
        "name": "Анабар",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%B0%D0%B1%D0%B0%D1%80",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/%D0%A0%D0%B5%D0%BA%D0%B0_%D0%90%D0%BD%D0%B0%D0%B1%D0%B0%D1%80.jpg/250px-%D0%A0%D0%B5%D0%BA%D0%B0_%D0%90%D0%BD%D0%B0%D0%B1%D0%B0%D1%80.jpg",
        "length": "939 км",
        "pool": "100 000 км²",
        "consumption": "498 м³/с",
        "head": " ",
        "estuary": "Море Лаптевых",
        "location": " Россия",
        "info": "Анаба́р, в верховьях Большая Куонамка (якут. Анаабыр) — река в России, на северо-западе Якутии. Впадает в море Лаптевых.На карте 1685 года река отмечена как Анабара.[источник не указан 357 дней]Существуют несколько гипотез возникновения гидронима, в том числе якутского, корякского и чукотского происхождения. Наиболее вероятной версией является комбинация юкагирского Ану и эвенкийского Бира, одинаково переводящиеся как «вода».Длина реки — 939 км (с Большой Куонамкой), площадь водосборного бассейна — 100 000 км². По площади бассейна Анабар занимает шестое место среди рек Якутии и 22-е — в России. В бассейне много озёр.Исток расположен в южной части Анабарского плато (часть Среднесибирского плоскогорья), где река образует долину с крутыми и обрывистыми берегами и имеет горный характер. Здесь встречаются скалы и пороги.По выходе на Северо-Сибирскую низменность долина Анабара значительно расширяется, река принимает равнинный характер. В нижнем течении реки, ближе к левому берегу, напротив отделения крупной протоки Думастай-Тёбюлеге, находятся два острова — Синнигес-Ары и Ыстакан-Арыта.В устье река образует длинный мелководный эстуарий, подверженный влиянию морских приливов — Анабарскую губу, переходящую далее в Анабарский залив."
     },
        {
        "name": "Анактувук",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%B0%D0%BA%D1%82%D1%83%D0%B2%D1%83%D0%BA",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/A_Blue_Evening_On_The_Anaktuvuk_River_North_Slope_Alaska_%2849496082%29.jpeg/250px-A_Blue_Evening_On_The_Anaktuvuk_River_North_Slope_Alaska_%2849496082%29.jpeg",
        "length": "217 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Колвилл",
        "location": " США",
        "info": "Анактувук (англ. Anaktuvuk River) — крупная река на севере штата Аляска, США. Протекает по территории боро Норт-Слоп.Берёт начало из нескольких ледников в горах Эндикотт (часть хребта Брукса) и течёт на запад; к северу от населённого пункта Анактувук-Пасс поворачивает на север. Спускаясь с гор, река вытекает на низменную прибрежную равнину Северного Ледовитого океана. Впадает в реку Колвилл недалеко от невключённой территории Умиат. В нижнем течении принимает крупный приток Нанушук (161 км). Длина реки Анактувук составляет 217 км.Некоторые участки реки представляют собой хорошие места для ловли арктического гольца и хариуса. В то же время большая часть течения реки недоступна для моторных лодок из-за низкого уровня воды. Бассейн реки представляет собой богатые охотничьи угодья. Охотники иногда прилетают сюда летом для охоты на лося, карибу, гризли и других животных. Река крайне редко используется для водного туризма из-за низкого и нестабильного уровня воды, большой удалённости и сложных погодных условий."
     },
     {
        "name": "Анвик ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%B2%D0%B8%D0%BA_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "225 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Юкон",
        "location": " США",
        "info": "Анвик (англ. Anvik River) — река на западе штата Аляска, США. Правый приток Юкона. Длина реки составляет 225 км. Течёт преимущественно в южном и юго-восточном направлениях. Устье находится в 2,4 км к северу от города Анвик.В Анвике обитает крупная популяция кеты. Река является хорошим местом для ловли четырёх видов лосося, а также щуки, нельмы, арктического гольца, радужной форели и европейского хариуса.Впервые в устье реки в январе 1834 года зашёл российский мореплаватель Андрей Глазанов. Название реки было впервые записано в 1842—1844-х годах русским морским офицером Л. А. Загоскиным как «река Анвиг»."
     },
         {
        "name": "Ангара",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%B3%D0%B0%D1%80%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Angara_River2.jpg/250px-Angara_River2.jpg",
        "length": "1779 км",
        "pool": "1 039 000 км²",
        "consumption": "4518 м³/с (Татарка)",
        "head": "Байкал",
        "estuary": "Енисей",
        "location": " Россия",
        "info": "Ангара́ (бур. Ангар мүрэн, эвенк. Аӈара) — река в Восточной Сибири, правый и крупнейший приток Енисея, единственная река, вытекающая из озера Байкал. Протекает по территории Иркутской области и Красноярского края России. Длина — 1779 км, площадь водосборного бассейна — 1 039 000 км² (в том числе площадь бассейна Байкала — 571 000 км²). Годовой сток реки составляет 142,47 км³, что делает её второй по водности рекой-притоком в России — в этом отношении она уступает только Алдану (приток Лены). Средний расход воды — 4518 м³/с. Высота истока — 456 м над уровнем моря.Название произошло от корня амнга (искаж. анга), что в переводе с бурятского и эвенкийского значит «пасть животного, рот»; производное от этой основы ангара толкуют как «разинутый», «раскрытый», «открытый», а также «промоина», «расселина», «ущелье». В исторических источниках Ангара впервые упоминается в XIII веке под названием Анкара-Мурэн:(Рашид ад-Дин, 1952, т. 1, кн. 1: 73).(Рашид-ад-Дин, 1952, т. 1, кн. 1: 101—102) Из чего следует, что Анкара-мурэн у Рашид-ад-Дина — это современная Ангара, но она носит это название только ниже впадения в неё не названных в документе притоков, и продолжающаяся под этим именем при слиянии её с Енисеем."
     },
         {
        "name": "Ангелинский ерик",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%B3%D0%B5%D0%BB%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B9_%D0%B5%D1%80%D0%B8%D0%BA",
        "image": "https://upload.wikimedia.org/wikipedia/ru/thumb/a/af/Bridge_over_river_angelinsky_yerik_in_stanitsa_staronizhesteblievskaya.jpeg/250px-Bridge_over_river_angelinsky_yerik_in_stanitsa_staronizhesteblievskaya.jpeg",
        "length": "116 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "Трусово",
        "estuary": "Джерелиевский главный коллектор",
        "location": " Россия",
        "info": "Анге́линский е́рик — ерик в Краснодарском крае России. Длина — 116 км.Ангелинский ерик берёт начало в Красном лесу. Составная часть Кубанской оросительной системы, созданной в 1932—1951 годах на правобережье Кубани.По Географическому атласу Российской Империи В. П. Пядышева 1820—1827 гг., река имела сток непосредственно в Азовское море. По 10-вёрстной карте И. А. Стрельбицкого 1882 года и Карте Кавказского края в масштабе пяти вёрст 1877 года устье находилось на Протоке.По В. Н. Ковешникову, название ерика восходит к тюрк. ангалы — «имеющий мать». Также возможно происхождение от тур. engilik — «простор, ширь».На ерике находятся станицы Старонижестеблиевская, Новониколаевская и Гривенская, хутора Первомайский, Крупской, Отрубные, Ангелинский и Лебеди, посёлок Красный Лес."
     },
       {
        "name": "Анграпа",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%B3%D1%80%D0%B0%D0%BF%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Angrapa.jpg/250px-Angrapa.jpg",
        "length": "169 км",
        "pool": "3960 км²",
        "consumption": "14,5 м³/с (Берестово)",
        "head": "Мамры",
        "estuary": "Преголя",
        "location": "",
        "info": "Ангра́па (польск. Węgorapa — Венгорапа; устар. нем. Angerapp) — река в Польше и Калининградской области России. Приток Преголи. Длина реки — 169 км, площадь водосборного бассейна — 3960 км², среднегодовой расход воды — 14,5 м³/с.Название реки имеет древнепрусское происхождение, от слов anguris — угорь и app — река.Анграпа вытекает из озера Мамры на высоте 115,8 м в районе польского города Венгожево. Далее река пересекает границу России, течёт по территории Озёрского городского округа, Гусевского и Черняховского районов и в Черняховском районе в неё впадает река Писса. Далее, в районе города Черняховска, Анграпа сливается с Инстручем, образуя Преголю.Ширина реки на участке от Озёрска до Писсы 5-12 м, глубина 0,2-2 м. Ниже впадения Писсы и до Черняховска ширина 7-25 м, глубина 1,5-3 м. К 2020 году река не судоходна.[источник не указан 975 дней]Скорость течения около 0,2-0,6 м/с. Площадь бассейна 3639 км², из них, 975,6 км² приходится на территорию Польши. Среднегодовой расход воды у Берестово, находящегося в 30 километрах от места слияния с Инстручем, — 14,5 м³/с, минимальный расход — 8,56 в июле и максимальный расход — 24,7 в апреле.В Озёрске на Анграпе находится Озёрская ГЭС, построенная в 1880 году и вновь пущенная в строй в 2000 году, мощностью 0,5 МВт."
     },
       {
        "name": "Ангэрэб",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%B3%D1%8D%D1%80%D1%8D%D0%B1",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/ET_Gondar_asv2018-02_img43_Angereb_Reservoir.jpg/250px-ET_Gondar_asv2018-02_img43_Angereb_Reservoir.jpg",
        "length": "220 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Атбара",
        "location": "",
        "info": "Ангэрэб (Ангареб, Анджено, Анджерб; в Судане: Эс-Салам, Бахр-эс-Салам, Бар-ес-Салам) — река на северо-западе Эфиопии и на востоке Судана. Правый приток Атбары (на высоте 475 м).Длина — 220 километров.Начинается к северу от Дакуа выше 2600 м над уровнем моря, северо-восточнее Гондэра в регионе Амхара, и течёт на запад."
     },
       {
        "name": "Андалиен",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%B4%D0%B0%D0%BB%D0%B8%D0%B5%D0%BD",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Puente_Ferroviario_sobre_el_r%C3%ADo_Andali%C3%A9n.JPG/250px-Puente_Ferroviario_sobre_el_r%C3%ADo_Andali%C3%A9n.JPG",
        "length": "130 км",
        "pool": "780 км²",
        "consumption": "10−300 м³/с",
        "head": " ",
        "estuary": "Консепсьон",
        "location": "Чили",
        "info": "Андалиен (исп. Río Andalién) — река в провинции Консепсьон области Био-Био в Чили. Длина реки — 130 км. Площадь водосборного бассейна — 780 км². Река берёт начало севернее посёлка Флорида, течёт вначале на запад, пересекает восточную часть города Консепсьон, поворачивает на север, течёт по территории коммун Талькауано и Пенко, впадает в залив Консепсьон близ западной оконечности города Пенко."
     },
     {
        "name": "Андерсон ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%B4%D0%B5%D1%80%D1%81%D0%BE%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "692 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Море Бофорта",
        "location": " Канада",
        "info": "Андерсон (англ. Anderson River) — река на северо-западе Канады в Северо-Западных территориях.Берет своё начало севернее Большого Медвежьего озера в Северо-Западных территориях. Длина составляет около 692 км, бассейн реки лежит полностью за полярным кругом.Течет первоначально в северо-западном направлении, принимает сток от озёр Буа, Бело, Обри, Колвилл, Монуар, Тадене, затем поворачивает на запад, принимает слева свой главный приток Корнуот и поворачивает на север. Впадает в залив Ливерпулл моря Бофорта Северного Ледовитого океана.Большая часть бассейна реки Андерсон относится к субарктическому экорегиону равнины Андерсон (Anderson Plain High Subarctic Ecoregion), являющемуся частью субарктичесеого экорегиона Северных Великих Равнин (Northern Great Plains HS Ecoregion). Реку окружают первозданные, многообразные ландшафты. В верхнем и среднем течении река «пробила» многочисленные каньоны, наибольший из которых — Каньон Фалкон 6-ти километровой длины и 40-метровой глубины. Верхняя часть реки находятся в зоне тайги, в которой преобладает чёрная ель. Белая ель и кустарники растут в речной долине и на её склонах. Встречаются террасы, сложенные аллювиальными отложениями совместно с глинистыми сланцами мелового периода, девонскими известняками и доломитами."
     },
     {
        "name": "Андийское Койсу",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%B4%D0%B8%D0%B9%D1%81%D0%BA%D0%BE%D0%B5_%D0%9A%D0%BE%D0%B9%D1%81%D1%83",
        "image": "undefined",
        "length": "144 км",
        "pool": "4810 км²",
        "consumption": "69,6 м³/с (в 9 км от устья)",
        "head": "слияние рек: Пирикительская Алазани и Тушетская Алазани",
        "estuary": "Сулак",
        "location": "",
        "info": "Андийское Койсу — река в Грузии (Кахетия) и России (Дагестан), левая составляющая Сулака. Длина — 144 км.Название «койсу» получило от тюркского (кумыкского) «къой сув» — овечья вода. До середины XX-го века название «Къойсу» носила река Сулак.Река Андийское Койсу являющаяся левой составляющей реки Сулак, образуется от слияния рек Пирикительская Алазани и Тушетская Алазани, берущих начало в горной Тушетии (Грузия). Она сливается с рекой Аварское Койсу в 6 километрах восточнее села Чирката, образуя реку Сулак.Длина реки от места слияния двух рек 144 км (от истока Тушетской Алазани — 192 км), общее падение 2500 м, площадь водосбора 4810 км², средняя его высота 2140 м. Площадь оледенения в бассейне реки составляет 14 км². Ледники распространены в пределах наиболее возвышенных участков хребтов Богосского, Пирикетельского и Снегового.Значительная часть площади водосбора (84 %) лежит выше 1500 метров над уровнем моря, в том числе 10 % выше 3000 метров.На территории Ботлихского района на левом берегу реки находятся остатки старинного города Ортаколо IX—X веков, знать которого была христианской, а простые люди соблюдали языческие обряды.В питание реки участвуют дождевые осадки, подземные и талые воды. Андийское Койсу на всем своём протяжении относится к рекам с весенне-летним половодьем и низкой меженью. Основная доля стока (60-70 %) проходит в тёплое время года (май — август). Как правило, наибольший сток отмечается в июне, а наименьший — в феврале."
     },
     {
        "name": "Андоба (приток Костромы)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%B4%D0%BE%D0%B1%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9A%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%BC%D1%8B)",
        "image": "undefined",
        "length": "122 км",
        "pool": "914 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Кострома",
        "location": " Россия",
        "info": "Андоба — река в Судиславском, Сусанинском и Костромском районах Костромской области России. Устье реки находится в 45 км от устья реки Кострома по левому берегу у деревни Пустынь Костромского района напротив границы с Любимским районом Ярославской области. Длина реки составляет 122 км.Притоки: Корба (97 км от утья), Сверкунья (95 км), безымянный ручей из озера Медвежье, Востырь, окачиха.Сельские населённые пункты на реке: Медведево, Сосновик, Залужье, Ощурки, Охапкино, Дудкино, Борок, Поповское, Тыково, Волково, Панкратово, Пестенька, Шарыгино, Фефелово, Фоминское, Подольново, Пустынь.По данным государственного водного реестра России относится к Верхневолжскому бассейновому округу, водохозяйственный участок реки — Кострома от истока до водомерного поста у деревни Исады, речной подбассейн реки — Волга ниже Рыбинского водохранилища до впадения Оки. Речной бассейн реки — (Верхняя) Волга до Куйбышевского водохранилища (без бассейна Оки)."
     },
     {
        "name": "Андога",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%B4%D0%BE%D0%B3%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/%D0%A4%D0%B8%D0%BB%D0%B8%D0%BF%D0%BF%D0%BE-%D0%98%D1%80%D0%B0%D0%BF%D1%81%D0%BA%D0%B0%D1%8F_%D0%BF%D1%83%D1%81%D1%82%D1%8B%D0%BD%D1%8C.jpg/250px-%D0%A4%D0%B8%D0%BB%D0%B8%D0%BF%D0%BF%D0%BE-%D0%98%D1%80%D0%B0%D0%BF%D1%81%D0%BA%D0%B0%D1%8F_%D0%BF%D1%83%D1%81%D1%82%D1%8B%D0%BD%D1%8C.jpg",
        "length": "142 км",
        "pool": "3760 км²",
        "consumption": "undefined",
        "head": "Андозеро",
        "estuary": "Суда",
        "location": " Россия",
        "info": "А́ндога — река в Вологодской области России, самый длинный левый приток Суды (бассейн Волги). Длина реки — 142 км, берега низменные.Андога вытекает из озера Андозера в Белозерском районе, течёт на юг, пересекает Кадуйский район, в нижнем течении отклоняется на юго-восток и впадает в Суду в 10,9 км от её устья в посёлке Андогский Череповецкого района.В поселении Чёрный ручей 2 на реке Андоге найдена прорезная неорнаментированная накладка прямоугольной формы, широко известная в культурах Прикамья VII—VIII веков (ближайшая подобная бляшка найдена в Селище на реке Прость под Новгородом).На берегу Андоги расположен Филиппо-Ирапский Красноборский Троицкий монастырь, строения которого сильно пострадали в годы советской власти, основанный в начале XVI века.На рубеже XIV—XV веков (ок. 1385—1430) в бассейне Андоги располагалось удельное Андожское княжество.Название происходит от финско-шведских слов: ändo — конец и а (с придыханием) — река.Муниципальные образования и населённые пункты на берегах Андоги:Основные притоки от истока к устью (указано расстояние до устья):Все они, кроме Миги, — левые.По данным государственного водного реестра России относится к Верхневолжскому бассейновому округу, водохозяйственный участок реки — Суда от истока и до устья, речной подбассейн реки — Реки бассейна Рыбинского водохранилища. Речной бассейн реки — (Верхняя) Волга до Куйбышевского водохранилища (без бассейна Оки)."
     },
     {
        "name": "Андома",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%B4%D0%BE%D0%BC%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/%D0%90%D0%BD%D0%B4%D0%BE%D0%BC%D0%B0_3.jpg/250px-%D0%90%D0%BD%D0%B4%D0%BE%D0%BC%D0%B0_3.jpg",
        "length": "156 км",
        "pool": "2570 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Онежское озеро",
        "location": " Россия",
        "info": ""
     },
                       {
        "name": "Анеп",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%B5%D0%BF",
        "image": "undefined",
        "length": "108 км",
        "pool": "1530 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Тавда",
        "location": " Россия",
        "info": "Анеп — река в России, протекает по Свердловской области. Устье реки находится в 535 км по правому берегу реки Тавды. Длина реки — 108 км, площадь водосборного бассейна — 1530 км².По данным государственного водного реестра России относится к Иртышскому бассейновому округу, водохозяйственный участок реки — Тавда от истока и до устья, без реки Сосьва от истока до водомерного поста у деревни Морозково, речной подбассейн реки — Тобол. Речной бассейн реки — Иртыш.Код объекта в государственном водном реестре — 14010502512111200012557."
     },
     {
        "name": "Анжа (приток Кана)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%B6%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9A%D0%B0%D0%BD%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/%D0%90%D0%BD%D0%B6%D0%B0_-_panoramio_%2813%29.jpg/250px-%D0%90%D0%BD%D0%B6%D0%B0_-_panoramio_%2813%29.jpg",
        "length": "142 км",
        "pool": "1530 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Кан",
        "location": " Россия",
        "info": "Анжа — река в Саянском районе Красноярского края России, левый приток реки Кан (речной бассейн Енисея). Длина реки — 142 км, площадь бассейна — 1530 км². Исток Анжи на хребте Койское Белогорье, северный склон горы Голец Кирельский, впадает в реку Кан (в 434 км от устья по левому берегу) у деревни Усть-Анжа. Высота устья — 304 м над уровнем моря.Система водного объекта: Кан → Енисей → Карское море.Этимология названия кетская — искажённое словосочетание Анзас: ан — мать, зас — река.По данным государственного водного реестра России относится к Енисейскому бассейновому округу, водохозяйственный участок реки — Кан, речной подбассейн реки — Енисей между слиянием Большого и Малого Енисея и впадением Ангары. Речной бассейн реки — Енисей.Код объекта в государственном водном реестре — 17010300412116100021672."
     },
         {
        "name": "Аниак ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%B8%D0%B0%D0%BA_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Aniak_sunset.jpg/250px-Aniak_sunset.jpg",
        "length": "153 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "Аниак",
        "estuary": "Кускокуим",
        "location": " США",
        "info": "Аниак (англ. Aniak River) — река в юго-западной части штата Аляска (США). Левый приток реки Кускокуим.Берёт начало к югу от озера Аниак и течёт преимущественно в северном направлении. В верхней части бассейна расположены горы Кускокуим и Килбак; нижняя часть бассейна представлена равнинами. Впадает в реку Кускокуим к востоку от города Аниак. Длина реки составляет 153 км.Река Аниак является хорошим местом для ловли лосося, арктического гольца, радужной форели и сибирского хариуса, а вблизи устья весной также щуки и нельмы.Навигация по реке осложнена быстрым течением, многорукавностью и другими факторами."
     },
     {
        "name": "Анимас",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%B8%D0%BC%D0%B0%D1%81",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Animas_River_DSRR.jpg/250px-Animas_River_DSRR.jpg",
        "length": "203 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Сан-Хуан",
        "location": " США",
        "info": "Анимас (англ. Animas River) — река в США на юго-западе штата Колорадо и северо-западе штата Нью-Мексико. Правый приток реки Сан-Хуан, которая в свою очередь является притоком реки Колорадо. Длина составляет около 203 км.Анимас берёт начало в районе горного хребта Сан-Хуан, как слияние верховий Уэст-Форк и Норт-Форк вблизи города-призрака Анимас-Форкс. Течёт на юг через город-призрак Эврика и город Сильвертон, где река входит в каньон. Далее протекает через городок Дуранго, пересекает границу с Нью-Мексико, протекает через город Ацтек и впадает в реку Сан-Хуан в городе Фармингтон.Единственным крупным притоком является река Флорида. Анимас является популярным местом рыбалки.В начале августа 2015 года произошла экологическая катастрофа, когда сотрудники Агентства по охране окружающей среды США случайно слили в реку более четырёх миллионов литров токсичных веществ во время работ по очистке золотодобывающей шахты."
     },
      {
        "name": "Анкара ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%BA%D0%B0%D1%80%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Ankara_asv2021-10_img39_Akk%C3%B6pr%C3%BC.jpg/250px-Ankara_asv2021-10_img39_Akk%C3%B6pr%C3%BC.jpg",
        "length": "140 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Сакарья",
        "location": " Турция",
        "info": "Анкара (тур. Ankara Çayı) — река в центральной части Турции, протекающая через город Анкару.Длина — около 140 км.Приток реки Сакарья.Разделяет город на почти равные половины, пересекая многие кварталы.Через реку в городе построено множество мостов. В некоторых местах она заключена в трубу.Из-за длительного воздействия сточных вод и промышленных загрязнителей река уже не является пригодной для орошения, однако её воды всё ещё используются для орошения ниже по течению. В жаркие дни запах канализационных стоков делает эту экологическую катастрофу ещё более очевидной. Существуют финансируемые Всемирным банком проекты по её очистке."
     },
     {
        "name": "Анкудинка",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%BA%D1%83%D0%B4%D0%B8%D0%BD%D0%BA%D0%B0",
        "image": "undefined",
        "length": "123 км",
        "pool": "1380 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Колыма",
        "location": " Россия",
        "info": "Анкудинка — река в Среднеколымском улусе Республики Саха. Левый приток Колымы.Длина реки — 123 км, площадь бассейна — 1380 км². Берёт начало в северной части одноимённой горы. От истока течёт на запад, но, постепенно уклоняясь влево (в обход горы), меняет направление течения на восточное. Течение проходит по болотистой местности через многочисленные озёра. Впадает в Колыму по левому берегу в городе Среднеколымск (641 км от устья), имеется мост через реку в городе.В бассейне реки также находится село Хатынгнах.Основные притоки (от устья, в скобках указана длина в км):По данным государственного водного реестра России относится к Анадыро-Колымскому бассейновому округу.Код водного объекта в реестре — 19010100412119000043706."
     },
       {
        "name": "Аннаполис",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%BD%D0%B0%D0%BF%D0%BE%D0%BB%D0%B8%D1%81_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/AnnapolisRoyalNSSkyline.jpg/250px-AnnapolisRoyalNSSkyline.jpg",
        "length": "120 км",
        "pool": "2000  км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Аннаполис-Бэйсин",
        "location": "Канада",
        "info": "Аннаполис (англ. Annapolis River) — река в канадской провинции Новая Шотландия. Длина реки — 120 км, площадь водосборного бассейна — 2000 км². Река протекает по полуострову Новая Шотландия в юго-западном направлении. Впадает в Аннаполис-Бэйсин — эстуарий, соединённый с заливом Фанди узким проливом. Освоение долины реки европейцами происходило одним из первых на территории современной Канады. В 1605 году Самюэль Шамплен и Пьер Дюгуа основали Порт-Рояль[en], сегодня — национальное историческое место."
     },
              {
        "name": "Ансэба ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D1%81%D1%8D%D0%B1%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Anseba.jpg/250px-Anseba.jpg",
        "length": "346 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Барака",
        "location": " Эритрея",
        "info": "Ансэба (тигринья ኣንሰባ, англ. Anseba) — река в Эритрее, течёт с Эритрейского нагорья в направлении равнин Судана. Является одной из четырёх крупнейших рек страны. Длина 346 километров, Ансэба берёт начало неподалёку от Асмэры и протекает в северо-восточном направлении через Кэрэн. Она впадает в реку Барка у границы с Суданом.Притоками Ансэбы являются реки Сала, Телуй (правые), Хор-Дзара (левый).По имени реки названа одноимённая провинция Эритреи (Ансэба)."
     },
                 {
        "name": "Ануй ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D1%83%D0%B9_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/%D0%A0._%D0%90%D0%BD%D1%83%D0%B9.jpg/250px-%D0%A0._%D0%90%D0%BD%D1%83%D0%B9.jpg",
        "length": "327 км",
        "pool": "6930 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Обь",
        "location": " Россия",
        "info": "Ану́й — река в Республике Алтай и Алтайском крае, левый приток Оби. Длина реки составляет 327 км, площадь бассейна 6930 км².Исток находится в Усть-Канском районе Республики Алтай, протекает по нему 35 км. В Алтайском крае река протекает по территории Солонешенского, Петропавловского, Быстроистокского и Смоленского районов.Основные притоки: Сибирка (Сибирячиха — левый, длина 34 км), Слюдянка (левый, 46 км), Соловьиха (правый, 32 км), Кудриха (левый, 32 км), Камышенка (правый, 67 км), Карама (277 км), Каракол (294 км).На берегах расположены районные центры Солонешное и Петропавловское. До середины 1950 годов река использовалась для молевого сплава леса.В 2008 году ОАО «РусГидро» исследовало возможность использования Ануя для строительства каскада гидроэлектростанций. К настоящему времени проведено обследование створов реки Ануй, определено возможно место строительства ГЭС на Ануе мощностью 1.2 МВт и мощностью 6.5 МВт возле сёл Солонешное и Сибирячиха.В последних числах мая 2014 года в результате продолжительных дождей произошёл резкий подъём воды в реках предгорных районов Алтая (Солонешенском, Чарышском, Солтонском, Красногорском). В Солонешном Ануй 30 мая затопил центральную, низменную часть села. На реке было снесено до семи деревянных мостовых переправ. В селе Антоньевка Петропавловского района Ануй снёс подвесной мост, на котором в тот момент находились пятеро местных жителей. В результате двое мужчин были смыты в воду и пропали без вести."
     },
         {
        "name": "Апалачикола",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BF%D0%B0%D0%BB%D0%B0%D1%87%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Apalachicola_River.jpg/250px-Apalachicola_River.jpg",
        "length": "180 км",
        "pool": "51 800 км²",
        "consumption": "undefined",
        "head": "Слияние рек: Чаттахучи и Флинт",
        "estuary": "Мексиканский залив",
        "location": "США",
        "info": "Апалачико́ла[1] (англ. Apalachicola) — река в штате Флорида. Исток реки находится в месте слияния рек Чаттахучи и Флинт на границе штата, далее Апалачикола протекает в южном направлении, впадая в одноимённый залив, являющийся частью Мексиканского залива. Длина реки оценивается от 155 до 180 км, если считать от истока Чаттахучи, то более 800 км. Питание реки дождевое. Судоходство действует на всём протяжении. Река известна также тем, что к востоку и западу от неё находятся разные часовые пояса (UTC-5 и UTC-6), несмотря на небольшую площадь Флориды. На восточном берегу реки растёт редчайший вид — тис флоридский, его ареал составляет всего 10 км². Это единственное место его естественного обитания.[2]"
     },
         {
        "name": "Аппоматтокс ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BF%D0%BF%D0%BE%D0%BC%D0%B0%D1%82%D1%82%D0%BE%D0%BA%D1%81_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Appomattox_River.jpg/250px-Appomattox_River.jpg",
        "length": "253 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Джеймс",
        "location": " США",
        "info": "Река Аппоматтокс (англ. Appomattox River) — река в штате Виргиния (США), приток реки Джеймс. Река названа в честь жившего когда-то в этих местах индейского племени аппоматтоков, и поэтому в исторических документах имеется много различных вариантов написания её названия (Apamatuck, Apamutiky, Appamattuck, Appomattake, Apumetecs и т. п.).Исток реки расположен в 16 км к северо-востоку от административного центра округа Аппоматтокс. Оттуда она течёт в общем направлении на юго-восток сквозь Государственный лес Аппоматтокс-Бакингем к Фармвилу. От Фармвила она течёт по большой дуге сначала на северо-восток, а затем на юго-восток, протекает юго-западнее Ричмонда, течёт сквозь Питерсберг (откуда становится судоходной), и впадает в реку Джеймс в Хоупвелле.Английские колонисты в Виргинии попытались переименовать реку в «Бристол» (Bristoll River), но прижилось индейское название. В годы гражданской войны в этих местах в 1865 году развернулась Аппоматтоксская кампания."
     },
     {
        "name": "Апсат",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BF%D1%81%D0%B0%D1%82",
        "image": "undefined",
        "length": "105 км",
        "pool": "1280 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Чара",
        "location": " Россия",
        "info": "Апса́т — река в Забайкальском крае России, левый приток Чары.Длина реки — 105 км. Площадь бассейна — 1280 км². Средняя глубина — 0,9 метра, максимальная — 1,2 метра. Дно каменисто-галечное. На реке находится 10-метровый Апсатский водопад.Богат рыбой, в частности: ленок, хариус, таймень, валёк, плотва, налим, щука, окунь.[источник не указан 672 дня]"
     },
       {
        "name": "Апука ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BF%D1%83%D0%BA%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "296 км",
        "pool": "13 600 км²",
        "consumption": "340 м³/с",
        "head": " ",
        "estuary": "Олюторский залив",
        "location": " Россия",
        "info": "Апу́ка (Апукваям) — река на северо-востоке полуострова Камчатка в России. Протекает по территории Олюторского района Камчатского края.Берёт истоки в отрогах горы Ледяной, течёт вдоль Олюторского хребта, впадает в Олюторский залив Берингова моря. Длина реки — 296 км, площадь бассейна 13 600 км². По площади бассейна Апука занимает 5-е место среди рек Камчатского края и 69-е — в России. Густота речной сети 0,91 км/км².В верхнем течении Апука имеет горный характер, в среднем и нижнем течении приобретает черты равнинной реки. Русло делится на рукава и пойменные протоки, сильно меандрирует, в пойме обилие стариц и маленьких озёр. В нижнем течении долина Апуки широкая, заболоченная. Место впадения реки в лиман отделено от Олюторского залива песчаной косой.Продолжительность половодья 65-75 дней, заканчивается в начале августа. Река начинает замерзать в начале октября, устойчивый ледяной покров устанавливается в конце октября — начале ноября. Продолжительность ледостава 220—240 дней. Толщина льда достигает 120 см. Река вскрывается в конце апреля — начале мая.Температура воды летом в среднем составляет +5 °C … +8 °C. Мутность воды 25-50 мг/л. Минерализация воды в период максимального стока не превышает 50 мг/л. По химическому составу речная вода относится к гидрокарбонатному классу и кальциевой группе."
     },
     {
        "name": "Апуре ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BF%D1%83%D1%80%D0%B5_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Vista_a%C3%A9rea_de_San_Fernando_de_Apure_%28Apure%29_y_Puerto_Miranda_%28Gu%C3%A1rico%29_y_el_R%C3%ADo_Apure._Venezuela..jpg/250px-Vista_a%C3%A9rea_de_San_Fernando_de_Apure_%28Apure%29_y_Puerto_Miranda_%28Gu%C3%A1rico%29_y_el_R%C3%ADo_Apure._Venezuela..jpg",
        "length": "1580 км",
        "pool": "147 000 км²",
        "consumption": "2000 м³/с",
        "head": " ",
        "estuary": "Ориноко",
        "location": " Венесуэла",
        "info": "Апу́ре (исп. Apure; в верховьях Урибанте) — река на юго-западе Венесуэлы, левый приток южноамериканской реки Ориноко, протекающий по большей части через льянос.Протяжённость реки Апуре составляет 1580 километров, площадь бассейна 147 000 км², средний расход воды ≈ 2000 м³/с.Река берёт начало на высоте 1195 метров над уровнем моря в горах Кордильера-де-Мерида под названием Урибанте. Протекает с запада на восток по низменности Льянос-Ориноко. Впадает в Ориноко несколькими рукавами с левой стороны на высоте 22 метров над уровнем моря. Апуре весьма многоводна в сезон дождей — с мая до октября-ноября; для неё характерны бурные паводки.Согласно Энциклопедическому словарю Брокгауза и Ефрона: «К концу дождливого времени года его уровень поднимается на 12 метров; прилегающая область представляет после стока воды прекраснейшие луга». Там же сказано, что по имени реки был назван один из штатов страны.Река Апуре является важной транспортной артерией региона. Судоходна в период дождей на 1400 километров, в сухой сезон — до места впадения левого притока — реки Португеса, у которого находится город Сан-Фернандо-де-Апуре."
     },
     {
        "name": "Апуримак",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D0%BF%D1%83%D1%80%D0%B8%D0%BC%D0%B0%D0%BA",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Rio_apurimac.jpg/250px-Rio_apurimac.jpg",
        "length": "1250 км",
        "pool": "125 000 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Укаяли",
        "location": " Перу",
        "info": "Апури́мак (в нижнем течении Эне, Тамбо, исп. Río Apurímac) — река в Южной Америке, в Перу, левая составляющая реки Укаяли (бассейн Амазонки).Длина 1250 км (по данным Большой Советской Энциклопедии (3-е издание)), 750 км (по данным Большой Российской). Площадь бассейна около 125 тысяч км². Берёт начало на плоскогорье Пуна в Центральных Андах, к северо-западу от озера Титикака, течёт на северо-запад в глубоких узких долинах, расчленяющих хребты Анд. Питание преимущественно дождевое. Средний расход около 2,9 тысяч м³/с. Наиболее многоводна летом (декабрь-февраль). Очень порожиста, несудоходна. На реке Апуримак расположен город Пуэрто-Прадо.Апуримак — верхнее течение реки Тамбо, которая, соединившись с рекой Урубамба на высоте 272 м над уровнем моря, образует Укаяли — одну из величайших рек Южной Америки.Апуримак прорезывают Кордильеры Перу; начало он берёт из озера Вилафро (у туземцев Хуанана), расположенного в перуанском департаменте Арекипа, течёт сперва по направлению к северу через департамент Куско, затем делает поворот на северо-запад и образует границу между департаментами Куско и Апуримак; из последнего в него впадает слева приток Пахахака, после чего он вступает в департамент Аякучо, где слева же принимает ещё более значительный приток, Мантаро. Здесь Апуримак получает данное ему туземцами название Эне (то есть Великая река), а при впадении в него левого притока Перене он переменяет это название на Тамбо и, наконец, пробежав 1250 км, сливается с рекой Урубамба. Течение Апуримака постоянно стремительное, а русло его, теснимое крупными утёсами, во многих местах почти сплошь покрыто камнями. Быстрота течения, а также многочисленные водопады (Хаупимайо, Хифлон-Вертиман и другие) и водовороты (Капасияркви и другие) являются непреодолимыми препятствиями судоходству по реке. Почти до впадения Монтаро плавание крайне опасно, и лишь ниже Хифлон-Вертимана, где Апуримак называется уже Тамбо, река менее стремительна и становится безопасной для судов определённых размеров."
     },
              {
        "name": "Арагон ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B0%D0%B3%D0%BE%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/El_rio_Aragon_visto_desde_lo_alto_del_barranco_de_Penalen.jpg/250px-El_rio_Aragon_visto_desde_lo_alto_del_barranco_de_Penalen.jpg",
        "length": "192 км",
        "pool": "8903 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Эбро",
        "location": " Испания",
        "info": "Араго́н (исп. Aragón) — река в Арагоне и Наварре, Испания. Начинается в Пиренеях на Пико-де-Канфранк, и впадает в реку Эбро. Длина реки — 192 км. Площадь водосборного бассейна — 8903 км².Исток реки находится в Астуне на высоте 2050 м, потом она течёт на юг через Хаку, Хасетанию, Канфранк, затем поворачивает на запад, где образовывает Йесское водохранилище, после него Арагон несёт свои воды на Юго-Запад и впадает в Эбро, около Милагро. Притоки: Вераль, Эска, Ирати (близ Сангуэсы), Арга.[источник не указан 565 дней]"
     },
     {
        "name": "Арагуари ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B0%D0%B3%D1%83%D0%B0%D1%80%D0%B8_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Undular_bore_Araguari_River-Brazil-USGS-bws00026.jpg/250px-Undular_bore_Araguari_River-Brazil-USGS-bws00026.jpg",
        "length": "380 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Атлантический океан",
        "location": " Бразилия",
        "info": "Арагуари (также Рио-Арагуари; порт. Rio Araguari) — река на севере Бразилии, вторая по величине река штата Амапа (после реки Амазонка).Длина 380 км, берёт начало на западном склоне возвышенности Серра-Ломбарда, течёт на юг до муниципального Серра-ду-Навиу, затем на юго-восток до Порту-Гранде, где в неё впадает приток Амапари, и, после серии порогов направляется к северо-востоку, где образует извилистый эстуарий при впадении в Атлантический океан.На реке расположены населённые пункты: Калсуэни, Серра-ду-Навиу, Педра-Бранка-ду-Амапари, Феррейра-Гомис, Тартаругальзинью, Кутиас, Амапа (село) и Макапа, столица штата. На реке есть 7 порогов: Анта, Аррепендидо, Анта-Горда, Педрас, Кальдерон, Паредон и Аракари.В XIX веке по Арагуари проходила крайняя граница территориальных претензий Франции."
     },
     {
        "name": "Арагуая",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B0%D0%B3%D1%83%D0%B0%D1%8F",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Rio_araguaia.jpg/250px-Rio_araguaia.jpg",
        "length": "2630 км",
        "pool": "370 000 км²",
        "consumption": "8500 м³/с",
        "head": " ",
        "estuary": "Токантинс",
        "location": " Бразилия",
        "info": "Арагуа́я — река в Бразилии.Длина — 2630 км, площадь бассейна — 370 000 км². Течёт по Бразильскому плоскогорью.В среднем течении разветвляется на два рукава, образует один из крупнейших в мире речных островов длиной 300 км (Бананал). В нижнем течении — пороги, в среднем течении — судоходна на протяжении 1300 км. Средний расход воды — 8500 м³. Высота устья — 89 м над уровнем моря.[источник не указан 2100 дней] Высота истока — 760 м над уровнем моря.[источник не указан 2100 дней]Впадает в Токантинс.В период дождей (ноябрь-май) — паводок, в засушливый сезон (июнь-сентябрь) маловодна. На ней расположены города Арагуасема и Макауба с населением более 30 000 человек. В районе её протекания чередуются субэкваториальные леса, саванны и вечнозелёные галерейные леса вдоль берегов.Основной приток — река Коку."
     },
      {
        "name": "Аракава ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B0%D0%BA%D0%B0%D0%B2%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/AraKawa2004-12.jpg/250px-AraKawa2004-12.jpg",
        "length": "173 км",
        "pool": "2940 км²",
        "consumption": "30 м³/с",
        "head": " ",
        "estuary": "Токийский залив",
        "location": " Япония",
        "info": "Аракава (яп. 荒川) — река на острове Хонсю, Япония. Протекает по территории префектур Токио и Сайтама.Длина реки составляет 173 км, на территории её бассейна (2940 км²) проживает около 9,8 млн человек. Согласно японской классификации, Аракава является рекой первого класса.Река берёт своё начало на склонах горы Кобуси в префектуре Сайтама, после чего, протекая в южном направлении через японскую столицу Токио, впадает в Токийский залив в районе аэропорта Ханэда. У моста Онари в префектуре Сайтама река расширяется до 2537 м, считаясь самой широкой в Японии.Основной приток — река Нака."
     },
      {
        "name": "Аранка",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B0%D0%BD%D0%BA%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Zlatica_River_near_Padej.jpg/250px-Zlatica_River_near_Padej.jpg",
        "length": "117 км",
        "pool": "1470 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Тиса",
        "location": "",
        "info": "Аранка (рум. Aranca, серб. Златица) — река на западе Румынии и севере Сербии, левый приток Тисы.В переводе с сербского (серб. Златица) языка означает золотая.Река берёт начало у румынского села Секусиджу в болотистой пойме реки Марош, за 3-4 км от её левого берега. Течет сначала параллельно Мурешу на запад до города Сынниколау-Маре, где поворачивает на юго-запад. Русло очень извилистое, большей частью канализированное. Возле села Язово как ответвление начинается канал Бега, который отходит на восток.Аранка принадлежит бассейну реки Дунай. Судоходство возможно лишь на расстоянии 10 км, благодаря чему возможно орошение долины. Близ деревни Остоичево расположен рыбоводный пруд, близ д. Челеруша — болотистая местность.Длина реки составляет 117 км, из них 41 км она протекает по территории Румынии, а 76 км — по автономному краю Сербии Воеводине. Площадь водосбора составляет 1470 км²."
     },
     {
        "name": "Арапей-Гранде",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B0%D0%BF%D0%B5%D0%B9-%D0%93%D1%80%D0%B0%D0%BD%D0%B4%D0%B5",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Arapey_-_panoramio.jpg/250px-Arapey_-_panoramio.jpg",
        "length": "240 км",
        "pool": "11 410 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Уругвай",
        "location": " Уругвай",
        "info": "Арапей-Гранде (исп. Río Arapey) или Арапей — река в республике Уругвай, левый приток реки Уругвай, одна из крупнейших рек на севере страны.Река Арапей-Гранде берёт начало на возвышенности Кучилья-де-Аэдо, пересекает департамент Сальто с востока на запад и впадает в водохранилище Сальто-Гранде. Река имеет около 100 притоков, по её правому притоку Арапей-Чико проходит часть границы между департаментами Сальто и Артигас.Длина реки составляет 240 км, бассейн реки занимает площадь 11400 км²."
     },
      {
        "name": "Араука ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B0%D1%83%D0%BA%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/EL_HERMOSO_RIO_ARAUCA_%28cropped%29.jpg/250px-EL_HERMOSO_RIO_ARAUCA_%28cropped%29.jpg",
        "length": "900 км",
        "pool": "18 000 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Ориноко",
        "location": " Колумбия,  Венесуэла",
        "info": "Ара́ука (исп. Arauca) — река на севере Южной Америки, левый приток Ориноко.Длина около 900 км (по другим данным — 1300 км), площадь бассейна 18 000 км².Исток находится в Восточной Кордильере Колумбии, на значительном протяжении по руслу реки проходит линия государственной границы между Венесуэлой и Колумбией, далее течёт по низменности Льянос-Ориноко в Венесуэле. В половодье (с мая по октябрь—ноябрь) судоходна на протяжении 600 км."
     },
                 {
        "name": "Арв",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B2",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Arve_Annemasse.jpg/250px-Arve_Annemasse.jpg",
        "length": "102 км",
        "pool": "2060 км²",
        "consumption": "73,9 м³/с",
        "head": " ",
        "estuary": "Рона",
        "location": "",
        "info": "Арв (фр. Arve) — река во Франции и Швейцарии. Длина реки составляет около 102 км. Площадь бассейна — около 2060 км². Средний расход воды — 73,9 м³/с.Находится на юго-востоке Франции, в департаменте Верхняя Савойя. Арв является одним из левых притоков реки Рона. Исток находится в Грайских Альпах, недалеко от швейцарской границы.Река Арв с зимним паводком, с декабря по март включительно максимум в январе-феврале. Самый низкий уровень воды в реке летом, в период с июля по сентябрь включительно."
     },
       {
        "name": "Арга ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B3%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Watershed_of_the_Arga-fr.png/250px-Watershed_of_the_Arga-fr.png",
        "length": "148,5 км",
        "pool": "2731 км²",
        "consumption": "49,4 м³/с",
        "head": " ",
        "estuary": "Арагон",
        "location": " Испания",
        "info": "Арга (исп. Arga) — река на севере Испании, в провинции Наварра, приток реки Арагон. Длина реки составляет около 148,5 км, а площадь её водосборного бассейна — 2731 км². Годовой сток реки равен 1559 миллионам кубометров, что эквивалентно среднему расходу воды в 49,4 м³/с.Арга берёт начало в Пиренеях на высоте около 1018 метров над уровнем моря и течёт в южном направлении. Река протекает через муниципалитеты Эстерибар, Уарте, Вильява, Бурлада, Памплона, Бараньяйн, Ольса, Эчаури, Беласкоайн, Пуэнте-ла-Рейна, Мендигорриа, Ларрага, Бербинсана, Миранда-де-Арга, Фальсес, Перальта и Фунес. Впадает в реку Арагон с правой стороны незадолго до впадения последней в реку Эбро, на высоте примерно 277 м н.у.м."
     },
     {
        "name": "Арга-Сала (приток Оленька)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B3%D0%B0-%D0%A1%D0%B0%D0%BB%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9E%D0%BB%D0%B5%D0%BD%D1%8C%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Olenyok.png/250px-Olenyok.png",
        "length": "503 км",
        "pool": "47 700 км²",
        "consumption": "undefined",
        "head": "слияние рек: Левая Арга-Сала и Правая Арга-Сала",
        "estuary": "Оленёк",
        "location": " Россия",
        "info": "Арга́-Сала́ — река в по территории Оленёкского района Якутии и Эвенкийского района Красноярского края. Левый приток реки Оленёк. Образуется от слияния рек Правая Арга-Сала и Левая Арга-Сала. Длина реки — 503 км, площадь водосборного бассейна — 47 700 км². Протекает по Среднесибирскому плоскогорью, изобилует порогами, обусловленными выходами траппов.Название в переводе с якут. Арҕаа Салаа — «западный проток»."
     },
     {
        "name": "Арга-Тюнг",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B3%D0%B0-%D0%A2%D1%8E%D0%BD%D0%B3",
        "image": "undefined",
        "length": "193 км",
        "pool": "3220 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Тюнг",
        "location": " Россия",
        "info": "Арга-Тюнг (якут. Арҕаа Түҥ) — река в России, протекает по территории Оленёкского района Якутии. Левый приток реки Тюнг, относится к бассейну Лены. Длина реки — 193 км, площадь водосборного бассейна — 3220 км².Начинается в северо-восточной части Среднесибирского плоскогорья между истоками Тюнга и Улах-Муны. Течёт в юго-восточном направлении через лиственничную тайгу. Долина реки частично заболочена.Впадает в Тюнг слева на расстоянии 849 километров от его устья. Ширина реки около устья — 75 метров, глубина — 1 метр, скорость течения 0,5 м/с.Объекты перечислены по порядку от устья к истоку."
     },
     {
        "name": "Арга-Юрях (приток Омолоя)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B3%D0%B0-%D0%AE%D1%80%D1%8F%D1%85_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9E%D0%BC%D0%BE%D0%BB%D0%BE%D1%8F)",
        "image": "undefined",
        "length": "214 км",
        "pool": "5530 км²",
        "consumption": "undefined",
        "head": "Cлияние рек: Мундукан и Хадарыння",
        "estuary": "Омолой",
        "location": "Россия",
        "info": "Арга́-Юря́х[2][3][4] (устар. Аргаа-Юрэх[5]; якут. Арҕаа Үрэх)[6] — река в России, течёт по территории Усть-Янского и Булунского улусов Якутии[2][7]. Длина реки составляет 214 км. Площадь водосборного бассейна равняется 5530 км²[5]. Начинается от слияния рек Мундукан и Хадарыння на высоте 253 м над уровнем моря[8]. Устье реки находится в 190 км по левому берегу Омолоя[5]."
     },
     {
        "name": "Арга-Юрях (приток Россохи)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B3%D0%B0-%D0%AE%D1%80%D1%8F%D1%85_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A0%D0%BE%D1%81%D1%81%D0%BE%D1%85%D0%B8)",
        "image": "undefined",
        "length": "312 км",
        "pool": "5600 км²",
        "consumption": "undefined",
        "head": "слияние рек: Зея и Таба-Бастаах",
        "estuary": "Россоха",
        "location": " Россия",
        "info": "Арга́-Юря́х — река в Среднеколымском улусе Якутии, левая составляющая реки Россохи (бассейн Алазеи). Длина реки — 312 км, площадь водосборного бассейна — 5600 км². Образуется при слиянии рек Зея и Таба-Бастаах, стекающих с хребта Улахан-Сис. Течёт по Колымской низменности, озёрность 15,2 %. Питание снеговое, дождевое и налёдное.Название в переводе с якут. Арҕаа-үрэх — «западная река»."
     },
     {
        "name": "Аргандаб",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B3%D0%B0%D0%BD%D0%B4%D0%B0%D0%B1",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Baba_Saab.JPG/250px-Baba_Saab.JPG",
        "length": "562 км",
        "pool": "53 000 км²",
        "consumption": "44,7 м³/с",
        "head": "слияние рек: Харбед и Камарак",
        "estuary": "Гильменд",
        "location": " Афганистан",
        "info": "Арганда́б[1] (перс. رود ارغنداب; в верховье Сайдахмад[2]) — река в центральной части Афганистана[3]. Левый и самый крупный приток реки Гильменд[4][5].Длина — 562 км, по прямой — 420 км, коэффициент извилистости — 1,34 %, сумма длин русловых образований 3116 км. Высота истока — 3900 м, устья — 749 м, средний уклон — 0,56 %. Площадь бассейна — 53000 км².[4] Средний годовой расход воды около 44,7 м³/сек у выхода из гор, в половодье 100—150 м³/с, зимний — 20-30 м³/с. Наименьший сток в сентябре: в устье — 3,1 м³/сек, у выхода из гор в сентябре — 9,3 м³/с[5].Берёт начало при слиянии рек Харбед и Камарак[2] и течёт в юго-западном направлении, пока не достигает русла реки Гильменд. С восточной стороны параллельно Аргандабу протекает река Тарнак, которая впадает в её левый приток Дори.В нижнем течении Аргандаба воды реки используются для ирригации, так как местные земельные угодья плодотворно культивируется и является обжитой. Селения вдоль реки встречаются редко. Имеется шоссе, соединяющее Кабул и Кандагар (расположен между реками Аргандаб и Тарнак).[6]В 2008 году объявлено о начале реализации проекта по модернизации плотины Дала[en], что должно привести к двоекратному увеличению площади орошаемых земель, прилегающих к Аргандабу. Стоимость проекта оценивается в $50 млн[7][8]."
     },
     {
        "name": "Аргастан",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B3%D0%B0%D1%81%D1%82%D0%B0%D0%BD",
        "image": "undefined",
        "length": "344 км",
        "pool": "15 500 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Дори",
        "location": " Афганистан",
        "info": "Аргаста́н — река в южной части Афганистана, протекающая по территории провинций Забуль и Кандагар. В верховье протекает между Афганистаном и Пакистаном. Основной приток — Лора.Длина — 344 км, по прямой — 258 км, коэффициент извилистости — 1,33 %, сумма длин русловых образований 894 км. Площадь водосбора — 15500 км². Высота истока — 2600 м, устья — 985 м. Средний уклон — 0,47 %. Питание дождевое. Из-за использования воды на орошение, река часто пересыхает. Расход воды крайне неравномерный, от 0 до 1000 м³/с.Для орошения 5000 акров (более 2000 га), с помощью плотины «Лавари» на реке создано водохранилище объемом 126 000 м³. Стоимость объекта — 3,8 млн афгани.[источник не указан 459 дней]"
     },
     {
        "name": "Арги",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B3%D0%B8",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Zeya.png/250px-Zeya.png",
        "length": "350 км",
        "pool": "7090 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Зея",
        "location": " Россия",
        "info": "Арги́ (Арга[2]) — река в Амурской области, впадает в северо-восточную часть Зейского водохранилища.До строительства Зейской ГЭС являлась левым притоком Зеи. Питание преимущественно дождевое. Половодье с апреля по сентябрь[3]. Устье Арги находится примерно в 20 км к югу от места впадения Зеи в Зейское водохранилище.Длина реки — 350 км, площадь водосборного бассейна — 7090 км²[2]. Протекает по Верхнезейской равнине.Код водного объекта — 20030400112118100024282[2].Ближайшие к устью Арги населённые пункты — Бомнак, Горный и Верхнезейск, расположены на расстоянии около 60 км.Предположительно название реки произошло от эвенкийского арги — «лес» или якутского «арга» — «тыл, задняя сторона»[4].Объекты перечислены по порядку от устья к истоку."
     },
      {
        "name": "Аргун ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B3%D1%83%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Shatili_valley.jpg/250px-Shatili_valley.jpg",
        "length": "148 км",
        "pool": "3390 км²",
        "consumption": "45,6 м³/с (с. Дуба-Юрт (Шалинский район))",
        "head": " ",
        "estuary": "Сунжа",
        "location": "",
        "info": "Аргу́н (чечен. Чӏаьнтий-Орг, груз. არღუნი) — река на Северном Кавказе на территории Грузии и России, правый приток Сунжи (бассейн Терека).Длина реки — 148 км, площадь бассейна — 3390 км². Средний уклон 17,63 м/км. Средний расход воды — 45,6 м³/с.[источник не указан 2087 дней] Питание смешанное. Сплошного ледостава на Аргуне не бывает.Аргун берёт начало из ледников на северных склонах Большого Кавказского хребта. В верхнем течении, до слияния с рекой Шароаргун, исторически называется Чанты-Аргун.Далее, до выхода на равнину (так называемые «Аргунские ворота» (Бокового Кавказского хребта)) река течёт по горной Чечне в Аргунском ущелье, которое вблизи истоков реки более или менее безлесно, а ниже покрыто почти сплошными лесами. Вбирает в себя многочисленные горные потоки, самый крупный из которых — река Шароаргун соединяется с Аргуном непосредственно у «ворот». Горная часть бассейна Аргуна и его притоков составляют западную часть горной Чечни — Итум-Калинский и Шатойский районы. Эта область является одним из первоначальных мест поселения чеченцев и характеризуется многочисленными развалинами древних аулов с традиционными сооружениями башенного типа.После выхода на равнину по Аргуну проходит граница между Грозненским и Шалинским районами Чечни до впадения в Сунжу. Долина густо заселена. До войны[какой?] характеризовалась практически непрерывной застройкой частными домами усадебного типа."
     },
     {
        "name": "Аргунь",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B3%D1%83%D0%BD%D1%8C",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Argun_River_near_Inner_Mogolia.jpg/250px-Argun_River_near_Inner_Mogolia.jpg",
        "length": "1620 км",
        "pool": "164 000 км²",
        "consumption": "186 м³/с",
        "head": " ",
        "estuary": "Амур",
        "location": "",
        "info": "Аргу́нь (в верхнем течении — Хайла́р; бур. Υргэнэ, монг. Эргүнэ, эвенк. Ергэне, кит. 额尔古纳河) — река в Китае и России, правая составляющая Амура. По части реки проходит российско-китайская граница.Современная транскрипция названия реки происходит от эвенк. Ергэне — «извилистая река». В переводе с монг. Эргүнэ — означает «широкий». На китайском языке она называется Эргуньхэ (река Эргунь), в верховьях известна как Хайлар. Существует другое, менее вероятное объяснение происхождения названия реки. Забайкальский краевед и врач Н. Кашин писал в своей статье «Несколько слов об Аргуни», что «монголы зовут её не Аргунью, а Аргуном, что значит: приторный, жирный».Существовали и другие транскрипции: Эргунэ (у монголов), Аргуна (у Рашид ад-Дина), Ургену (в хронике Т. Тобоева), Эргунь (у краеведа И. Юренского, 1852), Аргонь (у гольдов, по Максимовичу). У русских впервые название этой реки встречается: на «Чертеже Сибири» 1667 года как Аргуня, на «Чертеже» 1698 года как река Аргуна.Длина реки — 1620 км, площадь её водосборного бассейна — 164 000 км². Берёт своё начало в горах Большого Хингана и на протяжении 669 километров протекает по территории Китая, где называется Хайларом (Хайлархэ). Далее 951 километр пограничная река между Россией и Китаем. По выходе из Китая имеет широкую долину с обширной поймой; ближе к устью долина сужается. Сливаясь с рекой Шилкой образует реку Амур."
     },
     {
        "name": "Аргут",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B3%D1%83%D1%82",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/%D0%A3%D1%81%D1%82%D1%8C%D0%B5_%D0%90%D1%80%D0%B3%D1%83%D1%82%D0%B0.jpg/250px-%D0%A3%D1%81%D1%82%D1%8C%D0%B5_%D0%90%D1%80%D0%B3%D1%83%D1%82%D0%B0.jpg",
        "length": "106 км",
        "pool": "9550 км²",
        "consumption": "112 м³/с (в устье)",
        "head": "слияние рек: Акалаха и Джазатор",
        "estuary": "Катунь",
        "location": " Россия",
        "info": "Аргу́т — река в центральной части Алтая, правый приток Катуни.Длина 106 км (без реки Акалаха, вместе с ней — 232 км), площадь водосборного бассейна — 9550 км². Аргут начинается при слиянии Джазатора и Акалахи. Вблизи от слияния на правом берегу Джазатора расположено село Беляши. Направление течения преимущественно юго-западное. Впадает в Катунь в 390 км от её устья. Обилие ледников Катунского и Чуйского хребтов определяет характер водного режима: 40 % стока дают ледники и вечные снега, 34 % — сезонные снега, 17 % — дожди, 9 % — подземные воды. Замерзает в ноябре, вскрывается в апреле. Средний уклон реки 10 м/км, среднегодовой расход в устье 112 м³/с.[источник не указан 960 дней]Высота истока — 1531,4 м над уровнем моря. Высота устья — 765 м над уровнем моря.[источник не указан 960 дней]Одной из достопримечательностей реки является Карагемский прорыв. Здесь Аргут, имеющий огромный для горной реки расход воды, прорезает себе путь через Катунский хребет, образуя пятикилометровый каньон. Первопрохождение прорыва было совершено в 2003 году барнаульскими водниками — Александром Проваторовым, Сергеем Блошкиным, Владиславом Зыряновым на судне типа «Бублик».Приведены также притоки левой составляющей Аргута — Акалахи (вторая колонка). (указаны км от устья)"
     },
        {
        "name": "Ардеш ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B4%D0%B5%D1%88_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/CirqueMadeleine.jpg/250px-CirqueMadeleine.jpg",
        "length": "125 км",
        "pool": "2430 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Рона",
        "location": " Франция",
        "info": "Арде́ш (фр. Ardèche) — река на юге центральной части Франции. Длина 125 км. Площадь бассейна 2430 км².Ардеш является одним из правых притоков реки Роны. Исток находится в Центральном массиве.Река Ардеш с зимним паводком, с декабря по март включительно максимум в январе-феврале. Самый низкий уровень воды в реке летом, в период с июля по сентябрь включительно.В национальном парке «Ущелья Ардеша» река протекает под естественным мостом в виде арки, рядом с которым находится вход в пещеру Шове с древнейшими наскальными рисунками. На стоянке Абри-дю-Мара в долине реки Ардеш нашли сплетённые в веревку обрывки растительных волокон, датируемые возрастом 52—41 тыс. лет назад.В честь реки назван департамент Ардеш."
     },
     {
        "name": "Арджеш ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B4%D0%B6%D0%B5%D1%88_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Arges_rivier.jpg/250px-Arges_rivier.jpg",
        "length": "335 км",
        "pool": "12 400 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Дунай",
        "location": " Румыния",
        "info": "Арджеш (рум. Râul Argeș) — река в Румынии. Длина — 335 км, площадь водосборного бассейна — 12 400 км².Река формируется на массиве Фэгэраш, далее протекает преимущественно в юго-восточном направлении, где впадает в Дунай напротив румыно-болгарской границы на территории города Олтеница (жудец Кэлэраши), в нижнем течении протекает по Нижнедунайской низменности.Притоки: Дымбовица и Вылсан.Крупный город на реке — Олтеница.Является одной из главных сплавных рек Румынии.У реки Арджеш разворачивается действие «Легенды о Мастере Маноле»[значимость факта?]."
     },
     {
        "name": "Аре",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B5",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Aare_river_in_Bern.jpg/250px-Aare_river_in_Bern.jpg",
        "length": "295 км",
        "pool": "17 800 км²",
        "consumption": "560 м³/с",
        "head": " ",
        "estuary": "Рейн",
        "location": " Швейцария",
        "info": "А́ре, также А́аре (нем. Aare, фр. Aar) — река в Швейцарии, левый приток Рейна. Длина 295 км, площадь бассейна около 17,8 тыс. км². Средний расход воды около 560 м³/с. Ранее употреблявшаяся транскрипция Аара ныне считается устаревшей.Берёт начало из ледника Аре к западу от перевала Гримзель в Бернских Альпах. В верхнем течении Аре — типичная горная река; в долине Гасли образует водопад Гандек высотой 46 м. Протекает через Бриенцское и Тунское озёра, после чего проходит через Тун, а ниже по течению формирует крутую излучину, омывающую высокую скалу, на которой и был основан город Берн — столица Швейцарии; далее течёт по Швейцарскому плато. В месте впадения в Рейн расположен г. Кобленц. Аре более полноводна, чем сам Рейн — расход воды Аре в месте слияния составляет 560 м³/с против 439 м³/с у Рейна.Весенне-летнее половодье; в верховье нередки летние и зимние паводки.Судоходна до Тунского озера. Несколько ГЭС. Соединена искусственными каналами с Бильским озером в рамках проекта регуляции стоков Юры.Города на реке: Берн, Арау, Золотурн, Биль, Ольтен."
     },
     {
        "name": "Ареда ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B5%D0%B4%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "108 км",
        "pool": "1140 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Куэнга",
        "location": " Россия",
        "info": "Ареда́ — река в Забайкальском крае России, правый приток Куэнги.Берёт начало на юго-восточном склоне Нерчинско-Куэнгинского хребта. Длина реки составляет 108 км. Площадь водосбора — 1140 км². Среднегодовой сток в устье — 3 487 000 м³.23 июля 2021 года из-за обрушения железнодорожного моста через реку Ареда между станциями Куэнга и Укурей двух направлениях было полностью остановлено движение поездов на Транссибирской железнодорожной магистрали. В ходе ремонтных работ была произведена установка двух металлических пролётных строений, мостового бруса и рельсов, отсыпка мостовых откосов и усиление земляного полотна. 25 июля было запущено движение в реверсивном виде по одной ветке. 27 июля движение по Транссибу было полностью восстановлено по временной мостовой переправе. Новый мост на этом месте планируется возвести в течение шести-девяти месяцев."
     },
                        {
        "name": "Арикэри",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B8%D0%BA%D1%8D%D1%80%D0%B8",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Arikaree_River.JPG/250px-Arikaree_River.JPG",
        "length": "251 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Репабликан-Ривер",
        "location": " США",
        "info": "Арикэри (англ. Arikaree River) — река в штатах Колорадо, Канзас и Небраска, США. Одна из двух составляющих реки Репабликан-Ривер, которая в свою очередь является одной из двух составляющих реки Канзас. Длина составляет 251 км.Берёт начало близ городка Лаймон, в округе Линкольн, штат Колорадо. Течёт в восточном направлении, пересекает границу со штатом Канзас, протекает через северо-западный угол штата и пересекает границу со штатом Небраска. К северу от деревни Хайглер в округе Данди, штат Небраска, Арикэри сливается с рекой Северная Репабликан-Ривер, формируя реку Репабликан-Ривер.Река получила название по индейской этнической группе арикара. Местность близ реки является местом Битвы на Бичер-Айленд 1868 года."
     },
      {
        "name": "Аринус ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B8%D0%BD%D1%83%D1%81_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "760 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Журуэна",
        "location": " Бразилия",
        "info": "Аринус (порт. Rio Arinos) — река в Бразилии. Открыта португальцем Joam de Souza e Azevedo в 16 веке. Берёт начало вблизи города Диамантину, впадает в Журуэну, которая ниже даёт начало реке Тапажос. У реки есть несколько притоков: Паресис, Агуа Верде, Патос (все левые), Петро (правый) и т. д. В нижнем течении протекает между хребтами Серра-дус-Каябис и Серра-ду-Томбадор."
     },
        {
        "name": "Арканзас ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%BA%D0%B0%D0%BD%D0%B7%D0%B0%D1%81_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Arkansas_head_waters.jpg/250px-Arkansas_head_waters.jpg",
        "length": "2364 км",
        "pool": "505 000 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Миссисипи",
        "location": " США",
        "info": "Арка́нзас (англ. Arkansas River) — река, один из крупнейших правых притоков реки Миссисипи. Арканзас течёт по Великим равнинам на восток и юго-восток, пересекая штаты Колорадо, Канзас, Оклахома и Арканзас.Длина — 2364 километра (шестая в США, второй по длине приток Миссисипи после Миссури). Берёт начало в Скалистых Горах в округе Лейк около Ледвилла, штат Колорадо. Впадает в Миссисипи у городка-призрака Наполеон, описанного Марком Твеном в «Жизнь на Миссисипи». Площадь водосборного бассейна — 505 тысяч км², средний расход воды 240 м³/с. Третий приток Миссисипи после Миссури и Огайо.Первые примерно 200 км в Скалистых горах река носит явно выраженный горный характер. В нескольких местах реки весной и летом возможен рафтинг. Этот участок заканчивается Королевским ущельем (англ. Royal Gorge), каньоном длиной 15 километров, шириной в самом узком месте 15 метров, и глубиной около 400 метров. За ущельем река Арканзас выходит на равнину и становится значительно шире, а чуть западнее города Пуэбло (англ. Pueblo), штат Колорадо, выходит на Великие равнины. Ниже она представляет собой типичную равнинную реку, с низкими берегами, которые весной затопляют наводнения. Два крупнейших притока — Симаррон (англ. Cimarron River) и Солт-Форк-Арканзас (англ. Salt Fork Arkansas River). Ниже Талсы, штат Оклахома, река доступна и для больших судов."
     },
      {
        "name": "Арктик-Ред-Ривер",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%BA%D1%82%D0%B8%D0%BA-%D0%A0%D0%B5%D0%B4-%D0%A0%D0%B8%D0%B2%D0%B5%D1%80",
        "image": "undefined",
        "length": "450 км",
        "pool": "18 800 км²",
        "consumption": "150 м³/с",
        "head": " ",
        "estuary": "Маккензи",
        "location": " Канада",
        "info": "Арктик-Ред-Ривер (англ. Arctic Red River) — река на северо-западе Канады в Северо-Западных территориях, левый приток реки Маккензи. Средний расход воды — 150 м³/с.[источник не указан 962 дня]Берет своё начало от ледников в северной части гор Маккензи в Северо-Западных территориях близ границы территории Юкон. Длина реки составляет около 450 км, а площадь бассейна равна 18 800 км². Первые 120 км течёт в северо-северо-западном направлении вдоль хребтов Бэкбоун и Каньон и спускается на 1300 метров, затем достигает предгорий и течёт вдоль хребтов Йеллоу (Yellow) и Личен (Lichen) плато Пил в глубоком каньоне. В конце пути течёт по долине Маккензи, пересекает Полярный круг и принимает два главных своих притока Грансвик (Granswick River) и Сайнвилл (Sainville River). Впадает в реку Маккензи в 25 км к югу от начала её дельты и приносит большое количество ила. Во время ледохода в мае уровень воды может подняться на 10 метров и льды из русла Маккези выталкиваются на 70 км вверх по течению Арктик-Ред-Ривер.Большая часть горных территорий в верховьях реки вообще лишена растительности или покрыта чахлой тундровой растительностью — мхами, травами и изредка встречающимися карликовыми берёзами. Животный мир представлен тонкорогими баранами, горными карибу, медведями гризли За многие тысячелетия река прорезала себе глубокий каньон, который на 100—200 метров ниже окружающей местности. Чёрные сланцевые утёсы, окружающие реку большую часть пути, изредка сияют красным, пурпурным и жёлтым цветом. Высокие утёсы являются идеальным местом для гнездовий сокола-сапсана. Ниже 900 метров произрастают еловые леса, способные выдерживать ледяной арктический ветер. В долине реки в более благоприятных условия белые ели вырастают до 70 сантиметров в диаметре и доживают до 600 лет."
     },
        {
        "name": "Армань ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%BC%D0%B0%D0%BD%D1%8C_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "197 км",
        "pool": "7770 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Тауйская губа",
        "location": " Россия",
        "info": "А́рмань (в верховье — Ахчан, Артельный) — река в Тенькинском, Хасынском и Ольском районах Магаданской области России.По одной из версий лингвистов название реки происходит от эвенск. слова Анманра — «родник». Согласно другой версии — от также эвенского Анманран — «заторная, наледная».Армань берёт начало на горных склонах Ольском плато и называется там Артельный. Рассекая горы, река выходит на сложенную её же селевыми наносами обширную равнину, разбивается на рукава и впадает в Тауйскую губу Охотского моря у посёлка Армань. Река течёт в меридиональном направлении от Охотско-Колымского водораздела к Охотскому морю, длина — 197 км, площадь водосборного бассейна — 7770 км².Замерзает в конце октября, вскрывается в мае. Питание снеговое и дождевое. Имеется большое количество порогов, перекатов, прижимов. Поэтому при средней скорости течения около 1,3 м/с река широко известна среди байдарочников и в настоящее время[когда?] является самой популярной сплавной рекой Магаданской области. В 5 километрах от устья в Армань впадает её крупнейший (левый) приток — река Хасын. В нижнем течении обе эти реки текут в грудах щебня, вынесенного с гор во время паводков; их русла разбиваются на рукава и постоянно меняют свои очертания; здесь встречаются притопленные коряги. Воды самой Армани при впадении в море дельты не образуют: в устье расположена длинная (до 10 км) и довольно узкая, но постепенно расширяющаяся к западу до 1 км в ширину лагуна, отгороженная от моря песчаной косой. У западной оконечности лагуны через узкую протоку воды Армани попадают в море."
     },
     {
        "name": "Армерия ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%BC%D0%B5%D1%80%D0%B8%D1%8F_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/R%C3%ADo_Armer%C3%ADa.JPG/250px-R%C3%ADo_Armer%C3%ADa.JPG",
        "length": "321 км",
        "pool": "9864 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Тихий океан",
        "location": " Мексика",
        "info": "Армери́я (исп. Río Armería), в верховьях Аюкила (исп. Río Ayuquila) — река на западе Мексики, протекающая по штатам Халиско и Колима. Длина реки — 321 км. Площадь водосборного бассейна, по разным данным, равна 9864, 9805, 9731, 9796, 9867, 9902 км².Начинается в горах Сьерра-де-Кила на высоте 3290 м над уровнем моря, в верховьях носит название Аюкила. При слиянии с основным левым притоком — рекой Тушкакуэско — меняет название на Армерия. Другие притоки — Сан-Пальмар (пр), Сан-Антонио (лв), Комала (лв), Колима (лв). Течёт в общем южном направлении. Впадает в залив Бока-де-Паскуалес Тихого океана.На протяжении 73 км течёт по территории биосферного заповедника Сьерра-де-Манантлан. Армерия протекает по стыку двух физиографических провинций: Сьерра-Мадре-дель-Сур и Эхе-Неовольканико. 60 % территории бассейна занято лесами, 30 % — сельскохозяйственными землями, 10 % — городскими. На территории водосбора Армерии — 32 муниципалитета Халиско и 9 — Колимы. Плотность населения — 55,9 человек на км². В бассейне реки в 2010 году проживало 678670 человек.Среднегодовая температура в бассейне реки — 22 °С. За год выпадает около 800 мм осадков, по другим данным — 1040 мм. Средний расход воды меняется в зависимости от месяца: от 5,6 м³/с в марте до 154,1 м³/с в августе. Среднегодовой расход равен 30,4 м³/с, по другим данным — 29,1 м³/с (на станции Пеньитас)."
     },
     {
        "name": "Армич",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%BC%D0%B8%D1%87",
        "image": "undefined",
        "length": "103 км",
        "pool": "1000 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Чузик",
        "location": " Россия",
        "info": "Армич — река в России, протекает по Томской области. Устье реки находится в 107 км по левому берегу реки Чузик. Длина реки составляет 103 км, площадь водосборного бассейна 1000 км². Притоки — Чульга и Екра. Высота устья — 68 м над уровнем моря.[источник не указан 603 дня]По данным государственного водного реестра России относится к Верхнеобскому бассейновому округу, водохозяйственный участок реки — Обь от впадения реки Кеть до впадения реки Васюган, речной подбассейн реки — Кеть. Речной бассейн реки — (Верхняя) Обь до впадения Иртыша."
     },
        {
        "name": "Арно (река, впадает в Гудзонов пролив)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%BD%D0%BE_(%D1%80%D0%B5%D0%BA%D0%B0,_%D0%B2%D0%BF%D0%B0%D0%B4%D0%B0%D0%B5%D1%82_%D0%B2_%D0%93%D1%83%D0%B4%D0%B7%D0%BE%D0%BD%D0%BE%D0%B2_%D0%BF%D1%80%D0%BE%D0%BB%D0%B8%D0%B2)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Payne_Bay_QC.JPG/250px-Payne_Bay_QC.JPG",
        "length": "377 км",
        "pool": "49 500 км²",
        "consumption": "670 м³/с",
        "head": "Пейн",
        "estuary": "Бухта Пейн",
        "location": " Канада",
        "info": "Арно́ (фр. Rivière Arnaud, англ. Arnaud River, устар. Пейн) — река на севере провинции Квебек (Канада). Средний расход воды — 670 м³/с.[источник не указан 697 дней]Река берёт начало на невысоком плато на полуострове Унгава. Течёт на восток и впадает в бухту Пейн крупного залива Унгава. Имеет довольно большой бассейн и принимает сток от множества озёр, самыми крупными из которых являются Нанте, Клоц, Кутюр и Пейн. Длина реки 377 км. Площадь бассейна реки 49 500 км². На северном берегу бухты Пейн, близ устья реки, расположен инуитский посёлок Кангирсук (прежние названия Пэйн-Бей, Франсис-Бабель, Беллин и Кангиксук).Климат — приполярный высоких широт. Река свободна от льда только очень короткий летний период, но и летом среднесуточная температура низкая (около 7 °C).[источник не указан 697 дней]"
     },
     {
        "name": "Арно (река)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%BD%D0%BE_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Arno_Mouth_Italy_aerial_view.jpg/250px-Arno_Mouth_Italy_aerial_view.jpg",
        "length": "241 км",
        "pool": "8247 км²",
        "consumption": "138 м³/с",
        "head": " ",
        "estuary": "Лигурийское море",
        "location": " Италия",
        "info": "А́рно[1] (итал. Arno, лат. Arnus)[2] — река в Италии, впадает в Лигурийское море, протекает по территории провинций Ареццо, Флоренция и Пиза в области Тоскана[3][4].Протяжённость реки составляет 241 км, площадь водосборного бассейна — 8247 км²[4]. Средний расход воды 138 м³/с. Исток Арно находится в Тоскано-Эмилианских Апеннинах; до города Флоренция протекает в узкой долине, далее — по холмистой равнине[5] через город Эмполи. Впадает в Лигурийское море у города Пиза (у устья — расход 110 м³/с).[источник не указан 49 дней]Известно несколько крупных наводнений на реке, особенно известно наводнение в ноябре 1966 года, когда жертвами стали около 40 человек, и был нанесён значительный ущерб Флоренции.В 1503 году Леонардо да Винчи по заказу Флоренции начал разрабатывать план взятия Пизы путём изменения русла Арно. Изучая геологию долины реки и слои окаменелостей, обнаруженные при рытье каналов, он пришёл к выводу, что структура Земли претерпела значительную трансформацию в течение продолжительного периода времени."
     },
     {
        "name": "Арон ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%BE%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Rivi%C3%A8re_Aron_%282%29.JPG/250px-Rivi%C3%A8re_Aron_%282%29.JPG",
        "length": "105 км",
        "pool": "1600 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Луара",
        "location": " Франция",
        "info": "Арон (фр. Aron) — река во Франции, правый приток Луары. Длина — 101,42 км, площадь бассейна — 1600 км².Истоки реки расположены около деревни Крю-ля-Виль, протекает по плоскогорью Морван на территории департамента Ньевр, после чего впадает в Луару на территории Десиза. На большом своём протяжении русло реки расположено параллельно каналу Ниверне. Крупнейший приток реки — Алена.У деревни Верней находится гидрологическая станция. Среднегодовой расход воды за последние за 1970—2009 годы составляет 17,6 м³/сек, но резко колеблется от времени года: от 40,7 м³/сек в феврале до 2,9 м³/сек в сентябре."
     },
     {
        "name": "Арпа",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%BF%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Areni_village.jpg/250px-Areni_village.jpg",
        "length": "128 км",
        "pool": "2630 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Аракс",
        "location": "undefined",
        "info": "Арпа́ (Восточный Арпачай[1][2]; арм. Արփա, азерб. Arpaçay) — горная река в Армении и Нахичеванской АР (Азербайджан), левый приток Аракса. Длина 128 км, площадь бассейна 2630 км²[3].Берёт начало на склонах Зангезурского хребта. Протекает по узкому и глубокому ущелью, в среднем течении долина расширяется, переходя в нижнем течении в равнину. Основное питание снеговыми и дождевыми водами.Используется для орошения, на реке построен ряд ГЭС (Арпачайская ГЭС[az], строится ГЭС «Арпачай-2»[4]), Кечутское и Арпачайское[az] водохранилища[5]. Сооружен тоннель[hy] длиной 48 км для переброски вод Арпы в озеро Севан[6][7].На реке расположены города Джермук, Вайк и Ехегнадзор.С Арпой отождествляется упоминаемая в Армянской географии VII века река Artawnkn[8]. Существует гипотеза о происхождении названия реки Арпа от тюркского арпа «ячмень»[9]."
     },
      {
        "name": "Арройо-Саладильо",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D1%80%D0%BE%D0%B9%D0%BE-%D0%A1%D0%B0%D0%BB%D0%B0%D0%B4%D0%B8%D0%BB%D1%8C%D0%BE",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Arroyo_saladillo.jpg/250px-Arroyo_saladillo.jpg",
        "length": "145 км",
        "pool": "3144 км²",
        "consumption": "1 м³/с",
        "head": " ",
        "estuary": "Парана",
        "location": " Аргентина",
        "info": "Арройо-Саладильо (исп. Arroyo Saladillo) — река в Аргентине в провинции Санта-Фе, правый приток реки Парана. Несмотря на наличие в названии слова «арройо» («ручей»), она является рекой с довольно крупной площадью водосбора, равной 3144 км². Длина реки 145 километров, общая длина всех водотоков бассейна — 359 км. Густота речной сети 0,114 км/км², уклон реки 0,57 м/км. Средний расход воды 1 м³/с.Исток реки находится севернее города Биганд департамента Касерос. Река течёт на восток между городами Фуэнтес и Вилья-Мугета, обходит с севера коммуну Альварес, и впадает в Парану, образуя границу между городами Росарио и Вилья-Гобернадор-Гальвес.Бассейн реки расположен на высотах 18,5-115,5 метров над уровнем моря, почвы долина сложены преимущественно лёссами.Арройо-Саладильо имеет шесть притоков: Канделария, каналы Санфорд-Арекито, Альдеа-Ла-Эсперанса, Копакабана, Эгилус, балки Саладильо и Лос-Леонес.Климат бассейна характеризуется величиной увлажнения, равной 1000 мм в год, с максимумом в период с октября по апрель.Вблизи устья реки расположен региональный заповедник Доктор-Карлос-Сильвестре-Бегнис, организованный в 1995 году. Также с 1885 года на реке существует бальнеологический курорт. Важной достопримечательностью начала XX века является мост через реку."
     },
     {
        "name": "Арру ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D1%80%D1%83_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Porte-Arroux-Autun.jpg/250px-Porte-Arroux-Autun.jpg",
        "length": "132 км",
        "pool": "3174 км²",
        "consumption": "undefined",
        "head": "Кулетр",
        "estuary": "Луара",
        "location": " Франция",
        "info": "Арру (фр. Arroux) — река во Франции, в регионе Бургундия — Франш-Конте. Длина Арру — 132 кмПлощадь водосборного бассейна — 3174 км².[источник не указан 2029 дней].Исток находится на территории общины КулетрВысота истока — 420 м над уровнем моря.[источник не указан 2029 дней]. Река течёт сперва на запад, а затем на юго-запад, пересекая департаменты Кот-д’Ор и Сона и Луара. Река является правым притоком Луары, в которую впадает близ города ДигуэнВысота устья — 220 м над уровнем моря.[источник не указан 2029 дней].Притоки Арру: Меше, Тернен — (правые притоки); Лаканш, Бурбенса — (левые притоки).В конце XIX века воды Арру были у города Геньон с помощью 14-ти километрового канала отведены в Центральный канал для улучшения его водоснабжения (у города Дигуэн). Через этот дополнительный канал вплоть до 1950-х годов пропускались речные суда, вплоть до того момента, когда гавань города Геньон была закрыта.Города на берегах Арру: Дигуэн, Геньон, Отён."
     },
     {
        "name": "Арсеньевка",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D1%81%D0%B5%D0%BD%D1%8C%D0%B5%D0%B2%D0%BA%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/%D0%A0%D0%B5%D0%BA%D0%B0_%D0%90%D1%80%D1%81%D0%B5%D0%BD%D1%8C%D0%B5%D0%B2%D0%BA%D0%B0_%D1%83_%D1%81%D0%B5%D0%BB%D0%B0_%D0%90%D0%BD%D1%83%D1%87%D0%B8%D0%BD%D0%BE%2C_%D0%9F%D1%80%D0%B8%D0%BC%D0%BE%D1%80%D1%8C%D0%B5.JPG/250px-%D0%A0%D0%B5%D0%BA%D0%B0_%D0%90%D1%80%D1%81%D0%B5%D0%BD%D1%8C%D0%B5%D0%B2%D0%BA%D0%B0_%D1%83_%D1%81%D0%B5%D0%BB%D0%B0_%D0%90%D0%BD%D1%83%D1%87%D0%B8%D0%BD%D0%BE%2C_%D0%9F%D1%80%D0%B8%D0%BC%D0%BE%D1%80%D1%8C%D0%B5.JPG",
        "length": "294 км",
        "pool": "7060 км²",
        "consumption": "60,6 м³/с",
        "head": " ",
        "estuary": "Уссури",
        "location": " Россия",
        "info": "Арсе́ньевка (в верховье ручей Дальний) — река, левый приток реки Уссури. Протекает по территории Анучинского и Яковлевского районов Приморского края России. Длина — 294 км, площадь водосборного бассейна — 7060 км², падение — 714 м. Названа в честь путешественника и писателя, исследователя Уссурийского края Владимира Клавдиевича Арсеньева. До переименования в 1972 году: в верхнем течении — Долбыхэ, в среднем — Тудагоу, в нижнем — Даубихэ, Дауби́хе[источник не указан 668 дней], абор. Хуэ Расход воды — 60,6 м³/сРека берёт начало на юго-западных склонах хребта Сихотэ-Алинь у горы Медной. Течёт преимущественно в северо-восточном направлении по широкой долине, находящейся в зоне тектонической депрессии. Впадает в реку Уссури близ села Бельцово.Речной бассейн имеет сложное строение. Верхняя часть бассейна расположена в юго-западном районе горной системы Сихотэ-Алинь, где наиболее высокие вершины достигают 1100—1200 м. В среднем и нижнем течении река проходит по более низкой территории межгорной Даубихинской впадины, вытянутой примерно на 100 километров с юго-запада на северо-восток. Около 82 % всей площади бассейна занято таёжной лесной растительностью (кедровые сосны, ель, пихта, ильм, орех, клён, берёза, осина и др.). Общая заболоченность бассейна около 7,4 %."
     },
       {
        "name": "Артур (река, Тасмания)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D1%82%D1%83%D1%80_(%D1%80%D0%B5%D0%BA%D0%B0,_%D0%A2%D0%B0%D1%81%D0%BC%D0%B0%D0%BD%D0%B8%D1%8F)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Arthur_River_mouth.jpg/250px-Arthur_River_mouth.jpg",
        "length": "189 км",
        "pool": "2492 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Индийский океан",
        "location": " Австралия",
        "info": "Артур (англ. Arthur River) — река в северо-западной части Тасмании (Австралия). Общая длина реки составляет 189 км — тем самым, она является третьей по длине рекой Тасмании, вслед за реками Саут-Эск (252 км) и Деруэнт (215 км). Она всего лишь немного длиннее четвёртой и пятой рек Тасмании — Гордон (186 км) и Хьюон (169 км).У впадения реки Артур в Индийский океан находится небольшой одноимённый посёлок Артур-Ривер, население которого по переписи 2006 года составляло 121 человек. Посёлок и река были названы в честь Джорджа Артура — лейтенант-губернатора Земли Ван-Димена (ныне Тасмании) в 1823—1837 годах.Исток реки Артур находится на северо-западе Тасмании, примерно в 10 км юго-западнее населённого пункта Уората, чуть южнее автомобильной дороги  Waratah Road, на территории района местного самоуправления Уората-Уинъярд (англ. Waratah-Wynyard Council).От истока река Артур течёт сначала на север, а потом поворачивает на запад. Практически на протяжении всего пути, река Артур протекает по диким и ненаселённым областям северо-западной части Тасмании. Река Артур имеет множество притоков, в том числе реки Франкленд (Frankland River), Рэпид (Rapid River), Хеллиер (Hellyer River) и другие. Площадь бассейна реки Артур составляет 2492 км² (по другим данным, 2495,2 км²)."
     },
     {
        "name": "Арувими",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D1%83%D0%B2%D0%B8%D0%BC%D0%B8",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/In_Darkest_Africa_ascending_Aruwimi_River.jpg/250px-In_Darkest_Africa_ascending_Aruwimi_River.jpg",
        "length": "1300 км",
        "pool": "116 100 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Конго",
        "location": "Демократическая Республика Конго",
        "info": "Аруви́ми (фр. Aruwimi) — река в Демократической Республике Конго, правый приток реки Конго[1]. Длина около 1300[2] км. Площадь бассейна 116 100[2] км².Под названием Итури[2] берёт начало в саванне на западных предгорьях Синих гор (Конго)[en], более чем в 100 км к западу от озера Альберт. Протекает по плато, а затем по впадине Конго. Много порогов и водопадов[2].Наибольшие расходы воды в период дождей с марта по октябрь. Судоходна в нижнем течении.Название реки дано шотландским миссионером и исследователем Давидом Ливингстоном, первым белым человеком, достигшим этой реки и спросившим туземцев, как она называется, а в ответ услышавшим: «Арувими», что на местном наречии означает «Что он сказал?»[3]. Исследована Г. Стэнли в 1887—1889 годах."
     },
      {
        "name": "Арустук ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D1%83%D1%81%D1%82%D1%83%D0%BA_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Aroostook_-_Pont_de_l%27autoroute_2_au-dessus_de_la_rivi%C3%A8re_Aroostook.JPG/250px-Aroostook_-_Pont_de_l%27autoroute_2_au-dessus_de_la_rivi%C3%A8re_Aroostook.JPG",
        "length": "225 км",
        "pool": "5957 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Сент-Джон",
        "location": "США",
        "info": "Арустук (англ. Aroostook River) — река в штате Мэн и провинции Нью-Брансуик, приток реки Сент-Джон. Площадь водосборного бассейна — 5957 км².Длина реки составляет 225 км, практически полностью Арустук протекает по территории одноимённого округа. По площади бассейн, это крупнейший приток реки Сент-Джон. Река берёт начало в Аппалачах в округе Пенобскот у границы с округом Пискатакис, протекая по его территории всего несколько километров. Последние три километра Арустук течёт по канадской территории.Долина Арустука — один из важнейших районов выращивания картофеля. На реке часто случаются наводнения."
     },
     {
        "name": "Архара ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D1%85%D0%B0%D1%80%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "155 км",
        "pool": "8750 км²",
        "consumption": "82,1 м³/с",
        "head": "слияние рек: Гонгор и Хара",
        "estuary": "Амур",
        "location": " Россия",
        "info": "Архара — река в Амурской области. Длина реки — 155 километров (вместе с Гонгором — 277 км), площадь бассейна — 8750 км².Образуется при слиянии реки Гонгор и реки Хара. В верхнем течении — горная река с быстрым течением. Далее долина реки постепенно расширяется, в нижнем течении это уже равнинная меандрирующая река с множеством стариц и проток.Главные населённые пункты — Архара (в 3 км от берега), Отважное, Аркадьевка, Ленинское, Грибовка."
     },
         {
        "name": "Арчеда ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D1%87%D0%B5%D0%B4%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%D0%90%D1%80%D1%87%D0%B5%D0%B4%D0%B0.jpg/250px-%D0%90%D1%80%D1%87%D0%B5%D0%B4%D0%B0.jpg",
        "length": "162 км",
        "pool": "2050 км²",
        "consumption": "1,02 м³/с (хутор Нижнянка)",
        "head": " ",
        "estuary": "Медведица",
        "location": " Россия",
        "info": "Арче́да (устар. Арчада) — река в Волгоградской области России, левый приток Медведицы. Длина реки составляет, по разным сведениям, 162 или 167 км. Площадь водосборного бассейна — 2050 км². На всём протяжении несудоходна. Арчеда протекает по территории Ольховского, Фроловского и Серафимовичского районов. На реке находится город Фролово, железнодорожная станция в центре города названа по реке — Арчеда.Арчеда берёт начало на юго-восточном склоне Доно-Медведицкой гряды на юго-западной окраине Приволжской возвышенности на территории Ольховского района на высоте 150—160 метров над уровнем моря. Верховье реки течёт в южном направлении. У хутора Арчедино-Чернушинский, — первого населённого пункта на реке, и где сооружена плотина, образующая Чернушенский пруд, река поворачивает на юго-запад, и течёт практически вдоль трассы 18А-4 «Фролово — Камышин». У хутора Амелино в Арчеду справа впадает крупнейший приток, — река Дубовая, протяжённостью 11 километров. До хутора Терновка Арчеда протекает севернее трассы. В самом хуторе трасса пересекает реку и вскоре уходит на север во Фролово. В верхнем течении выделяют 1—2 речные террасы, а ширина долины варьируется от 100 метров до максимального значения в 200 метров в районе хутора Терновка."
     },
     {
        "name": "Арчер ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D1%87%D0%B5%D1%80_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Archer-river-cape-york-australia.JPG/250px-Archer-river-cape-york-australia.JPG",
        "length": "268 км",
        "pool": "13 820 км²",
        "consumption": "222 м³/с",
        "head": "undefined",
        "estuary": "Карпентария",
        "location": " Австралия",
        "info": "Арчер (англ. Archer River) — река, протекающая на полуострове Кейп-Йорк, северный Квинсленд, Австралия.Река была названа в 1865 году Фрэнсисом Ласселлесом Жардином и Александром Жардином во время экспедиции по этой местности.Берёт начало на горном хребте Макилрайт и течёт на запад, пересекает тропические саванные равнины и водно-болотные угодья, протекает через заповедник Пикканинни и национальный парк Ояла-Тумотанг и впадает в залив Арчер (часть залива Карпентария) на западной стороне полуострова Кейп-Йорк. Устье реки находится недалеко от общины Орукун, рядом с реками Уотсон и Уорд.Длина реки составляет 268 км, площадь бассейна — 13 820 км². Среднегодовой расход воды — 222 м³/с. В сезон дождей с ноября по апрель река разливается, затапливая более миллиона гектаров водно-болотных угодий. Основной приток — река Коен.В водах реки Арчер обнаружено 45 видов рыб, в том числе стеклянные окуни, терапонтовые, Neoarius midgleyi, Craterocephalus stercusmuscarum, Glossamia aprion, индо-тихоокеанский тарпон, Scleropages jardinii и другие."
     },
         {
        "name": "Аршалы (приток Колутона)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D1%88%D0%B0%D0%BB%D1%8B_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9A%D0%BE%D0%BB%D1%83%D1%82%D0%BE%D0%BD%D0%B0)",
        "image": "undefined",
        "length": "220 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "Карагайчик",
        "estuary": "Колутон",
        "location": " Казахстан",
        "info": "Аршалы — река в Акмолинской области Казахстана, правый и наиболее крупный приток Колутона (правый приток Ишима) (бассейн Оби). Входит в Ишимский водохозяйственный бассейн Республики Казахстан.Берёт начало на юге Кокчетавской возвышенности из озера Карагайчик. В верхнем течении протекает через озеро Айдабул. Общее направление течения с севера на юг. Впадает в реку Колутон с правой стороны. Притоки: Токтинка, Коныр (правые), Кенащы (левый).Сток реки имеет сильно выраженную сезонную и многолетнюю неравномерность. Расходы воды в разные годы могут различаться в десятки и сотни раз, что значительно осложняет хозяйственное использование ресурсов реки.Наиболее крупные: Викторовка, Николаевка, Новый Колутон."
     },
     {
        "name": "Арыс ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D1%8B%D1%81_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Syr_Darya_Oblast._Ferry_on_the_Arys_River_WDL10990.png/250px-Syr_Darya_Oblast._Ferry_on_the_Arys_River_WDL10990.png",
        "length": "378 км",
        "pool": "14 900 км²",
        "consumption": "46,6 м³/с",
        "head": " ",
        "estuary": "Сырдарья",
        "location": " Казахстан",
        "info": "Ары́с, Ары́сь — река на юге Казахстана, правый приток Сырдарьи. Длина реки — 378 км, площадь бассейна — 14 900 км². Протекает по территории Туркестанской и Жамбылской областей.Берёт начало у Аксу-Джабаглинского заповедника из родников на хребте Таласский Алатау, правые притоки (Боралдай) текут с хребта Каратау. Впадает в Сырдарью вблизи аула Талапты. Характер в верхнем течении горный, в нижнем сменяется на равнинный. Относится к рекам снегово-дождевого питания. Средний расход воды у города Арысь 46,6 м³/сек. Наибольший сток в апреле, наименьший — в августе.Используется для орошения, в нижнем течении для рисовых чеков, поэтому до Сырдарьи доходит малая часть. Забор воды осуществляется 37 каналами, самым крупным из которых является Арыс-Туркестанский канал.Наиболее крупные притоки — Машат, Аксу, Сайрамсу, Боралдай, Бадам, в долинах которых расположились многочисленные санатории и дома отдыха, приуроченные к источникам минеральных вод.В низовьях ширина русла 40—50 м, поймы 1,5—2 км. Вода пресная, минерализация от 200—400 (в верхнем течении) до 400—500 мг/л (в устье). В бассейне Арыси 11 водохранилищ и прудов, 3 ГЭС.Долина Арыси издревле заселена человеком, по ней проходила северная ветвь Великого шёлкового пути. Многочисленны средневековые городища, из которых наиболее значителен Отрар, находящийся у впадения Арыси в Сырдарью. На левом берегу находится городище Казатлык VIII—XI века."
     },
     {
        "name": "Арьеж ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D1%8C%D0%B5%D0%B6_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/N20-ari%C3%A8ge2.jpg/250px-N20-ari%C3%A8ge2.jpg",
        "length": "170 км",
        "pool": "3860 км²",
        "consumption": "65 м³/с",
        "head": " ",
        "estuary": "Гаронна",
        "location": " Андорра,  Франция",
        "info": "Арье́ж (фр. Ariège) — река на юге Франции, правый приток Гаронны. Длина — 170 км, площадь бассейна — 3860 км². Средний расход воды — 65 м³/с.[источник не указан 737 дней]Река берёт начало в Пиренеях и течёт на северо-восток, вблизи истока образуя границу Андорры и Франции, а затем поворачивает на северо-запад. Бо́льшая часть реки находится в департаментах Арьеж и Верхняя Гаронна региона Окситания Франции.Впадает в Гаронну между Мюре и Тулузой."
     },
     {
        "name": "Арьеш",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%80%D1%8C%D0%B5%D1%88",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/TurdaAries.jpg/250px-TurdaAries.jpg",
        "length": "166 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Марош",
        "location": " Румыния",
        "info": "Арьеш (рум. Râul Arieș, венг. Aranyos) — река в Румынии. Венгерское название реки означает Золотая река и происходит от золотого песка, который находили в реке.Длина — 166 км. Истоки реки находятся в месте слияния Большого и Малого Арьеша на склонах горного массива Бихор (Западные Карпаты), далее Арьеш протекает по территории жудецов Алба и Клуж, после чего впадает в реку Муреш ниже города Лудуша.Крупнейшие населённые пункты на реке — города Турда и Кымпия-Турзи."
     },
     {
        "name": "Асапа",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%81%D0%B0%D0%BF%D0%B0",
        "image": "undefined",
        "length": "128 км",
        "pool": "3070 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Тихий океан",
        "location": " Чили",
        "info": "Асапа (исп. Quebrada de Azapa) — пересыхающая река на севере Чили в области Арика-и-Паринакота. Длина реки — 128 км. Площадь водосборного бассейна — 3070 км².Истоки реки находятся на Андском плоскогорье. Далее река протекает в западном направлении по узкой долине. В среднем течении образует долину, имеющую важное значение для сельскохозяйственной деятельности в регионе. Впадает в Тихий океан в районе города Арика. Река протекает по территории коммун Арика и Путре. Основные притоки — реки Секо, Тигнамар, Кебрада-Ла-Игуэра, Чапикинья."
     },
     {
        "name": "Асахи ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%81%D0%B0%D1%85%D0%B8_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Asahi_River_Okayama_pref01bs3872.jpg/250px-Asahi_River_Okayama_pref01bs3872.jpg",
        "length": "142 км",
        "pool": "1810 км²",
        "consumption": "1400 м³/с (16,8 км от устья)",
        "head": " ",
        "estuary": "Кодзима",
        "location": " Япония",
        "info": "Асахи или Асахи-Гава (яп. 旭川 асахигава) — река в Японии на острове Хонсю. Протекает по территории префектуры Окаяма.Исток реки находится на территории города Манива, под горой Асанабэвасигасэн (высотой 1081 м) на хребте Тюгоку. Оттуда Асахи течёт на юг через нагорье Киби, в неё впадают реки Синдзё (新庄川), Мекигава (目木川) и Биттю (備中川). На севере города Окаяма в неё впадает река Укаи, после чего она впадает в залив Кодзима.В 1954 году на реке были построены плотины Асахи и Юбара, которые используются для снабжения населения питьевой водой и контроля за наводнениями. С 1980-х годов стала заметна эвтрофикация водохранилища Асахи. Кроме того, уже в эпоху Эдо на реке сооружалось множество плотин, такие как Сантэй, Симидзу, Накаидэ; в 1950-е были возведены плотины Годо и Курарэ. В XX веке крупнейшие наводнения на реке происходили в 1934, 1945, 1971, 1972 и 1998 годах; во время наводнения 1934 года расход воды достиг 6000 м³/с.В среднем течении средний уклон реки составляет около 1/670, средний максимальный годовой расход воды - 1400 м³/с, средняя ширина реки - 300 м.Длина реки составляет 142 км, на территории её бассейна (1810 км²) проживает около 330 000 человек. Согласно японской классификации, Асахи является рекой первого класса."
     },
     {
        "name": "Аскиз ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%81%D0%BA%D0%B8%D0%B7_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/%D0%A0%D0%B5%D0%BA%D0%B0_%D0%90%D1%81%D0%BA%D0%B8%D0%B7.JPG/250px-%D0%A0%D0%B5%D0%BA%D0%B0_%D0%90%D1%81%D0%BA%D0%B8%D0%B7.JPG",
        "length": "124 км",
        "pool": "1800 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Абакан",
        "location": " Россия",
        "info": "Аски́з (хак. Асхыс) — река, один из главных левых притоков реки Абакан. Берёт начало в отрогах Кузнецкого нагорья на водоразделе двух крупнейших водных бассейнов — Енисейского и Обского.Высота истока — 870 м над уровнем моря.[источник не указан 605 дней]Длина Аскиза 124 км, площадь водосбора — 1800 км². На протяжении около 75 км река протекает по таёжной местности с густотой речной сети 5-0,7 км/км². Модуль стока в этой части реки 5-10 л/сек с одного км². В этой части русло проходит в устойчивых коренных породах, не подверженных размыву. При выходе Аскиза в степь русло меандрирует, образует широкую (до 200 м) пойму, изобилующую большим количеством протоков и островов, по своим характеристикам (уклон дна, расходы и др.) сохраняет признаки горной реки. Характерен ярко выраженный пиковый паводок. Русло здесь мелкой глубины, в период снеготаяния и обильных дождей, как правило, вода выходит из берегов, затопляя и подтопляя сельхозугодья и населённые пункты, нанося большой урон хозяйству. Практически все населённые пункты защищены дамбами обвалования.Аскиз имеет более 10 крупных притоков: База (протяжённость русла 51 км, площадь водосбора 520 км²), Хабзас (30 км, 630 км²) и др.На берегах Аскиза с древних времён существует орошение. В настоящее время водой из Аскиза орошается более 3 тысяч га пашни в границах Верх-Аскизской, Первомайской, Старо-Аскизской инженерной оросительных систем."
     },
     {
        "name": "Аспара ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%81%D0%BF%D0%B0%D1%80%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "108 км",
        "pool": "1210 км²",
        "consumption": "3,31 м³/с",
        "head": " ",
        "estuary": "Курагаты",
        "location": " Казахстан,  Киргизия",
        "info": "Аспара или Ашмара (каз. Аспара, кирг. Ашмара) — река в Меркенском районе Жамбыльской области Казахстана и Панфиловском районе Чуйской области Киргизии. Входит в бассейн реки Чу (Шу).Длина Аспары составляет 108 км, площадь водосбора — 1210 км². Среднегодовой расход воды равен 3,31 м³/с; максимальный — 9,66 м³/с, минимальный 1,02 м³/с. Река полноводна с мая по сентябрь.Аспара образуется на северном склоне Киргизского хребта (Кыргызского Ала-Тоо), в районе казахстанско-киргизской государственной границы. На территории Казахстана, немного западнее перевала Ашпара-Ашуу[ком 1], берёт начало река Аспарабаши («верховья Аспары»), слагаемая двумя истоками (один из них вытекает из высокогорного озера). В верховьях Ашмара, кроме того, собирает воды небольших рек Ашуу-Тёр, Эсенаман (Аман-Эсен), Бактыбай, Туйыктор (Туёк-Тёр), Кёк-тёр, стекающих с одноимённых ледников. Всего в бассейне реки расположено 34 малых ледника, суммарная площадь которых составляет 17,8 км².Общее направления течения Аспары — с юга на север, на некоторых участках — с небольшим уклоном к западу (в районе истока) или востоку (несколько далее, выше посёлка Гранитогорск). От слияния Аспарабаши с Ашуу-Тёром по реке на значительном протяжении проведена государственная граница Кыргызстана и Казахстана. В районе населённого пункта Нововоскресеновка немного отходит от границы и протекает по казахстанской территории. В нижнем течении на берегах имеются заболоченные участки, луга и тростниковые заросли; местами русло пересыхает."
     },
     {
        "name": "Асса (приток Сунжи)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%81%D1%81%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A1%D1%83%D0%BD%D0%B6%D0%B8)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Ingushetia_-_Assin_Valley.jpeg/250px-Ingushetia_-_Assin_Valley.jpeg",
        "length": "133 км",
        "pool": "2060 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Сунжа",
        "location": "",
        "info": "Асса, Эс, Эс-хи (груз. ასა, ингуш. Эс, чечен. Ӏас, Ӏаьс) — река на Северном Кавказе, правый приток Сунжи.Берёт начало на северных склонах главного Кавказского хребта в Грузии. Образуется в результате слияния рек Чимгисцкали и Цирцловнисцкали на высоте 1806 м. Протекает по территории Ингушетии и Чечни. Впадает в Сунжу вблизи села Закан-Юрт.Длина реки — 133 км, площадь водосборного бассейна — 2060 км², ширина русла на равнинных участках — свыше 60 м. Река Асса течёт по территории Грузии 20 километров, в Ингушетии 91 километр, а по территории Чечни — 32 км.Населённые пункты, стоящие на реке Асса: Цейшты, Верхний Алкун, Нижний Алкун, Мужичи, Галашки, Алхасты, станицы Нестеровская и Ассиновская, Новый Шарой, Закан-Юрт.По данным государственного водного реестра России относится к Западно-Каспийскому бассейновому округу, водохозяйственный участок реки — Сунжа от истока до города Грозный. Речной бассейн реки — Реки бассейна Каспийского моря междуречья Терека и Волги.Код объекта в государственном водном реестре — 07020001112108200005482.Художник А. И. Титовский в 1964 году создал серию рисунков посвященных пребыванию М. Ю. Лермонтова на Кавказе один из которых — «Чечено-Ингушетия. Река Асса у дороги в станицу Самашкинскую»."
     },
     {
        "name": "Ассинибойн ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%81%D1%81%D0%B8%D0%BD%D0%B8%D0%B1%D0%BE%D0%B9%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Main_Street_Bridge_Assiniboine_River.jpg/250px-Main_Street_Bridge_Assiniboine_River.jpg",
        "length": "1070 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Ред-Ривер",
        "location": " Канада",
        "info": "Ассинибо́йн (англ. Assiniboine) — река длиной 1070 км, протекающая по прериям Канадского Запада в провинциях Саскачеван и Манитоба.Название реки происходит от индейского коренного народа ассинибойнов.Река Ассинибойн течёт с юго-востока Саскачевана и впадает в Ред-Ривер в Виннипеге, столице Манитобы.Эта река протекает по различным ландшафтам: по широким ровным долинам или по возвышенностям, где её берега бывают обрывистыми. Во время наводнений часть воды из реки может отводиться в озеро Манитоба в Портидж-ла-Прери.Двумя основными притоками реки Ассинибойн являются:"
     },
     {
        "name": "Ассыни",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%81%D1%81%D1%8B%D0%BD%D0%B8",
        "image": "https://upload.wikimedia.org/wikipedia/ru/thumb/6/63/Tugur.png/250px-Tugur.png",
        "length": "110 км",
        "pool": "2510 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Тугур",
        "location": " Россия",
        "info": "Ассыни — река в Тугуро-Чумиканском районе Хабаровского края России.Исток — на восточных склонах хребта Ям-Алинь. Слиянием с рекой Конин образует реку Тугур в 175 км от её устья, являясь правой составляющей. Длина — 110 км, площадь водосборного бассейна — 2510 км².По данным государственного водного реестра России относится к Амурскому бассейновому округу, речной бассейн реки Амур, речной подбассейн реки — Амур от впадения Уссури до устья, водохозяйственный участок — реки бассейна Охотского моря от границы бассейна реки Уда до мыса Лазарева без реки Амур.Код объекта в государственном водном реестре — 20030900312119000166907."
     },
           {
        "name": "Асуа ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%81%D1%83%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "300 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "undefined",
        "estuary": "Нил",
        "location": " Уганда,  Южный Судан",
        "info": "Асуа (Асва, Ачва, англ. Achwa, Aswa) — река в Африке (Уганда, Южный Судан), правый приток реки Альберт-Нил. Река течёт через Восточные Суданские саванны. Крупнейшие притоки — Атеппи, Паджер и Агуга.Река начинается в холмах в северо-западной части округа Катакви, протекает через округ Лира и становится границей между округами Падер и Гулу, где в неё впдает река Агуга, а затем и река Паджер. Река впадает в Альберт-Нил примерно в десяти милях к северо-западу от пограничного города Нимуле в Судане.Как и в большинстве рек в регионе, поток Асуа сильно зависит от сезона и погоды. Она подвержен наводнениями. В 2000 году она затопила мост, соединяющий города Гулу и Китгум.Расстояние от верховьев Асуа до устья составляет около 300 км.По Асуа некоторое время проходила линия противостояния между правительством и повстанцами в ходе гражданской войны в Судане[источник не указан 1536 дней]."
     },
          {
        "name": "Асы ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%81%D1%8B_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/%D0%A0%D0%B5%D0%BA%D0%B0_%D0%90%D1%81%D1%8B.jpg/250px-%D0%A0%D0%B5%D0%BA%D0%B0_%D0%90%D1%81%D1%8B.jpg",
        "length": "253 км",
        "pool": "9210 км²",
        "consumption": "undefined",
        "head": "слияние рек: Терис и Куркиреусу",
        "estuary": " ",
        "location": " Казахстан,  Киргизия",
        "info": "Асы (также Асса, каз. Аса) — река в Жамбылской области Казахстана. Считается левым притоком реки Талас, хотя устье теряется в песках западнее Таласа.Река Асса относится к классу трансграничных рек Центральной Азии. Образуется слиянием рек Терис (Терс) и Куркиреусу (Кукуреусу) на границе Киргизии и Казахстана.Асса протекает через озера Биликоль и Акколь. Длина реки составляет 253 км, площадь водосборного бассейна — 9210 км². Течение реки зарегулировано Терис-Ащыбулакским водохранилищем. Река впадает в пустынный водоприёмник (теряется в песках). На территории между реками Асса и Талас имеется водоток подземных вод.Водные ресурсы в створе максимального стока в средневодный год составляют 12,5 м³/с. Запасы подземных вод в бассейне оцениваются в 930 500 м³/д. Среднегодовой расход воды (около аула Акколь) 4,45 м³/с.Вода в реке Асса умеренно-загрязненная, сброс сточных вод в реку отсутствует.Асса имеет около 30 притоков, в бассейне реки — 26 каналов и арыков. Питание снеговое, дождевое и за счёт подземных вод.Водному режиму реки Асса присущи черты, свойственные типам рек как ледниково-снегового, так и снегодождевого питания. В результате по Ассе проходят две волны половодья: весенняя — снеготаяние и выпадение жидких осадков с прохождением пика в среднем, в первую декаду апреля; летняя — период интенсивного таяния ледников и высокогорных снежников с пиком в июле. Весенний максимум обычно выше летнего."
     },
                        {
        "name": "Ат-Баши ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%82-%D0%91%D0%B0%D1%88%D0%B8_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/At-Bashi_River.jpg/250px-At-Bashi_River.jpg",
        "length": "140 км",
        "pool": "5540 км²",
        "consumption": "33,1 м³/с",
        "head": " ",
        "estuary": "Нарын",
        "location": " Киргизия",
        "info": "Ат-Баши (кирг. Атбашы дарыясы) — река в Ат-Башинском районе Нарынской области Киргизской республики.Левый приток реки Нарын. Исток реки находится на северном склоне хребта Янги-Джер у слияния рек Улан и Джанги-Дшер.Основные гидрологические характеристики: длина — около 140 км (с истоком реки Дшанги-Дшер — 178 км), площадь бассейна — 5540 км², средняя высота — 3060 м, средний расход воды — 33,1 м³/с. Средний модуль стока — 5,98 л/(с×км²).Первоначально течёт в западном направлении через Атбашинскую котловину. Позже река поворачивается на север. С левой стороны в неё впадает наибольший приток р. Каракоюн. Затем, проходит через ущелье горного хребта Атбаши в северном направлении. В 5 км в устье Нарына находится плотина, сооружена Ат-Башинская ГЭС.Населённые пункты, расположенные вдоль берегов реки Ат-Баши: Ат-Баши, Баш-Кайынды и Талды-Суу."
     },
      {
        "name": "Атабаска ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%82%D0%B0%D0%B1%D0%B0%D1%81%D0%BA%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Athabasca_River_JNP.JPG/250px-Athabasca_River_JNP.JPG",
        "length": "1231 км",
        "pool": "95 300 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Атабаска",
        "location": " Канада",
        "info": "Атаба́ска (англ. Athabasca River, фр. rivière Athabasca) — река в Канаде.Берёт своё начало из ледника Колумбия в национальном парке Джаспер в канадской провинции Альберта, на высоте приблизительно 1600 метров (5249 футов). Протекает в северо-восточном направлении. Длина реки составляет 1231 км. Впадает в озеро Атабаска. При впадении в озеро образует обширную дельту площадью 1960 км². Вместе с дельтами рек Пис-Ривер и Берч и озёрами дельты: Клэр, Мамави, Барил и Ричардсон дельта Атабаски образует огромную пресноводную дельту Пис-Атабаска (одну из самых больших в мире), 80 % которой занимает Национальный парк Вуд-Баффало — самый большой национальный парк Канады и один из самых крупных национальных парков мира. В 1989 году 168-километровый участок реки Атабаска на территории провинциального парка Джаспер включён в Список охраняемых рек Канады (Canadian Heritage Rivers).Принадлежит к речной системе Маккензи. Бассейн Атабаски охватывает территорию в 95300 км²."
     },
       {
        "name": "Атасу ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%82%D0%B0%D1%81%D1%83_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "177 км",
        "pool": "5920 км²",
        "consumption": "0,66 м³/с",
        "head": " ",
        "estuary": "Сарысу",
        "location": " Казахстан",
        "info": "Атасу (каз. Атасу) — река в Карагандинской области, левый приток реки Сарысу. Протекает по территорий Жанааркинского района. Длина 177 км, площадь бассейна 5920 км².Питание снеговое. Половодье — весной. Летом пересыхает. Средне-годовой расход воды 0,66 м³/с.Начинается на склонах гор Кызылту, Узынжал.Притоки: Былкылдак, Каракога, Каркымбай, Исабек Карасуы, Боранбай. На Атасу сооружено Кылышское водохранилище (у города Каражал).При написании этой статьи использовался материал из издания «Казахстан. Национальная энциклопедия» (1998—2007), предоставленного редакцией «Қазақ энциклопедиясы» по лицензии Creative Commons BY-SA 3.0 Unported."
     },
     {
        "name": "Атбара ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%82%D0%B1%D0%B0%D1%80%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Atbara_river_map.jpg/250px-Atbara_river_map.jpg",
        "length": "1120 км",
        "pool": "undefined",
        "consumption": "374 м³/с",
        "head": " ",
        "estuary": "Нил",
        "location": " Эфиопия,  Судан",
        "info": "А́тбара (араб. نهر عطبرة, амх. የአትባራ ወንዝ), в верховье Гоанг (амх. ጉዋንግ ወንዝ)) — река в Африке (в Судане и Эфиопии), правый приток Нила (впадающий в реку Нил около города Атбара в Судане).Исток находится недалеко от озера Тана в Эфиопии. Течёт преимущественно по Суданскому плато. На реке имеется водохранилище Хашм-эль-Гирба для водоснабжения и ирригации, и гидроэлектростанция. Средний расход воды 374 м³/сек. Длина реки — 1120 км. Существенно пополняет сток Нила в период дождей (июль-ноябрь), в это время средний расход воды около 2000 м³/сек, в остальное же время пересыхает и не доходит до Нила. В период дождей судоходна.Один из притоков Атбары — река Бахр-эс-Салам."
     },
        {
        "name": "Аткара",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%82%D0%BA%D0%B0%D1%80%D0%B0",
        "image": "undefined",
        "length": "106 км",
        "pool": "1000 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Медведица",
        "location": " Россия",
        "info": "Аткара (Еткара, Иткара) — река в России, протекает по Екатериновскому и Аткарскому районам Саратовской области. Устье реки находится в 548 км от устья реки Медведицы по правому берегу. Длина реки составляет 106 км, площадь водосборного бассейна — 1000 км².Название реки, так же как и название одноимённого города происходит от имени золотоордынского правителя XIV века Иктара.На берегу Аткары, у места впадения её в Медведицу, расположен город Аткарск. Также по берегам реки расположены населённые пункты Тургенево, Бубновка, Малые Копены, Синельниково, Земляные хутора, Качеевка, Сластуха, Афросимовка, Еткара, Переезд. В 19 км от устья впадает левый приток Лаверза (Лавера).Реку несколько раз пересекает железнодорожная линия Приволжской железной дороги Аткарск — Ртищево.В 2009 году проводились работы по углублению и расчистке русла Аткары у места впадения её в Медведицу, это должно позволить уменьшить ущерб от весеннего паводка для жителей города Аткарск.По данным государственного водного реестра России относится к Донскому бассейновому округу, водохозяйственный участок реки — Медведица от истока до впадения реки Терса, речной подбассейн реки — Дон между впадением Хопра и Северского Донца. Речной бассейн реки — Дон (российская часть бассейна)."
     },
           {
        "name": "Атмис",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%82%D0%BC%D0%B8%D1%81",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Moksha.svg/250px-Moksha.svg.png",
        "length": "114 км",
        "pool": "2430 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Мокша",
        "location": " Россия",
        "info": "Атмис — река в Каменском и Нижнеломовском районах Пензенской области России, левый приток Мокши (бассейн Волги). Устье находится в 540 км по левому берегу. Длина реки составляет 114 км, площадь водосборного бассейна — 2430 км². На реке стоит город Каменка.Высота устья — 137,6 м над уровнем моря.[источник не указан 588 дней]Исток реки на Приволжской возвышенности восточнее села Блиновка в 16 км к северо-востоку от города Каменка. Около истока на реке плотина и небольшая запруда. В верховьях течёт на юг, затем резко разворачивается на северо-запад и север. Крупнейшие населённые пункты на реке — город Каменка, крупные сёла Фёдоровка, Кувака, Кочалейка, Головинщино (Каменский район); Большой Мичкас, Атмис, Новая Нявка, Новая Пятина (Нижнеломовский район).Впадает в Мокшу у деревни Кривозерье в 16 км к северо-востоку от Нижнего Ломова. Ширина у устья — около 30 метров.По данным государственного водного реестра России относится к Окскому бассейновому округу, водохозяйственный участок реки — Мокша от истока до водомерного поста города Темников, речной подбассейн реки — Мокша. Речной бассейн реки — Ока.Код объекта в государственном водном реестре — 09010200112110000026882."
     },
      {
        "name": "Атрай ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%82%D1%80%D0%B0%D0%B9_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/A_river_view.jpg/250px-A_river_view.jpg",
        "length": "390 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": " ",
        "location": " Индия,  Бангладеш",
        "info": "Атрай (бенг. আত্রাই/আত্রেই নদী) — река в северной части Бангладеш и Индии, штат Западная Бенгалия, длиной около 390 км, а максимальная глубина составляет 30 м. В древние времена река была названа Атрей и упоминается в Махабхарате. Она берёт начало в Западной Бенгалии, а затем после прохождения через Динаджпур течёт снова по территории Индии. Она протекает через Кумаргандж и Балургхат округа Южный Динаджпур. Затем река снова возвращается в Бангладеш."
     },
     {
        "name": "Атрато",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%82%D1%80%D0%B0%D1%82%D0%BE",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Rio_Atrato.JPG/250px-Rio_Atrato.JPG",
        "length": "670 км",
        "pool": "35 700 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Ураба",
        "location": " Колумбия",
        "info": "Атра́то (исп. Atrato) — река в Колумбии. Длина реки 670 км, из них судоходно 560 км (до города Кибдо). Площадь водосборного бассейна — 35700 км².Исток находится в горах Западная Кордильера, далее река течёт на север по глубокой и широкой (до 80 км) долине; истоки нескольких притоков находятся у горы Альто-де-Нике. Перешеек Сан-Пабло отделяет долину реки Атрато от долины текущей на юг реки Сан-Хуан. При впадении в залив Ураба Дарьенского залива Карибского моря река образует обширную болотистую дельту в южной части Дарьенского пробела, начиная от Гуаябаля.Питается река Атрато дождями, несёт много наносов. Речной песок содержит золото. Основные притоки — реки Труандо, Суцио и Мурри. В нескольких местах по реке проходит граница между департаментами Чоко и Антьокия.Русло реки Атрато рассматривалось в качестве места прохождения трансокеанского канала, но предпочтение было отдано каналу в Панаме."
     },
     {
        "name": "Атрек",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%82%D1%80%D0%B5%D0%BA",
        "image": "undefined",
        "length": "669 км",
        "pool": "27 300 км²",
        "consumption": "9,2 м³/с (Кизил-Атрек)",
        "head": " ",
        "estuary": "Каспийское море",
        "location": " Иран,  Туркменистан",
        "info": "Атре́к (туркм. Etrek; перс. اترک; Селяха, Суляха) — река в Иране и Туркмении. Длина реки — 669 км, площадь горной части бассейна — 27 300 км², средний расход воды у посёлка городского типа Кизил-Атрек — 9,2 м³/с. С конца XIX века вода доходит до Каспийского моря только в половодье, в остальное время разбирается на орошение плодородного оазиса (цитрусовые, хлопок). Некогда главный приток — р. Сумбар (справа), также разбирается на орошение и до Атрека доходит лишь в половодье. Из-за сильного обмеления нерест каспийского осётра в реке полностью прекратился с середины XX века (таким образом, учитывая, что Атрек — единственная река, впадающая в Каспий на территории Туркмении, репродукция осетровых на территории этой страны полностью прекратилась).На территории Ирана Атрек течёт в узкой горной долине, разделяя Нишапурские горы и Копетдаг. Далее долина расширяется. Ранее при впадении в Каспийское море образовывал болотистую дельту, ныне обезвоженную большую часть года. Питание в основном снеговое, дождевое и ключевое (подземное). Половодье весной и в первой половине лета, затем позднелетняя и осенне-зимняя межень.Атрек берёт начало недалеко от города Заукафан в Хорасанском Курдистане (так называемые Туркмено-Хорасанские горы), впадает в залив Гасан-кули (ранее именовался Гассан-Кудисский культук) Каспийского моря; в нижнем течении с конца XIX века течении служил границей между Российской империей и Персией (Ираном). Весной река сильно разливается, а её ил способствует плодородию прибрежной местности; по берегам Атрека в XVI—XVII веках осели туркмены племени йомуд."
     },
     {
        "name": "Аттавапискат",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%82%D1%82%D0%B0%D0%B2%D0%B0%D0%BF%D0%B8%D1%81%D0%BA%D0%B0%D1%82",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Attawapiskat_Town_between_Attawapiskat_River.jpg/250px-Attawapiskat_Town_between_Attawapiskat_River.jpg",
        "length": "748 км",
        "pool": "50 200 км²",
        "consumption": "626 м³/с",
        "head": "Аттавапискат",
        "estuary": "Джеймс",
        "location": " Канада",
        "info": "Аттавапи́скат (англ. Attawapiskat River) — река на северо-востоке провинции Онтарио (Канада). Средний расход воды — 626 м³/с.Река берёт начало в одноимённом озере. Течет в восточном направлении и впадает в пролив Акимиски, отделяющий лежащий в заливе Джеймс остров Акимиски от материковой части Канады. Длина реки Аттавапискат составляет 748 км, площадь бассейна равна 50 200 км².Крупнейшие притоки — Миссиса (правый), Мюкетей (левый). Участок реки от озера Аттавапискат до места впадения реки Мюкетей входит в состав провинциального парка Отоскуин/Аттавапискат Ривер (Otoskwin/Attawapiskat River Provincial Park). Болота и водоёмы вокруг реки имеют важное значение для перелётных водоплавающих птиц, особенно для многочисленных уток и гусей.[источник не указан 1029 дней]Менее чем в ста километрах от устья реки находится группа из высоких известняковых островов, которым каноисты дали прозвище «именинные торты». Скальные образования уникальны для данного региона. Слово из языка кри, chat-a-wa-pis-shkag, относящееся к этим островам, дало имя реке. Большую часть своего пути река несудоходна и доступна только для каноэНебольшой одноимённый посёлок, населённый индейцами кри, находится в устье реки. 26 июня 2008 компания De Beers открыла шахту Victor Diamond Mine на кемберлитовом поле Аттавапискат в 90 км к западу от посёлка, близ реки Аттавапискат. Компания рассчитывает добывать здесь 600 тысяч карат (120 кг) алмазов в год."
     },
      {
        "name": "Атуэль",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%82%D1%83%D1%8D%D0%BB%D1%8C",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/119_1928.JPG/250px-119_1928.JPG",
        "length": "375 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Десагуадеро",
        "location": " Аргентина",
        "info": "Атуэ́ль (исп. Atuel) — река в Аргентине, левый приток Рио-Саладо.Длина 375 км.Течёт по территории провинции Мендоса на западе центральной части Аргентины. Исток реки находится в Андах, недалеко от государственной границы между Аргентиной и Чили. Плотины в среднем течении образуют на реке водохранилища Ниуиль и Валье-Гранде. Половодье приходится на период таяния снегов летом. Зимой пересыхает в нижнем течении. Используется для орошения и выработки электроэнергии."
     },
     {
        "name": "Атчафалайя",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%82%D1%87%D0%B0%D1%84%D0%B0%D0%BB%D0%B0%D0%B9%D1%8F",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Atchafalaya_River_delta.jpg/250px-Atchafalaya_River_delta.jpg",
        "length": "225 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "Ред-Ривер",
        "estuary": "Мексиканский залив",
        "location": " США",
        "info": "Атчафалайя (англ. Atchafalaya River) — рукав дельты Миссисипи и Ред-Ривера длиной примерно 225 км, в южной Луизиане, США. Река является судоходной и имеет большое значение для штата. Поддержка реки в соответствующем состоянии обеспечивается корпусом инженеров армии США уже более века.Атчафалайя образуется из естественного канала при слиянии Миссисипи и Ред-Ривера, называемого Олд-Ривер, длиною 11 км. Далее река продолжает своё движение немного западнее основного течения Миссисипи и впадает в Мексиканский залив примерно в 25 милях (40 километров) южнее города Морган-Сити.В приустьевом регионе находится обширное болото Атчафалайя-Бейсин.До XV века Миссисипи и Ред-Ривер текли параллельно друг другу, но потом русло Миссисипи повернуло на запад, образовав изгиб («изгиб Тёрнбулла»), который соединился с Ред-Ривер. Ред-Ривер в верхнем течении стала притоком Миссисипи, а бывшее нижнее течение Ред-Ривера — теперь ответвление Миссисипи — получило название Атчафалайя.В 1830-е годы под руководством знаменитого инженера Генри Шрива был расчищен «Великий Плот» — огромного размера затор из поваленных деревьев, затруднявший течение Атчафалайа и Ред-Ривера и делавший невозможным судоходство. Шрив также прорыл канал в месте бывшего русла Миссисипи. Северная часть «изгиба Тёрнбулла» после этого заполнилась осадочными породами, а южная, Олд-Ривер, продолжила соединять три реки."
     },
                                           {
        "name": "Афрам",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%84%D1%80%D0%B0%D0%BC",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/River_Afram.JPG/250px-River_Afram.JPG",
        "length": "320 км",
        "pool": "11 396 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Вольта",
        "location": " Гана",
        "info": "Афрам — река в Гане. Длина реки — 320 км. Площадь водосборного бассейна — 11396 км². До строительства в 1960-х плотины гидроэлектростанции Акосомбо, являлась притоком реки Вольта. Сейчас является важным притоком озера Вольта. Река собирает почти всю воду с плато Кваху. В бассейне реки преобладают холмистые формы рельефа. Среднегодовое количество осадков составляет 1400 мм, максимум их выпадения приходится на период с мая по октябрь. Среднегодовая температура воздуха составляет 27 °C, самый жаркий период с января по апрель. В сухой период с октября по март река пересыхает. Местным населением река используется для ловли рыбы, в нижнем течении возможно судоходство. Земли в бассейне реки круглый год активно используются под коммерческое орошаемое земледелие."
     },
     {
        "name": "Африн ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%84%D1%80%D0%B8%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Afrin%2CDara.jpg/250px-Afrin%2CDara.jpg",
        "length": "131 км",
        "pool": "3920 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Эль-Аси",
        "location": " Турция,  Сирия",
        "info": "Африн (араб. فرين, курд. Efrîn, лат. Ufrenus) — река в Сирии и Турции. Длина реки составляет 131 километр, площадь бассейна — 3920 км².Река берёт начало в горах на юге Турции на высоте 678 метров над уровне моря, течёт в юго-западном направлении по территории регионов Газиантеп, Килис, затем заходит на территорию района Африн сирийской мухафазы Халеб. Впадает в турецкой провинции Хатай в Оронт[нет в источнике]. В низовьях, от города Рейханлы до устья, река канализирована.Основные притоки — Сарафти, Сабун, Деличай (правые), Кынаджик, Досталлы (левые).Крупные города в долине реки — Рейханлы и Африн."
     },
     {
        "name": "Ахангаран ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%85%D0%B0%D0%BD%D0%B3%D0%B0%D1%80%D0%B0%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Angren_river_near_Okhangaron_city.jpg/250px-Angren_river_near_Okhangaron_city.jpg",
        "length": "236 км",
        "pool": "7710 км²",
        "consumption": "22,8 м³/с (кишлак Турк)",
        "head": "слияние рек: Акташсай и Урталыксай",
        "estuary": "Сырдарья",
        "location": " Узбекистан",
        "info": "Ахангара́н (узб. Ohangaron/Оҳангарон) — река в Наманганской и Ташкентской областях Узбекистана, правый приток Сырдарьи. Используются также названия Ангре́н и Культушкан. Ахангаран и Чирчик являются главными реками Ташкентского оазиса.Ахангаран берёт начало под перевалом Бошрават (иное название — Джирдан) при слиянии Акташсая и Урталыксая, стекающих с южных склонов Чаткальского хребтаДлина реки вместе с Акташсаем 236 км., а площадь бассейна 7710 км². Средний расход воды — 22,8 м³/с.Высота истока — 2710 м над уровнем моря.[источник не указан 2181 день] Высота устья — 260 м над уровнем моря.[источник не указан 2181 день]На реке находятся Ахангаранское водохранилище и Ташкентское море (Тюябугузское вдхр.). Воды Ахангарана, посредством каналов, используются для орошения земель в Ахангаранском, Уртачирчикском, Пскентском и Букинском районах Ташкентской области.Крупнейшие населённые пункты, расположенные на реке — это города Ангрен и Ахангаран. При впадении в Сырдарью был расположен крупный древний город Бенакент.Среднемноголетний годовой сток — 0,72 км³. Режим питания — снего-дождевой. Наивысший уровень приходится на апрель-май. Наименьшие расходы воды (межень) практически по всем рекам проходят в октябре-марте. Половодье — с апреля по июнь, на эти месяцы приходится 51 % среднегодового стока. Наибольший расход воды — в мае."
     },
     {
        "name": "Ахелоос",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%85%D0%B5%D0%BB%D0%BE%D0%BE%D1%81",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Acheloos_river_narrows_03.jpg/250px-Acheloos_river_narrows_03.jpg",
        "length": "217 км",
        "pool": "6329 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Ионическое море",
        "location": " Греция",
        "info": "Ахело́ос, Аспропо́тамос (греч. Αχελώος) — река в западной Греции. Это вторая река по протяжённости после Альякмона.Дельта Ахелооса, лагуны Этоликон и Месолонгион, устье Эвиноса, острова Эхинады и остров Петалас входят в сеть охранных участков на территории ЕС «Натура 2000». Экосистема хотя и подверглась сильному влиянию деятельности человека, всё же имеет значительную экологическую ценность, по этой причине водно-болотные угодья включены в Рамсарскую конвенцию.Начинается в периферийной единице Трикала, в горах Пинд, у подножия горы Перистери, на высоте 2000 метров над уровнем моря. В верховье принимает первый приток Аспропотамос («белая река»). Далее течёт по границе между периферийными единицами Арта (в периферии Эпир) и Этолия и Акарнания (в периферии Западная Греция) на западе и по периферийным единицам Трикала, Кардица (в периферии Фессалия) и Эвритания (в периферии Центральная Греция) на востоке. В среднем течении, в водохранилище Кремасте принимает притоки Аграфьотис и Тавропос.В горах Панетоликон была построена плотина Стратос, перед которой образовалось водохранилище шириной 10—15 км. Через него был построен двухкилометровый мост.В устье река разделяется на несколько рукавов, которые впадают в Ионическое море."
     },
     {
        "name": "Ахтуба",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%85%D1%82%D1%83%D0%B1%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Achtuba.JPG/250px-Achtuba.JPG",
        "length": "537 км",
        "pool": "undefined",
        "consumption": "153 м³/с",
        "head": "Волга",
        "estuary": "Бузан",
        "location": " Россия",
        "info": "А́хтуба (тат. Ак-тюбе — белый холм) — левый рукав Волги, отделяющийся от неё напротив северной части Волгограда. Старый вход в Ахтубу, который располагался выше по течению, при строительстве Волжской ГЭС был перекрыт её плотиной, но ниже был прорыт Волго-Ахтубинский канал длиной 6,5 км.Длина Ахтубы — 537 км. Средний годовой расход — 153 м³/с. На Ахтубе расположены города: Волжский (у начала рукава), Ленинск, Знаменск, Ахтубинск, Харабали (в 5 км от реки). Между Волгой и Ахтубой расположена Волго-Ахтубинская пойма, являющаяся районом бахчеводства и овощеводства. До строительства каскада ГЭС ширина разливов в пределах этой поймы достигала 20—30 км.Русло реки достигает в ширину 200, а местами и 300 метров, а в некоторых местах ширина не больше 50 метров. В половодье (апрель-май) скорость течения возрастает, а к его концу замедляется. Местами Ахтуба разливается и мелеет. На глубоких местах по всей Ахтубе и протокам хорошая рыбалка. В северной части на левом берегу расположены обширные поля и бахчи, часто встречаются водозаборные станции, подающие воду на поля."
     },
         {
        "name": "Ахурян",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%85%D1%83%D1%80%D1%8F%D0%BD",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Akhurian_River_Gorge.jpg/250px-Akhurian_River_Gorge.jpg",
        "length": "186 км",
        "pool": "9670 км²",
        "consumption": "undefined",
        "head": "Арпи",
        "estuary": "Аракс",
        "location": "",
        "info": "Ахуря́н (Западный Арпачай) (арм. Ախուրյան, осман. ارپه چاى, тур. Arpaçay) — река, протекающая по Армянскому нагорью на Южном Кавказе. Является левым притоком Аракса. В верхнем течении протекает по территории Армении, в нижнем — по границе Армении с Турцией. Вытекает из Арпиличского водохранилища, впадает в Аракс близ села Багаран.В урартской надписи VIII века до н. э. из Сарыкамыша упоминается город Ахуриани, что связывается с названием реки Ахурян. Название «Ахурян» упоминается Мовсесом Хоренаци. По-турецки река называется Арпачай или Западный Арпачай, это название иногда переводят как «Ячменная река» (от тур. Arpa: ячмень обыкновенный). А. С Пушкин в своем «Путешествии в Арзрум» именует эту реку Арпачай и называет её границей России.Река берёт начало на плато на высоте 2023 м, вытекая из созданного в 1950 году Арпиличского водохранилища. Течёт около 15 км на восток по влажным лугам, принимая в себя несколько берущих начало на Кечутском хребте притоков. Здесь берега болотистые, течение медленное.Затем русло поворачивает на юг и выходит на Ширакское плато. Здесь река течёт по глубокому скалистому ущелью, достигающему местами 400 м глубиной, разрезая на своём пути лавовое поле вулканического происхождения. Несколькими километрами ниже железнодорожной станции Агин Ахурян перегорожен плотиной, образующей Ахурянское водохранилище. В последнее впадает крупнейший приток Ахуряна — река Карс."
     },
     {
        "name": "Ахья",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%85%D1%8C%D1%8F",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Ahja_j%C3%B5gi_2005.jpg/250px-Ahja_j%C3%B5gi_2005.jpg",
        "length": "103,4 км",
        "pool": "1074,3 км²",
        "consumption": "undefined",
        "head": "Эраствере",
        "estuary": "Эмайыги",
        "location": " Эстония",
        "info": "А́хья (эст. Ahja jõgi) — река в Эстонии, является крупнейшим правым притоком реки Эмайыги. Длина реки 103,4 км, площадь бассейна 1074,3 км², высота истока 87 метров. Другое название: Ая (Aya); в верхнем течении: ручей Тиллеоя (эст. Tilleoja), река Тилле (эст. Tille jõgi), в среднем течении: река Таэваскоя (эст. Taevaskoja jõgi).Река берёт своей начало из озера Эраствере и впадает в более крупную реку — Эмайыги. Нижнее течение реки является судоходным, в среднем её течении находится водохранилище Саесааре и Саесаареская гидроэлектростанция.Река Ахья считается одной из самых живописных рек Эстонии. В её течении находятся две охраняемые природные зоны — Тиллеору (1,9 км²) и древняя долина реки Ахьяйыэ (10,4 км²).Также река является богатейшей в стране по количеству видов рыб обитающих в её водах. В ней встречаются такие виды как: речная форель, радужная форель, хариус, щука, краснопёрка, пескарь, бычок, плотва, елец, голавль, язь, лещ, налим, окунь, ёрш и другие."
     },
            {
        "name": "Ачанковил",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%87%D0%B0%D0%BD%D0%BA%D0%BE%D0%B2%D0%B8%D0%BB",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Achenkovil_River_Near_Konni%2C_December_2007.jpg/250px-Achenkovil_River_Near_Konni%2C_December_2007.jpg",
        "length": "128 км",
        "pool": "1484 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Памбияр",
        "location": " Индия",
        "info": "Ачанковил (также: Аченковил, малаялам: അച്ചൻകോവിലാർ) — река в индийском штате Керала. Берёт своё начало при слиянии рек Ришимала, Пасукидаметту и Рамаккалтери; высота истока: 700 м над уровнем моря. Протекает в западном направлении через округа Патанамтитта, Идукки, Аллеппи. Впадает в реку Памба около населённого пункта Вияпурам. Длина составляет 128 км, площадь бассейна — 1484 км²."
     },
                        {
        "name": "Ашбертон (река, впадает в Индийский океан)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%88%D0%B1%D0%B5%D1%80%D1%82%D0%BE%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0,_%D0%B2%D0%BF%D0%B0%D0%B4%D0%B0%D0%B5%D1%82_%D0%B2_%D0%98%D0%BD%D0%B4%D0%B8%D0%B9%D1%81%D0%BA%D0%B8%D0%B9_%D0%BE%D0%BA%D0%B5%D0%B0%D0%BD)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Ashburton_River%2C_Western_Australia.jpg/250px-Ashburton_River%2C_Western_Australia.jpg",
        "length": "825 км",
        "pool": "66 850 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Индийский океан",
        "location": " Австралия",
        "info": "Ашбертон — маловодная река в регионе Пилбара в Западной Австралии. Впадает в Индийский океан в 45 км от города Онслоу. Длина реки составляет около 825 км.Среднегодовое количество осадков в бассейне реки варьируется от 200 мм в юго-восточной части до 350 мм в северной части. Река имеет большое количество притоков: небольших речушек и ручьёв. В засушливые года почти полностью пересыхает.Пойма реки широкая, плоская. По берегам отмечено малое количество растительности.Своё современное название река получила в 1861 году и названа в честь Уильяма Бингхема Бэринга (англ. William Bingham Baring), второго барона Ашбертона, президента Королевского географического общества с 1860 по 1864 года. В прошлом река также носила название Кёрли (англ. Curlew River)."
     },
        {
        "name": "Ашихэ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%88%D0%B8%D1%85%D1%8D",
        "image": "undefined",
        "length": "257 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Сунгари",
        "location": " Китай",
        "info": "Ашихэ́ (кит. упр. 阿什河) — река в китайской провинции Хэйлунцзян, правый приток Сунгари.В исторических документах река упоминалась под названиями Алэчуха хэ (阿勒楚喀河) и Аньчуху шуй (按出虎水); оба этих названия являются китайской транскрипцией маньчжурских слов, означающих «Золотая река». Когда в XII веке жившие в этих местах чжурчжэни восстали против киданьского государства Ляо, названного по реке Ляохэ, то (используя то, что само слово «ляо» означало «железо») по своей родной реке назвали своё государство «золотым», создав империю Цзинь. Впоследствии название реки исказилось до «Аши хэ».Исток реки находится на горе Дацинщань в городском уезде Шанчжи. Сначала река течёт на запад и юг, огибая гору, а затем на юго-запад. Потом, вдоль границ Учана и Ачэна, река течёт на северо-запад и, пройдя через восточные пригороды собственно Харбина, впадает в Сунгари."
     },
     {
        "name": "Ашкадар",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%88%D0%BA%D0%B0%D0%B4%D0%B0%D1%80",
        "image": "undefined",
        "length": "165 км",
        "pool": "3780 км²",
        "consumption": "16,7 м³/с",
        "head": " ",
        "estuary": "Белая",
        "location": " Россия",
        "info": "Ашкада́р (башк. Ашҡаҙар  слушать) — река на Южном Урале, левый приток Белой.Впадает у города Стерлитамак. Берёт начало западее села Ижбуляк Фёдоровского района Республики Башкортостан, далее течёт по Мелеузовскому и Стерлитамакскому районам. Длина реки — 165 км. Общее падение отметок от истока до устья — 271 м, площадь водосборного бассейна — 3780 км², средняя высота — 253 м[источник не указан 1309 дней].Гидроним возводят к иранским языкам, сопоставляя с персидским 'ашка' — «белый», «чистый», 'дарья' — «река».Верхняя часть бассейна лежит в пределах Бугульминско-Белебеевской возвышенности, где встречаются широколиственные леса из клёна, дуба, липы. Нижняя часть бассейна реки Ашкадар представляет низменную равнину с чернозёмами и степной растительностью. Залесённость бассейна — 5 %, распаханность — 70 %. Питание реки Ашкадар, главным образом, снеговое. Среднегодовой расход в устье — 16,7 м³/с.Объекты перечислены по порядку от устья к истоку."
     },
        {
        "name": "Ашлык",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%88%D0%BB%D1%8B%D0%BA",
        "image": "undefined",
        "length": "221 км",
        "pool": "3240 км²",
        "consumption": "undefined",
        "head": "Малое Оськино",
        "estuary": "Вагай",
        "location": " Россия",
        "info": "Ашлык — река в России, протекает в Тюменской области. Устье реки находится в 43 км по левому берегу реки Вагай. Длина реки составляет 221 км. Площадь водосборного бассейна — 3240 км².Берёт начало из озера Малое Оськино на высоте 74,0 м над уровнем моря.По данным государственного водного реестра России относится к Иртышскому бассейновому округу, водохозяйственный участок реки — Иртыш от впадения реки Ишим до впадения реки Тобол, речной подбассейн реки — бассейны притоков Иртыша от Ишима до Тобола. Речной бассейн реки — Иртыш.Код объекта в государственном водном реестре — 14010400112115300012878."
     },
     {
        "name": "Ащиагар",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%89%D0%B8%D0%B0%D0%B3%D0%B0%D1%80",
        "image": "undefined",
        "length": "150 км",
        "pool": "15 000 км²",
        "consumption": "5 м³/с (устье)",
        "head": " ",
        "estuary": " ",
        "location": " Казахстан",
        "info": "Ащиагар — река в Мангистауской области Казахстана. Находится 40 км на востоке от города Актау.Длина реки составляет 150 км, площадь бассейна около 15 000 км². Исток Ащиагара находится на южных склонах Каратау протекает по западной части впадины Карагие и теряется в соре Батыр. Ширина русла 10-50 м, высота берегов 1-4 м.Вода пресная. Питание реки преимущественно снеговое. Средний годовой расход воды у устья около 5 м³/с. В апреле наблюдается половодье с повышением уровня на 4-5 м относительно обычного. Замерзает в середине декабря (толщина льда к концу зимы достигает 0,5 м), вскрывается в начале марта."
     },
        {
        "name": "Ащыозек ",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%89%D1%8B%D0%BE%D0%B7%D0%B5%D0%BA_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "258 км",
        "pool": "7150 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Жалпаксор",
        "location": " Казахстан",
        "info": "Ащыозек (Ащиозек, Горькая) — река в междуречье Волги и Урала. Протекает по территории Западно-Казахстанской области. Длина 258 км, площадь бассейна 7150 км². Берёт начало в 3,5 км к юго-востоку от села Борсы, впадает в озеро Жалпаксор вблизи озера Аралсор. Имеет 7 притоков общей длиной 169 км. Главные притоки: Шеримбетсай и Таткенсай. Среднегодовой расход воды 2,04 м³/с. Питание снеговое. Замерзает с ноября по апрель. Вода используется для обводнения пастбищ.При написании этой статьи использовался материал из издания «Казахстан. Национальная энциклопедия» (1998—2007), предоставленного редакцией «Қазақ энциклопедиясы» по лицензии Creative Commons BY-SA 3.0 Unported."
     },
     {
        "name": "Ащысу (приток Шагана)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%89%D1%8B%D1%81%D1%83_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A8%D0%B0%D0%B3%D0%B0%D0%BD%D0%B0)",
        "image": "undefined",
        "length": "349 км",
        "pool": "18 100 км²",
        "consumption": "0,34 м³/с (с. Ушбиик)",
        "head": " ",
        "estuary": "Шаган",
        "location": " Казахстан",
        "info": "Ащысу́, Ащису́ (каз. Ащысу) — река в Казахстане, правый приток Шагана (притока Иртыша).Протекает в Абайской области, по территории Жарминского, Аягозского, Абайского районов. Длина 349 км, площадь бассейна 18,1 тыс. км². Берёт начало с источников на склонах гор Жаксы Койтас, Жаман Койтас, Сарытау. Впадает в реку Чаган (Шаган). Берега крутые (высотой до 2 м). Питание снеговое. Среднегодовой расход воды 0,34 м³/с (у железнодорожной станции Ушбиик). Вода используется для орошения земель.При написании этой статьи использовался материал из издания «Казахстан. Национальная энциклопедия» (1998—2007), предоставленного редакцией «Қазақ энциклопедиясы» по лицензии Creative Commons BY-SA 3.0 Unported."
     },
     {
        "name": "Ащысу (река, впадает в Алкамерген)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%89%D1%8B%D1%81%D1%83_(%D1%80%D0%B5%D0%BA%D0%B0,_%D0%B2%D0%BF%D0%B0%D0%B4%D0%B0%D0%B5%D1%82_%D0%B2_%D0%90%D0%BB%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D0%B3%D0%B5%D0%BD)",
        "image": "undefined",
        "length": "348 км",
        "pool": "7420 км²",
        "consumption": "0,44 м³/с (с. Тендик)",
        "head": " ",
        "estuary": "Алкамерген",
        "location": " Казахстан",
        "info": "Ащысу́, Ащису́ (каз. Ащысу) — река в Казахстане. Впадает в озеро Алкамерген (по другим данным — в озеро Жарколь).Река Ащысу протекает по территории Бухар-Жырауского района Карагандинской области и Баянаульского района Павлодарской области. Длина 348 км (по другим данным — 276 км). Площадь бассейна 7420 км². Берёт начало из источников на склонах гор Айыртау и Желтау.Притоки: Жиландыбулак, Коргап, Айрык, Карасу, Куртыозек и другие. Ширина долины 7,5 км. Питание преимущественно снеговое. Летом пересыхает. Среднегодовой расход воды у с. Тендик 0,44 м³/с. Замерзает с ноября по апрель.При написании этой статьи использовался материал из издания «Казахстан. Национальная энциклопедия» (1998—2007), предоставленного редакцией «Қазақ энциклопедиясы» по лицензии Creative Commons BY-SA 3.0 Unported."
     },
              {
        "name": "Аякли",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%8F%D0%BA%D0%BB%D0%B8",
        "image": "undefined",
        "length": "166 км",
        "pool": "9520 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Хета",
        "location": " Россия",
        "info": "Ая́кли — река, протекающая по северу Красноярского края. Сливаясь с Аяном, образует Хету. Длина — 166 километров. Площадь водосборного бассейна — 9520 км². Ширина реки достигает нескольких сотен метров, а скорость течения — 8 км/ч.В 1990-х годах в проводились исследования палеозойских отложений северо-востока Тунгусской синеклизы в связи с нефтегазоносностью. В приустьевой части Аякли рифейные отложения были вскрыты Ледянской параметрической скважиной. На глубине 3996-3522 метра были обнаружены интенсивно перекристаллизованные сероцветные известняки.Населённые пункты вдоль реки отсутствуют. В первой половине XX века вдоль берегов Аякли кочевали есейские якуты Катыгынского наслега."
     },
     {
        "name": "Аян (приток Хеты)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%8F%D0%BD_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A5%D0%B5%D1%82%D1%8B)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Khatanga.png/250px-Khatanga.png",
        "length": "181 км",
        "pool": "15 900 км²",
        "consumption": "570 м³/с (устье)",
        "head": "Аян",
        "estuary": "Хета",
        "location": " Россия",
        "info": "Аян — река в России, протекает по Таймырскому Долгано-Ненецкому району Красноярского края. Длина реки — 181 км, площадь водосборного бассейна — 15,9 тыс. км²[2]. Сливаясь с Аякли, образует Хету.Название реки на эвенском означает «старица», «залив», «речная губа», «протока».Высота истока — 465 м над уровнем моря.[источник не указан 824 дня] Аян берет свое начало из вод северо-западной части тектонического озера Аян, которое располагается на плато Путорана, на высоте 470 метров над уровнем моря. Проходит севернее Северного полярного круга.На всём протяжении Аян — горная река, русло которой имеет форму аллювиальной равнины. В верхней части реки (начиная от истока до места впадения одного из притоков Большая Хонна-Макит) долина Аяна — ущелье с глубокими резными оврагами. Ниже Аян поворачивает на северо-восток, и его долина приобретает вид каньона. Врез каньона в плато достигает 0,6 километров, русло характеризуется врезанными излучинами со скалистыми вогнутыми берегами, а ещё ниже приобретает преимущественно разветвлённую извилистую структуру. Ширина русла достигает 200 метров на неразветвлённых участках до 1,5 км в самой широкой части при разделении на несколько рукавов. Уклон реки — 2,1 м/км.[источник не указан 824 дня]"
     },
      {
        "name": "Аян-Юрях",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%8F%D0%BD-%D0%AE%D1%80%D1%8F%D1%85",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Kolyma.png/250px-Kolyma.png",
        "length": "237 км",
        "pool": "24 100 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Колыма",
        "location": " Россия",
        "info": "Аян-Юрях (якут. Айан Υрэх, «Дорожная Речка»; в верхнем течении — Аян-Петля) — река в Магаданской области России, левый исток Колымы (при слиянии с рекой Кулу и образуется Колыма).Является 16-й по длине и 9-й по площади бассейна притоком Колымы. Климат в бассейне реки суровый, снеговой покров может держаться до 9 месяцев.Длина реки — 237 км, площадь водосборного бассейна — 24 100 км². Исток реки находится на склонах Халканского хребта на высоте 992 м,где имеет характер горной реки с уклонами более 7 ‰. Далее Аян-Юрях течёт по Нерскому плоскогорью. В среднем течении уклоны уменьшаются до 2,5-1,6 ‰, река становится полугорной, что составляет 64 % длины Аян-Юрях. Средний уклон реки 1,9 ‰.Русло реки меандрирует, разбивается на рукава и пойменные протоки. Участки врезанного русла занимают около 1 % длины реки, широкопойменного — до 29 %. Дно сформировано валунами и галькой.Питание реки дождевое и снеговое. Река начинает замерзать в конце октября, освобождается ото льда в конце мая. Весенне-летнее половодье приходится май-июнь, тогда происходит 45 % годового стока. Летом проходят дождевые паводки. Размах сезонных изменений уровней воды не более 2,4 м.Среднемноголетний расход воды ниже устья реки Эмтегей (103 км от устья) составляет 80 м³/с, объём стока 2,52 км³/год, модуль стока 3,3 л/(с×км²))."
     },
        {
        "name": "Аят (приток Тобола)",
        "link": "https://ru.wikipedia.org/wiki/%D0%90%D1%8F%D1%82_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A2%D0%BE%D0%B1%D0%BE%D0%BB%D0%B0)",
        "image": "undefined",
        "length": "117 км",
        "pool": "13 300 км²",
        "consumption": "undefined",
        "head": "слияние рек: Караталыаят и Арчаглы-Аят",
        "estuary": "Каратомарское водохранилище",
        "location": " Россия,  Казахстан",
        "info": "Аят — река в России и Казахстане, протекает в Челябинской области России и Костанайской области Казахстана. Аят образуется слиянием рек Караталы-Аят и Арчаглы-Аят. Река впадает в реку Тобол в районе Каратомарского водохранилища. Длина реки — 117 км, площадь её водосборного бассейна — 13 300 км².Значительная часть бассейна образована 383 бессточными озёрами (общая площадь 208 км².). Часть реки, расположенная в Челябинской области имеет длину 23 км и площадь водосбора 8571 км².Грунты бассейна в основном супесчаные и суглинистые, изредка солонцы. Слабоизвилистое плёсовое русло расположено в хорошо выраженной речной долине.Зимой река часто промерзает до дна. На гидрологическом посту Варваринка промерзание наблюдалось 5 раз за 43 года.По данным государственного водного реестра России относится к Иртышскому бассейновому округу, водохозяйственный участок реки — Тобол от истока до впадения реки Уй, без реки Увелька, речной подбассейн реки — Тобол. Речной бассейн реки — Иртыш."
     }, 
     {
        "name": "Бабка (приток Сылвы)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%B1%D0%BA%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A1%D1%8B%D0%BB%D0%B2%D1%8B)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Permskiy_r-n%2C_Permskiy_kray%2C_Russia_-_panoramio_%28806%29.jpg/250px-Permskiy_r-n%2C_Permskiy_kray%2C_Russia_-_panoramio_%28806%29.jpg",
        "length": "162 км",
        "pool": "2090 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Сылва",
        "location": " Россия",
        "info": "Ба́бка — река в Пермском крае, левый приток Сылвы. Течёт по территории Кунгурского и Пермского районов. Устье реки расположено в 21 км по левому берегу Сылвы, ниже города Кунгура.Высота устья — 109,8 м над уровнем моря.[источник не указан 498 дней] Высота истока — 309 м над уровнем моря.[источник не указан 498 дней]Длина — 162 км, общая площадь водосбора — 2090 км², средняя высота водосбора — 233 м. Средний уклон — 0,9 м/км.В Кунгурских писцовых книгах Михаила Кайсарова (1623—1624) река упоминается под названием Бабья: «А вотчина их речка Бабья от вершины до устья до реки Сылвы по обе стороны на сорок вёрст…».Основа названия может восходить к тюрк. баба́ — «отец», впоследствии ударение могло измениться под влиянием русского слова ба́ба.Берега Бабки большей частью низкие, местами имеются сложенные гипсами возвышенности. Бабка протекает, главным образом, в районе пермских медистых песчаников, на базе которых были построены небольшие медеплавильные заводы: Аннинский, Бымовский, Бизярский.В нижнем течении находится район гипсовых скал, в котором идет добыча алебастра.В верховьях реки и притоках водится хариус, в нижнем течении — щука, язь, голавль, окунь, сорога и другие породы рыб. На вырубках по берегам большие малинники, на полянах и угорах растет земляника."
     },
                    {
        "name": "Баган ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%B3%D0%B0%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "364 км",
        "pool": "10 700 км²",
        "consumption": "undefined",
        "head": "Болото Баган",
        "estuary": "Ивановское",
        "location": " Россия",
        "info": "Бага́н — река в Новосибирской области России. Длина реки — 364 км, площадь водосборного бассейна — 10700 км².Надёжной этимологии происхождения гидронима нет, распространённые версии — от тюркского «баган» — «столб», или от индоевропейского «багно» — низкое топкое место. Река Баган действительно протекает по болотам, частью прерывается ими.Река протекает через множество озёр, некоторые участки пересыхают, впадает в бессточное озеро Ивановское. Питание реки преимущественно снеговое.От истока к устью протекает вблизи с населённые пунктами: Озерки 6-е, Индерь, Баган, Довольное, Волчанка, Дружный, Новогорносталево, Барлакуль, Кукарка, Покровка, Палецкое, Баган и некоторых других.По данным государственного водного реестра России относится к Верхнеобскому бассейновому округу, речной бассейн реки — Бессточная область междуречья Оби и Иртыша, водохозяйственный участок реки — бассейн Большого Топольного озера и реки Бурла."
     },
     {
        "name": "Баганёнок",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%B3%D0%B0%D0%BD%D1%91%D0%BD%D0%BE%D0%BA",
        "image": "undefined",
        "length": "180 км",
        "pool": "898 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Баган",
        "location": " Россия",
        "info": "Баганёнок — река в Новосибирской области России. Длина реки — 180 км, площадь водосборного бассейна — 898 км².Река протекает через множество озёр, некоторые участки пересыхают, впадает в реку Баган в 129 км от устья по левому берегу.От истока к устью протекает вблизи населённых пунктов: Нижнечеремошное, Новониколаевка, Нижнебаяновский, Кучугур, Большие Луки.По данным государственного водного реестра России относится к Верхнеобскому бассейновому округу, речной бассейн реки — бессточная область междуречья Оби и Иртыша, водохозяйственный участок реки — бассейн Большого Топольного озера и реки Бурла."
     },
             {
        "name": "Багырлай",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%B3%D1%8B%D1%80%D0%BB%D0%B0%D0%B9",
        "image": "undefined",
        "length": "239 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "Урал",
        "estuary": " ",
        "location": " Казахстан",
        "info": "Багырлай (каз. Бағырлай) — река в Казахстане, протекает по территории Акжаикского района Западно-Казахстанской области и Индерского района Атырауской области. Представляет собой рукав древней дельты Урала. Отделяется от Урала близ села Атамекен, течёт на юг и теряется в 1 км к северу от озера Теренкызыл. Длина реки составляет по разным оценкам 239 или 275 км.Среднегодовой расход воды составляет 2,1 м³/с. Ледостав с декабря по апрель. Вода пресная, мутная. У реки 10 притоков общей длиной 58 км. Воды реки Багырлай используются для обводнения и орошения. Общая протяжённость Багырлайской оросительно-обводнительной системы составляет 97 км."
     },
       {
        "name": "Бадарма ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%B4%D0%B0%D1%80%D0%BC%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "126 км",
        "pool": "2060 км²",
        "consumption": "7 м³/с (4,2 км от устья)",
        "head": " ",
        "estuary": "Усть-Илимское водохранилище",
        "location": " Россия",
        "info": "Бадарма — река в Иркутской области России.Длина — 126 км, площадь водосборного бассейна — 2060 км².Название реки имеет эвенкийские корни и переводится как «Волчья пасть».Берёт начало из болот на высоте более 366 м над уровнем моря. Протекает в восточном направлении по территории Усть-Илимского района. Ширина реки в нижнем течении — 20—24 м, глубина — 0,8—1,3 м, дно твёрдое или песчаное, скорость течения — 0,7 м/с.Впадает в Усть-Илимское водохранилище на Ангаре, образуя залив Бадарма. Имеет несколько притоков протяжённостью от 16 до 33 км. На реке расположены посёлки Бадарминск и Бадарма."
     },
     {
        "name": "Бадяриха",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%B4%D1%8F%D1%80%D0%B8%D1%85%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Indigirka.png/250px-Indigirka.png",
        "length": "545 км",
        "pool": "12 200 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Индигирка",
        "location": " Россия",
        "info": "Бадя́риха (якут. Бадьаариха) — река в Якутии, правый приток Индигирки.Длина — 545 км, площадь бассейна — 12 200 км². Берёт начало на северо-восточных склонах Момского хребта. Течёт по Абыйской низменности, окаймляя с запада Алазейское плоскогорье. В верхнем течении имеет горный характер, ниже — равнинный. В нижнем течении река чрезвычайно извилиста, в пойме много озёр-стариц. Кроме стариц, в бассейне реки много других мелких озёр. Питание главным образом снеговое и дождевое. Главные притоки: Огороха (Гороха), Орто-Тирехтях, Анты.По данным государственного водного реестра России и геоинформационной системы водохозяйственного районирования территории РФ, подготовленной Федеральным агентством водных ресурсов:"
     },
      {
        "name": "База (приток Белой)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%B7%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%91%D0%B5%D0%BB%D0%BE%D0%B9)",
        "image": "undefined",
        "length": "123 км",
        "pool": "1590 км²",
        "consumption": "2,5 м³/с (Рсаево)",
        "head": " ",
        "estuary": "Белая",
        "location": " Россия",
        "info": "База́ (башк. Баҙы) — река в Европейской части России, протекает в Башкортостане, левый приток реки Белая (Агидель) (бассейн Волги).Длина реки составляет 123 км, площадь бассейна — 1 590 км², общее падение — 150 м. Питание Базы преимущественно снеговое. Средне-годовой расход воды у села Рсаево (Илишевский район) составляет 2,5 м³/с. Скорость течения — до 0,4 м/с.База берёт начало из родника в лесной местности, в 2,5 километрах к востоку от деревни Михайловка Шаранского района и протекает с юга на север по населённой местности по территории Шаранского, Чекмагушевского, Илишевского и Дюртюлинского районов Башкортостана. Впадает в реку Белая (Агидель) в 110 километрах от её устья.Бассейн реки находится на севере Бугульминско-Белебеевской возвышенности и Камско-Бельском увалистом понижении. Долина реки находится лесостепной зоне, в западной части встречаются широколиственные леса на серых лесных почвах. Русло Базы сильно петляет, в среднем течении берега в основном невысокие, обрывистые, в нижнем — встречаются старицы, пойма местами заболочена.Лесистость бассейна составляет 8 %, распаханность — 65 %.Притоки: левые — Куваш, Балакбай, Сюдан, Каразирек, Кикичу и др.; правые — Сыгынязы и др."
     },
     {
        "name": "Базавлук",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%B7%D0%B0%D0%B2%D0%BB%D1%83%D0%BA",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/%D0%9C%D1%96%D1%81%D1%82_%D0%BD%D0%B0%D0%B4_%D0%91%D0%B0%D0%B7%D0%B0%D0%B2%D0%BB%D1%83%D0%BA%D0%BE%D0%BC.JPG/250px-%D0%9C%D1%96%D1%81%D1%82_%D0%BD%D0%B0%D0%B4_%D0%91%D0%B0%D0%B7%D0%B0%D0%B2%D0%BB%D1%83%D0%BA%D0%BE%D0%BC.JPG",
        "length": "157 км",
        "pool": "4200 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Каховское водохранилище",
        "location": " Украина",
        "info": "Базавлу́к (устар. Бузулук, Безовлук; укр. Базавлук) — река на западе Днепропетровской области Украины, правый приток Днепра (впадает в Каховское водохранилище ниже Никополя). Длина — 157 км, площадь бассейна — 4200 км².Есть несколько версий происхождения данного наименования. Некоторые исследователи выводят название от тюркских *bazuk, *buzuk (тур. bozuk), что значит «испорченный». Название образовалось с помощью тюркского форманта -luk.Слово образовано от тюркского *buzaw (башк.быҙау, тат. бозау, каз. бұзау, тур. buzağı) — телёнок, *liq — аффикс принадлежности к чему либо.Согласного иной версии слово образовано от тюркского *buz (башк. боҙ, тат. боҙ, каз. мұз, тур.buz, турк. buz) — лёд.У этого термина существуют и другие значения, см. Бузулук.Долина трапециевидная, шириной до 2 км. Русло извилистое, правый берег на всем протяжении крутой, левый — в нижнем течении пологий. Ширина русла 8-10 м, глубина до 1,5 м. Уклон реки 1,3 м/км. Вскрывается в конце февраля, замерзает в декабре. Протекает в основном по густонаселённой распаханной степи, но есть места с высокими скалистыми берегами. В засушливые годы иногда пересыхает и перемерзает. Вода частично используется для орошения. Построено Шолоховское водохранилище. Высота истока — 150 м над уровнем моря.[источник не указан 730 дней]"
     },
     {
        "name": "Базаиха ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%B7%D0%B0%D0%B8%D1%85%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Sunset_in_the_Bazaikha_gulley.jpg/250px-Sunset_in_the_Bazaikha_gulley.jpg",
        "length": "128 км",
        "pool": "1000 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Енисей",
        "location": " Россия",
        "info": "База́иха — река в Красноярском крае, правый приток Енисея; впадает в него в черте города Красноярска, в одноимённом микрорайоне. Берёт начало у нежилого населённого пункта Сухая Базаиха. Длина — 128 км, площадь водосборного бассейна — 1000 км². Высота устья — 139 м над уровнем моря.[источник не указан 724 дня] Уклон реки — 5,7 м/км.[источник не указан 724 дня]Среднегодовой расход воды — 5,0 м³/с. Крупнейшие притоки: Намурт, Калтат, Долгин, Жистык и Корбик.В реке водятся виды рыб: таймень, ленок, хариус, щука, окунь, ёрш, елец, пескарь, налим и др. Река протекает по каньонообразной местности, оба берега крутые.Населённые пункты на реке: Верхняя Базаиха, Корбик (нежил.), Жистык, Ерлыковка и Красноярск.На берегу реки, при впадении в Енисей, в 1640 году была основана деревня Базаиха. Селение прилегало к высокому горному уступу, который назывался Городище, или гора Диван. В XVII веке на плоской вершине горы Диван располагалась крепость енисейских киргизов, которую русские называли Змеиным городищем.В 1883 году во время школьной экскурсии на реку И. Т. Савенков открыл захоронение человека новокаменного века. В 1884 году начались планомерные археологические исследования окрестностей Красноярска, в том числе на реке Базаихе."
     },
             {
        "name": "Базенто",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%B7%D0%B5%D0%BD%D1%82%D0%BE",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Basento0001.jpg/250px-Basento0001.jpg",
        "length": "149 км",
        "pool": "1508 км²",
        "consumption": "12,2 м³/с",
        "head": " ",
        "estuary": "Ионическое море",
        "location": " Италия",
        "info": "Базе́нто (итал. Basento, устар. Казуэ́нтус лат. Casuentus) — река на юге Италии, в области Базиликата. Длина — 149 км, площадь бассейна — 1508 км². Средний расход воды — 12,2 м³/с.Исток находится к югу от города Потенцы и состоит из трёх рукавов, стекающих с трёх гор:Течёт по территории области Базиликата на восток, впадает в залив Таранто (Ионическое море) недалеко от города Метапонто. В долине реки Базенто находятся города Потенца, Трикарико, Феррандина, Метапонто.Притоки:"
     },
            {
        "name": "Баиз",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%B8%D0%B7",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Baise_kanalbruecke.jpg/250px-Baise_kanalbruecke.jpg",
        "length": "188 км",
        "pool": "2910 км²",
        "consumption": "5 м³/с",
        "head": " ",
        "estuary": "Гаронна",
        "location": " Франция",
        "info": "Баи́з (фр. Baïse, окс. Baïsa) — река на юго-западе Франции, левый приток Гаронны. Исток на северных склонах Пиренеев около города Ланнемезан, впадает в Гаронну чуть выше города Эгийон.Длина 188 км, площадь бассейна 2910 км², средний расход воды — 5 м³/с. Протекает по территории трёх департаментов, на реке стоит несколько городов:Крупнейший приток — Желиз (Gélise)."
     },
        {
        "name": "Байгора ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%B9%D0%B3%D0%BE%D1%80%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "115 км",
        "pool": "1370 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Матыра",
        "location": " Россия",
        "info": "Байгора́ — река в Верхнехавском районе Воронежской области, Добринском, Усманском и Грязинском районах Липецкой области. Длина 115 км. Площадь бассейна 1370 км².Байгора — левый приток реки Матыры, в которую впадает в городе Грязи. Исток находится южнее села Верхняя Байгора.По реке Байгоре называется село в Грязинском районе Княжая Байгора и пристанционный посёлок Байгора.В сельце Королевщине, находившемся недалеко от впадения Байгоры в Матыру, родился П. И. Бартенев.Сын Л. Д. Вяземского — Борис, построил в селе Княжая Байгора железобетонный мост через реку. Мост был открыт 10 ноября 1911 года через три с половиной месяца после начала строительства.В 1970 году через Байгору по шоссе Грязи — Добринка построили мост.В 1972 году на реке была построена плотина."
     },
       {
        "name": "Байдарата",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%B9%D0%B4%D0%B0%D1%80%D0%B0%D1%82%D0%B0",
        "image": "undefined",
        "length": "123 км",
        "pool": "3180 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Байдарацкая губа",
        "location": " Россия",
        "info": "Байдарата — река в России, протекает в Ямало-Ненецком автономном округе. Впадает в Байдарацкую губу Карского моря в самой южной её части. Длина реки — около 123 км, площадь водосборного бассейна — 3180 км².Исток у горы Падата-Саурей (Пэдаратасангарэй) на восточных склонах Полярного Урала. Течёт по территории Приуральского муниципального района. Направление течения в верхней и средней части — восточное, в низовьях — северо-восточное. В нижнем течении русло очень извилистое.По данным государственного водного реестра России относится к Нижнеобскому бассейновому округу."
     },
     {
        "name": "Байдраг-Гол",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%B9%D0%B4%D1%80%D0%B0%D0%B3-%D0%93%D0%BE%D0%BB",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Brod_na_%C5%99ece_Bajdrag_gol.jpg/250px-Brod_na_%C5%99ece_Bajdrag_gol.jpg",
        "length": "295 км",
        "pool": "28 300 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Бооне-Цагаан-Нуур",
        "location": " Монголия",
        "info": "Байдраг-Гол (монг. Байдраг гол) — река на юге Монголии. Протекает по территории аймака Баянхонгор. Длина — 295 км, площадь бассейна — 28 300 км².Река начинается на южных склонах хребта Хангай и впадает в озеро Бооне-Цагаан-Нуур на высоте 1313,4 м. Устье расположено в Долине Озёр возле северных предгорий Гобийского Алтая.Половодье происходит летом. Вода используется для орошения близлежащих территорий."
     },
           {
        "name": "Байконыр ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%B9%D0%BA%D0%BE%D0%BD%D1%8B%D1%80_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "235 км",
        "pool": "4940 км²",
        "consumption": "0,85 м³/с",
        "head": " ",
        "estuary": "Шубартениз",
        "location": " Казахстан",
        "info": "Байконы́р (Буланты; каз. Байқоңыр) — река в Улытауском районе Карагандинской области Казахстана.Образуется слиянием рек Курамбай (Куанбай) и Актас, текущих с хребта Улытау. Впадает в озеро-солончак Шубартениз. Длина реки 235 км, площадь водосбора 4940 км². Ширина долины поймы 0,05-2 км. Средний годовой расход воды 0,85 м³/с.Питание реки снеговое. Вода пресная, но летом при понижении уровня воды солёность возрастает. Летом река пересыхает, оставляя лишь небольшие озёра в наиболее глубоких местах.На реке расположено село Байконур, давшее название космодрому.На скалах по обоим берегам реки обнаружены петроглифы.Рядом с рекой в 1728 году произошло Булантинское сражение казахско-джунгарской войны, завершившееся победой казахов.При написании этой статьи использовался материал из издания «Казахстан. Национальная энциклопедия» (1998—2007), предоставленного редакцией «Қазақ энциклопедиясы» по лицензии Creative Commons BY-SA 3.0 Unported."
     },
     {
        "name": "Байлунцзян",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%B9%D0%BB%D1%83%D0%BD%D1%86%D0%B7%D1%8F%D0%BD",
        "image": "undefined",
        "length": "576 км",
        "pool": "31 808 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Цзялинцзян",
        "location": " Китай",
        "info": "Байлунцзя́н (кит. упр. 白龙江, пиньинь Báilóng jiāng, буквально: «Река белого дракона») — река в китайских провинциях Ганьсу и Сычуань, приток Цзялинцзяна.Исток реки находится на горе Миньшань на границе уезда Лучу провинции Ганьсу и уезда Дзёге провинции Сычуань. Река пересекает уезд Тево, поворачивает на юго-восток и, петляя, пересекает уезды Джугчу, Таньчан и район Уду. В уезде Вэньсянь река принимает с запада приток Байшуйцзян, после чего продолжает путь на юго-восток, вновь попадая на территорию провинции Сычуань, где на территории городского округа Гуанъюань впадает в Цзялинцзян."
     },
             {
        "name": "Байхэ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%B9%D1%85%D1%8D",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/%E5%BB%B6%E5%BA%86%E7%A1%85%E5%8C%96%E6%9C%A8%E5%85%AC%E5%9B%AD%E4%B8%8B%E7%9A%84%E7%99%BD%E6%B2%B3.jpg/250px-%E5%BB%B6%E5%BA%86%E7%A1%85%E5%8C%96%E6%9C%A8%E5%85%AC%E5%9B%AD%E4%B8%8B%E7%9A%84%E7%99%BD%E6%B2%B3.jpg",
        "length": "200 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Чаобайхэ",
        "location": " Китай",
        "info": "Байхэ́ (кит. 白河) — река на Севере Китая, относится к бассейну реки Хайхэ.Исток реки находится в уезде Гуюань провинции Хэбэй. Далее река течёт через уезд Чичэн провинции Хэбэй, район Яньцин города центрального подчинения Пекин, и в пекинском районе Миюнь сливается с рекой Чаохэ, образуя реку Чаобайхэ."
     },
     {
        "name": "Байшуйцзян (приток Байлунцзяна)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%B9%D1%88%D1%83%D0%B9%D1%86%D0%B7%D1%8F%D0%BD_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%91%D0%B0%D0%B9%D0%BB%D1%83%D0%BD%D1%86%D0%B7%D1%8F%D0%BD%D0%B0)",
        "image": "undefined",
        "length": "287 км",
        "pool": "8316 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Байлунцзян",
        "location": " Китай",
        "info": "Байшуйцзя́н (кит. упр. 白水江, буквально: «Река белой воды») — река в провинции Ганьсу.Исток реки находится на границе провинций Ганьсу и Сычуань. Река пересекает с северо-запада на юго-восток край уезда Цзючжайгоу провинции Сычуань, и попадает на территорию уезда Вэньсянь провинции Ганьсу, где впадает в Байлунцзян."
     },
     {
        "name": "Байю-де-Вью",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%B9%D1%8E-%D0%B4%D0%B5-%D0%92%D1%8C%D1%8E",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Bayou_DeView_Arkansas_in_the_Cache_River_National_Wildlife_Refuge.jpg/250px-Bayou_DeView_Arkansas_in_the_Cache_River_National_Wildlife_Refuge.jpg",
        "length": "134 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Кэш",
        "location": " США",
        "info": "Байю-де-Вью (англ. Bayou De View) — река, протекает в северо-восточном Арканзасе, пересекая части округов Вудрафф, Монро и Прери. Бассейн Байю-де-Вью является частью бассейнов рек Кэш и Уайт-Ривер. Длина Байю-де-Вью — 134 км.В нескольких милях от нижней части реки находится национальный заповедник «Cache River». В 2012 году Служба охраны рыб и дикой природы предложила расширить территорию заповедника на 48 км, купив землю, доступную для продажи. Территория, граничащая с рекой, имеет густую растительность в виде деревьев лиственных и хвойных пород, таких как нисса, таксодиум двурядный, гикори, сосны и других разновидностей. Этот район раньше был известен как часть «Большого леса» Арканзаса, но большая часть деревьев была вырублена для ведения сельского хозяйства ко второй половине 20-го века. В настоящее время существует много проектов лесовосстановления по краям реки, в том числе, проекты по увлажнению почвы и проекты по посадке лиственных пород.[источник не указан 859 дней]В 2005 году река Байю-де-Вью и город Бринкли привлекли международное внимание из-за возможного наблюдения в окрестностях национального заповедника белоклювого дятла или белоклювого королевского дятла (Campephilus principalis), который считался вымершим с 1940-х годов. Команда исследователей ведёт поиск, чтобы достоверно подтвердить или опровергнуть наличие в парке одной из самых редких птиц в Америке."
     },
     {
        "name": "Бак ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BA_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Back_River_%28July_2006%29.jpg/250px-Back_River_%28July_2006%29.jpg",
        "length": "974 км",
        "pool": "106 500 км²",
        "consumption": "undefined",
        "head": "безымянное озеро",
        "estuary": "Чантри",
        "location": " Канада",
        "info": "Бак (англ. Back River) — река на северо-западе Канады в Нунавуте и Северо-Западных территориях.Берёт своё начало в безымянном озере севернее Большого Невольничьего озера в Северо-Западных территориях. Течёт в северо-восточном направлении. Длина составляет около 974 км, а площадь бассейна равна 106 500 км².Река Бак берёт начало в безымянном озере на высоте 382 метра, течёт на запад в озеро Сассекс (Sussex Lake), затем на север в озеро Мускокс (Muskox Lake), на границе между Северо-Западными территориями и областью Кивалик в Нунавуте, где принимает левый приток Айси (Icy River). Пройдя через стремнины Мускокс-Рапидс, принимает левый приток Контуойто и пробивается на восток через хребет Хейвуд. Далее течёт через стремнины Малли-Рапидс (Malley Rapids), принимает левый приток Сиорак (Siorak River) и впадает в длинное озёрное расширение Бичи-Лейк (Beechey Lake) в юго-восточном направлении, затем поворачивает на восток, принимает правый приток Бейли (Baillie River), а слева — Уоррен, снова справа — Джервойс (Jervoise River), проходит через стремнины Хоук-Рапидс, принимает правые притоки МакКинли (McKinley River) и Консул (Consul River). Между Бейли и Консул река Бак формирует северную границу заповедника Телон (Thelon Wildlife Sanctuary). Далее река поворачивает на северо-восток, принимает левый приток Баллен (Bullen River) и впадает в озеро Пелли на высоте 155 метров. Затем река течёт на восток через череду озёр: Аппер-Гарри, где река принимает правый приток Морс (Morse River), Гарри, Лоуэр-Гарри (Lower Garry Lake), Балиард (Buliard Lake); Аппер-Макдоугал (Upper MacDougall Lake), Лоуэр-Макдоугал (Lower MacDougall Lake)."
     },
      {
        "name": "Баканас ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BA%D0%B0%D0%BD%D0%B0%D1%81_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "240 км",
        "pool": "25 100 км²",
        "consumption": "3,27 м³/с (а. Шубартау)",
        "head": "слияние рек: Альпеис и Толен",
        "estuary": " ",
        "location": " Казахстан",
        "info": "Баканас (происхождение названия неизвестно) — небольшая маловодная река в Восточно-Казахстанской области республики Казахстан. Протяжённость — 240 км, площадь бассейна — около 25 100 км.Река и её притоки берут начало на западных склонах хребта Чингизтау при слиянии реки Альпеис и реки Толен на высоте 808 м нум, затем текут в южном направлении теряясь в песках Балхаш-Алакольской впадины недалеко от границы с Алматинской областью.Ледостав наблюдается с декабря по март. К началу июня река сильно мелеет, в нижней трети полностью пересыхает. Питание в основном снеговое. Притоки: Дагандели, Альпеис, Толен, Кызылозен, Жанибек, Балкыбек, Коксала. Среднегодовой расход воды (у села Шубартау) 3,27 м³/с. Используется для орошения и прочих хозяйственных нужд."
     },
        {
        "name": "Баккильоне",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BA%D0%BA%D0%B8%D0%BB%D1%8C%D0%BE%D0%BD%D0%B5",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Ponte_Molino%2C_Padua%2C_Italy._Pic_01.jpg/250px-Ponte_Molino%2C_Padua%2C_Italy._Pic_01.jpg",
        "length": "118 км",
        "pool": "1400 км²",
        "consumption": "30 м³/с",
        "head": " ",
        "estuary": "Брента",
        "location": " Италия",
        "info": "Баккильоне — река в Италии.Берёт начало в Альпах. Питание реки смешанное. Протекает через ряд североитальянских городов, в том числе таких как Виченца и Падуя. Впадает в реку Брента в нескольких километрах от впадения последней в Адриатическое море, недалеко от Кьоджи.Длина — 118 км. Площадь бассейна около 1400 км². Вследствие загрязнения промышленными стоками по состоянию на 2010 год вода в реке непригодна для питья."
     },
      {
        "name": "Бакленд ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BA%D0%BB%D0%B5%D0%BD%D0%B4_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Buckland_Alaska_aerial_view.jpg/250px-Buckland_Alaska_aerial_view.jpg",
        "length": "108 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Чукотское море",
        "location": " США",
        "info": "Бакленд (англ. Buckland River, инупиак: Kaniq) — река на северо-западе штата Аляска, США. Длина реки составляет 108 км. Течёт главным образом в северо-западном направлении и впадает в Чукотское море в 64 км к юго-западу от города Селавик, на территории боро Нортуэст-Арктик.Британский морской офицер Фредерик Уильям Бичи в 1826 году назвал реку «Бакленд» в честь профессора геологии Оксфордского университета, доктора Бакленда. В XIX веке была также распространена русская транслитерация инуитского названия — Kanyk. Название реки на языке коюкон — Kotsokhotana."
     },
     {
        "name": "Бакой",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BA%D0%BE%D0%B9",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Toukoto-Le_pont_sur_le_Bakoy.jpg/250px-Toukoto-Le_pont_sur_le_Bakoy.jpg",
        "length": "560 км",
        "pool": "85 600 км²",
        "consumption": "141 м³/с (Уалиа (Мали))",
        "head": " ",
        "estuary": "Сенегал",
        "location": " Гвинея,  Мали",
        "info": "Бакой («Белая река», фр. Le Bakoye (Rivière Blanche)) — река в Западной Африке, протекает в Гвинее и Мали, после слияния с рекой Бафинг образует реку Сенегал. Длина реки составляет 560 км.Бакой вместе с более крупным Бафингом после слияния в Бафулабе в западной части Мали образуют реку Сенегал. Бафинг также называют «Чёрной рекой», в отличие от Бакой, называемой «Белая река».Истоки Бакоя находятся в Гвинее на вершинах горного региона Фута-Джаллон к северо-западу от Сигири (Гвинея) на высоте 706 м над уровнем моря. Течёт на северо-восток через холмы Мандинго, к границе с Мали. На территории Мали поворачивает на северо-северо-запад, где к западу от Бамако в него впадает главный приток Бауле («Красная река»). Затем поворачивает на запад до Бафулабе (Мали), где впадает в Бафинг и образует реку Сенегал. У слияния расход воды Бакоя составляет от трети до половины расхода Бафинга.Длина реки — 560 км. Площадь водосборного бассейна — 85 600 км². Река не судоходна. Это единственная река в гвинейской префектуре Сигири, которая не впадает в Нигер.Гидрография реки наблюдалось в течение 39 лет с 1952 по 1990 годы на станции в Уалиа (Мали), расположенной примерно в 50 км от слияния с Бафинг."
     },
     {
        "name": "Бакса",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BA%D1%81%D0%B0",
        "image": "undefined",
        "length": "206 км",
        "pool": "4800 км²",
        "consumption": "undefined",
        "head": "Баксинское болото",
        "estuary": "Шегарка",
        "location": " Россия",
        "info": "Бакса — река в России, протекает по Новосибирской и Томской областям. Устье реки находится в 213 км по правому берегу реки Шегарка. Длина реки — 206 км, площадь водосборного бассейна — 4800 км².(от устья к истоку)Томская область: Песочнодубровка (Высокая Елань), Новоуспенка, Терсалгай, Старочерново, Новая Ювала, Старая Ювала, Хмелёвка, Елгай, Аптала;Новосибирская область: Усть-Тоя, Королёвка, Пихтовка, Марчиха, Михайловка, Мальчиха, Ершовка, Орловка, Лаптевка.(указано расстояние от устья)По данным государственного водного реестра России относится к Верхнеобскому бассейновому округу, водохозяйственный участок реки — Обь от Новосибирского гидроузла до впадения реки Чулым, без рек Иня и Томь, речной подбассейн реки — бассейны притоков (Верхней) Оби до впадения Томи. Речной бассейн реки — (Верхняя) Обь до впадения Иртыша."
     },
     {
        "name": "Баксан ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BA%D1%81%D0%B0%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%B0%D0%BA%D1%81%D0%B0%D0%BD_07.jpg/250px-%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%B0%D0%BA%D1%81%D0%B0%D0%BD_07.jpg",
        "length": "169 км",
        "pool": "6800 км²",
        "consumption": "33,6 м³/с (у с. Заюково)",
        "head": " ",
        "estuary": "Малка",
        "location": " Россия",
        "info": "Бакса́н (кабард.-черк. Бахъсэн, карач.-балк. Басхан) — река на Северном Кавказе в Кабардино-Балкарской Республике. Правый приток Малки (бассейн Терека). Верховье реки у истока, иногда встречается под названием Азау. Средний расход воды — 33,6 м³/с.[источник не указан 433 дня]Длина реки составляет — 169 км, площадь водосборного бассейна — 6800 км². Баксан берёт начало из ледников Азау Большой и Азау Малый в районе Эльбруса. Питание преимущественно ледниковое, снеговое и подземное. Половодье в июле-августе. Имеет множество притоков, наиболее крупными из которых являются реки Черек и Чегем, которые впадают в неё чуть выше слияния с Малкой.В верховьях Баксана и его притоков расположены альпинистские лагеря Баксан, Джан-Тууган, Эльбрус и другие, национальный парк «Приэльбрусье», обсерватория Терскол.На реке Баксан расположены города — Тырныауз и Баксан, а напротив места впадения в Малку — город Прохладный.В низовьях воды используются для орошения (Баксанская оросительная система), на реке построена Баксанская ГЭС.Имеет повышенный уровень загрязнённости.Этимология названия реки имеет несколько вариантов происхождения. Кабардинское название реки — Бахъсэн, можно перевести как — «сеящий пар» или — «пенящаяся». Л. В. Вегенер считал, что в основе топонима возможно лежит балкарское басхан — «затопляющая»."
     },
       {
        "name": "Баксук",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BA%D1%81%D1%83%D0%BA",
        "image": "undefined",
        "length": "171 км",
        "pool": "4930 км²",
        "consumption": "1,97 м³/с",
        "head": "слияние рек: Кайракты и Жолболды",
        "estuary": "Колутон",
        "location": " Казахстан",
        "info": "Баксук (каз. Боқсық, Бақсұқ) — река в Акмолинской области Казахстана, правый приток Колутона (бассейн Оби). Входит в Ишимский водохозяйственный бассейн Республики Казахстан.Берёт начало на юге Кокчетавской возвышенности. Образуется слиянием рек Кайракты и Жолболды. Длина 171 км (от истока Кайракты). Общее направление течения с севера на юг. Впадает в реку Колутон (приток Ишима) с правой стороны. Крупный приток: Жолболды (правый).Сток реки имеет сильно выраженную сезонную и многолетнюю неравномерность. Расходы воды в разные годы могут различаться в десятки и сотни раз, что значительно осложняет хозяйственное использование ресурсов реки.Наиболее крупные: Колоколовка, Вознесенка, Капитоновка, Журавлёвка, Ягодное."
     },
       {
        "name": "Бакчар ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BA%D1%87%D0%B0%D1%80_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/R399_124.jpg/250px-R399_124.jpg",
        "length": "348 км",
        "pool": "7310 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Чая",
        "location": " Россия",
        "info": "Бакча́р (южноселькупск. Музу́р, Мукзу́р) — река в Томской области России, при слиянии с рекой Парбиг образует реку Чая (приток Оби).Длина 348 км, площадь бассейна 7310 км². Питание смешанное, с преобладанием снегового. Характерно растянутое половодье.[источник не указан 545 дней]Полынянка, Поротниково, Чумакаевка, Подольск, Гореловка, Лось-Гора, Нижняя Тига, Усть-Бакчар. Село Бакчар, несмотря на название, стоит не на реке Бакчар, а на его притоке реке Галка."
     },
     {
        "name": "Бакы (приток Уяндины)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BA%D1%8B_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A3%D1%8F%D0%BD%D0%B4%D0%B8%D0%BD%D1%8B)",
        "image": "undefined",
        "length": "170 км",
        "pool": "2240 км²",
        "consumption": "undefined",
        "head": "Бакы",
        "estuary": "Уяндина",
        "location": " Россия",
        "info": "Бакы́ — река в Усть-Янском улусе Якутии, левый приток Уя́ндины (бассейн Индигирки).Длина реки — 170 км, площадь водосборного бассейна — 2240 км². Вытекает из озера Бакы, находящегося в месте примыкания западного конца Полоусного кряжа к хребту Кюн-Тас. От озера течёт немного на юго-восток, затем сворачивает на юго-запад. В среднем течении делает затяжной плавный поворот на юго-восток. Сливается с Иргичэном, образуя реку Уяндину.Русло очень извилистое. В долине нижнего течения реки находится множество озёр.На левом берегу вблизи устья находится село Уянди (Уяндино).Крупнейшие притоки (левые): Сонтойон (дл. 35 км), Дюгундя (28 км), Эегуэн-Сотоколчан (25 км), Оттох (25 км), Икенак (23 км), Арбундя (20 км).По данным государственного водного реестра России относится к Ленскому бассейновому округу, водохозяйственный участок реки — Индигирка от впадения Момы до водомерного поста Белая Гора. Речной бассейн реки — Индигирка."
     },
     {
        "name": "Бакы (приток Яны)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BA%D1%8B_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%AF%D0%BD%D1%8B)",
        "image": "undefined",
        "length": "172 км",
        "pool": "3020 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Яна",
        "location": " Россия",
        "info": "Бакы — река в Якутии. Протекает по территории Верхоянского района. Берёт начало на склонах хребта Кулар. Впадает в реку Яну в 479 км от её устья по левому берегу. Длина реки составляет 172 км, площадь водосборного бассейна — 3020 км². Крупнейший приток — Харылый-Сала.По данным государственного водного реестра России и геоинформационной системы водохозяйственного районирования территории РФ, подготовленной Федеральным агентством водных ресурсов:"
     },
     {
        "name": "Бакыр",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BA%D1%8B%D1%80",
        "image": "undefined",
        "length": "129 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "Омер",
        "estuary": "Чандарлы",
        "location": " Турция",
        "info": "Бакыр (Бакырчай, тур. Bakırçay «медный поток») — река в Турции на западе Малой Азии в Эгейском регионе, в илах Измир и Маниса, в исторической области Мисии. Протекает южнее Бергамы, древнего Пергама, севернее Сомы и впадает в залив Чандарлы (Çandarlı Körfezi) Эгейского моря, известный в древности как Кимский (др.-греч. Κυμαῖος κόλπος) или Элейский залив (Ἐλαϊτικός κόλπος). Длина 129 километров. Исток находится на горе Омер (Ömer Dağı) в иле Балыкесир. От истока река течёт к югу через деревню Геленде (Gelenbe) и далее на запад севернее Кыркагача (Kırkağaç) и гор Юнт (Yunt Dağları) в иле Манисе. Устье находится в 3 километрах восточнее деревни Чандарлы (Çandarlı), древней Питаны в иле Измире.Дельта Бакыра является важным местом для птиц.Река известна в античности как Каик (др.-греч. Κάϊκος). По Страбону равнина Каика «очень плодородная, пожалуй лучшая в Мисии». По преданию речной бог Каик был сыном Океана и Тефии. В двух километрах от устья Каика находился древний город Элея (Ελέα), основанный Менесфеем, который служил гаванью Пергаму.Согласно приписываемому Плутарху трактату «О реках» Каик прежде назывался Астрей (др.-греч. Ἀστραῖος) по имени Астрея, сына Посейдона."
     },
              {
        "name": "Баланда ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BB%D0%B0%D0%BD%D0%B4%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Balanda.png/250px-Balanda.png",
        "length": "164 км",
        "pool": "1900 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Медведица",
        "location": " Россия",
        "info": "Баланда́ — река в Саратовской области России, протекает по Екатериновскому, Калининскому и Лысогорскому районам, правый приток Медведицы (впадает в неё в 447 км от устья).Длина — 164 км, площадь водосборного бассейна — 1900 км².Берёт начало на водоразделе рек Хопёр и Медведица близ села Упоровка. Впадает в Медведицу у села Симоновка. В среднем течении реки находятся (расположены) село Большая Ольшанка, город Калининск (в прошлом слобода Баланда).Основные притоки:Баланда протекает на юго-западе Приволжской возвышенности. Питание реки преимущественно снеговое. Ранее вся долина реки была покрыта лесом.Рядом с рекой было много глубоководных озёр: Бобровое, Тростовое, Подгорное, Лебяжье, Журавское."
     },
      {
        "name": "Балахлей ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BB%D0%B0%D1%85%D0%BB%D0%B5%D0%B9_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "134 км",
        "pool": "2240 км²",
        "consumption": "3,29 м³/с (23 км от устья)",
        "head": "Балахлейское болото",
        "estuary": "Вагай",
        "location": " Россия",
        "info": "Балахлей — река в Тюменской области России, правый приток Вагая.Длина — 134 км, площадь водосборного бассейна — 2240 км², заболоченность — 35 %.Берёт начало из Балахлейского болота на высоте немногим больше 115 м над уровнем моря, на юге Аромашевского района. Протекает в северном направлении. Впадает в Вагай в 261 км от его устья по правому берегу. Основные притоки — Кусеряк, Озериха, Богомолка.Населённые пункты на реке: сёла Малоскаредное, Кротово и Новоберёзовка, деревни Овсово, Вилкова, Усть-Лотовка, Большой Кусеряк, Балахлей и Ангарка.Русло реки умеренно извилистое, с чередованием плёсов и перекатов через 50—200 м. Преобладающая ширина русла на плёсах — 10—12 м, глубина — 1 м, дно илистое, ширина на перекатах — 4—7 м, глубина — 0,3—0,5 м, дно песчаное. В летний период русло зарастает водной растительностью, скорость течения — 0,5—1,0 м/с, температура воды — 18—21 °C.По данным наблюдений с 1952 по 1999 год среднегодовой расход воды в 23 км от устья составляет 3,29 м³/с, максимальный расход приходится на апрель, минимальный — на февраль:По данным государственного водного реестра России и геоинформационной системы водохозяйственного районирования территории РФ, подготовленной Федеральным агентством водных ресурсов:"
     },
                  {
        "name": "Балкли",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BB%D0%BA%D0%BB%D0%B8",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Bulkley_River_flowing_into_Skeena_River_near_Hazelton%2C_British_Columbia.jpg/250px-Bulkley_River_flowing_into_Skeena_River_near_Hazelton%2C_British_Columbia.jpg",
        "length": "257 км",
        "pool": "12 400 км²",
        "consumption": "undefined",
        "head": "Балкли",
        "estuary": "Скина",
        "location": " Канада",
        "info": "Балкли (англ. Bulkley River) — река на западе провинции Британская Колумбия (Канада), главный приток реки Скина.Берёт своё начало в одноимённом озере южнее шоссе № 16 между Хьюстоном и Бернс-Лейк. Большую часть пути Балкли течёт почти параллельно шоссе № 16 (160 км из 237) — вначале на запад, затем принимает свой главный приток, реку Морис, западнее Хьюстона, и поворачивает на север, течёт через Телкву, Смитерс и Мористаун, а возле Хейзелтона впадает в реку Скина, которая несёт свои воды в пролив Чатем Тихого океана. Длина составляет 257 км, а площадь бассейна равна 12 400 км². Река известна лучшей в Канаде рыбалкой на радужную форель. Помимо радужной форели, в реке также ловится кижуч, чавыча и другие лососёвые.Река названа в честь полковника Чарльза Балкли, руководителя строительства Русско-Американского телеграфа, который в 1866 году исследовал район реки.Река Балкли имеет столь значительную длину из-за картографической ошибки, при слиянии Балкли со значительно более крупной рекой Морис река получила название притока."
     },
            {
        "name": "Балх ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BB%D1%85_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "471 км",
        "pool": "19 200 км²",
        "consumption": "54,3 м³/с",
        "head": " ",
        "estuary": " ",
        "location": " Афганистан",
        "info": "Балх или Балхаб (в верховье Банди-Амир перс. دریای بلخاب) — река в Афганистане. Длина — 471 км. Площадь водосбора — 19200 км². Средневзвешенная высота водосбора — 2230 м. Средний расход воды — 54,3 м³/с.Берёт начало в центральной части Афганистана на склонах хребта Баба (система Гиндукуша). Неподалёку от места где формируется исток, образует озёра, носящее то же название, что и река. Вода из озёр расположенные цепочкой, низвергается водопадом. Долина реки до поворота на северо-восток у села Дахани-Кашан обжита и хорошо орошена. Склоны гор в этой части поросший редким лесом и кустарником. Ниже по течению до выхода реки из гор в районе села Миркасим, долина реки большей частью узкая, так как ограничена высокими и крутыми склонами гор. Растительность в этом месте отсутствует. Небольшие расширения долины реки, где расположены сёла, встречаются редко. Выше села Буйнакары долина на протяжении 25 км имеет ширину от 2 до 4 км. Протекать по узкой долине вновь, река начинает после села Кафнандара, и в 12 км от выхода реки из гор долина переходит в ущелье. Местами глубоко врезанное русло реки имеет ширину 4—6 м. Долина постепенно расширяется ниже ущелья, где река протекает в заглубленном русле. Острова в русле реки встречаются крайне редко. У села Миркасим после выхода из гор река разбирается на орошение. Основное русло реки проходит недалеко от города Акча направляясь на северо-запад и под названием Афгандарьи теряется в песках не доходя до Амударьи. Площадь орошаемых земельных угодий в бассейне Балх достигает 45000 га."
     },
      {
        "name": "Балыгычан",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BB%D1%8B%D0%B3%D1%8B%D1%87%D0%B0%D0%BD",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Kolyma.png/250px-Kolyma.png",
        "length": "352 км",
        "pool": "17 600 км²",
        "consumption": "undefined",
        "head": "слияние рек: Левый Балыгычан и Правый Балыгычан",
        "estuary": "Колыма",
        "location": " Россия",
        "info": "Балыгычан — река на Дальнем Востоке России, в Магаданской области, правый приток Колымы.Название в переводе с якут. балыкчаан — «маленькая рыбная».Образуется слиянием Левого и Правого Балыгычана. Длина реки 352 км (от истока Левого Балыгычана — 400 км). Площадь водосборного бассейна — 17 600 км² со средней высотой 600 нум. Бассейн расположен в зоне сплошного распространения вечной мерзлоты, в субарктическом климатическом поясе, в северотаёжной растительной зоне. В бассейне более 300 озёр.Протекает по Колымскому нагорью на территории Омсукчанского и Среднеканского районов. В верховьях образуются наледи. Русло Балыгычана извилистое, в низовьях разбивается на пойменные протоки. Впадает в Колыму в 1353 км от её устья.Питание в основном дождевое. Замерзает в начале октября, вскрывается в конце мая. Летом и в начале осени отмечаются дождевые паводки, возможно до пяти волн. Зимняя межень низкая.Среднемноголетний расход воды в устье реки около 150 м³/с, объём стока 4,734 км³/год. Мутность воды 50-100 г/м³. Вода реки по химическому составу относится к гидрокарбонатному классу (с повышенным содержанием сульфатов) и кальциевой группе; минерализация не более 50 мг/л.В водах реки обитают хариус, чукучан, щука, а также сиговые."
     },
       {
        "name": "Балыктах (река, Котельный)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BB%D1%8B%D0%BA%D1%82%D0%B0%D1%85_(%D1%80%D0%B5%D0%BA%D0%B0,_%D0%9A%D0%BE%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9)",
        "image": "undefined",
        "length": "205 км",
        "pool": "4110 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Бухта Якова Смирницкого",
        "location": " Россия",
        "info": "Балыктах (якут. Балыктаах — «рыбная», также встречаются названия Царёва, Рыбная) — река на острове Котельный островов Анжу в Новосибирском архипелаге. Административно расположена в Якутии, Россия. Является крупнейшей рекой острова. Название получила от якут. балык — «рыба», так как в её водах водится много рыбы. Длина — 205 км, площадь водосбора — 4110 км².Берёт начало западнее центра острова, с северного окончания возвышенности Ирим-Тас, и течёт на северо-восток, загибаясь на восток, затем продолжает течь на юг. Разделяясь на несколько проток впадает в бухту Якова Смирницкого Восточно-Сибирского моря.Ширина реки до разделения на рукава составляет 110 метров. Скорость течения достигает 0,1 м/с. Глубины до 2-х метров. Дно вязкое.Объекты по порядку от устья к истоку ( км от устья: ← левый приток | → правый приток | — объект на реке ):"
     },
       {
        "name": "Бальджа",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BB%D1%8C%D0%B4%D0%B6%D0%B0",
        "image": "undefined",
        "length": "211 км",
        "pool": "8530 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Онон",
        "location": "",
        "info": "Ба́льджа (Балдж-Гол; монг. Балдж гол) — река в Монголии и в Забайкальском крае России, левый приток Онона.Бальджа берёт начало на южном склоне Перевального хребта и большую часть протекает по территории Монголии. Длина реки составляет 211 км, в России находится лишь её верхнее течение (38 км). Площадь водосбора — 8530 км², из которых 3650 км² (около 43 %) приходится на Россию.Впервые золотые россыпи на реке Бельджа были найдены Н. П. Аносовым в 1853 году."
     },
     {
        "name": "Бальсас",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BB%D1%8C%D1%81%D0%B0%D1%81",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/R%C3%ADo_Balsas_desde_Coyuca_de_Catal%C3%A1n.JPG/250px-R%C3%ADo_Balsas_desde_Coyuca_de_Catal%C3%A1n.JPG",
        "length": "724 км",
        "pool": "113 100 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Тихий океан",
        "location": " Мексика",
        "info": "Ба́льсас (в среднем течении — Меска́ла, в верхнем течении — Атоя́к; исп. Río Balsas) — река в Северной Америке, формирующая обширный бассейн в центральной части южной Мексики. Является одной из самых длинных рек Мексики (724 км). Начинается в южной части Мексиканского нагорья при слиянии рек Сан-Мартин и Зауапан на территории штата Пуэбла. Течёт на юго-запад, затем на запад через штат Герреро, образуя границу со штатом Мичоакан. Впадает в Тихий океан недалеко от города Ласаро-Карденас.Бальсас на всём протяжении протекает в горах и имеет несколько названий в разным местах своего течения — Амакузак (Amacuzac) в штате Морелос, Микситеко (Mixteco) в штате Оахака, Атояк (Atoyac) в штате Пуэбла и Мезкала (Mezcala) в Герреро.Река Бальсас расположена в тектонической впадине между хребтом Южная Сьерра-Мадре и Трансмексиканским вулканическим поясом. Эрозионная деятельность притоков реки Бальсас создала на склонах Южной Сьерра-Мадре сложную сеть глубоких долин и гребней, почти не оставив ровных участков.В районе бассейна реки Бальсас находятся месторождения золота, свинца, меди, цинка, железа, угля, барита, марганца, мышьяка, сурьмы, талька.На реке есть несколько порогов. Большая часть бассейна занята широколиственными тропическими лесами. Основные притоки реки слева — Мистеко, Тлапанеко, справа — Нехапа, Куцамала, Такам-баро, Тепалькатепек."
     },
       {
        "name": "Бангпаконг",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BD%D0%B3%D0%BF%D0%B0%D0%BA%D0%BE%D0%BD%D0%B3",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Bang_Pakong_River_-_May_2010_-_01.jpg/250px-Bang_Pakong_River_-_May_2010_-_01.jpg",
        "length": "120 км",
        "pool": "17 000 км²",
        "consumption": "undefined",
        "head": "слияние рек: Накхоннайок и Прачинбури",
        "estuary": "Сиамский залив",
        "location": " Таиланд",
        "info": "Бангпако́нг (тайск. แม่น้ำบางปะกง) — река в Восточном Таиланде. Берёт свое начало при слиянии рек Нахоннайок и Прачинбури  (англ.) рус. в ампхе Бан Санг  (англ.) рус. провинции Прачинбури. Течёт на юг мимо города Чаченгсау и впадает в Сиамский залив в 100 км от Бангкока. Длина реки Бангпаконг составляет 120 км, площадь бассейна — около 17 000 км². Воды реки используются для питья и для орошения. В районе устья расположена гидроэлектростанция. В дельту реки заходят дельфины.[источник не указан 683 дня]В окрестностях реки обнаружены монеты государства Дваравати."
     },
     {
        "name": "Бандама",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BD%D0%B4%D0%B0%D0%BC%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Bandama1.JPG/250px-Bandama1.JPG",
        "length": "1050 км",
        "pool": "98 500 км²",
        "consumption": "263 м³/с",
        "head": " ",
        "estuary": "Атлантический океан",
        "location": " Кот-д’Ивуар",
        "info": "Бандама — река в Западной Африке.Является самой длинной рекой в Кот-д’Ивуаре. Длина реки — около 1050 км, её бассейн охватывает площадь в 98 500 км². Направление течения реки с севера на юг; она впадает в Гвинейский залив.В 1973 году на реке сооружена ГЭС с генерирующей мощностью в 176 МВт.Судоходна на 65 км от устья, выше из-за многочисленных порогов и резкого снижения уровня воды в сухой период передвижение невозможно.Город Ямусукро, столица Кот-д’Ивуара, расположен в непосредственной близости от реки Бандама."
     },
         {
        "name": "Бани ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BD%D0%B8_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Bani_river.jpg/250px-Bani_river.jpg",
        "length": "430 км",
        "pool": "101 000 км²",
        "consumption": "513 м³/с (Дуна)",
        "head": "слияние рек: Багоэ и Бауле",
        "estuary": "Нигер",
        "location": " Мали",
        "info": "Бани́ (фр. Le Bani) — река в Мали, правый приток Нигера.Длина — 430 (416) км, площадь водосборного бассейна — 101 тыс. км². Бани образуется слиянием рек Багоэ и Бауле в 160 км восточнее Бамако. Протяжённость реки, если считать от истока Бауле до устья Бани, составляет 775 км. Бани на всём своём протяжении протекает по малийской территории, впадая в Нигер в городе Мопти. Около 15 % бассейна реки находится на территории северного Кот-д’Ивуара.В зависимости от места, количество осадков в бассейне реки колеблется от 500 до 1500 мм в год. Однако, количество резко сезонно — в некоторые годы с ноября по апрель может выпасть всего несколько миллиметров осадков.Река играет важнейшую роль для местной фауны и населения (источник питья, орошения, судоходство, рыболовство). Однако, продолжительные засухи и сильные летние ливни влияют на уровень реки и расход воды. От наводнений страдают около 500 тыс. жителей, поэтому на реке планируется строительство дамбы."
     },
     {
        "name": "Банн ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BD%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/River_Bann_at_Coleraine.JPG/250px-River_Bann_at_Coleraine.JPG",
        "length": "129 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Северный пролив",
        "location": " Великобритания",
        "info": "Банн (устар. Бэнн; англ. River Bann; ирл. An Bhanna) — крупнейшая река Северной Ирландии; берёт начало в горах Морн, к востоку от Ньюри, протекает через озеро Лох-Ней, впадает в Северный пролив в 7 км ниже Колрейна. Длина — 129 км.Это самая длинная река Северной Ирландии. Общая длина Верхнего и Нижнего Банна составляет 129 км. Вместе с озером Лох-Ней — 159 км. Река протекает по Северной Ирландии с юго-востока на северо-запад. Бассейн охватывает площадь в 5775 км². Среднегодовой расход воды составляет 92 м³/с.Площадь водосбора озера Лох-Ней составляет 43 % земель Северной Ирландии и нескольких приграничных областей республиканской части Ольстера. Уровень воды в озере регулируется при помощи дамбы в местечке Тум. Современную дренажную систему разработал инженер Перси Шеперд (1878—1948). Она была введена в эксплуатацию в 1955 году. Уровень воды колеблется между 12,45 и 12,6 м выше ординарного уровня.Река Банн условно отделяет западную часть Северной Ирландии от восточной. Города, микрорайоны, предприятия, расположенные к западу от реки Банн, традиционно получают меньше инвестиций, чем те, что расположены восточнее. Отличия также заметны в религии, экономике и политике: на западе религиозное большинство представляют католики и ирландские националисты, на востоке — «протестанты Ольстера» и «юнионисты»; на востоке финансовые и индустриальные потоки сосредоточены вокруг Белфаста, а западные районы являются сельскохозяйственными."
     },
          {
        "name": "Баппагай",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BF%D0%BF%D0%B0%D0%B3%D0%B0%D0%B9",
        "image": "undefined",
        "length": "307 км",
        "pool": "4650 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Вилюй",
        "location": " Россия",
        "info": "Баппага́й (Бааппагай) — река в Якутии, правый приток Вилюя. Длина 307 км, площадь водосборного бассейна 4650 км². Берёт начало на Приленском плато, в верхнем течении пересыхает. Протекает по Центральноякутской равнине. В бассейне реки много мелких озёр. Питание преимущественно дождевое. Река очень извилиста."
     },
            {
        "name": "Барайы",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%80%D0%B0%D0%B9%D1%8B",
        "image": "undefined",
        "length": "251 км",
        "pool": "4880 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Алдан",
        "location": " Россия",
        "info": "Барайы — река в России, в Якутии. Правый приток Алдана.Длина реки — 251 км, площадь водосборного бассейна — 4880 км².Берёт своё начало на Верхоянском хребте, на высоте 1850 м над уровнем моря. Питание снеговое и дождевое. Вскрывается Барайы в конце мая, замерзает в середине октября. Почти до самого Алдана русло образовано крупной галькой и булыжником.[источник не указан 447 дней]Основные притоки реки, с указанием расстояния от устья и берега:"
     },
     {
        "name": "Барак ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%80%D0%B0%D0%BA_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Silchar_barak.jpg/250px-Silchar_barak.jpg",
        "length": "900 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": " ",
        "location": " Индия,  Бангладеш",
        "info": "Барак (в верхнем течении — Сангу-Лок, бенг. বরাক নদী) — крупная река в Северо-Восточной Индии и Бангладеш, часть системы Сурма-Мегхна.Исток реки находится в индийском штате Манипур на хребте Бараил в горах Нагов (англ. Naga Hills) на высоте 2995 м над уровнем моря. Далее река течет на запад и юг до Типаймук, где резко поворачивает на север и проходит по границе между округом Качар в Ассаме и Манипуром. Далее река поворачивает на запад. На границе с Бангладеш река разделяется на два рукава северный (Сурма) и южный (Кушияра), которые в Бангладеш опять соединяются в объединённый поток, который называется Кални. Крупнейшими притоками являются Джири (Jiri), Чири (Chiri), Бадринала (Badrinala), Джатинга (Jatinga), Мадхура (Madhura), Маранг (Marang), Гхагра (Ghagra), Сонай (Sonai), Катакхал (Katakhal), Сири (Siri), Ларанг (Larang), Дхалесвари (Dhaleswari), Сингла (Singla) и Лонгаи (Longai). Длина реки 900 км. Площадь бассейна реки 41000 км², по другим данным 52000 км².Долина реки Барак расположена в узкой вытянутой впадине вытянутой с запада на восток, заполненной аллювиальными отложениями и находится на северной окраине складчатых хребтов Индо-Бирманского фронтально-складчатого пояса. Эти хребты образованы породами миоценового возраста. Русло реки Барак подвергается существенным изменениям, чему могут способствовать тектонические процессы. Последнее крупное землетрясение в этом районе магнитудой 5,5 баллов произошло в 1984 году."
     },
     {
        "name": "Барака ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%80%D0%B0%D0%BA%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Tokar_Delta.jpg/250px-Tokar_Delta.jpg",
        "length": "500 км",
        "pool": "66 200 км²",
        "consumption": "undefined",
        "head": "слияние рек: Сулет и Шагульгуй",
        "estuary": "Красное море",
        "location": "",
        "info": "Барака (на территории Эритреи — Барка; араб. نهر بركة Нахр-Барака) — сезонная река в Эритрее и Судане, течёт с Эритрейского нагорья на равнины Судана. В период правления Великобритании в Судане реку называли «Газель» из-за постоянного изменения её русла по причине сильного перемещения песчаных дюн.Барака берёт начало на Эритрейском плато неподалёку от Асмэры и протекает в северо-западном направлении через Агордат. Около 300 км Барка протекает по территории Эритреи и около 200 км — по территории Судана до токарской дельты.На территории Судана Барака сезонно течёт до дельтового устья в Красном море, у города Токар. Точное местонахождение устья не может быть установлено, поскольку дельта реки имеет длину около 45 км и ширину 80 км.Объекты по порядку от устья к истоку ( км от устья: ← левый приток | → правый приток | — объект на реке ): Красное мореРека течёт лишь несколько месяцев в году. Только во время сезона дождей в летние месяцы она достигает границы с Суданом. Тем не менее, Барака является одним из основных источников воды в Восточном Судане (в переводе с арабского «барака» означает «благодать»). Средний расход воды в реке составляет 0,8 куб. километров в год. В хороший сезон дождей в токарской дельте наблюдается от 15 до 22 паводков, в результате которых в дельте осаждается большое количество ила и песка."
     },
                         {
        "name": "Барвон (река, впадает в Бассов пролив)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%80%D0%B2%D0%BE%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0,_%D0%B2%D0%BF%D0%B0%D0%B4%D0%B0%D0%B5%D1%82_%D0%B2_%D0%91%D0%B0%D1%81%D1%81%D0%BE%D0%B2_%D0%BF%D1%80%D0%BE%D0%BB%D0%B8%D0%B2)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Barwon_River_Geelong.jpg/250px-Barwon_River_Geelong.jpg",
        "length": "156,6 км",
        "pool": "3986 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Бассов пролив",
        "location": " Австралия",
        "info": "Барвон (англ. Barwon River) — река в австралийском штате Виктория. Длина реки равна 156,6 км (по другим данным — 160 км). Площадь водосборного бассейна — 3986 км².Начинается на равнине Джиранджемит при слиянии двух водотоков (западной и восточной ветвей). От истока течёт сначала на северо-восток через населённые пункты Биррегурра, Уинчелси. В городе Инверлей поворачивает на восток. В низовьях протекает через крупный город Джилонг. Впадая в Бассов пролив, образует крупный эстуарий, в состав системы которого входят озёра Конневар, Риди и болото Хоспитал-Суамп.Бассейн реки ограничен с запада — хребтом Отуэйс, с севера — хребтом Брисбен (представляющим собой южные отроги Большого Водораздельного хребта), с востока — полуостровом Белларайн. 81 % территории водосбора занят прериями, ещё 13 % приходятся на горные леса. Среднегодовое количество осадков меняется от 1400 мм на хребте Отуэйс до 540 в приустьевой части. Река имеет ярко выраженную сезонность стока, максимум которого приходится на август-сентябрь, а минимум — на январь-апрель. На водомерной станции в Поллоке 60 % объёма стока приходится на трёхмесячный период июль-сентябрь, а на период с января по март — всего 5 %."
     },
      {
        "name": "Баргузин ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%80%D0%B3%D1%83%D0%B7%D0%B8%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Bargusinmuendung_ustbargusin.jpg/250px-Bargusinmuendung_ustbargusin.jpg",
        "length": "480 км",
        "pool": "21 100 км²",
        "consumption": "130 м³/с",
        "head": " ",
        "estuary": "Байкал",
        "location": " Россия",
        "info": "Баргузи́н (бур. Баргажан мүрэн) — река в Курумканском и Баргузинском районах Бурятии; одна из крупнейших рек, впадающих в озеро Байкал.Длина — 480 км, площадь бассейна — 21 100 км². Берёт начало на стыке Икатского и Южно-Муйского хребтов. Вырываясь со склонов Икатского хребта, Баргузин входит в Амутскую котловину, где образует проточное озеро Балан-Тамур. Пройдя котловину, река течёт по таёжной заболоченной долине, которая постепенно переходит в глубокое ущелье, образующее относительно несложные пороги с мощными сливами. Основные препятствия концентрируются в Анкоконском прорыве, состоящем из четырёх порогов III—IV к/с. Бо́льшую часть верхнего участка Баргузин протекает по территории Джергинского природного заповедника. После входа в Баргузинскую котловину, река приобретает равнинный характер и течёт по широкой долине до села Баргузин, после чего прорывает отрог Баргузинского хребта, вновь образуя несложные пороги и шиверы. Впадает в Баргузинский залив единым потоком в 1,5 км от посёлка Усть-Баргузин, неся в Байкал многочисленные иловые и песчаные осадки.Питание реки преимущественно дождевое. Средний годовой расход воды в устье 130 м³/с.Главные притоки: Гарга, Аргада, Ина — слева; Улюн — справа."
     },
     {
        "name": "Барда (приток Сылвы)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%80%D0%B4%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A1%D1%8B%D0%BB%D0%B2%D1%8B)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%B0%D1%80%D0%B4%D0%B0_-_panoramio_%281%29.jpg/250px-%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%B0%D1%80%D0%B4%D0%B0_-_panoramio_%281%29.jpg",
        "length": "209 км",
        "pool": "1970 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Сылва",
        "location": " Россия",
        "info": "Барда́ — река в Пермском крае России, правый приток Сылвы. Протекает по юго-востоку края, по территории Лысьвенского, Берёзовского и Кишертского районов. Длина — 209 км, общая площадь водосбора — 1970 км², средняя высота водосбора — 245 м. Средний уклон — 0,8 м/км.Исток Барды расположен к западу от посёлка Кын."
     },
            {
        "name": "Барима",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%80%D0%B8%D0%BC%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Arawatta_rock_barima_river.png/250px-Arawatta_rock_barima_river.png",
        "length": "400 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Атлантический океан",
        "location": " Гайана,  Венесуэла",
        "info": "Барима (англ. Barima, исп. Barima) — река в Южной Америке, протекает по территории Гайаны в регионе Барима-Уайни, устьевая часть в Венесуэле, в штате Дельта-Амакуро. Длина около 400 км.Течёт по лесистой местности.Имеет три стока в Атлантический океан: первый через речную систему Корьяй → Сабайна → Маруйва → Уайни, второй через протоку Мора-Пассаж, третий, основной, находится в Венесуэле.Берега реки являются одним из мест компактного проживания индейцев-карибов.Некоторые притоки (от устья к истоку): Арука, Кайтума, Дрикай-Ануку, Экинавина, Анабиси, Кориабо, Манари, Тенапу, Маникуру, Аракакапару, Ванама-Пару (Уонама), Вана (Уона), Кальяку.В верховье на реке имеется множество водопадов: Эклипс, Гаррисон, Горинг, Барамба."
     },
     {
        "name": "Барито",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%80%D0%B8%D1%82%D0%BE",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/COLLECTIE_TROPENMUSEUM_De_maan_schijnt_achter_de_wolken_boven_de_Barito-rivier_TMnr_60018702.jpg/250px-COLLECTIE_TROPENMUSEUM_De_maan_schijnt_achter_de_wolken_boven_de_Barito-rivier_TMnr_60018702.jpg",
        "length": "880 км",
        "pool": "100 000 км²",
        "consumption": "5000 м³/с",
        "head": " ",
        "estuary": "Яванское море",
        "location": " Индонезия",
        "info": "Бари́то (индон. Barito) — река на индонезийской территории острова Калимантан. Протекает в основном по провинции Центральный Калимантан, в нижнем течении также по провинции Южный Калимантан, служа на некоторых участках их естественной административной границей. Впадает в Яванское море в районе города Банджармасин, образуя общую дельту с несколькими меньшими по размеру реками.Длина — около 880 км, площадь бассейна — около 100 000 км². Среднегодовой расход воды в нижнем течении около 5000 м³/с. Имеет существенное транспортное значение, в частности, в плане лесосплава и перевозки каменного угля, добываемого на её берегах.Длина около 880 км, глубина до 8 метров. Ширина в нижнем течении в пределах 650—800 метров, в районе устья до 1 км. Площадь бассейна около 100 тысяч км². Расход воды подвержен значительным сезонным колебаниям — река наиболее многоводна в апреле и ноябре, когда выпадает максимальное количество осадков и значительные прибрежные территории затапливаются паводковыми водами. Периодически наводнения на Барито приобретают характер масштабных стихийных бедствий, приводя к разрушениям прибрежных населённых пунктов и эвакуации местного населения. Весьма мощным было наводнение, произошедшее в январе 2021 года: в результате его несколько человек погибло, ущерб понесли не менее 20 тысяч местных жителей."
     },
       {
        "name": "Баркэу",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%80%D0%BA%D1%8D%D1%83",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Beretty%C3%B3_Szeghalomn%C3%A1l.jpg/250px-Beretty%C3%B3_Szeghalomn%C3%A1l.jpg",
        "length": "134 км",
        "pool": "2025 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Кришул-Репеде",
        "location": "",
        "info": "Баркэ́у (рум. Barcău) или Бе́ретьо (венг. Berettyó) — река, берущая начало в жудеце Сэлаж, Румыния. Имеет длину 134 километра и площадь бассейна 2025 км². Впадает в Кришул-Репеде около Сегхалома.Наиболее длинный приток — Ер."
     },
         {
        "name": "Барнаулка",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%80%D0%BD%D0%B0%D1%83%D0%BB%D0%BA%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Barnaulkariveravgust.jpg/250px-Barnaulkariveravgust.jpg",
        "length": "207 км",
        "pool": "5720 км²",
        "consumption": "10 м³/с",
        "head": "Зеркальное",
        "estuary": "Обь",
        "location": " Россия",
        "info": "Барнау́лка (историческое название Барнаул) — река в Алтайском крае России, левый приток Оби. Дала название городу Барнаул, расположенному в устье реки.Наиболее ранними документами с названием реки являются пять карт, выполненных тобольским чертёжником Семёном Ремезовым на рубеже XVII—XVIII веков. В их основу были положены не сохранившиеся материалы конца XVII века. На четырёх чертежах из пяти река названа Бороноур, в одном случае Боронур. В известных историкам письменных источниках второго десятилетия XVIII века упоминание реки встречается дважды. Со слов тюркоязычного населения Верхнего Приобья её название было записано русскими как Борноул (1716) и Боранаул (1717).Как и многие другие реки Сибири и Алтая, современная Барнаулка именовалась в мужском роде. Официальные документы сохранили эту традицию до XIX века, но в устной речи уже в то время существовал и вариант с женским родом. «Речка Барнаулка, которая течет ис степи з западу, из озёр» упомянута в путевом описании 1735 года, а на карту река попала под таким названием в 1788 году.Важные сведения о названии реки содержатся в материалах академической экспедиции, побывавшей здесь в сентябре 1734 года. В дневнике путешествия Иоганна Георга Гмелина, опубликованном в 1751 году, Барнаулка из-за своих небольших размеров упоминалась как ручей — «Bach Barna aul». Наиболее полные сведения о ранних названиях Барнаулки дают бумаги спутника И. Гмелина — Герарда Фридриха Миллера, в которых река именуется как «Barnaul» Он отметил на своей карте прежнее монгольское название Барнаулки: «по-калмыцки Boro-nor». Слово nor (нор) по-монгольски означает «озеро» и пишется как нуур. Таким образом название реки реконструировалось в Боро-нуур. Тот же Миллер дал и первое научное объяснение: «Оно означает в этих словах не что иное как Серое озеро»."
     },
      {
        "name": "Баро ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%80%D0%BE_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Baro_river_Gambela.jpg/250px-Baro_river_Gambela.jpg",
        "length": "306 км",
        "pool": "41 400 км²",
        "consumption": "241 м³/с",
        "head": " ",
        "estuary": "Собат",
        "location": " Южный Судан,  Эфиопия",
        "info": "Ба́ро (амх. ባሮ ወንዝ, англ. Baro River) — река на юго-западе Эфиопии, по которой проходит часть границы Южного Судана. Река берёт начало из источников в Эфиопском нагорье, течёт в западном направлении 306 км. Баро соединяется с рекой Пибор, образуя реку Собат, которая впадает в Белый Нил. Баро имеет бассейн площадью 41 400 км². Среднегодовой сток реки составляет 241 м³/с.В сезон дождей воды реки Баро составляют до 10 % от всей воды Нила в Асуане, в сухой сезон Баро значительно мелеет.Витторио Боттего, исследовавший этот регион в 1890-х годах, предложил назвать реку в честь адмирала Симоне Артуро Сант-Бон.Граница между Суданом и Эфиопией была определена вблизи Баро в 1899 году британскими инженерами и майорами Е. С. Остином и Чарльзом Гвинном. Они не были знакомы с местными жителями и их языками. Остин и Гвинн решили проводить границу по рекам Акобо, Пибор и Баро, что не совпадало с территориальными интересами местных жителей. Эта граница была принята англо-эфиопским договором 1902 года.Правый берег реки Баро культурно ближе к Судану чем к Эфиопии, поэтому во время гражданской войны в Судане здесь находились суданские повстанцы."
     },
      {
        "name": "Барроу ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%80%D1%80%D0%BE%D1%83_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Leighlinbridge3836.jpg/250px-Leighlinbridge3836.jpg",
        "length": "192 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Кельтское море",
        "location": " Ирландия",
        "info": "Ба́рроу (англ. Barrow, ирл. Abhainn na Bearú, An Bhearú , др.‑ирл. Berba) — река в Ирландии. Общая длина — 191 км (2-е место в стране).Река берёт своё начало в невысоких горах Слив Блум в графстве Лиишь и течёт в южном направлении через Уотерфорд, Килкенни и Карлоу до Кельтского моря. Кроме того, Барроу соединяется Гранд-каналом с городом Эфи в графстве Килдэр.Древнее название реки — Берба — связано со словом «кипеть» (др.‑ирл. berbaid). Барроу вместе с реками Нор и Шур носят название «Три сестры»."
     },
              {
        "name": "Бартанг",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%80%D1%82%D0%B0%D0%BD%D0%B3",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/%D0%A0%D0%B5%D0%BA%D0%B0%D0%B1%D0%B0%D1%80%D1%82%D0%B0%D0%BD%D0%B3.jpg/250px-%D0%A0%D0%B5%D0%BA%D0%B0%D0%B1%D0%B0%D1%80%D1%82%D0%B0%D0%BD%D0%B3.jpg",
        "length": "528 км",
        "pool": "24 700 км²",
        "consumption": "128 м³/с (в устье)",
        "head": "Чакмактын",
        "estuary": "Пяндж",
        "location": "",
        "info": "Барта́нг (в верхнем течении Оксу/Аксу/Ак-су, в среднем Мургаб) — правый приток реки Пяндж, протекающий по афганской провинции Бадахшан и таджикской Горно-Бадахшанской автономной области. Длина реки — 528 км. Площадь бассейна 24 700 км². Питание реки в основном ледниковое и снеговое. Максимальный сток наблюдается в августе. Среднегодовой расход воды в устье — 128 м³/сек.Берёт начало под именем Аксу в юго-восточном Памире. Река вытекает из горного озера Чакмактын, расположенного на крайнем северо-востоке Афганистана в провинции Бадахшан; протекает по ней около 30 километров в северо-восточном направлении, затем в восточном направлении по государственной границе Афганистана и Таджикистана, огибает восточную оконечность Ваханского хребта, затем поворачивает на северо-запад, принимает левый приток Сулистык, затем поворачивает на запад, принимает правый приток Акбайтал и имя Мургаб. У посёлка Мургаб пересекает Памирский тракт. Огибает с юга Пшартский хребет и Музкол, впадает в завальное Сарезское озеро, которое возникло в результате катастрофического перекрытия русла Мургаба, произошедшего 18 февраля (3 марта) 1911 года. Фильтруется через тело Усойского завала и сворачивает на северо-запад, принимает правый приток Гудара и имя Бартанг и сворачивает на юго-запад, огибает с юга Язгулемский хребет и впадает в Пяндж к востоку от села Рушан на границе с Афганистаном."
     },
        {
        "name": "Бартува",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%80%D1%82%D1%83%D0%B2%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Bartuva_in_Latvia.jpg/250px-Bartuva_in_Latvia.jpg",
        "length": "103 км",
        "pool": "2016 км²",
        "consumption": "11 м³/с",
        "head": " ",
        "estuary": "Лиепаяс",
        "location": "",
        "info": "Ба́ртува или Ба́рта (лит. Bartuva, латыш. Bārta) — река в Литве и Латвии.Длина — 103 км (56 км в Литве, 47 км в Латвии), площадь бассейна — 2016 км² (980 км² и 1036 км² в Литве и Латвии соответственно). Истоки реки расположены в Плунгеском районе Литвы в 3 км к северу от озера Плателяй, далее протекает преимущественно в северо-западном направлении, пересекает границу с Латвией, где впадает в озеро Лиепаяс.Притоки: Вартая, Луоба, Апше и др."
     },
             {
        "name": "Барыч ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%80%D1%8B%D1%87_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Dolina_rzeki_Barycz.JPG/250px-Dolina_rzeki_Barycz.JPG",
        "length": "139 км",
        "pool": "5526 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Одра",
        "location": " Польша",
        "info": "Барыч (польск. Barycz) — река в Великопольском и Нижнесилезском воеводствах, в западной Польше. Приток реки Одра.Река протекает около северных границ исторических районов Нижняя Силезия и Великая Польша.Длина реки составляет 139 км, площадь водосбора — 5526 км². Реку окружает территория ландшафтного парка Барыч (польск. Park Krajobrazowy Dolina Baryczy), что является важным резервом водно-болотных угодий. Орла является одним из притоков."
     },
                               {
        "name": "Батыр ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%82%D1%8B%D1%80_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "221 км",
        "pool": "3440 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Ахтаранда",
        "location": " Россия",
        "info": "Батыр — река в России, протекает по территории Мирнинского района Якутии, левый приток реки Ахтаранды. Длина реки — 221 км, площадь водосборного бассейна — 3440 км².Объекты перечислены по порядку от устья к истоку."
     },
     {
        "name": "Бауле ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%83%D0%BB%D0%B5_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "500 км",
        "pool": "65 000 км²",
        "consumption": "64 м³/с (устье у слияния с Бакой)",
        "head": " ",
        "estuary": "Бакой",
        "location": " Мали",
        "info": "Бауле (фр. Le Baoulé) — река в Мали, приток Бакоя.Бауле начинается из источника к западу от Бамако, течёт на север, затем делает петлю, поворачивает на восток-юго-восток и впадает в Бакой около коммуны Тукото в области Каес и является частью бассейна Сенегала. Длина реки составляет ок. 500 км.На языках манден Балуе означает «Красная река», Бакой — «Белая река», а Бафинг — «Чёрная река».В местности, где река делает петлю, меняя направление с северного на восточное, расположен единственный Национальный парк Мали Букль-дю-Бауле («петля Бауле»).Гидрографические характеристики реки наблюдались в течение 39 лет с 1952 по 1990 годы на станции Бугуда у впадения Бауле в Бакой.Среднегодовой сток, наблюдавшийся в течение этого периода в устье реки, составлял 64 м³/с для водосборного бассейна ок. 65 000 км², что составляет полный водосбор Бауле.Бакой — умеренно полноводный, но крайне нерегулярный поток с длительными периодами полного высыхания с декабря до мая. Среднемесячный расход, наблюдаемый в апреле-мае (минимальный низкий расход), достигает 0,1 м³/с, что в 3000 раз меньше, чем средний расход в сентябре, что свидетельствует о значительной сезонной неравномерности."
     },
      {
        "name": "Бафинг ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%84%D0%B8%D0%BD%D0%B3_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Pirogue_Bozo_sur_le_Bafing.jpeg/250px-Pirogue_Bozo_sur_le_Bafing.jpeg",
        "length": "760 км",
        "pool": "33 000 км²",
        "consumption": "332 м³/с (Дибиа (Мали))",
        "head": " ",
        "estuary": "Сенегал",
        "location": " Гвинея,  Мали",
        "info": "Бафинг (Чёрная река) (фр. Le Bafing (Rivière Noire)) — река в Мали, после слияния с Бакой образует реку Сенегал. Длина реки составляет 760 км. На ней сооружена крупнейшая в Мали ГЭС Манантали.Бафинг считается верхней частью Сенегала до его слияния с Бакой, который впадает в него справа в Бафулабе в западной части Мали. Бафинг также называют «Чёрной рекой», в отличие от Бакой, называемой «Белая река».Истоки Бафинга находятся в Гвинее на вершинах горного региона Фута-Джаллон, между Маму (Мали) и Далаба (Гвинея), на высоте 800 м над уровнем моря и проходит 760 км с юга на север до слияния с Бакоем и образованием реки Сенегал. Верховье реки образует границу между Мали и Гвинеей.Гидрография реки наблюдалось в течение 40 лет с 1951 по 1990 годы на станции в местности Дибиа (Мали), расположенной примерно в 100 км от слияния с Бакой.Среднегодовой сток, наблюдавшися в течение этого периода, составлял 332 м³/с для водосборного бассейна ок. 30 235 км², что составляет более 90 % общей площади водосбора Бафинга.Бафинг — полноводный, но очень нерегулярный поток. Среднемесячный расход, наблюдаемый в мае (минимальный низкий расход), достигает 16,6 м³/с, что в 76 раз меньше, чем средний расход в сентябре, что свидетельствует о значительной сезонной неравномерности. За период 40-летнего наблюдения минимальный месячный расход составлял 0 м³/с (полное пересыхание), тогда как максимальный месячный расход составлял 2,529 м³/с."
     },
     {
        "name": "Баффало ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%84%D1%84%D0%B0%D0%BB%D0%BE_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/BuffaloRiver.jpg/250px-BuffaloRiver.jpg",
        "length": "240 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Уайт-Ривер",
        "location": " США",
        "info": "Баффало (устар. Буффало; англ. Buffalo National River) — река в Соединённых Штатах Америки. Берёт начало в горах северо-западного Арканзаса. Река течёт главным образом в восточном направлении. Является притоком реки Уайт-Ривер (бассейн Миссисипи). Длина реки — 240 км[источник не указан 1065 дней]."
     },
     {
        "name": "Баханай ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%85%D0%B0%D0%BD%D0%B0%D0%B9_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "250 км",
        "pool": "2930 км²",
        "consumption": "undefined",
        "head": "Северный Ус-Билилях",
        "estuary": "Лена",
        "location": " Россия",
        "info": "Баханай (Бааханы, Бахынай; якут. Бааһынай) — река в Восточной Сибири, приток реки Лена.Длина реки составляет 250 км, площадь водосборного бассейна — 2930 км². Характерны летние дождевые паводки. Протекает через село Баханай. Впадает в реку Лена слева на расстоянии 835 км от её устья, в 1 км к югу от устья реки Тарын-Юрэх.Притоки: Хаайыылаах-Аппата, Бере-Юрягэ, Аччыгый-Тумуллаах, Улахан-Тумуллаах, Кюёнэхтээх, Улэгир, Элгэр-Юрях, Бэстях-Салата, Сибекки-Юрягэ, Орто-Юрях, Онгхоккой.По данным государственного водного реестра России относится к Ленскому бассейновому округу. Код водного объекта — 18030900112117500004636."
     },
     {
        "name": "Бахапча",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%85%D0%B0%D0%BF%D1%87%D0%B0",
        "image": "undefined",
        "length": "291 км",
        "pool": "13 800 км²",
        "consumption": "123,8 м³/с (5,4 км от устья)",
        "head": "Солнечное",
        "estuary": "Колыма",
        "location": " Россия",
        "info": "Бахапча́ (Бохапча)— река в Магаданской области России, правый приток Колымы.Длина — 291 км, площадь водосборного бассейна — 13,8 тыс. км². Берёт начало из озера Солнечного на высоте 753 м над уровнем моря. Протекает в границах Тенькинского и Ягоднинского районов по гористой местности, пересекая Верхнеколымское нагорье, в низовьях порожиста. В среднем течении русло реки разветвлённое, множество островов разделено рукавами и пойменными протоками. Ниже по течению — русло слабоизвилистое, однорукавное, шириной до 140 м.Впадает в Колыму в 1839 км от её устья, ниже посёлка Синегорье.Бахапча скована льдом со второй половины октября по вторую половину мая. В среднем и особенно верхнем течении намерзают крупные наледи. В половодье проходит около 52 % годового стока, летом-осенью — 46 %. Сезонный размах изменения уровней воды составляют 4,1 м.Питание реки смешанное — снеговое и дождевое.Вода реки по химическому составу относится к гидрокарбонатному классу с высоким содержанием сульфатов и кальциевой группе. Минерализация воды меньше 40 мг/л. Мутность — 65 г/м³. Качество воды высокое.Среднегодовой расход воды в 5,4 км от устья составляет 123,84 м³/с, наибольший приходится на июнь, наименьший — на март. Среднемесячные расходы воды (данные наблюдений с 1934 по 1998 год):"
     },
     {
        "name": "Бахлуй",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%85%D0%BB%D1%83%D0%B9",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Bahlui_River1.jpg/250px-Bahlui_River1.jpg",
        "length": "119 км",
        "pool": "2007 км²",
        "consumption": "2,8 м³/с",
        "head": " ",
        "estuary": "Жижия",
        "location": " Румыния",
        "info": "Бахлу́й[1][2] (рум. Bahlui) — река в Румынии, в регионе Западная Молдавия, правый приток реки Жижия, относится к бассейну Дуная. Истоки реки Бахлуй находятся в низких горах на территории коммуны Тудора[ro] в жудеце Ботошани, на высоте 500 метров над уровнем моря, к северу от горы Дялул-Маре[ro], к востоку от Сучавского плато[uk]. Река течёт в юго-восточном направлении через жудец Яссы, течёт через города Хырлэу и Яссы. Делит город Яссы на две части. Впадает в реку Жижия на территории коммуны Томешти[en] в жудеце Харгита, рядом с селом Коперешти[uk]. В селах Пырковач[uk] и Танса[uk] в жудеце Яссы на реке построены плотины. Длина 119 километров. Площадь бассейна — 2007 квадратных километров. Среднегодовой расход воды 2,8 кубического метра в секунду. Главные её притоки — реки Гургуята[en], Николина[en], Богонос и Бахлуец. Из мостов наиболее известен каменный мост в Яссах[ro].Название происходит от нем. Bach — ручей.Социальными мотивами пронизано стихотворение «Ода Бахлую» (Odă cătră Bahlui) Василе Александри (1821–1890). Реку описывает Алеку Руссо в произведении «Яссы и его жители в 1840 году» (Iaşii şi locuitorii lui în 1840)."
     },
      {
        "name": "Бахта",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%85%D1%82%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Rekabahta.JPG/250px-Rekabahta.JPG",
        "length": "498 км",
        "pool": "35 500 км²",
        "consumption": "≈ 490 м³/с",
        "head": " ",
        "estuary": "Енисей",
        "location": " Россия",
        "info": "Бахта́ — река в Красноярском крае России, правый приток Енисея. В устье располагается посёлок Бахта (в XIX веке имел название Бахтинский).Длина — 498 км, площадь бассейна — 35,5 тыс. км². Протекает по Среднесибирскому плоскогорью, впадает в Енисей ниже по течению от места впадения в него реки Подкаменной Тунгуски. Течёт в узкой долине среди тайги, имеет быстрое течение и порожистое русло. В низовьях судоходна.Питание снеговое и дождевое. Замерзает в середине октября, вскрывается в середине мая. Среднегодовой расход воды — около 490 м³/с, что соответствует объёму стока 15,465 км³/год.В геологическом плане, бассейн р. Бахта, в основном приурочен к структуре Сибирской платформы — окраине Тунгусской синеклизы. И только небольшая его часть — собственно течение Бахты на протяжении 25 км до её устья находится в периферийной зоне Западно-Сибирской молодой плиты. Таким образом, особенностью рассматриваемой территории является принадлежность к двум крупным морфоструктурам: Сибирской платформе (Тунгусской синеклизе) и Западно-Сибирской плите.Формирование Тунгусской синеклизы завершилось в триасовом периоде, с образованием трапповых формаций в конце палеозоя. Синеклиза выполнена туфолавовыми образованиями нижнего триаса, мощность которых в данном месте варьируется от 0,5 км до 2 км. В среднем мезозое и раннем кайнозое, охватывающих юрский, меловой и палеогеновый периоды, происходит оживлённое тектоническое движение, которое после затухло. В это время вся платформа была подвержена подъёму, что повлекло за собой компенсирующее погружение смежных областей и вдоль Енисея, по системе региональных разломов наблюдается опускание земной коры — образуется молодая Западно-Сибирская платформа. На территории, по которой протекает Бахта в своём нижнем течении, откладываются лагунные, дельтовые прибрежно-континентальные и аллювиальные отложения. В юре — раннем меле данная территория продолжает опускаться. А в позднем меле — палеогене происходит конечное формирование современного образа Сибири и рассматриваемой поверхности."
     },
     {
        "name": "Бахтемир ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%85%D1%82%D0%B5%D0%BC%D0%B8%D1%80_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "125 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "Волга",
        "estuary": "Оля",
        "location": " Россия",
        "info": "Бахтемир (Главный банк) — рукав и основное продолжение Волги в дельте Волги в Астраханской области России, самый западный из рукавов дельты Волги.Длина рукава — 125 км. Рукав ответвляется от Волги в 18 км ниже Астрахани. Русловая сеть системы Бахтемира редка, что связано с сосредоточением стока по основному направлению, продолжением которого на устьевом взморье служит Волго-Каспийский канал. Бахтемир является единственным рукавом, использующимся в судоходстве."
     },
            {
        "name": "Башкаус",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D1%88%D0%BA%D0%B0%D1%83%D1%81",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%B0%D1%88%D0%BA%D0%B0%D1%83%D1%81.jpg/250px-%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%B0%D1%88%D0%BA%D0%B0%D1%83%D1%81.jpg",
        "length": "219 км",
        "pool": "7700 км²",
        "consumption": "27 м³/с",
        "head": " ",
        "estuary": "Чулышман",
        "location": " Россия",
        "info": "Башкаус — река в Республике Алтай, левый приток реки Чулышман. Длина реки 219 км, площадь бассейна 7770 км².В честь реки названа система долин на Марсе.Башкаус начинается в восточном Алтае на юге Улаганского района Республики Алтай на границе с Кош-Агачским районом. Река вытекает из небольшого ледникового озера на восточной оконечности Курайского хребта у его стыка с хребтом Чихачёва, на высоте примерно 2525 м над уровнем моря. От истока течёт на запад, затем постепенно отклоняется на северо-запад. В середине течения в районе села Усть-Улаган начинает отклоняться к северу, и в низовьях уже течёт почти точно на север. После слияния с левым притоком Чебдаром незадолго до устья поворачивает к северо-востоку. Большая часть русла Башкауса пролегает в узкой глубокой долине между Курайским хребтом и Улаганским плато.В 1989 году в нижнем течении Башкауса произошел мощный обвал горы правого берега, который запрудил реку и образовал озеро длиной 800 метров с торчащими из него мёртвыми деревьями.Башкаус впадает в Чулышман на высоте 452 м над уровнем моря примерно в 12 км выше по его течению от села Балыкчи, за 20 км до впадения Чулышмана в Телецкое озеро. В устье имеет 35-50 м в ширину и глубину до 1 м, скорость течения 2,3 м/с."
     },
                      {
        "name": "Бебжа",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%B1%D0%B6%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Brzostowo1.jpg/250px-Brzostowo1.jpg",
        "length": "155 км",
        "pool": "7057 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Нарев",
        "location": " Польша",
        "info": "Бебжа (польск. Biebrza, устар. Бебра, устар. Бобръ) — река на северо-востоке современной Польши, приток Нарева (около Вислы).Бебжа берёт начало на юге от села Новы-Двур (Сокульский повят Подляского воеводства) и впадает в реку Нарва, расположенную в трёх километрах от села Визна. Длина реки составляет 155 км, площадь водосбора — 7057 км².В долине реки находятся крупнейшие по площади болота в Польше — так называемые «Бебжанские болота» (польск. Bagna Biebrzańskie). Это место славится большим количеством редких растительных видов и животных, особенно птиц. Большая часть этой территории расположена в Бебжанском национальном парке.Речная долина очень важна, как место обитания птиц, тем более, что такие места исчезают с ландшафта Европы. Для ржанковых птиц, которым необходимы огромные территории водно-болотных угодий, Бебжа является одним из важнейших хранилищ в Центральной Европе.Сегодня реку больше знают благодаря яркой живой природе её затопленных территорий — торфяников и болот, где проживают сотни редких и исчезающих видов птиц.В бассейне реки Бебжа живёт много людей, представляющих разные культуры, языки и религии. Большинство населения региона говорит на польском, но люди, которые живут в верхней части бассейна реки (муниципалитеты Липск, Домброва-Белостоцкая и Штабин), говорят на местном диалекте (они называют его «простой язык»). Люди относятся к православной или римско-католической церквям."
     },
             {
        "name": "Бегидян",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%B3%D0%B8%D0%B4%D1%8F%D0%BD",
        "image": "undefined",
        "length": "195 км",
        "pool": "3910 км²",
        "consumption": "undefined",
        "head": "слияние рек: Тарыннах и Буор-Салыр-Тарына",
        "estuary": "Лена",
        "location": " Россия",
        "info": "Бегиджян (также Бегидян, устар. Бэгидьээн) — река в Жиганском районе Якутии, правый приток реки Лена. Длина реки — 195 км, площадь водосборного бассейна — 3910 км². Образуется слиянием рек Тарыннах (также Тарыннаах, Унга-Салаа, Сингнии) справа и Буор-Салыр-Тарына (также Буорсалыыр-Тарына Арангастаах, Арыычын) слева. Впадает, разветвляясь на несколько рукавов, в Лену напротив посёлка Жиганск, на расстоянии 740 км от её устья.В реке обитают типичные представители горных и долинных рек бассейна Лены: хариус, ленок, нельма, сиг, щука, язь, окунь. В летне-осеннюю межень наблюдается изоляция отдельных групп популяций рыбы. В горном сегменте течения реки обитает хариус, в предгорной части, где часты участки с быстрым течением, перемежающиеся с короткими, относительно медленными плесами характерен ленок. Ниже по реке появляются нельма и сиг, а также окунь. Ближе к устью, где течение падает настолько сильно, что галечниковые отмели сменяются песчаными обитают щука и, местами, язь.По данным государственного водного реестра России относится к Ленскому бассейновому округу."
     },
            {
        "name": "Бедня ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%B4%D0%BD%D1%8F_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Bednja_River_in_Ludbreg.JPG/250px-Bednja_River_in_Ludbreg.JPG",
        "length": "133 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Драва",
        "location": " Хорватия",
        "info": "Бе́дня (хорв. Bednja) — река в Хорватии, правый приток Дравы. Принадлежит бассейну Дуная и Чёрного моря.Длина реки — 133 км, площадь бассейна — 966 км².Бедня берёт начало в горах Хорватского Загорья недалеко от Тракошчана на высоте около 300 м над уровнем моря. В верховьях течение быстрое, в низовьях спокойное. Впадает в Драву ниже Лудбрега возле посёлка Мали-Буковец.[источник не указан 358 дней]На реке расположены посёлок Бедня и города Нови-Мароф, Вараждинске-Топлице и Лудбрег.В районе реки преобладает континентальный климат. Среднегодовая температура в регионе составляет 11 °C. Самый тёплый месяц — июль, когда средняя температура составляет 22 °C, а самый холодный — декабрь с −4 °C. Среднегодовое количество осадков составляет 1195 мм. Самый дождливый месяц — сентябрь, в среднем выпадает 162 мм осадков, а самый сухой — март, с 64 мм осадков."
     },
           {
        "name": "Беенчиме",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%B5%D0%BD%D1%87%D0%B8%D0%BC%D0%B5",
        "image": "undefined",
        "length": "311 км",
        "pool": "4080 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Оленёк",
        "location": " Россия",
        "info": "Беенчиме или Бяйенчимя (якут. Бэйэнчимэ) — река в Якутии, левый приток реки Оленёк. Длина реки — 311 км, площадь бассейна — 4080 км². Течёт по северной окраине Среднесибирского плоскогорья. Питание снеговое и дождевое. Половодье в июне, летом отдельные паводки. Основные притоки: Беенчикян, Куччугуй-Юрях, Беенчиме-Салата, Улахан-Юрях (левые)."
     },
             {
        "name": "Бездна (приток Суры)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%B7%D0%B4%D0%BD%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A1%D1%83%D1%80%D1%8B)",
        "image": "undefined",
        "length": "106 км",
        "pool": "1320 км²",
        "consumption": "0,09 м³/с (устье)",
        "head": " ",
        "estuary": "Сура",
        "location": " Россия",
        "info": "Бездна (Пасна, чуваш. Пасна; устар. Белая) — река в Чувашии и Татарстане, правый приток Суры (бассейн Волги).Длина реки 106 км, площадь водосборного бассейна 1320 км². Исток у деревни Чувашская Бездна Дрожжановского района Татарстана. Протекает также по Шемуршинскому и Алатырскому районам Чувашии, впадает в Суру в городе Алатырь.Значительная часть течения проходит по лесам, в том числе по национальному парку «Чаваш Вармане» (по открытой местности проходят небольшие участки в верхнем и нижнем течении). В бассейне реки обитают ценные и редкие видов растений и животных, в 1981 году река получила статус комплексного памятника природы Чувашии.Русло извилистое, на всём протяжении подвержено меандрированию.Основные населённые пункты на реке расположены в верховьях: Бичурга-Баишево, Асаново (оба в Чувашии), Чувашская Бездна, Татарская Бездна, Мочалей (все — Татарстан), в устье находится посёлок Зелёный — часть города Алатырь. В бассейне также расположены Старые- и Новые Айбеси, Старые- и Новые Чукалы, Первомайский, Сойгино и другие.Река с преимущественно снеговым питанием, имеет ярко выраженное весеннее половодье. Замерзает в третьей декаде ноября, вскрывается ото льда в первой декаде апреля. Средний расход воды в межень у устья — 0,09 м³/с."
     },
                                            {
        "name": "Бейкер ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%B9%D0%BA%D0%B5%D1%80_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/R%C3%ADo_Baker_03.jpg/250px-R%C3%ADo_Baker_03.jpg",
        "length": "170 км",
        "pool": "26 726 км²",
        "consumption": "870 м³/с",
        "head": "Бертран",
        "estuary": "Залив Бейкер",
        "location": " Чили",
        "info": "Бейкер или Бакер (исп. Río Baker) — река в области Айсен-дель-Хенераль-Карлос-Ибаньес-дель-Кампо Чили. Длина — 170 км. Площадь водосборного бассейна — 26 726 км².Река берёт начало в озере Бертран на высоте 200 метров. Течёт в общем юго-западном направлении, огибает с восточной стороны Северное Патагонское ледниковое плато и впадает в залив Бейкер Тихого океана близ города Калета-Тортел. Река образует дельту, разделяясь на два основных рукава, из которых судоходен только северный. Длина реки составляет 170 км, площадь водосборного бассейна — 26726 км², по величине водосборного бассейна Бейкер занимает второе место в Чили, уступая лишь Лоа. Бейкер также является самой полноводной рекой Чили, её средний расход воды составляет 870 м³/сек.Река названа в честь английского адмирала Томаса Бейкера (1771—1845).Разработана программа строительства каскада гидроэлектростанций на реках Бейкер и Паскуа, но экологические организации выступают против этого строительства.Согласно самого амбициозного проекта в истории Чили компания Hidroaysen (дочерняя компания международного энергетического конгломерата Endesa / Enel) планируется построить на реках Бейкер и Паскуа 4 мощные гидроэлектростанции общей установленной мощностью 2430 МВт, что эквивалентно 25 % от общей мощности всех гидроэлектростанций Чили. Сторонники проекта утверждают, что без строительства этих электростанций невозможно обеспечить дальнейший рост экономики Чили, которая по-прежнему сильно зависит от экспорта меди (56 % от общего объёма экспорта в 2007 году), а выплавка меди является очень энергоёмким производством."
     },
     {
        "name": "Бейсуг ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%B9%D1%81%D1%83%D0%B3_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Beysug_%28from_road%29.JPG/250px-Beysug_%28from_road%29.JPG",
        "length": "243 км",
        "pool": "5190 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Бейсугский лиман",
        "location": " Россия",
        "info": "Бейсу́г — река в чернозёмной степной зоне Краснодарского края, впадает в Азовское море через лиманы Лебяжий (пресный) и Бейсугский (солёный). Длина — 243 км, площадь водосборного бассейна — 5190 км². Протекает по Кубано-Приазовской низменности. Русло сильно заросшее, на Бейсуге и его притоках устроены системы запруд. Между лиманами Лебяжий и Бейсугский находится Бейсугское водохранилище. При ветрах с запада в устьевой части реки наблюдаются нагоны морской воды из Бейсугского лимана. Ледохода на Бейсуге обычно не бывает, а лёд постепенно тает в прудах."
     },
     {
        "name": "Бейсужёк Левый",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%B9%D1%81%D1%83%D0%B6%D1%91%D0%BA_%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9",
        "image": "undefined",
        "length": "161 км",
        "pool": "1890 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Бейсуг",
        "location": " Россия",
        "info": "Бейсужёк Ле́вый (он же Бейсужёк Ю́жный) — река в степной чернозёмной части Краснодарского края, левый приток реки Бейсуг.Длина — 161 км, площадь водосборного бассейна — 1890 км². Практически на всём протяжении течение Бейсужка зарегулировано — фактически речка и её притоки представляют собой цепочки прудов, которые используются для орошения и разведения рыбы. Долина Левого Бейсужка заселена от истока (у хутора Тернового) до места впадения в Бейсуг (у станицы Брюховецкой), расстояние между населёнными пунктами не превышает двух километров. На реке расположен город Кореновск.От истока к устью:"
     },
                {
        "name": "Белая (приток Ангары)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%BB%D0%B0%D1%8F_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%90%D0%BD%D0%B3%D0%B0%D1%80%D1%8B)",
        "image": "undefined",
        "length": "359 км",
        "pool": "18 000 км²",
        "consumption": "180,58 м³/с (22 км от устья)",
        "head": "слияние рек: Бурун-Саган-Бильчир и Саган-Бильчир",
        "estuary": "Братское водохранилище",
        "location": " Россия",
        "info": "Бе́лая (в верховье Больша́я Бе́лая) — река в Бурятии и Иркутской области России. Впадает в Братское водохранилище, ране была левым притоком Ангары. Длина реки — 359 км, площадь водосборного бассейна — 18 000 км². Средний расход воды — 180,58 м³/с.Вдоль реки в низовье, в особенности по левобережью, расстилаются богатые пастбища. В бассейне реки находятся месторождения графита и нефрита.Возможно, название реки связано с выходами на её берегах горных пород белого цвета — известняков и белой керамической глины.Образуется при слиянии рек Бурун-Саган-Бильчир и Саган-Бильчир на высоте 1729,4 м в горах Бельские Гольцы. Протекает по слабозаселённой горной территории. Берега её живописны, нередко обрываются отвесными скалами к руслу. В верхнем и среднем течении реки имеются пороги и водопады. В бассейне Белой протекает 1573 реки общей протяжённостью 7417 км. Питание Белой смешанное: главный источник питания (больше 60 %) — дожди. Выпадающие в бассейне реки осадки вызывают резкие подъёмы уровня воды — до 8 м. Средний годовой расход воды — 178 м³/с, наименьший расход приходится на февраль — март и составляют 16 м³/с. Годовой сток Белой — 5,6 км³, сток за период с мая по октябрь составляет более 80 % от годового."
     },
          {
        "name": "Белая (приток Зеи)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%BB%D0%B0%D1%8F_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%97%D0%B5%D0%B8)",
        "image": "undefined",
        "length": "170 км",
        "pool": "2800 км²",
        "consumption": "3 м³/с",
        "head": " ",
        "estuary": "Зея",
        "location": " Россия",
        "info": "Белая — река на юге Амурской области, левый приток Зеи. Длина реки — 170 километров, площадь бассейна — 2800 км².Проистекает река из холмистого района восточной части Зейско-Буреинской равнины, Октябрьский район. В верхнем течении очень мелкая, узкая, пересыхающая, местами исчезает вовсе. На всём своём протяжении характеризуется очень сильной извилистостью и мелководностью. Берега заболочены. Притоки мелки и незначительны.Река протекает в сравнительно плотнонаселённом районе Амурской области, в её долине расположено множество сёл и деревень Октябрьского, Ромненского, Белогорского и Ивановского районов. Крупнейшие сёла — Среднебелое, Поздеевка (в 4 км от берега)."
     },
        {
        "name": "Белая (приток Камы)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%BB%D0%B0%D1%8F_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9A%D0%B0%D0%BC%D1%8B)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/%D0%9C%D0%BE%D1%81%D1%82_%D1%87%D0%B5%D1%80%D0%B5%D0%B7_%D1%80%D0%B5%D0%BA%D1%83_%D0%91%D0%B5%D0%BB%D1%83%D1%8E_%28%D0%98%D1%88%D0%B8%D0%BC%D0%B1%D0%B0%D0%B9%29.jpg/250px-%D0%9C%D0%BE%D1%81%D1%82_%D1%87%D0%B5%D1%80%D0%B5%D0%B7_%D1%80%D0%B5%D0%BA%D1%83_%D0%91%D0%B5%D0%BB%D1%83%D1%8E_%28%D0%98%D1%88%D0%B8%D0%BC%D0%B1%D0%B0%D0%B9%29.jpg",
        "length": "1430 км",
        "pool": "142 000 км²",
        "consumption": "950 м³/с (в устье)",
        "head": " ",
        "estuary": "Нижнекамское водохранилище",
        "location": " Россия",
        "info": "Бе́лая (башк. Ағиҙел  слушать,тат. Агыйдел) — река на Южном Урале и в Предуралье; левый и самый крупный приток Камы. Протекает по территории Башкортостана и по его границе с Татарстаном. Длина реки — 1430 км, площадь водосборного бассейна — 142 000 км², самая длинная река в Башкортостане.Исток находится в болотах к востоку от горы Иремель, второй по величине вершине Южного Урала, расположенной на северо-востоке Белорецкого района Башкортостана. Начало берёт у подножия хребта Аваляк на высоте 744 метров, близ деревни Новохусаиново Учалинского района. В верхнем течении берега Белой заболочены. Ниже села Тирлянский долина резко сужается, на отдельных участках склоны её круты, обрывисты, покрыты лесом. Ниже впадения правого притока реки Нугуш, по мере выхода на равнину, долина постепенно расширяется; после впадения реки Уфы Белая представляет собой типично равнинную реку.Протекая по обширной пойме, изобилующей старицами, река образует много излучин и разбивается на рукава. Правый берег обычно более возвышен, чем левый.Питание реки, главным образом, снеговое. Средний годовой расход воды у Бирска 858 м³/с, в устье — 950 м³/с. Река замерзает, как правило, во второй половине ноября, вскрывается — в середине апреля."
     },
      {
        "name": "Белая (приток Кеми, притока Енисея)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%BB%D0%B0%D1%8F_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9A%D0%B5%D0%BC%D0%B8,_%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA%D0%B0_%D0%95%D0%BD%D0%B8%D1%81%D0%B5%D1%8F)",
        "image": "undefined",
        "length": "121 км",
        "pool": "1530 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Кемь",
        "location": " Россия",
        "info": "Белая — река в Красноярском крае России. Устье реки находится в 115 км по левому берегу реки Кемь. Длина реки 121 км, площадь водосбора 1530 км². Протекает в границах Пировского района в общем направлении на север.По данным государственного водного реестра России относится к Енисейскому бассейновому округу, речной бассейн реки — Енисей, речной подбассейн реки — Бассейн притоков Енисея между участками впадения Ангары и Подкаменной Тунгуски. Водохозяйственный участок реки — Енисей от впадения реки Ангара до водомерного поста у села Ярцево."
     },
     {
        "name": "Белая (приток Кубани)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%BB%D0%B0%D1%8F_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9A%D1%83%D0%B1%D0%B0%D0%BD%D0%B8)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%B5%D0%BB%D0%B0%D1%8F_2.jpg/250px-%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%B5%D0%BB%D0%B0%D1%8F_2.jpg",
        "length": "273 км",
        "pool": "5990 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Краснодарское водохранилище",
        "location": " Россия",
        "info": "Бе́лая (адыг. Шъхьагуащэ) — река на Северном Кавказе, левый приток Кубани (впадает в Краснодарское водохранилище).Длина — 273 км, площадь водосборного бассейна — 5990 км². Берёт начало на Главном, или Водораздельном хребте Большого Кавказа, у вершин Фишт и Оштен. В верхнем течении несёт черты типичной горной реки с рядом каньонных участков, в нижнем течении приобретает равнинный характер. Питание смешанное — ледниковое, снеговое, дождевое.Главные притоки: Пшеха, Курджипс (левые); Киша, Дах (правые).Пороги: «Топорики», «Топоры», «Киши» (Киши-1 и Киши-2, между которыми впадает речка Киша), «Гранитный каньон» («Горка», «Пригорок»), «Хаджохская теснина».Вплоть до 1856 года на картах фигурирует под своим историческим названием Шхагуашэ (адыг. Шъхьагуашьэ). В русских источниках того времени часто именовалась «Сагваса». В кабардинском нартском эпосе — Щхьэгуащэ, Щхьэгуащапщэ.В переводе с современного адыгского языка гидроним распадается на шъхьэ/щхьэ — «голова» (верх, верховье) и гуашъэ/гуащэ «богиня, княгиня, хозяйка». Нетопонимичность подобного сочетания заставляет искать другие этимологии.На Белой расположены города Майкоп, Белореченск, населённые пункты: посёлок Гузерипль, село Хамышки, посёлок Никель, станица Даховская, посёлок Каменномостский, станица Абадзехская, посёлок Тульский, посёлок Гавердовский, станица Ханская, село Белое."
     },
            {
        "name": "Белая (приток Пенжины)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%BB%D0%B0%D1%8F_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9F%D0%B5%D0%BD%D0%B6%D0%B8%D0%BD%D1%8B)",
        "image": "undefined",
        "length": "304 км",
        "pool": "13 800 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Пенжина",
        "location": " Россия",
        "info": "Бе́лая (Пальматкина) — река на полуострове Камчатка в России, левый приток реки Пенжина.Длина реки — около 304 км. Площадь водосборного бассейна — 13 800 км². Берёт начало с Корякского нагорья, течёт по Парапольскому долу вдоль Пенжинского хребта, который пересекает близ устья."
     },
                    {
        "name": "Белая Вольта",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%BB%D0%B0%D1%8F_%D0%92%D0%BE%D0%BB%D1%8C%D1%82%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Nakambe_burkina.jpg/250px-Nakambe_burkina.jpg",
        "length": "640 км",
        "pool": "106 000 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Вольта",
        "location": " Буркина-Фасо,  Гана",
        "info": "Белая Вольта (фр. Volta Blanche), известная также как Наканбе, — верховье реки Вольта в Западной Африке.Длина около 640 км, её бассейн охватывает площадь в 105—106 тыс. км². Уклон реки составляет 40 см на км. Исток находится в Буркина-Фасо, впадает в озеро Вольта в Гане. Основные притоки: Чёрная Вольта и Красная Вольта. В междуречье рек Чёрная Вольта и Белая Вольта расположена столица Буркина-Фасо — Уагадугу.Почти 85 % почвенного покрова в бассейне реки занимают лювисоли и литосоли. Растительность представлена саваннами. В течение года выпадает от 800 мм до 1140 мм осадков. Колебания глубины залегания грунтовых вод в зависимости от режима осадков может достигать 15 м. Питание реки преимущественно дождевое, эта составляющая достигает 97 %. Воды реки используются для снабжения населения питьевой водой, орошения сельскохозяйственных земель и водопоя скота. Река Белая Вольта перегорожена тремя плотинами, которые используются для выработки гидроэлектроэнергии. Плотина Багре находится в Буркина-Фасо, плотины Акосомбо и Кпонг в Гане. В бассейне реки проживает около 1,6 миллиона человек. Река не судоходна[источник не указан 707 дней]."
     },
     {
        "name": "Белая Кедва",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%BB%D0%B0%D1%8F_%D0%9A%D0%B5%D0%B4%D0%B2%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%B5%D0%BB%D0%B0%D1%8F_%D0%9A%D0%B5%D0%B4%D0%B2%D0%B0.jpg/250px-%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%B5%D0%BB%D0%B0%D1%8F_%D0%9A%D0%B5%D0%B4%D0%B2%D0%B0.jpg",
        "length": "153 км",
        "pool": "1690 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Кедва",
        "location": " Россия",
        "info": "Белая Кедва (коми Еджыд Кедва)— река в России, протекает в Республике Коми по территории Княжпогостского района и городского округа Ухта. Слиянием с Чёрной Кедвой образует реку Кедву в 47 км от её устья, являясь правой составляющей. Длина реки — 153 км, площадь водосборного бассейна — 1690 км².По данным государственного водного реестра России относится к Двинско-Печорскому бассейновому округу, водохозяйственный участок реки — Печора от впадения реки Уса до водомерного поста Усть-Цильма, речной подбассейн реки — бассейны притоков Печоры ниже впадения Усы. Речной бассейн реки — Печора.Код объекта в государственном водном реестре — 03050300112103000077162.В реку впадает 117 притоков.(расстояние от устья)"
     },
                 {
        "name": "Белая Холуница ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%BB%D0%B0%D1%8F_%D0%A5%D0%BE%D0%BB%D1%83%D0%BD%D0%B8%D1%86%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Belaya-Kholunitsa-damba.jpg/250px-Belaya-Kholunitsa-damba.jpg",
        "length": "168 км",
        "pool": "2800 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Вятка",
        "location": " Россия",
        "info": "Бе́лая Холуни́ца — река в России, протекает по Кировской области, левый приток реки Вятки (бассейн Волги). Устье находится в 762 км по левому берегу реки Вятки. Длина — 168 км, площадь бассейна — 2800 км².Белая Холуница берёт начало в западной части Верхнекамской возвышенности, протекает по равнинной местности. Главный приток — Сома.Питание преимущественно снеговое. Ледостав с ноября по апрель. Используется для лесосплава.На реке расположен город Белая Холуница, в городе — плотина, образовавшая крупнейшее в Кировской области водохранилище, используется для промышленных целей и выработки электроэнергии. Кроме города на реке стоит село Ильинское, посёлок Климковка и ряд небольших деревень.Река впадает в Вятку напротив города Слободской. Ширина реки в нижнем течении 60-70 метров."
     },
                                              {
        "name": "Белл-Фурш ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%BB%D0%BB-%D0%A4%D1%83%D1%80%D1%88_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Belle_Fourche_River_19A.JPG/250px-Belle_Fourche_River_19A.JPG",
        "length": "470 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Шайенн",
        "location": " США",
        "info": "Белл-Фурш (англ. Belle Fourche River /bɛlˈfuːʃ/; лакота Šahíyela Wakpá) — приток реки Шайенн длиной около 470 км, протекающий по территории североамериканских штатов Вайоминг и Южная Дакота.Входит в бассейн Миссисипи через водные системы рек Шайенн и Миссури. На географических картах конца XIX века эта водная артерия обозначалась как северное ответвление реки Шайенн (англ. North Fork of Cheynne). Название «Белл-Фурш» происходит от французского «красивая развилка».Высота истока — 2031 м над уровнем моря.[источник не указан 756 дней] Высота устья — 619 м над уровнем моря.[источник не указан 756 дней]От истока, который находится на северо-востоке штата Вайоминг, приблизительно в 24 км к северу от городка Райт (южная часть округа Кэмпбелл), река течёт на северо-восток, огибая северные склоны гор Бэр-Лодж, минуя Моркрофт и памятник природы «Девилс-Тауэр». Вблизи границы штата Монтана она резко поворачивает на юго-восток, протекая по западным территориям Южной Дакоты, через город Белл-Фурш и вдоль северного подножия горной гряды Блэк-Хилс. В южной части округа Мид, неподалёку от Херефорда, она направляется на восток-северо-восток и сливается с рекой Шайенн приблизительно в 80 км к востоку-северо-востоку от Рапид-Сити (Южная Дакота)."
     },
     {
        "name": "Белли ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%BB%D0%BB%D0%B8_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/MK02256_2257_Belly_River.jpg/250px-MK02256_2257_Belly_River.jpg",
        "length": "241 км",
        "pool": "3850 км²",
        "consumption": "undefined",
        "head": "Хелен",
        "estuary": "Олдмен",
        "location": " Канада,  США",
        "info": "Белли (англ. Belly River, South Fork Belly River, Mokowanis River) — река в Монтане на Западе США и в Альберте на Западе Канады. Левый приток реки Олдмен. Длина — 241 км. Площадь водосборного бассейна — 3850 км². В США протекает по территории округа Глейшер на северо-западе штата Монтана, в Канаде — на юге провинции Альберта. Крупнейший приток — Уотертон.Белли начинается на хребте Льюис в национальном парке Глейшер, вытекая из озера Хелен на высоте 1551 м над уровнем моря. В верховье течёт преимущественно на север, далее — на северо-восток. Примерно в 16 км северо-западнее Летбриджа впадает в реку Олдмен."
     },
       {
        "name": "Белоголовая",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%BB%D0%BE%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D0%B0%D1%8F",
        "image": "undefined",
        "length": "226 км",
        "pool": "4000 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Охотское море",
        "location": " Россия",
        "info": "Белоголовая (коряк. Митцгаямку) — река в России, в Камчатском крае. Одна из крупнейших рек западного побережья полуострова Камчатка. Длина 226 км. Площадь водосборного бассейна — 4000 км².Берёт начало на западных склонах Срединного хребта тремя истоками, близ Ичинского вулкана. Белоголовая имеют большое количество проток и стариц. Впадает в Хайрюзовскую бухту Охотского моря севернее устья Сопочной.В нижнем течении реки находится памятник природы регионального значения «Камчатская жемчужница на реке Белоголовой», основным объектом охраны которого является жемчужница Миддендорфа — редкий вид двустворчатых моллюсков, занесенный в Красную книгу Камчатки.Объекты перечислены по порядку от устья к истоку.По данным государственного водного реестра России относится к Анадыро-Колымскому бассейновому округу.Код водного объекта в государственном водном реестре — 19080000212120000031598."
     },
              {
        "name": "Белт-Крик",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%BB%D1%82-%D0%9A%D1%80%D0%B8%D0%BA",
        "image": "undefined",
        "length": "129 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Миссури",
        "location": " США",
        "info": "Белт-Крик (англ. Belt Creek — Ручей-Пояс (Поясной, Опоясывающий)) — река на западе Монтаны (США), правый приток Миссури, длина 129 км.Берёт начало в Национальном лесу Льюиса и Кларка, к северу от горы Биг-Болди-Маунтин (англ. Big Baldy Mountain), в горах Литл-Белт, на западе округа Джудит-Бэйсин.Вначале течёт на северо-запад через гористые каньоны мимо города Монарк, затем на север мимо деревни Армингтон и города Белт.Впадает в Миссури приблизительно в 25 км к северо-западу от города Грейт-Фолс.Протекает по территории округов Джудит-Бэйсин, Каскейд и Чото штата Монтана."
     },
           {
        "name": "Белый Дрин",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%BB%D1%8B%D0%B9_%D0%94%D1%80%D0%B8%D0%BD",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/White_Drini_05_01.jpg/250px-White_Drini_05_01.jpg",
        "length": "175 км",
        "pool": "4964 км²",
        "consumption": "56 м³/с",
        "head": " ",
        "estuary": "Дрин",
        "location": " Сербия,  Албания",
        "info": "Бе́лый Дрин (серб. Бели Дрим, алб. Drini i Bardhë) — река в юго-восточной Европе.Протекает в Сербии. Длина — 175 км. Исток находится к северу от города Печ в Косово. Устье в северной части Албании у города Кукес — слияние Белого и Чёрного Дрина в реку Дрин.Его бассейн имеет площадь 4964 км², средний расход воды 56 м³/сек. Осенне-зимнее половодье приводит к существенному повышению уровня воды в реке. Белый Дрин несудоходен.Каньон Белого Дрина с 1986 года находится под государственной охраной."
     },
     {
        "name": "Белый Июс",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%BB%D1%8B%D0%B9_%D0%98%D1%8E%D1%81",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%B5%D0%BB%D1%8B%D0%B9_%D0%98%D1%8E%D1%81.jpg/250px-%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%B5%D0%BB%D1%8B%D0%B9_%D0%98%D1%8E%D1%81.jpg",
        "length": "224 км",
        "pool": "5370 км²",
        "consumption": "41 м³/с (55 км от устья)",
        "head": " ",
        "estuary": "Чулым",
        "location": " Россия",
        "info": "Бе́лый Ию́с  — река в Республике Хакасия, Россия. Длина — 224 км, площадь водосборного бассейна — 5370 км².Ак-Июс (хак. Ах-Ӱӱс), ах «белый», ӱӱс «река» (от др.-тюрк. ӱгӱз «река»). В верховьях реки называют Пихтерек.Жители Урала называют реки, на Запад текущие, реками белыми; те же которые текут на Восток или в Сибирь, реками черными.В верховьях Белый Июс  именуется Пихтерек и имеет характер быстрой горной реки, в низовьях течёт среди холмистых степных пространств западной окраины Чулымо-Енисейской котловины. Питание главным образом снеговое. Сплавная. Сливаясь с Чёрным Июсом, образуют реку Чулым, правый приток Оби.Протекает по территории Орджоникидзевского и Ширинского районов. Образуется при слиянии рек Пихтерек и Туралыг у подножья северо-восточного склона Кузнецкого Алатау. Истоками являются мелкие горные озера на высоте 1000 м. В верхнем течении (до села Ефремкино) река типично горная, остальная часть — равнинная. Густота речной сети 0,5—0,7 км/км². Является притоком реки Чулым. Модуль стока — 5—10 л/(сек×км²).Основные притоки первого порядка: левые — Тюхтерек, Большая Сыя, Малая Сыя, Тарга, Чёрная и др.; правые — Харатас, Тунгужуль, Шаблык, Тюрим и др. В долине находится более 10 населённых пунктов (Беренжак, Мендоль, Малая Сыя, Ефремкино, Белый Балахчин, Июс, Солёноозёрное и др.). Среднее течение — в пределах Чулымо-Енисейской впадины, русло сильномеандрирующее, долина заболочена. В районе селений Ефремкино и Малая Сыя на площади 40—50 тыс. га имеются экзотические скальные обнажения, пещеры (Ящик Пандоры, Археологическая и др.), памятники истории (поселение древнего человека, наскальные рисунки)."
     },
     {
        "name": "Белый Кей",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%BB%D1%8B%D0%B9_%D0%9A%D0%B5%D0%B9",
        "image": "undefined",
        "length": "145 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Большой Кей",
        "location": " Южно-Африканская Республика",
        "info": "Белый Кей[1] (африк. Wit-Keirivier, англ. White Kei River) — река в Южно-Африканской Республике. Длина — 145 км. Протекает по территории Восточно-Капской провинции.Исток расположен на склоне горного хребта Стормберг[en]. Принимает несколько притоков как справа, так и слева. К северо-востоку от города Каткарт сливается с рекой Чёрный Кей, образуя реку Большой Кей. В среднем течении создано водохранилище, имеющее существенное хозяйственное значение и, одновременно, оказывающее существенное влияние на экосистему реки.Слово «кей», составляющее основу названия этой реки и фигурирующее в названиях ещё нескольких местных рек, по мнению специалистов, происходит из одного из южнокойсанских языков. При этом — в силу фонетической сложности этих языков и их диалектного многообразия — выдвигаются различные версии этимологии, связывающие его с койсанскими словами «вода», «песок» и «большой». Что касается прилагательного «белый», присутствующего в названиях реки как на языке африкаанс, так и на английском, то оно предположительно связано со светлым цветом песка и донных отложений — по крайней мере, в сравнении с теми, которые характерны для сливающегося с Белым Кеем Чёрного Кея[2][3].При этом на языке коса, который является одним из 11 государственных языков ЮАР и родным для большинства населения Восточно-Капской провинции, эта река издавна называется Какаду. Это название не имеет отношение к семейству попугаевых, а означает «камышовая вода». В 2017 году в рамках кампании по искоренению наследия колониальной эпохи из южноафрикаской топонимики это название получил небольшой городок Леди-Фреа[en], стоящий на берегах одного из притоков Белого Кея[4]."
     },
     {
        "name": "Белый Лух",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%BB%D1%8B%D0%B9_%D0%9B%D1%83%D1%85",
        "image": "undefined",
        "length": "119 км",
        "pool": "1490 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Унжа",
        "location": " Россия",
        "info": "Белый Лух — река в Костромской и Нижегородской областях России, левый приток Унжи.Длина реки составляет 119 км, площадь водосборного бассейна 1490 км². Протекает в лесах, в основном по территории Макарьевского района Костромской области. Берёт начало в заболоченной местности на востоке района, в 25 км к юго-западу от посёлка имени Калинина. От истока течёт немного на восток и, отклоняясь вправо, в верховьях меняет направление течения на западное (небольшой крайний восточный участок течения находится в границах Ветлужского и Варнавинского районов Нижегородской области). Далее течёт на запад и впадает в Унжу по левому берегу в 23 км от её устья (2 км к северу от посёлка Горчуха).Русло сильно извилистое. В среднем течении на правом берегу расположен посёлок Нестерово, недалеко от него в бассейне реки находятся населённые пункты Тимошино, Карьково, Халабурдиха, Кукуй-1, Кукуй-2.В бассейне реки располагались лагеря Унжлага (одного из лагерей ГУЛаг).По данным государственного водного реестра России относится к Верхневолжскому бассейновому округу, водохозяйственный участок реки — Унжа от истока и до устья, речной подбассейн реки — Бассейны притоков Волги ниже Рыбинского водохранилища до впадения Оки. Речной бассейн реки — (Верхняя) Волга до Куйбышевского водохранилища (без бассейна Оки)."
     },
     {
        "name": "Белый Урюм",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%BB%D1%8B%D0%B9_%D0%A3%D1%80%D1%8E%D0%BC",
        "image": "undefined",
        "length": "145 км",
        "pool": "5070 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Чёрная",
        "location": " Россия",
        "info": "Бе́лый Урю́м — река в Забайкальском крае России, правая составляющая реки Чёрная, притока Шилки. Длина реки составляет 145 км. Площадь водосбора 5070 км².Берёт начало на северо-западном склоне Хорькового хребта.Притоки реки: Ороктыча, Алеур, Ундурга, Делондя, Шахтайка, Целкема, Ярокта 1-я, Улей, Чонгол, Жебкос, Ургучен."
     },
              {
        "name": "Бельдунчана ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%BB%D1%8C%D0%B4%D1%83%D0%BD%D1%87%D0%B0%D0%BD%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "195 км",
        "pool": "4400 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Курейка",
        "location": " Россия",
        "info": "Бельдунча́на (эвенк. «ломающаяся») — река в Красноярском крае, Россия. Длина реки 195 км, площадь бассейна 4400 км², является крупнейшим по площади бассейна и длине притоком Курейки.Исток реки находится в центральной части плато Путорана. Выше озера Верхняя Бельдунчана носит название Догалдын (эвенк. «приток»). Протекает через озёра Верхняя Бельдунчана и Бельдунчана, впадает в Курейку справа в 646 км от устья.Основные притоки (км от устья):Питание реки снеговое и дождевое. Для реки характерно весенне-летнее половодье, летом имеют место паводки дождевые паводки. Замерзает Бельдунчана в сентябре — начале октября. Ледостав продолжается до июня.Река используется для сплавов (IV категория сложности) и рыболовства. Одной из достопримечательностей реки является Бельдунчанский водопад в 7 км от устья реки. Ширина водопада 40 м, высота падения воды 25 м. Постоянное население на берегах реки отсутствует."
     },
               {
        "name": "Белянка (приток Лены)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%BB%D1%8F%D0%BD%D0%BA%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9B%D0%B5%D0%BD%D1%8B)",
        "image": "undefined",
        "length": "114 км",
        "pool": "4560 км²",
        "consumption": "undefined",
        "head": "слияние рек: Тагиндя и Мунни",
        "estuary": "Лена",
        "location": " Россия",
        "info": "Белянка — река в Якутии, правый приток Лены.Длина реки — 114 км. Площадь водосборного бассейна — 4560 км².По данным государственного водного реестра России входит в Ленский бассейновый округ.Код водного объекта 18030700112117400000406."
     },
      {
        "name": "Бемариву",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%BC%D0%B0%D1%80%D0%B8%D0%B2%D1%83",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bemarivo_Nosiarina_amont.jpg/250px-Bemarivo_Nosiarina_amont.jpg",
        "length": "140 км",
        "pool": "5400 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Индийский океан",
        "location": " Мадагаскар",
        "info": "Бемари́ву (малаг. Bemarivo) — река на севере Мадагаскара в провинции Анциранана.Длина — 140 км. Площадь водосборного бассейна — 5400 км².Начинается Бемариву на восточных склонах горного массива Царатанана. Первые 70 км течения средний уклон реки равняется 30 м/км. Генеральным направлением течения является восток.Главный правобережный приток — Андруранга; ещё одним крупным притоком правого берега является Андзиалава."
     },
          {
        "name": "Бени ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%BD%D0%B8_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Beni_River%2C_Rurrenabaque%2C_Bolivia.jpg/250px-Beni_River%2C_Rurrenabaque%2C_Bolivia.jpg",
        "length": "1500 км",
        "pool": "266 000 км²",
        "consumption": "6200  м³/с",
        "head": " ",
        "estuary": "Мадейра",
        "location": " Боливия",
        "info": "Бе́ни (исп. Río Beni) — река в северной части Боливии, левая составляющая Мадейры.Длина реки по данным Большой Российской энциклопедии — 1500 км, по данным Британской энциклопедии — 1600 км. Площадь бассейна 266 000 км². Среднегодовой расход воды в устье 6200 м³/с. Средняя глубина реки около 9 метров, максимальная глубина 21,3 метра. Средняя ширина реки 400 метров, максимальная ширина 1069 метров.[источник не указан 938 дней]Река Бени на протяжении своего пути имеет сложную гидрографию, часто изменяет направление и имеет много порогов. Река судоходна на 350 км от города Рурренабаке до водопада Эсперанса (в 29 км выше устья).На границе с Бразилией река Бени вместе с другими реками Маморе и Мадре-де-Дьос образует реку Мадейру, которая, в свою очередь, впадает в Амазонку.Существует проект строительства гидроэлектростанции на реке в ущелье Ангосто дель Бала.На берегах реки в 1981 году разворачиваются события автобиографического романа «Джунгли: невероятная и подлинная история выживания» Йосси Гинсберга и последующей его киноадаптации 2017 года — фильма «Джунгли»."
     },
     {
        "name": "Бенуэ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D0%BD%D1%83%D1%8D",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Benue_SE_Yola.jpg/250px-Benue_SE_Yola.jpg",
        "length": "1400 км",
        "pool": "441 000 км²",
        "consumption": "3170 м³/с",
        "head": " ",
        "estuary": "Нигер",
        "location": " Камерун,  Нигерия",
        "info": "Бе́нуэ (на яз. банту — мать вод, фр. la Bénoué) — река в западной Африке (Камерун, Нигерия). Крупнейший левый приток реки Нигер. Длина 1400 км (по другим данным 1300 км или 960 км). Площадь водосборного бассейна — 441 тыс. км². Средний расход 3170 м³/сек. Судоходна от города Иби (в период дождей от города Гаруа). По своему характеру — равнинная река, текущая в широкой долине. Протекает по густонаселённым районам влажных саванн.Исток реки находится на восточных склонах нагорья Камерун. Крупные притоки: Оква, Мада, Анкве, Шеманкар, Паи, Гонгола (правые) и Кацина-Ала, Донга, Темба, Фаро (левые).Европейское открытие и исследование реки связано с братьями Ландерами — Ричардом и Джоном. В 1830 году «Африканская ассоциация» поручила Ричарду, старшему брату, стать руководителем очередной экспедиции в Западную Африку с целью исследовать реку Нигер и его притоки. Пройдя уже ранее изученным Ричардом путём от Невольничьего Берега до Бусы, британцы осуществили плавание вниз по течению Нигера. В ходе этого попутно был открыт Бенуэ, являющийся левым притоком и резко увеличивающий полноводность Нигера. После значительных трудностей и опасностей, участники сумели достичь дельты Нигера при впадение его в Гвинейский залив. Эти открытия заинтересовали британские торговые круги. В 1833 году Ричард Ландер возглавлял неудачно закончившуюся торговую экспедицию на Нигер и Бенуэ, во время которой погиб от пули туземца. В ходе этого плавания британцы сумели подняться на двух пароходах до нижнего течения Бенуэ, выше 150 км от устья. У некоторых местных народов река была известна как Чадда, что вызывало у европейцев гипотезы о том, что она каким-то образом могла относиться к бассейну озера Чад. В середине XIX века значительный вклад в изучение реки внесли Генрих Барт и Уильям Бальфур Бейки."
     },
     {
        "name": "Бербис ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D1%80%D0%B1%D0%B8%D1%81_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/TheCreek.JPG/250px-TheCreek.JPG",
        "length": "595 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Атлантический океан",
        "location": " Гайана",
        "info": "Берби́с — река в восточной части Гайаны. Исток расположен в саванне Рупунуни, находящейся на Гвианском плоскогорье. Протекает на север сквозь густые леса и прибрежную равнину. В районе Нью-Амстердама, на мелководье, впадает в Атлантический океан. Длина — 595 км.Течёт в непосредственной близости от крупнейших рек страны Эссекибо и Корантейна. Крупнейший приток — Канье.Судоходный участок Бербиса, преодолеваемый на маломерных судах, составляет 160 км. Более того, по нему осуществляется лесосплав. Бо́льшая часть порогов находится вверх по течению.Получила наименование в честь одноимённой колонии, вошедшей в состав Британской Гвианы (в настоящее время — Гайаны) в 1831 году."
     },
         {
        "name": "Бердекин ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D1%80%D0%B4%D0%B5%D0%BA%D0%B8%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/BurdekinRiver1.jpg/250px-BurdekinRiver1.jpg",
        "length": "732 км",
        "pool": "129,700 км²",
        "consumption": "380 м³/с",
        "head": " ",
        "estuary": "Коралловое море",
        "location": " Австралия",
        "info": "Бе́рдекин (англ. Burdekin River) — река в австралийском штате Квинсленд.Исток реки Бердекин находится на западном склоне горного хребта Сивью, недалеко от города Ингем. Устье же расположено в бухте Апстарт Кораллового моря, которое, в свою очередь, является частью Тихого океана. Длина реки — 732 км.Река Бердекин, как и Муррей, играет важную роль в экономике Австралии и имеет четвёртый по площади бассейн на континенте. Кроме того, Бердекин является четвёртой рекой Австралии по объёму расхода воды, хотя эта цифра является настолько неустойчивой, что в некоторых случаях объём расходы воды может достичь средних показателей реки Янцзы, как это было в 1958 году, а в других — водный поток и вовсе может отсутствовать в течение семи месяцев, как это произошло в 1923 году. Основная причина таких колебаний объёма расхода воды — неустойчивость количества осадков на протяжении всего бассейна реки. Среднегодовое количество осадков в большинстве мест бассейна Бердекина может варьироваться от 200 мм до около 1600 мм в зависимости от муссонов и количества циклонов, пересекающих восточное побережье Австралии. На побережье колебание осадков ещё более значительное: так, у города Боуэн, расположенном недалеко от устья реки, среднегодовое количество осадков может колебаться от 216 мм (1915 год) до 2200 мм (1950 год)."
     },
             {
        "name": "Бердь",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D1%80%D0%B4%D1%8C",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Mouth_river_Koen.jpg/250px-Mouth_river_Koen.jpg",
        "length": "363 км",
        "pool": "8650 км²",
        "consumption": "45,8 м³/с",
        "head": " ",
        "estuary": "Бердский залив",
        "location": " Россия",
        "info": "Бердь — река в России, правый приток Оби. Длина реки — 363 км, площадь водосборного бассейна — 8650 км². Средний годовой расход воды — 45,8 м³/с. Ледостав с начала ноября по середину апреля. На реке Бердь расположены посёлок городского типа Маслянино, города Искитим и Бердск. Происхождение гидронима «Бердь» пока не имеет убедительного объяснения.Исток Берди находится на высоте 440 м в горном массиве Салаир, на границе Кемеровской области и Алтайского края. Большая часть русла расположена в Новосибирской области. С 1959 года река впадает в Бердский залив Новосибирского водохранилища, при строительстве которого была затоплена долина реки на 40 км от бывшего устья, образовав протяжённый Бердский залив.Площадь бассейна реки составляет 8650 км². В Искитиме, в 40 км от плотины среднемесячный расход воды составляет 45,8 м/с. Перед впадением в водохранилище ширина Берди составляет 75 м, глубина 1,7 м и скорость течения 0,5 м/с. До 90-х годов XX века, Бердь была судоходна на 35 км от устья.Воды Берди активно используются для орошения, питьевого и промышленного водоснабжения, а также рекреации двух густонаселённых районов Новосибирской области — Маслянинского и Искитимского; как следствие, они подвергаются значительному загрязнению. Например, концентрация фенолов в водах Бердского залива в 1994 году превышала допустимую норму в 16 раз, нефтепродуктов — в 5 раз. Основными источниками загрязнения являются продукты эрозии берегов вследствие гидростроительства, чрезмерного выпаса скота и повреждения прибрежной растительности, а также сельскохозяйственное и промышленно-бытовое загрязнение."
     },
                  {
        "name": "Берёза (приток Межи)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D1%80%D1%91%D0%B7%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9C%D0%B5%D0%B6%D0%B8)",
        "image": "undefined",
        "length": "106 км",
        "pool": "720 км²",
        "consumption": "3,5 м³/с",
        "head": " ",
        "estuary": "Межа",
        "location": " Россия",
        "info": "Берёза — река в Тверской области России, левый приток Межи.Длина — 106 км, площадь водосборного бассейна — 720 км².Этимология гидронима связана с преобладающей растительностью по берегам реки.Протекает по территории Оленинского и Нелидовского районов. Берёт начало юго-восточнее деревень Кулаковка и Пустынька, севернее урочища Шереметьев Большак. Верхнее течение северо-западного направления при ширине реки от 8 до 18 м, глубине до 3 м и скорости течения 0,3 м/с, долина слабо врезанная.В среднем течении с севера огибает Мостовское водохранилище и меняет направление на юго-западное, протекая несколько километров вдоль линии Октябрьской железной дороги. Ширина реки на этом отрезке 18—28 м, глубина — 1—3 м, скорость течения — 0,4 м/с, долина имеет пойму и надпойменную террасу.Русло реки в нижнем течении более извилистое. Ширина реки — 12—17 м, глубина — 0,7—1,0 м, скорость течения — 0,2 м/с, дно песчаное и твёрдое, ближе к устью — каменистое. Ниже деревни Новосёлки пересекает автодорогу Р136 и впадает в реку Межу.Замерзает в конце ноября, вскрывается в начале апреля. Среднегодовой расход воды составляет 3,5 м³/с.Основные притоки: Берёзка, Витка, Возьменка — правые; Медведка, Дроздовка — левые."
     },
     {
        "name": "Березайка ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D1%80%D0%B5%D0%B7%D0%B0%D0%B9%D0%BA%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "150 км",
        "pool": "3230 км²",
        "consumption": "27 м³/с (в устье)",
        "head": "Березай",
        "estuary": "Мста",
        "location": " Россия",
        "info": "Береза́йка — река в Новгородской и Тверской области. Длина — 150 км, площадь бассейна — 3230 км², средний расход воды в устье — 27 м³/с. Принадлежит к бассейну Балтийского моря. Крупнейший населённый пункт на реке — посёлок Березайка.Вытекает из озера Березай, расположенного в Новгородской области на Валдайской возвышенности, впадает во Мсту.Крупные притоки: Валдайка (слева); Кемка (справа).В верховьях Березайка — очень узкая и извилистая речка. Ближе к границе Тверской области и сразу после неё Березайка протекает через цепочку озёр — Холмское, Михайловское, Искровно, Пертешно и Селище. По выходу из озёр ширина увеличивается до 15 — 20 метров, течение ускоряется.После посёлка Березайка, расположенного на железной дороге Москва — Санкт-Петербург, течение реки замедляется, а ширина увеличивается до 50 — 60 метров, сказывается напор Рютинской плотины на озере Пирос. Березайка протекает это большое озеро в его юго-восточной части, в то время, как в западную часть озера впадает крупнейший приток Березайки — Валдайка.После Пироса ширина реки вплоть до устья составляет 30 — 40 метров, течение очень быстрое, особенно в половодье. В русле реки — камни и отдельные перекаты, есть несколько полузатопленных мельничных плотин. Берега реки одеты хорошим и живописным лесом."
     },
       {
        "name": "Березина",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D1%80%D0%B5%D0%B7%D0%B8%D0%BD%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Dokshytsy_4a.jpg/250px-Dokshytsy_4a.jpg",
        "length": "561 км",
        "pool": "24 500 км²",
        "consumption": "145 м³/с (в устье)",
        "head": " ",
        "estuary": "Днепр",
        "location": " Белоруссия",
        "info": "Березина́ (белор. Бярэ́зіна) — река в Белоруссии, правый приток Днепра. Самая длинная река, которая на всём своём течении расположена в Белоруссии.Длина реки — 561 км, площадь бассейна — 24 500 км². Березина берёт начало в болотистой местности севернее Минской возвышенности, в Березинском заповеднике, в 1 км к юго-западу от города Докшицы. Исток находится на водоразделе Чёрного и Балтийского морей, рядом с истоком Березины берут начало верхние притоки реки Сервечь бассейна реки Неман и Аржаницы бассейна реки Западная Двина (точка тройного водораздела находится примерно в 4 км к западу от станции Крулевщина на безымянной высоте между высотами 199,0 и 190,7). В верхнем течении Березина проходит через озёра Медзозол и Палик. Протекает в южном направлении по Центральноберезинской равнине, впадает в Днепр около деревни Береговая Слобода Речицкого района.Средний годовой расход воды в устье 145 м³/сек. Основные притоки: Сергуч, Бобр, Клева, Ольса, Ола, Сха — левые; Поня, Уса, Гайна, Свислочь, Жорновка, Уша — правые. На Березине расположены города Докшицы, Борисов, Березино, Бобруйск и Светлогорск, деревни Александровка, Береговая Слобода и др.Распространённое объяснение названия от русского берёза вызывает сомнения: в этом случае следовало бы ожидать применения суффикса -ов: Берёзовая, Берёзовка, Берёзовица и т. п. Более вероятно происхождение от балтийско-литовского berzas «берёза»; производные от этой основы образуются с суффиксом -in-: beržinis «берёзовый», beržynė «березняк», beržynas «берёзовый лес» и т. п.; этот же суффикс и в других аналогичных балтийских названиях этого региона. Начиная с XVI века, высказываются предположения о возможной связи названия Березина с древнегреческим названием Днепра Борисфен. Споры возникают главным образом о том, какое из этих двух названий первично. Академик Б. А. Рыбаков считает, что древнее название Борисфен сохранилось в названии Березина. Название Борисфен считают иранским по происхождению и объясняют как «широкое место» либо «высокое место». Однако это предположение, по выражению Фасмера, «висит в воздухе», поскольку «древние не имели точных сведений о верхнем и среднем течении Днепра». Косвенным доказательством этой версии может служить совпадение с названием острова Березань, находящегося недалеко от устья Днепра и имевшем второе название Борисфенида. Ю. В. Откупщиков, поддерживая связь с др.-греч. Βορυσθένης, предлагает другую этимологию и возводит название реки к балто-славянскому корню со значением «быстрый» (лит. burzdùs, праслав. *bъrzъ), давшему в русском языке слово борзый."
     },
      {
        "name": "Березина (приток Немана)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D1%80%D0%B5%D0%B7%D0%B8%D0%BD%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9D%D0%B5%D0%BC%D0%B0%D0%BD%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Beresina_river_of_Belarus.jpg/250px-Beresina_river_of_Belarus.jpg",
        "length": "226 км",
        "pool": "4000 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Неман",
        "location": " Белоруссия",
        "info": "Березина́ или Западная Березина (белор. Бярэ́зіна, Захо́дняя Бярэ́зіна) — река в Белоруссии, правый приток Немана. Начинается около деревни Бортники Молодечненского района Минской области, протекает по территории Воложинского района Минской области, Сморгонского, Ивьевского и Новогрудского районов Гродненской области. Длина реки 226 км, площадь водосбора 4 тыс. км². Верхняя и средняя части водосбора расположены на склонах Ошмянской гряды и Минской возвышенности, низовье простирается по Верхненеманской низменности.В среднем течении реки Саковщинское водохранилище, функционирует гидроэлектростанция.Водораздел хорошо выражен, имеет плавные очертания, на севере отделяет бассейн Вилии, на востоке — водосборы Свислочи и Птичи. Общая протяжённость водораздельной линии около 310 км. Верхняя и средняя части водосбора характеризуются мелкохолмистым рельефом, нижняя представляет собой плоскую заболоченную равнину. Лесными массивами занято 30 % площади водосбора, наибольшей лесистостью отличается нижняя часть водосбора (Налибокская пуща). В составе леса преобладающими являются хвойные породы, чаще всего сосна.Значительных озёр в бассейне нет (озерность <1 %). На водосборе проводились мелиоративные работы, в результате которых 16,1 % площади бассейна мелиорировано (2006 год), протяжённость открытой осушительной сети составляет 2365 км, большинство притоков канализировано."
     },
                     {
        "name": "Берёзовая (приток Калитвы)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D1%80%D1%91%D0%B7%D0%BE%D0%B2%D0%B0%D1%8F_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9A%D0%B0%D0%BB%D0%B8%D1%82%D0%B2%D1%8B)",
        "image": "undefined",
        "length": "130 км",
        "pool": "1630 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Калитва",
        "location": " Россия",
        "info": "Берёзовая (Берёзовка) — река в России, протекает по Ростовской области. Устье реки находится в 83 км по левому берегу реки Калитва. Длина реки — 130 км, площадь водосборного бассейна — 1630 км².Впадают реки (км от устья)По данным государственного водного реестра России относится к Донскому бассейновому округу, водохозяйственный участок реки — Калитва, речной подбассейн реки — Северский Донец (российская часть бассейна). Речной бассейн реки — Дон (российская часть бассейна)."
     },
                                                                 {
        "name": "Берёзовка (приток Колымы)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D1%80%D1%91%D0%B7%D0%BE%D0%B2%D0%BA%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9A%D0%BE%D0%BB%D1%8B%D0%BC%D1%8B)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Kolyma.png/250px-Kolyma.png",
        "length": "517 км",
        "pool": "24 800 км²",
        "consumption": "62,9 м³/с (202 км от устья)",
        "head": " ",
        "estuary": "Колыма",
        "location": " Россия",
        "info": "Берёзовка — река в России, протекает по территории Среднеколымского улуса Якутии, правый приток реки Колымы. Длина — 517 км, площадь водосборного бассейна — 24 800 км². Берёт начало и протекает в пределах Юкагирского плоскогорья. В бассейне Берёзовки около 2000 озёр.Среднегодовой расход воды в 202 км от устья составляет 62,9 м³/с, наибольший (≈254 м³/с) приходится на май и июнь (данные наблюдений с 1965 по 1998 год). Замерзает в середине октября, вскрывается в конце мая — начале июня.По данным государственного водного реестра России относится к Анадыро-Колымскому бассейновому округу, речной бассейн реки — Колыма, речной подбассейн реки — Колыма до впадения Омолона, водохозяйственный участок реки — Колыма от в/п г. Среднеколымск до впадения р. Омолон.Код объекта в государственном водном реестре — 19010100512119000044030.(расстояние от устья)На берегу реки Берёзовки в вечной мерзлоте был найден шерстистый мамонт. В 1901 году принимавшие участие в раскопках и реконструкции «Берёзовского мамонта» немецкий зоолог Ойген В. Фиценмайер и его коллега Отто Ф. Херз нашли, что у зверя во рту сохранился пучок растений, которые мамонт начал жевать, прямо перед тем как упасть в глубокую расщелину и погибнуть. Сохранившиеся растительные останки определили как Carex sp., Thymus serpillum, Papaver alpinum, Ranunculus acer, Gentiana sp. и Cypripedium sp. Циприпедиум рос приблизительно 30000 лет назад (поздние источники оценивают его возраст 8000—10000 лет назад) — это самая древняя находка башмачка, о которой мы знаем. Цитируя Физенмэйера, венгерский ботаник Режё Шоо предполагал, что это был Cypripedium guttatum."
     },
                {
        "name": "Берёзовка (приток Пайдугины)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D1%80%D1%91%D0%B7%D0%BE%D0%B2%D0%BA%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9F%D0%B0%D0%B9%D0%B4%D1%83%D0%B3%D0%B8%D0%BD%D1%8B)",
        "image": "undefined",
        "length": "168 км",
        "pool": "1750 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Пайдугина",
        "location": " Россия",
        "info": "Высота истока — 132 м над уровнем моря.[источник не указан 605 дней] Площадь водосборного бассейна — 1750 км².[источник не указан 605 дней]Берёзовка — река в России, протекает по Томской области. Устье реки находится в 200 км по правому берегу реки Пайдугина. Длина реки составляет 168 км.По данным государственного водного реестра России относится к Верхнеобскому бассейновому округу, водохозяйственный участок реки — Кеть, речной подбассейн реки — бассейн притоков (Верхней) Оби от Чулыма до Кети. Речной бассейн реки — (Верхняя) Обь до впадения Иртыша."
     },
                     {
        "name": "Берёзовка (река, впадает в Чусовское озеро)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D1%80%D1%91%D0%B7%D0%BE%D0%B2%D0%BA%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0,_%D0%B2%D0%BF%D0%B0%D0%B4%D0%B0%D0%B5%D1%82_%D0%B2_%D0%A7%D1%83%D1%81%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B5_%D0%BE%D0%B7%D0%B5%D1%80%D0%BE)",
        "image": "undefined",
        "length": "141 км",
        "pool": "1970 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Чусовское",
        "location": " Россия",
        "info": "Берёзовка — река в России, протекает по территории Троицко-Печорского района Республики Коми и Чердынского района Пермского края. Впадает в Чусовское озеро. Длина — 141 км, площадь водосборного бассейна — 1970 км².Исток реки в Троицко-Печорском районе Республики Коми в ненаселённом лесном массиве в 32 км к северо-западу от посёлка Якша. Река течёт на юг, в нижнем течении перетекает в Пермский край. всё течение реки проходит по ненаселённому лесу. В низовьях образует большое количество стариц и затонов, русло извилистое. Впадает в северную часть Чусовского озера.Бассейн Берёзовки — самая северная часть бассейна Камы, верховья Берёзовки лежат на глобальном водоразделе, её исток находится близ точки, где сходятся бассейны Камы (Волга, Каспийское море), Печоры (Печорское море), и Северной Двины (Белое море). Рядом с истоком Берёзовки лежат истоки реки Безволосная (бассейн Печоры) и реки Нем (бассейн Северной Двины). С эти обстоятельством связаны планы соединения Берёзовки с бассейном Печоры посредством канала Печора — Кама. В рамках проекта «Тайга» около деревни Васюково в нижнем течении Берёзовки было проведено три ядерных взрыва, однако затем проект создания канала при помощи ядерных взрывов был заброшен."
     },
                    {
        "name": "Берека ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D1%80%D0%B5%D0%BA%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "102 км",
        "pool": "2680 км²",
        "consumption": "2,44 м³/с",
        "head": " ",
        "estuary": "Северский Донец",
        "location": " Украина",
        "info": "Бере́ка (укр. Берека) — река в Харьковской области Украины, правый приток реки Северский Донец.Высота устья — 64 м над уровнем моря.[источник не указан 507 дней]На правом берегу реки Береки (место впадения канала «Днепр-Донбасс» в Северский Донец) в устье балки Долгий Яр (между селом Большая Камышеваха и хутором Малая Гаражовка расположено местонахождение различных по возрасту флор верхнего триаса — поздненорийской (протопивская свита) и рэтской (новорайская свита).Длина реки составляет 102 км, площадь водосборного бассейна — 2680 км². Исток реки расположен у села Берека Первомайского района Харьковской области..Расход воды в 12 км от устья составляет 2,44 м³/сек. Река Берека впадает в Северский Донец в 634 км от его устья. Наклон реки 0,78 м/км.С 1982 года последние километры реки используются каналом Днепр — Донбасс, который соединяет Днепр и Северский Донец.Основные притоки: Кисель, Лозовенька — левые, Бритай и Великая Камышеваха — правые."
     },
     {
        "name": "Бёрёлёх",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%91%D1%80%D1%91%D0%BB%D1%91%D1%85",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Indigirka.png/250px-Indigirka.png",
        "length": "754 км",
        "pool": "17 000 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Русско-Устьинская",
        "location": " Россия",
        "info": "Бёрёлё́х (в нижнем течении также Елонь; якут. Бөрөлөөх) — река в Республике Саха (Якутия), левый приток протоки Русско-Устьинская (рукав Индигирки). Длина реки — 754 км, площадь водосборного бассейна — 17 000 км².Название в переводе с якутского языка «Бөрөлөөх» — «изобилующая волками».Истоки реки находятся к северу от Полоусного кряжа. По одним данным истоки реки образуется слиянием рек Чамага-Окатын и Кемелькан-Окат, по другим данным образуется при слиянии рек Обдёка и Нелён. Течёт по Яно-Индигирской низменности. Главные притоки: Уэсе-Кыллах — слева; Улахан-Кыллах (Тиит), Селганнах и Ары-Мае — справа.В её бассейне свыше 9 тысяч озёр общей площадью 1610 км², озёрность 9,5 %. Питание снеговое, дождевое и налёдное. Паводки в июле — августе. Зимой промерзает до дна.По данным государственного водного реестра России входит в Ленский бассейновый округ.В ходе раскопок кладбища мамонтов на берегу реки Бёрёлёх были найдены более 1500 фрагментов останков около 140 мамонтов разного возраста, живших 14—12 тыс. лет назад, накопившихся в обнажившихся береговых отложениях. У 42 % образцов шерстистых мамонтов, обнаруженных в древней старице реки Бёрёлёх, присутствуют признаки остеодистрофии — заболевания скелетной системы, вызванного нарушениями обмена веществ из-за недостатка или избытка жизненно важных макро- и микроэлементов (минеральным голоданием). По мнению ученых, это было вызвано потеплением и повышением влажности климата, вызвавшем геохимическое окисление (растворение) минералов в окружающей среде в этот период. Мамонты приходили на обрывистые берега реки есть глину, чтобы восполнить недостаток минералов, кормиться более богатой прибрежной растительностью. Участок речной долины был естественной природной ловушкой для мамонтов, которые погибали здесь не в одночасье, а на протяжении нескольких тысяч лет, застревая в болотистом грунте, проваливаясь в термокарстовые проталины в вечной мерзлоте. Также найдены единичные кости других животных мамонтовой фауны: шерстистого носорога, дикой лошади, бизонов. Паводками размывало их останки и приносило в излучину древней старицы, где они накапливались в слоях береговых отложений."
     },
     {
        "name": "Бёрёлёх (приток Аян-Юряха)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%91%D1%80%D1%91%D0%BB%D1%91%D1%85_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%90%D1%8F%D0%BD-%D0%AE%D1%80%D1%8F%D1%85%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Berelekh_reka.jpg/250px-Berelekh_reka.jpg",
        "length": "239 км",
        "pool": "9810 км²",
        "consumption": "315 м³/с (средний максимальный)",
        "head": " ",
        "estuary": "Аян-Юрях",
        "location": " Россия",
        "info": "Бёрёлёх (Берелёх, от якут. Бөрөлөөх, в переводе волчий) — река в Сусуманском районе Магаданской области, левый приток Аян-Юряха. Длина реки — 239 км, площадь водосборного бассейна — 9810 км², средний максимальный расход воды 315 м³/сек.Берёт начало от северной оконечности хребта Охандя (один из отрогов хребта Черского). Является левым притоком реки Аян-Юрях. Ледостав с середины октября до конца мая с образованием многочисленных наледей, зимой местами промерзает до дна. По этой причине в среднем 150 дней в году вообще не имеет стока.На берегу реки Берелёх расположен город Сусуман и посёлки: Новый, Беличан, Широкий, Ударник, Буркандья, Берелёх (пригород Сусумана).Высота истока — 1450 м над уровнем моря.[источник не указан 862 дня] Высота устья — 545 м над уровнем моря.[источник не указан 862 дня]Название «Берелёх» образовалось от якутского слова «бөрөлөөх», что означает «волчья». До того, как территория долины реки была освоена геологами, на ней водилось немало волков.Название реки Берелёх впервые нанесено на карту Генерального штаба России в 1891 году И. Д. Черским, который в своём предварительном отчёте за 1891 год писал: «На эту карту, пользуясь расспросными сведениями, я нанёс множество притоков реки Индигирки и верхнего течения реки Колымы, о существовании и последовательности которых до сих пор мы вовсе ещё ничего не знали…»."
     },
           {
        "name": "Береш ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D1%80%D0%B5%D1%88_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "115 км",
        "pool": "2260 км²",
        "consumption": "8,6 м³/с (10 км от устья)",
        "head": " ",
        "estuary": "Урюп",
        "location": " Россия",
        "info": "Береш или Берешь — река в России, правый приток Урюпа (бассейн Оби), течёт в Шарыповском районе Красноярского края и Орджоникидзевском районе Хакасии.Длина — 115 км. Площадь водосборного бассейна — 2260 км². Впадает в Урюп в 74 км от её устья между Дубинино и Никольском (на территории кадастрового квартала — 24:41:0301002).Высота над уровнем моря (урез воды) — 343 м (при впадении реки Парнушка; севернее деревни Усть-Парная в Холмогорском сельсовете), 653 м (при впадении притока Сухой Береш; между горам Медвежья (1088 м) и Вершина Береш и источником Конная База в МО Посёлок Копьёво Орджоникидзевского района).Населённые пункты на реке (от истока до устья): деревня Линёво, деревня Усть-Парная, село Холмогорское, село Береш (Холмогорский сельсовет); село Дубинино, пгт Дубинино (городской округ «Город Шарыпово»). На территории Хакасии на берегу реки Берешь нет ни одного населённого пункта.На территории Хакасии река Берешь протекает через смешанный хвойно-лиственный лес, преимущественно представленный лиственницей и берёзой. На территории Красноярского края — не лесную местность, только при впадении в Урюп расположен небольшой лесной массив.На реке расположено Берёзовское водохранилище и Берёзовская ГРЭС у города Шарыпово и пгт Дубинино. Западнее русла Берешь и южнее Берёзовского водохранилища расположены среднепроходимые болота с луговой растительностью и низкорослым лесом."
     },
     {
        "name": "Берзава",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D1%80%D0%B7%D0%B0%D0%B2%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Brzava_river_near_Konak%2C_Serbia.jpg/250px-Brzava_river_near_Konak%2C_Serbia.jpg",
        "length": "158 км",
        "pool": "1159,2 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Тимиш",
        "location": " Румыния,  Сербия",
        "info": "Берзава (Бырзава; рум. Râul Bârzava, серб. Брзава), — река в Румынии и Сербии. Длина реки 158 километров, из них 111 протекает через Румынию и 47 — через Сербию. Площадь водосборного бассейна — 1159,2 км².Берёт начало в горах Семеник, в жудеце Караш-Северин. В верховьях течёт по восточной и северной границе гор Аниней. Протекает через озёра Валюг, Бреазова и Секу. Вблизи истока течёт среди гранитных и сланцевых горных массивов, затем — через сложенную песчаниками и глинами местность. Местность в верховьях реки покрыта буковыми лесами. Нижнее течение проходит по равнинной заболоченной местности, канализировано. Впадает в реку Тамиш в Воеводине, южнее Ботоша.Основные притоки в верховьях — ручей Крайникулуй (лв), Гропосу (пр), Альб (лв), все они имеют расход воды около 30 л/с. Уже на равнине принимает воды Моравицы, Копачи, Москодину, Боруги (всех — слева).На реке стоят города Решица, Бокша-Васиовей, Бокша-Ромынэ, Гэтая."
     },
     {
        "name": "Берзе ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D1%80%D0%B7%D0%B5_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/B%C4%93rze_pie_Anneniekiem.jpg/250px-B%C4%93rze_pie_Anneniekiem.jpg",
        "length": "109 км",
        "pool": "903,9 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Свете",
        "location": " Латвия",
        "info": "Бе́рзе также Бе́рзупе — река в Латвии, приток Свете. Длина — 109 км.Протекает по территории Добельского и Елгавского краёв. Берёт начало на Лиелауцских холмах в южной части Восточно Курземской возвышенности. В верхнем течении петляет меж холмов. Берега постоянные, поросшие лесом. Несколько выше посёлка Биксты, в Берзе впадает протока из озера Зебрус — Зушупите. Возле Аннениеки находится малая ГЭС и её водохранилище. В XIX в. был прорыт канал, отводящий воды Берзупе в реку Свете. До того Берзе впадала в реку Лиелупе возле Калнциемса. Старица носит название Вецберзе. В низовье Вецберзе расположен Вецберзский польдер — сельскохозяйственная территория национального значения.Крупнейшие притоки: Бикступе, Сесава, Алаве, Личупе, Гардене."
     },
      {
        "name": "Беркель",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D1%80%D0%BA%D0%B5%D0%BB%D1%8C",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Berkel.jpg/250px-Berkel.jpg",
        "length": "114,6 км",
        "pool": "849 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Эйссел",
        "location": "",
        "info": "Беркель (нем. Berkel), или Беркел (нидерл. Berkel) — река в Германии и Нидерландах. Правый приток реки Эйссел.Берёт начало у немецкого города Биллербек. Течёт на северо-запад, пересекает нидерландскую границу. Впадает в Эйссел в центральной части города Зютфен. Длина реки составляет 114,6 км, площадь водосборного бассейна — 849 км². Высота истока составляет 131 м."
     },
            {
        "name": "Бернт-Ривер (приток Снейка)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D1%80%D0%BD%D1%82-%D0%A0%D0%B8%D0%B2%D0%B5%D1%80_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A1%D0%BD%D0%B5%D0%B9%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Burnt_River_dam.jpg/250px-Burnt_River_dam.jpg",
        "length": "158 км",
        "pool": "2823 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Снейк",
        "location": " США",
        "info": "Бернт-Ривер (англ. Burnt River) — река на востоке штата Орегон, США. Левый приток реки Снейк, которая в свою очередь является притоком реки Колумбия. Длина составляет 158 км; площадь водосборного бассейна — 2823 км².Берёт начало из водохранилища Юнити, которое находится в районе гор Блу-Маунтинс, к востоку от национального леса Уаллауа-Уайтмен, к северу от города Юнити.Течёт главным образом в восточном направлении. Протекает через населённые пункты Херфорд, Бриджпорт, Дерки, Уэтерби, Дикси и Лайм. Впадает в реку Снейк вблизи города Хантингтон, примерно в 526 км от впадения реки Снейк в Колумбию. Высота устья — 632 м над уровнем моря.[источник не указан 996 дней]"
     },
     {
        "name": "Бероунка",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D1%80%D0%BE%D1%83%D0%BD%D0%BA%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Berounka.jpg/250px-Berounka.jpg",
        "length": "139,45 км",
        "pool": "8854,22 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Влтава",
        "location": " Чехия",
        "info": "Бероунка (чеш. Berounka) — река на западе Чехии, левый, самый большой приток Влтавы. Длина реки — 139,45 км, площадь водосборного бассейна — 8854,22 км².На реке расположены города Пльзень, Бероун, Ржевнице, Добржиховице и Черношице.Бероунка образуется у города Пльзень слиянием рек Мже и Радбуза, текущих с хребтов Чешский Лес и Шумава, и впадает во Влтаву в 8 км южнее Праги.Один из притоков, — река Лоденице.С 2013 года, в соответствии с нормативными актами, Бероунка начинается от слияния Мже и Радбузы в центре Пльзеня. Инициативная группа историков в 2006 году выступала за переименование обратно в Мже как это было до XVII века, но инициатива была отвергнута голосованием."
     },
          {
        "name": "Берч-Крик",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D1%80%D1%87-%D0%9A%D1%80%D0%B8%D0%BA",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Rain_on_Birch_Creek.JPG/250px-Rain_on_Birch_Creek.JPG",
        "length": "241 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Юкон",
        "location": " США",
        "info": "Берч-Крик (англ. Birch Creek) — река на северо-востоке штата Аляска, США. Приток реки Юкон. Длина реки составляет 241 км.Берёт начало при слиянии ручьёв Птармиган и Игл и течёт сперва на юго-запад и юг вдоль шоссе Стизи. Поворачивает на восток, а затем на север и входит на территорию национального резервата дикой природы Юкон-Флэтс. В нижнем течении поворачивает на северо-запад и разделяется на 2 отдельных рукава (Лауэр-Маут и Аппер-Маут) недалеко от деревни Берч-Крик. Место разделения реки на рукава можно рассматривать как её устье. Оба рукава впадают в Юкон в разных местах ниже города Форт-Юкон.Рукав Аппер-Маут составляет 56 км в длину и впадает в Юкон в 40 км у юго-западу (ниже по течению) от города Форт-Юкон. Координаты устья Аппер-Маут: 66°31′15″ с. ш. 146°09′09″ з. д.HGЯO. Рукав Лауэр-Маут составляет 80 км в длину и впадает в протоку Юкона в 63 км к юго-западу от Форт-Юкона. Эта протока реки Юкон течёт примерно параллельно основному руслу на протяжении 24 км. Координаты устья Лауэр-Маут: 66°26′46″ с. ш. 146°38′18″ з. д.HGЯO.Первыми людьми, проживающими в регионе, были, вероятно, кучины, которые рыбачили и охотились вдоль реки. В 1893 году на реке было найдено золото. Результатом притока большого количества старателей стало основание города Серкл. Старые избы трапперов и шахтёров являются частью пейзажа Берч-Крика и сегодня; золотодобыча продолжается даже в XXI веке. Современное название реке дали торговцы из Компании Гудзонова залива в середине 1800-х годов."
     },
      {
        "name": "Беседь",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D1%81%D0%B5%D0%B4%D1%8C",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/VetkaRaion2.JPG/250px-VetkaRaion2.JPG",
        "length": "261 км",
        "pool": "5600 км²",
        "consumption": "26,1 м³/с (Светиловичи)",
        "head": " ",
        "estuary": "Сож",
        "location": "",
        "info": "Бе́се́дь (белор. Бе́седзь) — река в России и Белоруссии, левый приток реки Сож (приток Днепра). Длина реки — 261 км, площадь водосборного бассейна — 5600 км². Среднегодовой расход воды Светиловичах — 26,1 м³/с.Река Беседь берёт начало на юге Смоленской области, далее протекает по Могилёвской области Белоруссии (в бассейне реки расположен посёлок Хотимск и город Костюковичи), пересекает западную часть Брянской области России (посёлок Красная Гора в 98 км от устья — начало судоходной части реки), а затем вновь течёт по Белоруссии (Гомельская область), впадая в Сож в 147 км от устья на высоте между 117,4 и 118 метрами над уровнем моря. Общее направление течения с северо-востока на юго-запад.Притоки: Деряжня, Жадунька, Суров, Олешня, Палуж (правые); Ольшовка, Столбунка, Колпита (левые).Название Беседь, по одной из версий, имеет финно-угорское происхождение.По другой версии, название происходит из иранских языков. Гидроним Беседь рассматривается в одном ряду с гидронимами Бестань, Бественка, Обеста, Обиста, Обста, Бастова, Бастовка, Бостя и т. д. Первая часть этих названий (Об-, Обе- и др.) сопоставима с иранским географическим термином об — «вода», «река». Вторая часть (-ста, -стань) восходит к иранскому слову в значениях «стоянка», «стан», «место», которое соответствует, например, современной осетинской корневой основе -стон в сложных словах в значении «широкая область»."
     },
             {
        "name": "Бёсюке",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%91%D1%81%D1%8E%D0%BA%D0%B5",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Lena.svg/250px-Lena.svg.png",
        "length": "152 км",
        "pool": "5780 км²",
        "consumption": "undefined",
        "head": "слияние рек: Мейчан и Сахандя",
        "estuary": "Лена",
        "location": " Россия",
        "info": "Бёсюке (якут. Бөөһүкэ) — река в России, протекает по территории Булунского улуса Якутии. Правый приток Лены, впадает в неё на 296 км от устья. Образуется слиянием рек Мейчан и Сахандя. Длина реки — 152 км (от истока Сахандя — 263 км), площадь водосборного бассейна — 5780 км².Основные притоки (расстояние от устья):"
     },
         {
        "name": "Бехтемир",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D1%85%D1%82%D0%B5%D0%BC%D0%B8%D1%80",
        "image": "undefined",
        "length": "117 км",
        "pool": "665 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Бия",
        "location": " Россия",
        "info": "Бехтемир — река в России, Алтайском крае. Устье реки находится по правому берегу реки Бия в 64 км от устья Бии. Длина реки составляет 117 км, площадь водосборного бассейна 665 км². У истока река называется Левый Бехтемир, после впадения Правого Бехтемира называется просто Бехтемир.По данным государственного водного реестра России относится к Верхнеобскому бассейновому округу, водохозяйственный участок реки — Бия, речной подбассейн реки — Бия и Катунь. Речной бассейн реки — (Верхняя) Обь до впадения Иртыша."
     },
     {
        "name": "Бецибука",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B5%D1%86%D0%B8%D0%B1%D1%83%D0%BA%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Betsiboka.jpg/250px-Betsiboka.jpg",
        "length": "525 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "слияние рек: Дзабу и Ампарихибе",
        "estuary": "Мозамбикский пролив",
        "location": " Мадагаскар",
        "info": "Беци́бука или Бецибу́ка (устар. Бетсибока и Бетзибока; малаг. Betsiboka) — река в северо-западной части острова Мадагаскар. Имеет длину 525 км, является крупнейшей рекой острова. Известна своим красно-коричневым цветом, который объясняется огромным количеством седиментов, вымываемых рекой в море.Бецибука берёт начало в горах центральной части острова, на севере провинции Антананариву. Река образуется при слиянии рек Ампарихибе и Дзабу, затем течёт в северном направлении. Недалеко от населённого пункта Маэватанана Бецибука выходит на равнину и принимает (слева) воды своего крупнейшего притока — реки Икупа. На 40-км участке от этого места до слияния (справа) с рекой Камуру у поселения Амбатубуэни вдоль русла реки расположено большое число небольших озёр. Рядом с населённым пунктом Марувуай Бецибука впадает в бухту Бумбетука Мозамбикского пролива, образуя дельту. На выходе из бухты стоит портовый город Махадзанга.Река судоходна на 130 км от устья, в её низовьях располагаются обширные рисовые поля.Красно-коричневый цвет вод Бецибуки является признаком экологической катастрофы. Масштабные вырубки тропического леса, который являлся естественным покровом острова, значительно ускорили процесс эрозии почвы в северо-западной его части. Освоение земли под пашни и пастбища за последние 50 лет привели к тому, что объём вымываемых почв, большая часть которых — это красные латеритные почвы (имеющие в профиле горизонт латерита), в некоторых районах острова приближается к 250 тоннам на гектар. Это максимальное зафиксированное значение этого показателя во всём мире."
     },
                  {
        "name": "Бзура",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B7%D1%83%D1%80%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Kozlow_Biskupi_Bzura01.jpg/250px-Kozlow_Biskupi_Bzura01.jpg",
        "length": "166 км",
        "pool": "7788 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Висла",
        "location": " Польша",
        "info": "Бзура (польск. Bzura) — река в Польше, левый приток Вислы. Длина реки — 166 км; площадь бассейна 7788 км².Река Бзура берёт начало в окрестностях Згежа. Ширина Бзуры не превышает шестидесяти метров, глубина реки колеблется от полуметра до двух метров."
     },
     {
        "name": "Бзыбь",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B7%D1%8B%D0%B1%D1%8C",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Bzyb_River_P_G.jpg/250px-Bzyb_River_P_G.jpg",
        "length": "110 км",
        "pool": "1510 км²",
        "consumption": "97 м³/с",
        "head": " ",
        "estuary": "Чёрное море",
        "location": " Абхазия/ Грузия",
        "info": "Бзыбь, Бзып (абх. Бзыԥ , груз. ბზიფი , черк. Псыбэ (полноводная); ранее — Бзипи, устаревшее — груз. კაპოეტისწყალი ) — река в Абхазии, берёт начало в горах Западного Кавказа на высоте 2300 м. Собирает воды с южных склонов Главного Кавказского (Водораздельного) хребта, а также с расположенных южнее второстепенных хребтов — Гагрского, Бзыбского, Анчха и других. В районе слияния рек Бзыбь и Гега находится Гегское ущелье, окруженное с двух сторон горами. Недалеко от устья Бзыбь выходит на равнину и двумя рукавами впадает в Чёрное море. В устье реки Бзыбь расположено одноимённое село.Длина 110 км, она не пригодна для судоходства, площадь бассейна 1510 км². Несмотря на небольшую площадь бассейна, очень полноводна, поскольку для Западного Закавказья характерен крайне высокий уровень осадков. Средний годовой расход воды в точке выхода из ущелья 97 м³/с. Река течёт в узком ущелье, что объясняет значительные сезонные колебания уровня воды — до 10—15 м.В большом количестве водятся форель и черноморский лосось.В верховьях реки Юпшары, принадлежащей бассейну Бзыби, расположено знаменитое высокогорное озеро Рица. К озеру от побережья Чёрного моря идёт автомобильная дорога, частично проходящая по долине Бзыби."
     },
       {
        "name": "Биа",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D0%B0",
        "image": "undefined",
        "length": "300 км",
        "pool": "9300 км²",
        "consumption": "83 м³/с",
        "head": " ",
        "estuary": "Гвинейский залив",
        "location": " Гана,  Кот-д’Ивуар",
        "info": "Биа (англ. Bia, фр. Bia) — река в Западной Африке.Длина реки составляет 300 (или 260) километров, площадь бассейна — 9300 км². Средний расход воды — 83 м³/с.Река берёт начало в Гане, в 40 километрах к западу от города Суньяни. На территории Кот-д’Ивуара река течёт с севера на юг; она впадает в лагуну Аби Атлантического океана. Имеет ряд притоков. Возле города Аяме на реке построены две гидроэлектростанции — Аяме-I (год постройки 1959) и Аяме-II (1965), которые снабжают электроэнергией город Абиджан и юго-восток Кот-д’Ивуара.На реке расположен одноимённый национальный парк и биосферный резерват."
     },
     {
        "name": "Биас ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D0%B0%D1%81_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Beasriverhp.jpg/250px-Beasriverhp.jpg",
        "length": "470 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Сатледж",
        "location": " Индия",
        "info": "Биа́с (хинди ब्यास, Бьяс; в.-пандж. ਬਿਆਸ; урду بیاس; санскр. विपाशा; англ. Beas) — вторая по важности река в Пенджабе, приток Сатледжа; одна из пяти рек, по которым Пенджаб («Пятиречье») получил своё название. Вместе с другими шестью реками (Сарасвати, Синдху, Шатадру, Витаста, Парушни, Асикни), составляет ведийское Семиречье. Река истекает из Гималаев в центральном Химачал-Прадеше, Индия, течёт 470 км до Сатледжа и сливается с ним в Индийском Пенджабе.Реку также называют Арджикуджа — в Ведах или Випаша в древнеиндийских текстах и Гифасис у древних греков.Современное имя Биас вероятно произошло от изменения санскритского названия Випаш. Река получила своё имя Ви-паша, от освободившая связанного или от пут (паша в санскрите), то есть легенда связывает её с Васиштхой. Васиштха, оплакивая смерть 100 сыновей, связал себя и прыгнул в эту реку. Но как только он упал в реку, все узлы сами развязались, и он не умер. Реку также иногда называют Випаша в Химачале, особенно учёные.Реку неверно называли Вьяса (перемена Б и В и усечение окончаний характерно для североиндийских языков) в память о ведийском Вьясе, которого называют покровителем реки и говорят, что он создал её из озера Вьяс Кунд."
     },
              {
        "name": "Бивер-Крик (приток Юкона)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D0%B2%D0%B5%D1%80-%D0%9A%D1%80%D0%B8%D0%BA_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%AE%D0%BA%D0%BE%D0%BD%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Beaver_Creek_Yukon_Flats_1.jpg/250px-Beaver_Creek_Yukon_Flats_1.jpg",
        "length": "290 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "слияние рек: Чемпион и Бэр",
        "estuary": "Юкон",
        "location": " США",
        "info": "Бивер-Крик (англ. Beaver Creek) — приток реки Юкон на Аляске (США), протяжённостью 290 км.Река берёт начало в месте слияния рек Чемпион и Бэр в национальной зоне отдыха Уайт-Маунтинс, что примерно в 80 км к северу от Фэрбенкса. Далее река течёт на запад по южной границе Уайт-Маунтинс, затем на северо-восток в национальный резерват дикой природы Юкон-Флэтс, а оттуда далее на запад до места впадения в Юкон к югу от города Бивер.В 1980 году часть реки Бивер-Крик вошла в состав «Национальных диких и живописных речных систем». Большая часть Бивер-Крик расположена в зоне отдыха, однако последние 26 км относятся к Юкон-Флэтс.Бивер-Крик течёт через густой еловый и берёзовый лес и тундру на высоких склонах Уайт-Маунтинс, где известняковые пики достигают высоты 968 метровСамый распространённый способ посетить нижний Бивер-Крик — плыть вверх по течению, хотя возможна также посадка маленького самолёта. На верхний Бивер-Крик можно попасть через Ном-Крик, впадающий в реку. До Ном-Крик можно добраться по шоссе. Если позволяет уровень воды, то до Бивер-Крик можно добраться на лодках вверх по течению от реки Юкон.По международной шкале речной трудности реке был присвоен I класс, однако упавшие деревья, пни, и бревна представляют опасность для лодочников."
     },
     {
        "name": "Биверхед ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D0%B2%D0%B5%D1%80%D1%85%D0%B5%D0%B4_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Beaverhead_River_near_Twin_Bridges_January_2015_03.JPG/250px-Beaverhead_River_near_Twin_Bridges_January_2015_03.JPG",
        "length": "111 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "Кларк-Каньон",
        "estuary": "Джефферсон",
        "location": " США",
        "info": "Би́верхед (Бивер-Хэд; англ. Beaverhead River) — река в Монтане на Западе США. Правая составляющая Джефферсон. Длина реки — 111 км (69 миль). Протекает в юго-западной части штата, по территории округов Биверхед и Мадисон. Ранее Биверхед начиналась от слияния рек Хорс-Прэри и Ред-Рок, ныне вытекает из ирригационного водохранилища Кларк-Каньон на высоте 1689 м над уровнем моря, построенного в 1964 году. Генеральным направлением течения является северо-восток. Около населённого пункта Туин-Бриджес сливается с Биг-Хол на высоте 1405 м над уровнем моря, образуя реку Джефферсон."
     },
     {
        "name": "Биг-Блу-Ривер",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D0%B3-%D0%91%D0%BB%D1%83-%D0%A0%D0%B8%D0%B2%D0%B5%D1%80",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Big_Blue_River_%28Kansas%29.JPG/250px-Big_Blue_River_%28Kansas%29.JPG",
        "length": "578 км",
        "pool": "25 110 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Канзас",
        "location": " США",
        "info": "Би́г-Блу́-Ри́вер (англ. Big Blue River) — река в США, протекающая из центральной части штата Небраска в северную часть штата Канзас. Является крупнейшим притоком реки Канзас. Протяжённость реки составляет около 578 км; площадь водосборного бассейна — 25 110 км².Своё название река получила от племени Канза, жившего в её устье с 1780 по 1830 год и назвавшего её «Великой Рекой Голубой Земли».Река проходит в основном через сельскохозяйственные угодья. Наиболее крупные города на пути реки, помимо Манхаттана, это Сьюард, Крит и Биатрис. За несколько километров до впадения в реку Канзас, Биг-Блу-Ривер протекает через водохранилище Татл-Крик, северо-восточнее Манхаттана. Водохранилище создано для защиты от наводнений, его берега построены из известняка, ила и гипса. Земля, окружающая водохранилище, является территорией государственного парка, сильно пострадавшим в наводнение 1993 года."
     },
     {
        "name": "Биг-Вуд",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D0%B3-%D0%92%D1%83%D0%B4",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Outside_of_Ketchum%2C_Idaho.jpg/250px-Outside_of_Ketchum%2C_Idaho.jpg",
        "length": "220 км",
        "pool": "undefined",
        "consumption": "13,14 м³/с",
        "head": " ",
        "estuary": "Малад",
        "location": " США",
        "info": "Биг-Вуд (англ. Big Wood River) — река на юге центральной части штата Айдахо, США. Является наряду с рекой Литл-Вуд одной из двух составляющих реки Малад, которая в свою очередь является притоком реки Снейк. Длина составляет около 220 км. Средний расход воды — 13,14 м³/с.Протекает через города Сан-Валли и Кетчум, где принимает такие притоки как Ворм-Спрингс и Трэйл. Ниже города Кетчум в Биг-Вуд впадает Ист-Форк, затем река протекает дальше через города Хэйли и Беллевю. Продолжая течь в южном направлении, река впадает в водохранилище Мэджик, где принимает приток Камас. После выхода из водохранилища река протекает через округа Линкольн и Гудинг. К западу от города Гудинг Биг-Вуд соединяется с рекой Литл-Вуд, формируя реку Малад.На реке и её притоках имеется множество водохранилищ и каналов, которые используются для орошения."
     },
     {
        "name": "Биг-Мадди",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D0%B3-%D0%9C%D0%B0%D0%B4%D0%B4%D0%B8",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Aerial_of_Jameson_Island_in_the_Big_Muddy%2C_view_looking_south.jpg/250px-Aerial_of_Jameson_Island_in_the_Big_Muddy%2C_view_looking_south.jpg",
        "length": "251 км",
        "pool": "6071 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Миссисипи",
        "location": " США",
        "info": "Биг-Мадди (англ. Big Muddy) — река в США, на юге штата Иллинойс. Длина — 251 км, площадь бассейна — 6071 км². На большей части своей длины река имеет илистое дно. Возле деревни Бентон в 1973 году Инженерными войсками США построена плотина, в результате чего образовалось озеро Ренд.По пробам 1995 года качество воды в реке оценивалось от «чистой» до «хорошей». Основными источниками загрязнения служило сельское хозяйство, разработка месторождений полезных ископаемых и расположенные на реке города.Биг-Мадди впадает в реку Миссисипи в округе Джэксон вблизи экологической зоны Ла Ру-Пайн-Хиллз.Бассейн реки содержит один из самых значительных запасов угля в мире. Его бо́льшая часть скрывается под глубоким слоем грязи. Предположительно, именно на реке Биг-Мадди была создана первая угольная шахта штата Иллинойс, открытая в 1810 году в округе Джэксон.Населённые пункты, расположенные на реке:Биг-Мадди протекает по округам:"
     },
     {
        "name": "Биг-Су",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D0%B3-%D0%A1%D1%83",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Sioux_Falls-waterfall.jpeg/250px-Sioux_Falls-waterfall.jpeg",
        "length": "674 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Миссури",
        "location": " США",
        "info": "Биг-Су, Биг-Сиу (англ. Big Sioux River) — река на востоке штата Южная Дакота и на северо-западе штата Айова, США. Левый приток реки Миссури. Длина составляет 674 км.Берёт начало на территории округа Робертс, в районе плата Кото-де-Прери. Течёт преимущественно в южном направлении, протекая через округа: Грант, Кодингтон, Гамлин, Букингс, Муди и Миннегага. На берегах реки расположены такие населённые пункты как: Уотертаун, Каслвуд, Брюс, Фландру, Иган, Трент, Делл-Рапидс, Балтик и Су-Фолс. В нижнем течении образует границу между штатами Южная Дакота и Айова. Впадает в реку Миссури в районе города Су-Сити. Крупнейший приток — река Рок."
     },
     {
        "name": "Биг-Форк",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D0%B3-%D0%A4%D0%BE%D1%80%D0%BA",
        "image": "undefined",
        "length": "265 км",
        "pool": "5369,96 км²",
        "consumption": "undefined",
        "head": "Дора-Лейк",
        "estuary": "Рейни-Ривер",
        "location": " США",
        "info": "Биг-Форк (англ. Big Fork River, фр. Rivière Grande Fourche; оджибве: Baas-achaabaani-ziibi) — река длиной 265 км в Северной Америке. Площадь бассейна составляет 5369,96 км², он находится в округах Айтаска и Кучичинг штата Миннесоты. Уровень воды в Биг-Форк достигает максимума в конце апреля, падает в летнее время. Между истоком и устьем разница высот — 74 м. Река находится в водосборном бассейне реки Рейни-Ривер и является одним из её главных притоков.Большая часть долины реки Биг-Форк является равнинной, так как ранее на её месте находилось ледниковое озеро Агассис. Однако, на реке есть два водопада — Биг-Фоллс и Литтл-Американ-Фоллс. В силу озёрного происхождения большая часть долины имеет залежи торфа толщиной до 5 м. В начале XX века местность тщетно пытались засадить и приспособить для сельскохозяйственных нужд. В долине преобладают лесные виды верховых болот — чёрная ель, пихта, кедр, американская лиственница, на возвышенностях встречаются осины, берёзы и сосны. Основными видами землепользования являются лесное хозяйство и туризм. В Биг-Фолсе до 1971 года работала гидроэлектростанция. В лесу расположены небольшие фермы, индустриальными центрами являются города Бигфорк и Биг-Фолс."
     },
     {
        "name": "Биг-Хол ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D0%B3-%D0%A5%D0%BE%D0%BB_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/BigHoleRiverNearTwinBridgesOctober.jpg/250px-BigHoleRiverNearTwinBridgesOctober.jpg",
        "length": "246 км",
        "pool": "7300 км²",
        "consumption": "undefined",
        "head": "Скиннер",
        "estuary": "Джефферсон",
        "location": " США",
        "info": "Биг-Хол (Биг-Холль, Уиздом; англ. Big Hole River, Sensable River, Wisdom River) — река в Монтане на Западе США. Левая составляющая Джефферсон. Длина реки — 246 км (153 мили). Протекает в юго-западной части штата, по территории округов Мадисон, Биверхед, Силвер-Боу и Дир-Лодж. Площадь водосборного бассейна — 7300 км² (2800 миль²).Биг-Хол начинается в горах Биверхед, вытекая из озера Скиннер на высоте 2247 м над уровнем моря. От истока течёт преимущественно на север, далее огибает горы Пайонир и после горы Мак-Картни поворачивает на северо-восток. Севернее населённого пункта Туин-Бриджес сливается с Биверхед на высоте 1405 м над уровнем моря, образуя реку Джефферсон."
     },
       {
        "name": "Бигхорн ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D0%B3%D1%85%D0%BE%D1%80%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Bighorn_River.jpg/250px-Bighorn_River.jpg",
        "length": "742 км",
        "pool": "56 000 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Йеллоустон",
        "location": " США",
        "info": "Би́гхорн (Биг-Хорн, Биг-Горн-Ривер; англ. Bighorn River) — река на северо-западе штата Вайоминг и юге штата Монтана, США. Правый и крупнейший приток реки Йеллоустон, которая в свою очередь является притоком Миссури. Длина реки составляет 742 км (461 миля); площадь бассейна — 56 тысяч км². Расход воды — 103,2 м³/с.[источник не указан 110 дней]В верховьях известна как Уинд (Винд-Ривер). В среднем течении, на юге штата Монтана, имеется водохранилище Бигхорн. Наиболее значительные притоки: Шошони и Грейбулл (левые); Литтл-Бигхорн и Наувуд (правые).[источник не указан 110 дней]"
     },
      {
        "name": "Биджан",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D0%B4%D0%B6%D0%B0%D0%BD",
        "image": "undefined",
        "length": "274 км",
        "pool": "7940 км²",
        "consumption": "undefined",
        "head": "слияние рек: Левый Биджан и Правый Биджан",
        "estuary": "Амур",
        "location": " Россия",
        "info": "Биджа́н — средняя река в Еврейской автономной области России, левый приток Амура.Длина реки (от слияния Левого и Правого Биджана) — 274 км, ширина — 30—60 м, глубина — 1,5—7 м, площадь бассейна — 9580 км². Высота устья — 51,5 м над уровнем моря.[источник не указан 831 день] Площадь водосборного бассейна — 7940 км².[источник не указан 831 день]Берёт начало в Малом Хинганском хребте, образуется слиянием рек Правый Биджан и Левый Биджан, течёт с севера на юг. Его притоками являются реки Унгун, Буркали и другие мелкие речки, используемые для передвижения на лодках и небольших моторках. Мелкие реки, такие как Листвянка, преимущественно имеют горный характер. Река Биджан относится к нерестовым. В верховьях расположен старейший в России рыборазводный завод — «Биджанский».Самый большой подъём реки Биджан был зафиксирован в конце июля 1932 году — уровень реки был почти на 3 метра выше сложившийся нормы.Сверху вниз:"
     },
      {
        "name": "Биже ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D0%B6%D0%B5_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%B8%D0%B6%D0%B5.jpg/250px-%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%B8%D0%B6%D0%B5.jpg",
        "length": "177 км",
        "pool": "5500 км²",
        "consumption": "2,49 м³/с (около аула Айдар)",
        "head": "слияние рек: Кугалы и Байтерек",
        "estuary": "Каратал",
        "location": " Казахстан",
        "info": "Биже (Быжы) — река в Казахстане, протекает по территории Кербулакского и Коксуского районов Алматинской области. Левый приток Каратала.Река Биже - второй по величине приток реки Каратал, образуется у села Карымсак слиянием рек Когалы (правая составляющая) и Байтерек (левая составляющая). Эти реки в свою очередь берут начало на северо-западном склоне хребта Алтынэмель на высоте около 2000 м. Весь водосбор реки расположен в западных низкогорных отрогах Джунгарского Алатау. В отличие от горных рек, река Биже уже в истоках имеет широкую неясно выраженную долину и пойму шириной до 700 м. От истока река Биже течёт на северо-запад, ниже села Кызылтоган поворачивает на север. В среднем течении при пересечении рекой невысоких гор и холмов долина и пойма сужаются, но при выходе на равнину долина вновь расширяется и склоны её сливаются с окружающей местностью. Впадает в Каратал севернее села Канабек. Длина реки составляет 177 км (вместе с крупнейшим из истоков), площадь водосбора — 5500 км². Среднегодовой расход воды 2,49 м³/с (около аула Айдар).При написании этой статьи использовался материал из издания «Казахстан. Национальная энциклопедия» (1998—2007), предоставленного редакцией «Қазақ энциклопедиясы» по лицензии Creative Commons BY-SA 3.0 Unported."
     },
               {
        "name": "Бикин ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D0%BA%D0%B8%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/%D0%91%D0%B8%D0%BA%D0%B8%D0%BD%2C_%D0%B2%D0%B5%D1%80%D1%85%D0%BE%D0%B2%D1%8C%D1%8F.jpg/250px-%D0%91%D0%B8%D0%BA%D0%B8%D0%BD%2C_%D0%B2%D0%B5%D1%80%D1%85%D0%BE%D0%B2%D1%8C%D1%8F.jpg",
        "length": "560 км",
        "pool": "22 300 км²",
        "consumption": "247 м³/с (станция Звеньевая)",
        "head": " ",
        "estuary": "Уссури",
        "location": " Россия",
        "info": "Бики́н — река на Дальнем Востоке России в Приморском и Хабаровском краях, правый приток Уссури. Длина реки — 560 км, площадь бассейна — 22,3 тыс. км², общее падение реки — 1334 м, средний уклон — 2,4 ‰. Средний расход воды у станции Звеньевая — 247 м³/с.Берёт начало на северных склонах хребта Каменного в центральной части Сихотэ-Алиня. В верховьях течёт в северном направлении, после впадения реки Левый Бикин поворачивает на восток, после впадения реки Малый Бикин течёт в южном направлении, до впадения реки Зевы меняет направление на западное, после впадения реки Сахалинки течёт на северо-запад. В 20 километрах от устья стоит город Бикин. У села Васильевка впадает в реку Уссури справа, на 214 км от её устья.Долина реки Бикин в 2018 году внесена в Список Всемирного наследия ЮНЕСКО.Исторически берега Бикина были заселены удэгейцами. «Бикин» с удэгейского означает «река, текущая между гор, богатая рыбой, а прибрежные горы — зверем». Есть и другая версия — «Бикин — это старший брат, а многочисленные притоки — это сёстры». В среднем течении реки расположено национальное село Красный Яр, населённое представителями этой народности.(расстояния от устья)Основные притоки Бикина: Алчан, Ключевая, Зева."
     },
        {
        "name": "Билир (приток Алдана)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D0%BB%D0%B8%D1%80_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%90%D0%BB%D0%B4%D0%B0%D0%BD%D0%B0)",
        "image": "undefined",
        "length": "230 км",
        "pool": "3420 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Алдан",
        "location": " Россия",
        "info": "Билир (Аргытар) — река на Дальнем Востоке России, протекает в пределах Якутии. Левый приток Алдана (бассейн Лены). Длина — 230 км, площадь водосборного бассейна — 3420 км². Код водного объекта — 18030600412117300021174."
     },
           {
        "name": "Бира (приток Амура)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D1%80%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%90%D0%BC%D1%83%D1%80%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bira.JPG/250px-Bira.JPG",
        "length": "261 км",
        "pool": "9580 км²",
        "consumption": "undefined",
        "head": "слияние рек: Сутара и Кульдур",
        "estuary": "Амур",
        "location": " Россия",
        "info": "Бира́ (также Большая Бира, название происходит, по-видимому, от эвенкийского бира — река) — средняя река в Еврейской автономной области России, левый приток Амура.Длина реки — 261 км, площадь бассейна — 9580 км². Средний расход воды — 125 м³/с. Образуется слиянием рек Сутара и Кульдур, стекающих с Сутарского хребта и хребта Малый Хинган. Течёт в основном по низменной равнине. Питание преимущественно дождевое; летом дожди вызывают резкие колебания уровня реки. На реке Бира расположен город Биробиджан, название которого обязано реке своим первым компонентом. Из подрусловых вод Биры осуществляется водозабор для производственных и бытовых нужд города.В верхнем и среднем течении по долине Биры проходит Транссибирская магистраль и автотрасса Чита — Хабаровск, связывающие Дальний Восток России с другими российскими регионами.Осенью в Биру заходит на нерест кета.Сверху вниз:"
     },
       {
        "name": "Биректе",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D1%80%D0%B5%D0%BA%D1%82%D0%B5",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Olenyok.png/250px-Olenyok.png",
        "length": "315 км",
        "pool": "8600 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Оленёк",
        "location": " Россия",
        "info": "Бире́кте или Биректе́ (Бирэктэ) — река в Якутии, левый приток реки Оленёк.Длина 315 км, площадь водосборного бассейна 8600 км².Истоки реки находятся на северной окраине Среднесибирского плоскогорья, течёт на юг; после впадения справа крупнейшего притока — Омонос, поворачивает на север-восток. Питание снеговое и дождевое."
     },
     {
        "name": "Бирма ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D1%80%D0%BC%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "150 км",
        "pool": "2310 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Зея",
        "location": " Россия",
        "info": "Бирма — река в центральной части Амурской области, на севере Зейско-Буреинской равнины, левый приток Зеи. Длина реки — 150 километров, площадь бассейна — 2310 км².Река берёт начало на юго-востоке Мазановского района, на возвышенном участке восточной периферии Зейско-Буреинской равнины, в зоне хвойно-широколиственных лесов, в 27 километрах к востоку от села Маргаритовка. Течёт на запад, по направлению к левому берегу реки Зея, по широкой, заболоченной долине. Русло реки извилистое, течение медленное. В верхнем и среднем течении ширина реки не превышает 50 метров. В нижнем течении река становится менее поворотливой и извилистой, ширина доходит до 100—150 метров.Долина реки заселена, вблизи её берегов расположено более десятка сёл Мазановского района и одно село Серышевского района. Наиболее крупные из них: Красноярово (в 500 метрах к югу от устья), Сапроново, Маргаритовка, Дмитриевка.Предположительно название реки произошло от эвенкийского бирая — «большая река» либо бириями — «река».Объекты перечислены по порядку от устья к истоку."
     },
       {
        "name": "Бирь ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D1%80%D1%8C_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%B8%D1%80%D1%8C.jpg/250px-%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%B8%D1%80%D1%8C.jpg",
        "length": "128 км",
        "pool": "2200 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Белая",
        "location": " Россия",
        "info": "Бирь (башк. Бөрө  слушать) — река в России, протекает по Башкортостану. Правый приток реки Белой (впадает в Белую в 262 км от устья). Длина реки составляет 128 км.Высота устья — 70,4 м над уровнем моря.[источник не указан 1024 дня] Площадь водосборного бассейна — 2200 км².[источник не указан 1024 дня]Исток расположен на Уфимском плато. Русло извилистое, шириной от 5 до 20 метров, глубиной — от 2 до 4 метров. Дно илистое, вода чистая, течение быстрое.Основные притоки (от истока к устью): Бишелап, Казяш, Иняк, Чукуда, Сухояз, Кутькина, Шады, КынгырВ 2010 году в Мишкинском районе началось восстановление существовавшего до 1950-х годов гидроузла.По данным государственного водного реестра России относится к Камскому бассейновому округу, водохозяйственный участок реки — Белая от города Бирск и до устья, речной подбассейн реки — Белая. Речной бассейн реки — Кама.Код объекта в государственном водном реестре — 10010201612111100025407.Согласно «Энциклопедическому лексикону», башкиры и татары эту реку называют «Бире суи», что переводится как «Волчья вода» (тат. Бүре суы, башк. Бүре Һыуы)."
     },
     {
        "name": "Бирюк ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D1%80%D1%8E%D0%BA_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "267 км",
        "pool": "9710 км²",
        "consumption": "23 м³/с (6 км от устья)",
        "head": " ",
        "estuary": "Лена",
        "location": " Россия",
        "info": "Бирюк (якут. Бүүрүк) — река в России, протекает по территории Олёкминского района Якутии, левый приток реки Лены.Длина реки — 267 км, площадь водосборного бассейна — 9710 км². Среднегодовой расход воды — 23 м³/с. Берёт начало на Приленском плато, впадает в Лену в 2160 км от её устья по левому берегу. Крупнейший приток — река Меличан.По данным государственного водного реестра России и геоинформационной системы водохозяйственного районирования территории РФ, подготовленной Федеральным агентством водных ресурсов:"
     },
          {
        "name": "Бирюса ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D1%80%D1%8E%D1%81%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Birjusa.jpg/250px-Birjusa.jpg",
        "length": "1012 км",
        "pool": "55 800 км²",
        "consumption": "349,7 м³/с (200 км от устья)",
        "head": " ",
        "estuary": "Тасеева",
        "location": " Россия",
        "info": "Бирюса́ (Больша́я Бирюса́, О́на, хак. Ыына) — большая река в Восточной Сибири, Россия.Слиянием с рекой Чуной образует Тасееву реку — приток Ангары (бассейн Енисея) — в 116 км от её устья, являясь левой составляющей. Протекает по территории Иркутской области и Красноярского края.Общая протяжённость реки составляет 1012 км, площадь водосборного бассейна — 55 800 км². Ширина в устье — 170 метров, глубина — 4,5 метра, скорость течения — 1,4 м/с.Питание реки снеговое и дождевое, в бассейне около 300 озёр.Берёт начало на склонах Джуглымского хребта в Восточном Саяне. Далее течёт по Среднесибирскому плоскогорью. Река замерзает в ноябре, вскрывается в конце апреля, освобождается ото льда в начале мая.На реке расположен город Бирюсинск.Название происходит от «бирюс» (бирюсы) — группы отуреченного племени на отрогах Саяна.В нижнем течении находятся несколько поселений старообрядцев (Шивера, Луговая, Усть-Кайтым), которые до сих пор ведут отсчёт времени от сотворения мира и поддерживают порядок собственными силами, обходясь без традиционных органов власти.Реке посвящены песни Льва Ошанина и Эдуарда Колмановского «Бирюсинка» («Там, где речка, речка Бирюса, ломая лед, шумит-поет на голоса»), и «Таежный вальс» («Но зато не найти полчаса, чтоб молчала моя Бирюса»)."
     },
      {
        "name": "Бисерть ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D1%81%D0%B5%D1%80%D1%82%D1%8C_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "193 км",
        "pool": "3400 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Уфа",
        "location": " Россия",
        "info": "Бисе́рть — река в России, протекает по Свердловской области. Правый приток Уфы. Длина реки составляет 193 км, площадь водосборного бассейна — 3400 км². На реке расположено Бисертское водохранилище площадью 3,42 км².По данным государственного водного реестра России, река Бисерть относится к Камскому бассейновому округу, водохозяйственный участок реки — Уфа от Нязепетровского гидроузла до Павловского гидроузла, без реки Ай, речной подбассейн реки — Белая. Речной бассейн реки — Кама.Код объекта в государственном водном реестре — 10010201112111100021015."
     },
        {
        "name": "Бистрица (приток Сирета)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D1%81%D1%82%D1%80%D0%B8%D1%86%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A1%D0%B8%D1%80%D0%B5%D1%82%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Bistrita.cristibur.jpg/250px-Bistrita.cristibur.jpg",
        "length": "272 км",
        "pool": "7900 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Сирет",
        "location": " Румыния",
        "info": "Бистрица (рум. Bistriţa, рум. Bistriţa Moldoveană — Бистрица-Молдовяна; устар. Быстрица) — река в Румынии, правый приток Сирета (бассейн Дуная).Длина 272 км, площадь бассейна 7900 км².Берёт начало в массиве Родна (Восточные Карпаты), течёт в горной местности, где участки широких долин перемежаются с ущельями. Течёт через жудецы Сучава, Нямц и Бакэу.На берегах Бистрицы расположены города Ватра Дорней, Биказ, Пьятра-Нямц, Рознов, Бухуши, Бакэу.На реке Бистрица построены дамбы: Topoliceni, Изворул-Мунтелуй, Пынгэраци, Vaduri, Пьятра-Нямц, Reconstrucţia, Racova, Gârleni, Lilieci, Бакэу. Крупнейшая гидроэлектростанция — Биказ-Стежару (ГЭС имени В. И. Ленина), построенная в 1951—1961 гг. Установленная мощность ГЭС Биказ-Стежару 210 тысяч кВт, годовая выработка электроэнергии — 390 млн кВт·ч. Воздвигнутая на реке Бистрица плотина у Извору-Мунтелуй высотой 127 метров образовала водохранилище Биказ длиной 35 километров, площадью зеркала 33 тысяч гектаров и емкостью 1,23 млрд кубических метров. Водохранилище питает каскад из 12 ГЭС, расположенных на реке Бистрице ниже Биказа, общая установленная мощность которых составляет 244 тысяч кВт, а годовое производство электроэнергии — 750 млн кВт·ч. Бистрица используется также для сплава леса и орошения."
     },
          {
        "name": "Битюг ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D1%82%D1%8E%D0%B3_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Bityug1.jpg/250px-Bityug1.jpg",
        "length": "379 км",
        "pool": "8840 км²",
        "consumption": "18,2 м³/с (у г. Боброва)",
        "head": " ",
        "estuary": "Дон",
        "location": " Россия",
        "info": "Битю́г — река в Тамбовской, Липецкой и Воронежской областях России, левый приток Дона.Длина — 379 км, площадь бассейна — 8840 км². Протекает по Окско-Донской равнине. Долина местами заболочена. Правый берег высокий, покрыт лиственными лесами, а левый — низкий, распаханная степь. Питание реки снеговое. Среднегодовой расход воды — 18,2 м³/с. Ледостав с середины декабря по конец марта.На Битюге и его притоках расположены города и посёлки городского типа Новопокровка, Мордово, Эртиль, Анна, Бобров.Река знаменита среди воронежских любителей рыбалки и водного туризма своими красотами и обилием рыбы. Дубовые леса, тростниковые заросли, редкие на этой широте сосновые боры, песчаные пляжи, широкие плёсы и заводи, быстрые, узкие протоки — всё это заметно при плавании по Битюгу. В его водах водятся краснопёрка, плотва, ёрш, голавль, щука, язь, лещ, окунь, карась, линь, налим. Редко встречается сом, судак.Отдельные участки реки являются гидрологическими и ландшафтными памятниками. В Липецкой области в 1998 году участок в районе села Талицкий Чамлык Добринского района объявлен ландшафтным памятником «Верховья реки Битюг». В Воронежской области гидрологическими памятниками являются: участок от села Старый Эртиль до села Щучье. Его длина — 7 км. В начале участка в Битюг впадает река Матреночка, в конце его — река Эртиль. Русло реки на этом участке извилистое, широкие плёсы чередуются с узкими перекатами. Второй участок, объявленный памятником, — вниз от посёлка Анна, слева — река Курлак. Долина реки имеет ширину 3 км. Её склоны покрыты дубравой."
     },
       {
        "name": "Бича (приток Иртыша)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D1%87%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%98%D1%80%D1%82%D1%8B%D1%88%D0%B0)",
        "image": "undefined",
        "length": "160 км",
        "pool": "2630 км²",
        "consumption": "undefined",
        "head": "Имгытское болото",
        "estuary": "Иртыш",
        "location": " Россия",
        "info": "Би́ча (сиб.-тат. Бечей; до слияния с Малой Бичей — Большая Бича) — река в России, протекает в Тюменской и Омской областях. Устье реки находится в 934 км по правому берегу реки Иртыш.Длина реки составляет 160 км. Площадь водосборного бассейна — 2630 км².По данным государственного водного реестра России относится к Иртышскому бассейновому округу, водохозяйственный участок реки — Иртыш от впадения реки Ишим до впадения реки Тобол, речной подбассейн реки — бассейны притоков Иртыша от Ишима до Тобола. Речной бассейн реки — Иртыш."
     },
                   {
        "name": "Бия",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%B8%D1%8F",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Reka_Biya.jpg/250px-Reka_Biya.jpg",
        "length": "301 км",
        "pool": "37 000 км²",
        "consumption": "477 м³/с (у Бийска)",
        "head": "Телецкое",
        "estuary": "Обь",
        "location": " Россия",
        "info": "Би́я (от самод. би — «вода», алт. Бий-суу: бий — «господин», суу — «вода») — крупная река в Республике Алтай и Алтайском крае России, правая составляющая Оби (левая — Катунь).Длина — 301 км, площадь бассейна — 37 000 км². Вытекает из Телецкого озера и, сливаясь с Катунью, образует реку Обь. Вода на участке от Телецкого озера до впадения Сарыкокши прозрачная и холодная (10-15 °C), однако в нижнем течении существенно прогревается.Река используется туристами для сплавов, категория сложности II (для байдарок и катамаранов), на участке от истока до Верх-Бийска имеется несколько порогов с валами до 1 м и выше. Основные пороги: Юрток, Пыжинский, Кебезенский, Сарыкокшинский, порог Кипяток в селе Турочак. Последний порог в с. Удаловка. Быстрое течение реки 1-1.5 м/с, отложения крупной гальки сохраняется почти до Бийска.Питание главным образом снеговое и дождевое. Значительную часть водосбора Бии обеспечивает река Чулышман, питающая Телецкое озеро. Половодье продолжительное. Средний годовой расход воды 477 м³/с (у г. Бийска). Замерзает в верховьях в конце ноября — начале декабря (на отдельных участках ледостав наблюдается не каждый год), в низовьях в середине ноября; вскрывается в верховьях в начале апреля, в низовьях в середине апреля."
     },
      {
        "name": "Блаве ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BB%D0%B0%D0%B2%D0%B5_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Blavet_Pontivy.jpg/250px-Blavet_Pontivy.jpg",
        "length": "149 км",
        "pool": "1951 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Бискайский залив",
        "location": " Франция",
        "info": "Блаве́ (фр. Blavet, брет. Blavezh) — река во Франции.Река протекает по территории французского региона Бретань. Длина — 149 км. Площадь водосборного бассейна — 1951 км².[источник не указан 2094 дня] Река берёт начало восточнее коммуны Бюла-Пестивьен в департаменте Кот-д’Армор, протекает через коммуны Сен-Никола-дю-Пелан и Гуарек, пересекает границу с департаментом Морбиан, далее — через коммуны Понтиви, Энбон, впадая в Атлантический океан в пределах города Лорьян. Питание преимущественно дождевое.Русло реки на большом протяжении канализировано, в низовьях для небольших судов возможно судоходство.Крупнейший приток — Эвель (56 км)."
     },
     {
        "name": "Бладвейн",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BB%D0%B0%D0%B4%D0%B2%D0%B5%D0%B9%D0%BD",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Bloodvein_River_Manitoba.jpg/250px-Bloodvein_River_Manitoba.jpg",
        "length": "306 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Виннипег",
        "location": " Канада",
        "info": "Бладвейн (англ.  Bloodvein River ) — река в Канаде. Длина реки — 306 км.[источник не указан 962 дня]Река Бладвейн берёт начало на юго-западе провинции Онтарио в провинциальном парке Вудланд Карибу примерно в 600 км северо-западнее Тандер-Бей и в 500 км к северо-востоку от Виннипега, плавно течёт на запад по территории парка, пересекает озеро Артери (Artery Lake) и границу с Манитобой и весь остальной путь течёт по территории парка дикой природы Атикаки, убыстряется, зачастую течёт в узких ущельях шириной меньше 20 метров, образует многочисленные стремнины. Впадает в озеро Виннипег чуть севернее протоки, соединяющей северную и южную часть озера, примерно в 200 км северо-восточнее Виннипега. Высота устья — 235 м над уровнем моря.[источник не указан 962 дня]Основные притоки: Сасаджиннигак (Sasaginnigak River) и Гаммон (Gammon River). Река Гаммон названа в честь исследователя Альберта Гаммона, нанесшего на карту этот район в 1920-е годы. Своё название река, скорей всего, получила из-за выходов красного гранита близ своего истока.На территории провинциальных парков обитают редкие виды животных, которым угрожает опасность в других местах Канады, в частности:Растут редкие растения:В лесах произрастают наиболее типичные деревья Центрального нагорья Канадского щита: тополь, белая берёза, чёрная ель, сосна, встречается также вяз, дуб и клён; обитают: американский лось, олень, койот, лисица, речная выдра, илька, куница, чёрный медведь, рысь, полосатая сова, полярная гагара, канадский гусь."
     },
      {
        "name": "Блайд ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BB%D0%B0%D0%B9%D0%B4_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/BlydeRiverSouthAfrica_%287%29.JPG/250px-BlydeRiverSouthAfrica_%287%29.JPG",
        "length": "140 км",
        "pool": "2842 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Улифантс",
        "location": " Южно-Африканская Республика",
        "info": "Блайд (англ. Blyde River; (африк. Blyderivier) — река на северо-востоке ЮАР в провинциях Мпумаланга и Лимпопо. Приток Улифантс бассейна Лимпопо. Длина реки — 140 км.[источник не указан 803 дня] Течёт на север по крутым долинам и ущельям Драконовых гор, прежде чем войти в низменный Велд провинции Лимпопо. Берёт своё начало на высоте около 2000 м над уровнем моря в заповедной зоне Хартебисвлакте, к северу от перевала Длинный Том. Блайд проходит через второй по величине каньон в Африке после каньона Фиш-Ривер.Блайд, означающий «радостный» или «счастливый» на африкаанс, был назван так во время Великого трека. Это произошло в 1844 году, когда Хендрик Потгитер и другие благополучно вернулись из залива Делагоа к остальной группе треккеров, которые считали их мёртвыми. Всё ещё пребывая в этом заблуждении, они назвали реку возле своего лагеря Treurrivier, или «река траур». Считается, что название Моттлаце предшествовало названию Блайд и означает «река, которая всегда полна» на диалекте сепулана северного сото.Из общей водосборной площади реки, составляющей 2842 км², 220 км² отведены под коммерческое лесное хозяйство, а около 1399 км² — местные леса. Во второй половине 20-го века вдоль нижнего Блайда были заложены фруктовые сады и пахотные земли, в 1995 году 23 521 га было отведено под орошение. Хартебисвлакте, природный заповедник горы Шеба, природный заповедник каньона реки Блайд и заповедник Блайд-Олифантс охраняют различные его участки."
     },
     {
        "name": "Блайт ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BB%D0%B0%D0%B9%D1%82_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "175 км",
        "pool": "undefined",
        "consumption": "58,9 м³/с",
        "head": " ",
        "estuary": "Арафурское море",
        "location": " Австралия",
        "info": "Блайт (англ. Blyth River) — река в Северной территории, на севере Австралии. Длина реки — 175 км. Средний расход воды — 58,9 м³/с.[источник не указан 963 дня]Верховья реки находятся на востоке от Шэдфорт-Хилз (англ. Shadforth Hills) на высоте 194 м над уровнем моря[источник не указан 963 дня]. Блайт течёт на север через в основном необитаемую территорию, мимо небольшой общины Гамарди, прежде чем вливаться в залив Баукаут.Водосбор занимает площадь 9219 квадратных километров и расположен между водосбором реки Ливерпул на западе, водосбором реки Гойдер на востоке и водосбором реки Ропер на юге. Среднегодовой расход воды составляет 1860 гигалитров.Левые притоки — ручей Шэдфорт (англ. Shadforth), ручей Седлерс (англ. Saddlers), ручей Иммибар (англ. Immibar), река Кэдель (англ. Cadell).Правые притоки — ручьи Гую (англ. Guyuyu) и Рангабуру (англ. Rangaburu).Река была названа Фрэнсисом Кэделлем в 1867 году в честь премьер-министра Южной Австралии Артура Блайта.Дэвид Линдсей нанёс реку на свою карту в 1883 году во время своей экспедиции в Арнем-Ленд.В реке водится много видов рыб: Ambassis, Terapontidae*, Craterocephalus, Denariusa australis, Glossogobius, латес и многие другие."
     },
     {
        "name": "Бланда",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BB%D0%B0%D0%BD%D0%B4%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Bloenduos_01.jpg/250px-Bloenduos_01.jpg",
        "length": "125 км",
        "pool": "2370 км²",
        "consumption": "undefined",
        "head": "Хофсйёкюдль",
        "estuary": "Атлантический океан",
        "location": " Исландия",
        "info": "Бла́нда (исл. Blanda) — река в Исландии. Берёт начало на юго-западе ледника Хофсйёкюдль на высоте 800 м и впадает в залив Хунафлоуи в небольшом посёлке Блёндюоус. Бланда является восьмой по длине рекой в стране, имеет протяжённость 125 км, площадь бассейна — 2370 км².В реке водится в обилии лосось, это одна из основных лососёвых рек в Исландии. Каждое лето улов лососей в Бланде составляет до 3000 штук. До строительства плотины лососи нерестились почти до самого подножия ледников.Гидроэлектростанция, построенная на реке в 1990 году, генерирует 150 МВт мощности.Через протоку Бланда сообщается с озером Адальмансватн."
     },
                           {
        "name": "Блудная (приток Пёзы)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BB%D1%83%D0%B4%D0%BD%D0%B0%D1%8F_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9F%D1%91%D0%B7%D1%8B)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Mezen.svg/250px-Mezen.svg.png",
        "length": "150 км",
        "pool": "1390 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Пёза",
        "location": " Россия",
        "info": "Блудная — река в Архангельской области России, левый приток Пёзы (бассейн Мезени).Устье реки находится в 363 км по левому берегу реки Пёза. Длина реки составляет 150 км, площадь водосборного бассейна составляет 1390 км². Берёт начало среди болот в центральной части Тиманского кряжа. Питание снеговое и дождевое. На реке имеются небольшие пороги.От устья к истоку:левый приток правый притокПо данным государственного водного реестра России относится к Двинско-Печорскому бассейновому округу, водохозяйственный участок реки — Мезень от водомерного поста деревни Малая Нисогора и до устья.Код объекта в государственном водном реестре — 03030000212103000048982."
     },
     {
        "name": "Блудная (приток Хатанги)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BB%D1%83%D0%B4%D0%BD%D0%B0%D1%8F_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A5%D0%B0%D1%82%D0%B0%D0%BD%D0%B3%D0%B8)",
        "image": "undefined",
        "length": "186 км",
        "pool": "3930 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Хатанга",
        "location": " Россия",
        "info": "Блудная — река в Таймырском Долгано-Ненецком районе Красноярского края России. Правый приток Хатанги. Длина — 186 км. Площадь бассейна 3930 км².Населённых пунктов на реке нет, в 5 километрах юго-западнее устья, на берегу Хатанги, расположен посёлок Новорыбная.Река Блудная берёт начало из малого безымянного озера на высоте 361 м НУМ, вытекая из него на северной стороне. Далее река течёт на северо-восток, быстро теряя высоту — у левого притока Сенька — 69 м НУМ (падение на 292 м за 30 км), а у правого притока, Санга-Юрях, уже 32 м НУМ (за 20 км реки).Затем река втекает в низкорослый хвойный лес и заворачивает на север. Её ширина на этом участке 35 метров, глубина 0,9, а грунты дна твёрдые. Тут река справа принимает приток Саха-Юрях, а слева безымянный ручей из озера Семен-Кюель. У горы Онгуохтах-Сопка Блудная покидает лес и берёт направление на северо-запад.На выходе из леса река слева принимает Рассоху, а справа Джеруоху. После этого ширина реки достигает 107 метров, глубина метра. Донные грунты по прежнему состоят из твёрдых пород. Скорость течения 0,3 м/с.От горы Онгуохтах-Сопка до самого впадения в Блудную правого притока Киенг-Юрях река протекает через холмистую местность, колебание высот 10÷90 м НУМ."
     },
     {
        "name": "Блудная (приток Хилка)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BB%D1%83%D0%B4%D0%BD%D0%B0%D1%8F_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A5%D0%B8%D0%BB%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "164 км",
        "pool": "4480 км²",
        "consumption": "6,2 м³/с (95 км от устья)",
        "head": " ",
        "estuary": "Хилок",
        "location": " Россия",
        "info": "Блу́дная (Хилогосо́н) — река в Забайкальском крае России, левый приток Хилка.Исток реки располагается на северном склоне Малханского хребта. Длина реки составляет 164 км. Площадь водосбора — 4480 км². Средний расход воды — 6,2 м³/с.[источник не указан 376 дней]Притоки реки: Верхний Мултун, Большая Речка, Нижний Мултун, Тырбыхен, Каргастый, Верхний Цибитуй, Иржи, Харул, Арей, Зун-Шара-Горхон, Кутолага."
     },
     {
        "name": "Блудная (река, Большой Ляховский остров)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BB%D1%83%D0%B4%D0%BD%D0%B0%D1%8F_(%D1%80%D0%B5%D0%BA%D0%B0,_%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%9B%D1%8F%D1%85%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9_%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%B2)",
        "image": "undefined",
        "length": "151 км",
        "pool": "922 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Море Лаптевых",
        "location": " Россия",
        "info": "Блу́дная (устар. Вольная; якут. Блудная өрүс) — река в России на острове Большой Ляховский из группы Ляховских островов (Новосибирские острова).Длина реки составляет 151 км, площадь водосборного бассейна — 922 км². Берёт начало на севере от горы Чаллах-Хая и течёт на северо-запад. Впадает в море Лаптевых, образуя широкое, до 300 м, устье. В эстуарии находятся острова. Уклон реки — 0,2 м/км.Русло извилистое. Некоторые меандры превратились в старицы. Ширина русла в среднем течении составляет 15 м, после впадения левого притока — Большой Тундровой реки — расширяется до 40 м, около устья — 75 м. Глубина от 0,4 в среднем течении до 1,8 м в нижнем. Дно песчаное.Берега пологие, бывают обрывы высотой 5 м. Нижнее течение заболочено, образуется много озёр, стекающих в реку (озёра Кегелях-Кюельлере)."
     },
          {
        "name": "Блэкуотер (река, Ирландия)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BB%D1%8D%D0%BA%D1%83%D0%BE%D1%82%D0%B5%D1%80_(%D1%80%D0%B5%D0%BA%D0%B0,_%D0%98%D1%80%D0%BB%D0%B0%D0%BD%D0%B4%D0%B8%D1%8F)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/IMG_BlackwaterBridge3720rz.jpg/250px-IMG_BlackwaterBridge3720rz.jpg",
        "length": "168 км",
        "pool": "3108 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Кельтское море",
        "location": " Ирландия",
        "info": "Блэкуотер (англ. Blackwater / Munster Blackwater, ирл. Abhainn-mhór / Avonmore — великая река) — река, протекающая через графства Керри, Корк, Уотерфорд в Ирландии. Общая длина — 168 км.Блэкуотер, скорее всего, идентичен с рекой, которая в средневековой Ирландии именовалась Нем (др.‑ирл. Néim) и считалась одной из четырнадцати великих рек Ирландии. Современное английское название Blackwater (дословно Чёрная вода) произошло по трём причинам: из-за тёмных вод реки, из-за близости болот и угольных месторождений. Местные жители называют реку Abhainn-mhór / Avonmore, что значит большая или великая река.В путевых заметках путешественников XIX века сравнивалась с Рейном или Дунаем.До IX века река впадала в Уайтинг Бэй, но из-за сильнейшей бури изменило русло. Пришедшие на эти земли норманы в XII веке устроили гражданские и военные поселения у реки. До XVII века здесь располагались главные морские порты Ирландии. С укрупнением кораблей порты потеряли свою ведущую роль из-за мелкого наносного песчаного побережья.Река берёт начало в горах Макгилликаддис-Рикс в графстве Керри и течёт прямо на восток через графство Уотерфорд, где у деревни Каппокуин резко поворачивает на юг к Кельтскому морю."
     },
           {
        "name": "Бобрик (верхний приток Припяти)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B1%D1%80%D0%B8%D0%BA_(%D0%B2%D0%B5%D1%80%D1%85%D0%BD%D0%B8%D0%B9_%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9F%D1%80%D0%B8%D0%BF%D1%8F%D1%82%D0%B8)",
        "image": "undefined",
        "length": "109 км",
        "pool": "1902 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Припять",
        "location": " Белоруссия",
        "info": "Бо́брик (белор. Бобрык, Бобрык Першы) — река в Брестской области Белоруссии, левый приток Припяти.Исток реки находится в болотах около деревни Сукач Ганцевичского района. Река протекает по Припятскому Полесью, преимущественно по территории Пинского и Лунинецкого районов, впадая в Припять в 2 км к северо-западу от железнодорожной станции Припять.Длина реки — 109 км, площадь водосборного бассейна — 1902 км², среднегодовой расход воды в районе устья — 7,6 м³/с, уклон реки — 0,3 м/км.Ширина реки изменяется от 3 м в верхнем течении до 40—50 м около устья. На протяжении 102 км русло канализировано. Долина не выражена. Пойма двусторонняя, шириной 500—1000 м в среднем течении.Крупнейший приток — Вислица (правый). Есть связь с системой мелиорационных каналов. Через протоку и озеро Погостское река Бобрик связана с водохранилищем Погост. На самой реке возле агрогородка Парохонск обустроены два небольших пруда."
     },
                {
        "name": "Бобровка (приток Амни)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B1%D1%80%D0%BE%D0%B2%D0%BA%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%90%D0%BC%D0%BD%D0%B8)",
        "image": "undefined",
        "length": "139 км",
        "pool": "1010 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Амня",
        "location": " Россия",
        "info": "Бобровка — река в Ханты-Мансийском АО России. Устье реки находится в 17 км по левому берегу реки Амня. Длина реки составляет 139 км. Площадь водосборного бассейна — 1010 км².Высота устья — 21,9 м над уровнем моря.(км от устья)По данным государственного водного реестра России относится к Нижнеобскому бассейновому округу, водохозяйственный участок реки — Обь от впадения Иртыша до впадения реки Северная Сосьва, речной подбассейн реки — бассейны притока Оби от Иртыша до впадения Северной Сосьвы. Речной бассейн реки — (Нижняя) Обь от впадения Иртыша.Код объекта в государственном водном реестре — 15020100112115300021637."
     },
                        {
        "name": "Боган ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B3%D0%B0%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Bogan_River-Nyngan.JPG/250px-Bogan_River-Nyngan.JPG",
        "length": "617 км",
        "pool": "18 000 км²",
        "consumption": "8,1 м³/с (Плотина Гонголгон)",
        "head": "Литл-Ривер",
        "estuary": "Дарлинг",
        "location": " Австралия",
        "info": "Бо́ган (англ. Bogan River) — река в районах Центральный Запад и Орана штата Новый Южный Уэльс, Австралия.Длина реки — 617 км.[источник не указан 619 дней] Средний расход воды — 8,1 м³/с.[источник не указан 619 дней] Высота устья — 111 м над уровнем моря.[источник не указан 619 дней] Высота истока — 305 м над уровнем моря.[источник не указан 619 дней] Уклон реки — 0,314 м/км.[источник не указан 619 дней]Боган является частью водного бассейна Муррей—Дарлинг. Река берёт своё начало близ городка Паркс. Общее направление течения — с юго-юго-востока на северо-северо-запад. Близ городка Берк сливается с речушкой Литл-Боган, образуя начало реки Дарлинг. Боган принимает около двадцати притоков. В отличие от большинства других рек региона, Боган имеет маленький уклон, медленное течение и для ирригации не используется. Реку пересекает шоссе Камиларои.Об этимологии названия есть две версии. Согласно первой, боган в переводе с языка коренных жителей — «место рождения известного вождя местного племени». Согласно второй, на гойдельских языках (а среди здешних первых европейских поселенцев было много ирландцев и шотландцев) это слово означает «верховое болото», а именно в таком водоёме берёт своё начало река Боган."
     },
     {
        "name": "Боганида (приток Хеты)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B3%D0%B0%D0%BD%D0%B8%D0%B4%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A5%D0%B5%D1%82%D1%8B)",
        "image": "undefined",
        "length": "366 км",
        "pool": "10 700 км²",
        "consumption": "undefined",
        "head": "Тонское",
        "estuary": "Хета",
        "location": " Россия",
        "info": "Боганида (в верховье Копсоккон) — река в Сибири, в Красноярском крае России, левый приток реки Хеты. Устье реки находится в 374 км от устья Хеты. Длина реки — 366 км, площадь водосборного бассейна — 10700 км².Высота истока — 46 м над уровнем моря. Бассейн расположен на Северо-Сибирской низменности."
     },
               {
        "name": "Богота ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B3%D0%BE%D1%82%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/RioBogotaBrice%C3%B1o.JPG/250px-RioBogotaBrice%C3%B1o.JPG",
        "length": "380 км",
        "pool": "5891,43 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Магдалена",
        "location": " Колумбия",
        "info": "Богота́ (исп. Río Bogotá) — река на северо-западе Южной Америки, протекает по территории департамента Кундинамарка в западной части Колумбии, а также через столичный регион. Длина реки составляет 380 км. Бассейн охватывает территорию в 5891,43 км²Берёт начало в горах севернее столицы страны, в муниципалитете Вильяпинзон, на высоте 3300 метров над уровнем моря. Впадает в реку Магдалена в муниципалитете Хирардот. Высота устья — 280 метров над уровнем моря. Расход воды в приустьевой части составляет 34,34 м³/с в сухие периоды года и 52,44 м³/с — во влажные.Основными притоками являются реки Сисга, Неуса, Тибиток, Техар, Рио-Негро, Теусака, Рио-Фрио, Чику, Салитре, Фуча, Тунхуэлито, Сиеча, Бальсильяс, Каландайма и Апуло.В верховьях (выше холмов Серрос-де-Бокерон) долина реки сложена песчаными и глинистыми отложениями мелового и третичного периодов, в нижней части — конгломератами осадочных пород.На территории бассейна осуществляется добыча глины, песка, известняка, кварца, угля и соли.Температура в бассейне Боготы меняется в пределах от 6 °C до 30 °C, большей частью держась в границах 9—15 °C. Количество осадков — от 400 до 2200 миллиметров в год.Площадь лесов в долине Боготы составляет 1623,63 км²."
     },
        {
        "name": "Богучарка",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B3%D1%83%D1%87%D0%B0%D1%80%D0%BA%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%BE%D0%B3%D1%83%D1%87%D0%B0%D1%80%D0%BA%D0%B0.jpg/250px-%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%BE%D0%B3%D1%83%D1%87%D0%B0%D1%80%D0%BA%D0%B0.jpg",
        "length": "101 км",
        "pool": "3240 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Дон",
        "location": " Россия",
        "info": "Богуча́рка — река на юге Воронежской области России, правый приток Дона. На реке находится город Богучар. Длина реки — 101 км, площадь водосборного бассейна — 3240 км².Река течёт в южной части Воронежской области, которая расположена на отрогах Донского массива с абсолютными отметками более 150 метров. Территория бассейна реки представляет собой холмистую местность с выходами меловых отложений, в которых встречается меловой карст.Наивысшая отметка водосбора равна 233 м[источник не указан 3723 дня], она находится в верховьях Левой Богучарки. На водоразделе с рекой Белой отметка местности понижается до 203 м.На поверхности водосбора протекает 21 река длиной более 21 км[источник не указан 3723 дня]. Самые значительные из них — Левая Богучарка длиной 61 км. Заболоченность бассейна Богучарки небольшая.По данным государственного водного реестра России относится к Донскому бассейновому округу, водохозяйственный участок реки — Дон от города Павловск и до устья реки Хопёр, без реки Подгорная, речной подбассейн реки — бассейны притоков Дона до впадения Хопра. Речной бассейн реки — Дон (российская часть бассейна)."
     },
      {
        "name": "Бодва",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B4%D0%B2%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/J%C3%A1sz%C3%B353.JPG/250px-J%C3%A1sz%C3%B353.JPG",
        "length": "113 км",
        "pool": "890 км²",
        "consumption": "5 м³/с",
        "head": " ",
        "estuary": "Шайо",
        "location": "",
        "info": "Бо́два (словацк. Bodva, венг. Bódva) — река в Словакии (Кошицкий край) и Венгрии (Боршод-Абауй-Земплен), приток Шайо. Площадь водосборного бассейна — 890 км².[источник не указан 2037 дней] Общая длина реки составляет 113 км, из них 48,4 км река течёт по территории Словакии.Река Бодва берёт начало в словацких горах Воловске-Врхи. Высота истока — 900 м над уровнем моря.[источник не указан 2037 дней] Течёт на юг, протекает через Молдаву-над-Бодвоу. Далее пересекает государственную границу и течёт по территории Венгрии. Впадает в Шайо в районе посёлка Больдва.В районе государственной границы средняя скорость течения составляет 5 м³/с.Главные притоки: Ида и Турня."
     },
      {
        "name": "Бодрог",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B4%D1%80%D0%BE%D0%B3",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/River_Tisza_%26_Bodrog_Tokaj.jpg/250px-River_Tisza_%26_Bodrog_Tokaj.jpg",
        "length": "188 км",
        "pool": "11 552 км²",
        "consumption": "средний: 115 м³/с",
        "head": "слияние рек: Ондава и Латорица",
        "estuary": "Тиса",
        "location": "",
        "info": "Бо́дрог (словацк. Bodrog, венг. Bodrog) — река в Словакии (Кошицкий край) и Венгрии (медье Боршод-Абауй-Земплен). Река Бодрог судоходна. Главные притоки — Латорица, Ондава и Ронява.Река Бодрог берёт начало в центральной части Восточнословацкой низменности при слиянии рек Латорица и Ондава. Течёт на юго-запад, пересекает словацко-венгерскую границу рядом с деревней Борша. Впадает в Тису в районе города Токай. Русло реки извилистое. На реке Бодрог расположен венгерский город Шарошпатак."
     },
        {
        "name": "Бозсу",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B7%D1%81%D1%83",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/%D0%91%D0%BE%D0%B7%D1%81%D1%83_%D0%B2_%D1%80%D0%B0%D0%B9%D0%BE%D0%BD%D0%B5_%D0%B6._%D0%B4._%D0%A2%D0%B0%D1%88%D0%BA%D0%B5%D0%BD%D1%82-%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0.JPG/280px-%D0%91%D0%BE%D0%B7%D1%81%D1%83_%D0%B2_%D1%80%D0%B0%D0%B9%D0%BE%D0%BD%D0%B5_%D0%B6._%D0%B4._%D0%A2%D0%B0%D1%88%D0%BA%D0%B5%D0%BD%D1%82-%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0.JPG",
        "length": "138[ком 1] км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "undefined",
        "estuary": "Сырдарья ",
        "location": " Узбекистан,  Казахстан",
        "info": "Бозсу́ (узб. Bo‘zsuv, Бўзсув; в некоторых источниках, преимущественно старых, пишется через дефис: Боз-су, Бўз-сув, в ряде дореволюционных картографических источников Боссу, Бос-Су) — магистральный ирригационный канал (арык) в Ташкентской области и городе Ташкенте, питающий водой большинство других каналов на территории столицы. Представляет собой протоку реки Чирчик, которая ещё в древности была преобразована в канал.Средний расход воды — 110 м³/с.[источник не указан 723 дня] Высота устья — 253 м над уровнем моря.[источник не указан 723 дня]Служит энергетическим трактом для каскада ГЭС.Согласно Э. М. Мурзаеву, топоним Бозсу в Ташкентской области восходит к тюркскому слову боз. Этим словом именовалась степь, в которой растительность представлена злаками типа ковыля и типчака — целинные и залежные земли. Основное значение слова — «светлый, серый», с узбекского языка boz переводится как «целина». Изыскатель по ирригации А. Звягинцев приводит иную этимологию названия: «резвая свободная вода».Небольшой участок Бозсу (около 4 км) на территории Старого города Ташкента, часто рассматривается как самостоятельный канал, известный под названиями Джангоб (узб. Jangob, Жангоб) и Лабзак (узб. Labzak arig‘i, Лабзак ариғи). Народное название Джангоб («ручей битвы») является более древним, оно отсылает к событиям около 1784 года, когда в овраге канала произошло сражение между жителями четырёх частей города за обладание Ташкентом (см. ниже). Название Лабзак фиксируется в источниках, начиная с XIX века. Это название происходит от словосочетания Лаби зах — «сырая земля» (тадж. лаби — «берег», тадж. заҳ — «сырой, влажный»)."
     },
     {
        "name": "Бойн",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B9%D0%BD",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Boyne_River.jpg/250px-Boyne_River.jpg",
        "length": "112 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Ирландское море",
        "location": " Ирландия",
        "info": "Бойн (англ. Boyne, ирл. Abhainn na Bóinne) — река в провинции Ленстер в Ирландии. Берёт начало в деревне Кёрбери в графстве Килдер и течёт на северо-восток по графству Мит. Длина реки 112 километров. В месте впадения реки Бойн в Ирландское море находится город Дроэда.Несмотря на небольшую протяжённость, река имеет большое культурное значение. В её долине имеется множество исторических мест и архитектурных памятников, в том числе ансамбль курганов эпохи неолита, включённый во Всемирное наследие ЮНЕСКО. Река протекает рядом с исторически известным городом Трим, замком Трим и холмом Тара. Главное сражение в истории Ирландии — Битва на реке Бойн во время Вильямитской войны — произошло в долине этой реки. Навигация на реке проходила по многочисленным каналам, параллельным реке, в настоящее время ведутся работы по восстановлению судоходства. В реке водится лосось и форель."
     },
      {
        "name": "Бойсе ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B9%D1%81%D0%B5_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Tubers_Float_the_Boise_River.JPG/250px-Tubers_Float_the_Boise_River.JPG",
        "length": "150 км",
        "pool": "10 619 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Снейк",
        "location": " США",
        "info": "Бо́йсе (англ. Boise River) — река на западе центральной части штата Айдахо, США. Правый приток реки Снейк. Длина составляет около 150 км, площадь бассейна — 10 619 км².[источник не указан 547 дней]Берёт начало в районе горного хребта Сотут, в виде трёх верховий. Верховье Норт-Форк имеет длину 80 км и начинается примерно в 100 км к северо-востоку от города Бойсе. Течёт в юго-западном направлении через горную местность на территории национального леса Бойсе. Мидл-Форк составляет около 84 км в длину и берёт начало в 19 км от реки Норт-Форк, на северо-востоке округа Элмор. Течёт также в юго-западном направлении, протекает через город Атланта и соединяется с рекой Норт-Форк, формируя реку Бойсе, примерно в 24 км к юго-востоку от города Айдахо-Сити. Река Бойсе продолжает течь на юго-запад и впадает в водохранилище Арроурок. Здесь река принимает крупный приток Саут-Форк, длина которого 163 км.[источник не указан 547 дней]После прохождения водохранилища река течёт преимущественно в западном и северо-западном направлениях. Впадает в реку Снейк на границе штатов Айдахо и Орегон, к западу от города Парма и в 5 км к югу от города Нисса. Высота устья — 666 м над уровнем моря."
     },
              {
        "name": "Болва",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D0%B2%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Confluence_of_Desna_and_Bolva_in_Bryansk.JPG/250px-Confluence_of_Desna_and_Bolva_in_Bryansk.JPG",
        "length": "213 км",
        "pool": "4340 км²",
        "consumption": "22 м³/с (в устье)",
        "head": " ",
        "estuary": "Десна",
        "location": " Россия",
        "info": "Болва́ (устар. Обо́лва, Аболва, Оболвь) — река в Калужской и Брянской областях России, левый приток Десны.Длина реки — 213 км, площадь водосборного бассейна — 4340 км², средний расход воды в устье — 22 м³/сек.Исток Болвы расположен близ деревни Болва, недалеко от города Спас-Деменск Калужской области, на южных склонах Смоленской возвышенности. Протекает преимущественно в южном направлении. Основные притоки — Ковылинка, Дегна, Неручь (с притоком Ужать), Неполоть, Радица (левые); Песочня, Колчинка, Верещевка (правые).В нижнем течении Болва практически не имеет правых притоков; ввиду строения рельефа практически всё правобережье Болвы в пределах Брянской области относится к бассейну Ветьмы.Во время весеннего паводка для нижнего течения Болвы характерно значительное (до 7—8 м) повышение уровня, в связи с чем её пойма простирается в ширину до 1 км. Практически ежегодно подвергается кратковременному затоплению территория пгт Радица-Крыловка; население бывает вынуждено передвигаться по посёлку на лодках.На реке расположены города Спас-Деменск, Киров, Людиново, Фокино, Дятьково. Впадает в Десну в черте города Брянска.В XIX веке река Болва была судоходной от Сукремльского завода до её впадения в Десну, во время весеннего половодья."
     },
      {
        "name": "Болгарчай",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D0%B3%D0%B0%D1%80%D1%87%D0%B0%D0%B9",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Drainage_basin_of_Bolqarchay.png/250px-Drainage_basin_of_Bolqarchay.png",
        "length": "134 км",
        "pool": "2170 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Махмудчала",
        "location": " Иран,  Азербайджан",
        "info": "Болгарчай (устар. Болгару-чай; азерб. Bolqarçay) — река в южной части Муганской степи Азербайджана. Берёт начало в Талышских горах и впадает в болотистое урочище Махмудчала.Болгару (по-талышски ру — «река»; река протекала в прошлом по границе расселения талышей).Длина реки составляет 134 км, площадь водосборного бассейна — 2170 км². Воды реки используются для орошения. По Болгарчаю в верхнем и среднем течении проходит граница между Азербайджаном и Ираном. Берёт начало в горах Уджаруд и впадает в озеро Махмудчале. Протекает в северной части шахрестана Герми и отделяет его от Ярдымлинского и Джалильабадского районов, расположенных в Республике Азербайджан.Образуется от слияния нескольких сезонных рек, таких как Салалачай, Гермичай, Шевончай, а также пограничной притоки, которая берёт начало в селе Офдже. Эта река, после впадения всех притоков, которые берут начало в горах шахрестана Герми, протекает через село Ага Хасан Бейглу и направляется на территорию шахрестана Белое Савар, определяя его границу с Республикой Азербайджан. Затем направляется на сторону Азербайджана и там впадает в озеро Махмудчале. Среди жителей региона самыми распространенными названиями являются Балхаричай и Болгарчай. Применение к ней названия Балхаруд из-за персидскоязычности слова руд  не представляется правильным."
     },
                                                {
        "name": "Большая (приток Калитвы)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9A%D0%B0%D0%BB%D0%B8%D1%82%D0%B2%D1%8B)",
        "image": "undefined",
        "length": "152 км",
        "pool": "2160 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Калитва",
        "location": " Россия",
        "info": "Больша́я (Ба́лка Больша́я) — река в Ростовской области. Длина 152 км, площадь бассейна 2160 км². Левый приток Калитвы (бассейн Дона). Питание преимущественно снеговое. В верховьях пересыхает. Имеет сильно извилистое течение.Берёт начало на южных склонах Донской гряды, впадает в Калитву, в 93 км от её устья, между Ольховой и Берёзовой.Протекает по Тарасовскому, Кашарскому и Боковскому районам Ростовской области.Река принимает два больших левых притока — Мечетку (Мечетную) и Нагольную (крупнейший); последнюю, по мнению В. В. Богачёва, следует считать главной рекой.(км от устья)На реке стоят в Кашарском районе: Верхнегреково, 2-й Киевский, Фомино-Свечниково, Сариновка, в Тарасовском районе — Большинка."
     },
              {
        "name": "Большая (река, впадает в Охотское море)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_(%D1%80%D0%B5%D0%BA%D0%B0,_%D0%B2%D0%BF%D0%B0%D0%B4%D0%B0%D0%B5%D1%82_%D0%B2_%D0%9E%D1%85%D0%BE%D1%82%D1%81%D0%BA%D0%BE%D0%B5_%D0%BC%D0%BE%D1%80%D0%B5)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Bystraja-wikimapia.jpg/250px-Bystraja-wikimapia.jpg",
        "length": "275 км",
        "pool": "10 800 км²",
        "consumption": "123 м³/с (96 км от устья)",
        "head": " ",
        "estuary": "Охотское море",
        "location": " Россия",
        "info": "Больша́я (выше устья р. Плотникова — Быстрая) — река на юго-западе полуострова Камчатка в России.Длина реки — 275 км. Площадь водосборного бассейна — 10 800 км². Берёт начало в Ганальском хребте, протекает по территории Елизовского и Усть-Большерецкого районов Камчатского края вдоль южных отрогов Срединного хребта. Впадает в Охотское море.Среднегодовой расход воды — 123 м³/с. Река имеет 227 притоков длиной менее 10 км. Средняя скорость течения составляет 0,5—2 м/с, а глубина — 1—3 м, в верхнем течении — 0,8—2 м. Ширина русла — 50—100 м в нижнем течении и 20—40 м в верховьях. Во многих местах по реке наблюдаются выходы тёплых ключей и минеральных источников. Судоходна в нижнем течении.Исторически река являлась магистральным путём для связи западного берега полуострова с долиной реки Камчатки и восточным побережьем.Река имеет немаловажное значение, как место размножения западно-камчатских лососёвых рыб. Нереститься в эту реку заходят более 40 тыс. особей чавычи, 300 тыс. — нерки, до 20 млн — горбуши, свыше 100 тыс. особей кижуча. Также встречается здесь много других видов: проходной голец, хариус, жилая микижа и кунджа, камчатская сёмга (проходной вид микижи).На реке имеются участки пригодные для организации лодочного туризма, таки как участок от села Малка до лимана реки Большой, где меньше нерестилищ рыб, кроме горбуши и чавычи. Наилучшее время для ловли чавычи — начало мая—середина июля. Во второй половине августа рыбы становится меньше, так как она уходит на нерест. Для ловли кижуча соответствующие сроки середина августа—конец сентября, на нижнем течении и октябрь. Здесь также возможен лов других видов лососёвых."
     },
       {
        "name": "Большая Авландя",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%90%D0%B2%D0%BB%D0%B0%D0%BD%D0%B4%D1%8F",
        "image": "undefined",
        "length": "120 км",
        "pool": "1840 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Омолон",
        "location": " Россия",
        "info": "Большая Авландя, или Большая Ауланджа, — река в России, протекает по территории Северо-Эвенского района Магаданской области. Правый приток Омолона, впадает в него 814 км от устья. Протекает по территории Северо-Эвенского района Магаданской области, вдали от населённых пунктов. Длина реки — 120 км, площадь водосборного бассейна — 1840 км².По данным государственного водного реестра России относится к Анадыро-Колымскому бассейновому округу, речной бассейн реки — Колыма, речной подбассейн — Омолон. Водохозяйственный участок реки — река Омолон.Код объекта в государственном водном реестре — 19010200112119000049357."
     },
                {
        "name": "Блаве ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BB%D0%B0%D0%B2%D0%B5_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Blavet_Pontivy.jpg/250px-Blavet_Pontivy.jpg",
        "length": "149 км",
        "pool": "1951 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Бискайский залив",
        "location": " Франция",
        "info": "Блаве́ (фр. Blavet, брет. Blavezh) — река во Франции.Река протекает по территории французского региона Бретань. Длина — 149 км. Площадь водосборного бассейна — 1951 км².[источник не указан 2094 дня] Река берёт начало восточнее коммуны Бюла-Пестивьен в департаменте Кот-д’Армор, протекает через коммуны Сен-Никола-дю-Пелан и Гуарек, пересекает границу с департаментом Морбиан, далее — через коммуны Понтиви, Энбон, впадая в Атлантический океан в пределах города Лорьян. Питание преимущественно дождевое.Русло реки на большом протяжении канализировано, в низовьях для небольших судов возможно судоходство.Крупнейший приток — Эвель (56 км)."
     },
     {
        "name": "Бладвейн",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BB%D0%B0%D0%B4%D0%B2%D0%B5%D0%B9%D0%BD",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Bloodvein_River_Manitoba.jpg/250px-Bloodvein_River_Manitoba.jpg",
        "length": "306 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Виннипег",
        "location": " Канада",
        "info": "Бладвейн (англ.  Bloodvein River ) — река в Канаде. Длина реки — 306 км.[источник не указан 962 дня]Река Бладвейн берёт начало на юго-западе провинции Онтарио в провинциальном парке Вудланд Карибу примерно в 600 км северо-западнее Тандер-Бей и в 500 км к северо-востоку от Виннипега, плавно течёт на запад по территории парка, пересекает озеро Артери (Artery Lake) и границу с Манитобой и весь остальной путь течёт по территории парка дикой природы Атикаки, убыстряется, зачастую течёт в узких ущельях шириной меньше 20 метров, образует многочисленные стремнины. Впадает в озеро Виннипег чуть севернее протоки, соединяющей северную и южную часть озера, примерно в 200 км северо-восточнее Виннипега. Высота устья — 235 м над уровнем моря.[источник не указан 962 дня]Основные притоки: Сасаджиннигак (Sasaginnigak River) и Гаммон (Gammon River). Река Гаммон названа в честь исследователя Альберта Гаммона, нанесшего на карту этот район в 1920-е годы. Своё название река, скорей всего, получила из-за выходов красного гранита близ своего истока.На территории провинциальных парков обитают редкие виды животных, которым угрожает опасность в других местах Канады, в частности:Растут редкие растения:В лесах произрастают наиболее типичные деревья Центрального нагорья Канадского щита: тополь, белая берёза, чёрная ель, сосна, встречается также вяз, дуб и клён; обитают: американский лось, олень, койот, лисица, речная выдра, илька, куница, чёрный медведь, рысь, полосатая сова, полярная гагара, канадский гусь."
     },
      {
        "name": "Блайд ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BB%D0%B0%D0%B9%D0%B4_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/BlydeRiverSouthAfrica_%287%29.JPG/250px-BlydeRiverSouthAfrica_%287%29.JPG",
        "length": "140 км",
        "pool": "2842 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Улифантс",
        "location": " Южно-Африканская Республика",
        "info": "Блайд (англ. Blyde River; (африк. Blyderivier) — река на северо-востоке ЮАР в провинциях Мпумаланга и Лимпопо. Приток Улифантс бассейна Лимпопо. Длина реки — 140 км.[источник не указан 803 дня] Течёт на север по крутым долинам и ущельям Драконовых гор, прежде чем войти в низменный Велд провинции Лимпопо. Берёт своё начало на высоте около 2000 м над уровнем моря в заповедной зоне Хартебисвлакте, к северу от перевала Длинный Том. Блайд проходит через второй по величине каньон в Африке после каньона Фиш-Ривер.Блайд, означающий «радостный» или «счастливый» на африкаанс, был назван так во время Великого трека. Это произошло в 1844 году, когда Хендрик Потгитер и другие благополучно вернулись из залива Делагоа к остальной группе треккеров, которые считали их мёртвыми. Всё ещё пребывая в этом заблуждении, они назвали реку возле своего лагеря Treurrivier, или «река траур». Считается, что название Моттлаце предшествовало названию Блайд и означает «река, которая всегда полна» на диалекте сепулана северного сото.Из общей водосборной площади реки, составляющей 2842 км², 220 км² отведены под коммерческое лесное хозяйство, а около 1399 км² — местные леса. Во второй половине 20-го века вдоль нижнего Блайда были заложены фруктовые сады и пахотные земли, в 1995 году 23 521 га было отведено под орошение. Хартебисвлакте, природный заповедник горы Шеба, природный заповедник каньона реки Блайд и заповедник Блайд-Олифантс охраняют различные его участки."
     },
     {
        "name": "Блайт ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BB%D0%B0%D0%B9%D1%82_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "175 км",
        "pool": "undefined",
        "consumption": "58,9 м³/с",
        "head": " ",
        "estuary": "Арафурское море",
        "location": " Австралия",
        "info": "Блайт (англ. Blyth River) — река в Северной территории, на севере Австралии. Длина реки — 175 км. Средний расход воды — 58,9 м³/с.[источник не указан 963 дня]Верховья реки находятся на востоке от Шэдфорт-Хилз (англ. Shadforth Hills) на высоте 194 м над уровнем моря[источник не указан 963 дня]. Блайт течёт на север через в основном необитаемую территорию, мимо небольшой общины Гамарди, прежде чем вливаться в залив Баукаут.Водосбор занимает площадь 9219 квадратных километров и расположен между водосбором реки Ливерпул на западе, водосбором реки Гойдер на востоке и водосбором реки Ропер на юге. Среднегодовой расход воды составляет 1860 гигалитров.Левые притоки — ручей Шэдфорт (англ. Shadforth), ручей Седлерс (англ. Saddlers), ручей Иммибар (англ. Immibar), река Кэдель (англ. Cadell).Правые притоки — ручьи Гую (англ. Guyuyu) и Рангабуру (англ. Rangaburu).Река была названа Фрэнсисом Кэделлем в 1867 году в честь премьер-министра Южной Австралии Артура Блайта.Дэвид Линдсей нанёс реку на свою карту в 1883 году во время своей экспедиции в Арнем-Ленд.В реке водится много видов рыб: Ambassis, Terapontidae*, Craterocephalus, Denariusa australis, Glossogobius, латес и многие другие."
     },
     {
        "name": "Бланда",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BB%D0%B0%D0%BD%D0%B4%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Bloenduos_01.jpg/250px-Bloenduos_01.jpg",
        "length": "125 км",
        "pool": "2370 км²",
        "consumption": "undefined",
        "head": "Хофсйёкюдль",
        "estuary": "Атлантический океан",
        "location": " Исландия",
        "info": "Бла́нда (исл. Blanda) — река в Исландии. Берёт начало на юго-западе ледника Хофсйёкюдль на высоте 800 м и впадает в залив Хунафлоуи в небольшом посёлке Блёндюоус. Бланда является восьмой по длине рекой в стране, имеет протяжённость 125 км, площадь бассейна — 2370 км².В реке водится в обилии лосось, это одна из основных лососёвых рек в Исландии. Каждое лето улов лососей в Бланде составляет до 3000 штук. До строительства плотины лососи нерестились почти до самого подножия ледников.Гидроэлектростанция, построенная на реке в 1990 году, генерирует 150 МВт мощности.Через протоку Бланда сообщается с озером Адальмансватн."
     },
                          {
        "name": "Блудная (приток Пёзы)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BB%D1%83%D0%B4%D0%BD%D0%B0%D1%8F_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9F%D1%91%D0%B7%D1%8B)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Mezen.svg/250px-Mezen.svg.png",
        "length": "150 км",
        "pool": "1390 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Пёза",
        "location": " Россия",
        "info": "Блудная — река в Архангельской области России, левый приток Пёзы (бассейн Мезени).Устье реки находится в 363 км по левому берегу реки Пёза. Длина реки составляет 150 км, площадь водосборного бассейна составляет 1390 км². Берёт начало среди болот в центральной части Тиманского кряжа. Питание снеговое и дождевое. На реке имеются небольшие пороги.От устья к истоку: левый приток правый притокПо данным государственного водного реестра России относится к Двинско-Печорскому бассейновому округу, водохозяйственный участок реки — Мезень от водомерного поста деревни Малая Нисогора и до устья.Код объекта в государственном водном реестре — 03030000212103000048982."
     },
     {
        "name": "Блудная (приток Хатанги)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BB%D1%83%D0%B4%D0%BD%D0%B0%D1%8F_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A5%D0%B0%D1%82%D0%B0%D0%BD%D0%B3%D0%B8)",
        "image": "undefined",
        "length": "186 км",
        "pool": "3930 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Хатанга",
        "location": " Россия",
        "info": "Блудная — река в Таймырском Долгано-Ненецком районе Красноярского края России. Правый приток Хатанги. Длина — 186 км. Площадь бассейна 3930 км².Населённых пунктов на реке нет, в 5 километрах юго-западнее устья, на берегу Хатанги, расположен посёлок Новорыбная.Река Блудная берёт начало из малого безымянного озера на высоте 361 м НУМ, вытекая из него на северной стороне. Далее река течёт на северо-восток, быстро теряя высоту — у левого притока Сенька — 69 м НУМ (падение на 292 м за 30 км), а у правого притока, Санга-Юрях, уже 32 м НУМ (за 20 км реки).Затем река втекает в низкорослый хвойный лес и заворачивает на север. Её ширина на этом участке 35 метров, глубина 0,9, а грунты дна твёрдые. Тут река справа принимает приток Саха-Юрях, а слева безымянный ручей из озера Семен-Кюель. У горы Онгуохтах-Сопка Блудная покидает лес и берёт направление на северо-запад.На выходе из леса река слева принимает Рассоху, а справа Джеруоху. После этого ширина реки достигает 107 метров, глубина метра. Донные грунты по прежнему состоят из твёрдых пород. Скорость течения 0,3 м/с.От горы Онгуохтах-Сопка до самого впадения в Блудную правого притока Киенг-Юрях река протекает через холмистую местность, колебание высот 10÷90 м НУМ."
     },
     {
        "name": "Блудная (приток Хилка)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BB%D1%83%D0%B4%D0%BD%D0%B0%D1%8F_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A5%D0%B8%D0%BB%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "164 км",
        "pool": "4480 км²",
        "consumption": "6,2 м³/с (95 км от устья)",
        "head": " ",
        "estuary": "Хилок",
        "location": " Россия",
        "info": "Блу́дная (Хилогосо́н) — река в Забайкальском крае России, левый приток Хилка.Исток реки располагается на северном склоне Малханского хребта. Длина реки составляет 164 км. Площадь водосбора — 4480 км². Средний расход воды — 6,2 м³/с.[источник не указан 376 дней]Притоки реки: Верхний Мултун, Большая Речка, Нижний Мултун, Тырбыхен, Каргастый, Верхний Цибитуй, Иржи, Харул, Арей, Зун-Шара-Горхон, Кутолага."
     },
     {
        "name": "Блудная (река, Большой Ляховский остров)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BB%D1%83%D0%B4%D0%BD%D0%B0%D1%8F_(%D1%80%D0%B5%D0%BA%D0%B0,_%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%9B%D1%8F%D1%85%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9_%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%B2)",
        "image": "undefined",
        "length": "151 км",
        "pool": "922 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Море Лаптевых",
        "location": " Россия",
        "info": "Блу́дная (устар. Вольная; якут. Блудная өрүс) — река в России на острове Большой Ляховский из группы Ляховских островов (Новосибирские острова).Длина реки составляет 151 км, площадь водосборного бассейна — 922 км². Берёт начало на севере от горы Чаллах-Хая и течёт на северо-запад. Впадает в море Лаптевых, образуя широкое, до 300 м, устье. В эстуарии находятся острова. Уклон реки — 0,2 м/км.Русло извилистое. Некоторые меандры превратились в старицы. Ширина русла в среднем течении составляет 15 м, после впадения левого притока — Большой Тундровой реки — расширяется до 40 м, около устья — 75 м. Глубина от 0,4 в среднем течении до 1,8 м в нижнем. Дно песчаное.Берега пологие, бывают обрывы высотой 5 м. Нижнее течение заболочено, образуется много озёр, стекающих в реку (озёра Кегелях-Кюельлере)."
     },
          {
        "name": "Блэкуотер (река, Ирландия)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BB%D1%8D%D0%BA%D1%83%D0%BE%D1%82%D0%B5%D1%80_(%D1%80%D0%B5%D0%BA%D0%B0,_%D0%98%D1%80%D0%BB%D0%B0%D0%BD%D0%B4%D0%B8%D1%8F)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/IMG_BlackwaterBridge3720rz.jpg/250px-IMG_BlackwaterBridge3720rz.jpg",
        "length": "168 км",
        "pool": "3108 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Кельтское море",
        "location": " Ирландия",
        "info": "Блэкуотер (англ. Blackwater / Munster Blackwater, ирл. Abhainn-mhór / Avonmore — великая река) — река, протекающая через графства Керри, Корк, Уотерфорд в Ирландии. Общая длина — 168 км.Блэкуотер, скорее всего, идентичен с рекой, которая в средневековой Ирландии именовалась Нем (др.‑ирл. Néim) и считалась одной из четырнадцати великих рек Ирландии. Современное английское название Blackwater (дословно Чёрная вода) произошло по трём причинам: из-за тёмных вод реки, из-за близости болот и угольных месторождений. Местные жители называют реку Abhainn-mhór / Avonmore, что значит большая или великая река.В путевых заметках путешественников XIX века сравнивалась с Рейном или Дунаем.До IX века река впадала в Уайтинг Бэй, но из-за сильнейшей бури изменило русло. Пришедшие на эти земли норманы в XII веке устроили гражданские и военные поселения у реки. До XVII века здесь располагались главные морские порты Ирландии. С укрупнением кораблей порты потеряли свою ведущую роль из-за мелкого наносного песчаного побережья.Река берёт начало в горах Макгилликаддис-Рикс в графстве Керри и течёт прямо на восток через графство Уотерфорд, где у деревни Каппокуин резко поворачивает на юг к Кельтскому морю."
     },
          {
        "name": "Бобр ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B1%D1%80_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Bobr_River.jpg/250px-Bobr_River.jpg",
        "length": "124 км",
        "pool": "2190 км²",
        "consumption": "14,9 м³/с",
        "head": " ",
        "estuary": "Березина",
        "location": " Белоруссия",
        "info": "Бобр (белор. Бобр) — река в Толочинском районе Витебской области и Крупском, Борисовском районах Минской области Белоруссии, левый приток Березины. Длина реки — 124 км, площадь водосборного бассейна — 2190 км². Среднегодовой расход воды — в устье 15 м³/с, в половодье — до 540 м³/сек. Средний уклон реки — 0,56 м/км.Берёт начало на Оршанской возвышенности у деревни Рафалово (белор. Рафалава) в Толочинском районе. Исток лежит на границе бассейнов Березины, Друти и Западной Двины. Протекает по Центральноберезинской равнине, генеральное направление течения — юго-запад. Замерзает в середине декабря, ледоход в середине марта. По берегам поселения бобров, в пойме мелиоративные каналы. Долина трапециевидная, ширина 1—2 км. Пойма неровная, местами заболоченная, ширина 300—500 м. Русло извилистое, свободно меандрирует, ширина реки в межень 6—25 м, в устье около 40 м. Берега крутые, местами обрывистые.Основные притоки — Нача, Обчуга (справа); Можа, Еленка, Плиса, Осока.На реке Бобр расположены: город Крупки, посёлок Бобр, крупные деревни Обчуга, Старый Бобр, Выдрица и многочисленные более мелкие деревни."
     },
     {
        "name": "Бобрик (верхний приток Припяти)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B1%D1%80%D0%B8%D0%BA_(%D0%B2%D0%B5%D1%80%D1%85%D0%BD%D0%B8%D0%B9_%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9F%D1%80%D0%B8%D0%BF%D1%8F%D1%82%D0%B8)",
        "image": "undefined",
        "length": "109 км",
        "pool": "1902 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Припять",
        "location": " Белоруссия",
        "info": "Бо́брик (белор. Бобрык, Бобрык Першы) — река в Брестской области Белоруссии, левый приток Припяти.Исток реки находится в болотах около деревни Сукач Ганцевичского района. Река протекает по Припятскому Полесью, преимущественно по территории Пинского и Лунинецкого районов, впадая в Припять в 2 км к северо-западу от железнодорожной станции Припять.Длина реки — 109 км, площадь водосборного бассейна — 1902 км², среднегодовой расход воды в районе устья — 7,6 м³/с, уклон реки — 0,3 м/км.Ширина реки изменяется от 3 м в верхнем течении до 40—50 м около устья. На протяжении 102 км русло канализировано. Долина не выражена. Пойма двусторонняя, шириной 500—1000 м в среднем течении.Крупнейший приток — Вислица (правый). Есть связь с системой мелиорационных каналов. Через протоку и озеро Погостское река Бобрик связана с водохранилищем Погост. На самой реке возле агрогородка Парохонск обустроены два небольших пруда."
     },
              {
        "name": "Бобровка (приток Амни)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B1%D1%80%D0%BE%D0%B2%D0%BA%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%90%D0%BC%D0%BD%D0%B8)",
        "image": "undefined",
        "length": "139 км",
        "pool": "1010 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Амня",
        "location": " Россия",
        "info": "Бобровка — река в Ханты-Мансийском АО России. Устье реки находится в 17 км по левому берегу реки Амня. Длина реки составляет 139 км. Площадь водосборного бассейна — 1010 км².Высота устья — 21,9 м над уровнем моря.(км от устья)По данным государственного водного реестра России относится к Нижнеобскому бассейновому округу, водохозяйственный участок реки — Обь от впадения Иртыша до впадения реки Северная Сосьва, речной подбассейн реки — бассейны притока Оби от Иртыша до впадения Северной Сосьвы. Речной бассейн реки — (Нижняя) Обь от впадения Иртыша.Код объекта в государственном водном реестре — 15020100112115300021637."
     },
                        {
        "name": "Боган ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B3%D0%B0%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Bogan_River-Nyngan.JPG/250px-Bogan_River-Nyngan.JPG",
        "length": "617 км",
        "pool": "18 000 км²",
        "consumption": "8,1 м³/с (Плотина Гонголгон)",
        "head": "Литл-Ривер",
        "estuary": "Дарлинг",
        "location": " Австралия",
        "info": "Бо́ган (англ. Bogan River) — река в районах Центральный Запад и Орана штата Новый Южный Уэльс, Австралия.Длина реки — 617 км.[источник не указан 619 дней] Средний расход воды — 8,1 м³/с.[источник не указан 619 дней] Высота устья — 111 м над уровнем моря.[источник не указан 619 дней] Высота истока — 305 м над уровнем моря.[источник не указан 619 дней] Уклон реки — 0,314 м/км.[источник не указан 619 дней]Боган является частью водного бассейна Муррей—Дарлинг. Река берёт своё начало близ городка Паркс. Общее направление течения — с юго-юго-востока на северо-северо-запад. Близ городка Берк сливается с речушкой Литл-Боган, образуя начало реки Дарлинг. Боган принимает около двадцати притоков. В отличие от большинства других рек региона, Боган имеет маленький уклон, медленное течение и для ирригации не используется. Реку пересекает шоссе Камиларои.Об этимологии названия есть две версии. Согласно первой, боган в переводе с языка коренных жителей — «место рождения известного вождя местного племени». Согласно второй, на гойдельских языках (а среди здешних первых европейских поселенцев было много ирландцев и шотландцев) это слово означает «верховое болото», а именно в таком водоёме берёт своё начало река Боган."
     },
     {
        "name": "Боганида (приток Хеты)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B3%D0%B0%D0%BD%D0%B8%D0%B4%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A5%D0%B5%D1%82%D1%8B)",
        "image": "undefined",
        "length": "366 км",
        "pool": "10 700 км²",
        "consumption": "undefined",
        "head": "Тонское",
        "estuary": "Хета",
        "location": " Россия",
        "info": "Боганида (в верховье Копсоккон) — река в Сибири, в Красноярском крае России, левый приток реки Хеты. Устье реки находится в 374 км от устья Хеты. Длина реки — 366 км, площадь водосборного бассейна — 10700 км².Высота истока — 46 м над уровнем моря. Бассейн расположен на Северо-Сибирской низменности."
     },
               {
        "name": "Богота ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B3%D0%BE%D1%82%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/RioBogotaBrice%C3%B1o.JPG/250px-RioBogotaBrice%C3%B1o.JPG",
        "length": "380 км",
        "pool": "5891,43 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Магдалена",
        "location": " Колумбия",
        "info": "Богота́ (исп. Río Bogotá) — река на северо-западе Южной Америки, протекает по территории департамента Кундинамарка в западной части Колумбии, а также через столичный регион. Длина реки составляет 380 км. Бассейн охватывает территорию в 5891,43 км²Берёт начало в горах севернее столицы страны, в муниципалитете Вильяпинзон, на высоте 3300 метров над уровнем моря. Впадает в реку Магдалена в муниципалитете Хирардот. Высота устья — 280 метров над уровнем моря. Расход воды в приустьевой части составляет 34,34 м³/с в сухие периоды года и 52,44 м³/с — во влажные.Основными притоками являются реки Сисга, Неуса, Тибиток, Техар, Рио-Негро, Теусака, Рио-Фрио, Чику, Салитре, Фуча, Тунхуэлито, Сиеча, Бальсильяс, Каландайма и Апуло.В верховьях (выше холмов Серрос-де-Бокерон) долина реки сложена песчаными и глинистыми отложениями мелового и третичного периодов, в нижней части — конгломератами осадочных пород.На территории бассейна осуществляется добыча глины, песка, известняка, кварца, угля и соли.Температура в бассейне Боготы меняется в пределах от 6 °C до 30 °C, большей частью держась в границах 9—15 °C. Количество осадков — от 400 до 2200 миллиметров в год.Площадь лесов в долине Боготы составляет 1623,63 км²."
     },
        {
        "name": "Богучарка",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B3%D1%83%D1%87%D0%B0%D1%80%D0%BA%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%BE%D0%B3%D1%83%D1%87%D0%B0%D1%80%D0%BA%D0%B0.jpg/250px-%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%BE%D0%B3%D1%83%D1%87%D0%B0%D1%80%D0%BA%D0%B0.jpg",
        "length": "101 км",
        "pool": "3240 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Дон",
        "location": " Россия",
        "info": "Богуча́рка — река на юге Воронежской области России, правый приток Дона. На реке находится город Богучар. Длина реки — 101 км, площадь водосборного бассейна — 3240 км².Река течёт в южной части Воронежской области, которая расположена на отрогах Донского массива с абсолютными отметками более 150 метров. Территория бассейна реки представляет собой холмистую местность с выходами меловых отложений, в которых встречается меловой карст.Наивысшая отметка водосбора равна 233 м[источник не указан 3723 дня], она находится в верховьях Левой Богучарки. На водоразделе с рекой Белой отметка местности понижается до 203 м.На поверхности водосбора протекает 21 река длиной более 21 км[источник не указан 3723 дня]. Самые значительные из них — Левая Богучарка длиной 61 км. Заболоченность бассейна Богучарки небольшая.По данным государственного водного реестра России относится к Донскому бассейновому округу, водохозяйственный участок реки — Дон от города Павловск и до устья реки Хопёр, без реки Подгорная, речной подбассейн реки — бассейны притоков Дона до впадения Хопра. Речной бассейн реки — Дон (российская часть бассейна)."
     },
      {
        "name": "Бодва",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B4%D0%B2%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/J%C3%A1sz%C3%B353.JPG/250px-J%C3%A1sz%C3%B353.JPG",
        "length": "113 км",
        "pool": "890 км²",
        "consumption": "5 м³/с",
        "head": " ",
        "estuary": "Шайо",
        "location": "",
        "info": "Бо́два (словацк. Bodva, венг. Bódva) — река в Словакии (Кошицкий край) и Венгрии (Боршод-Абауй-Земплен), приток Шайо. Площадь водосборного бассейна — 890 км².[источник не указан 2037 дней] Общая длина реки составляет 113 км, из них 48,4 км река течёт по территории Словакии.Река Бодва берёт начало в словацких горах Воловске-Врхи. Высота истока — 900 м над уровнем моря.[источник не указан 2037 дней] Течёт на юг, протекает через Молдаву-над-Бодвоу. Далее пересекает государственную границу и течёт по территории Венгрии. Впадает в Шайо в районе посёлка Больдва.В районе государственной границы средняя скорость течения составляет 5 м³/с.Главные притоки: Ида и Турня."
     },
     {
        "name": "Бодрог",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B4%D1%80%D0%BE%D0%B3",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/River_Tisza_%26_Bodrog_Tokaj.jpg/250px-River_Tisza_%26_Bodrog_Tokaj.jpg",
        "length": "188 км",
        "pool": "11 552 км²",
        "consumption": "средний: 115 м³/с",
        "head": "слияние рек: Ондава и Латорица",
        "estuary": "Тиса",
        "location": "undefined",
        "info": "Бо́дрог (словацк. Bodrog, венг. Bodrog) — река в Словакии (Кошицкий край) и Венгрии (медье Боршод-Абауй-Земплен). Река Бодрог судоходна. Главные притоки — Латорица, Ондава и Ронява.Река Бодрог берёт начало в центральной части Восточнословацкой низменности при слиянии рек Латорица и Ондава. Течёт на юго-запад, пересекает словацко-венгерскую границу рядом с деревней Борша. Впадает в Тису в районе города Токай. Русло реки извилистое. На реке Бодрог расположен венгерский город Шарошпатак."
     },
        {
        "name": "Бозсу",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B7%D1%81%D1%83",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/%D0%91%D0%BE%D0%B7%D1%81%D1%83_%D0%B2_%D1%80%D0%B0%D0%B9%D0%BE%D0%BD%D0%B5_%D0%B6._%D0%B4._%D0%A2%D0%B0%D1%88%D0%BA%D0%B5%D0%BD%D1%82-%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0.JPG/280px-%D0%91%D0%BE%D0%B7%D1%81%D1%83_%D0%B2_%D1%80%D0%B0%D0%B9%D0%BE%D0%BD%D0%B5_%D0%B6._%D0%B4._%D0%A2%D0%B0%D1%88%D0%BA%D0%B5%D0%BD%D1%82-%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0.JPG",
        "length": "138[ком 1] км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "undefined",
        "estuary": "Сырдарья ",
        "location": " Узбекистан,  Казахстан",
        "info": "Бозсу́ (узб. Bo‘zsuv, Бўзсув; в некоторых источниках, преимущественно старых, пишется через дефис: Боз-су, Бўз-сув, в ряде дореволюционных картографических источников Боссу, Бос-Су) — магистральный ирригационный канал (арык) в Ташкентской области и городе Ташкенте, питающий водой большинство других каналов на территории столицы. Представляет собой протоку реки Чирчик, которая ещё в древности была преобразована в канал.Средний расход воды — 110 м³/с.[источник не указан 723 дня] Высота устья — 253 м над уровнем моря.[источник не указан 723 дня]Служит энергетическим трактом для каскада ГЭС.Согласно Э. М. Мурзаеву, топоним Бозсу в Ташкентской области восходит к тюркскому слову боз. Этим словом именовалась степь, в которой растительность представлена злаками типа ковыля и типчака — целинные и залежные земли. Основное значение слова — «светлый, серый», с узбекского языка boz переводится как «целина». Изыскатель по ирригации А. Звягинцев приводит иную этимологию названия: «резвая свободная вода».Небольшой участок Бозсу (около 4 км) на территории Старого города Ташкента, часто рассматривается как самостоятельный канал, известный под названиями Джангоб (узб. Jangob, Жангоб) и Лабзак (узб. Labzak arig‘i, Лабзак ариғи). Народное название Джангоб («ручей битвы») является более древним, оно отсылает к событиям около 1784 года, когда в овраге канала произошло сражение между жителями четырёх частей города за обладание Ташкентом (см. ниже). Название Лабзак фиксируется в источниках, начиная с XIX века. Это название происходит от словосочетания Лаби зах — «сырая земля» (тадж. лаби — «берег», тадж. заҳ — «сырой, влажный»)."
     },
     {
        "name": "Бойн",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B9%D0%BD",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Boyne_River.jpg/250px-Boyne_River.jpg",
        "length": "112 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Ирландское море",
        "location": " Ирландия",
        "info": "Бойн (англ. Boyne, ирл. Abhainn na Bóinne) — река в провинции Ленстер в Ирландии. Берёт начало в деревне Кёрбери в графстве Килдер и течёт на северо-восток по графству Мит. Длина реки 112 километров. В месте впадения реки Бойн в Ирландское море находится город Дроэда.Несмотря на небольшую протяжённость, река имеет большое культурное значение. В её долине имеется множество исторических мест и архитектурных памятников, в том числе ансамбль курганов эпохи неолита, включённый во Всемирное наследие ЮНЕСКО. Река протекает рядом с исторически известным городом Трим, замком Трим и холмом Тара. Главное сражение в истории Ирландии — Битва на реке Бойн во время Вильямитской войны — произошло в долине этой реки. Навигация на реке проходила по многочисленным каналам, параллельным реке, в настоящее время ведутся работы по восстановлению судоходства. В реке водится лосось и форель."
     },
      {
        "name": "Бойсе ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B9%D1%81%D0%B5_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Tubers_Float_the_Boise_River.JPG/250px-Tubers_Float_the_Boise_River.JPG",
        "length": "150 км",
        "pool": "10 619 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Снейк",
        "location": " США",
        "info": "Бо́йсе (англ. Boise River) — река на западе центральной части штата Айдахо, США. Правый приток реки Снейк. Длина составляет около 150 км, площадь бассейна — 10 619 км².[источник не указан 547 дней]Берёт начало в районе горного хребта Сотут, в виде трёх верховий. Верховье Норт-Форк имеет длину 80 км и начинается примерно в 100 км к северо-востоку от города Бойсе. Течёт в юго-западном направлении через горную местность на территории национального леса Бойсе. Мидл-Форк составляет около 84 км в длину и берёт начало в 19 км от реки Норт-Форк, на северо-востоке округа Элмор. Течёт также в юго-западном направлении, протекает через город Атланта и соединяется с рекой Норт-Форк, формируя реку Бойсе, примерно в 24 км к юго-востоку от города Айдахо-Сити. Река Бойсе продолжает течь на юго-запад и впадает в водохранилище Арроурок. Здесь река принимает крупный приток Саут-Форк, длина которого 163 км.[источник не указан 547 дней]После прохождения водохранилища река течёт преимущественно в западном и северо-западном направлениях. Впадает в реку Снейк на границе штатов Айдахо и Орегон, к западу от города Парма и в 5 км к югу от города Нисса. Высота устья — 666 м над уровнем моря."
     },
             {
        "name": "Болва",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D0%B2%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Confluence_of_Desna_and_Bolva_in_Bryansk.JPG/250px-Confluence_of_Desna_and_Bolva_in_Bryansk.JPG",
        "length": "213 км",
        "pool": "4340 км²",
        "consumption": "22 м³/с (в устье)",
        "head": " ",
        "estuary": "Десна",
        "location": " Россия",
        "info": "Болва́ (устар. Обо́лва, Аболва, Оболвь) — река в Калужской и Брянской областях России, левый приток Десны.Длина реки — 213 км, площадь водосборного бассейна — 4340 км², средний расход воды в устье — 22 м³/сек.Исток Болвы расположен близ деревни Болва, недалеко от города Спас-Деменск Калужской области, на южных склонах Смоленской возвышенности. Протекает преимущественно в южном направлении. Основные притоки — Ковылинка, Дегна, Неручь (с притоком Ужать), Неполоть, Радица (левые); Песочня, Колчинка, Верещевка (правые).В нижнем течении Болва практически не имеет правых притоков; ввиду строения рельефа практически всё правобережье Болвы в пределах Брянской области относится к бассейну Ветьмы.Во время весеннего паводка для нижнего течения Болвы характерно значительное (до 7—8 м) повышение уровня, в связи с чем её пойма простирается в ширину до 1 км. Практически ежегодно подвергается кратковременному затоплению территория пгт Радица-Крыловка; население бывает вынуждено передвигаться по посёлку на лодках.На реке расположены города Спас-Деменск, Киров, Людиново, Фокино, Дятьково. Впадает в Десну в черте города Брянска.В XIX веке река Болва была судоходной от Сукремльского завода до её впадения в Десну, во время весеннего половодья."
     },
      {
        "name": "Болгарчай",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D0%B3%D0%B0%D1%80%D1%87%D0%B0%D0%B9",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Drainage_basin_of_Bolqarchay.png/250px-Drainage_basin_of_Bolqarchay.png",
        "length": "134 км",
        "pool": "2170 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Махмудчала",
        "location": " Иран,  Азербайджан",
        "info": "Болгарчай (устар. Болгару-чай; азерб. Bolqarçay) — река в южной части Муганской степи Азербайджана. Берёт начало в Талышских горах и впадает в болотистое урочище Махмудчала.Болгару (по-талышски ру — «река»; река протекала в прошлом по границе расселения талышей).Длина реки составляет 134 км, площадь водосборного бассейна — 2170 км². Воды реки используются для орошения. По Болгарчаю в верхнем и среднем течении проходит граница между Азербайджаном и Ираном. Берёт начало в горах Уджаруд и впадает в озеро Махмудчале. Протекает в северной части шахрестана Герми и отделяет его от Ярдымлинского и Джалильабадского районов, расположенных в Республике Азербайджан.Образуется от слияния нескольких сезонных рек, таких как Салалачай, Гермичай, Шевончай, а также пограничной притоки, которая берёт начало в селе Офдже. Эта река, после впадения всех притоков, которые берут начало в горах шахрестана Герми, протекает через село Ага Хасан Бейглу и направляется на территорию шахрестана Белое Савар, определяя его границу с Республикой Азербайджан. Затем направляется на сторону Азербайджана и там впадает в озеро Махмудчале. Среди жителей региона самыми распространенными названиями являются Балхаричай и Болгарчай. Применение к ней названия Балхаруд из-за персидскоязычности слова руд  не представляется правильным."
     },
                                               {
        "name": "Большая (приток Калитвы)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9A%D0%B0%D0%BB%D0%B8%D1%82%D0%B2%D1%8B)",
        "image": "undefined",
        "length": "152 км",
        "pool": "2160 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Калитва",
        "location": " Россия",
        "info": "Больша́я (Ба́лка Больша́я) — река в Ростовской области. Длина 152 км, площадь бассейна 2160 км². Левый приток Калитвы (бассейн Дона). Питание преимущественно снеговое. В верховьях пересыхает. Имеет сильно извилистое течение.Берёт начало на южных склонах Донской гряды, впадает в Калитву, в 93 км от её устья, между Ольховой и Берёзовой.Протекает по Тарасовскому, Кашарскому и Боковскому районам Ростовской области.Река принимает два больших левых притока — Мечетку (Мечетную) и Нагольную (крупнейший); последнюю, по мнению В. В. Богачёва, следует считать главной рекой.(км от устья)На реке стоят в Кашарском районе: Верхнегреково, 2-й Киевский, Фомино-Свечниково, Сариновка, в Тарасовском районе — Большинка."
     },
              {
        "name": "Большая (река, впадает в Охотское море)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_(%D1%80%D0%B5%D0%BA%D0%B0,_%D0%B2%D0%BF%D0%B0%D0%B4%D0%B0%D0%B5%D1%82_%D0%B2_%D0%9E%D1%85%D0%BE%D1%82%D1%81%D0%BA%D0%BE%D0%B5_%D0%BC%D0%BE%D1%80%D0%B5)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Bystraja-wikimapia.jpg/250px-Bystraja-wikimapia.jpg",
        "length": "275 км",
        "pool": "10 800 км²",
        "consumption": "123 м³/с (96 км от устья)",
        "head": " ",
        "estuary": "Охотское море",
        "location": " Россия",
        "info": "Больша́я (выше устья р. Плотникова — Быстрая) — река на юго-западе полуострова Камчатка в России.Длина реки — 275 км. Площадь водосборного бассейна — 10 800 км². Берёт начало в Ганальском хребте, протекает по территории Елизовского и Усть-Большерецкого районов Камчатского края вдоль южных отрогов Срединного хребта. Впадает в Охотское море.Среднегодовой расход воды — 123 м³/с. Река имеет 227 притоков длиной менее 10 км. Средняя скорость течения составляет 0,5—2 м/с, а глубина — 1—3 м, в верхнем течении — 0,8—2 м. Ширина русла — 50—100 м в нижнем течении и 20—40 м в верховьях. Во многих местах по реке наблюдаются выходы тёплых ключей и минеральных источников. Судоходна в нижнем течении.Исторически река являлась магистральным путём для связи западного берега полуострова с долиной реки Камчатки и восточным побережьем.Река имеет немаловажное значение, как место размножения западно-камчатских лососёвых рыб. Нереститься в эту реку заходят более 40 тыс. особей чавычи, 300 тыс. — нерки, до 20 млн — горбуши, свыше 100 тыс. особей кижуча. Также встречается здесь много других видов: проходной голец, хариус, жилая микижа и кунджа, камчатская сёмга (проходной вид микижи).На реке имеются участки пригодные для организации лодочного туризма, таки как участок от села Малка до лимана реки Большой, где меньше нерестилищ рыб, кроме горбуши и чавычи. Наилучшее время для ловли чавычи — начало мая—середина июля. Во второй половине августа рыбы становится меньше, так как она уходит на нерест. Для ловли кижуча соответствующие сроки середина августа—конец сентября, на нижнем течении и октябрь. Здесь также возможен лов других видов лососёвых."
     },
      {
        "name": "Большая Авландя",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%90%D0%B2%D0%BB%D0%B0%D0%BD%D0%B4%D1%8F",
        "image": "undefined",
        "length": "120 км",
        "pool": "1840 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Омолон",
        "location": " Россия",
        "info": "Большая Авландя, или Большая Ауланджа, — река в России, протекает по территории Северо-Эвенского района Магаданской области. Правый приток Омолона, впадает в него 814 км от устья. Протекает по территории Северо-Эвенского района Магаданской области, вдали от населённых пунктов. Длина реки — 120 км, площадь водосборного бассейна — 1840 км².По данным государственного водного реестра России относится к Анадыро-Колымскому бассейновому округу, речной бассейн реки — Колыма, речной подбассейн — Омолон. Водохозяйственный участок реки — река Омолон.Код объекта в государственном водном реестре — 19010200112119000049357."
     },
     {
        "name": "Большая Анга",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%90%D0%BD%D0%B3%D0%B0",
        "image": "undefined",
        "length": "167 км",
        "pool": "2540 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Лена",
        "location": " Россия",
        "info": "Большая Анга (в низовьях — Анга) — река в России, протекает по территории Качугского района Иркутской области. Длина реки 167 километров, площадь водосборного бассейна — 2540 км².Начинается в осиново-сосновом лесу вблизи пади Карчикай юго-восточнее озера Тулон на высоте около 900 метров над уровнем моря. От истока течёт на запад по заболоченной тайге. В дальнейшем протекает вдоль южных склонов Чёрного хребта. Вблизи устья Турчи входит в населённую местность (по правому берегу, левый порос лиственничой и лиственнично-еловой тайгой). Пересекается мостами в Анге и Малых Голах. Впадает в Лену справа на расстоянии 3969 км от её устья на высоте 511 метров над уровнем моря на территории посёлка Качуг.Ширина реки в низовьях — 25 метров, глубина — 80 сантиметровПротекает через деревни Кузнецы, Дурутуй, Мыс, Тарай, село Анга, деревни Рыкова, Чептыхой, Малые Голы, Краснояр.Объекты перечислены по порядку от устья к истоку.По данным государственного водного реестра России относится к Ленскому бассейновому округу, речной бассейн — Лена, водохозяйственный участок — Лена от истока до города Усть-Кут.Код объекта в государственном водном реестре — 18030000112117100001063."
     },
               {
        "name": "Большая Балахня",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%91%D0%B0%D0%BB%D0%B0%D1%85%D0%BD%D1%8F",
        "image": "undefined",
        "length": "532 км",
        "pool": "12 600 км²",
        "consumption": "undefined",
        "head": "Маягастах",
        "estuary": "Хатангский залив",
        "location": " Россия",
        "info": "Большая Балахня — река, протекающая в Красноярском крае России.Длина реки составляет 532 км, площадь водосборного бассейна — 12 600 км². Река берёт начало из озера Маягастах в центральной части Северо-Сибирской низменности и течёт в восточном направлении по заболоченной тундре. Впадает в небольшую бухту на западном берегу Хатангского залива. Питание реки снеговое и дождевое. Замерзает в конце сентября, вскрывается в начале июня. Река богата рыбой: здесь водятся кандёвка, муксун, нельма, голец.В Государственном водном реестре исток Большой Балахни — это озеро Маягастях, но на самом деле, истоком является группа озёр Курлушка, Долгое и Ат-Бастах, расположенные в 10 км западнее. Озера Маягастах отделяет от этой группы озёр небольшой хребет, из него берёт начало приток реки Мойка-Юрях[источник не указан 3636 дней]По данным государственного водного реестра России и геоинформационной системы водохозяйственного районирования территории РФ, подготовленной Федеральным агентством водных ресурсов:"
     },
                           {
        "name": "Большая Варламовка",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%92%D0%B0%D1%80%D0%BB%D0%B0%D0%BC%D0%BE%D0%B2%D0%BA%D0%B0",
        "image": "undefined",
        "length": "196 км",
        "pool": "2230 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Енисей",
        "location": " Россия",
        "info": "Большая Варламовка — река в России, протекает по территории Туруханского района Красноярского края. Правый приток Енисея.Река Большая Варламовка протекает по болотистой местности вдали от населённых пунктов по территории Центральносибирского заповедника. Основные притоки (от истока до устья): Раскол, Раскосая, Маленькая, Большая Раскосая, Сухая, Шумный, Малая Варламовка, Крутой, Варламовский. Впадает в Енисей справа на расстоянии 1436 км от устья. Длина реки — 196 км, площадь водосборного бассейна — 2230 км².По данным государственного водного реестра России относится к Енисейскому бассейновому округу. Код водного объекта — 17010600112116100053943."
     },
             {
        "name": "Большая Визинга",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%92%D0%B8%D0%B7%D0%B8%D0%BD%D0%B3%D0%B0",
        "image": "undefined",
        "length": "167 км",
        "pool": "1970 км²",
        "consumption": "10,68 м³/с (58 км от устья)",
        "head": " ",
        "estuary": "Сысола",
        "location": " Россия",
        "info": "Больша́я Ви́зинга (Большая Визенга, в верхнем течении Визинга) — река в Республике Коми, левый приток реки Сысолы (бассейн Северной Двины).Длина — 167 км, площадь бассейна — 1970 км². Средний расход воды — 10,68 м³/с.[источник не указан 545 дней] Питание смешанное, с преобладанием снегового.Начинается на территории Сысольского района в 10 км к западу от деревни Семушино как Визинга. Совершает плавный изгиб, заходя на территорию Прилузского района, после чего течёт на северо-восток. Принимает многочисленные притоки, крупнейшие из них Буб и Вепрь (оба правые). Высота устья — 90 м над уровнем моря.[источник не указан 545 дней]На левом берегу реки расположены посёлки Шугрэм, Визиндор, деревни Горьковская, Митюшсикт; в 10 километрах от впадения Большой Визинги в Сысолу на обоих берегах — большое село Визинга. (расстояние от устья)"
     },
             {
        "name": "Большая Воровская",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%92%D0%BE%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F",
        "image": "undefined",
        "length": "167 км",
        "pool": "3660 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Охотское море",
        "location": " Россия",
        "info": "Большая Воровская (в верховье Правая Воровская) — река на полуострове Камчатка в России.Длина реки — 167 км. Площадь водосборного бассейна — 3660 км². Протекает по территории Соболевского района Камчатского края. Впадает в Охотское море.Водосборный бассейн реки на юге с бассейном реки Удова.(указано расстояние от устья)По данным государственного водного реестра России относится к Анадыро-Колымскому бассейновому округу."
     },
        {
        "name": "Большая Высь",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%92%D1%8B%D1%81%D1%8C",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/%D0%92%D0%B5%D0%BB%D0%B8%D0%BA%D0%B0_%D0%92%D0%B8%D1%81%D1%8C2.jpg/250px-%D0%92%D0%B5%D0%BB%D0%B8%D0%BA%D0%B0_%D0%92%D0%B8%D1%81%D1%8C2.jpg",
        "length": "166 км",
        "pool": "2860 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Синюха",
        "location": " Украина",
        "info": "Больша́я Высь (укр. Велика Вись) — река на Украине, левый приток Синюхи (бассейн Южного Буга). Протекает по территории Кировоградской и Черкасской областей, в пределах Приднепровской возвышенности, имеется 6 водохранилищ. Питание преимущественно снеговое. На реке стоит город Новомиргород.Долина преимущественно корытообразная, в верховьях заболоченная; шириной 4 км, глубиной до 40 м. Русло слабоизвилистое, шириной до 20 метров. Уклон реки 0,55 м/км.Между сёлами Лекарево и Шмидове Новомиргородского района на большом пологом мысе левого берега реки Большая Высь находится археологическая стоянка позднего палеолита (36—38 тыс. л. н.) «Высь».Значение праславянского корня «вис» можно трактовать как «разливаться», «течь» (родственно с гидронимами Виска и Висла)."
     },
                                {
        "name": "Большая Евва",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%95%D0%B2%D0%B2%D0%B0",
        "image": "undefined",
        "length": "107 км",
        "pool": "1080 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Лозьва",
        "location": " Россия",
        "info": "Большая Евва — река в России, протекает по Свердловской области. Устье реки находится в 225 км по левому берегу реки Лозьва. Длина реки составляет 107 км, площадь водосборного бассейна — 1080 км².Высота устья — 64,4 м над уровнем моря.[источник не указан 601 день]По данным государственного водного реестра России относится к Иртышскому бассейновому округу, водохозяйственный участок реки — Тавда от истока и до устья, без реки Сосьва от истока до водомерного поста у деревни Морозково, речной подбассейн реки — Тобол. Речной бассейн реки — Иртыш.Код объекта в государственном водном реестре — 14010502512111200009311."
     },
              {
        "name": "Большая Ерёма",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%95%D1%80%D1%91%D0%BC%D0%B0",
        "image": "undefined",
        "length": "411 км",
        "pool": "13 500 км²",
        "consumption": "undefined",
        "head": "слияние рек: Левая Ерёма и Правая Ерёма",
        "estuary": "Нижняя Тунгуска",
        "location": " Россия",
        "info": "Большая Ерёма — река в России, на западе Восточной Сибири, левый приток Нижней Тунгуски.Протекает в Красноярском крае и Иркутской области по территории Эвенкийского и Катангского районов. Длина реки от истока Правой Ерёмы составляет 411 км. Площадь водосборного бассейна — 13 500 км². Берёт своё начало и протекает по Среднесибирскому плоскогорью. Крупные притоки — Алтыб и Ерёмакан.По данным государственного водного реестра России и геоинформационной системы водохозяйственного районирования территории РФ, подготовленной Федеральным агентством водных ресурсов:"
     },
               {
        "name": "Большая Игарка",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%98%D0%B3%D0%B0%D1%80%D0%BA%D0%B0",
        "image": "undefined",
        "length": "156 км",
        "pool": "1720 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Енисей",
        "location": " Россия",
        "info": "Большая Игарка — река в России, протекает по территории Туруханского района Красноярского края. Длина реки — 156 км, площадь её водосборного бассейна — 1720 км². Впадает в Енисей слева на расстоянии 696 км от его устья, напротив города Игарки. Река протекает в малонаселённой местности, населённые пункты на реке отсутствуют.По данным государственного водного реестра России относится к Енисейскому бассейновому округу."
     },
       {
        "name": "Большая Инта",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%98%D0%BD%D1%82%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/%D0%92%D0%B8%D0%B4_%D0%BD%D0%B0_%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D1%83%D1%8E_%D0%98%D0%BD%D1%82%D1%83_%D1%81_%D0%BC%D0%BE%D1%81%D1%82%D0%B0_%D0%A2%D0%AD%D0%A6_-_panoramio.jpg/250px-%D0%92%D0%B8%D0%B4_%D0%BD%D0%B0_%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D1%83%D1%8E_%D0%98%D0%BD%D1%82%D1%83_%D1%81_%D0%BC%D0%BE%D1%81%D1%82%D0%B0_%D0%A2%D0%AD%D0%A6_-_panoramio.jpg",
        "length": "105 км",
        "pool": "1180 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Косью",
        "location": " Россия",
        "info": "Больша́я Инта́ (коми Ыджыд Инта) — река в Республике Коми, правый приток реки Косью (бассейн Усы).Длина реки — 105 км, площадь водосборного бассейна — 1180 км². Протекает по территории городского округа Инта.Название происходит от ненецкого и(д) («вода») и суффикса -та: инта — «полноводная река» (вероятно, река так названа в сравнении с Косью, ненецкое название которой означает «сухая, мелководная река»).Берёт начало в местности Тундра Пясяда на отрогах Приполярного Урала. В верховьях течёт на северо-северо-восток, далее течёт на северо-запад. В нижней части протекает по заболоченной низменности — русло здесь извилистое со множеством стариц, на берегах расположены город Инта и посёлок Юсьтыдор. Впадает в Косью по правому берегу в 38 км от его устья и в 13 км к северо-западу от города.Значительная часть бассейна покрыта тайгой. В бассейне также находится посёлок Верхняя Инта.В среднем течении реку пересекает ж.-д. линия Котлас — Воркута.В реку впадает 61 приток.(от устья, в скобках указана длина в км)Имеется плотина (с автодорожным переходом) на реке в Инте, в 6 км к востоку от города русло перегорожено водосливом водозабора. Воды реки используются в том числе для нужд Интинской ТЭЦ."
     },
           {
        "name": "Большая Какша",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%9A%D0%B0%D0%BA%D1%88%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%9A%D0%B0%D0%BA%D1%88%D0%B0_%28%D0%BE%D0%BA%D0%BE%D0%BB%D0%BE_%D0%A7%D0%B5%D0%BD%D0%B5%D0%B1%D0%B5%D1%87%D0%B8%D1%85%D0%B8%29.jpg/250px-%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%9A%D0%B0%D0%BA%D1%88%D0%B0_%28%D0%BE%D0%BA%D0%BE%D0%BB%D0%BE_%D0%A7%D0%B5%D0%BD%D0%B5%D0%B1%D0%B5%D1%87%D0%B8%D1%85%D0%B8%29.jpg",
        "length": "138 км",
        "pool": "2250 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Ветлуга",
        "location": " Россия",
        "info": "Большая Какша (Какша) — река в Кировской и Нижегородской областях России, левый приток Ветлуги. Протекает по территории Шабалинского, Шахунского и Ветлужского районов. В верхнем течении называется Какша. Длина реки составляет 138 км, площадь водосборного бассейна — 2250 км².Исток реки расположен в черте посёлка Ленинское, административного центра Шабалинского района. Генеральное направление течения — юго-запад. Большая часть течения проходит по лесистой местности. На реке расположен посёлок Сява и несколько деревень. Впадает в Ветлугу выше города Ветлуга.По порядку от устья:По данным государственного водного реестра России относится к Верхневолжскому бассейновому округу, водохозяйственный участок реки — Ветлуга от истока до города Ветлуга, речной подбассейн реки — Волга от впадения Оки до Куйбышевского водохранилища (без бассейна Суры). Речной бассейн реки — (Верхняя) Волга до Куйбышевского водохранилища (без бассейна Оки)."
     },
          {
        "name": "Большая Каменка (приток Северского Донца)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%9A%D0%B0%D0%BC%D0%B5%D0%BD%D0%BA%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A1%D0%B5%D0%B2%D0%B5%D1%80%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%94%D0%BE%D0%BD%D1%86%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Bolshaya_Kamenka.jpg/250px-Bolshaya_Kamenka.jpg",
        "length": "118 км",
        "pool": "1810 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Северский Донец",
        "location": " Украина,  Россия",
        "info": "Больша́я Ка́менка (укр. Вели́ка Ка́м'янка) — река в Луганской области Украины и Ростовской области России, правый приток Северского Донца.Длина реки — 118 км, площадь водосборного бассейна — 1810 км². Впадает в Северский Донец в 214 км от его устья, при входе его в пределы Ростовской области, нередко изгибающаяся под прямым углом, благодаря пересечению складок и крутопоставленных пластов Донецкого кряжа, имеет чрезвычайно живописную долину. Будучи не особенно многоводной, она во многих местах перегорожена плотинами. На её скалистых берегах сохранился в достаточном количестве лес. Сочетание блестящих водных пятен прудов, а также плёсов реки с утёсами, покрытыми кудрявым мелким дубовым лесом и беспорядочно разбросанными домиками многочисленных хуторов, создаёт чрезвычайно красивую пестроту ландшафта реки.Город Донецк, устье в его восточных окрестностях на Северском Донце, на российской территории.Правые:Левые:"
     },
        {
        "name": "Большая Караганка",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%9A%D0%B0%D1%80%D0%B0%D0%B3%D0%B0%D0%BD%D0%BA%D0%B0",
        "image": "undefined",
        "length": "111 км",
        "pool": "3470 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Урал",
        "location": " Россия",
        "info": "Большая Караганка (в верховье Караганка) — река в Челябинской области России, протекает по территории Кизильского и Брединского районов. Устье реки находится в 1959 км по левому берегу реки Урал. Длина реки составляет 111 км, площадь водосборного бассейна — 3470 км².Гидроним сравнивают с казахским карагана «чилига» (кустарник из семейства бобовых). Есть и другая версия: топонимист А. А. Воронков из Челябинска считает допустимым этимологическое родство вычленяемого им форманта -ган с палеобалканским словом со значением «океан».На возвышенном мысу, образованном слиянием рек Большая Караганка и Утяганка находится Аркаим — укреплённое поселение эпохи средней бронзы рубежа 20/18-18/16 вв. до н. э.(км от устья)По данным государственного водного реестра России относится к Уральскому бассейновому округу, водохозяйственный участок реки — Урал от Магнитогорского гидроузла до Ириклинского гидроузла, речной подбассейн реки — подбассейн отсутствует. Речной бассейн реки — Урал (российская часть бассейна).Код объекта в государственном водном реестре — 12010000312112200002189."
     },
                 {
        "name": "Большая Кимитина",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%9A%D0%B8%D0%BC%D0%B8%D1%82%D0%B8%D0%BD%D0%B0",
        "image": "undefined",
        "length": "105 км",
        "pool": "2330 км²",
        "consumption": "undefined",
        "head": "Кимитина",
        "estuary": "Камчатка",
        "location": " Россия",
        "info": "Большая Кимитина, в нижнем течении Кимитина — река на полуострове Камчатка в России, протекает по территории Камчатского края. Длина реки — 105 км, площадь водосборного бассейна — 2330 км².Начинается в озере Кимитина, лежащем у подножия горы Круг Срединного хребта на высоте 642,6 метра над уровнем моря. От истока направляется на восток по долине между горными хребтами, после впадения Малой Кимитины поворачивает. Затем течёт в юго-восточном направлении по равнинной местности, поросшей берёзово-лиственничным лесом, левый берег заболочен. В низовьях пересекается дорогой Долиновка-Кирганик. Ширина реки выше моста 25 метров, глубина — 1,3 метра, дно каменистое. Впадает в Камчатку слева на расстоянии 497 км от её устья на высоте 103,5 метра над уровнем моря.Основные притоки:По данным государственного водного реестра России относится к Анадыро-Колымскому бассейновому округу.Код водного объекта — 19070000112120000013598."
     },
             {
        "name": "Большая Кокшага",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%9A%D0%BE%D0%BA%D1%88%D0%B0%D0%B3%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%9A%D0%BE%D0%BA%D1%88%D0%B0%D0%B3%D0%B01.jpg/250px-%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%9A%D0%BE%D0%BA%D1%88%D0%B0%D0%B3%D0%B01.jpg",
        "length": "294 км",
        "pool": "6330 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Волга",
        "location": " Россия",
        "info": "Больша́я Кокша́га (луговомар. Кугу Какшан) — река в Кировской области и Марий Эл, левый приток Волги.Длина реки — 294 км, площадь бассейна — 6330 км². Исток в 4,5 км к северо-востоку от села Кокшага в Кикнурском районе Кировской области. Общее направление течения — южное. Течёт по хвойным (в верховьях) и смешанным лесам, на территории Марий Эл протекает через заповедник «Большая Кокшага». Уклон реки — 0,3 м/км.[источник не указан 596 дней]Впадает в Куйбышевское водохранилище по левому (северному) берегу у западного края села Кокшайск (в 1925 км от устья Волги и в 5 км к северо-востоку от Мариинского Посада).Река сильно петляет, русло нестабильное со множеством стариц. Течение быстрое, замедляется ближе к устью. В нижнем течении непроходимые болота. Питание снеговое и дождевое. Ледостав с начала ноября по середину апреля.Протекает по территории Кикнурского и Санчурского районов Кировской области, Медведевского, Килемарского, Звениговского районов Марий Эл.Населённые пункты на реке (более 100 чел.): от истока — с. Кокшага, д. Кокшага, пгт Кикнур, Большое Шарыгино, Цекеево, пгт Санчурск, Большая- и Малая Шишовка (все — Кировская обл.), Старожильск, Кокшамары, Кокшайск (все — Марий Эл)."
     },
        {
        "name": "Большая Контайка",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%9A%D0%BE%D0%BD%D1%82%D0%B0%D0%B9%D0%BA%D0%B0",
        "image": "undefined",
        "length": "174 км",
        "pool": "1710 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Лена",
        "location": " Россия",
        "info": "Большая Контайка — река в России, протекает по территории Ленского района Якутии, правый приток реки Лены. Длина реки — 174 км, площадь водосборного бассейна — 1710 км².Протекает через леса вдали от населённых пунктов. Русло извилистое. Впадает в реку Лену напротив села Батамай на расстоянии 2472 км от её устья. Высота устья — 153 м над уровнем моря.По данным государственного водного реестра России относится к Ленскому бассейновому округу. Код водного объекта 18030300212117200001734."
     },
              {
        "name": "Большая Куберле",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%9A%D1%83%D0%B1%D0%B5%D1%80%D0%BB%D0%B5",
        "image": "undefined",
        "length": "133 км",
        "pool": "1960 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Сал",
        "location": " Россия",
        "info": "Большая Куберле — река в России, протекает в Мартыновском, Зимовниковском и Орловском районах Ростовской области.Устье реки находится в 293 км по левому берегу реки Сал. Длина реки составляет 133 км. Площадь водосборного бассейна — 1960 км². Имеет левый приток Двойная, впадающий в 46 км от устья.По данным государственного водного реестра России относится к Донскому бассейновому округу, водохозяйственный участок реки — Сал, речной подбассейн реки — Бассейн притоков Дона ниже впадения Северского Донца. Речной бассейн реки — Дон (российская часть бассейна).Код объекта в государственном водном реестре — 05010500112107000015780."
     },
     {
        "name": "Большая Кугульта",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%9A%D1%83%D0%B3%D1%83%D0%BB%D1%8C%D1%82%D0%B0",
        "image": "undefined",
        "length": "112 км",
        "pool": "1310 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Егорлык",
        "location": " Россия",
        "info": "Большая Кугульта (Большая Кугульча) — река в России, протекает в Ставропольском крае.Устье реки находится в 243 км по правому берегу реки Егорлык. Длина реки составляет 112 км.В реку впадают притоки, наиболее крупные из которых:По данным государственного водного реестра России относится к Донскому бассейновому округу, водохозяйственный участок реки — Егорлык от Новотроицкого гидроузла и до устья, речной подбассейн реки — бассейн притоков Дона ниже впадения Северского Донца. Речной бассейн реки — Дон (российская часть бассейна).Код объекта в государственном водном реестре — 05010500612107000016980.Также на реке стоял хутор Большая Кугульта, снятый с учёта 06.07.1970 Решением Ставропольского краевого совета № 490-г от 06.07.1970."
     },
             {
        "name": "Большая Куропаточья",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%9A%D1%83%D1%80%D0%BE%D0%BF%D0%B0%D1%82%D0%BE%D1%87%D1%8C%D1%8F",
        "image": "undefined",
        "length": "391 км",
        "pool": "6240 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Восточно-Сибирское море",
        "location": " Россия",
        "info": "Большая Куропаточья — река в России, протекает по территории Нижнеколымского района Якутии, в пределах Колымской низменности. Течет по тундре на север среди множества озёр, впадает в Восточно-Сибирское море, образуя эстуарий. Бассейн реки расположен к востоку от бассейна Малой Куропаточьи и к западу от Гальгаваамы.Длина реки — 391 км, площадь водосборного бассейна — 6240 км².Зимой река перемерзает, а в бассейне реки образуются обширные наледи. Питание реки снеговое и дождевое."
     },
                    {
        "name": "Большая Лаба",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%9B%D0%B0%D0%B1%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Kuban_basin.svg/250px-Kuban_basin.svg.png",
        "length": "133 км",
        "pool": "Бассейн Кубани",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Лаба",
        "location": " Россия",
        "info": "Больша́я Лаба́ (кабард.-черк. Лабэшхуэ, карач.-балк. Уллу Лаба, абаз. Алаба) — река в России, протекает по территории Карачаево-Черкесии и Краснодарского края, правая составляющая реки Лаба (бассейн Кубани). Длина реки — 127 км, площадь водосбора — 1730 км².Берёт начало в ледниках горы Пшиш (3790 м) у перевала Лаба на границе с Абхазией. Принимает в себя ряд притоков. Правый приток Пхия (берёт начало на леднике горы Закын-Сырт (3097 м)).Левые притоки: Санчаро, Макера, Мамхурц, Дамхурц, Закан (берёт начало на ледниках Главного Кавказского хребта), Бескес.На Большой Лабе расположены сёла и станицы: Пхия, Загедан, Дамхурц, Рожкао, Псемён, Курджиново, Ершов, Подскальное, Предгорное, упразднённый аул Ахмет-Кая и др. — Карачаево-Черкесия; Ахметовская, Чернореченская, Гофицкое — Краснодарский край). У станицы Каладжинская Большая Лаба сливается с Лабой Малой."
     },
                {
        "name": "Большая Лоптюга",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%9B%D0%BE%D0%BF%D1%82%D1%8E%D0%B3%D0%B0",
        "image": "undefined",
        "length": "160 км",
        "pool": "2030 км²",
        "consumption": "19,6 м³/с (5,8 км от устья)",
        "head": " ",
        "estuary": "Мезень",
        "location": " Россия",
        "info": "Больша́я Ло́птюга — река в Удорском районе Республики Коми, левый приток реки Мезень.Средний расход воды — 19,6 м³/с.[источник не указан 600 дней] Высота устья — 96,4 м над уровнем моря.[источник не указан 600 дней]Длина — 160 км, площадь бассейна — 2030 км². Питание смешанное, с преобладанием снегового. Половодье в мае. Среднегодовой расход воды в районе села Буткан (5,8 км от устья) составляет 19,59 м³/с (данные наблюдений с 1957 по 1988 год).Крупнейшие притоки — Ёд (левый); Субач, Ядмас (правые).Большая Лоптюга начинается к юго-востоку от Усогорска рядом с границей Архангельской области, на высоте 182,5 метра над уровнем моря. Река течёт в почти ненаселённой местности, по заболоченной равнине, скорость течения небольшая, русло крайне извилисто.В месте впадения Большой Лоптюги в Мезень стоит село Буткан.(км от устья)По данным государственного водного реестра России и геоинформационной системы водохозяйственного районирования территории РФ, подготовленной Федеральным агентством водных ресурсов:"
     },
          {
        "name": "Большая Ляга",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%9B%D1%8F%D0%B3%D0%B0",
        "image": "undefined",
        "length": "120 км",
        "pool": "1330 км²",
        "consumption": "undefined",
        "head": "Болото Малый Габенюр",
        "estuary": "Печора",
        "location": " Россия",
        "info": "Большая Ляга — река в России, протекает по Троицко-Печорскому району Республики Коми. Устье реки находится в 1390 км по правому берегу реки Печора. Длина реки составляет 120 км. Площадь водосборного бассейна — 1330 км².Берёт начало из болота Малый Габенюр. Река течёт на юго-восток, всё течение проходит по ненаселённому, частично заболоченному лесу. Русло извилистое. Ширина реки в среднем течении — 20-25 метров, у устья — 45 метров. Скорость течения 0,4 — 0,5 м/с. Впадает в Печору у пристани Усть-Ляга. Высота устья — 98 м над уровнем моря.[источник не указан 593 дня]По данным государственного водного реестра России относится к Двинско-Печорскому бассейновому округу, водохозяйственный участок реки — Печора от истока до водомерного поста у посёлка Шердино, речной подбассейн реки — Бассейны притоков Печоры до впадения Усы. Речной бассейн реки — Печора.Код объекта в государственном водном реестре — 03050100112103000059652."
     },
              {
        "name": "Большая Медвежья",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%9C%D0%B5%D0%B4%D0%B2%D0%B5%D0%B6%D1%8C%D1%8F",
        "image": "undefined",
        "length": "113 км",
        "pool": "156 500 км²",
        "consumption": "528 м³/с",
        "head": "Большое Медвежье озеро",
        "estuary": "Маккензи",
        "location": " Канада",
        "info": "Больша́я Медве́жья (англ. Great Bear River, фр. Grande rivière de l'Ours) — река в Канаде, на Северо-Западных территориях. Её длина 113 км. Исток — в заливе Кит-Арм на юго-западе Большого Медвежьего озера. Протекает по болотам к западу от Большого Медвежьего озера и впадает в реку Маккензи справа.Является важной транспортной артерией. Свободна ото льда 3-4 месяца в году, средняя ширина реки 300 м, глубина 6 м. В среднем течении реки находятся пороги Сент-Чарльз.Низкий уровень расхода воды в Большой Медвежьей реке объясняется низким среднегодовым уровнем осадков на площади бассейна. В 1972 и 1974 гг. наблюдалось значительное обмеление реки. Максимальный расход воды достигает 995 м³/с. Средний расход воды — 528 м³/с.В 15 км ниже устья Большой Медвежьей реки в Маккензи слева впадает Малая Медвежья река.В бассейн реки входит озеро Фейбер."
     },
              {
        "name": "Большая Мутная (приток Печоры)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%9C%D1%83%D1%82%D0%BD%D0%B0%D1%8F_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9F%D0%B5%D1%87%D0%BE%D1%80%D1%8B)",
        "image": "undefined",
        "length": "127 км",
        "pool": "1440 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Печора",
        "location": " Россия",
        "info": "Большая Мутная — река в России, протекает в Республике Коми. Устье реки находится в 630 км по правому берегу реки Печора. Длина реки составляет 127 км, площадь водосборного бассейна 1440 км².Объекты перечислены по порядку от устья к истоку.По данным государственного водного реестра России относится к Двинско-Печорскому бассейновому округу, водохозяйственный участок реки — Печора от впадения реки Уса до водомерного поста Усть-Цильма, речной подбассейн реки — бассейны притоков Печоры ниже впадения Усы. Речной бассейн реки — Печора.Код объекта в государственном водном реестре — 03050300112103000074451."
     },
                                 {
        "name": "Большая Осиновая",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%9E%D1%81%D0%B8%D0%BD%D0%BE%D0%B2%D0%B0%D1%8F",
        "image": "undefined",
        "length": "288 км",
        "pool": "8590 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Юрумкувеем",
        "location": " Россия",
        "info": "Больша́я Оси́новая — река в Чукотском автономном округе России. Левый приток Юрумкувеема. Течёт по территории Иультинского и Анадырского районов. Длина реки равна 288 км. Площадь водосборного бассейна составляет 8590 км².Начинается между горой Продлённая и хребтом Узловые горы. Течёт сначала на запад по горам, потом — на юг и юго-запад по межгорной долине, безлесой и частично заболоченной, петляя и делясь на рукава. Ниже устья Блестящей долина расширяется, река и её притоки текут множеством проток по заболоченной тундре. В долине реки много озёр (крупнейшие — Блестящее, Ковляетыгытгын, Пенное, Баранье), присутствуют наледи. В низовьях — обилие мелких озёр. Впадает в Юрумкувеем слева в 145 км от устья на высоте 90 м над уровнем моря.Объекты перечислены по порядку от устья к истоку.По данным государственного водного реестра России относится к Анадыро-Колымскому бассейновому округу, водохозяйственный участок реки — Анадырь от впадения р. Майн до устья. Речной бассейн реки — Анадырь.Код объекта в государственном водном реестре — 19050000212119000117066."
     },
         {
        "name": "Большая Ою",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%9E%D1%8E",
        "image": "undefined",
        "length": "175 км",
        "pool": "3070 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Югорский Шар",
        "location": " Россия",
        "info": "Большая Ою (Большо́й О́ю, Великая, Большая Нгою) — река в Ненецком автономном округе России. Длина реки — 175 км. Площадь водосборного бассейна — 3070 км².Исток находится на северо-западных склонах хребта Пай-Хой, впадает в пролив Югорский Шар. Питание дождевое и снеговое. Протекает в природно-климатической зоне тундр."
     },
          {
        "name": "Большая Пёра (приток Зеи)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%9F%D1%91%D1%80%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%97%D0%B5%D0%B8)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Zeya.png/250px-Zeya.png",
        "length": "145 км",
        "pool": "4400 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Зея",
        "location": " Россия",
        "info": "Больша́я Пёра — река в Шимановском и Свободненском районе Амурской области на Дальнем Востоке России. Правый приток Зеи. Длина реки — 145 км, площадь водосборного бассейна — 4400 км².Берёт начало на Амуро-Зейском плато в результате слияния рек Пера и Белава, к северо-западу от Шимановска, фактически в городской черте. Общее направление течения — на юго-восток, на всём протяжении параллельно реке проходит Транссибирская магистраль. Впадает в протоку Перская (правобережная протока реки Зея) выше города Свободный, в городской черте.Долина широкая, заболоченная. Русло узкое, течение медленное. Маловодна. Возможно маломерное судоходство.Название в переводе с эвенкийского ёра — «ходовая рыба летом и осенью».Объекты перечислены по порядку от устья к истоку.От истока к устью (выделены крупные населённые пункты):"
     },
                       {
        "name": "Большая Пула",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%9F%D1%83%D0%BB%D0%B0",
        "image": "undefined",
        "length": "172 км",
        "pool": "1560 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Сула",
        "location": " Россия",
        "info": "Большая Пула (вар. Большая Пуль) — река в Ненецком автономном округе Архангельской области, впадает справа в Сулу.Большая Пула берёт начало в северной части Тиманского кряжа. Длина реки — 172 км. Площадь водосборного бассейна — 1560 км². Питание снеговое и дождевое. Половодье в мае — июне, летом паводки. Русло довольно извилистое, неоднократно меняет направление; в Сулу впадает с юго-запада. Течёт по ненаселённой лесотундровой местности. В верховьях протекает через несколько небольших озёр. Характер берегов непостоянный: возвышенности и обрывы сменяются болотами.По данным государственного водного реестра России относится к Двинско-Печорскому бассейновому округу, водохозяйственный участок реки — Печора от водомерного поста Усть-Цильма до устья, речной подбассейн реки — бассейны притоков Печоры ниже впадения Усы. Речной бассейн реки — Печора.Код объекта в государственном водном реестре — 03050300212103000083100."
     },
                        {
        "name": "Большая Речка (приток Оби)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%A0%D0%B5%D1%87%D0%BA%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9E%D0%B1%D0%B8)",
        "image": "undefined",
        "length": "258 км",
        "pool": "4000 км²",
        "consumption": "4,48 м³/с (112 км от устья)",
        "head": " ",
        "estuary": "Обь",
        "location": " Россия",
        "info": "Больша́я Ре́чка — река в России, правый приток Оби, протекает по равнинной части Алтайского края.Большая Речка начинается в 10 км юго-восточнее села Горновое Троицкого района Алтайского края. От истока сначала петляет — течёт на север, запад, северо-восток, после села Хомутино принимает юго-западное направление, сохраняющееся почти на всём протяжении.Верховая часть бассейна лежит на Бийско-Чумышской возвышенности с густой сетью котловин с заболоченным дном, степная местность перемежается здесь участками леса. В селе Троицкое река достигает границы Верхнеобского бора — большого лесного массива, занимающего излучину Оби. До села Загайново река течёт по краю бора, после чего уходит вглубь лесного массива. Низовая часть речного бассейна лежит в заболоченной древней долине Оби.Большая Речка впадает в Обь несколькими рукавами ниже сёл Володарка и Чаузово Топчихинского района, которые расположены при разветвлении его в рукава. Последний приток Большой Речки — Камышинка — впадает в её южный рукав примерно в километре от слияния с Обью.Речная долина в верховьях и среднем течении (до села Загайново) хорошо разработана, с крутыми склонами высотой 20—40 м. В низовьях долина практически не выражена. Пойма развита практически на всем протяжении, особенно в среднем и нижнем течениях; в низовьях пойма достигает 5 км в ширину и ежегодно затопляется."
     },
         {
        "name": "Большая Роговая",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%A0%D0%BE%D0%B3%D0%BE%D0%B2%D0%B0%D1%8F",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Pechora.svg/250px-Pechora.svg.png",
        "length": "311 км",
        "pool": "7290 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Уса",
        "location": " Россия",
        "info": "Большая Роговая (Верхняя Роговая, Роговая) — река в Ненецком автономном округе и Республике Коми, правый приток реки Уса (бассейн Печоры). Длина реки — 311 км, площадь водосборного бассейна — 7290 км².Исток находится в районе озер Падимейты Большеземельской тундры.Питание смешанное, снеговое и дождевое, замерзает река в октябре — начале ноября, вскрывается в конце мая — июне. Притоки — Сяттейтывис, Большой Пятомбойю (Ыджыд-Пятомбой), Пальник Ю, Ручю — левые, Лекнерцета, Большая Нерцета, Сарода — правые.В среднем течении является естественной границей между Ненецким автономным округом и Республикой Коми.Раньше по Большой Роговой было много деревень — в устье почти каждого притока ютилась деревенька из 1-2 домов. В настоящее время на реке осталась лишь одна самая северная деревня Сявта — в 30 км ниже впадения Большого Пятомбойю."
     },
      {
        "name": "Большая Руаха",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%A0%D1%83%D0%B0%D1%85%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Dry_Great_Ruaha_River_and.jpg/250px-Dry_Great_Ruaha_River_and.jpg",
        "length": "480 км",
        "pool": "84 000 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Руфиджи",
        "location": " Танзания",
        "info": "Больша́я Руа́ха, Руаха — река в Танзании. Протекает по центральной части страны и является крупнейшим левым притоком реки Руфиджи. На местном языке хехе река носит название Lyambangari.Река Большая Руаха берёт своё начало с горных рек, стекающих с гор Кипенгере, которые затем становятся многочисленными водными потоками равнины Усангу. Площадь равнины составляет 4400 км², из которых 518 км² занимает болото Утенгуле. Общая длина реки Большая Руаха, от равнины Усангу до слияния с рекой Руфиджи составляет приблизительно 480 км (по данным БСЭ — 700 км). При этом 160 км в верховьях реки протекают по национальному парку Руаха (с другой стороны расположен охотничий резерват Рунгва-Ривер), а 120 км в низовьях — по охотничьему резервату Селус (там же расположен национальный парк Микуми).Долгие годы река Большая Руаха текла круглый год, однако в последнее время уровень воды упал. С середины 1990-х годов река стала сезонной и может полностью пересохнуть. Пересыхание реки является огромной проблемой для жизнедеятельности людей, проживающих на её берегах и для биоразнообразия региона.Программа фонда дикой природы и совместная работа с администрацией территории на разных уровнях привели к тому, что в 2006 году течение реки продолжалось круглый год и наметилась тенденция к дальнейшему улучшению ситуации. Основными моментами программы были:"
     },
                                  {
        "name": "Большая Сиговая",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%A1%D0%B8%D0%B3%D0%BE%D0%B2%D0%B0%D1%8F",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Enisey.png/250px-Enisey.png",
        "length": "171 км",
        "pool": "1680 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Елогуй",
        "location": " Россия",
        "info": "Большая Сиговая (в верховье Правая Большая Сиговая) — река в Красноярском крае России, правый приток Елогуя.Образуется слиянием рек Левой Большой Сиговой и Правой Большой Сиговой, южнее болота Большая Тундра, на высоте 185 м. Впадает в Елогуй в 108 км от его устья. Длина — 171 км, площадь водосборного бассейна — 1680 км².По данным государственного водного реестра России относится к Енисейскому бассейновому округу, водохозяйственный участок реки — Енисей от впадения р. Подкаменная Тунгуска до впадения р. Нижняя Тунгуска, речной подбассейн реки — Енисей между впадением Подкаменной Тунгуски и Нижней Тунгуски. Речной бассейн реки — Енисей.Код объекта в государственном водном реестре — 17010600112116100058535."
     },
                      {
        "name": "Большая Сульча",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%A1%D1%83%D0%BB%D1%8C%D1%87%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%A1%D1%83%D0%BB%D1%8C%D1%87%D0%B0.jpg/250px-%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%A1%D1%83%D0%BB%D1%8C%D1%87%D0%B0.jpg",
        "length": "117,2 км",
        "pool": "1900 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Большой Черемшан",
        "location": " Россия",
        "info": "Большая Сульча — река в Татарстане, правый приток реки Большой Черемшан.Длина реки — 117,2 км, площадь бассейна — 1900 км². Берёт начало в 0,8 км восточнее с. Амирово Черемшанского района Татарстана, устье в 5 км западнее от с. Салдакаево Нурлатского района. Протекает по сравнительно спокойной, невысокой равнине (высота 125—150 м). Русло реки извилистое не разветвлённое шириной 5—8 м, глубина до 1,5 м. В реку впадает 31 приток.Река маловодная. Питание смешанное, преимущественно снеговое (до 90 %). Распределение стока внутри года неравномерное. Годовой слой стока в бассейне достигает 97—125 мм, 89 мм из которых приходится на весеннее половодье. Модули подземного питания от 0,11 до 1,0 л/с км². Межень устойчивая, низкая (0,53 м³/с в устье и 0,049 м³/с в истоках). Вода гидрокарбонатно-сульфатно-кальциевая, жёсткость колеблется от 6,0—12,0 мг-экв/л весной, до 20,0—40,0 мг-экв/л в межень. Минерализация от 100—300 мг/л весной, до 500—700 мг/л в межень."
     },
       {
        "name": "Большая Сурень",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%A1%D1%83%D1%80%D0%B5%D0%BD%D1%8C",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/BolshayaSuren.jpg/250px-BolshayaSuren.jpg",
        "length": "131 км",
        "pool": "1580 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Большой Ик",
        "location": " Россия",
        "info": "Большая Сурень (Большая Сюран) — река в России, протекает в Республике Башкортостан, Оренбургской области. Устье реки находится в 58 км по левому берегу реки Большой Ик. Длина реки составляет 131 км, площадь водосборного бассейна 1580 км².Основные притоки (расстояние от устья):По данным государственного водного реестра России относится к Уральскому бассейновому округу, водохозяйственный участок реки — Большой Ик. Речной бассейн реки — Урал (российская часть бассейна).Код объекта в государственном водном реестре — 12010000612112200006122."
     },
          {
        "name": "Большая Тава",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%A2%D0%B0%D0%B2%D0%B0",
        "image": "undefined",
        "length": "193 км",
        "pool": "2600 км²",
        "consumption": "6,23 м³/с (51 км от устья)",
        "head": "слияние рек: Дурница и Скакунка",
        "estuary": "Ишим",
        "location": " Россия",
        "info": "Большая Тава — река в Омской области России, приток Ишима.Образуется слиянием рек Дурницы и Скакунки на высоте 78 метров над уровнем моря, севернее урочища Ольгино. Протекает в северо-западном направлении по территории Большеуковского, Тевризского и Усть-Ишимского районов. Впадает в Ишим в 37 км от его устья по правому берегу. Основные притоки — Малая Тава и Тевриз.На берегах реки расположены населённые пункты — деревня Малая Тава, сёла Листвяги и Большая Тава.Длина реки — 193 км, площадь водосборного бассейна — 2600 км². Ширина — 12—20 м, глубина — 1,3—2,0 м, скорость течения — 0,1—0,2 м/с. Дно твёрдое, в верхнем течении вязкое. Уклон реки — 0,17 м/км.По данным наблюдений с 1947 по 1999 год среднегодовой расход воды в районе деревни Малая Тава (51 км от устья) составляет 6,23 м³/с, максимальный расход приходится на май, минимальный — на март.По данным государственного водного реестра России и геоинформационной системы водохозяйственного районирования территории РФ, подготовленной Федеральным агентством водных ресурсов:"
     },
                   {
        "name": "Большая Тира",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%A2%D0%B8%D1%80%D0%B0",
        "image": "undefined",
        "length": "219 км",
        "pool": "5160 км²",
        "consumption": "24,15 м³/с (2,5 км от устья)",
        "head": " ",
        "estuary": "Лена",
        "location": " Россия",
        "info": "Большая Тира — река в Иркутской области России.Протекает в юго-восточном направлении по территории Усть-Кутского района. Длина реки — 219 км, площадь водосборного бассейна — 5160 км². У деревни Тиры впадает в реку Лену в 3305 км от её устья по левому берегу. По данным наблюдений с 1957 по 1990 год среднегодовой расход воды в районе деревни (2,5 км от устья) составляет 24,15 м³/с. Основной приток — Малая Тира.По данным государственного водного реестра России и геоинформационной системы водохозяйственного районирования территории РФ, подготовленной Федеральным агентством водных ресурсов:"
     },
            {
        "name": "Большая Тотыдэоттаяха",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%A2%D0%BE%D1%82%D1%8B%D0%B4%D1%8D%D0%BE%D1%82%D1%82%D0%B0%D1%8F%D1%85%D0%B0",
        "image": "undefined",
        "length": "239 км",
        "pool": "2520 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Таз",
        "location": " Россия",
        "info": "Большая Тотыдэоттаяха (устар. Большая Тотыдэотта-Яха) — река в России, протекает по территории Ямало-Ненецкого автономного округа. Впадает на 27 км по левому берегу протоки Тытылькы реки Таз). Длина реки — 239 км, площадь водосборного бассейна — 2520 км².По данным государственного водного реестра России относится к Нижнеобскому бассейновому округу, водохозяйственный участок реки — Таз, речной подбассейн реки — подбассейн отсутствует. Речной бассейн реки — Таз.Код объекта в государственном водном реестре — 15050000112115300070929."
     },
                     {
        "name": "Большая Урзуга",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%A3%D1%80%D0%B7%D1%83%D0%B3%D0%B0",
        "image": "undefined",
        "length": "120 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Лая",
        "location": " Россия",
        "info": "Большая У́рзуга — река в Архангельской области, левый и крупнейший приток Лаи.Длина реки — 120 км. Протекает в заболоченной тайге в 35-45 км к юго-западу и югу от Северодвинска, преимущественно в границах Приморского района.Берёт начало в болотах в основании Онежского полуострова, в Онежском районе. В верховьях река течёт на север, затем на большом протяжении течёт на восток-юго-восток (участок среднего течения проходит в границах городского округа Северодвинск). В нижнем течении отклоняется на северо-запад. Впадает в Лаю по левому берегу в 62 км от её устья (является крупнее Лаи в месте их слияния). Русло очень извилистое.Населённых пунктов в бассейне реки нет. Имеется мост в среднем течении на Кудемской узкоколейной железной дороге.Основные притоки (от устья, правые):В бассейне находится множество озёр, крупнейшие из них: Палозеро, Большое Скопозеро, Верхнее Корпозеро."
     },
     {
        "name": "Большая Уря ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%A3%D1%80%D1%8F_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Urya.jpg/250px-Urya.jpg",
        "length": "116 км",
        "pool": "1360 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Кан",
        "location": " Россия",
        "info": "Большая Уря (Уря) — река, левый приток Кана, протекает по территории Ирбейского, Рыбинского и Канского районов Красноярского края в России. Длина реки — 116 км, площадь водосборного бассейна — 1360 км².Большая Уря начинается на высоте примерно 329 м над уровнем моря, к юго-западу от села Верхняя Уря. Генеральным направлением течения реки до села Усть-Каначуль является северо-восток, потом течёт преимущественно на север. Большая Уря впадает в Кан на высоте 192 м над уровнем моря напротив острова Урский, северо-западнее села Филимоново.По данным государственного водного реестра России относится к Енисейскому бассейновому округу, водохозяйственный участок реки — Кан, речной подбассейн реки — Енисей между слиянием Большого и Малого Енисея и впадением Ангары. Речной бассейн реки — Енисей.Код объекта в государственном водном реестре — 17010300412116100023096."
     },
        {
        "name": "Большая Уссурка",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%A3%D1%81%D1%81%D1%83%D1%80%D0%BA%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%A3%D1%81%D1%81%D1%83%D1%80%D0%BA%D0%B0.jpg/250px-%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%A3%D1%81%D1%81%D1%83%D1%80%D0%BA%D0%B0.jpg",
        "length": "440 км",
        "pool": "29 600 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Уссури",
        "location": " Россия",
        "info": "Больша́я Уссу́рка — река на Дальнем Востоке России, в Приморском крае. Один из наиболее крупных притоков реки Уссури.До 1972 года — река Има́н. Переименована после вооружённого конфликта за остров Даманский.Длина — 440 км, площадь бассейна — 29 600 км². Берёт начало в Дальнегорском городском округе на западных склонах Центрального Сихотэ-Алиня и у города Дальнереченск впадает в реку Уссури на расстоянии 357 км от её устья. Речная сеть бассейна наиболее развита в верхней и средней его частях.Дно реки в верхнем течении каменистое, ниже каменно-галечное и галечное. В нижнем течении на глубоких плесах дно имеет песчаную и песчано-галечную структуру.Берега реки в верхнем течении очень крутые и даже обрывистые, высотою 1,5—2,5 м, чаще являются непосредственно опускающимися в воду, отвесными скальными склонами сопок. В среднем и нижнем течении реки берега, чаще всего высотою 1,0—2,0 м, также обрывистые, но сложены рыхлыми суглинистыми и супесчанистыми грунтами. Русло реки умеренно-извилистое, ширина в среднем 80—100 м. Во время паводков в местах расширения долины река может разливаться на ширину 200—300 м. Глубина потока также варьирует в больших пределах: на мелководьях от 0,5 до 1,3 м, на плесах до 2—4 м."
     },
         {
        "name": "Большая Хадырьяха",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%A5%D0%B0%D0%B4%D1%8B%D1%80%D1%8C%D1%8F%D1%85%D0%B0",
        "image": "undefined",
        "length": "237 км",
        "pool": "5120 км²",
        "consumption": "50 м³/с",
        "head": " ",
        "estuary": "Пур",
        "location": " Россия",
        "info": "Большая Хадырьяха (устар. Бол. Хадырь-Яха) — река на севере Западной Сибири, на востоке центральной части Пуровского района Ямало-Ненецкого автономного округа. Один из правых притоков реки Пур, впадает в него на 247-м км от устья, у пгт. Уренгой.Длина реки — 237 км. Площадь её бассейна — 5120 км².В бассейне насчитывается 230 водотоков, из них 35 имеют длину более 10 км. Питание преимущественно снеговое.Половодье длится не менее двух месяцев. Средний годовой расход воды — около 50 м³/с, объём годового стока реки — 1,1 км³.Большая Хадырьяха покрывается льдом в октябре и открывается только в мае-июне. В обоих случаях для реки характерен ледоход. Длительность ледостава обычно около 7,5 мес.{км от устья}По данным государственного водного реестра России относится к Нижнеобскому бассейновому округу, водохозяйственный участок реки — Пур. Речной бассейн реки — Пур.Код объекта в государственном водном реестре — 15040000112115300060237."
     },
      {
        "name": "Большая Хапица",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%A5%D0%B0%D0%BF%D0%B8%D1%86%D0%B0",
        "image": "undefined",
        "length": "111 км",
        "pool": "1960 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Камчатка",
        "location": " Россия",
        "info": "Большая Хапица — река на полуострове Камчатка, приток реки Камчатка. Протекает по территории Усть-Камчатского района Камчатского края России.Длина реки — 111 км. Площадь водосборного бассейна насчитывает 1960 км². Берёт начало на юге Восточного хребта, на высоте более 650 метров над уровнем моря. Впадает в реку Камчатка восточнее посёлка Ключи, по правому берегу на расстоянии 74 км от устья. В месте впадения образует обширную дельту с озёрами и протоками. Высота устья около 12 метров над уровнем моря.По данным государственного водного реестра России относится к Анадыро-Колымскому бассейновому округу. Код водного объекта — 19070000112120000017503.Долина реки находится в сейсмоактивной области с активным вулканизмом. При извержениях вулканов на полуострове возможен сход селевых потоков из-за таяния ледников в бассейн реки. Наиболее значительным был грязекаменный поток, связанный с катастрофическим извержением в марте 1956 года вулкана Безымянный, в ходе которого сель распространялся по этой реке."
     },
         {
        "name": "Большая Хета",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%A5%D0%B5%D1%82%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/%D0%A0%D0%B5%D0%BA%D0%B0_%D0%A5%D0%B5%D1%82%D0%B0_%D0%B2_%D0%B8%D1%8E%D0%BB%D0%B5_-_panoramio.jpg/250px-%D0%A0%D0%B5%D0%BA%D0%B0_%D0%A5%D0%B5%D1%82%D0%B0_%D0%B2_%D0%B8%D1%8E%D0%BB%D0%B5_-_panoramio.jpg",
        "length": "646 км",
        "pool": "20 700 км²",
        "consumption": "211 м³/с",
        "head": "Еловое",
        "estuary": "Енисей",
        "location": " Россия",
        "info": "Большая Хета́ (Ело́вая) — река в Красноярском крае России, левый приток Енисея, протекает по Западно-Сибирской равнине.Название, по одной из гипотез, происходит от этнонима кеты (люди) — самоназвания енисейских кетов.Исток реки — в озере Еловом (Ческанама). Длина 646 км, площадь водосборного бассейна — 20 700 км². Расход воды — 211 м³/с. Впадает в Енисей севернее Дудинки, примерно в 190 км от устья. Берега реки большей частью крутые, течение довольно быстрое. В бассейне реки около 6 тысяч озёр. Питание преимущественно снеговое.На мысу правого берега располагался острог времён освоения Сибири русскими землепроходцами. Время существования поселения охватывает XVII — начало XIX в. В настоящее время на территории бывшего поселения располагается ненецкое стойбище.Река замерзает в середине сентября, вскрывается в конце мая — начале июня.Река судоходна до поселка Тухарт (41 км от устья), а до Сузунского и Ванкорского нефтегазовых месторождений (437 км), расположенных в левобережье Большой Хеты, только с середины июня по начало июля в виде экспедиционного завоза караванами судов. Например, в навигацию 2008 года в порт Ванкорнефти только Енисейским пароходством было завезено около 120 тысяч тонн грузов. Летом вверх по течению от поселка Тухарт глубины на перекатах могут составлять 60-80 см, но песчаное дно позволяет позволяет винтами промывать проходы. Также летней навигации значительно способствуют дожди."
     },
          {
        "name": "Большая Хэяха",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%A5%D1%8D%D1%8F%D1%85%D0%B0",
        "image": "undefined",
        "length": "120 км",
        "pool": "846 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Таз",
        "location": " Россия",
        "info": "Большая Хэяха (устар. Большая Хэ-Яха) — река в России, протекает по территории Тазовского района Ямало-Ненецкого автономного округа. Впадает в протоку Хасьинтапарод реки Таз. Длина реки — 120 км, площадь водосборного бассейна — 846 км².По данным государственного водного реестра России относится к Нижнеобскому бассейновому округу, водохозяйственный участок реки — Таз, речной подбассейн реки — подбассейн отсутствует. Речной бассейн реки — Таз.Код объекта в государственном водном реестре — 15050000112115300071384."
     },
       {
        "name": "Большая Чалыкла",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%A7%D0%B0%D0%BB%D1%8B%D0%BA%D0%BB%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/%D0%A7%D0%B0%D0%BB%D1%8B%D0%BA%D0%BB%D0%B0_-_panoramio.jpg/250px-%D0%A7%D0%B0%D0%BB%D1%8B%D0%BA%D0%BB%D0%B0_-_panoramio.jpg",
        "length": "155 км",
        "pool": "3330 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Камелик",
        "location": " Россия",
        "info": "Большая Чалыкла́ (Чалыкла́) — река в России, протекает в Озинском и Пугачёвском районах Саратовской области.Большая Чалыкла левобережный приток реки Камелик, её устье находится в 69 километрах от устья Камелика. Длина реки — 155 километров. Площадь водосборного бассейна — 3330 км².В 58 километрах от устья, по левому берегу реки впадает река Голенькая. В 20 километрах от устья, по левому берегу реки впадает река Кривая Отнога. В 12 километрах от устья, по левому берегу реки впадает река Малая Чалыкла. В 27 километрах от устья, по левому берегу реки впадает река Жестянка.Крупнейший населённый пункт на реке — Озинки.По данным государственного водного реестра России относится к Нижневолжскому бассейновому округу, водохозяйственный участок реки — Большой Иргиз от истока до Сулакского гидроузла. Речной бассейн реки — Волга от верхнего Куйбышевского водохранилища до впадения в Каспий.Код объекта в государственном водном реестре — 11010001612112100009988."
     },
              {
        "name": "Большая Чукочья",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%A7%D1%83%D0%BA%D0%BE%D1%87%D1%8C%D1%8F",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Bolshaya_Chukochya.png/250px-Bolshaya_Chukochya.png",
        "length": "758 км",
        "pool": "19 800 км²",
        "consumption": "undefined",
        "head": "Усун-Кюель",
        "estuary": "Восточно-Сибирское море",
        "location": " Россия",
        "info": "Больша́я Чуко́чья (Чукочья, Рэвум-Рэву) — река в Якутии.Длина реки — 758 км, площадь бассейна — 19 800 км². Вытекает из небольшого озера Усун-Кюель, протекает по Колымской низменности по тундре среди многочисленных тундровых озёр. Впадает в Восточно-Сибирское море.Питание реки снеговое. Замерзает с октября по май. Зимой перемерзает до дна. Множество притоков, из которых наиболее крупные Савва-Юрях, Олёр, Семен-Юрях. До эпохи авиации считалась левым рукавом Колымы (например, смотри энциклопедию Брокгауза и Ефрона)."
     },
               {
        "name": "Большая Ширта",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%A8%D0%B8%D1%80%D1%82%D0%B0",
        "image": "undefined",
        "length": "306 км",
        "pool": "10 200 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Таз",
        "location": " Россия",
        "info": "Большая Ширта — река на севере Западной Сибири, в Ямало-Ненецком автономном округе России, правый приток Таза.Длина реки — 306 км. Площадь водосборного бассейна — 10 200 км². Средний многолетний годовой расход воды около 100 м³/с, объём годового стока реки 3,1 км³. Впадает в реку Таз справа на 876 км от устья. Течёт по северо-восточной части Западно-Сибирской равнины.Притоки от устья к истоку:"
     },
                {
        "name": "Большая Юганская",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%AE%D0%B3%D0%B0%D0%BD%D1%81%D0%BA%D0%B0%D1%8F",
        "image": "undefined",
        "length": "189 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "Юганская Обь",
        "estuary": "Большая Салымская",
        "location": " Россия",
        "info": "Большая Юганская — протока Оби в Нефтеюганском районе Ханты-Мансийского автономного округа России. Устье протоки находится в 35 км по левому берегу Большой Салымской протоки. Длина водотока — 189 км. Высота устья — 22,3 м над уровнем моря.[источник не указан 603 дня]По данным государственного водного реестра России относится к Верхнеобскому бассейновому округу, водохозяйственный участок реки — Обь от города Нефтеюганск до впадения реки Иртыш, речной подбассейн реки — Обь ниже Ваха до впадения Иртыша. Речной бассейн реки — (Верхняя) Обь до впадения Иртыша.Код объекта в государственном водном реестре — 13011100212015200050416."
     },
     {
        "name": "Большая Юкса",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%AE%D0%BA%D1%81%D0%B0",
        "image": "undefined",
        "length": "177 км",
        "pool": "2670 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Чулым",
        "location": " Россия",
        "info": "Большая Юкса — река в Томской области России, левый приток Чулыма (бассейн Оби). Устье реки находится в 180 км от устья по левому берегу Чулыма. Длина реки составляет 177 км, водосборная площадь — 2670 км². Высота истока — 184 м. Высота устья — 79 м.Название происходит из тюркских слов йук — «близкий» и са (из су) — «река».По данным государственного водного реестра России относится к Верхнеобскому бассейновому округу, водохозяйственный участок реки — Чулым от водомерного поста в селе Зырянское и до устья, речной подбассейн реки — Чулым. Речной бассейн реки — (Верхняя) Обь до впадения Иртыша."
     },
           {
        "name": "Большая Янгыта",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F_%D0%AF%D0%BD%D0%B3%D1%8B%D1%82%D0%B0",
        "image": "undefined",
        "length": "119 км",
        "pool": "952 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Сула",
        "location": " Россия",
        "info": "Большая Янгыта (параллельное название — Янгыш) — река в России, в бассейне Печоры. Исток находится, в Республике Коми, на юго-западной оконечности гряды Болбан-Мусюр. Почти сразу река уходит в Ненецкий автономный округ, по территории которого течёт до самого устья. Русло Большой Янгыты пролегает по ненаселённой лесотундровой местности, довольно извилистое. Большую часть река протекает в северном направлении, незадолго до устья поворачивает на восток. Устье находится в 80 км по правому берегу реки Сула. Длина Большой Янгыты составляет 119 км, площадь водосборного бассейна 952 км². Крупных притоков не имеет.По данным государственного водного реестра России относится к Двинско-Печорскому бассейновому округу, водохозяйственный участок реки — Печора от водомерного поста Усть-Цильма и до устья, речной подбассейн реки — бассейны притоков Печоры ниже впадения Усы. Речной бассейн реки — Печора.Код объекта в государственном водном реестре — 03050300212103000083469."
     },
                           {
        "name": "Большой Аёв",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%90%D1%91%D0%B2",
        "image": "undefined",
        "length": "266 км",
        "pool": "6210 км²",
        "consumption": "undefined",
        "head": "Болото Яровское",
        "estuary": "Оша",
        "location": " Россия",
        "info": "Большой Аёв (сиб.-тат. Ай) — река в России, протекает по Омской области (Большеуковский и Знаменский районы). Устье реки находится в 21 км по левому берегу реки Оши. Длина реки — 266 км. Площадь водосборного бассейна — 6210 км².На реке находятся населённые пункты Форпост, Чебаклы, Завьялово.Название реки происходит от татарского «ай» — луна, месяц.По данным государственного водного реестра России относится к Иртышскому бассейновому округу, водохозяйственный участок реки — Оша, речной подбассейн реки — бассейны притоков Иртыша до впадения Ишима. Речной бассейн реки — Иртыш."
     },
          {
        "name": "Большой Анюй",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%90%D0%BD%D1%8E%D0%B9",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Kolyma.png/250px-Kolyma.png",
        "length": "654 км",
        "pool": "57 300 км²",
        "consumption": "286 м³/с (ГМС «Константиновская»)",
        "head": "слияние рек: Левый Илюкэйвеем и Правый Илюкэйвеем",
        "estuary": "Анюй",
        "location": " Россия",
        "info": "Большо́й Аню́й (в верховье Левый Илюкэйвеем) — река в Чукотском автономном округе и Якутии. Длина — 654 км (с рекой Левый Илюкэйвеем — 693 км). Площадь водосбора 57 300 км².Название в переводе с чук. Вылгилвээм — «берёзовая река». Вдоль правого берега Большого Анюя проходила старинная дорога казаков-первопроходцев из Сибири в Анадырский острог.Берёт начало на Анадырском плоскогорье на высоте 700—800 м нум. В верховьях имеет горный характер, отличается слабым извилистым устьем. Ширина меженного русла не более 120 м, паводочного 300 м; глубина на плёсах в среднем 1,7 м, на перекатах 0,5 м. Скорость течения в пределах 1,5—4 м/сек.В среднем течении русло сильно разветвляется, ширина составляет 300—400 м. Глубина на плёсах доходит до 3 м, на перекатах 0,7 м.В низовьях протекает по сильно заболоченной Анюйской низменности в окружении множества озёр. Ширина русла увеличивается до 500—700 м, глубина до 4 м, скорость течения не более 1 м/с.Сливаясь с Малым Анюем образует правый приток реки Колымы — реку Анюй.Замерзает в начале октября, вскрывается в начале июня.Река судоходна в нижнем течении. Развито рыболовство. В бассейне Большого Анюя разрабатываются многочисленные месторождения россыпного и коренного золота, также обнаружены запасы олова, вольфрама и ртути."
     },
     {
        "name": "Большой Аркадак",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%90%D1%80%D0%BA%D0%B0%D0%B4%D0%B0%D0%BA",
        "image": "undefined",
        "length": "115 км",
        "pool": "1790 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Хопёр",
        "location": " Россия",
        "info": "Аркадак (в верховье Большой Аркадак) — река в России, протекает по Саратовской области, в Екатериновском и Аркадакском районах, левый приток Хопра. Длина реки составляет 115 км, площадь водосборного бассейна — 1790 км².Берёт начало на западе Екатериновского района близ села Мирный. Впадает в Хопёр у города Аркадак. Устье реки находится в 681 км от устья реки Хопёр по левому берегу.Основные притоки: правые — Чапушка, Малый Аркадак, Кистендей, левые — Шадча, Иловатка, Дубовая, Ольгина.[источник не указан 1005 дней]По данным государственного водного реестра России относится к Донскому бассейновому округу, водохозяйственный участок реки — Хопёр от истока до впадения реки Ворона, речной подбассейн реки — Хопер. Речной бассейн реки — Дон (российская часть бассейна).Код объекта в государственном водном реестре — 05010200112107000005773."
     },
      {
        "name": "Большой Атлым ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%90%D1%82%D0%BB%D1%8B%D0%BC_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "141 км",
        "pool": "2110 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Обь",
        "location": " Россия",
        "info": "Большой Атлым — река в Октябрьском районе Ханты-Мансийского АО России. Устье реки находится на 946-м км правого берега реки Обь. Длина составляет 141 км, площадь бассейна — 2110 км².По данным государственного водного реестра России относится к Нижнеобскому бассейновому округу, водохозяйственный участок реки — Обь от впадения Иртыша до впадения реки Северная Сосьва, речной подбассейн реки — бассейны притока Оби от Иртыша до впадения Северной Сосьвы. Речной бассейн реки — (Нижняя) Обь от впадения Иртыша."
     },                         {
        "name": "Большой Гашун",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%93%D0%B0%D1%88%D1%83%D0%BD",
        "image": "undefined",
        "length": "161 км",
        "pool": "3090 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Сал",
        "location": " Россия",
        "info": "Большо́й Гашу́н (от калм. Һашун — горькая) — река в Ростовской области, левый приток реки Сал. Длина 161 км, площадь бассейна 3090 км².Несмотря на значительную длину, река не оказывается заметного влияния на сток реки Сал. Питается Большой Гашун талыми водами снегов и восполняется притоками: Малый Гашун и рекой без названия. Ледостав с декабря по март.Большой Гашун имеет высокий правый и затопляемый низкий левый берег. Вода в русле держится постоянно, начиная от балки Хуторской, напротив впадения которой текут обильные родники. Берега здесь заросли густым камышом. Ниже Бурульского вода в русле, заросшем камышом, теряется.После слиянии Большого Гашуна с Малым (ширина каждого из них 5—7 м) Гашун имеет ширину до 70 м, глубину до 3 м и берега высотою до 2 м. Однако расположенная ниже по течению плотина задерживает речные воды, и река почти пересыхает и не дает стока в Сал. Только весною, при прорыве ряда плотин или переполнении водою нижних приустьевых плотин, воды Гашуна пополняют воды Сала."
     },
                    {
        "name": "Большой Енисей",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%95%D0%BD%D0%B8%D1%81%D0%B5%D0%B9",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/BiyHemTooraHem.JPG/250px-BiyHemTooraHem.JPG",
        "length": "605 км",
        "pool": "56 800 км²",
        "consumption": "584 м³/с",
        "head": "Кара-Балык",
        "estuary": "Енисей",
        "location": " Россия",
        "info": "Большо́й Енисе́й (тув. Бии-Хе́м) — река в республике Тува, правый исток Енисея. Средний расход воды — 584 м³/с.[источник не указан 588 дней] Высота устья — 619 м над уровнем моря.[источник не указан 588 дней] Высота истока — 1521 м над уровнем моря.[источник не указан 588 дней]Название реки Бий-Хем в переводе с тувинского означает «большая река».Длина — 605 км, площадь бассейна — 56 800 км². Судоходна на 285 км от устья. Берёт начало из озера Кара-Балык. Высокая водность реки объясняется тем фактом, что водосбор реки включает в себя Тоджинскую котловину, рельеф которой формирует уникальный водосборный бассейн. Река принимает многочисленные притоки, из которых наиболее крупные правые Тоора-Хем, Хамсара, Сыстыг-Хем. Бассейн Большого Енисея — горная область, границы которой на севере и востоке являются административными границами Тувы с Бурятией, Иркутской областью и Красноярским краем. В нижнем течении протекает по Тувинской котловине. У города Кызыла сливается с Каа-Хемом, образуя Улуг-Хем, являющийся фактически началом Верхнего Енисея. В бассейне реки целиком расположен Тоджинский кожуун республики Тува с его центром Тоора-Хемом, расположенном в месте впадения притока Тоора-Хем."
     },
     {
        "name": "Большой Епседей",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%95%D0%BF%D1%81%D0%B5%D0%B4%D0%B5%D0%B9",
        "image": "undefined",
        "length": "102 км",
        "pool": "984 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Полуй",
        "location": " Россия",
        "info": "Большой Епседей — река в Приуральском районе Ямало-Ненецкого АО. Устье реки находится в 167 км от устья реки Полуй по левому берегу. Длина — 102 км, площадь водосборного бассейна — 984 км², в 57 км по левому берегу впадает приток Малый Епседей. Другие значительные притоки: Хараяха левый, Паранамаяха и Табэйяха правые.По данным государственного водного реестра России относится к Нижнеобскому бассейновому округу, водохозяйственный участок реки — Обь от впадения реки Северная Сосьва до города Салехард, речной подбассейн реки — бассейны притоков Оби ниже впадения Северной Сосьвы. Речной бассейн реки — (Нижняя) Обь от впадения Иртыша.Код объекта в государственном водном реестре — 15020300112115300033061."
     },
      {
        "name": "Большой Зеленчук",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%97%D0%B5%D0%BB%D0%B5%D0%BD%D1%87%D1%83%D0%BA",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Zelenchuk.jpg/250px-Zelenchuk.jpg",
        "length": "158 км",
        "pool": "2730 км²",
        "consumption": "40 м³/с (в 80 км от устья)",
        "head": "слияние рек: Псыш и Кизгыч",
        "estuary": "Кубань",
        "location": " Россия",
        "info": "Большо́й Зеленчу́к — река на Северном Кавказе, левый приток Кубани.Длина реки — 158 км, от истока реки Псыж более 180 км, площадь водосборного бассейна — 2730 км². Протекает по Карачаево-Черкесии, Ставропольскому и Краснодарскому краям. Берёт начало истоками — Псыш (с горы Пшиш (3790 м) и горы Псыш (3489 м)), Кизгыч и Архыз с северных склонов Главного Кавказского хребта. В верховьях расположен посёлок Архыз, являющийся местом отдыха и паломничества туристов самой разной подготовки и направлений. По левому берегу располагается одна из частей Тебердинского заповедника. В посёлке Нижний Архыз располагается памятник архитектуры Архызское городище, недалеко от поселка — обсерватория РАН. У станицы Зеленчукской река выходит на густозаселённую равнину. Впадает в Кубань в городе Невинномысске. Часть стока реки забирается в деривацию Зеленчукской ГЭС и перебрасывается в Кубань.Между долинами рек Большой и Малый Зеленчук возвышается гора Джисса (Шисса)."
     },
     {
        "name": "Большой Ик (приток Ая)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%98%D0%BA_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%90%D1%8F)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Bol%27shoy_Ik_river_in_Munasovo.jpg/250px-Bol%27shoy_Ik_river_in_Munasovo.jpg",
        "length": "108 км",
        "pool": "1460 км²",
        "consumption": "8,6 м³/с (устье)",
        "head": " ",
        "estuary": "Ай",
        "location": " Россия",
        "info": "Большой Ик (башк. Оло Ыйыҡ, в верховье Малый Ик) — река в России, правый приток реки Ай, протекает по территории Челябинской области и Башкортостана.Длина реки — 108 км, площадь водосборного бассейна — 1460 км², общее падение — 260 м. Скорость течения до 0,5 м/с, ширина реки в нижнем течении увеличивается до 15—20 метров. Средний расход воды в устье — 8,6 м³/с. Питание реки преимущественно снеговое.Большой Ик берёт начало на западном склоне хребта Азям на территории Челябинской области. Протекает с востока на запад по территории Челябинской области, Белокатайского и Мечетлинского районов Республики Башкортостан и впадает в реку Ай в 138 километрах от её устья. Высота устья — 199 м над уровнем моря.Исток Большого Ика находится на низкогорье, сложенном породами карбона и перми. Рельеф сильно расчленён речными долинами, логами, балками, русло сильно петляет, пойма поросла зарослями кустарника, встречаются старицы.Лесистость бассейна составляет 42 %, распаханность — 26 %, заболоченность — 1 %.Притоки указаны от устья к истоку."
     },
     {
        "name": "Большой Ик (приток Сакмары)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%98%D0%BA_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A1%D0%B0%D0%BA%D0%BC%D0%B0%D1%80%D1%8B)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Very_small_ford_across_Bol%27shoy_Ik.jpg/250px-Very_small_ford_across_Bol%27shoy_Ik.jpg",
        "length": "341 км",
        "pool": "7670 км²",
        "consumption": "61 м³/с",
        "head": " ",
        "estuary": "Сакмара",
        "location": " Россия",
        "info": "Большо́й Ик (башк. Оло Эйек) — река в Башкортостане и Оренбургской области России. Устье реки находится в 220 км по правому берегу реки Сакмара (бассейн Урала).Длина реки — 341 км, площадь бассейна — 7670 км². Склоны долины реки при течении по Зилаирскому плато в основном крутые и скалистые, сильно изрезанные. Высота устья — 133 м над уровнем моря.Начинается в Зилаирском районе, на Зилаирском плато, в 12 км к юго-востоку от пгт Кананикольское, течёт по Зианчуринскому, Кугарчинскому районам Республики Башкортостан, далее по Саракташскому району Оренбургской области.Питание реки преимущественно снеговое. Среднемноголетний расход воды в 36 км от устья составляет 56,8 м³/с. Средний расход воды — 61 м³/с.[источник не указан 831 день]Главные притоки Большого Ика: река Малый Ик — справа, реки Иняк, Большая Сурень — слева.В Мурадымовском ущелье организован природный парк, носящий то же название.(км от устья)"
     },
        {
        "name": "Большой Иргиз",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%98%D1%80%D0%B3%D0%B8%D0%B7",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Bolshoj_Irgiz.jpg/250px-Bolshoj_Irgiz.jpg",
        "length": "675 км",
        "pool": "24 000 км²",
        "consumption": "23 м³/с (в устье)",
        "head": " ",
        "estuary": "Волгоградское водохранилище",
        "location": " Россия",
        "info": "Большо́й Ирги́з (Иргиз) — река в Самарской и Саратовской областях России, левый приток Волги.Длина реки — 675 км, площадь водосборного бассейна — 24 000 км². Среднегодовой расход воды в низовье около 23 м³/с. Используется для орошения. Половодье в марте — апреле (30 дней, 86 % годового стока). Питание снеговое. Ледостав с ноября по апрель (местами промерзает до дна), весенний ледоход около 7 дней. Летом иногда пересыхает. Сток зарегулирован многочисленными плотинами.Истоки на отрогах Общего Сырта, течёт, сильно петляя, по широкой долине среди распаханной степи; питание снеговое. Впадает в Волгоградское водохранилище ниже города Балаково.На реке 2 крупных водохранилища: Сулакское (площадь водного зеркала — 20 км², объём — 0,115 км³) и Пугачёвское (10 км² и 0,06 км³ соответственно)[источник не указан 4537 дней]. Через акваторию Сулакского водохранилища проходит трасса Саратовского оросительно-обводнительного канала, которую питает водохранилище. Всего в бассейне реки Большой Иргиз сооружено около 800 прудов и водохранилищ общим объёмом 0,45 км³[источник не указан 4537 дней].На реке расположен город Пугачёв, сёла Беленка, Толстовка, Большая Таволожка, Старая Порубежка, Имелеевка, Клевенка, Канаевка, Яблоновый Гай, Горелый Гай, Преображенка, Успенка, Каменка, Давыдовка, Тамбовка, Берёзово, Каменка, Пестравка, Мосты, Дмитриевка, Большая Глушица Самарской области, посёлок Заволжский, с. Малое Перекопное с. Перекопная Лука, с. Сулак, село Сухой Отрог, посёлок Береговой (Дурдом), Криволучье-Сура, Большой Кушум, Ветка, Быков отрог, Красный Яр, Кормёжка, Наумовка, Пылковка, Малый Кушум, Малая Быковка."
     },
                      {
        "name": "Большой Караман",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%9A%D0%B0%D1%80%D0%B0%D0%BC%D0%B0%D0%BD",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9%D0%9A%D0%B0%D1%80%D0%B0%D0%BC%D0%B0%D0%BD.jpg/250px-%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9%D0%9A%D0%B0%D1%80%D0%B0%D0%BC%D0%B0%D0%BD.jpg",
        "length": "198 км",
        "pool": "4260 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Волга",
        "location": " Россия",
        "info": "Большой Караман — река в Саратовской области, левый приток Волги.Большой Караман берёт начало на отрогах Общего Сырта в восточной части Марксовского района чуть южнее села Яблоня (в XIX веке — хутора Еланский (Рудницкий) и Бабова). От истока течёт в юго-западном направлении, возле посёлка Степное принимает северо-западное. Русло реки в среднем и нижнем течении извилистое, берега преимущественно обрывистые. В устье у левого берега Волгоградского водохранилища между сёлами Усть-Караман и Красная Поляна образует с впадающим туда же с северо-восточной стороны Малым Караманом небольшой залив (2110-й километр течения Волги).Длина Большого Карамана в периоды полноводья достигает 220 километров. Летом верховья реки пересыхают, и средняя протяжённость течения равна 195—198 километрам. Питание реки в основном снеговое и грунтовое. Площадь водосборного бассейна — 4260 км²."
     },
                   {
        "name": "Большой Кизил",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%9A%D0%B8%D0%B7%D0%B8%D0%BB",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Bolshoi_Kizil_%28river%29.jpg/250px-Bolshoi_Kizil_%28river%29.jpg",
        "length": "172 км",
        "pool": "2080 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Урал",
        "location": " Россия",
        "info": "Большой Кизил (башк. Оло Ҡыҙыл) — река, правый приток Урала. Длина реки — 172 км, площадь бассейна — 2080 км², общее падение 570 м.Берёт начало в понижении между хребтами Уралтау и Крыктытау, протекает с севера на юг по территории в Абзелиловского района и Челябинской области. В 30 км от истока Большой Кизил поворачивает на юго-восток и впадает в реку Урал в 2014 км от её устья.Питание преимущественно снеговое; восточноевропейский тип водного режима с весенним половодьем. 71 % — сток весеннего половодья, 27 % (по другим данным — 22 %) — летне-осенней межени и 2 % (по другим данным — 7 %) — зимний сток.Среднемноголетний расход воды у деревни Верхнее Абдряшево (в 48 км от устья) 4,17 м³/с (объём стока 0,132 км³/год). Максимальный расход воды 179 м³/с, минимальный зимний — 0,010 м³/с (в марте 1976 года), минимальный в период открытого русла —— 0,053 м³/с. Река замерзает в начале ноября, вскрывается в апреле.В бассейне реки на горно-лесных тёмно-серых, горных выщелоченных чернозёмах, горных недоразвитых почвах произрастают светлохвойные леса из сосны и лиственницы, берёзовые и сосново-берёзовые леса. На обыкновенных и выщелоченных чернозёмах низовьев — разнотравные типчаково-ковыльные низкогорные степи, большей частью распаханные на равнине."
     },
       {
        "name": "Большой Кинель",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%9A%D0%B8%D0%BD%D0%B5%D0%BB%D1%8C",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/River_Kinel.jpg/250px-River_Kinel.jpg",
        "length": "422 км",
        "pool": "14 900 км²",
        "consumption": "34 м³/с (с. Тимашево)",
        "head": " ",
        "estuary": "Самара",
        "location": " Россия",
        "info": "Большо́й Кине́ль — река в Заволжье, Россия. Приток Самары. Длина — 422 км.Берёт начало на западных склонах Общего Сырта, в 9 км к юго-востоку от села Алябьево Пономарёвского района, Оренбургской области, впадает в реку Самару с правого берега между городом Кинель и посёлком Алексеевка.Длина реки — 442 км, общее падение — 265 м, средний уклон — 0,6 %, средняя высота водосбора — 154 м, площадь бассейна — 14900 км².Длина реки в пределах Оренбургской области — 196 км, площадь водосбора — 6986 км², общее падение — 185 м, средний уклон — 0,9 %.Принимает 196 больших и малых притоков, из которых значительны левые Малый Кинель и Кутулук. Притоки, как и сам Большой Кинель, с повышенной минерализацией воды. Вода жёсткая, по химическому составу гидрокарбонатно-кальциевая. Основные притоки в пределах Оренбургской области: Умирка, Ереуз, Большая Кисла, Мочегай, Савруша, Кондузла.Бассейн реки асимметричен по форме: правобережье относительно высокое и сильно расчленено; рельеф левобережья отличается мягкостью очертаний и меньшей расчленённостью. Грунты глинистые и суглинистые, растительность степная и лесостепная.Долина реки хорошо выражена, трапецеидальная, шириной в верховье 1,5−2 км, в нижнем течении — 7−8 км. Склоны долины сложены суглинистым грунтом, по правому склону отмечены обнажения скальных пород."
     },
                  {
        "name": "Большой Кочмес",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%9A%D0%BE%D1%87%D0%BC%D0%B5%D1%81",
        "image": "undefined",
        "length": "198 км",
        "pool": "1890 км²",
        "consumption": "14,69 м³/с (87 км от устья)",
        "head": " ",
        "estuary": "Уса",
        "location": " Россия",
        "info": "Большо́й Кочме́с — река в Республике Коми, левый приток реки Уса (бассейн Печоры).Длина — 198 км, площадь бассейна — 1890 км². Питание смешанное.Крупнейший приток — Малый Кочмес (правый).Большой Кочмес начинается у подножия западных склонов Приполярного Урала. В верховьях течёт на север по ненаселённой местности, в среднем течении разворачивается на юго-запад и течёт вдоль железной дороги Котлас — Печора — Воркута от станции Петрунь до станции Байдук. Ещё ниже река разворачивается на северо-запад и вскоре впадает в Усу около деревни Кочмес. Почти на всём протяжении, особенно в низовьях, течёт среди болот и озёр. Русло чрезвычайно извилисто.По данным государственного водного реестра России и геоинформационной системы водохозяйственного районирования территории РФ, подготовленной Федеральным агентством водных ресурсов:↓"
     },
          {
        "name": "Большой Кумак",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%9A%D1%83%D0%BC%D0%B0%D0%BA",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Ural_river_basin.png/250px-Ural_river_basin.png",
        "length": "212 км",
        "pool": "7900 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Урал",
        "location": " Россия",
        "info": "Большой Кумак (в верховье Кумак) — река в Оренбургской области России, левый приток Урала. Площадь водосбора 7900 км². Длина реки 212 км.Река Большой Кумак − левобережный приток Урала, впадает в него выше г. Орска на 1733 км от устья..Густота речной сети 0,15−0,16 км/км². Русло реки песчано-глинистое, деформирующееся, зарастающее, шириной 5−40 м. Глубина на плёсах 2−3 м, на перекатах 0,25−0,40 м.Объекты по порядку от устья к истоку ( км от устья: ← левый приток | → правый приток | — объект на реке ):"
     },
     {
        "name": "Большой Куньяк",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%9A%D1%83%D0%BD%D1%8C%D1%8F%D0%BA",
        "image": "undefined",
        "length": "170 км",
        "pool": "1860 км²",
        "consumption": "undefined",
        "head": "Малый Куньяк",
        "estuary": "Демьянка",
        "location": " Россия",
        "info": "Большой Куньяк — река в России, протекает по Тюменской области. Устье реки находится в 303 км от устья реки Демьянка по левому берегу. Длина реки составляет 170 км.Высота истока — 102 м над уровнем моря.[источник не указан 812 дней] Площадь водосборного бассейна — 1860 км².[источник не указан 812 дней]Бассейн реки целиком, на всём протяжении, находится в зоне тайги (подзоне южной тайги). Лесистость данного подрайона колеблется от 40 до 70 %. Рельеф окружающей местности представляет собой плоские сильнозаболоченные, многоозёрные низменности. Болота занимают от 30 до 60 % площади водосборов. В непосредственной близости от реки, в небольшом количестве, имеются озёра старичного происхождения. Наряду с озёрами имеют место множество постоянных и временных водотоков, большей частью берущих начало в болотах. Густота речной сети составляет 0,39 км/км².Долина реки имеет трапецеидальную форму. Ширина долины до 250 метров. Склоны долины реки относительно крутые, местами обрывистые, имеют разнообразную таёжную растительность. Древесная растительность представлена смешанными лесами, хвойными породами деревьев: кедр, сосна, ель, пихта; лиственными породами: осина, берёза, ива. Из кустарников преобладает тальник."
     },
           {
        "name": "Большой Кушум ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%9A%D1%83%D1%88%D1%83%D0%BC_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "107 км",
        "pool": "1800 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Большой Иргиз",
        "location": " Россия",
        "info": "Большой Кушум, в верхнем течении Кушум — река в Заволжье, левый приток реки Большой Иргиз.Река протекает по Ершовскому и Балаковскому району Саратовской области. Длина реки — 107 км, площадь водосборного бассейна — 1800 км².Река берёт начало на севере Ершовского района у села Южный в Кушумском овраге. Впадает в Большой Иргиз у села Большой Кушум. В нижнем течении русло реки очень извилисто. В излучинах небольшие участки пойменного леса.На берегу расположен известный бальнеологический курорт «Чапаевский» (ранее называвшийся Столыпинские минеральные воды).Основные притоки: правый — Пеньков Дол, левые — Полуденка, Миусс.По данным государственного водного реестра России относится к Нижневолжскому бассейновому округу, водохозяйственный участок реки — Большой Иргиз от Сулакского гидроузла и до устья. Речной бассейн реки — Волга от верхнего Куйбышевского водохранилища до впадения в Каспий.Код объекта в государственном водном реестре — 11010001712112100010143."
     },
     {
        "name": "Большой Куяльник",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%9A%D1%83%D1%8F%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Velikyi_Kuyalnyk1.jpg/250px-Velikyi_Kuyalnyk1.jpg",
        "length": "150 км",
        "pool": "1860 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Куяльницкий лиман",
        "location": " Украина",
        "info": "Большо́й Куя́льник (укр. Великий Куяльник) — река в Одесской области Украины. Длина реки — 150 км, площадь водосборного бассейна — 1860 км². Питание снеговое, летом мелеет, иногда пересыхает, в холодные зимы перемерзает. В Большой Куяльник впадает около 40 малых рек суммарной протяжённостью около 280 км.Большой Куяльник берёт исток на юго-восточных склонах Подольской возвышенности, вблизи Подольска и протекает по территории Подольского, Ананьевского, Ширяевского и Ивановского районов Одесской области. Впадает в Куяльницкий лиман, который отделён от Чёрного моря пересыпью. На лимане, в черте Одессы, расположен Куяльницкий курорт. На реке расположены посёлки Долинское, Ширяево, Ивановка и множество небольших сёл.Притоки: (от истока к устью) балка Вертот, Сухая Журовка, балка Каунова и Глубокий Яр, балка Глубокий Яр, Овраг Дубовый, балка Курсаковская, КошковаИсходя из описаний Геродота климат северного Причерноморья более чем 2 тысячи лет назад был гораздо влажнее современного. В то время Большой Куяльник был более полноводной рекой. В устье обнаружены остатки греческого поселения III—IV веков до н. э. и несколько скифских курганов.Со временем устье реки превратилось в залив Чёрного моря, отделившийся от моря за счёт пересыпи из морского и речного песка. Отделение произошло приблизительно в XIV веке, после этого события на месте бывшего залива сформировался Куяльницкий лиман."
     },
                  {
        "name": "Большой Ломовис",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%9B%D0%BE%D0%BC%D0%BE%D0%B2%D0%B8%D1%81",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Moksha.svg/250px-Moksha.svg.png",
        "length": "106 км",
        "pool": "1160 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Кашма",
        "location": " Россия",
        "info": "Большой Ломовис — река в Тамбовской области России, левый приток Кашмы (бассейн Волги).Длина реки составляет 106 км.Приток: Малый Ломовис (24 км от устья) — правый.По данным государственного водного реестра России относится к Окскому бассейновому округу, водохозяйственный участок реки — Цна от города Тамбов и до устья, речной подбассейн реки — Мокша. Речной бассейн реки — Ока.Код объекта в государственном водном реестре — 09010200312110000029317."
     },
            {
        "name": "Большой Мёгтыгъёган",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%9C%D1%91%D0%B3%D1%82%D1%8B%D0%B3%D1%8A%D1%91%D0%B3%D0%B0%D0%BD",
        "image": "undefined",
        "length": "255 км",
        "pool": "4170 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Мёгтыгъёган",
        "location": " Россия",
        "info": "Большой Мёгтыгъёган (устар. Большой Мег-Тыг-Ёган) — река в России, протекает по Нижневартовскому району Ханты-Мансийского АО. Слиянием с рекой Малый Мёгтыгъёган образует реку Мёгтыгъёган в 36 км от устья, являясь её левой составляющей. Длина — 255 км, площадь водосборного бассейна — 4170 км².Высота устья — 58 м над уровнем моря.[источник не указан 601 день]По данным государственного водного реестра России относится к Верхнеобскому бассейновому округу, водохозяйственный участок реки — Вах, речной подбассейн реки — бассейн притоков (Верхней) Оби от Васюгана до Ваха. Речной бассейн реки — (Верхняя) Обь до впадения Иртыша."
     },
     {
        "name": "Большой Мендерес",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%9C%D0%B5%D0%BD%D0%B4%D0%B5%D1%80%D0%B5%D1%81",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Maiandros.jpg/250px-Maiandros.jpg",
        "length": "548 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "Ишиклы",
        "estuary": "Эгейское море",
        "location": " Турция",
        "info": "Большо́й Мендере́с (тур. Büyük Menderes, Меандр, греч. Μαίανδρος) — река в Эгейском регионе западной части Малой Азии, на юго-западе Турции.Река берёт своё начало недалеко от Келен, из водоёма Ишиклы во Фригии (ныне Динар), где она стекает в долину Кира.По данным некоторых историков, у неё те же истоки, что и у реки Марсий (Μαρσύας), но это утверждение не согласуется с написанным Ксенофонтом, по данным которого, истоки двух рек находились поблизости друг от друга, а Марсий восходит к царскому дворцу. Другие историки утверждали, что Меандр вытекает из озера на горе Авлокрена (Aulocrene). Уильям Лик объединял эти, казалось бы, различные заявления и отмечал, что Меандр и Марсий берут своё начало из озера на горе Авлокрена, выше Келен, но что вместе с Марсием они выходят в разных местах гор ниже озера.Большой Мендерес под своим прежним названием Меандр был знаменитой рекой Карии в Малой Азии. Его упоминание появилось в «Каталоге кораблей» (второй книге «Илиады» Гомера) наравне с названиями города Милет и полуострова Микале. Также знаменитым, в том числе и благодаря своей необычной гидрографии, во времена античности был приток Большого Мендереса Лик.[источник не указан 1210 дней]"
     },
                    {
        "name": "Большой Нимныр ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%9D%D0%B8%D0%BC%D0%BD%D1%8B%D1%80_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%9D%D0%B8%D0%BC%D0%BD%D1%8B%D1%80.jpg/250px-%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%9D%D0%B8%D0%BC%D0%BD%D1%8B%D1%80.jpg",
        "length": "181 км",
        "pool": "4860 км²",
        "consumption": "24,81 м³/с (113 км от устья)",
        "head": "слияние рек: Хангас-Нимгеркан и Унга-Нимгеркан",
        "estuary": "Алдан",
        "location": " Россия",
        "info": "Большой Нимныр (Улахан-Ньымньыыр) — река в республике Саха России, правый приток Алдана. Длина — 181 км, площадь бассейна — 4860 км².Образуется слиянием рек Хангас-Нимгеркан и Унга-Нимгеркан на окончании хребта Западные Янги Алданского нагорья. На правом берегу — одноимённый посёлок Алданского района, ниже которого реку пересекает Амуро-Якутская железнодорожная магистраль. По данным наблюдений с 1948 по 1994 год среднегодовой расход воды в районе посёлка (113 км от устья) составляет 24,81 м³/с. Одна из самых сложных рек Якутии для спортивного сплава. Высота устья — 369 м над уровнем моря.[источник не указан 602 дня](расстояние от устья)По данным государственного водного реестра России относится к Ленскому бассейновому округу, речной бассейн реки — Лена, речной подбассейн реки — Алдан, водохозяйственный участок реки — Алдан от истока до в/п г. Томмот.Код объекта в государственном водном реестре — 18030600112117300001940."
     },
                   {
        "name": "Большой Оус",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%9E%D1%83%D1%81",
        "image": "undefined",
        "length": "186 км",
        "pool": "2140 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Пелым",
        "location": " Россия",
        "info": "Большой Оус — река в Свердловской области России, протекает по территории Ивдельского городского округа. Устье реки находится в 300 км от устья реки Пелым по правому берегу. Длина реки составляет 186 км, площадь водосборного бассейна — 2140 км².(указано расстояние от устья)По данным государственного водного реестра России относится к Иртышскому бассейновому округу, водохозяйственный участок реки — Тавда от истока и до устья, без реки Сосьва от истока до водомерного поста у деревни Морозково, речной подбассейн реки — Тобол. Речной бассейн реки — Иртыш.Код объекта в государственном водном реестре — 14010502512111200012120."
     },
        {
        "name": "Большой Паток",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%9F%D0%B0%D1%82%D0%BE%D0%BA",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%9F%D0%B0%D1%82%D0%BE%D0%BA_%D0%B8_%D0%A9%D1%83%D0%B3%D0%BE%D1%80_-_panoramio.jpg/250px-%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%9F%D0%B0%D1%82%D0%BE%D0%BA_%D0%B8_%D0%A9%D1%83%D0%B3%D0%BE%D1%80_-_panoramio.jpg",
        "length": "121 км",
        "pool": "2520 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Щугор",
        "location": " Россия",
        "info": "Большой Паток (Иджид Поток) — река в России, протекает по Республике Коми. Устье реки находится в 53 км по правому берегу реки Щугор. Длина реки — 121 км, площадь бассейна — 2520 км². Крупнейший по площади бассейна и длине приток Щугора. Название связывают с русским словом «поток». Высота устья — 89,7 м над уровнем моря.[источник не указан 602 дня]Река Большой Паток берёт начало на Исследовательском хребте Приполярного Урала на границе с Ханты-Мансийским автономным округом. Исток находится на высоте около 800 м в расселине между вершинами Орёл (1175 м НУМ) и Кварцитная (1389 НУМ). Исток расположен на глобальном водоразделе Печоры и Оби, с другой стороны хребта берёт начало река Манья.Река течёт на юго-запад, всё течение проходит в ненаселённой местности по территории национального парка Югыд Ва. Верхнее течение проходит по территории района Печора, затем река длительное время образует границу районов Печора и Вуктыл, в нижнем течении втекает на территорию района Вуктыл.Течение в верховьях носит бурный, горный характер, затем течение немного успокаивается. На всём протяжении образует многочисленные острова, часто дробится на отдельные протоки. Скорость течения в верховьях выше 2 м/с, в среднем течении 1,5 — 1,2 м/с, в низовьях 0,8 — 1,2 м/с. Ширина реки в верховьях около 10 метров, в среднем течении 30 — 80 метров, в нижнем течении ширина превышает 150 метров."
     },
     {
        "name": "Большой Патом",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%9F%D0%B0%D1%82%D0%BE%D0%BC",
        "image": "undefined",
        "length": "570 км",
        "pool": "28 400 км²",
        "consumption": "347,89 м³/с (34 км от устья)",
        "head": " ",
        "estuary": "Лена",
        "location": " Россия",
        "info": "Большой Па́том — река в Иркутской области России, правый приток Лены.Длина — 570 км, площадь водосборного бассейна — 28,4 тыс. км².Берёт начало в 100 км к северу от города Бодайбо на высоте более 842 метров над уровнем моря. Течёт в глубоком ущелье по Патомскому нагорью, деля его на две неравные части.В районе устья реки Маракан (465 км от устья) изобилует мелкими перекатами, в 10—15 км ниже притока русло сужается и начинается участок порогов, ширина реки здесь около 38 м, глубина — 1,2—1,3 м, скорость течения — 1,2 м/с, дно каменистое.Ниже места впадения левого притока — Анангры (434 км от устья) — ширина реки увеличивается до 115 метров, плёсы чередуются с порогами, появляются острова, а по берегам, среди таёжной флоры, встречаются кедры.В районе устья Саталаха (377 км от устья) множество проток, образующих острова Сорок Островов, сразу за которыми — 7-километровая шивера. При впадении Хайверги (294 км от устья) имеются остатки бывшего геологического посёлка. Ниже устья Тоноды (254 км от устья) Большой Патом становится многоводным, что даёт возможность заходить сюда весной баржам с Лены.Ширина реки в нижнем течении — 230—255 м, глубина — 2,0—2,5 м, скорость течения — 1,8—2,0 м/с, дно твёрдое. Впадает в Лену в 2334 км от её устья по правому берегу."
     },
                {
        "name": "Большой Пит",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%9F%D0%B8%D1%82",
        "image": "undefined",
        "length": "415 км",
        "pool": "21 700 км²",
        "consumption": "225 м³/с",
        "head": " ",
        "estuary": "Енисей",
        "location": " Россия",
        "info": "Большо́й Пит — река в Красноярском крае России, правый приток Енисея.Длина реки — 415 км, площадь водосборного бассейна — 21 700 км².Берёт начало в пределах Енисейского кряжа, протекает по Среднесибирскому плоскогорью. Впадает в Енисей между его двумя крупными притоками — Ангарой и Подкаменной Тунгуской — на расстоянии в 510 км ниже по течению от Красноярска и в 1880 км от устья Енисея.Среднегодовой расход воды в устье составляет 225 м³/с. За 39 лет наблюдений со станции «Сухой Пит» в 119 км от устья расход воды был наименьшим в 1968 году — 140,86 м³/с, наибольшим в 1960 году — 293,38 м³/с, что примерно соответствует изменению среднегодового расхода около Енисея от 157 м³/с до 327 м³/с.Питание реки в основном снеговое со значительной долей дождевого. Пик паводка приходится на май—июнь — за период наблюдений максимальный среднемесячный расход воды имел место в июне 1983 года и составлял 1500 м³/с. Ледостав на Большом Пите наступает в середине ноября, вскрывается река в середине мая.В период весеннего половодья с мая по июнь судоходна до пристани Брянка в 184 км от устья. Близ устья располагается посёлок Усть-Пит Енисейского района, на реке — посёлки Брянка и Пит-Городок Северо-Енисейского района. Единственный постоянный мост через реку построен в 1989 году и расположен в посёлке Брянка на региональной автодороге 04К-053 Енисейск — Северо-Енисейский."
     },
     {
        "name": "Большой Покур",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%9F%D0%BE%D0%BA%D1%83%D1%80",
        "image": "undefined",
        "length": "168 км",
        "pool": "1600 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Обь",
        "location": " Россия",
        "info": "Большой Покур — река в России, протекает по Ханты-Мансийскому АО. Устье реки находится в 29 км по левому берегу Кондрашкиной протоки реки Обь. Длина реки составляет 168 км, площадь водосборного бассейна 1600 км². Высота устья — 80,4 м над уровнем моря.[источник не указан 597 дней]По данным государственного водного реестра России относится к Верхнеобскому бассейновому округу, водохозяйственный участок реки — Обь от впадения реки Вах до города Нефтеюганск, речной подбассейн реки — Обь ниже Ваха до впадения Иртыша. Речной бассейн реки — (Верхняя) Обь до впадения Иртыша."
     },
                  {
        "name": "Большой Салым",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%A1%D0%B0%D0%BB%D1%8B%D0%BC",
        "image": "undefined",
        "length": "583 км",
        "pool": "18 100 км²",
        "consumption": "69,45 м³/с (65 км от устья)",
        "head": " ",
        "estuary": "Обь",
        "location": " Россия",
        "info": "Большой Салы́м — река в России, левый приток Оби, протекает по территории Нефтеюганского и Ханты-Мансийского районов Ханты-Мансийского автономного округа. Длина реки — 583 км, площадь водосборного бассейна — 18 100 км². Среднемноголетний расход воды — 69,5 м³/с.Большой Салым начинается на высоте 95 м над уровнем моря в Салымском болоте (одно из Васюганских болот) на юго-западе Нефтеюганского района. От истока течёт по центральной части Западно-Сибирской низменности на север, затем сворачивает на запад, а возле посёлка Салым в неё вливаются левые притоки Тукан и Вандрас, и река снова поворачивает на север. Местами отклоняясь к востоку и западу, протекает примерно в северном направлении почти до самого слияния с Обью. Вблизи устья отклоняется к западу и сливается со своим крупнейшим притоком Малым Салымом. Впадает в Большую Салымскую протоку Оби в 35 км ниже по течению села Лемпино, на высоте 35 м над уровнем моря. В устье Большой Салым имеет до 200 м в ширину и более 2 м в глубину, а скорость течения достигает 0,4 м/с.(расстояние от устья)Река имеет равнинный характер во всём течении, протекает через очень заболоченную таёжную местность с большим количеством мелких озёр. Русло очень извилистое, со множеством меандров и стариц."
     },
                                      {
        "name": "Большой Тап",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%A2%D0%B0%D0%BF",
        "image": "undefined",
        "length": "504 км",
        "pool": "6700 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Конда",
        "location": " Россия",
        "info": "Большой Тап — судоходная река в России, протекает по территории Кондинского и Советского районов Ханты-Мансийского автономного округа, левый приток Конды, берёт своё начало к югу от озера Тапто.Длина реки — 504 км, площадь водосборного бассейна — 6700 км². Общее направление течения с севера на юг. Питание реки снеговое и дождевое.Река протекает в малонаселённой местности, раньше в устье на ней располагалась одноимённая деревня Большой Тап, в настоящее время деревня упразднена.В бассейне Большого Тапа расположены нефтегазовые месторождения, на которых ведётся добыча нефти.Река богата рыбой и привлекательная для водного туризма.Основные притоки: По данным государственного водного реестра России относится к Иртышскому бассейновому округу, водохозяйственный участок реки — Конда, речной подбассейн реки — Конда. Речной бассейн реки — Иртыш.Код объекта в государственном водном реестре — 14010600112115300016559."
     },
             {
        "name": "Большой Томан",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%A2%D0%BE%D0%BC%D0%B0%D0%BD",
        "image": "undefined",
        "length": "125 км",
        "pool": "893 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Тобыш",
        "location": " Россия",
        "info": "Большой Томан — река в России, протекает в Республике Коми. Устье реки находится в 85 км по правому берегу реки Тобыш. Длина реки составляет 125 км, площадь водосборного бассейна — 893 км².По данным государственного водного реестра России относится к Двинско-Печорскому бассейновому округу, водохозяйственный участок реки — Печора от водомерного поста Усть-Цильма и до устья, речной подбассейн реки — бассейны притоков Печоры ниже впадения Усы. Речной бассейн реки — Печора.Код объекта в государственном водном реестре — 03050300212103000080345."
     },
      {
        "name": "Большой Тукшин",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%A2%D1%83%D0%BA%D1%88%D0%B8%D0%BD",
        "image": "undefined",
        "length": "109 км",
        "pool": "1080 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Сыня",
        "location": " Россия",
        "info": "Большой Тукшин (в верхнем течении — Тукшин) — река в Шурышкарском районе Ямало-Ненецкого АО. Устье реки находится в 179 км от устья Сыни по правому берегу, напротив нежилого селения Мугорт. Длина реки составляет 109 км, площадь водосборного бассейна — 1080 км², в 1,5 км по левому берегу впадает Малый Тукшин. Другие притоки: левые — Парангосейнюр-Соим, Парангосейшор в 52 км и Туйшор; правые — Улыс-Туйшор, Валыс-Туйшор, Кычильсадуку-Ёль — в 64 км по правому берегу, Тушкинтаинюрым-Соим и Варсынгтукшин.По данным государственного водного реестра России, относится к Нижнеобскому бассейновому округу, водохозяйственный участок реки — Обь от впадения реки Северная Сосьва до города Салехард, речной подбассейн реки — бассейны притоков Оби ниже впадения Северной Сосьвы. Речной бассейн реки — Нижняя Обь от впадения Иртыша.Код объекта в государственном водном реестре — 15020300112115300030152."
     },
     {
        "name": "Большой Туртас",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%A2%D1%83%D1%80%D1%82%D0%B0%D1%81",
        "image": "undefined",
        "length": "307 км",
        "pool": "3580 км²",
        "consumption": "undefined",
        "head": "Имгытское болото",
        "estuary": "Туртас",
        "location": " Россия",
        "info": "Большой Турта́с — река в Тюменской и Омской областях России. Устье реки находится в 241 км по правому берегу реки Туртас. Длина реки составляет 307 км. Площадь водосборного бассейна — 3580 км².(расстояние от устья)По данным государственного водного реестра России относится к Иртышскому бассейновому округу, водохозяйственный участок реки — Иртыш от впадения реки Тобол до города Ханты-Мансийск (выше), без реки Конда, речной подбассейн реки — бассейны притоков Иртыша от Тобола до Оби. Речной бассейн реки — Иртыш."
     },
       {
        "name": "Большой Узень",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%A3%D0%B7%D0%B5%D0%BD%D1%8C",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%D0%BE%D0%B2_%D0%93%D0%B0%D0%B9_%D0%9C%D0%B5%D0%BB%D1%8C%D0%BD%D0%B8%D1%86%D0%B0_%D0%BA%D1%83%D0%BF%D1%86%D0%B0_%D0%9F%D0%BE%D0%B7%D0%B4%D0%BD%D1%8F%D0%BA%D0%BE%D0%B2%D0%B0_1_%D0%B0%D0%B2%D0%B3%D1%83%D1%81%D1%82%D0%B0_2017_03.jpg/250px-%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%D0%BE%D0%B2_%D0%93%D0%B0%D0%B9_%D0%9C%D0%B5%D0%BB%D1%8C%D0%BD%D0%B8%D1%86%D0%B0_%D0%BA%D1%83%D0%BF%D1%86%D0%B0_%D0%9F%D0%BE%D0%B7%D0%B4%D0%BD%D1%8F%D0%BA%D0%BE%D0%B2%D0%B0_1_%D0%B0%D0%B2%D0%B3%D1%83%D1%81%D1%82%D0%B0_2017_03.jpg",
        "length": "650 км",
        "pool": "14 300 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Камыш-Самарские озёра",
        "location": "undefined",
        "info": "Большо́й Узе́нь (каз. Үлкен Өзен, Қараөзен) — степная река внутреннего стока, протекающая по Саратовской области России и Западно-Казахстанской области Казахстана.Длина реки около 400 километров (в половодье до 650 км). Площадь водосборного бассейна 14 300 км². Уклон реки — 0,2 м/км.[источник не указан 62 дня]Берёт начало на юго-западных склонах Общего Сырта. В верхней части течёт на юго-запад, после впадения притока Солянка поворачивает на юго-восток. В Казахстане река переходит в обширную систему мелких озёр и болот, известных под именем Камыш-Самарских.С левой стороны в Большой Узень впадает Алтата, с правой — небольшая протока соединяет с озером Сакрыл.Русло реки довольно глубокое, берега крутые, под Жалпакталом имеются пороги. В верховье вода пресная круглый год, а в среднем и нижнем течении к концу лета, осенью и зимою вода делается горько-солёной и негодной к употреблению.С 1973 года Саратовским оросительно-обводнительным каналом каждый год с 15 апреля по 15 ноября осуществляется подача волжской воды в исток Большого Узеня, со средним расходом 13,2 м³/с. В результате этого, гидрологический режим резко изменился: сток в летний период стал отмечаться почти вдоль всей реки."
     },
         {
        "name": "Большой Улуй ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%A3%D0%BB%D1%83%D0%B9_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "160 км",
        "pool": "2150 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Чулым",
        "location": " Россия",
        "info": "Большой Улуй — река в Красноярском крае России, правый приток Чулыма. Устье реки находится в 1060 км от устья по правому берегу Чулыма. Протяжённость реки 160 км, площадь бассейна — 2150 км².По данным государственного водного реестра России относится к Верхнеобскому бассейновому округу, водохозяйственный участок реки — Чулым от г. Ачинск до водомерного поста села Зырянское, речной подбассейн реки — Чулым. Речной бассейн реки — (Верхняя) Обь до впадения Иртыша.Код водного объекта — 13010400212115200016084."
     },
     {
        "name": "Большой Унзас",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%A3%D0%BD%D0%B7%D0%B0%D1%81",
        "image": "undefined",
        "length": "106 км",
        "pool": "956 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Мрассу",
        "location": " Россия",
        "info": "Большой Унзас (Большая Речка) — река в Кемеровской области России. Устье реки находится в 45 км от устья реки Мрассу. Длина реки составляет 106 км, площадь водосборного бассейна — 956 км².По данным государственного водного реестра России относится к Верхнеобскому бассейновому округу, водохозяйственный участок реки — Томь от истока до города Новокузнецк, без реки Кондома, речной подбассейн реки — Томь. Речной бассейн реки — (Верхняя) Обь до впадения Иртыша."
     },
     {
        "name": "Большой Уран",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%A3%D1%80%D0%B0%D0%BD",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/BolshoyUran.jpg/250px-BolshoyUran.jpg",
        "length": "155 км",
        "pool": "2200 км²",
        "consumption": "4,77 м³/с (село Ивановка)",
        "head": " ",
        "estuary": "Самара",
        "location": " Россия",
        "info": "Большо́й Ура́н (Большой Чуран) — река в Оренбургской области, в Сорочинском, Новосергиевском и Переволоцком районах. Правый приток Самары. Длина реки — 155 км. Площадь водосборного бассейна — 2200 км².Берёт начало на возвышенности Общий Сырт, на юго-западном склоне. Протекает преимущественно в западном направлении. Питание, в основном, талыми водами. Впадает в Сорочинское водохранилище, созданное на реке Самаре в 1997 году. Несмотря на название, река имеет меньшую длину и размер бассейна, нежели приток Самары Малый Уран.Крупнейшие притоки — реки Балейка, Максютка, Камышка, Солоновка, Гусиха. Всего имеет 26 притоков.В верхнем течении долина реки узкая, V-образная, ниже становится корытообразной. Борта долины разные: правый — крутой, высокий; левый — пологий, длинный. Распределение притоков по бортам примерно одинаковое, много оврагов и балок, верховья которых распаханы или покрыты растительностью степей. Пойма реки широкая, двухсторонняя, река поочерёдно подступает то к правому, то к левому борту. Река умеренно меандрирует и оставляет много стариц и грив, в том числе древних, с широким руслом и большим шагом. Часть крупных излучин унаследована современным руслом. В нижнем течении река разветвляется, поскольку скорость течения падает. Русло реки имеет мало прямолинейных участков. Часть реки зарегулирована прудами, особенно в верхнем течении."
     },
               {
        "name": "Большой Хомус-Юрях",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%A5%D0%BE%D0%BC%D1%83%D1%81-%D0%AE%D1%80%D1%8F%D1%85",
        "image": "undefined",
        "length": "324 км",
        "pool": "3420 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Восточно-Сибирское море",
        "location": " Россия",
        "info": "Большой Хомус-Юрях — река в Якутии.Длина реки — 324 км, площадь водосборного бассейна — 3420 км². Питание снеговое и дождевое. Замерзает в сентябре, вскрывается в конце мая — начале июня. Перемерзает в конце зимы. Половодье с июня по начало сентября. Берёт начало на северном склоне возвышенности Суор-Уята, течёт на север, впадает в Восточно-Сибирское море западнее реки Алазея. Крупный приток справа — Окуля.В бассейне реки расположено множество небольших озёр."
     },
     {
        "name": "Большой Цивиль",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%A6%D0%B8%D0%B2%D0%B8%D0%BB%D1%8C",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%A6%D0%B8%D0%B2%D0%B8%D0%BB%D1%8C%2C_%D0%A7%D1%83%D0%B2%D0%B0%D1%88%D0%B8%D1%8F.jpeg/250px-%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%A6%D0%B8%D0%B2%D0%B8%D0%BB%D1%8C%2C_%D0%A7%D1%83%D0%B2%D0%B0%D1%88%D0%B8%D1%8F.jpeg",
        "length": "172 км",
        "pool": "4690 км²",
        "consumption": "21,2 м³/с",
        "head": " ",
        "estuary": "Волга",
        "location": " Россия",
        "info": "Большой Цивиль (чуваш. Мăн Çавал), в нижнем течении Цивиль (чуваш. Çава́л) — река в Чувашии, правый приток Волги. Берёт начало в Шумерлинском районе. Протекает по Вурнарскому, Красноармейскому и Цивильскому районам. Около города Цивильск сливается с рекой Малый Цивиль. Далее уже как Цивиль протекает по границе Чебоксарского и Марпосадского районов и впадает в Волгу.Общая длина реки — 172 км, площадь бассейна — 4690 км², среднегодовой объём стока — 0,92 км³.Водный режим реки отличается устойчивой, но низкой водностью в летне-осенне-зимнюю межень и высокой — в половодье (начинается в первую неделю марта — первую неделю апреля).По данным государственного водного реестра России, относится к Верхневолжскому бассейновому округу, водохозяйственный участок реки — Цивиль от истока и до устья, речной подбассейн реки — Волга от впадения Оки до Куйбышевского водохранилища (без бассейна Суры). Речной бассейн реки — (Верхняя) Волга до Куйбышевского водохранилища (без бассейна Оки).Код объекта в государственном водном реестре — 08010400412112100000049.Река Цивиль является популярным местом для рыболовства. В Цивиле добываются все виды рыб, характерные для рек центральной России. Начиная с 2010 года, Цивиль и его рыбные ресурсы сильно страдают от маловодья. Распространённой является добыча рыбы браконьерским способом, среди браконьерских снаряжений на Цивиле преобладает черпалка."
     },
          {
        "name": "Большой Черемшан",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%A7%D0%B5%D1%80%D0%B5%D0%BC%D1%88%D0%B0%D0%BD",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Bolshoy_Cheremshan_-_8834.JPG/250px-Bolshoy_Cheremshan_-_8834.JPG",
        "length": "336 км",
        "pool": "11 500 км²",
        "consumption": "36,1 м³/с (в устье)",
        "head": " ",
        "estuary": "Куйбышевское водохранилище",
        "location": " Россия",
        "info": "Большо́й Черемша́н — река в Ульяновской области, Татарстане, Самарской области, левый приток Волги.Длина — 336 км (из них 160 км в РТ), площадь водосборного бассейна — 11 500 км², средний расход воды в устье — 36,1 м³/с. Исток на Бугульминско-Белебеевской возвышенности. Питание снеговое. Весной река расходует 60—70 % годового стока. До 1970-х была судоходна, прекращено из-за обмеления. Песчаные берега реки почти на всем протяжении покрыты хвойными и смешанными лесами. В русле реки часты острова, перекаты, мели и рыбацкие заколы. Низовья реки затоплены при строительстве Куйбышевского водохранилища до города Димитровград. В Нурлатском районе находится пойма, где расположено Черное озеро.Объекты перечислены по порядку от устья к истоку.В конце XVII века началось освоение земель в верховьях Большого Черемшана, так как задолго до 1736 года действовал закон, запрещавший покупать и продавать башкирские земли. К примеру, первопоселенцы села Черемшанские Вершины (Клявлино) по словесному договору, как гласят предания, покупали и брали в аренду башкирские земли.Булгарская форма Черемшан (джеремсан) — луговая река (от «черем — джерем» — луг), cовременное чувашское название Çарамсан (диал.Çеремсен) - луговая  от çарам (çерем) - луг и аффикса -сан/-сен соответствует русскому аффиксу -ая. Татарское название Чирмешән. Аналогичное название реки Черемшан (левый приток Булы) с тем же значением имеется и на правом берегу Волги в Апастовском районе Республики Татарстан."
     },
                        {
        "name": "Большой Юган",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%AE%D0%B3%D0%B0%D0%BD",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%AE%D0%B3%D0%B0%D0%BD.JPG/250px-%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%AE%D0%B3%D0%B0%D0%BD.JPG",
        "length": "1063 км",
        "pool": "34 700 км²",
        "consumption": "177,67 м³/с (118 км)",
        "head": "Васюганские болота",
        "estuary": "Обь",
        "location": " Россия",
        "info": "Большо́й Юга́н — река в России, протекает по территории Сургутского и Нефтеюганского районов Ханты-Мансийского автономного округа, левый приток Оби, впадает в Юганскую Обь. Длина реки — 1063 км, площадь водосборного бассейна — 34 700 км². В 118 км от устья среднегодовой расход воды — 177,67 м³/с.Исток в болотах Васюганья (Васюганские болота), протекает по заболоченной территории Западно-Сибирской равнины. Много притоков, из которых наиболее крупным является правый Малый Юган. В бассейне около 8000 озёр, общая площадь которых составляет 545 км². Питание реки снеговое. Ледостав с октября по начало мая.Основные населённые пункты от устья к истоку: Юган, Малоюганский, Угут, Когончины, Каюковы, Таурова, Тайлаково, Ларломкины.Судоходен на 165 км от устья.(км от устья; указаны длины рек > 50 км)По данным государственного водного реестра России относится к Верхнеобскому бассейновому округу, водохозяйственный участок реки — Обь от города Нефтеюганск до впадения реки Иртыш, речной подбассейн реки — Обь ниже Ваха до впадения Иртыша. Речной бассейн реки — (Верхняя) Обь до впадения Иртыша."
     },
          {
        "name": "Большой Ямсовей",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%AF%D0%BC%D1%81%D0%BE%D0%B2%D0%B5%D0%B9",
        "image": "undefined",
        "length": "126 км",
        "pool": "1280 км²",
        "consumption": "undefined",
        "head": "слияние рек: Левый Ямсовей и Правый Ямсовей",
        "estuary": "Ямсовей",
        "location": " Россия",
        "info": "Большой Ямсовей — река в России, протекает по территории Пуровского района Ямало-Ненецком автономном округе. Устье реки находится в 93 км по правому берегу реки Ямсовей. Длина реки — 126 км, площадь водосборного бассейна — 1280 км².По данным государственного водного реестра России относится к Нижнеобскому бассейновому округу, водохозяйственный участок реки — Пур, речной подбассейн реки — подбассейн отсутствует. Речной бассейн реки — Пур.Код объекта в государственном водном реестре — 15040000112115300059828."
     },
      {
        "name": "Большой Ярудей",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9_%D0%AF%D1%80%D1%83%D0%B4%D0%B5%D0%B9",
        "image": "undefined",
        "length": "190 км",
        "pool": "2520 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Обская губа",
        "location": " Россия",
        "info": "Большой Ярудей — река в России, протекает по территории Надымского района Ямало-Ненецкого автономного округа. Длина реки составляет 190 км, водосборная площадь — 2520 км². В районе острова Таркасале впадает в Обскую губу Карского моря. Высота устья — 69 метров над уровнем моря.Экологические аспекты реки в 2010 году рассмотрены в статье Егорова. В экологическом плане на реку оказывает существенное влияние одно из крупнейших газовых месторождений Медвежье.По данным государственного водного реестра России относится к Нижнеобскому бассейновому округу, водохозяйственный участок реки — Надым. Речной бассейн реки — Надым.Код объекта в государственном водном реестре — 15030000112115300051177."
     },
       {
        "name": "Бонасила ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BD%D0%B0%D1%81%D0%B8%D0%BB%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "201 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Юкон",
        "location": " США",
        "info": "Бонасила — река на Аляске (США); приток реки Юкон. Длина реки — 201 км.Она берёт своё начало на холмах Нулато и течёт на юго-восток к Бонасила-Слау — протоке Юкона. Протока течёт около западной части острова Элкхорн, который находится в 43 километрах к северо-западу от Холи-Кросс, и далее вниз к Юкону."
     },
     {
        "name": "Боннет-Плум",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%BD%D0%BD%D0%B5%D1%82-%D0%9F%D0%BB%D1%83%D0%BC",
        "image": "undefined",
        "length": "350 км",
        "pool": "12 000 км²",
        "consumption": "53 м³/с",
        "head": " ",
        "estuary": "Пил",
        "location": " Канада",
        "info": "Боннет-Плум — река на северо-западе Канады в Юконе, приток реки Пил. Длина реки — 350 км.[источник не указан 962 дня] Средний расход воды — 53 м³/с.Берёт начало в горах Макензи близ границы между территорией Юкон и Северо-западными территориями, течёт первоначально на запад, потом на северо-запад, затем на север, впадает в реку Пил. В бассейне реки сходятся три горные системы: горы Маккензи, горы Селуин и хребет Ричардсон. Вместе с реками Уинд, Снейк и Харт река находится в самом труднодоступном регионе территории Юкон, где нет автодорог.В бассейне реки Боннет-Плум проживает индейский народ кучины, которые называют себя гвичинами. Гвичинское название реки Tsaih Tl’ak Njik, что в переводе означает «река чёрной охры». Река названа по имени индейского вождя Боннета Плума, который сотрудничал с компанией Гудзонова залива.Бассейн реки имеет сложную геологическую историю и характеризуется обширной складчатостью и геологическими разломами. В бассейне реки находится одно из самых богатых и обширных угольных месторождений в Юконе, кроме того здесь находятся месторождения железной руды, свинцово-цинковые, медные и урановые месторождения. В ледниковый период бассейн реки был полностью покрыт гигантским Лаврентийским ледовым щитом, следы оледенения, в том числе морены и горные ледники, встречаются достаточно часто."
     },
     {
        "name": "Боралдай (приток Арыса)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D1%80%D0%B0%D0%BB%D0%B4%D0%B0%D0%B9_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%90%D1%80%D1%8B%D1%81%D0%B0)",
        "image": "undefined",
        "length": "130 км",
        "pool": "1760 км²",
        "consumption": "10,5 м³/с (с. Боралдай)",
        "head": " ",
        "estuary": "Арыс",
        "location": " Казахстан",
        "info": "Боралдай — река в Казахстане, протекает по территории Туркестанской области. Правый приток Арыса.Река Боралдай берёт начало на склонах хребта Боралдайтау неподалёку от села Кольтоган (Алексеевка) Жамбылской области. Течёт на запад. Впадает в Арыс около села Чубар Туркестанской области. Длина реки составляет 130 км, площадь водосборного бассейна — 1760 км².В горной долине реки произрастают дикие плодовые деревья (яблони, боярышник, дикие ягоды и т. д.). В низовьях ширина долины реки составляет от 1 до 4 км. Питание снеговое, дождевое и грунтовыми водами. Среднемноголетний расход воды у села Боралдай составляет 10,5 м³/с. Минерализация 0,2-0,4 г/л. Местные жители используют воду реки для питья и сельскохозяйственных нужд. Воды реки используют более 10 оросительных каналов. В Боралдайском ущелье найдена железная руда. На берегу реки находятся Боралдайские петроглифы.Основной правый приток — река Кошкарата."
     },
       {
        "name": "Боржава ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D1%80%D0%B6%D0%B0%D0%B2%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Dolha_all.jpg/250px-Dolha_all.jpg",
        "length": "106 км",
        "pool": "1365 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Тиса",
        "location": " Украина",
        "info": "Боржа́ва (укр. Боржа́ва) — река в Закарпатской области Украины, правый приток Тисы (бассейн Дуная). Длина 106 км, площадь бассейна 1365 км².Берёт начало в Восточных Карпатах, в горном массиве Полонина Боржава, около горы Стой (1679 м). В верховьях имеет горный характер, ниже — равнинный.Основные притоки — Кушница, Бронька, Быстрая, Берберке, Иршава, Потик."
     },
          {
        "name": "Борзя ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D1%80%D0%B7%D1%8F_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "304 км",
        "pool": "7080 км²",
        "consumption": "2,8 м³/с",
        "head": " ",
        "estuary": "Онон",
        "location": " Россия",
        "info": "Бо́рзя — река в Забайкальском крае, правый приток Онона (бассейн Амура).По одной из версий, название реки происходит от бурятских слов и выражений: бур. бооржатай, бур. бооржа – “соленое озеро”. По иной версии — от эвенкийских слов и выражений: борса-ми – “убить медведя”, боро – “серый, сумеречный”, бори – “горка, холм; заброшенный”, борза – “снежная, белая”, борая – “серая гора”.Длина реки составляет 304 км, площадь бассейна — 7080 км². Средний годовой расход — 2,8 м³/сек.Истоки на склонах хребта Кукульбей (Заключная Борзя и Заречная Борзя, образуется их слиянием в селе Онон-Борзя). Протекает в широкой заболоченной долине по степной территории. Питание дождевое, летом паводки, иногда пересыхает. Перемерзает с ноября по апрель.На левом берегу в среднем течении реки расположен город Борзя.Объекты перечислены по порядку от устья к истоку."
     },
            {
        "name": "Бормида ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D1%80%D0%BC%D0%B8%D0%B4%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Millesimo-IMG_0882.JPG/250px-Millesimo-IMG_0882.JPG",
        "length": "154 км",
        "pool": "3000 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Танаро",
        "location": " Италия",
        "info": "Бормида (итал. Bormida) — река на северо-западе Италии, которая берёт начало в горах Лигурии, затем протекает по землям административного района Пьемонт, после чего впадает в реку Танаро.Протяжённость реки составляет 154 километра, площадь бассейна около 3000 км².[источник не указан 563 дня]В 1800 году близ реки Бормида состоялось финальное сражение второй Итальянской кампании Наполеона Бонапарта, между Австрией и Францией и по итогам которого, австрийская армия в вынуждена была капитулировать и покинуть Италию.На берегах реки расположена коммуна Миллезимо."
     },
     {
        "name": "Боро-Тала ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D1%80%D0%BE-%D0%A2%D0%B0%D0%BB%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "250 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "слияние рек: Демекпе и Коксу",
        "estuary": "Эби-Нур",
        "location": " Китай",
        "info": "Боро-Тала — река, протекающая в западной Джунгарии, на территории Боро-Тала-Монгольского авт. округа Синьцзян-Уйгурского автономного района, КНР. Максимальная протяжённость русла достигает 250 км, хотя во время осенне-зимней межени временами пересыхает в низовьях.Как и многие другие реки центральноазиатского региона, воды Боро-Тала относятся к областям внутреннего стока: в половодье Боро-Тала впадает в солёное озеро Эби-Нур.Питание реки смешанное: преимущественно ледниковое, но также снеговое, дождевое и подземное. При этом весеннее половодье сильно растянуто благодаря частым грозовым паводкам.Исток реки находится в ледниках у самой границы с Казахстаном. Образуется от слияния Демекпе и Коксу на высоте 2567 м нум. Далее течёт в восточном и юго-восточном направлениях. Долина реки пролегает между хребтом Джунгарский Алатау на севере и различными отрогами хребта Борохоро на юге. Русло реки очень извилисто, ширина его в нижнем течении достигает 100—150 м. В нижнем течении воды реки используется для орошения, водоснабжения населения и прочих хозяйственных нужд."
     },
                                  {
        "name": "Боровка (приток Самары)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D1%80%D0%BE%D0%B2%D0%BA%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D1%8B)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Buzuluksky_Bor_national_park.jpg/250px-Buzuluksky_Bor_national_park.jpg",
        "length": "167 км",
        "pool": "2140 км²",
        "consumption": "5,54 м³/с (п. Паника)",
        "head": " ",
        "estuary": "Самара",
        "location": " Россия",
        "info": "Бо́ровка — река в Оренбургской области, правый приток реки Самары.Длина — 167 км, площадь водосборного бассейна — 2140 км². Истоки на возвышенности Общий Сырт, питание снеговое. Сток реки зарегулирован Боровским (Чекалинским) водохранилищем. По данным наблюдений с 1934 по 1985 год среднегодовой расход воды в районе посёлка Паника составляет 5,54 м³/с.В низовьях Боровка протекает по Бузулукскому бору — одному из старейших лесоводческих хозяйств степной зоны России. На реке расположен посёлок городского типа Колтубановский.Топоним Боровка указывает на то, что эта река является боровой, протекающей посредине заповедного Бузулукского бора. В XVIII веке река была известна под названием Сыртмыш.(расстояние от устья)В государственном водном реестре России значится как «Вдхр Р. Борасовка» и относится к Нижневолжскому бассейновому округу, водохозяйственный участок реки — Самара от водомерного поста у села Елшанка до города Самара (выше города), без реки Большой Кинель. Речной бассейн реки — Волга от верховий Куйбышевского вдхр. до впадения в Каспий.Код объекта в государственном водном реестре — 11010001112112100007408."
     },
                            {
        "name": "Борулах (приток Адычи)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D1%80%D1%83%D0%BB%D0%B0%D1%85_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%90%D0%B4%D1%8B%D1%87%D0%B8)",
        "image": "undefined",
        "length": "316 км",
        "pool": "9470 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Адыча",
        "location": " Россия",
        "info": "Борулах (якут. Боруулаах) — река в Якутии (Россия), левый приток Адычи (бассейн Яны). Длина — 316 км, площадь водосборного бассейна — 9470 км². Протекает по Янскому плоскогорью. Наиболее крупные притоки: Халтысы и Хатынгнах. Питание главным образом снеговое. Несудоходна."
     },
        {
        "name": "Босна ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D1%81%D0%BD%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/VreloBosne2.PNG/250px-VreloBosne2.PNG",
        "length": "308 км",
        "pool": "10 500 км²",
        "consumption": "142 м³/с",
        "head": " ",
        "estuary": "Сава",
        "location": " Босния и Герцеговина",
        "info": "Бо́сна (босн. Bosna) — река в Боснии и Герцеговине. Правый приток Савы, принадлежащей бассейну Дуная.Длина — 308 км, площадь бассейна — 10,5 тыс. км². Средний расход воды — 142 м³/с.Протекает по Динарскому нагорью и Среднедунайской низменности.Основными притоками Босны являются реки: Железница, Миляцка, Фойничка, Лашва, Кривая, Усора и Спреча."
     },
      {
        "name": "Босут",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D1%81%D1%83%D1%82",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Bosut_-_Rokovci-Andrijasevci_4.jpg/250px-Bosut_-_Rokovci-Andrijasevci_4.jpg",
        "length": "186 км",
        "pool": "3097 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Сава",
        "location": " Хорватия,  Сербия",
        "info": "Босут (сербохорв. Босут, Bosut) — река в восточной Хорватии и западной Сербии.Длина — 186 км, площадь бассейна — 3097 км².Река образуется в центральной Славонии из горы Диль, севернее города Славонски-Брод. Далее протекает по Срему и Воеводине. Впадает в реку Сава, близ одноимённого села Босут."
     },
        {
        "name": "Ботети ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D1%82%D0%B5%D1%82%D0%B8_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Boteti_River%2C_Botswana.jpg/250px-Boteti_River%2C_Botswana.jpg",
        "length": "1700 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": " ",
        "location": " Ботсвана",
        "info": "Ботети (Ботлетле) — река на территории Ботсваны.Является одной из крупнейших (протяжённость составляет 1700 км) рек Ботсваны. Вытекает из реки Тамалакане в городе Тотенг. Затем протекает в северо-западном направлении, образуя водопад Гауца, течёт на восток через Макаламабеди и поворачивает на юг в сторону Ракопс, а потом протекает через озеро Ксау, и через Мопипи. Река черпает воду из Дельты Окаванго.С начала XX века река Ботети используется местным населением для орошения полей. Также воды реки используются на дамбе Мопипи."
     },
     {
        "name": "Ботна",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D1%82%D0%BD%D0%B0",
        "image": "undefined",
        "length": "152 км",
        "pool": "1540 км²",
        "consumption": "0,44 м³/с (г. Кэушень)",
        "head": " ",
        "estuary": "Днестр",
        "location": " Молдавия",
        "info": "Ботна (укр. Ботна, молд. Botna) — река в Молдавии (частично на заявленной территории Приднестровья), правый приток Днестра.Впадает в Днестр на участке между сёлами Меренешты и Кицканы.Расход воды колеблется от 0,07 до 0,47 м³/сек, скорость реки от 0,08 до 0,32 м/с; абсолютный максимум 18,8 м³/с (17.09.1957 г.), абсолютный минимум — 0,00 м³/с (1950-54, 1956-63, 1965 г.).Ширина реки изменяется в пределах от 2 до 9 метров, глубина — 0,15-0,66 метра.Объем годового стока — 33.6 млн м³Среднегодовой сток — 1,07 м³/сОдна из внутренних рек Молдовы, четвёртая по величине после Реута, Когильника и Быка. Длина Ботны составляет 152 км. Свое начало она берет в Страшенском районе, в кодрах между селом Стежарень и Хородка.Ботна протекает по территории трех районов республики — Страшенского, Яловенского и Каушанского. Ботна является правым притоком Днестра, и её устье расположено между селами Кицкань и Меренешть Каушанского района.В верховьях река извилистая, на берегах встречается лес; в низовьях протекает по степи.Воды реки неоднородны по своему химическому составу. В зависимости от типа питания водотока, на участке реки между истоком и селом Резены воды относятся к гидрокарбонатному классу: группы кальция, кальция-магния, магния или магния-натрия. По эквивалентному соотношению основных ионов воды реки относятся к первому или второму типу. Средняя минерализация воды 760 мг/дм³, временами достигает значения 1000 мг/дм³."
     },
     {
        "name": "Ботчи",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D1%82%D1%87%D0%B8",
        "image": "https://upload.wikimedia.org/wikipedia/ru/thumb/9/92/Botchi_river.jpg/250px-Botchi_river.jpg",
        "length": "106 км",
        "pool": "2810 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Татарский пролив",
        "location": " Россия",
        "info": "Ботчи  — река в Хабаровском крае России.Одна из крупнейших рек на территории Советско-Гаванского района. Берёт своё начало в горах Сихотэ-Алиня между вершинами Моховая и Конская Голова, прорезает район с запада на юго-восток. Впадает в Татарский пролив. Река горная, с каменистым дном, извилистым руслом. Длина реки — 106 км, площадь водосборного бассейна — 2810 км².В верховьях берега реки поросли елово-лиственничным лесом. В среднем течении, ниже устья Елизаровской, она разделяется на множество проток, ель меняется на пихту.В бассейне реки расположен Ботчинский заповедник. В устье реки расположено село Гроссевичи.Объекты перечислены по порядку от устья к истоку.По данным государственного водного реестра России относится к Амурскому бассейновому округу, водохозяйственный участок реки — Реки пролива Невельского и бассейна Японского моря от мыса Лазарева до северной границы бассейна р. Самарга. Речной бассейн реки — Бассейны рек Японского моря.Код объекта в государственном водном реестре — 20040000112118200004220."
     },
     {
        "name": "Боу ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D1%83_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Bow-river-banff-np.jpg/250px-Bow-river-banff-np.jpg",
        "length": "587 км",
        "pool": "26 200 км²",
        "consumption": "129 м³/с",
        "head": " ",
        "estuary": "Саут-Саскачеван",
        "location": " Канада",
        "info": "Боу (англ. Bow River) — река в юго-западной части Канады, в провинции Альберта. При слиянии с рекой Олдмен образует реку Саут-Саскачеван.Берёт своё начало из ледника Боу, который является частью более крупного ледникового поля Вапта, на юго-западе канадской провинции Альберта, на высоте приблизительно 1960 м над уровнем моря. Течёт на юг вплоть до деревни Лейк-Луис, а затем поворачивает на восток и протекает через города Банф и Канмор. Выше городка Кокрен на реке расположено водохранилище Гост-Лейк, длина которого составляет 13,5 км. Ниже водохранилища Боу продолжает течь в восточном направлении, протекая через крупнейший город провинции, Калгари. Ниже Калгари река течёт в восточном и юго-восточном направлениях вплоть до слияния с рекой Олдмен близ деревни Грасси-Лейк в южной Альберте. Длина реки составляет 587 км; площадь бассейна — 26 200 км².Люди появились на берегах реки примерно 11 тысяч лет назад, они занимались охотой на мамонтов и гигантских бизонов. Первым европейцем, посетившим район реки в начале XIX века, был известный исследователь Дэвид Томпсон. В сентябре 1875 года при слиянии рек Боу и Элбоу был основан Форт-Калгари, превратившийся к настоящему времени в крупнейший город провинции. Река Боу является важным источником для обеспечения населения региона чистой питьевой водой; вода реки также активно используется для орошения. С 10-х по 60-е годы XX века на реке был построен ряд гидротехнических сооружений."
     },
                {
        "name": "Брагинка",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%80%D0%B0%D0%B3%D0%B8%D0%BD%D0%BA%D0%B0",
        "image": "undefined",
        "length": "179 км",
        "pool": "2778 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Припять",
        "location": " Белоруссия,  Украина",
        "info": "Бра́гинка (белор. Брагінка, укр. Брагінка) — река в Белоруссии и на Украине, протекает по территории Гомельской и Киевской областей. Длина реки — 179 км, площадь водосборного бассейна — 2778 км².Берёт своё начало возле деревни Прокисель Речицкого района, впадает в реку Припять недалеко от впадения последней в Днепр.Частично находится на территории зоны отчуждения Чернобыльской АЭС, в связи с чем осуществляется радиационный контроль реки.На реке происходят события рассказа Константина Паустовского «Корчма на Брагинке» (1946).В конце XIX — начале XX века на страницах «Энциклопедического словаря Брокгауза и Ефрона» говорилось, что река Брагинка «изобилует рыбою»."
     },
     {
        "name": "Брадано",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%80%D0%B0%D0%B4%D0%B0%D0%BD%D0%BE",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Bradano.jpg/250px-Bradano.jpg",
        "length": "120 км",
        "pool": "2765 км²",
        "consumption": "7 м³/с (устье)",
        "head": " ",
        "estuary": "Ионическое море",
        "location": " Италия",
        "info": "Брада́но (итал. Bradano) — река в Италии. Течёт по территории четырёх провинций Южной Италии: Потенца, Матера, Бари и Таранто. Впадает в Ионическое море.Длина реки составляет 120 км. Площадь водосборного бассейна равняется 2765 км². Среднегодовой расход воды в устье — 7 м³/с.Исток реки находится возле Кастель-Лагопезоле на территории коммуны Авильяно. Преобладающим направлением течения Брадано является юго-восток. Впадает в залив Таранто возле Метапонто на территории коммуны Бернальда."
     },
     {
        "name": "Бразо",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%80%D0%B0%D0%B7%D0%BE",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/BrazeauRiver1.JPG/250px-BrazeauRiver1.JPG",
        "length": "210 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "Бразо",
        "estuary": "Норт-Саскачеван",
        "location": " Канада",
        "info": "Бразо (англ. Brazeau River) — река в Канаде (Альберта), приток реки Норт-Саскачеван. Длина реки составляет 210 км.Берёт начало из озера Бразо на высоте приблизительно 2240 метров. Протекает в восточном направлении. Высота устья — 820 м над уровнем моря.[источник не указан 2096 дней]В нижнем течении реки построена крупнейшая в провинции Альберта ГЭС мощностью 355 МВт и годовым объёмом производства электроэнергии около 394 000 МВт. Необычной особенностью этого гидроэнергетического проекта, введенного в эксплуатацию в 1965 году, является насосная система, способная поднимать воду из резервуара в 20-километровый (12 миль) длинный канал, ведущий к электростанции, чтобы он мог работать на низких уровнях воды в резервуаре.Река была названа в честь лингвиста Джозефа Бразо."
     },
     {
        "name": "Бразос",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%80%D0%B0%D0%B7%D0%BE%D1%81",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Brazos_River_railroad_bridge_Waco_TX.jpg/250px-Brazos_River_railroad_bridge_Waco_TX.jpg",
        "length": "1352 км",
        "pool": "116 000 км²",
        "consumption": "undefined",
        "head": "слияние рек: Солт-Форк-Бразорс и Дабл-Маунтин-Форк",
        "estuary": "Мексиканский залив",
        "location": " США",
        "info": "Бра́зос (англ. Brazos; стар. Рио-де-Лос-Бразос-де-Диос) — одиннадцатая по длине река в США. Длина — 1352 км (с верховьем Нью-Мексико — 2060 км). Впадает в Мексиканском заливе.Берёт начало от слияния Солт-Форк-Бразорс и Дабл-Маунтин-Форк. Основными притоками Бразоса являются реки Боскью, Литл-Ривер и Навасота.На реке построены три плотины которые образуют озера: Поссум-Кингдом, Гранбери и Уитни. Последняя плотина (Гранбери) была построена в 1969 году.Во времена Гражданской войны река была важной транспортной магистралью для передвижения войск и грузов, в настоящее время река используется больше как источник воды для городов и ирригации.Название реки часто фигурирует в тюремных песнях, так как на её берегах находится множество тюрем.Города на Бразосе: Уэйко, Брайан, Ричмонд; в устье — порт Фрипорт."
     },
            {
        "name": "Брахмапутра",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%80%D0%B0%D1%85%D0%BC%D0%B0%D0%BF%D1%83%D1%82%D1%80%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Brahmaputra-verlaufsgebiet.jpg/250px-Brahmaputra-verlaufsgebiet.jpg",
        "length": "2896 км",
        "pool": "651 334 км²",
        "consumption": "19 500 м³/с",
        "head": " ",
        "estuary": "Бенгальский залив",
        "location": " Китай,  Индия, Бангладеш",
        "info": "Брахмапу́тра (кит. 雅鲁藏布江, тиб. ཡར་ཀླུང་གཙང་པོ།, хинди ब्रह्मपुत्र, ассам. ব্ৰহ্মপুত্ৰ, англ. Brahmaputra, бенг. ব্রহ্মপুত্র) — река в Китае, Индии и Бангладеш, левый и крупнейший приток Ганга; одна из крупнейших водных артерий в Южной Азии.На отдельных участках называется по-разному: в Тибете — Маца́нг и Цангпо́, в месте прорыва через Гималаи — Сианг и Диха́нг, в Индии — Брахмапутра, в Бангладеш — Джамуна.Индийское название реки в переводе с санскрита на русский означает «Сын Брахмы».Длина — 2896 км, в различных источниках даются разные площади бассейна от 530 тыс. до 935 тыс. км², наиболее часто используемое значение — 651 тыс. км². Бассейн реки располагается на территории четырёх стран — КНР (50,5 %), Индии (33,6 %), Бангладеш (8,1 %) и Бутана (7,8 %). С географической точки зрения бассейн подразделяется на часть, приходящуюся на Тибетское нагорье (44,4 %) с абсолютными высотами от 3500 м, на часть, относящуюся к Гималайскому хребту (28,6 %) с высотами 100-3500 м над уровнем моря, оставшиеся 27 % приходятся на нижнюю часть бассейна с муссонным климатом и годовым количеством осадков, в среднем равным 2354 мм.Истоками Брахмапутры являются Джангци и Чема-Юндунг, стекающие с северного склона Гималаев и южного склона хребта Кайлас, соединяющиеся в одно русло на высоте в 4872 м. Отсюда Брахмапутра на протяжении более 1100 км течёт параллельно Гималаям по дну продольного грабена широтного направления, принимает много притоков, питающихся за счёт муссонных дождей и таяния льдов в горах. Уклон оси продольного грабена сравнительно невелик, поэтому Брахмапутра большей частью течёт здесь спокойно и доступна для местного судоходства. Ниже места впадения реки Джамды, в районе приблизительно 95° в. д., Брахмапутра прорывается через отроги хребта Тангла и Гималаи в глубочайших ущельях, имеет бурное течение, образует многочисленные пороги и местами низвергается каскадами быстрин и водопадов, самыми высокими из которых являются Rainbow Falls (21 метр, 29°46′38″ с. ш. 95°11′00″ в. д.HGЯO) и Hidden Falls (30 метров, 29°46′34″ с. ш. 95°10′55″ в. д.HGЯO)."
     },
     {
        "name": "Брда",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%80%D0%B4%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Bydgoszcz_BRE_spichrze.jpg/250px-Bydgoszcz_BRE_spichrze.jpg",
        "length": "217 км",
        "pool": "4700 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Висла",
        "location": " Польша",
        "info": "Брда (польск. Brda) — река на северо-западе Польши, левый приток Вислы.Берёт начало в озере Смолове к востоку от города Мястко. Течёт в юго-восточном направлении, протекает через множество озёр. Впадает в Вислу в городе Быдгощ. В 10 км от устья соединена с Быдгощским каналом, через который сообщается с рекой Нотець (бассейн Одры).Длина реки составляет 217 км, площадь водосборного бассейна — около 4700 км². Средний расход воды — 31 м³/сек. Высота истока составляет 181 м, высота устья — 28,8 м.Река Брда судоходна на протяжении 15 км от устья. На реке имеется ГЭС.Крупнейшие притоки — реки Каменка и Сенпольно."
     },
     {
        "name": "Брегалница",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%80%D0%B5%D0%B3%D0%B0%D0%BB%D0%BD%D0%B8%D1%86%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Kalimanci.jpg/250px-Kalimanci.jpg",
        "length": "225 км",
        "pool": "742,5 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Вардар",
        "location": " Северная Македония",
        "info": "Брега́лница (макед. Брега́лница) — река в Северной Македонии. Длина — 225 км. Площадь бассейна — 742,5 км². Впадает в Вардар.Главные притоки справа — реки Злетовская, Кочанская и Оризарская, слева — Осойница и Зрновская.Согласно преданию, Кирилл на реке Брегалнице крестил славян."
     },
              {
        "name": "Брента",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%80%D0%B5%D0%BD%D1%82%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Bassanodelgrappa_flickr02.jpg/250px-Bassanodelgrappa_flickr02.jpg",
        "length": "174 км",
        "pool": "1600 км²",
        "consumption": "78 м³/с",
        "head": " ",
        "estuary": "Адриатическое море",
        "location": " Италия",
        "info": "Бре́нта (итал. Brenta) — река в Италии, течение которой начинается в провинции Тренто и заканчивается в Адриатическом море. В области Трентино-Альто-Адидже река порождает одноимённую долину. Брента впадает в Венецианский залив, расположенный в области Венеция. Длина — 174 км. Площадь бассейна — 1600 км². Средний расход воды — 78 м³/с. Высота истока — 450 м над уровнем моря.Во времена Древнего Рима реку называли Медоакус (лат. Medoacus), и неподалёку от Падуи она разделялась на два рукава, Медоакус Майор и Медоакус Минор. В Средние века река изменила своё течение, и её русло, проходящее через Падую, было занято рекой Баккильоне.В XVI веке от реки был проведён первый канал, который шёл от деревни Стра до Адриатического моря в обход Венецианского залива. Второй канал, его часто называют Ривьера-дель-Брента (итал. Riviera del Brenta), был проложен для того, чтобы соединить Венецию и Падую (которая была по сути второй столицей Венецианской Республики).Брента была очень важной транспортной артерией. На берегах как самой реки, так и Ривьера дель Брента стоят вилла Фоскари, вилла Пизани и множество иных дворцов и особняков, куда удалялись на летние месяцы состоятельные жители Венеции."
     },
             {
        "name": "Бриде",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%80%D0%B8%D0%B4%D0%B5",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/PA020092_Breede_River_vor_Langeberg_Mountains.JPG/250px-PA020092_Breede_River_vor_Langeberg_Mountains.JPG",
        "length": "337 км",
        "pool": "12 384 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Индийский океан",
        "location": " Южно-Африканская Республика",
        "info": "Бриде (африк. Breërivier) — река в Южной Африке.Река протекает в Западной Капской провинции ЮАР. Её длина составляет 337 километров, площадь бассейна — около 12 384 км². Впадает в Индийский океан. В устье расположен порт Бофорта. По устью реки проходят административные границы районов Эден и Оверберг.Имеет ряд притоков. Воды реки используются для орошения, на ней сооружён ряд плотин. Используют для туристических прогулок, в ней отсутствуют бегемоты, и крокодилы. Долина реки Бриде — один из четырёх главных винодельческих районов страны."
     },
     {
        "name": "Брисбен ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%80%D0%B8%D1%81%D0%B1%D0%B5%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Brisbane_River1.jpg/250px-Brisbane_River1.jpg",
        "length": "344 км",
        "pool": "13 600 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Коралловое море",
        "location": " Австралия",
        "info": "Брисбен (англ. Brisbane River) — река в Квинсленде (Австралия).Длина реки — 344 км, площадь бассейна около 13,6 тыс. км². Истоки расположены на территории национального парка Конондэйл, в 50 км к востоку от города Нананго. Далее до Брисбена река протекает в южном направлении, в нижнем течении русло извилистое. Устье реки — залив Моретон, в восточном Брисбене.В месте впадения реки в залив находятся мангровые заросли. Брисбен богат рыбой, это один из нескольких ареалов рогозуба, эндемика Квинсленда.В низовьях реки часто происходят наводнения, периодически — катастрофические. Последнее сильнейшее наводнение произошло в январе 2011 года.Через реку построено 16 крупных мостов и один туннель под водой. Большинство мостов расположены в Брисбене."
     },
                                          {
        "name": "Брянка ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%80%D1%8F%D0%BD%D0%BA%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Bryanka_river.jpg/250px-Bryanka_river.jpg",
        "length": "128 км",
        "pool": "4470 км²",
        "consumption": "3,73 м³/с (12 км от устья)",
        "head": " ",
        "estuary": "Уда",
        "location": " Россия",
        "info": "Бря́нка (в верховье Шабар; бур. Бүреэн, Буряан) — река в Заиграевском районе Бурятии, левый приток Уды. Длина — 128 км, площадь водосборного бассейна — 4470 км². Среднегодовой расход воды в 12 км от устья — 3,73 м³/с.Берёт начало в центральной части хребта Цаган-Дабан. В верховьях течёт в северо-западном направлении в горно-лесной местности и носит название Шабар (бур. Шабар — грязь). Ниже села Шабур, после впадения ручья Бойцы́, принимает название Брянка (бур. Бүреэн). У села Старая Брянь, приняв левый приток Кокытей, поворачивает под прямым углом на северо-восток, где долина реки немного расширяется. Ниже села Новая Брянь принимает справа приток Челутай и поворачивает на север. Немногим ниже перед пгт Заиграево справа в Брянку впадает её основной приток — Илька. Впадает с юга в Уду между пгт Онохой и селом Усть-Брянь.Западнее села Усть-Брянь русло Брянки делится надвое. Правое русло, именуемое собственно Брянкой, пересохло и весь поток воды идёт по левому руслу, именуемому Шарлаунка. Шарлаунка, возможно, неправильная интерпретация названия местности бур. Шара уhан — Жёлтая вода.В долине реки Брянка обнаружены поселения эпохи верхнего палеолита: Каменка-A (45—28 тыс. лет назад) и Варварина Гора (34,9 тыс. лет назад). Комплекс А на поселении Каменка-A датируется радиоуглеродным методом периодом между 49 и 41 тыс. лет до настоящего времени, возможно, временем одного из умеренных событий, которое следует за холодным событием Хайнриха 5, и относится к исходному (IUP) или раннему (EUP) этапу верхнего палеолита. На поселениях толбагинской культуры Варварина Гора и Каменка применялись пластинчатые (ламинарные) технологии изготовления орудий."
     },
     {
        "name": "Брянта",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%80%D1%8F%D0%BD%D1%82%D0%B0",
        "image": "undefined",
        "length": "317 км",
        "pool": "14 100 км²",
        "consumption": "undefined",
        "head": "слияние рек: Большая Брянта и Малая Брянта",
        "estuary": "Зея",
        "location": " Россия",
        "info": "Брянта — река в Амурской области, правый приток Зеи. Сейчас впадает в Зейское водохранилище.Длина реки — 317 км, площадь водосборного бассейна — 14 100 км². Берёт своё начало на южных склонах Станового хребта, течёт на юг по Верхнезейской равнине. Летом возможны значительные дождевые паводки. Питание преимущественно дождевое.[источник не указан 603 дня]Населённых пунктов на реке нет. Посёлок Дипкун стоит на правом притоке Брянты, примерно в 30 км до реки.Название с эвенкийского «брянтэ» — река с многими истоками; другой вариант название от древнерусского «дебря» — места, заросшие непроходимым, густым лесом.(км от устья)По данным государственного водного реестра России относится к Амурскому бассейновому округу, речной бассейн реки Амур, речной подбассейн реки — Зея, водохозяйственный участок реки — Зея от истока до Зейского гидроузла.Код объекта в государственном водном реестре — 20030400112118100026316."
     },
     {
        "name": "Бу-Регрег",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%83-%D0%A0%D0%B5%D0%B3%D1%80%D0%B5%D0%B3",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/BouRegreg.jpg/250px-BouRegreg.jpg",
        "length": "240 км",
        "pool": "undefined",
        "consumption": "23 м³/с",
        "head": "слияние рек: Уэд-Афсай и Уэд-Геннур",
        "estuary": "Атлантический океан",
        "location": " Марокко",
        "info": "Бу-Регрег (Уэд-бу-Регрег; араб. أبو رقراق‎) — река на западе Марокко, которая впадает в Атлантический океан в районе столичной агломерации — между городами Рабат и Сале. Приливной эстуарий реки, простирающийся вверх по реке на 24 км от побережья, именуется Вади-Сала (Wadi Sala).Длина реки составляет 240 км, средний сток 23 м³/с, пиковый в период высокой воды — 1500 м³/с. Исток реки расположен в горах Среднего Атласа при слиянии Уэд-Афсая и Уэд-Геннура. Качество воды страдает от приливных вторжений солёной воды, чрезмерного стока нитратов с сельскохозяйственный угодий и загрязнения ртутью от использования пестицидов в бассейне реки.Финикийцы и карфагеняне, основавшие несколько колоний в Марокко, на берегах Бу-Регрега построили древний город Шелла в двух километрах от устья вверх по реке. Рядом с этим местом расположены руины римского города Сала. Шелла был важным портовым городом, имевшим главную улицу Декуманус Максимус, форум, фонтан и другие строения.Существует легенда об образовавшейся в середине XVII века на берегах Бу-Регрега настоящей пиратской республике, наводившей страх на проплывавшие мимо суда европейских держав. Однако, в настоящее время доказано, что никакой республики не было — а была лишь литературная мистификация."
     },
      {
        "name": "Бубр",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%83%D0%B1%D1%80",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Janowice_Wielkie%2C_Bobr_1.jpg/250px-Janowice_Wielkie%2C_Bobr_1.jpg",
        "length": "272 км",
        "pool": "5876 км²",
        "consumption": "44,3 м³/с",
        "head": " ",
        "estuary": "Одра",
        "location": "undefined",
        "info": "Бу́бр (Бо́брава; устар. Бобер; польск. Bóbr, чеш. Bobr) — река в Чехии и юго-западе Польши, левый приток Одры. Бубр входит в десятку самых длинных рек Польши. Средний расход воды — 44,3 м³/с.Бубр берёт своё начало на юго-востоке горного массива Крконоше (Судеты), возле деревни Бубр, которая расположена недалеко от города Жацлэрш (чеш. Žacléř) в Трутнове Краловеградецкого края. После пересечения границы с Польшей, у деревни Недамирув (польск. Niedamirów, нем. Kunzendorf)) в гмине Любавка, Бубр течёт в северо-западном направлении через долину Еленя Гуру (польск. Kotlina Jeleniogórska, нем. Hirschberger Tal) в Западных Судетах (чеш. Krkonošská oblast, польск. Sudety Zachodnie, нем. Westsudeten) до плотины в Пильховице (гмина Влень) и на равнины Нижней Силезии, где в Бубр впадает река Квиса (польск. Kwisa, нем. Queis). В Одр Бубр впадает недалеко от Кросно-Оджаньске.Длина Бубра около 272 километров, причем два из них она протекает по территории Чехии, а 270 — Польши. Площадь бассейна — 5876 км² (46 из них приходится на часть, расположенную в Чехии, а 5830 на часть, расположенную в Польше).Во время Второй мировой войны на Бубре, в городе Пстронже (польское название Свентошув, позднее — Страхув) располагался центр разработки и испытания противотанкового оружия Германии. В послевоенной время там дислоцировался 255-й гвардейский мотострелковый полк 20-й танковой дивизии."
     },
                       {
        "name": "Бугунь",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%83%D0%B3%D1%83%D0%BD%D1%8C",
        "image": "undefined",
        "length": "164 км",
        "pool": "4680 км²",
        "consumption": "undefined",
        "head": "слияние рек: Каттыбугунь и Балабугунь",
        "estuary": "Кумколь",
        "location": " Казахстан",
        "info": "Бугунь (каз. Бөген) — река в Казахстане, протекает по территории Байдибекского и Отырарского районов Туркестанской области. Относится к бассейну Сырдарьи.Длина реки составляет 164 км, площадь бассейна — 4680 км². Образуется слиянием рек Каттыбугунь (Улькен-Бугунь) и Балабугунь, стекающих с юго-западных склонов хребта Каратау. Пойма шириной 300—600 м. Питание снеговое и грунтовое. Среднегодовой расход воды у поста Красный мост составляет 4,36 м³/с. Ранее впадала в бессточное озеро Кумколь. В 1967 году на реке было построено Бугуньское водохранилище (площадь 65 км²), соединяемое с бассейном Сырдарьи Туркестанским обводнительным каналом. Воды используются для орошения."
     },
     {
        "name": "Бузан",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%83%D0%B7%D0%B0%D0%BD",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/%D0%91%D1%83%D0%B7%D0%B0%D0%BD._-_panoramio.jpg/250px-%D0%91%D1%83%D0%B7%D0%B0%D0%BD._-_panoramio.jpg",
        "length": "102 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "Волга",
        "estuary": "Каспийское море",
        "location": " Россия",
        "info": "Буза́н — один из наибольших рукавов в дельте Волги в Астраханской области.Длина — 102 км. Отделяется от главного русла Волги в 46 км севернее Астрахани, напротив города Нариманов. Течёт на юго-восток. Соединившись с Ахтубою, течёт по болотистой низменности волжской дельты; впадает в Каспийское море, разделившись на 7 протоков: Лебяжий, Романово, Кара-Бузан, Верхнюю, Среднюю, Нижнюю Худяковки и Кагач.На берегах расположены населённые пункты Красный Яр, Марфино, Верхний Бузан, Забузан и другие."
     },
       {
        "name": "Бузи ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%83%D0%B7%D0%B8_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "250 км",
        "pool": "31 000 км²",
        "consumption": "79 м³/с",
        "head": " ",
        "estuary": "Мозамбикский пролив",
        "location": " Зимбабве,  Мозамбик",
        "info": "Бузи (порт. Rio Búzi) — река в Юго-Восточной Африке. Исток расположен на востоке Зимбабве и продолжается на восток в Мозамбике, через провинции Маника и Софала. Впадает в Мозамбикский пролив к западу от Бейра, образуя здесь эстуарий. Её длина составляет около 250-и километров, а отток в устье составляет 79 м³/с.Данная река, как и многие другие реки в юго-центральной части Африки, имеет высокие сезонные колебания: переполняется в сезон дождей и крайне маловодна в сухой сезон. Подъём воды вследствие дождей может достигать 7-и м.Является основным местонахождением нефтегазоносные отложений сенона-палеоцена — 0,4 млрд м³."
     },
     {
        "name": "Бузим",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%83%D0%B7%D0%B8%D0%BC",
        "image": "https://upload.wikimedia.org/wikipedia/ru/thumb/e/ed/Buzim.JPG/250px-Buzim.JPG",
        "length": "124 км",
        "pool": "2550 км²",
        "consumption": "3,43 м³/с (23 км от устья)",
        "head": "слияние рек: Бузим 1-я и Бузим 2-я",
        "estuary": "Енисей",
        "location": " Россия",
        "info": "Бузи́м (хак. Пузим) — река в Красноярском крае России, левый приток Енисея. Длина — 124 км, площадь водосборного бассейна — 2550 км². По данным наблюдений с 1965 по 1993 год среднегодовой расход воды в районе деревни Малиновки (23 км от устья) составляет 3,43 м³/с.Протекает по территории Емельяновского и Сухобузимского районов. Название происходит от аринского «Бу-Зим» — Мутная река.Начало берёт в Кемчугской тайге.По данным государственного водного реестра России и геоинформационной системы водохозяйственного районирования территории РФ, подготовленной Федеральным агентством водных ресурсов:(расстояние от устья)"
     },
     {
        "name": "Бузулук (приток Самары)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%83%D0%B7%D1%83%D0%BB%D1%83%D0%BA_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D1%8B)",
        "image": "undefined",
        "length": "248 км",
        "pool": "4460 км²",
        "consumption": "7,7 м³/с",
        "head": " ",
        "estuary": "Самара",
        "location": " Россия",
        "info": "Бузулу́к — река в России, протекает по западной части Оренбургской области. Левый приток реки Самары. Длина — 248 км, площадь бассейна — 4460 км². Среднегодовой расход воды — в устье — 7,7 м³/с.[источник не указан 1711 дней]Исток на северных склонах Общего Сырта. Протекает по распаханной степи. Русские и украинские сёла, также проживают казахи. При впадении в Самару расположен город Бузулук. В низовьях реки Бузулук находятся стоянки Лабазы I и Лабазы II, относящиеся к эпохе верхнего палеолита.Притоки: Грязнушка (лв), Каранайка (пр), Хомутовка (пр), Мулюковская (пр), Тальянка (пр), Ташелка (лв), Ялга (пр), Безымянка (лв), Берёзовый (пр), Сухая Ветлянка (лв), Мокрая Ветлянка (лв), Грязнушка (лв), Грачевка (лв), Бобровка (лв), Паник (пр), Тарпановка (пр).[источник не указан 1711 дней]Населённые пункты на реке: Бузулук, Лабазы, Скворцовка, Петровка, Курманаевка, Кандауровка, Кутуши, Михайловка, Краснояровка, Андреевка.[источник не указан 1711 дней]Слово образовано от тюркского *buzaw (башк. быҙау, тат. бозау, каз. бұзау, тур. buzağı ) — телёнок, *liq — аффикс принадлежности к чему либо Согласного иной версии слово образовано от тюркского *buz (башк. боҙ, тат. боҙ, каз. мұз, тур. buz, турк. buz) - лёд. "
     },
           {
        "name": "Була ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%83%D0%BB%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Bula_river_batyr.jpg/250px-Bula_river_batyr.jpg",
        "length": "118 км",
        "pool": "1580 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Свияга",
        "location": " Россия",
        "info": "Була́ (чуваш. Пăла, тат. Бола) — река в России, левый приток реки Свияги. Длина от истока до устья 118 (по другим данным — 127,7 км; в пределах Республики Татарстан — 32 км), площадь водосбора — 1580 км²Начинаясь близ посёлка Липовка Ибресинского района, протекает по Чувашии, впадает в Свиягу на территории Республики Татарстан. Местность в бассейне реки — равнинная, занята сельхозугодьями, пашней и степью; лес редок, присутствует лишь у истока реки. Половодье весеннее, четко выраженное. Большая часть стока (86 %) проходится на весну. Питание преимущественно снеговое (до 80 %), остальная часть — дождевое и грунтовое. Общая минерализация вод бассейна в период летней межени колеблется от 100 до 800 мг/л, в бассейне Малой Булы повышается до 990 мг/л.Из более трёх десятков больших и малых притоков главный — Малая Була́.Раньше была полноводной, на ней имелись водяные мельницы. Имеются свидетельства о сплаве леса: в 1898 году самарский купец Маштаков, договорившись с владельцами водяных мельниц, сплавил по Буле большую партию леса из Тархановского имения удельной конторы. Вдоль Булы в прошлом проходил торговый путь из Волжской Булгарии в Киев. Тигашевское городище, находящееся на окраине деревни Тигашево, являлось военно-опорным пунктом Волжской Булгарии, защищавший торговый путь от нападений степных кочевников."
     },
                      {
        "name": "Буллер ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%83%D0%BB%D0%BB%D0%B5%D1%80_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Buller_River_near_Berlins.jpg/250px-Buller_River_near_Berlins.jpg",
        "length": "159 км",
        "pool": "6480 км²",
        "consumption": "426 м³/с (Те Куха)",
        "head": "Ротоити",
        "estuary": "Тасманово море",
        "location": " Новая Зеландия",
        "info": "Буллер или Каватири (англ. Buller River, маори Kawatiri) — река, протекающая в северо-западной части Южного острова Новой Зеландии в регионах Тасман и Уэст-Кост. Впадает в Тасманово море.Длина реки составляет 159 км, площадь бассейна - 6480 км². Средний расход воды — 426 м³/с (Те Куха). Высота истока — 500 м над уровнем моря.[источник не указан 233 дня] Среднегодовая норма осадков у истока реки составляет около 1580 мм в год.Река Буллер занимает первое в Новой Зеландии место по моментальному зарегистрированному расходу воды, он составил 10400 м³/с. Минимальный расход воды - 88,4 м³/с - был зарегистрирован в 1972 году в Те Куха.Буллер вытекает из озера Ротоити, расположенное в новозеландских Южных Альпах. Протекает по ущелью Буллер. Основными притоками являются Маруйа (площадь бассейна 366 км²), Инангахуа (280 км²) и Матакитаки (245 км²).Река протекает через грубый гранит и гнейс, песчаник, аргиллит и известняк, а также речные и ледниковые отложения. Почвы в бассейне реки бедные, плохо пропускают воду.Своё название река получила в честь Чарльза Буллера — члена парламента и директора компании New Zealand Company, основанной в начале 1800-х годов Новой Зеландией и Великобританией. Компания получила королевскую грамоту Великобритании, дающую право на колонизацию Новой Зеландии и освоение островов."
     },
                 {
        "name": "Буолкалах",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%83%D0%BE%D0%BB%D0%BA%D0%B0%D0%BB%D0%B0%D1%85",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Olenyok.png/250px-Olenyok.png",
        "length": "305 км",
        "pool": "8780 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Оленёк",
        "location": " Россия",
        "info": "Буолкалах — река в Восточной Сибири, левый приток реки Оленек.Длина реки — 305 км. Площадь водосборного бассейна — 8780 км². Питание снеговое и дождевое. Берёт начало среди болот на юге Северо-Сибирской низменности. Протекает по северо-восточной окраине Среднесибирского плоскогорья.Объекты перечислены по порядку от устья к истоку."
     },
     {
        "name": "Буор-Юрях (приток Чондона)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%83%D0%BE%D1%80-%D0%AE%D1%80%D1%8F%D1%85_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A7%D0%BE%D0%BD%D0%B4%D0%BE%D0%BD%D0%B0)",
        "image": "undefined",
        "length": "170 км",
        "pool": "1040 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Чондон",
        "location": " Россия",
        "info": "Буо́р-Юря́х (от якутского «буор үрэх» — «глинистая речка») — река в Якутии. Левый приток Чондона.Исток находится северо-восточнее гор Кюндюлюн, у подножья горы Крест (534 м) на высоте больше 198 м над уровнем моря. Протекает в северо-восточном направлении по территории Усть-Янского улуса. Впадает в Чондон в 354 км от его устья. Длина реки составляет 170 км, площадь водосборного бассейна — 1040 км².По данным государственного водного реестра России и геоинформационной системы водохозяйственного районирования территории РФ, подготовленной Федеральным агентством водных ресурсов:"
     },
     {
        "name": "Буотама",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%83%D0%BE%D1%82%D0%B0%D0%BC%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/403_%D0%A3%D1%81%D1%82%D1%8C-%D0%91%D1%83%D0%BE%D1%82%D0%B0%D0%BC%D1%81%D0%BA%D0%B8%D0%B9_%D0%B7%D0%B0%D0%BF%D0%BE%D0%B2%D0%B5%D0%B4%D0%BD%D0%B8%D0%BA._%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D1%83%D0%BE%D1%82%D0%B0%D0%BC%D0%B0.jpg/250px-403_%D0%A3%D1%81%D1%82%D1%8C-%D0%91%D1%83%D0%BE%D1%82%D0%B0%D0%BC%D1%81%D0%BA%D0%B8%D0%B9_%D0%B7%D0%B0%D0%BF%D0%BE%D0%B2%D0%B5%D0%B4%D0%BD%D0%B8%D0%BA._%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D1%83%D0%BE%D1%82%D0%B0%D0%BC%D0%B0.jpg",
        "length": "418 км",
        "pool": "12 600 км²",
        "consumption": "43 м³/с",
        "head": " ",
        "estuary": "Лена",
        "location": " Россия",
        "info": "Буотама́ — река в России, правый приток Лены. Протекает через национальный парк Ленские столбы, по территории Якутии. Длина — 418 км, площадь бассейна — 12 600 км².Протекает по северной окраине Алданского нагорья и Приленскому плато. В бассейне свыше 200 озёр. Впадает в Лену в 100 км выше Якутска.По данным государственного водного реестра России относится к Ленскому бассейновому округу.Принимает 60 притоков длиной более 10 км.Питание снеговое и дождевое. Максимум половодья в мае. Средний годовой расход около 43 м³/сек. Замерзает в октябре — ноябре, вскрывается в конце апреля — начале мая.Вблизи устья реки расположен питомник Усть-Буотама, где содержится популяция бизонов, перевезённая из Канады. В нём проводится работа по акклиматизации канадских лесных бизонов с целью сохранения их генофонда."
     },
     {
        "name": "Бур ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%83%D1%80_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Olenyok.png/250px-Olenyok.png",
        "length": "501 км",
        "pool": "13 900 км²",
        "consumption": "70,76 м³/с (19 км от устья)",
        "head": " ",
        "estuary": "Оленёк",
        "location": " Россия",
        "info": "Бур (Буур, Пур) — река в России, протекает в Восточной Сибири по территории Оленёкского и Булунского улусов Якутии, левый приток реки Оленёк.Длина реки — около 501 км, площадь водосборного бассейна — 13 900 км². Питание снеговое и дождевое. По данным наблюдений с 1980 по 1994 год среднегодовой расход воды в 19 км от устья составляет 70,76 м³/с. Протекает по Северо-Сибирской низменности.(расстояние от устья)По данным государственного водного реестра России относится к Ленскому бассейновому округу, речной бассейн реки — Оленёк, речной подбассейн реки — отсутствует, водохозяйственный участок реки — Оленёк от водомерного поста гидрометеорологической станции Сухана до устья.Код объекта в государственном водном реестре — 18020000212117600061132."
     },
                         {
        "name": "Буркал",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%83%D1%80%D0%BA%D0%B0%D0%BB",
        "image": "undefined",
        "length": "128 км",
        "pool": "2260 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Менза",
        "location": " Россия",
        "info": "Бурка́л — река в Забайкальском крае России, правый приток Мензы.Река берёт начало на западном склоне Чикоконского хребта. Длина реки составляет 128 км, площадь водосбора — 2260 км². Местоположение реки — 83 км по правому берегу Мензы.Притоки реки: Сажиха, Еловка, Сенная, Дербул, Пологая, Харчевка, Дербенька, Балбастый, Жарничиха, Быстрая."
     },
                                   {
        "name": "Бурунда",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%83%D1%80%D1%83%D0%BD%D0%B4%D0%B0",
        "image": "undefined",
        "length": "187 км",
        "pool": "2880 км²",
        "consumption": "undefined",
        "head": "слияние рек: Левая Бурунда и Правая Бурунда",
        "estuary": "Нора",
        "location": " Россия",
        "info": "Бурунда — река в Селемджинском районе Амурской области. Длина реки — 187 километров (от истока Левой Бурунды — 206 км), площадь бассейна — 2880 км². Протекает по территории Норского заповедника.Образуется при слиянии рек Левая Бурунда и Правая Бурунда. Течёт по заболоченной территории восточной окраины Амурско-Зейской равнины. Очень извилиста на всём своём протяжении. Много старичных озёр в пойме. Основной приток — Малая Бурундушка.Долина реки не заселена. В верхнем течении находится коренное месторождение поделочного минерала халцедона и его разновидностей — оникса, сердолика, хризопраза, цегарата, агата."
     },
      {
        "name": "Бурхи-Гандак",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%83%D1%80%D1%85%D0%B8-%D0%93%D0%B0%D0%BD%D0%B4%D0%B0%D0%BA",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/People_talking_bath_in_Budhi_Gandak_river_on_the_ocasion_of_Buddha_purnima_in_Muzaffarpur%2C_Bihar%2C_India.jpg/250px-People_talking_bath_in_Budhi_Gandak_river_on_the_ocasion_of_Buddha_purnima_in_Muzaffarpur%2C_Bihar%2C_India.jpg",
        "length": "579 км",
        "pool": "12 180 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Ганг",
        "location": " Индия",
        "info": "Бу́рхи-Га́ндак (англ. Burhi Gandak; в верховьях также — Сикрана, англ. Sikrchana) — река в восточной части Индии, течёт в штате Бихар, по территории округов: Западный Чампаран, Восточный Чампаран, Музаффарпур, Самастипур и Кхагария. Левый приток нижнего течения Ганга.Длина реки составляет 579 км. Площадь водосборного бассейна — 12 180 км², из которых 1810 км² приходится на территорию Непала.Начинается на высоте около 300 м над уровнем моря со склонов западной оконечности хребта Сомешвар (Махабхарат, система Гималаев) у индийско-непальской границы в округе Западный Чампаран на северо-западной окраине штата. Далее течение реки идёт в извилистом разветвленном русле по широкой долине Гангской низменности, впадая в Ганг восточнее города Мунгер.Половодье приходится на период летних муссонных дождей. Наиболее полноводным притоком Бурхи-Гандака является река Багхмати.Вода реки используется для орошения."
     },
                   {
        "name": "Бусэин-Гол",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%83%D1%81%D1%8D%D0%B8%D0%BD-%D0%93%D0%BE%D0%BB",
        "image": "undefined",
        "length": "129 км",
        "pool": "2380 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Малый Енисей",
        "location": "undefined",
        "info": "Бусэин-Гол (Бусын-Гол) — река, протекающая в Монголии и по границе России (Республика Тыва) и Монголии. Приток реки Шишхид-Гол (монгольское название верхнего течения Малого Енисея).Река относится к Енисейскому бассейновому округу, речной бассейн — Енисей, водохозяйственный участок реки — Малый Енисей. Длина реки составляет 129 км, водосборная площадь — 2380 км²."
     },
     {
        "name": "Буюнда",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%83%D1%8E%D0%BD%D0%B4%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/%D0%94%D0%BE%D0%BB%D0%B8%D0%BD%D0%B0_%D0%91%D1%83%D1%8E%D0%BD%D0%B4%D1%8B_-_panoramio.jpg/250px-%D0%94%D0%BE%D0%BB%D0%B8%D0%BD%D0%B0_%D0%91%D1%83%D1%8E%D0%BD%D0%B4%D1%8B_-_panoramio.jpg",
        "length": "434 км",
        "pool": "24 800 км²",
        "consumption": "215 м³/с (устье)",
        "head": " ",
        "estuary": "Колыма",
        "location": " Россия",
        "info": "Бую́нда — одна из крупнейших рек Магаданской области, впадает справа в Колыму в 1573 км от устья. Река берёт начало в горах Колымско-Охотского водораздела и протекает по Колымскому нагорью. Длина реки 434 км, площадь водосборного бассейна — 24 800 км². В бассейне реки более 1550 озёр.В переводе с эвенского «буйунда» — «дикооленная».Питание дождевое и снеговое, в низовьях много порогов. Встречаются наледи. Ледостав с конца октября по конец мая. Сезонный размах изменения уровней воды 3,1 м.Средний расход воды — 215 м³/с. Объём стока 6,786 км³/год, модуль стока 8,7 л/(c×км²)По химическому составу вода реки относится к гидрокарбонатному классу (в отдельные фазы режима — сульфатному) и кальциевой группе. Минерализация менее 50 мг/л. Мутность воды в пределах 60-70 г/м³.На хозяйственные нужды в среднем расходуется около 250 тыс. м³ воды в год. Отдельные участки русла зимой используют под зимники. Ранее Буюнда была частью большого транспортного пути, до 1920-х годов имевшего большое значение в снабжении колымских посёлков. Привлекательный объект для проведения сплавов.В реке водится голец, хариус, сиг, налим, ленок.По данным государственного водного реестра России относится к Анадыро-Колымскому бассейновому округу, водохозяйственный участок реки — Колыма от Колымской ГЭС до впадения реки Сеймчан, речной подбассейн реки — Колыма до впадения Омолона. Речной бассейн реки — Колыма."
     },
     {
        "name": "Бхагиратхи",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%85%D0%B0%D0%B3%D0%B8%D1%80%D0%B0%D1%82%D1%85%D0%B8",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Bhagirathi_River_at_Gangotri.JPG/250px-Bhagirathi_River_at_Gangotri.JPG",
        "length": "205 км",
        "pool": "6921 км²",
        "consumption": "28,32 м³/с",
        "head": "Ганготри",
        "estuary": "Ганг",
        "location": " Индия",
        "info": "Бхагира́тхи (хинди भागीरथी, IAST: Bhāgīrathī) — горная гималайская река в индийском штате Уттаракханд, главный исток реки Ганг, важнейшей реки Индии и священной реки индуизма.Длина реки — 205 км. Средний расход воды — 28,32 м³/с. Высота устья — 475 м над уровнем моря. Высота истока — 3892 м над уровнем моря. Площадь водосборного бассейна — 6921 км².Исток Бхагиратхи находится в районе Гаумукх (нижней части ледника Ганготри) неподалёку от селения Ганготри. От истока река протекает расстояние около 700 км до слияния с Алакнандой возле города Девапрайяг. Ниже этой отметки река получает название Ганг (или Ганга). У впадения в Бхагиратхи её притока Бхилангны находится гидроузел Тери. Река названа по имени легендарного царя Бхагиратхи."
     },
     {
        "name": "Бхаратапужа",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%85%D0%B0%D1%80%D0%B0%D1%82%D0%B0%D0%BF%D1%83%D0%B6%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Bharathapuzha_from_Shoranur_bridge.jpg/250px-Bharathapuzha_from_Shoranur_bridge.jpg",
        "length": "209 км",
        "pool": "6186 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Лаккадивское море",
        "location": " Индия",
        "info": "Бхаратапужа (малаял. ഭാരതപ്പുഴ‍) — река в индийском штате Керала, длиной 209 км, что делает её второй в штате после реки Перияр. Площадь бассейна составляет 6186 км².Берёт своё начало на склонах Западных Гат на хребте Анамалай на высоте 2250 м и течёт сперва на север, а затем на запад до впадения в Лаккадивское море.Протекает через округа Палгхат, Триссур и Малаппурам.Основные притоки включают реки Тхутапужа, Гаятрипужа, Калпатипужа и Каннадипужа."
     },
     {
        "name": "Бхарели",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%85%D0%B0%D1%80%D0%B5%D0%BB%D0%B8",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/The_Blue_Kameng%2C_Nameri_National_Park.jpg/250px-The_Blue_Kameng%2C_Nameri_National_Park.jpg",
        "length": "264 км",
        "pool": "11 843 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Брахмапутра",
        "location": " Индия",
        "info": "Бхарели (в верховье Каменг; англ. Kameng, ассам. কামেং নদী) — река в северо-восточной части Индии, в штатах Ассам и Аруначал-Прадеш. Один из крупнейших притоков реки Брахмапутра.Берёт начало в округе Таванг, вытекая из ледникового озера ниже снеговой шапки горы Гори-Чен, расположенной на границе с Китаем. Далее протекает через округ Западный Каменг (Аруначал-Прадеш) и округ Сонитпур (Ассам). Впадает в Брахмапутру недалеко от города Тезпур. Длина реки составляет 264 км; площадь бассейна — 11 843 км².Формирует границу между округами Западный Каменг и Восточный Каменг, а также между заповедниками Игленест и Сесса (на западе) и тигриным заповедником Пакке (на востоке). Холмы Дафла расположены к востоку от реки Каменг, а холмы Ака (дом народа ака) — к западу. Основные притоки: Типпи, Тенга, Бичом и Диранг-Чу."
     },
     {
        "name": "Бык (приток Самары)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%8B%D0%BA_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D1%8B)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/%D0%97%D0%B0%D0%BA%D0%B0%D0%B7%D0%BD%D0%B8%D0%BA_%D0%B7%D0%B0%D0%BF%D0%BB%D0%B0%D0%B2%D0%B0_%D1%80._%D0%91%D0%B8%D0%BA.jpg/250px-%D0%97%D0%B0%D0%BA%D0%B0%D0%B7%D0%BD%D0%B8%D0%BA_%D0%B7%D0%B0%D0%BF%D0%BB%D0%B0%D0%B2%D0%B0_%D1%80._%D0%91%D0%B8%D0%BA.jpg",
        "length": "101 км",
        "pool": "1430 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Самара",
        "location": " Украина",
        "info": "Бык (укр. Бик) — река на Украине, левый приток Самары. Протекает на северо-западе Донецкой области и востоке Днепропетровской области. Длина реки — 101 км.Впадает в Самару возле посёлка городского типа Петропавловка.[источник не указан 1693 дня]Правый приток — Сухой Бычок. Левые притоки: Водная, Гришинка и Ковалиха.[источник не указан 1693 дня]Вдоль реки расположены посёлки городского типа Святогоровка, Петропавловка и сёла Анновка, Криворожье, Славянка, Троицкое, Самарское.[источник не указан 1693 дня]К югу от реки Бык, в её верховье расположен город Доброполье."
     },
             {
        "name": "Былыра",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%8B%D0%BB%D1%8B%D1%80%D0%B0",
        "image": "undefined",
        "length": "113 км",
        "pool": "2260 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Кыра",
        "location": " Россия",
        "info": "Былыра́ — река в России, протекает по территории Кыринского района Забайкальского края. Левый приток реки Кыра. Длина — 113 км. Водосборная площадь — 2260 км².Исток реки Былыра располагается на северо-западном склоне хребта Становик, на Былыра-Джилинском перевале (1282 м). Течёт на юго-запад, впадает в Кыру у села Былыра.На реке расположено 6 озёр. Река не судоходна."
     },
       {
        "name": "Бырлад ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%8B%D1%80%D0%BB%D0%B0%D0%B4_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Raul_Barlad4.jpg/250px-Raul_Barlad4.jpg",
        "length": "207 км",
        "pool": "7220 км²",
        "consumption": "9 м³/с",
        "head": " ",
        "estuary": "Сирет",
        "location": " Румыния",
        "info": "Бырлад (рум. Râul Bârlad), Берлад (Berlad) — река в Румынии, левый приток Сирета.Бырлад берёт начало несколькими небольшими речками в западной части плато Бырлад и течёт преимущественно в пределах Молдовской возвышенности. На 1907 год, начиная с города Берлад была судоходна.Для Бырлада характерны весеннее половодье, низкий летний сток, вплоть до пересыхания реки. Бырлад используется для орошения; здесь работают мельничные установки. На реке стоят такие города, как Васлуй, Бырлад, Текуч."
     },
        {
        "name": "Бысса ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%8B%D1%81%D1%81%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "235 км",
        "pool": "6370 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Селемджа",
        "location": " Россия",
        "info": "Бы́сса (тюрк.: быс, бус — туман, пасмурная погода; эвенк.: бусэ — пояс)[источник не указан 1305 дней] — река в Амурской области России, левый приток Селемджи.Берёт начало в горах северо-западной части хребта Турана, на высоте около 800 м над уровнем моря. Протекает в широкой заболоченной долине; русло извилистое, с порогами. Недалеко от устья — посёлок городского типа Февральск, южнее которого реку пересекает Дальневосточная железная дорога. Длина — 235 км, площадь водосборного бассейна — 6370 км².В 135 км от устья находится Быссинский источник термоминеральных вод, которые достигают температуры 42—43 °C и используются для лечения кожных, желудочных, сердечно-сосудистых заболеваний и остеохондроза.При впадении Быссы в Селемджу расположено село Бысса. Высота устья — 239 м над уровнем моря.(расстояние от устья)Система водного объекта: Селемджа → Зея → Амур → Охотское море.По данным государственного водного реестра России относится к Амурскому бассейновому округу, речной бассейн реки Амур, речной подбассейн реки — Зея, водохозяйственный участок реки — Селемджа.Код объекта в государственном водном реестре — 20030400312118100036085."
     },
     {
        "name": "Быстрая (приток Козыревки)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%8B%D1%81%D1%82%D1%80%D0%B0%D1%8F_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9A%D0%BE%D0%B7%D1%8B%D1%80%D0%B5%D0%B2%D0%BA%D0%B8)",
        "image": "undefined",
        "length": "154 км",
        "pool": "3830 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Козыревка",
        "location": " Россия",
        "info": "Быстрая — река на полуострове Камчатка в России. Протекает по территории Быстринского и Усть-Камчатского районов. Длина реки — 154 км. Площадь водосборного бассейна — 3830 км².Начинается между горами Знойная и Перевал в месте разделения Срединного и Козыревского хребтов, течёт на север и северо-восток в межгорной котловине, занятой берёзово-лиственничным лесом до Анавгая, затем поворачивает на юго-восток. Течёт в этом направлении по равнинной местности, поросшей берёзово-лиственничным лесом. Впадает в реку Козыревка слева на расстоянии 5 км от её устья на высоте 35,1 метра над уровнем моря. В приустьевой части от реки отделяется протока Алачиха, впадающая в Камчатку. Ширина реки выше истока Алачихи — 45 метров, глубина — 1,4 метра, дно твёрдое.На левобережье реки расположены лечебный источник 47-й километр и сёла Анавгай в устье одноимённой реки и Эссо в устье Уксичана.Притоки:По данным государственного водного реестра России относится к Анадыро-Колымскому бассейновому округу."
     },
           {
        "name": "Быстрая (приток Северского Донца)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%8B%D1%81%D1%82%D1%80%D0%B0%D1%8F_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A1%D0%B5%D0%B2%D0%B5%D1%80%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%94%D0%BE%D0%BD%D1%86%D0%B0)",
        "image": "undefined",
        "length": "218 км",
        "pool": "4180 км²",
        "consumption": "3,54 м³/с",
        "head": " ",
        "estuary": "Северский Донец",
        "location": " Россия",
        "info": "Бы́страя — река в России, протекает по территории Ростовской области, левый приток Северского Донца. Длина — 218 км, площадь водосборного бассейна — 4180 км². Характер течения равнинный, питание реки преимущественно снеговое, верховья летом пересыхают. Угольные месторождения. Среднегодовой расход воды в нижнем течении — 3,54 м³/с.Быстрая берёт своё начало на небольших возвышенностях к северу от Морозовска из нескольких балок. Она уже в верхней части имеет расширенную долину с широкой поймой. Река извилиста и имеет постоянный ток, начиная от Морозовска, в результате выхода обильных родников. Выше же хутора Яверкиева постоянного тока воды нет. Грунтовые воды залегают на значительной глубине только в верховьях, а ниже имеются неглубокие и обильные террасовые воды переменного качества.Быстрая сперва имеет направление на северо-запад, но после слияния с своим правым притоком Гнилой поворачивает почти под прямым углом на юго-запад. Профессор В. В. Богачёв считал, что Гнилую следует признать основной рекой, так как среднее и нижнее течение Быстрой является прямым продолжением Гнилой. В среднем течении обе реки имеют высокие обрывистые правые берега и отлогие — левые. От места слияния близ станицы Скосырской долина расширяется."
     },
     {
        "name": "Быстрая (приток Хайрюзовой)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%8B%D1%81%D1%82%D1%80%D0%B0%D1%8F_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A5%D0%B0%D0%B9%D1%80%D1%8E%D0%B7%D0%BE%D0%B2%D0%BE%D0%B9)",
        "image": "undefined",
        "length": "219 км",
        "pool": "4080 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Хайрюзова",
        "location": " Россия",
        "info": "Быстрая (в верхнем и среднем течении — Хайрюзовка) — река в Камчатском крае России.Длина реки — 219 км, площадь водосборного бассейна — 4080 км². Протекает по территории Быстринского и Тигильского районов.Берёт начало в отрогах центральной части Срединного хребта. Ширина реки в верхнем течении — до 40 м, глубина — до 1 м, скорость течения — 2,0—2,3 м/с. В нижнем течении ширина — до 86 м, глубина — до 1,6 м, скорость течения — 1,9—2,0 м/с.Напротив села Хайрюзово впадает в реку Тихую (Хайрюзову) в 45 км от её устья по левому берегу. Основной приток — река Сувоен."
     },
      {
        "name": "Быстрая Сосна",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%8B%D1%81%D1%82%D1%80%D0%B0%D1%8F_%D0%A1%D0%BE%D1%81%D0%BD%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sosn1.jpg/250px-Sosn1.jpg",
        "length": "296 км",
        "pool": "17 400 км²",
        "consumption": "74 м³/с (37 км от устья)",
        "head": " ",
        "estuary": "Дон",
        "location": " Россия",
        "info": "Со́сна, Сосна́ (Бы́страя Со́сна) — река в Орловской и Липецкой областях, правый приток Дона. Общее направление течения реки — на восток.Длина — 296 км, площадь бассейна — 17 400 км². Широкая долина. Питание в значительной мере родниковыми водами и снеговое. Ледостав обычно с ноября — декабря по март — апрель.На Быстрой Сосне расположены посёлок городского типа Колпна и города Ливны и Елец.Река судоходна от устья до Ливен, но регулярное движение судов отсутствует.В бассейне нижнего течения Быстрой Сосны в 1,5 км к юго-западу от села Лавы в черте г. Ельца и в 7 км к юго-западу от его исторического центра (Соборная площадь) находится Лавский археологический комплекс XI—XIV веков, состоящий из городища и примыкающих к нему двух селищ — Лавы 3 и 4.Среднегодовой расход воды в районе города Ельца составляет 71,3 м³/с. Среднемесячные расходы воды (данные наблюдений с 1927 по 1985 год): Советский писатель К. Г. Паустовский посвятил реке Сосне в «Книге скитаний» такие строки:Возможно, именно эта река упомянута в названии картины Николая Дмитриева-Оренбургского.По данным государственного водного реестра России и геоинформационной системы водохозяйственного районирования территории РФ, подготовленной Федеральным агентством водных ресурсов:"
     },
              {
        "name": "Быстрица (приток Вятки)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%8B%D1%81%D1%82%D1%80%D0%B8%D1%86%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%92%D1%8F%D1%82%D0%BA%D0%B8)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/%D0%9F%D0%BE%D0%B9%D0%BC%D0%B0_%D0%B1%D1%8B%D1%81%D1%82%D1%80%D0%B8%D1%86%D1%8B.jpg/250px-%D0%9F%D0%BE%D0%B9%D0%BC%D0%B0_%D0%B1%D1%8B%D1%81%D1%82%D1%80%D0%B8%D1%86%D1%8B.jpg",
        "length": "166 км",
        "pool": "3740 км²",
        "consumption": "22,1 м³/с",
        "head": " ",
        "estuary": "Вятка",
        "location": " Россия",
        "info": "Бы́стрица — река в Кировской области, левый приток Вятки (бассейн Волги). Устье находится в 626 км по левому берегу. Длина реки — 166 км. Площадь водосборного бассейна — 3740 км².Исток находится у села Верхобыстрица (Верхобыстрицкое сельское поселение Кумёнского района). Река течёт на северо-запад. Верхнее течение находится в Кумёнском районе, в среднем течении протекает по территории Кирово-Чепецкого и Оричевского районов, а также муниципального образования «Город Киров», причём длительное время образует границу Оричевского района с Кирово-Чепецким районом и муниципальным образованием «Город Киров». Впадает в Вятку в Орловском районе выше деревни Скозырята (Кузнецовское сельское поселение). Ширина реки у устья около 45 метров.[источник не указан 749 дней]На реке расположены многочисленные населённые пункты, крупнейшие из них: посёлок городского типа Стрижи; сёла Верхобыстрица, Вожгалы (центр Вожгальского сельского поселения), Быстрица (центр Быстрицкого сельского поселения); посёлки Торфяной и Речной (центр Речного сельского поселения)[источник не указан 749 дней]Общее падение — 107 м. Средний максимальный уровень воды — 534 см, средний минимальный — около 100. Средний расход воды — 22,1 м³/с. Уклон реки — 0,64 м/км.[источник не указан 2097 дней]"
     },
                    {
        "name": "Быстрый Танып",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%8B%D1%81%D1%82%D1%80%D1%8B%D0%B9_%D0%A2%D0%B0%D0%BD%D1%8B%D0%BF",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D1%8B%D1%81%D1%82%D1%80%D1%8B%D0%B9_%D0%A2%D0%B0%D0%BD%D1%8B%D0%BF_%D0%9A%D0%B0%D0%BB%D1%82%D0%B0%D1%81%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B9_%D1%80%D0%B0%D0%B9%D0%BE%D0%BD.JPG/250px-%D0%A0%D0%B5%D0%BA%D0%B0_%D0%91%D1%8B%D1%81%D1%82%D1%80%D1%8B%D0%B9_%D0%A2%D0%B0%D0%BD%D1%8B%D0%BF_%D0%9A%D0%B0%D0%BB%D1%82%D0%B0%D1%81%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B9_%D1%80%D0%B0%D0%B9%D0%BE%D0%BD.JPG",
        "length": "345 км",
        "pool": "7560 км²",
        "consumption": "44,5 м³/с (в 20 км от устья)",
        "head": " ",
        "estuary": "Белая",
        "location": " Россия",
        "info": "Бы́стрый Таны́п, Таны́п — река в Пермском крае и Башкортостане, правый приток реки Белой.Длина реки — 345 км, площадь водосборного бассейна — 7560 км². Среднегодовой расход воды — в 20 км от устья составляет 44,5 м³/с. Питание в основном снеговое. Танып замерзает в первой половине ноября, а вскрывается в апреле.(указано расстояние от устья)"
     },
        {
        "name": "Бытантай",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%8B%D1%82%D0%B0%D0%BD%D1%82%D0%B0%D0%B9",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Yana_river.png/250px-Yana_river.png",
        "length": "586 км",
        "pool": "40 200 км²",
        "consumption": "153 м³/с (20 км от устья)",
        "head": " ",
        "estuary": "Яна",
        "location": " Россия",
        "info": "Бытанта́й — река в Якутии, левый приток Яны.Длина реки — 586 км, площадь бассейна — 40,2 тыс. км². Берёт начало на восточном склоне Верхоянского хребта и протекает большей частью в его отрогах. Протекает по территории Кобяйского, Эвено-Бытантайского и Верхоянского районов.Питание снеговое и дождевое.Наиболее крупные притоки: Биллях, Тенки — справа; Хобол, Аччыгый-Саккырыр, Улахан-Саккырыр, Кулгага-Суох, Аллах — слева. В бассейне свыше 2 тыс. озёр.Среднегодовой расход воды в 20 км от устья составляет 152,96 м³/с. Среднемесячные расходы воды (данные наблюдений с 1937 по 1999 год): По данным государственного водного реестра России и геоинформационной системы водохозяйственного районирования территории РФ, подготовленной Федеральным агентством водных ресурсов:"
     },
            {
        "name": "Бэд-Ривер (приток Миссури)",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%8D%D0%B4-%D0%A0%D0%B8%D0%B2%D0%B5%D1%80_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9C%D0%B8%D1%81%D1%81%D1%83%D1%80%D0%B8)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Bad_River_South_Dakota_Map_1.jpg/250px-Bad_River_South_Dakota_Map_1.jpg",
        "length": "177 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "слияние рек: Норт-Форк-Бэд-Ривер и Саус-Форк-Бэд-Ривер",
        "estuary": "Миссури",
        "location": " США",
        "info": "Бэд-Ри́вер (англ. Bad River — Плохая река) — река в центральной части Южной Дакоты (США), правый приток Миссури, длина 177 км.Берёт начало на юге округа Хокон, от слияния рек Норт-Форк-Бэд-Ривер и Саус-Форк-Бэд-Ривер в 24 км к северу от Коттонвуда (англ. Cottonwood), и течёт на юго-восток, потом на востоко-северо-восток, мимо городов Мидленд (англ. Midland) и Капа (англ. Capa). Впадает в Миссури в городе Форт-Пьер (англ. Fort Pierre).Бассейн реки известен депозитами отбеливающей глины и марганца."
     },
     {
        "name": "Бэйпаньцзян",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%8D%D0%B9%D0%BF%D0%B0%D0%BD%D1%8C%D1%86%D0%B7%D1%8F%D0%BD",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Beipanjiang_Railway_Bridge-3.jpg/250px-Beipanjiang_Railway_Bridge-3.jpg",
        "length": "449 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Хуншуйхэ",
        "location": " Китай",
        "info": "Бэйпаньцзян (кит. 北盘江) — река в южном Китае. Длина реки — 449 км.[источник не указан 1903 дня]Её истоки находятся в Сюаньвэй провинции Юньнань, в уезде Ванмо Цяньсинань-Буи-Мяоского автономного округа провинции Гуйчжоу сливается с рекой Наньпаньцзян, образуя реку Хуншуйхэ.Через ущелье, по которому протекает река, в 2010—2015 годах был построен Железнодорожный мост Цинлун."
     },
     {
        "name": "Бэйцзян",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%8D%D0%B9%D1%86%D0%B7%D1%8F%D0%BD",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/201609_Wenjiang_and_Yingde%E2%80%93Foshan_Road.jpg/250px-201609_Wenjiang_and_Yingde%E2%80%93Foshan_Road.jpg",
        "length": "468 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "слияние рек: Ушуй и Чжэньшуй",
        "estuary": "Чжуцзян",
        "location": " Китай",
        "info": "Бэйцзя́н (кит. упр. 北江, пиньинь Běi Jiāng, букв. «Северная река») — река в китайской провинции Гуандун.Длина реки — 468 км.[источник не указан 43 дня]Сама река образуется из слияния рек Ушуй и Чжэньшуй в городе Шаогуань.В декабре 2005 года было зафиксировано десятикратное превышение содержания кадмия, из-за сброса загрязненной воды во время ремонта Шаогуаньского плавильного завода. В результате экстренного вброса сорбентов и воды из водохранилищ, за несколько дней удалось понизить концентрацию опасных химических веществ.18 ноября 2008 года произошло столкновение двух судов, одно из которых затонуло, однако его экипаж был спасен другим."
     },
     {
        "name": "Бэйюньхэ",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%8D%D0%B9%D1%8E%D0%BD%D1%8C%D1%85%D1%8D",
        "image": "undefined",
        "length": "120 км",
        "pool": "5300 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Вэньюйхэ",
        "location": " Китай",
        "info": "Бэйюньхэ́ (кит. 北运河) — канал в Северном Китае, входит в систему реки Хайхэ. Является частью Великого канала. Длина — 120 км.[источник не указан 1904 дня] Площадь водосборного бассейна — 5300 км².[источник не указан 1904 дня]Канал начинается в пекинских районах Чанпин и Хайдянь, далее течёт на юг, протекает через Тунчжоу, и меняет название на Вэньюйхэ.Притоки: Тунхойхэ, Ляншуйхэ, Фынганцзяньхэ, Лунфынхэ."
     },
     {
        "name": "Бэннок-Крик",
        "link": "https://ru.wikipedia.org/wiki/%D0%91%D1%8D%D0%BD%D0%BD%D0%BE%D0%BA-%D0%9A%D1%80%D0%B8%D0%BA",
        "image": "undefined",
        "length": "108 км",
        "pool": "1230 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Снейк",
        "location": " США",
        "info": "Бэ́ннок-Крик (англ. Bannock Creek) — река, протекающая по территории штата Айдахо Соединённых Штатов Америки, приток реки Снейк. Длина реки — 108 километров.Исток расположен к северу от Холбрука, в округе Онайда, на высоте 1814 метров. Далее река течёт на север, по территории округа Пауэр, через Арбон-Велли, Полин и индейскую резервацию Форт-Холл. Впадает в водохранилище Американ-Фолс, расположенное на реке Снейк, на высоте 1328 метров, примерно на половине пути между городами Американ-Фолс и Покателло.Площадь бассейна реки — 1230 км²."
     },
           {
        "name": "Вааль",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B0%D0%B0%D0%BB%D1%8C",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/VaalFromN3.jpg/250px-VaalFromN3.jpg",
        "length": "1250 км",
        "pool": "196 438 км²",
        "consumption": "124,59 м³/с",
        "head": " ",
        "estuary": "Оранжевая",
        "location": " Южно-Африканская Республика",
        "info": "Ва́аль (африк. Vaalrivier, Фалрифир; англ. Vaal River) — река в Южной Африке, крупнейший приток реки Оранжевой. Длина около 1250 км, площадь водосборного бассейна 196 438 км², среднегодовой расход воды 124,59 м³/с. Истоки реки расположены в Драконовых горах в Мпумаланге, к востоку от Йоханнесбурга, около 30 км к северу от Эрмело и примерно в 240 км от Индийского океана. Река течёт на запад, впадая в реку Оранжевую юго-западнее Кимберли в Северо-Капской провинции.Вдоль северного берега реки лежат Мпумаланга, Гаутенг и Северо-Западная провинция, а по её южному берегу — провинция Фри-Стейт.От истока к устью по реке расположены города Стандертон, Филлирс, Феринихинг, Парейс, Оркни, Блумхоф, Кристиана, Уоррентон, Уинсортон, Баркли-Уэст, Делпортсхуп, Дуглас.В верхнем течении река протекает через Драконовы горы и плато Высокий Велд, на этом участке река течёт в глубокой долине. Крупнейшие притоки — Вилге, Фет (Фетрифир), Рит, Хартс, Клип, Фалрифир, Сейкербосранд, Тайбосспрейт, Кромелмбухспрейт, Оуверспрейт, Муйрифир, Реностеррифир, Валс, Занд. Половодье на реке наблюдается в ноябре — феврале (летом).На реке имеются несколько водохранилищ, крупнейшие из которых — Блумхофдам, Фалдам, Хрутдрайдам."
     },
           {
        "name": "Вага (приток Северной Двины)",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B0%D0%B3%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A1%D0%B5%D0%B2%D0%B5%D1%80%D0%BD%D0%BE%D0%B9_%D0%94%D0%B2%D0%B8%D0%BD%D1%8B)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Vaga_River.jpg/250px-Vaga_River.jpg",
        "length": "575 км",
        "pool": "44 800 км²",
        "consumption": "384 м³/с",
        "head": " ",
        "estuary": "Северная Двина",
        "location": " Россия",
        "info": "Ва́га — река в Вологодской и Архангельской областях России, крупнейший левый приток Северной Двины.Длина реки — 575 км, площадь водосборного бассейна — 44 800 км².Истоки Ваги находятся среди болот на севере Вологодской области на Ваго-Сухонском водоразделе. Протекает по хвойным лесам. Долина реки в верховьях выражена слабо, но ниже устья Режи река образует глубокую долину, прорезая пермские породы. Высота склонов достигает 50 метров. Дно в этих местах каменистое, галечное. После впадения реки Терменьга Вага течёт в древней впадине. Ширина долины достигает 4 км, высота склонов уменьшается до 15—20 м. Дно становится песчаным, иногда песчано-галечниковым. После впадения Устьи русло расширяется до 300 метров, средняя глубина 1,5—2,5 метра, на плёсах до 6 метров, но в межень на перекатах 0,2—0,4 метра..В советское время и в начале 1990-х по реке осуществлялся лесосплав. В настоящее время река не судоходна.Почти на всём протяжении (кроме первых 30 км) по левому берегу реки проходит автодорога М8.Крупнейшие притоки — Кулой, Устья, Терменьга, Шереньга (правые); Вель, Пуя, Ледь, Сюма, Неленга, Паденьга, Большая Чурга, Пежма (левые).Замерзает в середине ноября, вскрывается в конце апреля. Весеннее половодье длится 1,5-2 месяца, за это время река проносит 2/3 годового стока."
     },
     {
        "name": "Вагай",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B0%D0%B3%D0%B0%D0%B9",
        "image": "undefined",
        "length": "555 км",
        "pool": "23 000 км²",
        "consumption": "8,23 м³/с (деревня Нововыигрышная)",
        "head": " ",
        "estuary": "Иртыш",
        "location": " Россия",
        "info": "Вага́й — река в Тюменской области, левый приток Иртыша.Длина реки — 555 км, площадь бассейна — 23 тыс. км². Протекает по территории Омутинского, Голышмановского, Аромашевского и Вагайского районов Тюменской области.Питание снеговое, весной сильно разливается, летом мелеет. Среднегодовой расход воды — 8,23 м³/сек (у деревни Нововыигрышная). Крупнейшие притоки — Балахлей, Агитка (правые), Ашлык (левый). Долина Вагая густо заселена, но крупных населённых пунктов нет. В верховьях по долине проходит железнодорожная ветка Тюмень — Омск (часть Транссиба).Вагай впадает в Иртыш слева, на его 729 км от устья.В устье реки (ныне называемым Ермакова заводь) погиб Ермак. В 5 км от фактического впадения реки Вагай в Иртыш находится рукотворное устье (называемое в народе «прорва»), прокопанное до начала 1960-х годов для удобства лесосплава. В этом месте расположено село Вагай — административный центр Вагайского района.Система водного объекта: Иртыш → Обь → Карское море.По данным государственного водного реестра России относится к Иртышскому бассейновому округу, водохозяйственный участок реки — Иртыш от впадения реки Ишим до впадения реки Тобол, речной подбассейн реки — бассейны притоков Иртыша от Ишима до Тобола. Речной бассейн реки — Иртыш."
     },
       {
        "name": "Вагиль",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B0%D0%B3%D0%B8%D0%BB%D1%8C",
        "image": "undefined",
        "length": "117 км",
        "pool": "3830 км²",
        "consumption": "undefined",
        "head": "Большой Вагильский Туман",
        "estuary": "Тавда",
        "location": " Россия",
        "info": "Вагиль — река в России, протекает по Свердловской области. Левый приток реки Тавды.Река Вагиль вытекает из озера Большой Вагильский Туман. Течёт по болотистой местности вдали от населённых пунктов. Русло извилистое. Устье реки находится напротив населённого пункта Усть-Вагильская в 650 км по левому берегу реки Тавды. Длина реки — 117 км, площадь водосборного бассейна — 3830 км²По данным государственного водного реестра России относится к Иртышскому бассейновому округу, водохозяйственный участок реки — Тавда от истока и до устья, без реки Сосьва от истока до водомерного поста у деревни Морозково, речной подбассейн реки — Тобол. Речной бассейн реки — Иртыш.Код объекта в государственном водном реестре — 14010502512111200011505."
     },
       {
        "name": "Вагран",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B0%D0%B3%D1%80%D0%B0%D0%BD",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Vagran_River.jpg/250px-Vagran_River.jpg",
        "length": "137 км",
        "pool": "1620 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Сосьва",
        "location": " Россия",
        "info": "Вагран — река в Свердловской области, правый приток Сосьвы. Длина реки — 137 километров. Площадь водосборного бассейна — 1620 км². Глубина — 0,4—0,5 м, в паводок — до 2-3 метров. Ширина русла — 30-40 метров. В черте города Североуральска протекает по бетонному руслу.Вагран берёт начало в Уральских горах, на границе Свердловской области с Пермским краем, стекая с восточного склона Казанского Камня, протекает по Североуральскому городскому округу и впадает в реку Сосьву. Притоками Ваграна являются реки Оленья, Лямпа, Колонга, Сарайная, Шампа, Большой Лих, Малый Лих, Коноваловка, Ольховка, Крив-Вагранский, Сурья, Тулайка, а также ручей Крутой.В пределах города Североуральска Вагран протекает по искусственному железобетонному каналу с пологими берегами, позволяющими подходить непосредственно к воде. Благодаря чему стали доступны ранее затопленные участки Коноваловской пещеры (открыта во второй половине XX века).Также параллельно основному руслу построен дублирующий железобетонный канал с системой шлюзов. Весь комплекс (искусственное русло реки, дублёр, шлюзовые сооружения) был создан в 60-е годы 20 века и представляет собой уникальное гидротехническое сооружение для предотвращения попадания воды в подземные бокситовые шахты, расположенные в окрестностях города."
     },
     {
        "name": "Вад ",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B0%D0%B4_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "222 км",
        "pool": "6500 км²",
        "consumption": "7,66 м³/с (84 км от устья)",
        "head": " ",
        "estuary": "Мокша",
        "location": " Россия",
        "info": "Вад (Большой Вад, от морд. «вадь» — вода) — средняя река в Мордовии, Пензенской и Рязанской областях, левый приток Мокши (бассейн Оки).Длина реки — 222 км, площадь бассейна — 6500 км². Извилистая, в основном лесная река (хотя есть и луговые участки). Среднегодовой расход воды у Авдалово (84 км от устья) — 7,66 м³/с.Берёт начало из родников в Черкасском лесу в Пачелмском районе Пензенской области. Течёт в основном на север. Вблизи Вадинска на реке сооружена 700-метровая плотина. Объём водохранилища, образованного этой плотиной, — 21 млн м³.Протекает в Пензенской области по населённым пунктам Коповка, Вадинск, Большая Лука, Серго-Поливаново, Луговое.По Мордовии течёт в заболоченной равнине, окружённая лесами. Ниже посёлка Ширингуши принимает левые притоки Удёв, Марчас, Пичкиряс и правые притоки Парца, Явас.Последние 15 км течёт по территории Рязанской области, впадая в Мокшу ниже посёлка городского типа Кадом. Высота устья — около 88,3 м над уровнем моря.(расстояние от устья)"
     },
            {
        "name": "Вадма",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B0%D0%B4%D0%BC%D0%B0",
        "image": "undefined",
        "length": "114 км",
        "pool": "1140 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Лыжа",
        "location": " Россия",
        "info": "Вадма (Валма) — река в России, протекает по Республике Коми по территории городского округа Усинск. Левый приток реки Лыжа.Устье реки находится в 48 км по левому берегу реки Лыжа. Длина реки составляет 114 км, площадь водосборного бассейна 1140 км². Имеет многочисленные притоки, самые крупные из которых Пальникъёль и Воргаёль.По данным государственного водного реестра России относится к Двинско-Печорскому бассейновому округу, водохозяйственный участок реки — Печора от водомерного поста у посёлка Шердино до впадения реки Уса, речной подбассейн реки — бассейны притоков Печоры до впадения Усы. Речной бассейн реки — Печора.Код объекта в государственном водном реестре — 03050100212103000065201."
     },
             {
        "name": "Ваеньга",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B0%D0%B5%D0%BD%D1%8C%D0%B3%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Severnaya_Dvina.svg/250px-Severnaya_Dvina.svg.png",
        "length": "218 км",
        "pool": "3370 км²",
        "consumption": "30,4 м³/с (дер. Филимоновская (Верхняя Ваеньга))",
        "head": " ",
        "estuary": "Северная Двина",
        "location": " Россия",
        "info": "Ва́еньга — река в Виноградовском районе Архангельской области России, правый приток Северной Двины.Название Ваеньги (прежнее название Ваенга), видимо, происходит от чудского «-еньга» — река и саамского «ву-ойнгга» — волшебный. Впрочем, есть и более реалистичные версии этимологии данного гидронима: указанное «-еньга» и саамское «вуэй» — «ручей» (недаром столько притоков); либо, как и река Ваенга в Мурманской области (близ Североморска), — от саамского «вайонгг» — важенка.Исток Ваеньги находится вблизи водораздела Северной Двины и Пинеги, на высоте 201 метр над уровнем моря. Устье реки находится на 334 км по правому берегу реки Северная Двина, на высоте 9 метров над уровнем моря. В верхнем течении Ваеньга протекает по территории Клоновского заказника. Впадает в Северную Двину возле посёлка Усть-Ваеньга. В верхнем течении (до деревни Нижняя Ваеньга) в русле много порогов и перекатов. Длина реки — около 218 км. Площадь водосборного бассейна — около 3370 км². Питание реки снеговое и дождевое. Расход воды — 30,4 м³/с. Ледостав с конца октября — начала ноября по конец апреля.Главные притоки: слева — Нондрус, Малая Квахтюга, Большая Квахтюга, Тахта, Улиньга, Шомбаш, Раза, Толмас; справа — Шабоньга, Югна, Кисема, Шуровка, Пескарь, Ухтаньга, Ольховка, Лаповка."
     },
        {
        "name": "Важинка",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B0%D0%B6%D0%B8%D0%BD%D0%BA%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/%D0%92%D0%B0%D0%B6%D0%B8%D0%BD%D0%BA%D0%B0.JPG/250px-%D0%92%D0%B0%D0%B6%D0%B8%D0%BD%D0%BA%D0%B0.JPG",
        "length": "123 км",
        "pool": "2200 км²",
        "consumption": "undefined",
        "head": "Логмболото",
        "estuary": "Свирь",
        "location": " Россия",
        "info": "Ва́жинка (Важина, Важенка) — река в России, протекает по территории Подпорожского района Ленинградской области и Прионежского района Карелии.Устье реки в посёлке Важины, оно находится в 112 км по правому берегу Свири, от устья последней. Длина реки — 123 км, площадь водосборного бассейна — 2200 км².Залесенность водосбора 82 %, заболоченность 15 %, озерность 2 %, средний уклон 2,05 %, средний модуль стока 13,3 л/с·м².В реку впадает ряд притоков, наиболее крупные из которых:К бассейну Важинки относятся озёра:По данным государственного водного реестра России относится к Балтийскому бассейновому округу, водохозяйственный участок реки — Свирь без бассейна Онежского озера, речной подбассейн реки — Свирь (включая реки бассейна Онежского озера). Относится к речному бассейну реки Нева (включая бассейны рек Онежского и Ладожского озера).Код объекта в государственном водном реестре — 01040100712102000012431."
     },
            {
        "name": "Вазуза",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B0%D0%B7%D1%83%D0%B7%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Vazuza_rezervoir.jpg/250px-Vazuza_rezervoir.jpg",
        "length": "162 км",
        "pool": "7120 км²",
        "consumption": "35,9 м³/с",
        "head": " ",
        "estuary": "Волга",
        "location": " Россия",
        "info": "Вазу́за — река в Смоленской и Тверской областях России, правый приток Волги, одна из чистейших рек России.Средний расход воды — 35,9 м³/с.[источник не указан 621 день]В среднем течении расположен город Сычёвка. При впадении в Волгу — город Зубцов.По мнению В. Н. Топорова, название реки, как и Яуза, балтского происхождения, от *Važ-uža. По другой версии — родственно лит. vazint, vazineti «проезд, продвижение», что характеризует значение этого верхнего притока Волги как торгового пути.Длина реки — 162 км, площадь бассейна — 7120 км². Исток Вазузы находится на северных склонах Смоленской возвышенности, недалеко от д. Марьино Вяземского района Смоленской области. Питание реки снеговое и дождевое, ледостав с ноября по апрель.В 1977 году на реке был построен Вазузский гидроузел, вошедший в состав Вазузской гидросистемы. В трёх километрах выше Зубцова построена плотина Вазузского водохранилища, которое затопило порожистую часть долины Вазузы до устья реки Лосмина около города Сычёвка и всё нижнее течение правого притока — реки Гжать.На реке расположены города: Сычёвка, Зубцов"
     },
          {
        "name": "Вай (приток Катыма)",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B0%D0%B9_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9A%D0%B0%D1%82%D1%8B%D0%BC%D0%B0)",
        "image": "undefined",
        "length": "132 км",
        "pool": "1100 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Катым",
        "location": " Россия",
        "info": "Вай — река в России, протекает по Кондинскому району Ханты-Мансийского АО. Устье реки находится в 14 км по левому берегу реки Катым. Длина реки составляет 132 км, площадь водосборного бассейна — 1100 км².По данным государственного водного реестра России относится к Иртышскому бассейновому округу, водохозяйственный участок реки — Конда, речной подбассейн реки — Конда. Речной бассейн реки — Иртыш.Код объекта в государственном водном реестре — 14010600112115300017846."
     },
        {
        "name": "Ваймуга",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B0%D0%B9%D0%BC%D1%83%D0%B3%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/%D0%92%D0%B0%D0%B9%D0%BC%D1%83%D0%B3%D0%B0.JPG/250px-%D0%92%D0%B0%D0%B9%D0%BC%D1%83%D0%B3%D0%B0.JPG",
        "length": "152 км",
        "pool": "4210 км²",
        "consumption": "undefined",
        "head": "Обозеро",
        "estuary": "Емца",
        "location": " Россия",
        "info": "Ва́ймуга — река в Архангельской области, левый приток реки Емца (бассейн Северной Двины). Принадлежит бассейну Белого моря.Берёт начало в Обозере у деревни Малые Озерки. Впадает в Емцу в 1 км от автодороги М8 в районе деревни Большое Село. Длина — 152 км, площадь бассейна — 4210 км².На берегах Ваймуги расположено 14 населённых пунктов (от истока к устью): Малые Озерки, Обозерский, Река Ваймуга, Самодед, Новая Ильма, Ваймужский (Пермилово), Верхняя, Прилук, Калажма, Гора, Осерёдок (Ваймуга), Нижняя Ваймуга, Лохта, Погост.Основные притоки:"
     },
     {
        "name": "Велна",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D0%BB%D0%BD%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Welna_river.jpg/250px-Welna_river.jpg",
        "length": "118 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Варта",
        "location": " Польша",
        "info": "Велна (польск. Wełna) — река в западной Польше. Приток Варты. Длина реки 118 км. Самым крупным населённым пунктом на реке является город Вонгровец в Великопольском воеводстве. Велна со своим правым притоком Нельбой образует единственное в мире пересечение рек строго под прямым углом, причём воды рек не смешиваются. Явление объясняется различием температур воды в этих реках, разными скоростями и уровнями течений."
     },
     {
        "name": "Вель (приток Ваги)",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D0%BB%D1%8C_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%92%D0%B0%D0%B3%D0%B8)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/%D0%A0%D0%B5%D0%BA%D0%B0_%D0%92%D0%B5%D0%BB%D1%8C.JPG/250px-%D0%A0%D0%B5%D0%BA%D0%B0_%D0%92%D0%B5%D0%BB%D1%8C.JPG",
        "length": "223 км",
        "pool": "5390 км²",
        "consumption": "44,46 м³/с (32 км от устья)",
        "head": " ",
        "estuary": "Вага",
        "location": " Россия",
        "info": "Вель — река в Архангельской области, левый приток реки Вага (бассейн Северной Двины).Длина — 223 км, площадь бассейна — 5390 км², средний годовой расход воды 47,7 м³/с (д. Баламутовская).Вель берёт начало из болот в западной части Коношской возвышенности к югу от посёлка Коноша. В верховьях течёт в слабовыраженной долине, ниже — в широкой долине, где река сильно петляет, к низовьям долина сужается. Основное направление течения — на восток. В верхнем течении берега лесисты и заболочены, в низовьях более заселённые. Ранее по реке проводился сплав.В устье Шоноши находятся посёлок Усть-Шоноша и деревня Усть-Шоноша, в устье Елюги — деревня Хозьмино, в месте впадения реки Вель в Вагу расположен город Вельск.На языке коми, «вель» — «довольно, порядочно». Шведский исследователь Г. Ёхансон предлагает перевод с санскрита — «граница, предел, речной берег».По данным государственного водного реестра России и геоинформационной системы водохозяйственного районирования территории РФ, подготовленной Федеральным агентством водных ресурсовКрупнейшие притоки — Подюга, Шоноша, Елюга (левые), Синега, Вотчица (правые). "
     },
     {
        "name": "Вель (приток Эны)",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D0%BB%D1%8C_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%AD%D0%BD%D1%8B)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/FR-51-Vesle.JPG/250px-FR-51-Vesle.JPG",
        "length": "139,4 км",
        "pool": "1480 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Эна",
        "location": " Франция",
        "info": "Вель (фр. Vesle) — река во Франции, приток реки Эны.Длина реки — 139,4 км, площадь водосборного бассейна — 1480 км²[1]. Находится на северо-востоке Франции, протекает преимущественно по департаменту Марна региона Шампань — Арденны. Часть русла находится в департаменте Эна региона Пикардия.Река берёт начало в небольшой роще близ населённого пункта Сом-Вель, на высоте 153 м над уровнем моря[2].На правом берегу расположен город Реймс. В общей сложности на берегах реки находятся 52 населённых пункта[1].Притоки: Ардр."
     },
          {
        "name": "Вельмо ",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D0%BB%D1%8C%D0%BC%D0%BE_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "504 км",
        "pool": "33 800 км²",
        "consumption": "224,91 м³/с (187 км от устья)",
        "head": " ",
        "estuary": "Подкаменная Тунгуска",
        "location": " Россия",
        "info": "Вельмо́ — река в Красноярском крае России, левый приток Подкаменной Тунгуски.Длина реки — 504 км, площадь водосборного бассейна — 33 800 км². Средний расход воды — 224,91 м³/с.[источник не указан 603 дня] Судоходна до впадения главного притока — реки Теи (261 км, левый). В бассейне реки находятся около 300 озёр.Берёт начало и протекает по Среднесибирскому плоскогорью. Впадает в Подкаменную Тунгуску в 282 км от её устья.Основное питание — снеговое. Замерзает в октябре — ноябре, вскрывается в апреле — мае. "
     },
       {
        "name": "Велью ",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D0%BB%D1%8C%D1%8E_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "173 км",
        "pool": "4110 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Печора",
        "location": " Россия",
        "info": "Велью (Вель) — река в Республике Коми, левый приток реки Печора.Длина реки — 173 км, площадь водосборного бассейна — 4110 км². Питание смешанное, с преобладанием снегового.Крупнейшие притоки — Малый Тебук, Большой Тебук, Нибель (правые).Велью берёт начало на Айювинской возвышенностиРусло реки сильно извилистое, течение медленное. Берега почти на всём протяжении реки представляют собой заболоченный таёжный лес. Верховья необитаемы, в среднем течении в месте, где реку пересекает автодорога Ухта — Вуктыл расположен посёлок Велью, в нижнем течении на берегах несколько деревень.Велью впадает в Печору на 1288 км от устья выше посёлка Нефтепечорск. Ранее по реке проводился сплав леса.По данным государственного водного реестра России относится к Двинско-Печорскому бассейновому округу, водохозяйственный участок реки — Печора от истока до водомерного поста у посёлка Шердино, речной подбассейн реки — Бассейны притоков Печоры до впадения Усы. Речной бассейн реки — Печора."
     },
                            {
        "name": "Вентуари",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D0%BD%D1%82%D1%83%D0%B0%D1%80%D0%B8",
        "image": "undefined",
        "length": "600 км",
        "pool": "42 000 км²",
        "consumption": "3488 м³/с (устье)",
        "head": " ",
        "estuary": "Ориноко",
        "location": " Венесуэла",
        "info": "Вентуари (исп. Río Ventuari) — река в Венесуэле, правый приток Ориноко. Протекает по территории провинции Амасонас. Длина реки около 600 километров. Площадь водосборного бассейна — 42000 км². Среднегодовой расход воды в устье — 3488 м³/с.Начинается на северном склоне гор Серра-Парима в центре Гвианского нагорья у подножия горы Масивари при слиянии вблизи деревни Кабадисканья речек Антабаре и Хеуэте. Течёт сначала на северо-запад через населённые пункты Какури и Ла-Сейба, затем выходит на равнину и поворачивает на юг. В низовьях течёт на запад и впадает в Ориноко около города Санта-Барбара на территории национального парка Явакана. Бассейн реки покрыт лесами и слабо заселён. Ширина реки в нижнем течении — свыше 400 метров.Река несудоходна из-за быстрого течения и множества порогов. В среднем течении реки — водопады Осо и Кенке. С апреля по октябрь на реке наблюдаются паводки.Основные притоки — Гуапуче (пр), Пару (лв), Марьета (пр), Манапьяре (пр), Ача (лв).В реке отмечено обитание 470 видов рыб из 225 родов 44 семейств 10 отрядов. Отряды с наибольшим числом семейств — Харацинообразные (14), Сомообразные (11), Гимнотообразные (6) и Окунеобразные (4). 254 вида, составляющих 54 % от всего многообразия, относятся к харацинообразным, 131 (27,87 %) — к сомообразным."
     },
            {
        "name": "Вепш",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D0%BF%D1%88",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/PL_Wieprz_2.jpg/250px-PL_Wieprz_2.jpg",
        "length": "328 км",
        "pool": "10 700 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Висла",
        "location": " Польша",
        "info": "Вепш (польск. Wieprz, в переводе — «боров») — река в Польше, правый приток Вислы. Длина — 328 километров, это девятая по протяжённости река Польши. Площадь водосборного бассейна — 10 700 км². Весной на реке случается половодье, а летом — межень.Начинается на восточных склонах возвышенности Расточье, вблизи от города Томашув-Любельский; в верхнем течении течёт по Люблинской возвышенности, затем протекает по заболоченной низменности, а впадает в Вислу возле Демблина. Вепш соединён с рекой Кшна 140-километровым каналом Вепш — Кшна, построенным в 1954—1961 годах.Протекает по территории Розточаньского национального парка и Надвепшанского регионального ландшафтного парка. В долине Вепша разнообразная фауна, в том числе имеется популяция выдр и бобров.В середине XIX века на реке, близ крепости Ивангорода, построил деревянный мост польский инженер Ф. Панцер. Мост интересен по значительным размерам арки и по хорошо обдуманным деталям. В то время обыкновенные пролёты деревянных арок редко превышали 25 сажен, а вепржский мост состоит из одной арки пролётом в 36½ сажен. Местные обстоятельства, препятствовавшие значительному возвышению мостовой настилки, вынудили строителя избрать систему висячего моста, при которой было весьма затруднительно придать надлежащую устойчивость деревянным формам, но Панцер успешно преодолел эти трудности. Орден Святого Владимира степени стал наградой талантливому строителю за этот проект."
     },
                  {
        "name": "Верде (приток Солта)",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D1%80%D0%B4%D0%B5_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A1%D0%BE%D0%BB%D1%82%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Verde_River-Arizona.jpg/250px-Verde_River-Arizona.jpg",
        "length": "274 км",
        "pool": "17 133 км²",
        "consumption": "17 м³/с",
        "head": " ",
        "estuary": "Солт",
        "location": " США",
        "info": "Верде (англ. Verde River) — река в центральной части штата Аризона, США. Правый приток реки Солт, которая в свою очередь является притоком реки Хила. Длина составляет около 270 км; площадь водосборного бассейна — 17 213 км²; средний расход воды в устье — 17 м³/с.На реке Верде имеется 2 водохранилища: Хорсшу и Барлетт. Протекает через такие города как Камп-Верде, Кларкдейл и Коттонвуд. Впадает в реку Солт вблизи города Фаунтин-Хиллс.В 2017 году вышла из берегов. Несколько погибших."
     },
     {
        "name": "Верджин",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D1%80%D0%B4%D0%B6%D0%B8%D0%BD",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Virgin_River_6.jpg/250px-Virgin_River_6.jpg",
        "length": "261 км",
        "pool": "31 727 км²",
        "consumption": "5 м³/с",
        "head": " ",
        "estuary": "Колорадо",
        "location": " США",
        "info": "Верджин (англ. Virgin River) — река на юго-западе штата Юта, северо-западе штата Аризона и юго-востоке штата Невада, США. Приток реки Колорадо. Длина составляет около 261 км; площадь бассейна — около 31 727 км². Средний расход воды — около 5 м³/с.Берёт начало на юго-западе штата Юта, на территории национального леса Дикси, к северу от национального парка Зайон, как слияние рек Ист-Форк и Норт-Форк. Течёт в юго-западном направлении. Около города Сент-Джордж принимает правый приток Санта-Клара. Течёт через северо-восточный угол Аризоны, протекая через города Бивер-Дам и Литлфилд, пересекает границу Невады близ города Мескит и впадает в Колорадо в районе водохранилища Мид, примерно в 64 км к востоку от Лас-Вегаса. Нижние 48 км своего течения река формирует северный рукав водохранилища Мид. Высота устья — 367 м над уровнем моря.[источник не указан 434 дня]"
     },
       {
        "name": "Вердон ",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D1%80%D0%B4%D0%BE%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Gorges_du_Verdon_River_from_Bottom_0364.jpg/250px-Gorges_du_Verdon_River_from_Bottom_0364.jpg",
        "length": "176 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Дюранс",
        "location": " Франция",
        "info": "Вердо́н (фр. Verdon) — река в юго-восточной части Франции, левый приток реки Дюранс (бассейн Роны). Длина — 176 км.Берёт начало в Прованских Альпах; течёт по живописным ущельям, входящим в состав национального парка Меркантур. Осенне-зимние и весенние паводки. В верхнем течении имеются водохранилища и ГЭС; в нижнем используется для орошения."
     },
           {
        "name": "Верёвочная",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D1%80%D1%91%D0%B2%D0%BE%D1%87%D0%BD%D0%B0%D1%8F",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Viriovchyna_vpadinna_Koshova.jpg/250px-Viriovchyna_vpadinna_Koshova.jpg",
        "length": "115 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Кошевая",
        "location": " Украина",
        "info": "Верёвочная (устар. балка Веревченая; река и балка Веревчина; укр. Веревчина) — река на юге Украины, в Николаевской и Херсонской областях. Впадает в протоку Днепра — Кошевую.Верёвочная берёт своё начало у села Новоивановка Баштанского района Николаевской области. Длина реки 115 км (в пределах Херсонской области — 53 км), ширина русла от 6 до 20 метров, ширина поймы 100—800 метров. У села Новопетровка реку пересекает Ингулецкий оросительный канал, Верёвочная проходит под руслом канала в подземном коллекторе. Река протекает по Баштанскому, Снигирёвском районах Николаевской области, Белозерском районе Херсонской области, а также в Днепровскому, Суворовскому и Корабельном районам города Херсона.Река Верёвочная протекает в следующих населённых пунктах: Новоивановка, Киевское, Явкино, Червоный Став Баштанского района, Покровское, Червоная Долина, Широкое, Любино, Новопетровка, Любимовка, Калиновка, Бурхановка, Першотравневое, Гуляйгордок Снигирёвского района, Загоряновка, Схидное, Мирошниковка, Музыковка, Висунцы, Чернобаевка Белозёрского района, Зеленовка Днепровского района города Херсона, Степановка, микрорайон Северный Суворовского района города Херсона, а также микрорайон Шуменский, посёлки Зимовник и Камышаны Корабельного района города Херсона."
     },
                      {
        "name": "Вёрниц ",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D1%91%D1%80%D0%BD%D0%B8%D1%86_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Donauwoerth_Woernitz-1.jpg/250px-Donauwoerth_Woernitz-1.jpg",
        "length": "131,75 км",
        "pool": "1686,3 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Дунай",
        "location": " Германия",
        "info": "Вёрниц (нем. Wörnitz) — река в Германии, протекает по земле Бавария. Площадь бассейна реки составляет 1686,3 км², общая длина — 131,75 км (по другим данным — 132,5 км).Река начинается с подземного источника в Шиллингсфюрсте. Впадает в Дунай с левой стороны. От названия реки происходит название коммуны Вёрниц.В нижеприведённых таблицах представлены крупнейшие левые и правые притоки Вёрница по порядку впадения."
     },
     {
        "name": "Верра",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D1%80%D1%80%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Werra_Treffurt.JPG/250px-Werra_Treffurt.JPG",
        "length": "299,6 км",
        "pool": "5497 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Везер",
        "location": " Германия",
        "info": "Верра (нем. Werra) — река в Германии. Вместе с Фульдой образует Везер. Протекает по федеральным землям Тюрингия, Нижняя Саксония и Гессен.Длина реки — 299,6 км, площадь её водосборного бассейна — 5497 км². Река судоходна на протяжении 88 км от устья.Долина реки образует естественную границу между горами Рён и Тюрингенским лесом."
     },
        {
        "name": "Вертах ",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D1%80%D1%82%D0%B0%D1%85_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Fluss-Wertach-Augsburg.JPG/250px-Fluss-Wertach-Augsburg.JPG",
        "length": "150 км",
        "pool": "1260 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Лех",
        "location": " Германия",
        "info": "Вертах (нем. Wertach) — река на юге Германии, протекает по территории Швабии (земля Бавария). Левый приток Леха. Длина реки — 150 км. Площадь её бассейна 1260 км². Высота истока 1077 м. Высота устья 461 м.Вертах образуется слиянием небольших речек — Kaltenbrunnenbach и Eggbach. Истоки Вертаха находятся в Верхнем Алльгое. Впадает он в Лех в Аугсбурге."
     },
                     {
        "name": "Верхний Имбак",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D1%80%D1%85%D0%BD%D0%B8%D0%B9_%D0%98%D0%BC%D0%B1%D0%B0%D0%BA",
        "image": "undefined",
        "length": "157 км",
        "pool": "1600 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Енисей",
        "location": " Россия",
        "info": "Верхний Имбак (Имбак) — река в Туруханского района Красноярского края, правый приток Енисея.Исток реки находится на высоте около 92 м, течёт по болотистой низменности, длина — 157 км, площадь водосборного бассейна — 1600 км². Впадает в Енисей у села Верхнеимбатск, на расстоянии 1325 км от устья.По данным государственного водного реестра России относится к Енисейскому бассейновому округу. Код водного объекта — 17010600112116100057019."
     },
                                          {
        "name": "Верхняя Ангара",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D1%80%D1%85%D0%BD%D1%8F%D1%8F_%D0%90%D0%BD%D0%B3%D0%B0%D1%80%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Verkhnyaya_Angara.jpg/250px-Verkhnyaya_Angara.jpg",
        "length": "438 км",
        "pool": "21 400 км²",
        "consumption": "265 м³/с",
        "head": " ",
        "estuary": "Байкал",
        "location": " Россия",
        "info": "Ве́рхняя Ангара́ (бур. Дээдэ Ангар мүрэн) — река в России на севере Бурятии, вторая по полноводности после Селенги река, впадающая в Байкал. Течёт по территории Муйского и Северо-Байкальского районов.Название Ангара происходит от эвенского и бурятского анга — «пасть животного, рот», ангара — «разинутый, открытый, зияющий», то есть «раскрытая пасть», что в географической терминологии означает «устье». Иногда ангара объясняется как «расселина, ущелье».Длина — 438 км, площадь бассейна — 21 400 км². Река берёт начало на стыке Северо-Муйского и Делюн-Уранского хребтов. Течёт в юго-западном направлении. В северной оконечности Байкала устья рек Верхняя Ангара и Кичера образуют обширный мелководный залив Ангарский сор, отделённый от глубоководной части озера узкой песчаной косой острова Ярки и некоторыми другими.В верховьях река горная, быстрая, порожистая, но бо́льшую часть Верхняя Ангара течёт по заболоченной Верхнеангарской котловине и имеет равнинный характер. В низовьях судоходна. На значительном протяжении по долине реки проходит Байкало-Амурская магистраль (БАМ) — от устья Верхней Ангары до впадения в неё левого притока, реки Ангаракан, откуда БАМ идёт на восток к Северо-Муйскому тоннелю."
     },
     {
        "name": "Верхняя Анма",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D1%80%D1%85%D0%BD%D1%8F%D1%8F_%D0%90%D0%BD%D0%BC%D0%B0",
        "image": "undefined",
        "length": "123 км",
        "pool": "640 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Обь",
        "location": " Россия",
        "info": "Верхняя Анма — река в Томской области России. Устье реки находится в 2547 км по правому берегу реки Обь. Длина реки составляет 123 км, площадь водосборного бассейна — 640 км². В верхнем течении, от истока и до впадения Анги (67 км от устья), река носит название Большая Соровская. Высота истока — 113 м над уровнем моря.[источник не указан 605 дней]По данным государственного водного реестра России, относится к Верхнеобскому бассейновому округу, водохозяйственный участок реки — Обь от Новосибирского гидроузла до впадения реки Чулым, без рек Иня и Томь, речной подбассейн реки — бассейны притоков (Верхней) Оби до впадения Томи. Речной бассейн реки — (Верхняя) Обь до впадения Иртыша."
     },
          {
        "name": "Верхняя Борзя",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D1%80%D1%85%D0%BD%D1%8F%D1%8F_%D0%91%D0%BE%D1%80%D0%B7%D1%8F",
        "image": "undefined",
        "length": "153 км",
        "pool": "4040 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Аргунь",
        "location": " Россия",
        "info": "Верхняя Борзя (Талман-Борзя, Левая Борзя) — река в Забайкальском крае России, левый приток Аргуни.Исток реки располагается на юго-восточном склоне Нерчинского хребта. Длина реки составляет 153 км, площадь водосбора — 4040 км². Среднегодовой сток в устье — 0,2 км³. Несудоходна.Объекты перечислены по порядку от устья к истоку."
     },
                  {
        "name": "Верхняя Ёрга",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D1%80%D1%85%D0%BD%D1%8F%D1%8F_%D0%81%D1%80%D0%B3%D0%B0",
        "image": "undefined",
        "length": "140 км",
        "pool": "1270 км²",
        "consumption": "2,76 м³/с (82 км от устья)",
        "head": " ",
        "estuary": "Сухона",
        "location": " Россия",
        "info": "Верхняя Ёрга (Ерха) — река в России, протекает по территории Великоустюгского района Вологодской области. Устье реки находится в 53 км по левому берегу реки Сухона. Длина реки составляет 140 км, площадь водосборного бассейна — 1270 км².Исток Верхней Ёрги находится близ границы с Архангельской областью, в 4 км к северо-востоку от посёлка и одноимённой ж/д станции Ломоватка. Река течёт в верховьях на запад, затем поворачивает на юг, а в нижнем течении после устья Кандарсы течёт на юго-восток. Река принимает многочисленные притоки, обеспечивающие сток из обширных болот региона. Крупнейшие притоки — Кундерза и Кандарса (правые); Арбеж и Нартица (левые). Русло — извилистое.Большая часть течения реки расположена в ненаселённом лесе. В среднем течении в районе впадения Алешины и Нартицы на берегах два жилых населённых пункта — посёлок Пихтово справа от реки и деревня Илатовская слева (оба — Ломоватское сельское поселение). В нижнем течении около впадения в Сухону — покинутая деревня Тишино и деревня Большое Вострое (1 постоянный житель).Притоки перечислены по порядку от устья к истоку.По данным наблюдений с 1977 по 1985 годы среднегодовой расход воды в районе посёлка Пихтово (82 км от устья) составляет 2,76 м³/с, наибольший приходится на май, наименьший — на период с января по март."
     },
                    {
        "name": "Верхняя Ларба",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D1%80%D1%85%D0%BD%D1%8F%D1%8F_%D0%9B%D0%B0%D1%80%D0%B1%D0%B0",
        "image": "undefined",
        "length": "175 км",
        "pool": "2960 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Нюкжа",
        "location": " Россия",
        "info": "Ве́рхняя Ла́рба — река в Амурской области России, правый приток реки Нюкжи в среднем течении. Начало берёт на южных склонах Станового хребта, протекает по территории Тындинского района.С эвенкийского языка лирби — густо, много; др. вариант: ларба — рогатулина.Длина реки составляет 175 км. Площадь водосборного бассейна насчитывает 2960 км². Река замерзает в октябре и остаётся под ледяным покровом до мая. Питание снеговое и дождевое.По данным геоинформационной системы водохозяйственного районирования территории РФ, подготовленной Федеральным агентством водных ресурсов относится к Ленскому бассейновому округу.В верхнем течении рельеф среднегорный интенсивно расчленённый; абсолютные отметки высот 720—1492 м, относительные превышения 150—440 м. В пределах от истока 40 км река имеет широкую долину (150—1300 м), поперечный профиль долины асимметричный, с крутым левым бортом, правый склон террасирован.В среднем и нижнем течении долина ещё более расширяется, появляется заболоченная пойма со множеством озёр. Русло становится очень извилистым, часто разбивается на протоки. Течение умеренное. Основной приток слева — Бикин, или Берестин (95 км).(расстояние от устья)Долина не заселена, берега реки заняты глухой тайгой. У истока находится заброшенная база Апсаканской партии, на которой производились геологоразведочные работы. Берега реки заселены ближе к устью, здесь расположены посёлки:"
     },
     {
        "name": "Верхняя Лупья",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D1%80%D1%85%D0%BD%D1%8F%D1%8F_%D0%9B%D1%83%D0%BF%D1%8C%D1%8F",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/%D0%92%D0%B5%D1%80%D1%85%D0%BD%D1%8F%D1%8F_%D0%9B%D1%83%D0%BF%D1%8C%D1%8F.jpg/250px-%D0%92%D0%B5%D1%80%D1%85%D0%BD%D1%8F%D1%8F_%D0%9B%D1%83%D0%BF%D1%8C%D1%8F.jpg",
        "length": "175 км",
        "pool": "1520 км²",
        "consumption": "undefined",
        "head": "Верхняя Лупья",
        "estuary": "Вычегда",
        "location": " Россия",
        "info": "Ве́рхняя Лупья (Лупья, Лунья) — река в России, протекает по Усть-Вымскому району Республики Коми и Ленском районе Архангельской области. Является левым притоком реки Вычегда (бассейн Северной Двины).Устье реки находится в 99 км от устья Вычегды по левому берегу. Река вытекает из болота Верхняя Лупья на востоке Ленского района Архангельской области. Первые 20 км течения течёт на северо-восток, входя в пределы Республики Коми. Следующие 25 км течения река течёт по Усть-Вымскому району Республики Коми. Там река описывает большую петлю, поменяв направление течения сначала на север, а затем резко на запад. Затем Верхняя Лупья течёт на северо-запад, по территории Ленского района Архангельской области, но после посёлка Урдома меняет направление своего течения на юго-запад. Впадает в Вычегду напротив большого посёлка Литвино, у деревни Запань Лупья. Длина реки составляет 175 км, площадь водосборного бассейна — 1520 км². У посёлка 1180-й км реку пересекает железная дорога «Котлас — Микунь». Течение реки спокойное, падение и уклон невелики. Река принимает в основном левые притоки, наиболее крупные из притоков: Тыва (правый), Нянда (правый). В советское время река активно использовалась для лесосплава. В реке водятся такие виды рыб, как хариус, окунь, щука, плотва, язь и другие."
     },
                                       {
        "name": "Верхняя Таймыра",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D1%80%D1%85%D0%BD%D1%8F%D1%8F_%D0%A2%D0%B0%D0%B9%D0%BC%D1%8B%D1%80%D0%B0",
        "image": "undefined",
        "length": "499 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "слияние рек: Первая Голова Таймыры и Вторая Голова Таймыры",
        "estuary": "Таймыр",
        "location": " Россия",
        "info": "Верхняя Таймыра — река в Красноярском крае России на полуострове Таймыр. Одна из самых северных рек мира. Берёт начало в горах Бырранга, впадает в озеро Таймыр.На реке расположено водно-болотное угодье международного значения — заказник Горбита.Верхняя Таймыра берёт своё начало в горах Бырранга, при слиянии двух маленьких горных рек — Первой Головы Таймыры и Второй Головы Таймыры. В верховьях течёт по гористой местности (в глубоком ущелье, проходит через узкие озёра), в среднем и нижнем течении равнинная река — в ней отсутствуют пороги, течение спокойное.Длина реки — 499 км (от истока Первой Головы Таймыры — 567 км), глубина — от 9 до 20 метров, ширина — до 900 метров. Течёт с запада на восток до впадения в озеро Таймыр. В бассейн Верхней Таймыры входит Щель-Озеро.Питание преимущественно снеговое. Река с середины сентября по июнь скована льдом. С ноября по май сток менее 8 % годового. Впадает в Ледяную бухту озера Таймыр, образуя дельту. Река протекает в зоне арктических и мохово-лишайниковых тундр. В реке водятся омуль, муксун, нельма, ряпушка, арктический голец.Притоки: справа — Аятари, Луктах, Горбита, Логата; слева — Кыйда, Дептумала, Фадьюкуда, Большая Боотанкага.Верхняя Таймыра была открыта Н. Н. Коломейцевым, участником Русской полярной экспедиции, искавшим, но не нашедшим тогда устье Нижней Таймыры. Найденная река была названа в честь Коломейцева его именем. Летом 1929 года Верхнюю Таймыру исследовал Н. Н. Урванцев."
     },
                                                                              {
        "name": "Ветлуга ",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D1%82%D0%BB%D1%83%D0%B3%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/%D0%92%D0%B5%D1%82%D0%BB%D1%83%D0%B3%D0%B0_%D0%B1%D0%BB%D0%B8%D0%B7_%D0%A8%D0%B0%D1%80%D1%8C%D0%B8.jpg/250px-%D0%92%D0%B5%D1%82%D0%BB%D1%83%D0%B3%D0%B0_%D0%B1%D0%BB%D0%B8%D0%B7_%D0%A8%D0%B0%D1%80%D1%8C%D0%B8.jpg",
        "length": "889 км",
        "pool": "39 400 км²",
        "consumption": "255 м³/с",
        "head": " ",
        "estuary": "Чебоксарское водохранилище",
        "location": " Россия",
        "info": "Ветлу́га (устар. Ве́тлуга) — река в центре Европейской части России, левый приток Волги. Протекает по территории Кировской, Костромской и Нижегородской областей и республики Марий Эл.Длина реки — 889 км, площадь водосборного бассейна — 39 400 км². Среднегодовой расход воды — в низовье 255 м³/с. Левый берег низменный, правый высокий (до 100 м) сложен мергелями и песчаниками. Течение медленное, много стариц. Притоки: Нея, Большая Какша, Уста, Юронга — левые; Вохма, Люнда — правые. Питание снеговое. Ледостав с начала ноября по апрель. Сплавная. Во время половодья судоходна на 700 км от устья. Высота истока около 170 м над уровнем моря.На реке расположены города Шарья и Ветлуга, посёлки городского типа Варнавино, Ветлужский (Костромская область), Ветлужский (Нижегородская область), Красные Баки, Воскресенское. На берегу Чебоксарского водохранилища, при впадении Ветлуги находится посёлок городского типа Юрино.Жители Поветлужья называют себя «ветлугаи» (ед. число «ветлугай») или «ветлужанами». Второй вариант более распространён, первый практически не встречается.Название реки было положено в наименование ныне вымершего ветлугазавра, остатки которого были впервые найдены Анатолием Николаевичем Рябининым на берегу Ветлуги. В бассейне реки Ветлуги вулканический туф из вятского яруса пермского периода датирован возрастом 253,95 ± 0,06 млн лет назад."
     },
                    {
        "name": "Ветьма",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B5%D1%82%D1%8C%D0%BC%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/%D0%96%D0%B5%D0%BB%D0%B5%D0%B7%D0%BD%D0%BE%D0%B4%D0%BE%D1%80%D0%BE%D0%B6%D0%BD%D1%8B%D0%B9_%D0%BC%D0%BE%D1%81%D1%82_%D1%87%D0%B5%D1%80%D0%B5%D0%B7_%D1%80%D0%B5%D0%BA%D1%83_%D0%92%D0%B5%D1%82%D1%8C%D0%BC%D1%83.jpg/250px-%D0%96%D0%B5%D0%BB%D0%B5%D0%B7%D0%BD%D0%BE%D0%B4%D0%BE%D1%80%D0%BE%D0%B6%D0%BD%D1%8B%D0%B9_%D0%BC%D0%BE%D1%81%D1%82_%D1%87%D0%B5%D1%80%D0%B5%D0%B7_%D1%80%D0%B5%D0%BA%D1%83_%D0%92%D0%B5%D1%82%D1%8C%D0%BC%D1%83.jpg",
        "length": "112 км",
        "pool": "1456 км²",
        "consumption": "до 16 м³/с",
        "head": " ",
        "estuary": "Десна",
        "location": " Россия",
        "info": "Ве́тьма — река, протекающая в Европейской части России, левый приток Десны. Длина реки — 112 км.Ветьма берёт начало в Куйбышевском районе Калужской области. Основное течение реки проходит преимущественно по лесистой местности, кроме верхней части, от Верхних Падерок до Бутчино, где река течёт по полям в открытых берегах. Ширина реки в среднем течении 12-15 м, глубина от 1,5 до 3 м. Берега и дно преимущественно песчаные. Берега сложены из меловых образований, в виде двух ярусов. Верхний — меловой, глинистый мергель и белый мел; нижний — зелёные и тёмные пески с фосфоритами, ещё ниже залегают темноцветные глинистые пески, песчаные глины и глинистые сланцы. Пласты фосфоритов выходят, например, у реки Десны и у Хотни, на восток.Основные притоки Ветьмы: с левой стороны — Бытошка, Волынь, Ивоток, Березна; с правой — небольшие ручьи Немерка и Хапиловка.В XIX веке река использовалась весной, после половодья, для сплава леса и доставки товаров. Плоты и плоскодонные суда проходили до Киева с большим грузом чугунных и железных изделий. Сейчас хозяйственного значения не имеет, как водная артерия используется только туристами-байдарочниками.Основные поселения по реке: Ивашковичи, Бутчино, Бытошь, Ходиловичи, Гришина Слобода."
     },
                   {
        "name": "Виар",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%B0%D1%80",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/R%C3%ADo_Viar.jpg/250px-R%C3%ADo_Viar.jpg",
        "length": "124 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Гвадалквивир",
        "location": " Испания",
        "info": "Виар (исп. Río Viar) — река на юге Испании в Андалусии.Исток реки находится на северном склоне Сьерра-Морена, к югу от Монестерио. Является правобережным притоком реки Гвадалквивир. Длина реки составляет 124 км. В нижнем течении используется для орошения. В верхнем течении река протекает через водохранилище Пинтадо, ниже которого протекает в глубоком ущелье."
     },
     {
        "name": "Виахту ",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%B0%D1%85%D1%82%D1%83_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "131 км",
        "pool": "783 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Татарский пролив",
        "location": " Россия",
        "info": "Виахту — река на острове Сахалин.Протекает по территории Александровск-Сахалинского района Сахалинской области. Берёт начало на западном склоне Камышового хребта. Впадает в залив Виахту Татарского пролива. Длина реки — 131 км. Площадь её водосборного бассейна 783 км². Главными притоками являются реки Дегтярка, Виахтакан и Грабчиха.Название в переводе с нивхского означает «залив морских пиявок» (или «озеро с морскими моллюсками»).По данным государственного водного реестра России относится к Амурскому бассейновому округу.Код объекта в государственном водном реестре — 20050000212118300009046."
     },
     {
        "name": "Виви ",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%B2%D0%B8_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "426 км",
        "pool": "26 800 км²",
        "consumption": "ок. 200 м³/с",
        "head": "Виви",
        "estuary": "Нижняя Тунгуска",
        "location": " Россия",
        "info": "Ви́ви — река в Сибири, в Эвенкийском районе Красноярского края России, правый приток Нижней Тунгуски, принадлежит бассейну Енисея. Протекает по плато Путорана Среднесибирского плоскогорья.Площадь бассейна — 26 800 км², длина — 426 км. 3-й по площади бассейна (после Кочечума и Таймуры) и 7-й по длине приток Нижней Тунгуски.Основное питание снеговое. Берёт начало из озера Виви и протекает в пределах Среднесибирского плоскогорья. Верхнее течение реки располагается в лесотундровой зоне.Река протекает в широкой долине и в верхней части имеет равнинный характер, сильно меандрирует и соприкасается со множественными старицами, похожими на крупные озера. В бассейне Виви большое количество мелких озёр площадью около 268 км².В нижней части течение бурное, река принимает горный характер и изобилует порогами и перекатами. Здесь в период весеннего половодья на отдельных участках русла возникают устойчивые водовороты, имеющие местное название корчага.Населённые пункты на берегах реки отсутствуют, из построек встречаются охотничьи домики.В бассейне реки находится один из крупнейших метеоритных кратеров — Логанча."
     },
       {
        "name": "Вига",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%B3%D0%B0",
        "image": "undefined",
        "length": "175 км",
        "pool": "3360 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Унжа",
        "location": " Россия",
        "info": "Ви́га — река на севере европейской части России, в Костромской области; правый приток Унжи.Длина — 175 км, площадь водосборного бассейна — 3360 км².Крупные притоки — Ида, Вохтома (левые), Мелша, Кисть (правые).Вига начинается в болотах Чухломского района Костромской области возле деревни Курьяново к югу от Чухломы.На протяжении всего течения Вига течёт по равнинной местности, по берегам хвойный и смешанный лес. Русло мелкое и очень извилистое, в межень обнажаются каменистые перекаты и мели. Вига известна своим сильным половодьем, на отдельных участках подъём воды весной достигает 10 метров.Около устья Вига протекает по границе между Бабушкинским районом Вологодской области и Кологривским районом Костромской области.Вига впадает в Унжу в безлюдной лесной местности рядом с границей Вологодской области. Высота устья — 117 м над уровнем моря.[источник не указан 2034 дня]На реке расположен крупный посёлок Судай Чухломского района Костромской области. До начала 1990-х годов по реке проводился лесосплав.(указано расстояние от устья)"
     },
      {
        "name": "Вид ",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%B4_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/WiedRo%C3%9F2.jpg/250px-WiedRo%C3%9F2.jpg",
        "length": "102 км",
        "pool": "770,8 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Рейн",
        "location": " Германия",
        "info": "Вид (нем. Wied) — река в Германии, протекает по земле Рейнланд-Пфальц. Правый приток Рейна. Площадь бассейна реки составляет 770,8 км². Общая длина реки 102 км. Высота истока 463 м. Высота устья 63 м.Берёт начало в западной части Вестервальда, из маленького озера близ Дрейфельдена и, образуя множество изгибов, впадает в Рейн справа близ Ирлиха, ниже Нейвида. В Вид слева впадает Хольцбах."
     },
     {
        "name": "Видава ",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%B4%D0%B0%D0%B2%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Widawa_river.jpg/250px-Widawa_river.jpg",
        "length": "103 км",
        "pool": "1700 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Одра",
        "location": " Польша",
        "info": "Вида́ва (польск. Widawa, нем. Weide[источник не указан 1344 дня]) — река в Польше, правый приток Одера.Длина — 103 км, площадь бассейна — 1,7 км².Истоки расположены во Взгорах Твердогорских (польск. Wzgórza Twardogórskie) на высоте 204 м. Истоками являются реки Добра, Олесница (правые истоки) и Гранична (левый исток). Устье — Одер (район около Вроцлава).[источник не указан 1344 дня]"
     },
      {
        "name": "Видзью (приток Лэпъю)",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%B4%D0%B7%D1%8C%D1%8E_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9B%D1%8D%D0%BF%D1%8A%D1%8E)",
        "image": "undefined",
        "length": "110 км",
        "pool": "866 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Лэпъю",
        "location": " Россия",
        "info": "Ви́дзью (устар. Видз-Ю) — река в России, течёт по территории Койгородского района и Сыктывдинского района Республики Коми. Устье реки находится в 17 км по правому берегу реки Лэпъю. Длина реки составляет 110 км, площадь водосборного бассейна 866 км².По данным государственного водного реестра России относится к Двинско-Печорскому бассейновому округу, водохозяйственный участок реки — Вычегда от истока до города Сыктывкар, речной подбассейн реки — Вычегда. Речной бассейн реки — Северная Двина.Код объекта в государственном водном реестре — 03020200112103000019072."
     },
                 {
        "name": "Вижай (приток Вильвы)",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%B6%D0%B0%D0%B9_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%92%D0%B8%D0%BB%D1%8C%D0%B2%D1%8B)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Vizhay_River.jpg/250px-Vizhay_River.jpg",
        "length": "125 км",
        "pool": "1080 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Вильва",
        "location": " Россия",
        "info": "Вижа́й — река в Пермском крае, левый приток Вильвы. Начинается на востоке края, западнее долины Койвы и впадает в Вильву в 28 км от её устья.Длина — 125 км, общая площадь водосбора — 1080 км², средняя высота водосбора — 375 м. Средний уклон — 2,2 м/км. Вскрывается ото льда в самом конце апреля — начале мая.Вижай — популярная река для майского сплава. Категория — II, сплавляются в основном на байдарках и катамаранах. Препятствия:"
     },
       {
        "name": "Вижас ",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%B6%D0%B0%D1%81_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "219 км",
        "pool": "3050 км²",
        "consumption": "undefined",
        "head": "Восточное Быково",
        "estuary": "Баренцево море",
        "location": " Россия",
        "info": "Ви́жас — река в Архангельской области и Ненецком автономном округе.Вытекает из небольшого озера Восточное Быково, впадает в Чёшскую губу Баренцева моря. Длина 219 км, площадь бассейна 3050 км².Питание снеговое и дождевое. Сток регулируется озёрами.Основные притоки: Берёзовка, Суханиха (левые); Кумиха (правый)."
     },
                         {
        "name": "Виктория (река, впадает в Тиморское море)",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%BA%D1%82%D0%BE%D1%80%D0%B8%D1%8F_(%D1%80%D0%B5%D0%BA%D0%B0,_%D0%B2%D0%BF%D0%B0%D0%B4%D0%B0%D0%B5%D1%82_%D0%B2_%D0%A2%D0%B8%D0%BC%D0%BE%D1%80%D1%81%D0%BA%D0%BE%D0%B5_%D0%BC%D0%BE%D1%80%D0%B5)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Victoria_River.JPG/250px-Victoria_River.JPG",
        "length": "780 км",
        "pool": "87 900 км²",
        "consumption": "162 м³/с",
        "head": " ",
        "estuary": "Тиморское море",
        "location": " Австралия",
        "info": "Викто́рия (англ. Victoria River) — самая длинная река в Северной территории (Австралия). Выделяется в отдельный регион.Река берёт своё начало в холмистой местности на высоте 370 м к северу от Хукер-Крик. Длина — 780 км, площадь водосборного бассейна — 78 000 км². Среднегодовой расход воды 140 м³/с. Впадает в залив Жозеф-Бонапарт в Тиморском море через залив Куинс-Чаннел. Судоходна на 150 км от устья.Река была впервые исследована в 1839 году британским капитаном Дж. Уикемом (англ. J. C. Wickham), который назвал её в честь британской королевы Виктории. Дальнейшее изучение реки продвигалось очень медленно: только спустя 16 лет другой путешественник Огастус Чарльз Грегори (англ. Sir Augustus Charles Gregory) исследовал эстуарий Виктории. С командой из 18 человек и нескольких учёных Грегори поднялся вверх по течению и исследовал приток Виктории, Стёртс-Крик. В 1879 году река была изучена экспедицией Александра Форреста.На берегу реки расположено несколько небольших поселений: Виктория-Ривер-Даунс, Кулиба.Бассейн реки является традиционной территорией распространения йиррамских языков: тяминтюнга и нунгали."
     },
             {
        "name": "Виледь",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%BB%D0%B5%D0%B4%D1%8C",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/%D0%92%D0%B8%D0%BB%D0%B5%D0%B4%D1%8C_2.jpg/250px-%D0%92%D0%B8%D0%BB%D0%B5%D0%B4%D1%8C_2.jpg",
        "length": "321 км",
        "pool": "5610 км²",
        "consumption": "42,7 м³/с (д. Инаевская)",
        "head": "Вилегодское болото",
        "estuary": "Вычегда",
        "location": " Россия",
        "info": "Ви́ледь — река в Ленском, Вилегодском и Котласском районах Архангельской области России, левый приток реки Вычегда (бассейн Северной Двины). Длина реки — 321 км, площадь водосбора — 5610 км².Вычегодско-Вымская летопись в 1379 году указывает[источник не указан 1247 дней]:Бассейн реки Виледь расположен в трёх субъектах Российской Федерации: Архангельской области, Республике Коми и Кировской области. Основная часть бассейна Виледи располагается на территории Архангельской области (в Республике Коми и Кировской области начинаются некоторые притоки Виледи). Виледь — главная река Вилегодского района Архангельской области.Исток реки Виледь находится на востоке Вилегодского района Архангельской области, на территории Фоминского сельского совета. В верхнем течении Виледь течёт сначала на восток, а затем резко поворачивает на север, выходя на территорию Ленского района Архангельской области. В верхнем течении берега Виледи незаселены, течение быстрое, ширина русла — до 20 м. Выйдя на территорию Ленского района, Виледь поворачивает на запад, принимая притоки Кену и Верхний Вочес. На реке Виледь на территории Ленского района расположена деревня Витюнино. Пройдя 50 км на запад, Виледь поворачивает на юг, а затем и юго-восток, образуя таким образом большую петлю. Виледь снова возвращается на территорию Вилегодского района уже довольно приличной рекой: ширина русла увеличивается до 40 м, ширина поймы — до 1 км."
     },
     {
        "name": "Вилен ",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%BB%D0%B5%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rennes_QuaiZola.jpg/250px-Rennes_QuaiZola.jpg",
        "length": "218 км",
        "pool": "9600 км²",
        "consumption": "до 1500 м³/с",
        "head": " ",
        "estuary": "Атлантический океан",
        "location": " Франция",
        "info": "Виле́н (фр. Vilaine, брет. Gwilen) — река в Бретани, на западе Франции. Длина — 218 км.Исток реки находится в департаменте Майен. Высота истока — 153 м над уровнем моря.[источник не указан 2094 дня] Вилен впадает в Атлантический океан близ городка Треигир (Tréhiguier) в департаменте Морбиан. Река Вилен — одна из наибольших, впадающих прямо в океан, её бассейн — 9600 км²[источник не указан 2037 дней]; в своём верховье она входит в соединительную водную систему между Сен-Мало и Ренном; её главный приток (правый) — река Ульт (150 км). Полуостров Геранд разделяет устья Вилен и Луары.Река протекает через 4 департамента: Майенн, Иль и Вилен, Луара Атлантическая и Морбиан и 4 основных города: Ренн, Витре, Редон и Ла-Рош-Бернар.Около Витре были построены 3 дамбы для избежания наводнений, питьевого водоснабжения и зон отдыха:Расход воды в реке колеблется от 2 до 1500 м³/с. Питание преимущественно дождевое.Вилен является частью системы Бритонских каналов. От Ренна до Атлантического океана река судоходна для небольших судов."
     },
     {
        "name": "Вилия",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%BB%D0%B8%D1%8F",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Neris_river_in_Vilnius.jpg/250px-Neris_river_in_Vilnius.jpg",
        "length": "510 км",
        "pool": "24 942,3 км²",
        "consumption": "182 м³/с",
        "head": " ",
        "estuary": "Неман",
        "location": "undefined",
        "info": "Ви́лия (белор. Вілія; польск. Wilia), или Нярис (лит. Neris), — река в Белоруссии и Литве, правый и наиболее длинный приток Немана (Нямунаса). Длина реки — 510 км, из них 228 км по территории Литвы, её водосборный бассейн — 24 942,3 км², из них в Литве 13 849,6 км² (56 %).Согласно Казимерасу Буге, на которого ссылается исследователь литовской топонимики Александрас Ванагас, гидроним — балтского происхождения. Указывается, что на территории Литвы есть две реки с названием Vilija, а также ряд гидронимов с корнем Vil-. В нижнем течении литовским населением называется Neris, однако автохтонным литовскоязычным населением верхнего течения Вилии (Гервяты) река называлась Veilia (Вяйля́). Распространены гидронимы Вилия/Велья в бассейне Десны и Припяти. Эти гидронимы польский лингвист Е. Налепа также отнес к балтским, учитывая возможность вариации vel-: vel-. Выдвинута гипотеза о «демонологическом» происхождении названия Вилия, связывая лит. vėlė «души умерших», velnias «чёрт». Я. Отрембский считал, что выводить название Вилии следует от лит. vilnis «волна».В. Вайткявичюс, рассматривая вопрос о феномене называния одной реки двумя названиями Neris-Вилия, рассматривает связь с названием озера Нарочь (литовское звучание — Narutis). Из Нарочи вытекает река Нарочанка, которая в некоторых случаях могла считаться верхним течением реки Neris-Вилия. Тогда как вдоль реки Вилия, перед впадением в неё Нарочанки, имеются два топонима Вилейка, связанные с гидронимом Вилия. В. Вайткявичюс указывает, что в районе впадения Нарочанки в Вилию проходила граница между археологическими культурами восточнолитовских курганов и банцеровской."
     },
               {
        "name": "Вильва (приток Усьвы)",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%BB%D1%8C%D0%B2%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A3%D1%81%D1%8C%D0%B2%D1%8B)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Vilva_River.jpg/250px-Vilva_River.jpg",
        "length": "170 км",
        "pool": "3020 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Усьва",
        "location": " Россия",
        "info": "Ви́льва (от коми-перм. «новая вода») — река в Пермском крае, левый приток Усьвы. Начитается на западных отрогах Уральского хребта, на востоке края возле границы Свердловской области. В верховьях река — горного типа, ниже равнинного. Питание реки преимущественно — снеговое. Течёт в западном и юго-западном направлении. Протекает по территории Гремячинского, Горнозаводского и Чусовского районов. Впадает в Усьву в четырёх километрах от устья на территории города Чусового.Длина — 170 км, общая площадь водосбора — 3020 км², средняя высота водосбора — 387 м. Средний уклон — 2 м/км.Основные притоки:Второстепенный приток:"
     },
     {
        "name": "Вильва (приток Яйвы)",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%BB%D1%8C%D0%B2%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%AF%D0%B9%D0%B2%D1%8B)",
        "image": "undefined",
        "length": "107 км",
        "pool": "1180 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Яйва",
        "location": " Россия",
        "info": "Ви́льва — река в Пермском крае, левый приток Яйвы, в которую впадает ниже посёлка Яйва. Длина — 107 км, общая площадь водосбора — 1180 км², средняя высота водосбора — 260 метра. Средний уклон — 0,9 м/км. Высота устья — 125,2 м над уровнем моря.[источник не указан 596 дней]Исток реки в лесном массиве в 15 км к западу от посёлка Углеуральский. Исток и верховья находится в Губахинском районе, в среднем течении река некоторое время образует границу Кизеловского района и Александровского района, затем перетекает в Александровский район, где и проходит большая часть течения. Генеральное направление течения — север и северо-запад. Большая часть течения проходит по тайге. Крупнейшие населённые пункты на реке — посёлки Всеволодо-Вильва (среднее течение) и Яйва (устье). Кроме них в среднем течении на реке стоят деревни Ключи, Башмаки, Усть-Лытва и Малая Вильва. Впадает в Яйву чуть ниже села Яйва. Ширина реки в нижнем течении около 30 метров.Река загрязнена стоками кислых вод из шахт Кизеловского угольного бассейна.По данным государственного водного реестра России относится к Камскому бассейновому округу, водохозяйственный участок реки — Кама от города Березники до Камского гидроузла, без реки Косьва (от истока до Широковского гидроузла), Чусовая и Сылва, речной подбассейн реки — бассейны притоков Камы до впадения Белой. Речной бассейн реки — Кама."
     },
       {
        "name": "Вилюй",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%BB%D1%8E%D0%B9",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/%D0%92%D0%B8%D0%BB%D1%8E%D0%B9%D1%81%D0%BA%D0%B8%D0%B5_%D0%BF%D0%BE%D1%80%D0%BE%D0%B3%D0%B8.jpg/250px-%D0%92%D0%B8%D0%BB%D1%8E%D0%B9%D1%81%D0%BA%D0%B8%D0%B5_%D0%BF%D0%BE%D1%80%D0%BE%D0%B3%D0%B8.jpg",
        "length": "2650 км",
        "pool": "454 000 км²",
        "consumption": "1480 м³/с (122 км от устья)",
        "head": " ",
        "estuary": "Лена",
        "location": " Россия",
        "info": "Вилю́й (якут. Бүлүү) — река в России. Протекает по территории Красноярского края и Якутии. Самый длинный приток Лены и крупнейший из её левых притоков. Таким образом, является вторым по величине её притоком после Алдана. Длина составляет 2650 км, площадь бассейна — 454 000 км², а годовой сток — 46,2 км³.Истоки реки расположены на Вилюйском плато Среднесибирского плоскогорья, невдалеке от рек бассейна Нижней Тунгуски. Верхнее течение реки направлено с севера на юг, затем, приняв текущую ему навстречу Чону, Вилюй резко поворачивает на восток и сохраняет направление, близкое к широтному, до самого устья (севернее Сангара), в одном месте большой и крутой излучиной выгибаясь к югу (Сунтарская излучина). В верховьях пересекает болотисто-озёрную равнину, ниже течёт в области развития траппов; здесь долина горного характера с каньонообразными сужениями (до 160 м), крайне извилиста. Склоны обрывистые, покрытые лесом; в русле имеются пороги. От посёлка Чернышевский до устья реки Чиркуо входит в состав водохранилища Вилюйской ГЭС (дала ток в 1967). Фундаментом гидроэлектростанции служат скалы порога Улахан-Хана. Воды водохранилища, подпираемые этой плотиной растянулись вверх по долине реки на 400 км. Для строителей и эксплуатационников ГЭС был построен посёлок Чернышевский. В 140 км ниже от него на пороге Аччыгый-Хана построена новая Светлинская ГЭС."
     },
            {
        "name": "Виляшчай",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%BB%D1%8F%D1%88%D1%87%D0%B0%D0%B9",
        "image": "undefined",
        "length": "106 км",
        "pool": "935 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Каспийское море",
        "location": " Азербайджан",
        "info": "Виляшчай (азерб. Viləşçay, тал. Виләшә ру) — горная река в Азербайджане. Впадает в Каспийское море. Длина — 106 км. Площадь водосборного бассейна — 935 км².Основное питание снеговыми и дождевыми водами. Используется для орошения, на реке построен ряд водохранилищ. Является самой длинной и полноводной рекой Ярдымлинского района.Река богата рыбными ресурсами, развито рыболовство."
     },
             {
        "name": "Виннипег ",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%BD%D0%BD%D0%B8%D0%BF%D0%B5%D0%B3_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Lac_du_Bonnet_MB_2.jpg/250px-Lac_du_Bonnet_MB_2.jpg",
        "length": "320 км",
        "pool": "135 800 км²",
        "consumption": "undefined",
        "head": "Лесное",
        "estuary": "Виннипег",
        "location": " Канада",
        "info": "Виннипег (англ. Winnipeg River) — река в Канаде.Река Виннипег берёт начало из северной оконечности Лесного озера на юго-западе провинции Онтарио, впадает в юго-восточную часть озера Виннипег в провинции Манитоба чуть севернее Пайн-Фолс. Длина реки 813 км (от истока Firesteel River), площадь бассейна 135 800 км², из которых 29 000 км² — в северной Миннесоте (США), 106 500 км² — в Канаде. Длина собственно реки Виннипег составляет 320 км. Населённые пункты на реке: Панава, Грейт-Фолс, Пайн-Фолс.Река в течение тысячелетий использовалась местными индейцами в качестве транспортной артерии между Лесным озером и озером Виннипег. После «отрытия» реки Жаном-Батистом де Ла Верандри в 1733 году река использовалась для перевозки мехов и других грузов как Северо-Западной компанией, так и Компанией Гудзонова залива, и та и другая компания строила вдоль реки торговые посты вплоть до их объединения в 1821 году.В настоящее время на реке построено 7 гидроэлектростанций (шесть в Манитобе и одна в Онтарио). Когда-то Виннипег была очень бурной и коварной рекой, известный путешественник Александр Маккензи называл её «белой рекой» из-за покрытых белой пеной порогов (одних волоков на реке было больше 30), ныне спокойно несёт свои воды в одноимённое озеро."
     },
             {
        "name": "Вирвите",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D1%80%D0%B2%D0%B8%D1%82%D0%B5",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Virvyte_resize.jpg/250px-Virvyte_resize.jpg",
        "length": "131,1 км",
        "pool": "1144 км²",
        "consumption": "undefined",
        "head": "Биржулис",
        "estuary": "Вента",
        "location": " Литва",
        "info": "Вирвите (Вирвичя, Вирвича, Вирвита; лит. Virvyčia, Virvytė) — река на северо-западе Литвы, левый приток Венты.Вытекает из озера Биржулис в Тельшяйском районе и протекает с юга на север через деревню Каунатава, местечко Тришкяй и у деревни Гиволяй впадает в Венту. Считается наиболее богатой рыбой рекой в Литве. Отличается своей извилистостью, глубиной долины и стремительностью течения (разница между высотой у истоков и устья составляет 112 м). Протяжённость реки — 131,1 км, площадь бассейна — 1144 км².Название реки (в варианте Вирвите) носят этнографический ансамбль, детский лагерь отдыха.Название реки (в варианте Вирвичя) использовался как коминтерновский псевдоним Саломеи Нерис."
     },
                      {
        "name": "Висим (приток Северной Сосьвы)",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D1%81%D0%B8%D0%BC_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A1%D0%B5%D0%B2%D0%B5%D1%80%D0%BD%D0%BE%D0%B9_%D0%A1%D0%BE%D1%81%D1%8C%D0%B2%D1%8B)",
        "image": "undefined",
        "length": "214 км",
        "pool": "4220 км²",
        "consumption": "undefined",
        "head": "слияние рек: Большой Висим и Средний Висим",
        "estuary": "Северная Сосьва",
        "location": " Россия",
        "info": "Виси́м (также Висум) — река в России, протекает по Берёзовскому району Ханты-Мансийского автономного округа. Образуется слиянием рек Большой Висим и Средний Висим. Устье реки находится в 552 км по правому берегу Северной Сосьвы. Длина — 214 км, площадь водосборного бассейна — 4220 км². Крупнейший приток — река Хура.По данным государственного водного реестра России относится к Нижнеобскому бассейновому округу, водохозяйственный участок реки — Северная Сосьва, речной подбассейн реки — Северная Сосьва. Речной бассейн реки — (Нижняя) Обь от впадения Иртыша."
     },
       {
        "name": "Вискан",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D1%81%D0%BA%D0%B0%D0%BD",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Boras.jpg/250px-Boras.jpg",
        "length": "142 км",
        "pool": "2202 км²",
        "consumption": "undefined",
        "head": "Толькен",
        "estuary": "Каттегат",
        "location": " Швеция",
        "info": "Ви́скан (швед. Viskan) — река на юге Швеции. Длина реки — 142 км, площадь бассейна — 2202 км². Река вытекает из озера Толькен в лене Вестра-Гёталанд, протекает также по территории лена Халланд, где впадает в пролив Каттегат. Высота истока — 226 м над уровнем моря.Крупнейший город на реке — Бурос[источник не указан 358 дней].Транспортировка по Вискану была осложнена серией порогов и водопадов. В 1645 году Аксель Оксеншерна поручил Йохану Верншельду исследовать Вискан и другие реки Халланда, чтобы выяснить, можно ли их использовать для транспортировки. Йохан изучил русло Вискана и пришёл к выводу, что на реке нет фарватера, то есть, она непригодна для судоходства, и перечислил 44 причины для этого."
     },
     {
        "name": "Висконсин ",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D1%81%D0%BA%D0%BE%D0%BD%D1%81%D0%B8%D0%BD_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/WisconsinRiverWisconsinRapidsWIS54WIS13.jpg/250px-WisconsinRiverWisconsinRapidsWIS54WIS13.jpg",
        "length": "692 км",
        "pool": "31 805 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Миссисипи",
        "location": " США",
        "info": "Виско́нсин (англ. Wisconsin) — река в США, один из притоков реки Миссисипи, протекает на территории одноимённого штата. Протяжённость русла — около 692 км, это самая длинная река штата. Площадь водосборного бассейна — 31 805 км².Название реки впервые было записано в 1673 году Жаком Маркеттом как Meskousing, происходило из алгонкинских языков местных индейских племён, первоначальное значение слова точно неизвестно. Французские исследователи, последовавшие за Маркеттом, изменили название на Ouisconsin, именно так река называлась на карте Гийома Делиля (Париж, 1718). В начале XIX века название было упрощено до нынешнего Wisconsin, и уже такое название получила территория Висконсин, а позже и штат Висконсин.Река берёт начало в лесах озерного края на севере штата Висконсин, из озера Lac Vieux Desert возле границы с Мичиганом. Она течёт на юг через ледниковые равнины в центре штата. В южной части штата река столкнулась с конечными моренами, образовавшимися во время последнего ледникового периода, благодаря чему возникло ущелье вдоль русла длиной около 8 км. К северу от Мадисона, около Портеджа, русло поворачивает на запад, протекает через холмистую Западную возвышенность и впадает в Миссисипи примерно в пяти километрах к югу от Прери-ду-Шина."
     },
     {
        "name": "Висла",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D1%81%D0%BB%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Krak%C3%B3w_Wis%C5%82a_11.jpg/250px-Krak%C3%B3w_Wis%C5%82a_11.jpg",
        "length": "1068 км",
        "pool": "198 500 км²",
        "consumption": "1080 м³/с",
        "head": " ",
        "estuary": "Гданьский залив",
        "location": " Польша",
        "info": "Ви́сла (польск. Wisła, лат. Vistula) — наиболее важная и протяжённая река Польши (протекает через всю страну с юга на север), а также наиболее длинная и вторая по водности (после Невы) река бассейна Балтийского моря. Длина Вислы составляет 1068 км, площадь водосборного бассейна — 198,5 тыс. км². Средний расход воды — 1080 м³/с.[источник?]Истоки реки находятся на высоте 1106 метров над уровнем моря на западном склоне Бараньей горы (Barania Góra) в Моравско-Силезских Бескидах (Западные Карпаты). Главные истоки: Белая Виселка (Biała Wisełka) и считающаяся основным истоком Чёрная Виселка (Czarna Wisełka). Висла впадает в Гданьский залив Балтийского моря в 15 км восточнее города Гданьска.В верховьях до выхода из Бескид (60 км) Висла — бурный горный поток; ниже города Кракова, приняв ряд притоков с Карпат, становится многоводной; ширина русла ниже впадения Дунайца составляет 200 м, ниже Сана — 600—1000 м. В среднем течении (до реки Брда (Brda)), а также в нижнем — типичная равнинная река, протекающая преимущественно в широкой, местами террасированной долине. Русло на большом протяжении извилистое, местами дробится на рукава и протоки, отличается неустойчивостью, большим количеством мелей и перекатов. От города Торунь до моря русло полностью зарегулировано, выше Торуня укреплены участки, подверженные угрозе значительного размыва берегов. В 50 км от моря Висла разделяется на рукава (Но́гат, Мёртвая Висла и др.), образуя обширную дельту (Жулавы). Часть дельты, лежащая ниже уровня моря, защищена дамбами. В устье Мёртвой Вислы расположен морской порт Гданьск."
     },
      {
        "name": "Вислок",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D1%81%D0%BB%D0%BE%D0%BA",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Wislok.jpg/250px-Wislok.jpg",
        "length": "205 км",
        "pool": "3528 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Сан",
        "location": " Польша",
        "info": "Вислок (польск. Wisłok) — река в юго-восточной части Польши, левый приток реки Сан. Длина — 205 км, площадь поверхности питания — 3528 км².Вислок — это горная речка, исток находится на высоте 770 м. Полностью находится на территории Подкарпатского воеводства.До 1340 года Вислок был приграничной рекой между государством Казимира Великого и Княжеством Галицким. Во время Первой мировой войны река разграничивала войска Австро-Венгрии и Российской Империи во время боёв."
     },
     {
        "name": "Вислока",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D1%81%D0%BB%D0%BE%D0%BA%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Wis%C5%82oka.JPG/250px-Wis%C5%82oka.JPG",
        "length": "164 км",
        "pool": "4110 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Висла",
        "location": " Польша",
        "info": "Висло́ка (польск. Wisłoka) — река на юго-востоке Польши, правый приток верхней Вислы. Своё начало река берёт в Восточных Бескидах. На Вислоке расположены города Мелец, Дембица, Ясло."
     },
      {
        "name": "Висунь ",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D1%81%D1%83%D0%BD%D1%8C_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/%D0%A6%D0%B5%D0%BD%D1%82%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%B9_%D0%BC%D1%96%D1%81%D1%82_%D1%83_%D1%81%D0%B5%D0%BB%D1%96_%D0%92%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BC%D0%B8%D1%80%D1%96%D0%B2%D0%BA%D0%B0.jpg/250px-%D0%A6%D0%B5%D0%BD%D1%82%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%B9_%D0%BC%D1%96%D1%81%D1%82_%D1%83_%D1%81%D0%B5%D0%BB%D1%96_%D0%92%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BC%D0%B8%D1%80%D1%96%D0%B2%D0%BA%D0%B0.jpg",
        "length": "196 км",
        "pool": "2670 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Ингулец",
        "location": " Украина",
        "info": "Висунь (устар. Висун, Исун) — река в Кировоградской и Николаевской областях Украины, правый приток реки Ингулец.Истоки реки на Приднепровской возвышенности, течёт на юг по Причерноморской низменности, впадает в Ингулец, близ села Бобровый Кут, в 12 км выше города Снигирёвка. Длина реки 196 км. Площадь водосборного бассейна — 2670 км². Исток находится на высоте более 142,7 м над уровнем моря.Питание в основном снеговое, пересыхает в верхнем и нижнем течении. Используется для водоснабжения. Имеет левый приток — реку Вербовая.В верхнем течении протекает через посёлок городского типа Казанка, в нижнем — посёлок городского типа Березнеговатое.Название реки имеет тюркское происхождение, начальное в является протетическим. От тат. иц, чув. ӗҫ, др.-тюрк. ič «пить», авар. ицу «источник».Значение праславянского корня «вис» можно трактовать как «разливаться», «течь» (родственно с гидронимами Виска и Висла)."
     },
      {
        "name": "Вит",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D1%82",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/VitRiveratToros.JPG/250px-VitRiveratToros.JPG",
        "length": "189 км",
        "pool": "undefined",
        "consumption": "undefined",
        "head": "слияние рек: Бели-Вит и Черни-Вит",
        "estuary": "Дунай",
        "location": " Болгария",
        "info": "Вит — река на севере Болгарии, правый приток Дуная. Истоки Бели-Вит (условно принимается за исток реки, высота 2030 м) и Черни-Вит берут начало на северных склонах хребта Стара-Планина. Длина — 189 км. Протекает по территории Ловечской и Плевенской областей. На реке расположен город Тетевен, на правом притоке Тученица — город Плевен."
     },
         {
        "name": "Витим",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D1%82%D0%B8%D0%BC",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Vitim_posle_Bambuyki.jpg/250px-Vitim_posle_Bambuyki.jpg",
        "length": "1837 км",
        "pool": "225 000 км²",
        "consumption": "1520 м³/с (город Бодайбо)",
        "head": "слияние рек: Витимкан и Чина",
        "estuary": "Лена",
        "location": " Россия",
        "info": "Вити́м (бур. Витим мүрэн, эвенк. Видым) — одна из крупнейших рек Восточной Сибири, правый приток Лены, образуется слиянием Витимкана и Чины. Средний расход воды — 1520 м³/с.Длина реки — 1837 км (с учётом реки Витимкан — 1978 км). Площадь водосборного бассейна — 225 тыс. км². По длине и площади бассейна Витим является третьим, после Алдана и Вилюя, притоком Лены.Начинается слиянием рек Витимкан и Чина на высоте 1171 м. С запада на восток огромной дугой окружает в южной части Витимское плоскогорье, далее к северу прорезает Южно-Муйский и Северо-Муйский хребты, разделяет Северо-Байкальское и Патомское нагорья и впадает в Лену. В русле много шивер.Протекает сначала по территории Баунтовского района Бурятии (также около 150 км по территории Еравнинского района), затем течёт по границе Баунтовского и Муйского районов Бурятии с Забайкальским краем (Тунгокоченский и Каларский районы), а в нижнем течении по территории Иркутской области (Бодайбинский и Мамско-Чуйский районы). Последние 50 км и устье Витима — на территории Якутии.Питание преимущественно дождевое. Средний годовой расход воды у города Бодайбо 1530 м³/с, в устье — около 2000 м³/с. Объём стока 69,434 км³/год. Для Витима характерно растянутое половодье (с мая по октябрь) с подъёмом воды до 8—10 м. Наиболее многоводный месяц — июнь (до 4900 м³/с). С марта по апрель водоносность реки резко уменьшается (до 80 м³/с). Замерзает в начале ноября, вскрывается во 2-й декаде мая. На участке выше села Калакан река часто перемерзает на 100—120 дней. Часто образуются наледи. Среднемноголетний расход взвешенных наносов 55 кг/с при средней мутности воды 30-50 г/л."
     },
     {
        "name": "Витимкан",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D1%82%D0%B8%D0%BC%D0%BA%D0%B0%D0%BD",
        "image": "undefined",
        "length": "141 км",
        "pool": "2580 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Витим",
        "location": " Россия",
        "info": "Витимка́н (эвенк. Видымкан — Малый Витим) — река в России, протекает по территории Баунтовского эвенкийского района Бурятии. Длина реки — 141 км. Площадь бассейна — 2580 км².Начинается на восточном склоне Икатского хребта, к востоку от высоты 2350,2 м. Высота истока — 2000 м над уровнем моря. Течёт в северо-восток-восточном направлении, и далее, сливаясь с рекой Чина, образует реку Витим. Высота устья — 1171 м над уровнем моря.Витимкан является одним из истоков Витима: суммарная их протяжённость составляет 1978 км.На левом берегу реки (в 4 км выше места слияния с Чиной) находится посёлок Варваринский — административный центр сельского поселения «Витимканское». В 31 км к западу (выше по течению), на правобережье Витимкана, находится посёлок Карафтит.Питание преимущественно дождевое."
     },
                          {
        "name": "Вичада ",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D1%87%D0%B0%D0%B4%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Vichada_Structure_LC08_L1TP_005057_20160118_20170405_01_T1.jpg/250px-Vichada_Structure_LC08_L1TP_005057_20160118_20170405_01_T1.jpg",
        "length": "580 км",
        "pool": "26 000 км²",
        "consumption": "2000 м³/с",
        "head": "слияние рек: Планас и Тильява",
        "estuary": "Ориноко",
        "location": " Колумбия",
        "info": "Вичада (исп. Río Vichada) — река на северо-западе Южной Америки, на территории Колумбии, приток реки Ориноко.Река берёт начало в департаменте Мета при слиянии рек Планас и Тильява. Течёт на восток по территории департаментов Мета и Вичада, впадает в Ориноко южнее Эгуа на границе с Венесуэлой.Длина реки составляет 580 км, площадь бассейна — 26000 км². Главные притоки — Муко и Гуаррохо. На берегах реки расположены населённые пункты Сан-Хосе-де-Окуне, Басинака, Сукуаро, Кампо-Троко."
     },
             {
        "name": "Вишера (приток Вычегды)",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D1%88%D0%B5%D1%80%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%92%D1%8B%D1%87%D0%B5%D0%B3%D0%B4%D1%8B)",
        "image": "undefined",
        "length": "247 км",
        "pool": "8780 км²",
        "consumption": "79,1 м³/с",
        "head": " ",
        "estuary": "Вычегда",
        "location": " Россия",
        "info": "Ви́шера (Вышера, коми Висер) — река в Республике Коми, правый приток реки Вычегды (бассейн Северной Двины).Длина — 247 км, площадь водосборного бассейна — 8780 км². Питание преимущественно снеговое. Замерзает в ноябре, вскрывается в конце апреля. Средний годовой расход воды 79,1 м³/сек (деревня Лунь).Крупнейшие притоки — Пугдым, Нившера (левые).Вишера вытекает из болот около Синдорского озера. Течёт в верхнем течении преимущественно на восток, ниже устья Пугдыма поворачивает на юг. В верхнем течении ненаселена, в районе устья Нившеры к реке подходит автодорога Сторожевск — Нившера, на берегах расположены несколько деревень.Вишера впадает в Вычегду недалеко от посёлка Сторожевск Корткеросского района Республики Коми. Ограниченно судоходна от устья Нившеры.(указано расстояние от устья)"
     },
     {
        "name": "Вишера (приток Камы)",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D1%88%D0%B5%D1%80%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%9A%D0%B0%D0%BC%D1%8B)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Vishera_River%2C_Perm_Krai.jpg/250px-Vishera_River%2C_Perm_Krai.jpg",
        "length": "415 км",
        "pool": "31 200 км²",
        "consumption": "473 м³/с (пос. Рябинино)",
        "head": " ",
        "estuary": "Камское водохранилище",
        "location": " Россия",
        "info": "Ви́шера (коми Висьӧр) — река в Пермском крае России, левый приток реки Камы (впадает в Вишерский залив Камского водохранилища).Длина — 415 км, площадь водосборного бассейна — 31 200 км². Среднегодовой расход воды у посёлка Рябинино — 473 м³/с. Средняя высота водосбора реки составляет 317 метров.Точное происхождение гидронима неизвестно. Вероятнее всего, гидроним древний и сформировался ещё у пра-финно-угров, исторически населяющих эти края: коми ви — «сила», или коми вой — «север, ночь» и коми сер — «река». В подтверждение этому уг. визэр — «поток воды», сев.‑саам. суэрр — «ответвление реки», сев.‑саам. йый — «ночь».Не имеет ничего общего с новгородским топонимом Вишера. Манси называют реку манс. Пассар.Пятая по длине река Пермского края, одна из наиболее живописных рек Урала. Начинается на северо-востоке края, на границе с Республикой Коми и Свердловской областью. Протекает главным образом по предгорьям Урала, имея большей частью характер быстрой горной реки, текущей в узкой долине; много мелей и порогов. В бассейне распространены карстовые явления.Правый исток Вишеры — Малая Вишера — берёт начало на хребте Яны-Емты, левый — Большая Вишера — с отрогов Поримонгит-Ур, одной из вершин хребта Поясовый Камень, на самой границе Республики Коми, Свердловской области и Пермского края. Истоки разделены Вишерским Камнем и сливаются у северного подножия горы Армии."
     },
                 {
        "name": "Вкра",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%BA%D1%80%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Rzeka_Wkra.JPG/250px-Rzeka_Wkra.JPG",
        "length": "249 км",
        "pool": "5322 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Нарев",
        "location": " Польша",
        "info": "Вкра (Дзялдувка) (польск. Wkra, Dzialdówka) — река в северо-восточной Польше, правый приток Нарева. Исток реки находится недалеко от города Нидзица, Вкра впадает в реку Нарев в районе слияния последней с Вислой. Длина реки — 249 км.[источник не указан 2094 дня] Площадь водосборного бассейна — 5322 км².[источник не указан 2094 дня] Протекала по Восточной Пруссии.В разных частях течения река Вкра известна под разными названиями:Вкра — равнинная низинная река с большими разливами.Притоки — Лыдиня, Сона, Насельна, Млавка и Плонка.В реке водится жерех, усач, лещ, голавль, язь, щука, плотва, красноперка. Крупнейшие города — Нидзица, Дзялдово."
     },
             {
        "name": "Влтава",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%BB%D1%82%D0%B0%D0%B2%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Vltava_river_in_Prague.jpg/250px-Vltava_river_in_Prague.jpg",
        "length": "446 км",
        "pool": "28 000 км²",
        "consumption": "142 м³/с (у Праги)",
        "head": " ",
        "estuary": "Эльба",
        "location": " Чехия",
        "info": "Влта́ва (чеш. Vltava) — река в Чехии, левый приток реки Лабы. Длина — 446 км, площадь водосборного бассейна — 28 090 км².Средний расход воды у Праги около 142 м³/с. Река подвержена наводнениям, в частности, крупнейшее за последние 500 лет наводнение произошло в 2002 году, когда была затоплена значительная часть Праги и даже пострадал Пражский метрополитен. Между Мельником и Прагой на Влтаве расположено 12 шлюзов.Исток Влтавы находится в горах национального парка Шумава. Здесь реки Теплая Влтава и Холодная Влтава сливаются, образуя Влтаву. Высота истока составляет 715 метров над уровнем моря.Около города Нова-Печ в результате плотины на Влтаве образовано крупнейшее водохранилище Чехии — Липно. У города Вишши-Брод проходит через ущелье «Чёртовы стены», после него протекает по более открытому ландшафту и поворачивает на север.Далее река течёт через Будеёвицкую равнину, затем по возвышенностям Средней Чехии. Впадает в Лабу в северной части Чехии у города Мельник.Кроме столицы Праги и Вишши-Брода, на Влтаве также расположены города Чески-Крумлов и Ческе-Будеёвице.Чешское название Vltava, как и немецкое Moldau, произошло от старогерманского Wilth-ahwa («Дикая вода»).Именем реки названа малая планета (2123) Vltava, открытая Н. С. Черныхом."
     },
         {
        "name": "Вога",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%B3%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/S%C3%A3o-Pedro-do-Sul_Rio-Vouga2_PT.jpg/250px-S%C3%A3o-Pedro-do-Sul_Rio-Vouga2_PT.jpg",
        "length": "148 км",
        "pool": "3635 км²",
        "consumption": "undefined",
        "head": "Шафариз-да-Лапа",
        "estuary": "Авейро",
        "location": " Португалия",
        "info": "Вога (порт. Rio Vouga) — река в центральном регионе Португалии. Берёт исток в Шафариз-да-Лапа, на 864 м высоте над уровнем моря.Длина реки около 148 км, площадь бассейна — 3635 км².Выброс сточных вод целлюлозно-бумажным комбинатом — один из основных источников загрязнения Воги и лагуны Авейро. По этой причине река имеет неприятный запах."
     },
          {
        "name": "Вогулка (приток Северной Сосьвы)",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%B3%D1%83%D0%BB%D0%BA%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A1%D0%B5%D0%B2%D0%B5%D1%80%D0%BD%D0%BE%D0%B9_%D0%A1%D0%BE%D1%81%D1%8C%D0%B2%D1%8B)",
        "image": "undefined",
        "length": "256 км",
        "pool": "6550 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Северная Сосьва",
        "location": " Россия",
        "info": "Вогу́лка — река в Ханты-Мансийского автономного округа России, левый приток Северной Сосьвы.Протекает в северо-восточном направлении по территории Берёзовского района. Длина — 256 км (с учётом длины устьевого отрезка — протоки Вогулка), площадь водосборного бассейна — 6550 км². Впадает в Северную Сосьву в 3 км от её устья по левому берегу. На реке расположен районный центр — посёлок городского типа Берёзово.(расстояние от устья)По данным государственного водного реестра России относится к Нижнеобскому бассейновому округу, водохозяйственный участок реки — Северная Сосьва, речной подбассейн реки — Северная Сосьва. Речной бассейн реки — (Нижняя) Обь от впадения Иртыша."
     },
     {
        "name": "Вогулка (приток Сылвы)",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%B3%D1%83%D0%BB%D0%BA%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A1%D1%8B%D0%BB%D0%B2%D1%8B)",
        "image": "undefined",
        "length": "113 км",
        "pool": "983 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Сылва",
        "location": " Россия",
        "info": "Вогу́лка — река в Свердловской области России, левый приток Сылвы, протекает по территории Шалинского городского округа. Устье реки находится на высоте 208,5 м над уровнем моря, в 290 км по левому берегу реки Сылва. Длина Вогулки составляет 113 км, площадь бассейна — 983 км².Основные притоки (расстояние от устья):По данным государственного водного реестра России относится к Камскому бассейновому округу, водохозяйственный участок реки — Сылва от истока и до устья, речной подбассейн реки — Кама до Куйбышевского водохранилища (без бассейнов рек Белой и Вятки). Речной бассейн реки — Кама.Код объекта в государственном водном реестре — 10010100812111100012463."
     },
           {
        "name": "Водла",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%B4%D0%BB%D0%B0",
        "image": "undefined",
        "length": "149 км",
        "pool": "13 700 км²",
        "consumption": "140 м³/с",
        "head": "слияние рек: Сухая Водла и Вама",
        "estuary": "Онежское озеро",
        "location": " Россия",
        "info": "Во́дла — река в России, на юго-востоке Карелии, в Пудожском районе. Около истока, между притоками Нетома и Черева, течёт по границе с Плесецким районом Архангельской области.Образуется при слиянии двух вытекающих из Водлозера рек — Сухой Водлы и Вамы (35 и 20 км соответственно), впадает в Онежское озеро. Длина реки — 149 км, площадь водосборного бассейна — 13 700 км². Среднемноголетний расход воды — 140 м³/с.По Водле новгородцы выходили к Белому морю и на реку Северная Двина. Водопад Падун, находящийся в 138 км от устья Водлы, служил препятствием для судов, и его приходилось обходить волоком.Южнее устья Водлы находится мыс Бесов Нос, давший название большой группе широко известных Онежских петроглифов, а в 30 км выше по течению — исторический город Пудож.Водла частично судоходна (от устья Шалы до Подпорожья). С 1880-х имелось и пассажирское движение, от Вознесенья до Подпорожья ходил пароход «Геркулес». В 1920—1940 годы из Петрозаводска до Подпорожья ходили пароходы Северо-Западного речного пароходства — «Бебель», «Володарский», «Роза Люксембург», «Чапаев», «Урицкий», в 1950-х годах «Вересаев», в 1960—1980-х годах «Ладога» Беломорско-Онежского пароходства.В 1930 годы на линии Подпорожье-Шала ходил пароход «Ямбург» (имевший позднейшие переименования в «Безбожник» и «Лесной»). С 1956 года на этой линии теплоход «Москвич-171» типа «Москвич». С 1971 по 1984 года действовала скоростная линия Стеклянное — Подпорожье на судне «Заря-123» типа «Заря»."
     },
                      {
        "name": "Воеволихан",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%B5%D0%B2%D0%BE%D0%BB%D0%B8%D1%85%D0%B0%D0%BD",
        "image": "undefined",
        "length": "184 км",
        "pool": "11 600 км²",
        "consumption": "undefined",
        "head": "слияние рек: Хисмунд и Воеволи",
        "estuary": "Котуй",
        "location": " Россия",
        "info": "Воеволихан (Воеволи-Хон) — река в Эвенкийском районе Красноярского края России, правый приток реки Котуй (бассейн Хатанги).По данным Большой советской энциклопедии длина реки составляет 356 км, в то время как Государственный водный реестр различает реку Воеволихан с длиной 184 км, и её приток Хусмунд, длина которого 172 км. Площадь бассейна — 11 600 км². Воеволихан образуется слиянием рек Хусмунд и Воеволи на плато Сыверма, течёт на север. Приток слева — Котуйкан."
     },
        {
        "name": "Вожа",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%B6%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Vozha_river.jpg/250px-Vozha_river.jpg",
        "length": "103 км",
        "pool": "1590 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Ока",
        "location": " Россия",
        "info": "Во́жа — река в Рязанской области России, правый приток Оки. Длина — 103 км, площадь водосборного бассейна — 1590 км². Средний уклон — 0,6 м/км.Берёт начало из искусственных прудов вблизи посёлка Комсомольский (Рыбновский район). Протекает вдоль границы Рязанской области на северо-восток, после пересечения федеральной автотрассы «Урал» поворачивает на восток. Впадает в Оку выше Рязани на высоте 93,2 м.На Воже расположен город Рыбное.Русло реки Вожа впадало в старое русло реки Ока, которое соединялось с основным руслом Оки. Старое русло реки Ока местные жители называют Старица или Старая Ока. На современных топографических картах старое русло Оки называется рекой Вожа.На старом русле реки Ока начиналась Рязанская Вожская засека, которая строилась для защиты от половецких и татарских набегов. На берегу омута Паниной ямы в старом русле реки Ока (река Вожа), на бывших казенных землях Вожской засеки расположено урочище Засека. В Рыбновском районе Рязанской области еще сохранились оборонительные сооружения Вожской засеки. В пойме Вожи и её притока Мечи в августе 1378 года русские войска во главе с московским князем Дмитрием (впоследствии получившим прозвище «Донской») разгромили монголо-татарские войска (битва на реке Воже). Точное место битвы не установлено. В настоящий момент условно считается, что оно расположено на территории Рыбновского района, рядом располагается село Глебово-Городище. Раз в год там проходит фестиваль."
     },
             {
        "name": "Вожега ",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%B6%D0%B5%D0%B3%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Vozhegodskiy_r-n%2C_Vologodskaya_oblast%27%2C_Russia_-_panoramio_%2882%29.jpg/250px-Vozhegodskiy_r-n%2C_Vologodskaya_oblast%27%2C_Russia_-_panoramio_%2882%29.jpg",
        "length": "140 км",
        "pool": "1980 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Воже",
        "location": " Россия",
        "info": "Во́жега, или Во́жа, — река в Вологодской области России, впадает в озеро Воже, принадлежит бассейну Онеги. Длина 140 км, площадь бассейна 1980 км².Крупнейшие притоки: Чужга, Тавеньга (правые).Вожега начинается на Верхневажской возвышенности, расположенной на севере Вологодской области. Общее направление течения — на запад, русло извилистое, каменистое, течение быстрое, в русле камни, перекаты. Берега в верхнем и среднем течении лесистые, малонаселённые.В среднем течении протекает в трёх километрах от посёлка Вожега.В нижнем течении река выходит на приозёрную низину, течение успокаивается, перекаты исчезают, лес отходит от реки.Вожега впадает в озеро Воже четырьмя протоками; северная называется Иксома, затем — Кера, рядом Вожега, Кера и Вожега соединены между собой протокой-старицей «Кирица», В Вожегу после разделения на Иксому и Керу но до Кирицы впадает старица — Питромица, южная протока, наиболее извилистая, Укма.Низовья Вожеги очень богаты рыбой и привлекают любителей рыбной ловли. По реке совершаются водные походы."
     },
                                                                                                                                                              {
        "name": "Волма (приток Свислочи)",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%BB%D0%BC%D0%B0_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A1%D0%B2%D0%B8%D1%81%D0%BB%D0%BE%D1%87%D0%B8)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/River_Volma.JPG/250px-River_Volma.JPG",
        "length": "103 км",
        "pool": "1150 км²",
        "consumption": "6,7 м³/с",
        "head": " ",
        "estuary": "Свислочь",
        "location": " Белоруссия",
        "info": "Во́лма (белор. Во́лма) — река, левый приток Свислочи (бассейн Днепра), протекающая в Минской области Белоруссии. Длина реки — 103 км, площадь водосборного бассейна — 1150 км², среднегодовой расход воды в устье — 6,7 м³/с.[источник не указан 758 дней]Начинается с мелиорационного канала около северо-восточной окраины деревни Королёв Стан Минского района, протекает по Минской возвышенности и Центральноберезинской равнине через Смолевичский, Червенский и Пуховичский районы. Устье находится в 1 км восточнее деревни Светлый Бор Пуховичского района. Общее падение реки 54,1 м, средний наклон водной поверхности 0,5 ‰.Рельеф преимущественно плоский, в верховьях мелкохолмистый, сложенный из песчаных и супесчаных грунтов, распаханный (35 %). Лес (41 %) смешанный. Долина трапециевидной формы, ширина 0,4-0,6 км, у д. Петровинка до 3 км. Пойма в основном осушена и распахана. На реке 4 плотины, регулирующие гидрографический режим. Русло в среднем течении спрямлено и углублено, ширина реки в верховье 3-4 м, ниже 8-10 м, в устьевой части до 40 м. Берега крутые и обрывистые, высотой от 0,4 до 2 м.Волма отличается интенсивным половодьем. На весенний период приходится 37 % годового стока. Наивысший уровень половодья в нижнем течении в конце марта, средняя высота над меженным уровнем 1,4-2,2 м, наибольшая 2,9 м. Замерзает в начале декабря, ледолом в конце марта. Весенний ледоход 3-4 суток. Используется как водоприёмник мелиорационных систем."
     },
          {
        "name": "Вологда ",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%BB%D0%BE%D0%B3%D0%B4%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Ledoxod_na_reke_Vologda.jpg/250px-Ledoxod_na_reke_Vologda.jpg",
        "length": "155 км",
        "pool": "3030 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Сухона",
        "location": " Россия",
        "info": "Во́логда — река в Вологодской области России, правый приток Сухоны (бассейн Северной Двины).Длина — 155 км, площадь водосборного бассейна — 3030 км².Крупные притоки — Синдошь, Масляная, Тошня (все правые). На реке — город Вологда и село Молочное.Вологда берёт начало в лесистом районе к северо-западу от города Вологды на высоте более 181 м над уровнем моря. Течение в верховьях довольно быстрое, русло извилистое. Общее направление течения реки — на восток. В северо-западных пригородах Вологды река принимает свой крупнейший приток — Тошню.После города река выходит на обширную заболоченную низменность. Течение практически исчезает. Вологда впадает в Сухону в нескольких сотнях метров выше устья Лежи, на высоте 106 м над уровнем моря. За два километра до устья от Вологды отходит боковая протока, называемая Окольной Сухоной, соединяющая Вологду и Лежу.Вологда судоходна от впадения Тошни.(указано расстояние от устья)На 2007 год Вологда была одной из самых загрязнённых рек бассейна Северной Двины. Её воды характеризовались как грязные (4-й класс, разряд «б»). В предыдущие годы, на протяжении 15-20 лет река также была одной из двух самых загрязнённых рек (вместе с рекой Пельшма) бассейна Сухоны, её вода оценивалась как «грязная» и «экстремально грязная»."
     },
              {
        "name": "Волома ",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%BB%D0%BE%D0%BC%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/%D0%A0%D0%B5%D0%BA%D0%B0_%D0%92%D0%BE%D0%BB%D0%BE%D0%BC%D0%B0_2.jpg/250px-%D0%A0%D0%B5%D0%BA%D0%B0_%D0%92%D0%BE%D0%BB%D0%BE%D0%BC%D0%B0_2.jpg",
        "length": "138 км",
        "pool": "2070 км²",
        "consumption": "20,27 м³/с (35 км от устья)",
        "head": "Волома",
        "estuary": "Сегозеро",
        "location": " Россия",
        "info": "Во́лома (Со́на) — река в России, протекает по территории Муезерского и Медвежьегорского районов Карелии. Впадает в Сегозеро. Длина реки — 138 км, площадь водосборного бассейна — 2070 км².Среднегодовой расход воды в районе деревни Венгигора (35 км от устья) составляет 20,27 м³/с. (указано расстояние от устья)Кроме озёр бассейна рек Лазаревской, Аминдомаоя, Пелкулы и Талвиесдеги, а также Сонозера к бассейну Воломы также относятся озёра:По данным государственного водного реестра России относится к Баренцево-Беломорскому бассейновому округу, водохозяйственный участок реки — Сегежа до Сегозерского гидроузла, включая озеро Сег-озеро. Речной бассейн реки — бассейны рек Кольского полуострова и Карелии, впадает в Белое море."
     },
     {
        "name": "Волонга ",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%BB%D0%BE%D0%BD%D0%B3%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "110 км",
        "pool": "767 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Чёшская губа",
        "location": " Россия",
        "info": "Волонга — река в России, протекает по Ненецкому автономному округу. Впадает в Чёшскую губу Баренцева моря. Длина — 110 км. Площадь бассейна составляет 767 км².Берёт начало на южном склоне горы Большая Коврига. Течёт в западном направлении по болотистой местности. Основные притоки: реки Травянка и Кумушка.В устье на левом берегу расположен населённый пункт — деревня Волонга."
     },
                   {
        "name": "Волошка ",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%BB%D0%BE%D1%88%D0%BA%D0%B0_(%D1%80%D0%B5%D0%BA%D0%B0)",
        "image": "undefined",
        "length": "260 км",
        "pool": "7100 км²",
        "consumption": "71,7 м³/с",
        "head": " ",
        "estuary": "Онега",
        "location": " Россия",
        "info": "Воло́шка (Воло́жка) — река в Архангельской области, правый приток Онеги. Протекает по территории Каргопольского и Коношского районов.Длина — 260 км. Площадь водосборного бассейна — 7100 км². Питание реки снеговое и дождевое. Расход воды — 71,7 м³/сек. Ледостав с середины ноября по конец апреля. Пороги.Левые:Правые:В верховьях реки находятся климовские деревни Вольская, Кеменцево, Малое Заволжье, Большое Заволжье, а также посёлок Волошка.Название реки относится к числу многочисленных специфических «волоковых» имён, указывающих на места, где когда-то существовали волоки."
     },
           {
        "name": "Волхов",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%BB%D1%85%D0%BE%D0%B2",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/%D0%92%D0%B5%D0%BB%D0%B8%D0%BA%D0%B8%D0%B9_%D0%9D%D0%BE%D0%B2%D0%B3%D0%BE%D1%80%D0%BE%D0%B4_-_panoramio_%2850%29.jpg/250px-%D0%92%D0%B5%D0%BB%D0%B8%D0%BA%D0%B8%D0%B9_%D0%9D%D0%BE%D0%B2%D0%B3%D0%BE%D1%80%D0%BE%D0%B4_-_panoramio_%2850%29.jpg",
        "length": "224 км",
        "pool": "80 200 км²",
        "consumption": "593 м³/с (в устье)",
        "head": "Ильмень",
        "estuary": "Ладожское озеро",
        "location": " Россия",
        "info": "Во́лхов — большая река на северо-западе Европейской части России, в Новгородской и Ленинградской областях.Единственная река, вытекающая из озера Ильмень. Волхов протекает по Приильменской низменности, впадает в Ладожское озеро. Длина реки — 224 км. Площадь водосборного бассейна Волхова — 80 200 км², из них 61 % относится к Новгородской области, 21 % лежит в пределах Псковской области, 10 % Тверской области и 8 % приходится на Ленинградскую область. Среднегодовой расход воды — 593 м³/с (по некоторым данным 586 м³/с). Ледостав с конца ноября по начало апреля. Судоходна, включена в перечень внутренних водных путей России на всём протяжении.Севернее Рюрикова Городища в 2 км от озера Ильмень от основного русла Волхова отделяется правый рукав Малый Волховец, который вновь впадает в Волхов в районе Холопьего городка, образуя большой остров, на котором находится Торговая сторона Великого Новгорода. Современное начало Малого Волховца было ранее ручьём Жилоту́г, который имел в Волховец небольшую протоку. Раньше исток Малого Волховца находился несколько южнее, рядом с точкой, где начинается Сиверсов канал.Главные притоки: справа — Вишера, Пчёвжа, Оскуя; слева — Кересть, Тигода.На реке построена Волховская ГЭС (Ленинградская область)."
     },
               {
        "name": "Волчина",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%BB%D1%87%D0%B8%D0%BD%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Volchina.jpg/250px-Volchina.jpg",
        "length": "106 км",
        "pool": "3050 км²",
        "consumption": "20,9 м³/с",
        "head": "Волчино",
        "estuary": "Молога",
        "location": " Россия",
        "info": "Во́лчина — река в Тверской области на северо-западе европейской части Российской Федерации, левый приток Мологи (бассейн Волги). Длина — 106 км, площадь бассейна — 3050 км², средний расход воды — 20,9 м³/с.Принадлежит к бассейну Волги, крупнейшие притоки — Молдинка, Ворожба (левые); Тифина (правый).Крупнейший населённый пункт на реке — посёлок Максатиха, центр Максатихинского района Тверской области.Название реки «Волчина» произошло от «Волочина», что значит тащить волоком. В старые времена по ней перетаскивали суда, гружённые товаром.[источник не указан 160 дней]Волчина вытекает из Волчино, одного из Голубых озёр, представляющих собой цепочку соединённых протоками живописных озёр, популярных в качестве места отдыха. Протоки, соединяющие озёра, расположенные выше Волчино (Маги, Пальцево, Сестрино), иногда ошибочно считают началом реки Волчины.Волчина на участке от истока до озера Рогозно — река шириной 10—15 метров со слабым течением, берега заросли тростником, иногда к берегу подходит лес. Такой же характер река сохраняет и на участке между озёрами Рогозно и Перхово, лишь ширина увеличивается до 30 метров.После озера Перхово река течёт вдоль шоссе Вышний Волочёк — Бежецк, правый берег, по которому идёт шоссе, плотно заселён, вдоль левого идут живописные сосновые леса."
     },
           {
        "name": "Волчья (приток Самары)",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%BB%D1%87%D1%8C%D1%8F_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D1%8B)",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/%D0%92%D0%BE%D0%BB%D1%87%D1%8C%D1%8F_%28%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D1%8B%29.jpg/250px-%D0%92%D0%BE%D0%BB%D1%87%D1%8C%D1%8F_%28%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D1%8B%29.jpg",
        "length": "323 км",
        "pool": "13 300 км²",
        "consumption": "5,3 м³/с (в 81 км от устья)",
        "head": " ",
        "estuary": "Самара",
        "location": " Украина",
        "info": "Волчья (укр. Вовча) — река на Украине, протекает по территории Донецкой и Днепропетровской областей, левый приток реки Самары.Длина реки — 323 км, площадь водосборного бассейна — 13 300 км². На реке расположен город Павлоград, посёлки городского типа Васильковка, Покровское. Впадает в Самару в Кочережском лесу Павлоградского района.Существует полемичная (не являющаяся общепризнанной) точка зрения насчёт правомерности применения названия Самара к участку от впадения Волчьи до устья. С точки зрения гидрологии принято считать, что менее полноводные реки (притоки) впадают в более полноводные. Ситуация такова, что в месте слияния Самары и Волчьей расход воды в Волчьей превышает расход воды в Самаре. Таким образом, Волчья более полноводна, в связи с чем можно считать, что не Волчья впадает в Самару, а Самара в Волчью, которая, в свою очередь, далее впадает в Днепр.Происхождение названия окончательно не доказано, существует несколько гипотез.Одна из них выводит её от волока. В прошлом из Днепра через р. Самару и её приток р. Волчью и далее волоком до р. Кальмиус, а по ней уже до Азовского моря водили челны, барки, струги.Существует ещё одно объяснение названию, а именно: в XII веке на берегах этой реки жила половецкая орда, называвшаяся Бурчевичи (от тюркского «волчья»). Своими покровителями (тотем) орда считала степных волков. Может быть, река получила своё название от этой орды, а уже затем наименование приобрело другое семантическое значение."
     },
     {
        "name": "Волчья (река, впадает в Восточно-Сибирское море)",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%BB%D1%87%D1%8C%D1%8F_(%D1%80%D0%B5%D0%BA%D0%B0,_%D0%B2%D0%BF%D0%B0%D0%B4%D0%B0%D0%B5%D1%82_%D0%B2_%D0%92%D0%BE%D1%81%D1%82%D0%BE%D1%87%D0%BD%D0%BE-%D0%A1%D0%B8%D0%B1%D0%B8%D1%80%D1%81%D0%BA%D0%BE%D0%B5_%D0%BC%D0%BE%D1%80%D0%B5)",
        "image": "undefined",
        "length": "164 км",
        "pool": "1700 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Гусиная губа",
        "location": " Россия",
        "info": "Волчья — река в России, протекает по территории Аллаиховского района Якутии. Длина реки — 164 км, площадь водосборного бассейна составляет 1700 км².Начинается в урочище Бёрё-Хотал на высоте около 20 метров над уровнем моря, принимает воды ручьёв Бёрё-Бис и Бёрё-Хотал-Сяне. Течёт в общем восточном направлении по заболоченной тундре, сильно меандрирует. Вблизи устья Малой Волчьей пересекает горы Дыгыхчах. Скорость течения воды — 0,1 м/с. Глубина реки в нижнем течении — 3 метра.Впадает в губу Гусиную, относящуюся к акватории Восточно-Сибирского моря, образуя эстуарий шириной 730 метров.Населённых пунктов на реке нет, в нижнем течении имеется несколько охотничьих заимок.Объекты перечислены по порядку от устья к истоку.По данным государственного водного реестра России относится к Ленскому бассейновому округу, речной бассейн — Индигирка, водохозяйственный участок — реки бассейна Восточно-Сибирского моря от мыса Святой Нос на западе до границы бассейна реки Индигирки на востоке.Код объекта в государственном водном реестре — 18050000512117700034997."
     },
      {
        "name": "Воль (приток Вычегды)",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%BB%D1%8C_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%92%D1%8B%D1%87%D0%B5%D0%B3%D0%B4%D1%8B)",
        "image": "undefined",
        "length": "174 км",
        "pool": "1810 км²",
        "consumption": "9,85 м³/с (102 км от устья)",
        "head": "слияние рек: Керан и Седъёль",
        "estuary": "Вычегда",
        "location": " Россия",
        "info": "Воль (Выль, Волжемка) — река в Республике Коми, правый приток реки Вычегды.Длина — 174 км, площадь водосборного бассейна — 1810 км². Питание смешанное, с преобладанием снегового.Воль образуется слиянием рек Керан и Седъёль на юго-востоке Республики Коми, на южной оконечности Тиманского кряжа. Течёт сначала на юг, в нижнем течении поворачивает на восток. Русло извилистое, река собирает многочисленные небольшие притоки. Берега заболочены, на реке несколько небольших деревень.Воль впадает в Вычегду в 942 км от её устья, около посёлка Ягкедж.Среднегодовой расход воды в районе деревни Югыдтыдор (102 км от устья) составляет 9,85 м³/с. Среднемесячные расходы воды (данные наблюдений с 1973 по 1988 год): По данным государственного водного реестра России и геоинформационной системы водохозяйственного районирования территории РФ, подготовленной Федеральным агентством водных ресурсов:"
     },
               {
        "name": "Волья (приток Северной Сосьвы)",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%BB%D1%8C%D1%8F_(%D0%BF%D1%80%D0%B8%D1%82%D0%BE%D0%BA_%D0%A1%D0%B5%D0%B2%D0%B5%D1%80%D0%BD%D0%BE%D0%B9_%D0%A1%D0%BE%D1%81%D1%8C%D0%B2%D1%8B)",
        "image": "undefined",
        "length": "226 км",
        "pool": "6150 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Северная Сосьва",
        "location": " Россия",
        "info": "Волья (устар. Воль-Я) — река в Берёзовском районе Ханты-Мансийского автономного округа России. Устье реки находится в 448 км от устья Северной Сосьвы по левому берегу. Длина реки составляет 226 км, площадь водосборного бассейна — 6150 км².(указано расстояние от устья)По данным государственного водного реестра России относится к Нижнеобскому бассейновому округу, водохозяйственный участок реки — Северная Сосьва, речной подбассейн реки — Северная Сосьва. Речной бассейн реки — (Нижняя) Обь от впадения Иртыша."
     },
              {
        "name": "Вон-Гунъёган",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%BD-%D0%93%D1%83%D0%BD%D1%8A%D1%91%D0%B3%D0%B0%D0%BD",
        "image": "undefined",
        "length": "129 км",
        "pool": "975 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Аган",
        "location": " Россия",
        "info": "Вон-Гунъёган (устар. Вон-Гун-Ёган) — река в России, протекает по Ханты-Мансийскому АО. Впадает в Аган слева. Длина реки составляет 129 км, площадь водосборного бассейна 975 км². Течёт с юго-востока на северо-запад.Вблизи устья в Вон-Гунъёган справа впадает река Сартъёган.По данным государственного водного реестра России относится к Верхнеобскому бассейновому округу, водохозяйственный участок реки — Обь от впадения реки Вах до города Нефтеюганск, речной подбассейн реки — Обь ниже Ваха до впадения Иртыша. Речной бассейн реки — (Верхняя) Обь до впадения Иртыша.Код объекта в государственном водном реестре — 13011100112115200044345."
     },
     {
        "name": "Вон-Лонгъёхан",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%BD-%D0%9B%D0%BE%D0%BD%D0%B3%D1%8A%D1%91%D1%85%D0%B0%D0%BD",
        "image": "undefined",
        "length": "107 км",
        "pool": "1260 км²",
        "consumption": "undefined",
        "head": " ",
        "estuary": "Хейгияха",
        "location": " Россия",
        "info": "Вон-Лонгъёхан (устар. Большой Лонг-Юган) — река в России, протекает по территории Надымского района Ямало-Ненецкого автономного округа. Впадает в Хейгияха на 243 км от её устья. Длина реки — 107 км, площадь водосборного бассейна — 1260 км². Высота устья — 47,7 м над уровнем моря.[источник не указан 604 дня]По данным государственного водного реестра России относится к Нижнеобскому бассейновому округу, водохозяйственный участок реки — Надым. Речной бассейн реки — Надым."
     },
                                        {
        "name": "Воньга",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%BD%D1%8C%D0%B3%D0%B0",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Vonga_assu1.JPG/250px-Vonga_assu1.JPG",
        "length": "106 км",
        "pool": "2580 км²",
        "consumption": "10 м³/с",
        "head": "Энгозеро",
        "estuary": "Белое море",
        "location": " Россия",
        "info": "Во́ньга (Вонга) — река, протекающая на севере республики Карелия (Россия), по Лоухскому и Кемскому районам. Вытекает из Энгозера на высоте 71 м над уровнем моря, впадает в Белое море. Длина — 106 км, площадь бассейна — 2580 км².Общее падение — 71 м (в основном на порогах в нижнем течении), средний уклон — 1,10 м/км. Протекает через озёра:Ширина Воньги — 25—40 м, глубина вне порогов — 0,7—2,5 м. Условно река делится на Верхнюю Воньгу (до Мурамозера) и Нижнюю Воньгу (за ним).На реке находится деревня Воньга. Кроме того, по воде до реки можно добраться от посёлка и станции Энгозеро, расположенных на востоке одноимённого озера.Верхняя Воньга представляет собой озёрно-речную систему с крупными озёрами. Здесь много красивых озёр, а именно уже упоминавшиеся ранее Пильдозеро, Синдамозеро, Мурамозеро, а также более мелкие — Пайозеро, Ногозеро, озеро Кодагуб.Нижняя Воньга представляет собой небольшие озёра (Столбовое, Чекозеро, Медвежье, Собачье, Уманьгозеро, Половинное (Вяккер)), между которыми протоки с порогами.Среднегодовой расход воды 10 м³/с. Питание реки дождевое и снеговое.Фауна в районе реки Воньга — типичная для Карелии: здесь обитают такие животные, как медведь, рысь, барсук и волк, а также более редкие представители, как например, кабаны, енотовидная собака и другие. Птицы — типичные для Карелии — зяблики, рябчики, тетерева, гуси, утки, чайки и другие. Пресмыкающиеся: гадюки, ужи и ящерицы. Насекомые: комары, мошки, слепни."
     },
            {
        "name": "Вопь",
        "link": "https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%BF%D1%8C",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/%D0%96%D0%B5%D0%BB%D0%B5%D0%B7%D0%BD%D0%BE%D0%B4%D0%BE%D1%80%D0%BE%D0%B6%D0%BD%D1%8B%D0%B9_%D0%BC%D0%BE%D1%81%D1%82_%D1%87%D0%B5%D1%80%D0%B5%D0%B7_%D0%92%D0%BE%D0%BF%D1%8C.jpg/250px-%D0%96%D0%B5%D0%BB%D0%B5%D0%B7%D0%BD%D0%BE%D0%B4%D0%BE%D1%80%D0%BE%D0%B6%D0%BD%D1%8B%D0%B9_%D0%BC%D0%BE%D1%81%D1%82_%D1%87%D0%B5%D1%80%D0%B5%D0%B7_%D0%92%D0%BE%D0%BF%D1%8C.jpg",
        "length": "158 км",
        "pool": "3300 км²",
        "consumption": "22 м³/с (в устье)",
        "head": " ",
        "estuary": "Днепр",
        "location": " Россия",
        "info": "Вопь — река в Смоленской области, правый приток Днепра. Длина — 158 км. Площадь бассейна — 3300 км². Средний годовой расход воды в устье около 22 м³/с.Истоки в болотах Смоленской возвышенности. Впадает в Днепр у деревни Соловьёво Кардымовского района.Берега в нижнем левобережье (после Ярцева) лесистые, в верхнем и среднем течении — открытые.На реке расположен город Ярцево."
     },
     
     
     ]
    let t = 'RIVERS = [';
        RIVERS123.forEach(river => {
            let ru = river.name
                .replace('(река)', '')
                .replace(/^\s+|\s+$/g, '')
                .replace(`а́`, 'a').replace(`А́`, `A`)
                .replace(`е́`, 'е').replace(`Е́`, `Е`)
                .replace(`и́`, 'и').replace(`И́`, `И`)
                .replace(`о́`, 'о').replace(`О́`, `О`)
                .replace(`у́`, 'у').replace(`У́`, `У`)
                .replace(`ы́`, 'ы').replace(`Ы́`, `Ы`)
                .replace(`э́`, 'э').replace(`Э́`, `Э`)
                .replace(`ю́`, 'ю').replace(`Ю́`, `Ю`)
                .replace(`я́`, 'я').replace(`Я́`, `Я`)
            let length = toFloat(river.length);
            let pool = toFloat(river.pool);
            let consumption = toFloat(river.consumption); 
            let link = river.link.replace('https://ru.wikipedia.org/wiki/', '')
            let head =  river.head.replace('" ', '').replace(' "', '').replace(/^\s+|\s+$/g, '')
            let estuary = river.estuary.replace('" ', '').replace(' "', '').replace(/^\s+|\s+$/g, '')
            let image = river.image.replace('https://upload.wikimedia.org/wikipedia/commons/thumb/', '')
            let location = river.location.replace('" ', '').replace(' "', '').replace(/^\s+|\s+$/g, '')
            let info = river.info
                .replace('" ', '')
                .replace(' "', '')
                .replace(/^\s+|\s+$/g, '')
                .replace(`а́`, 'a').replace(`А́`, `A`)
                .replace(`е́`, 'е').replace(`Е́`, `Е`)
                .replace(`и́`, 'и').replace(`И́`, `И`)
                .replace(`о́`, 'о').replace(`О́`, `О`)
                .replace(`у́`, 'у').replace(`У́`, `У`)
                .replace(`ы́`, 'ы').replace(`Ы́`, `Ы`)
                .replace(`э́`, 'э').replace(`Э́`, `Э`)
                .replace(`ю́`, 'ю').replace(`Ю́`, `Ю`)
                .replace(`я́`, 'я').replace(`Я́`, `Я`)
                .replace(/\s*\([а-яА-Я]*[^а-яА-Я\)]+[^\n\)]*\)+/g, '')
            delete river[`name`]
            delete river[`length`]
            delete river[`pool`]
            delete river[`consumption`]
            delete river[`link`]
            delete river[`head`]
            delete river[`estuary`]
            delete river[`info`]
            delete river[`image`]
            delete river[`location`]

            
            river.ru = ru;
            river.en = ru;
            river.fr = ru;
            river.sp = ru;
            river.ruLink = link
            river.enLink = link
            river.frLink = link
            river.spLink = link
           
 

            river.length = length
            river.pool = pool
            river.consumption = consumption
 
            river.location = location


            river.ruHead = head
            river.enHead = head
            river.frHead = head
            river.spHead = head

            river.ruEstuary = estuary
            river.enEstuary = estuary
            river.frEstuary = estuary
            river.spEstuary = estuary
  
            river.image = image;
            river.ruInfo = info;
            river.enInfo = info;
            river.frInfo = info;
            river.spInfo = info;

            t += JSON.stringify(river, null, 2);
            t += ',\n';
        })
        log(t + "]")
}
toRivers123()