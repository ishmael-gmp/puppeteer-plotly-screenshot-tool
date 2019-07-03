import path from 'path';

/**
 * @param {Object} browser is a promise of puppeteer browser instance
 * @param {String} uri uri of end point to take screenshot of
 * @param {String} selector dom selector of what to focus the screen shot on
 * @param {Number} padding of the space around the selector
 * @param {String} imgpath set if you want to save image to disk e.g. `test.png`,
 * @returns <Promise<string|Buffer>> Promise which resolves to buffer or a base64 string
 */
async function _screenShot(browser, uri = path.join(__dirname, '/resources/assets/index.html'), selector = '#chart', padding = 0, imgpath = '') {
    const clipXModifier = parseInt(process.env.clipXModifier, 10) || 0;
    const imageWidthModifier = parseInt(process.env.imageWidthModifier, 10) || 0;
    const params = await new URL(uri).searchParams;
    const template = `file://${path.join(__dirname, '/resources/assets/index.html')}`;
    const url = `${template}?${params}`
    const seed = await browser;

    try {
        const page = await seed.newPage();
        console.log('trying..... to get a page')
        await page.goto(`${url}`, { waitUntil: 'networkidle2' });
        console.log('trying..... to go to a url')
        const rect = await page.evaluate((selector) => {
            const element = document.querySelector(selector);
            const {
                x, y, width, height,
            } = element.getBoundingClientRect();
            return {
                left: x, top: y, width, height, id: element.id,
            };
        }, selector);
        const clip = {
            x: rect.left + clipXModifier,
            y: rect.top - padding,
            width: rect.width - imageWidthModifier,
            height: rect.height + padding * 2,
        }
        return await page.screenshot({
            encoding: 'binary',
            path:imgpath,
            clip
        });
    } catch (error) {
        console.log('we have an error', error)
        return error;
    } finally {
        if (seed !== null) {
            await seed.close();
        }
    }
};

export { _screenShot as default }