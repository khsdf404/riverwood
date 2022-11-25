
function ObjEquals(obj1, obj2) {
    return JSON.stringify(obj1) == JSON.stringify(obj2)
}


class ThemesObj {
    static current; 

    static Start(theme) {
        ThemesObj.setTheme(theme); 


        if (ThemesObj.current == ThemesObj.Light) 
            $js(`#lightBtn`).addClass('active-btn');
        else
            $js(`#darkBtn`).addClass('active-btn');


        $js(`.header-theme button`).onEvent('click', (e) => {
            if (e.hasClass(`active-btn`)) return;
            
            e.parent()
                .find(`.active-btn`)
                .removeClass(`active-btn`);
            e.addClass(`active-btn`);
 
            ThemesObj.Animate(e);
        });
    }
    static getNextTheme = (id) => {
        if (id == 'darkBtn' || ObjEquals(id, ThemesObj.Dark))
            return ThemesObj.Dark;
        else
            return ThemesObj.Light;
    }



    static setTheme(id) {
        ThemesObj.current = ThemesObj.getNextTheme(id);

        let keys = Object.keys(ThemesObj.current);
        let styles =  Object.values(ThemesObj.current);
        for (let i = 0; i < keys.length; i++)
            document
                .documentElement
                .style
                .setProperty(keys[i], styles[i]);
        localStorage.setItem('theme', JSON.stringify(ThemesObj.current));
    } 
    static Animate($btn) {
        const getTransition = (speed) => {
            return  'transform '+ speed +'ms ease-in-out,'+
                    'top '+ speed +
                    'ms, left '+ speed + 'ms';
        } 
        const speed = 550;
        const coord = $btn.find('span').rect(); 
        const size = $js('body').rect()
        let maxSize = Math.max(size.width, size.height);
        let maxCoord = maxSize == size.width ? size.width - coord.left : coord.top;
        let hypotenuse = Math.sqrt(size.width*size.width + size.height* size.height);
        // 20 below is a size of btnDOM.span (icon of theme)
        const scale = 2 * (hypotenuse - maxCoord) / 20; 

        let nextBackground = ThemesObj.getNextTheme($btn.id())['--h-background']

        $themeAnim.css({
            'display': 'block',
            'background': nextBackground,
            'top': coord.top + 'px', 
            'left': coord.left + 'px',
        });
        setTimeout(() => {
            $themeAnim.animate({
                'transform': 'scale('+ scale +')'
            }, getTransition(speed), () => {
                ThemesObj.setTheme($btn.id())
                $themeAnim.animate({
                    'top': size.height * 0.9 + 'px', 
                    'left': '100px',
                }, 0, () => {
                    $themeAnim.animate({
                        'top': size.height + 'px', 
                        'left': '-21px', 
                        'transform': 'scale(2)', 
                    }, getTransition(speed), () => {
                        $themeAnim.css({
                            'display': 'none'
                        })
                    });
                });
            });
        }, 1); 
    }



