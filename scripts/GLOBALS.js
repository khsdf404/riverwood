// array of obj
const REGIONS = [
    {
        'obj': RegionEnum.ASIA,
        'ru': 'Азия',
        'en': 'Asia'
    },
    {
        'obj': RegionEnum.AFRICA,
        'ru': 'Африка',
        'en': 'Africa'
    },
    {
        'obj': RegionEnum.AUSTRALIA,
        'ru': 'Австралия',
        'en': 'Africa'
    },
    {
        'obj': RegionEnum.EUROPE,
        'ru': 'Европа',
        'en': 'Europe'
    },
    {
        'obj': RegionEnum.NORTH__AMERICA,
        'ru': 'Северная Америка',
        'en': 'North America'
    },
    {
        'obj': RegionEnum.CENTRAL__AMERICA,
        'ru': 'Центральная Америка',
        'en': 'Central America'
    },
    {
        'obj': RegionEnum.SOUTH__AMERICA,
        'ru': 'Южная Америка',
        'en': 'South America'
    },
    {
        'obj': RegionEnum.OCEANIA,
        'ru': 'Океания',
        'en': 'Oceania'
    }
]; 
var NAMES, AREA, AREA_TEXT, LANG;




class Sidebar {
    static Recreate() {
        function CreateElem(text) {
            return $(`<li>${text}</li>`);
        }
        $(`sidebar ul`).empty();
        NAMES.forEach(name => {
            $(`sidebar ul`).append(CreateElem(name))
        });
    }
}

class Translater { 
    static Start() { 
        LANG = Translater.LANGTYPES.ru;
        $(`span.header-language button`).click((e) => {
            AREA_TEXT.text('');
            Translater.setLang(e.currentTarget.id);
            SearchArea.setNames();
            Sidebar.Recreate();
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
}

class SearchArea {
    static Start() {
        AREA = SearchArea.AREATYPES.country; 
        SearchArea.setNames(SearchArea.isRegion());


        $(`span.header-choosetype button`).click((e) => {
            AREA_TEXT.text('');
            SearchArea.setArea(e.currentTarget.id);
            SearchArea.setNames(SearchArea.isRegion());
            Sidebar.Recreate(); 
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