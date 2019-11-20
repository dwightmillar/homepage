var nameArray = [];
var descriptionArray = [];
var imageArray = [];
var employees = [];
var imagesFolder = '';


window.onload = getNames;


function getNames() {
  $.get("https://techi.envivent.com/names.json", (data, status) => {
    nameArray = data.employees;
    if (status !== 'success') alert('Failed to fetch names');
    getDescriptions();
  })
}

function getDescriptions() {
  $.get("https://techi.envivent.com/description.json", (data, status) => {
    descriptionArray = data.employees;
    if (status !== 'success') alert('Failed to fetch descriptions');
    getImages();
  })
}

function getImages() {
  $.get("https://techi.envivent.com/images.json", (data, status) => {
    imageArray = data.employees;
    imagesFolder = data["images-folder"];
    if (status !== 'success') alert('Failed to fetch images');
    mergeData();
  })
}

function mergeData() {
  for (let employeeIndex in nameArray) {
    let descriptionArrayIndex = descriptionArray.findIndex( (element) => element.id === nameArray[employeeIndex].id );
    let imageArrayIndex = imageArray.findIndex( (element) => element.id === nameArray[employeeIndex].id );

    employees.push({...nameArray[employeeIndex], ...descriptionArray[descriptionArrayIndex], ...imageArray[imageArrayIndex]});
  }
  createProfiles();
}

function createProfiles() {

  for(let profileIndex = 0; profileIndex < 3; profileIndex++) {
    let employeeIndex = Math.floor((Math.random() * employees.length));
    $(".container").append(`<div class='profile'>
                              <img src='${imagesFolder}${employees[employeeIndex].full}' alt='employee'>
                              <div class='text-container'>
                                <h1>${employees[employeeIndex].first_name} ${employees[employeeIndex].last_name}</h1>
                                <h3>${employees[employeeIndex].title}</h3>
                                <p>${employees[employeeIndex].description}</p>
                              </div>
                            </div>`)
    employees.splice(employeeIndex, 1);
  }
}
