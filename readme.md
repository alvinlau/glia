## Overall Design
I'm leveraging cookies on the client to store the current logged in user as well as their preferences.  The cookies are `boredUser`, `boredUserAccessibility`, `boredUserPrice`.  Only the `boredUser` cookie value is sent to the `/activity` endpint as a header, where as `boredUserAccessibility` are `boredUserPrice` used for display in the client UI.  API response errors are handled gracefully on the client as well.

Since the `/activity` endpoint only returns an activity that fits the user's preferences, first it looks up in database for an activity that fits, and then if not, keeps calling Bored API until a qualifying activity is received and shown.

Consequently, all the activities received from Bored API are saved in database, whether they qualify the current request from the user or not.  This is to help future requests to avoid calling Bored API if we can find a matching activity in our database.

The `/activity` endpoint still work if there are no active logged in users, that fulfills the requirement where a random activity is still shown if no user is logged in.


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

So far for dependencies I'm only using `mongodb`, `cors` (for express), `cross-fetch` (for node). While I'm not limiting myself from using useful libraries, the implementation right now happens to be a good demonstration of how it could be written without many dependencies.

I did use the node `fetch` API that is built in node above 17.5, but then decided include `cross-fetch` so the same fetch API is usable in prior versions of node. Just wanted to get used to the future standard now that it's decided.


Going through the Bored API results, I realized there's no returned activity that is low accessibility and high price...


## References

https://vuejs.org/guide/quick-start.html#creating-a-vue-application

https://www.koderhq.com/tutorial/vue/http-fetch/

https://github.com/cmp-cc/vue-cookies/blob/master/sample/welcome-v3.html

https://expressjs.com/en/resources/middleware/cors.html

https://www.mongodb.com/docs/manual/reference/operator/aggregation/sample/

https://michaelnthiessen.com/force-re-render/

https://www.codementor.io/@evanbechtol/node-service-oriented-architecture-12vjt9zs9i
