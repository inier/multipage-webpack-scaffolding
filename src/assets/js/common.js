import { data } from '@/data/data.js';
console.log(data);
const inc = function (name, sendData) {
    return require('@/components/' + name + '.ejs')(sendData ? { data: data } : null);
};

module.exports = inc;
