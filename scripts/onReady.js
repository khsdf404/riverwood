const findCountry = (id) => {
    let output = null;
    REGIONS.forEach(reg => {
        if (output) return;
        output = reg.obj.find(function(e) {
            return parseInt(e.id) == parseInt(id)
        })
    });
    return output;
}
const findCountry2 = (id) => {
    let output = null;
    output = COUNTRIES.find(function(e) {
        return parseInt(e.id) == parseInt(id)
    })
    return output;
}





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


        Translater.setButtons();
    }
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
    });
    $(window).resize(() => {
        HELPER.setScale();
        HELPER.RenderGlobe();
    });
}
const Header = () => {
    Translater.Start(START_LANG);
    SearchArea.Start(START_AREA);
    PageThemes.Start(START_THEME);
    Page.Recreate(); 
    
    let onEarth = false;
    const scrollSpeed = 500;

    $(`section.header-settings button`).click(function() {
        $(this).parent()
            .find(`button.active-btn`)
            .removeClass(`active-btn`);
        $(this).addClass(`active-btn`);

        if (!$(this).parent('div').hasClass('header-theme'))
            Page.Recreate();
    });
    

    let isSettigns = false;
    const HideSettings = () => {
        if (isSettigns) {
            isSettigns = false; 
            $(`button#settingsBtn`).removeClass('active-btn');
            $(`section.header-settings`).animate({
                'right': '-250px' 
            }, 200) 
        }
    }
    $(`button#settingsBtn`).click(function() {
        isSettigns ? 
            $(this).removeClass('active-btn') :
            $(this).addClass('active-btn')
            
        $(`section.header-settings`).animate({
            'right': !isSettigns ? '10px' : '-250px' 
        }, !isSettigns ? 300 : 200) 
        isSettigns = !isSettigns;
    })
    $(`main`).click(() => {
        HideSettings();
    })
    $(window).on('resize', function() {
        HideSettings();

        if ($(this).outerWidth() < 750) {
            $(`main`).scrollTop($(`main`).outerHeight());
            onEarth = true;
            $(`#mobileScroll`).find('span').text('See in list')
        }
    }) 
    if ($(window).outerWidth() < 750) {
        $(`main`).scrollTop($(`main`).outerHeight());
        onEarth = true;
        $(`#mobileScroll`).find('span').text('See in list')
    }



    
    $(`#mobileScroll`).click(function() { 
        let newText = !onEarth ? 'See in list' : 'To the Earth'
        $(this).find('span').animate({
            'opacity': '0'
        }, scrollSpeed / 2.3, () => {
            $(this).find('span').text(newText)
            setTimeout(() => {
                $(this).find('span').animate({
                    'opacity': '1'
                }, scrollSpeed / 2.3)
            }, scrollSpeed / 4.6);
        })
        $(`main`).animate({
            'scrollTop': onEarth ? 
                            '0px' : 
                            $(`main`).outerHeight() + 'px'
        }, scrollSpeed, 'easeInOutQuad');
        onEarth = !onEarth;

        setTimeout(() => {
            HideSettings();
        }, scrollSpeed * (6/10));
    })
}







$(document).ready(() => {
    AREA_TEXT =     $('#areaText');

    
    Earth();
    Header();

 
})