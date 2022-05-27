import { displayErrorMessage } from "./functions/errorMessage.js";
// TDEE CALCULATOR

//select elements in the DOM
const imperialSystem = document.querySelector("#imperial");
const metricSystem = document.querySelector("#metric");

const genderSelection = document.querySelector("select[name='gender']");
const ageField = document.querySelector("#age");
const weightField = document.querySelector("#body-weight");
const heightField = document.querySelector("#height");
const heightSelect = document.querySelector("#select-height-ft");
const activityLevelSelection = document.querySelector(
  "select[name='activity-level']"
);
const goalSelection = document.querySelector("select[name='goal']");
const tdeeBtn = document.querySelector("#tdee-btn");

const resultsContainer = document.querySelector(".results");

//catch errors in form
tdeeBtn.addEventListener("click", validateFields);

//system selection
metricSystem.addEventListener("change", () => {
  //clear weight placeholder and give it a new one
  weightField.value = "";
  weightField.placeholder = "Weight in KG";
  //get height fields redy for validation
  heightField.classList.remove("hidden");
  heightSelect.classList.add("hidden");
});

imperialSystem.addEventListener("change", () => {
  //clear weight placeholder and give it a new one
  weightField.value = "";
  weightField.placeholder = "Weight in lbs";
  //get height fields redy for validation
  heightSelect.classList.remove("hidden");
  heightField.classList.add("hidden");
});

//validate fields
function validateFields() {
  //gender
  if (!genderSelection.value) {
    genderSelection.classList.add("error");
  } else {
    genderSelection.classList.remove("error");
  }

  //age
  let ageValue = parseInt(ageField.value);
  const ageError = document.querySelector(".error-age");
  if (!ageValue || !isValid(ageValue, 1, 80)) {
    ageField.classList.add("error");
    ageError.classList.remove("hidden");
  } else {
    ageField.classList.remove("error");
    ageError.classList.add("hidden");
  }

  //weight
  let weightValue = parseFloat(weightField.value);
  const weightError = document.querySelector(".error-weight");

  //if imperial
  if (imperialSystem.checked) {
    weightValue = parseFloat(lbsToKg(weightValue));
    if (!weightValue || !isValid(weightValue, 88, 353)) {
      weightField.classList.add("error");
      weightError.innerHTML = "must be a number between 88 and 353";
      weightError.classList.remove("hidden");
    } else {
      weightField.classList.remove("error");
      weightError.classList.add("hidden");
    }
  }

  //if metric
  if (!weightValue || !isValid(weightValue, 40, 160)) {
    weightField.classList.add("error");
    weightError.classList.remove("hidden");
  } else {
    weightField.classList.remove("error");
    weightError.classList.add("hidden");
  }

  //height

  //if imperial
  let heightValueInFt = parseFloat(heightSelect.value);
  if (imperialSystem.checked && !heightValueInFt) {
    heightSelect.classList.add("error");
  } else {
    heightSelect.classList.remove("error");
  }

  //if metric
  let heightValue = parseFloat(heightField.value);
  const heightError = document.querySelector(".error-height");

  if (
    metricSystem.checked &&
    (!heightValue || !isValid(heightValue, 130, 230))
  ) {
    heightField.classList.add("error");
    heightError.classList.remove("hidden");
  } else {
    heightField.classList.remove("error");
    heightError.classList.add("hidden");
  }

  //activity
  if (!activityLevelSelection.value) {
    activityLevelSelection.classList.add("error");
  } else {
    activityLevelSelection.classList.remove("error");
  }

  //goal
  if (!goalSelection.value) {
    goalSelection.classList.add("error");
  } else {
    goalSelection.classList.remove("error");
  }

  displayLoader();
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
    displayErrorMessage(resultsContainer);
    console.log(error);
  }
}

//calculate tdee
function calculateResult() {
  const gender = genderSelection.value;
  const age = parseInt(ageField.value);
  let weight = parseFloat(weightField.value);
  let height = parseFloat(heightField.value);
  if (imperialSystem.checked) {
    weight = parseFloat(lbsToKg(weight));
    height = parseFloat(heightSelect.value);
  }

  const activity = activityLevelSelection.value;
  const goal = goalSelection.value;

  const url = `https://fitness-calculator.p.rapidapi.com/macrocalculator?age=${age}&gender=${gender}&height=${height}&weight=${weight}&activitylevel=${activity}&goal=${goal}`;

  getDailyCalorieIntake(url);
}

//field validation function
function isValid(field, minValue, maxValue) {
  if (field >= minValue && field <= maxValue) {
    return true;
  }
}

//convert lbs to KG
function lbsToKg(weightInLbs) {
  return weightInLbs * 0.45359237;
}

//loader function
function displayLoader() {
  resultsContainer.innerHTML = `<div class="load-calc-box">
                                  <div class="load-calc"></div>
                                </div>`;
  calculateResult();
}

