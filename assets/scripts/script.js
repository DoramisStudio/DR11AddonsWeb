const hero_top = document.querySelector("div.hero");
const hero_imgs = [
    { src: "./assets/media/images/blender render 332.png", bg: {top: "rgb(0 49 107)", bottom: "rgb(15 150 221)"}, accentColor: "rgb(29 115 255)" },
    { src: "./assets/media/images/blender render 333.png", bg: {top: "rgb(71 0 107)", bottom: "rgb(142 15 221)"}, accentColor: "rgb(157 0 255)" },
    { src: "./assets/media/images/blender render 334.png", bg: {top: "rgb(71 0 107)", bottom: "rgb(142 15 221)"}, accentColor: "rgb(157 0 255)" },
    { src: "./assets/media/images/blender render 335.png", bg: {top: "rgb(71 0 107)", bottom: "rgb(142 15 221)"}, accentColor: "rgb(157 0 255)" },
    { src: "./assets/media/images/blender render 337.png", bg: {top: "rgb(0 59 38)", bottom: "rgb(0 102 65)"}, accentColor: "rgb(0 142 90)" },
    { src: "./assets/media/images/blender render 338.png", bg: {top: "rgb(71 0 107)", bottom: "rgb(142 15 221)"}, accentColor: "rgb(157 0 255)" },
    { src: "./assets/media/images/blender render 339.png", bg: {top: "rgb(52 0 46)", bottom: "rgb(102 0 90)"}, accentColor: "rgb(130 0 114)" },
    { src: "./assets/media/images/blender render 340.png", bg: {top: "rgb(52 0 46)", bottom: "rgb(102 0 90)"}, accentColor: "rgb(130 0 114)" }
];
const hero_config = {
    index: 0
};

window.addEventListener("scroll", checkScroll);

function checkScroll() {
    hero_top.children[0].style.transform = `translateY(${window.scrollY / 2}px)`;

    blend.style.height = Math.min(100, window.scrollY / (hero_top.clientHeight / 2) * 50) + "%";

    if (window.scrollY > hero_top.clientHeight / 2) header.classList.add("filled");
    else header.classList.remove("filled");
}

function Init() {
    document.querySelector(".wrapper").style.overflow = "visible";
    document.querySelector(".loadingscr").classList.add("hide");
    hero_config.index = Math.floor(Math.random() * hero_imgs.length);
    document.body.style = `--accent-color: ${hero_imgs[hero_config.index].accentColor}; --bg-grad-top: ${hero_imgs[hero_config.index].bg.top}; --bg-grad-bottom: ${hero_imgs[hero_config.index].bg.bottom};`;
    hero_top.children[0].src = hero_imgs[hero_config.index].src;
    checkScroll();
}