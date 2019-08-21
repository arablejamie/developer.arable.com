# Migrating from API 1.0 to API 2.0

As our knowledge of the usage of Arable’s API improves, we would like to make it easier for our customers to ask for, understand, and organize the data on our platform. With this in mind, we are introducing the second version of our API in order to address some of the better known issues with the previous 1.0 version, while building the foundation for more services to come. 

## Documentation

Documentation is now a built-in function of our API. Any changes to the API will automatically update the accompanying documentation to show the new or altered endpoints.

## Security

## Authentication

Users are no longer tied directly beneath an organization, but linked to one or many organizations. This means that users only need to furnish credentials to one endpoint without needing to know all their organizations. Basic authentication is no longer required, and the API will accept a POST of the JSON username & password, as well as the use of API keys.

## Teams

Permissions between users and devices in the previous version of our API were complicated and management of them was never made public. With this version of the API, we introduce the notion of a team as a way to organize both devices and users. Teams exist within the context of an organization, and limit users’ view of devices and locations.

Once a user is invited to a team, they will be able to see the devices that team contains. A user can be a member of more than one team, and when querying devices, they will see all the devices from across their different teams.

## Data Retrieval 

### Pagination

Most endpoints will now have standardized pagination enabled by default across the API.

### Fields
Users now have a standardized way to restrict which fields they want to receive from an endpoint by specifying the X-Fields header.

## Data

### Schema

We now provide an endpoint to retrieve the schema of data provided by the platform, which includes queryable tables & columns plus data types & descriptions. Names are also standardized across endpoints; for example, the value for shortwave downwelling radiation will always be `swdw`.

### Data Query

The data endpoint now has a resource argument of the queried data set (e.g., `api/v2/data/daily` will fetch `daily` data).  

<p>In the new API, users are restricted to querying one device or location at a time. However, the X-Fields header allows reduction of the amount of information to only the desired columns, across a larger time frame. See the [Requesting Data](/guide/data.html#requesting-data) section of the user guide.

### Timezones
We have added convenience methods to our API in order to ensure that data can be returned in local time. We also created the time zone-friendly name (`tz_name`) to the `location` object. 
