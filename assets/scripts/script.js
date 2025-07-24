const __constants = {};
Object.defineProperty(__constants, 'page_loaded', {
	value: false,
	writable: false,
	configurable: true
});
var portraitMode = false;
const hero_top = document.querySelector("div.hero");
const hero_config = {
	index: 0
};
window.addEventListener("scroll", checkScroll);

const nimg = [
	"../assets/media/images/noimage_honoka.jpg",
	"../assets/media/images/noimage_you.jpg",
	"../assets/media/images/noimage_yoshiko.jpg",
	"../assets/media/images/nimg/0.jpg",
	"../assets/media/images/nimg/1.jpg",
	"../assets/media/images/nimg/2.jpg",
	"../assets/media/images/nimg/3.jpg"
];

function checkScroll() {
	hero_top.children[0].style.top = `${window.scrollY / 2}px`;

	blend.style.height = Math.min(100, window.scrollY / (hero_top.clientHeight / 2) * 50) + "%";

	checkHeaderScroll();
}

function scrollToId(id) {
	window.scrollTo(0, document.getElementById(id).getBoundingClientRect().y - header.getBoundingClientRect().height)
}

hero_top.children[0].onload = e => {
	const cec = document.getElementById("customElementContainer");
	let items = [hero_top.children[0]];
	if (cec) items.push(cec);
	anime.set(items, {
		opacity: 0
	});
	anime({
		targets: items,
		opacity: 1,
		delay: (v, i) => {
			return 500 + i * 500;
		},
		easing: "easeOutCubic",
		duration: 500
	});
	const easingList = [
		{ scale: [1.1, 1] },
		{ translateX: ["-2vw", "0vw"] },
		{ translateX: ["2vw", "0vw"] },
		{ translateY: ["-2vh", "0vh"] },
		{ translateY: ["2vh", "0vh"] }
	];
	anime({
		...{targets: items,
		delay: (v, i) => {
			return 500 + i * 500;
		},
		easing: "spring(1, 80, 10, 0)",
		duration: 1000},
		...easingList[Math.floor(Math.random() * easingList.length)]
	});
};

function checkOrientation() {
	return window.innerWidth / window.innerHeight < 1 ? 0 : 1;
}

async function Init() {
	const cec = document.getElementById("customElementContainer");
	const hl = document.getElementById("heroLabel");
	await refreshHeaderButtons();
	Object.defineProperty(__constants, 'page_loaded', {
		value: true,
		writable: false,
		configurable: true
	});
	document.querySelector(".wrapper").style.overflow = "visible";
	document.querySelector(".loadingscr").classList.add("hide");
	hero_config.index = Math.floor(Math.random() * hero_imgs.length);
	document.body.style.setProperty("--accent-color", hero_imgs[hero_config.index].accentColor);
	document.body.style.setProperty("--bg-grad-top", hero_imgs[hero_config.index].bg.top);
	document.body.style.setProperty("--bg-grad-bottom", hero_imgs[hero_config.index].bg.bottom);
	hero_top.children[0].src = hero_imgs[hero_config.index].src;

	if (cec) {
		cec.innerHTML = "";
		if (Object.hasOwn(hero_imgs[hero_config.index], "elements")) {
			hero_imgs[hero_config.index].elements.forEach(v => {
				if (v.type == "text") {
					const text = document.createElement("span");
					text.style = "position: absolute;";
					if (v.position) {
						if (v.anchor?.[0] == 0) text.style.left = `${v.position[0] || 0}${v.positionUnits?.[0] || "vw"}`;
						else if (v.anchor?.[0] == 1) text.style.right = `${v.position[0] || 0}${v.positionUnits?.[0] || "vw"}`;
						if (v.anchor?.[1] == 0) text.style.top = `${v.position[1] || 0}${v.positionUnits?.[1] || "vh"}`;
						else if (v.anchor?.[1] == 1) text.style.bottom = `${v.position[1] || 0}${v.positionUnits?.[1] || "vh"}`;
					}
					if (v.size) {
						text.style.width = v.size[0] >= 0 ? v.size[0]+"vw" : "auto";
						text.style.height = v.size[1] >= 0 ? v.size[1]+"vw" : "auto";
					}
					text.style.fontWeight = v.weight || 400;
					text.style.fontSize = `${v.font?.size || 0}vw`;
					text.style.textAlign = v.font?.align || "left";
					text.style.color = v.font?.color || "transparent";
					text.style.webkitTextStroke = `${v.outline?.width || 0}vw ${v.outline?.color || "transparent"}`;
					text.textContent = v.text;
					cec.appendChild(text);
				}
			});
		}
	}
	if (hl) {
		hl.textContent = hero_imgs[hero_config.index].label || "";
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
		
		const openUrl = button.onclick;
		button.ondblclick = e => {
			openUrl();
		};
		button.onclick = e => {
			changeState(true);
			window.clearTimeout(leave_timer);
		};
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

	checkScroll();
}

window.onresize = (e) => {
	document.body.style.setProperty("--zoom-level", window.devicePixelRatio);
	if (window.innerWidth / window.innerHeight < 1) {
	}
};
// Desktop@RikoRiko