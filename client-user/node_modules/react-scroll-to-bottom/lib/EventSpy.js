"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _debounce = _interopRequireDefault(require("./debounce"));

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

var EventSpy =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EventSpy, _React$Component);

  function EventSpy(props, context) {
    var _this;

    _classCallCheck(this, EventSpy);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EventSpy).call(this, props, context));

    _this.createDebouncer();

    _this.handleEvent = _this.handleEvent.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(EventSpy, [{
    key: "createDebouncer",
    value: function createDebouncer() {
      var _this2 = this;

      this.debouncer = (0, _debounce.default)(function (event) {
        _this2.props.onEvent && _this2.props.onEvent(event);
      }, this.props.debounce);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var target = this.props.target;

      if (target) {
        target.addEventListener(this.props.name, this.handleEvent, {
          passive: true
        });
        this.handleEvent({
          target: target,
          type: this.props.name
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var prevName = prevProps.name,
          prevTarget = prevProps.target;
      var _this$props = this.props,
          name = _this$props.name,
          target = _this$props.target;

      if (target !== prevTarget || name !== prevName) {
        if (prevTarget) {
          prevTarget.removeEventListener(prevName, this.handleEvent);
        }

        if (target) {
          target.addEventListener(name, this.handleEvent, {
            passive: true
          });
          this.handleEvent({
            target: target,
            type: this.props.name
          });
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var target = this.props.target;
      target && target.removeEventListener(this.props.name, this.handleEvent);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(_ref) {
      var nextDebounce = _ref.debounce;

      if (this.props.debounce !== nextDebounce) {
        this.createDebouncer();
      }
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(event) {
      event.timeStampLow = Date.now();
      this.debouncer(event);
    }
  }, {
    key: "render",
    value: function render() {
      return false;
    }
  }]);

  return EventSpy;
}(_react.default.Component);

exports.default = EventSpy;
EventSpy.defaultProps = {
  debounce: 200
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9FdmVudFNweS5qcyJdLCJuYW1lcyI6WyJFdmVudFNweSIsInByb3BzIiwiY29udGV4dCIsImNyZWF0ZURlYm91bmNlciIsImhhbmRsZUV2ZW50IiwiYmluZCIsImRlYm91bmNlciIsImV2ZW50Iiwib25FdmVudCIsImRlYm91bmNlIiwidGFyZ2V0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm5hbWUiLCJwYXNzaXZlIiwidHlwZSIsInByZXZQcm9wcyIsInByZXZOYW1lIiwicHJldlRhcmdldCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJuZXh0RGVib3VuY2UiLCJ0aW1lU3RhbXBMb3ciLCJEYXRlIiwibm93IiwiUmVhY3QiLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7QUFDbkIsb0JBQVlDLEtBQVosRUFBbUJDLE9BQW5CLEVBQTRCO0FBQUE7O0FBQUE7O0FBQzFCLGtGQUFNRCxLQUFOLEVBQWFDLE9BQWI7O0FBRUEsVUFBS0MsZUFBTDs7QUFFQSxVQUFLQyxXQUFMLEdBQW1CLE1BQUtBLFdBQUwsQ0FBaUJDLElBQWpCLHVEQUFuQjtBQUwwQjtBQU0zQjs7OztzQ0FFaUI7QUFBQTs7QUFDaEIsV0FBS0MsU0FBTCxHQUFpQix1QkFBUyxVQUFBQyxLQUFLLEVBQUk7QUFDakMsUUFBQSxNQUFJLENBQUNOLEtBQUwsQ0FBV08sT0FBWCxJQUFzQixNQUFJLENBQUNQLEtBQUwsQ0FBV08sT0FBWCxDQUFtQkQsS0FBbkIsQ0FBdEI7QUFDRCxPQUZnQixFQUVkLEtBQUtOLEtBQUwsQ0FBV1EsUUFGRyxDQUFqQjtBQUdEOzs7d0NBRW1CO0FBQUEsVUFDVkMsTUFEVSxHQUNDLEtBQUtULEtBRE4sQ0FDVlMsTUFEVTs7QUFHbEIsVUFBSUEsTUFBSixFQUFZO0FBQ1ZBLFFBQUFBLE1BQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsS0FBS1YsS0FBTCxDQUFXVyxJQUFuQyxFQUF5QyxLQUFLUixXQUE5QyxFQUEyRDtBQUFFUyxVQUFBQSxPQUFPLEVBQUU7QUFBWCxTQUEzRDtBQUNBLGFBQUtULFdBQUwsQ0FBaUI7QUFBRU0sVUFBQUEsTUFBTSxFQUFOQSxNQUFGO0FBQVVJLFVBQUFBLElBQUksRUFBRSxLQUFLYixLQUFMLENBQVdXO0FBQTNCLFNBQWpCO0FBQ0Q7QUFDRjs7O3VDQUVrQkcsUyxFQUFXO0FBQUEsVUFDZEMsUUFEYyxHQUNtQkQsU0FEbkIsQ0FDcEJILElBRG9CO0FBQUEsVUFDSUssVUFESixHQUNtQkYsU0FEbkIsQ0FDSkwsTUFESTtBQUFBLHdCQUVILEtBQUtULEtBRkY7QUFBQSxVQUVwQlcsSUFGb0IsZUFFcEJBLElBRm9CO0FBQUEsVUFFZEYsTUFGYyxlQUVkQSxNQUZjOztBQUk1QixVQUNFQSxNQUFNLEtBQUtPLFVBQVgsSUFDR0wsSUFBSSxLQUFLSSxRQUZkLEVBR0U7QUFDQSxZQUFJQyxVQUFKLEVBQWdCO0FBQ2RBLFVBQUFBLFVBQVUsQ0FBQ0MsbUJBQVgsQ0FBK0JGLFFBQS9CLEVBQXlDLEtBQUtaLFdBQTlDO0FBQ0Q7O0FBRUQsWUFBSU0sTUFBSixFQUFZO0FBQ1ZBLFVBQUFBLE1BQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0JDLElBQXhCLEVBQThCLEtBQUtSLFdBQW5DLEVBQWdEO0FBQUVTLFlBQUFBLE9BQU8sRUFBRTtBQUFYLFdBQWhEO0FBQ0EsZUFBS1QsV0FBTCxDQUFpQjtBQUFFTSxZQUFBQSxNQUFNLEVBQU5BLE1BQUY7QUFBVUksWUFBQUEsSUFBSSxFQUFFLEtBQUtiLEtBQUwsQ0FBV1c7QUFBM0IsV0FBakI7QUFDRDtBQUNGO0FBQ0Y7OzsyQ0FFc0I7QUFBQSxVQUNiRixNQURhLEdBQ0YsS0FBS1QsS0FESCxDQUNiUyxNQURhO0FBR3JCQSxNQUFBQSxNQUFNLElBQUlBLE1BQU0sQ0FBQ1EsbUJBQVAsQ0FBMkIsS0FBS2pCLEtBQUwsQ0FBV1csSUFBdEMsRUFBNEMsS0FBS1IsV0FBakQsQ0FBVjtBQUNEOzs7b0RBRXFEO0FBQUEsVUFBaEJlLFlBQWdCLFFBQTFCVixRQUEwQjs7QUFDcEQsVUFBSSxLQUFLUixLQUFMLENBQVdRLFFBQVgsS0FBd0JVLFlBQTVCLEVBQTBDO0FBQ3hDLGFBQUtoQixlQUFMO0FBQ0Q7QUFDRjs7O2dDQUVXSSxLLEVBQU87QUFDakJBLE1BQUFBLEtBQUssQ0FBQ2EsWUFBTixHQUFxQkMsSUFBSSxDQUFDQyxHQUFMLEVBQXJCO0FBRUEsV0FBS2hCLFNBQUwsQ0FBZUMsS0FBZjtBQUNEOzs7NkJBRVE7QUFDUCxhQUFPLEtBQVA7QUFDRDs7OztFQS9EbUNnQixlQUFNQyxTOzs7QUFrRTVDeEIsUUFBUSxDQUFDeUIsWUFBVCxHQUF3QjtBQUN0QmhCLEVBQUFBLFFBQVEsRUFBRTtBQURZLENBQXhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IGRlYm91bmNlIGZyb20gJy4vZGVib3VuY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudFNweSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuXG4gICAgdGhpcy5jcmVhdGVEZWJvdW5jZXIoKTtcblxuICAgIHRoaXMuaGFuZGxlRXZlbnQgPSB0aGlzLmhhbmRsZUV2ZW50LmJpbmQodGhpcyk7XG4gIH1cblxuICBjcmVhdGVEZWJvdW5jZXIoKSB7XG4gICAgdGhpcy5kZWJvdW5jZXIgPSBkZWJvdW5jZShldmVudCA9PiB7XG4gICAgICB0aGlzLnByb3BzLm9uRXZlbnQgJiYgdGhpcy5wcm9wcy5vbkV2ZW50KGV2ZW50KTtcbiAgICB9LCB0aGlzLnByb3BzLmRlYm91bmNlKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodGhpcy5wcm9wcy5uYW1lLCB0aGlzLmhhbmRsZUV2ZW50LCB7IHBhc3NpdmU6IHRydWUgfSk7XG4gICAgICB0aGlzLmhhbmRsZUV2ZW50KHsgdGFyZ2V0LCB0eXBlOiB0aGlzLnByb3BzLm5hbWUgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIGNvbnN0IHsgbmFtZTogcHJldk5hbWUsIHRhcmdldDogcHJldlRhcmdldCB9ID0gcHJldlByb3BzO1xuICAgIGNvbnN0IHsgbmFtZSwgdGFyZ2V0IH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKFxuICAgICAgdGFyZ2V0ICE9PSBwcmV2VGFyZ2V0XG4gICAgICB8fCBuYW1lICE9PSBwcmV2TmFtZVxuICAgICkge1xuICAgICAgaWYgKHByZXZUYXJnZXQpIHtcbiAgICAgICAgcHJldlRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKHByZXZOYW1lLCB0aGlzLmhhbmRsZUV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCB0aGlzLmhhbmRsZUV2ZW50LCB7IHBhc3NpdmU6IHRydWUgfSk7XG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnQoeyB0YXJnZXQsIHR5cGU6IHRoaXMucHJvcHMubmFtZSB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBjb25zdCB7IHRhcmdldCB9ID0gdGhpcy5wcm9wcztcblxuICAgIHRhcmdldCAmJiB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLnByb3BzLm5hbWUsIHRoaXMuaGFuZGxlRXZlbnQpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyh7IGRlYm91bmNlOiBuZXh0RGVib3VuY2UgfSkge1xuICAgIGlmICh0aGlzLnByb3BzLmRlYm91bmNlICE9PSBuZXh0RGVib3VuY2UpIHtcbiAgICAgIHRoaXMuY3JlYXRlRGVib3VuY2VyKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRXZlbnQoZXZlbnQpIHtcbiAgICBldmVudC50aW1lU3RhbXBMb3cgPSBEYXRlLm5vdygpO1xuXG4gICAgdGhpcy5kZWJvdW5jZXIoZXZlbnQpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5FdmVudFNweS5kZWZhdWx0UHJvcHMgPSB7XG4gIGRlYm91bmNlOiAyMDBcbn07XG4iXX0=