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

const listar = async () => {
    const lista = document.getElementById("lista")
    const banner = document.getElementById("banner")
    const a = await dar_data("https://vg-cine-server.herokuapp.com/movies")
    console.log(a);
    banner.innerHTML = ""
    const data = a.data
    lista.innerHTML = ""
    let ocasion = true
    data.data.forEach((element) => {
        while (ocasion) {
            banner.innerHTML = `
            <div>
                <img src="https://image.tmdb.org/t/p/w500${element.backdrop_path}" alt="${element.title}">
            </div>
            `
            ocasion = false
        }
        lista.innerHTML += `
        <div>
            <img src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="${element.title}">
        </div>
        `
    });
}

listar()