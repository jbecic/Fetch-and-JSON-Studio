// TODO: add code here
function skillsToString(array) {
    let str;
    for (let i = 0; i < array.length; i++) {
        if (i === 0) {
            str = array[i] + ', ';
        } else if (i + 1 === array.length) {
            str +=  array[i];
        } else {
            str += array[i] + ', ';
        }
    }

    return str;
}

function isItActive(arrayValue) {
    if (arrayValue === true) {
        return "style='color:green'";
    }
}

function init() {
    const fetchPromise = fetch('https://handlers.education.launchcode.org/static/astronauts.json');
    fetchPromise.then(function(response) {
        const jsonPromise = response.json();
        jsonPromise.then(function(json) {
            const astronauts = document.getElementById('count');
            astronauts.innerHTML = `Total Astronauts: ${json.length}`;
            const sortedJSON = json.sort((a,b) => (a.hoursInSpace > b.hoursInSpace) ? 1 : ((b.hoursInSpace > a.hoursInSpace) ? -1 : 0));
            const container = document.getElementById('container');
            for (let i = 0; i < json.length; i++) {
                container.innerHTML += `
                    <div class='astronaut'>
                        <div class='bio'>
                            <h3>${sortedJSON[i].firstName + ' ' + sortedJSON[i].lastName}</h3>
                            <ul>
                                <li>Hours in space: ${sortedJSON[i].hoursInSpace}</li>
                                <li ${isItActive(sortedJSON[i].active)}>Active: ${sortedJSON[i].active}</li>
                                <li>Skills: ${skillsToString(sortedJSON[i].skills)} </li>
                            </ul>
                        </div>
                        <img class='avatar' src='${sortedJSON[i].picture}'>
                    </div>
                `;
            }
        });
    });
};

window.addEventListener('load', init);