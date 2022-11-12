const ruBtn = $(`#ruBtn`);
const enBtn = $(`#enBtn`);
const countryBtn = $(`#countryBtn`);
const regionBtn = $(`#regionBtn`);
const buttons = [ countryBtn, regionBtn ];
const textBtn = {
    'ru': ['Страна', 'Регион'],
    'en': ['Country', 'Region'],
}



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
    static Start(lang) { 
        Translater.lang = lang;
        if (Translater.isEnglish())
            $(`#enBtn`).addClass(`active-btn`);
        else 
            $(`#ruBtn`).addClass(`active-btn`);



        $(`div.header-language button`).click((e) => {
            AREA_TEXT.text('');
            Translater.setLang(e.currentTarget.id);
            SearchArea.setNames();
        })
    }
    static LANGTYPES = {
        'ru': 'ru',
        'en': 'en'
    };
    static lang;
    
    
    static isEnglish() {
        return Translater.lang == Translater.LANGTYPES.en;
    }
    static setLang(id) {
        if (id == 'ruBtn')
            Translater.lang = this.LANGTYPES.ru;
        else 
            Translater.lang = this.LANGTYPES.en;
    }
    static setButtons() {
        for(let i = 0; i < buttons.length; i++)
            buttons[i].text(Translater.isEnglish() ? textBtn.en[i] : textBtn.ru[i])
    }
}


class SearchArea {
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
    static AREATYPES = {
        'country': 'country',
        'region': 'region'
    };
    

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
                reg.name = 
                    Translater.isEnglish() ? 
                        reg.en :
                        reg.ru
            })
            SIDEBAR_LIST = REGIONS;
        }
        else {
            COUNTRIES.forEach(country => {
                country.name = 
                    Translater.isEnglish() ? 
                        country.en :
                        country.ru
            })
            SIDEBAR_LIST = COUNTRIES.sort((a, b) => a.name < b.name ? -1 : 1);;
        }
    }


    // static setRegion() {
    //     AREA = SearchArea.AREATYPES.region;
    // };
    // static setCountry() {
    //     AREA = SearchArea.AREATYPES.country;
    // }; 
}


