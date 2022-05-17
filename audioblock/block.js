( function( blocks, i18n, element, blockEditor ) {
    var __ = i18n.__;
    var useBlockProps = blockEditor.useBlockProps;
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
                    d: "M336 192h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16zM176 352c53.02 0 96-42.98 96-96h-85.33c-5.89 0-10.67-3.58-10.67-8v-16c0-4.42 4.78-8 10.67-8H272v-32h-85.33c-5.89 0-10.67-3.58-10.67-8v-16c0-4.42 4.78-8 10.67-8H272v-32h-85.33c-5.89 0-10.67-3.58-10.67-8v-16c0-4.42 4.78-8 10.67-8H272c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96z"
                }
            ),
        ),
    );

    var blockStyle = {
        backgroundColor: '#fff',
        color: '#900',
        padding: '20px',
    };

    blocks.registerBlockType( 'atareao/audioblock', {
        title: __("AudioBlock"),
        icon: blockIcon,
        category: "embed",
        attributes: {
            src: {
                type: "string",
                source: "attribute",
                selector: "audio",
                attribute: "src",
                default: ""
            },
            preload: {
                type: "string",
                source: "attribute",
                selector: "audio",
                attribute: "preload",
                default: "auto"
            },
            style: {
                type: "string",
                source: "attribute",
                selector: "audio",
                attribute: "style",
                default: "width: 100%"
            },
        },
        edit: function(props) {
            let blockProps = wp.blockEditor.useBlockProps();
            function updateSrc(event) {
                props.setAttributes({src: event.target.value});
            }
            return element.createElement(
                "div",
                {className: "block-editor-block-list__block wp-block wp-block-embed"},
                element.createElement(
                    "div",
                    {className: "components-placeholder wp-block-embed is-large"},
                    element.createElement(
                        "div",
                        {
                            className: "components-placeholder__label"
                        },
                        blockIcon,
                        "Custom URL de YouTube"
                    ),
                    element.createElement(
                        "div",
                        {
                            for: "src",
                            className: "components-placeholder__instructions"
                        },
                        "Introduce la url del audio: "
                    ),
                    element.createElement(
                        "input",
                        {
                            id: "src",
                            type: "text",
                            value: props.attributes.src,
                            onChange: updateSrc
                        }
                    ),
                ),
            );
        },
        save: function(props) {
            props.attributes.src = url;
            let blockProps = wp.blockEditor.useBlockProps.save();
            return wp.element.createElement(
                "div",
                {id: "player"},
                wp.element.createElement(
                    "div",
                    {id: "waveform"},
                ),
                wp.element.createElement(
                    "audio",
                    props.attributes,
                ),
                wp.element.createElement(
                    "div",
                    {className: "controls"},
                    wp.element.createElement(
                        "button",
                        {className: "btn btn-primary",
                         onclick: "wavesurfer.skipBackward()"}
                        wp.element.createElement(
                            "i"
                            {className: "fa fa-step-backward"}
                        ),
                        "Backward"
                    ),
                    wp.element.createElement(
                        "button",
                        {className: "btn btn-primary",
                         onclick: "wavesurfer.playPause()"}
                        wp.element.createElement(
                            "i"
                            {className: "fa fa-play"}
                        ),
                        "Play / ",
                        wp.element.createElement(
                            "i"
                            {className: "fa fa-pause"}
                        ),
                        "Pause",
                    ),
                    wp.element.createElement(
                        "button",
                        {className: "btn btn-primary",
                         onclick: "wavesurfer.skipForward()"}
                        wp.element.createElement(
                            "i"
                            {className: "fa fa-step-forward"}
                        ),
                        "Forward"
                    ),
                    wp.element.createElement(
                        "button",
                        {className: "btn btn-primary",
                         onclick: "wavesurfer.toggleMute()"}
                        wp.element.createElement(
                            "i"
                            {className: "fa fa-volume-off"}
                        ),
                        "Toggle Mute"
                    ),
                ),
            );
        },
    } );
}( window.wp.blocks, window.wp.i18n, window.wp.element, window.wp.blockEditor ) );
