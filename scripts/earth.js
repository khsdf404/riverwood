// 
const starsAmount =         150
const scaleFactor =         1
const rotationDelay =       5000 // * 1000
const rotationDirection =   -1
const degPerSec =           3
const angles =              { x: 50, y: -20, z: 0 }
const colorLand =           '#309d60'   //'#F19BFE'
const colorActive =         '#00000099'          //'#F6C1BC'
const styleBorders =        { 'color': '#000', 'thickness': 0.5  };
const styleGlobeBorder =    { 'color': '#000',  'thickness': 2  };
// all we need to work with
var polygonList, currentPolygon, currentRegion;
let globe, land, countries, borders;
let width, height
// rotation part
let v0          // Mouse position in Cartesian coordinates at start of drag gesture.
let r0          // Projection rotation as Euler angles at start.
let q0          // Projection rotation as versor at start.
let lastTime = d3.now()
let xRotationSpeed = degPerSec * rotationDirection / 1000
let yzRotationSpeed = xRotationSpeed * 3;
let rotateAvailable = true, autorotate, now, diff, rotation, restartTimer;
let canvasPos;
// canvas & d3 variables
var canvas =        d3.select('#globe')
var context =       canvas.node().getContext('2d');
var projection =    d3.geoOrthographic().precision(0.1); 
var path =          d3.geoPath(projection).context(context);
// DOM elements
const $globeWrap =      $js(`#globeWrap`);
const $canvas =         $globeWrap.find(`#globe`);
const $areaName =       $globeWrap.find(`#areaText`);
const $stars =          $globeWrap.find(`#stars`); 


const EarthReady = () => {
    D3.QueueData();

    D3_DRAG.setDrag();
    D3_HOVER.setHover(); 
    if (!isPhone()) D3_CLICK.setClick();
    
    $canvas.onEvent('mouseleave', () => {
        setName('')

        currentPolygon = null;
        currentRegion = null;
        D3.RenderGlobe();

        D3.setRotation(true);
    });


    window.addEventListener('resize', () => {
        D3.setScale();
        D3.RenderGlobe();
    });
}




