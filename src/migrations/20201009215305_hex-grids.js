
exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE l4 (
        h3 text,  
        geom geometry(POLYGON,4326),
        data jsonb,
        PRIMARY KEY (h3)
      )
 `)
  return knex.raw(`
    CREATE TABLE l5 (
        h3 text,  
        geom geometry(POLYGON,4326),
        data jsonb,
        PRIMARY KEY (h3)
      )
 `)
}

exports.down = async (knex) => {
  await knex.raw('DROP TABLE l4')
  return knex.raw('DROP TABLE l5')
}
