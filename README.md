# Pterodactyl User Table
 Shows all pterodactyl users, their username, email and amount of servers.

## Setup:
- Clone the repo.
- configure the application (`config.json`)
- Install Node Packages. (`npm i`)
- run the app! `node index.js`

## Config:

### HOST_URL: 
<br>

The panel's URL that the API will connect to.

### API_KEY: 
<br>

You administrator API key can be created created at `https://HOST_URL/admin/api`

### interval: 
<br>

Interval between each API check.<br>
To avoid getting [Rate-Limitted](https://en.wikipedia.org/wiki/Rate_limiting) the app will check the panel's API every X amount of seconds, 60 (1 minute) should work just fine. 


### SORT_BY: 
<br>

Chose what to sort the table by.

- Servers : will sort the table using the amount of servers each user has.
- ID : Will sort the table using the user IDS