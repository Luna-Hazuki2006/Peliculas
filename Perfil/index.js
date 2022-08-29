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

const token = localStorage.getItem("token")
!token && ( window.location.href = "/" )
const correo = document.getElementById("correo")
const nombres = document.getElementById("nombres")
const apellidos = document.getElementById("apellidos")
const cedula = document.getElementById("cedula")
const direccion = document.getElementById("direccion")

const datos_iniciales = async () => {
    const info = await dar_data("https://vg-cine-server.herokuapp.com/profile")
    console.log(info);
    console.log(info.data.data.email);
    correo.innerText = "Email: " + info.data.data.email
    nombres.innerText = "Nombres: " + info.data.data.firstName
    apellidos.innerText = "Apellidos: " + info.data.data.lastName
    cedula.innerText = "Cédula: " + info.data.data.id
    direccion.innerText = "Dirección: " + info.data.data.address
}

datos_iniciales()

const modificarPerfil = document.getElementById("m-p")
const cambiarContraseña = document.getElementById("c-c")
const verCompras = document.getElementById("v-c")
const cerrarSesion = document.getElementById("c-s")

const contraseña = document.getElementById("contraseña")
const compras = document.getElementById("compras")
const perfil = document.getElementById("perfil")

const listaVistas = [
    contraseña, compras, perfil
]
console.log(listaVistas);

const vistaDependiente = (indice, verdad) => {
    listaVistas[indice].style.display = (verdad) ? "block" : "none"
}

vistaDependiente(0, false)
vistaDependiente(1, false)
vistaDependiente(2, false)

modificarPerfil?.addEventListener("click", () => {
    vistaDependiente(2, true)
    vistaDependiente(0, false)
    vistaDependiente(1, false)
})

cambiarContraseña?.addEventListener("click", () => {
    vistaDependiente(0, true)
    vistaDependiente(1, false)
    vistaDependiente(2, false)
    const cambiarla = document.getElementById("cambiar-contraseña")
    cambiarla.addEventListener("submit", async () => {

    })
})

verCompras?.addEventListener("click", () => {
    vistaDependiente(1, true)
    vistaDependiente(0, false)
    vistaDependiente(2, false)
})

cerrarSesion?.addEventListener("click", () => {
    localStorage.removeItem("token")
    console.log("cerrar sesión");
    window.location.href = "/"
})