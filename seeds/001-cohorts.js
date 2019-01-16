
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'fsw15'},
        {name: 'fsw14'},
        {name: 'ios15'}
      ]);
    });
};
