const { installMouseHelper } = require('./mouse-helper')

// TODO enable and fix
/* eslint-disable class-methods-use-this */

class PupFunctions extends Helper {
  async drawSausage() {
    const { page } = this.helpers.Puppeteer
    await installMouseHelper(page)
    page.setViewport({ width: 1920, height: 1080 })
    await page.mouse.move(400, 200)
    await page.mouse.down()
    await page.waitFor(2000)
    await page.mouse.move(600, 200)
    await page.mouse.up()
  }

  async showCursor() {
    const { page } = this.helpers.Puppeteer
    await installMouseHelper(page)
  }
}
module.exports = PupFunctions
