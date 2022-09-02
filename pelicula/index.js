async function getJSON(path) {
    const response = await fetch(path)
    return await response.json()
}
// por si acaso
const dar_data = async (url, method = "GET", body = null) => {
    try {
        const token = localStorage.getItem("token")
        !token && ( window.location.href = "/" )
        console.log("va bien");
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
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

const visible = (documento, verdad) => {
    documento.style.display = (verdad) ? "block" : "none"
    console.log("ya");
}

const iniciar = document.getElementById("iniciar")
const registrar = document.getElementById("registrar")
const perfil = document.getElementById("perfil")
const comprar = document.getElementById("comprar")
const visibilidad = document.getElementById("form")
let dato = false
visible(visibilidad, dato)

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const id = params.id

const verificar = () => {
    iniciar.style.display = (!verdad) ? "block" : "none"
    registrar.style.display = (!verdad) ? "block" : "none"
    perfil.style.display = (verdad) ? "block" : "none"
    comprar.style.display = (verdad) ? "block" : "none"
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

comprar.addEventListener("click", () => {
    dato = !dato
    visible(visibilidad, dato)
    const comprarFondo = document.getElementById("comprar-form")
    comprarFondo.addEventListener("submit", async (event) => {
        event.preventDefault()
        const cantidad = document.getElementById("cantidad")
        const pago = document.getElementById("pago")
        const cedula = document.getElementById("cedula")
        const referencia = document.getElementById("referencia")
        if (cantidad.value === "" || pago.value === "" || 
                cedula.value === "" || referencia.value === "") {
            Swal.fire(
                '¡Oh no!',
                'No puedes comprar boletos si la información está incompleta D:',
                'error'
            )
            return
        }
        const datos = {
            "ticketCount": Number(cantidad.value),
            "paymentMethod": pago.value,
            "id": cedula.value,
            "referenceNumber": referencia.value
        }
        console.log(datos);
        const info = await dar_data("https://vg-cine-server.herokuapp.com/ticket", "POST", JSON.stringify(datos))
        if (info.response.status === 200) {
            Swal.fire(
                '¡Lo lograste!',
                'Compraste los boletos exitósamente',
                'success'
            )
            referencia.value = ""
            cedula.value = ""
            pago.value = "transferencia"
            cantidad.value = 1
            dato = !dato
            visible(visibilidad, dato)
        } else if (info.response.status === 400) {
            Swal.fire(
                '¡Oh no!',
                'Ha habido un error con la conexión entre la API y no se pudo comprar los boletos D:',
                'error'
            )
        } else {
            Swal.fire(
                '¡Oh no!',
                'Ha habido un error interno y no se ha podido comprar los boletos D:',
                'error'
            )
        }
    })
})