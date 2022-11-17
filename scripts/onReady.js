class Page { 
    static Recreate() {
        function CreateElem(text, riversArr) { 
            // (${riversArr.length})
            let cell = $(`
                <li>
                    <h6>${text}
                        <span class="non-select">
                        [${riversArr.length}]
                        </span>
                        <span class="listLink" style="font-size: 0; display: none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" style="align-self: center; height: 24px; color: var(--list-linkColor)" fill="currentColor">
                            <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/> 
                            <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                            </svg>
                        </span>
                    </h6>
                </li>`
            );
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
        AreaObj.currentList.forEach(e => 
            $(`#areaList`).append(CreateElem(e.name, e.rivers))
        );
        $(`#areaList li h6`).click(function(e) {
            let parent = $(this).parent('li');
            let div = parent.find('div');
            $(`.sidebar-active-item`).not(parent).removeClass(`sidebar-active-item`);
            parent.toggleClass(`sidebar-active-item`);
            if (parent.hasClass(`sidebar-active-item`)) {
                div.css({'max-height': (div.find('a').length * 40) + 'px'});
                $(this).find('span').eq(0).css({'display': 'none'});
                $(this).find('span').eq(1).css({'display': 'flex'});
            }
            else { 
                div.css({'max-height': '0px'});
                $(this).find('span').eq(0).css({'display': 'flex'});
                $(this).find('span').eq(1).css({'display': 'none'});
            }
        })
        $(`.listLink`).click(function() {
            AreaPage($(this).parent('li').find('h6').text())
        })

        LanguagesObj.TranslatePage();
    }
}


const Phone = () => {
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


    if ($(window).outerWidth() < 750) {
        GLOBE_ACTIVE = true; 
        $(`main`).scrollTop($(`main`).outerHeight());       
    }
    

    
    $(window).resize(() => { 
        if (isPhone() && $(window).outerWidth() < 750) {
            GLOBE_ACTIVE = $(`main`).scrollTop() > 0
            LanguagesObj.TranslatePage()
        }
    })

   

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
        $(GLOBE_ACTIVE ? 'article' : 'aside')[0].scrollIntoView({
            behavior: "smooth",
            block: "start"
        }); 

        setTimeout(() => {
            HideSettings();
            LanguagesObj.TranslatePage();
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
    HELPER.QueueData();

    new d3Drag().setDrag();
    new d3Hover().setHover(); 
    if (!isPhone()) new d3Click().setClick();
    
    $(`main canvas`).mouseleave(() => {
        $areaName.text('');

        currentPolygon = null;
        currentRegion = null;
        HELPER.RenderGlobe();

        setRotation(true);
    });


    $(window).resize(() => {
        HELPER.setScale();
        HELPER.RenderGlobe();
    });
}



$(document).ready(() => { 
    Phone();
    Header();
    Earth();
})


/*
@keyframes color {
	0%   { background: #101010; }
  50%  { background: #93acff; } 
	100% { background: #101010; }
}
@keyframes stars {
	0%   { opacity: 1; }
  1%   { opacity: .9; }
  2%   { opacity: .6; }
  3%   { opacity: .85; }
  4%   { opacity: 1; }
  5%   { opacity: .4; }
  6%   { opacity: .7; }
  7%   { opacity: 1; }
  8%   { opacity: .8; }
  9%   { opacity: .3; }
  10%  { opacity: 0; } 
  90%  {  opacity: 0; } 
	100% {  opacity: 1; }
}

body { 
  animation: color 45s infinite linear;
  text-align: center;
  padding: 2em;
}
span {
  width: 2px;
  height: 2px;
  position: absolute;
  display: flex;
  background: #fff;
  animation: stars 45s infinite linear;
}

div {}
*/