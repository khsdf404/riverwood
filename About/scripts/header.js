const START_THEME =     JSON.parse(localStorage.getItem('theme'))
const START_LANG =      JSON.parse(localStorage.getItem('lang'))
const START_AREA =      JSON.parse(localStorage.getItem('area'))



function ObjEquals(obj1, obj2) {
    return JSON.stringify(obj1) == JSON.stringify(obj2)
}

class ThemesObj {
    static current;
    static isDynamic;
    static $themeAnim = $js(`#themeAnimation`); 

    static Start() {
        ThemesObj.setTheme();  
    }
    static getNextTheme = (id) => {
        if (!id) return ThemesObj.Default;
        if (id == 'lightBtn' || ObjEquals(id, ThemesObj.Light)) 
            return ThemesObj.Light;
        else if (id == 'darkBtn' || ObjEquals(id, ThemesObj.Dark))
            return ThemesObj.Dark;
        else {
            if (ThemesObj.current && ThemesObj.current == ThemesObj.Dark)
                return ThemesObj.DynamicDark;
            else if (ObjEquals(id, ThemesObj.DynamicDark))
                return ThemesObj.DynamicDark;
            else 
                return ThemesObj.DynamicLight;
        }
    }



    static setTheme(id = null) {
        ThemesObj.current = ThemesObj.getNextTheme(id || START_THEME)

        let keys = Object.keys(ThemesObj.current);
        let styles =  Object.values(ThemesObj.current);
        for (let i = 0; i < keys.length; i++)
            document
                .documentElement
                .style
                .setProperty(keys[i], styles[i]);

        ThemesObj.isDynamic = 
            ThemesObj.current == ThemesObj.DynamicDark || 
            ThemesObj.current == ThemesObj.DynamicLight;
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

        ThemesObj.$themeAnim.css({
            'display': 'block',
            'background': nextBackground,
            'top': coord.top + 'px', 
            'left': coord.left + 'px',
        });
        setTimeout(() => {
            ThemesObj.$themeAnim.animate({
                'transform': 'scale('+ scale +')'
            }, getTransition(speed), () => {
                ThemesObj.setTheme($btn.id())
                ThemesObj.$themeAnim.animate({
                    'top': size.height * 0.9 + 'px', 
                    'left': '100px',
                }, 0, () => {
                    ThemesObj.$themeAnim.animate({
                        'top': size.height + 'px', 
                        'left': '-21px', 
                        'transform': 'scale(2)', 
                    }, getTransition(speed), () => {
                        ThemesObj.$themeAnim.css({
                            'display': 'none'
                        })
                    });
                });
            });
        }, 1); 
    }



