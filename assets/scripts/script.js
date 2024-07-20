const hero_top = document.querySelector("div.hero");
const hero_config = {
	index: 0
};
window.addEventListener("scroll", checkScroll);

function checkScroll() {
	hero_top.children[0].style.transform = `translateY(${window.scrollY / 2}px)`;

	blend.style.height = Math.min(100, window.scrollY / (hero_top.clientHeight / 2) * 50) + "%";

	checkHeaderScroll();
}

function Init() {
	document.querySelector(".wrapper").style.overflow = "visible";
	document.querySelector(".loadingscr").classList.add("hide");
	hero_config.index = Math.floor(Math.random() * hero_imgs.length);
	document.body.style = `--accent-color: ${hero_imgs[hero_config.index].accentColor}; --bg-grad-top: ${hero_imgs[hero_config.index].bg.top}; --bg-grad-bottom: ${hero_imgs[hero_config.index].bg.bottom};`;
	hero_top.children[0].src = hero_imgs[hero_config.index].src;
	checkScroll();
}
// Desktop@RikoRiko