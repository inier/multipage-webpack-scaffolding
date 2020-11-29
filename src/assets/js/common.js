const { data } = require('@/store/data.js');

console.log(data);
const inc = function (name, sendData) {
    return require('@/components/' + name + '.ejs')(sendData ? { data: data } : {});
};

module.exports = inc;
