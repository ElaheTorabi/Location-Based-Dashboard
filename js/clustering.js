
var stations;
var currentStation;
var markerlist2=[]


  var map2 = L.map('mapid2');


  map2.locate({ setView: true, maxZoom: 12 });

  function onLocationFound(e) { 

    var radius = e.accuracy; 

    L.marker(e.latlng).addTo(map2).bindPopup("You are within " + radius + " meters from this point").openPopup(); 

    L.circle(e.latlng, radius).addTo(map2); } 

     map2.on('locationfound', onLocationFound);



  var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', 
        {
	        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
        }).addTo(map2);

function updateMap2(lat, lon) {
    // Show a "searching" message on the map while waiting
    var loading = L.control({ position: 'topright' });
    loading.onAdd = function () {
        var div = L.DomUtil.create('div');
        div.style.cssText = 'background:white;padding:6px 10px;border-radius:6px;box-shadow:0 1px 4px rgba(0,0,0,0.3);font-size:13px;';
        div.innerHTML = 'Searching for nearby pharmacies...';
        return div;
    };
    loading.addTo(map2);

    // Smaller radius (5 km) and a time limit make the search faster
    const query = '[out:json][timeout:15];node[amenity=pharmacy](around:5000,' + lat + ',' + lon + ');out;';
    const url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query);

    $.getJSON(url, function (data) {
        var markers2 = L.markerClusterGroup();

        $.each(data.elements, function (index, station) {
            let name = station.tags?.name || "Unknown Pharmacy";
            let phone = station.tags?.phone || "No phone available";
            var marker2 = L.marker(L.latLng(station.lat, station.lon));
            marker2.bindPopup("Name: " + name + "<br>Phone Number: " + phone);
            markers2.addLayer(marker2);
        });

        map2.addLayer(markers2);
        map2.removeControl(loading);
    }).fail(function () {
        map2.removeControl(loading);
        alert("Could not load nearby pharmacies right now. Please try again in a minute.");
    });
}







