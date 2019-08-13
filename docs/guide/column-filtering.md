# Column Filtering

To reduce the amount of data you are querying, use one of these methods to filter which columns are returned:


## X-Fields
To only retrieve specific parts of an object instead of the full object, use the `X-Fields` header.

**Note:** to request specific columns of data for the [/data](data.md) endpoint, it will be faster to use the [select](#select) query paramater instead of the `X-Fields` header.

The `X-Fields` header is a comma-separated list of the object fields you want returned by the endpoint, surrounded by brackets.

### Usage

Fetch the `email` and `first_name` of a user:
```bash curl -X GET https://api-user.arable.cloud/api/v2/users \
  -H 'Authorization: Apikey <apikey>' \
  -H 'X-Fields: {email,first_name}'
```

You can use nested brackets to filter nested objects or to filter a list of objects:
```bash curl -X GET https://api-user.arable.cloud/api/v2/users \
  -H 'Authorization: Apikey <apikey>' \
  -H 'X-Fields: {email,first_name,orgs{tenant}}'
```

Use `*` to request all other fields:
```bash curl -X GET https://api-user.arable.cloud/api/v2/users \
  -H 'Authorization: Apikey <apikey>' \
  -H 'X-Fields: {orgs{tenant},*}'
```


## Select

In the `/data` endpoint, instead of using the `X-Fields` header, you should use the `select` parameter, as it is faster.

`Select` is a comma-separated string of requested column names with the default being to return all columns. Depending on the size of the time window you are searching, filtering by columns can have a noticeable impact on the amount of data you receive from the API.


### Usage

For example, if you are interested in only the temperature (`tair`), humidity (`rh`), and precipitation (`precip`), you could do:

```bash
curl -i \
  -G https://api-user.arable.cloud/api/v2/data/hourly \
  -H "Authorization: Apikey <apikey>" \
  -H "Accept: text/csv" \
  -d "select=time,tair,rh,precip" \
  -d "device=A123456"
```

More examples can be found in the [Requesting Data](data.md#requesting-data) in the `/data` documentation.
