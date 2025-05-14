const form = document.getElementById("ageForm");
const resultSection = document.getElementById("result");
const entryList = document.getElementById("entryList");
const ageDisplay = document.getElementById("ageDisplay");
const modeToggle = document.getElementById("modeToggle");
const clearBtn = document.getElementById("clearBtn");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const gender = document.getElementById("gender").value;
  const occupation = document.getElementById("occupation").value.trim();
  const dob = new Date(document.getElementById("dob").value);
  const today = new Date();

  if (dob >= today) {
    resultSection.innerHTML = `<p>Please enter a valid date of birth.</p>`;
    return;
  }

  const age = getAge(dob, today);
  const category = classifyAge(age.years);

  ageDisplay.innerHTML = `🎉 ${age.years} years, ${age.months} months, ${age.days} days old`;

  resultSection.innerHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Gender:</strong> ${gender}</p>
    <p><strong>Occupation:</strong> ${occupation}</p>
    <p><strong>Age Category:</strong> ${category}</p>
  `;

  const li = document.createElement("li");
  li.innerHTML = `<strong>${name}</strong> (${gender}, ${occupation}) - Age: ${age.years} (${category})`;
  entryList.appendChild(li);

  form.reset();
});

clearBtn.addEventListener("click", () => {
  entryList.innerHTML = "";
});

function getAge(dob, today) {
  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

function classifyAge(years) {
  if (years < 13) return "Child";
  else if (years < 18) return "Teenager";
  else if (years < 30) return "Young Adult";
  else if (years < 60) return "Adult";
  else return "Senior";
}


modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  modeToggle.textContent = document.body.classList.contains("dark")
    ? "🌙 Dark Mode"
    : "🌞 Light Mode";
});
