var GLOBE_ACTIVE=!0,SETTINGS_ACTIVE=!1;const $main=$js("main"),$globeWrap=$main.find("#globeWrap"),$canvas=$globeWrap.find("#globe"),$areaName=$globeWrap.find("#areaText"),$stars=$globeWrap.find("#stars"),$riverList=$js("#riverList"),$areaList=$js("#areaList"),$themeAnim=$js("#themeAnimation");function AreaPage(n){localStorage.setItem("areaName",n),window.location.href="Area/area.html"}function isPhone(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgentData)}function ObjEquals(n,e){return JSON.stringify(n)==JSON.stringify(e)}const findCountry=n=>{let e=null;return REGIONS.forEach((r=>{e||(e=r.obj.find((function(e){return parseInt(e.id)==parseInt(n)})))})),e},findCountry2=n=>{let e=null;return e=COUNTRIES.find((function(e){return parseInt(e.id)==parseInt(n)})),e};