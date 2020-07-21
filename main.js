
var path = require('path');
var fs = require('fs');

function onBuildFinished(options, callback) {
  var mainJsPath = path.join(options.dest, 'main.js');  // 获取发布目录下的 main.js 所在路径


  if(fs.existsSync(mainJsPath)) {
    Editor.log('[小黑屋] 正在进行文件写入');
    var script = fs.readFileSync(mainJsPath, 'utf8');     // 读取构建好的 main.js
    var hotSupport = "if (jsb) {\n\tvar hotUpdateSearchPaths = localStorage.getItem('HotUpdateSearchPaths');\n\tif (hotUpdateSearchPaths) {\n\t\tjsb.fileUtils.setSearchPaths(JSON.parse(hotUpdateSearchPaths));\n\t}\n}\n"
    var index = script.indexOf('window.boot');
    script = script.slice(0,index) + hotSupport + script.slice(index);
    fs.writeFileSync(mainJsPath, script);                 // 保存 main.js
    Editor.log('[小黑屋] 文件写入完成');
  } else {
    Editor.log('[小黑屋]不需要写入');
  }


  callback();
};


module.exports = {
  load () {
    Editor.Builder.on('build-finished', onBuildFinished);
  },

  unload () {
    Editor.Builder.removeListener('build-finished', onBuildFinished);
  },


  // register your ipc messages here
  messages: {
    'open' () {
      Editor.Panel.open('cb-hot-update-support');
    },
  },
};