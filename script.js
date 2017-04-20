if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
        console.log('Service worker registered successfully');
    }).catch(function(err) {
        console.log('Service worker registration failed: ', err);
    });
}

var workoutsContainer = document.getElementById('workouts-content');
if(workoutsContainer){

    for(var i =0; i <= workouts.length -1; i ++){
        workoutsContainer.innerHTML += "<div class='mdl-shadow--2dp card'>" +
                        "<button class='card_inner mdl-card__actions mdl-button mdl-button--colored mdl-js-button'>"+
                            "<a class='goToWorkout' id='"+ i +"' href='workout1.html'>" +
                                "<i class='material-icons card-icon'>&#xE853;</i>" +
                                "<div class='card-info'>" +
                                    "<p class='card-title'>"+ workouts[i].name + "</p>" +
                                    "<p class='card-exercise'>"+ workouts[i].exercises.length +  " execises</p>" +
                                "</div>" +
                                "<i class='material-icons'>&#xE147;</i>"+
                            "</a>"+
                        "</button>"+
                    "</div>";
        };
}

var goTo = document.getElementsByClassName('goToWorkout');

for(var i =0; i <= goTo.length -1; i ++){
    goTo[i].addEventListener('click', changeView);
}

function changeView (){
    localStorage.setItem('id', this.id);
}

var id = localStorage.getItem('id');
var workoutName = document.getElementById('workout-name');
var workoutNumExercises = document.getElementById('workout-exercises');
var workoutExerciseList = document.getElementById('workout-exercise-list');

workoutName.innerHTML = workouts[id].name;
workoutNumExercises.innerHTML = workouts[id].exercises.length + ' exercises';

for(var i =0; i <= workouts[id].exercises.length -1; i ++){
    workoutExerciseList.innerHTML += "<div class='exercise'>" +
                                "<p>" + workouts[id].exercises[i].exerciseName +"</p>" +
                                "<div>" +
                                    "<button class='time-button mdl-button mdl-button--colored mdl-js-button'>" + 
                                        "<p>" + workouts[id].exercises[i].exerciseTime +"</p>" + 
                                    "</button>" +
                                    "<span>secs</span>" + 
                                "</div>" + 
                            "</div>"
}


