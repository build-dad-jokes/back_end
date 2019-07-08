
exports.seed = function(knex) {
  return knex('jokes').insert([
    { joke: 'What do you call a fake noodle?', answer: 'An Impasta.' },
    { joke: 'How many apples grow on a tree?', answer: 'All of them.' },
    { joke: 'Did you hear about the kidnapping at school?', answer: 'Its fine, he woke up.' },
    { joke: 'Whats brown and sticky?', answer: 'A stick.' },
    { joke: 'What do you call a man with a rubber toe?', answer: 'Roberto' },
  ]);
};
