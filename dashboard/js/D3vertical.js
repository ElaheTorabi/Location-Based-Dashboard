var OWM_Key = "d0c0896ddf4e9a2f3761630900d96af6";
var stations;

// Initial dataset with placeholder values
var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

// Function to render the bar chart
function renderChart(temperatures, stationNames) {
    var container = d3.select("#weather-chart");

    // Clear previous SVG (prevents duplication)
    container.select("svg").remove();

    // Chart dimensions
    var w = 650; // Adjust width to fit the AdminKit card
    var h = 300;
    var margin = { top: 10, right: 30, bottom: 20, left: 50 };
    var chartWidth = w - margin.left - margin.right;
    var chartHeight = h - margin.top - margin.bottom;

    // Scale values
    var xScale = d3.scale.ordinal()
        .domain(d3.range(temperatures.length))
        .rangeRoundBands([0, chartWidth], 0.2);

    var yScale = d3.scale.linear()
        .domain([0, d3.max(temperatures) + 5]) // Dynamic max range
        .range([chartHeight, 0]);

    // Create SVG inside #weather-chart
    var svg = container.append("svg")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Create bars
    var bars = svg.selectAll("rect")
        .data(temperatures)
        .enter()
        .append("rect")
        .attr("x", function(d, i) { return xScale(i); })
        .attr("y", function(d) { return yScale(d); })
        .attr("width", xScale.rangeBand())
        .attr("height", function(d) { return chartHeight - yScale(d); })
        .attr("fill", function(d) { return "rgb(0, 0, " + (d * 7) + ")"; });

    // Add temperature labels above bars
    svg.selectAll("text.temp")
        .data(temperatures)
        .enter()
        .append("text")
        .attr("class", "temp")
        .text(function(d) { return d.toFixed(1); })
        .attr("x", function(d, i) { return xScale(i) + xScale.rangeBand() / 2; })
        .attr("y", function(d) { return yScale(d) - 5; }) // Position slightly above the bar
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("fill", "black");

        // Add y-axis label (Temperature)
        svg.append("text")
        .attr("class", "y-axis-label")
        .attr("transform", "rotate(-90)") // Rotate the label to be vertical
        .attr("x", - (chartHeight / 2)) // Position the label along the y-axis
        .attr("y", - margin.left+10 )  // Adjust distance from the axis
        .attr("font-family", "sans-serif")
        .attr("font-size", "14px")
        .attr("fill", "black")
        .text("Temperature (°C)"); // The label text


// Add station labels (rotated vertically, starting from the bottom of bars)
svg.selectAll("text.station")
.data(stationNames)
.enter()
.append("text")
.attr("class", "station")
.text(function(d) { 
    // Truncate station name if it's too long (e.g., longer than 10 characters)
    return d.length > 30 ? d.substring(0, 30) : d; 
})
.attr("x", function(d, i) { return xScale(i) + xScale.rangeBand() / 2; }) // Center horizontally
.attr("y", function(d, i) { return yScale(temperatures[i]) + 5; }) // Start at bottom of bar
.attr("text-anchor", "end") // Align text properly when rotated
.attr("font-family", "sans-serif")
.attr("font-size", "10px")
.attr("fill", "white")
.attr("transform", function(d, i) {
    return "rotate(-90," + (xScale(i) + xScale.rangeBand() / 2) + "," + (yScale(temperatures[i]) + 5) + ")";
});





    // Add vertical axis (temperature)
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(6);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
}



// Function to fetch weather data and update the chart
function updateChart1(lat, lon) {
    var owm_url = "https://api.openweathermap.org/data/2.5/find?lat=" + lat + "&lon=" + lon + "&appid=" + OWM_Key + "&cnt=20&units=metric"; 
    console.log("Fetching data from:", owm_url);

    $.getJSON(owm_url, function (data) {
        stations = data.list;

        // Extract temperatures and station names (ensure we get up to 20)
        var temperatures = stations.map(station => station.main.temp);
        var stationNames = stations.map(station => station.name);
        console.log("Fetched temperatures:", temperatures);
        console.log("Fetched station names:", stationNames);

        // Ensure we update with the correct number of stations
        renderChart(temperatures, stationNames);
    });
}


// Event listener to update the chart ONLY when clicking the paragraph text

d3.select("p").on("click", function () {
    if (userLat !== null && userLon !== null) {
        console.log("Using stored location for chart update:", userLat, userLon);

        // Call updateChart1 with stored location values
        updateChart1(userLat, userLon);
    } else {
        console.error("Location not available. Please allow location access.");
        alert("Location not available. Please refresh and allow location access.");
    }
});



// Ensure the page loads with the default dataset
$(document).ready(function () {
    console.log("Page loaded with initial dataset.");
    renderChart(dataset, dataset.map((d, i) => "Station " + (i + 1))); // Show default data on load
});
