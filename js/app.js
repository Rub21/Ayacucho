//var m;
var data_id = 'xxxxxxxxxxxxxx';
var map_id='xxxxxxxxxxxxxxx';
var markerLayer;
var features;
var features_summary;
var interaction;
var map = mapbox.map('map');
var a_tipo_incidente=[]; //array para tipo de incidente
var a_cantidad_type=[]; //array para cantidad por tipo
var a_cantjanuary=[];
var a_cantfebruary=[];
var a_cantmarch=[];
var a_cantapril=[];
var a_canmay=[];
var a_cantjune=[];
var a_cantjuly=[];
var a_cantaugust=[];
var a_cantseptember=[];
var a_cantoctober=[];
var a_cantnovember=[];
var a_cantdecember=[];
var monthNames = [
    'Enero',
    'Febrero',
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


map.addLayer(mapbox.layer().id(map_id));
mmg_google_docs_spreadsheet_1(data_id, mapData );
map.centerzoom({  lat: -13.16048,  lon: -74.22565}, 15);
map.setZoomRange(13, 17);

// Build map
function mapData(f) { 
    features = f;
    markerLayer = mapbox.markers.layer().features(features);
    //center markers layer
    markerLayer.factory(function (m) {
        // Create a marker using the simplestyle factory
        var elem = mapbox.markers.simplestyle_factory(m);
        // Add function that centers marker on click
        MM.addEvent(elem, 'click', function (e) {
            map.ease.location({
                lat: m.geometry.coordinates[1],
                lon: m.geometry.coordinates[0]
            }).zoom(map.zoom()).optimal();
        });
            return elem;
    });

    interaction = mapbox.markers.interaction(markerLayer);
    map.addLayer(markerLayer);
     map.ui.zoomer.add();
    map.ui.zoombox.add();

    interaction.formatter(function (feature) {
        var o = '<h3>' + feature.properties.title + '</h3>' +
        '<p>' + feature.properties.description + '</p>' +
        '<p><strong> Fecha :</strong> ' + feature.properties.date.replace('Fecha: ',"") + ' '+ feature.properties.hour.replace('Hora: ',"")+'</p>' ;
        return o;
    });

    fmonth(features);
    //complete the table with data
    createtable(f);
    //out url for download  data
    download_data();
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

function fmonth(f) {
    //array aMonth for take moths from JSON
    var aMonth = [];
    // array de que se genera de la fecha
    var aDate; 

    var parent = document.getElementById("ul_menu_month");
     
    //elimina elementos duplicados en un array 
    Array.prototype.unique=function(a) {
        return function(){
            return this.filter(a);
        }
    }   (function (a,b,c) {
            return c.indexOf(a,b+1)<0;
        });

    Array.prototype.sortNum = function () {
        return this.sort(function (a, b) { 
            return a - b; 
        });
} 

    //formato de fecha en  googlespretsheet  dd/MM/yyyy 
    _.each(f, function (value, key) {
        aDate = f[key].properties.date.split("/");
        aMonth.push(aDate[1]);//agrega el mes en el array Mes =aMonth
    });
    
        aMonth=aMonth.unique();//elimina los datos duplicados en el aMonth
        aMonth= aMonth.sortNum();//ordena de menor a Mayor
      
        for (var i = 0; i< aMonth.length; i++) {
            var new_li = document.createElement("li");
            new_li.innerHTML = '<a href= \'#\'  id=\''+aMonth[i]+'\' > ' + 
                                monthNames[aMonth[i]-1]+ '</a>';
            parent.appendChild(new_li);

        }
}


//Optener Datos para cuadros estadisticos
mmg_google_docs_spreadsheet_2(data_id, statisticData );



function statisticData(f){
    features_summary=f;

      _.each(f, function (value, key) {
        a_tipo_incidente.push(f[key].properties.tipo_incidente);
        a_cantidad_type.push(f[key].properties.cantidad_type);
        a_cantjanuary.push(f[key].properties.cantjanuary);
        a_cantfebruary.push(f[key].properties.cantfebruary);
        a_cantmarch.push(f[key].properties.cantmarch);
        a_cantapril.push(f[key].properties.cantapril);
        a_canmay.push(f[key].properties.canmay);
        a_cantjune.push(f[key].properties.cantjune);
        a_cantjuly.push(f[key].properties.cantjuly);
        a_cantaugust.push(f[key].properties.cantseptember);
        a_cantseptember.push(f[key].properties.cantmarch);
        a_cantoctober.push(f[key].properties.cantoctober);
        a_cantnovember.push(f[key].properties.cantnovember);
        a_cantdecember.push(f[key].properties.cantdecember);

});


}

    google.load("visualization", "1", {packages:["corechart"]});
     google.setOnLoadCallback(drawChart);

  //visualizacion de estadisticas total

   function drawChart() {

       // alert( a_cantidad_type[0]);

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Incidencias');
        data.addColumn('number', 'Porcentaje');
        data.addRows([[a_tipo_incidente[0], parseInt(a_cantidad_type[0],10)],
          [a_tipo_incidente[1], parseInt(a_cantidad_type[1],10)],
          [a_tipo_incidente[2], parseInt(a_cantidad_type[2],10)],
          [a_tipo_incidente[3], parseInt(a_cantidad_type[3],10)],
          [a_tipo_incidente[4], parseInt(a_cantidad_type[4],10)],
          [a_tipo_incidente[5], parseInt(a_cantidad_type[5],10)]
          ]);
        var options = {
            
            backgroundColor: 'transparent',
            titleTextStyle:  {color: "#000",  fontSize:40},                                       
            colors:['#0000FE','#30980D','#FE7E01','#7D017D','#FDFD00','#FE0002']
            };
        var chart = new google.visualization.PieChart(document.getElementById('img_total_percentage'));
        chart.draw(data, options);

        $('#num-incident').html('Total : '+a_cantidad_type[6]);
        
        $('#block_statistic').removeClass('loading');
    }




 function drawChart_incedent_all() {
       
       
       
        var data = google.visualization.arrayToDataTable([]);
                    data.addColumn('string', 'Mes');
        data.addColumn('number', 'Total');
        data.addRows([
          ['Enero', a_cantjanuary[6]],
          ['Febrero', a_cantfebruary[6]],
          ['Marzo', a_cantmarch[6]],
          ['Abril',a_cantapril[6]],
          ['Mayo',a_canmay[6]],
          ['Junio',a_cantjune[6]],
          ['Julio',a_cantjuly[6]],
          ['Agosto',a_cantaugust[6]],
          ['Septiembre',a_cantseptember[6]],
          ['Octubre',a_cantoctober[6]],
          ['Noviembre',a_cantnovember[6]]

 
        ]);
        

        var options = {
          title: 'Grafico de lineas de total de Incidencias',
          hAxis: {title: 'Meses',   titleTextStyle: {color: 'red'}  ,gridlines:{color: '#333', count: 4}, textStyle:{color: '#333' , fontSize: 11}},
          backgroundColor: 'transparent'
         
        };

        var chart = new google.visualization.LineChart(document.getElementById("all-incident_statistic"));
        chart.draw(data, options);
      }
























   
      function drawChart_type_incedent(id_x,i) {
         //alert(i);
       // alert(a_cantjanuary.join()+'/ '+a_cantfebruary.join()+'/'+a_cantmarch.join());
       
        var data = google.visualization.arrayToDataTable([]);
                    data.addColumn('string', 'Mes');
        data.addColumn('number', 'Cantidad');
        data.addRows([
          ['Enero', a_cantjanuary[i]],
          ['Febrero', a_cantfebruary[i]],
          ['Marzo', a_cantmarch[i]],
          ['Abril',a_cantapril[i]],
          ['Mayo',a_canmay[i]],
          ['Junio',a_cantjune[i]],
          ['Julio',a_cantjuly[i]],
          ['Agosto',a_cantaugust[i]],
          ['Septiembre',a_cantseptember[i]],
          ['Octubre',a_cantoctober[i]],
          ['Noviembre',a_cantnovember[i]]

 
        ]);
        

        var options = {
          title: 'Grafico de lineas de tipo de incidencia '+id_x.replace('_statistic',"").replace('_'," ").replace('_'," "),
          hAxis: {title: 'Meses',   titleTextStyle: {color: 'red'}  ,gridlines:{color: '#333', count: 4}, textStyle:{color: '#333' , fontSize: 11}},
          backgroundColor: 'transparent'
         
        };

        //$('#id_close' ).show(200);
        var chart = new google.visualization.LineChart(document.getElementById(id_x));
        chart.draw(data, options);
      }





    function createtable (f){
        // create table
        var $table = $('<table>');
        //id
        $table.attr("id","dataTable")
        // caption
        $table.append('<caption>ULTIMAS INCIDENCIAS REGISTRADAS</caption>')
        // thead
        $table.append('<thead>').children('thead')
        .append('<tr />').children('tr').append('<th>TIPO DE INCIDENCIA</th><th>FECHA DEL INCIDENTE</th><th>HORA DEL INCIDENTE</th><th>FECHA DE REGISTRO</th>');

        //tbody
        var $tbody = $table.append('<tbody />').children('tbody');

        // add row

//_.each(f, function (value, key) {
        for (var i = f.length - 1; i >= f.length - 8; i--) {
                  
            $tbody.append('<tr/>').children('tr:last')
            .append('<td><a id=\''+f[i].properties.marcatemporal.replace(/\s/g,"_")+ '\' href=\'#\'>'+ f[i].properties.title+"</a></td>")
            .append("<td>"+f[i].properties.date.replace('Fecha: ',"")+"</td>")
            .append("<td>"+f[i].properties.hour.replace('Hora: ',"")+"</td>")
            .append("<td>"+f[i].properties.marcatemporal+"</td>");
        }
 
   // });



    // add table to dom
    $table.appendTo('#dynamicTable');


    }


    function download_data(){
        $('#download_csv').attr('href','https://docs.google.com/a/developmentseed.org/spreadsheet/pub?key='+data_id+'&output=csv');
        $('#download_josn').attr('href','https://spreadsheets.google.com/feeds/list/'+data_id+'/od6/public/values?alt=json-in-script');
    }












// Document already
$(document).on('ready',function () {

    // take event click on menu month
    $('#ul_menu_month').on('click', 'li', function (e) { 

        //centralizing the map
        map.ease.location({ lat: -13.16039, lon: -74.22574}).zoom(15).optimal();

        if(e.target.id == "filter-all"){
            $('#ul_menu_month li a').removeClass('active');
            $('#'+e.target.id).addClass('active');

            markerLayer.filter(function (features) {
                    // Returning true for all markers shows everything.
                    return true;
            });

                return false;

        } else{


            if($('#ul_menu_type_incident .active').attr('id')=="all-incident"){
                $('#ul_menu_month li a').removeClass('active');
                $('#'+e.target.id).addClass('active');
                markerLayer.filter(function (features) { 
                var arraydate = features.properties['date'].split("/");
                if(arraydate[1]=== e.target.id)
                    return true;                    
                });

            }else{
                $('#ul_menu_month li a').removeClass('active');
                $('#'+e.target.id).addClass('active');
                markerLayer.filter(function (features) { 
                    var arraydate = features.properties['date'].split("/");
                    //doble condicional.. tipo de incidnete y fecha
                    if(arraydate[1]=== e.target.id && features.properties.title.replace(/\s/g,"_")=== $('#ul_menu_type_incident .active').attr('id'))
                        return true;                    
                });
            }
                return false;         
        }
    });
     



    $('#arrow_show_block a').on('click',function (e) {

        $('.statistic_by_month').css('display','block');
        $('#id_close').show(200);
        $('#arrow_show_block').css('display','none'); 

            //check if active for show  box static all incident
            if($('#ul_menu_type_incident .active').attr('id')=='all-incident')
            {
                drawChart_incedent_all();
                google.setOnLoadCallback(drawChart_incedent_all);
            }
           else{

            var id_active_type=$('#ul_menu_type_incident .active').attr('id');
            var name_active_tipe=$('#ul_menu_type_incident .active').attr('name')-1;
            //agrega una id para mostrar la imagen                
            drawChart_type_incedent(id_active_type+'_statistic',name_active_tipe);
            google.setOnLoadCallback(drawChart_type_incedent);
     

           }

    });

    $('#id_close').click(function(){
    $(this).hide(200);
    $('.statistic_by_month').css('display','none');
    $('#arrow_show_block').css('display','block');
    });







    // take event click on menu type incident
    $('#ul_menu_type_incident li').click(function(e){
        
        var id_event=e.target.id;
     
       // alert(id_event);

        //centralizing the map
        map.ease.location({ lat: -13.16039, lon: -74.22574}).zoom(15).optimal();

        if(id_event == "all-incident") {


            $('#ul_menu_type_incident li a').removeClass('active');
            $('#'+id_event).addClass('active');

            //verifica para habilitar bloque donde mostrar las estadisticas por mes
           if($('.statistic_by_month').css('display')=='block')
           {

            $('.statistic_by_month').attr('id','all-incident_statistic');
                //draw the graphics satatistic
               // alert("all incedent");
                drawChart_incedent_all();
                google.setOnLoadCallback(drawChart_incedent_all);
         }        

            markerLayer.filter(function (features) {
                // Returning true for all markers shows everything.
                return true;
            });
                return false;

        } else{

            //fitro con doble condicion
            if($('#ul_menu_month .active').attr('id')=="filter-all"){

                $('#ul_menu_type_incident li a').removeClass('active');
                $('#'+id_event).addClass('active');

                markerLayer.filter(function (features) {
                    //replaza los espacion en blanco con subguion y compara con el ID                
                    if(features.properties['title'].replace(/\s/g,"_")=== id_event)
                    return true;                    
                });  


            }else{

                $('#ul_menu_type_incident li a').removeClass('active');
                $('#'+id_event).addClass('active');

                markerLayer.filter(function (features) {
                    var arraydate = features.properties['date'].split("/");
                    //replaza los espacion en blanco con subguion y compara con el ID
                    if(features.properties['title'].replace(/\s/g,"_")=== id_event && arraydate[1]=== $('#ul_menu_month .active').attr('id'))
                    return true;                    
                });


            }

             //verifica para habilitar bloque donde mostrar las estadisticas por mes
            if($('#arrow_show_block').css('display')=='none')
            {
                $('.statistic_by_month').css('display' , 'block');
                   //hide box  close in statistic
                $("#id_close").show(200);
            } 
            else
            {
                $('.statistic_by_month').css('display' , 'none');
                 $("#id_close").hide(200);
            }

                //manda paarmetros de valor para los cuadro etadisticos
                //$('.statistic_by_month').html("Estadisticas por mes de "+e.target.id);
                
            
            $('.statistic_by_month').attr('id',id_event+'_statistic');//agrega una id para mostrar la imagen
             var number_name =$('#'+id_event).attr('name')-1;//obtiene el atributo de name
            drawChart_type_incedent(id_event+'_statistic',number_name);
            google.setOnLoadCallback(drawChart_type_incedent);

            return false;         
        }
    });




      $("#dataTable a").on("click", function(e){

     var id_variable=$(this).attr('id');// id_variable take id from 'a' tag
     var lat_inc, lon_inc;//varrible lat_inc and lon_inc for get a latitud an longitud for ease.location

//alert(id_variable);
       markerLayer.filter(function (features) {  
            

            if(features.properties.marcatemporal.replace(/\s/g,"_")=== id_variable)//replaza los espacion en blanco con subguion y compara con el ID
            {
                //alert(features.properties.marcatemporal.replace(/\s/g,"_"));
                lat_inc=features.geometry.coordinates[1];//take latitud
                lon_inc=features.geometry.coordinates[0];//take longitud
                map.ease.location({ lat: lat_inc, lon: lon_inc}).zoom(17).optimal();
                return true; 
            }

            

        });  
      
        return false;   
    });







});



