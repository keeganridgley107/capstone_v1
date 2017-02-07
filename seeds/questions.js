"use strict";
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('questions').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('questions').insert(
          {
            id: 1,
            title: 'The First Step',
            text: 'this is a puzzle that leads to a secret page only accessable to the gifted',
            image: 'http://www.maydaymystery.org/mayday/offsite/83-nov1.jpg',
            answer1: 'galvanize',
            answer2: '255',
            answer3: 'boulder'
          }
        ),
        knex('questions').insert(
          {
            id: 2,
            title: 'second question',
            text: 'this is a riddle using math and CSF concepts to challenge students in gschool',
            image: 'http://www.maydaymystery.org/mayday/offsite/90-may1.gif',
            answer1: 'java',
            answer2: 'compile',
            answer3: '3.14'
          }
        ),
        knex('questions').insert(
          {
            id: 3,
            title: 'Third time is the charm',
            text: 'this is a where we seperate the wheat from the chaff',
            image: 'http://www.maydaymystery.org/mayday/offsite/06-May1.jpg',
            answer1: '8228',
            answer2: 'NaN',
            answer3: 'undefined'
          }
        )
      ]);
    });
};
