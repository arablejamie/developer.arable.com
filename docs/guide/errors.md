# Errors

Below is a list of standardized errors in the API.

| Http Code  | Message   | Description |
|:-:|---|---|
| 400  |  Bad Request |  Usually indicates a client error, e.g., not specifying the arguments correctly, or a malformed URL. |
| 401  |  Unauthorized |  This error indicates that the request was not applied because it was lacking authentication credentials, e.g., missing or incorrect user name and/or password, or missing bearer token. |
| 403  | Forbidden  | This client error indicates that the server understood the request but refuses to authorize it due to reasons such as: user is inactive, or user has not signed the current EULA.|
| 404  |  Not Found | This error indicates that the server could not find the requested resource, e.g., device not found, location not found.  |
| 415  |  Unsupported Media Type | For POST, PUT, and DELETE requests with a non-empty request body, the `Content-Type` header is required and should be "application/json". If the header is missing or does not specify a JSON content type, the request will be rejected with an HTTP status code of 415.  |
| 500 | Unexpected Error | The server has experienced an unexpected error. Please contact customer support. 
