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


        if (ObjEquals(ThemesObj.current, ThemesObj.Light)) 
            $js(`#lightBtn`).addClass('active-btn')
        else if (ObjEquals(ThemesObj.current, ThemesObj.Dark))
            $js(`#darkBtn`).addClass('active-btn');
        else 
            $js(`#dynamicBtn`).addClass('active-btn') 


        $js(`.header-theme button`).onEvent('click', (e) => { 
            log(e)
            log('bebroid    ')
            if (e.hasClass(`active-btn`)) return;
            
            e.parent()
                .find(`.active-btn`)
                .removeClass(`active-btn`);
            e.addClass(`active-btn`);

            D3.RemoveStars();
            ThemesObj.Animate(e);
        });
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
    static DynamicLight = {
        '--based-color': '#444',
        '--revert-color': '#fff',
        '--accent-color': '#8cb9f1', 

        '--main-background' : 'linear-gradient(135deg, #b4dcff 0%,#79c1ff 20%, #46abf5 35%,#1879fb 45%, #4060ff 50%, #1d49ad 60%, #131c6e 70%, #040f46 80%,#000000 90%)',
        '--main-backgrond-size': '250% 250%',
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
        
        '--main-background': 'linear-gradient(135deg, #b4dcff 0%,#79c1ff 20%, #46abf5 35%,#1879fb 45%, #4060ff 50%, #1d49ad 60%, #131c6e 70%, #040f46 80%,#000000 90%)', 
        '--main-backgrond-size': '250% 250%',
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
            'Свяжитесь со мной',
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
            'Contact me',
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
            'Contactez-moi',
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
            'Pongase en contacto conmigo',
            'su-email@ejemplo.com',
            'su nombre',
            'su mensaje importante'
        ]
    }


    static Start() {
        LanguagesObj.setLang();
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
            LanguagesObj.TranslatePage(true);
            AreaObj.setNames();

            AsideObj.Recreate();
        })
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
    static TranslatePage(GLOBE_VIEW) { 
        $js(`#countryBtn`).text(LanguagesObj.currentText[0]);
        $js(`#regionBtn`).text(LanguagesObj.currentText[1]);
        $js(`#scrollBtn`).text(LanguagesObj.currentText[2][GLOBE_VIEW ? 1 : 0])
        $js(`#searchInput`).attr('placeholder', LanguagesObj.currentText[3]);
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
LanguagesObj.Start()

class AreaObj {
    static current;
    static currentList;

    static Start() {
        AreaObj.setArea();
        AreaObj.setNames();

        if (AreaObj.isRegion())
            $js(`#regionBtn`).addClass(`active-btn`);
        else 
            $js(`#countryBtn`).addClass(`active-btn`);


        $js(`.header-choosetype button`).onEvent('click', (e) => {
            if (e.hasClass(`active-btn`)) return;

            e.parent()
                .find(`.active-btn`)
                .removeClass(`active-btn`);
            e.addClass(`active-btn`);
 

            AreaObj.setArea(e.id());
            AreaObj.setNames();
            D3.RenderGlobe();

            AsideObj.Recreate();
        })
    }

    static isRegion() { 
        return AreaObj.current == AreaObj.AREATYPES.region;
    }
    static setArea(id = null) {
        id = id || START_AREA;
        if (id == 'regionBtn' || ObjEquals(id, AreaObj.AREATYPES.region)) {
            AreaObj.current = AreaObj.AREATYPES.region;
        }
        else {
            AreaObj.current = AreaObj.AREATYPES.country
        }
        localStorage.setItem('area', JSON.stringify(AreaObj.current));
    }
    static setNames() {
        if (AreaObj.isRegion()) {
            AreaObj.REGIONS.forEach(reg => {
                reg.name = LanguagesObj.TranslateObj(reg);
            })
            AreaObj.currentList = AreaObj.REGIONS;
        }
        else {
            AreaObj.COUNTRIES.forEach(country => {
                country.name = LanguagesObj.TranslateObj(country);
            })
            AreaObj.currentList = AreaObj.COUNTRIES.sort((a, b) => a.name < b.name ? -1 : 1);
        }
    }  


    static AREATYPES = {
        'country': 'country',
        'region': 'region'
    };
    static COUNTRIES = [
        {'id': '12', 'en': 'Algeria', 'fr': 'Algerie', 'sp': 'Argelia', 'ru': 'Алжир'},
        {'id': '24', 'en': 'Angola', 'fr': 'Angola', 'sp': 'Angola', 'ru': 'Ангола'},
        {'id': '72', 'en': 'Botswana', 'fr': 'Botswana', 'sp': 'Botswana', 'ru': 'Ботсвана'},
        {'id': '108', 'en': 'Burundi', 'ru': 'Бурунди'},
        {'id': '120', 'en': 'Cameroon', 'ru': 'Камерун'},
        {'id': '132', 'en': 'Cape Verde', 'ru': 'Кабо-Верде'},
        {'id': '140', 'en': 'Central African Republic', 'ru': 'Центральная Африкальная Республика'},
        {'id': '148', 'en': 'Chad', 'ru': 'Чад'},
        {'id': '174', 'en': 'Comoros', 'ru': 'Коморы'},
        {'id': '178', 'en': 'Republic of the Congo', 'ru': 'Конго'},
        {'id': '180', 'en': 'Democratic Republic of the Congo', 'ru': 'Демократическая Республика Конго'},
        {'id': '204', 'en': 'Benin', 'ru': 'Бенин'},
        {'id': '226', 'en': 'Equatorial Guinea', 'ru': 'Экваториальная Гвинея'},
        {'id': '231', 'en': 'Ethiopia', 'ru': 'Эфиопия'},
        {'id': '232', 'en': 'Eritrea', 'ru': 'Эритрея'},
        {'id': '262', 'en': 'Djibouti', 'ru': 'Джибути'},
        {'id': '266', 'en': 'Gabon', 'ru': 'Габон'},
        {'id': '270', 'en': 'Gambia', 'ru': 'Гамбия'},
        {'id': '288', 'en': 'Ghana', 'ru': 'Гана'},
        {'id': '324', 'en': 'Guinea', 'ru': 'Гвинея'},
        {'id': '384', 'en': 'Ivory Coast', 'ru': 'Кот-д’Ивуар'},
        {'id': '404', 'en': 'Kenya', 'ru': 'Кения'},
        {'id': '426', 'en': 'Lesotho', 'ru': 'Лесото'},
        {'id': '430', 'en': 'Liberia', 'ru': 'Либерия'},
        {'id': '434', 'en': 'Libya', 'ru': 'Ливия'},
        {'id': '454', 'en': 'Malawi', 'ru': 'Малави'},
        {'id': '466', 'en': 'Mali', 'ru': 'Мали'},
        {'id': '478', 'en': 'Mauritania', 'ru': 'Мавритания'},
        {'id': '480', 'en': 'Mauritius', 'ru': 'Маврикий'},
        {'id': '504', 'en': 'Morocco', 'ru': 'Марокко'},
        {'id': '508', 'en': 'Mozambique', 'ru': 'Мозамбик'},
        {'id': '516', 'en': 'Namibia', 'ru': 'Намибия'},
        {'id': '562', 'en': 'Niger', 'ru': 'Нигер'},
        {'id': '566', 'en': 'Nigeria', 'ru': 'Нигерия'},
        {'id': '624', 'en': 'Guinea-Bissau', 'ru': 'Гвинея-Биссау'},
        {'id': '646', 'en': 'Rwanda', 'ru': 'Руанда'},
        {'id': '678', 'en': 'Sao Tome and Principe', 'ru': 'Сан-Томе и Принсипи'},
        {'id': '686', 'en': 'Senegal', 'ru': 'Сенегал'},
        {'id': '690', 'en': 'Seychelles', 'ru': 'Сейшельские Острова'},
        {'id': '694', 'en': 'Sierra Leone', 'ru': 'Сьерра Леоне'},
        {'id': '706', 'en': 'Somalia', 'ru': 'Сомали'},
        {'id': '710', 'en': 'South Africa', 'ru': 'ЮАР'},
        {'id': '716', 'en': 'Zimbabwe', 'ru': 'Зимбабве'},
        {'id': '728', 'en': 'South Sudan', 'ru': 'Южный Судан'},
        {'id': '729', 'en': 'Sudan', 'ru': 'Судан'},
        {'id': '732', 'en': 'Western Sahara', 'ru': 'Западная Сахара'},
        {'id': '748', 'en': 'Swaziland', 'ru': 'Эсватини'},
        {'id': '768', 'en': 'Togo', 'ru': 'Того'},
        {'id': '788', 'en': 'Tunisia', 'ru': 'Тунис'},
        {'id': '800', 'en': 'Uganda', 'ru': 'Уганда'},
        {'id': '818', 'en': 'Egypt', 'ru': 'Египет'},
        {'id': '834', 'en': 'Tanzania', 'ru': 'Танзания'},
        {'id': '854', 'en': 'Burkina Faso', 'ru': 'Буркина Фасо'},
        {'id': '894', 'en': 'Zambia', 'ru': 'Забмия'},
        
    
    
    
    
        {'id': '124', 'en': 'Canada', 'ru': 'Канада'},
        {'id': '484', 'en': 'Mexico', 'ru': 'Мексика'},
        {'id': '840', 'en': 'United States of America', 'ru': 'США'},
         
    
        {'id': '84', 'en': 'Belize', 'ru': 'Белиз'},
        {'id': '188', 'en': 'Costa Rica', 'ru': 'Коста Рика'},
        {'id': '222', 'en': 'El Salvador', 'ru': 'Сальвадор'},
        {'id': '320', 'en': 'Guatemala', 'ru': 'Гватемала'},
        {'id': '340', 'en': 'Honduras', 'ru': 'Гондурас'},
        {'id': '558', 'en': 'Nicaragua', 'ru': 'Никарагуа'},
        {'id': '591', 'en': 'Panama', 'ru': 'Панама'},
    
    
    
    
        
        {'id': '32', 'en': 'Argentina', 'ru': 'Аргентина'},
        {'id': '68', 'en': 'Bolivia', 'ru': 'Боливия'},
        {'id': '76', 'en': 'Brazil', 'ru': 'Бразилия'},
        {'id': '152', 'en': 'Chile', 'ru': 'Чили'},
        {'id': '170', 'en': 'Colombia', 'ru': 'Колумбия'},
        {'id': '218', 'en': 'Ecuador', 'ru': 'Эквадор'},
        {'id': '328', 'en': 'Guyana', 'ru': 'Гайана'},
        {'id': '600', 'en': 'Paraguay', 'ru': 'Парагвай'},
        {'id': '604', 'en': 'Peru', 'ru': 'Перу'},
        {'id': '740', 'en': 'Suriname', 'ru': 'Суринам'},
        {'id': '858', 'en': 'Uruguay', 'ru': 'Уругвай'},
        {'id': '862', 'en': 'Venezuela', 'ru': 'Венесуэла'},
        
    
        {'id': '4', 'en': 'Afghanistan', 'ru': 'Афганистан'},
        {'id': '31', 'en': 'Azerbaijan', 'ru': 'Азербайджан'},
        {'id': '51', 'en': 'Armenia', 'ru': 'Армения'},
        {'id': '48', 'en': 'Bahrain', 'ru': 'Бахрейн'},
        {'id': '50', 'en': 'Bangladesh', 'ru': 'Бангладеш'},
        {'id': '64', 'en': 'Bhutan', 'ru': 'Бутан'},
        {'id': '96', 'en': 'Brunei Darussalam', 'ru': 'Бруней'},
        {'id': '104', 'en': 'Myanmar', 'ru': 'Мьянма'},
        {'id': '116', 'en': 'Cambodia', 'ru': 'Камбоджа'},
        {'id': '144', 'en': 'Sri Lanka', 'ru': 'Шри Ланка'},
        {'id': '156', 'en': 'China', 'ru': 'Китай'},
        {'id': '158', 'en': 'Taiwan, Province of China', 'ru': 'Тайвань, Провинция Китая'},
        {'id': '626', 'en': 'East Timor', 'ru': 'Восточный Тимор'},
        {'id': '268', 'en': 'Georgia', 'ru': 'Грузия'},
        {'id': '356', 'en': 'India', 'ru': 'Индия'},
        {'id': '360', 'en': 'Indonesia', 'ru': 'Индонезия'},
        {'id': '364', 'en': 'Iran', 'ru': 'Иран'},
        {'id': '368', 'en': 'Iraq', 'ru': 'Ирак'},
        {'id': '376', 'en': 'Israel', 'ru': 'Израиль'},
        {'id': '392', 'en': 'Japan', 'ru': 'Япония'},
        {'id': '400', 'en': 'Jordan', 'ru': 'Иордания'},
        {'id': '398', 'en': 'Kazakhstan', 'ru': 'Казахстан'},    
        {'id': '408', 'en': 'North Korea', 'ru': 'Северная Корея'},
        {'id': '410', 'en': 'South Korea', 'ru': 'Южная Корея'},
        {'id': '414', 'en': 'Kuwait', 'ru': 'Кувейт'},
        {'id': '417', 'en': 'Kyrgyzstan', 'ru': 'Киргизия'},
        {'id': '418', 'en': 'Laos', 'ru': 'Лаос'},
        {'id': '422', 'en': 'Lebanon', 'ru': 'Ливан'},
        {'id': '458', 'en': 'Malaysia', 'ru': 'Малайзия'},
        {'id': '462', 'en': 'Maldives', 'ru': 'Мальдивы'},
        {'id': '496', 'en': 'Mongolia', 'ru': 'Монголия'},
        {'id': '512', 'en': 'Oman', 'ru': 'Оман'},
        {'id': '524', 'en': 'Nepal', 'ru': 'Непал'},
        {'id': '586', 'en': 'Pakistan', 'ru': 'Пакистан'},
        {'id': '608', 'en': 'Philippines', 'ru': 'Филиппины'},
        {'id': '634', 'en': 'Qatar', 'ru': 'Катар'},
        {'id': '643', 'en': 'Russian Federation', 'ru': 'Россия'},
        {'id': '682', 'en': 'Saudi Arabia', 'ru': 'Саудовская Аравия'},
        {'id': '702', 'en': 'Singapore', 'ru': 'Сингапур'},
        {'id': '704', 'en': 'Vietnam', 'ru': 'Вьетнам'},
        {'id': '760', 'en': 'Syria', 'ru': 'Сирия'},
        {'id': '762', 'en': 'Tajikistan', 'ru': 'Таджикистан'},
        {'id': '764', 'en': 'Thailand', 'ru': 'Тайланд'},
        {'id': '784', 'en': 'United Arab Emirates', 'ru': 'ОАЭ'},
        {'id': '792', 'en': 'Turkey', 'ru': 'Турция'},
        {'id': '795', 'en': 'Turkmenistan', 'ru': 'Туркменистан'},
        {'id': '860', 'en': 'Uzbekistan', 'ru': 'Узбекистан'},
        {'id': '887', 'en': 'Yemen', 'ru': 'Йемен'},
    
        {'id': '8', 'en': 'Albania', 'ru': 'Албания'},
        {'id': '20', 'en': 'Andorra', 'ru': 'Андорра'},
        {'id': '40', 'en': 'Austria', 'ru': 'Австрия'},
        {'id': '56', 'en': 'Belgium', 'ru': 'Бельгия'},
        {'id': '70', 'en': 'Bosnia and Herzegovina', 'ru': 'Босния и Герцеговина'},
        {'id': '100', 'en': 'Bulgaria', 'ru': 'Болгария'},
        {'id': '112', 'en': 'Belarus', 'ru': 'Беларусь'},
        {'id': '191', 'en': 'Croatia', 'ru': 'Хорватия'},
        {'id': '196', 'en': 'Cyprus', 'ru': 'Кипр'},
        {'id': '203', 'en': 'Czech Republic', 'ru': 'Чехия'}, 
        {'id': '209', 'en': 'Denmark', 'ru': 'Дания'},
        {'id': '233', 'en': 'Estonia', 'ru': 'Эстония'},
        {'id': '246', 'en': 'Finland', 'ru': 'Финляндия'}, 
        {'id': '251', 'en': 'France', 'ru': 'Франция'},
        {'id': '276', 'en': 'Germany', 'ru': 'Германия'},
        {'id': '300', 'en': 'Greece', 'ru': 'Греция'},
        {'id': '348', 'en': 'Hungary', 'ru': 'Венгрия'},
        {'id': '352', 'en': 'Iceland', 'ru': 'Исландия'},
        {'id': '372', 'en': 'Ireland', 'ru': 'Ирландия'},
        {'id': '380', 'en': 'Italy', 'ru': 'Италия'},
        {'id': '428', 'en': 'Latvia', 'ru': 'Латвия'},
        {'id': '438', 'en': 'Liechtenstein', 'ru': 'Лихтенштейн'},
        {'id': '440', 'en': 'Lithuania', 'ru': 'Литва'},
        {'id': '442', 'en': 'Luxembourg', 'ru': 'Люксембург'},
        {'id': '492', 'en': 'Monaco', 'ru': 'Монако'},
        {'id': '498', 'en': 'Moldova', 'ru': 'Молдавия'},
        {'id': '499', 'en': 'Montenegro', 'ru': 'Черногория'},
        {'id': '528', 'en': 'Netherlands', 'ru': 'Нидерланды'},
        {'id': '578', 'en': 'Norway', 'ru': 'Норвегия'},
        {'id': '616', 'en': 'Poland', 'ru': 'Польша'},
        {'id': '620', 'en': 'Portugal', 'ru': 'Португалия'},
        {'id': '642', 'en': 'Romania', 'ru': 'Румыния'},
        {'id': '688', 'en': 'Serbia', 'ru': 'Сербия'},
        {'id': '703', 'en': 'Slovakia', 'ru': 'Словакия'},
        {'id': '705', 'en': 'Slovenia', 'ru': 'Словения'},
        {'id': '724', 'en': 'Spain', 'ru': 'Испания'},
        {'id': '752', 'en': 'Sweden', 'ru': 'Швеция'},
        {'id': '756', 'en': 'Switzerland', 'ru': 'Швейцария'},
        {'id': '804', 'en': 'Ukraine', 'ru': 'Украина'}, // change get крым 
        {'id': '807', 'en': 'Macedonia', 'ru': 'Македония'},
        {'id': '827', 'en': 'United Kingdom', 'ru': 'Англия'},
        {'id': '901', 'en': 'Kosovo', 'ru': 'Косово'},
    
        {'id': '36', 'en': 'Australia', 'ru': 'Австралия'},
    
    
        {'id': '10', 'en': 'Antarctica', 'ru': 'Антарктика'},
        
        {'id': '44', 'en': 'Bahamas', 'ru': 'Багамские Острова'},
        {'id': '90', 'en': 'Solomon Islands', 'ru': 'Соломоновы Острова'},
        {'id': '192', 'en': 'Cuba', 'ru': 'Куба'},
        {'id': '214', 'en': 'Dominican Republic', 'ru': 'Доминиканская Республика'},
        {'id': '242', 'en': 'Fiji', 'ru': 'Фиджи'}, 
        {'id': '304', 'en': 'Greenland (Denmark)', 'ru': 'Гренландия (Denmark)'},
        {'id': '332', 'en': 'Haiti', 'ru': 'Гаити'}, 
        {'id': '388', 'en': 'Jamaica', 'ru': 'Ямайка'}, 
        {'id': '540', 'en': 'New Caledonia', 'ru': 'Новая Каледония'}, 
        {'id': '548', 'en': 'Vanuatu', 'ru': 'Вануату'},
        {'id': '554', 'en': 'New Zealand', 'ru': 'Новая Зеландия'},
        {'id': '598', 'en': 'Papua New Guinea', 'ru': 'Папуа – Новая Гвинея'}, 
        {'id': '630', 'en': 'Puerto Rico', 'ru': 'Пуэрто-Рико'},
        {'id': '780', 'en': 'Trinidad and Tobago', 'ru': 'Тринидад и Тобаго'},   
    ]
    static REGIONS = [
        {
            'obj': [
                {'id': '4', 'en': 'Afghanistan', 'ru': 'Афганистан'},
                {'id': '31', 'en': 'Azerbaijan', 'ru': 'Азербайджан'},
                {'id': '51', 'en': 'Armenia', 'ru': 'Армения'},
                {'id': '48', 'en': 'Bahrain', 'ru': 'Бахрейн'},
                {'id': '50', 'en': 'Bangladesh', 'ru': 'Бангладеш'},
                {'id': '64', 'en': 'Bhutan', 'ru': 'Бутан'},
                {'id': '96', 'en': 'Brunei Darussalam', 'ru': 'Бруней'},
                {'id': '104', 'en': 'Myanmar', 'ru': 'Мьянма'},
                {'id': '116', 'en': 'Cambodia', 'ru': 'Камбоджа'},
                {'id': '144', 'en': 'Sri Lanka', 'ru': 'Шри Ланка'},
                {'id': '156', 'en': 'China', 'ru': 'Китай'},
                {'id': '158', 'en': 'Taiwan, Province of China', 'ru': 'Тайвань, Провинция Китая'},
                {'id': '275', 'en': 'Palestinian Territory', 'ru': 'Палестинские территории'},
                {'id': '626', 'en': 'East Timor', 'ru': 'Восточный Тимор'},
                {'id': '268', 'en': 'Georgia', 'ru': 'Грузия'},
                {'id': '356', 'en': 'India', 'ru': 'Индия'},
                {'id': '360', 'en': 'Indonesia', 'ru': 'Индонезия'},
                {'id': '364', 'en': 'Iran', 'ru': 'Иран'},
                {'id': '368', 'en': 'Iraq', 'ru': 'Ирак'},
                {'id': '376', 'en': 'Israel', 'ru': 'Израиль'},
                {'id': '392', 'en': 'Japan', 'ru': 'Япония'},
                {'id': '400', 'en': 'Jordan', 'ru': 'Иордания'},
                {'id': '398', 'en': 'Kazakhstan', 'ru': 'Казахстан'},    
                {'id': '408', 'en': 'North Korea', 'ru': 'Северная Корея'},
                {'id': '410', 'en': 'South Korea', 'ru': 'Южная Корея'},
                {'id': '414', 'en': 'Kuwait', 'ru': 'Кувейт'},
                {'id': '417', 'en': 'Kyrgyzstan', 'ru': 'Киргизия'},
                {'id': '418', 'en': 'Laos', 'ru': 'Лаос'},
                {'id': '422', 'en': 'Lebanon', 'ru': 'Ливан'},
                {'id': '458', 'en': 'Malaysia', 'ru': 'Малайзия'},
                {'id': '462', 'en': 'Maldives', 'ru': 'Мальдивы'},
                {'id': '496', 'en': 'Mongolia', 'ru': 'Монголия'},
                {'id': '512', 'en': 'Oman', 'ru': 'Оман'},
                {'id': '524', 'en': 'Nepal', 'ru': 'Непал'},
                {'id': '586', 'en': 'Pakistan', 'ru': 'Пакистан'},
                {'id': '608', 'en': 'Philippines', 'ru': 'Филиппины'},
                {'id': '634', 'en': 'Qatar', 'ru': 'Катар'},
                {'id': '643', 'en': 'Russian Federation', 'ru': 'Россия'},
                {'id': '682', 'en': 'Saudi Arabia', 'ru': 'Саудовская Аравия'},
                {'id': '702', 'en': 'Singapore', 'ru': 'Сингапур'},
                {'id': '704', 'en': 'Vietnam', 'ru': 'Вьетнам'},
                {'id': '760', 'en': 'Syria', 'ru': 'Сирия'},
                {'id': '762', 'en': 'Tajikistan', 'ru': 'Таджикистан'},
                {'id': '764', 'en': 'Thailand', 'ru': 'Тайланд'},
                {'id': '784', 'en': 'United Arab Emirates', 'ru': 'ОАЭ'},
                {'id': '792', 'en': 'Turkey', 'ru': 'Турция'},
                {'id': '795', 'en': 'Turkmenistan', 'ru': 'Туркменистан'},
                {'id': '860', 'en': 'Uzbekistan', 'ru': 'Узбекистан'},
                {'id': '887', 'en': 'Yemen', 'ru': 'Йемен'},
            ],
            'ru': 'Азия',
            'en': 'Asia'
        },
        {
            'obj': [
                {'id': '12', 'en': 'Algeria', 'fr': 'Algerie', 'sp': 'Argelia', 'ru': 'Алжир'},
                {'id': '24', 'en': 'Angola', 'fr': 'Angola', 'sp': 'Angola', 'ru': 'Ангола'},
                {'id': '72', 'en': 'Botswana', 'fr': 'Botswana', 'sp': 'Botswana', 'ru': 'Ботсвана'},
                {'id': '108', 'en': 'Burundi', 'ru': 'Бурунди'},
                {'id': '120', 'en': 'Cameroon', 'ru': 'Камерун'},
                {'id': '132', 'en': 'Cape Verde', 'ru': 'Капе Верде'},
                {'id': '140', 'en': 'Central African Republic', 'ru': 'Центральная Африкальная Республика'},
                {'id': '148', 'en': 'Chad', 'ru': 'Чад'},
                {'id': '174', 'en': 'Comoros', 'ru': 'Коморы'},
                {'id': '178', 'en': 'Republic of the Congo', 'ru': 'Конго'},
                {'id': '180', 'en': 'Democratic Republic of the Congo', 'ru': 'Демократическая Республика Конго'},
                {'id': '204', 'en': 'Benin', 'ru': 'Бенин'},
                {'id': '226', 'en': 'Equatorial Guinea', 'ru': 'Экваториальная Гвинея'},
                {'id': '231', 'en': 'Ethiopia', 'ru': 'Эфиопия'},
                {'id': '232', 'en': 'Eritrea', 'ru': 'Эритрея'},
                {'id': '262', 'en': 'Djibouti', 'ru': 'Джибути'},
                {'id': '266', 'en': 'Gabon', 'ru': 'Габон'},
                {'id': '270', 'en': 'Gambia', 'ru': 'Гамбия'},
                {'id': '288', 'en': 'Ghana', 'ru': 'Гана'},
                {'id': '324', 'en': 'Guinea', 'ru': 'Гвинея'},
                {'id': '384', 'en': 'Ivory Coast', 'ru': 'Кот-д’Ивуар'},
                {'id': '404', 'en': 'Kenya', 'ru': 'Кения'},
                {'id': '426', 'en': 'Lesotho', 'ru': 'Лесото'},
                {'id': '430', 'en': 'Liberia', 'ru': 'Либерия'},
                {'id': '434', 'en': 'Libya', 'ru': 'Ливия'},
                {'id': '450', 'en': 'Madagascar', 'ru': 'Мадагаскар'},
                {'id': '454', 'en': 'Malawi', 'ru': 'Малави'},
                {'id': '466', 'en': 'Mali', 'ru': 'Мали'},
                {'id': '478', 'en': 'Mauritania', 'ru': 'Мавритания'},
                {'id': '480', 'en': 'Mauritius', 'ru': 'Маврикий'},
                {'id': '504', 'en': 'Morocco', 'ru': 'Марокко'},
                {'id': '508', 'en': 'Mozambique', 'ru': 'Мозамбик'},
                {'id': '516', 'en': 'Namibia', 'ru': 'Намибия'},
                {'id': '562', 'en': 'Niger', 'ru': 'Нигер'},
                {'id': '566', 'en': 'Nigeria', 'ru': 'Нигерия'},
                {'id': '624', 'en': 'Guinea-Bissau', 'ru': 'Гвинея-Биссау'},
                {'id': '646', 'en': 'Rwanda', 'ru': 'Руанда'},
                {'id': '678', 'en': 'Sao Tome and Principe', 'ru': 'Сан-Томе и Принсипи'},
                {'id': '686', 'en': 'Senegal', 'ru': 'Сенегал'},
                {'id': '690', 'en': 'Seychelles', 'ru': 'Сейшельские Острова'},
                {'id': '694', 'en': 'Sierra Leone', 'ru': 'Сьерра Леоне'},
                {'id': '706', 'en': 'Somalia', 'ru': 'Сомали'},
                {'id': '710', 'en': 'South Africa', 'ru': 'ЮАР'},
                {'id': '716', 'en': 'Zimbabwe', 'ru': 'Зимбабве'},
                {'id': '728', 'en': 'South Sudan', 'ru': 'Южный Судан'},
                {'id': '729', 'en': 'Sudan', 'ru': 'Судан'},
                {'id': '732', 'en': 'Western Sahara', 'ru': 'Западная Сахара'},
                {'id': '748', 'en': 'Swaziland', 'ru': 'Эсватини'},
                {'id': '768', 'en': 'Togo', 'ru': 'Того'},
                {'id': '788', 'en': 'Tunisia', 'ru': 'Тунис'},
                {'id': '800', 'en': 'Uganda', 'ru': 'Уганда'},
                {'id': '818', 'en': 'Egypt', 'ru': 'Египет'},
                {'id': '834', 'en': 'Tanzania', 'ru': 'Танзания'},
                {'id': '854', 'en': 'Burkina Faso', 'ru': 'Буркина Фасо'},
                {'id': '894', 'en': 'Zambia', 'ru': 'Забмия'}, 
                {'id': '900', 'en': 'Somalia', 'ru': 'Сомали'}  
            ],
            'ru': 'Африка',
            'en': 'Africa'
        },
        {
            'obj': [
                {'id': '36', 'en': 'Australia', 'ru': 'Австралия'},
            ],
            'ru': 'Австралия',
            'en': 'Australia'
        },
        {
            'obj': [
                {'id': '10', 'en': 'Antarctica', 'ru': 'Антарктика'},
            ],
            'ru': 'Антарктика',
            'en': 'Antarctica'
        },
        {
            'obj': [
                {'id': '8', 'en': 'Albania', 'ru': 'Албания'},
                {'id': '20', 'en': 'Andorra', 'ru': 'Андорра'},
                {'id': '40', 'en': 'Austria', 'ru': 'Австрия'},
                {'id': '56', 'en': 'Belgium', 'ru': 'Бельгия'},
                {'id': '70', 'en': 'Bosnia and Herzegovina', 'ru': 'Босния и Герцеговина'},
                {'id': '100', 'en': 'Bulgaria', 'ru': 'Болгария'},
                {'id': '112', 'en': 'Belarus', 'ru': 'Беларусь'},
                {'id': '191', 'en': 'Croatia', 'ru': 'Хорватия'},
                {'id': '196', 'en': 'Cyprus', 'ru': 'Кипр'},
                {'id': '203', 'en': 'Czech Republic', 'ru': 'Чехия'},
                {'id': '208', 'en': 'Denmark', 'ru': 'Дания'}, 
                {'id': '233', 'en': 'Estonia', 'ru': 'Эстония'},
                {'id': '246', 'en': 'Finland', 'ru': 'Финляндия'},
                {'id': '250', 'en': 'France', 'ru': 'Франция'}, 
                {'id': '276', 'en': 'Germany', 'ru': 'Германия'},
                {'id': '300', 'en': 'Greece', 'ru': 'Греция'},
                {'id': '348', 'en': 'Hungary', 'ru': 'Венгрия'},
                {'id': '352', 'en': 'Iceland', 'ru': 'Исландия'},
                {'id': '372', 'en': 'Ireland', 'ru': 'Ирландия'},
                {'id': '380', 'en': 'Italy', 'ru': 'Италия'},
                {'id': '428', 'en': 'Latvia', 'ru': 'Латвия'},
                {'id': '438', 'en': 'Liechtenstein', 'ru': 'Лихтенштейн'},
                {'id': '440', 'en': 'Lithuania', 'ru': 'Литва'},
                {'id': '442', 'en': 'Luxembourg', 'ru': 'Люксембург'},
                {'id': '492', 'en': 'Monaco', 'ru': 'Монако'},
                {'id': '498', 'en': 'Moldova', 'ru': 'Молдавия'},
                {'id': '499', 'en': 'Montenegro', 'ru': 'Черногория'},
                {'id': '528', 'en': 'Netherlands', 'ru': 'Нидерланды'},
                {'id': '578', 'en': 'Norway', 'ru': 'Норвегия'},
                {'id': '616', 'en': 'Poland', 'ru': 'Польша'},
                {'id': '620', 'en': 'Portugal', 'ru': 'Португалия'},
                {'id': '642', 'en': 'Romania', 'ru': 'Румыния'},
                {'id': '643', 'en': 'Russian Federation', 'ru': 'Россия'}, 
                {'id': '688', 'en': 'Serbia', 'ru': 'Сербия'},
                {'id': '703', 'en': 'Slovakia', 'ru': 'Словакия'},
                {'id': '705', 'en': 'Slovenia', 'ru': 'Словения'},
                {'id': '724', 'en': 'Spain', 'ru': 'Испания'},
                {'id': '752', 'en': 'Sweden', 'ru': 'Швеция'},
                {'id': '756', 'en': 'Switzerland', 'ru': 'Швейцария'},
                {'id': '804', 'en': 'Ukraine', 'ru': 'Украина'},
                {'id': '807', 'en': 'Macedonia', 'ru': 'Македония'},
                {'id': '826', 'en': 'United Kingdom', 'ru': 'Англия'},
                {'id': '901', 'en': 'Kosovo', 'ru': 'Косово'}
            ],
            'ru': 'Европа',
            'en': 'Europe'
        },
        {
            'obj': [
                {'id': '124', 'en': 'Canada', 'ru': 'Канада'},
                {'id': '484', 'en': 'Mexico', 'ru': 'Мексика'},
                {'id': '841', 'en': 'United States of America', 'ru': 'США'},
        
                {'id': '84', 'en': 'Belize', 'ru': 'Белиз'},
                {'id': '188', 'en': 'Costa Rica', 'ru': 'Коста Рика'},
                {'id': '222', 'en': 'El Salvador', 'ru': 'Сальвадор'},
                {'id': '320', 'en': 'Guatemala', 'ru': 'Гватемала'},
                {'id': '340', 'en': 'Honduras', 'ru': 'Гондурас'},
                {'id': '558', 'en': 'Nicaragua', 'ru': 'Никарагуа'},
                {'id': '591', 'en': 'Panama', 'ru': 'Панама'},
            ],
            'ru': 'Северная Америка',
            'en': 'North America'
        },
        {
            'obj': [
                {'id': '32', 'en': 'Argentina', 'ru': 'Аргентина'},
                {'id': '68', 'en': 'Bolivia', 'ru': 'Боливия'},
                {'id': '76', 'en': 'Brazil', 'ru': 'Бразилия'},
                {'id': '152', 'en': 'Chile', 'ru': 'Чили'},
                {'id': '170', 'en': 'Colombia', 'ru': 'Колумбия'},
                {'id': '218', 'en': 'Ecuador', 'ru': 'Эквадор'},
                {'id': '328', 'en': 'Guyana', 'ru': 'Гайана'},
                {'id': '600', 'en': 'Paraguay', 'ru': 'Парагвай'},
                {'id': '604', 'en': 'Peru', 'ru': 'Перу'},
                {'id': '740', 'en': 'Suriname', 'ru': 'Суринам'},
                {'id': '858', 'en': 'Uruguay', 'ru': 'Уругвай'},
                {'id': '862', 'en': 'Venezuela', 'ru': 'Венесуэла'},
                {'id': '904', 'en': 'French Guiana', 'ru': 'Гвиана'}
            ],
            'ru': 'Южная Америка',
            'en': 'South America'
        },
        {
            'obj': [
                {'id': '44', 'en': 'Bahamas', 'ru': 'Багамские Острова'},
                {'id': '90', 'en': 'Solomon Islands', 'ru': 'Соломоновы Острова'},
                {'id': '192', 'en': 'Cuba', 'ru': 'Куба'},
                {'id': '214', 'en': 'Dominican Republic', 'ru': 'Доминиканская Республика'},
                {'id': '238', 'en': 'Falkland Islands (Britain)', 'ru': 'Фолклендские острова (Англия)'},
                {'id': '242', 'en': 'Fiji', 'ru': 'Фиджи'}, 
                {'id': '260', 'en': 'French Southern Territories', 'ru': 'Французские Южные и Антарктические территории'},
                {'id': '304', 'en': 'Greenland (Denmark)', 'ru': 'Гренландия (Denmark)'},
                {'id': '332', 'en': 'Haiti', 'ru': 'Гаити'}, 
                {'id': '388', 'en': 'Jamaica', 'ru': 'Ямайка'}, 
                {'id': '540', 'en': 'New Caledonia', 'ru': 'Новая Каледония'}, 
                {'id': '548', 'en': 'Vanuatu', 'ru': 'Вануату'},
                {'id': '554', 'en': 'New Zealand', 'ru': 'Новая Зеландия'},
                {'id': '598', 'en': 'Papua New Guinea', 'ru': 'Папуа – Новая Гвинея'}, 
                {'id': '630', 'en': 'Puerto Rico', 'ru': 'Пуэрто-Рико'},
                {'id': '780', 'en': 'Trinidad and Tobago', 'ru': 'Тринидад и Тобаго'},
                {'id': '842', 'en': 'Hawai (USA)', 'ru': 'Гавайи (США)'},   
            ],
            'ru': 'Океания и острова',
            'en': 'Oceania and Islands'
        }
    ]
}
AreaObj.Start()


