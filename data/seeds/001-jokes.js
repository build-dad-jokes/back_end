exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("jokes")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("jokes").insert([
        {
          id: 1,
          question:
            "What do you call a mac ‘n’ cheese that gets all up in your face?",
          answer: "Too close for comfort food!",
          public: true,
          user_id: 1
        },
        {
          id: 2,
          question: "What concert costs just 45 cents?",
          answer: "50 Cent featuring Nickelback!",
          public: true,
          user_id: 1
        },
        {
          id: 3,
          question: "Why did the scarecrow win an award?",
          answer: "Because he was outstanding in his field!",
          public: true,
          user_id: 2
        },
        {
          id: 4,
          question: "What do sprinters eat before a race?",
          answer: "Nothing, they fast!",
          public: false,
          user_id: 1
        },
        {
          id: 5,
          question: "Why couldn’t the bicycle stand up by itself?",
          answer: "It was two tired!",
          public: false,
          user_id: 2
        },
        {
          id: 6,
          question: "Did you hear about the restaurant on the moon?",
          answer: "Great food, no atmosphere!",
          public: false,
          user_id: 3
        },
        {
          id: 7,
          question: "What do you call a fish with two knees?",
          answer: "A two-knee fish!",
          public: false,
          user_id: 3
        }
      ]);
    });
};
