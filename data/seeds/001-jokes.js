exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("jokes")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("jokes").insert([
        {
          id: 1,
          joke:
            "What do you call a mac 'n' cheese that gets all up in your face?",
          punchline: "Too close for comfort food!",
          public: true,
          user_id: 1
        },
        {
          id: 2,
          joke: "What concert costs just 45 cents?",
          punchline: "50 Cent featuring Nickelback!",
          public: true,
          user_id: 1
        },
        {
          id: 3,
          joke: "Why did the scarecrow win an award?",
          punchline: "Because he was outstanding in his field!",
          public: true,
          user_id: 2
        },
        {
          id: 4,
          joke: "What do sprinters eat before a race?",
          punchline: "Nothing, they fast!",
          public: false,
          user_id: 1
        },
        {
          id: 5,
          joke: "Why couldn't the bicycle stand up by itself?",
          punchline: "It was two tired!",
          public: false,
          user_id: 2
        },
        {
          id: 6,
          joke: "Did you hear about the restaurant on the moon?",
          punchline: "Great food, no atmosphere!",
          public: false,
          user_id: 3
        },
        {
          id: 7,
          joke: "What do you call a fish with two knees?",
          punchline: "A two-knee fish!",
          public: false,
          user_id: 3
        }
      ]);
    });
};
