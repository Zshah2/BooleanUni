document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    const dropdowns = document.querySelectorAll('.has-dropdown');
  
    // Toggle menu
    hamburger.addEventListener('click', function () {
      menu.classList.toggle('active');
      hamburger.classList.toggle('open');
    });
  
    // Mobile dropdown toggle
    dropdowns.forEach(drop => {
      drop.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          drop.classList.toggle('active');
        }
      });
    });
  });
  