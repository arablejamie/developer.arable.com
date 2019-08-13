# Data

[[toc]]

## Understanding the Schema

The [schemas](https://api-user.arable.cloud/api/v2/doc#operation/get_schemas) and [tables](https://api-user.arable.cloud/api/v2/doc#operation/get_schema) endpoints were intended to show the descriptions of the data that is available within the Arable platform.

Fetching the available tables is the first step.

Example:
```bash
curl -X GET \
  https://api-user.arable.cloud/api/v2/schemas \
  -H 'Authorization: Basic dGVzdEB0ZXN0LmNvbTpnZXRtZWRhdGE=' \
```

The result will be an array of table names. Each of these table names can be used in a subsequent call where it becomes the URL parameter to the `/schemas` endpoint. To get the metadata for the `daily` table, for example, you would specify `/schemas/daily`.

Example: 
```bash
curl -X GET \
  https://api-user.arable.cloud/api/v2/schemas/daily \
  -H 'Authorization: Basic dGVzdEB0ZXN0LmNvbTpnZXRtZWRhdGE=' \
```

The result is an array of JSON objects that contain the metadata for a column, including `description`, `data_type`, and `column_name`. 

Result:
```text
[
    {
        "description": "UTC time",
        "data_type": "timestamp with time zone",
        "column_name": "create_time"
    },
    {
        "description": "Crop water demand (mm/day)",
        "data_type": "real",
        "column_name": "crop_water_demand"
    },
    ...
]
```

This information can be helpful when interpreting the data that is returned or for narrowing down the data requested to only the columns necessary or selected.

## Requesting Data

The [data](https://api-user.arable.cloud/api/v2/doc#operation/get_data) endpoint provides access to time series data from a specified table. It takes the name of the table to query as a path parameter, and returns data in JSON or CSV format depending on the value of an optional `Accept` header (the default is JSON).

Results are paginated as described under the [cursor pagination](https://api-user.arable.cloud/api/v2/doc#operation/get_data) section of these docs. Data units are converted according to the unit parameters provided on the request (example below). The data endpoint also accepts several filtering parameters:

- `Device` - device name, e.g. A123456, one `device` and one `location` are required;
- `Location` - location ID, one `device` and one `location` are required;
- `Select` - comma-separated string of requested column names (default is all available columns), more detail on when to use this can be found [here](column-filtering.md#select);
- `Start_time` - query start time as an iso-formatted string (default depends on the table queried);
- `End_time` - query end time as an iso-formatted string (default is the current time);

as well as a result formatting option:
- `Local_time` - there are three potential input formats. If included on the request, the results will include a `local_time` column with `Time` converted to the specified time zone or offset by the specified amount of time. Though most tables store data in UTC, there are a few tables which do not and are detailed [here](#table-timezones). The three potential formats are:
  - Time zone name (e.g., `America/Los_Angeles`, which is UTC-7 or UTC-8, depending on daylight savings time, or DST). This is a DST-aware format and will return the correct local time even if the data crosses the switch-over period between DST and regular time.
  - ISO format (e.g., `-04:00` which is UTC-4). This is a flat offset in hours and minutes from UTC. This is not DST-aware.
  - Offset in seconds (e.g., `-25200` which is UTC-7). This is a flat offset in seconds from UTC. This is not DST-aware.

Example (JSON):

```bash
curl -i \
  -G https://api-user.arable.cloud/api/v2/data/hourly \
  -H "Authorization: Apikey <apikey>" \
  -d "select=time,tair,rh,slp,precip" \
  -d "device=A123456" \
  -d "limit=10" \
  -d "start_time=2019-07-01" \
  -d "end_time=2019-07-01T12:00:00Z" \
  -d "local_time=-14400"
```

Response:
```text
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Content-Type: application/json
Date: Wed, 17 Jul 2019 20:30:41 GMT
Server: Apache/2.4.39 (Amazon) mod_wsgi/3.5 Python/2.7.16
X-Cursor-Next: MjAxOS0wNy0wMVQxMDowMDowMFo=
X-Units: mm,C,dec,kp
Content-Length: 1198
Connection: keep-alive

[
    {
        "local_time": "2019-06-30T20:00:00-0400",
        "precip": 0.0,
        "rh": 0.73,
        "slp": 101.8,
        "tair": 28.5,
        "time": "2019-07-01T00:00:00Z"
    },
    ...,
    {
        "local_time": "2019-07-01T05:00:00-0400",
        "precip": 0.5,
        "rh": 0.97,
        "slp": 101.9,
        "tair": 23.5,
        "time": "2019-07-01T09:00:00Z"
    }
]
```

Example (CSV):

```bash
curl -i \
  -G https://api-user.arable.cloud/api/v2/data/hourly \
  -H "Authorization: Apikey <apikey>" \
  -H "Accept: text/csv" \
  -d "select=time,tair,rh,slp,precip" \
  -d "device=A123456" \
  -d "limit=10" \
  -d "start_time=2019-07-01" \
  -d "end_time=2019-07-01T12:00:00Z" \
  -d "local_time=-14400"
```

Response:
```text
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Content-Type: text/csv
Date: Wed, 17 Jul 2019 20:38:36 GMT
Server: Apache/2.4.39 (Amazon) mod_wsgi/3.5 Python/2.7.16
X-Cursor-Next: MjAxOS0wNy0wMVQxMDowMDowMFo=
X-Units: mm,C,dec,kp
Content-Length: 714
Connection: keep-alive

time,tair,rh,slp,precip,local_time
2019-07-01T00:00:00+0000,28.5,0.73,101.8,0.0,2019-06-30T20:00:00-0400
...
2019-07-01T09:00:00+0000,23.5,0.97,101.9,0.5,2019-07-01T05:00:00-0400
```

Example (with unit conversion):

```bash
curl -i \
  -G https://api-user.arable.cloud/api/v2/data/hourly \
  -H "Authorization: Apikey <apikey>" \
  -H "Accept: text/csv" \
  -d "select=time,tair,rh,slp,precip" \
  -d "device=A123456" \
  -d "limit=10" \
  -d "start_time=2019-07-01" \
  -d "pres=mb" \
  -d "ratio=pct" \
  -d "size=in" \
  -d "temp=F"
```

Response:
```text
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Content-Type: text/csv
Date: Wed, 17 Jul 2019 20:58:43 GMT
Server: Apache/2.4.39 (Amazon) mod_wsgi/3.5 Python/2.7.16
X-Cursor-Next: MjAxOS0wNy0wMVQxMDowMDowMFo=
X-Units: F,mb,pct,in
Content-Length: 463
Connection: keep-alive

time,tair,rh,slp,precip
2019-07-01T00:00:00+0000,83.3,73.0,1018.0,0.0
...
2019-07-01T09:00:00+0000,74.3,97.0,1019.0,0.02
```

## Table Timezones

Although most tables store data in UTC time and require the `local_time` parameter if you want data that is not UTC, there are exceptions when UTC data is meaningless or is more confusing, and the data is stored differently:

- The `daily` table is stored in local time. As this table contains aggregations, averages, and extremes from a day, it's most meaningful if that is the local 00:00 to 23:59 day and not the UTC 00:00 to 23:59 day. In this case, the `local_time` parameter is not needed.
