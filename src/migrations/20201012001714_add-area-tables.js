
exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE l4_areas (
        h3 text,
        year smallint,  
        month smallint,  
        area NUMERIC,
        PRIMARY KEY (h3, year, month),
        CONSTRAINT l4_areas_l4 FOREIGN KEY (h3) REFERENCES l4 (h3)
      )
 `)
  return knex.raw(`
    CREATE TABLE l5_areas (
        h3 text,
        year smallint,  
        month smallint,  
        area NUMERIC,
        PRIMARY KEY (h3, year, month),
        CONSTRAINT l5_areas_l5 FOREIGN KEY (h3) REFERENCES l5 (h3)
      )
 `)
}

exports.down = async (knex) => {
  await knex.raw('DROP TABLE l4_areas')
  return knex.raw('DROP TABLE l5_areas')
}
