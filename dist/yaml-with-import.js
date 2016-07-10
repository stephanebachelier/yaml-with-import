'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yamljs = require('yamljs');

var _yamljs2 = _interopRequireDefault(_yamljs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YamlWithImportLoader = function () {
    function YamlWithImportLoader() {
        _classCallCheck(this, YamlWithImportLoader);
    }

    _createClass(YamlWithImportLoader, [{
        key: 'read',


        /**
         * @param fileName
         * @returns {Object}
         */
        value: function read(fileName) {
            var _this = this;

            var json = _yamljs2.default.load(__dirname + '/' + fileName);
            if (!!json.imports) {
                var _ret = function () {
                    var importedFile = {};
                    _lodash2.default.forEach(json.imports, function (yamlDoc) {
                        importedFile = _this.read(yamlDoc.resource);
                        delete json.imports;
                        _lodash2.default.assign(importedFile, json);
                    });

                    return {
                        v: importedFile
                    };
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            }

            return json;
        }
    }]);

    return YamlWithImportLoader;
}();

exports.default = YamlWithImportLoader;