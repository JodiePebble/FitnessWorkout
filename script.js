if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
        console.log('Service worker registered successfully');
    }).catch(function(err) {
        console.log('Service worker registration failed: ', err);
    });
}

var locations = [
      ['Staffordshire University Gym', 53.009309, -2.173533, 4],
      ['24/7 Fitness', 53.027045, -2.175443, 3],
      ['Exercise 4 Less', 53.003318, -2.186837, 2],
      ['The Gym', 53.019275, -2.181602, 1]
    ];

function initMap() {
    var map = new google.maps.Map(document.getElementById('map-container'), {
        zoom: 12,
        center: {lat: 53.0103798, lng: -2.1801833}
    });
    
    var marker, i;
        var infowindow = new google.maps.InfoWindow();

    
    marker = new google.maps.Marker({
        position: {lat: 53.0103798, lng: -2.1801833}, 
        map: map
    });

    for (i = 0; i < locations.length; i++) { 
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });
        
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent(locations[i][0]);
              infowindow.open(map, marker);
            }
        })(marker, i));
    }
};

var workoutsContainer = document.getElementById('workouts-content');
var homeWorkoutsContainer = document.getElementById('home_workouts-content');
var gymWorkoutsContainer = document.getElementById('gym_workouts-content');
var overlay = document.getElementById('overlay');
var localGetWorkouts = JSON.parse(localStorage.getItem('local_workouts'));

if(workoutsContainer){
    for(var i =0; i <= workouts.length -1; i ++){
        
        workoutsContainer.innerHTML += "<div class='mdl-shadow--2dp card'>" +
                                            "<button class='card_inner mdl-card__actions mdl-button mdl-button--colored mdl-js-button'>"+
                                                "<a class='goToWorkout' id='"+ i +"' href='workout1.html'>" +
                                                    "<image class='material-icons card-icon' src='appImages/fitness_center_black.png'></image>" +
                                                    "<div class='card-info'>" +
                                                        "<p class='card-title'>"+ workouts[i].name + "</p>" +
                                                        "<p class='card-exercise'>"+ workouts[i].exercises.length +  " execises</p>" +
                                                    "</div>" +
                                                "</a>"+
                                            "</button>"+
                                        "</div>";
    };
    if(localGetWorkouts){

        for(var j =0; j <= localGetWorkouts.length -1; j ++){
            var exercises = JSON.parse(localGetWorkouts[j].exercises);
            workoutsContainer.innerHTML += "<div class='mdl-shadow--2dp card'>" +
                                                "<button class='card_inner mdl-card__actions mdl-button mdl-button--colored mdl-js-button'>"+
                                                    "<a class='goToWorkout' id='"+ (j + workouts.length) +"' href='workout1.html'>" +
                                                        "<image class='material-icons card-icon' src='appImages/fitness_center_black.png'></image>" +
                                                        "<div class='card-info'>" +
                                                            "<p class='card-title'>"+ localGetWorkouts[j].name + "</p>" +
                                                            "<p class='card-exercise'>"+ exercises.length +  " execises</p>" +
                                                        "</div>" +
                                                    "</a>"+
                                                "</button>"+
                                            "</div>";
        };
    }
}

if(homeWorkoutsContainer){
    for(var i =0; i <= workouts.length -1; i ++){
        if(workouts[i].homeOrGym === 'home'){
            homeWorkoutsContainer.innerHTML += "<div class='mdl-shadow--2dp card'>" +
                                            "<button class='card_inner mdl-card__actions mdl-button mdl-button--colored mdl-js-button'>"+
                                                "<a class='goToWorkout' id='"+ i +"' href='workout1.html'>" +
                                                    "<image class='material-icons card-icon' src='appImages/fitness_center_black.png'></image>" +
                                                    "<div class='card-info'>" +
                                                        "<p class='card-title'>"+ workouts[i].name + "</p>" +
                                                        "<p class='card-exercise'>"+ workouts[i].exercises.length +  " execises</p>" +
                                                    "</div>" +
                                                "</a>"+
                                            "</button>"+
                                        "</div>";
            
        }
    }
}

if(gymWorkoutsContainer){
    for(var i =0; i <= workouts.length -1; i ++){
        if(workouts[i].homeOrGym === 'gym'){
             gymWorkoutsContainer.innerHTML += "<div class='mdl-shadow--2dp card'>" +
                                            "<button class='card_inner mdl-card__actions mdl-button mdl-button--colored mdl-js-button'>"+
                                                "<a class='goToWorkout' id='"+ i +"' href='workout1.html'>" +
                                                    "<image class='material-icons card-icon' src='appImages/fitness_center_black.png'></image>" +
                                                    "<div class='card-info'>" +
                                                        "<p class='card-title'>"+ workouts[i].name + "</p>" +
                                                        "<p class='card-exercise'>"+ workouts[i].exercises.length +  " execises</p>" +
                                                    "</div>" +
                                                "</a>"+
                                            "</button>"+
                                        "</div>";
        }
    }
}

var goTo = document.getElementsByClassName('goToWorkout');

for(var i =0; i <= goTo.length -1; i ++){
    goTo[i].addEventListener('click', changeView);
}

function changeView (){
    localStorage.setItem('id', this.id);
}

function changeTime() {
    document.getElementById("overlay").style.display = "flex";
}

