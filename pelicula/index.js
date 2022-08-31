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

const verificar = () => {
    iniciar.style.display = (!verdad) ? "display" : "none"
    registrar.style.display = (!verdad) ? "display" : "none"
    perfil.style.display = (verdad) ? "display" : "none"
}

verificar()

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const id = params.id

const llenar = async () => {
    const info = await dar_data(`https://vg-cine-server.herokuapp.com/movie-detail/${id}`)
    console.log("esto es info");
    console.log(info);
    const vista = document.getElementById("pelicula")
    let gente = ""
    let generos = ""
    info.data.data.cast.forEach(element => {
        gente += element.name + " como " + element.character + ". "
    });
    info.data.data.genres.forEach(element => {
        generos += element.name + "; "
    });
    vista.innerHTML = `
    <div class="arriba">
        <img class="imagen" src="https://image.tmdb.org/t/p/w500${info.data.data.backdrop_path}" alt="${info.data.data.title}">
        <div class="titulo">
            <h1 class="mejor">${info.data.data.title}</h1>
        </div>
    </div>
    <div>
        <h1>Sinopsis: </h1>
        <p>Descripción: ${info.data.data.overview}</p>
        
        <p>${(info.data.data.belongs_to_collection) ? "De la colección de películas: " + info.data.data.belongs_to_collection.name : "Es una película sin saga"}</p>
        <p>Fecha de estreno: ${info.data.data.release_date}</p>
        <p>Géneros: ${generos}</p>
        <p>Elenco: ${gente}</p>
        <h2 class="textito mejor">${info.data.data.tagline}</2>
    </div>
    `
}

llenar()