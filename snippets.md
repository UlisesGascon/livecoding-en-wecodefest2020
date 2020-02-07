
# Snippets

## Snippets for Development

### Firebase CLI

```bash
$ npm install -g firebase-tools
$ firebase login
$ firebase init
$ firebase deploy
```

**Recursos**
- [Instala Firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli)
- [Accede y prueba Firebase CLI](https://firebase.google.com/docs/cli#sign-in-test-cli)
- [Inicializa un proyecto de Firebase](https://firebase.google.com/docs/cli#initialize_a_firebase_project)
- [Implementa un proyecto de Firebase](https://firebase.google.com/docs/cli#deployment)


### GOT

- Promises
```js
const got = require('got');
const downloadJson = (url) => got(url).then(res => JSON.parse(res.body))
```

- Async/Await
```js
const got = require('got');
 
(async () => {
    try {
        const response = await got('https://sindresorhus.com');
		const data = JSON.parse(response.body)
        console.log(response.body);
        //=> '<!doctype html> ...'
    } catch (error) {
        console.log(error.response.body);
        //=> 'Internal server error ...'
    }
})();
```

### Express

```js
const express = require('express');
const app = express();

app.get('/api/v1/:entity', (req, res) => {
   const { entity } = req.params
  res.send(`Hello World! This is an API. You are asking for ${entity}`);
});

app.listen(3000, function () {
  console.log('Server running at port 3000!');
});
```


### Firestore

Inicializar la base de datos (Importante generar el [service account](https://firebase.google.com/docs/admin/setup#initialize_the_sdk))

```js
const admin = require('firebase-admin');
const serviceAccount = require('./service_account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
```

Referenciar una colección
```js
let newCityRef = db.collection('cities').doc();
```


#### Escribir y actualizar datos

[Subir datos](https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document)

```js
let newCityRef = db.collection('cities').doc();

// Later...
let setDoc = newCityRef.set({
  // ...
});
```

[Subir datos a un documento concreto](https://firebase.google.com/docs/firestore/manage-data/add-data)

```js
let data = {
  name: 'Los Angeles',
  state: 'CA',
  country: 'USA'
};

// Add a new document in collection "cities" with ID 'LA'
let setDoc = db.collection('cities').doc('LA').set(data);
```


[Actualizar un documento](https://firebase.google.com/docs/firestore/manage-data/add-data#update-data)

```js
let cityRef = db.collection('cities').doc('DC');

// Set the 'capital' field of the city
let updateSingle = cityRef.update({capital: true});
```

### Operaciones en lotes (Batch)

[Transacciones y escrituras en lotes](https://firebase.google.com/docs/firestore/manage-data/transactions#batched-writes)
```js
// Get a new write batch
let batch = db.batch();

// Set the value of 'NYC'
let nycRef = db.collection('cities').doc('NYC');
batch.set(nycRef, {name: 'New York City'});

// Update the population of 'SF'
let sfRef = db.collection('cities').doc('SF');
batch.update(sfRef, {population: 1000000});

// Delete the city 'LA'
let laRef = db.collection('cities').doc('LA');
batch.delete(laRef);

// Commit the batch
return batch.commit().then(function () {
  // ...
});
```

#### Recuperar Datos

[Obtener un documento](https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document)

```js
let cityRef = db.collection('cities').doc('SF');
let getDoc = cityRef.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });
```

[Obtener un conjunto de documentos](https://firebase.google.com/docs/firestore/query-data/get-data#get_all_documents_in_a_collection)
```js
let citiesRef = db.collection('cities');
let allCities = citiesRef.get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
```

#### Queries y filtros

[Consulta simple](https://firebase.google.com/docs/firestore/query-data/queries#execute_a_query)
```js
let citiesRef = db.collection('cities');
let query = citiesRef.where('capital', '==', true).get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
```


[Operadores](https://firebase.google.com/docs/firestore/query-data/queries#query_operators)
```js
let stateQuery = citiesRef.where('state', '==', 'CA');
let populationQuery = citiesRef.where('population', '<', 1000000);
let nameQuery = citiesRef.where('name', '>=', 'San Francisco');
```

#### Ordenación

[Ordenación](https://firebase.google.com/docs/firestore/query-data/order-limit-data)
```js
citiesRef.where('population', '>', 2500000).orderBy('population');

let firstThree = citiesRef.orderBy('name').limit(3);

let byStateByPop = citiesRef.orderBy('state').orderBy('population', 'desc');

let lastThree = citiesRef.orderBy('name', 'desc').limit(3);

let biggest = citiesRef.where('population', '>', 2500000).orderBy('population').limit(2);
```


### HTML5

_Terminal style_

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Tor Network Pulse</title>
		<style>
            body {
                background-color: #000;
                font-family: monospace;
                color: lightgreen;
            }
		</style>
	</head>
	<body>
      <header>
        <h1>Tor Network Pulse</h1>
        <p>Let's visualize Tor Network Relays</p>
      </header>
        <h3>Current Relays:</h3>
        <ul id="network">Loading....</ul>
		<script>
			console.log("Hello World!")
		</script>
	</body>
</html>
```

### Ajax

```js
fetch(url)
	.then(res => res.json())
	.then(console.log)
	.catch(console.error)
```


## Snippets para Migrar a Cloud

### Scheduler: CRON Jobs

`/index.js`

```js
const functions = require('firebase-functions');
const { hourlyCronjob } = require('./cronjobs')

exports.hourlyCrontab = hourlyCronjob
```

`/cronjobs.js`
```js
const functions = require('firebase-functions');

const hourlyCronjob = functions.region('us-central1').pubsub.schedule('0 * * * *').onRun(async (context) => {
    console.log('[CRON] START')
	//...
    console.log('[CRON] END')
  })

module.exports = { hourlyCronjob }
```

### HTTP Requests

`/index.js`
```js
const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require("body-parser");
const app = require('./routes');

const main = express();

main.use('/api/v1', app);
main.use(bodyParser.json());

exports.webApi = functions.https.onRequest(main);
```

`/routes.js`
```js
const express = require('express');
const app = express();

// Promise example -> /api/v1/example-promise
app.get("/example-promise", async (req, res) => {
    try {
		return res.json({msg: "Hi!" })
    } catch(err) {
        return res.status(500).send(`ERROR: ${err}`)
    }
})

// Simple -> /api/v1/example
app.get("/example", (req, res) => res.json({msg: "Hi!" }))

module.exports = app
```

`../firebase.json`
```json
{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [{
      "source": "/api/v1/**",
      "function": "webApi"
    }, {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### Firestore

No necesitas gestionar secrets ya que vienen en el entorno

```js

const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

const db = admin.firestore();

const citiesRef = db.collection(`cities`);
```
