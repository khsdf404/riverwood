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
        let cell = $js().create(`<li></li>`);
        let title = $js()
            .create(`<h6 class="list-title">${text}</h6>`)
        //     .append(`
        //         <span class="arealist-amount non-select">
        //             [${riversArr.length}]
        //         </span>
        //         <span class="arealist-href-icon non-select"></span>
        //    `);
        let titleAmount = $js().create(
            `<span class="arealist-amount non-select">
                [${riversArr.length}]
            </span>`
        );
        let titleIcon = $js().create(` 
            <span class="arealist-href-icon non-select"> </span>
        `);
        

        title.appendObj(titleAmount);
        title.appendObj(titleIcon);
        cell.appendObj(title);

        let cellRiversWrap = $js().create(`<div></div>`);
        riversArr.forEach(el => {
            let riverCell = $js()
                .create(`<a class="non-select" href="${el.link}" target="_blank" rel="noopener noreferrer"></a>`)
            //    .append(`<span>➝</span><ins>${el.name}</ins>`)
            let riverContent = $js().create(`<span>➝</span><ins>${el.name}</ins>`)
             riverCell.appendObj(riverContent);
            cellRiversWrap.appendObj(riverCell);
        }); 
        cell.appendObj(cellRiversWrap)
        return cell;
    }
    static Recreate() {
        $areaList.empty();
        AreaObj.currentList.forEach(e => 
            $areaList.appendObj(Page.CreateListElem(e.name, e.rivers))
        );
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
        $js(`.listLink`).onEvent('click', (e) => {
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
        $globeWrap.get().scrollIntoView({
            block: "start"
        });      
        LanguagesObj.TranslatePage();
    }
    

    
    // $(window).resize(() => { 
    //     if (isPhone() && $(window).outerWidth() < 750) {
    //         $globeWrap.get().scrollIntoView({
    //             behavior: "smooth",
    //             block: "start"
    //         }); 
    //         GLOBE_ACTIVE = true; 
    //         LanguagesObj.TranslatePage()
    //     }
    // })

   
    log($js(`#settingsBtn`))
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
        $js(GLOBE_ACTIVE ? 'article' : 'aside').get().scrollIntoView({
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



document.addEventListener("DOMContentLoaded", () => { 
    LanguagesObj.Start(START_LANG);
    AreaObj.Start(START_AREA);
    ThemesObj.Start(START_THEME);
    Page.Recreate();


    Phone(); 
    EarthReady();
});  