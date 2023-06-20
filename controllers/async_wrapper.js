//! next already also async
//? check out async wrappers
//$ https://stackoverflow.com/questions/43500182/restify-controllers-with-node-7-async-await
//$ https://beyondthecloud.dev/blog/then-vs-async-await-in-lwc

const asyncwrapper = function(fn) {
    return (req, res, next) => {
        return fn(req, res, next)
    };
};

export default asyncwrapper;