// const labels = document.querySelectorAll('.form-control label')
// labels.forEach(label => {
//     label.innerHTML = label.innerText
//     .split('')
//     .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
//     .join('')
// })
async function getJSON(path) {
    const response = await fetch(path)
    return await response.json()
}
// por si acaso
const dar_data = async (url, method = "GET", body = null) => {
    try {
        const token = localStorage.getItem("token")
        token && ( window.location.href = "/" )
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

const iniciar = document.getElementById("iniciar")
iniciar?.addEventListener("submit", async (event) => {
    event.preventDefault()
    const correo = document.getElementById("correo")
    const contraseña = document.getElementById("contraseña")
    if (correo.value === "" || contraseña.value === "") {
        Swal.fire(
            'Oh no!',
            'Todos los campos tienen que estar llenos',
            'error'
        )
        return
    }
    const usuario = {
        "email": correo.value,
        "password": contraseña.value
    }
    console.log(correo.value);
    console.log(contraseña.value);
    try {
        const response = await dar_data("https://vg-cine-server.herokuapp.com/login", "POST", JSON.stringify(usuario))
        console.log(response.data);
        console.log(response.response);
        if (response.response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: '¡Lo lograste!',
                text: 'Pudiste iniciar sesión exitósamente', 
                confirmButtonColor: '#3085d6',
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log("pasó por aquí");
                    const token = response.data.token
                    localStorage.setItem("token", token)
                    window.location.href = "/"
                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: '¡Oh no!',
                text: 'Hubo un error y no pudiste iniciar sesión'
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