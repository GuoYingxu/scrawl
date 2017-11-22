$(function() {

  // drawImg();

  Scrawl.init({
    target: $("#imgContainerCopy")[0],
    data: $("#imgContainer img")[0]
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
    console.log(Scrawl.getImage())
    img.src = Scrawl.getImage();
    document.body.appendChild(img)
  })
})

function drawImg() {
  var img = $("#imgContainer img")[0];
  var canvas = document.getElementById('imgCanvas')
  var ctx = canvas.getContext('2d')

  var devPixelRatio = window.devicePixelRatio || 1;
  var backingStorePixelRatio = ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio || 1;
  var ratio = devicePixelRatio / backingStorePixelRatio;
  canvas.width = canvas.width * ratio;
  canvas.height = canvas.height * ratio;

  ctx.drawImage(img, 0, 0, 400, 300)
}