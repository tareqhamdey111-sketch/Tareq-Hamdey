import { chromium } from 'playwright-core';
import { spawnSync } from 'node:child_process';
import { mkdirSync, rmSync } from 'node:fs';
import ffmpeg from 'ffmpeg-static';

// usage: node render.mjs [page.html] [seconds] [out.mp4]
const [page_ = 'index.html', dur = '30', out = 'impacto.mp4'] = process.argv.slice(2);
const FPS = 30, DUR = Number(dur);
rmSync('frames', { recursive: true, force: true });
mkdirSync('frames');
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
await page.goto('file://' + process.cwd() + '/' + page_);
await page.evaluate(() => document.fonts.ready);
for (let i = 0; i < FPS * DUR; i++) {
  await page.evaluate(t => window.render(t), i / FPS);
  await page.screenshot({ path: `frames/f${String(i).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 92 });
}
await browser.close();
const r = spawnSync(ffmpeg, ['-y', '-framerate', String(FPS), '-i', 'frames/f%04d.jpg', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', out], { stdio: 'inherit' });
process.exit(r.status);
