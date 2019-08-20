# Column Filtering

If you are looking to reduce the amount of data you are querying you can use one of these methods to filter which columns are returned:


## X-Fields
If you are interested in only retrieving specific parts of an object instead of the full object, you can use the `X-Fields` header to do just that.

**Note:** for the [/data](data.md) endpoint, use the [select](#select) query paramater, not the `X-Fields` header, to request specific columns of data as that will be faster.

The `X-Fields` header is a comma-separated list of object fields you want returned by the endpoint surrounded by brackets.

### Usage

Fetch the email and first_name of a user:
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

For the data endpoint, we recomment you use the `select` parameter instead of using the `X-Fields` header.

`select` is a comma-separated string of requested column names with the default being to return all columns. Depending on the size of the time window you are searching, filtering by columns can have a noticeable impact on the amount of data you receive from the API.

### Usage

For example, if you are interested in the temperature, humidity, and precipitation only you could make the following request:

```bash
curl -i \
  -G https://api-user.arable.cloud/api/v2/data/hourly \
  -H "Authorization: Apikey <apikey>" \
  -H "Accept: text/csv" \
  -d "select=time,tair,rh,precip" \
  -d "device=A123456"
```

More examples can be found in the [Requesting Data](data.md#requesting-data) in the `/data` documentation.
