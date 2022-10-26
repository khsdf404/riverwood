// export * from "/scripts/d3/d3.js";
// export * from "/scripts/d3/d3.min.js";

$(document).ready(() => {

    var rotationDelay = 10000
    var scaleFactor = 0.6
    var degPerSec = 4
    var angles = { x: 40, y: -20, z: 0}
    var colorWater = '#181236cc'
    var colorGraticule = '#0004'
    var colorLand = '#F19BFE'
    var colorCountry = '#F6C1BC'





    var countryName = d3.select('#countryName')
    var canvas = d3.select('#globe')
    var context = canvas.node().getContext('2d')
    var water = { type: 'Sphere' }
    var projection = d3.geoOrthographic().precision(0.1)
    var graticule = d3.geoGraticule10()
    var path = d3.geoPath(projection).context(context)


    var v0 // Mouse position in Cartesian coordinates at start of drag gesture.
    var r0 // Projection rotation as Euler angles at start.
    var q0 // Projection rotation as versor at start.
    var lastTime = d3.now()
    var degPerMs = degPerSec / 1000
    var width, height
    var land, countries
    var countryList
    var autorotate, now, diff, rotation
    var currentCountry



    function LoadData() { 
        let foo = (world, cList) => {
            land = topojson.feature(world, world.objects.land)
            countries = topojson.feature(world, world.objects.countries)
            countryList = cList

            ScaleGlobe()
            autorotate = d3.timer((elapsed) => {
                now = d3.now()
                diff = now - lastTime
                if (diff < elapsed) {
                    rotation = projection.rotate()
                    rotation[0] += diff * degPerMs
                    projection.rotate(rotation)
                    RenderGlobe()
                }
                lastTime = now
            });
        }
        d3.json('/src/countriesInfo.json', (error, world) => { 
            if (error) {
                console.log('why error');
                throw error
            }
            d3.tsv('/src/countriesInfo.tsv', function(error, countries) {
                if (error) {
                    console.log('sdf');
                    throw error
                } 
                foo(world, countries);  
            })
        }) 
    }
    function RenderGlobe() {
        function fill(obj, color) {
            context.beginPath()
            path(obj)
            context.fillStyle = color
            context.fill()
        }
        function stroke(obj, color) {
            context.beginPath()
            path(obj)
            context.strokeStyle = color
            context.stroke()
        }

        context.clearRect(0, 0, width, height)
        fill(water, colorWater)
        stroke(graticule, colorGraticule)

        fill(land, colorLand)
        if (currentCountry) {
            fill(currentCountry, colorCountry)
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


    function CanvasListeners() {
        function CountryHover() { 
            function setCountryName() {
                var countryObj = countryList.find(function(e) {
                    return parseInt(e.id) == parseInt(currentCountry.id)
                })
                countryName.text(countryObj && countryObj.name || '')
            }
            function getCountry(event) {
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
            let checkCountry = () => {
                let countryObj = getCountry(this)
                if (!countryObj) {
                    if (currentCountry) {
                        countryName.text('');
                        currentCountry = undefined
                        RenderGlobe()
                    }
                    return null;
                }
                if (countryObj === currentCountry) {
                    return null
                }
                return countryObj;
            }

            if (!checkCountry()) return;
            currentCountry = checkCountry()
            RenderGlobe()
            setCountryName();
        }

        function dragstarted() {
            v0 = versor.cartesian(projection.invert(d3.mouse(this)))
            r0 = projection.rotate()
            q0 = versor(r0)
            autorotate.stop();
        }
        function dragged() {
            var v1 = versor.cartesian(projection.rotate(r0).invert(d3.mouse(this)))
            var q1 = versor.multiply(q0, versor.delta(v0, v1))
            var r1 = versor.rotation(q1)
            projection.rotate(r1)
            RenderGlobe()
        }
        function dragended() {
            autorotate.restart((elapsed) => {
                now = d3.now()
                diff = now - lastTime
                if (diff < elapsed) {
                    rotation = projection.rotate()
                    rotation[0] += diff * degPerMs
                    projection.rotate(rotation)
                    RenderGlobe()
                }
                lastTime = now
            }, rotationDelay || 0)
        }

        canvas
        .call(
            d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended))
        .on('mousemove', CountryHover)
    }

  
  
 
    LoadData();
    setAngles();
    CanvasListeners();
 
    
    $(window).resize(() => {
        ScaleGlobe();
    })
})
