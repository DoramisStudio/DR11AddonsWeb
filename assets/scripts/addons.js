const pgt = __addon_get_type || "release";
const dbg = true;

if (pgt) {
	fetch("/assets/static/addons_list.json").then(async r => {
		const d = await r.json();
		
		const contents = d.filter(p => p.type == pgt);
		if (dbg) console.log(contents);

		generateAddonList(contents);
	});
}

function toFirstUpperCase(word) {
	return word
		.trim()
		.split(" ")
		.map((part, index) =>
		index === -1
			? part.toLowerCase()
			: part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
		)
		.join(" ");
}


function generateAddonList(items) {
	const grid = document.getElementById("addons-grid");

	grid.innerHTML = "";
	items.forEach(v => {
		const container = document.createElement("div");
		container.classList = "addons-grid";

		const sidecontent = document.createElement("div");
		sidecontent.classList = "side-content";
		container.append(sidecontent);

		const maincontent = document.createElement("div");
		maincontent.classList = "side-content";
		maincontent.style.margin = "1rem";
		container.append(maincontent);

		if (v.thumbnail.length == 0) v.thumbnail.push(nimg[Math.floor(Math.random() * nimg.length)]);

		const thumb = createSlideshow(v.thumbnail);
		sidecontent.append(thumb);

		const buttonGroup = document.createElement("div");
		buttonGroup.classList = "button-group";
		// buttonGroup.style.width = "fit-content";
		sidecontent.append(buttonGroup);

		const downloadBtn = document.createElement("button");
		if (v.url.download_url == "") downloadBtn.setAttribute("disabled", "");
		else downloadBtn.onclick = _ => window.open(v.url.download_url);
		downloadBtn.append(createIconElement("download"));
		buttonGroup.append(downloadBtn);
		
		const pageBtn = document.createElement("button");
		if (v.url.page_url == "") pageBtn.setAttribute("disabled", "");
		else pageBtn.onclick = _ => window.open(v.url.page_url);
		pageBtn.append(createIconElement("north_east"));
		buttonGroup.append(pageBtn);

		const titlegroup = document.createElement("div");
		titlegroup.classList = "row-group break-on-mobile";
		titlegroup.style.alignItems = "center";
		maincontent.append(titlegroup);

		const title = document.createElement("h1");
		title.textContent = v.title;
		// title.style.marginLeft = "1rem";
		titlegroup.append(title);

		// const badges = document.createElement("div");
		// badges.style.width = "fit-content";
		// badges.classList = "badge-group";
		// titlegroup.append(badges);

		const badgesgroup = document.createElement("div");
		badgesgroup.classList = "row-group";
		// badgesgroup.style.alignItems = "center";
		titlegroup.append(badgesgroup);

		const badgeslist = [v.status, ...v.tags.map(v => toFirstUpperCase(v))];
		badgeslist.forEach(v => {
			const badge = document.createElement("span");
			badge.classList = "badge";
			badge.style.alignSelf = "unset";
			badge.textContent = v;
			badgesgroup.append(badge);

			if (v == "Freeware") badge.classList.add("green");
			if (v == "Featured") badge.classList.add("yellow");
		});

		const desc = document.createElement("p");
		desc.textContent = v.description;
		// title.style.marginLeft = "1rem";
		maincontent.append(desc);

		grid.append(container);
	});
}

function createIconElement(iconName) {
	const icon = document.createElement("span");
	icon.classList = "material-symbols-rounded";
	// icon.style = "font-size: 14px;";
	icon.translate = "no";
	icon.textContent = iconName;
	return icon;
}

function createSlideshow(images, classList = "", style = "") {
	const multiple = images.length > 1 ? true : false;
	var index = 0;

	// console.log(multiple);

	// Container
	const container = document.createElement("div");
	container.classList = "image-slideshow " + classList;
	container.style = style;

	// Images container
	const images_container = document.createElement("div");
	images_container.classList = "list";
	container.append(images_container);

	images.forEach(im => {
		const img = document.createElement("img");
		img.src = im;
		images_container.append(img);
	});

	// const image = document.createElement("img");
	// images_container.append(image);
	// container.append(images_container);
	
	// // Images processor
	// if (!multiple) {
	// 	image.src = (images[0] && images[0] != "") ? images[0] : nimg[Math.floor(Math.random() * nimg.length)];
	// }
	// else {
	const control = document.createElement("div");
	control.classList = "controls";
	
	// const nav_arrow = document.createElement("div");
	// nav_arrow.classList = "nav-arrow";
	
	const prev_btn = document.createElement("button");
	prev_btn.classList = "left";
	prev_btn.append(createIconElement("chevron_left"));
	control.append(prev_btn);
	
	const next_btn = document.createElement("button");
	next_btn.classList = "right";
	next_btn.append(createIconElement("chevron_right"));
	control.append(next_btn);
	if (images.length > 1) container.append(control);
	
	function UpdateImage() {
		images_container.style.transform = `translateX(${index * -100}%)`;
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
	// }

	return container;
}