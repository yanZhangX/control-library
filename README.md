## 子应用模板

#### 注意事项

1. 页面布局可以用flex，不兼容IE，但是注意兼容小屏幕，如笔记本。
2. 面包屑应正确反映页面层次，可点击的面包屑应有蓝色标识，鼠标放上去有手形。
3. 关键错误应有捕获和异常上报。
4. 搜索需要把搜索条件放进url,这样返回的时候就可以拿到原来的搜索条件。
5. 如果取消按钮和其他主要按钮放一起，那么取消按钮在左边，其他按钮在右边
6. `const.js`里面有系统注册名称需要修改成自己的应用名称
7. 不允许使用`this.$message`系列方法，应当使用`this.$messageSend`。

