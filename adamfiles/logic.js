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
    d.gsrating = +d.gsrating;
  });
};


var schoolMarkers = [];

for (var i = 0; i < schooldata.length; i++) {
  // loop through the cities array, create a new marker, push it to the cityMarkers array
  schoolMarkers.push(
    L.marker([schooldata[i].lat,schooldata[i].lon]).bindPopup("<h2>" 
    + "City: " + schooldata[i].city + "<br>" 
    + "Average School Size: " + Math.round(schooldata[i].enrollment) + "<br>" 
    + "Average Parent Rating: " + (Math.round(schooldata[i].parentrating * 100)/100).toFixed(2) + "<br>"
    +"Average Golden State Rating: " + (Math.round(schooldata[i].gsrating * 100)/100).toFixed(2)
    + "</h2>")
  );
}

// Add all the cityMarkers to a new layer group.
// Now we can handle them as one group instead of referencing each individually
var schoolLayer = L.layerGroup(schoolMarkers);


// Set variable array
housedata = [];

// Set path to data
var houseurl = "https://raw.githubusercontent.com/mayushah1/Best-Place-to-live/adam_branch/adamfiles/housing.csv"

// Read in csv and grab data
d3.csv(houseurl, function(error, housedata) {
  
  if (error) {console.log(error); return (error);
  housedata.forEach(function(d) {
    d.longitude = +d.longitude;
    d.latitude = +d.latitude;
    d["city"] = d["city"];
    d.avg_age = +d.avg_age;
    d.avg_house_value = +d.avg_house_value;
    d.avg_income = +d.avg_income;
  });
};
//Check what is being pulled
// console.log(schooldata[0]);

// Add map markers with popup box information
var houseMarkers = [];

for (var i = 0; i < housedata.length; i++) {
  // loop through the cities array, create a new marker, push it to the cityMarkers array
  houseMarkers.push(
    L.marker([housedata[i].latitude,housedata[i].longitude]).bindPopup("<h2>" 
    + "City: " + housedata[i].city + "<br>" 
    + "Average House Value: $" + Math.round(housedata[i].avg_house_value) + "<br>" 
    + "Average Income: $" + (Math.round(housedata[i].avg_income * 100)/100).toFixed(2) + "<br>"
    + "Average house age: " + (Math.round(housedata[i].avg_age * 100)/100).toFixed(2)
    + "</h2>")
  );
}

// Add all the houseMarkers to a new layer group.
// Now we can handle them as one group instead of referencing each individually
var houseLayer = L.layerGroup(houseMarkers);

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
  Schools: schoolLayer,
  Houses: houseLayer
};

// Create map object and set default layers
var myMap = L.map("map", {
  center: [37.85, -122.24],
  zoom: 6.2,
  layers: [light, schoolLayer]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

});
});