import { screenshot } from '../screen-shot'
import {getBrowser, getPage} from '../browser'
import path from 'path'

let trace1 = { x: [1, 2, 3, 4], y: [10, 15, 13, 17], type: 'scatter', };
let trace2 = { x: [1, 2, 3, 4], y: [16, 5, 11, 9], type: 'scatter', };
let layout = { title: 'Line and Scatter Plot', };
const sl = encodeURI(JSON.stringify(layout))
const plots = encodeURI(JSON.stringify([trace1, trace2,]))

const browser = getBrowser();
const location = `file://${path.join(__dirname, '/resources/assets/index.html')}?p=${plots}&l=${sl}`

screenshot(browser, location, '#chart', 0, 'test.png')