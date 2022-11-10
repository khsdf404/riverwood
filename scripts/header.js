const ruBtn = $(`#ruBtn`);
const enBtn = $(`#enBtn`);
const countryBtn = $(`#countryBtn`);
const regionBtn = $(`#regionBtn`);
const buttons = [ ruBtn, enBtn, countryBtn, regionBtn ];
const textBtn = {
    'ru': ['Ru', 'En', 'Страна', 'Регион'],
    'en': ['Ru', 'En', 'Country', 'Region'],
}



class PageThemes {
    static Start(theme) {
        PageThemes.setTheme(theme);

        if (theme == PageThemes.Light) 
            $(`#lightBtn`).addClass('active-btn');
        if (theme == PageThemes.Dark) 
            $(`#darkBtn`).addClass('active-btn');


        $(`span.header-theme button`).click((e) => {
            if (e.currentTarget.id == 'lightBtn')
                PageThemes.setTheme(PageThemes.Light)
            else if (e.currentTarget.id == 'darkBtn')
                PageThemes.setTheme(PageThemes.Dark)
            else 
               console.log(e);
        });
    }
    static Light = {
        '--mainBackground': '#f3e5d56b',
        '--accentColor': '#444',
        '--revertColor': '#fff',
    
        '--headerBgc': '#fff', 
        '--headerDisabledColor': '#666',
        '--headerButtonBgc': '#93c3ff',
        '--headerDisableBtnBgc': '#b9b9b93b',
        '--headerHoverBcg': '#1e437261',
        '--headerSettingsBgc': 'linear-gradient(39deg, #ffe7bb, #ffffffad)', // #bec1e394
                                            // linear-gradient(45deg, #a0beeb, white);
                                            // repeating-linear-gradient(138deg, #b5d3ff85, #94b9df6e 50px);
                                            // #f9ecdcc7
                                            // linear-gradient(39deg, #ffe7bb, #ffffffad)
        '--headerSettingsFilter': 'drop-shadow(6px 8px 19px #bbb)',
        '--headerLogoBtnBgc': '#ebebeb', // #ddeaff #ebebeb
        '--headerLogoBtnBorder': '1px solid #cfcfcf',
    
        '--sdBackground': '#f1efec',
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
        '--headerDisabledColor': '#666',
        '--headerButtonBgc': '#93c3ff',
        '--headerDisableBtnBgc': '#fff',
        '--headerHoverBcg': '#d5e6ff',
        '--headerSettingsBgc': '#82828b94',  // linear-gradient(229deg, #6177b5, #2a2a2a)
        '--headerSettingsFilter': 'drop-shadow(6px 8px 19px #000)',
        '--headerLogoBtnBgc': '#59595f',
        '--headerLogoBtnBorder': '1px solid #686868',

    
        '--sdBackground': '#54545426',
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
        LANG = lang;
        if (Translater.isEnglish())
            $(`#enBtn`).addClass(`active-btn`);
        else 
            $(`#ruBtn`).addClass(`active-btn`);



        $(`span.header-language button`).click((e) => {
            AREA_TEXT.text('');
            Translater.setLang(e.currentTarget.id);
            SearchArea.setNames();
        })
    }
    static LANGTYPES = {
        'ru': 'ru',
        'en': 'en'
    };

    
    
    static isEnglish() {
        return LANG == Translater.LANGTYPES.en;
    }
    static setLang(id) {
        if (id == 'ruBtn')
            LANG = this.LANGTYPES.ru;
        else 
            LANG = this.LANGTYPES.en;
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


        $(`span.header-choosetype button`).click((e) => {
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


