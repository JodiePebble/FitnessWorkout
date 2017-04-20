if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
        console.log('Service worker registered successfully');
    }).catch(function(err) {
        console.log('Service worker registration failed: ', err);
    });
}

const workoutsContainer = document.getElementById('workouts-content');
if(workoutsContainer){
    fetch("data.JSON")
        .then(response => {
            return response.json();
        }).then(workouts => {
            const workoutsHTML = workouts.map(workout => {
                return `<div class="mdl-shadow--2dp card">
                    <button class="card_inner mdl-card__actions mdl-button mdl-button--colored mdl-js-button">
                        <a href='${workout.href}'>
                            <i class="material-icons card-icon">&#xE853;</i>
                            <div class='card-info'>
                                <p class='card-title'>Workout 1</p>
                                <p class='card-exercise'>6 execises</p>
                            </div>

                            <i class="material-icons">&#xE147;</i>
                        </a>
                    </button>
                </div>`;
            }).join("\n");
            
            const workoutsContainer = document.getElementById('workouts');
            workoutsContainer.innerHTML = workoutsHTML;
        });
}