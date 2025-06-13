# Frontend Performance MCP Server

This project is an MCP (Model Context Protocol) server written in TypeScript. It is designed to measure and report website performance, accessibility, and optimization suggestions by integrating with tools like Lighthouse, WebPageTest, and JavaScript bundle analyzers.

## Features
- **Lighthouse Integration:** Run audits for performance, accessibility, SEO, and best practices.
- **WebPageTest Integration:** Fetch in-depth web performance metrics using the WebPageTest API.
- **Bundle Analyzer Integration:** Analyze JavaScript bundle sizes and suggest optimizations.
- **MCP Protocol:** Exposes all metrics and actions as MCP resources and tools for use in LLM-powered tools and IDEs.
- **Real-Time Feedback:** Trigger tests and receive results in real time.
- **Optimization Suggestions:** Actionable recommendations based on test results.

## Project Structure
- `src/` — Source code for the MCP server and adapters.
- `.github/` — Copilot and project instructions.
- `.vscode/` — VS Code configuration files.

## Getting Started
1. Install dependencies:
   ```sh
   npm install
   ```
2. Build the project:
   ```sh
   npx tsc
   ```
3. Run the server:
   ```sh
   node build/index.js
   ```

## MCP Integration
This server implements the Model Context Protocol. For more information, see the [MCP documentation](https://modelcontextprotocol.io/introduction).

## Extending
- Add new tools or resources by following the MCP SDK documentation.
- Integrate additional performance tools as needed.

## References
- [MCP Introduction](https://modelcontextprotocol.io/introduction)
- [Lighthouse](https://github.com/GoogleChrome/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

---

*This project is in early development. Contributions and suggestions are welcome!*
