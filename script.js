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

function init() {
    const fetchPromise = fetch('https://handlers.education.launchcode.org/static/astronauts.json');
    fetchPromise.then(function(response) {
        const jsonPromise = response.json();
        jsonPromise.then(function(json) {
            console.log(json);
            const container = document.getElementById('container');
            for (let i = 0; i < json.length; i++) {
                container.innerHTML += `
                    <div class='astronaut'>
                        <div class='bio'>
                            <h3>${json[i].firstName + ' ' + json[i].lastName}</h3>
                            <ul>
                                <li>Hours in space: ${json[i].hoursInSpace}</li>
                                <li>Active: ${json[i].active}</li>
                                <li>Skills: ${skillsToString(json[i].skills)} </li>
                            </ul>
                        </div>
                        <img class='avatar' src='${json[i].picture}'>
                    </div>
                `;
            }
        });
    });
};

window.addEventListener('load', init);