!function (factory) {
  if (typeof define === 'function' && define.amd) define(['myjs'], factory);else if (typeof exports !== 'undefined') module.exports = factory(require('myjs'));else factory(my);
}(function (my) {
  "use strict";

  var sticked = [];

  function initSticky(el, cof) {
    cof = my.extend({}, cof);
    var $ = el;
    var wrapperId = cof.wrapperClassName;
    var wrapper = my('<div>').attr('id', wrapperId).addClass(wrapperId);
    if ($.css("float") === "right") $.css("float", "none").parent().css("float", "right");
    cof.stickyElement = $;
    cof.stickyWrapper = wrapper;
    wrapper.css("height", $.height() + "px");
    $.before(wrapper);
    wrapper.append($);
    sticked.push(cof);
    my(window).on("DOMNodeInserted DOMNodeRemoved", cof.NodeHandler = function () {
      wrapper.css("width", $.innerWidth());
    });
  }

  my.fn.sticky = function (cof) {
    cof = my.extend({
      className: "my-sticked",
      wrapperClassName: "my-wrapper-sticky",
      topSpacing: 0,
      bottomSpacing: 0,
      center: false,
      getWidthFrom: "",
      widthFromWrapper: true,
      responsiveWidth: false,
      zIndex: "inherit"
    }, cof);
    initSticky(this, cof);
    return this;
  };

  my.fn.unsticky = function () {
    var _this = this;

    sticked = sticked.filter(function (e) {
      if (e.stickyElement === _this) {
        e.stickyWrapper.before(e.stickyElement);
        e.stickyWrapper.remove();
        my(window).off("DOMNodeInserted DOMNodeRemoved", e.handlerNode);
        return false;
      }

      return true;
    });
    return this;
  };

  my(window).on("scroll", function () {
    var scrollX = pageXOffset,
        scrollY = pageYOffset;
    var $window = my(window);
    var $document = my(document);
    var scrollTop = $window.scrollTop(),
        documentHeight = $document.height(),
        dwh = $document.height() - $window.height(),
        extra = scrollTop > dwh ? dwh - scrollTop : 0;
    my.each(sticked, function () {
      var s = this,
          elementTop = s.stickyWrapper.offset().top,
          etse = elementTop - s.topSpacing - extra,
          $ = this.stickyElement,
          $$ = this.stickyWrapper;
      $$.css('height', $.outerHeight() + "px");

      if (scrollTop <= etse) {
        if (s.currentTop !== null) {
          $.css({
            'width': '',
            'position': '',
            'top': '',
            'z-index': ''
          }).parent().removeClass(s.className);
          $.trigger('sticky-end', [s]);
          s.currentTop = null;
        }
      } else {
        var newTop = documentHeight - $.outerHeight() - s.topSpacing - s.bottomSpacing - scrollTop - extra;
        if (newTop < 0) newTop = newTop + s.topSpacing;else newTop = s.topSpacing;

        if (s.currentTop !== newTop) {
          var newWidth;

          if (s.getWidthFrom) {
            padding = $.innerWidth() - $.width();
            newWidth = my(s.getWidthFrom).width() - padding || null;
          } else if (s.widthFromWrapper) {
            newWidth = $$.width();
          }

          if (newWidth == null) {
            newWidth = $.width();
          }

          $.css({
            width: newWidth + "px",
            position: 'fixed',
            top: newTop + "px",
            zIndex: s.zIndex
          }).parent().addClass(s.className);
          $.trigger(s.currentTop === null ? 'sticky-start' : 'sticky-update', [s]);
          if (s.currentTop === s.topSpacing && s.currentTop > newTop || s.currentTop === null && newTop < s.topSpacing) $.trigger('sticky-bottom-reached', [s]);else if (s.currentTop !== null && newTop === s.topSpacing && s.currentTop < newTop) $.trigger('sticky-bottom-unreached', [s]);
          s.currentTop = newTop;
        }

        var stickyWrapperContainer = $$.parent();
        var unstick = $.offset().top + $.outerHeight() >= stickyWrapperContainer.offset().top + stickyWrapperContainer.outerHeight() && s.stickyElement.offset().top <= s.topSpacing;
        if (unstick) $.css({
          position: 'absolute',
          top: "",
          bottom: 0,
          zIndex: ""
        });else $.css({
          position: 'fixed',
          top: newTop + "px",
          bottom: "",
          zIndex: s.zIndex
        });
      }
    });
  });
});