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