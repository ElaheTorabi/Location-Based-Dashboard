# Location-Based Dashboard

A web dashboard that uses your current location to show live weather from nearby stations and the pharmacies around you, combining interactive maps and charts on a single page.

**Live demo:** https://elahetorabi.github.io/Location-Based-Dashboard/

> When the page opens, your browser asks for permission to use your location. Allow it to see data for where you are. Your location is only used in your browser to request nearby data and is not stored.

## Features

- **Weather Stations Map:** a Leaflet map centred on your location, showing nearby weather stations.
- **Twenty Nearby Weather Stations:** a D3.js bar chart of current temperatures at the 20 stations closest to you. It shows sample data on load; click the text above the chart to load live data.
- **Five Nearby Weather Stations:** a Chart.js chart summarising weather at the five closest stations.
- **Nearby Pharmacies Map:** pharmacies within 5 km of you, found through OpenStreetMap and grouped into clusters that split apart as you zoom in. Click a marker to see the pharmacy's name and phone number, where available.

## How it works

1. The browser's Geolocation API provides your latitude and longitude.
2. Weather data is requested from the OpenWeatherMap API for stations around that point.
3. Pharmacy locations are requested from the Overpass API, which searches OpenStreetMap data.
4. The results are drawn on the maps and charts.

Everything runs in the browser; there is no backend.

## Built with

- HTML, CSS and JavaScript
- [Leaflet](https://leafletjs.com/) and [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) for the maps
- [D3.js](https://d3js.org/) (v3) and [Chart.js](https://www.chartjs.org/) for the charts
- [jQuery](https://jquery.com/) for data requests
- [OpenWeatherMap API](https://openweathermap.org/api) for weather data
- [Overpass API](https://overpass-api.de/) and [OpenStreetMap](https://www.openstreetmap.org/) for pharmacy locations
- Esri World Street Map basemap
- [AdminKit](https://adminkit.io/) (Bootstrap 5) for the dashboard layout

## Project structure

```
index.html            Page layout
css/app.css           AdminKit styles
js/location.js        Gets the user's location and starts the data requests
js/excerciseMap.js    Weather stations map
js/D3vertical.js      D3 bar chart (20 stations)
js/chart.js           Chart.js chart (5 stations)
js/clustering.js      Nearby pharmacies map with marker clustering
img/                  Icons
```

## Run it locally

Download or clone the repository and serve the folder with a local web server, for example the Live Server extension in VS Code. Location access and some APIs do not work when `index.html` is opened directly from disk.

## Notes

- The OpenWeatherMap API key is included in the code, as is unavoidable for a site that runs entirely in the browser. It is a free-tier key with no billing attached.
- The Overpass API is a free public service and can be slow when busy, so the pharmacy map may take a few seconds to load.
- Results depend on OpenStreetMap coverage in your area; some pharmacies may be missing names or phone numbers.

## Credits

Dashboard layout based on the [AdminKit](https://github.com/adminkit/adminkit) template (MIT License). Map data © OpenStreetMap contributors. Weather data © OpenWeather.
