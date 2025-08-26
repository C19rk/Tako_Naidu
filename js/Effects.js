//Loading Screen
window.addEventListener("load", function () {
  function hideLoadingScreens() {
    const loadingScreenBg = document.getElementById("bg-anim-slide-out");
    const loadingScreenLogo = document.getElementById("logo-slide-in");
    const loadingScreenText = document.getElementById("text-slide-in");
    const content = document.getElementById("content");

    loadingScreenBg.style.display = "none";
    loadingScreenLogo.style.display = "none";
    loadingScreenText.style.display = "none";

    content.style.display = "block";
  }

  if (!sessionStorage.getItem("loadingScreensDisplayed")) {
    sessionStorage.setItem("loadingScreensDisplayed", "true");

    const loadingScreenBg = document.getElementById("bg-anim-slide-out");
    const loadingScreenLogo = document.getElementById("logo-slide-in");
    const loadingScreenText = document.getElementById("text-slide-in");

    setTimeout(function () {
      hideLoadingScreens();
    }, 7800);

    setTimeout(function () {
      loadingScreenBg.style.display = "none";
    }, 8000);

    setTimeout(function () {
      loadingScreenLogo.style.display = "none";
    }, 8000);

    setTimeout(function () {
      loadingScreenText.style.display = "none";
    }, 8000);
  } else {
    hideLoadingScreens();
  }
});

// NavBar Scroll Effect
function scrollToHome() {
  const element = document.getElementById("scroll-to-home");

  const offset = window.innerWidth <= 914 ? 0 : 0; ///0 = Mobile, 0 = Desktop

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: window.pageYOffset + offsetPosition,
    behavior: "smooth",
  });
}

function scrollToMenu() {
  const element = document.getElementById("scroll-to-menu");

  const offset = window.innerWidth <= 914 ? 45 : 55; ///45 = Mobile, 55 = Desktop

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: window.pageYOffset + offsetPosition,
    behavior: "smooth",
  });
}

function scrollToAbout() {
  const element = document.getElementById("scroll-to-about");

  const offset = window.innerWidth <= 914 ? 0 : 5; ///0 = Mobile, 5 = Desktop

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: window.pageYOffset + offsetPosition,
    behavior: "smooth",
  });
}

function scrollToContact() {
  const element = document.getElementById("scroll-to-contact");

  const offset = window.innerWidth <= 914 ? 0 : 0; ///0 = Mobile, 0 = Desktop

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: window.pageYOffset + offsetPosition,
    behavior: "smooth",
  });
}

// Home Typewriter Effect
function typewriterEffectOnClass(
  className,
  text,
  typingSpeed,
  eraseSpeed,
  pauseDuration,
  restartDelay
) {
  let elements = document.getElementsByClassName(className);

  Array.from(elements).forEach((element) => {
    let i = 0;
    let isDeleting = false;
    element.innerHTML = "";
    let typingTimer;
    let eraseTimer;
    let restartTimer;

    function type() {
      if (isDeleting) {
        if (i > 0) {
          element.innerHTML = text.substring(0, i--);
          eraseTimer = setTimeout(type, eraseSpeed);
        } else {
          isDeleting = false;
          restartTimer = setTimeout(type, pauseDuration);
        }
      } else {
        if (i < text.length) {
          element.innerHTML = text.substring(0, i++);
          typingTimer = setTimeout(type, typingSpeed);
        } else {
          isDeleting = true;
          restartTimer = setTimeout(type, pauseDuration);
        }
      }
    }

    function startTypingWithDelay() {
      setTimeout(() => {
        type();
      }, 6000);
    }

    function stopTyping() {
      clearTimeout(typingTimer);
      clearTimeout(eraseTimer);
      clearTimeout(restartTimer);
    }

    function reset() {
      stopTyping();
      element.innerHTML = "";
      startTypingWithDelay();
    }

    reset();
  });
}

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

document.addEventListener("DOMContentLoaded", () => {
  let elements = document.getElementsByClassName("home-text");
  Array.from(elements).forEach((element) => {
    const text = "\u200BAUTHENTIC JAPANESE TAKOYAKI\u200B";
    if (isInViewport(element)) {
      if (!element.classList.contains("typed")) {
        element.classList.add("typed");
        typewriterEffectOnClass("home-text", text, 100, 60, 3000, 6000);
      }
    } else {
      element.classList.remove("typed");
      element.innerHTML = "";
    }
  });
});

// Menu Scroll
document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("main-content-menu");
  const leftButton = document.getElementById("scroll-button-left");
  const rightButton = document.getElementById("scroll-button-right");

  const originalItems = menu.innerHTML;
  menu.innerHTML += originalItems;

  const itemWidth = menu.querySelector("p").offsetWidth + 50;
  const containerWidth =
    document.getElementById("scroll-container").offsetWidth;
  const totalWidth = menu.scrollWidth;

  let scrollPosition = 0;
  const scrollSpeed = itemWidth;
  const halfTotalWidth = totalWidth / 2;

  function scrollMenu(direction) {
    if (direction === "left") {
      scrollPosition -= scrollSpeed;
      if (scrollPosition < 0) {
        scrollPosition += halfTotalWidth;
      }
    } else if (direction === "right") {
      scrollPosition += scrollSpeed;
      if (scrollPosition > halfTotalWidth) {
        scrollPosition -= halfTotalWidth;
      }
    }

    menu.style.transition = "transform 0.5s ease";
    menu.style.transform = `translateX(-${scrollPosition}px)`;
  }

  leftButton.addEventListener("click", function () {
    scrollMenu("left");
  });

  rightButton.addEventListener("click", function () {
    scrollMenu("right");
  });

  menu.addEventListener("transitionend", function () {
    if (scrollPosition < 0) {
      scrollPosition += halfTotalWidth;
    } else if (scrollPosition > halfTotalWidth) {
      scrollPosition -= halfTotalWidth;
    }
    menu.style.transition = "none";
    menu.style.transform = `translateX(-${scrollPosition}px)`;
    setTimeout(() => {
      menu.style.transition = "transform 0.5s ease";
    }, 0);
  });
});

