"use strict";
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
exports.LighthouseAuditOutput = exports.LighthouseAuditInput = exports.runLighthouseAudit = void 0;
exports.lighthouseTool = lighthouseTool;
// Lighthouse Adapter
// This module provides a tool to run Lighthouse audits on a given URL and returns the results.
const lighthouse_1 = __importDefault(require("lighthouse"));
const chrome_launcher_1 = __importDefault(require("chrome-launcher"));
const zod_1 = require("zod");
const runLighthouseAudit = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const chrome = yield chrome_launcher_1.default.launch({ chromeFlags: ['--headless'] });
    const options = { port: chrome.port };
    const result = yield (0, lighthouse_1.default)(url, options);
    yield chrome.kill();
    return result === null || result === void 0 ? void 0 : result.lhr;
});
exports.runLighthouseAudit = runLighthouseAudit;
exports.LighthouseAuditInput = zod_1.z.object({
    url: zod_1.z.string().url(),
});
exports.LighthouseAuditOutput = zod_1.z.object({
    performance: zod_1.z.number(),
    accessibility: zod_1.z.number(),
    bestPractices: zod_1.z.number(),
    seo: zod_1.z.number(),
    pwa: zod_1.z.number(),
    report: zod_1.z.string(),
});
function lighthouseTool(_a) {
    return __awaiter(this, arguments, void 0, function* ({ url }) {
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const lhr = yield (0, exports.runLighthouseAudit)(url);
        return {
            performance: ((_c = (_b = lhr === null || lhr === void 0 ? void 0 : lhr.categories) === null || _b === void 0 ? void 0 : _b.performance) === null || _c === void 0 ? void 0 : _c.score) != null ? lhr.categories.performance.score * 100 : 0,
            accessibility: ((_e = (_d = lhr === null || lhr === void 0 ? void 0 : lhr.categories) === null || _d === void 0 ? void 0 : _d.accessibility) === null || _e === void 0 ? void 0 : _e.score) != null ? lhr.categories.accessibility.score * 100 : 0,
            bestPractices: ((_g = (_f = lhr === null || lhr === void 0 ? void 0 : lhr.categories) === null || _f === void 0 ? void 0 : _f['best-practices']) === null || _g === void 0 ? void 0 : _g.score) != null ? lhr.categories['best-practices'].score * 100 : 0,
            seo: ((_j = (_h = lhr === null || lhr === void 0 ? void 0 : lhr.categories) === null || _h === void 0 ? void 0 : _h.seo) === null || _j === void 0 ? void 0 : _j.score) != null ? lhr.categories.seo.score * 100 : 0,
            pwa: ((_l = (_k = lhr === null || lhr === void 0 ? void 0 : lhr.categories) === null || _k === void 0 ? void 0 : _k.pwa) === null || _l === void 0 ? void 0 : _l.score) != null ? lhr.categories.pwa.score * 100 : 0,
            report: (_m = lhr === null || lhr === void 0 ? void 0 : lhr.finalUrl) !== null && _m !== void 0 ? _m : '',
        };
    });
}
