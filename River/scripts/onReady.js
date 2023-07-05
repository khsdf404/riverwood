let areaItem; 
const isPhone = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)
}



const Settings = () => { 
    const $settings =       $js(`.header-settings`) 
    const settingsSpeed =   350; 
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
const ClickEffect = (e) => {
    e.animate({
        'transform': 'scale(1.1)' 
    }, 'all 100ms easi-in-out', () => {
        e.animate({
            'transform': 'scale(1)' 
        }, 30)
    })
}


document.addEventListener("DOMContentLoaded", () => { 
    riverItem =  JSON.parse(localStorage.getItem('riverItem'));

    ThemesObj.Start()
    LanguagesObj.Start()
    $js(`#wikiLink`).onClick((e) => { 
        ClickEffect(e)
        window.location.href = LanguagesObj.getLink(riverItem);
    })
    
    Settings(); 
});  

 