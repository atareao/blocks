
const Status = {
    Success: 0,
    Info: 1,
    Warning: 2,
    Error: 3,
};

class AtareaoContactBlockAlertMessage{
    constructor(){
        this._divEl = document.getElementById("atareao-contactblock-alert-div");
        this._buttonEl = document.getElementById("atareao-contactblock-alert-button");
        this._iconEl = document.getElementById("atareao-contactblock-alert-state-icon");
        this._stateEl = document.getElementById("atareao-contactblock-alert-state");
        this._messageEl = document.getElementById("atareao-contactblock-alert-message");
        this._buttonEl.addEventListener("click", ()=>{
            this.hide();
        });
    }
    _show(kind, state, message){
        if(this._divEl.classList.contains("atareao-contactblock-hidden")){
            this._divEl.classList.remove("atareao-contactblock-hidden");
        }
        switch(kind){
            case Status.Success:
                this._setStatusBase(state, message);
                this._divEl.classList.add("atareao-contactblock-alert-success");
                this._iconEl.textContent = "\u{2713}";
                break;
            case Status.Warning:
                this._setStatusBase(state, message);
                this._divEl.classList.add("atareao-contactblock-alert-warning");
                this._iconEl.textContent = "\u{26A0}";
                break;
            case Status.Error:
                this._setStatusBase(state, message);
                this._divEl.classList.add("atareao-contactblock-alert-danger");
                this._iconEl.textContent = "\u{274C}";
                break;
            default:
                this._setStatusBase(state, message);
                this._divEl.classList.add("atareao-contactblock-alert-info");
                this._iconEl.textContent = "\u{1F4E3}";
        }
        setTimeout(()=>{
            this.hide();
        }, 10000);
    }
    success(state, message){
        this._show(Status.Success, state, message);
    }
    info(state, message){
        this._show(Status.Info, state, message);
    }
    warning(state, message){
        this._show(Status.Warning, state, message);
    }
    error(state, message){
        this._show(Status.Error, state, message);
    }
    hide(){
        if(!this._divEl.classList.contains("atareao-contactblock-hidden")){
            this._divEl.classList.add("atareao-contactblock-hidden");
        }
    }
    _setStatusBase(state, message){
        this._divEl.className = "";
        this._divEl.classList.add("atareao-contactblock-alert");
        this._divEl.classList.add("atareao-contactblock-alert-white");
        this._divEl.classList.add("rounded");
        this._stateEl.textContent = state;
        this._messageEl.textContent = message;
    }

}

const contactblock_ready = (callaback) => {
    if (document.readyState != "loading"){
        callaback();
    }else{
        document.addEventListener("DOMContentLoaded", callaback);
    }
}

contactblock_ready(()=>{
    //console.log("Cargado");
    const button = document.getElementById("atareao-contactblock-button-enviar");
    if (button == null){
        return;
    }
    const alertMessage = new AtareaoContactBlockAlertMessage();
    atareao_contactblock_randomize_animal();
    button.addEventListener('click', function (event) {
        const data = get_content()
        if(!validate_text(data.message)){
            alertMessage.error("Error", "El mensaje no es válido");
            return;
        }
        if(!validate_human()){
            alertMessage.error("Error", "No pareces ser humano. Seleciona el animal correcto");
            clear_content();
            return;
        }
        alertMessage.hide();
        //console.log("Enviar");
        const headers = new Headers({
            "Content-Type": "application/json"
        });
        //console.log(atareao_contactblock_vars.url);
        fetch(atareao_contactblock_vars.url,{
            method: "post",
            headers: headers,
            credentials: "same-origin",
            body: JSON.stringify(data)
        })
            .then(response => {
                //console.log(response.ok);
                const result = response.json();
                if(response.ok){
                    alertMessage.success("¡Conseguido!", "Mensaje envíado");
                    clear_content();
                }else{
                    alertMessage.error("Error!", "No he podido enviar el mensaje");
                }
                atareao_contactblock_randomize_animal();
            })
    });
});

function atareao_contactblock_randomize_animal(){
    const animals = {option1: "\u{1F980}",
                     option2: "\u{1F40D}",
                     option3: "\u{1F427}",
                     option4: "\u{1F40B}",
                     option5: "\u{1F9AD}",
                     option6: "\u{1F98A}"
    };
    var keys = Object.keys(animals);
    const i = Math.floor(Math.random() * keys.length);
    const key = keys[i];
    const value = animals[key];
    const random_animal = document.getElementById("random-animal");
    random_animal.textContent = value;
    random_animal.value = key;
}

function validate_text(text){
    return text && text !== "";
}

function clear_content(){
    document.getElementById("atareao-contactblock-input-contact").value = "";
    document.getElementById("atareao-contactblock-textarea-content").value = "";
}

function get_content(){
    return {
        contact: DOMPurify.sanitize(document.getElementById("atareao-contactblock-input-contact").value),
        message: DOMPurify.sanitize(document.getElementById("atareao-contactblock-textarea-content").value)
    }
}

function get_selected_option(){
    const options = document.getElementsByName("animal");
    for(let i=0;i < options.length; i++){
        if(options[i].checked){
            return options[i].value
        }
    }
    return null;
}

function validate_human(){
    const random_animal = document.getElementById("random-animal");
    const selected_animal = get_selected_option();
    return random_animal.value == selected_animal;
}
