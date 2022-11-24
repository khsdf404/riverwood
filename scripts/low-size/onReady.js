const START_THEME=localStorage.getItem("theme")?JSON.parse(localStorage.getItem("theme")):ThemesObj.Light,START_LANG=localStorage.getItem("lang")?JSON.parse(localStorage.getItem("lang")):LanguagesObj.LANGTYPES.en,START_AREA=localStorage.getItem("area")?JSON.parse(localStorage.getItem("area")):AreaObj.AREATYPES.country;class Page{static CreateListElem(e,a){let t=`\n            <li>\n                <h6 class="list-title">${e}\n                    <span class="arealist-amount non-select">\n                        [${a.length}]\n                    </span>\n                    <span class="arealist-href-icon non-select"></span>\n                </h6>\n                <div>`;return a.forEach((e=>{t+=`\n            <a class="non-select" href="${e.link}" target="_blank" rel="noopener noreferrer">\n                <span>➝</span>\n                <ins>${e.name}</ins>\n            </a>\n            `})),t+=" \n                </div>\n            </li>\n        ",t}static Recreate(){$areaList.empty();let e="";AreaObj.currentList.forEach((a=>{e+=Page.CreateListElem(a.name,a.rivers)})),$areaList.html(e),$js(".list-title").onEvent("click",(e=>{let a=e.parent("li"),t=a.find("div");$js(".sidebar-active-item").not(a).removeClass("sidebar-active-item"),$areaList.find("li div").css({"max-height":"0px"}),a.toggleClass("sidebar-active-item"),a.hasClass("sidebar-active-item")?t.css({"max-height":40*t.find("a").size()+"px"}):t.find("div").css({"max-height":"0px"})})),$areaList.find(".arealist-href-icon").onEvent("click",(e=>{AreaPage(e.parent("li").find("h6").text())})),LanguagesObj.TranslatePage()}}const Phone=()=>{const e=()=>{SETTINGS_ACTIVE&&(SETTINGS_ACTIVE=!1,$js("#settingsBtn").removeClass("active-btn"),$js(".header-settings").animate({right:"-250px"},200))};window.innerWidth<750&&(GLOBE_ACTIVE=!0,$js("main").get().scrollTop=2e3,LanguagesObj.TranslatePage()),window.onresize=e=>{!isPhone()&&window.innerWidth<750&&($globeWrap.get().scrollIntoView({behavior:"auto",block:"start"}),GLOBE_ACTIVE=!0,LanguagesObj.TranslatePage()),log("ha ha! resized")},$js("#settingsBtn").onClick((e=>{log("sdf"),SETTINGS_ACTIVE?e.removeClass("active-btn"):e.addClass("active-btn"),$js(".header-settings").animate({right:SETTINGS_ACTIVE?"-250px":"10px"},SETTINGS_ACTIVE?200:300),SETTINGS_ACTIVE=!SETTINGS_ACTIVE})),$js("#mobileScroll").onClick((a=>{GLOBE_ACTIVE=!GLOBE_ACTIVE,$js(GLOBE_ACTIVE?"#globeWrap":"aside").get().scrollIntoView({behavior:"smooth",block:"start"}),setTimeout((()=>{e(),LanguagesObj.TranslatePage()}),300)})),$js("main").onClick((a=>{isPhone()&&e()}))},About=()=>{const e=400,a=$js("#aboutWrap"),t=a.find("#emailAddress"),n=a.find("#emailName"),s=a.find("#emailLetter"),i=a.find("#aboutError"),o=a.find("#sendEmail");let l="";function r(e){o.hasClass("btn-active")&&o.removeClass("btn-active"),i.text(e),i.animate({opacity:"1"},700,(()=>{setTimeout((()=>{i.animate({opacity:"0"},700)}),5e3)}))}function c(){return/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi.test(t.value())}function u(a){a?o.hasClass("btn-active")||o.animate({opacity:"0"},e,(()=>{o.text("Send a letter"),o.addClass("btn-active"),o.animate({opacity:"1"},e)})):o.hasClass("btn-active")&&o.animate({opacity:"0"},e,(()=>{o.text("Contact me"),o.removeClass("btn-active"),o.animate({opacity:"1"},e)}))}$js("#aboutMark").onClick((()=>{a.animate({left:"0",opacity:"1"},700)})),$js("#aboutClose").onClick((()=>{a.animate({left:"-100%"},700,(()=>{a.css({opacity:"0"}),t.value(""),n.value(""),s.value(""),i.value(""),u(!1)}))})),o.onClick(((e,a)=>{e.hasClass("btn-active")?(Email.send({SecureToken:"0e080ffd-8308-425e-8cf9-093fb6419f45",To:"kaarst@ya.ru",From:"kaarst@ya.ru",Subject:"Riverwood: "+n.value(),Body:s.value()+"\n\n From "+t.value()}),e.text("Sent!"),t.value(""),n.value(""),s.value(""),i.value(""),e.css({color:"var(--based-color)",background:"var(--accent-color)"}),setTimeout((()=>{u(!1),e.css({color:"#",background:"#"})}),3e3)):r("Why did you... click me...")})),t.onEvent("keyup",((e,a)=>{c()&&"Enter"==a.key&&n.get().focus(),"ArrowDown"==a.key&&n.get().focus()})),n.onEvent("keyup",((e,a)=>{"ArrowDown"==a.key||""!=e.value()&&"Enter"==a.key?s.get().focus():"ArrowUp"==a.key&&t.get().focus()})),s.onEvent("keydown",((e,a)=>{l=e.value(),"ArrowUp"==a.key&&n.get().focus()})),t.onEvent("input",((e,a)=>{c()?("Enter"==a.key&&n.get().focus(),""!=n.value()&&""!=s.value()&&u(!0)):u(!1),"ArrowDown"==a.key&&n.get().focus()})),n.onEvent("input",(e=>""==t.value()?(e.value(""),t.get().focus(),r("Your@email first")):c()?""==e.value()||""==s.value()?u(!1):void u(!0):(e.value(""),t.get().focus(),r("Incorrect @mail address :c")))),s.onEvent("input",(e=>""==t.value()?(e.value(""),t.get().focus(),r("Your@email first")):c()?""==n.value()?(e.value(""),n.get().focus(),r("Please, introduse yourself")):void u(""!=e.value()):(e.value(""),t.get().focus(),r("Incorrect @mail address :c")))),s.onEvent("input",(e=>{let a=e.value();if(e.get().scrollHeight>e.rect().height)return e.value(l),void r("Brevity is the sister of talent..");e.get().scrollWidth>e.rect().width?(log("fd"),e.hasClass("align-left")||e.addClass("align-left")):a.length<25&&e.removeClass("align-left")}))};document.addEventListener("DOMContentLoaded",(()=>{LanguagesObj.Start(START_LANG),AreaObj.Start(START_AREA),ThemesObj.Start(START_THEME),Page.Recreate(),Phone(),EarthReady(),About()}));