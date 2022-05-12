//select elements in the DOM
const genderSelection = document.querySelector("select[name='gender']");
const ageField = document.querySelector("#age");
const weightField = document.querySelector("#body-weight");
const heightField = document.querySelector("#height");
const activityLevelSelection = document.querySelector(
  "select[name='activity-level']"
);
const goalSelection = document.querySelector("select[name='goal']");
const tdeeBtn = document.querySelector("#tdee-btn");

//catch errors in form
tdeeBtn.addEventListener("click", validateFields);

//create HTML
function outputResults(data) {
  const resultsContainer = document.querySelector(".results");

  resultsContainer.innerHTML = `<div>
  <span>calories: <span class="result-output" id="kcal-result-output">${parseInt(
    data.data.calorie
  )}kcal</span></span>
</div>
<div class="macros">
  <span>protein: <span class="result-output" id="prot-result-output">${parseInt(
    data.data.balanced.protein
  )}g</span></span>
  <span>carbs: <span class="result-output" id="carbs-result-output">${parseInt(
    data.data.balanced.carbs
  )}g</span></span>
  <span>fats: <span class="result-output" id="fats-result-output">${parseInt(
    data.data.balanced.fat
  )}g</span></span>
</div>`;
}

//validate fields
function validateFields() {
  if (!genderSelection.value) {
    genderSelection.classList.add("error");
  } else {
    genderSelection.classList.remove("error");
  }

  let ageValue = parseInt(ageField.value);
  const ageError = document.querySelector(".error-age");
  if (!ageValue || !isValid(ageValue, 1, 80)) {
    ageField.classList.add("error");
    ageError.classList.remove("hidden");
  } else {
    ageField.classList.remove("error");
    ageError.classList.add("hidden");
  }

  let weightValue = parseFloat(weightField.value);
  const weightError = document.querySelector(".error-weight");
  if (!weightValue || !isValid(weightValue, 40, 160)) {
    weightField.classList.add("error");
    weightError.classList.remove("hidden");
  } else {
    weightField.classList.remove("error");
    weightError.classList.add("hidden");
  }

  let heightValue = parseFloat(heightField.value);
  const heightError = document.querySelector(".error-height");
  if (!heightValue || !isValid(heightValue, 130, 230)) {
    heightField.classList.add("error");
    heightError.classList.remove("hidden");
  } else {
    heightField.classList.remove("error");
    heightError.classList.add("hidden");
  }

  if (!activityLevelSelection.value) {
    activityLevelSelection.classList.add("error");
  } else {
    activityLevelSelection.classList.remove("error");
  }

  if (!goalSelection.value) {
    goalSelection.classList.add("error");
  } else {
    goalSelection.classList.remove("error");
  }

  calculateResult();
}

//remove errors on key up
genderSelection.addEventListener("change", () => {
  genderSelection.classList.remove("error");
});

ageField.addEventListener("keyup", () => {
  const ageErrorMessage = document.querySelector(".error-age");
  ageField.classList.remove("error");
  ageErrorMessage.classList.add("hidden");
});

weightField.addEventListener("keyup", () => {
  const weightErrorMessage = document.querySelector(".error-weight");
  weightField.classList.remove("error");
  weightErrorMessage.classList.add("hidden");
});

heightField.addEventListener("keyup", () => {
  const heightErrorMessage = document.querySelector(".error-height");
  heightField.classList.remove("error");
  heightErrorMessage.classList.add("hidden");
});

activityLevelSelection.addEventListener("change", () => {
  activityLevelSelection.classList.remove("error");
});

goalSelection.addEventListener("change", () => {
  goalSelection.classList.remove("error");
});

//api call
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
    "X-RapidAPI-Key": "68002b448dmsh13ce8351f6c4cccp1f31f8jsndc4f4f233bf3",
  },
};

async function getDailyCalorieIntake(url) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    outputResults(data);
  } catch (error) {
    console.log(error);
  }
}

function calculateResult() {
  const gender = genderSelection.value;
  const age = parseInt(ageField.value);
  const weight = parseFloat(weightField.value);
  const height = parseFloat(heightField.value);
  const activity = activityLevelSelection.value;
  const goal = goalSelection.value;

  const url = `https://fitness-calculator.p.rapidapi.com/macrocalculator?age=${age}&gender=${gender}&height=${height}&weight=${weight}&activitylevel=${activity}&goal=${goal}`;

  getDailyCalorieIntake(url);
}

function isValid(field, minValue, maxValue) {
  if (field >= minValue && field <= maxValue) {
    return true;
  }
}
