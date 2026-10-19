// Global variables to store location
var userLat = null;
var userLon = null;

function getLocationAndUpdate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                userLat = position.coords.latitude;
                userLon = position.coords.longitude;
                console.log("User location stored:", userLat, userLon);

                // Update only the map on page load
                updateMap1(userLat, userLon);
                PopulateList(userLat, userLon);
                updateMap2(userLat, userLon);

                
            },
            function showError(error) {
                switch(error.code) {
                  case error.PERMISSION_DENIED:
                    alert("User denied the request for Geolocation.");
                    break;
                  case error.POSITION_UNAVAILABLE:
                    alert("Location information is unavailable.");
                    break;
                  case error.TIMEOUT:
                    alert("The request to get user location timed out.");
                    break;
                  case error.UNKNOWN_ERROR:
                    alert("An unknown error occurred.");
                    break;
                }
              }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
