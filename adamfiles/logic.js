// Set variable array
schooldata = [];

// Set path to data
var schoolsurl = "https://raw.githubusercontent.com/mayushah1/Best-Place-to-live/adam_branch/adamfiles/city_school.csv"

// Read in csv and grab data
d3.csv(schoolsurl, function(error, schooldata) {
  
  if (error) {console.log(error); return (error);
  schooldata.forEach(function(d) {
    d.lon = +d.lon;
    d.lat = +d.lat;
    d["city"] = d["city"];
    d.enrollment = +d.enrollment;
    d.parentrating = +d.parentrating;
  });
};

//Check what is being pulled
// console.log(schooldata[0]);


// Add map markers with popup box information
var schoolMarkers = [];

for (var i = 0; i < schooldata.length; i++) {
  // loop through the cities array, create a new marker, push it to the cityMarkers array
  schoolMarkers.push(
    L.marker([schooldata[i].lat,schooldata[i].lon]).bindPopup("<h2>" 
    + "City: " + schooldata[i].city + "<br>" 
    + "Average School Size: " + Math.round(schooldata[i].enrollment,2).toFixed(1) + "<br>" 
    + "Average Parent Rating: " + Math.round(schooldata[i].parentrating,2).toFixed(1) 
    + "</h2>")
  );
}

// Add all the cityMarkers to a new layer group.
// Now we can handle them as one group instead of referencing each individually
var cityLayer = L.layerGroup(schoolMarkers);

// Define variables for our tile layers
var light = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1IjoiYW14bW9uZ29vc2UiLCJhIjoiY2poZG55dm0zMHFyeDNjbWR4cms2M2xkbCJ9.ukhO0eVdqz7qrkp5q-vx6Q"
);
var dark = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1IjoiYW14bW9uZ29vc2UiLCJhIjoiY2poZG55dm0zMHFyeDNjbWR4cms2M2xkbCJ9.ukhO0eVdqz7qrkp5q-vx6Q"
);

// Only one base layer can be shown at a time
var baseMaps = {
  Light: light,
  Dark: dark
};

// Overlays that may be toggled on or off
var overlayMaps = {
  Cities: cityLayer
};

// Create map object and set default layers
var myMap = L.map("map", {
  center: [37.85, -122.24],
  zoom: 6.2,
  layers: [light, cityLayer]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);
})