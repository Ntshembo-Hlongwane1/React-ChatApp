"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _simpleUpdateIn = _interopRequireDefault(require("simple-update-in"));

var _EventSpy = _interopRequireDefault(require("../EventSpy"));

var _FunctionContext = _interopRequireDefault(require("./FunctionContext"));

var _InternalContext = _interopRequireDefault(require("./InternalContext"));

var _SpineTo = _interopRequireDefault(require("../SpineTo"));

var _StateContext = _interopRequireDefault(require("./StateContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var MIN_CHECK_INTERVAL = 17; // 1 frame

var NEAR_END_THRESHOLD = 1;
var SCROLL_DECISION_DURATION = 34; // 2 frames

function setImmediateInterval(fn, ms) {
  fn();
  return setInterval(fn, ms);
}

function computeViewState(_ref) {
  var mode = _ref.stateContext.mode,
      _ref$target = _ref.target,
      offsetHeight = _ref$target.offsetHeight,
      scrollHeight = _ref$target.scrollHeight,
      scrollTop = _ref$target.scrollTop;
  var atBottom = scrollHeight - scrollTop - offsetHeight < NEAR_END_THRESHOLD;
  var atTop = scrollTop < NEAR_END_THRESHOLD;
  var atEnd = mode === 'top' ? atTop : atBottom;
  return {
    atBottom: atBottom,
    atEnd: atEnd,
    atStart: !atEnd,
    atTop: atTop
  };
}

var Composer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Composer, _React$Component);

  function Composer(props) {
    var _this;

    _classCallCheck(this, Composer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Composer).call(this, props));
    _this.handleScroll = _this.handleScroll.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleScrollEnd = _this.handleScrollEnd.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._ignoreScrollEventBefore = 0;
    _this.state = {
      functionContext: {
        scrollTo: function scrollTo(scrollTop) {
          return _this.setState(function (_ref2) {
            var stateContext = _ref2.stateContext;
            return {
              scrollTop: scrollTop,
              stateContext: (0, _simpleUpdateIn.default)(stateContext, ['animating'], function () {
                return true;
              })
            };
          });
        },
        scrollToBottom: function scrollToBottom() {
          return _this.state.functionContext.scrollTo('100%');
        },
        scrollToEnd: function scrollToEnd() {
          var _assertThisInitialize = _assertThisInitialized(_assertThisInitialized(_this)),
              _assertThisInitialize2 = _assertThisInitialize.state,
              functionContext = _assertThisInitialize2.functionContext,
              stateContext = _assertThisInitialize2.stateContext;

          stateContext.mode === 'top' ? functionContext.scrollToTop() : functionContext.scrollToBottom();
        },
        scrollToStart: function scrollToStart() {
          var _assertThisInitialize3 = _assertThisInitialized(_assertThisInitialized(_this)),
              _assertThisInitialize4 = _assertThisInitialize3.state,
              functionContext = _assertThisInitialize4.functionContext,
              stateContext = _assertThisInitialize4.stateContext;

          stateContext.mode === 'top' ? functionContext.scrollToBottom() : functionContext.scrollToTop();
        },
        scrollToTop: function scrollToTop() {
          return _this.state.functionContext.scrollTo(0);
        }
      },
      internalContext: {
        offsetHeight: 0,
        scrollHeight: 0,
        setTarget: function setTarget(target) {
          return _this.setState(function () {
            return {
              target: target
            };
          });
        }
      },
      scrollTop: props.mode === 'top' ? 0 : '100%',
      stateContext: {
        animating: false,
        atBottom: true,
        atEnd: true,
        atTop: true,
        mode: props.mode,
        sticky: true
      },
      target: null
    };
    return _this;
  }

  _createClass(Composer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.enableWorker();
    }
  }, {
    key: "disableWorker",
    value: function disableWorker() {
      clearInterval(this._stickyCheckTimeout);
    }
  }, {
    key: "enableWorker",
    value: function enableWorker() {
      var _this2 = this;

      clearInterval(this._stickyCheckTimeout);
      var stickyButNotAtEndSince = false;
      this._stickyCheckTimeout = setImmediateInterval(function () {
        var state = _this2.state;
        var sticky = state.stateContext.sticky,
            target = state.target;

        if (sticky && target && !computeViewState(state).atEnd) {
          if (!stickyButNotAtEndSince) {
            stickyButNotAtEndSince = Date.now();
          } else if (Date.now() - stickyButNotAtEndSince > SCROLL_DECISION_DURATION) {
            // Quirks: In Firefox, after user scroll down, Firefox do two things:
            //         1. Set to a new "scrollTop"
            //         2. Fire "scroll" event
            //         For what we observed, #1 is fired about 20ms before #2. There is a chance that this stickyCheckTimeout is being scheduled between 1 and 2.
            //         That means, if we just look at #1 to decide if we should scroll, we will always scroll, in oppose to the user's intention.
            // Repro: Open Firefox, set checkInterval to a lower number, and try to scroll by dragging the scroll handler. It will jump back.
            state.functionContext.scrollToEnd();
            stickyButNotAtEndSince = false;
          }
        } else {
          stickyButNotAtEndSince = false;
        }
      }, Math.max(MIN_CHECK_INTERVAL, this.props.checkInterval) || MIN_CHECK_INTERVAL);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.disableWorker();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState(function (_ref3) {
        var stateContext = _ref3.stateContext;
        return {
          stateContext: _objectSpread({}, stateContext, {
            mode: nextProps.mode === 'top' ? 'top' : 'bottom'
          })
        };
      });
    }
  }, {
    key: "handleScroll",
    value: function handleScroll(_ref4) {
      var _this3 = this;

      var timeStampLow = _ref4.timeStampLow;

      // Currently, there are no reliable way to check if the "scroll" event is trigger due to
      // user gesture, programmatic scrolling, or Chrome-synthesized "scroll" event to compensate size change.
      // Thus, we use our best-effort to guess if it is triggered by user gesture, and disable sticky if it is heading towards the start direction.
      if (timeStampLow <= this._ignoreScrollEventBefore) {
        // Since we debounce "scroll" event, this handler might be called after spineTo.onEnd (a.k.a. artificial scrolling).
        // We should ignore debounced event fired after scrollEnd, because without skipping them, the userInitiatedScroll calculated below will not be accurate.
        // Thus, on a fast machine, adding elements super fast will lose the "stickiness".
        return;
      }

      this.disableWorker();
      this.setState(function (state) {
        var target = state.target;

        if (target) {
          var internalContext = state.internalContext,
              scrollTop = state.scrollTop,
              stateContext = state.stateContext;

          var _computeViewState = computeViewState(state),
              atBottom = _computeViewState.atBottom,
              atEnd = _computeViewState.atEnd,
              atStart = _computeViewState.atStart,
              atTop = _computeViewState.atTop;

          var nextInternalContext = internalContext;
          var nextStateContext = stateContext;
          nextStateContext = (0, _simpleUpdateIn.default)(nextStateContext, ['atBottom'], function () {
            return atBottom;
          });
          nextStateContext = (0, _simpleUpdateIn.default)(nextStateContext, ['atEnd'], function () {
            return atEnd;
          });
          nextStateContext = (0, _simpleUpdateIn.default)(nextStateContext, ['atStart'], function () {
            return atStart;
          });
          nextStateContext = (0, _simpleUpdateIn.default)(nextStateContext, ['atTop'], function () {
            return atTop;
          }); // Chrome will emit "synthetic" scroll event if the container is resized or an element is added
          // We need to ignore these "synthetic" events
          // Repro: In playground, press 4-1-5-1-1 (small, add one, normal, add one, add one)
          //        Nomatter how fast or slow the sequence is being presssed, it should still stick to the bottom

          var offsetHeight = target.offsetHeight,
              scrollHeight = target.scrollHeight;
          var resized = offsetHeight !== internalContext.offsetHeight;
          var elementChanged = scrollHeight !== internalContext.scrollHeight;

          if (resized) {
            nextInternalContext = (0, _simpleUpdateIn.default)(nextInternalContext, ['offsetHeight'], function () {
              return offsetHeight;
            });
          }

          if (elementChanged) {
            nextInternalContext = (0, _simpleUpdateIn.default)(nextInternalContext, ['scrollHeight'], function () {
              return scrollHeight;
            });
          } // Sticky means:
          // - If it is scrolled programatically, we are still in sticky mode
          // - If it is scrolled by the user, then sticky means if we are at the end
          // Only update stickiness if the scroll event is not due to synthetic scroll done by Chrome


          if (!resized && !elementChanged) {
            nextStateContext = (0, _simpleUpdateIn.default)(nextStateContext, ['sticky'], function () {
              return stateContext.animating ? true : atEnd;
            });
          } // If no scrollTop is set (not in programmatic scrolling mode), we should set "animating" to false
          // "animating" is used to calculate the "sticky" property


          if (scrollTop === null) {
            nextStateContext = (0, _simpleUpdateIn.default)(nextStateContext, ['animating'], function () {
              return false;
            });
          }

          return _objectSpread({}, internalContext === nextInternalContext ? {} : {
            internalContext: nextInternalContext
          }, stateContext === nextStateContext ? {} : {
            stateContext: nextStateContext
          });
        }
      }, function () {
        _this3.state.stateContext.sticky && _this3.enableWorker();
      });
    }
  }, {
    key: "handleScrollEnd",
    value: function handleScrollEnd() {
      // We should ignore debouncing handleScroll that emit before this time
      this._ignoreScrollEventBefore = Date.now();
      this.setState(function () {
        return {
          scrollTop: null
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var handleScroll = this.handleScroll,
          handleScrollEnd = this.handleScrollEnd,
          _this$props = this.props,
          children = _this$props.children,
          debounce = _this$props.debounce,
          _this$state = this.state,
          functionContext = _this$state.functionContext,
          internalContext = _this$state.internalContext,
          scrollTop = _this$state.scrollTop,
          stateContext = _this$state.stateContext,
          target = _this$state.target;
      return _react.default.createElement(_InternalContext.default.Provider, {
        value: internalContext
      }, _react.default.createElement(_FunctionContext.default.Provider, {
        value: functionContext
      }, _react.default.createElement(_StateContext.default.Provider, {
        value: stateContext
      }, children, target && _react.default.createElement(_EventSpy.default, {
        debounce: debounce,
        name: "scroll",
        onEvent: handleScroll,
        target: target
      }), target && scrollTop !== null && _react.default.createElement(_SpineTo.default, {
        name: "scrollTop",
        onEnd: handleScrollEnd,
        target: target,
        value: scrollTop
      }))));
    }
  }]);

  return Composer;
}(_react.default.Component);

