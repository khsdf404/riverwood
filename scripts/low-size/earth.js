const starsAmount=150,scaleFactor=1,rotationDelay=5e3,rotationDirection=-1,degPerSec=5,angles={x:50,y:-20,z:0},colorLand="#309d60",colorActive="#00000099",styleBorders={color:"#000",thickness:.5},styleGlobeBorder={color:"#000",thickness:2};var polygonList,currentPolygon,currentRegion;let globe,land,countries,borders,width,height,v0,r0,q0,autorotate,now,diff,rotation,restartTimer,canvasPos,lastTime=d3.now(),xRotationSpeed=-.005,yzRotationSpeed=3*xRotationSpeed,rotateAvailable=!0;var canvas=d3.select("#globe"),context=canvas.node().getContext("2d"),projection=d3.geoOrthographic().precision(.1),path=d3.geoPath(projection).context(context);const EarthReady=()=>{D3.QueueData(),D3_DRAG.setDrag(),D3_HOVER.setHover(),isPhone()||D3_CLICK.setClick(),$canvas.onEvent("mouseleave",(()=>{setName(""),currentPolygon=null,currentRegion=null,D3.RenderGlobe(),D3.setRotation(!0)})),window.addEventListener("resize",(()=>{D3.setScale(),D3.RenderGlobe()}))};function getObj(t){if(!t)return null;if(AreaObj.isRegion()){let e;return AreaObj.REGIONS.forEach((o=>{e||(e=o.obj.find((e=>parseInt(e.id)==parseInt(t.id))))})),e}return AreaObj.COUNTRIES.find((function(e){return parseInt(e.id)==parseInt(t.id)}))}function getPolygon(t){return polygonList.find((function(e){return parseInt(e.id)==parseInt(t.id)}))}function getCoord(){let t=projection.rotate();return{x:Math.round(t[0]),y:Math.round(t[1]),z:Math.round(t[2])}}function haversine(t,e,o=-20,n=50){let a=(t-o)*Math.PI/180,r=(e-n)*Math.PI/180;o=o*Math.PI/180,t=t*Math.PI/180;let s=Math.pow(Math.sin(a/2),2)+Math.pow(Math.sin(r/2),2)*Math.cos(o)*Math.cos(t);return 3.1415*(2*Math.asin(Math.sqrt(s)))}function setStars(){$stars.empty();const t=()=>{let t=(()=>{const t=(e,o)=>{let n=Math.random(),a=Math.random();return n>e.start&&n<e.end&&a>o.start&&a<o.end?t(e,o):[n,a]};let e=2*canvasPos.left+canvasPos.width,o=2*canvasPos.top+canvasPos.height,n={start:canvasPos.left/e,end:(canvasPos.left+canvasPos.width)/e},a={start:canvasPos.top/o,end:(canvasPos.top+canvasPos.height)/o},r=t(n,a);return[e*r[0],o*r[1]]})();var e,o;$stars.append(`\n            <span style="\n                    left: ${t[0]}px; \n                    top: ${t[1]}px;\n                    animation: StarsBlinking ${e=3,o=12,Math.floor(Math.random()*(o-e+1)+e)}s linear infinite\n            ">\n            </span>\n        `)};let e=$canvas.rect(),o=$globeWrap.rect();canvasPos||(canvasPos={}),canvasPos.top=e.top-o.top,canvasPos.left=e.left-o.left,canvasPos.height=e.height,canvasPos.width=e.width;for(let e=0;e<150;e++)t()}function setName(t=""){$areaName.text(t),ThemesObj.isDynamic&&$areaName.css({padding:""==t?"0":"0px 20px"})}class D3{static QueueData(){d3.queue().defer(d3.json,"/src/countriesInfo.json").await(D3.LoadData)}static LoadData=(t,e)=>{if(t)throw t;globe={type:"Sphere"},land=topojson.feature(e,e.objects.land),countries=topojson.feature(e,e.objects.countries),polygonList=countries.features,borders=topojson.mesh(e,e.objects.countries,(function(t,e){return t!=e})),$canvas.css({opacity:1}),D3.setScale(),D3.setAngles(),D3.setTimer(),D3.RenderGlobe(),setStars()};static RenderGlobe(){function t(t,e){context.beginPath(),path(t),context.fillStyle=e,context.fill()}if(context.clearRect(0,0,width,height),t(land,"#309d60"),AreaObj.isRegion()||function(t,e,o){context.beginPath(),path(t),context.strokeStyle=e,context.lineWidth=o,context.stroke()}(borders,styleBorders.color,styleBorders.thickness),AreaObj.isRegion()&&currentRegion)return e="#00000099",void currentRegion.obj.forEach((o=>{t(getPolygon(o),e)}));var e;currentPolygon&&t(currentPolygon,"#00000099")}static setScale=()=>{width=Math.min(.9*$globeWrap.rect().width,.7*$globeWrap.rect().height),height=width,canvas.attr("width",width).attr("height",height),projection.scale(1*Math.min(width,height)/2).translate([width/2,height/2]),setStars()};static setAngles(){let t=projection.rotate();t[0]=angles.x,t[1]=angles.y,t[2]=angles.z,projection.rotate(t)}static setTimer(){autorotate?setTimeout((()=>{autorotate.restart(D3.timerTick,0)}),5e3):autorotate=d3.timer(D3.timerTick,5e3)}static timerTick=t=>{if(now=d3.now(),diff=now-lastTime,lastTime=now,diff<t&&rotateAvailable){0,rotation=projection.rotate();let t=diff*xRotationSpeed,e=Math.abs(diff*yzRotationSpeed),o=Math.round(rotation[1]),n=Math.round(rotation[2]),a=angles.y-o,r=angles.z-n;rotation[0]+=t,Math.abs(a)>e&&0!=a&&(rotation[1]+=e*Math.abs(a)/a),Math.abs(r)>e&&0!=r&&(rotation[2]+=e*Math.abs(r)/r),projection.rotate(rotation),D3.AssignBackground(),D3.RenderGlobe()}};static setRotation=t=>{clearTimeout(restartTimer),t?restartTimer=setTimeout((()=>{rotateAvailable=!0}),5e3):rotateAvailable=!1};static AssignBackground(){if(!ThemesObj.isDynamic)return;let t=getCoord(),e=10*haversine(t.y,t.x);$js("main").css({"background-position":`${e}% ${e}%`}),e>=63&&e<=65&&$stars.removeClass(),e>65&&$stars.addClass("night-active")}static RemoveStars(){$stars.removeClass()}}class D3_CLICK{static setClick(){canvas.on("click",D3_CLICK.OpenPage)}static OpenPage(){let t=getObj(currentPolygon)&&getObj(currentPolygon).name||currentRegion&&currentRegion.name;t&&AreaPage(t)}}class D3_HOVER{static setHover(){canvas.on("mousemove",D3_HOVER.CountryHover)}static CountryHover=()=>{if(AreaObj.isRegion()){if(!D3_HOVER.setRegion())return}else if(!D3_HOVER.setCountry())return;D3.setRotation(!1),D3.RenderGlobe(),D3_HOVER.setName()};static setCountry=()=>{let t=D3_HOVER.getPolygon($canvas.get());return t?t!==currentPolygon&&(currentPolygon=t,!0):(currentPolygon&&(setName(""),currentPolygon=void 0,D3.RenderGlobe()),!1)};static setRegion=()=>{let t=D3_HOVER.getPolygon($canvas.get());if(!t)return currentRegion&&(setName(""),currentRegion=void 0,currentPolygon=void 0,D3.RenderGlobe()),null;let e=getObj(t),o=!1;return AreaObj.REGIONS.forEach((t=>{if(t.obj.forEach((n=>parseInt(n.id)==parseInt(e.id)?currentRegion==t?void(o=!1):(currentRegion=t,void(o=!0)):o||void 0)),o)return o})),o};static getPolygon=t=>{function e(t,e){let o,n,a=t.length,r=t[a-1],s=e[0],i=e[1],c=r[0],l=r[1],d=!1;for(let e=0;e<a;++e)r=t[e],o=r[0],n=r[1],n>i!=l>i&&s<(c-o)*(i-n)/(l-n)+o&&(d=!d),c=o,l=n;return d}let o=projection.invert(d3.mouse(t));return countries.features.find((function(t){return t.geometry.coordinates.find((function(n){return getObj(t)&&e(n,o)||n.find((function(n){return null!=getObj(t)&&e(n,o)}))}))}))};static setName=()=>{if(currentPolygon)return setName(getObj(currentPolygon).name);setName(currentRegion.name)}}class D3_DRAG{static setDrag(){canvas.call(d3.drag().on("start",D3_DRAG.Start).on("drag",D3_DRAG.Drag).on("end",D3_DRAG.End))}static Start(){D3.setRotation(!1),v0=versor.cartesian(projection.invert(d3.mouse($canvas.get()))),r0=projection.rotate(),q0=versor(r0)}static Drag(){let t=versor.cartesian(projection.rotate(r0).invert(d3.mouse($canvas.get()))),e=versor.multiply(q0,versor.delta(v0,t)),o=versor.rotation(e);projection.rotate(o),D3.RenderGlobe(),D3.AssignBackground()}static End(){currentPolygon||currentRegion||D3.setRotation(!0)}}