import puppeteer from 'puppeteer'

const _getPage = async () => {
    try {
        const browser = await puppeteer.launch();
        return await browser.newPage();
    } catch (e) {
        console.error(e)
    }
}
const _getBrowser = async () => {
    try {
        return await puppeteer.launch({
            defaultViewport: {
                width:800,
                height:600
            },
        });
    } catch (e) {
        console.error(e)
    }
}
export { _getBrowser as getBrowser }
export { _getPage as getPage }