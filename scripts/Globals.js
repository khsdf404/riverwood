const log = console.log.bind(document);
const START_THEME =     localStorage.getItem('theme') ? 
                            JSON.parse(localStorage.getItem('theme')) : 
                            ThemesObj.Light;
const START_LANG =      localStorage.getItem('lang') ? 
                            JSON.parse(localStorage.getItem('lang')) : 
                            LanguagesObj.LANGTYPES.en;
const START_AREA =      localStorage.getItem('area') ? 
                            JSON.parse(localStorage.getItem('area')) : 
                            AreaObj.AREATYPES.country;
var GLOBE_ACTIVE =      true; 
var SETTINGS_ACTIVE =   false;
const $areaName =   $('#areaText');
const $themeAnim =  $(`#themeAnimation`); 

// canvas & d3 variables
canvas =        d3.select('#globe')
canvasDOM =     document.getElementById('globe');
context =       canvas.node().getContext('2d');
projection =    d3.geoOrthographic().precision(0.1); 
path =          d3.geoPath(projection).context(context);
HELPER =        new d3Helper();


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



const AreaPage = (areaStr) => {
    localStorage.setItem('areaName', areaStr);
    window.location.href = 'Area/area.html';
}
const isPhone = () => {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent))
}

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


