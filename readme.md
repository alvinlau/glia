I'm using MongoDB to fulfill the mockDB suggestion.  Drawbacks to using MongoDB can definitely be discussed, here we're using it as our initial data storage to start.  For this project, I simlpy signed up for a free plan from Mongo company's Mongo Atlas hosting itself, please feel free to sign one up yourself, or email me for the password to my free cluster :), or install mongo locally.

https://www.mongodb.com/cloud/atlas/register


## Requirements
Mongodb is set up with database `bored` and user `glia`


## How to run

```
npm install
MONGO_PASSWD=<password> MONGO_HOST=<host> npm start
```
When `MONGO_PASSWD` is the mongodb password and `MONGO_HOST` is the hostname, e.g. `cluster0.rzwjswe.mongodb.net`

Then you can hit the endpoints in localhost via:

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

So far I'm able to do implemenation without needing any extra npm packages, aside from the mongodb npm package to access mongodb.
While I'm not limiting myself from using useful libraries, the code right now happens to be a good demonstration of how it could be written without many dependencies.