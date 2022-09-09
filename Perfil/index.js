async function getJSON(path) {
    const response = await fetch(path)
    return await response.json()
}
// por si acaso
const dar_data = async (url, method = "GET", body = null) => {
    try {
        const token = localStorage.getItem("token")
        !token && ( window.location.href = "/" )
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            }, 
            method: method,
            body: body
        })
        // transformar a JSON
        const data = await response.json()
        return {
            data, response
        }
    } catch (error) {
        console.error(error)
        console.log("hubo un error");
    }
}
// también por si acaso

const porSiAcaso = () => {
    const token = localStorage.getItem("token")
    !token && ( window.location.href = "/" )
}
porSiAcaso()
// Y esto porque sé que alguien tratará de partir mi sistema...
// ¡¡¡PERO NO PODRÁN!!!! *risa malvada en la distancia*
// y ya lo sé literalmente en la línea 45 está el mismo código...
// ¡¡¡PERO NO ME IMPORTA, NUNCA LOGRARÁN PARTIR ESTE CÓDIGO!!!!!
// *se ahoga mientras grita y muere*

const token = localStorage.getItem("token")
!token && ( window.location.href = "/" )
const correo = document.getElementById("correo")
const nombres = document.getElementById("nombres")
const apellidos = document.getElementById("apellidos")
const cedula = document.getElementById("cedula")
const fecha = document.getElementById("nacimiento")
const direccion = document.getElementById("direccion")

const datos_iniciales = async () => {
    const info = await dar_data("https://vg-cine-server.herokuapp.com/profile")
    correo.innerText = "Email: " + info.data.data.email
    nombres.innerText = "Nombres: " + info.data.data.firstName
    apellidos.innerText = "Apellidos: " + info.data.data.lastName
    cedula.innerText = "Cédula: " + info.data.data.id
    direccion.innerText = "Dirección: " + info.data.data.address
    fecha.innerText = "Fecha de nacimiento: " + info.data.data.birthday
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

const vistaDependiente = (indice, verdad) => {
    listaVistas[indice].style.display = (verdad) ? "block" : "none"
}

vistaDependiente(0, false)
vistaDependiente(1, false)
vistaDependiente(2, false)

modificarPerfil?.addEventListener("click", async () => {
    vistaDependiente(2, true)
    vistaDependiente(0, false)
    vistaDependiente(1, false)
    const nombresCambio = document.getElementById("nombres-cambio")
    const apellidosCambio = document.getElementById("apellidos-cambio")
    const cedulaCambio = document.getElementById("cedula-cambio")
    const nacimientoCambio = document.getElementById("nacimiento-cambio")
    const direccionCambio = document.getElementById("direccion-cambio")
    const cambiarla = document.getElementById("cambiar-perfil")
    const info = await dar_data("https://vg-cine-server.herokuapp.com/profile")
    nombresCambio.value = info.data.data.firstName
    apellidosCambio.value = info.data.data.lastName
    cedulaCambio.value = info.data.data.id
    nacimientoCambio.value = info.data.data.birthday
    direccionCambio.value = info.data.data.address
    cambiarla?.addEventListener("submit", async (event) => {
        event.preventDefault()
        if (nombresCambio.value === "" || apellidosCambio.value === "" || 
                cedulaCambio.value === "" || nacimientoCambio.value === "NaN/NaN/NaN" || 
                direccionCambio.value === "") {
            Swal.fire(
                '¡Oh no!',
                'No se puede cambiar el perfil si todos los campos no están llenos',
                'error'
            )
            return
        }
        const datos = {
            "firstName": nombresCambio.value,
            "lastName": apellidosCambio.value,
            "id": cedulaCambio.value,
            "address": direccionCambio.value,
            "birthday": nacimientoCambio.value
        }
        const data = await dar_data("https://vg-cine-server.herokuapp.com/edit-profile", "PUT", JSON.stringify(datos))
        if (data.response.status === 200) {
            Swal.fire(
                '¡Lo lograste!',
                'El perfil ha sido cambiado :D',
                'success'
            )
        } else {
            Swal.fire(
                '¡Oh no!',
                data.data.error,
                'error'
            )
        }
        nombresCambio.value = ""
        apellidosCambio.value = ""
        cedulaCambio.value = ""
        direccionCambio.value = ""
        nacimientoCambio.value = ""
        datos_iniciales()
        vistaDependiente(0, false)
        vistaDependiente(1, false)
        vistaDependiente(2, false)
    })
})

cambiarContraseña?.addEventListener("click", () => {
    vistaDependiente(0, true)
    vistaDependiente(1, false)
    vistaDependiente(2, false)
    const cambiarla = document.getElementById("cambiar-contraseña")
    cambiarla?.addEventListener("submit", async (event) => {
        event.preventDefault()
        const primera = document.getElementById("primera")
        const segunda = document.getElementById("segunda")
        if (primera.value === segunda.value && primera.value !== "" && segunda.value !== "") {
            const info = {
                "password": primera.value,
                "confirmPassword": segunda.value
            }
            const data = await dar_data("https://vg-cine-server.herokuapp.com/change-password", "PUT", JSON.stringify(info))
            if (data.response.status === 200) {
                Swal.fire(
                    '¡Lo lograste!',
                    'La contraseña ha sido cambiada :D',
                    'success'
                )
            } else {
                Swal.fire(
                    '¡Oh no!',
                    data.data.error,
                    'error'
                )
            }
        } else {
            Swal.fire(
                '¡On no!',
                'Las contraseñas no son iguales D:',
                'error'
            )
        }
        primera.value = ""
        segunda.value = ""
        vistaDependiente(0, false)
        vistaDependiente(1, false)
        vistaDependiente(2, false)
    })
})

verCompras?.addEventListener("click", async () => {
    vistaDependiente(1, true)
    vistaDependiente(0, false)
    vistaDependiente(2, false)
    const info = await dar_data("https://vg-cine-server.herokuapp.com/ticket")
    const compras = document.getElementById("compras")
    compras.innerHTML = ""
    info.data.data.forEach(element => {
        compras.innerHTML += `
        <div class="caja">
            <div id="cambiar-contraseña" class="form-parte">
                <p style="color: black;">Cantidad de boletos: ${element.ticketCount}</p>
                <p style="color: black;">Película: ${element.movieTitle}</p>
                <p style="color: black;">Tipo de pago: ${element.paymentMethod}</p>
                <p style="color: black;">Fecha de compra: ${element.date}</p>
            </div>
        </div>
        `
    });
})

cerrarSesion?.addEventListener("click", () => {
    Swal.fire({
        title: '¿Realmente quieres cerrar sesión?',
        text: "¡No podrás acceder a tu perfil!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '¡Si, quiero cerrar sesión!', 
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("token")
            console.log("cerrar sesión");
            window.location.href = "/"
        }
    })
})