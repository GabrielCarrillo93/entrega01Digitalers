const experiencias = document.getElementById("experiencias");
const certificados = document.getElementById("certificados");
const proyectos = document.getElementById("proyectos");
const body = document.querySelector("body");
const btns = document.querySelectorAll("button");
    console.log(btns);

fetch("https://my-json-server.typicode.com/GabrielCarrillo93/fake-server/experiencia")
    .then((resp) => resp.json())
    .then((data) => {
        data.forEach(exp => {
             experiencias.innerHTML += 
                `<article class="experiencia-1">
                <div class="row">
                    <div class="puesto">
                        <img src="${exp.logo}" alt="logo">
                        <div>
                            <span>${exp.duracion}</span>
                            <h3>${exp.puesto}</h3>
                        </div>
                    </div>
                    <div class="descripcion">
                        <p>${exp.descripcion}</p>
                    </div>
                </div>
            </article>`
            
        });
    })
    .catch((error) => console.log(error));

(async () => {
    try {
	const respuesta = await fetch("https://my-json-server.typicode.com/GabrielCarrillo93/fake-server/certificados");
    if (!respuesta.ok) throw new Error(respuesta.status);
    const certs = await respuesta.json();
    certs.forEach((cert) => {
        const article = document.createElement("article");
        article.classList.add(`certificado-1`);
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
    } catch (error) {
        console.log(error);
}
})();

body.addEventListener("click", (e) => {
    e.preventDefault();
    const {target, target: {id}} = e;
    if (target.className !== "active" && (id === "javascript" || id === "responsive" || id === "react")){
        btns.forEach((el) => el.classList.remove("active"));
        target.classList.add("active");
    };
    
})