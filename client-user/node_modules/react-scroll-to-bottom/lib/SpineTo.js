"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function step(from, to, stepper, index) {
  var next = from;

  for (var i = 0; i < index; i++) {
    next = stepper(next, to);
  }

  return next;
}

function squareStepper(current, to) {
  var sign = Math.sign(to - current);
  var step = Math.sqrt(Math.abs(to - current));
  var next = current + step * sign;

  if (sign > 0) {
    return Math.min(to, next);
  } else {
    return Math.max(to, next);
  }
}

var ScrollTo =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ScrollTo, _React$Component);

  function ScrollTo(props, context) {
    var _this;

    _classCallCheck(this, ScrollTo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ScrollTo).call(this, props, context));
    _this.handleCancelAnimation = _this.handleCancelAnimation.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ScrollTo, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          name = _this$props.name,
          target = _this$props.target,
          value = _this$props.value;

      if (target) {
        this.addEventListeners(target);
        this.animate(name, target[name], value, 1);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props2 = this.props,
          name = _this$props2.name,
          target = _this$props2.target,
          value = _this$props2.value;
      var prevTarget = prevProps.target;
      var scrollChanged = prevProps.value !== value;
      var targetChanged = prevTarget !== target;

      if (targetChanged) {
        this.removeEventListeners(prevTarget);
        this.addEventListeners(target);
      }

      if ((scrollChanged || targetChanged) && target) {
        this.animate(name, target[name], value, 1);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.removeEventListeners(this.props.target);
      cancelAnimationFrame(this.animator);
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners(target) {
      target && target.addEventListener('pointerdown', this.handleCancelAnimation, {
        passive: true
      });
    }
  }, {
    key: "removeEventListeners",
    value: function removeEventListeners(target) {
      target && target.removeEventListener('pointerdown', this.handleCancelAnimation);
    }
  }, {
    key: "animate",
    value: function animate(name, from, to, index) {
      var _this2 = this;

      var start = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Date.now();

      if (to === '100%' || typeof to === 'number') {
        cancelAnimationFrame(this.animator);
        this.animator = requestAnimationFrame(function () {
          var target = _this2.props.target;

          if (target) {
            var toNumber = to === '100%' ? target.scrollHeight - target.offsetHeight : to;
            var nextValue = step(from, toNumber, squareStepper, (Date.now() - start) / 5);

            if (Math.abs(toNumber - nextValue) < 1.5) {
              nextValue = toNumber;
            }

            target[name] = nextValue;

            if (toNumber === nextValue) {
              _this2.props.onEnd && _this2.props.onEnd(true);
            } else {
              _this2.animate(name, from, to, index + 1, start);
            }
          }
        });
      }
    }
  }, {
    key: "handleCancelAnimation",
    value: function handleCancelAnimation() {
      cancelAnimationFrame(this.animator);
      this.props.onEnd && this.props.onEnd(false);
    }
  }, {
    key: "render",
    value: function render() {
      return false;
    }
  }]);

  return ScrollTo;
}(_react.default.Component);

