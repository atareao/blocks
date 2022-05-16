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

    blocks.registerBlockType( 'atareao/audioblock', {
        title: __("Audio Atareao Block"),
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
            //let blockProps = wp.blockEditor.useBlockProps.save();
            let url = `https://www.youtube.com/embed/${props.attributes.ytId}?rel=0`;
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
                    {},
                ),
                wp.element.createElement(
                    "div",
                    {className: "controls"},
                    wp.element.createElement(
                        "button",
                        {className: "btn btn-primary", "data-action": "play"}
                    ),
                ),
            );
        },
    } );
}( window.wp.blocks, window.wp.i18n, window.wp.element, window.wp.blockEditor ) );
