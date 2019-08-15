# Migrating from API v1.0

As our knowledge of the usage of Arable’s API improves, we would like to make it easier for our customers to ask for, understand and organize the data on our platform. With this in mind, we are introducing the Arable API 2.0 in order to address some of the better known issues with the previous 1.0 version while building the foundation for more services to come. 

## Documentation
Documentation is now a built-in function of our API. Any changes to the API will automatically update the accompanying documentation to show the new or altered endpoints.

## Security

## Authentication

Users are no longer tied directly beneath an organization, but linked to one or many organizations. This means that users only need to furnish credentials to one endpoint without specifying an organization up front. Basic authentication is no longer required, and the API will accept a POST of the JSON username and password as well as the use of API keys.	

## Teams

Permissions between users and devices in the previous version of our API were complicated, and management of them was never made public. With API 2.0, we introduce the notion of a team. The team exists within the context of an organization and limits users’ view of devices and locations based on criteria set forth by the organization.

Users can now be invited to take part in a team; once invited, the user will be able to see the devices that team contains. A user can be a member of more than one team, and when asking for devices they will see all of their devices across different teams.

## Data Retrieval 

### Pagination
Most endpoints now have pagination enabled by default and implemented in a standardized way across the API.
### Fields
You can now restrict which fields you want to receive from an endpoint in a standard way by specifying the X-Fields header.
## Data
### Schema
We now provide an endpoint to retrieve the schema of the data provided by the Arable platform. This includes not only which tables and columns are queryable, but also data types and descriptions. In addition, we have standardized names across endpoints; for example, shortwave downwelling radiation will always be referred to as “swdw”.
### Data Query
Our data endpoint now has a resource argument of the queried table (e.g., `api/v2/data/daily`).  In API 2.0, users are restricted to querying one device or location at a time. However, the X-Fields header can reduce the amount of information to only the desired columns, and we have expanded the query time window. See the [Requesting Data](/guide/data.html#requesting-data) section of the user guide. 
### Timezones
We have added convenience methods to API 2.0 in order to ensure that data can be returned in local time. We also created the time zone-friendly name (`tz_name`) to the `location` object. 
