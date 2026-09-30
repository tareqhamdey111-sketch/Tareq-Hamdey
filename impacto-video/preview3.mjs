import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await p.goto('file://' + process.cwd() + '/ad2.html');
await p.evaluate(() => document.fonts.ready);
const ts = [1.5, 6.8, 9.5, 13, 18.4, 21.5];
for (let i = 0; i < ts.length; i++) {
  await p.evaluate(x => window.render(x), ts[i]);
  await p.screenshot({ path: `ref/b${i}.jpg`, type: 'jpeg', quality: 80 });
}
await b.close();
