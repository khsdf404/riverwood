const log = console.log.bind(document);
const START_LANG = Translater.LANGTYPES.ru;
const START_AREA = SearchArea.AREATYPES.country;
var SIDEBAR_LIST, AREA, AREA_TEXT, LANG;
    


const NOT__FOUND = [
    {'id': '28', 'en': 'Antigua and Barbuda', 'ru': 'Антигуа и Барбуда'}, // not found
    {'id': '52', 'en': 'Barbados', 'ru': 'Барбадос'}, // not found
    {'id': '74', 'en': 'Bouvet Island', 'ru': 'Остров Буве'}, // not found
    {'id': '184', 'en': 'Cook Islands', 'ru': 'Острова Кука'}, // not found
    {'id': '212', 'en': 'Dominica', 'ru': 'Доминика'}, // not found
    {'id': '296', 'en': 'Kiribati', 'ru': 'Кирибати'}, // not found
    {'id': '308', 'en': 'Grenada', 'ru': 'Гренада'}, // not found
    {'id': '334', 'en': 'Heard Island and McDonald Islands', 'ru': 'Остров Херд и острова Макдональд'}, // Australia & Oceania not found 
    {'id': '470', 'en': 'Malta', 'ru': 'Мальта'}, // not found
    
    {'id': '16', 'en': 'American Samoa', 'ru': 'Американское Самоа'}, // USA & Oceania not found
    {'id': '60', 'en': 'Bermuda', 'ru': 'Бермудские Острова'}, // Britain and Oceania not found  
    {'id': '86', 'en': 'British Indian Ocean Territory', 'ru': 'Британская территория в Индийском океане'}, // Britain & Oceania not found
    {'id': '92', 'en': 'Virgin Islands', 'ru': 'Виргинские Острова'}, // Britain not found
    {'id': '136', 'en': 'Cayman Islands', 'ru': 'Острова Кайман'}, // Britain not found
    {'id': '162', 'en': 'Christmas Island', 'ru': 'Остров Рождества'}, // Australia not found
    {'id': '166', 'en': 'Cocos (Keeling) Islands', 'ru': 'Кокосовые острова'}, // Australia ??? not found
    {'id': '175', 'en': 'Mayotte', 'ru': 'Майотта'}, // France not found
    {'id': '234', 'en': 'Faroe Islands', 'ru': 'Фарерские острова'}, // Denmark & Oceania not found
    {'id': '239', 'en': 'South Georgia and the South Sandwich Islands', 'ru': 'Южная Георгия и Южные Сандвичевы Острова'}, // Britain & Oceania not found
    {'id': '248', 'en': 'Aland Islands', 'ru': 'Аландские острова'}, // Finland not found
    {'id': '258', 'en': 'French Polynesia', 'ru': 'Полинезия'}, // France & Oceania not found 
    {'id': '292', 'en': 'Gibraltar', 'ru': 'Гибралтар'}, // France add to JSON not found
    {'id': '312', 'en': 'Guadeloupe', 'ru': 'Гваделупа'}, // France & Oceania not found
    {'id': '316', 'en': 'Guam', 'ru': 'Гуам'}, // USA & Oceania not found
    {'id': '336', 'en': 'Vatican City', 'ru': 'Ватикан'}, // Europe not found
    {'id': '344', 'en': 'Hong Kong', 'ru': 'Гонконг'}, // Asia not found
    {'id': '446', 'en': 'Macao', 'ru': 'Макао'}, // Asia not found
    {'id': '474', 'en': 'Martinique', 'ru': 'Мартиника'}, // France & Oceania not found
    {'id': '500', 'en': 'Montserrat', 'ru': 'Монтсеррат'}, // Britain & Oceania not found
    {'id': '520', 'en': 'Nauru', 'ru': 'Науру'},  // not found
    {'id': '531', 'en': 'Curaçao', 'ru': 'Кюрасао'}, // not found
    {'id': '533', 'en': 'Aruba', 'ru': 'Аруба'}, // not found
    {'id': '534', 'en': 'Sint Maarten', 'ru': 'Синт-Мартен'}, // Nitherlands & Oceania not found
    {'id': '535', 'en': 'Bonaire, Sint Eustatius and Saba', 'ru': 'Бонайре'}, // Nitherlands & Oceania not found
    {'id': '570', 'en': 'Niue', 'ru': 'Ниуэ'}, // not found
    {'id': '574', 'en': 'Norfolk Island', 'ru': 'Норфолк'}, // add to Britain JSON not found
    {'id': '580', 'en': 'Northern Mariana Islands', 'ru': 'Северные Марианские острова'}, // USA & Oceania not found
    {'id': '581', 'en': 'United States Minor Outlying Islands', 'ru': 'Внешние малые острова США'}, // USA & Oceania not found
    {'id': '583', 'en': 'Micronesia', 'ru': 'Микронезия'}, // idk google it not found
    {'id': '584', 'en': 'Marshall Islands', 'ru': 'Маршалловы Острова'}, // USA & Oceania not found
    {'id': '585', 'en': 'Palau', 'ru': 'Палау'}, // USA & Oceania not found
    {'id': '612', 'en': 'Pitcairn', 'ru': 'Острова Питкэрн'}, // Britain & Oceania not found
    {'id': '638', 'en': 'Réunion', 'ru': 'Реюньон'}, // France & Oceania not found
    {'id': '652', 'en': 'Saint Barthélemy', 'ru': 'Сен-Бартелеми'}, // France & Oceania not found
    {'id': '654', 'en': 'Saint Helena, Ascension and Tristan da Cunha', 'ru': 'Острова Святой Елены'}, // changed Britain & Oceania not found
    {'id': '659', 'en': 'Saint Kitts and Nevis', 'ru': 'Сент-Китс и Невис'}, // not found 
    {'id': '660', 'en': 'Anguilla', 'ru': 'Ангилья'}, // changed Britain & Oceania not found
    {'id': '662', 'en': 'Saint Lucia', 'ru': 'Сент-Люсия'}, // not found
    {'id': '663', 'en': 'Saint Martin', 'ru': 'Сен-Мартен'}, // changed France & Oceania not found
    {'id': '666', 'en': 'Saint Pierre and Miquelon', 'ru': 'Сен-Пьер и Микелон'}, // changed France & Oceania not found
    {'id': '670', 'en': 'Saint Vincent and the Grenadines', 'ru': 'Сент-Винсент и Гренадины'}, // not found
    {'id': '674', 'en': 'San Marino', 'ru': 'Сан Марино'}, // not found
    {'id': '744', 'en': 'Svalbard and Jan Mayen', 'ru': 'Шпицберген и Ян-Майен'}, // Norway & Oceania not found
    {'id': '772', 'en': 'Tokelau', 'ru': 'Токелау'}, // not found
    {'id': '776', 'en': 'Tonga', 'ru': 'Тонга'}, // not found
    {'id': '796', 'en': 'Turks and Caicos Islands', 'ru': 'Теркс и Кайкос'}, // changed Britain & Oceania not found
    {'id': '798', 'en': 'Tuvalu', 'ru': 'Тувалу'}, // not found
    {'id': '831', 'en': 'Guernsey', 'ru': 'Гернси'}, // not found
    {'id': '832', 'en': 'Jersey', 'ru': 'Джерси'}, // not found
    {'id': '833', 'en': 'Isle of Man', 'ru': 'Остров Мэн'}, // not found
    {'id': '850', 'en': 'Virgin Islands', 'ru': 'Виргинские Острова'}, // Britain & Oceania not found
    {'id': '876', 'en': 'Wallis and Futuna', 'ru': 'Уоллис и Футуна'}, // changed France & Oceania not found
    {'id': '882', 'en': 'Samoa', 'ru': 'Самоа'}, // not found
]


