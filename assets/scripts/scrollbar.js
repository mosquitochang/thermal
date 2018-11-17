function Scrollbar(container,scroll,content,isBottom) {
  var _this = this;
  this.container = container;
  this.scroll = scroll;
  this.content = content;
  this.isBottom = isBottom || false;

  this.content.addEventListener('scroll', function(e) {
    _this.scroll.style.height = _this.container.clientHeight * _this.content.clientHeight / _this.content.scrollHeight + "px";
    _this.scroll.style.top = _this.container.clientHeight * _this.content.scrollTop / _this.content.scrollHeight + "px";
  });
  var event = new Event('scroll');

  window.addEventListener('resize', this.content.dispatchEvent.bind(this.content, event));
  this.content.dispatchEvent(event);

  this.scroll.addEventListener('mousedown', function(start){
    start.preventDefault();
    var y = _this.scroll.offsetTop;
    var onMove = function(end){
      var delta = end.pageY - start.pageY;
      _this.scroll.style.top = Math.min(_this.container.clientHeight - _this.scroll.clientHeight, Math.max(0, y + delta)) + 'px';
      _this.content.scrollTop = (_this.content.scrollHeight * _this.scroll.offsetTop / _this.container.clientHeight);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', function(){
      document.removeEventListener('mousemove', onMove);
    });
  });

  this.update = function() {
    this.scroll.style.height = this.container.clientHeight * this.content.clientHeight / this.content.scrollHeight + "px";
    this.scroll.style.top = this.container.clientHeight * this.content.scrollTop / this.content.scrollHeight + "px";
  }

  this.reset = function() {
    this.scroll.style.height = this.container.clientHeight * this.content.clientHeight / this.content.scrollHeight + "px";

    if(this.isBottom) {
      this.scroll.style.top = (this.container.clientHeight - this.scroll.clientHeight) + "px";
      this.content.scrollTop = this.content.clientHeight;
    } else {
      this.scroll.style.top = '0px';
      this.content.scrollTop = 0;
    }
    
  }
}