//create HTML
function outputResults(data) {
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

// RPE CALCULATOR

//select elements in the DOM
const liftedWeight = document.querySelector("#lifted-weight");
const performedReps = document.querySelector("#performed-reps");
const reachedRpe = document.querySelector("#reached-rpe");
const desiredReps = document.querySelector("#desired-reps");
const desiredRpe = document.querySelector("#desired-rpe");

const rpeBtn = document.querySelector("#rpe-btn");

//elements for final results
const rmResult = document.querySelector("#rm-result");
const weightResult = document.querySelector("#weight-result");

//elements for error display
const liftedRepsError = document.querySelector(".lifted-reps-error");
const desiredRepsError = document.querySelector(".desired-reps-error");

const coefficients = [
  [1, 0.955, 0.92, 0.89, 0.865, 0.84, 0.81, 0.785, 0.76, 0.74, 0.71, 0.68],
  [0.98, 0.94, 0.91, 0.88, 0.85, 0.825, 0.8, 0.775, 0.75, 0.725, 0.695, 0.665],
  [0.955, 0.92, 0.89, 0.865, 0.835, 0.81, 0.785, 0.76, 0.74, 0.71, 0.68, 0.65],
  [0.94, 0.91, 0.88, 0.85, 0.825, 0.8, 0.775, 0.75, 0.725, 0.695, 0.67, 0.64],
  [0.92, 0.89, 0.865, 0.84, 0.81, 0.785, 0.76, 0.74, 0.71, 0.68, 0.655, 0.625],
  [0.91, 0.88, 0.85, 0.825, 0.8, 0.775, 0.75, 0.725, 0.695, 0.665, 0.64, 0.61],
  [0.89, 0.865, 0.84, 0.81, 0.785, 0.76, 0.74, 0.71, 0.68, 0.655, 0.625, 0.6],
  [
    0.88, 0.85, 0.825, 0.8, 0.775, 0.75, 0.725, 0.695, 0.665, 0.64, 0.615,
    0.585,
  ],
];

rpeBtn.addEventListener("click", validateRpeValues);

let liftedWeightValue;
let performedRepsValue;
let reachedRpeValue;

let desiredRepsValue;
let desiredRpeValue;

function validateRpeValues() {
  liftedWeightValue = parseFloat(liftedWeight.value);
  performedRepsValue = parseInt(performedReps.value);
  reachedRpeValue = parseInt(reachedRpe.value);

  desiredRepsValue = parseInt(desiredReps.value);
  desiredRpeValue = parseInt(desiredRpe.value);

  if (!liftedWeightValue) {
    liftedWeight.classList.add("error");
  } else {
    liftedWeight.classList.remove("error");
  }

  if (!performedRepsValue || !isValid(performedRepsValue, 1, 12)) {
    performedReps.classList.add("error");
    liftedRepsError.classList.remove("hidden");
  } else {
    performedReps.classList.remove("error");
    liftedRepsError.classList.add("hidden");
  }

  if (!reachedRpeValue) {
    reachedRpe.classList.add("error");
  } else {
    reachedRpe.classList.remove("error");
  }

  if (!desiredRepsValue || !isValid(desiredRepsValue, 1, 12)) {
    desiredReps.classList.add("error");
    desiredRepsError.classList.remove("hidden");
  } else {
    desiredReps.classList.remove("error");
    desiredRepsError.classList.add("hidden");
  }

  if (!desiredRpeValue) {
    desiredRpe.classList.add("error");
  } else {
    desiredRpe.classList.remove("error");
  }

  calculateRpe();
}

//remove errors on key up
liftedWeight.addEventListener("change", () => {
  liftedWeight.classList.remove("error");
});

performedReps.addEventListener("keyup", () => {
  const performedRepsErrorMessage =
    document.querySelector(".lifted-reps-error");
  performedReps.classList.remove("error");
  performedRepsErrorMessage.classList.add("hidden");
});

reachedRpe.addEventListener("change", () => {
  reachedRpe.classList.remove("error");
});

desiredReps.addEventListener("keyup", () => {
  const desiredRepsErrorMessage = document.querySelector(".desired-reps-error");
  desiredReps.classList.remove("error");
  desiredRepsErrorMessage.classList.add("hidden");
});

desiredRpe.addEventListener("change", () => {
  desiredRpe.classList.remove("error");
});

function calculateRpe() {
  liftedWeightValue = parseFloat(liftedWeight.value);
  performedRepsValue = parseInt(performedReps.value);
  reachedRpeValue = parseInt(reachedRpe.value);

  desiredRepsValue = parseInt(desiredReps.value);
  desiredRpeValue = parseInt(desiredRpe.value);

  let selectedRpe = coefficients[reachedRpeValue];
  let coeffForRM = selectedRpe[performedRepsValue - 1];

  //get 1RM
  let rm = (liftedWeightValue / coeffForRM).toFixed(1);

  let wantedRpe = coefficients[desiredRpeValue];
  let coeffForRecommendedWeight = wantedRpe[desiredRepsValue - 1];

  //get weight to lift
  let weightToLift = (rm * coeffForRecommendedWeight).toFixed(1);

  outputRPECalcResults(rm, weightToLift);
}

function outputRPECalcResults(rm, weight) {
  rmResult.innerHTML = `est 1rm: <span class="result-output">${rm}Kg</span>`;
  weightResult.innerHTML = `weight: <span class="result-output">${weight}Kg</span>`;
}
