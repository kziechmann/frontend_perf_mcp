// Lighthouse Adapter
// This module provides a tool to run Lighthouse audits on a given URL and returns the results.
import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';
import { z } from 'zod';

export const runLighthouseAudit = async (url: string) => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = { port: chrome.port };
  const result = await lighthouse(url, options);
  await chrome.kill();
  return result?.lhr;
};

export const LighthouseAuditInput = z.object({
  url: z.string().url(),
});

export const LighthouseAuditOutput = z.object({
  performance: z.number(),
  accessibility: z.number(),
  bestPractices: z.number(),
  seo: z.number(),
  pwa: z.number(),
  report: z.string(),
});

export async function lighthouseTool({ url }: { url: string }) {
  const lhr = await runLighthouseAudit(url);
  return {
    performance: lhr?.categories?.performance?.score != null ? lhr.categories.performance.score * 100 : 0,
    accessibility: lhr?.categories?.accessibility?.score != null ? lhr.categories.accessibility.score * 100 : 0,
    bestPractices: lhr?.categories?.['best-practices']?.score != null ? lhr.categories['best-practices'].score * 100 : 0,
    seo: lhr?.categories?.seo?.score != null ? lhr.categories.seo.score * 100 : 0,
    pwa: lhr?.categories?.pwa?.score != null ? lhr.categories.pwa.score * 100 : 0,
    report: lhr?.finalUrl ?? '',
  };
}
