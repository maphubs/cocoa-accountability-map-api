
const db = require('../src/connection')
const knexPostgis = require('knex-postgis')
const rewind = require('@turf/rewind')
const st = knexPostgis(db)
const Promise = require('bluebird')
const fs = require('fs')

const YEAR = 20
const DELETE_MONTHS = [9] // we will replace these
const MONTHS = [9, 10, 11, 12];

(async () => {
  if (DELETE_MONTHS && DELETE_MONTHS.length > 0) {
    await Promise.mapSeries(DELETE_MONTHS, async (month) => {
      await db.raw(`DELETE FROM l4_areas where month = ${month};`)
      await db.raw(`DELETE FROM l5_areas where month = ${month};`)
      return db.raw(`DELETE FROM ews where month = ${month};`)
    })
    console.log(`Deleted months: ${DELETE_MONTHS.toString()}`)
  }
  await Promise.mapSeries(MONTHS, async (month) => {
    const filePath = `./data/20${YEAR}-${month < 10 ? '0' : ''}${month}.geojson`
    const rawdata = fs.readFileSync(filePath)
    const data = JSON.parse(rawdata)
    console.log(`opened ${filePath} with ${data.features.length} features`)
    const rows = data.features.map(feature => {
      const fixedGeom = rewind(feature.geometry)
      try {
        return {
          year: YEAR,
          month,
          geom: st.geomFromGeoJSON(fixedGeom)
        }
      } catch (error) {
        console.log(error.errors)
        // console.log(fixedGeom)
        // console.log(fixedGeom.coordinates[0])
        // console.log(fixedGeom.coordinates[1])
        // throw new Error('load failed due to bad GeoJSON')
      }
    })

    await db.batchInsert('ews', rows, 1000)
    console.log(`finished inserting ${rows.length} alert features for month ${month}`)
    await db.raw(`
      UPDATE ews SET geom=ST_MakeValid(geom) where NOT ST_IsValid(geom);
    `)
    await db.raw(`
    insert into l4_areas
select 
h3,
ews.year,
ews.month,
sum(st_area(ST_Intersection(l4.geom, st_makevalid(ews.geom))::geography))/10000 as area
from l4
inner join ews on ST_Intersects(l4.geom, ews.geom)
WHERE month = ${month}
GROUP BY h3, ews.year, ews.month
ORDER BY h3, ews.year, ews.month
;
`)
    console.log(`inserted l4 areas for month ${month}`)
    await db.raw(`
insert into l5_areas
select 
h3,
ews.year,
ews.month,
sum(st_area(ST_Intersection(l5.geom, st_makevalid(ews.geom))::geography))/10000 as area
from l5
inner join ews on ST_Intersects(l5.geom, ews.geom)
WHERE month = ${month}
GROUP BY h3, ews.year, ews.month
ORDER BY h3, ews.year, ews.month
;
`)
    console.log(`inserted l5 areas for month ${month}`)
  })
  console.log('Complete!')
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(0)
})()
