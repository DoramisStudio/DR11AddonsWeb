fetch("../assets/static/addons_list.json").then(async enc => {
	buildOdonList(await enc.json());
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

function buildOdonList(json) {
	odon_list.innerHTML = "";
	json.forEach(meta => {
		container = document.createElement("div");
		container.classList = "list-item";

		// Main left side (Thumbnail & Button actions)
		lside = document.createElement("div");
		lside.classList = "lside";
		// Thumbnail
		thumb = document.createElement("img");
		thumb.classList = "thumb";
		thumb.src = meta.thumbnail != "" ? meta.thumbnail : nimg[Math.floor(Math.random() * nimg.length)];
		lside.append(thumb);
		// Button group
		buttong = document.createElement("div");
		buttong.classList = "button-group";
		// Download Button
		button_dl = document.createElement("button");
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
		button_pg = document.createElement("button");
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
		lside.append(buttong);
		container.append(lside);

		odon_list.append(container);
	});
}