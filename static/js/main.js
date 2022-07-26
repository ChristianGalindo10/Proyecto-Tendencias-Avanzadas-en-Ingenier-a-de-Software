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
            console.log(results[key]["link_product"].length);
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
                console.log(trs);
            }
        });
    });
}