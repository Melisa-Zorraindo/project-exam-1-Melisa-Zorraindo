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
  const caloriesResult = document.querySelector("#kcal-result-output");
  const protResult = document.querySelector("#prot-result-output");
  const carbsResult = document.querySelector("#carbs-result-output");
  const fatsResult = document.querySelector("#fats-result-output");
  caloriesResult.innerHTML = parseInt(data.data.calorie) + "kcal";
  protResult.innerHTML = parseInt(data.data.balanced.protein) + "g";
  carbsResult.innerHTML = parseInt(data.data.balanced.carbs) + "g";
  fatsResult.innerHTML = parseInt(data.data.balanced.fat) + "g";
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
  if (!ageValue || ageValue < 1 || ageValue > 80) {
    ageField.classList.add("error");
    ageError.classList.remove("hidden");
  } else {
    ageField.classList.remove("error");
    ageError.classList.add("hidden");
  }

  let weightValue = parseInt(weightField.value);
  const weightError = document.querySelector(".error-weight");
  if (!weightValue || weightValue < 40 || weightValue > 160) {
    weightField.classList.add("error");
    weightError.classList.remove("hidden");
  } else {
    weightField.classList.remove("error");
    weightError.classList.add("hidden");
  }

  let heightValue = parseInt(heightField.value);
  const heightError = document.querySelector(".error-height");
  if (!heightValue || heightValue < 130 || heightValue > 230) {
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
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

function calculateResult() {
  const gender = genderSelection.value;
  const age = parseInt(ageField.value);
  const weight = parseInt(weightField.value);
  const height = parseInt(heightField.value);
  const activity = activityLevelSelection.value;
  const goal = goalSelection.value;

  const url = `https://fitness-calculator.p.rapidapi.com/macrocalculator?age=${age}&gender=${gender}&height=${height}&weight=${weight}&activitylevel=${activity}&goal=${goal}`;

  getDailyCalorieIntake(url);
}
