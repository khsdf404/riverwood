import { REGIONS } from '/scripts/mainlands.js';
import { REGION__NAMES } from '/scripts/mainlands.js';
const COUNTRY__NAMES = (function() {
    let tmpList = [];
    REGIONS.forEach(region => {
        region.forEach(country => {
            tmpList.push(country.name);
        })
    })
    return tmpList.sort((a, b) => { return a < b ? -1 : 1 });
}()); 


const AREATYPES = {
    'country': 'country',
    'region': 'region'
}
let AREA = AREATYPES.country;





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


        this.THEME = null;
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

    setListeners() {
        $(`span.header-theme button`).click((e) => {
            if (e.currentTarget.id == 'lightBtn')
                this.setTheme(this.light)
            else if (e.currentTarget.id == 'darkBtn')
                this.setTheme(this.dark)
            else 
               console.log(e);
        })
    }
}

class SearchArea {
    setListeners() {
        $(`span.header-choosetype button`).click((e) => {
            if (e.currentTarget.id == 'regionBtn')
                AREA = AREATYPES.region;
            else 
                AREA = AREATYPES.country;

            this.RecreateSidear();
        })
    }

    RecreateSidear() {
        $(`sidebar ul`).empty();

        if (AREA == AREATYPES.region) {
            REGION__NAMES.forEach(name => {
                $(`sidebar ul`).append(this.CreateElem(name))
            });
        }
        else {
            COUNTRY__NAMES.forEach(name => {
                $(`sidebar ul`).append(this.CreateElem(name))
            }); 
        }
    }

    CreateElem(text) {
        return $(`<li>${text}</li>`);
    }
}



$(document).ready(() => {
    $(`header settings button`).click(function() {
        $(this).parent()
            .find(`button.active-btn`)
            .removeClass(`active-btn`);
        $(this).addClass(`active-btn`);
    });

    let ThemeObj = new PageThemes();
    ThemeObj.setTheme(ThemeObj.dark);
    ThemeObj.setListeners();


    let AreaObj = new SearchArea();
    AreaObj.RecreateSidear();
    AreaObj.setListeners();    
})