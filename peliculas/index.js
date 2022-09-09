async function getJSON(path) {
    const response = await fetch(path)
    return await response.json()
}
// por si acaso
const dar_data = async (url, method = "GET", body = null) => {
    try {
        console.log("va bien");
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            }, 
            method: method,
            body: body
        })
        console.log(response);
        console.log("por aquí también");
        // transformar a JSON
        const data = await response.json()
        console.log("aun nada malo");
        console.log(data.data);
        return {
            data, response
        }
    } catch (error) {
        console.error(error)
        console.log("hubo un error");
    }
}
// también por si acaso

const verdad = (localStorage.getItem("token")) ? true : false

const iniciar = document.getElementById("iniciar")
const registrar = document.getElementById("registrar")
const perfil = document.getElementById("perfil")

const verificar = () => {
    iniciar.style.display = (!verdad) ? "block" : "none"
    registrar.style.display = (!verdad) ? "block" : "none"
    perfil.style.display = (verdad) ? "block" : "none"
}

verificar()

const listar = async () => {
    const lista = document.getElementById("lista")
    const a = await dar_data("https://vg-cine-server.herokuapp.com/movies?all=true")
    console.log(a);
    const data = a.data
    lista.innerHTML = ""
    data.data.forEach((element) => {
        lista.innerHTML += `
        <div>
            <a href="../pelicula/index.html?id=${element.id}">
                <img class="peliculas" src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="${element.title}">
                <h3 class="texto">${element.title}</h3>
            </a>
        </div>
        `
    });
}

listar()