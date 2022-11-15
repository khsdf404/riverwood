const log = console.log.bind(document);
const START_THEME =     localStorage.getItem('theme') ? 
                            JSON.parse(localStorage.getItem('theme')) : 
                            ThemesObj.Light;
const START_LANG =      localStorage.getItem('lang') ? 
                            JSON.parse(localStorage.getItem('lang')) : 
                            LanguagesObj.LANGTYPES.en;
var SETTINGS_ACTIVE;
var CURRENT_THEME, CURRENT_LANG;
 