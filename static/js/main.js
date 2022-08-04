var url = "http://127.0.0.1:5000/get?query=";
var url_del = "http://127.0.0.1:5000/del";

$("#queryForm").submit(function (e) {
    e.preventDefault();
    var query = $("#query")[0].value;
    var u;
    u = url;
    if (query.length > 0) {
        u += query;
    }
    
    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 0]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // get the data
    d3.csv("/static/csv/XYZ.csv").then(function (data) {

        // format the data
        data.forEach(function (d) {
            d.sales = +d.sales;
        });

        // Scale the range of the data in the domains
        x.domain(data.map(function (d) { return d.salesperson; }));
        y.domain([0, d3.max(data, function (d) { return d.sales; })]);

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return x(d.salesperson); })
            .attr("width", x.bandwidth())
            .attr("y", function (d) { return y(d.sales); })
            .attr("height", function (d) { return height - y(d.sales); });

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

    });

    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleBand()
        .range([1, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 1]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg2 = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")
            ,radius = 200;

    // get the data
    d3.csv("/static/csv/XYZ.csv").then(function(data) {
               // Step 3


    // Step 1        
    var data = [{name: "1", share: 20.70}, 
                {name: "2", share: 30.92},
                {name: "3", share: 15.42},
                {name: "4", share: 13.65},
                {name: "5", share: 19.31}];
    
    var g = svg2.append("g")
               .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Step 4
    var ordScale = d3.scaleOrdinal()
                        .domain(data)
                        .range(['#ffd384','#94ebcd','#fbaccc','#d3e0ea','#fa7f72']);

    // Step 5
    var pie = d3.pie().value(function(d) { 
            return d.share; 
        });

    var arc = g.selectAll("arc")
               .data(pie(data))
               .enter();

    // Step 6
    var path = d3.arc()
                 .outerRadius(radius)
                 .innerRadius(0);

    arc.append("path")
       .attr("d", path)
       .attr("fill", function(d) { return ordScale(d.data.name); });

    // Step 7
    var label = d3.arc()
                  .outerRadius(radius)
                  .innerRadius(0);
        
    arc.append("text")
       .attr("transform", function(d) { 
                return "translate(" + label.centroid(d) + ")"; 
        })
       .text(function(d) { return d.data.name; })
       .style("font-family", "arial")
       .style("font-size", 15);
        
});

    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleBand()
        .range([2, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 2]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg3 = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // get the data
  d3.csv("/static/csv/XYZ.csv").then(function(data) {
    var dataset1 = [
        [1,1], [12,20], [24,36],
        [32, 50], [40, 70], [50, 100],
        [55, 106], [65, 123], [73, 130],
        [78, 134], [83, 136], [89, 138],
        [100, 140]
    ];

    // Step 4 
    var xScale = d3.scaleLinear().domain([0, 100]).range([0, width]),
        yScale = d3.scaleLinear().domain([0, 200]).range([height, 0]);
        
    var g = svg3.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");

    // Step 5
    // Title
    svg3.append('text')
    .attr('x', width/2 + 100)
    .attr('y', 100)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 20)
    .text('Tendencies Line Chart');
    
    // X label
    svg3.append('text')
    .attr('x', width/2 + 100)
    .attr('y', height - 15 + 150)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text('Independant');
    
    // Y label
    svg3.append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(60,' + height + ')rotate(-90)')
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text('Dependant');

    // Step 6
    g.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(xScale));
    
    g.append("g")
     .call(d3.axisLeft(yScale));
    
    // Step 7
    svg3.append('g')
    .selectAll("dot")
    .data(dataset1)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return xScale(d[0]); } )
    .attr("cy", function (d) { return yScale(d[1]); } )
    .attr("r", 3)
    .attr("transform", "translate(" + 100 + "," + 100 + ")")
    .style("fill", "#CC0000");

    // Step 8        
    var line = d3.line()
    .x(function(d) { return xScale(d[0]); }) 
    .y(function(d) { return yScale(d[1]); }) 
    .curve(d3.curveMonotoneX)
    
    svg3.append("path")
    .datum(dataset1) 
    .attr("class", "line") 
    .attr("transform", "translate(" + 100 + "," + 100 + ")")
    .attr("d", line)
    .style("fill", "none")
    .style("stroke", "#CC0000")
    .style("stroke-width", "2");

});