    static Light = {
        '--based-color': '#444',
        '--revert-color': '#fffc',
        '--accent-color': '#8cb9f1',
        '--light-color': '#fffc',
        '--dark-color': '#444',
        '--disabled-color': '#bbb',

        '--main-background': '#fef9f2', 
        '--main-background-size': 'initial',
        '--globe-background': 'linear-gradient(104deg, #a0c7ef8f, #0070ffad)',
        '--area-title-background': '#0000',
        '--about-background': '#f7f7f7',
        '--edge-shadow': '0px 1px 14px -7px #777',
        
    
        '--h-background': '#fff',
        '--controls-border': '1px solid #999',
        '--controls-disabledcolor': '#585858',
        '--controls-hoverBackground': '#e4e4e5',
        '--settings-background': '#d7ddf3c2',
        '--settings-filter': 'drop-shadow(6px 8px 19px #bbb)',
        '--settingsBtn-background': '#e3dfdf',
        '--settingsBtn-border': '1px solid #cfcfcf',
    
        '--sd-background': '#f7f7f7',
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
        '--light-color': '#fffc',
        '--dark-color': '#444',
        '--disabled-color': '#555',

        '--main-background': 'linear-gradient(130deg, #484848, #15151e)',
        '--main-background-size': 'initial',
        '--globe-background': 'linear-gradient(104deg, #007eff73, #00023ab3)',
        '--area-title-background': '#0000',
        '--about-background': '#232324',
        '--edge-shadow': '0px 1px 14px -7px #000', 
    
        '--h-background': '#2e2e2e', 
        '--controls-border': '1px solid #676767',
        '--controls-disabledcolor': '#b9b9b9',
        '--controls-hoverBackground': '#5c5c5c',
        '--settings-background': '#82828b94',
        '--settings-filter': 'drop-shadow(6px 8px 19px #000)',
        '--settingsBtn-background': '#59595f',
        '--settingsBtn-border': '1px solid #686868',

    
        '--sd-background': '#232324',
        '--placeholder-color': '#a0a0a0',
        '--list-background': '#9d9d9d44',
        '--list-headerColor': '#fffc',
        '--list-linkColor': '#93c3ff', 
        '--list-fontWeight': '100'
    }
    static DynamicLight = {
        '--based-color': '#444',
        '--revert-color': '#fff',
        '--accent-color': '#8cb9f1', 
        '--light-color': '#fffc',
        '--dark-color': '#444',
        '--disabled-color': '#bbb',

        '--main-background' : 'linear-gradient(135deg, #dcefff 0%,#79c1ff 20%, #46abf5 35%,#1879fb 45%, #4060ff 50%, #1d49ad 60%, #131c6e 70%, #040f46 80%,#000000 90%)',
        '--main-background-size': '250% 250%',
        '--main-background-position': '0% 0%',
        '--globe-background': 'linear-gradient(114deg, #5bacffa1, #0e007e)',
        '--area-title-background': '#fff7',
        '--about-background': '#f7f7f7',
        '--edge-shadow': '0px 1px 14px -7px #777',
        
    
        '--h-background': '#fff',
        '--controls-border': '1px solid #999',
        '--controls-disabledcolor': '#585858',
        '--controls-hoverBackground': '#e4e4e5',
        '--settings-background': '#d7ddf3c2',
        '--settings-filter': 'drop-shadow(6px 8px 19px #00000094)',
        '--settingsBtn-background': '#e3dfdf',
        '--settingsBtn-border': '1px solid #cfcfcf',
    
        '--sd-background': '#fff7',
        '--placeholder-color': '#444',
        '--list-background': '#fff',
        '--list-headerColor': '#000',
        '--list-linkColor': '#0142b9', 
        '--list-fontWeight': '900'
    }
    static DynamicDark = {
        '--based-color': '#fffc',
        '--revert-color': '#444',
        '--accent-color': '#8cb9f1', 
        '--light-color': '#fffc',
        '--dark-color': '#444',
        '--disabled-color': '#555',

        '--main-background': 'linear-gradient(135deg, #b4dcff 0%,#79c1ff 20%, #46abf5 35%,#1879fb 45%, #4060ff 50%, #1d49ad 60%, #131c6e 70%, #040f46 80%,#000000 90%)', 
        '--main-background-size': '250% 250%',
        '--main-background-position': '75% 75%',
        '--globe-background': 'linear-gradient(114deg, #5bacffa1, #0e007e)',
        '--area-title-background': '#0009',
        '--about-background': '#232324',
        '--edge-shadow': '0px 1px 14px -7px #000', 
    
        '--h-background': '#2e2e2e', 
        '--controls-border': '1px solid #676767',
        '--controls-disabledcolor': '#b9b9b9',
        '--controls-hoverBackground': '#5c5c5c',
        '--settings-background': '#82828b94',
        '--settings-filter': 'drop-shadow(6px 8px 19px #00000073)',
        '--settingsBtn-background': '#59595f',
        '--settingsBtn-border': '1px solid #686868',

    
        '--sd-background': '#0009', 
        '--placeholder-color': '#ccc',
        '--list-background': '#00000070',
        '--list-headerColor': '#fffc',
        '--list-linkColor': '#93c3ff', 
        '--list-fontWeight': '100'
    } 
    static Default = ThemesObj.Light;
}
ThemesObj.Start()

