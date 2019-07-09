module.exports = { 
    intToBoolean,
    convertBoolean,
};

function intToBoolean(int) {
    return int === 1 ? true : false;
};

function convertBoolean(jokes) {
    const result = {
        ...jokes,
        public: intToBoolean(jokes.public),
    };
    return result
};