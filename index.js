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
    iniciar.style.display = (verdad) ? "display" : "none"
    registrar.style.display = (verdad) ? "display" : "none"
    perfil.style.display = (!verdad) ? "display" : "none"
}

verificar()