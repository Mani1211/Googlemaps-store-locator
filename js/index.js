  var map;
  var markers=[];
  var infoWindow;
        function initMap() {
            var losAngeles = {
                lat:34.06338,
                lng:-118.358080
            }
          map = new google.maps.Map(document.getElementById('map'), {
            center: losAngeles,
            zoom: 8,
            styles:[
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#242f3e"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#746855"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#242f3e"
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#d59563"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#d59563"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#263c3f"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#6b9a76"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#38414e"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#212a37"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9ca5b3"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#746855"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#1f2835"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#f3d19c"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#2f3948"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#d59563"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#17263c"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#515c6d"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#17263c"
                }
              ]
            }
          ]
          });
         
          // marker =  new google.maps.Marker({
          //       position: losAngeles,
          //       map:map
          //     });
             
              displayStores();
              showStoreMarkers();
        }

    function displayStores(){
      var storesHtml=""
      stores.forEach((store,index)=>{
        console.log(store)
        var address = store.addressLines
        var phoneNumber =store.phoneNumber
        storesHtml += `
        <div class="store-container">
            <div class="store-info-container">
                <div class="store-address">
                   
                  <span> <i class="fa fa-map-marker" aria-hidden="true"></i>${address[0]}</span>
                  <span>${address[1]}</span>
                </div>
            
                <div class="store-phone-number">
                    <i class="fa fa-phone" aria-hidden="true"></i>
                  ${phoneNumber}
                </div>
            </div>

            <div class="store-number-container">
                <div class="store-count">${index + 1}</div>
            </div>
        </div> `
      })

      document.querySelector('.stores-list').innerHTML=storesHtml
    }
             
  
    function showStoreMarkers(){
      var bounds = new google.maps.LatLngBounds()
      stores.forEach((store,index)=>{
        var latlng = new google.maps.LatLng(
         store.coordinates.latitude,
         store.coordinates.longitude
         );
          var name =store.name;
          var address =store.addressLines[0];
          var phoneNumber = store.phoneNumber;
          var open = store.openStatusText;
          bounds.extend(latlng)
          createMarker(latlng,name,address,phoneNumber,open)
      })
      map.fitBounds(bounds);
    }
        
         
    function createMarker(latlng, name, address,phoneNumber,open) {

var contentString =` 
<div id="content>
<div class="info-window">
    <div class="store-info">
        <div class="store-name">
          <span>${name}</span>
          <span>${open}</span>
        </div>
        <div class="store-add">
        <i class="fa fa-location-arrow" aria-hidden="true"></i> <a href="https://www.google.com/maps/dir/?api=1&origin=Los+Angeles&destination=${address}&travelmode=bicycling">${address}</a>
        </div>
        <div class="store-num">
        <i class="fa fa-phone" aria-hidden="true"></i>${phoneNumber}
        </div>
    </div>
    </div>
</div> `

var infoWindow = new google.maps.InfoWindow({
  content:contentString
});

var iconBase =
'https://developers.google.com/maps/documentation/javascript/examples/full/images/';


var icon = {
  url: "ss.png", // url
  scaledSize: new google.maps.Size(30, 30), // scaled size
  origin: new google.maps.Point(0,0), // origin
  anchor: new google.maps.Point(0, 0) // anchor
};

      var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        icon: icon
      });
      google.maps.event.addListener(marker, 'click', function() {
        // infoWindow.setContent(html);
         infoWindow.open(map,marker);
      });
  
      // google.maps.event.addListener(marker,'mouseout',()=>{
      //         infoWindow.close()
      //       });


      
      markers.push(marker);
    }
