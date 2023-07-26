import {
    translate
} from "./translateHelper";
import videojs from "video.js";

let enableTranslate = false;

export function translatePlugin(options = {}) {
    let oneRun = false;
    this.log = console.log;
    this.on('texttrackchange', (e) => {
        if (enableTranslate) {
            const tran = () => {
                const el = e.target.getElementsByClassName('vjs-text-track-display')[0];
                const text = el.textContent;
                if (!text) return;
                console.groupCollapsed(text)
                translate(text).then((res) => {
                    this.log(res);
                    e.target.querySelector('.vjs-text-track-cue div').append('  ' + res);
                    console.groupEnd();
                });
            }
            if (!oneRun) {
                oneRun = true;
                setTimeout(() => {
                    tran()
                }, 1000);
            } else {
                tran()
            }
        } else {

        }
    })
    if (options.initRefreshTranslateBtn) {
        refreshTranslateBtn(this);
    }
}

export function refreshTranslateBtn(player) {
    setTimeout(() => {
        player.getChild('ControlBar').getChild('SubsCapsButton').children()[1].addChild('textButton', {
            text: '翻译',
            seleced: enableTranslate,
            handleClick: (e) => {
                enableTranslate = e.seleced;
            }
        });
    }, 600);
}

let Component = videojs.getComponent('Component');
class TextButton extends Component {

    // The constructor of a component receives two arguments: the
    // player it will be associated with and an object of options.
    constructor(player, options = {}) {
        super(player, options);
        if (options.text) {
            this.updateTextContent(options.text);
            if (options.seleced) {
                this.el_.classList.add('vjs-selected')
            } else {
                this.el_.classList.remove('vjs-selected')
            }
        }
        this.on(['tap', 'click'], function () {

            // this.el_.setAttribute('class', 'vjs-selected');
            options.seleced = !options.seleced;
            if (options.seleced) {
                this.el_.classList.add('vjs-selected');
            } else {
                this.el_.classList.remove('vjs-selected');
            }
            (options.handleClick || this.handleClick)(options);
        });
    }

    // The `createEl` function of a component creates its DOM element.
    createEl() {
        return videojs.dom.createEl('li', {

            // Prefixing classes of elements within a player with "vjs-" 
            // is a convention used in Video.js.
            className: 'vjs-menu-item custom-cursor-on-hover'
        });
    }

    handleClick(e) {
        console.log(e)
    }

    // This function could be called at any time to update the text 
    // contents of the component.
    updateTextContent(text) {

        // If no text was provided, default to "Title Unknown"
        if (typeof text !== 'string') {
            text = 'Title Unknown';
        }

        // Use Video.js utility DOM methods to manipulate the content
        // of the component's element.
        videojs.emptyEl(this.el());
        videojs.appendContent(this.el(), text);
    }
}
videojs.registerComponent('textButton', TextButton);