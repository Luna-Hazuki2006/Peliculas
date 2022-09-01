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

const comprar = document.getElementById("comprar")
comprar?.addEventListener("submit", async (event) => {
    event.preventDefault()
    const cantidad = document.getElementById("cantidad")
    const pago = document.getElementById("pago")
    const cedula = document.getElementById("cedula")
    const referencia = document.getElementById("referencia")
    if (cantidad.value === "" || pago.value === "" || 
            cedula.value === "" || referencia.value === "") {
        Swal.fire(
            'Oh no!',
            'Todos los campos tienen que estar llenos',
            'error'
        )
        return
    }
    const info = {
        "ticketCount": cantidad.value,
        "paymentMethod": pago.value,
        "id": cedula.value,
        "referenceNumber": referencia.value
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