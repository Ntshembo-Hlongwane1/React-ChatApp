"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var context = _react.default.createContext({
  scrollTo: function scrollTo() {
    return 0;
  },
  scrollToBottom: function scrollToBottom() {
    return 0;
  },
  scrollToEnd: function scrollToEnd() {
    return 0;
  },
  scrollToStart: function scrollToStart() {
    return 0;
  },
  scrollToTop: function scrollToTop() {
    return 0;
  }
});

context.displayName = 'ScrollToBottomFunctionContext';
var _default = context;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TY3JvbGxUb0JvdHRvbS9GdW5jdGlvbkNvbnRleHQuanMiXSwibmFtZXMiOlsiY29udGV4dCIsIlJlYWN0IiwiY3JlYXRlQ29udGV4dCIsInNjcm9sbFRvIiwic2Nyb2xsVG9Cb3R0b20iLCJzY3JvbGxUb0VuZCIsInNjcm9sbFRvU3RhcnQiLCJzY3JvbGxUb1RvcCIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFFQSxJQUFNQSxPQUFPLEdBQUdDLGVBQU1DLGFBQU4sQ0FBb0I7QUFDbENDLEVBQUFBLFFBQVEsRUFBRTtBQUFBLFdBQU0sQ0FBTjtBQUFBLEdBRHdCO0FBRWxDQyxFQUFBQSxjQUFjLEVBQUU7QUFBQSxXQUFNLENBQU47QUFBQSxHQUZrQjtBQUdsQ0MsRUFBQUEsV0FBVyxFQUFFO0FBQUEsV0FBTSxDQUFOO0FBQUEsR0FIcUI7QUFJbENDLEVBQUFBLGFBQWEsRUFBRTtBQUFBLFdBQU0sQ0FBTjtBQUFBLEdBSm1CO0FBS2xDQyxFQUFBQSxXQUFXLEVBQUU7QUFBQSxXQUFNLENBQU47QUFBQTtBQUxxQixDQUFwQixDQUFoQjs7QUFRQVAsT0FBTyxDQUFDUSxXQUFSLEdBQXNCLCtCQUF0QjtlQUVlUixPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgY29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQoe1xuICBzY3JvbGxUbzogKCkgPT4gMCxcbiAgc2Nyb2xsVG9Cb3R0b206ICgpID0+IDAsXG4gIHNjcm9sbFRvRW5kOiAoKSA9PiAwLFxuICBzY3JvbGxUb1N0YXJ0OiAoKSA9PiAwLFxuICBzY3JvbGxUb1RvcDogKCkgPT4gMFxufSk7XG5cbmNvbnRleHQuZGlzcGxheU5hbWUgPSAnU2Nyb2xsVG9Cb3R0b21GdW5jdGlvbkNvbnRleHQnO1xuXG5leHBvcnQgZGVmYXVsdCBjb250ZXh0O1xuIl19