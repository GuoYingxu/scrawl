import zrender from 'zrender'
import Rect from 'zrender/lib/graphic/shape/Rect'
import Image from 'zrender/lib/graphic/Image'
import Container from 'zrender/lib/container/Group'
import { Group, Text } from 'zrender/lib/export'
import _ from 'lodash'

/**
 * 
 * @param {*} options 
 * 初始化容器
 */
let __zr = null;
let drawType = "";

let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;
let shapes = []; //存放记录
let isDown = false;
let input = null;
let msgCallback = null

function init(options) {
  msgCallback = options.callback

  __zr = zrender.init(options.target)
  let img = options.data || options.target
  __zr.add(new Image({
    style: {
      image: img,
      x: 0,
      y: 0,
    }
  }))
  __zr.on("mousedown", e => {
    startX = e.offsetX;
    startY = e.offsetY;
    if (drawType === "") {
      if (input) {
        if (e.event.target !== input) {
          addText();
        }
      }
      return
    }
    if (drawType === "rect") {
      isDown = true;
    } else if (drawType === "text") {
      if (!input) {
        initText(e.offsetX, e.offsetY);
      }
    }
  })
  __zr.on("mouseup", e => {
    endX = e.offsetX;
    endY = e.offsetY;
    isDown = false
    if (drawType == "rect") {
      drawRect();
      if (msgCallback && typeof msgCallback === "function") {
        msgCallback.call(this, "rect")
      }
    }
    drawType = "";

  })
  __zr.on("mousemove", e => {
    if (!isDown) return
    if (drawType === "rect") {
      endX = e.offsetX;
      endY = e.offsetY;
      drawRect();
    }
  })
}
/**
 *  DrawRect
 */

function startRect() {
  drawType = "rect";
  let temp = new Rect({
    shape: {
      x: startX,
      y: startY,
      width: 0,
      height: 0,
    },
    style: {
      fill: "none",
      stroke: "red"
    }

  });
  __zr.add(temp);
  shapes.push(temp.id);
}

function drawRect() {
  if (drawType === "rect") {
    let id = _.last(shapes);
    if (id) {
      let list = __zr.storage.getDisplayList()
      let s = _.find(list, c => c.id == id)

      let _sx = startX > endX ? endX : startX;
      let _sy = startY > endY ? endY : startY;
      let _w = Math.abs(startX - endX);
      let _h = Math.abs(startY - endY);
      if (s) {
        s.setShape({ x: _sx, y: _sy, width: _w, height: _h })
      }
    } else {
      drawType = "";
    }
  }

}
/**
 * removeByStep
 */
function removeByStep() {
  if (shapes.length > 0) {
    let id = shapes.splice(shapes.length - 1, 1);
    if (id) {
      let list = __zr.storage.getDisplayList()
      let s = _.find(list, sub => sub.id == id)
      if (s) {
        __zr.remove(s)
      }
    }
  }
}
/**
 * remove all
 */
function removeAll() {
  if (shapes.length > 0) {
    let list = __zr.storage.getDisplayList()
    shapes.forEach((id) => {
      let s = _.find(list, sub => sub.id == id)
      if (s) {
        __zr.remove(s)
      }
    })
    shapes = [];
  }
}

function startText() {
  drawType = "text";
}

function initText(px, py) {
  input = document.createElement('textArea');
  __zr.dom.appendChild(input)
  input.style.border = "1px solid red";
  input.style.position = "absolute";
  input.style.left = px + 'px';
  input.style.top = py + 'px';
  input.style.fontSize = "18px"
  input.style.color = "red"
  input.style.background = "transparent"
  __zr.dom.getElementsByTagName("div")[0].appendChild(input);
  setTimeout(() => {
    input.focus()
  }, 100)
}

function addText() {
  if (!input) return
  if (input.value.trim().length > 0) {

    var temp = new Text({
      style: {
        text: input.value,
        textFill: "red",
        font: "18px sans-serif"
      },
      position: [parseInt(input.style.left.replace('px', '')), parseInt(input.style.top.replace('px', ''))]
    })
    shapes.push(temp.id);
    __zr.add(temp)
  }
  __zr.dom.getElementsByTagName("div")[0].removeChild(input)
  input = null;
  if (msgCallback && typeof msgCallback === "function") {
    msgCallback.call(this, "text")
  }
}

function getImage() {
  return __zr.dom.getElementsByTagName("canvas")[0].toDataURL('image/png')
}

function stopAll() {
  drawType = "";
}
/**
 * 
 * @param {*} options
 * 
 *  {
 *    target: HTMLElement ,
 *    data:  url || HTMLImageElement|| base64data
 *  
 *  }  
 */
global.Scrawl = {
  init: init,
  startRect: startRect,
  removeByStep: removeByStep,
  removeAll: removeAll,
  startText: startText,
  getImage: getImage,
  stopAll: stopAll
}