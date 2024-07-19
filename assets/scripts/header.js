const header_setting = {
    current: ""
};

function checkHeaderScroll() {
    const hero_top = document.querySelector("div.hero");

    if (window.scrollY > hero_top.clientHeight / 2) header.classList.add("filled");
    else header.classList.remove("filled");
}