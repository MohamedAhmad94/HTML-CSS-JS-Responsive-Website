// Check if there's localStorage color option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {

    document.documentElement.style.setProperty('--main-color', mainColors);

    document.querySelectorAll('.colors-list li').forEach(element => {
        element.classList.remove("active");

        if (element.dataset.color === mainColors) {

            element.classList.add("active");
        }
    });
}

// Random background option 
let backgroundOption = true;

let backgroundInterval;

let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {

    document.querySelectorAll("random-backgrounds span").forEach(element => {

        element.classList.remove("active");
    });

    if (backgroundLocalItem === 'true') {

        backgroundOption = true;

        document.querySelector('random-backgrounds yes').classList.add("active");
    } else {

        backgroundOption = false;

        document.querySelector('random-backgrounds no').classList.add("active");        
    }
}

// Click on toggle settings gear 
document.querySelector(".toggle-settings .fa-gear").onclick = function () {

    this.classList.toggle("fa-spin");

    document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors 
const colrosList = document.querySelectorAll(".colors-list li");

colrosList.forEach(li => {

    li.addEventListener("click", (e) => {

        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        localStorage.setItem("color_option", e.target.dataset.color);

        handleActive(e);
    });
});


// Switch random background option 
const randomBackground1 = document.querySelectorAll(".random-backgrounds span");

randomBackground1.forEach(span => {

    span.addEventListener("click", (e) => {

        handleActive(e);

        if (e.target.dataset.background === 'yes') {

            backgroundOption = true;

            randomizeImages();

            localStorage.setItem("background_option", true);

        } else {

            backgroundOption = false;

            clearInterval(backgroundInterval);

            localStorage.setItem("background_option", false);
        }
    });
});


// Function to randomize images 
let landingPage = document.querySelector(".landing-page");

let images = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function  randomizeImages() {

    if (backgroundOption === true) {

        backgroundInterval = setInterval(() => {

            let randomNumber = Math.floor(Math.random() * images.length);

            landingPage.style.backgroundImage = 'url("imgs/' + images[randomNumber] + '")';
            
        }, 10000)
    }
}

randomizeImages();

// Skills section 
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    let skillsOffsetTop = ourSkills.offsetTop;

    let skillsOuterHeight = ourSkills.offsetHeight;

    let windowHeight = this.innerHeight;

    let windowScrollTop = this.pageYOffset; // pageYOffset depricated 

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight + windowHeight)) {

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;
        });
    }
}

// Create popup with images 
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    image.addEventListener("click", (e) => {

        let overlay = document.createElement("div");

        overlay.className = "popup-overlay";

        document.body.appendChild(overlay);

        let popupBox = document.createElement("div");

        popupBox.className = "popup-box";

        if (img.alt !== null) {

            let imageHeading = document.createElement("h3");

            let imageText = document.createTextNode(img.alt);

            imageHeading.appendChild(imageText);

            popupBox.appendChild(imageHeading);
        }

        let popupImage = document.createElement("img");

        popupImage.src = img.src; 

        popupBox.appendChild(popupImage);

        document.body.appendChild(popupBox);

        let closeButton = document.createElement("span");

        let closeButtonText = document.createTextNode("X");

        closeButton.appendChild(closeButtonText);

        closeButton.className = 'close-button';

        popupBox.appendChild(closeButton);

    });
});

// The close popup 

document.addEventListener("click", function (e) {

    if (e.target.className == 'close-button') {

        e.target.parentNode.remove();

        document.querySelector("pop-overlay").remove();
    }
});

// Scroll Function  
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

const allLinks = document.querySelectorAll(".links a");

function scrolltoSomewhere(elements) {

    elements.forEach(ele => {

        ele.addEventListener("click", (e) => {

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({

                behavior: 'smooth'
            });
        });
    });
}

scrolltoSomewhere(allBullets);
scrolltoSomewhere(allLinks);


// Handle active state
function handleActive(ev) {

    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        
        element.classList.remove("active");
    });

    ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {

    bulletsSpan.forEach(span => {
        
        span.classList.remove("active");
    });

    if (bulletLocalItem === 'block') {

        bulletsContainer.style.display = 'block';

        document.querySelector(".bullets-option .yes").classList.add("active");

    } else {

        bulletsContainer.style.display = 'none';

        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach(span => {

    span.addEventListener("click", (e) => {
  
      if (span.dataset.display === 'show') {
  
        bulletsContainer.style.display = 'block';
  
        localStorage.setItem("bullets_option", 'block');
  
      } else {
  
        bulletsContainer.style.display = 'none';
  
        localStorage.setItem("bullets_option", 'none');
  
      }
  
      handleActive(e);
  
    });
  
});


// Reset Button 
document.querySelector("reset-options").onclick = function () {

    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");

    window.location.reload();
}

// Toggle Menu
let toggleButton = document.querySelector(".toggle-menu");

let toggleLinks = document.querySelector(".links");

toggleButton.onclick = function (e) {

    e.stopPropagation();

    this.classList.toggle("menu-active");

    toggleLinks.classList.toggle("open");

};

// Click anywhere except menu and toggle button 
document.addEventListener("click", (e) => {

    if (e.target !== toggleButton && e.target !== toggleLinks) {
  
      if (toggleLinks.classList.contains("open")) {
  
         toggleButton.classList.toggle("menu-active");
  
         toggleLinks.classList.toggle("open");
  
      }  
    }  
  });  

  // Stop propagation on menu 
  toggleLinks.onclick = function (e) {

    e.stopPropagation();
  }


