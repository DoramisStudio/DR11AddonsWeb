var _categories = [];
var _contents = [];
const dbg = true;

const tabButtonElement = document.querySelector("div.tab-buttons");
const tabPages = document.querySelector("div.tab-pages");
var _category_index = 0;

fetch("https://gist.githubusercontent.com/DoramisStudio/f87aa69570ed518603415bbe4493e781/raw/list.json?v=1", { cache: "no-cache", method: "GET" }).then(async r => {
	const d = await r.json();

	_categories = d.categories;
	if (dbg) console.log(_categories);

	_contents = d.mdt;
	if (dbg) console.log(_contents);

	loadPages();
	loadCategoryButtons();
});

function loadPages() {
	tabPages.innerHTML = "";
	_categories = _categories.map(v => { return {...v, tab: document.createElement("div")}; }); // adds tab property
	_categories.forEach(v => {
		const tab = v.tab;
		tab.classList = "page";
		tabPages.append(tab);

		const categoryContents = _contents.filter(p => p.category.includes(v.id));

		const desc = document.createElement("p");
		desc.textContent = v.desc;
		tab.append(desc);

		const grid = document.createElement("div");
		grid.classList = "grid";
		tab.append(grid);
		
		categoryContents.forEach(v => {
			const content = document.createElement("div");
			if (v.url) {
				if (Array.isArray(v.url)) {
					content.onclick = _ => openMoreLinksDialog(v.title, v.url, `Daftar link untuk konten "${v.title}"`);
				}
				else content.onclick = _ => { window.open(v.url); };
			}
			if (v.fill_image != null && v.fill_image == false) {
				content.classList.add("nofill-image");
			}

			const thumb = document.createElement("img");
			thumb.src = v.image_urls[0];
			thumb.loading = "lazy";
			content.append(thumb);

			const title = document.createElement("h2");
			title.textContent = v.title;
			content.append(title);

			const desc = document.createElement("div");
			desc.classList = "desc";
			content.append(desc);

			const subcategory = document.createElement("h3");
			subcategory.textContent = v.type;
			desc.append(subcategory);

			const content_desc = document.createElement("p");
			content_desc.textContent = v.desc;
			desc.append(content_desc);

			const goto_link = document.createElement("a");
			goto_link.textContent = `Kunjungi Link`;

			if (Array.isArray(v.url)) {
				goto_link.textContent = `Buka Daftar (${v.url.length} link)`;
			}

			desc.append(goto_link);

			grid.append(content);
		});
	});
}

function loadCategoryButtons() {
	tabButtonElement.innerHTML = "";
	_categories.forEach(v => {
		// console.log(v);

		const tab_btn = document.createElement("button");
		tab_btn.textContent = v.label;
		tabButtonElement.append(tab_btn);
		tab_btn.onclick = _ => {
			selectId(v.id);
		};
	});

	selectId(_categories[0].id);
}

function selectId(id) {
	const sid = _categories.findIndex(p => p.id == id);
	Array.from(tabButtonElement.children).forEach((v,i) => {
		if (i == sid) v.classList.add("selected");
		else v.classList.remove("selected");
	});
	
	_categories.forEach((v,i) => {
		if (i == sid) v.tab.classList.add("active");
		else v.tab.classList.remove("active");
	})
}

if (sessionStorage.getItem("dr11k")) {
	if (sessionStorage.getItem("dr11k") != "bGluay1jb2xsZWN0aW9ud2hhdHNhcHA=") location.replace("/");
}
else location.replace("/");
sessionStorage.removeItem("dr11k");