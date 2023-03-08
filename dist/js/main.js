
const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	burger = document.querySelector('.header__burger'),
	wrapper = document.querySelector('.wrapper'),
	header = document.querySelector('.header');


body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}

	// =-=-=-=-=-=-=-=-=-=- <open menu in header> -=-=-=-=-=-=-=-=-=-=-

	if ($('.header__burger')) {
		menu.forEach(element => {
			element.classList.toggle('_active')
		})
	}

	// =-=-=-=-=-=-=-=-=-=- </open menu in header> -=-=-=-=-=-=-=-=-=-=-


	// =-=-=-=-=-=-=-=-=-=- <custom-select> -=-=-=-=-=-=-=-=-=-=-

	const customSelectTarget = $('.custom-select__target'),
	customSelectActive = document.querySelectorAll('.custom-select._active');

	if(customSelectTarget) {

		const parent = customSelectTarget.closest('.custom-select');
		parent.classList.toggle('_active');

	} else {
		
		customSelectActive.forEach(customSelectActive => {
			customSelectActive.classList.remove('_active')
		})

	}

	// =-=-=-=-=-=-=-=-=-=- </custom-select> -=-=-=-=-=-=-=-=-=-=-



	// =-=-=-=-=-=-=-=-=-=- <> -=-=-=-=-=-=-=-=-=-=-

	

	// =-=-=-=-=-=-=-=-=-=- </> -=-=-=-=-=-=-=-=-=-=-


})

/* document.addEventListener('DOMContentLoaded', function () {
	setTimeout(() => {
		wrapper.style.opacity = 1;
	},0)
}) */

// =-=-=-=-=-=-=-=-=-=-=-=- <scroll> -=-=-=-=-=-=-=-=-=-=-=-=

let pageCoords = 0;
header.addEventListener('transitionend', function () {
	if(Math.abs(pageCoords.y) <= 0 && !header.classList.contains('_active')) {
		html.style.setProperty("--height-header", header.offsetHeight + "px")
	}
})
function scroll() {
	pageCoords = body.getBoundingClientRect();
	
	if(Math.abs(pageCoords.y) > 0 && !header.classList.contains('_active')) {
		header.classList.add('_active');
	} else if(Math.abs(pageCoords.y) <= 0 && header.classList.contains('_active')) {
		header.classList.remove('_active');		
	}
}

scroll()

window.addEventListener('scroll', scroll)

// =-=-=-=-=-=-=-=-=-=-=-=- </scroll> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

let gamesCatalogTabsSlider = new Swiper('.games-catalog__tabs', {

	spaceBetween: 28,
	slidesPerView: "auto",
	centeredSlides: false,

	/* breakpoints: {
	  992: {
		slidesPerView: 3,
		centeredSlides: true,

	  },
	  600: {
		slidesPerView: 2,
		centeredSlides: false,
	  },
	} */
});

let popularGamesSlider = new Swiper('.popular-games__slider', {
	spaceBetween: 20,
	slidesPerView: 1,
	loopedSlides: 2,
	speed: 700,
	loop: true,
	on: {
		afterInit: function () {
			setTimeout(() => {
				popularGamesSlider.slidePrev(0)
				popularGamesSlider.slideNext(0)
			},0)
		},
	},
	breakpoints: {
		992: {
			slidesPerView: 4,
		},
		700: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
		450: {
			slidesPerView: 2,
			loopedSlides: null,
		},
	}
})

/* popularGamesSlider.on("afterInit", function () {

}) */

/* gamesCatalogTabsSlider.on('tap', function () {
	if(gamesCatalogTabsSlider.clickedSlide) {
		const activeSlide = gamesCatalogTabsSlider.el.querySelector('.swiper-slide._active'),
		clickedSlide = gamesCatalogTabsSlider.clickedSlide;

		if(activeSlide) {
			activeSlide.classList.remove('_active');
	
			setTimeout(() => {
				activeSlide.classList.remove('_filter');
			},200)
		}

		setTimeout(() => {
			setTimeout(() => {
				clickedSlide.classList.add('_filter');
			},200)
	
			setTimeout(() => {
				clickedSlide.classList.add('_active');
			},400)
		},0)
		
	}
}); */