class LanguagesObj {
    static current;
    static CONTENT;
    static LANGTYPES = {
        'ru': 'ru',
        'en': 'en',
        'fr': 'fr',
        'sp': 'sp'
    };
    static TEXT = {
        'ru': [
            'Страна', 
            'Регион', 
            ['К Земле', 'См. в списке'], 
            'Найти реку!',
            // contacts
            'Реки по всему миру',
            'Этот проект задумывался как билиотека всех рек на нашей планете, он c <a href="">открытым кодом</a> и бесплатен для всех. Пожалуйста, если вы носитель английского, французского или испанского и хотите помочь с переводом страницы, проследуйте по ссылкам снизу или пришлите мне письмо на почту, начав с «Помощь в переводе»',
            'Информация о курсовой',
            'Студент: Орлов Данил',
            'Курс: 2, 1й семестр',
            'Предмет: РКЧИР',
            'Преподаватель: Дешко И.П',
            'Дата: 12.12.2022',
            'Мои контакты',
            'Ваша-почта@пример.com',
            'Ваше имя',
            'Ваше важное сообщение'
        ], 
        'en': [
            'Country', 
            'Region', 
            ['To the Earth', 'See in list'], 
            'Find river!',
            // contacts
            'Rivers all over the world',
            'This project was conceived as a library of all rivers on our planet, it\'s <a href="">opensourse</a> and free for everyone. Please, if you are a native speaker of English, French or Spanish and want to help with page translation follow links below or sent me en email, starting with "Translation help"',
            'Coursework info',
            'Student: Orlov Danil',
            'Course: 2, 1st semester',
            'Subject: Frontend',
            'Professor: Deshko I.P',
            'Date: 01.12.2022',
            'My contacts',
            'your-mail@example.com',
            'your name',
            'your important message'
        ],
        'fr': [
            'Pays', 
            'Region', 
            ['Vers La Terre', 'Voir la liste'], 
            'Trouvez la riviere!',
            // contacts
            'Rivieres partout dans le monde',
            'Ce projet a ete concu comme une bibliotheque de tous les fleuves de notre planete, il est <a href="">opensource</a> et gratuit pour tous. S\'il vous plait, si vous etes anglais, francais ou espagnol et que vous voulez aider a la traduction de la page, suivez les liens ci-dessous ou envoyez-moi un e-mail en commencant par «Aide a la traduction»',
            'Redige  info',
            'Etudiante: Orlov Danil',
            'Annee: 2, 1st semester',
            'Sujet: Frontend',
            'Professeur: Deshko I.P.',
            'Date: 01.12.2022',
            'Mes contacts',
            'votre-email@exemple.com',
            'votre nom',
            'votre message important'
        ],
        'sp': [
            'Pais', 
            'Region', 
            ['A La Tierra', 'Ver en la lista'], 
            'Encontrar el rio!',
            // contacts
            'Rios de todo el mundo',
            'Este proyecto fue concebido como una biblioteca de todos los rios de nuestro planeta, es de codigo abierto y gratuito para todos. Por favor, si usted es un hablante nativo de Ingles, frances o espanol y desea ayudar con la traduccion de la pagina, siga los enlaces de abajo o enveeme un email, comenzando con «Ayuda en la traduccion»',
            'Cursos info',
            'Estudiante: Orlov Danil',
            'Curso: 2, 1st semester',
            'Tema: Frontend',
            'Сatedratico: Deshko I.P.',
            'Fecha: 01.12.2022',
            'Mis contactos',
            'su-email@ejemplo.com',
            'su nombre',
            'su mensaje importante'
        ]
    }


    static Start() {
        LanguagesObj.setLang();
        LanguagesObj.TranslatePage();  
    }
    

    static setLang(id = null) {
        id = id || START_LANG;
        if (id == 'ruBtn' || id == LanguagesObj.LANGTYPES.ru) {
            LanguagesObj.current = LanguagesObj.LANGTYPES.ru;
            LanguagesObj.currentText = LanguagesObj.TEXT.ru;
        }
        else if (id == 'frBtn' || id == LanguagesObj.LANGTYPES.fr) {
            LanguagesObj.current = LanguagesObj.LANGTYPES.fr;
            LanguagesObj.currentText = LanguagesObj.TEXT.fr;
        }
        else if (id == 'spBtn' || id == LanguagesObj.LANGTYPES.sp) {
            LanguagesObj.current = LanguagesObj.LANGTYPES.sp;
            LanguagesObj.currentText = LanguagesObj.TEXT.sp;
        }
        else { 
            LanguagesObj.current = LanguagesObj.LANGTYPES.en;
            LanguagesObj.currentText = LanguagesObj.TEXT.en;
        }

        localStorage.setItem('lang', JSON.stringify(LanguagesObj.current))
    }
    static TranslatePage() {  
        // contacts
        $js(`.about-project-slogan`).text(LanguagesObj.currentText[4]);
        $js(`.about-project-description`).ihtml(LanguagesObj.currentText[5]);
        $js(`.about-info .about-title`).text(LanguagesObj.currentText[6]);
        $js(`.about-info li`).find(0).text(LanguagesObj.currentText[7]);
        $js(`.about-info li`).find(1).text(LanguagesObj.currentText[8]);
        $js(`.about-info li`).find(2).text(LanguagesObj.currentText[9]);
        $js(`.about-info li`).find(3).text(LanguagesObj.currentText[10]);
        $js(`.about-info li`).find(4).text(LanguagesObj.currentText[11]);
        $js(`#sendEmail`).text(LanguagesObj.currentText[12]);
        $js(`#emailAddress`).attr('placeholder', LanguagesObj.currentText[13]);
        $js(`#emailName`).attr('placeholder', LanguagesObj.currentText[14]);
        $js(`#emailLetter`).attr('placeholder', LanguagesObj.currentText[15]);
    } 
}
LanguagesObj.Start()


