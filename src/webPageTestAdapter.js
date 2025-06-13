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
exports.WebPageTestOutput = exports.WebPageTestInput = void 0;
exports.webPageTestTool = webPageTestTool;
// WebPageTest Adapter
// This module provides a tool to run WebPageTest audits on a given URL and returns the results.
const node_fetch_1 = __importDefault(require("node-fetch"));
const zod_1 = require("zod");
const WEBPAGETEST_API_KEY = process.env.WEBPAGETEST_API_KEY || '';
const WEBPAGETEST_API_URL = 'https://www.webpagetest.org/runtest.php';
exports.WebPageTestInput = zod_1.z.object({
    url: zod_1.z.string().url(),
    location: zod_1.z.string().optional(),
    runs: zod_1.z.number().min(1).max(10).optional(),
});
exports.WebPageTestOutput = zod_1.z.object({
    testId: zod_1.z.string(),
    summary: zod_1.z.string(),
    resultsUrl: zod_1.z.string(),
});
function webPageTestTool(_a) {
    return __awaiter(this, arguments, void 0, function* ({ url, location, runs }) {
        const params = new URLSearchParams(Object.assign(Object.assign({ url, f: 'json', k: WEBPAGETEST_API_KEY }, (location ? { location } : {})), (runs ? { runs: runs.toString() } : {})));
        const response = yield (0, node_fetch_1.default)(`${WEBPAGETEST_API_URL}?${params.toString()}`);
        const data = yield response.json();
        if (data.statusCode !== 200) {
            throw new Error(data.statusText || 'WebPageTest API error');
        }
        return {
            testId: data.data.testId,
            summary: data.data.summary,
            resultsUrl: data.data.userUrl,
        };
    });
}
