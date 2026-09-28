// LOAD CATEGORY BUTTON

const loadAllCategory = async () => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await res.json();
  displayAllCategory(data.categories);
};

// DISPLAY CATEGORY BUTTON

const displayAllCategory = (categories) => {
  const categoryContainer = document.querySelector("#button-div");
  categories.forEach((element) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `<button id="btn-${element.category}" onclick="loadCategoryPets('${element.category}')" class="btn  w-[150px] h-[90px] border p-2 flex items-center justify-center space-x-2 category-btn"><img
              src=${element.category_icon} class="w-6 h-6 sm:w-10 sm:h-10"
            />   ${element.category}</button>  `;

    categoryContainer.appendChild(buttonContainer);
  });
};

// LOAD ALL PETS CARD

const loadAllPets = async () => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/peddy/pets`
  );
  const data = await res.json();
  displayAllPets(data.pets);
};

// DISPLAY ALL PETS CARDS

const displayAllPets = (pets) => {
  const cardContainer = document.querySelector("#card-container");
  cardContainer.innerHTML = "";

  if (pets.length == 0) {
    cardContainer.classList.remove("flex");
    cardContainer.innerHTML = `
    
    <div class=" min-h-[400px] flex justify-center items-center"> <img src="./assets/error.webp" alt=""> <h1 class="font-extrabold text-3xl">NO PETS AVAILABLE</h1></div>
    `;
    return;
  } else {
    cardContainer.classList.add("flex");
  }

  pets.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card card-compact bg-base-100 w-80 border p-5 ">
          <figure class="h-[200px]">
            <img
              src=${element.image}
              class="h-full w-full object-cover"
            />
          </figure>
          <div class="card-body">
            <h2 class="Pet-name text-xl font-bold">${
              element.pet_name || "Not known"
            }</h2>
            <p class="text-gray-500">
              <span><i class="fa-solid fa-dog text-[#0E7A81]"></i></span>Breed:${
                element.breed || "Breed is unknown"
              }
            </p>

            <p class="text-gray-500">
              <i class="fa-solid fa-cake-candles text-[#0E7A81]"></i>Birth:${
                element.date_of_birth || "N/A"
              }
            </p>
            <p class="text-gray-500">
              <i class="fa-solid fa-venus-mars text-[#0E7A81]"></i>Gender:${
                element.gender || "undefined"
              }
            </p>
            <p class="text-gray-500">
              <i class="fa-solid fa-dollar-sign text-[#0E7A81]"></i>Price :${
                element.price || "Not Available"
              }
            </p>
            <hr />
            <div class="card-actions">
              <button onclick="likeImg('${
                element.image
              }')" class="btn p-[18px] border text-[#0E7A81]">
              <i class="fa-solid fa-thumbs-up"></i>
              </button>

              <button onclick="adoptPet(this)" class="btn p-[10px] border text-[#0E7A81]">Adopt</button>
              <button onclick="loadPetDetails('${
                element.petId
              }')" class="btn text-white bg-[#0E7A81]">Details</button>
            </div>
          </div>
        </div>
    `;
    cardContainer.appendChild(div);
  });
};

// LOAD PETS CARD ACCORDING TO THE CATEGORY

const loadCategoryPets = async (categoryName) => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  );
  const data = await res.json();
  displayAllPets(data.data);
  removeActiveClass();
  const activeBtn = document.getElementById(`btn-${categoryName}`);
  activeBtn.classList.add("active");
};

// LOAD PET DETAILS IN MODEL

const loadPetDetails = async (pet_id) => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/peddy/pet/${pet_id}`
  );
  const data = await res.json();
  DisplayPetDetails(data.petData);
};

// SHOW PET DETAILS IN MODEL
const DisplayPetDetails = (element) => {
  console.log(element);
  const detailContainer = document.querySelector("#modal-Content");
  detailContainer.innerHTML = `
  <div class="p-4 sm:p-6">
  <div class="w-full rounded-md">
    <img class="w-[700px] h-[200px] object-center rounded-md" src="${element.image}" />
  </div>

  <div class="space-y-2 mt-4 sm:mt-6">
    <h2 class="Pet-name text-lg sm:text-xl font-extrabold">${element.pet_name}</h2>
    
    <p class="text-gray-500 text-sm sm:text-base">
      <span><i class="fa-solid fa-dog text-[#0E7A81]"></i></span> 
      Breed: ${element.breed}
    </p>
    
    <p class="text-gray-500 text-sm sm:text-base">
      <i class="fa-solid fa-venus-mars text-[#0E7A81]"></i> 
      Gender: ${element.gender}
    </p>
    
    <p class="text-gray-500 text-sm sm:text-base">
      <i class="fa-solid fa-cake-candles text-[#0E7A81]"></i> 
      Birth: ${element.date_of_birth}
    </p>
    
    <p class="text-gray-500 text-sm sm:text-base">
      <i class="fa-solid fa-dollar-sign text-[#0E7A81]"></i> 
      Price: ${element.price}
    </p>
    
    <p class="text-gray-500 text-sm sm:text-base">
      <i class="fa-solid fa-shield-dog text-[#0E7A81]"></i> 
      Vaccinated Status: ${element.vaccinated_status}
    </p>

    <hr class="my-4" />

    <h1 class="font-extrabold text-lg sm:text-xl">Detailed Information</h1>
    
    <p class="text-gray-500 text-sm sm:text-base">${element.pet_details}</p>
  </div>
</div>

            
  `;

  document.getElementById("showModalData").click();
};

// SIDE IMAGE CONTAINER
const likeImg = (image) => {
  console.log(image);
  const imgContainer = document.querySelector("#img-container");
  const div = document.createElement("div");
  div.innerHTML = `<img
             class="w-[500px] h-[200px] border object-fit  rounded-md" src=${image}
            />`;
  imgContainer.appendChild(div);
};

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

// SORT BY PRICE BUTTON FUNCTIONALITY

const sortPetsByPrice = (pets) => {
  return pets.sort((a, b) => b.price - a.price);
};
document.getElementById("sortButton").addEventListener("click", async () => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/peddy/pets`
  );
  const data = await res.json();

  const sortedPets = sortPetsByPrice(data.pets);
  displayAllPets(sortedPets);
});

// ADOPT BUTTON FUNCTION

const adoptPet = (btn) => {
  const adoptModal = document.querySelector("#adoptModal");
  adoptModal.showModal();

  let countdown = 3;
  const countdownTimer = document.getElementById("countdown-timer");
  countdownTimer.innerText = countdown;

  const countdownInterval = setInterval(() => {
    countdown -= 1;
    countdownTimer.innerText = countdown;

    if (countdown === 0) {
      clearInterval(countdownInterval);
      adoptModal.close();
      btn.innerText = "Adopted";
      btn.disabled = true;
      btn.classList.add("disabled", "bg-gray-400");
    }
  }, 1000);
};

loadAllCategory();
loadAllPets();
