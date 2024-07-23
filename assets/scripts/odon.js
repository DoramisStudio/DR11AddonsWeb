fetch("../assets/static/addons_list.json").then(async enc => {
	const data = await enc.json();
	if (page_odon == "addons") {
		const addons = data.filter(task => task.type === "release");
		buildOdonList(addons.filter(task => !task.tags.includes("featured")));
		buildFeaturedList(addons.filter(task => task.tags.includes("featured")));
	}
	else if (page_odon == "wip") {
		const addons = data.filter(task => task.type === "wip");
		buildOdonList(addons.filter(task => !task.tags.includes("featured")));
		buildFeaturedList(addons.filter(task => task.tags.includes("featured")));
	}
}).catch(e => {
	console.error(e);
	console.log("Assuming list is offline");
});

function isHTMLElement(element) {
	return element && (
		typeof element === 'object' &&
		element.nodeType === Node.ELEMENT_NODE &&
		typeof element.tagName === 'string' &&
		element.tagName !== 'undefined'
	);
}

function createIconElement(iconName) {
	const icon = document.createElement("span");
	icon.classList = "material-symbols-rounded mat4";
	icon.style = "font-size: 14px;";
	icon.translate = "no";
	icon.textContent = iconName;
	return icon;
}

function createPageToggle(labelOn, labelOff, messageOn, messageOff) {
	const container = document.createElement("label");
	container.classList = "page-toggle";
	// Checkbox
	const cb = document.createElement("input");
	cb.type = "checkbox";
	cb.classList = "checkbox";
	cb.setAttribute("checked", "");
	container.append(cb);
	// Buttons
	const btn = document.createElement("div");
	btn.classList = "button";
	const spon = document.createElement("span");
	spon.classList = "on";
	spon.textContent = labelOn;
	btn.append(spon);
	const spoff = document.createElement("span");
	spoff.classList = "off";
	spoff.textContent = labelOff;
	btn.append(spoff);
	container.append(btn);
	// Tab content
	// On
	const tabon = document.createElement("div");
	tabon.classList = "tab-content on";
	const tonul = document.createElement("ul");
	messageOn.forEach(msg => {
		const li = document.createElement("li");
		li.textContent = msg;
		tonul.append(li);
	});
	tabon.append(tonul);
	container.append(tabon);
	// Off
	const taboff = document.createElement("div");
	taboff.classList = "tab-content off";
	const tofful = document.createElement("ul");
	messageOff.forEach(msg => {
		const li = document.createElement("li");
		li.textContent = msg;
		tofful.append(li);
	});
	taboff.append(tofful);
	container.append(taboff);
	return container;
}

function createLabeledGroup(label, content, classList = "") {
	if (typeof(label) !== "string") throw new TypeError('Argument 1, Expected a String.');
	if (!isHTMLElement(content)) throw new TypeError('Argument 2, Expected a HTML element, but got something else.');
	if (typeof classList !== "string") throw new TypeError('Argument 3, Expected a String.');
	
	// Base
	const container = document.createElement("div");
	container.classList = "labeled-group";

	// Label
	const lbl = document.createElement("div");
	lbl.classList = "label";
	lbl.textContent = label;
	container.append(lbl);

	// Content
	const content_ = document.createElement("div");
	content_.classList = "content";
	content_.append(content);
	container.append(content_);

	return container;
}

function createSlideshow(images, classList = "") {
	if (!Array.isArray(images)) throw new TypeError('Argument 1, Expected an Array, but got something else.');
	if (typeof classList !== "string") throw new TypeError('Argument 2, Expected a String.');
	const multiple = images.length > 1 ? true : false;
	var index = 0;

	console.log(multiple);

	// Container
	const container = document.createElement("div");
	container.classList = "image-slideshow " + classList;

	// Images container
	const images_container = document.createElement("div");
	images_container.classList = "images";

	const image = document.createElement("img");
	images_container.append(image);
	container.append(images_container);
	
	// Images processor
	if (!multiple) {
		image.src = (images[0] && images[0] != "") ? images[0] : nimg[Math.floor(Math.random() * nimg.length)];
	}
	else {
		const control = document.createElement("div");
		control.classList = "ui-controls";
		
		const nav_arrow = document.createElement("div");
		nav_arrow.classList = "nav-arrow";
		
		const prev_btn = document.createElement("button");
		prev_btn.append(createIconElement("arrow_left"));
		nav_arrow.append(prev_btn);
		
		const next_btn = document.createElement("button");
		next_btn.append(createIconElement("arrow_right"));
		nav_arrow.append(next_btn);
		control.append(nav_arrow);
		container.append(control);
		
		function UpdateImage() {
			image.src = images[index];
		}
		UpdateImage();

		prev_btn.addEventListener("click", () => {
			index = index > 0 ? index - 1 : images.length - 1;
			UpdateImage();
		});
		next_btn.addEventListener("click", () => {
			index = index < images.length - 1 ? index + 1 : 0;
			UpdateImage();
		});
	}

	return container;
}

