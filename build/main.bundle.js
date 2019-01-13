'use strict';

console.log('main.bundle.js');

var se = document.querySelector('.scrollable-element');
var sb = document.querySelector('.scrollbar');
var dragging = false;
var yOffsetInSB;
createDivs(80);
applyScrollbarHeight();
se.addEventListener('scroll', moveScrollbar);
sb.addEventListener('mousedown', handleScrollbarMousedown);
sb.addEventListener('dragstart', preventDefault);
document.body.addEventListener('mousemove', handleMousemove);
document.body.addEventListener('mouseup', stopDragging);
document.body.addEventListener('mouseleave', stopDragging);
window.addEventListener('resize', handleWindowResize);

// functions // 
function handleWindowResize() {
  // se.scrollTo(0, 0);  // not IE compatible
  se.scrollTop = 0;
  applyScrollbarHeight();
}
function preventDefault(evt) {
  evt.preventDefault();
}
function stopDragging() {
  dragging = false;
}
function handleScrollbarMousedown(evt) {
  yOffsetInSB = evt.offsetY;
  dragging = true;
}
function handleMousemove(evt) {
  evt.preventDefault();
  if (!dragging) return;
  // determine where scrollbar should be dragged to, based on mouse movement
  var moveTo = evt.clientY - se.getBoundingClientRect().top;
  // needs to take into account initial mouse offset in scrollbar
  moveTo -= yOffsetInSB;
  // do not let scrollbar exceed parent-container bounds //
  if (moveTo < 0) moveTo = 0;
  if (moveTo > se.offsetHeight - sb.offsetHeight) moveTo = se.offsetHeight - sb.offsetHeight;
  // apply new position
  sb.style.transform = 'translateY(' + moveTo + 'px)';
  // now determine scrollTo Y value, i.e. where scrollable container should go based on scrollbar movement
  var scrollToY = moveTo * se.scrollHeight / se.offsetHeight + se.scrollHeight * sb.offsetHeight / (2 * se.offsetHeight) - se.offsetHeight / 2;
  // se.scrollTo(0, scrollToY);
  se.scrollTop = scrollToY;
}
function applyScrollbarHeight() {
  // determines scrollbar height on page load
  var center = se.scrollTop + se.offsetHeight / 2;
  var x = center * se.offsetHeight / se.scrollHeight;
  var sbHeight = x * 2;
  sb.style.height = sbHeight + "px";
}
function createDivs(numDivs) {
  // generate divs in scrollable container
  for (var i = 0; i < numDivs; i++) {
    var div = document.createElement('div');
    div.setAttribute('style', 'height: 40px; width: 180px; border-bottom: 1px solid #a82608; border-right: 1px solid #a82608;');
    se.appendChild(div);
  }
}
function moveScrollbar(_ref) {
  var t = _ref.target;

  var center = t.scrollTop + t.offsetHeight / 2;
  var x = center * t.offsetHeight / t.scrollHeight;
  sb.style.transform = 'translateY(' + (x - sb.offsetHeight / 2) + 'px)';
}
