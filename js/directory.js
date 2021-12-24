//Global Variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

//fetching information from the API
fetch(urlAPI)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err));

//Next, loop through each employee and add the content retrieved from the API to the page by creating a template literal.
function displayEmployees(employeeData) {
  employees = employeeData;
  let employeeHTML = '';
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    //taking the static HTML markup created in index.html, we create a template literal.
    employeeHTML += `
    <div class="card" data-index="${index}">
        <img class="avatar" src="${picture.large}" alt="${name.first} ${name.last}'s Profile Photo">
      <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
      </div>
     </div>
     `
     gridContainer.innerHTML = employeeHTML;
  });

}

  //creating a function that displays the information needed for the modal.
  function displayModal(index) {

    let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
      <div>
       <img class="avatar" src="${picture.large}" alt="${name.first} ${name.last}'s Photo">
      </div>
      <div class="text-container">

      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
      <hr />
      <p>${phone}</p>

      <p class="address">${street.number} ${street.name}.${city}, ${state} ${postcode}</p>
      <p>Birthday: ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
  `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
    modalContainer.setAttribute("data-index", index);
  }

  //Adding event listeners
  gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {

      const card = e.target.closest(".card");
      const index = card.getAttribute('data-index');
      displayModal(index);
    }
  });

  modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
  });
