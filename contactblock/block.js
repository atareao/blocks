( function( blocks, i18n, _element, blockEditor ) {
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
                    d: "M 1.7822188,0 C 0.79793575,0.0028 0.00122075,0.925135 3.7527767e-6,2.062634 v 12.987548 6.887608 0.0025 c 1.30000003e-5,0.0016 -1.3e-5,0.0034 0,0.005 C 2.9475278e-4,21.99135 0.00230375,22.03693 0.00520375,22.082232 c 0.02578,0.908979 0.25205,1.833181 1.51970405,1.915195 l -0.0074,-0.02398 c 0.0016,2.57e-4 0.0032,7.69e-4 0.0048,0.001 4.92e-4,0.0079 0.0022,0.015 0.0026,0.02298 h 0.259483 1.414614 l 19.0166302,0.0025 c 0.983777,-0.0028 1.780722,-0.92272 1.784375,-2.059634 V 2.062634 C 23.99871,0.924138 23.200778,0.00141 22.215635,0 Z M 1.1335118,4.97941 H 22.937418 v 17.160295 c 0.0013,0.314742 -0.219368,0.570764 -0.491719,0.57076 H 3.1989948 v -0.0025 h -1.644689 c -0.178557,2e-6 -0.334653,-0.110389 -0.420794,-0.274885 z m 6.215478,2.733352 c -0.195592,0.0086 -0.39472,0.110851 -0.560051,0.342856 l -1.24249,1.791248 -0.422957,-0.537274 c -0.592192,-0.915087 -1.803244,0.02123 -1.297414,1.003079 v -0.008 l 1.01847,1.45339 c 0.238001,0.417703 0.724475,0.532417 1.085071,0.255892 0.07077,-0.05674 0.133473,-0.125495 0.185963,-0.204414 l 1.87779,-2.607905 C 8.4893628,8.505609 7.9357618,7.68717 7.3489898,7.71276 Z M 10.96272,9.002221 c -1.1491312,-0.06911 -1.1491312,1.960316 0,1.891205 h 8.551256 c 1.035592,-0.06228 1.035592,-1.828923 0,-1.891205 z m -7.0570672,4.97741 c -0.003,0 -0.0057,9.47e-4 -0.0086,9.98e-4 -0.03034,6.4e-4 -0.06012,0.0045 -0.08909,0.01052 -0.0098,0.0021 -0.01935,0.0044 -0.02898,0.007 -0.02546,0.0069 -0.04997,0.01568 -0.07395,0.02649 -0.01075,0.0049 -0.02115,0.0099 -0.03157,0.0155 -0.02044,0.01098 -0.04024,0.02337 -0.05925,0.03698 -0.01218,0.0088 -0.02393,0.01773 -0.03546,0.02749 -0.01772,0.01498 -0.03455,0.03125 -0.0506,0.04848 -0.0091,0.0098 -0.01782,0.01995 -0.02638,0.03049 -0.01664,0.02042 -0.03203,0.04217 -0.04627,0.06497 -0.0057,0.0091 -0.01158,0.01797 -0.01687,0.02749 -0.01492,0.02671 -0.02836,0.05473 -0.03979,0.08396 -0.0028,0.007 -0.0053,0.01425 -0.0078,0.0215 -0.01201,0.03398 -0.02165,0.06937 -0.02854,0.105951 -3.1e-4,0.0017 -9.96e-4,0.0032 -0.0013,0.005 -5.8e-5,3.07e-4 5.6e-5,6.91e-4 0,9.98e-4 -1.16e-4,6.65e-4 -3.1e-4,0.0014 -4.43e-4,0.002 -0.0073,0.04112 -0.01109,0.08338 -0.01124,0.126947 v 3.958839 c 0,0.354727 0.248779,0.64223 0.555726,0.64223 h 4.06523 c 0.267479,0 0.490613,-0.218408 0.543617,-0.509286 2.17e-4,-0.0012 6.42e-4,-0.0023 8.63e-4,-0.0035 5.32e-4,-0.003 7.97e-4,-0.006 0.0013,-0.009 0.0055,-0.03345 0.0083,-0.0679 0.0091,-0.102958 1.78e-4,-0.0062 0.0017,-0.01217 0.0017,-0.01849 v -3.958338 c 0,-0.0075 -0.0015,-0.01453 -0.0017,-0.02199 -8.86e-4,-0.02667 -0.0033,-0.05272 -0.0069,-0.07847 -0.003,-0.02197 -0.0072,-0.04331 -0.01211,-0.06447 -0.0038,-0.01627 -0.0081,-0.03225 -0.01297,-0.04798 -0.0083,-0.02715 -0.01817,-0.05313 -0.02941,-0.07847 -0.004,-0.009 -0.0082,-0.01777 -0.01254,-0.02649 -0.01298,-0.02615 -0.02732,-0.05079 -0.04325,-0.07447 -0.0066,-0.0097 -0.01331,-0.01922 -0.02033,-0.02849 -0.01647,-0.02177 -0.03392,-0.04195 -0.05276,-0.06097 -0.008,-0.0081 -0.01624,-0.01591 -0.02465,-0.02349 -0.01975,-0.01774 -0.0401,-0.0339 -0.06184,-0.04848 -0.01018,-0.0068 -0.02056,-0.01337 -0.03114,-0.0195 -0.0179,-0.01029 -0.03599,-0.01944 -0.05492,-0.02749 -0.01816,-0.0079 -0.03679,-0.01438 -0.05579,-0.01999 -0.01389,-0.004 -0.02767,-0.0077 -0.04195,-0.01052 -0.02715,-0.0054 -0.05469,-0.0092 -0.08303,-0.0099 -0.0035,-7.7e-5 -0.0068,-9.99e-4 -0.01038,-9.99e-4 z m 0.556158,1.284461 h 2.949022 v 1.890706 c 0.0014,0.0018 0.0025,0.0042 0.0039,0.006 v 0.778174 h -2.949455 v -1.891206 c -0.0012,-0.0016 -0.0022,-0.0034 -0.0035,-0.005 z m 6.5009092,0.391335 c -1.1491312,-0.06911 -1.1491312,1.960317 0,1.891207 h 8.551256 c 1.035592,-0.06228 1.035592,-1.828925 0,-1.891207 z"
                }
            ),
        ),
    );

    var blockStyle = {
        backgroundColor: '#900',
        color: '#fff',
        padding: '20px',
    };

    blocks.registerBlockType( 'atareao/contactblock', {
        title: __("Atareao Contact Block"),
        icon: blockIcon,
        category: "embed",
        attributes: {
            message: {
                type: "string",
            }
        },
        edit: function(props) {
            let blockProps = wp.blockEditor.useBlockProps();
            function update_message(event) {
                props.setAttributes({message: event.target.value});
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
                        "Contact form"
                    ),
                    el(
                        "div",
                        {
                            for: "message",
                            className: "components-placeholder__instructions"
                        },
                        "Escribe el mensaje:"
                    ),
                    el(
                        "textarea",
                        {
                            id: "message",
                            value: props.attributes.message,
                            onChange: update_message
                        }
                    ),
                ),
            );
        },
        save: function(props) {
            let blockProps = wp.blockEditor.useBlockProps;
            return el(
                "div",
                {className: "block-editor-block-list__block wp-block wp-block-embed"},
                el(
                    "div",
                    {class: "miform"},
                    el(
                        "label",
                        {class: "atareao-contactblock-label"},
                        props.attributes.message
                    ),
                    el(
                        "input",
                        {
                            className: "atareao-contactblock-input row",
                            id: "atareao-contactblock-input-contact",
                            name: "contact",
                            placeholder: "Nombre o correo o contacto (opcional)"
                        }
                    ),
                    el(
                        "textarea",
                        {
                            className: "atareao-contactblock-textarea row",
                            id: "atareao-contactblock-textarea-content",
                            name: "message",
                            placeholder: "Escribe aquí lo que quieras contarme"
                        }
                    ),
                    el(
                        "div",
                        {
                            id: "atareao-contactblock-alert-div",
                            className: "atareao-contactblock-alert atareao-contactblock-alert-white rounded atareao-contactblock-hidden"
                        },
                        el(
                            "button",
                            {
                                id: "atareao-contactblock-alert-button",
                                type: "button",
                                className: "close",
                                "data-dismiss": "atareao-contactblock-alert",
                                "aria-hidden": true
                            },
                            "x"
                        ),
                        el(
                            "div",
                            {
                                className: "icon"
                            },
                            el(
                                "span",
                                {
                                    id: "atareao-contactblock-alert-state-icon",
                                    className: "atareao-contactblock-alert-state-icon"
                                },
                                "❌"
                            )
                        ),
                        el(
                            "span",
                            {
                                id: "atareao-contactblock-alert-state"
                            },
                            "¡Conseguido!"
                        ),
                        el(
                            "span",
                            {
                                id: "atareao-contactblock-alert-message"
                            },
                            "Mensaje envíado"
                        )
                    ),
                    el(
                        "div",
                        {
                            class: "atareao-contactblock-div row"
                        },
                        el(
                            "label",
                            {
                                class: "atareao-contactblock-label row",
                                id: "atareao-contactblock-label-for-select-animal",
                                for: "select-animal",
                            },
                            atareao_contactblock_human_q()
                        ),
                    ),
                    el(
                        "div",
                        {
                            class: "atareao-contactblock-div row",
                        },
                        atareao_contactblock_human()
                    ),
                    el(
                        "div",
                        {
                            class: "atareao-contactblock-div row",
                        },
                        el(
                            "button",
                            {
                                class: "atareao-contactblock-button",
                                id: "atareao-contactblock-button-enviar",
                            },
                            "Enviar"
                        )
                    ),
                )
            );
        },
    } );
}( window.wp.blocks, window.wp.i18n, window.wp.element, window.wp.blockEditor ) );

function atareao_contactblock_human_q(){
    return [wp.element.createElement("label", {}, "¿Eres un ser humano?. Selecciona "),
            wp.element.createElement(
                "span",
                {
                    id: "random-animal",
                    value: "option1"
                },
                "")];
}

function atareao_contactblock_human(){
    let q = [];
    let animals = {option1: "\u{1F980}",
                   option2: "\u{1F40D}",
                   option3: "\u{1F427}",
                   option4: "\u{1F40B}",
                   option5: "\u{1F9AD}",
                   option6: "\u{1F98A}"
    };
    for(const [key, value] of Object.entries(animals)){
        q.push(wp.element.createElement(
            "input",
            {
                class: "atareao-contactblock-input-for-selection",
                type: "radio",
                name: "animal",
                value: key,
                id: key
            }
        ));
        q.push(wp.element.createElement(
            "label",
            {
                class: "atareao-contactblock-label-for-selection",
                for: key
            },
            value
        ));
    }
    return q;
}
