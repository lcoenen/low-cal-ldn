"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lotion = _interopRequireWildcard(require("lotion"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var server = (0, _express["default"])();
server.use(_bodyParser["default"].json()); // support json encoded bodies

server.use(_bodyParser["default"].urlencoded({
  extended: true
}));
var tendermint = (0, _lotion["default"])({
  initialState: {
    artefacts: []
  }
});
tendermint.use(function (state, transaction) {
  state.artefacts.push(transaction);
});
tendermint.start().then( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(appInfo) {
    var _ref2, state, send;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log('Tendermind blockchain started');
            console.log(appInfo.GCI);
            _context3.next = 4;
            return (0, _lotion.connect)(appInfo.GCI);

          case 4:
            _ref2 = _context3.sent;
            state = _ref2.state;
            send = _ref2.send;
            server.get('/artefacts', /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
                var artefacts;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return state.artefacts;

                      case 2:
                        artefacts = _context.sent;
                        res.send(artefacts);

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x2, _x3) {
                return _ref3.apply(this, arguments);
              };
            }());
            server.post('/artefacts', /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.prev = 0;
                        console.log('trying with ', req.body);
                        _context2.next = 4;
                        return send(req.body.artefact);

                      case 4:
                        res.send('sent');
                        _context2.next = 10;
                        break;

                      case 7:
                        _context2.prev = 7;
                        _context2.t0 = _context2["catch"](0);
                        console.warn(_context2.t0);

                      case 10:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, null, [[0, 7]]);
              }));

              return function (_x4, _x5) {
                return _ref4.apply(this, arguments);
              };
            }());
            server.listen(2999, function () {
              console.log('Low-cal server listening on port 2999!');
            });

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());