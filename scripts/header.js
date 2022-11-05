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
    constructor() {
        this.light = {
            '--mainBackground': '#f3e5d56b',
            '--accentColor': '#444',
            '--revertColor': '#fff',
        
            '--headerBgc': '#fff', 
            '--headerButtonBgc': '#93c3ff',
            '--headerHoverBcg': '#1e437261',
        
            '--sdBackground': '#7c7c7c40',
            '--sdPlaceholder': '#a0a0a0',
            '--sdListBgc': '#5050502e',
            '--sdThumbBgc': '#19aeef',
            '--sdHeaderColor': '#000',
            '--sdLinkColor': '#0142b9'
        }
        this.dark = {
            '--mainBackground': 'linear-gradient(174deg, #3a3a3a, #15151e) ',
            '--accentColor': '#fffc',
            '--revertColor': '#444',
        
            '--headerBgc': '#2e2e2e', 
            '--headerButtonBgc': '#93c3ff',
            '--headerHoverBcg': '#d5e6ff',
        
            '--sdBackground': '#54545426',
            '--sdPlaceholder': '#a0a0a0',
            '--sdListBgc': '#9d9d9d44',
            '--sdThumbBgc': '#2d66c5',
            '--sdHeaderColor': '#fffc',
            '--sdLinkColor': '#93c3ff'
        }



        $(`span.header-theme button`).click((e) => {
            if (e.currentTarget.id == 'lightBtn')
                this.setTheme(this.light)
            else if (e.currentTarget.id == 'darkBtn')
                this.setTheme(this.dark)
            else 
               console.log(e);
        })
    }
    

    setTheme(theme) {
        if (theme == this.THEME) return;
        this.THEME = theme;
        let keys = Object.keys(this.THEME);
        let styles =  Object.values(this.THEME);
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
        SearchArea.setNames(SearchArea.isRegion());

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
            SIDEBAR_LIST = COUNTRIES;
        }
    }


    // static setRegion() {
    //     AREA = SearchArea.AREATYPES.region;
    // };
    // static setCountry() {
    //     AREA = SearchArea.AREATYPES.country;
    // }; 
}


