const bg_canvas = document.getElementById("cvs_bg");
const bg_ctx = bg_canvas.getContext("2d");
const __scene_root = bg_canvas;
const bg_imgs = [
    { name: "tpk", image: "/assets/media/images/icon/mitsubishi.png" }
];
const bg_scene = [];
const tpk_particles = [];
var __pause_background = false;

bg_canvas.width = document.querySelector("div.screen").clientWidth;
bg_canvas.height = document.querySelector("div.screen").clientHeight;

async function loadImage(img) {
    return new Promise(res => {
        const image = document.createElement("img");
        image.onload = _ => {
            const img_idx = bg_imgs.findIndex(p => p.image == img);
            bg_imgs[img_idx].image = image; // Replace string into image element.
            res();
        };
        image.src = img;
    });
}

class SceneImageElement {
    constructor (img, pos = [0, 0], size = [0, 0], rotation = 0) {
        if (img instanceof HTMLImageElement) this.__image = img;
        else this.__image = img.image;

        this.__position = { x: pos[0], y: pos[1] };
        this.__size = { x: size[0], y: size[1] };
        this.__rotation = rotation;
        this.__opacity = 1;
        this.__properties = {};

        Object.defineProperties(this, {
            __id: {
                value: Math.floor(10000 + Math.random() * 89999),
                writeable: false,
                configurable: true
            }
        })

        this.__parent_canvas = __scene_root || null;

        this.update();
    }

    update(canvas) {
        if (!this.__parent_canvas || !this.__image) return;

        const __cvs = canvas || this.__parent_canvas;

        const ctx = __cvs.getContext("2d");
        if (!ctx) return;

        ctx.save();

        ctx.translate(this.__position.x, this.__position.y);
        ctx.rotate(this.__rotation * Math.PI / 180);

        const drawX = -this.__size.x / 2;
        const drawY = -this.__size.y / 2;
        ctx.globalAlpha = this.__opacity;
        ctx.drawImage(this.__image, drawX, drawY, this.__size.x, this.__size.y);

        ctx.restore();
    }
}

function addImage(img, pos = [0,0], size = [128,128], rotation = 0, opacity = 1) {
    const element = new SceneImageElement(img);
    element.__position = { x: pos[0], y: pos[1] };
    element.__size = { x: size[0], y: size[1] };
    element.__rotation = rotation;
    element.__opacity = opacity;
    bg_scene.push(element);
    return element;
}

function chooseRandom(percentage = 50) {
    return Math.random() * 100 < percentage;
}

var dto = Date.now();
function sceneLoop() {
    var dtn = Date.now();
    var tdiff = dtn-dto;
    dto = dtn;

    if (!__pause_background) {
        bg_ctx.fillStyle = "#f0f0f0";
        bg_ctx.fillRect(0,0,__scene_root.width,__scene_root.height);
        
        const screenScale = Math.min(document.querySelector("div.screen").clientWidth, document.querySelector("div.screen").clientHeight) / 640; // 800 is your base/reference screen size
    
        tpk_particles.forEach(v => {
            v.__position.x -= (tdiff / 25) * screenScale * v.__properties.speed_mod;
            v.__position.y += (tdiff / 25) * screenScale * v.__properties.speed_mod;
            v.__rotation = (v.__rotation+(tdiff/20)) % 360;
            v.__size.x = innerHeight/8 * v.__properties.speed_mod;
            v.__size.y = innerHeight/8 * v.__properties.speed_mod;
    
            if (v.__position.x < -256 || v.__position.y > innerHeight+256) {
                bg_scene.splice(bg_scene.findIndex(p => p.__id == v.__id), 1);
                tpk_particles.splice(tpk_particles.findIndex(p => p.__id == v.__id), 1);
            }
        });
        bg_scene.forEach(v => {
            v.update(__scene_root); // Update elements into the root canvas of the scene.
        });
    
        if (chooseRandom(1)) {
            const spawnpos = Math.random();
            const img = addImage(bg_imgs[0], [Math.min(innerWidth*(spawnpos*2), innerWidth) + 256, Math.max(innerHeight*(spawnpos*2)-(innerHeight),0) - 256], [256,256], Math.random()*360, .1);
            img.__properties.speed_mod = 0.5+Math.random()*2;
            tpk_particles.push(img);
        }
    }
    
    requestAnimationFrame(sceneLoop);
}

(async _=> {
    await Promise.all(bg_imgs.map(src => loadImage(src.image)));
    
    // for (let i = 0; i < 10; i++) {
    // 	const spawnpos = Math.random();
    // 	const img = addImage(bg_imgs[0], [Math.min(innerWidth*(spawnpos*2), innerWidth), Math.max(innerHeight*(spawnpos*2)-(innerHeight),0)], [128,128], Math.random()*360, .25);
    // 	tpk_particles.push(img);
    // }

    // console.log("loaded.");
    requestAnimationFrame(sceneLoop);
})();

window.onresize = _ => {
    bg_canvas.width = document.querySelector("div.screen").clientWidth;
    bg_canvas.height = document.querySelector("div.screen").clientHeight;
};