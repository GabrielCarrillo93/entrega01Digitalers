//constantes y variables
const body = document.querySelector("body");
const experiencias = document.getElementById("experiencias");
const certificados = document.getElementById("certificados");
const proyectos = document.getElementById("proyectos");
const btns = document.querySelectorAll(".selector");



//IIFE para tener la experiencia al cargar
(async () => {
    try {
	const respuesta = await fetch("https://my-json-server.typicode.com/GabrielCarrillo93/fake-server/experiencia");
    if (!respuesta.ok) throw new Error(respuesta.status);
    const exps = await respuesta.json();
    exps.forEach((exp) => {
            const article = document.createElement("article");
            article.classList.add("experiencia-");
            article.classList.add(`fade`);
            article.classList.add("experienciasSlide")
            const row = document.createElement("div");
            row.classList.add("row")
            article.appendChild(row);
            const puesto = document.createElement("div");
            puesto.classList.add("puesto");
            row.appendChild(puesto);
            const img = document.createElement("img");
            img.setAttribute("src", `${exp.logo}`);
            img.setAttribute("alt", "logo");
            puesto.appendChild(img);
            const div = document.createElement("div");
            const span = document.createElement("span");
            span.textContent = exp.duracion;
            div.appendChild(span);
            const h3 = document.createElement("h3");
            h3.textContent = exp.puesto;
            div.appendChild(h3);
            puesto.appendChild(div);
            const descripcion = document.createElement("div");
            descripcion.classList.add("descripcion");
            const p = document.createElement("p");
            p.textContent = exp.descripcion;
            descripcion.appendChild(p);
            row.appendChild(descripcion)
            experiencias.appendChild(article);
        });
    
    //carrousel experiencia. La verdad no lo iba a poner acá originalmente y después de mil dolores de cabeza dije CHOTTO MATE! ESTO ES ASINCRONISMO. Lo mismo aplica para los demás carrousel
    const elementosExperiencia = document.getElementsByClassName("experienciasSlide");
    const experienciaAnterior = document.getElementById("experienciaMenos");
    const experienciaSiguiente = document.getElementById("experienciaMas");
    
    let indice = 1;
    mostrarSlides(indice, elementosExperiencia)
    
    experienciaSiguiente.addEventListener("click", (e) => {
        mostrarSiguiente(indice, elementosExperiencia);
        indice++
        if (indice > elementosExperiencia.length){
            indice = 1
        }
    });
    experienciaAnterior.addEventListener("click", (e) => {
        mostrarAnterior(indice, elementosExperiencia);
        indice--
        if (indice < 1){
            indice = elementosExperiencia.length;
        }
    });
    
    } catch (error) {
        console.log(error);
}
})();

//IIFE para tener los certificados al cargar
(async () => {
    try {
	const respuesta = await fetch("https://my-json-server.typicode.com/GabrielCarrillo93/fake-server/certificados");
    if (!respuesta.ok) throw new Error(respuesta.status);
    const certs = await respuesta.json();
    certs.forEach((cert) => {
        const article = document.createElement("article");
        article.classList.add(`certificado-`);
        article.classList.add(`fade`);
        article.classList.add("certificadosSlide")
        const img = document.createElement("img");
        img.setAttribute("src", `${cert.imagen}`);
        img.setAttribute("alt", "certificado");
        article.appendChild(img);
        const h3 = document.createElement("h3");
        h3.textContent = cert.titulo;
        article.appendChild(h3);
        const span = document.createElement("span");
        span.textContent = cert.fecha;
        article.appendChild(span);
        certificados.appendChild(article)
        });
    const elementosCertificados = document.getElementsByClassName("certificadosSlide")
    const certificadoAnterior = document.getElementById("certificadoMenos");
    const certificadoSiguiente = document.getElementById("certificadoMas");
    
    let indice = 1;
    mostrarSlides(indice, elementosCertificados);

    certificadoSiguiente.addEventListener("click", (e) => {
        mostrarSiguiente(indice, elementosCertificados);
        indice++
        if (indice > elementosCertificados.length){
            indice = 1
        }
    })
    certificadoAnterior.addEventListener("click", (e) => {
        mostrarAnterior(indice, elementosCertificados);
        indice--
        if (indice < 1){
            indice = elementosCertificados.length;
        }
    })
    } catch (error) {
        console.log(error);
}
})();

