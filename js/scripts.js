/**
 * Cassia Nebel's 
 * Project 5
 * Public API Requests
 * Displays 12 'employees' using the Random User API
 */


/**
 * Get 12 random people from the Random User API
 */
async function getUsers() {
  fetch("https://randomuser.me/api/?results=12&nat=us,au,gb")
  .then(response => response.json())
  .then(data => displayEmployees(data.results))
  .catch(error => console.log(error))
}


/**
 * Display the users/'employees' on the page
 * Take an array of people objects and create the HTML
 * to display their info on the page
 * 
 * @param {array} data 
 */
function displayEmployees(data) {
  console.log(data);
  data.map(person => {
    let html = `
                <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="${person.picture.medium}" alt="${person.name.first} ${person.name.last}'s profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                        <p class="card-text">${person.email}</p>
                        <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
                    </div>
                </div>
                `;
    document.getElementById('gallery').insertAdjacentHTML('beforeend', html);
  });
}


getUsers();