if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
        console.log('Service worker registered successfully');
    }).catch(function(err) {
        console.log('Service worker registration failed: ', err);
    });
}

var workoutsContainer = document.getElementById('workouts-content');

for(var i =0; i <= workouts.length -1; i ++){
    workoutsContainer.innerHTML += "<div class='mdl-shadow--2dp card'>" +
                    "<button class='card_inner mdl-card__actions mdl-button mdl-button--colored mdl-js-button'>"+
                        "<a class='goToWorkout' id='"+ i +"' href='pages/workout1.html'>" +
                            "<i class='material-icons card-icon'>&#xE853;</i>" +
                            "<div class='card-info'>" +
                                "<p class='card-title'>"+ workouts[i].name + "</p>" +
                                "<p class='card-exercise'>6 execises</p>" +
                            "</div>" +
                            "<i class='material-icons'>&#xE147;</i>"+
                        "</a>"+
                    "</button>"+
                "</div>";
    };

var goTo = document.getElementsByClassName('goToWorkout');

for(var i =0; i <= goTo.length -1; i ++){
    goTo[i].addEventListener('click', changeView);
}

function changeView (){
    localStorage.setItem('id', this.id);
}




//
//if(workoutsContainer){
//    fetch("data.JSON")
//        .then(response => {
//            return response.json();
//        }).then(workouts => {
//            const workoutsHTML = workouts.map(workout => {
//                return `<div class="mdl-shadow--2dp card">
//                    <button class="card_inner mdl-card__actions mdl-button mdl-button--colored mdl-js-button">
//                        <a href=${workout.href}>
//                            <i class="material-icons card-icon">&#xE853;</i>
//                            <div class='card-info'>
//                                <p class='card-title'>${workout.name}</p>
//                                <p class='card-exercise'>${workout.exercises.length} exercises</p>
//                            </div>
//
//                            <i class="material-icons">&#xE147;</i>
//                        </a>
//                    </button>
//                </div>`;
//            }).join("\n");
//            
//            const workoutsContainer = document.getElementById('workouts-content');
//            workoutsContainer.innerHTML = workoutsHTML;
//        });
//}