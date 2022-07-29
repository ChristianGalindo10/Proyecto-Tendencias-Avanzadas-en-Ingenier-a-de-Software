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
    $(".loader-container").css("display", "block");
    $("#results").html("");
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