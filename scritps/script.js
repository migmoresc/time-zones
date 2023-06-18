let paises = {
    "-12": ["ISLA BAKER", "HOWLAND ISLAND"],
    "-11": ["NIUE", "SAMOA AMERICANA"],
    "-10": ["ESTADOS UNIDOS", "HAWAI", "HONOLULU", "ISLAS COOK", "POLINESIA FRANCESA"],
    "-9": ["ESTADOS UNIDOS", "POLINESIA FRANCESA", "RIKITEA"],
    "-8": ["ESTADOS UNIDOS", "ALASKA"],
    "-7": ["CANADÁ", "ESTADOS UNIDOS", "MÉXICO"],
    "-6": ["CANADÁ", "CHILE", "COSTA RICA", "ECUADOR", "ESTADOS UNIDOS", "GUATEMALA", "HONDURAS", "MÉXICO", "NICARAGUA"],
    "-5": ["BRASIL", "CANADÁ", "COLOMBIA", "ECUADOR", "ESTADOS UNIDOS", "ISLAS CAIMÁN", "JAMAICA", "MÉXICO", "PANAMÁ", "PERÚ"],
    "-4": ["BOLIVIA", "BRASIL", "CANADÁ", "CHILE", "CUBA", "ESTADOS UNIDOS", "PARAGUAY", "PUERTO RICO", "VENEZUELA"],
    "-3": ["ARGENTINA", "BRASIL", "CANADÁ", "GROENLANDIA", "URUGUAY"],
    "-2": ["BRASIL", "GROENLANDIA"],
    "-1": ["CABO VERDE"],
    "0": ["BURKINA FASO", "GAMBIA", "GHANA", "GROENLANDIA", "GUINEA", "ISLANDIA", "MALI", "SENEGAL"],
    "1": ["ANGOLA", "ARGELIA", "CAMERÚN", "CANARIAS", "CHAD", "CONGO", "GUINEA ECUATORIAL", "IRLANDA", "MARRUECOS", "NIGERIA", "NÍGER", "PORTUGAL", "REINO UNIDO", "TÚNEZ"],
    "2": ["ALBANIA", "ALEMANIA", "ANDORRA", "AUSTRIA", "BOTSUANA", "BURUNDI", "BÉLGICA", "CROACIA", "DINAMARCA", "ESLOVAQUIA", "ESLOVENIA", "ESPAÑA", "FRANCIA", "HOLANDA", "HUNGRÍA", "ITALIA", "MOZAMBIQUE", "NAMIBIA", "NORUEGA", "POLONIA", "RUSIA", "SUDÁFRICA", "SUDÁN", "SUECIA", "SUIZA", "ZAMBIA", "ZIMBAWE"],
    "3": ["ARABIA SAUDÍ", "BAHRÉIN", "BIELORRUSIA", "BULGARIA", "CATAR", "CHIPRE", "EGIPTO", "ESTONIA", "ETIOPÍA", "FINLANDIA", "GRECIA", "IRAK", "ISRAEL", "JORDANIA", "KENIA", "LETONIA", "LITUANIA", "LÍBANO", "MADAGASCAR", "MOLDAVIA", "RUMANÍA", "RUSIA", "SIRIA", "SOMALIA", "TANZANIA", "TURQUÍA", "UCRANIA", "UGANDA", "YEMEN", "YIBUTI"],
    "4": ["ARMENIA", "AZERBAIYÁN", "EMIRATOS ÁRABES UNIDOS", "GEORGIA", "OMÁN", "RUSIA"],
    "5": ["KAZAJSTÁN", "MALDIVAS", "PAKISTÁN", "RUSIA", "TURKMENISTÁN", "UZBEKISTÁN"],
    "6": ["BANGLADESH", "BUTÁN", "KAZAJSTÁN", "KIRGUISTÁN", "RUSIA"],
    "7": ["CAMBOYA", "INDONESIA", "LAOS", "MONGOLIA", "RUSIA", "TAILANDIA", "VIETNAM"],
    "8": ["AUSTRALIA", "CHINA", "FILIPINAS", "HONG KONG", "INDONESIA", "MACAO", "MALASIA", "MONGOLIA", "RUSIA", "SINGAPUR", "TAIWÁN"],
    "9": ["COREA DEL NORTE", "COREA DEL SUR", "INDONESIA", "JAPÓN", "RUSIA"],
    "10": ["AUSTRALIA", "GUAM", "PAPÚA NUEVA GUINEA", "RUSIA"],
    "11": ["ISLAS SALOMÓN", "RUSIA", "VANUATU"],
    "12": ["FIYI", "NAURU", "NUEVA ZELANDA", "RUSIA", "TUVALU"],
    "13": ["SAMOA", "TOKELAU", "TONGA"],
    "14": ["KIRIBATI"]
}

let lista_paises = [];

let bloque = function (pais, hora) {
    const pos_espacio = pais.indexOf(" ");
    let clase;

    if (pos_espacio != -1) {
        clase = "h-" + pais.replaceAll(" ", "");
    } else {
        clase = "h-" + pais;
    }

    return `<div class="col-lg-3 pb-3">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-10 d-flex flex-column">
          <div class="pais m-auto text-center">${pais}</div>
          <div class="hora m-auto ${clase} d-${hora}"></div>
        </div>
      </div>
    </div>
  </div>`;

}

function insertarBloques() {
    $(".listado").html("");
    let bloq;

    for (let key in paises) {
        let valores = paises[key];

        for (let i = 0; i < valores.length; i++) {
            bloq = bloque(valores[i], key);
            lista_paises.push(valores[i]);
            $(".listado").append(bloq);
        }
    }
}

function horaActual() {
    momentoActual = new Date()
    hora = momentoActual.getUTCHours()
    minuto = momentoActual.getUTCMinutes()
    segundo = momentoActual.getUTCSeconds()

    return [hora, minuto, segundo];
}

function mostrarHoras() {
    const [hora, minuto, segundo] = horaActual();
    // console.log(hora, minuto, segundo)

    let diferencia;

    for (let x = -12; x < 15; x++) {
        diferencia = ".d-" + x;
        if (((hora + x) % 24) >= 0) {
            $(`${diferencia}`).html(((hora + x) % 24) + ":" + minuto + ":" + segundo);
        } else {
            let horaMenor = 24 - Math.abs(hora + x);
            $(`${diferencia}`).html(horaMenor + ":" + minuto + ":" + segundo);
        }
    }
}

insertarBloques();

$(document).ready(function () {

    $("body").css("visibility", "visible");
    insertarBloques();
    setInterval(mostrarHoras, 1000);

    $(".fa-search").click(buscarPais);
    $('.form-control').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $(".fa-search").click();
        }
    });

});

function buscarPais() {
    console.log($(".form-control").val())
    let pais = $(".form-control").val().toUpperCase();

    if (lista_paises.includes(pais)) {
        console.log("si")
    }
}