function mmg_google_docs(id, callback) {
            if (typeof reqwest === 'undefined') 
            {
                throw 'CSV: reqwest required for mmg_csv_url';
            }


            var url = 'https://spreadsheets.google.com/feeds/list/' + id + '/od6/public/values?alt=json-in-script&callback=callback';

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
                    if (f.match(/\$Lat/i)) 
                        {latfield = f;
                        //alert(latfield);
                        }
                    if (f.match(/\$Lon/i)) 
                        {lonfield = f;
                        //  alert(lonfield);
                        }



                }


                for (var i = 0; i < x.feed.entry.length; i++) {
                    //alert("x.feed.entry.length"+ x.feed.entry.length );

                    var entry = x.feed.entry[i];
                    var feature = {
                        geometry: {
                            type: 'Point',
                            coordinates: []
                                    },
                        properties: {
                            'marker-color':'#F03D25',
                            'title': 'Delito: ' + entry['gsx$delito'].$t,
                            'description': 'Descripcion: ' + entry['gsx$descricióndeldelito'].$t,  
                            'date': 'Fecha: ' + entry['gsx$fecha'].$t,
                            //'day': 'Dia: ' + entry['gsx$day'].$t,
                           // 'month': 'Mes: ' + entry['gsx$month'].$t, 
                            //'year': 'Año: ' + entry['gsx$year'].$t,                        
                           

                                 }
                    };
                    for (var y in entry) {

                        if (y === latfield) feature.geometry.coordinates[1] = parseFloat(entry[y].$t);
                        else if (y === lonfield) feature.geometry.coordinates[0] = parseFloat(entry[y].$t);

                        else if (y.indexOf('gsx$') === 0) {
                            
                            feature.properties[y.replace('gsx$', '')] = entry[y].$t;
                        }
                    }
                    if (feature.geometry.coordinates.length == 2) features.push(feature);


                    //alert(features[0]);

                }
              //  alert(features[1].properties.title);
               // alert(features[1].properties.date);
               

                return callback(features);
            }



        }