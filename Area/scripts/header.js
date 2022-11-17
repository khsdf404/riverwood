function ObjEquals(obj1, obj2) {
    return JSON.stringify(obj1) == JSON.stringify(obj2)
}

class ThemesObj {
    static Light = {
        '--based-color': '#444',
        '--revert-color': '#fff',
        '--accent-color': '#93c3ff', 

        '--main-background': '#fef9f2', 
        '--edge-shadow': '0px 1px 14px -7px #777',
        
    
        '--h-background': '#fff', 
        '--controls-background': '#93c3ff',
        '--controls-border': '1px solid #999',
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
        '--list-fontWeight': '900'
    }
    static Dark = {
        '--based-color': '#fffc',
        '--revert-color': '#444',
        '--accent-color': '#93c3ff', 

        '--main-background': 'linear-gradient(180deg, #484848, #15151e)', 
        '--edge-shadow': '0px 1px 14px -7px #000', 
    
        '--h-background': '#2e2e2e',
        '--controls-background': '#93c3ff',
        '--controls-border': ' 1px solid #676767',
        '--controls-disabledcolor': '#b9b9b9',
        '--controls-hoverBackground': '#5c5c5c',
        '--settings-background': '#82828b94', // #82828b94  // linear-gradient(229deg, #6177b5, #2a2a2a)
        '--settings-filter': 'drop-shadow(6px 8px 19px #000)',
        '--settingsBtn-background': '#59595f',
        '--settingsBtn-border': '1px solid #686868',

    
        '--sd-background': '#00000047',
        '--placeholder-color': '#a0a0a0',
        '--list-background': '#9d9d9d44',
        '--list-scrollbar-background': '#2d66c5',
        '--list-headerColor': '#fffc',
        '--list-linkColor': '#93c3ff', 
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
            

            ThemesObj.setTheme($(this).attr('id'))
        });
    }
    static setTheme(id) {
        log(id)
        log(ObjEquals(id, ThemesObj.Light))
        log(JSON.stringify(id))
        log(JSON.stringify(ThemesObj.Light))
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

    }
}
