class Page { 
    static Recreate() {
        function CreateElem(text, riversArr) { 
            let cell = $(`<li><h6>${text} (${riversArr.length})</h6></li>`); 
            let cellRiversWrap = $(`<div></div>`);
            riversArr.forEach(el => {
                cellRiversWrap.append(`
                    <a class="non-select" href="${el.link}" target="_blank" rel="noopener noreferrer">
                        <span>➝</span>
                        <ins>${el.name}</ins>
                    </a>
                `);
            });
            cell.append(cellRiversWrap)
            return cell;
        }

        
        $(`#areaList`).empty();
        SIDEBAR_LIST.forEach(e => 
            $(`#areaList`).append(CreateElem(e.name, e.rivers))
        );
        $(`#areaList li h6`).click(function(e) {
            let parent = $(this).parent('li');
            let div = parent.find('div');
            $(`.sidebar-active-item`).not(parent).removeClass(`sidebar-active-item`);
            parent.toggleClass(`sidebar-active-item`);
            if (parent.hasClass(`sidebar-active-item`))
                div.css({'max-height': (div.find('a').length * 40) + 'px'});
            else 
                div.css({'max-height': '0px'});
        })


        LanguagesObj.TranslatePage();
    }
}


const Phone = () => {
    const scrollSpeed = 500; 
    const isPhone = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)
    }
    const HideSettings = () => {
        if (SETTINGS_ACTIVE) {
            SETTINGS_ACTIVE = false; 
            $(`button#settingsBtn`).removeClass('active-btn');
            $(`section.header-settings`).animate({
                'right': '-250px' 
            }, 200) 
        }
    }

    if ($(window).outerWidth() < 750) {
        GLOBE_ACTIVE = true; 
        $(`main`).scrollTop($(`main`).outerHeight());       
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
    $(`#mobileScroll`).click(function() {
        GLOBE_ACTIVE = !GLOBE_ACTIVE;
        LanguagesObj.TranslatePage();
        // $(this).find('span').animate({
        //     'opacity': '0'
        // }, scrollSpeed / 2.3, () => {
           
        //     setTimeout(() => {
        //         $(this).find('span').animate({
        //             'opacity': '1'
        //         }, scrollSpeed / 2.3)
        //     }, scrollSpeed / 4.6);
        // })
        $(`main`).animate({
            'scrollTop': !GLOBE_ACTIVE ? 
                            '0px' : 
                            $(`main`).outerHeight() + 'px'
        }, scrollSpeed, 'easeInOutQuad');
        

        setTimeout(() => {
            HideSettings();
        }, scrollSpeed * (6/10));
    })



    $(`main`).click(() => {
        if (!isPhone()) return;
        HideSettings();
    }); 
}
const Header = () => {
    LanguagesObj.Start(START_LANG);
    AreaObj.Start(START_AREA);
    ThemesObj.Start(START_THEME);
    Page.Recreate();
}
const Earth = () => { 
    // canvas & d3 variables
    canvas =        d3.select('#globe')
    canvasDOM =     document.getElementById('globe');
    context =       canvas.node().getContext('2d');
    projection =    d3.geoOrthographic().precision(0.1); 
    path =          d3.geoPath(projection).context(context);


    HELPER = new d3Helper();
    HELPER.QueueData();

    new d3Drag().setDrag();
    new d3Hover().setHover();
     

    
    $(`main canvas`).mouseleave(() => {
        currentPolygon = null;
        currentRegion = null;
        AREA_TEXT.text('');

        setRotation(true);
    });


    $(window).resize(() => {
        HELPER.setScale();
        HELPER.RenderGlobe();
    });
}








$(document).ready(() => {
    AREA_TEXT =     $('#areaText');

    
    Phone();
    Header();
    Earth();
})