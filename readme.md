I'm using MongoDB to fulfill the mockDB suggestion.  Drawbacks to using MongoDB can definitely be discussed, here we're using it as our initial data storage to start.  For this project, I simlpy signed up for a free plan from Mongo company's Mongo Atlas hosting itself, please feel free to sign one up yourself, or ask me for the password to my free cluster, or instannce mongo locally.

https://www.mongodb.com/cloud/atlas/register


## how to run

```
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