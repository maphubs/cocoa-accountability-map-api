// @flow
import express from 'express'
import cors from 'cors'
import shrinkRay from 'shrink-ray-current'
import config from './config'
import coops from './routes/coops'
import vectortiles from './routes/vectortiles'

const app = express()
app.enable('trust proxy')
app.disable('x-powered-by')
app.use('*', cors({ origin: '*' }))
app.use(shrinkRay())

coops(app)
vectortiles(app)

// eslint-disable-next-line no-console
app.listen(config.internal_port, () => console.log(`Server running on port ${config.internal_port}`))
