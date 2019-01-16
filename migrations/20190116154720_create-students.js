
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(tbl) {
            tbl.increments();
            tbl.string('name', 128);
            tbl.integer('cohort_id')
            tbl.timestamps(true, true);
            tbl.unique('name', 'uq_students_name');
        });
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTableIfExists('students');
  };