var margin = { top: 20, right: 20, bottom: 30, left: 40 },
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
    .range([2, width])
    .padding(0.1);
var y = d3.scaleLinear()
    .range([height, 2]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg4 = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("/static/csv/XYZ.csv").then(function(data) {
    var dataset = [
        ['Jan',703, 1902],
        ['Feb',1473,3341],
        ['Mar',863,1935],
        ['Apr',1494,3008],
        ['May',965,1743],
        ['Jun',568,1271],
        ['Jul',189, 626],
        ['Ago',464, 1064],
        ['Sep',731, 1443],
        ['Oct',306, 630],
        ['Nov',899, 2556],
        ['Dec',231, 880]
      ];
    
      var margin = {top: 20, right: 20, bottom: 30, left: 40},
          width = 960,
          height = 400;
    
      var xScale = d3.scaleBand()
                    .rangeRound([0, width])
                    .padding(0.1)
                    .domain(dataset.map(function(d) {
                      return d[0];
                    }));
        var yScale = d3.scaleLinear()
                    .rangeRound([height, 0])
                    .domain([0, d3.max(dataset, (function (d) {
                      return d[2];
                    }))]);
    
      var g = svg4.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
      // axis-x
      g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(xScale));
    
      // axis-y
      g.append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(yScale));
    
      var bar = g.selectAll("rect")
        .data(dataset)
        .enter().append("g");
    
      // bar chart
      bar.append("rect")
        .attr("x", function(d) { return xScale(d[0]); })
        .attr("y", function(d) { return yScale(d[2]); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - yScale(d[2]); })
        .attr("class", function(d) {
          var s = "bar ";
          if (d[1] < 400) {
            return s + "bar1";
          } else if (d[1] < 800) {
            return s + "bar2";
          } else {
            return s + "bar3";
          }
        });
    
      // labels on the bar chart
      bar.append("text")
        .attr("dy", "1.3em")
        .attr("x", function(d) { return xScale(d[0]) + xScale.bandwidth() / 2; })
        .attr("y", function(d) { return yScale(d[2]); })
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "black")
        .text(function(d) {
          return d[2];
        });
    
      // line chart
      var line = d3.line()
          .x(function(d, i) { return xScale(d[0]) + xScale.bandwidth() / 2; })
          .y(function(d) { return yScale(d[1]); })
          .curve(d3.curveMonotoneX);
    
      bar.append("path")
        .attr("class", "line") // Assign a class for styling
        .attr("d", line(dataset)); // 11. Calls the line generator
    
      bar.append("circle") // Uses the enter().append() method
          .attr("class", "dot") // Assign a class for styling
          .attr("cx", function(d, i) { return xScale(d[0]) + xScale.bandwidth() / 2; })
          .attr("cy", function(d) { return yScale(d[1]); })
          .attr("r", 5);
    
});


// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg5 = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("/static/csv/XYZ.csv").then(function(data) {
    var width = 960,
    height = 500,
    centered;

// Define color scale
var color = d3.scaleLinear()
  .domain([1, 20])
  .clamp(true)
  .range(['#fff', '#409A99']);

var projection = d3.geoMercator()
  .scale(1500)
  // Center the Map in Colombia
  .center([-74, 4.5])
  .translate([width / 2, height / 2]);

var path = d3.geoPath()
  .projection(projection);


// Add background
svg5.append('rect')
  .attr('class', 'background')
  .attr('width', width)
  .attr('height', height)
  .on('click', clicked);

var g = svg.append('g');

var effectLayer = g.append('g')
  .classed('effect-layer', true);

var mapLayer = g.append('g')
  .classed('map-layer', true);

var dummyText = g.append('text')
  .classed('dummy-text', true)
  .attr('x', 10)
  .attr('y', 30)
  .style('opacity', 0);

var bigText = g.append('text')
  .classed('big-text', true)
  .attr('x', 20)
  .attr('y', 45);

