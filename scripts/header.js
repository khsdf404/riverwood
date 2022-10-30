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
        }
        this.dark = {
            '--mainBackground': 'linear-gradient(174deg, #3a3a3a, #15151e) ',
            '--accentColor': '#fff',
            '--revertColor': '#444',
        
            '--headerBgc': '#2e2e2e', 
            '--headerButtonBgc': '#93c3ff',
            '--headerHoverBcg': '#d5e6ff',
        
            '--sdBackground': '#54545426',
            '--sdPlaceholder': '#a0a0a0',
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

class Mode {
    setListeners() {
        $(`span.header-choosetype button`).click(function() {
            if ($(this).attr('id') == 'regionBtn')
                LAND__MODE = true;
            else 
                LAND__MODE = false;
        })
    }
}



$(document).ready(() => {
    $(`header settings button`).click(function() {
        $(this).parent()
            .find(`button.active-btn`)
            .removeClass(`active-btn`);
        $(this).addClass(`active-btn`);
    });


    let Themes = new PageThemes();
    Themes.setTheme(Themes.light);
    Themes.setListeners();

    let Mode = new Mode();
    Mode.setListeners();    
})