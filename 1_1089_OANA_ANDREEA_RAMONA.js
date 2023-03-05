
var canvas = document.getElementById("canvasPaint");
var ctx = canvas.getContext("2d");

var seDeseneaza = false;
var coordX1 = 0;
var coordY1 = 0;
var coordX2 = 0;
var coordY2 = 0;
var lastWidth = 0;
var lastHeight = 0;
figuri = [];
var index;

var nrLinii = 1;
var nrDreptunghiuri = 1;
var nrTriunghiuri = 1;
var nrElipse = 1;
var nrCercuri = 1;

var idFiguraLista;

var width = canvas.width;
var height = canvas.height;

culoareSelectata = document.getElementById("colorpicker").value
culoareBackground = document.getElementById("colorPickerBackground").value

ctx.fillStyle = culoareBackground;
ctx.fillRect(0, 0, width, height);

var fill = true;
var sliderGrosime = document.getElementById("grosime");
var grosimeLinie = sliderGrosime.value;


var optiuni = document.getElementById("shapesOptions");
var figuraSelectata;
var tipFigura = { LINIE: 1, DREPTUNGHI: 2, CERC: 3, ELIPSA: 4, TRIUNGHI: 5 };
var idFigura = 1;


// selectare tip figura
document.getElementById("shapesOptions").onclick = function () {
    figuraSelectata = optiuni.options[optiuni.selectedIndex].value;
    if (figuraSelectata === "linie") {
        idFigura = tipFigura.LINIE;
    }
    else if (figuraSelectata === "dreptunghi") {
        idFigura = tipFigura.DREPTUNGHI;
    } else if (figuraSelectata === "cerc") {
        idFigura = tipFigura.CERC;
    }
    else if (figuraSelectata === "elipsa") {
        idFigura = tipFigura.ELIPSA;
    }
    else if (figuraSelectata === "triunghi") {
        idFigura = tipFigura.TRIUNGHI;
    }
}

//selectare culoare
var color = document.getElementById("colorpicker");

color.addEventListener("input", function () {
    culoareSelectata = color.value;
}, false);

//selectare culoare background
var colorBackground = document.getElementById("colorPickerBackground");

colorBackground.addEventListener("input", function () {
    culoareBackground = colorBackground.value;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = culoareBackground;
    ctx.beginPath();
    ctx.fillRect(0, 0, width, height);
    for (var i = 0; i < figuri.length; i++) {
        deseneaza(figuri[i]);
    }
    ctx.closePath();

}, false);

//selectare grosime Linie
sliderGrosime.addEventListener("input", function () {
    grosimeLinie = sliderGrosime.value;
}, false);


function unchecked(cb) {
    var tipuri = document.getElementsByName("type");
    tipuri.forEach((it) => {
        if (it != cb) {
            it.checked = false;
        }
    });
    if (tipuri[0].checked) {
        fill = true;
    } else fill = false;

}

canvas.addEventListener("mousedown", e => {
    var pos = getMousePos(e);
    coordX1 = pos.x;
    coordY1 = pos.y;
    seDeseneaza = true;
});

canvas.addEventListener("mousemove", e => {
    if (seDeseneaza == true) {
        var pos = getMousePos(e);
        coordX2 = pos.x;
        coordY2 = pos.y;

        lastHeight = coordY2 - coordY1;
        lastWidth = coordX2 - coordX1;

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = culoareBackground;
        ctx.beginPath();
        ctx.fillRect(0, 0, width, height);

        //verific tipul figurii

        if (idFigura == tipFigura.LINIE) {
            deseneazaLinie();
        } else if (idFigura == tipFigura.DREPTUNGHI) {
            deseneazaDreptunghi();
        } else if (idFigura == tipFigura.CERC) {
            raza = Math.sqrt(Math.pow((lastWidth), 2) + Math.pow((lastHeight), 2));
            deseneazaCerc();
        }
        else if (idFigura == tipFigura.ELIPSA) {
            deseneazaElipsa();
        }
        else if (idFigura == tipFigura.TRIUNGHI) {
            deseneazaTriunghi();
        }
        ctx.stroke();
        ctx.closePath();
    }
});

