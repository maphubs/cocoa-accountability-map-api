
exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE ews (
        year smallint,  
        month smallint,
        geom geometry(POLYGON,4326)
      )
 `)
  return knex.raw(`
   CREATE INDEX ews_year_month_idx ON ews (year, month)
 `)
}

exports.down = async (knex) => {
  return knex.raw('DROP TABLE ews')
}
