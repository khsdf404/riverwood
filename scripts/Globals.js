var GLOBE_ACTIVE =      true; 
var SETTINGS_ACTIVE =   false;
// DOM elements
const $main =           $js(`main`);
const $globeWrap =      $main.find(`#globeWrap`);
const $canvas =         $globeWrap.find(`#globe`);
const $areaName =       $globeWrap.find(`#areaText`);
const $stars =          $globeWrap.find(`#stars`); 


const $riverList = $js(`#riverList`);
const $areaList = $js(`#areaList`);


const $themeAnim =      $js(`#themeAnimation`); 
// 







function AreaPage(areaStr) {
    localStorage.setItem('areaName', areaStr);
    window.location.href = 'Area/area.html';
}
function isPhone() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent))
}
function ObjEquals(obj1, obj2) {
    return JSON.stringify(obj1) == JSON.stringify(obj2)
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



