'use strict';

// Select DOM Items
const menuBtn = document.querySelector('.menu-btn'),
      menu = document.querySelector('.menu'),
      menuNav = document.querySelector('.menu-nav'),
      menuBranding = document.querySelector('.menu-branding'),
      navItems = document.querySelectorAll('.nav-item');

// Set Initial State of Menu
let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    if(!showMenu) {
        menuBtn.classList.add('close');
        menu.classList.add('show');
        menuNav.classList.add('show');
        menuBranding.classList.add('show');
        navItems.forEach(item => item.classList.add('show'));

        // Set Menu State
        showMenu = true;
        } else {
        menuBtn.classList.remove('close');
        menu.classList.remove('show');
        menuNav.classList.remove('show');
        menuBranding.classList.remove('show');
        navItems.forEach(item => item.classList.remove('show'));

        // Set Menu State
        showMenu = false;  
        }
}

// Secret Places - Gallery
const dataSlides = [
    {
        coords: {lat: -7.440434, lng: 34.895823},
        description: '<img src="images/secret-places/savanna.jpeg" alt="Savanna, Africa">'
    },
    {
        coords: {lat: 36.109017, lng: -112.148929},
        description: '<img src="images/secret-places/canyon.jpeg" alt="Canyon, USA">'
    },
    {
        coords: {lat: 53.549630, lng: 21.605829},
        description: '<img src="images/secret-places/lake.jpeg" alt="Lake, Poland">'
    }
];

// HTML TEMPLATE
(function () {
    const carouselGallery = document.getElementById('carouselSlide').innerHTML;
    
    Mustache.parse(carouselGallery);
    
    let listGallery = '';
    
    for (let i = 0; i < dataSlides.length; i++) {
        listGallery += Mustache.render(carouselGallery, dataSlides[i]);
    } 
    lolek.insertAdjacentHTML('beforeend', listGallery);
})();

// CAROUSEL
const elem = document.querySelector('.main-carousel');
const flkty = new Flickity( elem, {
    // options
    cellAlign: 'left',
    wrapAround: true,
    contain: true,
    pageDots: false,
    hash: true
});

// MAP
window.initMap = function() {
	
    const map = new google.maps.Map(document.querySelector('#map'), {
        zoom: 10,
		center: dataSlides[0].coords
    });

	for (let i=0; i < dataSlides.length; i++ ){
		const marker = new google.maps.Marker({
			position: dataSlides[i].coords,
			map: map
		})
    	marker.addListener('click', function(){
			flkty.selectCell(i);
        })
	}
    flkty.on( 'change', function( index ) {
        map.panTo(dataSlides[index].coords); 
        map.setZoom(7);
    });
}