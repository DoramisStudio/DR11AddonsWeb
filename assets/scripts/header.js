const header_setting = {
	is_mobile: false,
	mobile_menu_shown: false
};
anime.suspendWhenDocumentHidden = false;

function checkHeaderScroll() {
	const hero_top = document.querySelector("div.hero");

	if (window.scrollY > hero_top.clientHeight / 2) header.classList.add("filled");
	else header.classList.remove("filled");
}

// Header drop menu
document.querySelectorAll(".header .drop-menu").forEach((e) => {
	var anim;
	var buttonanim;
	var leave_timer;
	var is_container = false;
	var is_shown = false;
	const button = e.querySelector(".drop-menu-button");
	const container = e.querySelector(".drop-menu-container");
	const buttons = container.querySelectorAll("button");
	
	button.addEventListener("mouseenter", (e_) => {
		changeState(true);
		window.clearTimeout(leave_timer);
	});
	button.addEventListener("mouseleave", (e_) => {
		if (!is_container) {
			leave_timer = setTimeout(() => {changeState(false);}, 100);
		}
	});
	container.addEventListener("mouseenter", (e_) => {
		changeState(true);
		window.clearTimeout(leave_timer);
		is_container = true;
	});
	container.addEventListener("mouseleave", (e_) => {
		is_container = false;
		leave_timer = setTimeout(() => {changeState(false);}, 100);
	});

	function changeState(state) {
		if (state) {
			if (!is_shown) {
				is_shown = true;
				anim = anime({
					targets: container,
					opacity: 1,
					duration: 100,
					easing: "linear"
				});
				anime.set(container, {
					pointerEvents: "all"
				})
				buttonanim = anime({
					targets: buttons,
					opacity: [0, 1],
					translateX: [-20, 0],
					delay: anime.stagger(100),
					duration: 1000
				});
			}
		}
		else {
			is_shown = false;
			anim = anime({
				targets: container,
				opacity: 0,
				duration: 100,
				easing: "linear"
			});
			anime.set(container, {
				pointerEvents: "none"
			})
		}
	}
});

var mobile_menu_anim;
function toggleMobileMenu(forceState) {
	if (forceState != null) {
		if (typeof(forceState) == "boolean") {
			header_setting.mobile_menu_shown = forceState;
		}
		else {
			throw TypeError("forceState value must be a Boolean");
		}
	}
	else {
		header_setting.mobile_menu_shown = !header_setting.mobile_menu_shown;
	}

	// Control the UI
	const container = document.querySelector("div.header-menu");
	if (header_setting.mobile_menu_shown) {
		mobile_menu_anim = anime({
			targets: container,
			opacity: 1,
			duration: 100,
			easing: "linear"
		});
		anime.set(container, {
			pointerEvents: "all"
		});
	}
	else {
		mobile_menu_anim = anime({
			targets: container,
			opacity: 0,
			duration: 100,
			easing: "linear"
		});
		anime.set(container, {
			pointerEvents: "none"
		});
	}
}
function CheckMobile() {
	if (window.innerWidth <= 800) header_setting.is_mobile = true;
	else header_setting.is_mobile = false;
}
window.addEventListener("resize", () => {
	CheckMobile();
});
function UpdateLoop() {
	if (!header_setting.is_mobile) {
		toggleMobileMenu(false);
	}
	
	requestAnimationFrame(UpdateLoop);
}
toggleMobileMenu(false);
CheckMobile();
UpdateLoop();