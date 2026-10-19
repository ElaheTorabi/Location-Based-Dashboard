
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

function updateMap2(lat,lon){
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent('[out:json];node[amenity=pharmacy](around:5000,' + lat + ',' + lon + ');out;')}`;

    console.log(url);
    
    $.getJSON(url,function(data){

        let stations = data.elements; // Correct field from Overpass API response
       
       
        // Extract station names and temperatures
        
        $.each(stations, function(index, station) {
            let name = station.tags?.name || "Unknown Pharmacy"; // Handle missing names
            let phone = station.tags?.phone || "No phone available"; // Handle missing phone numbers
            var marker2= L.marker(L.latLng(station.lat, station.lon));
            marker2.bindPopup("Name: " + name + " <br> Phone Number: "+ phone);
            markerlist2.push(marker2);   
            });
            var markers2 = L.markerClusterGroup();


      markers2.addLayers(markerlist2);
      map2.addLayer(markers2);

          
        });
        


}




