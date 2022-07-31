( function( blocks, i18n, element, blockEditor ) {
    var __ = i18n.__;
    var useBlockProps = blockEditor.useBlockProps;
    var handleClick = function handleClick(event) {
         console.log(event);
    };
    const el = wp.element.createElement;
    const blockIcon = el("span",
        {
            className: "block-editor-block-icon has-colors",
            style: {
                color: "rgb(255, 0, 0)"
            },
        },
        el("svg",
            {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                role: "img",
                focusable: "false"
            },
            el("path",
                {
                    d: "M21.8 8s-.195-1.377-.795-1.984c-.76-.797-1.613-.8-2.004-.847-2.798-.203-6.996-.203-6.996-.203h-.01s-4.197 0-6.996.202c-.39.046-1.242.05-2.003.846C2.395 6.623 2.2 8 2.2 8S2 9.62 2 11.24v1.517c0 1.618.2 3.237.2 3.237s.195 1.378.795 1.985c.76.797 1.76.77 2.205.855 1.6.153 6.8.2 6.8.2s4.203-.005 7-.208c.392-.047 1.244-.05 2.005-.847.6-.607.795-1.985.795-1.985s.2-1.618.2-3.237v-1.517C22 9.62 21.8 8 21.8 8zM9.935 14.595v-5.62l5.403 2.82-5.403 2.8z"
                }
            ),
        ),
    );

    var blockStyle = {
        backgroundColor: '#900',
        color: '#fff',
        padding: '20px',
    };

    blocks.registerBlockType( 'atareao/formblock', {
        title: __("Atareao Form Block"),
        icon: blockIcon,
        category: "embed",
        attributes: {
            question: {
                type: "string",
            },
            help: {
                type: "string"
            }
        },
        edit: function(props) {
            let blockProps = wp.blockEditor.useBlockProps();
            function update_question(event) {
                props.setAttributes({question: event.target.value});
            }
            function update_help(event) {
                props.setAttributes({help: event.target.value});
            }
            return el(
                "div",
                {className: "block-editor-block-list__block wp-block wp-block-embed"},
                el(
                    "div",
                    {className: "components-placeholder wp-block-embed is-large"},
                    el(
                        "div",
                        {
                            className: "components-placeholder__label"
                        },
                        blockIcon,
                        "Custom URL de YouTube"
                    ),
                    el(
                        "div",
                        {
                            for: "question",
                            className: "components-placeholder__instructions"
                        },
                        "Introduce la pregunta: "
                    ),
                    el(
                        "input",
                        {
                            id: "question",
                            type: "text",
                            value: props.attributes.question,
                            onChange: update_question
                        }
                    ),
                    el(
                        "div",
                        {
                            for: "help",
                            className: "components-placeholder__instructions"
                        },
                        "Introduce la ayuda: "
                    ),
                    el(
                        "input",
                        {
                            id: "help",
                            type: "text",
                            value: props.attributes.help,
                            onChange: update_help
                        }
                    ),
                ),
            );
        },
        save: function(props) {
            //let blockProps = wp.blockEditor.useBlockProps.save();
            let blockProps = wp.blockEditor.useBlockProps.save();
            return el(
                "div",
                {className: "block-editor-block-list__block wp-block wp-block-embed"},
                el(
                    "div",
                    {class: "miform"},
                    el(
                        "label",
                        {class: "question row"},
                        el(
                            "span",
                            {class: "question"},
                            props.attributes.question
                        )
                    ),
                    el(
                        "label",
                        {class: "help row"},
                        el(
                            "span",
                            {class: "help"},
                            props.attributes.help
                        )
                    ),
                    el(
                        "div",
                        {class: "row"},
                        el(
                            "label",
                            {class: "label"},
                            "Correo: "
                        ),
                        el(
                            "input",
                            {
                                class: "atareao-formblock-input",
                                id: "atareao-formblock-input-email",
                                type: "text",
                                placeholder: "email"
                            }
                        ),
                    ),
                    el(
                        "textarea",
                        {
                            class: "atareao-formblock-textarea row",
                            id: "atareao-formblock-textarea-answer",
                            name: "answer",
                            placeholder: "tu respuesta"
                        }
                    ),
                    el(
                        "div",
                        {
                            class: "atareao-formblock-div row"
                        },
                        el(
                            "label",
                            {
                                class: "atareao-formblock-label row",
                                id: "atareao-formblock-label-for-select-animal",
                                for: "select-animal",
                            },
                            human_q()
                        ),
                    ),
                    el(
                        "div",
                        {
                            class: "atareao-formblock-div row",
                        },
                        el(
                            "select",
                            {
                                class: "atareao-formblock-select",
                                name: "select-animal",
                                id: "atareao-formblock-select-animal",
                                multiple: "multiple"
                            },
                            human()
                        ),
                    ),
                    el(
                        "div",
                        {
                            class: "atareao-formblock-div row",
                        },
                        el(
                            "button",
                            {
                                class: "atareao-formblock-button",
                                id: "atareao-formblock-button-enviar",
                            },
                            "Enviar"
                        )
                    ),
                    el(
                        "div",
                        {
                            class: "atareao-formblock-div row"
                        },
                        el(
                            "span",
                            {
                                class: "atareao-formblock-span",
                                id: "atareao-formblock-span-resultado",
                                style: "visibility:hidden"
                            },
                            "Resultado"
                        )
                    )
                )
            );
        },
    } );
}( window.wp.blocks, window.wp.i18n, window.wp.element, window.wp.blockEditor ) );

function human_q(){
    const animals = ["\u{1F980}", "\u{1F40D}", "\u{1F427}", "\u{1F404}", "\u{1F416}", "\u{1F40E}"];
    //const animals = ["\u{1F980}", "\u{1F40D}", "\u{1F427}", "\u{1F404}"];
    const i = Math.floor(Math.random() * animals.length);
    return [wp.element.createElement("label", {}, "¿Eres un ser humano?. Selecciona "),
            wp.element.createElement(
                "span",
                {
                    id: "random-animal"
                },
                animals[i])];
}

function human(){
    let q = [];
    let animals = ["\u{1F980}", "\u{1F40D}", "\u{1F427}", "\u{1F404}", "\u{1F416}", "\u{1F40E}"];
    //let animals = ["\u{1F980}", "\u{1F40D}", "\u{1F427}", "\u{1F404}"];
    let total = animals.length;
    for(let i=0; i < total; i++){
        const is = Math.floor(Math.random() * animals.length)
        const selected = animals.splice(is, 1);
        q.push(wp.element.createElement(
            "option",
            {
                class: "cell",
                value: `${selected}`
            },
            selected))
    }
    return q;
}
