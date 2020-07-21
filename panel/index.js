// panel/index.js, this filename needs to match the one registered in package.json

var path = require('path');
var fs = require('fs');
var Electron = require("electron");

Editor.Panel.extend({
  // css style for panel

  style: `
    :host { margin: 5px; }
    h2 { color: #f90; }
  `,

  template: fs.readFileSync(Editor.url("packages://cb-hot-update-support/panel/index.html", "utf8")) + "",

  ready () {
    new window.Vue({
      el: this.shadowRoot,
      data: {
        hotCode: "if (jsb) {\n\tvar hotUpdateSearchPaths = localStorage.getItem('HotUpdateSearchPaths');\n\tif (hotUpdateSearchPaths) {\n\t\tjsb.fileUtils.setSearchPaths(JSON.parse(hotUpdateSearchPaths));\n\t}\n}\n",
      },

      methods: {
        onConfirm ( event ) {
          Electron.shell.openExternal("https://github.com/ChenBiaoHub")
          event.stopPropagation();
        },

        // updateCode() {
        //   this.hotCode = this.newCode;
        //   Editor.log('genxing');
        // },

      },
    });
  },
});