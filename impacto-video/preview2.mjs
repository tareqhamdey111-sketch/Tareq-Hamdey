import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await p.goto('file://' + process.cwd() + '/ad.html');
await p.evaluate(() => document.fonts.ready);
const ts = [2.5, 6.4, 7.8, 11.5, 15.5, 19];
for (let i = 0; i < ts.length; i++) {
  await p.evaluate(x => window.render(x), ts[i]);
  await p.screenshot({ path: `ref/a${i}.jpg`, type: 'jpeg', quality: 80 });
}
await b.close();
