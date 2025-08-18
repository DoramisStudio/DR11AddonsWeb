const header_setting = {
	is_mobile: false,
	mobile_menu_shown: false
};
anime.suspendWhenDocumentHidden = false;

function createIcon(name) {
	const icon = document.createElement("span");
	icon.classList = "material-symbols-rounded mat4";
	icon.style = "font-size: 14px;";
	icon.translate = "no";
	icon.textContent = name;
	return icon;
}

function createHeaderButton(v, el) {
	v.forEach(v => {
		const btnContainer = document.createElement("button");
		btnContainer.onclick = e => {
			location.assign(v.url.page_url);
		};
		const container = document.createElement("div");
		container.classList = "dmc-btn-container";
		btnContainer.appendChild(container);

		const title = document.createElement("h1");
		const icon = createIcon("chevron_right");
		title.textContent = v.title;
		title.appendChild(icon);
		container.appendChild(title);

		const desc = document.createElement("p");
		desc.textContent = v.short_desc;
		container.appendChild(desc);
		el.appendChild(btnContainer);
	});
}

async function refreshHeaderButtons() {
	const addonsContainer = document.getElementById("addonsHeaderButtons");
	const wipContainer = document.getElementById("wipHeaderButtons");

	if (addonsContainer && wipContainer) {
		addonsContainer.innerHTML = "";
		wipContainer.innerHTML = "";
		const res = await fetch("/assets/static/addons_list.json");
		
		if (res.ok) {
			const items = await res.json();
			const mainAddons = items.filter(p => p.tags.includes("featured") && p.type == "release" && p.url.page_url != "");
			const wipAddons = items.filter(p => p.tags.includes("featured") && p.type == "wip" && p.url.page_url != "");
			createHeaderButton(mainAddons, addonsContainer);
			createHeaderButton(wipAddons, wipContainer);
		}
	}
}

function checkHeaderScroll() {
	const hero_top = document.querySelector("div.hero");

	if (window.scrollY > window.innerHeight / 2) header.classList.add("filled");
	else header.classList.remove("filled");
}

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