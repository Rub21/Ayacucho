function mmg_google_docs_spreadsheet_1(id, callback) {
    if (typeof reqwest === 'undefined'){
        throw 'CSV: reqwest required for mmg_csv_url';
    }
    var url = 'https://spreadsheets.google.com/feeds/list/' +
        id + '/od6/public/values?alt=json-in-script&callback=callback';
    reqwest({
        url: url,
        type: 'jsonp',
        jsonpCallback: 'callback',
        success: response,
        error: response
    }); 
   
    function response(x) {
        var features = [],
            latfield = '',
            lonfield = '';
                
        if (!x || !x.feed) return features;

        for (var f in x.feed.entry[0]) {
            // alert("f: "+ f.toString());
            if (f.match(/\$Lat/i)){
                latfield = f;
                //alert(latfield);
            }
            if (f.match(/\$Lon/i)){
                lonfield = f;
                        //  alert(lonfield);
            }

        }


        for (var i = 0; i < x.feed.entry.length; i++) {
            // alert("x.feed.entry.length: "+ x.feed.entry.length+'  i: '+i );
                    
            var entry = x.feed.entry[i];
            var feature = {
                geometry: {
                    type: 'Point',
                    coordinates: []
                },
                properties: {
                    'marker-color':'#fff',
                    'title': entry['gsx$incidente'].$t,
                    'description': entry['gsx$descripcióndelincidente'].$t,  
                    'date': 'Fecha: ' + entry['gsx$fechadelincidente'].$t,
                    'hour': 'Hora: ' + entry['gsx$horadelincidente'].$t,
                    'marcatemporal':entry['gsx$marcatemporal'].$t,

      
                }
            };

                   // alert('entry : '+entry[i].);

            for (var y in entry) {

                if (y === latfield) feature.geometry.coordinates[1] = parseFloat(entry[y].$t);
                else if (y === lonfield) feature.geometry.coordinates[0] = parseFloat(entry[y].$t);
                    else if (y.indexOf('gsx$') === 0) {                            
                            feature.properties[y.replace('gsx$', '')] = entry[y].$t;
                        }
                    }
                    if (feature.geometry.coordinates.length == 2) features.push(feature);

                   //alert(features[0]);
                    //if(i+1 == x.feed.entry.length)
                    //{
                      _.each(feature, function(value, key) {
                           if(feature.properties['title']=="Robo"){ feature.properties['marker-color']="#33359A";} 
                           if(feature.properties['title']=="Intento de Robo") {feature.properties['marker-color']="#FF6600";}
                           if(feature.properties['title']=="Agresión") { feature.properties['marker-color']="#7D017D";}
                           if(feature.properties['title']=="Accidente") {feature.properties['marker-color']="#30980D";}   
                           if(feature.properties['title']=="Violencia Familiar") {feature.properties['marker-color']="#D3162D";}                         
                           if(feature.properties['title']=="Otros") {feature.properties['marker-color']="#FFCC00";}

          
                        });
                    //}   //alert(aContadorIncidencia['robo']);

                }

                      

               

                return callback(features);
            }


        }


/****************************************************************************************************************/

function mmg_google_docs_spreadsheet_2(id, callback) {
    if (typeof reqwest === 'undefined'){
        throw 'CSV: reqwest required for mmg_csv_url';
    }
    var url = 'https://spreadsheets.google.com/feeds/list/' +
        id + '/od7/public/values?alt=json-in-script&callback=callback';
    reqwest({
        url: url,
        type: 'jsonp',
        jsonpCallback: 'callback',
        success: response,
        error: response
    }); 
   
    function response(x) {


        var features_summary = [];
        if (!x || !x.feed) return features_summary;
           
     

        for (var i = 0; i < x.feed.entry.length; i++) {
            // alert("x.feed.entry.length: "+ x.feed.entry.length+'  i: '+i );
                    
            var entry = x.feed.entry[i];
            var feature_summary = {
                properties: {
                    
                    'tipo_incidente': entry['gsx$tipoincidente'].$t,
                    'cantidad_type': parseInt(entry['gsx$cantidadtype'].$t),  
                    'cantjanuary': parseInt(entry['gsx$cantjanuary'].$t),  
                    'cantfebruary':parseInt(entry['gsx$cantfebruary'].$t),
                    'cantmarch':parseInt(entry['gsx$cantmarch'].$t),
                    'cantapril':parseInt(entry['gsx$cantapril'].$t),
                    'canmay':parseInt(entry['gsx$canmay'].$t),
                    'cantjune':parseInt(entry['gsx$cantjune'].$t),
                    'cantjuly':parseInt(entry['gsx$cantjuly'].$t),
                    'cantaugust':parseInt(entry['gsx$cantaugust'].$t),
                    'cantseptember':parseInt(entry['gsx$cantseptember'].$t),
                    'cantoctober':parseInt(entry['gsx$cantoctober'].$t),
                    'cantnovember':parseInt(entry['gsx$cantnovember'].$t),
                    'cantdecember':parseInt(entry['gsx$cantdecember'].$t),
                   


                }
            };

            features_summary.push(feature_summary);

        }

                    return callback(features_summary);
            }


    }