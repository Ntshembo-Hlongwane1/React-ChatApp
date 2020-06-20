"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _glamor = require("glamor");

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _FunctionContext = _interopRequireDefault(require("./FunctionContext"));

var _StateContext = _interopRequireDefault(require("./StateContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_CSS = (0, _glamor.css)({
  backgroundColor: 'rgba(0, 0, 0, .2)',
  borderRadius: 10,
  borderWidth: 0,
  bottom: 5,
  cursor: 'pointer',
  height: 20,
  outline: 0,
  position: 'absolute',
  right: 20,
  width: 20,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, .4)'
  },
  '&:active': {
    backgroundColor: 'rgba(0, 0, 0, .6)'
  }
});

var _default = function _default(_ref) {
  var children = _ref.children,
      className = _ref.className;
  return _react.default.createElement(_StateContext.default.Consumer, null, function (_ref2) {
    var sticky = _ref2.sticky;
    return !sticky && _react.default.createElement(_FunctionContext.default.Consumer, null, function (_ref3) {
      var scrollToEnd = _ref3.scrollToEnd;
      return _react.default.createElement("button", {
        className: (0, _classnames.default)(ROOT_CSS + '', (className || '') + ''),
        onClick: scrollToEnd
      }, children);
    });
  });
};

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TY3JvbGxUb0JvdHRvbS9BdXRvSGlkZUZvbGxvd0J1dHRvbi5qcyJdLCJuYW1lcyI6WyJST09UX0NTUyIsImJhY2tncm91bmRDb2xvciIsImJvcmRlclJhZGl1cyIsImJvcmRlcldpZHRoIiwiYm90dG9tIiwiY3Vyc29yIiwiaGVpZ2h0Iiwib3V0bGluZSIsInBvc2l0aW9uIiwicmlnaHQiLCJ3aWR0aCIsImNoaWxkcmVuIiwiY2xhc3NOYW1lIiwic3RpY2t5Iiwic2Nyb2xsVG9FbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUVBLElBQU1BLFFBQVEsR0FBRyxpQkFBSTtBQUNuQkMsRUFBQUEsZUFBZSxFQUFFLG1CQURFO0FBRW5CQyxFQUFBQSxZQUFZLEVBQUUsRUFGSztBQUduQkMsRUFBQUEsV0FBVyxFQUFFLENBSE07QUFJbkJDLEVBQUFBLE1BQU0sRUFBRSxDQUpXO0FBS25CQyxFQUFBQSxNQUFNLEVBQUUsU0FMVztBQU1uQkMsRUFBQUEsTUFBTSxFQUFFLEVBTlc7QUFPbkJDLEVBQUFBLE9BQU8sRUFBRSxDQVBVO0FBUW5CQyxFQUFBQSxRQUFRLEVBQUUsVUFSUztBQVNuQkMsRUFBQUEsS0FBSyxFQUFFLEVBVFk7QUFVbkJDLEVBQUFBLEtBQUssRUFBRSxFQVZZO0FBWW5CLGFBQVc7QUFDVFQsSUFBQUEsZUFBZSxFQUFFO0FBRFIsR0FaUTtBQWdCbkIsY0FBWTtBQUNWQSxJQUFBQSxlQUFlLEVBQUU7QUFEUDtBQWhCTyxDQUFKLENBQWpCOztlQXFCZTtBQUFBLE1BQUdVLFFBQUgsUUFBR0EsUUFBSDtBQUFBLE1BQWFDLFNBQWIsUUFBYUEsU0FBYjtBQUFBLFNBQ2IsNkJBQUMscUJBQUQsQ0FBYyxRQUFkLFFBQ0k7QUFBQSxRQUFHQyxNQUFILFNBQUdBLE1BQUg7QUFBQSxXQUFnQixDQUFDQSxNQUFELElBQ2hCLDZCQUFDLHdCQUFELENBQWlCLFFBQWpCLFFBQ0k7QUFBQSxVQUFHQyxXQUFILFNBQUdBLFdBQUg7QUFBQSxhQUNBO0FBQ0UsUUFBQSxTQUFTLEVBQUcseUJBQVdkLFFBQVEsR0FBRyxFQUF0QixFQUEwQixDQUFDWSxTQUFTLElBQUksRUFBZCxJQUFvQixFQUE5QyxDQURkO0FBRUUsUUFBQSxPQUFPLEVBQUdFO0FBRlosU0FJSUgsUUFKSixDQURBO0FBQUEsS0FESixDQURBO0FBQUEsR0FESixDQURhO0FBQUEsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gJ2dsYW1vcic7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBGdW5jdGlvbkNvbnRleHQgZnJvbSAnLi9GdW5jdGlvbkNvbnRleHQnO1xuaW1wb3J0IFN0YXRlQ29udGV4dCBmcm9tICcuL1N0YXRlQ29udGV4dCc7XG5cbmNvbnN0IFJPT1RfQ1NTID0gY3NzKHtcbiAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAuMiknLFxuICBib3JkZXJSYWRpdXM6IDEwLFxuICBib3JkZXJXaWR0aDogMCxcbiAgYm90dG9tOiA1LFxuICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgaGVpZ2h0OiAyMCxcbiAgb3V0bGluZTogMCxcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHJpZ2h0OiAyMCxcbiAgd2lkdGg6IDIwLFxuXG4gICcmOmhvdmVyJzoge1xuICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgLjQpJ1xuICB9LFxuXG4gICcmOmFjdGl2ZSc6IHtcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIC42KSdcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0ICh7IGNoaWxkcmVuLCBjbGFzc05hbWUgfSkgPT5cbiAgPFN0YXRlQ29udGV4dC5Db25zdW1lcj5cbiAgICB7ICh7IHN0aWNreSB9KSA9PiAhc3RpY2t5ICYmXG4gICAgICA8RnVuY3Rpb25Db250ZXh0LkNvbnN1bWVyPlxuICAgICAgICB7ICh7IHNjcm9sbFRvRW5kIH0pID0+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPXsgY2xhc3NOYW1lcyhST09UX0NTUyArICcnLCAoY2xhc3NOYW1lIHx8ICcnKSArICcnKSB9XG4gICAgICAgICAgICBvbkNsaWNrPXsgc2Nyb2xsVG9FbmQgfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHsgY2hpbGRyZW4gfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICB9XG4gICAgICA8L0Z1bmN0aW9uQ29udGV4dC5Db25zdW1lcj5cbiAgICB9XG4gIDwvU3RhdGVDb250ZXh0LkNvbnN1bWVyPlxuIl19