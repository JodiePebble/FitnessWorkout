document.getElementById('map-container').style.display = 'none';
document.getElementById('offline-map-container').style.display = 'block';

var offlineMapContainer = document.getElementById('offline-map-container');

if(offlineMapContainer){
    for(var i =0; i <= gyms.length -1; i ++){

//         offlineMapContainer.innerHTML += "<div>" +
//                                        "<div class='card-info'>" +
//                                            "<p class='gym-name'>"+ gyms[i].name + "</p>" +
//                                            "<p class='gym-address'>"+ gyms[i].address +  "</p>" +
//                                            "<p class='gym-opening'>"+ gyms[i].openingTimes +  "</p>" +
//                                        "</div>" +
//                                    "</div>";
    }
}
