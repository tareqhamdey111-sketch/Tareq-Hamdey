import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await p.goto('file://' + process.cwd() + '/index.html');
await p.evaluate(() => document.fonts.ready);
for (const t of [2.6, 5.9, 8.2, 11.6, 14.5, 17.6, 21, 24.5, 27.1, 29.4]) {
  await p.evaluate(x => window.render(x), t);
  await p.screenshot({ path: `ref/p_${String(t).padStart(4,"0")}.jpg`, type: 'jpeg', quality: 80 });
}
await b.close();