// Load map data
d3.json('/static/csv/geocol/geocol/colombia.geo.json', function(error, mapData) {
  var features = mapData.features;

  // Update color scale domain based on data
  color.domain([0, d3.max(features, nameLength)]);

  // Draw each province as a path
  mapLayer.selectAll('path')
      .data(features)
    .enter().append('path')
      .attr('d', path)
      .attr('vector-effect', 'non-scaling-stroke')
      .style('fill', fillFn)
      .on('mouseover', mouseover)
      .on('mouseout', mouseout)
      .on('click', clicked);
});

// Get province name
function nameFn(d){
  return d && d.properties ? d.properties.NOMBRE_DPT : null;
}

// Get province name length
function nameLength(d){
  var n = nameFn(d);
  return n ? n.length : 0;
}

// Get province color
function fillFn(d){
  return color(nameLength(d));
}

// When clicked, zoom in
function clicked(d) {
  var x, y, k;

  // Compute centroid of the selected path
  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  // Highlight the clicked province
  mapLayer.selectAll('path')
    .style('fill', function(d){return centered && d===centered ? '#D5708B' : fillFn(d);});

  // Zoom
  g.transition()
    .duration(750)
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')');
}

function mouseover(d){
  // Highlight hovered province
  d3.select(this).style('fill', 'orange');

  // Draw effects
  textArt(nameFn(d));
}

function mouseout(d){
  // Reset province color
  mapLayer.selectAll('path')
    .style('fill', function(d){return centered && d===centered ? '#D5708B' : fillFn(d);});

  // Remove effect text
  effectLayer.selectAll('text').transition()
    .style('opacity', 0)
    .remove();

  // Clear province name
  bigText.text('');
}

// Gimmick
// Just me playing around.
// You won't need this for a regular map.

var BASE_FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

var FONTS = [
  "Open Sans",
  "Josefin Slab",
  "Arvo",
  "Lato",
  "Vollkorn",
  "Abril Fatface",
  "Old StandardTT",
  "Droid+Sans",
  "Lobster",
  "Inconsolata",
  "Montserrat",
  "Playfair Display",
  "Karla",
  "Alegreya",
  "Libre Baskerville",
  "Merriweather",
  "Lora",
  "Archivo Narrow",
  "Neuton",
  "Signika",
  "Questrial",
  "Fjalla One",
  "Bitter",
  "Varela Round"
];

function textArt(text){
  // Use random font
  var fontIndex = Math.round(Math.random() * FONTS.length);
  var fontFamily = FONTS[fontIndex] + ', ' + BASE_FONT;

  bigText
    .style('font-family', fontFamily)
    .text(text);

  // Use dummy text to compute actual width of the text
  // getBBox() will return bounding box
  dummyText
    .style('font-family', fontFamily)
    .text(text);
  var bbox = dummyText.node().getBBox();

  var textWidth = bbox.width;
  var textHeight = bbox.height;
  var xGap = 3;
  var yGap = 1;

  // Generate the positions of the text in the background
  var xPtr = 0;
  var yPtr = 0;
  var positions = [];
  var rowCount = 0;
  while(yPtr < height){
    while(xPtr < width){
      var point = {
        text: text,
        index: positions.length,
        x: xPtr,
        y: yPtr
      };
      var dx = point.x - width/2 + textWidth/2;
      var dy = point.y - height/2;
      point.distance = dx*dx + dy*dy;

      positions.push(point);
      xPtr += textWidth + xGap;
    }
    rowCount++;
    xPtr = rowCount%2===0 ? 0 : -textWidth/2;
    xPtr += Math.random() * 10;
    yPtr += textHeight + yGap;
  }

  var selection = effectLayer.selectAll('text')
    .data(positions, function(d){return d.text+'/'+d.index;});

  // Clear old ones
  selection.exit().transition()
    .style('opacity', 0)
    .remove();

  // Create text but set opacity to 0
  selection.enter().append('text')
    .text(function(d){return d.text;})
    .attr('x', function(d){return d.x;})
    .attr('y', function(d){return d.y;})
    .style('font-family', fontFamily)
    .style('fill', '#777')
    .style('opacity', 0);

  selection
    .style('font-family', fontFamily)
    .attr('x', function(d){return d.x;})
    .attr('y', function(d){return d.y;});

  // Create transtion to increase opacity from 0 to 0.1-0.5
  // Add delay based on distance from the center of the <svg> and a bit more randomness.
  selection.transition()
    .delay(function(d){
      return d.distance * 0.01 + Math.random()*1000;
    })
    .style('opacity', function(d){
      return 0.1 + Math.random()*0.4;
    });
}
});

