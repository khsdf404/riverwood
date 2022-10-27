import { REGIONS } from '/scripts/mainlands.js';
$(document).ready(() => { 
    var rotationDelay =     5000
    var scaleFactor =       0.6
    var degPerSec =         -10
    var angles =            { x: 50, y: -20, z: 0}
    var colorWater =        '#0000FF33' //'#18123600' 
    var colorLand =         '#30cd60'   //'#F19BFE'
    var colorCountry =      '#de2545'          //'#F6C1BC'
    var styleBorders =      { 'color': '#000a', 'thickness':     0.3  };
    var styleGlobeBorder =  { 'color': '#000', 'thickness':     2  };





    var countryName =   d3.select('#countryName')
    var canvas =        d3.select('#globe')
    var context =       canvas.node().getContext('2d')
    var projection =    d3.geoOrthographic().precision(0.1) 
    var path =          d3.geoPath(projection).context(context)
    
    


    var v0 // Mouse position in Cartesian coordinates at start of drag gesture.
    var r0 // Projection rotation as Euler angles at start.
    var q0 // Projection rotation as versor at start.
    var lastTime = d3.now()
    var xRotationSpeed = degPerSec / 1000
    var yzRotationSpeed = xRotationSpeed * 5;
    var autorotate, now, diff, rotation

    var width, height
    var polygonList, objList, currentPolygon;
    var globe, land, countries, borders;

    // mainland == true, countries = false; 
    var currentRegion = null;
    var LAND__MODE = true;

   

    d3.queue()
        .defer(d3.json, "/src/countriesInfo.json")
        .defer(d3.tsv, "/src/countriesInfo.tsv")
        .await(LoadData);

    const getObj = (countryPolygon) => {
        return objList.find(function(e) {
            return parseInt(e.id) == parseInt(countryPolygon.id)
        })
    }
    const getPolygon = (countryObj) => {
        return polygonList.find(function(e) {
            return parseInt(e.id) == parseInt(countryObj.id)
        })
    }
    const timerTick = (elapsed) => {
        now = d3.now()
        diff = now - lastTime
        if (diff < elapsed) {
            rotation = projection.rotate()

            let xSpeed = diff * xRotationSpeed;
            let yzSpeed = Math.abs(diff * yzRotationSpeed);
            let yCoord = Math.round(rotation[1]);
            let zCoord = Math.round(rotation[2]);

            let yEquation = angles.y - yCoord;
            let zEquation = angles.z - zCoord;

            console.log(`${yEquation}, ${zEquation}, ${yzSpeed}`);
            console.log(`${yzSpeed * Math.abs(yEquation)/(yEquation)}`);

            rotation[0] += xSpeed
            if (Math.abs(yEquation) > yzSpeed && yEquation != 0)
                rotation[1] += yzSpeed * Math.abs(yEquation)/(yEquation)
            if (Math.abs(zEquation) > yzSpeed && zEquation != 0)
                rotation[2] += yzSpeed * Math.abs(zEquation)/(zEquation)

            projection.rotate(rotation);            
            RenderGlobe()
        }
        lastTime = now
    }


    function LoadData(error, world, names) {  
        if (error) throw error;
        globe = { type: 'Sphere' }
        land = topojson.feature(world, world.objects.land);
        countries = topojson.feature(world, world.objects.countries);
        polygonList = countries.features;
        objList = names;
        borders = topojson.mesh(world, world.objects.countries, function(a, b) { return a != b; }),


        ScaleGlobe()
        autorotate = d3.timer(timerTick, rotationDelay); 
    }
    function RenderGlobe() {
        function fill(obj, color) {
            context.beginPath()
            path(obj)
            context.fillStyle = color
            context.fill()
        }
        function Fill_All(objList, color) {
            objList.forEach(elem => {
                fill(getPolygon(getObj(elem)), color)
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

        stroke(borders, styleBorders.color, styleBorders.thickness)
        stroke(globe, styleGlobeBorder.color, styleGlobeBorder.thickness)

        if (LAND__MODE && currentRegion)
            return Fill_All(currentRegion, colorCountry) 
        if (currentPolygon) {
            fill(currentPolygon, colorCountry)
    }
    }
    function setAngles() {
        let rotation = projection.rotate()
            rotation[0] = angles.x
            rotation[1] = angles.y
            rotation[2] = angles.z
        projection.rotate(rotation)
    }
    function ScaleGlobe() {
        width = $(`main div`).outerWidth();
        height =  $(`main div`).outerHeight(); 

        canvas.attr('width', width).attr('height', height)
        projection
            .scale((scaleFactor * Math.min(width, height)) / 2)
            .translate([width / 2, height / 2])
            RenderGlobe();
    }


    function setHoverListeners() {
        function CountryHover() { 
            let setCountry = () => {
                let countryPolygon = (getPolygon(this))
                // water hover 
                if (!countryPolygon) { 
                    if (currentPolygon) {
                        countryName.text('');
                        currentPolygon = undefined
                        RenderGlobe()
                    } 
                    return false;
                }
                // hover one country twice
                if (countryPolygon === currentPolygon) { 
                    return false;
                } 
                currentPolygon = countryPolygon;
                return true;
            }
            let setRegion = () => {
                let polygon = getPolygon(this);
                if (!polygon) { 
                    if (currentRegion) {
                        countryName.text('');
                        currentRegion = undefined
                        currentPolygon = undefined
                        RenderGlobe()
                    }
                    return null;
                }
                let obj = getObj(polygon);
                let output = false;
                REGIONS.forEach(region => {
                    region.forEach(country => { 
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
            function getPolygon(event) {
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
                        return polygonContains(c1, pos) || c1.find(function(c2) {
                            return polygonContains(c2, pos)
                        })
                    })
                })
            }
            function setName() {
                if (LAND__MODE) {
                    let regionName = '';
                    if (currentRegion == REGIONS[0])
                        regionName = 'Africa';
                    else if (currentRegion == REGIONS[1])
                        regionName = 'North America';
                    else if (currentRegion == REGIONS[2])
                        regionName = 'Central America';
                    else if (currentRegion == REGIONS[3])
                        regionName = 'South America';
                    else if (currentRegion == REGIONS[4])
                        regionName = 'Asia';
                    else if (currentRegion == REGIONS[5])
                        regionName = 'Europe';
                    else if (currentRegion == REGIONS[6])
                        regionName = 'Australia';
                    else if (currentRegion == REGIONS[7])
                        regionName = 'Oceania & Icelands';
                    countryName.text(regionName)
                    return;
                }
                // console.log(currentPolygon);
                let countryObj = getObj(currentPolygon);
                
                countryName.text(countryObj && countryObj.name || '')
            }
            

            if (LAND__MODE) {
                if (!setRegion()) 
                    return;
            }
            else { 
                if (!setCountry()) 
                    return;
            }
 
            RenderGlobe()
            setName();
        }
        canvas.on('mousemove', CountryHover)
    }
    function setDragListeners() {
        function dragstarted() {
            v0 = versor.cartesian(projection.invert(d3.mouse(this)))
            r0 = projection.rotate()
            q0 = versor(r0)
            autorotate.stop();
                
        }
        function dragged() {
            let v1 = versor.cartesian(projection.rotate(r0).invert(d3.mouse(this)))
            let q1 = versor.multiply(q0, versor.delta(v0, v1))
            let r1 = versor.rotation(q1)
            projection.rotate(r1)
            RenderGlobe()
        }
        function dragended() { 
            let interval = setInterval(() => {
                console.log('Waiting');
                if (!(currentPolygon || currentRegion)) {
                    autorotate.restart(timerTick, rotationDelay);  
                    clearInterval(interval);
                }
            }, 1000); 
        }
        canvas.call(
            d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended)
        )
    }
  
   
    setAngles();
    setDragListeners();
    setHoverListeners();
     
 
    
    $(window).resize(() => {
        ScaleGlobe();
    })
})