const COUNTRIES = [
    {'id': '12', 'en': 'Algeria', 'ru': 'Алжир'},
    {'id': '24', 'en': 'Angola', 'ru': 'Ангола'},
    {'id': '72', 'en': 'Botswana', 'ru': 'Ботсвана'},
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
].map(country => {
        country.name = (START_LANG == Translater.LANGTYPES.ru) ? 
            country.ru : 
            country.en;
        country.rivers = RIVERS__RU
                    .filter(river => {
                        if (river.location.indexOf(country.ru) > -1)
                            return river.name;
                    })
                    .sort((a, b) => { return a < b ? -1 : 1 });
        return country;
    }
).sort((a, b) => a.name < b.name ? -1 : 1);


const REGIONS = [
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
            {'id': '12', 'en': 'Algeria', 'ru': 'Алжир'},
            {'id': '24', 'en': 'Angola', 'ru': 'Ангола'},
            {'id': '72', 'en': 'Botswana', 'ru': 'Ботсвана'},
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
].map(reg => {
        reg.name = START_LANG == Translater.LANGTYPES.ru ? 
            reg.ru : 
            reg.en;
        reg.rivers = [];
        reg.obj.forEach(country => {
            country.name = (START_LANG == Translater.LANGTYPES.ru) ? 
                country.ru : 
                country.en;
            country.rivers = RIVERS__RU
                    .filter(river => {
                        if (river.location.indexOf(country.ru) > -1)
                            return river.name;
                    })
                    .sort((a, b) => { return a < b ? -1 : 1 });
            reg.rivers = reg.rivers.concat(...country.rivers);
        });
        reg.rivers = reg.rivers.filter((el, id) => reg.rivers.indexOf(el) === id);
        return reg;
    }
).sort((a, b) => a.name < b.name ? -1 : 1);
















