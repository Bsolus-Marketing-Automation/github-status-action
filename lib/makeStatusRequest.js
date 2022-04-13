"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERR_INVALID_STATE = exports.ERR_INVALID_OWNER = void 0;
const actionsCore = __importStar(require("@actions/core"));
const inputNames_1 = __importDefault(require("./inputNames"));
exports.ERR_INVALID_OWNER = "Input 'owner' must be a valid GitHub username";
exports.ERR_INVALID_STATE = "Input 'state' must be one of success | error | failure | pending";
const regExUsername = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
function makeStatusRequest(testCore = null) {
    var _a;
    let core = (_a = testCore) !== null && _a !== void 0 ? _a : actionsCore;
    let request = {};
    request.context = core.getInput(inputNames_1.default.context);
    request.description = core.getInput(inputNames_1.default.desc);
    request.state = core.getInput(inputNames_1.default.state);
    request.owner = core.getInput(inputNames_1.default.owner);
    request.repo = core.getInput(inputNames_1.default.repo);
    request.sha = core.getInput(inputNames_1.default.sha);
    request.target_url = core.getInput(inputNames_1.default.target_url);
    if (!validateState(request.state)) {
        throw new Error(exports.ERR_INVALID_STATE);
    }
    if (request.repo.startsWith(`${request.owner}/`)) {
        request.repo = request.repo.replace(`${request.owner}/`, '');
    }
    return request;
}
exports.default = makeStatusRequest;
function validateState(state) {
    return (state == "success"
        || state == "error"
        || state == "failure"
        || state == "pending");
}
