
const contactblock_ready = (callaback) => {
    if (document.readyState != "loading"){
        callaback();
    }else{
        document.addEventListener("DOMContentLoaded", callaback);
    }
}

contactblock_ready(()=>{
    console.log("Cargado");
    randomize_animal();
    document.getElementById("atareao-contactblock-button-enviar").addEventListener('click', function (event) {
        // Log the clicked element in the console
        const data = get_data();
        const resultado = document.getElementById("atareao-contactblock-span-resultado");
        if(!validate_text(data.message)){
            resultado.textContent = "El mensaje no es válido";
            resultado.style.visibility = "visible";
            resultado.style.color = "red";
            return;
        }
        if(!validate_human()){
            resultado.textContent = "No pareces ser humano. Selecciona el animal correcto";
            resultado.style.visibility = "visible";
            resultado.style.color = "red";
            return;
        }
        resultado.textContent = "";
        resultado.style.visibility = "hidden";
        resultado.style.color = "black";
        console.log(event.target);
        console.log("Enviar");
        const headers = new Headers({
            "Content-Type": "application/json"
        });
        fetch(php_vars.url,{
            method: "post",
            headers: headers,
            credentials: "same-origin",
            body: JSON.stringify(data)
        })
            .then(response => {
                console.log(response.ok);
                const result = response.json();
                if(response.ok){
                    resultado.textContent = "Enviado con éxito";
                    resultado.style.visibility = "visible";
                    resultado.style.color = "green";
                }else{
                    resultado.textContent = "No he podido enviar el mensaje";
                    resultado.style.visibility = "visible";
                    resultado.style.color = "red";
                }
                randomize_animal();
            })
    });
});

function randomize_animal(){
    const animals = {option1: "\u{1F980}",
                     option2: "\u{1F40D}",
                     option3: "\u{1F427}",
                     option4: "\u{1F404}",
                     option5: "\u{1F416}",
                     option6: "\u{1F40E}"
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
    const reg = /^[a-zA-Z0-9\@\.\-\_\s]+$/
    return !text && reg.test(text);
}

function clear_data(){
    document.getElementById("atareao-contactblock-input-contact").value = "";
    document.getElementById("atareao-contactblock-textarea-content").value = "";
}

function get_data(){
    return {
        contact: DOMPurify.sanitize(document.getElementById("atareao-contactblock-input-contact").value),
        content: DOMPurify.sanitize(document.getElementById("atareao-contactblock-textarea-content").value)
    };
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