const findCountry = (id) => {
    let output = null;
    REGIONS.forEach(reg => {
        if (output) return;
        output = reg.obj.find(function(e) {
            return parseInt(e.id) == parseInt(id)
        })
    });
    return output;
}
const findCountry2 = (id) => {
    let output = null;
    output = COUNTRIES.find(function(e) {
        return parseInt(e.id) == parseInt(id)
    })
    return output;
}





class Page { 
    static Recreate() {
        function CreateElem(text, riversArr) { 
            let cell = $(`<li><h6>${text} (${riversArr.length})</h6></li>`); 
            let cellRiversWrap = $(`<div></div>`);
            riversArr.forEach((el, index) => {
                cellRiversWrap.append(`
                    <wrap>
                        <span>➝</span>
                        <a class="non-select" href="${el.link}" target="_blank" rel="noopener noreferrer">
                            ${el.name}
                        </a>
                    </wrap>
                `);
            });
            cell.append(cellRiversWrap)
            return cell;
        }



        $(`#sidebarList`).empty();
        SIDEBAR_LIST.forEach(e => 
            $(`#sidebarList`).append(CreateElem(e.name, e.rivers))
        );
        $(`#sidebarList li h6`).click(function(e) {
            let parent = $(this).parent('li');
            let div = parent.find('div');
            $(`.sidebar-active-item`).not(parent).removeClass(`sidebar-active-item`);
            parent.toggleClass(`sidebar-active-item`);
            if (parent.hasClass(`sidebar-active-item`))
                div.css({'max-height': (div.find('wrap').length * 50) + 'px'});
            else 
                div.css({'max-height': '0px'});
        })





        Translater.setButtons();
    }
}



const Earth = () => { 
    // canvas & d3 variables
    canvas =        d3.select('#globe')
    canvasDOM =     document.getElementById('globe');
    context =       canvas.node().getContext('2d');
    projection =    d3.geoOrthographic().precision(0.1); 
    path =          d3.geoPath(projection).context(context);


    HELPER = new d3Helper();
    HELPER.QueueData();

    new d3Drag().setDrag();
    new d3Hover().setHover();
     

    $(`main div`).mouseleave(() => {
        currentPolygon = null;
        currentRegion = null;
        AREA_TEXT.text('');
    });
    $(window).resize(() => {
        HELPER.setScale();
        HELPER.RenderGlobe();
    });
}
const Header = () => {
    Translater.Start(START_LANG);
    SearchArea.Start(START_AREA);
    Page.Recreate(); 
    
    $(`header settings button`).click(function() {
        $(this).parent()
            .find(`button.active-btn`)
            .removeClass(`active-btn`);
        $(this).addClass(`active-btn`);

        if (!$(this).parent('span').hasClass('header-theme'))
            Page.Recreate();
    });

    let ThemeObj = new PageThemes();
    ThemeObj.setTheme(ThemeObj.dark); 
}






$(document).ready(() => {
    AREA_TEXT =     $('#areaText');

    
    Earth();
    Header();
})