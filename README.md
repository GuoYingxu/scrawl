# scrawl
  一个标注图片的小工具
# 为啥要写这个玩意
  最常用微信的截图和编辑功能，能画圈能写字，很棒。
  最近做了一个bug提报系统，希望用户可以直接截图 并标注图片提交到服务器端。于是随手写了这么个玩意。
# demo
  ```
  

  $(function() {
  Scrawl.init({
    target: $("#imgContainerCopy")[0],
    data: $("#imgContainer img")[0],
    callback: function(type) {
      console.log('-----')
      console.log(type)
    }
  })
  $("#rect").on('click', function() {
    Scrawl.startRect()
  })

  $("#clearByStep").on('click', () => {
    Scrawl.removeByStep()
  })

  $("#clearAll").on('click', () => {
    Scrawl.removeAll()
  })
  $("#text").on('click', () => {
    Scrawl.startText()
  })
  $("#capture").on('click', () => {
    var img = new Image();
    img.src = Scrawl.getImage()
    document.body.appendChild(img)
  })
})
```