//IIFE para tener los proyectos responsive al cargar
(async () => {
    try {
	const respuesta = await fetch("https://my-json-server.typicode.com/GabrielCarrillo93/fake-server/proyectos");
    if (!respuesta.ok) throw new Error(respuesta.status);
    const proys = await respuesta.json();
    proys.forEach((proy) => {
            proy.innerHTML += getProyectos("responsive")
        });
    } catch (error) {
        console.log(error);
}
})();

//listener para cambiar el color de los botones
body.addEventListener("click", (e) => {
    const {target, target: {id}} = e;
    if (target.className !== "active" && (id === "javascript" || id === "responsive" || id === "react")){
        btns.forEach((el) => el.classList.remove("active"));
        target.classList.add("active");
    };
});

//listener para cambiar los proyectos
btns.forEach((btn) => btn.addEventListener("click", (e) => {
    const {target: {id}} = e;
    getProyectos(id);
}))

const getProyectos = async (proy) => {
    proyectos.innerHTML = `<div id="spinner">
    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>
    <button class="sliderAnterior" id="proyectoMenos">&#10094;</button>
    <button type="button" class="sliderSiguiente" id="proyectoMas">&#10095;</button>`;
    try {
        const respuesta = await fetch("https://my-json-server.typicode.com/GabrielCarrillo93/fake-server/proyectos");
        
        if (!respuesta.ok) throw new Error(respuesta.status);
        const dataProyectos = await respuesta.json()
        
        dataProyectos[0][proy].forEach((proyecto) => {
            const article = document.createElement("article");
            article.classList.add("proyecto-");
            article.classList.add("proyectosSlide")
            article.classList.add(`fade`);
            const div = document.createElement("div");
            article.appendChild(div);
            const detalles = document.createElement("div");
            detalles.classList.add("detalles")
            article.appendChild(detalles)
            const img = document.createElement("img");
            img.setAttribute("src", proyecto.imagen);
            img.setAttribute("alt", "foto_proyecto");
            div.appendChild(img);
            const div1 = document.createElement("div");
            const span = document.createElement("span");
            span.textContent = proyecto.tags;
            div1.appendChild(span);
            detalles.appendChild(div1);
            const h3 = document.createElement("h3");
            h3.textContent = proyecto.titulo;
            detalles.appendChild(h3);
            const p = document.createElement("p");
            p.textContent = proyecto.descripcion;
            detalles.appendChild(p);
            const links = document.createElement("div");
            links.classList.add("links");
            const demo = document.createElement("a");
            demo.classList.add("demo");
            demo.setAttribute("href", proyecto.liveDemo);
            demo.setAttribute("target", "_blank");
            demo.textContent = "Demo"
            const code = document.createElement("a");
            code.classList.add("code");
            code.setAttribute("href", proyecto.sourceCode);
            code.setAttribute("target", "_blank");
            code.textContent = "Code"
            links.appendChild(demo);
            links.appendChild(code);
            detalles.appendChild(links);
            proyectos.appendChild(article);
            const spinner = document.getElementById("spinner");
            spinner.classList.add("desaparecerSpinner")
        });
        
        const elementosProyecto = document.getElementsByClassName("proyectosSlide")
        let indice = 1;
        const proyectoSiguiente = document.getElementById("proyectoMas");
        const proyectoAnterior = document.getElementById("proyectoMenos");
        
        mostrarSlides(indice, elementosProyecto);
        proyectoSiguiente.addEventListener("click", (e) => {
            mostrarSiguiente(indice, elementosProyecto);
            indice++
            if (indice > elementosProyecto.length){
                indice = 1
            }
        })
        proyectoAnterior.addEventListener("click", (e) => {
            mostrarAnterior(indice, elementosProyecto);
            indice--
            if (indice < 1){
                indice = elementosProyecto.length;
            }
        })
    } catch (error) {
        console.log(error);
    }
}

function mostrarSlides(i, arr){
    if (i > arr.length){
        i = 1;
    }
    if (i < 1){
        i = arr.length;
    }
    for (let index = 0; index < arr.length; index++) {
        arr[index].classList.add("none")
    }
    arr[i-1].classList.remove("none")
}

function mostrarSiguiente(i, arr){
    i++;
    mostrarSlides(i, arr);
}

function mostrarAnterior(i, arr){
    i--;
    mostrarSlides(i, arr)
}