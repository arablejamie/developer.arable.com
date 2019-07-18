# Pagination

## Limit - Page
For model data (e.g., devices or locations), use the `limit` parameter to specify the number of records per page and `page` for the page of results to retrieve. The default limit is 24 and page is 1; the maximum limit is 10000.

Example:
```bash
curl \
  -G https://api-user.arable.cloud/api/v2/devices \
  -H "Authorization: Apikey <apikey>" \
  -d "limit=2" \
  -d "page=2"
```

```text
{
    "items": [
        { "name": "A000003", "state": "New", ... },
        { "name": "A000004", "state": "Active", ... }
    ],
    "limit": 2,
    "page": 2,
    "pages": 10,
    "total": 19
}
```

The response includes the `limit` and `page` used for the query, along with the number of `pages` available, `total` number of results, and the results themselves under `items`.

## Pagination Cursor
For time series data, we still use `limit`, but with a `cursor` marking the next row of data rather than a page number. The cursor is optional; the default limit is 1000 rows and the maximum is 10000. Results are sorted by the `time` column; by default the `order` is ascending (`asc`) but can also be set to descending (`desc`).

Example (no cursor, default order):
```bash
curl -i \
  -G https://api-user.arable.cloud/api/v2/data/hourly \
  -H "Authorization: Apikey <apikey>" \
  -H "Accept: text/csv" \
  -d "select=time,tair" \
  -d "device=A123456" \
  -d "start_time=2019-07-01" \
  -d "end_time=2019-07-01T08:00:00Z" \
  -d "limit=5"
```

```text
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Content-Type: text/csv
Date: Wed, 17 Jul 2019 14:31:05 GMT
Server: Apache/2.4.39 (Amazon) mod_wsgi/3.5 Python/2.7.16
X-Cursor-Next: MjAxOS0wNy0wMVQwNTowMDowMFo=
X-Units: C
Content-Length: 160
Connection: keep-alive

time,tair
2019-07-01T00:00:00+0000,28.5
2019-07-01T01:00:00+0000,27.4
2019-07-01T02:00:00+0000,26.0
2019-07-01T03:00:00+0000,24.6
2019-07-01T04:00:00+0000,24.9
```

Example (no cursor, descending order):
```bash
curl \
  -G https://api-user.arable.cloud/api/v2/data/hourly \
  -H "Authorization: Apikey <apikey>" \
  -H "Accept: text/csv" \
  -d "select=time,tair" \
  -d "device=A123456" \
  -d "start_time=2019-07-01" \
  -d "end_time=2019-07-01T08:00:00Z" \
  -d "limit=5" \
  -d "order=desc"
```

```text
time,tair
2019-07-01T08:00:00+0000,24.5
2019-07-01T07:00:00+0000,24.3
2019-07-01T06:00:00+0000,24.8
2019-07-01T05:00:00+0000,25.3
2019-07-01T04:00:00+0000,24.9
```

When there are more rows of data to retrieve, the response will include a header named `X-Cursor-Next`, whose value is an encoded token that bookmarks the next available row of data:

```text
X-Cursor-Next: MjAxOS0wNy0wMVQwNTowMDowMFo=
```

Include this token as the `cursor` query parameter in your next request to get the next rows of data:

```bash
curl -i \
  -G https://api-user.arable.cloud/api/v2/data/hourly \
  -H "Authorization: Apikey <apikey>" \
  -H "Accept: text/csv" \
  -d "select=time,tair" \
  -d "device=A123456" \
  -d "start_time=2019-07-01" \
  -d "end_time=2019-07-01T08:00:00Z" \
  -d "limit=5" \
  -d "cursor=MjAxOS0wNy0wMVQwNTowMDowMFo="
```

```text
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Content-Type: text/csv
Date: Wed, 17 Jul 2019 14:31:57 GMT
Server: Apache/2.4.39 (Amazon) mod_wsgi/3.5 Python/2.7.16
X-Units: C
Content-Length: 130
Connection: keep-alive

time,tair
2019-07-01T05:00:00+0000,25.3
2019-07-01T06:00:00+0000,24.8
2019-07-01T07:00:00+0000,24.3
2019-07-01T08:00:00+0000,24.5
```

When there are no further rows matching your query, the `X-Cursor-Next` header will be omitted from the response.
