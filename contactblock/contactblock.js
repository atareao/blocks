
const contactblock_ready = (callaback) => {
    if (document.readyState != "loading"){
        callaback();
    }else{
        document.addEventListener("DOMContentLoaded", callaback);
    }
}

contactblock_ready(()=>{
    console.log("Cargado");
    const button = document.getElementById("atareao-contactblock-button-enviar");
    if (button == null){
        return;
    }
    atareao_contactblock_randomize_animal();
    button.addEventListener('click', function (event) {
        // Log the clicked element in the console
        const message = get_content();
        const message_box = document.getElementsById("atareao-contactblock-div-resultado");
        const message_box_content = document.getElementById("atareao-contactblock-content-resultado")
        const resultado = document.getElementById("atareao-contactblock-span-resultado");
        if(!validate_text(message)){
            message_box_content.textContent = "El mensaje no es válido";
            message_box.style.visibility = "visible";
            message_box.style.backgroundColor = "red";
            return;
        }
        if(!validate_human()){
            message_box_content.textContent = "No pareces ser humano. Selecciona el animal correcto";
            message_box.style.visibility = "visible";
            message_box.style.color = "red";
            clear_content();
            return;
        }
        message_box_content.textContent = "";
        message_box.style.visibility = "hidden";
        message_box.style.color = "black";
        console.log(event.target);
        console.log("Enviar");
        const headers = new Headers({
            "Content-Type": "application/json"
        });
        fetch(php_vars.url,{
            method: "post",
            headers: headers,
            credentials: "same-origin",
            body: JSON.stringify({message: message})
        })
            .then(response => {
                console.log(response.ok);
                const result = response.json();
                if(response.ok){
                    message_box_content.textContent = "Tu mensaje ha sido enviado!";
                    message_box.style.visibility = "visible";
                    message_box.style.color = "green";
                }else{
                    message_box_content.textContent = "No he podido enviar el mensaje";
                    message_box.style.visibility = "visible";
                    message_box.style.color = "red";
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
    document.getElementById("atareao-contactblock-textarea-content").value = "";
}

function get_content(){
    return DOMPurify.sanitize(document.getElementById("atareao-contactblock-textarea-content").value);
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
