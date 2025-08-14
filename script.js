document.getElementById("imagenInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;
        img.crossOrigin = "Anonymous";
        img.onload = function () {
            document.getElementById("imagenPreview").innerHTML = "";
            document.getElementById("imagenPreview").appendChild(img);

            const colorThief = new ColorThief();
            const palette = colorThief.getPalette(img, 5); // 5 colores

            mostrarPaleta(palette);
        };
    };
    reader.readAsDataURL(file);
});

function mostrarPaleta(palette) {
    const paletaDiv = document.getElementById("paleta");
    paletaDiv.innerHTML = "";

    palette.forEach(color => {
        const hex = rgbAHex(color[0], color[1], color[2]);
        const div = document.createElement("div");
        div.className = "color-box";
        div.style.backgroundColor = hex;
        div.textContent = hex;

        div.addEventListener("click", () => {
            navigator.clipboard.writeText(hex);
            alert(`Color ${hex} copiado al portapapeles`);
        });

        paletaDiv.appendChild(div);
    });

    document.getElementById("descargarBtn").style.display = "inline-block";
    document.getElementById("descargarBtn").onclick = descargarPaleta;
}

function rgbAHex(r, g, b) {
    return "#" + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join("");
}

function descargarPaleta() {
    html2canvas(document.getElementById("paleta")).then(canvas => {
        const enlace = document.createElement("a");
        enlace.download = "paleta.png";
        enlace.href = canvas.toDataURL();
        enlace.click();
    });
}