var id = localStorage.getItem('id'),
    workoutName = document.getElementById('workout-name'),
    workoutNumExercises = document.getElementById('workout-exercises'),
    workoutExerciseList = document.getElementById('workout-exercise-list'),
    workoutBreak = document.getElementById('workout-break'),
    existingList = document.getElementById('existing_list'),
    workoutNameInput = document.getElementById('workout_name-input'),
    exerciseList = [],
    localWorkouts = [],
    newExerciseInput = document.getElementById('new_exercise'),
    exerciseListArea = document.getElementById('exercise_list'),
    timer = document.getElementById('timer-clock');

if(workoutName){
    workoutName.innerHTML = workouts[id].name;
    workoutNumExercises.innerHTML = workouts[id].exercises.length + ' exercises';
    workoutBreak.innerHTML = workouts[id].breakTime;

    for(var i =0; i <= workouts[id].exercises.length -1; i ++){
        workoutExerciseList.innerHTML += "<div class='exercise'>" +
                                            "<p>" + workouts[id].exercises[i].exerciseName +"</p>" +
                                            "<div>" +
                                                "<button class='time-button mdl-button mdl-button--colored mdl-js-button'>" + 
                                                    "<p>" + workouts[id].exercises[i].exerciseTime +"</p>" + 
                                                "</button>" +
                                                "<span> secs</span>" + 
                                            "</div>" +                                
                                        "</div>"
    }
}

if(existingList){
    if(localStorage.getItem('workout_name')){
        workoutNameInput.value = localStorage.getItem('workout_name');
    }
    
    if(localStorage.getItem('exercise_list')){
        var array = JSON.parse(localStorage.getItem('exercise_list'));
        
        for(var i = 0; i <= array.length -1; i++){
            exerciseListArea.innerHTML += "<div class='exercise'>" +
                                                "<p>"+ array[i].exerciseName +"</p>"+ 
                                                "<button class='mdl-button mdl-button--colored mdl-js-button' onclick='removeExisting("+ i +")'>" +
                                                    " <image class='material-icons' src='appImages/remove_circle_black.png'></image>"+
                                                "</button>"+
                                            " </div>"
        }
    }
    
    for(var i = 0; i <= existing_workouts.length -1; i++){
        
        var name = existing_workouts[i].exerciseName;
        existingList.innerHTML += "<div class='exercise existing'>" +
//                                        "<button on-click='displayOverlay()'>" +
                                            "<p>"+ existing_workouts[i].exerciseName +"</p>" +
                                            "<button class='mdl-button mdl-button--colored mdl-js-button' onclick='addExisting("+ i +")'>" +
                                                " <image class='material-icons' src='appImages/add_circle_black.png'></image>"+
                                            "</button>"+
//                                        "</button>" + 
                                    "</div>"
    }
}

function updateDisplay(){
    exerciseListArea.innerHTML = "";
    if(exerciseListArea){
        for(var i = 0; i <= exerciseList.length -1; i++){
            exerciseListArea.innerHTML += "<div class='exercise'>" +
                                                "<p>"+ exerciseList[i].exerciseName +"</p>"+ 
                                                "<button class='mdl-button mdl-button--colored mdl-js-button' onclick='removeExisting("+ i +")'>" +
                                                   " <image class='material-icons' src='appImages/remove_circle_black.png'></image>"+
                                                "</button>"+
                                            " </div>"
        }
    }
}

//CREATE NEW
function updateLocal(){
    localStorage.setItem('workout_name', workoutNameInput.value);
}

function displayOverlay() {
    overlay.addClass('hide-overlay');
}

function remove() {
    localStorage.clear();
    window.location.href = 'index.html';
}

function addWorkout() {
    var name = localStorage.getItem('workout_name');
    var exercises = localStorage.getItem('exercise_list');
    
    var newWorkout = {
        "name" : name,
        "exercises" : exercises,
        "breakTime" : 10,
        "homeOrGym" : "home",
    }
    
    localWorkouts.push(newWorkout);
    
    localStorage.setItem('local_workouts', JSON.stringify(localWorkouts));
    
    localStorage.removeItem('workout_name');
    localStorage.removeItem('exercise_list');
    window.location.href = 'index.html';
    
}

function removeExisting(exerciseID) {
    var exercise = document.getElementsByClassName('exercise');
    for(var i = 0; i <= exercise.length -1; i++){
        if(exerciseID === i){
            console.log(exerciseList);
//            exerciseList.splice(exerciseID, 1);
        }
    }
    localStorage.setItem('exercise_list', JSON.stringify(exerciseList));
    updateDisplay();
}

function addExisting(exerciseID){
    var exercise = document.getElementsByClassName('existing');
    
    for(var i = 0; i <= existing_workouts.length -1; i++){
        if(exerciseID === i){
            
            var newObj = {
                "exerciseName": existing_workouts[i].exerciseName,
                "exerciseTime" : 30
            };
            
            exerciseList.push(newObj);        
        }
    }
    
    localStorage.setItem('exercise_list', JSON.stringify(exerciseList));
    updateDisplay();
}

function addNew(){
    if(newExerciseInput.value != ''){
        var newObj = {
                    "exerciseName": newExerciseInput.value,
                    "exerciseTime" : 30
                };
        exerciseList.push(newObj);
        localStorage.setItem('exercise_list', JSON.stringify(exerciseList));
        updateDisplay();
    }
    newExerciseInput.value = '';
}