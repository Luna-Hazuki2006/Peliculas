async function getJSON(path) {
    const response = await fetch(path)
    return await response.json()
}
// por si acaso
const dar_data = async (url, method = "GET", body = null) => {
    try {
        // const token = localStorage.getItem("token")
        // !token && ( window.location.href = "/" )
        console.log("va bien");
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
                // 'Authorization': `Bearer ${token}`
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
const comprar = document.getElementById("comprar")
const enlace = document.getElementById("enlaceImportante")

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const id = params.id

enlace.href = "../boleto/index.html?" + id

const verificar = () => {
    iniciar.style.display = (!verdad) ? "display" : "none"
    registrar.style.display = (!verdad) ? "display" : "none"
    perfil.style.display = (verdad) ? "display" : "none"
    comprar.style.display = (verdad) ? "display" : "none"
}

verificar()

const llenar = async () => {
    const info = await dar_data(`https://vg-cine-server.herokuapp.com/movie-detail/${id}`)
    console.log("esto es info");
    console.log(info);
    const imagen = document.getElementById("imagen")
    const titulo = document.getElementById("titulo")
    const descripcion = document.getElementById("descripcion")
    const coleccion = document.getElementById("coleccion")
    const fecha = document.getElementById("fecha")
    const generos = document.getElementById("generos")
    const elencos = document.getElementById("elencos")
    const epico = document.getElementById("epico")
    let gente = ""
    let generosTexto = ""
    info.data.data.cast.forEach(element => {
        gente += element.name + " como " + element.character + ". "
    });
    info.data.data.genres.forEach(element => {
        generosTexto += element.name + "; "
    });
    imagen.src = `https://image.tmdb.org/t/p/w500${info.data.data.backdrop_path}`
    imagen.alt = info.data.data.title
    titulo.innerText = info.data.data.title
    descripcion.innerText = info.data.data.overview
    coleccion.innerText = (info.data.data.belongs_to_collection) ? 
        "De la colección de películas: " + info.data.data.belongs_to_collection.name : 
        "Es una película sin saga"
    fecha.innerText = "Fecha de estreno: " + info.data.data.release_date
    generos.innerText = "Géneros: " + generosTexto
    elencos.innerText = "Elenco: " + gente
    epico.innerText = info.data.data.tagline
}

llenar()

