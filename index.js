const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const hostname = 'localhost'
const port = 4000

async function startHentity(nestApp) {
  console.log(await nestApp?.getUrl())
  const app = next({ hostname, port, dir: __dirname })
  const handle = app.getRequestHandler()
  app.prepare().then(() => {
    createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true)
        await handle(req, res, parsedUrl)
      } catch (err) {
        console.error('Error occurred handling', req.url, err)
        res.statusCode = 500
        res.end('Internal server error')
      }
    })
      .once('error', (err) => {
        console.error(err)
        process.exit(1)
      })
      .listen(port, () => {
        console.log(`Nestjs Hentity running on: http://${hostname}:${port}`)
      })
  })
}

module.exports = {
  startHentity,
}
