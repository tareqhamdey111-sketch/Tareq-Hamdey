import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await p.goto('file://' + process.cwd() + '/index.html');
await p.evaluate(() => document.fonts.ready);
for (const t of [3.5, 7.5, 11.8, 15.5, 21, 25.5, 29]) {
  await p.evaluate(x => window.render(x), t);
  await p.screenshot({ path: `ref/p_${t}.jpg`, type: 'jpeg', quality: 80 });
}
await b.close();