exports.default = ScrollTo;
ScrollTo.propTypes = {
  name: _propTypes.default.string.isRequired,
  onEnd: _propTypes.default.func,
  target: _propTypes.default.any.isRequired,
  value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.oneOf(['100%'])]).isRequired
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluZVRvLmpzIl0sIm5hbWVzIjpbInN0ZXAiLCJmcm9tIiwidG8iLCJzdGVwcGVyIiwiaW5kZXgiLCJuZXh0IiwiaSIsInNxdWFyZVN0ZXBwZXIiLCJjdXJyZW50Iiwic2lnbiIsIk1hdGgiLCJzcXJ0IiwiYWJzIiwibWluIiwibWF4IiwiU2Nyb2xsVG8iLCJwcm9wcyIsImNvbnRleHQiLCJoYW5kbGVDYW5jZWxBbmltYXRpb24iLCJiaW5kIiwibmFtZSIsInRhcmdldCIsInZhbHVlIiwiYWRkRXZlbnRMaXN0ZW5lcnMiLCJhbmltYXRlIiwicHJldlByb3BzIiwicHJldlRhcmdldCIsInNjcm9sbENoYW5nZWQiLCJ0YXJnZXRDaGFuZ2VkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lcnMiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImFuaW1hdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic3RhcnQiLCJEYXRlIiwibm93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwidG9OdW1iZXIiLCJzY3JvbGxIZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJuZXh0VmFsdWUiLCJvbkVuZCIsIlJlYWN0IiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJhbnkiLCJvbmVPZlR5cGUiLCJudW1iZXIiLCJvbmVPZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsU0FBU0EsSUFBVCxDQUFjQyxJQUFkLEVBQW9CQyxFQUFwQixFQUF3QkMsT0FBeEIsRUFBaUNDLEtBQWpDLEVBQXdDO0FBQ3RDLE1BQUlDLElBQUksR0FBR0osSUFBWDs7QUFFQSxPQUFLLElBQUlLLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdGLEtBQXBCLEVBQTJCRSxDQUFDLEVBQTVCLEVBQWdDO0FBQzlCRCxJ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RDtBQUNGO0FBQ0YsU0FuQm9DLENBQXJDO0FBb0JEO0FBQ0Y7Ozs0Q0FFdUI7QUFDdEJMLE1BQUFBLG9CQUFvQixDQUFDLEtBQUtDLFFBQU4sQ0FBcEI7QUFDQSxXQUFLZixLQUFMLENBQVcyQixLQUFYLElBQW9CLEtBQUszQixLQUFMLENBQVcyQixLQUFYLENBQWlCLEtBQWpCLENBQXBCO0FBQ0Q7Ozs2QkFFUTtBQUNQLGFBQU8sS0FBUDtBQUNEOzs7O0VBL0VtQ0MsZUFBTUMsUzs7O0FBa0Y1QzlCLFFBQVEsQ0FBQytCLFNBQVQsR0FBcUI7QUFDbkIxQixFQUFBQSxJQUFJLEVBQUUyQixtQkFBVUMsTUFBVixDQUFpQkMsVUFESjtBQUVuQk4sRUFBQUEsS0FBSyxFQUFFSSxtQkFBVUcsSUFGRTtBQUduQjdCLEVBQUFBLE1BQU0sRUFBRTBCLG1CQUFVSSxHQUFWLENBQWNGLFVBSEg7QUFJbkIzQixFQUFBQSxLQUFLLEVBQUV5QixtQkFBVUssU0FBVixDQUFvQixDQUN6QkwsbUJBQVVNLE1BRGUsRUFFekJOLG1CQUFVTyxLQUFWLENBQWdCLENBQUMsTUFBRCxDQUFoQixDQUZ5QixDQUFwQixFQUdKTDtBQVBnQixDQUFyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5mdW5jdGlvbiBzdGVwKGZyb20sIHRvLCBzdGVwcGVyLCBpbmRleCkge1xuICBsZXQgbmV4dCA9IGZyb207XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRleDsgaSsrKSB7XG4gICAgbmV4dCA9IHN0ZXBwZXIobmV4dCwgdG8pO1xuICB9XG5cbiAgcmV0dXJuIG5leHQ7XG59XG5cbmZ1bmN0aW9uIHNxdWFyZVN0ZXBwZXIoY3VycmVudCwgdG8pIHtcbiAgY29uc3Qgc2lnbiA9IE1hdGguc2lnbih0byAtIGN1cnJlbnQpO1xuICBjb25zdCBzdGVwID0gTWF0aC5zcXJ0KE1hdGguYWJzKHRvIC0gY3VycmVudCkpO1xuICBjb25zdCBuZXh0ID0gY3VycmVudCArIHN0ZXAgKiBzaWduO1xuXG4gIGlmIChzaWduID4gMCkge1xuICAgIHJldHVybiBNYXRoLm1pbih0bywgbmV4dCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KHRvLCBuZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JvbGxUbyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuXG4gICAgdGhpcy5oYW5kbGVDYW5jZWxBbmltYXRpb24gPSB0aGlzLmhhbmRsZUNhbmNlbEFuaW1hdGlvbi5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgeyBuYW1lLCB0YXJnZXQsIHZhbHVlIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVycyh0YXJnZXQpO1xuICAgICAgdGhpcy5hbmltYXRlKG5hbWUsIHRhcmdldFtuYW1lXSwgdmFsdWUsIDEpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IG5hbWUsIHRhcmdldCwgdmFsdWUgfSB9ID0gdGhpcztcbiAgICBjb25zdCB7IHRhcmdldDogcHJldlRhcmdldCB9ID0gcHJldlByb3BzO1xuICAgIGNvbnN0IHNjcm9sbENoYW5nZWQgPSBwcmV2UHJvcHMudmFsdWUgIT09IHZhbHVlO1xuICAgIGNvbnN0IHRhcmdldENoYW5nZWQgPSBwcmV2VGFyZ2V0ICE9PSB0YXJnZXQ7XG5cbiAgICBpZiAodGFyZ2V0Q2hhbmdlZCkge1xuICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVycyhwcmV2VGFyZ2V0KTtcbiAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICB9XG5cbiAgICBpZiAoKHNjcm9sbENoYW5nZWQgfHwgdGFyZ2V0Q2hhbmdlZCkgJiYgdGFyZ2V0KSB7XG4gICAgICB0aGlzLmFuaW1hdGUobmFtZSwgdGFyZ2V0W25hbWVdLCB2YWx1ZSwgMSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVycyh0aGlzLnByb3BzLnRhcmdldCk7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRvcik7XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVycyh0YXJnZXQpIHtcbiAgICB0YXJnZXQgJiYgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgdGhpcy5oYW5kbGVDYW5jZWxBbmltYXRpb24sIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXJzKHRhcmdldCkge1xuICAgIHRhcmdldCAmJiB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCB0aGlzLmhhbmRsZUNhbmNlbEFuaW1hdGlvbik7XG4gIH1cblxuICBhbmltYXRlKG5hbWUsIGZyb20sIHRvLCBpbmRleCwgc3RhcnQgPSBEYXRlLm5vdygpKSB7XG4gICAgaWYgKHRvID09PSAnMTAwJScgfHwgdHlwZW9mIHRvID09PSAnbnVtYmVyJykge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRvcik7XG5cbiAgICAgIHRoaXMuYW5pbWF0b3IgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBjb25zdCB7IHRhcmdldCB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgY29uc3QgdG9OdW1iZXIgPSB0byA9PT0gJzEwMCUnID8gdGFyZ2V0LnNjcm9sbEhlaWdodCAtIHRhcmdldC5vZmZzZXRIZWlnaHQgOiB0bztcbiAgICAgICAgICBsZXQgbmV4dFZhbHVlID0gc3RlcChmcm9tLCB0b051bWJlciwgc3F1YXJlU3RlcHBlciwgKERhdGUubm93KCkgLSBzdGFydCkgLyA1KTtcblxuICAgICAgICAgIGlmIChNYXRoLmFicyh0b051bWJlciAtIG5leHRWYWx1ZSkgPCAxLjUpIHtcbiAgICAgICAgICAgIG5leHRWYWx1ZSA9IHRvTnVtYmVyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRhcmdldFtuYW1lXSA9IG5leHRWYWx1ZTtcblxuICAgICAgICAgIGlmICh0b051bWJlciA9PT0gbmV4dFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRW5kICYmIHRoaXMucHJvcHMub25FbmQodHJ1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZShuYW1lLCBmcm9tLCB0bywgaW5kZXggKyAxLCBzdGFydCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDYW5jZWxBbmltYXRpb24oKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRvcik7XG4gICAgdGhpcy5wcm9wcy5vbkVuZCAmJiB0aGlzLnByb3BzLm9uRW5kKGZhbHNlKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuU2Nyb2xsVG8ucHJvcFR5cGVzID0ge1xuICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG9uRW5kOiBQcm9wVHlwZXMuZnVuYyxcbiAgdGFyZ2V0OiBQcm9wVHlwZXMuYW55LmlzUmVxdWlyZWQsXG4gIHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICBQcm9wVHlwZXMubnVtYmVyLFxuICAgIFByb3BUeXBlcy5vbmVPZihbJzEwMCUnXSlcbiAgXSkuaXNSZXF1aXJlZFxufTtcbiJdfQ==