//Background Shift
document.addEventListener("DOMContentLoaded", () => {
  const aboutBackgroundElement = document.getElementById("about-background");
  const menuBackgroundElement = document.getElementById("menu-background");
  const backgroundElement = document.getElementById("background");
  const contactBackgroundElement =
    document.getElementById("contact-background"); // New background element for contact
  const priceElement = document.getElementById("price");
  const aboutContentElement = document.getElementById("about-us");
  const homeContentElement = document.getElementById("main-content-home");
  const contactTextElement = document.getElementById("contact-text");

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  function updateBackground() {
    const priceInViewport = isInViewport(priceElement);
    const aboutInViewport = isInViewport(aboutContentElement);
    const homeInViewport = isInViewport(homeContentElement);
    const contactInViewport = isInViewport(contactTextElement);

    if (contactInViewport) {
      backgroundElement.style.opacity = "0";
      menuBackgroundElement.style.opacity = "0";
      aboutBackgroundElement.style.opacity = "0";
      contactBackgroundElement.style.opacity = "1"; // Show contact background
    } else if (homeInViewport) {
      backgroundElement.style.opacity = "1";
      menuBackgroundElement.style.opacity = "0";
      aboutBackgroundElement.style.opacity = "0";
      contactBackgroundElement.style.opacity = "0"; // Hide contact background
    } else if (priceInViewport) {
      menuBackgroundElement.style.opacity = "1";
      backgroundElement.style.opacity = "0";
      aboutBackgroundElement.style.opacity = "0";
      contactBackgroundElement.style.opacity = "0"; // Hide contact background
    } else if (aboutInViewport) {
      aboutBackgroundElement.style.opacity = "1";
      backgroundElement.style.opacity = "0";
      menuBackgroundElement.style.opacity = "0";
      contactBackgroundElement.style.opacity = "0"; // Hide contact background
    } else {
      backgroundElement.style.opacity = "1";
      menuBackgroundElement.style.opacity = "0";
      aboutBackgroundElement.style.opacity = "0";
      contactBackgroundElement.style.opacity = "0"; // Hide contact background
    }
  }

  window.addEventListener("scroll", updateBackground);
  window.addEventListener("resize", updateBackground);

  updateBackground();
});

// document.addEventListener("DOMContentLoaded", function () {
//   const menu = document.getElementById("main-content-menu");
//   const leftButton = document.getElementById("scroll-button-left");
//   const rightButton = document.getElementById("scroll-button-right");

//   const originalItems = menu.innerHTML;
//   menu.innerHTML += originalItems;

//   const itemWidth = menu.querySelector("p").offsetWidth + 50;
//   const containerWidth =
//     document.getElementById("scroll-container").offsetWidth;
//   const totalWidth = menu.scrollWidth;

//   let scrollPosition = 0;
//   const scrollSpeed = itemWidth;
//   const halfTotalWidth = totalWidth / 2;

//   function scrollMenu(direction) {
//     if (direction === "left") {
//       scrollPosition -= scrollSpeed;
//       if (scrollPosition < 0) {
//         scrollPosition += halfTotalWidth;
//       }
//     } else if (direction === "right") {
//       scrollPosition += scrollSpeed;
//       if (scrollPosition > halfTotalWidth) {
//         scrollPosition -= halfTotalWidth;
//       }
//     }

//     menu.style.transition = "transform 0.5s ease";
//     menu.style.transform = `translateX(-${scrollPosition}px)`;

//     updateImageOpacity();
//   }

//   function updateImageOpacity() {
//     const images = menu.querySelectorAll("img");
//     const containerRect = document
//       .getElementById("scroll-container")
//       .getBoundingClientRect();

//     const fadeWidth = 350;

//     images.forEach((img) => {
//       const imgRect = img.getBoundingClientRect();

//       let fade = 1;

//       const distanceLeft = imgRect.left - containerRect.left;
//       const distanceRight = containerRect.right - imgRect.right;

//       if (distanceLeft < fadeWidth) {
//         fade = distanceLeft / fadeWidth;
//       } else if (distanceRight < fadeWidth) {
//         fade = distanceRight / fadeWidth;
//       }

//       img.style.opacity = fade < 0 ? 0 : fade;
//     });
//   }

//   leftButton.addEventListener("click", function () {
//     scrollMenu("left");
//   });

//   rightButton.addEventListener("click", function () {
//     scrollMenu("right");
//   });

//   menu.addEventListener("transitionend", function () {
//     if (scrollPosition < 0) {
//       scrollPosition += halfTotalWidth;
//     } else if (scrollPosition > halfTotalWidth) {
//       scrollPosition -= halfTotalWidth;
//     }
//     menu.style.transition = "none";
//     menu.style.transform = `translateX(-${scrollPosition}px)`;
//     setTimeout(() => {
//       menu.style.transition = "transform 0.5s ease";
//     }, 0);
//     updateImageOpacity();
//   });

//   updateImageOpacity();
// });
