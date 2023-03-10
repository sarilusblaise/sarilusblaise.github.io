// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

const DomElement = (selector) => {
	try {
		if (document.querySelector(selector))
			return document.querySelector(selector);
		throw new Error(`${selector} does'nt exist or it's not a valid selector`);
	} catch (err) {
		console.log(err);
	}
};

//**************copyright date***********//
const date = DomElement("#copyright-date");
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = DomElement(".nav-toggleBtn");
const linksContainer = DomElement(".links");

navToggle.addEventListener("click", function () {
	linksContainer.classList.toggle("show-links");
	// console.log(linksContainer.getBoundingClientRect());
});

// ********** fixed navbar ************

const navbar = DomElement("#navbar");
const topLink = DomElement(".top-link");

window.addEventListener("scroll", function () {
	const scrollHeight = window.pageYOffset;
	const navHeight = navbar.getBoundingClientRect().height;
	if (scrollHeight > navHeight) {
		navbar.classList.add("fixed-nav");
	} else {
		navbar.classList.remove("fixed-nav");
	}
	// setup back to top link

	if (scrollHeight > 500) {
		topLink.classList.add("show-link");
	} else {
		topLink.classList.remove("show-link");
	}
});

// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
	link.addEventListener("click", (e) => {
		// prevent default
		e.preventDefault();
		// navigate to specific spot
		const id = e.currentTarget.getAttribute("href").slice(1);
		const element = document.getElementById(id);
		const containerHeight = linksContainer.getBoundingClientRect().height;
		const navHeight = navbar.getBoundingClientRect().height;
		console.log(navHeight);
		const fixedNav = navbar.classList.contains("fixed-nav");
		let position = element.offsetTop - navHeight;
		if (!fixedNav) {
			position -= navHeight;
		}

		if (navHeight > 90) {
			position += containerHeight;
		}

		window.scrollTo({
			left: 0,
			top: position,
		});
		// close nav
		linksContainer.classList.remove("show-links");
	});
});

// project tabs
const projectItems = document.querySelectorAll(".project-item");
//const btns = document.querySelectorAll(".tab-btn");
projectItems.forEach((projectItem) => {
	projectItem.addEventListener("click", function (e) {
		const contents = e.currentTarget.querySelectorAll(".content");
		const btns = e.currentTarget.querySelectorAll(".tab-btn");
		const id = e.target.dataset.id;
		if (id) {
			// remove selected from other buttons
			btns.forEach(function (btn) {
				btn.classList.remove("active");
			});
			e.target.classList.add("active");
			// hide other articles
			contents.forEach(function (content) {
				content.classList.remove("active");
			});
			const element = document.getElementById(id);
			element.classList.add("active");
		}
	});
});
