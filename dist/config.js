"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV === "production") {
  _dotenv.default.config({
    path: _path.default.resolve(process.cwd(), 'production.env')
  });
} else {
  _dotenv.default.config();
}

const config = { ...process.env
}; // set nodejs modules

var _default = config;
exports.default = _default;