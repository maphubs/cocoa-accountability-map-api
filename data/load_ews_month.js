
const db = require('../src/connection')
const knexPostgis = require('knex-postgis')
const rewind = require('@turf/rewind')
const st = knexPostgis(db)
const Promise = require('bluebird')
const fs = require('fs')

const YEAR = 20
const MONTHS = [1, 2, 3, 4, 5, 6, 7];

(async () => {
  await Promise.mapSeries(MONTHS, async (month) => {
    const rawdata = fs.readFileSync(`./data/20${YEAR}-${month < 10 ? '0' : ''}${month}.geojson`)
    const data = JSON.parse(rawdata)
    const rows = data.features.map(feature => {
      const fixedGeom = rewind(feature.geometry)
      return {
        year: YEAR,
        month,
        geom: st.geomFromGeoJSON(fixedGeom)
      }
    })

    await db.batchInsert('ews', rows, 1000)
    console.log(`finished inserting ${rows.length} alert features for month ${month}`)
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