exports.default = Composer;
Composer.defaultProps = {
  checkInterval: 100,
  debounce: 17
};
Composer.propTypes = {
  checkInterval: _propTypes.default.number,
  debounce: _propTypes.default.number
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TY3JvbGxUb0JvdHRvbS9Db21wb3Nlci5qcyJdLCJuYW1lcyI6WyJNSU5fQ0hFQ0tfSU5URVJWQUwiLCJORUFSX0VORF9USFJFU0hPTEQiLCJTQ1JPTExfREVDSVNJT05fRFVSQVRJT04iLCJzZXRJbW1lZGlhdGVJbnRlcnZhbCIsImZuIiwibXMiLCJzZXRJbnRlcnZhbCIsImNvbXB1dGVWaWV3U3RhdGUiLCJtb2RlIiwic3RhdGVDb250ZXh0IiwidGFyZ2V0Iiwib2Zmc2V0SGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0Iiwic2Nyb2xsVG9wIiwiYXRCb3R0b20iLCJhdFRvcCIsImF0RW5kIiwiYXRTdGFydCIsIkNvbXBvc2VyIiwicHJvcHMiLCJoYW5kbGVTY3JvbGwiLCJiaW5kIiwiaGFuZGxlU2Nyb2xsRW5kIiwiX2lnbm9yZVNjcm9sbEV2ZW50QmVmb3JlIiwic3RhdGUiLCJmdW5jdGlvbkNvbnRleHQiLCJzY3JvbGxUbyIsInNldFN0YXRlIiwic2Nyb2xsVG9Cb3R0b20iLCJzY3JvbGxUb0VuZCIsInNjcm9sbFRvVG9wIiwic2Nyb2xsVG9TdGFydCIsImludGVybmFsQ29udGV4dCIsInNldFRhcmdldCIsImFuaW1hdGluZyIsInN0aWNreSIsImVuYWJsZVdvcmtlciIsImNsZWFySW50ZXJ2YWwiLCJfc3RpY2t5Q2hlY2tUaW1lb3V0Iiwic3RpY2t5QnV0Tm90QXRFbmRTaW5jZSIsIkRhdGUiLCJub3ciLCJNYXRoIiwibWF4IiwiY2hlY2tJbnRlcnZhbCIsImRpc2FibGVXb3JrZXIiLCJuZXh0UHJvcHMiLCJ0aW1lU3RhbXBMb3ciLCJuZXh0SW50ZXJuYWxDb250ZXh0IiwibmV4dFN0YXRlQ29udGV4dCIsInJlc2l6ZWQiLCJlbGVtZW50Q2hhbmdlZCIsImNoaWxkcmVuIiwiZGVib3VuY2UiLCJSZWFjdCIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm51bWJlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGtCQUFrQixHQUFHLEVBQTNCLEMsQ0FBcUM7O0FBQ3JDLElBQU1DLGtCQUFrQixHQUFHLENBQTNCO0FBQ0EsSUFBTUMsd0JBQXdCLEdBQUcsRUFBakMsQyxDQUFxQzs7QUFFckMsU0FBU0Msb0JBQVQsQ0FBOEJDLEVBQTlCLEVBQWtDQyxFQUFsQyxFQUFzQztBQUNwQ0QsRUFBQUEsRUFBRTtBQUVGLFNBQU9FLFdBQVcsQ0FBQ0YsRUFBRCxFQUFLQyxFQUFMLENBQWxCO0FBQ0Q7O0FBRUQsU0FBU0UsZ0JBQVQsT0FBeUc7QUFBQSxNQUE3REMsSUFBNkQsUUFBN0VDLFlBQTZFLENBQTdERCxJQUE2RDtBQUFBLHlCQUFyREUsTUFBcUQ7QUFBQSxNQUEzQ0MsWUFBMkMsZUFBM0NBLFlBQTJDO0FBQUEsTUFBN0JDLFlBQTZCLGVBQTdCQSxZQUE2QjtBQUFBLE1BQWZDLFNBQWUsZUFBZkEsU0FBZTtBQUN2RyxNQUFNQyxRQUFRLEdBQUdGLFlBQVksR0FBR0MsU0FBZixHQUEyQkYsWUFBM0IsR0FBMENWLGtCQUEzRDtBQUNBLE1BQU1jLEtBQUssR0FBR0YsU0FBUyxHQUFHWixrQkFBMUI7QUFDQSxNQUFNZSxLQUFLLEdBQUdSLElBQUksS0FBSyxLQUFULEdBQWlCTyxLQUFqQixHQUF5QkQsUUFBdkM7QUFFQSxTQUFPO0FBQ0xBLElBQUFBLFFBQVEsRUFBUkEsUUFESztBQUVMRSxJQUFBQSxLQUFLLEVBQUxBLEtBRks7QUFHTEMsSUFBQUEsT0FBTyxFQUFFLENBQUNELEtBSEw7QUFJTEQsSUFBQUEsS0FBSyxFQUFMQTtBQUpLLEdBQVA7QUFNRDs7SUFFb0JHLFE7Ozs7O0FBQ25CLG9CQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2pCLGtGQUFNQSxLQUFOO0FBRUEsVUFBS0MsWUFBTCxHQUFvQixNQUFLQSxZQUFMLENBQWtCQyxJQUFsQix1REFBcEI7QUFDQSxVQUFLQyxlQUFMLEdBQXVCLE1BQUtBLGVBQUwsQ0FBcUJELElBQXJCLHVEQUF2QjtBQUVBLFVBQUtFLHdCQUFMLEdBQWdDLENBQWhDO0FBRUEsVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLE1BQUFBLGVBQWUsRUFBRTtBQUNmQyxRQUFBQSxRQUFRLEVBQUUsa0JBQUFiLFNBQVM7QUFBQSxpQkFBSSxNQUFLYyxRQUFMLENBQWM7QUFBQSxnQkFBR2xCLFlBQUgsU0FBR0EsWUFBSDtBQUFBLG1CQUF1QjtBQUMxREksY0FBQUEsU0FBUyxFQUFUQSxTQUQwRDtBQUUxREosY0FBQUEsWUFBWSxFQUFFLDZCQUFTQSxZQUFULEVBQXVCLENBQUMsV0FBRCxDQUF2QixFQUFzQztBQUFBLHVCQUFNLElBQU47QUFBQSxlQUF0QztBQUY0QyxhQUF2QjtBQUFBLFdBQWQsQ0FBSjtBQUFBLFNBREo7QUFLZm1CLFFBQUFBLGNBQWMsRUFBRTtBQUFBLGlCQUFNLE1BQUtKLEtBQUwsQ0FBV0MsZUFBWCxDQUEyQkMsUUFBM0IsQ0FBb0MsTUFBcEMsQ0FBTjtBQUFBLFNBTEQ7QUFNZkcsUUFBQUEsV0FBVyxFQUFFLHVCQUFNO0FBQUE7QUFBQSw2REFDVEwsS0FEUztBQUFBLGNBQ0FDLGVBREEsMEJBQ0FBLGVBREE7QUFBQSxjQUNpQmhCLFlBRGpCLDBCQUNpQkEsWUFEakI7O0FBR2pCQSxVQUFBQSxZQUFZLENBQUNELElBQWIsS0FBc0IsS0FBdEIsR0FBOEJpQixlQUFlLENBQUNLLFdBQWhCLEVBQTlCLEdBQThETCxlQUFlLENBQUNHLGNBQWhCLEVBQTlEO0FBQ0QsU0FWYztBQVdmRyxRQUFBQSxhQUFhLEVBQUUseUJBQU07QUFBQTtBQUFBLDhEQUNYUCxLQURXO0FBQUEsY0FDRkMsZUFERSwwQkFDRkEsZUFERTtBQUFBLGNBQ2VoQixZQURmLDBCQUNlQSxZQURmOztBQUduQkEsVUFBQUEsWUFBWSxDQUFDRCxJQUFiLEtBQXNCLEtBQXRCLEdBQThCaUIsZUFBZSxDQUFDRyxjQUFoQixFQUE5QixHQUFpRUgsZUFBZSxDQUFDSyxXQUFoQixFQUFqRTtBQUNELFNBZmM7QUFnQmZBLFFBQUFBLFdBQVcsRUFBRTtBQUFBLGlCQUFNLE1BQUtOLEtBQUwsQ0FBV0MsZUFBWCxDQUEyQkMsUUFBM0IsQ0FBb0MsQ0FBcEMsQ0FBTjtBQUFBO0FBaEJFLE9BRE47QUFtQlhNLE1BQUFBLGVBQWUsRUFBRTtBQUNmckIsUUFBQUEsWUFBWSxFQUFFLENBREM7QUFFZkMsUUFBQUEsWUFBWSxFQUFFLENBRkM7QUFHZnFCLFFBQUFBLFNBQVMsRUFBRSxtQkFBQXZCLE1BQU07QUFBQSxpQkFBSSxNQUFLaUIsUUFBTCxDQUFjO0FBQUEsbUJBQU87QUFBRWpCLGNBQUFBLE1BQU0sRUFBTkE7QUFBRixhQUFQO0FBQUEsV0FBZCxDQUFKO0FBQUE7QUFIRixPQW5CTjtBQXdCWEcsTUFBQUEsU0FBUyxFQUFFTSxLQUFLLENBQUNYLElBQU4sS0FBZSxLQUFmLEdBQXVCLENBQXZCLEdBQTJCLE1BeEIzQjtBQXlCWEMsTUFBQUEsWUFBWSxFQUFFO0FBQ1p5QixRQUFBQSxTQUFTLEVBQUUsS0FEQztBQUVacEIsUUFBQUEsUUFBUSxFQUFFLElBRkU7QUFHWkUsUUFBQUEsS0FBSyxFQUFFLElBSEs7QUFJWkQsUUFBQUEsS0FBSyxFQUFFLElBSks7QUFLWlAsUUFBQUEsSUFBSSxFQUFFVyxLQUFLLENBQUNYLElBTEE7QUFNWjJCLFFBQUFBLE1BQU0sRUFBRTtBQU5JLE9BekJIO0FBaUNYekIsTUFBQUEsTUFBTSxFQUFFO0FBakNHLEtBQWI7QUFSaUI7QUEyQ2xCOzs7O3dDQUVtQjtBQUNsQixXQUFLMEIsWUFBTDtBQUNEOzs7b0NBRWU7QUFDZEMsTUFBQUEsYUFBYSxDQUFDLEtBQUtDLG1CQUFOLENBQWI7QUFDRDs7O21DQUVjO0FBQUE7O0FBQ2JELE1BQUFBLGFBQWEsQ0FBQyxLQUFLQyxtQkFBTixDQUFiO0FBRUEsVUFBSUMsc0JBQXNCLEdBQUcsS0FBN0I7QUFFQSxXQUFLRCxtQkFBTCxHQUEyQm5DLG9CQUFvQixDQUM3QyxZQUFNO0FBQUEsWUFDSXFCLEtBREosR0FDYyxNQURkLENBQ0lBLEtBREo7QUFBQSxZQUVvQlcsTUFGcEIsR0FFeUNYLEtBRnpDLENBRUlmLFlBRkosQ0FFb0IwQixNQUZwQjtBQUFBLFlBRThCekIsTUFGOUIsR0FFeUNjLEtBRnpDLENBRThCZCxNQUY5Qjs7QUFJSixZQUNFeUIsTUFBTSxJQUNIekIsTUFESCxJQUVHLENBQUNILGdCQUFnQixDQUFDaUIsS0FBRCxDQUFoQixDQUF3QlIsS0FIOUIsRUFJRTtBQUNBLGNBQUksQ0FBQ3VCLHNCQUFMLEVBQTZCO0FBQzNCQSxZQUFBQSxzQkFBc0IsR0FBR0MsSUFBSSxDQUFDQyxHQUFMLEVBQXpCO0FBQ0QsV0FGRCxNQUVPLElBQUlELElBQUksQ0FBQ0MsR0FBTCxLQUFhRixzQkFBYixHQUFzQ3JDLHdCQUExQyxFQUFvRTtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQXNCLFlBQUFBLEtBQUssQ0FBQ0MsZUFBTixDQUFzQkksV0FBdEI7QUFDQVUsWUFBQUEsc0JBQXNCLEdBQUcsS0FBekI7QUFDRDtBQUNGLFNBbEJELE1Ba0JPO0FBQ0xBLFVBQUFBLHNCQUFzQixHQUFHLEtBQXpCO0FBQ0Q7QUFDRixPQTFCNEMsRUEyQjdDRyxJQUFJLENBQUNDLEdBQUwsQ0FBUzNDLGtCQUFULEVBQTZCLEtBQUttQixLQUFMLENBQVd5QixhQUF4QyxLQUEwRDVDLGtCQTNCYixDQUEvQztBQTZCRDs7OzJDQUVzQjtBQUNyQixXQUFLNkMsYUFBTDtBQUNEOzs7OENBRXlCQyxTLEVBQVc7QUFDbkMsV0FBS25CLFFBQUwsQ0FBYztBQUFBLFlBQUdsQixZQUFILFNBQUdBLFlBQUg7QUFBQSxlQUF1QjtBQUNuQ0EsVUFBQUEsWUFBWSxvQkFDUEEsWUFETztBQUVWRCxZQUFBQSxJQUFJLEVBQUVzQyxTQUFTLENBQUN0QyxJQUFWLEtBQW1CLEtBQW5CLEdBQTJCLEtBQTNCLEdBQW1DO0FBRi9CO0FBRHVCLFNBQXZCO0FBQUEsT0FBZDtBQU1EOzs7d0NBRThCO0FBQUE7O0FBQUEsVUFBaEJ1QyxZQUFnQixTQUFoQkEsWUFBZ0I7O0FBQzdCO0FBQ0E7QUFDQTtBQUVBLFVBQUlBLFlBQVksSUFBSSxLQUFLeEIsd0JBQXpCLEVBQW1EO0FBQ2pEO0FBQ0E7QUFDQTtBQUVBO0FBQ0Q7O0FBRUQsV0FBS3NCLGFBQUw7QUFFQSxXQUFLbEIsUUFBTCxDQUFjLFVBQUFILEtBQUssRUFBSTtBQUFBLFlBQ2JkLE1BRGEsR0FDRmMsS0FERSxDQUNiZCxNQURhOztBQUdyQixZQUFJQSxNQUFKLEVBQVk7QUFBQSxjQUNGc0IsZUFERSxHQUMyQ1IsS0FEM0MsQ0FDRlEsZUFERTtBQUFBLGNBQ2VuQixTQURmLEdBQzJDVyxLQUQzQyxDQUNlWCxTQURmO0FBQUEsY0FDMEJKLFlBRDFCLEdBQzJDZSxLQUQzQyxDQUMwQmYsWUFEMUI7O0FBQUEsa0NBRWtDRixnQkFBZ0IsQ0FBQ2lCLEtBQUQsQ0FGbEQ7QUFBQSxjQUVGVixRQUZFLHFCQUVGQSxRQUZFO0FBQUEsY0FFUUUsS0FGUixxQkFFUUEsS0FGUjtBQUFBLGNBRWVDLE9BRmYscUJBRWVBLE9BRmY7QUFBQSxjQUV3QkYsS0FGeEIscUJBRXdCQSxLQUZ4Qjs7QUFHVixjQUFJaUMsbUJBQW1CLEdBQUdoQixlQUExQjtBQUNBLGNBQUlpQixnQkFBZ0IsR0FBR3hDLFlBQXZCO0FBRUF3QyxVQUFBQSxnQkFBZ0IsR0FBRyw2QkFBU0EsZ0JBQVQsRUFBMkIsQ0FBQyxVQUFELENBQTNCLEVBQXlDO0FBQUEsbUJBQU1uQyxRQUFOO0FBQUEsV0FBekMsQ0FBbkI7QUFDQW1DLFVBQUFBLGdCQUFnQixHQUFHLDZCQUFTQSxnQkFBVCxFQUEyQixDQUFDLE9BQUQsQ0FBM0IsRUFBc0M7QUFBQSxtQkFBTWpDLEtBQU47QUFBQSxXQUF0QyxDQUFuQjtBQUNBaUMsVUFBQUEsZ0JBQWdCLEdBQUcsNkJBQVNBLGdCQUFULEVBQTJCLENBQUMsU0FBRCxDQUEzQixFQUF3QztBQUFBLG1CQUFNaEMsT0FBTjtBQUFBLFdBQXhDLENBQW5CO0FBQ0FnQyxVQUFBQSxnQkFBZ0IsR0FBRyw2QkFBU0EsZ0JBQVQsRUFBMkIsQ0FBQyxPQUFELENBQTNCLEVBQXNDO0FBQUEsbUJBQU1sQyxLQUFOO0FBQUEsV0FBdEMsQ0FBbkIsQ0FUVSxDQVdWO0FBQ0E7QUFDQTtBQUNBOztBQWRVLGNBZUZKLFlBZkUsR0FlNkJELE1BZjdCLENBZUZDLFlBZkU7QUFBQSxjQWVZQyxZQWZaLEdBZTZCRixNQWY3QixDQWVZRSxZQWZaO0FBZ0JWLGNBQU1zQyxPQUFPLEdBQUd2QyxZQUFZLEtBQUtxQixlQUFlLENBQUNyQixZQUFqRDtBQUNBLGNBQU13QyxjQUFjLEdBQUd2QyxZQUFZLEtBQUtvQixlQUFlLENBQUNwQixZQUF4RDs7QUFFQSxjQUFJc0MsT0FBSixFQUFhO0FBQ1hGLFlBQUFBLG1CQUFtQixHQUFHLDZCQUFTQSxtQkFBVCxFQUE4QixDQUFDLGNBQUQsQ0FBOUIsRUFBZ0Q7QUFBQSxxQkFBTXJDLFlBQU47QUFBQSxhQUFoRCxDQUF0QjtBQUNEOztBQUVELGNBQUl3QyxjQUFKLEVBQW9CO0FBQ2xCSCxZQUFBQSxtQkFBbUIsR0FBRyw2QkFBU0EsbUJBQVQsRUFBOEIsQ0FBQyxjQUFELENBQTlCLEVBQWdEO0FBQUEscUJBQU1wQyxZQUFOO0FBQUEsYUFBaEQsQ0FBdEI7QUFDRCxXQXpCUyxDQTJCVjtBQUNBO0FBQ0E7QUFFQTs7O0FBQ0EsY0FBSSxDQUFDc0MsT0FBRCxJQUFZLENBQUNDLGNBQWpCLEVBQWlDO0FBQy9CRixZQUFBQSxnQkFBZ0IsR0FBRyw2QkFBU0EsZ0JBQVQsRUFBMkIsQ0FBQyxRQUFELENBQTNCLEVBQXVDO0FBQUEscUJBQU14QyxZQUFZLENBQUN5QixTQUFiLEdBQXlCLElBQXpCLEdBQWdDbEIsS0FBdEM7QUFBQSxhQUF2QyxDQUFuQjtBQUNELFdBbENTLENBb0NWO0FBQ0E7OztBQUNBLGNBQUlILFNBQVMsS0FBSyxJQUFsQixFQUF3QjtBQUN0Qm9DLFlBQUFBLGdCQUFnQixHQUFHLDZCQUFTQSxnQkFBVCxFQUEyQixDQUFDLFdBQUQsQ0FBM0IsRUFBMEM7QUFBQSxxQkFBTSxLQUFOO0FBQUEsYUFBMUMsQ0FBbkI7QUFDRDs7QUFFRCxtQ0FDS2pCLGVBQWUsS0FBS2dCLG1CQUFwQixHQUEwQyxFQUExQyxHQUErQztBQUFFaEIsWUFBQUEsZUFBZSxFQUFFZ0I7QUFBbkIsV0FEcEQsRUFFS3ZDLFlBQVksS0FBS3dDLGdCQUFqQixHQUFvQyxFQUFwQyxHQUF5QztBQUFFeEMsWUFBQUEsWUFBWSxFQUFFd0M7QUFBaEIsV0FGOUM7QUFJRDtBQUNGLE9BbERELEVBa0RHLFlBQU07QUFDUCxRQUFBLE1BQUksQ0FBQ3pCLEtBQUwsQ0FBV2YsWUFBWCxDQUF3QjBCLE1BQXhCLElBQWtDLE1BQUksQ0FBQ0MsWUFBTCxFQUFsQztBQUNELE9BcEREO0FBcUREOzs7c0NBRWlCO0FBQ2hCO0FBQ0EsV0FBS2Isd0JBQUwsR0FBZ0NpQixJQUFJLENBQUNDLEdBQUwsRUFBaEM7QUFFQSxXQUFLZCxRQUFMLENBQWM7QUFBQSxlQUFPO0FBQUVkLFVBQUFBLFNBQVMsRUFBRTtBQUFiLFNBQVA7QUFBQSxPQUFkO0FBQ0Q7Ozs2QkFFUTtBQUFBLFVBRUxPLFlBRkssR0FNSCxJQU5HLENBRUxBLFlBRks7QUFBQSxVQUdMRSxlQUhLLEdBTUgsSUFORyxDQUdMQSxlQUhLO0FBQUEsd0JBTUgsSUFORyxDQUlMSCxLQUpLO0FBQUEsVUFJSWlDLFFBSkosZUFJSUEsUUFKSjtBQUFBLFVBSWNDLFFBSmQsZUFJY0EsUUFKZDtBQUFBLHdCQU1ILElBTkcsQ0FLTDdCLEtBTEs7QUFBQSxVQUtJQyxlQUxKLGVBS0lBLGVBTEo7QUFBQSxVQUtxQk8sZUFMckIsZUFLcUJBLGVBTHJCO0FBQUEsVUFLc0NuQixTQUx0QyxlQUtzQ0EsU0FMdEM7QUFBQSxVQUtpREosWUFMakQsZUFLaURBLFlBTGpEO0FBQUEsVUFLK0RDLE1BTC9ELGVBSytEQSxNQUwvRDtBQVFQLGFBQ0UsNkJBQUMsd0JBQUQsQ0FBaUIsUUFBakI7QUFBMEIsUUFBQSxLQUFLLEVBQUdzQjtBQUFsQyxTQUNFLDZCQUFDLHdCQUFELENBQWlCLFFBQWpCO0FBQTBCLFFBQUEsS0FBSyxFQUFHUDtBQUFsQyxTQUNFLDZCQUFDLHFCQUFELENBQWMsUUFBZDtBQUF1QixRQUFBLEtBQUssRUFBR2hCO0FBQS9CLFNBQ0kyQyxRQURKLEVBR0kxQyxNQUFNLElBQ0osNkJBQUMsaUJBQUQ7QUFDRSxRQUFBLFFBQVEsRUFBRzJDLFFBRGI7QUFFRSxRQUFBLElBQUksRUFBQyxRQUZQO0FBR0UsUUFBQSxPQUFPLEVBQUdqQyxZQUhaO0FBSUUsUUFBQSxNQUFNLEVBQUdWO0FBSlgsUUFKTixFQVlJQSxNQUFNLElBQUlHLFNBQVMsS0FBSyxJQUF4QixJQUNFLDZCQUFDLGdCQUFEO0FBQ0UsUUFBQSxJQUFJLEVBQUMsV0FEUDtBQUVFLFFBQUEsS0FBSyxFQUFHUyxlQUZWO0FBR0UsUUFBQSxNQUFNLEVBQUdaLE1BSFg7QUFJRSxRQUFBLEtBQUssRUFBR0c7QUFKVixRQWJOLENBREYsQ0FERixDQURGO0FBMkJEOzs7O0VBdk5tQ3lDLGVBQU1DLFM7OztBQTBONUNyQyxRQUFRLENBQUNzQyxZQUFULEdBQXdCO0FBQ3RCWixFQUFBQSxhQUFhLEVBQUUsR0FETztBQUV0QlMsRUFBQUEsUUFBUSxFQUFFO0FBRlksQ0FBeEI7QUFLQW5DLFFBQVEsQ0FBQ3VDLFNBQVQsR0FBcUI7QUFDbkJiLEVBQUFBLGFBQWEsRUFBRWMsbUJBQVVDLE1BRE47QUFFbkJOLEVBQUFBLFFBQVEsRUFBRUssbUJBQVVDO0FBRkQsQ0FBckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB1cGRhdGVJbiBmcm9tICdzaW1wbGUtdXBkYXRlLWluJztcblxuaW1wb3J0IEV2ZW50U3B5IGZyb20gJy4uL0V2ZW50U3B5JztcbmltcG9ydCBGdW5jdGlvbkNvbnRleHQgZnJvbSAnLi9GdW5jdGlvbkNvbnRleHQnO1xuaW1wb3J0IEludGVybmFsQ29udGV4dCBmcm9tICcuL0ludGVybmFsQ29udGV4dCc7XG5pbXBvcnQgU3BpbmVUbyBmcm9tICcuLi9TcGluZVRvJztcbmltcG9ydCBTdGF0ZUNvbnRleHQgZnJvbSAnLi9TdGF0ZUNvbnRleHQnO1xuXG5jb25zdCBNSU5fQ0hFQ0tfSU5URVJWQUwgPSAxNzsgICAgICAgLy8gMSBmcmFtZVxuY29uc3QgTkVBUl9FTkRfVEhSRVNIT0xEID0gMTtcbmNvbnN0IFNDUk9MTF9ERUNJU0lPTl9EVVJBVElPTiA9IDM0OyAvLyAyIGZyYW1lc1xuXG5mdW5jdGlvbiBzZXRJbW1lZGlhdGVJbnRlcnZhbChmbiwgbXMpIHtcbiAgZm4oKTtcblxuICByZXR1cm4gc2V0SW50ZXJ2YWwoZm4sIG1zKTtcbn1cblxuZnVuY3Rpb24gY29tcHV0ZVZpZXdTdGF0ZSh7IHN0YXRlQ29udGV4dDogeyBtb2RlIH0sIHRhcmdldDogeyBvZmZzZXRIZWlnaHQsIHNjcm9sbEhlaWdodCwgc2Nyb2xsVG9wIH0gfSkge1xuICBjb25zdCBhdEJvdHRvbSA9IHNjcm9sbEhlaWdodCAtIHNjcm9sbFRvcCAtIG9mZnNldEhlaWdodCA8IE5FQVJfRU5EX1RIUkVTSE9MRDtcbiAgY29uc3QgYXRUb3AgPSBzY3JvbGxUb3AgPCBORUFSX0VORF9USFJFU0hPTEQ7XG4gIGNvbnN0IGF0RW5kID0gbW9kZSA9PT0gJ3RvcCcgPyBhdFRvcCA6IGF0Qm90dG9tO1xuXG4gIHJldHVybiB7XG4gICAgYXRCb3R0b20sXG4gICAgYXRFbmQsXG4gICAgYXRTdGFydDogIWF0RW5kLFxuICAgIGF0VG9wXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvc2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLmhhbmRsZVNjcm9sbCA9IHRoaXMuaGFuZGxlU2Nyb2xsLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVTY3JvbGxFbmQgPSB0aGlzLmhhbmRsZVNjcm9sbEVuZC5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5faWdub3JlU2Nyb2xsRXZlbnRCZWZvcmUgPSAwO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGZ1bmN0aW9uQ29udGV4dDoge1xuICAgICAgICBzY3JvbGxUbzogc2Nyb2xsVG9wID0+IHRoaXMuc2V0U3RhdGUoKHsgc3RhdGVDb250ZXh0IH0pID0+ICh7XG4gICAgICAgICAgc2Nyb2xsVG9wLFxuICAgICAgICAgIHN0YXRlQ29udGV4dDogdXBkYXRlSW4oc3RhdGVDb250ZXh0LCBbJ2FuaW1hdGluZyddLCAoKSA9PiB0cnVlKVxuICAgICAgICB9KSksXG4gICAgICAgIHNjcm9sbFRvQm90dG9tOiAoKSA9PiB0aGlzLnN0YXRlLmZ1bmN0aW9uQ29udGV4dC5zY3JvbGxUbygnMTAwJScpLFxuICAgICAgICBzY3JvbGxUb0VuZDogKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgc3RhdGU6IHsgZnVuY3Rpb25Db250ZXh0LCBzdGF0ZUNvbnRleHQgfSB9ID0gdGhpcztcblxuICAgICAgICAgIHN0YXRlQ29udGV4dC5tb2RlID09PSAndG9wJyA/IGZ1bmN0aW9uQ29udGV4dC5zY3JvbGxUb1RvcCgpIDogZnVuY3Rpb25Db250ZXh0LnNjcm9sbFRvQm90dG9tKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHNjcm9sbFRvU3RhcnQ6ICgpID0+IHtcbiAgICAgICAgICBjb25zdCB7IHN0YXRlOiB7IGZ1bmN0aW9uQ29udGV4dCwgc3RhdGVDb250ZXh0IH0gfSA9IHRoaXM7XG5cbiAgICAgICAgICBzdGF0ZUNvbnRleHQubW9kZSA9PT0gJ3RvcCcgPyBmdW5jdGlvbkNvbnRleHQuc2Nyb2xsVG9Cb3R0b20oKSA6IGZ1bmN0aW9uQ29udGV4dC5zY3JvbGxUb1RvcCgpO1xuICAgICAgICB9LFxuICAgICAgICBzY3JvbGxUb1RvcDogKCkgPT4gdGhpcy5zdGF0ZS5mdW5jdGlvbkNvbnRleHQuc2Nyb2xsVG8oMClcbiAgICAgIH0sXG4gICAgICBpbnRlcm5hbENvbnRleHQ6IHtcbiAgICAgICAgb2Zmc2V0SGVpZ2h0OiAwLFxuICAgICAgICBzY3JvbGxIZWlnaHQ6IDAsXG4gICAgICAgIHNldFRhcmdldDogdGFyZ2V0ID0+IHRoaXMuc2V0U3RhdGUoKCkgPT4gKHsgdGFyZ2V0IH0pKVxuICAgICAgfSxcbiAgICAgIHNjcm9sbFRvcDogcHJvcHMubW9kZSA9PT0gJ3RvcCcgPyAwIDogJzEwMCUnLFxuICAgICAgc3RhdGVDb250ZXh0OiB7XG4gICAgICAgIGFuaW1hdGluZzogZmFsc2UsXG4gICAgICAgIGF0Qm90dG9tOiB0cnVlLFxuICAgICAgICBhdEVuZDogdHJ1ZSxcbiAgICAgICAgYXRUb3A6IHRydWUsXG4gICAgICAgIG1vZGU6IHByb3BzLm1vZGUsXG4gICAgICAgIHN0aWNreTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHRhcmdldDogbnVsbFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmVuYWJsZVdvcmtlcigpO1xuICB9XG5cbiAgZGlzYWJsZVdvcmtlcigpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuX3N0aWNreUNoZWNrVGltZW91dCk7XG4gIH1cblxuICBlbmFibGVXb3JrZXIoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9zdGlja3lDaGVja1RpbWVvdXQpO1xuXG4gICAgbGV0IHN0aWNreUJ1dE5vdEF0RW5kU2luY2UgPSBmYWxzZTtcblxuICAgIHRoaXMuX3N0aWNreUNoZWNrVGltZW91dCA9IHNldEltbWVkaWF0ZUludGVydmFsKFxuICAgICAgKCkgPT4ge1xuICAgICAgICBjb25zdCB7IHN0YXRlIH0gPSB0aGlzO1xuICAgICAgICBjb25zdCB7IHN0YXRlQ29udGV4dDogeyBzdGlja3kgfSwgdGFyZ2V0IH0gPSBzdGF0ZTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgc3RpY2t5XG4gICAgICAgICAgJiYgdGFyZ2V0XG4gICAgICAgICAgJiYgIWNvbXB1dGVWaWV3U3RhdGUoc3RhdGUpLmF0RW5kXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICghc3RpY2t5QnV0Tm90QXRFbmRTaW5jZSkge1xuICAgICAgICAgICAgc3RpY2t5QnV0Tm90QXRFbmRTaW5jZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChEYXRlLm5vdygpIC0gc3RpY2t5QnV0Tm90QXRFbmRTaW5jZSA+IFNDUk9MTF9ERUNJU0lPTl9EVVJBVElPTikge1xuICAgICAgICAgICAgLy8gUXVpcmtzOiBJbiBGaXJlZm94LCBhZnRlciB1c2VyIHNjcm9sbCBkb3duLCBGaXJlZm94IGRvIHR3byB0aGluZ3M6XG4gICAgICAgICAgICAvLyAgICAgICAgIDEuIFNldCB0byBhIG5ldyBcInNjcm9sbFRvcFwiXG4gICAgICAgICAgICAvLyAgICAgICAgIDIuIEZpcmUgXCJzY3JvbGxcIiBldmVudFxuICAgICAgICAgICAgLy8gICAgICAgICBGb3Igd2hhdCB3ZSBvYnNlcnZlZCwgIzEgaXMgZmlyZWQgYWJvdXQgMjBtcyBiZWZvcmUgIzIuIFRoZXJlIGlzIGEgY2hhbmNlIHRoYXQgdGhpcyBzdGlja3lDaGVja1RpbWVvdXQgaXMgYmVpbmcgc2NoZWR1bGVkIGJldHdlZW4gMSBhbmQgMi5cbiAgICAgICAgICAgIC8vICAgICAgICAgVGhhdCBtZWFucywgaWYgd2UganVzdCBsb29rIGF0ICMxIHRvIGRlY2lkZSBpZiB3ZSBzaG91bGQgc2Nyb2xsLCB3ZSB3aWxsIGFsd2F5cyBzY3JvbGwsIGluIG9wcG9zZSB0byB0aGUgdXNlcidzIGludGVudGlvbi5cbiAgICAgICAgICAgIC8vIFJlcHJvOiBPcGVuIEZpcmVmb3gsIHNldCBjaGVja0ludGVydmFsIHRvIGEgbG93ZXIgbnVtYmVyLCBhbmQgdHJ5IHRvIHNjcm9sbCBieSBkcmFnZ2luZyB0aGUgc2Nyb2xsIGhhbmRsZXIuIEl0IHdpbGwganVtcCBiYWNrLlxuXG4gICAgICAgICAgICBzdGF0ZS5mdW5jdGlvbkNvbnRleHQuc2Nyb2xsVG9FbmQoKTtcbiAgICAgICAgICAgIHN0aWNreUJ1dE5vdEF0RW5kU2luY2UgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RpY2t5QnV0Tm90QXRFbmRTaW5jZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgTWF0aC5tYXgoTUlOX0NIRUNLX0lOVEVSVkFMLCB0aGlzLnByb3BzLmNoZWNrSW50ZXJ2YWwpIHx8IE1JTl9DSEVDS19JTlRFUlZBTFxuICAgICk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLmRpc2FibGVXb3JrZXIoKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSgoeyBzdGF0ZUNvbnRleHQgfSkgPT4gKHtcbiAgICAgIHN0YXRlQ29udGV4dDoge1xuICAgICAgICAuLi5zdGF0ZUNvbnRleHQsXG4gICAgICAgIG1vZGU6IG5leHRQcm9wcy5tb2RlID09PSAndG9wJyA/ICd0b3AnIDogJ2JvdHRvbSdcbiAgICAgIH1cbiAgICB9KSk7XG4gIH1cblxuICBoYW5kbGVTY3JvbGwoeyB0aW1lU3RhbXBMb3cgfSkge1xuICAgIC8vIEN1cnJlbnRseSwgdGhlcmUgYXJlIG5vIHJlbGlhYmxlIHdheSB0byBjaGVjayBpZiB0aGUgXCJzY3JvbGxcIiBldmVudCBpcyB0cmlnZ2VyIGR1ZSB0b1xuICAgIC8vIHVzZXIgZ2VzdHVyZSwgcHJvZ3JhbW1hdGljIHNjcm9sbGluZywgb3IgQ2hyb21lLXN5bnRoZXNpemVkIFwic2Nyb2xsXCIgZXZlbnQgdG8gY29tcGVuc2F0ZSBzaXplIGNoYW5nZS5cbiAgICAvLyBUaHVzLCB3ZSB1c2Ugb3VyIGJlc3QtZWZmb3J0IHRvIGd1ZXNzIGlmIGl0IGlzIHRyaWdnZXJlZCBieSB1c2VyIGdlc3R1cmUsIGFuZCBkaXNhYmxlIHN0aWNreSBpZiBpdCBpcyBoZWFkaW5nIHRvd2FyZHMgdGhlIHN0YXJ0IGRpcmVjdGlvbi5cblxuICAgIGlmICh0aW1lU3RhbXBMb3cgPD0gdGhpcy5faWdub3JlU2Nyb2xsRXZlbnRCZWZvcmUpIHtcbiAgICAgIC8vIFNpbmNlIHdlIGRlYm91bmNlIFwic2Nyb2xsXCIgZXZlbnQsIHRoaXMgaGFuZGxlciBtaWdodCBiZSBjYWxsZWQgYWZ0ZXIgc3BpbmVUby5vbkVuZCAoYS5rLmEuIGFydGlmaWNpYWwgc2Nyb2xsaW5nKS5cbiAgICAgIC8vIFdlIHNob3VsZCBpZ25vcmUgZGVib3VuY2VkIGV2ZW50IGZpcmVkIGFmdGVyIHNjcm9sbEVuZCwgYmVjYXVzZSB3aXRob3V0IHNraXBwaW5nIHRoZW0sIHRoZSB1c2VySW5pdGlhdGVkU2Nyb2xsIGNhbGN1bGF0ZWQgYmVsb3cgd2lsbCBub3QgYmUgYWNjdXJhdGUuXG4gICAgICAvLyBUaHVzLCBvbiBhIGZhc3QgbWFjaGluZSwgYWRkaW5nIGVsZW1lbnRzIHN1cGVyIGZhc3Qgd2lsbCBsb3NlIHRoZSBcInN0aWNraW5lc3NcIi5cblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZGlzYWJsZVdvcmtlcigpO1xuXG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiB7XG4gICAgICBjb25zdCB7IHRhcmdldCB9ID0gc3RhdGU7XG5cbiAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgY29uc3QgeyBpbnRlcm5hbENvbnRleHQsIHNjcm9sbFRvcCwgc3RhdGVDb250ZXh0IH0gPSBzdGF0ZTtcbiAgICAgICAgY29uc3QgeyBhdEJvdHRvbSwgYXRFbmQsIGF0U3RhcnQsIGF0VG9wIH0gPSBjb21wdXRlVmlld1N0YXRlKHN0YXRlKTtcbiAgICAgICAgbGV0IG5leHRJbnRlcm5hbENvbnRleHQgPSBpbnRlcm5hbENvbnRleHQ7XG4gICAgICAgIGxldCBuZXh0U3RhdGVDb250ZXh0ID0gc3RhdGVDb250ZXh0O1xuXG4gICAgICAgIG5leHRTdGF0ZUNvbnRleHQgPSB1cGRhdGVJbihuZXh0U3RhdGVDb250ZXh0LCBbJ2F0Qm90dG9tJ10sICgpID0+IGF0Qm90dG9tKTtcbiAgICAgICAgbmV4dFN0YXRlQ29udGV4dCA9IHVwZGF0ZUluKG5leHRTdGF0ZUNvbnRleHQsIFsnYXRFbmQnXSwgKCkgPT4gYXRFbmQpO1xuICAgICAgICBuZXh0U3RhdGVDb250ZXh0ID0gdXBkYXRlSW4obmV4dFN0YXRlQ29udGV4dCwgWydhdFN0YXJ0J10sICgpID0+IGF0U3RhcnQpO1xuICAgICAgICBuZXh0U3RhdGVDb250ZXh0ID0gdXBkYXRlSW4obmV4dFN0YXRlQ29udGV4dCwgWydhdFRvcCddLCAoKSA9PiBhdFRvcCk7XG5cbiAgICAgICAgLy8gQ2hyb21lIHdpbGwgZW1pdCBcInN5bnRoZXRpY1wiIHNjcm9sbCBldmVudCBpZiB0aGUgY29udGFpbmVyIGlzIHJlc2l6ZWQgb3IgYW4gZWxlbWVudCBpcyBhZGRlZFxuICAgICAgICAvLyBXZSBuZWVkIHRvIGlnbm9yZSB0aGVzZSBcInN5bnRoZXRpY1wiIGV2ZW50c1xuICAgICAgICAvLyBSZXBybzogSW4gcGxheWdyb3VuZCwgcHJlc3MgNC0xLTUtMS0xIChzbWFsbCwgYWRkIG9uZSwgbm9ybWFsLCBhZGQgb25lLCBhZGQgb25lKVxuICAgICAgICAvLyAgICAgICAgTm9tYXR0ZXIgaG93IGZhc3Qgb3Igc2xvdyB0aGUgc2VxdWVuY2UgaXMgYmVpbmcgcHJlc3NzZWQsIGl0IHNob3VsZCBzdGlsbCBzdGljayB0byB0aGUgYm90dG9tXG4gICAgICAgIGNvbnN0IHsgb2Zmc2V0SGVpZ2h0LCBzY3JvbGxIZWlnaHQgfSA9IHRhcmdldDtcbiAgICAgICAgY29uc3QgcmVzaXplZCA9IG9mZnNldEhlaWdodCAhPT0gaW50ZXJuYWxDb250ZXh0Lm9mZnNldEhlaWdodDtcbiAgICAgICAgY29uc3QgZWxlbWVudENoYW5nZWQgPSBzY3JvbGxIZWlnaHQgIT09IGludGVybmFsQ29udGV4dC5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgaWYgKHJlc2l6ZWQpIHtcbiAgICAgICAgICBuZXh0SW50ZXJuYWxDb250ZXh0ID0gdXBkYXRlSW4obmV4dEludGVybmFsQ29udGV4dCwgWydvZmZzZXRIZWlnaHQnXSwgKCkgPT4gb2Zmc2V0SGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbGVtZW50Q2hhbmdlZCkge1xuICAgICAgICAgIG5leHRJbnRlcm5hbENvbnRleHQgPSB1cGRhdGVJbihuZXh0SW50ZXJuYWxDb250ZXh0LCBbJ3Njcm9sbEhlaWdodCddLCAoKSA9PiBzY3JvbGxIZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3RpY2t5IG1lYW5zOlxuICAgICAgICAvLyAtIElmIGl0IGlzIHNjcm9sbGVkIHByb2dyYW1hdGljYWxseSwgd2UgYXJlIHN0aWxsIGluIHN0aWNreSBtb2RlXG4gICAgICAgIC8vIC0gSWYgaXQgaXMgc2Nyb2xsZWQgYnkgdGhlIHVzZXIsIHRoZW4gc3RpY2t5IG1lYW5zIGlmIHdlIGFyZSBhdCB0aGUgZW5kXG5cbiAgICAgICAgLy8gT25seSB1cGRhdGUgc3RpY2tpbmVzcyBpZiB0aGUgc2Nyb2xsIGV2ZW50IGlzIG5vdCBkdWUgdG8gc3ludGhldGljIHNjcm9sbCBkb25lIGJ5IENocm9tZVxuICAgICAgICBpZiAoIXJlc2l6ZWQgJiYgIWVsZW1lbnRDaGFuZ2VkKSB7XG4gICAgICAgICAgbmV4dFN0YXRlQ29udGV4dCA9IHVwZGF0ZUluKG5leHRTdGF0ZUNvbnRleHQsIFsnc3RpY2t5J10sICgpID0+IHN0YXRlQ29udGV4dC5hbmltYXRpbmcgPyB0cnVlIDogYXRFbmQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgbm8gc2Nyb2xsVG9wIGlzIHNldCAobm90IGluIHByb2dyYW1tYXRpYyBzY3JvbGxpbmcgbW9kZSksIHdlIHNob3VsZCBzZXQgXCJhbmltYXRpbmdcIiB0byBmYWxzZVxuICAgICAgICAvLyBcImFuaW1hdGluZ1wiIGlzIHVzZWQgdG8gY2FsY3VsYXRlIHRoZSBcInN0aWNreVwiIHByb3BlcnR5XG4gICAgICAgIGlmIChzY3JvbGxUb3AgPT09IG51bGwpIHtcbiAgICAgICAgICBuZXh0U3RhdGVDb250ZXh0ID0gdXBkYXRlSW4obmV4dFN0YXRlQ29udGV4dCwgWydhbmltYXRpbmcnXSwgKCkgPT4gZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5pbnRlcm5hbENvbnRleHQgPT09IG5leHRJbnRlcm5hbENvbnRleHQgPyB7fSA6IHsgaW50ZXJuYWxDb250ZXh0OiBuZXh0SW50ZXJuYWxDb250ZXh0IH0sXG4gICAgICAgICAgLi4uc3RhdGVDb250ZXh0ID09PSBuZXh0U3RhdGVDb250ZXh0ID8ge30gOiB7IHN0YXRlQ29udGV4dDogbmV4dFN0YXRlQ29udGV4dCB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5zdGF0ZS5zdGF0ZUNvbnRleHQuc3RpY2t5ICYmIHRoaXMuZW5hYmxlV29ya2VyKCk7XG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVTY3JvbGxFbmQoKSB7XG4gICAgLy8gV2Ugc2hvdWxkIGlnbm9yZSBkZWJvdW5jaW5nIGhhbmRsZVNjcm9sbCB0aGF0IGVtaXQgYmVmb3JlIHRoaXMgdGltZVxuICAgIHRoaXMuX2lnbm9yZVNjcm9sbEV2ZW50QmVmb3JlID0gRGF0ZS5ub3coKTtcblxuICAgIHRoaXMuc2V0U3RhdGUoKCkgPT4gKHsgc2Nyb2xsVG9wOiBudWxsIH0pKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBoYW5kbGVTY3JvbGwsXG4gICAgICBoYW5kbGVTY3JvbGxFbmQsXG4gICAgICBwcm9wczogeyBjaGlsZHJlbiwgZGVib3VuY2UgfSxcbiAgICAgIHN0YXRlOiB7IGZ1bmN0aW9uQ29udGV4dCwgaW50ZXJuYWxDb250ZXh0LCBzY3JvbGxUb3AsIHN0YXRlQ29udGV4dCwgdGFyZ2V0IH1cbiAgICB9ID0gdGhpcztcblxuICAgIHJldHVybiAoXG4gICAgICA8SW50ZXJuYWxDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXsgaW50ZXJuYWxDb250ZXh0IH0+XG4gICAgICAgIDxGdW5jdGlvbkNvbnRleHQuUHJvdmlkZXIgdmFsdWU9eyBmdW5jdGlvbkNvbnRleHQgfT5cbiAgICAgICAgICA8U3RhdGVDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXsgc3RhdGVDb250ZXh0IH0+XG4gICAgICAgICAgICB7IGNoaWxkcmVuIH1cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGFyZ2V0ICYmXG4gICAgICAgICAgICAgICAgPEV2ZW50U3B5XG4gICAgICAgICAgICAgICAgICBkZWJvdW5jZT17IGRlYm91bmNlIH1cbiAgICAgICAgICAgICAgICAgIG5hbWU9XCJzY3JvbGxcIlxuICAgICAgICAgICAgICAgICAgb25FdmVudD17IGhhbmRsZVNjcm9sbCB9XG4gICAgICAgICAgICAgICAgICB0YXJnZXQ9eyB0YXJnZXQgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRhcmdldCAmJiBzY3JvbGxUb3AgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICA8U3BpbmVUb1xuICAgICAgICAgICAgICAgICAgbmFtZT1cInNjcm9sbFRvcFwiXG4gICAgICAgICAgICAgICAgICBvbkVuZD17IGhhbmRsZVNjcm9sbEVuZCB9XG4gICAgICAgICAgICAgICAgICB0YXJnZXQ9eyB0YXJnZXQgfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9eyBzY3JvbGxUb3AgfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9TdGF0ZUNvbnRleHQuUHJvdmlkZXI+XG4gICAgICAgIDwvRnVuY3Rpb25Db250ZXh0LlByb3ZpZGVyPlxuICAgICAgPC9JbnRlcm5hbENvbnRleHQuUHJvdmlkZXI+XG4gICAgKTtcbiAgfVxufVxuXG5Db21wb3Nlci5kZWZhdWx0UHJvcHMgPSB7XG4gIGNoZWNrSW50ZXJ2YWw6IDEwMCxcbiAgZGVib3VuY2U6IDE3XG59O1xuXG5Db21wb3Nlci5wcm9wVHlwZXMgPSB7XG4gIGNoZWNrSW50ZXJ2YWw6IFByb3BUeXBlcy5udW1iZXIsXG4gIGRlYm91bmNlOiBQcm9wVHlwZXMubnVtYmVyXG59O1xuIl19