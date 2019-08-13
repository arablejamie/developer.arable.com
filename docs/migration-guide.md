# Migrating from API v1.0

As our knowledge of the usage of Arable’s API improves, we would like to make it easier for our customers to ask for, understand, and organize the data on our platform. With this in mind, we are introducing the second version of our API to address some of the better-known issues with the previous 1.0 version, while building the foundation for more services to come. 

## Documentation
Documentation is now a built-in function of our API. Any changes to the API will automatically update the accompanying documentation to show the new or altered endpoints.

## Security

## Authentication

Users are no longer tied directly beneath an organization, but linked to one or many organizations. This means that you only need to furnish your credentials to one endpoint, and do not need to know which organizations you belong to a priori. Basic authentication is no longer required; the API will accept a POST of the JSON username and password, as well as the use of API keys.	

## Teams

Permissions between users and devices in the previous version of our API were complicated, and management of them was never made public. With this version of the API, we introduce the notion of a team. Users can now be invited to take part in a team, which exists within the context of an organization, and limits users’ view of devices and locations. Once invited, the user will be able to see the devices that team contains. A user can be a member of more than one team, and when asking for devices they will see the union of the devices across the different teams they have joined.

## Data Retrieval 

### Pagination
Most endpoints will now have pagination enabled by default and implemented in a standardized way across the API.
### Fields
You can now restrict which fields you want to receive from an endpoint in a standard way by specifying the X-Fields header.
## Data
### Schema
We now provide an endpoint to retrieve the schema of what data is provided by the platform. This should include not only which tables and columns are queryable, but also what the data types are and a description of the data. To this point, we have taken the time to standardize names across endpoints. For example, if you see the value for shortwave downwelling radiation, it will always be referred to by “swdw”.
### Data Query
Our data endpoint now has a resource argument of the table that you are querying (e.g. `api/v2/data/daily`).  In the new API, you are restricted to querying one device or location at a time. However, with the X-Fields header you are able to reduce the amount of information to only the columns that you desire, and we are letting you query for a larger time window. See the [Requesting Data](/guide/data.html#requesting-data) section of the user guide. 
### Timezones
We have added convenience methods to our API in order to ensure that data can be returned in local time. We also created the timezone friendly name (`tz_name`) to the `Location` object. 