function deseneazaDreptunghi() {
    for (var i = 0; i < figuri.length; i++) {
        deseneaza(figuri[i]);
    }

    ctx.beginPath();
    if (fill == false) {
        ctx.strokeStyle = culoareSelectata;
        ctx.beginPath();
        ctx.lineWidth = grosimeLinie;
        ctx.strokeRect(coordX1, coordY1, lastWidth, lastHeight);
        ctx.closePath();
    }
    else {
        ctx.fillStyle = culoareSelectata;
        ctx.strokeStyle = culoareSelectata;
        ctx.beginPath();
        ctx.lineWidth = 0;
        ctx.rect(coordX1, coordY1, lastWidth, lastHeight);
        ctx.closePath();
        ctx.fill();

    }
}
function deseneazaLinie() {
    for (var i = 0; i < figuri.length; i++) {
        deseneaza(figuri[i]);
    }
    ctx.beginPath();

    ctx.strokeStyle = culoareSelectata;
    ctx.beginPath();
    ctx.lineWidth = grosimeLinie;
    ctx.moveTo(coordX1, coordY1);
    ctx.lineTo(coordX2, coordY2);
    ctx.closePath();
    ctx.stroke();

}
function deseneazaTriunghi() {
    for (var i = 0; i < figuri.length; i++) {
        deseneaza(figuri[i]);
    }
    if (fill == false) {
        ctx.beginPath();
        ctx.lineWidth = grosimeLinie;
        ctx.strokeStyle = culoareSelectata;
        ctx.moveTo(coordX1, coordY1);
        ctx.lineTo(coordX1 + (coordX1 - coordX2), coordY2);
        ctx.lineTo(coordX2, coordY2);
        ctx.stroke();
        ctx.closePath();
    }
    else {
        ctx.fillStyle = culoareSelectata;
        ctx.strokeStyle = culoareSelectata;
        ctx.beginPath();
        ctx.lineWidth = 0;
        ctx.moveTo(coordX1, coordY1);
        ctx.lineTo(coordX2, coordY2);
        ctx.lineTo(coordX1 + (coordX1 - coordX2), coordY2);
        ctx.closePath();
        ctx.fill();
    }
}

