const AsciiTable = require('ascii-table');
const { Application, Application: { fetchUsers } } = require('nodeactyl.js');
const fs = require('fs');
const moment = require('moment');
const { API_KEY, HOST_URL, INTERVAL, SORT_BY } = require('./config.json');

Application.login(HOST_URL, API_KEY);

console.log(moment().format('D-MM-YY h:mm A') + '>  Requesting data...');
createTable().then(table => {
    fs.writeFileSync('./Logs/' + moment().format('D-MM-YY h-mm-A') + '.txt', table.toString());
    console.log(moment().format('D-MM-YY h:mm A') + '>  Done!');
})

setInterval(() => {
    console.log(moment().format('D-MM-YY h:mm A') + '>  Requesting data...');
    createTable().then(table => {
        fs.writeFileSync('./Logs/' + moment().format('D-MM-YY h-mm-A') + '.txt', table.toString());
        console.log(moment().format('D-MM-YY h:mm A') + '>  Done!');
    })
}, (INTERVAL * 1000));

function createTable() {
    return new Promise((resolve, reject) => {
        try {
            let table = new AsciiTable("Pterodactyl User Table").setHeading('ID', 'Username', 'Email', '#Servers');
            fetchUsers({ include: { servers: true } }).then(users => {

                if (users.success == false) {
                    console.log(users);
                    return reject(users);
                }
                users = users.data.map(user => ({ id: user.id, email: user.email, username: user.username, servers: user.extras.servers.length }));

                if (SORT_BY.toLowerCase() == 'servers') {
                    users.sort((a, b) => b.servers - a.servers);
                } else if (SORT_BY.toLowerCase() == 'id') {
                    users.sort((a, b) => a.id - b.id);
                } else {
                    return console.log("You can only sort by ID or Servers.")
                }
                
                for (let i of users) {
                    table.addRow(i.id, i.username, i.email, i.servers)
                }
                resolve(table);
            });
        } catch (error) {
            reject(error);
        }
    });
};
