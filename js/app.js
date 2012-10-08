        var m;
        var data_url = '';
        var layers = document.getElementById('layers');
        var markers;
        var features;
    
        
       mapbox.auto('map', 'ruben.mapa_seguridadciudadana', getData) 
      
        
        var interaction = mapbox.interaction();
            interaction.map(map);
            
        // Get data
        function getData(map) {
            m = map;
            mmg_google_docs('0AhfXukqwpMbidEhMaWJESFJSS3VKeXhGWW5GZlpqQXc', mapData);
            //alert(mapData.toString());
        }
        
        // Build map
        function mapData(f){ 
            features = f;
            markers = mapbox.markers.layer().features(f);            
            mapbox.markers.interaction(markers);
            m.addLayer(markers);  
            newMarker();
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