// Build Addons list function
function buildOdonList(json) {
	odon_list.innerHTML = "";
	//console.log(json);
	json.forEach(meta => {
		const container = document.createElement("div");
		container.classList = "list-item";

		// Main left side (Thumbnail & Button actions)
		const lside = document.createElement("div");
		lside.classList = "lside";
		// Thumbnail
		const thumb = createSlideshow(meta.thumbnail, "thumb");
		lside.append(thumb);
		// Button group
		const buttong = document.createElement("div");
		buttong.classList = "button-group";
		// Download Button
		const button_dl = document.createElement("button");
		button_dl.classList = "square aspect-free download-btn";
		if (meta.url.download_url != "") {
			button_dl.title = "Download";
			button_dl.onclick = () => {
				location.assign(meta.url.download_url);
			}
		}
		else {
			button_dl.title = "Download (Not available)";
			button_dl.setAttribute("disabled", "");
		}
		button_dl.append(createIconElement("download"));
		buttong.append(button_dl);
		// Page Button
		const button_pg = document.createElement("button");
		button_pg.classList = "square aspect-free page-btn";
		if (meta.url.page_url != "") {
			button_pg.title = "Open page";
			button_pg.onclick = () => {
				location.assign(meta.url.page_url);
			}
		}
		else {
			button_pg.title = "Open page (Not available)";
			button_pg.setAttribute("disabled", "");
		}
		button_pg.append(createIconElement("open_in_new"));
		buttong.append(button_pg);
		// Append all
		lside.append(buttong);
		container.append(lside);

		// Right side (Title, Status, etc)
		const rdata = document.createElement("div");
		rdata.classList = "data";
		// Title
		const title = document.createElement("h1");
		title.classList = "title";
		title.textContent = meta.title + " ";
		// Status
		const status = document.createElement("span");
		status.classList = "status";
		status.textContent = meta.status;
		title.append(status);
		rdata.append(title);
		// Credits
		if (meta.credits.length > 0) {
			const credits = document.createElement("div");
			credits.classList = "credits";
			meta.credits.forEach(cred => {
				const sp = document.createElement("span");
				sp.textContent = cred;
				credits.append(sp);
			});
			rdata.append(credits);
		}
		// Description
		const desc = document.createElement("p");
		desc.classList = "desc";
		desc.textContent = meta.description;
		rdata.append(desc);
		// Page toggle
		const pgtoggle = createPageToggle("Pros", "Cons", meta.comparison.pros, meta.comparison.cons);
		rdata.append(pgtoggle);
		// Note
		if (meta.note.length > 0) {
			const note = document.createElement("ul");
			meta.note.forEach(nt => {
				const li = document.createElement("li");
				li.textContent = nt;
				note.append(li);
			});
			const labelgroup = createLabeledGroup("Note", note);
			rdata.append(labelgroup);
		}
		container.append(rdata);

		odon_list.append(container);
	});
}

// Build Featured Addons card function
function buildFeaturedList(json) {
	featured_odon_list.innerHTML = "";
	json.forEach(meta => {
		// Base
		const container = document.createElement("div");
		container.classList = "card";

		if (meta.url.page_url != "") {
			container.style.cursor = "pointer";
			container.onclick = () => {
				location.assign(meta.url.page_url);
			}
		}
		// Thumbnail
		const thumb = document.createElement("img");
		thumb.classList = "thumb";
		thumb.src = (meta.thumbnail && meta.thumbnail[0] != "") ? meta.thumbnail[0] : nimg[Math.floor(Math.random() * nimg.length)];
		container.append(thumb);
		// Content
		const content = document.createElement("div");
		content.classList = "content";
		// Title
		const title = document.createElement("h1");
		title.textContent = meta.title;
		content.append(title);
		// Download button
		if (meta.url.download_url != "") {
			const button_dl = document.createElement("button");
			button_dl.classList = "circle semi-opaque";
			button_dl.title = "Download";
			button_dl.onclick = () => {
				location.assign(meta.url.download_url);
			}
			button_dl.append(createIconElement("download"));
			content.append(button_dl);
		}
		container.append(content);

		featured_odon_list.append(container);
	});
}