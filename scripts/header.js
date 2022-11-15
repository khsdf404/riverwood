function ObjEquals(obj1, obj2) {
    return JSON.stringify(obj1) == JSON.stringify(obj2)
}

class ThemesObj {
    static Light = {
        '--mainBackground': '#fef9f2',
        '--accentColor': '#444',
        '--revertColor': '#fff',
    
        '--headerBgc': '#fff', 
        '--headerDisabledColor': '#585858',
        '--headerButtonBgc': '#93c3ff',
        '--headerDisableBtnBgc': '#b9b9b92b',
        '--headerHoverBcg': '#e4e4e5',
        '--headerSettingsBgc': '#d7ddf3c2', // ffffffdf
                                            // #bec1e394
                                            // linear-gradient(45deg, #a0beeb, white);
                                            // repeating-linear-gradient(138deg, #b5d3ff85, #94b9df6e 50px);
                                            // #f9ecdcc7
                                            // linear-gradient(39deg, #ffe7bb, #ffffffad)
                                            // #d7ddf3c2
        '--headerSettingsFilter': 'drop-shadow(6px 8px 19px #bbb)',
        '--headerLogoBtnBgc': '#e3dfdf', // #ddeaff #ebebeb
        '--headerLogoBtnBorder': '1px solid #cfcfcf',
    
        '--sdBackground': '#f7f7f7',
        '--sdPlaceholder': '#a0a0a0',
        '--sdListBgc': '#5050502e',
        '--sdThumbBgc': '#19aeef',
        '--sdHeaderColor': '#000',
        '--sdLinkColor': '#0142b9',
        '--sdFontWeight': '900'
    }
    static Dark = {
        '--mainBackground': 'linear-gradient(180deg, #484848, #15151e)',
        '--accentColor': '#fffc',
        '--revertColor': '#444',
    
        '--headerBgc': '#2e2e2e', 
        '--headerDisabledColor': '#b9b9b9',
        '--headerButtonBgc': '#93c3ff',
        '--headerDisableBtnBgc': '#fff',
        '--headerHoverBcg': '#5c5c5c',
        '--headerSettingsBgc': '#82828b94', // #82828b94 
                                            // linear-gradient(229deg, #6177b5, #2a2a2a)
        '--headerSettingsFilter': 'drop-shadow(6px 8px 19px #000)',
        '--headerLogoBtnBgc': '#59595f',
        '--headerLogoBtnBorder': '1px solid #686868',

    
        '--sdBackground': '#282828',
        '--sdPlaceholder': '#a0a0a0',
        '--sdListBgc': '#9d9d9d44',
        '--sdThumbBgc': '#2d66c5',
        '--sdHeaderColor': '#fffc',
        '--sdLinkColor': '#93c3ff',
        '--sdFontWeight': '100'
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
            

            ThemesObj.setTheme($(this).attr('id'))
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