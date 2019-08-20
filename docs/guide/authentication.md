# Authentication

The Arable API provides 3 methods of authentication to the API. Depending on your specific application needs, you can authenticate via one the following methods: `Basic Auth`, `Bearer Token` or `API Keys`. 

Requests can be made to each individual page using `Basic Auth`. As long as the `Authorization` header is sent with the correct credentials, access will be granted.

`API Keys` can be generated via the API and then included in the parameter string of a url. The benefit of this, is that an `API Key` can be scoped with individual permissions and also be set to expire.

[[toc]]

## Basic Auth

Requests can be made to each individual page using `Basic Auth`. As long as the `Authorization` header is sent with the correct credentials, access will be granted. The `Authorization` header must contain the word `Basic` followed by a base-64 encoded string of the username and password concatenated by a colon `:` character.

Example:

If the username was test@test.com and the password was "getmedata", the base64 encoded user and password would be a string like this: `dGVzdEB0ZXN0LmNvbTpnZXRtZWRhdGE=`. This is also described in [RFC2617](https://tools.ietf.org/html/rfc2617).

Base64 encoding of username and password in linux/osx:
```
echo -n "username:password"| base64
```

Base64 encoding of username and password in python:
```from base64 import b64encode
token = b64encode("{0}:{1}".format(username, password).encode('utf-8')).decode('utf-8')
```

Request using basic auth
```bash curl -X GET \
  https://api-user.arable.cloud/api/v2/devices \
  -H 'Authorization: Basic dGVzdEB0ZXN0LmNvbTpnZXRtZWRhdGE=' \
```

## Bearer Token

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


## API key

`API Keys` can be generated via the API and then included in the parameter string of a url. The benefit of this, is that an `API Key` can be scoped with individual permissions and also be set to expire.

### Usage
1) You can use `API Key` in `Authorization` header
```bash
 curl -X GET \
  https://api-user.arable.cloud/api/v2/devices \
  -H 'Authorization: Apikey dcd023786-00e1-4220-8a5c-23261821c1ff'
```

2) Or you can use `API Key` in url.
```
/api/v2/locations/summary?apikey=dcd023786-00e1-4220-8a5c-23261821c1ff
```

