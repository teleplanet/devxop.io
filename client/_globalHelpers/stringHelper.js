Template.registerHelper("string", function (key) {
    let lang = Session.get("lang");

    lang = "pt";

    console.log(strings["deviceEdit"]["startup_time"]);
    return strings[key][lang];
});


var strings = {
    "startup_time": {
        "pt": "Data de inicialização",
        "en": "Startup time"
    },
    "live_display": {
        "pt": "Tela selecionada",
        "en": "Selected display"
    },
    "update_device": {
        "pt": "Atualizar dispositivo",
        "en": "Update device"
    },
    "force_update": {
        "pt": "Forçar atualização",
        "en": "Force update"
    },
}
