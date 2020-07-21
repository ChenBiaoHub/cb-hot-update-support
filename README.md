# cb-hot-update-support
cocoscreator 热更新编译后自动在 main.js 中添加寻找路径的代码
```
if (jsb) {
        var hotUpdateSearchPaths = localStorage.getItem('HotUpdateSearchPaths');
        if (hotUpdateSearchPaths) {
                jsb.fileUtils.setSearchPaths(JSON.parse(hotUpdateSearchPaths));
        }
}
```
