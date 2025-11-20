const heroContents = __banner_image_list || [
    { imageSrc: "/assets/media/images/blender render 419.png", duration: 10, title: "SHD 5", desc: "Versi ke 5 dari SHD Series, mencangkup interior dan eksterior yang lebih detail.", viewMoreUrl: "/pages/shd5/" },
    { imageSrc: "/assets/media/images/shd42_4.png", duration: 10, title: "SHD 4.2", desc: "Versi ke 4.2 dari SHD Series, dari pembaruan skrip, aksesoris hingga modul basuri.", viewMoreUrl: "/pages/shd4.2/" },
    { imageSrc: "/assets/media/images/shd41.jpg", duration: 10, title: "SHD 4", desc: "Versi ke 4 dari SHD Series, penambahan aksesoris dan pembaruan interior yang lebih detail.", viewMoreUrl: "/pages/shd4.0/" },
];
var heroIdx = 0;
const heroImg = document.querySelector("img.hero-image");
const slideshowBtnContainer = document.querySelector("div.slideshow-nav");
var heroAnimTemp = null;
var heroSlideshowCurrentBtn = null;
var heroSlideshowTime = 0;
var heroBtnHover = false;
var heroSlideshowTimeHalt = false;

if (document.getElementById("heroOpenLink")) heroOpenLink.onclick = _ => {
    const selected = heroContents[heroIdx];
    if (selected.viewMoreUrl) {
        location.assign(selected.viewMoreUrl);
    }
};

function setSlideshowPoint(index) {
    const selected = heroContents[index];
    if (heroSlideshowCurrentBtn) heroSlideshowCurrentBtn.style.setProperty("--progress", "0");
    heroSlideshowUpdateBtn(index);
    if (heroAnimTemp) {
        heroAnimTemp.pause();
        anime.remove(heroAnimTemp);
    }

    if (document.getElementById("heroTitle")) heroTitle.textContent = selected.title;
    if (document.getElementById("heroDesc")) heroDesc.textContent = selected.desc;

    if (!heroImg.naturalWidth) {
        anime.set(heroImg, { opacity: 0 });
        heroImg.src = selected.imageSrc;
    }
    else {
        anime({
            targets: heroImg,
            opacity: 0,
            duration: 1000,
            easing: "easeInCubic",
            complete: _ => {
                heroImg.src = selected.imageSrc;
            }
        });
    }
    
    // console.log(heroSlideshowCurrentBtn);
    t = {progress: 0};
    heroAnimTemp = anime({
        targets: t,
        progress: [0, 1],
        duration: selected.duration * 1000,
        easing: 'linear',
        autoplay: false,
        update: _ => {
            heroSlideshowCurrentBtn.style.setProperty('--progress', t.progress);
            // heroSlideshowUpdateBtn(index);
        },
        complete: _ => {
            heroIdx = (heroIdx + 1) % heroContents.length;
            setSlideshowPoint(heroIdx);
        }
    });
}

function heroSlideshowUpdateBtn(idx) {
    Array.from(slideshowBtnContainer.children).forEach((e, i) => {
        if (i == idx) {
            e.classList.add("selected");
            heroSlideshowCurrentBtn = e;
        }
        else e.classList.remove("selected");
    });
}

function initHeroSlideshow() {
    // If the new image is loaded, display the image
    heroImg.onload = _ => {
        anime({
            targets: heroImg,
            opacity: [0, 1],
            scale: [1.05, 1],
            duration: 1000,
            easing: "easeOutCubic"
        });
    };
    anime.set(heroImg, { opacity: 0 });
    setSlideshowPoint(0);

    slideshowBtnContainer.innerHTML = "";
    heroContents.forEach((v, i) => {
        const btn = document.createElement("button");
        const c = document.createElement("div");
        const pgb = document.createElement("span");
        c.appendChild(pgb);
        btn.appendChild(c);
        slideshowBtnContainer.appendChild(btn);

        btn.onclick = _ => {
            heroIdx = i;
            console.log(heroIdx);
            setSlideshowPoint(heroIdx);
        };
        btn.onpointerover = _ => {
            heroBtnHover = true;
            heroAnimTemp.pause();
            heroAnimTemp.seek(0);
        };
        btn.onpointerout = _ => {
            heroBtnHover = false;
            heroAnimTemp.play();
        };
    });
    setTimeout(_ => { heroSlideshowUpdateBtn(heroIdx); }, 0);
}

initHeroSlideshow();

function heroRaf(t) {
    if (heroBtnHover || heroSlideshowTimeHalt) {
        heroAnimTemp.pause();
    }
    else heroAnimTemp.play();

    requestAnimationFrame(heroRaf);
}
requestAnimationFrame(heroRaf);