function getObj(countryPolygon) {
    if (!countryPolygon) return null;
    if (AreaObj.isRegion()) {
        let b;
        AreaObj.REGIONS.forEach(reg => {
            if (b) return;
            b = reg.obj.find(country => {
                return parseInt(country.id) == parseInt(countryPolygon.id)
            })
        }) 
        return b;
    }
    return AreaObj.COUNTRIES.find(function(e) {
        return parseInt(e.id) == parseInt(countryPolygon.id)
    })
}
function getPolygon(countryObj) {
    return polygonList.find(function(e) {
        return parseInt(e.id) == parseInt(countryObj.id)
    })
}
// for dynamic theme
function getCoord() {
    let rotation = projection.rotate(); 
    return { 'x': Math.round(rotation[0]), 'y': Math.round(rotation[1]), 'z': Math.round(rotation[2])};
}
function haversine(lat2, lon2, lat1 = -20, lon1 = 50) {
    // distance between latitudes
    // and longitudes
    let dLat = (lat2 - lat1) * Math.PI / 180.0;
    let dLon = (lon2 - lon1) * Math.PI / 180.0;
       
    // convert to radiansa
    lat1 = (lat1) * Math.PI / 180.0;
    lat2 = (lat2) * Math.PI / 180.0;
     
    // apply formulae
    let a = Math.pow(Math.sin(dLat / 2), 2) +
               Math.pow(Math.sin(dLon / 2), 2) *
               Math.cos(lat1) *
               Math.cos(lat2);
    let rad = 3.1415;
    let c = 2 * Math.asin(Math.sqrt(a));
    return rad * c;
}
function setStars() {
    $stars.empty();
    const randInt = (min, max) => { 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    const getStarCoord = () => {
        const GetRandomCoord = (banX, banY) => {
            let rndX = Math.random();
            let rndY = Math.random();
            if (rndX > banX.start && rndX < banX.end) {
                if (rndY > banY.start && rndY < banY.end)
                return GetRandomCoord(banX, banY);
            }
            return [rndX, rndY]
        }
        let avialableX = canvasPos.left * 2 + canvasPos.width;
        let avialableY = canvasPos.top * 2 + canvasPos.height;
        let banX = { start: canvasPos.left / avialableX, end: (canvasPos.left + canvasPos.width) / avialableX }
        let banY = { start: canvasPos.top / avialableY, end: (canvasPos.top + canvasPos.height) / avialableY }
    
        let coordPercent = GetRandomCoord(banX, banY);
    
        return [avialableX * coordPercent[0], avialableY * coordPercent[1]];
    }
    const CreateStar = () => {
        let coord = getStarCoord();

        return `
            <span style="
                    left: ${coord[0]}px; 
                    top: ${coord[1]}px;
                    animation: StarsBlinking ${randInt(3, 12)}s linear infinite
            ">
            </span>
        `
    }
    let childPos = $canvas.rect();
    let parentPos = $globeWrap.rect();

    if (!canvasPos) canvasPos = {};
        canvasPos.top = childPos.top - parentPos.top;
        canvasPos.left = childPos.left - parentPos.left;
        canvasPos.height = childPos.height;
        canvasPos.width = childPos.width;
    
    let starsHTML = '';
    for (let i = 0; i < starsAmount; i++) {
        starsHTML += CreateStar();
    }
    $stars.ihtml(starsHTML)
}
function setName(name = '') {
    $areaName.text(name);
    if (ThemesObj.isDynamic) {
        $areaName.css({'padding': name == '' ? '0' : '0px 20px'})
    }
}




class D3 {
    static QueueData() {
        d3.queue()
            .defer(d3.json, "/src/countriesInfo.json")
            .await(D3.LoadData);
    }
    static LoadData = (error, world) => {
        if (error) throw error;
        globe = { type: 'Sphere' } 
        land = topojson.feature(world, world.objects.land);
        countries = topojson.feature(world, world.objects.countries);
        polygonList = countries.features;
        borders = topojson.mesh(world, world.objects.countries, function(a, b) { return a != b; });

        $canvas.css({'opacity': 1});

        D3.setScale();
        D3.setAngles();
        D3.setTimer();
        D3.RenderGlobe();


        setStars();
    }
    static RenderGlobe() {
        function fill(obj, color) {
            context.beginPath()
            path(obj)
            context.fillStyle = color
            context.fill()
        }
        function Fill_All(arrayList, color) { 
            arrayList.obj.forEach(elem => {
                fill(getPolygon(elem), color)
            }); 
        }
        function stroke(obj, color, width) {
            context.beginPath()
            path(obj)
            context.strokeStyle = color 
            context.lineWidth = width
            context.stroke()
        }
        
        context.clearRect(0, 0, width, height)
        
        fill(land, colorLand)
        

        if (!AreaObj.isRegion())
            stroke(borders, styleBorders.color, styleBorders.thickness) 
        

        if (AreaObj.isRegion() && currentRegion)
            return Fill_All(currentRegion, colorActive)
            
        
        if (currentPolygon) 
            fill(currentPolygon, colorActive)
    }


    static setScale = () => { 
        width = Math.min(
            $globeWrap.rect().width * 0.9, 
            $globeWrap.rect().height * 0.7
        );
        height = width;

        canvas.attr('width', width).attr('height', height)
        projection
            .scale((scaleFactor * (Math.min(width, height)) / 2))
            .translate([width / 2, height / 2]) 

        setStars();
    }
    static setAngles() {
        let rotation = projection.rotate()
            rotation[0] = angles.x
            rotation[1] = angles.y
            rotation[2] = angles.z
        projection.rotate(rotation)
    }
    static setTimer() {
        if (autorotate) {
            setTimeout(() => {
                autorotate.restart(D3.timerTick, 0);  
            }, rotationDelay);
        }
        else
            autorotate = d3.timer(D3.timerTick, rotationDelay); 
    }
    static timerTick = (elapsed) => {
        now = d3.now()
        diff = now - lastTime
        lastTime = now
        if (diff < elapsed && rotateAvailable) { 
            if (!degPerSec) return;
            rotation = projection.rotate()

            let xSpeed = diff * xRotationSpeed;
            let yzSpeed = Math.abs(diff * yzRotationSpeed);

            
            let yCoord = Math.round(rotation[1]);
            let zCoord = Math.round(rotation[2]);
    
            let yEquation = angles.y - yCoord;
            let zEquation = angles.z - zCoord; 
    
            
            rotation[0] += xSpeed;
            if (Math.abs(yEquation) > yzSpeed && yEquation != 0)
                rotation[1] += yzSpeed * Math.abs(yEquation)/(yEquation)
            if (Math.abs(zEquation) > yzSpeed && zEquation != 0)
                rotation[2] += yzSpeed * Math.abs(zEquation)/(zEquation) 
                

            projection.rotate(rotation);    
            D3.AssignBackground();    
            D3.RenderGlobe() 
        }
    }  
    static setRotation = (state) => {
        clearTimeout(restartTimer);
        if (state) {
            restartTimer = setTimeout(() => {
                rotateAvailable = true; 
            }, rotationDelay);
        }
        else {
            rotateAvailable = false;
        }
    } 



    static AssignBackground() { 
        if (!ThemesObj.isDynamic) return;
        let coord = getCoord(); 
        let distancePercent = (haversine(coord.y, coord.x)) * 10;
        $js(`main`).css({'background-position': `${distancePercent}% ${distancePercent}%`});

        if (distancePercent >= 63 && distancePercent <= 65)
            $stars.removeClass()
        if (distancePercent > 65) 
            $stars.addClass('night-active')
    }
    static RemoveStars() {
        $stars.removeClass();
    }
}


class D3_CLICK {
    static setClick() {
        canvas.on('click', D3_CLICK.OpenPage)
    }
    static OpenPage() {
        let name = getObj(currentPolygon) && getObj(currentPolygon).name || currentRegion && currentRegion.name;
        if (name)
            AreaPage(name);
    }
}
class D3_HOVER {
    static setHover() {
        canvas.on('mousemove', D3_HOVER.CountryHover)
    }
    static CountryHover = () => {
        if (AreaObj.isRegion()) {
            if (!(D3_HOVER.setRegion())) 
                return;
        }
        else { 
            if (!(D3_HOVER.setCountry())) 
                return;
        }
        
        D3.setRotation(false);
        D3.RenderGlobe()
        D3_HOVER.setName();
    }

    static setCountry = () => {
        let countryPolygon = D3_HOVER.getPolygon($canvas.get())
      
        // water hover 
        if (!countryPolygon) { 
            if (currentPolygon) {
                setName('')
                currentPolygon = undefined
                D3.RenderGlobe()
            } 
            return false;
        }
        // hover one country twice
        if (countryPolygon === currentPolygon) { 
            return false;
        }
        // log(countryPolygon)
        // log(getObj(countryPolygon))
        currentPolygon = countryPolygon;
        return true;
    }
    static setRegion = () => {
        let polygon = D3_HOVER.getPolygon($canvas.get());
        if (!polygon) { 
            if (currentRegion) {
                setName('')
                currentRegion = undefined
                currentPolygon = undefined
                D3.RenderGlobe()
            }
            return null;
        }
        let obj = getObj(polygon);
        
        let output = false;
        AreaObj.REGIONS.forEach(region => {
            region.obj.forEach(country => { 
                if (parseInt(country.id) == parseInt(obj.id)) {
                    if (currentRegion == region) { 
                        output = false;
                        return;
                    } 
                    currentRegion = region;
                    output = true;
                    return;
                }
                if (output) return output;
            });
            if (output) return output;
        });
        return output;
    }
    static getPolygon = (event) => { 
        function polygonContains(polygon, point) {
            let n = polygon.length
            let p = polygon[n - 1]
            let x = point[0], y = point[1]
            let x0 = p[0], y0 = p[1]
            let x1, y1
            let inside = false
            for (let i = 0; i < n; ++i) {
                p = polygon[i], x1 = p[0], y1 = p[1]
                if (((y1 > y) !== (y0 > y)) && (x < (x0 - x1) * (y - y1) / (y0 - y1) + x1)) 
                    inside = !inside
                x0 = x1, y0 = y1
            }
            return inside
        }
        let pos = projection.invert(d3.mouse(event))    
        
        return countries.features.find(function(f) {
            return f.geometry.coordinates.find(function(c1) {
                return getObj(f) && polygonContains(c1, pos) || c1.find(function(c2) {
                    return (getObj(f) != undefined && polygonContains(c2, pos))
                })
            })
        })
    }
    static setName = () => {
        if (currentPolygon)
            return setName(getObj(currentPolygon).name)
        setName(currentRegion.name) 
    }
}
class D3_DRAG { 
    static setDrag() {
        canvas.call(
            d3.drag()
                .on('start', D3_DRAG.Start)
                .on('drag', D3_DRAG.Drag)
                .on('end', D3_DRAG.End)
        )
    }


    static Start() {
        D3.setRotation(false) 
        v0 = versor.cartesian(projection.invert(d3.mouse($canvas.get())))
        r0 = projection.rotate()
        q0 = versor(r0);
    }
    static Drag() {
        let v1 = versor.cartesian(projection.rotate(r0).invert(d3.mouse($canvas.get())))
        let q1 = versor.multiply(q0, versor.delta(v0, v1))
        let r1 = versor.rotation(q1)
        projection.rotate(r1) 
        D3.RenderGlobe();
        D3.AssignBackground(); 
    }
    static End() { 
        if (!currentPolygon && !currentRegion)
            D3.setRotation(true)
    } 
}