    static Light = {
        '--based-color': '#444',
        '--revert-color': '#fff',
        '--accent-color': '#8cb9f1', 

        '--main-background': '#fef9f2', 
        '--main-backgrond-size': 'initial',
        '--globe-background': 'linear-gradient(104deg, #a0c7ef8f, #0070ffad)',
        '--area-title-background': '#0000',
        '--about-background': '#f7f7f7',
        '--edge-shadow': '0px 1px 14px -7px #777',
        
    
        '--h-background': '#fff',
        '--controls-border': '1px solid #999',
        '--controls-disabledcolor': '#585858',
        '--controls-hoverBackground': '#e4e4e5',
        '--settings-background': '#d7ddf3c2', // ffffffdf // #bec1e394 // linear-gradient(45deg, #a0beeb, white) // repeating-linear-gradient(138deg, #b5d3ff85, #94b9df6e 50px) // #f9ecdcc7 // linear-gradient(39deg, #ffe7bb, #ffffffad) // #d7ddf3c2
        '--settings-filter': 'drop-shadow(6px 8px 19px #bbb)',
        '--settingsBtn-background': '#e3dfdf', // #ddeaff // #ebebeb
        '--settingsBtn-border': '1px solid #cfcfcf',
    
        '--sd-background': '#f7f7f7', // #ffffff45
        '--placeholder-color': '#a0a0a0',
        '--list-background': '#5050502e',
        '--list-headerColor': '#000',
        '--list-linkColor': '#0142b9', 
        '--list-fontWeight': '900'
    }
    static Dark = {
        '--based-color': '#fffc',
        '--revert-color': '#444',
        '--accent-color': '#8cb9f1', 

        '--main-background': 'linear-gradient(130deg, #484848, #15151e)',
        '--main-backgrond-size': 'initial',
        '--globe-background': 'linear-gradient(104deg, #007eff73, #00023ab3)', // linear-gradient(54deg, #00004c, #0000007a)
        '--area-title-background': '#0000',
        '--about-background': '#232324',
        '--edge-shadow': '0px 1px 14px -7px #000', 
    
        '--h-background': '#2e2e2e', 
        '--controls-border': '1px solid #676767',
        '--controls-disabledcolor': '#b9b9b9',
        '--controls-hoverBackground': '#5c5c5c',
        '--settings-background': '#82828b94', // #82828b94  // linear-gradient(229deg, #6177b5, #2a2a2a)
        '--settings-filter': 'drop-shadow(6px 8px 19px #000)',
        '--settingsBtn-background': '#59595f',
        '--settingsBtn-border': '1px solid #686868',

    
        '--sd-background': '#232324', // #00000059
        '--placeholder-color': '#a0a0a0',
        '--list-background': '#9d9d9d44',
        '--list-headerColor': '#fffc',
        '--list-linkColor': '#93c3ff', 
        '--list-fontWeight': '100'
    }
}


class LanguagesObj {
    static current;
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

        if (LanguagesObj.current == LanguagesObj.LANGTYPES.en)
            $js(`#enBtn`).addClass(`active-btn`);
        else if (LanguagesObj.current == LanguagesObj.LANGTYPES.fr)
            $js(`#frBtn`).addClass(`active-btn`);
        else if (LanguagesObj.current == LanguagesObj.LANGTYPES.sp)
            $js(`#spBtn`).addClass(`active-btn`);
        else 
            $js(`#ruBtn`).addClass(`active-btn`);
        
        
        
        $js(`.header-language button`).onEvent('click', (e) => {
            if (e.hasClass(`active-btn`)) return;

            e.parent()
                .find(`.active-btn`)
                .removeClass(`active-btn`);
            e.addClass(`active-btn`);

 
            LanguagesObj.setLang(e.id()); 

            // Page.Recreate();
        })
    }
    

    static setLang(id) {
        if (id == 'enBtn' || id == LanguagesObj.LANGTYPES.en) {
            LanguagesObj.current = LanguagesObj.LANGTYPES.en;
            LanguagesObj.CONTENT = LanguagesObj.TEXT.en;
        }
        else if (id == 'frBtn' || id == LanguagesObj.LANGTYPES.fr) {
            LanguagesObj.current = LanguagesObj.LANGTYPES.fr;
            LanguagesObj.CONTENT = LanguagesObj.TEXT.fr;
        }
        else if (id == 'spBtn' || id == LanguagesObj.LANGTYPES.sp) {
            LanguagesObj.current = LanguagesObj.LANGTYPES.sp;
            LanguagesObj.CONTENT = LanguagesObj.TEXT.sp;
        }
        else { 
            LanguagesObj.current = LanguagesObj.LANGTYPES.ru;
            LanguagesObj.CONTENT = LanguagesObj.TEXT.ru;
        }

        localStorage.setItem('lang', JSON.stringify(LanguagesObj.current))
    }
    static TranslatePage() { 
        // $js(`#countryBtn`).text(LanguagesObj.CONTENT[0]);
        // $js(`#regionBtn`).text(LanguagesObj.CONTENT[1]);
        // $js(`#mobileScroll`).text(LanguagesObj.CONTENT[2][GLOBE_ACTIVE ? 1 : 0])
        // $js(`#searchInput`).attr('placeholder', LanguagesObj.CONTENT[3])
    }
    static TranslateObj(obj) {
        if (LanguagesObj.current == LanguagesObj.LANGTYPES.en)
            return obj.en;
        else if (LanguagesObj.current == LanguagesObj.LANGTYPES.fr)
            return obj.fr;
        else if (LanguagesObj.current == LanguagesObj.LANGTYPES.sp)
            return obj.sp;
        else 
            return obj.ru;
    }
}
