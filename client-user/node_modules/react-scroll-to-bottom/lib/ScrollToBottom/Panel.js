"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _glamor = require("glamor");

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _InternalContext = _interopRequireDefault(require("./InternalContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ROOT_CSS = (0, _glamor.css)({
  height: '100%',
  overflowY: 'auto',
  width: '100%'
});

var Panel = function Panel(_ref) {
  var children = _ref.children,
      className = _ref.className,
      setTarget = _ref.setTarget;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)(ROOT_CSS + '', (className || '') + ''),
    ref: setTarget
  }, children);
};

var _default = function _default(props) {
  return _react.default.createElement(_InternalContext.default.Consumer, null, function (_ref2) {
    var setTarget = _ref2.setTarget;
    return _react.default.createElement(Panel, _extends({
      setTarget: setTarget
    }, props));
  });
};

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TY3JvbGxUb0JvdHRvbS9QYW5lbC5qcyJdLCJuYW1lcyI6WyJST09UX0NTUyIsImhlaWdodCIsIm92ZXJmbG93WSIsIndpZHRoIiwiUGFuZWwiLCJjaGlsZHJlbiIsImNsYXNzTmFtZSIsInNldFRhcmdldCIsInByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7OztBQUVBLElBQU1BLFFBQVEsR0FBRyxpQkFBSTtBQUNuQkMsRUFBQUEsTUFBTSxFQUFFLE1BRFc7QUFFbkJDLEVBQUFBLFNBQVMsRUFBRSxNQUZRO0FBR25CQyxFQUFBQSxLQUFLLEVBQUU7QUFIWSxDQUFKLENBQWpCOztBQU1BLElBQU1DLEtBQUssR0FBRyxTQUFSQSxLQUFRO0FBQUEsTUFBR0MsUUFBSCxRQUFHQSxRQUFIO0FBQUEsTUFBYUMsU0FBYixRQUFhQSxTQUFiO0FBQUEsTUFBd0JDLFNBQXhCLFFBQXdCQSxTQUF4QjtBQUFBLFNBQ1o7QUFDRSxJQUFBLFNBQVMsRUFBRyx5QkFBV1AsUUFBUSxHQUFHLEVBQXRCLEVBQTBCLENBQUNNLFNBQVMsSUFBSSxFQUFkLElBQW9CLEVBQTlDLENBRGQ7QUFFRSxJQUFBLEdBQUcsRUFBR0M7QUFGUixLQUlJRixRQUpKLENBRFk7QUFBQSxDQUFkOztlQVFlLGtCQUFBRyxLQUFLO0FBQUEsU0FDbEIsNkJBQUMsd0JBQUQsQ0FBaUIsUUFBakIsUUFDSTtBQUFBLFFBQUdELFNBQUgsU0FBR0EsU0FBSDtBQUFBLFdBQ0EsNkJBQUMsS0FBRDtBQUNFLE1BQUEsU0FBUyxFQUFHQTtBQURkLE9BRU9DLEtBRlAsRUFEQTtBQUFBLEdBREosQ0FEa0I7QUFBQSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSAnZ2xhbW9yJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IEludGVybmFsQ29udGV4dCBmcm9tICcuL0ludGVybmFsQ29udGV4dCc7XG5cbmNvbnN0IFJPT1RfQ1NTID0gY3NzKHtcbiAgaGVpZ2h0OiAnMTAwJScsXG4gIG92ZXJmbG93WTogJ2F1dG8nLFxuICB3aWR0aDogJzEwMCUnXG59KTtcblxuY29uc3QgUGFuZWwgPSAoeyBjaGlsZHJlbiwgY2xhc3NOYW1lLCBzZXRUYXJnZXQgfSkgPT5cbiAgPGRpdlxuICAgIGNsYXNzTmFtZT17IGNsYXNzTmFtZXMoUk9PVF9DU1MgKyAnJywgKGNsYXNzTmFtZSB8fCAnJykgKyAnJykgfVxuICAgIHJlZj17IHNldFRhcmdldCB9XG4gID5cbiAgICB7IGNoaWxkcmVuIH1cbiAgPC9kaXY+XG5cbmV4cG9ydCBkZWZhdWx0IHByb3BzID0+XG4gIDxJbnRlcm5hbENvbnRleHQuQ29uc3VtZXI+XG4gICAgeyAoeyBzZXRUYXJnZXQgfSkgPT5cbiAgICAgIDxQYW5lbFxuICAgICAgICBzZXRUYXJnZXQ9eyBzZXRUYXJnZXQgfVxuICAgICAgICB7IC4uLnByb3BzIH1cbiAgICAgIC8+XG4gICAgfVxuICA8L0ludGVybmFsQ29udGV4dC5Db25zdW1lcj5cbiJdfQ==