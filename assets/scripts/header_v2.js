var __data_addons = [];
const wpm = document.querySelector("div.wrapper main");

function headerLoop() {
    if (wpm.scrollTop > window.innerHeight/2) document.querySelectorAll("header.page-header").forEach(el => el.classList.remove("top"));
    else document.querySelectorAll("header.page-header").forEach(el => el.classList.add("top"));
    
    if (__pause_background_on_zero != undefined && __pause_background != undefined) {
        if (__pause_background_on_zero) __pause_background = wpm.scrollTop <= 0;
    }
    requestAnimationFrame(headerLoop);
}
requestAnimationFrame(headerLoop);

function createLinkLabel(url, text = "") {
    const container = document.createElement("div");
    container.classList = "link-button";
    const link = document.createElement("a");
    link.href = url;
    link.textContent = text;
    container.appendChild(link);
    return container;
}

function createIcon(name) {
    const span = document.createElement("span");
    span.textContent = name;
    span.classList = "material-symbols-rounded";
    return span;
}

// Request data
fetch("/assets/static/addons_list.json").then(async d => {
    __data_addons = await d.json();

    m_footer_addonsList.innerHTML = "";
    __data_addons.filter(p => p.type == "release" && p.tags.includes("featured")).forEach(v => {
        if (v.url.page_url) {
            const link = createLinkLabel(v.url.page_url, v.title);
            m_footer_addonsList.appendChild(link);
        }
    });
    addonsHeaderMenus.innerHTML = "";
    __data_addons.filter(p => p.type == "release" && p.tags.includes("featured")).forEach(v => {
        if (v.url.page_url) {
            const link = document.createElement("a");
            link.classList = "floating-menu-main-link";
            link.href = v.url.page_url;
            const icon = createIcon(v.icon);
            icon.classList.add("icon");

            const textc = document.createElement("div");
            textc.classList = "extg";

            const title = document.createElement("h3");
            title.textContent = v.title;
            const desc = document.createElement("p");
            desc.textContent = v.very_short_desc || v.short_desc;
            textc.append(title, desc);
            link.append(icon, textc);
            addonsHeaderMenus.appendChild(link);
        }
    });
    
    m_footer_wipAddonsList.innerHTML = "";
    __data_addons.filter(p => p.type == "wip" && p.tags.includes("featured")).forEach(v => {
        if (v.url.page_url) {
            const link = createLinkLabel(v.url.page_url, v.title);
            m_footer_wipAddonsList.appendChild(link);
        }
    });
    wipsHeaderMenus.innerHTML = "";
    __data_addons.filter(p => p.type == "wip" && p.tags.includes("featured")).forEach(v => {
        if (v.url.page_url) {
            const link = document.createElement("a");
            link.classList = "floating-menu-main-link";
            link.href = v.url.page_url;
            const icon = createIcon(v.icon);
            icon.classList.add("icon");

            const textc = document.createElement("div");
            textc.classList = "extg";

            const title = document.createElement("h3");
            title.textContent = v.title;
            const desc = document.createElement("p");
            desc.textContent = v.very_short_desc || v.short_desc;
            textc.append(title, desc);
            link.append(icon, textc);
            wipsHeaderMenus.appendChild(link);
        }
    });
});

(async _ => {
    const logo_images = Array.from(document.querySelectorAll("img[data-logo]"));
    const logo_images_accessory = Array.from(document.querySelectorAll("img[data-logo-accessory]"));
    logo_images.forEach(img => { img.setAttribute("aria-hidden", "true"); });
    logo_images_accessory.forEach(img => { img.setAttribute("aria-hidden", "true"); });
    const mainResourcesPaths = await (await fetch("/assets/static/primary.json")).json();
    
    logo_images.forEach(img => {
        const data_args = img.dataset.logo.split("/");
        const size = data_args[0];
        const type = data_args[1];
    
        img.src = `${mainResourcesPaths.main_logo[size][type]}`;
        img.removeAttribute("aria-hidden");
        // console.log(img);
    });
    logo_images_accessory.forEach(img => {
        const data_args = img.dataset.logoAccessory.split("/");
        const size = data_args[0];
        const type = data_args[1];
        
        if (mainResourcesPaths.main_logo_accessory.show) {
            img.src = `${mainResourcesPaths.main_logo_accessory[size][type]}`;
            img.removeAttribute("aria-hidden");
        }
    });
})();

if (document.getElementById("fullscreenBtn")) {
    fullscreenBtn.onclick = _ => {
        if (!document.fullscreenElement) {
            document.body.requestFullscreen();
        }
        else {
            document.exitFullscreen();
        }
    };
}