// Entry point for the Frontend Performance MCP Server
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { lighthouseTool, LighthouseAuditInput, LighthouseAuditOutput } from './lighthouseAdapter';
import { webPageTestTool, WebPageTestInput } from './webPageTestAdapter';

const server = new McpServer({
  name: "frontend-perf-mcp",
  version: "0.1.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Register Lighthouse audit tool as an MCP tool
server.registerTool(
  'lighthouse-audit',
  LighthouseAuditInput,
  async (args: { [key: string]: any }) => {
    const { url } = args;
    const result = await lighthouseTool({ url });
    return {
      content: [
        {
          type: 'text',
          text: `Lighthouse Results for ${url}\nPerformance: ${result.performance}\nAccessibility: ${result.accessibility}\nBest Practices: ${result.bestPractices}\nSEO: ${result.seo}\nPWA: ${result.pwa}\n\nFull JSON:\n${JSON.stringify(result, null, 2)}`,
        }
      ],
    };
  }
);

// Register WebPageTest tool as an MCP tool
server.registerTool(
  'webpagetest-audit',
  WebPageTestInput,
  async (args: { [key: string]: any }) => {
    const { url, location, runs } = args;
    try {
      const result = await webPageTestTool({ url, location, runs });
      return {
        content: [
          {
            type: 'text',
            text: `WebPageTest Results for ${url}\nTest ID: ${result.testId}\nSummary: ${result.summary}\nResults: ${result.resultsUrl}`,
          }
        ],
      };
    } catch (e: any) {
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
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Frontend Performance MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
