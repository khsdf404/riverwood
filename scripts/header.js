

class PageThemes {
    static Start(theme) {
        PageThemes.setTheme(theme);

        if (theme == PageThemes.Light) 
            $(`#lightBtn`).addClass('active-btn');
        if (theme == PageThemes.Dark) 
            $(`#darkBtn`).addClass('active-btn');


        $(`div.header-theme button`).click((e) => {
            if (e.currentTarget.id == 'lightBtn')
                PageThemes.setTheme(PageThemes.Light)
            else if (e.currentTarget.id == 'darkBtn')
                PageThemes.setTheme(PageThemes.Dark)
            else 
               console.log(e);
        });
    }
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
    static currentTheme;
    
    

    static setTheme(theme) {
        if (theme == PageThemes.currentTheme) return;
        PageThemes.currentTheme = theme;
        let keys = Object.keys(PageThemes.currentTheme);
        let styles =  Object.values(PageThemes.currentTheme);
        for (let i = 0; i < keys.length; i++)
            document
                .documentElement
                .style
                .setProperty(keys[i], styles[i]);
    }
}


class Translater { 
    static lang;
    static text;

    static LANGTYPES = {
        'ru': 0,
        'en': 1,
        'fr': 2,
        'sp': 3
    };
    static CONTENT = {
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
        Translater.setLang(lang);
        Translater.TranslatePage();

        if (Translater.lang == Translater.LANGTYPES.en)
            $(`#enBtn`).addClass(`active-btn`);
        else if (Translater.lang == Translater.LANGTYPES.fr)
            $(`#frBtn`).addClass(`active-btn`);
        else if (Translater.lang == Translater.LANGTYPES.sp)
            $(`#spBtn`).addClass(`active-btn`);
        else 
            $(`#ruBtn`).addClass(`active-btn`);
        
        
        
        $(`div.header-language button`).click((e) => {
            AREA_TEXT.text('');
            Translater.setLang(e.currentTarget.id);
            SearchArea.setNames();
        })
    }
    

    static setLang(id) {
        if (id == 'enBtn' || id == Translater.LANGTYPES.en) {
            Translater.lang = Translater.LANGTYPES.en;
            Translater.text = Translater.CONTENT.en;
        }
        else if (id == 'frBtn' || id == Translater.LANGTYPES.fr) {
            Translater.lang = Translater.LANGTYPES.fr;
            Translater.text = Translater.CONTENT.fr;
        }
        else if (id == 'spBtn' || id == Translater.LANGTYPES.sp) {
            Translater.lang = Translater.LANGTYPES.sp;
            Translater.text = Translater.CONTENT.sp;
        }
        else {
            Translater.lang = Translater.LANGTYPES.ru;
            Translater.text = Translater.CONTENT.ru;
        }
    }
    static TranslatePage() { 
        $(`#countryBtn`).text(Translater.text[0]);
        $(`#regionBtn`).text(Translater.text[1]);
        $(`#mobileScroll`).text(Translater.text[2][GLOBE_ACTIVE ? 1 : 0])
        $(`#searchInput`).attr('placeholder', Translater.text[3])
    }
    static TranslateObj(obj) {
        if (Translater.lang == Translater.LANGTYPES.en)
            return obj.en;
        else if (Translater.lang == Translater.LANGTYPES.fr)
            return obj.fr;
        else if (Translater.lang == Translater.LANGTYPES.sp)
            return obj.sp;
        else 
            return obj.ru;
    }
}


class SearchArea {
    static AREATYPES = {
        'country': 'country',
        'region': 'region'
    };


    static Start(area) {
        AREA = area; 
        SearchArea.setNames();

        if (SearchArea.isRegion())
            $(`#regionBtn`).addClass(`active-btn`);
        else 
            $(`#countryBtn`).addClass(`active-btn`);


        $(`div.header-choosetype button`).click((e) => {
            AREA_TEXT.text('');
            SearchArea.setArea(e.currentTarget);
            SearchArea.setNames();
        })
    }
    
    

    static isRegion() { 
        return AREA == SearchArea.AREATYPES.region;
    }
    static setArea(target) {
        if (target == regionBtn[0])  
            AREA = SearchArea.AREATYPES.region;
        else                    
            AREA = SearchArea.AREATYPES.country;
    }
    static setNames() {
        if (SearchArea.isRegion()) {
            REGIONS.forEach(reg => {
                reg.name = Translater.TranslateObj(reg);
            })
            SIDEBAR_LIST = REGIONS;
        }
        else {
            COUNTRIES.forEach(country => {
                country.name = Translater.TranslateObj(country);
            })
            SIDEBAR_LIST = COUNTRIES.sort((a, b) => a.name < b.name ? -1 : 1);;
        }
    } 
}


