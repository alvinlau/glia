## Requirements
Mongodb is set up with database `bored` and user `glia`

For this project, I simlpy signed up for a free plan from Mongodb company's Mongodb Atlas hosting itself, please feel free to sign one up yourself, or email me for the password to my free cluster :), or install mongo locally.

https://www.mongodb.com/cloud/atlas/register

The free instance is slow but it's one less thing to install in order to test this project.



## How to run

The server

```
npm install
MONGO_PASSWD=<password> MONGO_HOST=<host> npm start
```
Where `MONGO_PASSWD` is the mongodb password and `MONGO_HOST` is the hostname, e.g. `cluster0.xxxx.mongodb.net`


The client

```
cd /vue
npm install
npm run serve
```

Then simply navigate to `http://localhost:8080/` in the browser


You can also hit the endpoints in localhost via:

```
GET http://localhost:3000/activity


POST http://localhost:3000/user
```

per requirements, an example body for the POST /user endpoint

```
{
	"name": "John",
	"accessibility": "High",
	"price": "Free"
}
```


## Further discussion

I'm using MongoDB to fulfill the mockDB suggestion.  Drawbacks to using MongoDB can definitely be discussed, here we're using it as our initial data storage to start.

So far for dependencies I'm only using mongodb, cors (for express), cross-fetch (for node). While I'm not limiting myself from using useful libraries, the implementation right now happens to be a good demonstration of how it could be written without many dependencies.