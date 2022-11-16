function ObjEquals(obj1, obj2) {
    return JSON.stringify(obj1) == JSON.stringify(obj2)
}

class ThemesObj {
    static Light = {
        '--based-color': '#444',
        '--revert-color': '#fff',
        '--accent-color': '#93c3ff',

        '--transition-background': '.35s',
        '--transition-color': '.15s',

        '--main-background': '#fef9f2',
        '--main-opacity': '0',
        '--edge-shadow': '0px 1px 14px -7px #777',
        
    
        '--h-background': '#fff', 
        '--controls-background': '#93c3ff',
        '--controls-border': '#676767',
        '--controls-disabledcolor': '#585858',
        '--controls-hoverBackground': '#e4e4e5',
        '--settings-background': '#d7ddf3c2', // ffffffdf // #bec1e394 // linear-gradient(45deg, #a0beeb, white) // repeating-linear-gradient(138deg, #b5d3ff85, #94b9df6e 50px) // #f9ecdcc7 // linear-gradient(39deg, #ffe7bb, #ffffffad) // #d7ddf3c2
        '--settings-filter': 'drop-shadow(6px 8px 19px #bbb)',
        '--settingsBtn-background': '#e3dfdf', // #ddeaff // #ebebeb
        '--settingsBtn-border': '1px solid #cfcfcf',
    
        '--sd-background': '#f7f7f7',
        '--placeholder-color': '#a0a0a0',
        '--list-background': '#5050502e',
        '--list-scrollbar-background': '#19aeef',
        '--list-headerColor': '#000',
        '--list-linkColor': '#0142b9',
        '--list-svgColor': '#6f54ed', 
        '--list-fontWeight': '900'
    }
    static Dark = {
        '--based-color': '#fffc',
        '--revert-color': '#444',
        '--accent-color': '#93c3ff',
 
        '--transition-background': '.7s',
        '--transition-color': '.4s',

        '--main-background': 'linear-gradient(180deg, #484848, #15151e)',
        '--main-opacity': '1',
        '--edge-shadow': '0px 1px 14px -7px #000', 
    
        '--h-background': '#2e2e2e',
        '--controls-background': '#93c3ff',
        '--controls-border': '#676767',
        '--controls-disabledcolor': '#b9b9b9',
        '--controls-hoverBackground': '#5c5c5c',
        '--settings-background': '#82828b94', // #82828b94  // linear-gradient(229deg, #6177b5, #2a2a2a)
        '--settings-filter': 'drop-shadow(6px 8px 19px #000)',
        '--settingsBtn-backgroung': '#59595f',
        '--settingsBtn-border': '1px solid #686868',

    
        '--sd-background': '#00000047',
        '--placeholder-color': '#a0a0a0',
        '--list-background': '#9d9d9d44',
        '--list-scrollbar-background': '#2d66c5',
        '--list-headerColor': '#fffc',
        '--list-linkColor': '#93c3ff',
        '--list-svgColor': '#4f94fd', 
        '--list-fontWeight': '100'
    } 



    static Start(theme) {
        ThemesObj.setTheme(theme); 

        if (CURRENT_THEME == ThemesObj.Light) 
            $(`#lightBtn`).addClass('active-btn');
        else if (CURRENT_THEME == ThemesObj.Dark) 
            $(`#darkBtn`).addClass('active-btn');


        $(`div.header-theme button`).click(function() { 
            if ($(this).hasClass(`active-btn`)) return;

            $(this).parent()
                .find(`button.active-btn`)
                .removeClass(`active-btn`);
            $(this).addClass(`active-btn`);
            
            
            ThemesObj.Animate($(this));
        });
    }
    static setTheme(id) {
        if (id == 'lightBtn' || ObjEquals(id, ThemesObj.Light)) 
            CURRENT_THEME = ThemesObj.Light;
        else if (id == 'darkBtn' || ObjEquals(id, ThemesObj.Light))
            CURRENT_THEME = ThemesObj.Dark;
        else 
            CURRENT_THEME = ThemesObj.Dark; // dynamic


            
        let keys = Object.keys(CURRENT_THEME);
        let styles =  Object.values(CURRENT_THEME);
        for (let i = 0; i < keys.length; i++)
            document
                .documentElement
                .style
                .setProperty(keys[i], styles[i]);

        localStorage.setItem('theme', JSON.stringify(CURRENT_THEME));
    }
    static Animate(jqObj) { 
        const speed = '.6s' 
        const transition = 'transform '+ speed +' ease-in-out, top '+ speed +', left '+ speed;
        const coord = jqObj.find('span').offset();
        const size = { 'width': $(`body`).outerWidth(), 'height': $(`body`).outerHeight()}
        let maxSize = Math.max(size.width, size.height);
        let maxCoord = maxSize == size.width ? size.width - coord.left : coord.top;
        let hypotenuse = Math.sqrt(size.width*size.width + size.height* size.height);

        // 20 below is a size of jqObj.span (icon of theme)
        const scale = 2 * (hypotenuse - maxCoord) / 20; 


        $themeAnim.css({
            'display': 'block',
            'background': CURRENT_THEME['--main-background'],
            'top': coord.top + 'px', 
            'left': coord.left + 'px'
        }); 
        setTimeout(() => {
            $themeAnim.css({
                'transform': 'scale('+ scale +')',
                'transition': transition
            });
        }, 1); 
        setTimeout(() => {
            ThemesObj.setTheme(jqObj.attr('id'))
            $themeAnim.css({ 
                'top': size.height * 0.9 + 'px', 
                'left': '100px',
                'transition': '0s all' 
            });
            $themeAnim.css({
                'top': size.height + 'px', 
                'left': '-21px', 
                'transform': 'scale(1)', 
                'transition': transition
            });

            setTimeout(() => {
                $themeAnim.css({
                    'display': 'none',
                    'transform': 'scale(1) translate(0, 0)', 
                    'transition': '0s all'
                }) 
            }, parseFloat(speed) * 1000);
        }, parseFloat(speed) * 1000 * 1.05);
        
    }
}


