$(function() {
  Scrawl.init({
    target: $("#imgContainerCopy")[0],
    data: $("#imgContainer img")[0],
    targetWidth: 200,
    targetHeight: 150,
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