# Authentication

The Arable API provides 3 methods of authentication to the API. Depending on your specific application needs you can authenticate via one the following methods: `Basic Auth`, `Bearer Token` or `API Keys`. 

Requests can be made to each individual page using `Basic Auth`. As long as the `Authorization` header is sent with the correct credentials, access will be granted.

`API Keys` can be generated via the API and then included in the parameter string of a url. The benefit of this is that an `API Key` can be scoped with individual permissions and also be set to expire.


## Basic

Requests can be made to each individual page using `Basic Auth`. As long as the `Authorization` header is sent with the correct credentials, access will be granted. The `Authorization` header must contain the word `Basic` followed by a base-64 encoded string of the user name and password concatenated by a colon ( : ) character.

Example:

If the user was test@test.com and the password was "getmedata",
it would yield a string like this: `dGVzdEB0ZXN0LmNvbTpnZXRtZWRhdGE=`
This is also described in [RFC2617](https://tools.ietf.org/html/rfc2617).

```bash curl -X GET \
  https://api-user-test.arable.cloud/api/v2/devices \
  -H 'Authorization: Basic dGVzdEB0ZXN0LmNvbTpnZXRtZWRhdGE=' \
```

## Bearer

In applications where retaining the password is not recommended, the `Bearer Token` can be used. To use `Bearer Token` authentication, you need first to authenticate at: `api/v2/auth/token` by creating a `POST` request which includes a JSON object with the properties of `email` and `password`. The result will be a JSON object with the `token` and `user_id`. The `Authorization` header would then be updated to include "`Bearer <token>`" and this would authorize access to all the resources that user can see.

Example:
``` bash
curl -X POST \
  https://api-user.arable.cloud/api/v2/auth/token \
  -H 'Content-Type: application/json' \
  -d '{"email": "<email address>", "password": "<plaintext password>"}'
```
The response will be a JSON object containing `token` and `user_id` fields:
```
{{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vYXBpLmFyYWJsZS5jb20iLCJpYXQiOjE1NjMxMjc1MjUsImp0aSI6IjVjMmU0OGM4Y2RjZjQ5ZGQ4NDEyY...",
    "user_id": "1234567189"
}}
```
Each subsequent request to the API can use this token to gain access to endpoints. In order to gain access, the API requires the token to be provided in the `Authorization` header.

Example:
```bash
 curl -X GET \
  https://api-user.arable.cloud/api/v2/devices \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vYXBpLmFyYWJsZS5jb20iLCJpYXQiOjE1NjMxMjc1MjUsImp0aSI6IjVjMmU0OGM4Y2RjZjQ5ZGQ4NDEyY...' \
```

::: warning Note
This token must be kept as a secret and discarded when a user requests to be logged out.
:::
## Apikey

`API Keys` can be generated via the API and then included in the parameter string of a url. The benefit of this is that an `API Key` can be scoped with individual permissions and also be set to expire.

Example:
```
/api/v2/locations/summary?apikey=dcd05016-00e1-4220-8a5c-23261821c1ff
```


### Create an API Key


#### Scopes

### Apikey in url
### Apikey in header
