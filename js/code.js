const navSlide = () => {
  const burger = document.querySelector(".burger");
  const mainNav = document.querySelector("#nav-links");
  const mainNavLinks = mainNav.querySelectorAll("li");

  burger.addEventListener("click", (e) => {
    burger.classList.toggle("burgerToggle");
    mainNav.classList.toggle("nav-active");
    mainNavLinks.forEach((link, index) => {
      if (link.style.animation) link.style.animation = "";
      else
        link.style.animation = `fadeIn 0.6s ease forwards ${index / 5 + 0.5}s`;
    });
  });
};

const swiper = () => {
  if (document.querySelector(".swiper-container") !== null)
    new Swiper(".swiper-container", {
      // Optional parameters
      direction: "vertical",
      loop: true,
      speed: 1000,
      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
      },
      autoplay: {
        delay: 50000,
      },
      //Navigation arrows
      // navigation: {
      //   nextEl: ".swiper-button-next",
      //   prevEl: ".swiper-button-prev",
      // },

      //And if we need scrollbar
      // scrollbar: {
      //   el: '.swiper-scrollbar',
      // },
    });
};

//useful function to data valadation
function printInputError(element, message) {
  var errorSpan = element.parentNode.querySelector(".error");
  if(errorSpan!== null)
  errorSpan.innerText = message;
}

function isValidEmail(element) {
  var respond = false;
  var emailRegx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!element.value.match(emailRegx))
    printInputError(element, "Invalid Email Format");
  else respond = true;
  return respond;
}
function isMatch(element1, element2) {
  var respond = false;
  if (element1.value !== element2.value)
    printInputError(element2, "Value Does Not Match");
  else respond = true;
  return respond;
}
function isValidLength(element, min, max) {
  var respond = false;
  if (element.value.trim().length === 0)
    printInputError(element, "Input Can't be blank.");
  else if (element.value.length <= min)
    printInputError(element, "Your value is too short.");
  else if (element.value.length >= max)
    printInputError(element, "Your value is too long.");
  else respond = true;
  return respond;
}
function isValidName(element) {
  var respond = false;
  var usernameRegx = /^[a-zA-Z\-]+$/;
  if (!element.value.match(usernameRegx))
    printInputError(element, "Invalid Name Format");
  else respond = true;
  return respond;
}

function isValidPassword(element) {
  var respond = false;
  if (element.value.search(/[a-z]/i) < 0)
    printInputError(element, "Your password must contain at least one letter.");
  else if (element.value.search(/[0-9]/) < 0)
    printInputError(element, "Your password must contain at least one digit.");
  else respond = true;
  return respond;
}
const validate = () => {
  //get me all the signup form if there's any

  var signUpForm = document.querySelector("#sign-form>form");
  if (signUpForm !== null) {
    const controls = signUpForm.querySelectorAll(".control");
    signUpForm.querySelector("button").addEventListener("click", (event) => {
      let flag = 0;
      for (var control of controls) {
        var currentControlInput = control.querySelector("input");
        var currentControlType = currentControlInput.getAttribute("type");
        if (currentControlType === "text") {
          flag += !(
            isValidLength(currentControlInput, 3, 20) &&
            isValidName(currentControlInput)
          );
        }
        if (currentControlType === "password") {
          if (currentControlInput.getAttribute("id").search(/^re-/) < 0)
            flag += !(
              isValidLength(currentControlInput, 6, 30) &&
              isValidPassword(currentControlInput)
            );
          else {
            let prevInputId = currentControlInput
              .getAttribute("id")
              .substring(3);
            flag += !(
              isMatch(
                currentControlInput.parentNode.parentNode.querySelector(
                  "#" + prevInputId
                ),
                currentControlInput
              ) && isValidLength(currentControlInput, 6, 30)
            );
          }
        }
        if (currentControlType === "email") {
          flag += !(
            isValidLength(currentControlInput, 5, 40) &&
            isValidEmail(currentControlInput)
          );
        }
      }
      if (flag > 0) event.preventDefault();
    });
    for (var control of controls) {
      var currentControlInput = control.querySelector("input");
      currentControlInput.addEventListener("focus", (event) => {
        event.target.parentNode.querySelector(".error").innerText = "";
      });
      currentControlInput.addEventListener("blur", (event) => {
        var currentControlType = event.target.getAttribute("type");
        if (currentControlType === "text") {
          isValidLength(event.target, 3, 20) && isValidName(event.target);
        }
        if (currentControlType === "password") {
          if (event.target.getAttribute("id").search(/^re-/) < 0)
            isValidLength(event.target, 6, 30) && isValidPassword(event.target);
          else {
            let prevInputId = event.target.getAttribute("id").substring(3);
            isMatch(
              event.target.parentNode.parentNode.querySelector(
                "#" + prevInputId
              ),
              event.target
            );
          }
        }
        if (currentControlType === "email") {
          isValidLength(event.target, 5, 40) && isValidEmail(event.target);
        }
      });
    }
  }
};

//functiom call time
const app = () => {
  navSlide();
  swiper();
  validate();
};
app();
