document.addEventListener('DOMContentLoaded', () => {
    // Button for search toggle
    let btnLogin = document.querySelector(".btn-search");
    let btn = document.querySelector(".search");

    btnLogin.addEventListener("click", () => {
        btn.classList.toggle("btn-click");
    });

    // Menu button functionality
    let menu = document.querySelector(".menu-items");
    let menubtn = document.querySelector(".menu");
    const menuIcon = document.getElementById("menu-icon");

    // Notification popup elements
    const notifiPage = document.querySelector('.notification-page');
    const notifiBtn = document.getElementById('notifi-btn');
    const imgSrc = document.getElementById('notifi-src');

    // Toggle menu and close other popups
    if (menubtn) {
        menubtn.addEventListener("click", () => {
            // Close notification popup if open
            if (notifiPage && notifiPage.classList.contains('notifi-active')) {
                notifiPage.classList.remove('notifi-active');
                if (imgSrc) imgSrc.setAttribute('src', 'assets/icons/notification.svg'); // Reset notification icon
            }

            // Toggle menu visibility
            if (menu) {
                menu.classList.toggle("active-menu");
                const currentSrc = menuIcon ? menuIcon.getAttribute('src') : '';

                if (currentSrc === 'assets/icons/menu.svg') {
                    menuIcon.setAttribute('src', 'assets/icons/close.svg');
                } else {
                    menuIcon.setAttribute('src', 'assets/icons/menu.svg');
                }
            }
        });
    }

    // Theme switcher functionality
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', function () {
        const themeIcon = document.getElementById('theme-icon');
        const body = document.body;

        // Toggle between sun and star icons
        if (themeIcon.src.includes('assets/icons/sun.svg')) {
            themeIcon.src = 'assets/icons/star.svg';  // Switch to dark mode icon (star)
            body.classList.add('dark-mode');  // Add dark mode class to body

            // Change background colors for specific classes
            document.querySelector('.nav2').style.backgroundColor = 'black'; // Dark background for .nav2
            body.style.backgroundColor = 'black'; // Dark background for body
            document.querySelector('.header1').style.backgroundColor = 'black'; // Dark background for header

        } else {
            themeIcon.src = 'assets/icons/sun.svg';  // Switch back to light mode icon (sun)
            body.classList.remove('dark-mode');  // Remove dark mode class from body
            
            // Reset background colors to original for specific classes
            document.querySelector('.nav2').style.backgroundColor = ''; // Reset background for .nav2
            body.style.backgroundColor = ''; // Reset background for body
            document.querySelector('.header1').style.backgroundColor = ''; // Reset background for header
        }
    });
}

    // Profile dropdown toggle
    const profileDropdown = document.querySelector('.profile-dropdown');
    const profileIcon = document.querySelector('.profile');

    if (profileIcon) {
        profileIcon.addEventListener('click', () => {
            // Close notification popup if open
            if (notifiPage && notifiPage.classList.contains('notifi-active')) {
                notifiPage.classList.remove('notifi-active');
                if (imgSrc) imgSrc.setAttribute('src', 'assets/icons/notification.svg'); // Reset notification icon
            }

            // Close menu if it's open
            if (menu && menu.classList.contains('active-menu')) {
                menu.classList.remove('active-menu');
                if (menuIcon) menuIcon.setAttribute('src', 'assets/icons/menu.svg'); // Reset menu icon
            }

            // Toggle profile dropdown
            if (profileDropdown) profileDropdown.classList.toggle('active');
        });
    }

    // Nav - active
    // Get all the nav links
    const navLinks = document.querySelectorAll('.navs a');

    // Get the current page's pathname
    const currentPage = window.location.pathname;

    // Loop through each link and check if it matches the current URL
    navLinks.forEach(link => {
        // Check if the link's href matches the current page
        if (link.href.includes(currentPage)) {
            // Add the active-nav class to the current page's link
            link.classList.add('active-nav');
        }
    });

    // Toggle notification popup and change icon on click
    if (notifiBtn) {
        notifiBtn.addEventListener('click', () => {
            // Close menu if it's open
            if (menu && menu.classList.contains('active-menu')) {
                menu.classList.remove('active-menu');
                if (menuIcon) menuIcon.setAttribute('src', 'assets/icons/menu.svg'); // Reset menu icon
            }

            // Close profile dropdown if it's open
            if (profileDropdown && profileDropdown.classList.contains('active')) {
                profileDropdown.classList.remove('active');
            }

            // Toggle the visibility of the notification page
            if (notifiPage) {
                notifiPage.classList.toggle('notifi-active');
            }

            // Log the current src for debugging
            const currentSrc = imgSrc ? imgSrc.getAttribute('src') : '';
            console.log(`Current Image Source: ${currentSrc}`); // Debugging log

            // Change the icon based on its current state directly
            if (currentSrc === 'assets/icons/notification.svg') {
                imgSrc.setAttribute('src', 'assets/icons2/notification-active.svg');
            } else {
                imgSrc.setAttribute('src', 'assets/icons/notification.svg');
            }
        });
    }
});
