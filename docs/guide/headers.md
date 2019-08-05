# Headers

[[toc]]


## X-Fields
If you are interested in only retrieving specific parts of an object instead of the full object, you can use the `X-Fields` header to do just that.

**Note:** for the [/data](data.md#requesting-data) endpoint, use the `select` query paramater, not the `X-Fields` header, to request specific columns of data as that will be faster.

The `X-Fields` header is a comma-separated list of object fields you want returned by the endpoint surrounded by brackets.

### Usage

Fetch the email and first_name of a user:
```
https://api-user.arable.cloud/api/v2/devices \
  -H 'Authorization: Apikey <apikey>' \
  -H 'X-Fields: {email,first_name}'
```

You can use nested brackets to filter nested objects or to filter a list of objects:
```
https://api-user.arable.cloud/api/v2/devices \
  -H 'Authorization: Apikey <apikey>' \
  -H 'X-Fields: {email,first_name,orgs{tenant}}'
```

Use `*` to request all other fields:
```
https://api-user.arable.cloud/api/v2/devices \
  -H 'Authorization: Apikey <apikey>' \
  -H 'X-Fields: {orgs{tenant},*}'
```
