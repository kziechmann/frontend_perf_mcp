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
Object.defineProperty(exports, "__esModule", { value: true });
// Entry point for the Frontend Performance MCP Server
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const lighthouseAdapter_1 = require("./lighthouseAdapter");
const webPageTestAdapter_1 = require("./webPageTestAdapter");
const server = new mcp_js_1.McpServer({
    name: "frontend-perf-mcp",
    version: "0.1.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
// Register Lighthouse audit tool as an MCP tool
server.registerTool('lighthouse-audit', lighthouseAdapter_1.LighthouseAuditInput, (args) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = args;
    const result = yield (0, lighthouseAdapter_1.lighthouseTool)({ url });
    return {
        content: [
            {
                type: 'text',
                text: `Lighthouse Results for ${url}\nPerformance: ${result.performance}\nAccessibility: ${result.accessibility}\nBest Practices: ${result.bestPractices}\nSEO: ${result.seo}\nPWA: ${result.pwa}\n\nFull JSON:\n${JSON.stringify(result, null, 2)}`,
            }
        ],
    };
}));
// Register WebPageTest tool as an MCP tool
server.registerTool('webpagetest-audit', webPageTestAdapter_1.WebPageTestInput, (args) => __awaiter(void 0, void 0, void 0, function* () {
    const { url, location, runs } = args;
    try {
        const result = yield (0, webPageTestAdapter_1.webPageTestTool)({ url, location, runs });
        return {
            content: [
                {
                    type: 'text',
                    text: `WebPageTest Results for ${url}\nTest ID: ${result.testId}\nSummary: ${result.summary}\nResults: ${result.resultsUrl}`,
                }
            ],
        };
    }
    catch (e) {
        return {
            content: [
                {
                    type: 'text',
                    text: `WebPageTest error: ${e.message}`,
                }
            ],
            isError: true,
        };
    }
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const transport = new stdio_js_1.StdioServerTransport();
        yield server.connect(transport);
        console.error("Frontend Performance MCP Server running on stdio");
    });
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
