Template.registerHelper("string", function (key) {
    let lang = Session.get("lang");

    lang = "pt";

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
    "step": {
        "pt": "Passo",
        "en": "Step"
    },
    "select_template_info": {
        "pt": "Selecione o modelo para o qual você deseja atualizar",
        "en": "Select the template you wish to update."
    },
    "select_list_info": {
        "pt": "Pesquise e escolha o item a ser adicionado",
        "en": "Search and choose the item to add"
    },
    "select_image": {
        "pt": "Selecione uma imagem",
        "en": "Select an image"
    },
    "select_video": {
        "pt": "Selecione um video",
        "en": "Select a video"
    },
    "select_template": {
        "pt": "Selecione uma tela",
        "en": "Select a template"
    },
    "display_is_live": {
        "pt": "Atualmente, este modelo está sendo reproduzido ao vivo na tela.",
        "en": "This display is currently playing live on your screen."
    },
    "go_live": {
        "pt": "Ativar ao vivo!",
        "en": "Go Live!"
    }
}
