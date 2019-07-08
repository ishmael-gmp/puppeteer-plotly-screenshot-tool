import screenshot from './screen-shot'
import { getBrowser, getPage } from '../libs/browser'

import fs from 'fs'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'
import { describe, Try } from 'riteway'
import path from 'path'

let trace1 = { x: [1, 2, 3, 4], y: [10, 15, 13, 17], type: 'scatter', };
let trace2 = { x: [1, 2, 3, 4], y: [16, 5, 11, 9], type: 'scatter', };
let layout = { title: 'Line and Scatter Plot', };
const sl = encodeURI(JSON.stringify(layout))
const plots = encodeURI(JSON.stringify([trace1, trace2,]))

const browser = getBrowser();
const location = `file://${path.join(__dirname, '/resources/assets/index.html')}?plots=${plots}&layout=${sl}`


screenshot(browser, location, '#chart', 0, `${path.join(__dirname, 'test.png')}`).then(() => {
    return describe('_screenShot()', async assert => {
        let refImage = await fs.readFileSync(`${path.join(__dirname, 'spec/reference.png')}`);
        let testImage = await fs.readFileSync(`${path.join(__dirname, 'test.png')}`);

        refImage = new PNG.sync.read(refImage);
        testImage = new PNG.sync.read(testImage);

        const { width, height } = refImage;
        const diff = new PNG({ width, height });
        const numDiffPixels = pixelmatch(
            refImage.data, testImage.data, diff.data, refImage.width, refImage.height,
            { threshold: 0.1 });
        const given = 'A screen shot'

        assert({
            given,
            should: 'have the same height as the reference shot',
            expected: true,
            actual: refImage.height === testImage.height,
        })

        assert({
            given,
            should: 'have the same width as the reference shot',
            expected: true,
            actual: refImage.width === testImage.width,
        })

        assert({
            given,
            should: 'have the same number of pixels',
            expected: 0,
            actual: numDiffPixels,
        })
    })
}).catch(error => console.error(error))


