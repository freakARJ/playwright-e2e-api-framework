import { test, expect } from '@playwright/test';

test.describe('Portfolio HTTP & Asset API Checks', () => {
  test('all core pages return HTTP 200 with HTML content-type within SLA', async ({ request }) => {
    const routes = ['/', '/projects.html', '/journey.html', '/ideas.html', '/tools.html', '/playground.html', '/testdata.html', '/contact.html'];

    for (const route of routes) {
      const start = Date.now();
      const response = await request.get(route);
      const durationMs = Date.now() - start;

      expect(response.status(), `Expected 200 for ${route}`).toBe(200);
      expect(response.headers()['content-type']).toContain('text/html');
      expect(durationMs, `Response time for ${route} exceeded 3000ms`).toBeLessThan(3000);
    }
  });

  test('robots.txt is accessible and allows crawling', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('User-agent: *');
  });

  test('security-awareness PDF asset is served with valid PDF headers', async ({ request }) => {
    const response = await request.get('/assets/do-not-click.pdf');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/pdf');
    const buffer = await response.body();
    expect(buffer.byteLength).toBeGreaterThan(1000);
  });

  test('non-existent route returns HTTP 404', async ({ request }) => {
    const response = await request.get('/this-route-does-not-exist-404');
    expect(response.status()).toBe(404);
  });
});