// WebPageTest Adapter
// This module provides a tool to run WebPageTest audits on a given URL and returns the results.
import fetch from 'node-fetch';
import { z } from 'zod';

const WEBPAGETEST_API_KEY = process.env.WEBPAGETEST_API_KEY || '';
const WEBPAGETEST_API_URL = 'https://www.webpagetest.org/runtest.php';

export const WebPageTestInput = z.object({
  url: z.string().url(),
  location: z.string().optional(),
  runs: z.number().min(1).max(10).optional(),
});

export const WebPageTestOutput = z.object({
  testId: z.string(),
  summary: z.string(),
  resultsUrl: z.string(),
});

export async function webPageTestTool({ url, location, runs }: { url: string; location?: string; runs?: number }) {
  const params = new URLSearchParams({
    url,
    f: 'json',
    k: WEBPAGETEST_API_KEY,
    ...(location ? { location } : {}),
    ...(runs ? { runs: runs.toString() } : {}),
  });
  const response = await fetch(`${WEBPAGETEST_API_URL}?${params.toString()}`);
  const data = await response.json();
  if (data.statusCode !== 200) {
    throw new Error(data.statusText || 'WebPageTest API error');
  }
  return {
    testId: data.data.testId,
    summary: data.data.summary,
    resultsUrl: data.data.userUrl,
  };
}
