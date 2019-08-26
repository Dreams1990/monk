var page = 0;
var moveStep;
var currentLeft = 0;
var liDom = document.getElementById("wrapper").getElementsByTagName("li");
var pagesLiDom  = document.getElementById("pages").getElementsByTagName("li");
var nextDom = document.getElementById('next');
var backDom = document.getElementById('back');
var cliHeight = document.documentElement.clientHeight;
var cliWidth = document.documentElement.clientWidth;
var imageDom,imageWidth
liDom[page].style.display = "block"


setTimeout(function(){
  document.getElementById("patience").style.display = "block"
}, 1000)
setTimeout(function(){
  document.getElementById("welcome").style.display = "none"
  document.getElementById("main").style.display = "block"
  imageDom = document.getElementById('image');
  imageWidth = imageDom.width;
  PageSwhich();
}, 4200)


nextDom.onclick = function(e) {
  if (page !== 8) {
    moveStep = parseInt((imageWidth - cliWidth - currentLeft) / (8 - page))
  } else {
    moveStep = parseInt(cliWidth * 2 / 3)
  }
  currentLeft = moveStep + currentLeft
  animate(imageDom, {
    left: -currentLeft
  }, 10)
  page++
  if (page == 9) {
    this.style.display = "none"
  }
  if (page == 1) {
    document.getElementById('back').style.display = "block"
  }
  currentSlide(page)
  pages(page)
}

backDom.onclick = function(e) {
  if (page === 9) {
    moveStep = parseInt(cliWidth * 2 / 3)
  } else {
    moveStep = parseInt(currentLeft / page)
  }
  currentLeft = currentLeft - moveStep
  animate(imageDom, {
    left: -currentLeft
  }, 10)
  page--
  if (page == 0) {
    this.style.display = "none"
  }
  if (page == 8) {
    nextDom.style.display = "block"
  }

  currentSlide(page)
  pages(page)
}

function currentSlide(page){
  for (i = 0; i < liDom.length; i++) {
    if (i == page) {
      liDom[i].style.display = "block"
    } else {
      liDom[i].style.display = "none"
    }
  }
}

function pages(page){
  for (i = 0; i < pagesLiDom.length; i++) {
    if (i == page) {
      pagesLiDom[i].setAttribute("class","cur")
    } else {
      pagesLiDom[i].setAttribute("class","")
    }
  }
}


function animate(dom, o, time, fn) {
  if (time == undefined) {
    time = 10;
  }

  clearInterval(dom.termId);

  dom.termId = setInterval(function() {
    dom.isOver = true;
    for (var property in o) {
      if (property == "opacity") {
        var currentValue = parseInt(getStylePropertyValue(dom, property) * 100);
      } else {
        var currentValue = parseInt(getStylePropertyValue(dom, property));
      }
      var speed = (o[property] - currentValue) / 10;
      speed = currentValue > o[property] ? Math.floor(speed) : Math.ceil(speed)
      currentValue += speed;
      if (currentValue != o[property]) {
        dom.isOver = false;
      }
      if (property == "opacity") {
        dom.style.opacity = currentValue / 100;
        dom.style.filter = 'alpha(opacity= ' + currentValue + ')';
      } else {
        dom.style[property] = currentValue + "px";
      }
    }
    if (dom.isOver) {
      clearInterval(dom.termId);
      if (fn) {
        fn();
      }
    }
  }, time)
}


function getStylePropertyValue(dom, property) {
  if (window.getComputedStyle) {
    return getComputedStyle(dom, null)[property];
  } else {
    return dom.currentStyle[property];
  }
}

function PageSwhich() {
  document.getElementById('image').style.height = cliHeight + "px";
}

window.onresize = function() {
  cliHeight = document.documentElement.clientHeight;
  cliWidth = document.documentElement.clientWidth;
  imageWidth = document.getElementById('image').width;
  if (imageWidth < currentLeft) {
    currentLeft = imageWidth - cliWidth;
    animate(document.getElementById('image'), {
      left: -currentLeft
    }, 10)
    page = 8;
    currentSlide(page)
    pages(page)
    nextDom.style.display = "block"
  }
  document.getElementById('image').style.height = cliHeight + "px";
}
