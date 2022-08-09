import styles from './main.scss';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import SmoothScroll from 'smooth-scroll';
import FontAwesome from '@fortawesome/fontawesome-pro/js/all.js';

var scroll = new SmoothScroll('a[href*="#"]');

const bodyTag = document.body;
const headerContainer = document.getElementById("header-container");
const mobileMenuWithChildren = document.querySelectorAll('.mobile-menu-with-children');
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenuBox = document.getElementById("mobile-menu");
const mobileMenuItems = document.getElementById("mobile-items");
const mobileMenuClose = document.getElementById("mobile-menu-close");
const siteCopyright = document.getElementById('copyright-date');
const mediaQueryTablet = window.matchMedia('(min-width: 768px)')

for (var i = 0; i < mobileMenuWithChildren.length; i++) {
  mobileMenuWithChildren[i].addEventListener('click', e => {
      e.target.querySelector('.mobile-menu-children').classList.toggle('h-0');
      e.target.querySelector('.mobile-menu-children').classList.toggle('invisible');
      e.target.querySelector('.mobile-menu-children').classList.toggle('pt-0');
      e.target.querySelector('.mobile-menu-children').classList.toggle('pt-8');
      e.target.classList.toggle('font-bold');
      e.target.querySelector('.mobile-children-icon').classList.toggle('mobile-icon-active');
  });
}

mobileMenuToggle.addEventListener('click', e => {
  mobileMenuBox.classList.toggle('mobile-menu-collaspe');
  mobileMenuBox.scrollTop = 0;
  mobileMenuItems.classList.toggle('mobile-items-collaspe');
  mobileMenuItems.scrollTop = 0;
  mobileMenuClose.classList.toggle('mobile-menu-close-collaspe');
  if (e.target.getAttribute('status') == "closed") {
    e.target.src = "https://inside.bullochacademy.com/wp-content/uploads/2021/10/close-menu.png";
    e.target.setAttribute('status', 'open');
  } else {
    e.target.src = "https://inside.bullochacademy.com/wp-content/uploads/2021/10/open-menu-green.png";
    e.target.setAttribute('status', 'closed');
  }
  if (document.body.style.overflow == "hidden") {
    enableBodyScroll('body');
  } else {
    disableBodyScroll('body');
  }
});

mobileMenuClose.addEventListener('click', e => {
  mobileMenuBox.classList.toggle('mobile-menu-collaspe');
  mobileMenuBox.scrollTop = 0;
  mobileMenuItems.classList.toggle('mobile-items-collaspe');
  mobileMenuItems.scrollTop = 0;
  mobileMenuClose.classList.toggle('mobile-menu-close-collaspe');
  mobileMenuToggle.src = "https://inside.bullochacademy.com/wp-content/uploads/2021/10/open-menu.png";
  mobileMenuToggle.setAttribute('status', 'closed');
  enableBodyScroll('body');
});

var today = new Date();
var yyyy = today.getFullYear();

today = yyyy;
siteCopyright.innerText = today;

const observer = new IntersectionObserver( 
    ([e]) => {
      e.target.classList.toggle('isSticky', e.intersectionRatio < 1)
    },
    {threshold: [1]}
);

observer.observe(headerContainer);

const FloatLabel = (() => {
  
  // add active class and placeholder 
  const handleFocus = (e) => {
    const target = e.target;
    target.parentNode.classList.add('active');
    target.setAttribute('placeholder', target.getAttribute('data-placeholder'));
  };
  
  // remove active class and placeholder
  const handleBlur = (e) => {
    const target = e.target;
    if(!target.value) {
      target.parentNode.classList.remove('active');
    }
    target.removeAttribute('placeholder');    
  };  
  
  // register events
  const bindEvents = (element) => {
    const floatField = element.querySelector('input');
    floatField.addEventListener('focus', handleFocus);
    floatField.addEventListener('blur', handleBlur);    
  };
  
  // get DOM elements
  const init = () => {
    const floatContainers = document.querySelectorAll('.float-container');
    
    floatContainers.forEach((element) => {
      if (element.querySelector('input').value) {
          element.classList.add('active');
      }      
      
      bindEvents(element);
    });
  };
  
  return {
    init: init
  };
})();

FloatLabel.init();

let topbarDropdownTrigs = document.querySelectorAll('.topbar-menu-item-with-children');
for (var i = 0; i < topbarDropdownTrigs.length; i++) {
    let topbarDropdown = topbarDropdownTrigs[i].querySelector('.topbar-menu-hover');
    if (mediaQueryTablet.matches) {
      topbarDropdownTrigs[i].addEventListener("mouseenter", function( e ) {
        topbarDropdown.classList.add('active-topbar-menu-hover');
      });
      topbarDropdownTrigs[i].addEventListener("mouseleave", function( e ) {
          topbarDropdown.classList.remove('active-topbar-menu-hover');
      });
    }
    topbarDropdownTrigs[i].addEventListener("mouseleave", function( e ) {
      topbarDropdown.classList.remove('active-topbar-menu-hover');
    });
    topbarDropdownTrigs[i].addEventListener("click", function( e ) {
      topbarDropdown.classList.toggle('active-topbar-menu-hover');
    });
}

let desktopDropdownTrigs = document.querySelectorAll('.desktop-menu-item-with-children');
let desktopDropdownList = document.querySelectorAll('.desktop-menu-hover');

for (var i = 0; i < desktopDropdownTrigs.length; i++) {
    let dropdownParent = desktopDropdownTrigs[i];
    let desktopDropdown = desktopDropdownTrigs[i].querySelector('.desktop-menu-hover');
    desktopDropdownTrigs[i].addEventListener("click", function( e ) {
        if (e.target.classList.contains('active-desktop-menu-item')) {
            for (var i2 = 0; i2 < desktopDropdownTrigs.length; i2++) {
                desktopDropdownTrigs[i2].classList.remove('active-desktop-menu-item');
            }
            for (var i3 = 0; i3 < desktopDropdownList.length; i3++) {
                desktopDropdownList[i3].classList.remove('active-desktop-menu');
            }
            enableBodyScroll('body');
        } else if (e.target.classList.contains('desktop-menu-item') && !e.target.classList.contains('active-desktop-menu-item')) {
            for (var i2 = 0; i2 < desktopDropdownTrigs.length; i2++) {
                desktopDropdownTrigs[i2].classList.remove('active-desktop-menu-item');
            }
            for (var i3 = 0; i3 < desktopDropdownList.length; i3++) {
                desktopDropdownList[i3].classList.remove('active-desktop-menu');
            }
            if (e.target.classList.contains('desktop-menu-item')) {
                e.target.classList.add('active-desktop-menu-item');
            }
            desktopDropdown.classList.add('active-desktop-menu');
            console.log('fired')
            disableBodyScroll('body');
        }
    });
}

const closeMenuButton = document.querySelectorAll('.close-mega-menu-button');

for (var i = 0; i < closeMenuButton.length; i++) {
  closeMenuButton[i].addEventListener("click", function( e ) {
    for (var i2 = 0; i2 < desktopDropdownTrigs.length; i2++) {
        desktopDropdownTrigs[i2].classList.remove('active-desktop-menu-item');
    }
    for (var i3 = 0; i3 < desktopDropdownList.length; i3++) {
        desktopDropdownList[i3].classList.remove('active-desktop-menu');
    }
    enableBodyScroll('body');
  });
}