function deseneazaCerc() {
    for (var i = 0; i < figuri.length; i++) {
        deseneaza(figuri[i]);
    }

    if (fill == false) {
        ctx.strokeStyle = culoareSelectata;
        ctx.beginPath();
        ctx.lineWidth = grosimeLinie;
        ctx.arc(coordX1, coordY1, raza, 0, 2.0 * Math.PI);
        ctx.closePath();
        ctx.stroke();
    }
    else {
        ctx.fillStyle = culoareSelectata;
        ctx.strokeStyle = culoareSelectata;
        ctx.beginPath();
        ctx.lineWidth = 0;
        ctx.arc(coordX1, coordY1, raza, 0, 2.0 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }
}

function deseneazaElipsa() {
    for (var i = 0; i < figuri.length; i++) {
        deseneaza(figuri[i]);
    }
    ctx.beginPath();
    if (fill == false) {
        ctx.strokeStyle = culoareSelectata;
        ctx.beginPath();
        ctx.lineWidth = grosimeLinie;
        ctx.moveTo(coordX1, coordY1 + (coordY2 - coordY1) / 2);
        ctx.bezierCurveTo(coordX1, coordY1, coordX2, coordY1, coordX2, coordY1 + (coordY2 - coordY1) / 2);
        ctx.bezierCurveTo(coordX2, coordY2, coordX1, coordY2, coordX1, coordY1 + (coordY2 - coordY1) / 2);
        ctx.closePath();
        ctx.stroke();
    }
    else {
        ctx.fillStyle = culoareSelectata;
        ctx.beginPath();
        ctx.strokeStyle = culoareSelectata;
        ctx.lineWidth = 0;
        ctx.moveTo(coordX1, coordY1 + (coordY2 - coordY1) / 2);
        ctx.bezierCurveTo(coordX1, coordY1, coordX2, coordY1, coordX2, coordY1 + (coordY2 - coordY1) / 2);
        ctx.bezierCurveTo(coordX2, coordY2, coordX1, coordY2, coordX1, coordY1 + (coordY2 - coordY1) / 2);
        ctx.closePath();
        ctx.fill();
    }


}

function deseneaza(figura) {
    if (figura.fill == true) {
        ctx.fillStyle = figura.color;
        ctx.lineWidth = 0;
    } else {
        ctx.strokeStyle = figura.color;
        ctx.lineWidth = figura.grosime;
    };
    ctx.beginPath();

    if (figura.id.includes("linie")) {
        ctx.moveTo(figura.coordonataX1, figura.coordonataY1);
        ctx.lineTo(figura.coordonataX2, figura.coordonataY2);
    } else if (figura.id.includes("dreptunghi")) {
        ctx.rect(figura.coordonataX1, figura.coordonataY1, figura.coordonataX2, figura.coordonataY2);
    } else if (figura.id.includes("cerc")) {
        ctx.arc(figura.coordonataX1, figura.coordonataY1, figura.raza, 0, 2.0 * Math.PI);
    }
    else if (figura.id.includes("elipsa")) {
        ctx.moveTo(figura.coordonataX1, figura.coordonataY1 + (figura.coordonataY2 - figura.coordonataY1) / 2);
        ctx.bezierCurveTo(figura.coordonataX1, figura.coordonataY1, figura.coordonataX2, figura.coordonataY1, figura.coordonataX2, figura.coordonataY1 + (figura.coordonataY2 - figura.coordonataY1) / 2);
        ctx.bezierCurveTo(figura.coordonataX2, figura.coordonataY2, figura.coordonataX1, figura.coordonataY2, figura.coordonataX1, figura.coordonataY1 + (figura.coordonataY2 - figura.coordonataY1) / 2);
    }
    else if (figura.id.includes("triunghi")) {
        ctx.moveTo(figura.coordonataX1, figura.coordonataY1);
        ctx.lineTo(figura.coordonataX2, figura.coordonataY2);
        ctx.lineTo(figura.coordonataX1 + (figura.coordonataX1 - figura.coordonataX2), figura.coordonataY2);
    };
    ctx.closePath();
    if (figura.fill == true) {
        ctx.fill();
    } else ctx.stroke();
}


canvas.addEventListener("mouseup", e => {

    var tip = "";
    if (idFigura == tipFigura.LINIE) {
        tip = "linie";
        idFiguraLista = tip + nrLinii;
        nrLinii++;
    } else if (idFigura == tipFigura.DREPTUNGHI) {
        tip = "dreptunghi";
        idFiguraLista = tip + nrDreptunghiuri;
        nrDreptunghiuri++;
    } else if (idFigura == tipFigura.CERC) {
        tip = "cerc";
        idFiguraLista = tip + nrCercuri;
        nrCercuri++;
    }
    else if (idFigura == tipFigura.ELIPSA) {
        tip = "elipsa";
        idFiguraLista = tip + nrElipse;
        nrElipse++;
    }
    else if (idFigura == tipFigura.TRIUNGHI) {
        tip = "triunghi";
        idFiguraLista = tip + nrTriunghiuri;
        nrTriunghiuri++;
    }

    var fig;

    if (tip == "dreptunghi") {
        fig = { id: idFiguraLista, coordonataX1: coordX1, coordonataY1: coordY1, coordonataX2: lastWidth, coordonataY2: lastHeight, grosime: grosimeLinie, color: culoareSelectata, fill: fill };
    }
    else if (tip == "elipsa" || tip == "triunghi") {
        fig = { id: idFiguraLista, coordonataX1: coordX1, coordonataY1: coordY1, coordonataX2: coordX2, coordonataY2: coordY2, grosime: grosimeLinie, color: culoareSelectata, fill: fill };
    }
    else if (tip == "linie") {
        fig = { id: idFiguraLista, coordonataX1: coordX1, coordonataY1: coordY1, coordonataX2: coordX2, coordonataY2: coordY2, grosime: grosimeLinie, color: culoareSelectata, fill: false };
    }
    else if (tip == "cerc") {
        fig = { id: idFiguraLista, coordonataX1: coordX1, coordonataY1: coordY1, raza: raza, grosime: grosimeLinie, color: culoareSelectata, fill: fill };
    }

    figuri.push(fig);
    // console.log(fig);
    adaugaFiguraInLista(fig);

    lastWidth = 0;
    lastHeight = 0;
    coordX1 = 0;
    coordX2 = 0;
    coordY1 = 0;
    coordY2 = 0;
    seDeseneaza = false;
});


function getMousePos(e) {
    return {
        x: e.offsetX,
        y: e.offsetY
    };
}

function adaugaFiguraInLista(figura) {
    var lista = document.getElementById("lista");
    var li = document.createElement("li");
    var id = document.createTextNode(figura.id);
    li.appendChild(id);
    lista.appendChild(li);
}

var idFiguraSelectata;
var tipFiguraSelectata;
var figuraSelectata;
var items = document.querySelector('ul');

items.addEventListener('click', function (ev) {
    if (document.querySelector('#lista li.selectat') !== null) {
        document.querySelector('#lista li.selectat').classList.remove('selectat');
    }

    ev.target.className = "selectat";
    idFiguraSelectata = ev.target.textContent;

    for (var i = 0; i < figuri.length; i++) {
        if (figuri[i].id === idFiguraSelectata) {
            if (figuri[i].id.includes("cerc")) {
                document.getElementById("dimX2").disabled = true;
                document.getElementById("dimY2").disabled = true;
                document.getElementById("dimRaza").disabled = false;
                document.getElementById("dimX2").value = "";
                document.getElementById("dimY2").value = "";
                document.getElementById("dimX1").value = figuri[i].coordonataX1;
                document.getElementById("dimY1").value = figuri[i].coordonataY1;
                document.getElementById("dimRaza").value = figuri[i].raza;

            }
            else {
                document.getElementById("dimX2").disabled = false;
                document.getElementById("dimY2").disabled = false;
                document.getElementById("dimRaza").value = "";
                document.getElementById("dimX1").value = figuri[i].coordonataX1;
                document.getElementById("dimY1").value = figuri[i].coordonataY1;
                document.getElementById("dimX2").value = figuri[i].coordonataX2;
                document.getElementById("dimY2").value = figuri[i].coordonataY2;
                document.getElementById("dimRaza").disabled = true;
            }
        }
    }

});

document.getElementById("btnModifica").addEventListener("click", modificaDate);

function modificaDate() {
    for (var i = 0; i < figuri.length; i++) {
        if (figuri[i].id === idFiguraSelectata) {
            if (figuri[i].id.includes("cerc")) {
                figuri[i].coordonataX1 = document.getElementById("dimX1").value;
                figuri[i].coordonataY1 = document.getElementById("dimY1").value;
                figuri[i].raza = document.getElementById("dimRaza").value;
            }
            else {
                figuri[i].coordonataX1 = document.getElementById("dimX1").value;
                figuri[i].coordonataY1 = document.getElementById("dimY1").value;
                figuri[i].coordonataX2 = document.getElementById("dimX2").value;
                figuri[i].coordonataY2 = document.getElementById("dimY2").value;
            }
        }
    }
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = culoareBackground;
    ctx.beginPath();
    ctx.fillRect(0, 0, width, height);

    for (var i = 0; i < figuri.length; i++) {
        deseneaza(figuri[i]);
    }
}


document.getElementById("btnSterge").addEventListener("click", stergeFigura);

function stergeFigura() {
    for (var i = 0; i < figuri.length; i++) {
        if (figuri[i].id === idFiguraSelectata) {
            figuri.splice(i, 1);
        }
    }
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = culoareBackground;
    ctx.beginPath();
    ctx.fillRect(0, 0, width, height);

    for (var i = 0; i < figuri.length; i++) {
        deseneaza(figuri[i]);
    }
    stergeFiguraDinLista();
}

function stergeFiguraDinLista() {
    var lista = document.getElementById("lista");
    const lista_figuri = document.getElementById("lista").getElementsByTagName("li");
    // lista de noduri
    var valoare;
    for (let i = 0; i < lista_figuri.length; i++) {
        valoare = lista_figuri[i].textContent;
        if (valoare == idFiguraSelectata) {
            lista.removeChild(lista.childNodes[i])
        }
    }
}

document.getElementById("clear").addEventListener("click", clear);

function clear() {
    ctx.beginPath();
    ctx.clearRect(0, 0, width, height);
    ctx.closePath();

    while (figuri.length > 0) {
        figuri.pop();
    }
    nrLinii = 1;
    nrDreptunghiuri = 1;
    nrTriunghiuri = 1;
    nrElipse = 1;
    nrCercuri = 1;
    var lista = document.getElementById("lista");
    while (lista.firstChild) lista.removeChild(lista.firstChild);

}

document.getElementById("exportPNG").addEventListener("click", salveazaImaginePNG);


function salveazaImaginePNG() {
    var download = document.getElementById('downloadPNG');
    download.setAttribute('download', 'canvas.png');
    download.setAttribute('href', canvas.toDataURL("image/png"));
}

document.getElementById("exportSVG").addEventListener("click", salveazaImagineSVG);

function salveazaImagineSVG() {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.backgroundColor = culoareBackground;
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);

    for (var i = 0; i < figuri.length; i++) {
        if (figuri[i].id.includes("linie")) {
            var linie = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            linie.setAttributeNS(null, 'id', figuri[i].id);
            linie.setAttributeNS(null, 'x1', figuri[i].coordonataX1);
            linie.setAttributeNS(null, 'y1', figuri[i].coordonataY1);
            linie.setAttributeNS(null, 'x2', figuri[i].coordonataX2);
            linie.setAttributeNS(null, 'y2', figuri[i].coordonataY2);
            linie.setAttributeNS(null, "stroke", figuri[i].color);
            linie.setAttributeNS(null, "stroke-width", figuri[i].grosime);
            svg.appendChild(linie);

        } else if (figuri[i].id.includes("dreptunghi")) {
            var dreptunghi = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            dreptunghi.setAttributeNS(null, 'id', figuri[i].id);
            dreptunghi.setAttributeNS(null, 'x', figuri[i].coordonataX1);
            dreptunghi.setAttributeNS(null, 'y', figuri[i].coordonataY1);
            dreptunghi.setAttributeNS(null, 'width', figuri[i].coordonataX2);
            dreptunghi.setAttributeNS(null, 'height', figuri[i].coordonataY2);
            if (figuri[i].fill == true) {
                dreptunghi.setAttributeNS(null, "fill", figuri[i].color);
            } else {
                dreptunghi.setAttributeNS(null, "stroke", figuri[i].color);
                dreptunghi.setAttributeNS(null, "stroke-width", figuri[i].grosime);
                dreptunghi.setAttributeNS(null, "fill", "none");
            }
            svg.appendChild(dreptunghi);

        } else if (figuri[i].id.includes("cerc")) {
            var cerc = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            cerc.setAttributeNS(null, 'id', figuri[i].id);
            cerc.setAttributeNS(null, 'cx', figuri[i].coordonataX1);
            cerc.setAttributeNS(null, 'cy', figuri[i].coordonataY1);
            cerc.setAttributeNS(null, 'r', figuri[i].raza);
            if (figuri[i].fill == true) {
                cerc.setAttributeNS(null, "fill", figuri[i].color);
            } else {
                cerc.setAttributeNS(null, "stroke", figuri[i].color);
                cerc.setAttributeNS(null, "stroke-width", figuri[i].grosime);
                cerc.setAttributeNS(null, "fill", "none");
            }
            svg.appendChild(cerc);
        }
        else if (figuri[i].id.includes("elipsa")) {
            var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttributeNS(null, 'id', figuri[i].id);
            var pointXForM = figuri[i].coordonataX1;
            var pointYForM = figuri[i].coordonataY1 + (figuri[i].coordonataY2 - figuri[i].coordonataY1) / 2;

            var pointX1ForQ1 = figuri[i].coordonataX1;
            var pointY1ForQ1 = figuri[i].coordonataY1;
            var pointX2ForQ1 = figuri[i].coordonataX2;
            var pointY2ForQ1 = figuri[i].coordonataY1;
            var pointX3ForQ1 = figuri[i].coordonataX2;
            var pointY3ForQ1 = figuri[i].coordonataY1 + (figuri[i].coordonataY2 - figuri[i].coordonataY1) / 2;

            var pointX1ForQ2 = figuri[i].coordonataX2;
            var pointY1ForQ2 = figuri[i].coordonataY2;
            var pointX2ForQ2 = figuri[i].coordonataX1;
            var pointY2ForQ2 = figuri[i].coordonataY2;
            var pointX3ForQ2 = figuri[i].coordonataX1;
            var pointY3ForQ2 = figuri[i].coordonataY1 + (figuri[i].coordonataY2 - figuri[i].coordonataY1) / 2;

            var sirPath = "M " + pointXForM + " " + pointYForM + " C " + pointX1ForQ1 + ", " + pointY1ForQ1 + " " + pointX2ForQ1 + ", " + pointY2ForQ1 + " " + pointX3ForQ1 + ", " + pointY3ForQ1 +
                " C " + pointX1ForQ2 + " " + pointY1ForQ2 + ", " + pointX2ForQ2 + " " + pointY2ForQ2 + ", " + pointX3ForQ2 + " " + pointY3ForQ2;
            // console.log(sirPath);

            path.setAttributeNS(null, "d", sirPath);
            if (figuri[i].fill == true) {
                path.setAttributeNS(null, "fill", figuri[i].color);
            } else {
                path.setAttributeNS(null, "stroke", figuri[i].color);
                path.setAttributeNS(null, "stroke-width", figuri[i].grosime);
                path.setAttributeNS(null, "fill", "none");
            }
            svg.appendChild(path);
        }
        else if (figuri[i].id.includes("triunghi")) {
            var triunghi = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            triunghi.setAttributeNS(null, 'id', figuri[i].id);
            triunghi.setAttributeNS(null, 'points', [figuri[i].coordonataX1, figuri[i].coordonataY1, figuri[i].coordonataX1 + (figuri[i].coordonataX1 - figuri[i].coordonataX2), figuri[i].coordonataY2, figuri[i].coordonataX2, figuri[i].coordonataY2]);
            if (figuri[i].fill == true) {
                triunghi.setAttributeNS(null, "fill", figuri[i].color);
            } else {
                triunghi.setAttributeNS(null, "stroke", figuri[i].color);
                triunghi.setAttributeNS(null, "stroke-width", figuri[i].grosime);
                triunghi.setAttributeNS(null, "fill", "none");
            }
            svg.appendChild(triunghi);
        };
    }
    document.body.appendChild(svg);


    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var outer = svg.outerHTML;
    var declarareXML = '<?xml version="1.0" standalone="no"?>\r\n';
    var blobSVG = new Blob([declarareXML, outer], { type: "canvasSVG/svg+xml;charset=utf-8" });
    var url = URL.createObjectURL(blobSVG);
    var downloadSVGFile = document.getElementById('downloadSVG');
    downloadSVGFile.href = url;
    downloadSVGFile.setAttribute('download', 'canvasSVG');
}