const retrieve = require('./api/managed-records.js');

retrieve({page:5,colors:[]}).then(r => {
    console.log(r);
});
retrieve({page:1,colors:['brown','green']}).then(r => {
    console.log(r);
});

retrieve({page:10,colors:['brown','green','blue']}).then(r => {
    console.log(r);
});

retrieve({page: 1, colors: ['red', 'blue']}).then(r => {
    console.log(r);
});

retrieve({colors: ['brown']}).then(r => {
    console.log(r);
});

retrieve({colors: ['hotpink']}).then(r => {
    console.log(r);
});


retrieve({page:1}).then(r => {
    console.log(r);
});

retrieve({page:34}).then(r => {
    console.log(r);
});

retrieve({page: 15, colors: ["red", "blue", "brown"]}).then(r => {
    console.log(r);
});
retrieve({page:50}).then(r => {
    console.log(r);
});

//module.exports = {retrieve}
