const START_THEME =     localStorage.getItem('theme') ? 
                            JSON.parse(localStorage.getItem('theme')) : 
                            ThemesObj.Light;
const START_LANG =      localStorage.getItem('lang') ? 
                            JSON.parse(localStorage.getItem('lang')) : 
                            LanguagesObj.LANGTYPES.en;
const START_AREA =      localStorage.getItem('area') ? 
                            JSON.parse(localStorage.getItem('area')) : 
                            AreaObj.AREATYPES.country;




class Page { 
    static CreateListElem(text, riversArr) { 
        let cell = `
            <li>
                <h6 class="list-title">${text}
                    <span class="arealist-amount non-select">
                        [${riversArr.length}]
                    </span>
                    <span class="arealist-href-icon non-select"></span>
                </h6>
                <div>`
        riversArr.forEach(el => {
            cell += `
            <a class="non-select" href="${el.link}" target="_blank" rel="noopener noreferrer">
                <span>➝</span>
                <ins>${el.name}</ins>
            </a>
            `
        }); 
        cell += ` 
                </div>
            </li>
        `
        return cell;
    }
    static Recreate() {
        $areaList.empty();
        let newHTML = ''
        AreaObj.currentList.forEach(e => {
            newHTML += Page.CreateListElem(e.name, e.rivers);
        });
        $areaList.html(newHTML);

        $js(`.list-title`).onEvent('click', (e) => { 
            let parent = e.parent('li');
            let div = parent.find('div'); 

            $js(`.sidebar-active-item`).not(parent).removeClass(`sidebar-active-item`);
            $areaList.find('li div').css({'max-height': '0px'});
            
            
            parent.toggleClass('sidebar-active-item');
            if (parent.hasClass(`sidebar-active-item`)) 
                div.css({'max-height': `${div.find('a').size() * 40}px`}); 
            else 
                div.find('div').css({'max-height': '0px'}); 
        })
        $areaList.find(`.arealist-href-icon`).onEvent('click', (e) => {
            AreaPage(e.parent('li').find('h6').text())
        })

        LanguagesObj.TranslatePage();
    }
}




const Phone = () => {
    const scrollSpeed = 500; 
    const HideSettings = () => {
        if (SETTINGS_ACTIVE) {
            SETTINGS_ACTIVE = false; 
            $js(`#settingsBtn`).removeClass('active-btn');
            $js(`.header-settings`).animate({
                'right': '-250px' 
            }, 200) 
        }
    }


    if (window.innerWidth < 750) { 
        GLOBE_ACTIVE = true; 
        $js(`main`).get().scrollTop = 2000;   
        LanguagesObj.TranslatePage(); 
    }
    window.onresize = (e) => {
        if (!isPhone() && window.innerWidth < 750) {
            $globeWrap.get().scrollIntoView({
                behavior: "auto",
                block: "start"
            }); 
            
            GLOBE_ACTIVE = true; 
            LanguagesObj.TranslatePage()
        }
        log('ha ha! resized')
    }

   
    $js(`#settingsBtn`).onClick((e) => {
        log('sdf')
        SETTINGS_ACTIVE ? 
            e.removeClass('active-btn') :
            e.addClass('active-btn')
            
        $js(`.header-settings`).animate({
            'right': !SETTINGS_ACTIVE ? '10px' : '-250px' 
        }, !SETTINGS_ACTIVE ? 300 : 200) 
        SETTINGS_ACTIVE = !SETTINGS_ACTIVE;
    })
    $js(`#mobileScroll`).onClick((e) => {
        GLOBE_ACTIVE = !GLOBE_ACTIVE;  
        $js(GLOBE_ACTIVE ? '#globeWrap' : 'aside').get().scrollIntoView({
            behavior: "smooth",
            block: "start"
        }); 

        setTimeout(() => {
            HideSettings();
            LanguagesObj.TranslatePage();
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



    $js(`#aboutMark`).onClick(() => {
        $aboutWrap.animate({
            'left': '0',
            'opacity': '1'
        }, toggleDuration) 
    })

    $js(`#aboutClose`).onClick(() => {
        $aboutWrap.animate({
            'left': '-100%'
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
        else if (val.length < 25)  {
            e.removeClass(`align-left`)
        }
    })


}


document.addEventListener("DOMContentLoaded", () => { 
    LanguagesObj.Start(START_LANG);
    AreaObj.Start(START_AREA);
    ThemesObj.Start(START_THEME);
    Page.Recreate();

 
    Phone();  
    EarthReady();
    About();
});  