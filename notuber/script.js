let map;

let markers = [{
  vid : "mXfkjrFw",
  lat: 42.3453,
  lng: -71.0464
},
{
  vid : "nZXB8ZHz",
  lat: 42.3662,
  lng: -71.0621
},
{
  vid : "Tkwu74WC",
  lat: 42.3603,
  lng: -71.0547
},
{
  vid : "5KWpnAJN",
  lat: 42.3472,
  lng: -71.0802
},
{
  vid : "uf5ZrXYw",
  lat: 42.3663,
  lng: -71.0544
},
{
  vid : "mXfkjrFw",
  lat: 42.3542,
  lng: -71.0704
}]


function initMap() {
  
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 42.352271, lng: -71.05524200000001}
  });

  //set bounds
  let bounds = new google.maps.LatLngBounds();

  for (const marker of markers){
    let gmarker = new google.maps.Marker({
      position: {
        lat: marker.lat,
        lng: marker.lng
      },
      map,
      title: marker.vid,
      icon: "car.png"
    });
    bounds.extend(gmarker.getPosition());
  }

  map.fitBounds(bounds);


}


window.initMap = initMap;