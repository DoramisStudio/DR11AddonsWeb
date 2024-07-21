fetch("../assets/static/addons_list.json").then(async enc => {
	buildOdonList(await enc.json().map(e => {
		if (e.type == "release") return e;
	}));
});
const nimg = [
	"../assets/media/images/noimage_you.jpg",
	"../assets/media/images/noimage_yoshiko.jpg"
];

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

function buildOdonList(json) {
	odon_list.innerHTML = "";
	json.forEach(meta => {
		const container = document.createElement("div");
		container.classList = "list-item";

		// Main left side (Thumbnail & Button actions)
		const lside = document.createElement("div");
		lside.classList = "lside";
		// Thumbnail
		const thumb = document.createElement("img");
		thumb.classList = "thumb";
		thumb.src = meta.thumbnail != "" ? meta.thumbnail : nimg[Math.floor(Math.random() * nimg.length)];
		lside.append(thumb);
		// Button group
		const buttong = document.createElement("div");
		buttong.classList = "button-group";
		// Download Button
		const button_dl = document.createElement("button");
		button_dl.classList = "square aspect-free download-btn";
		button_dl.title = "Download";
		if (meta.url.download_url != "") {
			button_dl.onclick = () => {
				location.assign(meta.url.download_url);
			}
		}
		else {
			button_dl.setAttribute("disabled", "");
		}
		button_dl.append(createIconElement("download"));
		buttong.append(button_dl);
		// Page Button
		const button_pg = document.createElement("button");
		button_pg.classList = "square aspect-free page-btn";
		button_pg.title = "Open page";
		if (meta.url.page_url != "") {
			button_pg.onclick = () => {
				location.assign(meta.url.page_url);
			}
		}
		else {
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
		const credits = document.createElement("div");
		credits.classList = "credits";
		meta.credits.forEach(cred => {
			const sp = document.createElement("span");
			sp.textContent = cred;
			credits.append(sp);
		});
		rdata.append(credits);
		// Description
		const desc = document.createElement("p");
		desc.classList = "desc";
		desc.textContent = meta.description;
		rdata.append(desc);
		// Page toggle
		const pgtoggle = createPageToggle("Pros", "Cons", meta.comparison.pros, meta.comparison.cons);
		rdata.append(pgtoggle);
		// Note
		const note = document.createElement("ul");
		note.classList = "note";
		meta.note.forEach(nt => {
			const li = document.createElement("li");
			li.textContent = nt;
			note.append(li);
		});
		rdata.append(note);
		container.append(rdata);

		odon_list.append(container);
	});
}