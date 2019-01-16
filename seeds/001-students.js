
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Red', cohort_id: 1},
        {name: 'Grant', cohort_id: 2},
        {name: 'Sybil', cohort_id: 2},
      ]);
    });
};
