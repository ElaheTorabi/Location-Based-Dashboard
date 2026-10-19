
OWM_Key="d0c0896ddf4e9a2f3761630900d96af6";
var stations;
var markerlist=[]




  var map = L.map('mapid');

  map.locate({ setView: true, maxZoom: 12 });

  function onLocationFound(e) { 

    var radius = e.accuracy; 

    L.marker(e.latlng).addTo(map).bindPopup("You are within " + radius + " meters from this point").openPopup(); 

    L.circle(e.latlng, radius).addTo(map); } 

     map.on('locationfound', onLocationFound);



  var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', 
        {
	        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
        }).addTo(map);

function updateMap1(lat,lon){
    owm_url="https://api.openweathermap.org/data/2.5/find?lat="+lat+"&lon="+lon+"&appid="+OWM_Key+"&cnt=50&units=metric";
    console.log(owm_url);
    
    $.getJSON(owm_url,function(data){
        stations=data.list;
        // create a list of markers
       
        // Extract station names and temperatures
        
        stations.forEach(station => {
          const { name, main, coord } = station;
          const temperature = main.temp;
          var marker= L.marker(L.latLng(coord.lat, coord.lon));
          markerlist.push(marker);
          
          marker.bindPopup("The temparature in " + name + " station is: "+ temperature + "°C");     
            });
            var markers = L.markerClusterGroup();


      markers.addLayers(markerlist);
      map.addLayer(markers);

          
        });
        


}



