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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const rest_1 = require("@octokit/rest");
const makeStatusRequest_1 = __importDefault(require("./makeStatusRequest"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const authToken = core.getInput('authToken');
        let octokit = null;
        try {
            octokit = new rest_1.Octokit({
                auth: authToken,
                userAgent: "github-status-action",
                baseUrl: 'https://api.github.com',
                log: {
                    debug: () => { },
                    info: () => { },
                    warn: console.warn,
                    error: console.error
                },
                request: {
                    agent: undefined,
                    fetch: undefined,
                    timeout: 0
                }
            });
        }
        catch (error) {
            core.setFailed("Error creating octokit:\n" + error.message);
            return;
        }
        if (octokit == null) {
            core.setFailed("Error creating octokit:\noctokit was null");
            return;
        }
        let statusRequest;
        try {
            statusRequest = makeStatusRequest_1.default();
        }
        catch (error) {
            core.setFailed(`Error creating status request object: ${error.message}`);
            return;
        }
        try {
            yield octokit.repos.createStatus(statusRequest);
        }
        catch (error) {
            core.setFailed(`Error setting status:\n${error.message}\nRequest object:\n${JSON.stringify(statusRequest, null, 2)}`);
        }
    });
}
run();
