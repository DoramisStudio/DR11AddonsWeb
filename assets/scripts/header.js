const header_setting = {
	current: ""
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
	var leave_timer;
	var is_container = false;
	const button = e.querySelector(".drop-menu-button");
	const container = e.querySelector(".drop-menu-container");
	
	button.addEventListener("mouseenter", (e_) => {
		changeState(true);
		window.clearTimeout(leave_timer);
	});
	button.addEventListener("mouseleave", (e_) => {
		if (!is_container) {
			leave_timer = setTimeout(() => {changeState(false);}, 1000);
		}
	});
	container.addEventListener("mouseenter", (e_) => {
		changeState(true);
		window.clearTimeout(leave_timer);
		is_container = true;
	});
	container.addEventListener("mouseleave", (e_) => {
		is_container = false;
		leave_timer = setTimeout(() => {changeState(false);}, 1000);
	});

	function changeState(state) {
		if (state) {
			anim = anime({
				targets: container,
				opacity: 1,
				duration: 100,
				easing: "linear"
			});
			anime.set(container, {
				pointerEvents: "all"
			})
		}
		else {
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