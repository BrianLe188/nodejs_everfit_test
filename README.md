# SETUP AND GUIDE

## TECHSTACK

1. Express
2. MongoDB
3. Typescript

## Requirements

[x] User should be able to add new metric with: Date, Value, Unit

[x] User should be able get a List of all Metrics base on the type ( Distance / Temperature)

[x] User should be able to get data to draw a chart, which take the latest metric insert for a day, based on the type and specific time period (1 Month, 2 Month)

[x] If User specific a unit when calling the above APIs, it should also convert the value for them.

## Database

1. Create db and the first collection

```sh
use metrics
db.createCollection("metrics")
```

2. Import the fake data from **docs/metrics.metrics.json** into **metrics** collection

3. Add this to .env

```sh
MONGO_URI="mongodb://localhost:27017/metrics"
```

## RUN TEST

```sh
yarn test
```

## API

1. Api create new metrics

- method: POST
- endpoint: http://localhost:3000/metrics
- body:

```json
{
  "user_id": "123",
  "type": "distance",
  "value": 98.6,
  "unit": "yard",
  "date": "2025-07-20T10:00:00.000Z"
}
```

- response:

```json
{
  "user_id": "123",
  "type": "distance",
  "value": 98.6,
  "unit": "yard",
  "date": "2025-07-20T10:00:00.000Z",
  "_id": "687f61adfd4d3481627337c2",
  "createdAt": "2025-07-22T10:02:21.652Z",
  "updatedAt": "2025-07-22T10:02:21.652Z",
  "__v": 0
}
```

2. Api get all metrics by user and type (distance/temperature)

- method: GET
- endpoint: http://localhost:3000/metrics/distance?user_id=123&unit=meter
- response:

```json
[
  {
    "_id": "687f5e2ec1a7678cf59022db",
    "user_id": "123",
    "type": "distance",
    "value": 90.15983999999999,
    "unit": "meter",
    "date": "2025-07-20T10:00:00.000Z",
    "createdAt": "2025-07-22T09:47:26.441Z",
    "updatedAt": "2025-07-22T09:47:26.441Z",
    "__v": 0
  },
  {
    "_id": "687f61adfd4d3481627337c2",
    "user_id": "123",
    "type": "distance",
    "value": 90.15983999999999,
    "unit": "meter",
    "date": "2025-07-20T10:00:00.000Z",
    "createdAt": "2025-07-22T10:02:21.652Z",
    "updatedAt": "2025-07-22T10:02:21.652Z",
    "__v": 0
  },
  {
    "_id": "687f59639b307f8bdd8e88eb",
    "user_id": "123",
    "type": "distance",
    "value": 0.13208,
    "unit": "meter",
    "date": "2025-07-22T09:26:59.613Z",
    "createdAt": "2025-07-22T09:26:59.613Z",
    "updatedAt": "2025-07-22T09:26:59.613Z",
    "__v": 0
  }
]
```

3. Api get chart data

- method: GET
- endpoint: http://localhost:3000/metrics/distance/chart?user_id=123&unit=meter&period=1month
- response:

```json
[
  {
    "date": "2025-07-20T10:00:00.000Z",
    "value": 90.15983999999999,
    "unit": "meter"
  },
  {
    "date": "2025-07-22T09:26:59.613Z",
    "value": 0.13208,
    "unit": "meter"
  }
]
```
