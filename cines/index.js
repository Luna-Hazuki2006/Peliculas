const cines = [
    ["https://www.cinex.com.ve/assets/images/cinemas/xtln.jpg.pagespeed.ic.KmV8PiXYqp.webp", "El Tolón"], 
    ["https://www.cinex.com.ve/assets/images/cinemas/xrec.jpg.pagespeed.ic.hxfdg8DP9U.webp", "El Recreo"], 
    ["https://www.cinex.com.ve/assets/images/cinemas/xsbc.jpg.pagespeed.ic.hDCWf-NjWy.webp", "El Sambil"], 
    ["https://www.cinex.com.ve/assets/images/cinemas/xcsi.jpg.pagespeed.ic.oajBJ41KSN.webp", "San Ignacio"], 
    ["https://www.cinex.com.ve/assets/images/cinemas/xipc.jpg.pagespeed.ic.S921zps9QZ.webp", "Los Próceres"], 
    ["https://www.cinex.com.ve/assets/images/cinemas/xmpp.jpg.pagespeed.ic.SGjOfRR1s8.webp", "Multiplaza Paraíso"], 
    ["https://www.cinex.com.ve/assets/images/cinemas/xman.jpg.pagespeed.ic.vwnnPYU4sx.webp", "Los Manzanares"], 
    ["https://www.cinex.com.ve/assets/images/cinemas/xhat.jpg.pagespeed.ic.e76e-ov-K8.webp", "Paseo El Hatillo"], 
    ["https://www.cinex.com.ve/assets/images/cinemas/xbvg.jpg.pagespeed.ic.FYrbKCtHbX.webp", "Buenaventura"], 
    ["https://www.cinex.com.ve/assets/images/cinemas/xpca.jpg.pagespeed.ic.y4DzknNqDS.webp", "Parque Costazul"], 
    ["https://www.cinex.com.ve/assets/images/cinemas/xmtb.jpg.pagespeed.ic.iypFHCWSe8.webp", "El Metrópolis Barquisimeto"], 
    ["https://www.cinex.com.ve/assets/images/cinemas/xsbp.jpg.pagespeed.ic.8hiD8xaK7E.webp", "Sambil Paraguaná"], 
    ["https://www.cinex.com.ve/assets/images/cinemas/x38.jpg.pagespeed.ic.AhSYIjwE6L.webp", "Galerías Mall"], 
    ["https://www.cinex.com.ve/assets/images/cinemas/x39.jpg.pagespeed.ic.iXrHUtPIld.webp", "Costa Mall"], 
    ["https://www.cinex.com.ve/assets/images/cinemas/x35.jpg.pagespeed.ic.AhSYIjwE6L.webp", "Marina Plaza"], 
    ["https://www.cinex.com.ve/assets/images/cinemas/x30.jpg.pagespeed.ic.eb-Khms5Nc.webp", "Plaza Mayor"], 
    ["https://www.cinex.com.ve/assets/images/cinemas/x32.jpg.pagespeed.ic.fEPy-RH-hz.webp", "Cima Plaza"], 
    ["https://www.cinex.com.ve/assets/images/cinemas/x36.jpg.pagespeed.ic.ZZ1tqYXl4T.webp", "Las Virtudes"], 
    ["https://www.cinex.com.ve/assets/images/cinemas/x37.jpg.pagespeed.ic.JwvpDM4LcA.webp", "Doral Plaza"], 
    ["https://www.cinex.com.ve/assets/images/cinemas/x34.jpg.pagespeed.ic.AhSYIjwE6L.webp", "Valera"]
]

async function getJSON(path) {
    const response = await fetch(path)
    return await response.json()
}
// por si acaso
const dar_data = async (url, method = "GET", body = null) => {
    try {
        console.log("va bien");
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
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
    iniciar.style.display = (!verdad) ? "block" : "none"
    registrar.style.display = (!verdad) ? "block" : "none"
    perfil.style.display = (verdad) ? "block" : "none"
}

verificar()

const init = () => {
    const lista = document.getElementById("lista")
    lista.innerHTML = ""
    cines.forEach((element) => {
        lista.innerHTML += `
        <div>
            <a href="">
                <img class="cines" src="${element[0]}" alt="${element[1]}">
                <h3 class="texto">${element[1]}</h3>
            </a>
        </div>
        `
    })
}

init()