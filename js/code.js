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
/*
const swiper = new Swiper(".swiper-container", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  speed: 1000,
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },
  autoplay: {
    delay: 5000,
  },
  // Navigation arrows
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },

  // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
});
*/
//functiom call time
const app = () => {
  navSlide();
  //swiper();
};
app();
