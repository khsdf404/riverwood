// 
const rotationDelay =     8000
const scaleFactor =       1
const degPerSec =         -7
const angles =            { x: 50, y: -20, z: 0}
const colorWater =        '#0000FF33' //'#18123600' 
const colorLand =         '#309d60'   //'#F19BFE'
const colorActive =       '#00000099'          //'#F6C1BC'
const styleBorders =      { 'color': '#000', 'thickness': 0.5  };
const styleGlobeBorder =  { 'color': '#000',  'thickness': 2  };
// all we need to work with
let width, height
let globe, land, countries, borders;
var polygonList, currentPolygon, currentRegion;

// rotation part
let v0 // Mouse position in Cartesian coordinates at start of drag gesture.
let r0 // Projection rotation as Euler angles at start.
let q0 // Projection rotation as versor at start.
let lastTime = d3.now()
let xRotationSpeed = degPerSec / 1000
let yzRotationSpeed = xRotationSpeed * 5;
let autorotate, now, diff, rotation;

// canvas & d3 variables
var canvas;
var canvasDOM;
var context;
var projection;
var path;
var HELPER;
 



const getObj = (countryPolygon) => {
    if (SearchArea.isRegion()) {
        let b;
        REGIONS.forEach(reg => {
            if (b) return;
            b = reg.obj.find(country => {
                return parseInt(country.id) == parseInt(countryPolygon.id)
            })
        }) 
        return b;
    }
    return COUNTRIES.find(function(e) {
        return parseInt(e.id) == parseInt(countryPolygon.id)
    })
}
const getPolygon = (countryObj) => {
    return polygonList.find(function(e) {
        return parseInt(e.id) == parseInt(countryObj.id)
    })
}
const logCoord = (rotation) => {
    return;
    console.log(`{ x: ${Math.round(rotation[0])}, y: ${Math.round(rotation[1])}, z: ${Math.round(rotation[2])} }`);
}
const getUserTime = () => {
    var currentdate = new Date(); 
    return [
        currentdate.getHours(),
        currentdate.getMinutes()
    ]
} 



class d3Helper {
    QueueData() {
        d3.queue()
            .defer(d3.json, "/src/countriesInfo.json")
            .await(this.LoadData);
    }
    LoadData = (error, world, names) => {
        if (error) throw error;
        globe = { type: 'Sphere' } 
        land = topojson.feature(world, world.objects.land);
        countries = topojson.feature(world, world.objects.countries);
        polygonList = countries.features;
        borders = topojson.mesh(world, world.objects.countries, function(a, b) { return a != b; });

        this.setScale();
        this.setAngles();
        this.setTimer();
        this.RenderGlobe();
    }
    RenderGlobe() {
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

        fill(globe, colorWater)
        fill(land, colorLand)

        if (!SearchArea.isRegion())
            stroke(borders, styleBorders.color, styleBorders.thickness) 
        

        if (SearchArea.isRegion() && currentRegion)
            return Fill_All(currentRegion, colorActive)
            
        
        if (currentPolygon) 
            fill(currentPolygon, colorActive)
    }


    setScale = () => {
        width = Math.min(
            $(`main`).outerWidth(), 
            $(`main`).outerHeight()
        )  * .8;
        height = width;
        // .log(`w: ${width}, h: ${$(`main div`).outerHeight()}`);
 
        $(`main div`).css({'width': width, 'height': height}) 
        canvas.attr('width', width).attr('height', height)
        projection
            .scale((scaleFactor * (Math.min(width, height)) / 2))
            .translate([width / 2, height / 2])
    }
    setAngles() {
        let rotation = projection.rotate()
            rotation[0] = angles.x
            rotation[1] = angles.y
            rotation[2] = angles.z
        projection.rotate(rotation)
    }
    setTimer() {
        if (autorotate) {
            setTimeout(() => {
                autorotate.restart(this.timerTick, 0);  
            }, rotationDelay);
        }
        else
            autorotate = d3.timer(this.timerTick, rotationDelay); 
    }
    timerTick = (elapsed) => {
        now = d3.now()
        diff = now - lastTime
        if (diff < elapsed) {
            
            rotation = projection.rotate()
            logCoord(rotation);


            let xSpeed = diff * xRotationSpeed;
            let yzSpeed = Math.abs(diff * yzRotationSpeed);

            let xCoord = Math.round(rotation[0]);
            let yCoord = Math.round(rotation[1]);
            let zCoord = Math.round(rotation[2]);
    
            let yEquation = angles.y - yCoord;
            let zEquation = angles.z - zCoord;
    
            rotation[0] += xSpeed
            if (Math.abs(yEquation) > yzSpeed && yEquation != 0)
                rotation[1] += yzSpeed * Math.abs(yEquation)/(yEquation)
            if (Math.abs(zEquation) > yzSpeed && zEquation != 0)
                rotation[2] += yzSpeed * Math.abs(zEquation)/(zEquation)
    
            projection.rotate(rotation);            
            this.RenderGlobe()
        }
        lastTime = now
    }  
}

class d3Hover {
    setHover() {
        canvas.on('mousemove', this.CountryHover)
    }
    CountryHover = () => { 
        if (SearchArea.isRegion()) {
            if (!(this.setRegion())) 
                return;
        }
        else { 
            if (!(this.setCountry())) 
                return;
        }
        
        HELPER.RenderGlobe()
        this.setName();
    }

    setCountry = () => {
        let countryPolygon = this.getPolygon(canvasDOM)
      
        // water hover 
        if (!countryPolygon) { 
            if (currentPolygon) {
                AREA_TEXT.text('');
                currentPolygon = undefined
                HELPER.RenderGlobe()
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
    setRegion = () => {
        let polygon = this.getPolygon(canvasDOM);
        if (!polygon) { 
            if (currentRegion) {
                AREA_TEXT.text('');
                currentRegion = undefined
                currentPolygon = undefined
                HELPER.RenderGlobe()
            }
            return null;
        }
        let obj = getObj(polygon);
        let output = false;
        REGIONS.forEach(region => {
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
    getPolygon = (event) => { 
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
    setName = () => {
        if (Translater.isEnglish())
            AREA_TEXT.text(currentRegion && currentRegion.en || getObj(currentPolygon).en) 
        else 
            AREA_TEXT.text(currentRegion && currentRegion.ru || getObj(currentPolygon).ru) 
    }
}
class d3Drag { 
    setDrag() {
        canvas.call(
            d3.drag()
                .on('start', this.Start)
                .on('drag', this.Drag)
                .on('end', this.End)
        )
    }


    Start() { 
        v0 = versor.cartesian(projection.invert(d3.mouse(canvasDOM)))
        r0 = projection.rotate()
        q0 = versor(r0)
        autorotate.stop();
    }
    Drag() {
        autorotate.stop();
        let v1 = versor.cartesian(projection.rotate(r0).invert(d3.mouse(canvasDOM)))
        let q1 = versor.multiply(q0, versor.delta(v0, v1))
        let r1 = versor.rotation(q1)
        projection.rotate(r1)
        HELPER.RenderGlobe();
        logCoord( projection.rotate());
    }
    End() {
        let interval = setInterval(() => {
            console.log('Waiting');
            
            if (!(currentPolygon || currentRegion)) { 
                autorotate.stop();
                HELPER.setTimer();
                clearInterval(interval);
            }
        }, 1000); 
    } 
}