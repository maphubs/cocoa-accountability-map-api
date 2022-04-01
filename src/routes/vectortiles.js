// @flow
const knex = require('../connection')
const log = require('@bit/kriscarle.maphubs-utils.maphubs-utils.log')
const etag = require('etag')
const config = require('../config')

module.exports = function (app: any) {
  app.get(
    '/api/mvt/L4/:version/:z(\\d+)/:x(\\d+)/:y(\\d+).pbf',
    async (req, res) => {
      const z = Number.parseInt(req.params.z)
      const x = Number.parseInt(req.params.x)
      const y = Number.parseInt(req.params.y)
      // the version is not used, just for breaking the cache when there is a monthly update

      try {
        const params = { z, x, y }
        const query = knex.raw(
          `      
          WITH mvtgeom AS
          (   
            SELECT 
            ST_AsMVTGeom(ST_Transform(geom, 3857), ST_TileEnvelope(:z,:x,:y)) AS geom,
            jsonb_object_agg('20' || COALESCE(l4_areas.year::TEXT, 'NA') || '-' || COALESCE(l4_areas.month::TEXT, 'NA'), l4_areas.area) as "data"
            FROM l4
            LEFT JOIN l4_areas on l4.h3 = l4_areas.h3        
            WHERE
            ST_Intersects(ST_Transform(geom, 3857), ST_TileEnvelope(:z,:x,:y))
            GROUP BY l4.h3
          )
          SELECT ST_AsMVT(mvtgeom.*,'data', 4096, 'geom')
          FROM mvtgeom
        `,
          params
        )

        const results = await query
        // set the response header content type
        res.setHeader('Content-Type', 'application/x-protobuf')

        if (results && results.rows.length >= 0) {
          const tile = results.rows[0]
          // if the vector tile has no data, (return a 204)
          if (tile.st_asmvt.length === 0) {
            res.status(204)
          }
          res.setHeader(
            'ETag',
            etag(`l4-2022-${config.LATEST_MONTH}-${z}-${x}-${y}`)
          )
          res.setHeader('Cache-Control', 'max-age=864000')
          // send the tile!
          res.send(tile.st_asmvt)
        } else {
          res.status(404).send()
        }
      } catch (error) {
        res.status(404)
        res.send(error.message)
        log.error(error)
      }
    }
  )

  app.get(
    '/api/mvt/L5/:version/:z(\\d+)/:x(\\d+)/:y(\\d+).pbf',
    async (req, res) => {
      const z = Number.parseInt(req.params.z)
      const x = Number.parseInt(req.params.x)
      const y = Number.parseInt(req.params.y)

      try {
        const params = { z, x, y }
        const query = knex.raw(
          `      
          WITH mvtgeom AS
          (   
            SELECT 
            ST_AsMVTGeom(ST_Transform(geom, 3857), ST_TileEnvelope(:z,:x,:y)) AS geom,
            jsonb_object_agg('20' || COALESCE(l5_areas.year::TEXT, 'NA') || '-' || COALESCE(l5_areas.month::TEXT, 'NA'), l5_areas.area) as "data"
            FROM l5
            LEFT JOIN l5_areas on l5.h3 = l5_areas.h3       
            WHERE
            ST_Intersects(ST_Transform(geom, 3857), ST_TileEnvelope(:z,:x,:y))
            GROUP BY l5.h3
          )
          SELECT ST_AsMVT(mvtgeom.*,'data', 4096, 'geom')
          FROM mvtgeom
        `,
          params
        )

        const results = await query
        // set the response header content type
        res.setHeader('Content-Type', 'application/x-protobuf')

        if (results && results.rows.length >= 0) {
          const tile = results.rows[0]
          // if the vector tile has no data, (return a 204)
          if (tile.st_asmvt.length === 0) {
            res.status(204)
          }
          res.setHeader(
            'ETag',
            etag(`l5-2022-${config.LATEST_MONTH}-${z}-${x}-${y}`)
          )
          res.setHeader('Cache-Control', 'max-age=864000')
          // send the tile!
          res.send(tile.st_asmvt)
        } else {
          res.status(404).send()
        }
      } catch (error) {
        res.status(404)
        res.send(error.message)
        log.error(error)
      }
    }
  )

  app.get(
    '/api/mvt/ews/:year/:month/:z(\\d+)/:x(\\d+)/:y(\\d+).pbf',
    async (req, res) => {
      const z = Number.parseInt(req.params.z)
      const x = Number.parseInt(req.params.x)
      const y = Number.parseInt(req.params.y)
      const year = Number.parseInt(req.params.year)
      const month = Number.parseInt(req.params.month)

      try {
        const params = { z, x, y, year, month }
        const query = knex.raw(
          `      
          WITH mvtgeom AS
          (   
            SELECT 
            ST_AsMVTGeom(ST_Transform(st_makevalid(geom), 3857), ST_TileEnvelope(:z,:x,:y)) AS geom
            FROM ews
            WHERE
            year = :year AND month = :month AND
            ST_Intersects(ST_Transform(geom, 3857), ST_TileEnvelope(:z,:x,:y))
          )
          SELECT ST_AsMVT(mvtgeom.*,'data', 4096, 'geom')
          FROM mvtgeom
        `,
          params
        )

        const results = await query
        // set the response header content type
        res.setHeader('Content-Type', 'application/x-protobuf')

        if (results && results.rows.length >= 0) {
          const tile = results.rows[0]
          // if the vector tile has no data, (return a 204)
          if (tile.st_asmvt.length === 0) {
            res.status(204)
          }
          res.setHeader('ETag', etag(`ews-${year}-${month}-${z}-${x}-${y}`))
          res.setHeader('Cache-Control', 'max-age=864000')
          // send the tile!
          res.send(tile.st_asmvt)
        } else {
          res.status(404).send()
        }
      } catch (error) {
        res.status(404)
        res.send(error.message)
        log.error(error)
      }
    }
  )
}
