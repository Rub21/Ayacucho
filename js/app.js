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
            '<p>' + feature.properties.date + '</p>';
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
      //format date  dd/MM/yyyy from googlespretsheet
     _.each(f, function(value, key) {
      //change data formata dd/MM/yyyy to MM/dd/yyyyy
      var datearray = f[key].properties.date.split("/");
      //var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2]; //atearray[1]=month
      aMonth.push(datearray[1]);
      //alert(datearray[1]);
     });

//elimina elementos duplicados del array
    Array.prototype.unique=function(a){
      return function(){
        return this.filter(a)}}(function(a,b,c){
          return c.indexOf(a,b+1)<0
          });

    aMonth=aMonth.unique();
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






$('#list_months').on('click', 'li', function(e) {


switch(e.target.id ){
case "filter-all":
            /*food.className = '';
          this.className = 'active';*/
          markerLayer.filter(function(features) {
              // Returning true for all markers shows everything.
              return true;
          });
          return false;
     
break;
case "filter_Octubre":
      markerLayer.filter(function(features) {  var arraydate = features.properties['date'].split("/");
                                              return arraydate[1]=== '10';
                                            });
      return false;
break;
case "filter_Noviembre":
      markerLayer.filter(function(features) {  var arraydate = features.properties['date'].split("/");
                                               return arraydate[1]=== '11';
                                             });
      return false;
      
break;
case "filter_Diciembre":
      markerLayer.filter(function(features) {  var arraydate = features.properties['date'].split("/");
                                               return arraydate[1]=== '12';
                                            });
      return false;
break;
}

});



});