$(".loader-container").css("display", "block");
$("#results").html("");

    $.ajax({
        url: u,
        type: "POST",
        success: function (response) {
            results(response["products"]);
            $(".loader-container").css("display", "none");
        },
    });
  
    $.ajax({
        url: u,
        type: "POST",
        success: function (response) {
            results(response["products"]);
            $(".loader-container").css("display", "none");
        },
    });
});

$("#delete").submit(function (e) {
    e.preventDefault();
    $.ajax({
        url: url_del,
        type: "POST",
        success: function (response) {
            window.location.href = "http://127.0.0.1:5000/"
        },
    });
});

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/pie-chart
function PieChart(data, {
    name = ([x]) => x,  // given d in data, returns the (ordinal) label
    value = ([, y]) => y, // given d in data, returns the (quantitative) value
    title, // given d in data, returns the title text
    width = 640, // outer width, in pixels
    height = 400, // outer height, in pixels
    innerRadius = 0, // inner radius of pie, in pixels (non-zero for donut)
    outerRadius = Math.min(width, height) / 2, // outer radius of pie, in pixels
    labelRadius = (innerRadius * 0.2 + outerRadius * 0.8), // center radius of labels
    format = ",", // a format specifier for values (in the label)
    names, // array of names (the domain of the color scale)
    colors, // array of colors for names
    stroke = innerRadius > 0 ? "none" : "white", // stroke separating widths
    strokeWidth = 1, // width of stroke separating wedges
    strokeLinejoin = "round", // line join of stroke separating wedges
    padAngle = stroke === "none" ? 1 / outerRadius : 0, // angular separation between wedges
  } = {}) {
    // Compute values.
    const N = d3.map(data, name);
    const V = d3.map(data, value);
    const I = d3.range(N.length).filter(i => !isNaN(V[i]));
  
    // Unique the names.
    if (names === undefined) names = N;
    names = new d3.InternSet(names);
  
    // Chose a default color scheme based on cardinality.
    if (colors === undefined) colors = d3.schemeSpectral[names.size];
    if (colors === undefined) colors = d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), names.size);
  
    // Construct scales.
    const color = d3.scaleOrdinal(names, colors);
  
    // Compute titles.
    if (title === undefined) {
      const formatValue = d3.format(format);
      title = i => `${N[i]}\n${formatValue(V[i])}`;
    } else {
      const O = d3.map(data, d => d);
      const T = title;
      title = i => T(O[i], i, data);
    }
  
    // Construct arcs.
    const arcs = d3.pie().padAngle(padAngle).sort(null).value(i => V[i])(I);
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);
    
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  
    svg.append("g")
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth)
        .attr("stroke-linejoin", strokeLinejoin)
      .selectAll("path")
      .data(arcs)
      .join("path")
        .attr("fill", d => color(N[d.data]))
        .attr("d", arc)
      .append("title")
        .text(d => title(d.data));
  
    svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .join("text")
        .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
      .selectAll("tspan")
      .data(d => {
        const lines = `${title(d.data)}`.split(/\n/);
        return (d.endAngle - d.startAngle) > 0.25 ? lines : lines.slice(0, 1);
      })
      .join("tspan")
        .attr("x", 0)
        .attr("y", (_, i) => `${i * 1.1}em`)
        .attr("font-weight", (_, i) => i ? null : "bold")
        .text(d => d);
  
    return Object.assign(svg.node(), {scales: {color}});
  }

function results(results) {
    console.log(results);
    $("#results").load("/results_template", function () {
        $("#result_heading").html('<hr/><h1 align="center">Results</h1>');
        $.each(results, function (key, value) {
            for (var i = 0; i < results[key]["link_product"].length; i++) {
                var trs = '<tr>' +
                    '<td class="a">' +
                    results[key]["name_product"][i] +
                    '</td>' +
                    '<td class="b">' +
                    results[key]["price_product"][i] +
                    '</td>' +
                    '<td class="c">' +
                    results[key]["link_product"][i] +
                    '</td>' +
                    "</tr>";
                $("#cuerpoResultados").append(trs);
            }
        });
    });
}