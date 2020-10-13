const l4 = require('./l4grid.json')
const l5 = require('./l5grid.json')
const db = require('../src/connection')
const knexPostgis = require('knex-postgis')
const st = knexPostgis(db);

(async () => {
  const l4Rows = l4.features.map(l4Feature => {
    return {
      h3: l4Feature.properties.h3,
      geom: st.geomFromGeoJSON(l4Feature.geometry),
      data: {}
    }
  })

  const l5Rows = l5.features.map(l5Feature => {
    return {
      h3: l5Feature.properties.h3,
      geom: st.geomFromGeoJSON(l5Feature.geometry),
      data: {}
    }
  })

  await db.batchInsert('l4', l4Rows, 1000)
  console.log(`finished inserting ${l4Rows.length} L4 features`)
  await db.batchInsert('l5', l5Rows, 1000)
  console.log(`finished inserting ${l5Rows.length} L5 features`)

  console.log('Complete!')
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(0)
})()
