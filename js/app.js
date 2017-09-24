

// var lat = 47.609037;
// var lng = -122.334544;

var lat = 45.526865;
var lng = -122.659682;

var cityID = 'Portland';

var citySelector = document.getElementById('citySelector');

var dataSelector = document.getElementById('dataSelector');

var dataUrl = '';

var dataSet1 = [{lat: 47.609037, lng: -122.334544, val: 5, city: 'Seattle'}, {lat: 47.65, lng: -122.35, val: 3, city: 'Seattle'}, {lat: 47.63, lng: -122.325, val: 8, city: 'Seattle'}];

var dataSet2 = [{lat: 47.509037, lng: -122.334544, val: 5, city: 'Seattle'}, {lat: 47.55, lng: -122.35, val: 3, city: 'Seattle'}, {lat: 47.53, lng: -122.325, val: 8, city: 'Seattle'}];

var currentSet = dataSet1;
var count = 1;

function onMapClick(event){
  var nbrhood = event.target;
  console.log(nbrhood.options.val);
}

function onSelectData(event){
  dataUrl = event.target.value;
}

function onGetData(){
  var dataSet = axios.get(dataUrl).then(function(response){

  }).catch(function(error){
    console.log(error);
  });
  return dataSet;
}

var map = L.map('map').setView([lat, lng], 13);

// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYWFyb25rYnJvd24iLCJhIjoiY2o3eHlrdzRjN2VoODMybnBvYmhqczBmZiJ9.HggNGKHEV6mFUV0PKbTlVA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(map);

function mapData(dataSet){
  dataSet.map(function(data){
    var circle = L.circle([data.lat, data.lng], {
      color: '#f03',
      opacity: 0.5,
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500,
      val: data.val,
      type: 'dataPoint',
      city: data.city
    }).addTo(map);
    console.log(circle);
    circle.on('click', onMapClick);
  });
}

citySelector.onchange = function(event){
  lat = 47.609037;
  lng = -122.334544;
  cityID = event.target.value;
  map.setView([lat, lng], 13);
  map.eachLayer(function(layer){
    if(layer.options.type === 'dataPoint'){
      console.log("deleting " + layer);
      map.removeLayer(layer);
    }
  });
  if(count){
    currentSet = dataSet2;
    count = 0;
  } else {
    currentSet = dataSet1;
    count = 1;
  }
  mapData(currentSet);
}

