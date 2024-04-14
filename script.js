document.getElementById("submit").addEventListener("click", function() {
  validateForm();
});

function validateForm() {
  const age = document.getElementById("age").value;
  const income = parseFloat(document.getElementById("income").value);
  const extraIncome = parseFloat(document.getElementById("extraIncome").value);
  const deductions = parseFloat(document.getElementById("deductions").value);

  hideErrorIcons();

  let isValid = true;
  

  if (!age) {
    displayErrorIcon("ageError");
    isValid = false;
  }

  if (isNaN(income) ||  income==/[a-zA-Z]/) {
    displayErrorIcon("incomeError");
    isValid = false;
  }

  if (isNaN(extraIncome) || extraIncome==/[a-zA-Z]/) {
    displayErrorIcon("extraIncomeError");
    isValid = false;
  }

  if (isNaN(deductions) || deductions==/[a-zA-Z]/) {
    displayErrorIcon("deductionsError");
    isValid = false;
  }

  if (isValid) {
    const tax = calculateTax(age, income, extraIncome, deductions);
    displayResultModal(tax);
  }
}

function calculateTax(age, income, extraIncome, deductions) {
  let taxableIncome = income + extraIncome - deductions;
  let tax = 0;

  if (taxableIncome > 800000) {
    if (age === "<40") {
      tax = (taxableIncome - 800000) * 0.3;
    } else if (age === ">=40&<60") {
      tax = (taxableIncome - 800000) * 0.4;
    } else if (age === ">=60") {
      tax = (taxableIncome - 800000) * 0.1;
    }
  }

  return tax;
}

function displayResultModal(tax) {
  const modal = document.getElementById("myModal");
  const resultElement = document.getElementById("result").innerHTML=tax.toLocaleString('en-IN');
  resultElement.textContent = tax.toFixed(2);
  modal.style.display = "block";

  document.getElementsByClassName("close")[0].onclick = function() {
    modal.style.display = "none";
  }
}

function hideErrorIcons() {
  const errorIcons = document.getElementsByClassName("error-icon");
  for (let i = 0; i < errorIcons.length; i++) {
    errorIcons[i].style.display = "none";
  }
}

function displayErrorIcon(id) {
  const errorIcon = document.getElementById(id);
  errorIcon.style.display = "inline-block";
}


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()