       $(document).ready(function(){
        var m;
        var data_url = '';
        //var layers = document.getElementById('layers');
       // var markers;
        var markerLayer;
        var features;
        var interaction;
     
        var map = mapbox.map('map');
        map.addLayer(mapbox.layer().id('ruben.mapa_seguridadciudadana'));
        mmg_google_docs('0AhfXukqwpMbidEhMaWJESFJSS3VKeXhGWW5GZlpqQXc',mapData);

        map.centerzoom({
          lat: -13.16048,
          lon: -74.22565
           }, 15);
       
      // Build map
      function mapData(f){ 
          features = f;
          markerLayer = mapbox.markers.layer().features(features);
          
          //center markers layer
          markerLayer.factory(function(m) {
                  // Create a marker using the simplestyle factory
                  var elem = mapbox.markers.simplestyle_factory(m);
                  // Add function that centers marker on click
                  MM.addEvent(elem, 'click', function(e) {
                      map.ease.location({
                        lat: m.geometry.coordinates[1],
                        lon: m.geometry.coordinates[0]
                      }).zoom(map.zoom()).optimal();
                  });

                  return elem;
              });


      interaction = mapbox.markers.interaction(markerLayer);
          map.addLayer(markerLayer);
          interaction.formatter(function(feature) {
        var o = '<h3>' + feature.properties.title + '</h3>' +
            '<strong>' + feature.properties.description + '</strong>' +
            '<p>' + feature.properties.date + '</p>' +
            '<p>' + feature.properties.day + '</p>' +
            '<p>' + feature.properties.month + '</p>' +
            '<p>' + feature.properties.year + '</p>' ;

        return o;
    });







      fmonth(features);
       $('#map').removeClass('loading');

    }

function newMarker() {
            if (window.location.hash === '#new') {
                $('#new').fadeIn('slow');
                window.location.hash = '';
                window.setTimeout(function() {
                    $('#new').fadeOut('slow');
                }, 4000)
            }
        }

function fmonth(f){
    var aMonth=[];
     _.each(f, function(value, key) {
            //alert(f[key].properties.month);
            aMonth.push(f[key].properties.month);
     });

    Array.prototype.unique=function(a){return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0});
    aMonth=aMonth.unique();
    //alert(aMonth.length);
    var monthNames = [
            'Enero',
            'Fefrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Setiembre',
            'Octubre',
            'Noviembre',
            'Diciembre'
        ];

        var parent = document.getElementById("list_months");

        for (var i = 0; i< aMonth.length; i++)
        {
        var new_li = document.createElement("li");
        new_li.innerHTML = '<a href= \'#\'  id=\'filter_'+monthNames[aMonth[i]-1] +'\' > ' + monthNames[aMonth[i]-1]+ '</a>';
        parent.appendChild(new_li);

        }



}






$('#filter-all').click(function(){



        /*food.className = '';
          this.className = 'active';*/
          markerLayer.filter(function(features) {
              // Returning true for all markers shows everything.
              return true;
          });
          return false;
      });

$('#filter_Octubre1').click(function(){


         /*all.className = '';
          this.className = 'active';*/
          // The filter function takes a GeoJSON feature object
          // and returns true to show it or false to hide it.
          markerLayer.filter(function(features) {  return features.properties['month'] === '10'; });
          return false;
});

$('#filter_Noviembre1').click(function(){


         /*all.className = '';
          this.className = 'active';*/
          // The filter function takes a GeoJSON feature object
          // and returns true to show it or false to hide it.
          markerLayer.filter(function(features) {  return features.properties['month'] === '11'; });
          return false;
});

$('#filter_Diciembre1').click(function(){


         /*all.className = '';
          this.className = 'active';*/
          // The filter function takes a GeoJSON feature object
          // and returns true to show it or false to hide it.
          markerLayer.filter(function(features) {  return features.properties['month'] === '12'; });
          return false;
});


});




