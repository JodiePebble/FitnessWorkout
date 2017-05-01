if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
        console.log('Service worker registered successfully');
    }).catch(function(err) {
        console.log('Service worker registration failed: ', err);
    });
}

var workoutsContainer = document.getElementById('workouts-content');
var homeWorkoutsContainer = document.getElementById('home_workouts-content');
var gymWorkoutsContainer = document.getElementById('gym_workouts-content');
var overlay = document.getElementById('overlay');

if(workoutsContainer){
    var localGetWorkouts = JSON.parse(localStorage.getItem('local_workouts'));

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
    
    for(var i =0; i <= localGetWorkouts.length -1; i ++){
        workoutsContainer.innerHTML += "<div class='mdl-shadow--2dp card'>" +
                                            "<button class='card_inner mdl-card__actions mdl-button mdl-button--colored mdl-js-button'>"+
                                                "<a class='goToWorkout' id='"+ i +"' href='workout1.html'>" +
                                                    "<i class='material-icons card-icon'>&#xE853;</i>" +
                                                    "<div class='card-info'>" +
                                                        "<p class='card-title'>"+ localGetWorkouts[i].name + "</p>" +
                                                        "<p class='card-exercise'>"+ localGetWorkouts[i].exercises.length +  " execises</p>" +
                                                    "</div>" +
                                                    "<i class='material-icons'>&#xE147;</i>"+
                                                "</a>"+
                                            "</button>"+
                                        "</div>";
    };
}

if(homeWorkoutsContainer){
    for(var i =0; i <= workouts.length -1; i ++){
        if(workouts[i].homeOrGym === 'home'){
            console.log(workouts[i].homeOrGym);
            homeWorkoutsContainer.innerHTML += "<div class='mdl-shadow--2dp card'>" +
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
            
        }
    }
}

if(gymWorkoutsContainer){
    for(var i =0; i <= workouts.length -1; i ++){
        if(workouts[i].homeOrGym === 'gym'){
             gymWorkoutsContainer.innerHTML += "<div class='mdl-shadow--2dp card'>" +
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
                                                "<button class='mdl-button mdl-button--colored mdl-js-button'>" +
                                                    "<i class='material-icons'>&#xE15C;</i>"+
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
                                                "<i class='material-icons'>&#xE147;</i>" +
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
                                                "<button class='mdl-button mdl-button--colored mdl-js-button'>" +
                                                    "<i class='material-icons'>&#xE15C;</i>"+
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
        exercise[i].style.display = 'none';
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


//WORKOUT TIMER
//var finalTime = 0;
//function getTime(){
//    var time = 0;
//    var count = 0;
//    for(var i = 0; i <= workouts[id].exercises.length -1; i++){
//        var breaksTime = workouts[id].breakTime;
//        time = time + workouts[id].exercises[i].exerciseTime
//        count = count + 1;
//
//        
//    }
//    var breaks = count - 1;
//    var addingBreaks = breaks * breaksTime;
//    finalTime = addingBreaks + time;    
//}


//var count=10;

//var counter = setInterval(timer, 1000);

//function timer(){
//  count=count-1;
//  if (count <= 0)
//  {
//     clearInterval(counter);
//     return;
//  }
//
// timer.innerHTML= count + " secs"; // watch for spelling
//}





