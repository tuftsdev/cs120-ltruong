(function() {
    "user strict";

    let map;
    let userGMarker;
    let userPos;
    const mapCenter = { lat: 42.352271, lng: -71.05524200000001 };


    function getUserLocation() {
        navigator.geolocation.getCurrentPosition(function(pos) {
        	userPos = pos;
            if (map) {
                loadRides();

            }
        }, function(error) {
            console.error(error);
        }, {
            enableHighAccuracy: true,
            maximumAge: 0
        });
    }

    function addUserMarkerInfo(rideGMarker){
    	infoWindowHtml =  `<p>Your Ride: ${rideGMarker.title} <br/>Distance: ${rideGMarker.distance} miles</p>`;
    	userGMarker['infowindow'] = new google.maps.InfoWindow({
    	        content: infoWindowHtml
    	    });

    	google.maps.event.addListener(userGMarker, 'click', function() {
    	    this['infowindow'].open(map, this);
    	    connectRide(rideGMarker);
    	    fitBoundMarkers([userGMarker, rideGMarker]);
    	});
    }

    function connectRide(rideGMarker){
    	const path = new google.maps.Polyline({
    	  path: [
			{"lat": userGMarker.position.lat(), "lng": userGMarker.position.lng()},
			{"lat": rideGMarker.position.lat(), "lng": rideGMarker.position.lng()},
    	  ],
    	  geodesic: true,
    	  strokeColor: "#FF0000",
    	  strokeOpacity: 1.0,
    	  strokeWeight: 2,
    	});

    	path.setMap(map);
    }

    function addMarker(lat, lng, title, icon) {
        let gmarker = new google.maps.Marker({
            position: {
                lat: lat,
                lng: lng
            },
            map,
            title: title,
            icon: icon
        });
        return gmarker;
    }


    function fitBoundMarkers(markers){
    	//set bounds
    	let bounds = new google.maps.LatLngBounds();

    	for (const marker of markers) {
    	    bounds.extend(marker.getPosition());
    	}

    	map.fitBounds(bounds);
    }


    function loadRides() {
    	if(!userPos) return;

        //google map loaded so let add the user position in google map
        userGMarker = addMarker(userPos.coords.latitude, userPos.coords.longitude, "", "");
        fitBoundMarkers([userGMarker]);

        let xhr = new XMLHttpRequest();
        let userPosition = userGMarker.getPosition();
        const URL = "https://jordan-marsh.herokuapp.com/rides";
        const USERNAME = "jLttbNzY";
        const PARAMS = `username=${USERNAME}&lat=${userGMarker.position.lat()}&lng=${userGMarker.position.lng()}`;
        xhr.open("POST", URL);

        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                let response = xhr.responseText;
                let rides = [];
                try {
                    rides = JSON.parse(response);
                } catch (e) {
                    console.error(e.message);
                }
                let shortestGMarker = null;
                for (const ride of rides) {
                	// add marker
                    gMarker = addMarker(ride["lat"], ride["lng"], ride["username"], "car.png");
                    gMarker["distance"] = getDistance({"lat": userGMarker.position.lat(), "lng": userGMarker.position.lng()}, ride);
                    if( shortestGMarker == null || gMarker["distance"] < shortestGMarker["distance"]){
                    	shortestGMarker = gMarker;
                    }
                }
                //Add information
                addUserMarkerInfo(shortestGMarker);
            }
        }

        xhr.send(PARAMS);
    }


    function getDistance(pos1, pos2){
    	const earthR =  3958.756; //in miles
    	let toRadius = (value) => { return value * Math.PI / 180;};
    	let lat1R = toRadius(pos1.lat);
    	let lat2R = toRadius(pos2.lat);
    	let deltaLatR = toRadius(pos2.lat - pos1.lat);
    	let deltaLngR = toRadius(pos2.lng - pos1.lng);

    	let a = Math.sin(deltaLatR/2) * Math.sin(deltaLatR/2) +
    			Math.cos(lat1R) * Math.cos(lat2R) *
    			Math.sin(deltaLngR/2) * Math.sin(deltaLngR/2);

    	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    	return earthR * c;
    }


    function initMap() {

        map = new google.maps.Map(document.getElementById("map"), {
            center: mapCenter,
            zoom: 15
        });
        // User Info loaded first
        if(userPos){
        	//userPos loaded first
        	userGMarker = addMarker(userPos.coords.latitude, userPos.coords.longitude, "", "");
        	fitBoundMarkers([userGMarker]);
        	loadRides();
        }
    }
	
    getUserLocation();
    window.initMap = initMap;





}());