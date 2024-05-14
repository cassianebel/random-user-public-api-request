/**
 * Cassia Nebel's 
 * Project 5
 * Public API Requests
 * Displays 12 'employees' using the Random User API
 */
const gallery = document.getElementById('gallery');
let employees = [];

/**
 * Get 12 random people from the Random User API
 */
async function getUsers() {
  const response = await fetch("https://randomuser.me/api/?results=12&nat=us,au,gb")
  const data = await response.json();
  employees = data.results;
  displayEmployees(data.results);
}

getUsers();

/**
 * Display the users/'employees' on the page
 * Take an array of people objects and create the HTML
 * to display their info on the page
 * 
 * @param {array} data - an array of people objects
 */
function displayEmployees(data) {
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
    gallery.insertAdjacentHTML('beforeend', html);
  });
}


/**
 * Gallery event listener
 * opens a modal with more info for the 
 * card/employee/person that was clicked
 */
gallery.addEventListener('click', (event) => {
  const personCard = event.target.closest('.card');
  if (!personCard) return;
  const personName = personCard.querySelector('.card-name').textContent;
  console.log(personName);
  const person = employees.find(
    (person) => `${person.name.first} ${person.name.last}` === personName
  );
  displayModal(person);
});


/**
 * Displays a modal with content dynamically generated
 * using the data from a specific result (person) in the 
 * employees array
 * 
 * @param {object} person - a single object from the employees array
 */
function displayModal(person) {
  let html = `
    <div class="modal-container">
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="${person.picture.large}" alt="${person.name.first} ${person.name.last}'s profile picture">
              <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
              <p class="modal-text">${person.email}</p>
              <p class="modal-text cap">${person.location.city}</p>
              <hr>
              <p class="modal-text">${person.phone}</p>
              <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
              <p class="modal-text">Birthday: ${new Date(person.dob.date).toLocaleDateString(undefined, {month: 'numeric', day: 'numeric', year: 'numeric'})}</p>
          </div>
      </div>

      <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
    </div>
  `;
  gallery.insertAdjacentHTML('afterend', html);

  /**
   * Modal Close button event listener
   */
  document.getElementById('modal-close-btn').addEventListener('click', () => {
    document.querySelector('.modal-container').remove();
  });

  /**
   * Modal Next button event listener
   */
  document.getElementById('modal-next').addEventListener('click', (event) => {
    const personName = document.querySelector('.modal-name').textContent;
    const currentPerson = employees.find(
      (person) => `${person.name.first} ${person.name.last}` === personName
    );
    const index = employees.indexOf(currentPerson);
    console.log(index);
    if (index + 1 < employees.length) {
      updateModal(employees[index + 1]);
    } else {
      event.target.disable = true;
    }
  });

  /**
   * ModalPrevious button event listener
   */
    document.getElementById('modal-prev').addEventListener('click', (event) => {
      const personName = document.querySelector('.modal-name').textContent;
      const currentPerson = employees.find(
        (person) => `${person.name.first} ${person.name.last}` === personName
      );
      const index = employees.indexOf(currentPerson);
      if (index - 1 >= 0 ) {
        updateModal(employees[index - 1]);
      } else {
        event.target.disable = true;
      }
    });
}


function updateModal(person) {
  document.querySelector('.modal-info-container').innerHTML = `
    <img class="modal-img" src="${person.picture.large}" alt="${person.name.first} ${person.name.last}'s profile picture">
    <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
    <p class="modal-text">${person.email}</p>
    <p class="modal-text cap">${person.location.city}</p>
    <hr>
    <p class="modal-text">${person.phone}</p>
    <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
    <p class="modal-text">Birthday: ${new Date(person.dob.date).toLocaleDateString(undefined, {month: 'numeric', day: 'numeric', year: 'numeric'})}</p>
  `;
}


/**
 * Add search form to the page
 */
document.querySelector('.search-container').innerHTML = `
  <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>
`;


/**
 * Listen for key strokes on search form input
 */
document.getElementById('search-input').addEventListener('keyup', (event) => {
  let value = event.target.value.toLowerCase();
  let cardNames = document.querySelectorAll('.card-name');
  cardNames.forEach(cardName => {
    if (cardName.textContent.toLocaleLowerCase().includes(value)) {
      cardName.parentNode.parentNode.style.display = 'block';
    } else {
      cardName.parentNode.parentNode.style.display = 'none';
    }
  })
});




