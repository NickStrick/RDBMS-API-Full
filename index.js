const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const server = express();

server.use(express.json());

// connect to the database
const db = knex(knexConfig.development);

server.get('/', (req, res) => {
  res.send('api working');
});

server.get('/api/cohorts', (req, res) => {
  db('cohorts')
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => res.status(500).json(err));
});

server.get('/api/cohorts/:id', (req, res) => {
  db('cohorts')
    .where({ id: req.params.id })
    .then(cohort => {
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res.status(404).json({ message: 'cohort not found' });
      }
    });
});

server.get('/api/cohorts/:id/students', (req, res) => {
    let {id} = req.params;

    db('students')
      .where({ cohort_id: id })
      .then(student => {
        if (student) {
          res.status(200).json(student);
        } else {
          res.status(404).json({ message: 'students not found' });
        }
    });
});

server.post('/api/cohorts', (req, res) => {
  
  db('cohorts')
    .insert(req.body)
    .then(ids => {
      db('cohorts')
        .where({ id: ids[0] })
        .then(cohort => {
          res.status(201).json(cohort);
        });
    })
    .catch(err => res.status(500).json(err));
});

server.delete('/api/cohorts/:id', (req, res) => {
  db('cohorts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

server.put('/api/cohorts/:id', (req, res) => {
  const changes = req.body;

  db('cohorts')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: 'cohort not found' });
      }
    })
    .catch(err => res.status(500).json(err));
});


//students spi requests -----------------------
server.get('/api/students', (req, res) => {
    db('students')
      .then(students => {
        res.status(200).json(students);
      })
      .catch(err => res.status(500).json(err));
});

server.get('/api/students/:id', (req, res) => {
    db('students')
      .where({ id: req.params.id })
      .then(student => {
        if (student) {
            console.log(student[0])
            db('cohorts')
            .where({ id: student[0].cohort_id})
            .then(cohort => {
                console.log(cohort[0])
                res.status(200).json([{id:student[0].id, name:student[0].name, cohort:cohort[0].name}]);
                res.end();
            })
            // .catch(res.status(404).json({ message: 'cohort not found' }))
            ;
          
        } else {
          res.status(404).json({ message: 'student not found' });
        }
      });
});

server.post('/api/students', (req, res) => {

    db('students')
        .insert(req.body)
        .then(ids => {
        db('students')
            .where({ id: ids[0] })
            .then(student => {
            res.status(201).json(student);
            });
        })
        .catch(err => res.status(500).json(err));
});

server.delete('/api/students/:id', (req, res) => {
    db('students')
      .where({ id: req.params.id })
      .del()
      .then(count => {
        res.status(200).json(count);
      })
      .catch(err => res.status(500).json(err));
  });

server.put('/api/students/:id', (req, res) => {
    const changes = req.body;
  
    db('students')
      .where({ id: req.params.id })
      .update(changes)
      .then(count => {
        if (count) {
          res.status(200).json(count);
        } else {
          res.status(404).json({ message: 'student not found' });
        }
      })
      .catch(err => res.status(500).json(err));
});


server.listen(6000, () => console.log('server up on 6000'));