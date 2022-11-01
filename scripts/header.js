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
            '--sdThumbBgc': '#19aeef'
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
            '--sdThumbBgc': '#2d66c5'
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
    static setButtons(buttons, textBtn) {
        for(let i = 0; i < buttons.length; i++)
            buttons[i].text(Translater.isEnglish() ? textBtn.en[i] : textBtn.ru[i])
    }
}


class SearchArea {
    static Start(area) {
        AREA = area; 
        SearchArea.setNames(SearchArea.isRegion());


        $(`span.header-choosetype button`).click((e) => {
            AREA_TEXT.text('');
            SearchArea.setArea(e.currentTarget.id);
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
    static setArea(id) {
        if (id == 'regionBtn')  
            AREA = SearchArea.AREATYPES.region;
        else                    
            AREA = SearchArea.AREATYPES.country;
    }
    static setNames() {
        if (SearchArea.isRegion()) {
            NAMES = REGIONS.map(reg => {
                return Translater.isEnglish() ? reg.en : reg.ru;
            });
            return;
        }
        else {
            let tmpList = [];
            REGIONS.forEach(region => {
                region.obj.forEach(country => {
                    tmpList.push(Translater.isEnglish() ? country.en : country.ru);
                })
            })
            NAMES = tmpList.sort((a, b) => { return a < b ? -1 : 1 });
        }
    }


    // static setRegion() {
    //     AREA = SearchArea.AREATYPES.region;
    // };
    // static setCountry() {
    //     AREA = SearchArea.AREATYPES.country;
    // }; 
}


 


// const objList = (function() {
//     let arr = [];
//     REGIONS.forEach(el => {
//         arr = arr.concat(el);
//     });
//     arr.sort((a, b) => parseInt(a.id) - parseFloat(b.id));
//     return arr;
// }());