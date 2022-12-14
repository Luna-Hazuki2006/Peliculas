async function getJSON(path) {
    const response = await fetch(path)
    return await response.json()
}
// por si acaso
const dar_data = async (url, method = "GET", body = null) => {
    try {
        const token = localStorage.getItem("token")
        token && ( window.location.href = "/" )
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
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
    token && ( window.location.href = "/" )
}
porSiAcaso()
// Y esto porque sé que alguien tratará de partir mi sistema...
// ¡¡¡PERO NO PODRÁN!!!! *risa malvada en la distancia*

const registrar = document.getElementById("registrar")
registrar?.addEventListener("submit", async (event) => {
    event.preventDefault()
    const nombres = document.getElementById("nombres")
    const apellidos = document.getElementById("apellidos")
    const cedula = document.getElementById("cedula")
    const fecha = document.getElementById("fecha")
    const direccion = document.getElementById("direccion")
    const correo = document.getElementById("correo")
    const contraseña = document.getElementById("contraseña")
    if (nombres.value === "" || apellidos.value === "" || 
            cedula.value === "" || fecha.value === "NaN/NaN/NaN" || 
            direccion.value === "" || correo.value === "" || 
            contraseña.value === "") {
        Swal.fire(
            'Oh no!',
            'Todos los campos tienen que estar llenos',
            'error'
        )
        return
    }
    const usuario = {
        "firstName": nombres.value,
        "lastName": apellidos.value,
        "id": cedula.value,
        "address": direccion.value,
        "birthday": fecha.value,
        "email": correo.value,
        "password": contraseña.value
    }

    try {
        const response = await dar_data("https://vg-cine-server.herokuapp.com/register", "POST", JSON.stringify(usuario))
 
        if (response.response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: '¡Lo lograste!',
                text: 'Te pudiste registrar exitósamente', 
                confirmButtonColor: '#3085d6',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/"
                }
            })
        } else if (response.response.status === 400) {
            Swal.fire({
                icon: 'warning',
                title: '¡Oh no!',
                text: response.data.error
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: '¡Oh no!',
                text: 'Hubo un error y no te pudiste registrar'
            })
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: '¡Oh no!',
            text: error
        })
        console.error(error);
    }
})