::: danger Security Risk
Be aware of the risk when sharing your `API Key` in a url. Anyone who gets your `API Key` will get all the [permission scopes](#scopes) you granted to it. Only share an `API Key` with an expiration datetime on it. You can modify or deactivate an `API Key` after sharing it.
:::

### Creation
Here is the [API reference](https://api-user.arable.cloud/api/v2/doc#operation/post_apikey_list) for creating `API Key`.

::: tip Tip
You need to use either [Basic Auth](#basic auth) or a [Bearer Token](#bearer token) to create an `API Key`. You can't create a new `API Key` with an old `API Key`.
:::

Request Example
```bash
curl -X POST \
  https://api-user.arable.cloud/api/v2/apikeys \
  -H 'authorization: Basic dGVzdEB0ZXN0LmNvbTpnZXRtZWRhdGE' \
  -H 'content-type: application/json' \
  -d '{
        "scopes": [
        "data:read"
      ],
        "name": "data apikey",
        "exp": "2019-07-23T15:40:15Z",
        "active": true
      }'
```

Response
```
{
    "scopes": [
        "data:read"
    ],
    "updated": "2019-07-22T16:17:12.408366+00:00",
    "apikey": "dcd0sdf242300e1-4220-8a5c-23261821c1ff",
    "name": "data apikey",
    "created": "2019-07-22T16:17:12.408345+00:00",
    "created_by": "5b5b66176a6c993f2e1d3dbd",
    "exp": "2019-07-23T15:40:15+00:00",
    "active": true,
    "id": "5d35e188f65b2214626eddeb",
    "last_seen": "2019-07-22T16:17:12.408429+00:00"
}
```

Then you can use the `apikey` field from the response in a request like [this](#usage)

#### Scopes
You must specify `scopes` when creating an `API Key`. Supported scopes can be found in the [API reference](https://api-user.arable.cloud/api/v2/doc#operation/post_apikey_list). The most up to date definitions of all available scopes can be found in this endpoint: https://api-user.arable.cloud/api/v2/apikeys/scopes

Here is an example of scopes definitions
```
{
    "data:read": "Allow reading all history data",
    "orgs:write": "Allow modifying org and managing org members",
    "users:read": "Allow reading user info",
    "teams:write": "Allow modifying/creating/deleting team and managing team members",
    "notifications:write": "Allow modifying/creating/deleting notifications",
    "teams:read": "Allow reading team info",
    "annotations:write": "Allow modifying/creating/deleting annotations",
    "orgs:read": "Allow reading org info and org members",
    "devices:read": "Allow reading devices",
    "notifications:read": "Allow reading notifications",
    "locations:write": "Allow modifying locations",
    "annotations:read": "Allow reading annotations",
    "users:write": "Allow modifying user, but cannot change password",
    "apikeys:read": "Allow reading Apikey info",
    "locations:read": "Allow reading locations"
}
```

For example, if you want to allow an `API Key` to read `/data` endpoints and `/locations` endpoints, and also allow modifying `/locations`, then the `scope` field in the request body should look like this:
```
["data:read", "locations:read", "locations:write"]
```
It is an array of strings.

#### Name
`name` field can be any string you want to name your `API Key`.

#### Expiration Time
`exp` defines the expiration datetime (UTC) of `API Key`. It is optional. You don't need to provide this field if you don't want it to expire.

### List all the API Keys you own
[API reference](https://api-user.arable.cloud/api/v2/doc#operation/get_apikey_list)

Request Example
```bash
curl -X GET \
  https://api-user.arable.cloud/api/v2/apikeys \
  -H 'authorization: Basic dGVzdEB0ZXN0LmNvbTpnZXRtZWRhdGE' \
```

Response
```
[
    {
        "scopes": [
            "data:read"
        ],
        "updated": "2019-07-22T16:17:12.408366+00:00",
        "apikey": "7123647da-44f5-4011-8ab1-0c357341edfew",
        "name": "data apikey",
        "created": "2019-07-22T16:17:12.408345+00:00",
        "created_by": "5b5b66176a6c993f2e1dwdscc",
        "exp": "2019-07-23T15:40:15+00:00",
        "active": true,
        "id": "5d35e188f65b2214626ecwqwer",
        "last_seen": "2019-07-22T16:17:12.408429+00:00"
    },
    {
        "scopes": [
            "data:read"
        ],
        "updated": "2019-07-22T16:18:38.894230+00:00",
        "apikey": "dv1234df-211a-4ecb-bfc7-1e8e33cqwercv",
        "name": "data apikey",
        "created": "2019-07-22T16:18:38.894205+00:00",
        "created_by": "5b5b66176a6c993f2e1dwdscc",
        "exp": "2019-07-23T15:40:15+00:00",
        "active": true,
        "id": "5d35e1def65b2214626ecervcve",
        "last_seen": "2019-07-22T16:18:38.894293+00:00"
    }
]
```

### Update an API Key
Here is the [API reference](https://api-user.arable.cloud/api/v2/doc#operation/put_apikey) for updating an `API Key`.

You can change `scope`, `name` and `exp` of `API Key`. You can also deactivate it by setting `active` field to `false`.
Update an `API Key` by its `id` (`5d35e188f65b2214626ecwqwer` in this example), not the `apikey` value.

Request Example
```bash
curl -X PUT \
  https://api-user.arable.cloud/api/v2/apikeys/5d35e188f65b2214626ecwqwer \
  -H 'authorization: Basic dGVzdEB0ZXN0LmNvbTpnZXRtZWRhdGE' \
  -H 'content-type: application/json' \
  -d '{
        "scopes": [
          "locations:read"
        ],
        "name": "new name",
        "exp": "2019-07-25T15:40:15Z",
        "active": false
      }'
```

Response
```
{
    "scopes": [
        "locations:read"
    ],
    "updated": "2019-07-22T17:22:25.918589+00:00",
    "apikey": "78096f8a-44f5-4011-8ab1-0c357341bcec",
    "name": "new name",
    "created": "2019-07-22T16:17:12.408345+00:00",
    "created_by": "5b5b66176a6c993f2e1dwdscc",
    "exp": "2019-07-24T15:40:15+00:00",
    "active": false,
    "id": "5d35e188f65b2214626ecwqwer",
    "last_seen": "2019-07-22T16:17:12.408429+00:00"
}
```

### Delete an API Key
Here is the [API reference](https://api-user.arable.cloud/api/v2/doc#operation/put_apikey) for deleting an `API Key`.
Delete an `API Key` by its `id` (`5d35e188f65b2214626ecwqwer` in this example), not the `apikey` value.

Request Example
```bash
curl -X DELETE \
  https://api-user.arable.cloud/api/v2/apikeys/5d35e188f65b2214626ecwqwer \
  -H 'authorization: Basic dGVzdEB0ZXN0LmNvbTpnZXRtZWRhdGE'
```

Server will reponse code `204` if `API Key` was successfully deleted

::: warning Note
API Key cannot be recovered after deletion. [Deactivate](#update-api-key) it if you may need it again.
:::