class LanguagesObj {
    static CONTENT;

    static LANGTYPES = {
        'ru': 0,
        'en': 1,
        'fr': 2,
        'sp': 3
    };
    static TEXT = {
        'ru': [
            'Страна', 
            'Регион', 
            ['К Земле', 'См. в списке'], 
            'Найти реку!'
        ], 
        'en': [
            'Country', 
            'Region', 
            ['To the Earth', 'See in list'], 
            'Find river!'
        ],
        'fr': [
            'Country', 
            'Region', 
            ['To the Earth', 'See in list'], 
            'Find river!'
        ],
        'sp': [
            'Country', 
            'Region', 
            ['To the Earth', 'See in list'], 
            'Find river!'
        ]
    }


    static Start(lang) {
        LanguagesObj.setLang(lang);
        LanguagesObj.TranslatePage();

        if (CURRENT_LANG == LanguagesObj.LANGTYPES.en)
            $(`#enBtn`).addClass(`active-btn`);
        else if (CURRENT_LANG == LanguagesObj.LANGTYPES.fr)
            $(`#frBtn`).addClass(`active-btn`);
        else if (CURRENT_LANG == LanguagesObj.LANGTYPES.sp)
            $(`#spBtn`).addClass(`active-btn`);
        else 
            $(`#ruBtn`).addClass(`active-btn`);
        
        
        
        $(`div.header-language button`).click(function() {
            if ($(this).hasClass(`active-btn`)) return;

            $(this).parent()
                .find(`button.active-btn`)
                .removeClass(`active-btn`);
            $(this).addClass(`active-btn`);


            AREA_TEXT.text('');
            LanguagesObj.setLang($(this).attr('id'));
            AreaObj.setNames();

            Page.Recreate();
        })
    }
    

    static setLang(id) {
        if (id == 'enBtn' || id == LanguagesObj.LANGTYPES.en) {
            CURRENT_LANG = LanguagesObj.LANGTYPES.en;
            LanguagesObj.CONTENT = LanguagesObj.TEXT.en;
        }
        else if (id == 'frBtn' || id == LanguagesObj.LANGTYPES.fr) {
            CURRENT_LANG = LanguagesObj.LANGTYPES.fr;
            LanguagesObj.CONTENT = LanguagesObj.TEXT.fr;
        }
        else if (id == 'spBtn' || id == LanguagesObj.LANGTYPES.sp) {
            CURRENT_LANG = LanguagesObj.LANGTYPES.sp;
            LanguagesObj.CONTENT = LanguagesObj.TEXT.sp;
        }
        else {
            CURRENT_LANG = LanguagesObj.LANGTYPES.ru;
            LanguagesObj.CONTENT = LanguagesObj.TEXT.ru;
        }

        localStorage.setItem('lang', JSON.stringify(CURRENT_LANG))
    }
    static TranslatePage() { 
        $(`#countryBtn`).text(LanguagesObj.CONTENT[0]);
        $(`#regionBtn`).text(LanguagesObj.CONTENT[1]);
        $(`#mobileScroll`).text(LanguagesObj.CONTENT[2][GLOBE_ACTIVE ? 1 : 0])
        $(`#searchInput`).attr('placeholder', LanguagesObj.CONTENT[3])
    }
    static TranslateObj(obj) {
        if (CURRENT_LANG == LanguagesObj.LANGTYPES.en)
            return obj.en;
        else if (CURRENT_LANG == LanguagesObj.LANGTYPES.fr)
            return obj.fr;
        else if (CURRENT_LANG == LanguagesObj.LANGTYPES.sp)
            return obj.sp;
        else 
            return obj.ru;
    }
}


class AreaObj {
    static AREATYPES = {
        'country': 0,
        'region': 1
    };


    static Start(area) {
        CURRENT_AREA = area; 
        AreaObj.setNames();

        if (AreaObj.isRegion())
            $(`#regionBtn`).addClass(`active-btn`);
        else 
            $(`#countryBtn`).addClass(`active-btn`);


        $(`div.header-choosetype button`).click(function() {
            if ($(this).hasClass(`active-btn`)) return;

            $(this).parent()
                .find(`button.active-btn`)
                .removeClass(`active-btn`);
            $(this).addClass(`active-btn`);



            AREA_TEXT.text(''); 
            AreaObj.setArea();
            AreaObj.setNames();
            HELPER.RenderGlobe();

            Page.Recreate();
        })
    }
    
    

    static isRegion() { 
        return CURRENT_AREA == AreaObj.AREATYPES.region;
    }
    static setArea() {
        CURRENT_AREA = CURRENT_AREA == AreaObj.AREATYPES.region ?
            AreaObj.AREATYPES.country :
            AreaObj.AREATYPES.region;
        
        localStorage.setItem('area', JSON.stringify(CURRENT_AREA));
    }
    static setNames() {
        if (AreaObj.isRegion()) {
            REGIONS.forEach(reg => {
                reg.name = LanguagesObj.TranslateObj(reg);
            })
            SIDEBAR_LIST = REGIONS;
        }
        else {
            COUNTRIES.forEach(country => {
                country.name = LanguagesObj.TranslateObj(country);
            })
            SIDEBAR_LIST = COUNTRIES.sort((a, b) => a.name < b.name ? -1 : 1);;
        }
    } 
}