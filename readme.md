I'm using MongoDB to fulfill the mockDB suggestion.  Drawbacks to using MongoDB can definitely be discussed, here we're using it as our initial data storage to start.  For this project, I simlpy signed up for a free plan from Mongo company's Mongo Atlas hosting itself, please feel free to sign one up yourself, or email me for the password to my free cluster :), or install mongo locally.

https://www.mongodb.com/cloud/atlas/register


## How to run

```
npm install
MONGO_PASSWD=<mongodb password here> npm start
```

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