import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await p.goto('file://' + process.cwd() + '/ad3.html');
await p.evaluate(() => document.fonts.ready);
const ts = [1.6, 6.5, 10.2, 14.2, 17.2, 20.8];
for (let i = 0; i < ts.length; i++) {
  await p.evaluate(x => window.render(x), ts[i]);
  await p.screenshot({ path: `ref/c${i}.jpg`, type: 'jpeg', quality: 80 });
}
await b.close();
