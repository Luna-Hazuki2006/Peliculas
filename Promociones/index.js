const promociones = [
    ["https://www.nacion.com/resizer/qd5Jpb1RWnaiYJIdCThBYeEqU3o=/1440x0/filters:format(png):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/gruponacion/C5RXCOVWLRBE7DSKYOSMWPXUW4.png", "Promoción de nova"], 
    ["https://az693035.vo.msecnd.net/mercadeo/Lunes-Popular---Piezas-Web.jpg", "Lunes popular"], 
    ["https://pbs.twimg.com/media/EKOviPLX0AAdWRv.jpg", "Black friday"], 
    ["https://pbs.twimg.com/media/DZaSjReVwAA36GX.jpg", "Combo especial"], 
    ["https://pbs.twimg.com/media/DasxhEIW4AE4ZEs.jpg", "Combo rampage"], 
    ["https://az693035.vo.msecnd.net/mercadeo/Estudiante---Pieza-Web.jpg", "Para estudiantes"], 
    ["https://pbs.twimg.com/media/FNvRndyXoAE2T7Z.jpg", "Combo para 2"], 
    ["https://pbs.twimg.com/media/Es6bfy7XMAU__Wd.jpg", "Combo pequeño"], 
    ["https://pbs.twimg.com/media/D6yMEzDXoAAWBCd.jpg", "Combo stadium"], 
    ["https://pbs.twimg.com/media/DK5ipK5XkAAkUSc.jpg:large", "Mal hablar"], 
    ["https://pbs.twimg.com/media/EQM5pAjWAAIZgR9.jpg", "Promociones flaquito"], 
    ["https://pbs.twimg.com/media/DxWzCZBXQAIuBcH.jpg", "Combo cotufas"], 
    ["https://az693035.vo.msecnd.net/mercadeo/Adulto-Mayor---Pieza-Web.jpg", "Para mayores"], 
    ["https://az693035.vo.msecnd.net/mercadeo/Miercoles-para-ti---Pieza-Web.jpg", "Para miércoles"], 
    ["https://www.cinex.com.ve/assets/images/promos/xcombo-vacaciones.jpg.pagespeed.ic.xeg78VJSHj.jpg", "Para vacaciones"], 
    ["https://www.cinex.com.ve/assets/images/promos/x156e1a82e78dd3ee10ba2e3b125c7a57.png.pagespeed.ic.eZw1Tta01v.png", "Solo lunes"], 
    ["https://pbs.twimg.com/media/FLWZwTuXoAM0hy8.jpg", "Felices los dos"], 
    ["https://i0.wp.com/www.nolapeles.com/wp-content/uploads/2017/02/cinex-venezuela-promo-amor-febrero-2017.jpg?fit=332%2C223&ssl=1", "dúo con tequeños"], 
    ["https://pbs.twimg.com/media/EZ1YsLPWkAYK9p4.jpg", "pop con tequeños"], 
    ["https://pbs.twimg.com/media/BvguXikIcAA2dlp.jpg", "Combo nuget"]
]


async function getJSON(path) {
    const response = await fetch(path)
    return await response.json()
}
// por si acaso
const dar_data = async (url, method = "GET", body = null) => {
    try {
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
    promociones.forEach((element) => {
        lista.innerHTML += `
        <div>
            <a href="">
                <img class="promociones" src="${element[0]}" alt="${element[1]}">
            </a>
        </div>
        `
    })
}

init()