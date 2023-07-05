const START_THEME =     JSON.parse(localStorage.getItem('theme'))
const START_LANG =      JSON.parse(localStorage.getItem('lang'))
const START_AREA =      JSON.parse(localStorage.getItem('area'))



function ObjEquals(obj1, obj2) {
    return JSON.stringify(obj1) == JSON.stringify(obj2)
}

class ThemesObj {
    static setTheme(id = null) {
        ThemesObj.current = ThemesObj.Light

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
}
ThemesObj.setTheme() 


