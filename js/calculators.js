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

//set variables to call api
tdeeBtn.addEventListener("click", () => {
  const gender = genderSelection.value;
  const age = parseInt(ageField.value);
  const weight = parseInt(weightField.value);
  const height = parseInt(heightField.value);
  const activity = activityLevelSelection.value;
  const goal = goalSelection.value;

  const url = `https://fitness-calculator.p.rapidapi.com/macrocalculator?age=${age}&gender=${gender}&height=${height}&weight=${weight}&activitylevel=${activity}&goal=${goal}`;

  getDailyCalorieIntake(url);
});

//create HTML
function outputResults(data) {
  const caloriesResult = document.querySelector("#kcal-result-output");
  const protResult = document.querySelector("#prot-result-output");
  const carbsResult = document.querySelector("#carbs-result-output");
  const fatsResult = document.querySelector("#fats-result-output");
  caloriesResult.innerHTML = parseInt(data.data.calorie);
  protResult.innerHTML = parseInt(data.data.balanced.protein);
  carbsResult.innerHTML = parseInt(data.data.balanced.carbs);
  fatsResult.innerHTML = parseInt(data.data.balanced.fat);
}