let gamesCatalogBlock = new Swiper('.games-catalog__block', {
	slidesPerView: 1,
	effect: 'fade',
	autoHeight: true,
	fadeEffect: {
		crossFade: true
	},
	thumbs: {
		swiper: gamesCatalogTabsSlider
	}
})

let cheatGallery = new Swiper('.cheat__gallery--slider', {
	slidesPerView: 3,
	spaceBetween: 15,
	direction: "vertical",
	scrollbar: {
		el: ".cheat__gallery-scrollbar.swiper-scrollbar",
	//hide: true,
	},
	breakpoints: {
		550: {
			slidesPerView: "auto",
			direction: "horizontal",
		},
	}
});

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let resizeCheck = {}, windowSize, widthResizeCheck;

function resizeCheckFunc(size, minWidth, maxWidth) {
	if (windowSize <= size && (resizeCheck[String(size)] == true || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != false) {
		resizeCheck[String(size)] = false;
		maxWidth(); // < size
	}

	if (windowSize >= size && (resizeCheck[String(size)] == false || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != true) {
		resizeCheck[String(size)] = true;
		minWidth(); // > size
	}
}

let appendOnDesktop = [];
document.querySelectorAll('.append-on-desktop').forEach(appendElement => {
	appendOnDesktop.push([appendElement, document.querySelector(appendElement.dataset.appendOnDesktopTo), appendElement.closest('.append-on-desktop-wrapper')])
	delete appendElement.dataset.appendOnDesktopTo;
})

function resize() {

	if(windowSize != window.innerWidth) widthResizeCheck = true; else widthResizeCheck = false;
	windowSize = window.innerWidth

	html.style.setProperty("--height-screen", window.innerHeight + "px");

	if(widthResizeCheck) {
		html.style.setProperty("--height-header", header.offsetHeight + "px");
	}

	if(!html.classList.contains('fslightbox-open')) {
		html.style.setProperty("--width-scrollbar", window.innerWidth - body.offsetWidth + "px");
		//console.log(window.innerWidth - body.offsetWidth)
	}

	resizeCheckFunc(992,
		function () {  // screen > 992px

			Array.from(appendOnDesktop).forEach(appendOnDesktop => {
				if(appendOnDesktop[1]) {
					appendOnDesktop[1].append(appendOnDesktop[0]);
				}
			})

		},
		function () {  // screen < 992px
			
			Array.from(appendOnDesktop).forEach(appendOnDesktop => {
				if(appendOnDesktop[2]) {
					appendOnDesktop[2].append(appendOnDesktop[0]);
				}
			})

		}
	);

	resizeCheckFunc(550,
		function () {  // screen >

			if(cheatGallery && document.querySelector('.cheat__gallery--slider')) {
				cheatGallery.destroy(true, true);
				cheatGallery = new Swiper('.cheat__gallery--slider', {
					slidesPerView: "auto",
					spaceBetween: 15,
					scrollbar: {
						el: ".cheat__gallery-scrollbar.swiper-scrollbar",
					//hide: true,
					},
				});
			}

		},
		function () {  // screen <
			
			if(cheatGallery && document.querySelector('.cheat__gallery--slider')) {
				cheatGallery.destroy(true, true);
				cheatGallery = new Swiper('.cheat__gallery--slider', {
					slidesPerView: 3,
					spaceBetween: 15,
					direction: "vertical",
					scrollbar: {
						el: ".cheat__gallery-scrollbar.swiper-scrollbar",
						//hide: true,
					},
				});
			}

		}
	);

}

resize();

window.onresize = resize;

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=


const cheatCalculatorRadioItemInput = document.querySelectorAll('.cheat__calculator--radio-item input');

cheatCalculatorRadioItemInput.forEach(cheatCalculatorRadioItemInput => {
	cheatCalculatorRadioItemInput.addEventListener('change', function () {
		
		const cheatCalculator = cheatCalculatorRadioItemInput.closest('.cheat__calculator'),
			  cheatCalculatorInput = cheatCalculator.querySelector('.cheat__calculator--input');

		cheatCalculatorInput.value = cheatCalculatorRadioItemInput.value;
		
	})
})

