const hero_top = document.querySelector("div.hero");
const hero_config = {
	index: 0
};
window.addEventListener("scroll", checkScroll);

const nimg = [
	"../assets/media/images/noimage_honoka.jpg",
	"../assets/media/images/noimage_you.jpg",
	"../assets/media/images/noimage_yoshiko.jpg"
];

function checkScroll() {
	hero_top.children[0].style.transform = `translateY(${window.scrollY / 2}px)`;

	blend.style.height = Math.min(100, window.scrollY / (hero_top.clientHeight / 2) * 50) + "%";

	checkHeaderScroll();
}

function scrollToId(id) {
	window.scrollTo(0, document.getElementById(id).getBoundingClientRect().y - header.getBoundingClientRect().height)
}

function Init() {
	document.querySelector(".wrapper").style.overflow = "visible";
	document.querySelector(".loadingscr").classList.add("hide");
	hero_config.index = Math.floor(Math.random() * hero_imgs.length);
	document.body.style.setProperty("--accent-color", hero_imgs[hero_config.index].accentColor);
	document.body.style.setProperty("--bg-grad-top", hero_imgs[hero_config.index].bg.top);
	document.body.style.setProperty("--bg-grad-bottom", hero_imgs[hero_config.index].bg.bottom);
	hero_top.children[0].src = hero_imgs[hero_config.index].src;
	checkScroll();
}

window.onresize = (e) => {
	document.body.style.setProperty("--zoom-level", window.devicePixelRatio);
};
// Desktop@RikoRiko