OWM_Key = "d0c0896ddf4e9a2f3761630900d96af6";
var stations;
var chartInstance = null;

// Function to populate chart using stored location
function PopulateList(lat, lon) {
    var owm_url = "https://api.openweathermap.org/data/2.5/find?lat=" + lat + "&lon=" + lon + "&appid=" + OWM_Key + "&cnt=5&units=metric";
    console.log("Fetching data from:", owm_url);

    // Call weather API
    $.getJSON(owm_url, function (data) {
        stations = data.list;
        var stationNames = stations.map(station => station.name);
        var temperatures = stations.map(station => station.main.temp);

        var ctx = document.getElementById("myChart").getContext("2d");

        // Destroy previous chart instance if it exists
        if (chartInstance) {
            chartInstance.destroy();
        }

        $("#myChart").replaceWith('<canvas id="myChart"></canvas>');
        ctx = document.getElementById("myChart").getContext("2d");

        // Create a new chart
        chartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels: stationNames,
                datasets: [{
                    label: "Temperature (°C)",
                    data: temperatures,
                    backgroundColor: "rgba(75, 192, 192, 0.6)"
                }]
            },
            options: {
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 25, // Set the maximum temperature value 
                    ticks: {
                        stepSize: 5 //  Set step size for better readability
                    }
                },
                    x: {
                        ticks: {
                            maxRotation: 0, // Prevent slanting
                            minRotation: 0,
                            autoSkip: false, // Ensure all labels are shown
                            
                            callback: function(value, index, ticks) {
                              let label = this.getLabelForValue(value);
                              
                              // Split label at space if possible (max 10 chars per line)
                              let words = label.split(" ");
                              let lines = [];
                              let currentLine = "";
                          
                              words.forEach(word => {
                                  if ((currentLine + word).length > 10) {
                                      lines.push(currentLine);
                                      currentLine = word;
                                  } else {
                                      currentLine += (currentLine ? " " : "") + word;
                                  }
                              });
                          
                              lines.push(currentLine); // Add last part
                              return lines; // Chart.js supports returning an array for multiple lines
                          }
                        }
                    }
                }
            }
            
        });

        console.log("Updated Chart with:", stationNames);
    });
}



