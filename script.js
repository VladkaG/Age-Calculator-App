const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const myForm = document.getElementById("myForm");
const yearsElement = document.getElementById("years-result");
const monthsElement = document.getElementById("months-result");
const daysElement = document.getElementById("days-result");

myForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);

  if (
    dayInput.value === "" ||
    monthInput.value === "" ||
    yearInput.value === ""
  ) {
    setError(dayInput, "This field is required");
    setError(monthInput, "This field is required");
    setError(yearInput, "This field is required");
    return;
  }

  if (
    day > 31 ||
    day < 1 ||
    month > 12 ||
    month < 1 ||
    year > new Date().getFullYear()
  ) {
    setError(dayInput, "Must be a valid day");
    setError(monthInput, "Must be a valid month");
    setError(yearInput, "Must be in the past");
    return;
  }

  if (!isValidDate(day, month, year)) {
    setError(dayInput, "Must be a valid day");
    setError(monthInput, "Must be a valid month");
    setError(yearInput, "Must be in the past");
    return;
  }

  const inputDate = new Date(year, month - 1, day);
  const age = calculateAge(inputDate);
  displayAge(age.years, age.months, age.days);
});

function setError(input, errorMessage) {
  const errorElement = document.getElementById(input.id + "Error");
  errorElement.innerText = errorMessage;
  errorElement.classList.add("error");
  input.classList.add("input-error");
  const labels = document.querySelectorAll(".label");
  labels.forEach((label) => {
    label.classList.add("label-error");
  });
}

function isValidDate(day, month, year) {
  const date = new Date(year, month - 1, day);
  return (
    date.getDate() === day &&
    date.getMonth() === month - 1 &&
    date.getFullYear() === year
  );
}

function calculateAge(inputDate) {
  const currentDate = new Date();
  const inputDateObj = new Date(inputDate);

  const timeDiff = currentDate - inputDateObj;

  // Кількість мілісекунд у році, місяці та дні
  const millisecondsPerYear = 365.25 * 24 * 60 * 60 * 1000;
  const millisecondsPerMonth = 30.44 * 24 * 60 * 60 * 1000;
  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  // Кількість пройдених років, місяців та днів
  const years = Math.floor(timeDiff / millisecondsPerYear);
  const months = Math.floor(
    (timeDiff % millisecondsPerYear) / millisecondsPerMonth
  );
  const days = Math.floor(
    (timeDiff % millisecondsPerMonth) / millisecondsPerDay
  );

  return {
    years,
    months,
    days,
  };
}

function displayAge(years, months, days) {
  yearsElement.textContent = years;
  monthsElement.textContent = months;
  daysElement.textContent = days;
}
