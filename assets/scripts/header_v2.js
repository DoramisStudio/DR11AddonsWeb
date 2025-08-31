var __data_addons = [];

function headerLoop() {
    if (window.scrollY > window.innerHeight/2) pageHeader.classList.remove("top");
    else pageHeader.classList.add("top");
    
    if (__pause_background_on_zero != undefined && __pause_background != undefined) {
        if (__pause_background_on_zero) __pause_background = window.scrollY <= 0;
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

    m_footer_wipAddonsList.innerHTML = "";
    __data_addons.filter(p => p.type == "wip" && p.tags.includes("featured")).forEach(v => {
        if (v.url.page_url) {
            const link = createLinkLabel(v.url.page_url, v.title);
            m_footer_wipAddonsList.appendChild(link);
        }
    });
});