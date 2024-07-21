fetch("../assets/static/addons_list.json").then(async enc => {
    console.log(await enc.json());
});