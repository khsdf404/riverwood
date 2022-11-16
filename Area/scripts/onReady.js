const isPhone = () => {
return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)
}




const Header = () => { 
    LanguagesObj.Start(START_LANG); 
    ThemesObj.Start(START_THEME); 
    

    if (isPhone()) {
        const scrollSpeed = 500; 
        const HideSettings = () => {
            if (SETTINGS_ACTIVE) {
                SETTINGS_ACTIVE = false; 
                $(`button#settingsBtn`).removeClass('active-btn');
                $(`section.header-settings`).animate({
                    'right': '-250px' 
                }, 200) 
            }
        }
        $(`button#settingsBtn`).click(function() {
            SETTINGS_ACTIVE ? 
                $(this).removeClass('active-btn') :
                $(this).addClass('active-btn')
                
            $(`section.header-settings`).animate({
                'right': !SETTINGS_ACTIVE ? '10px' : '-250px' 
            }, !SETTINGS_ACTIVE ? 300 : 200) 
            SETTINGS_ACTIVE = !SETTINGS_ACTIVE;
        })
        
        $(`main`).click(() => {
            HideSettings();
        });
    }
     
}







$(document).ready(() => {
    let areaStr = localStorage.getItem('areaName');  
    $(`main h2`).text(`${areaStr} in development...`);
    $(`section.header-logo a`).click(() => {
        localStorage.removeItem('areaName');
    })
    Header();
})