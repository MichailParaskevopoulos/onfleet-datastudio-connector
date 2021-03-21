# ♾️Onfleet — Google Data Studio Community Connector
*This is not an official Onfleet product*

The connector script can be used with Data Studio to view and analyze performance metrics from [Onfleet](https://onfleet.com/). 

## How to Install
1. Create a new project on [Google Apps Script](https://script.google.com/)
2. Copy paste the source files of the current connector or create a new one
3. In the Apps Script development environment, click on `Publish` > `Deploy from manifest` to use the connector in Data Studio

## Overview
`getAuthType` defines the authenication scheme the connector uses (username-password in this case) and stores the credentials passed in from Data Studio in a property store that only the current user can access, and only within this script.

`getConfig` defines the configuration options that are available to the user. In this connector, the user can define the Onfleet table (e.g. taskCompletionResult, taskType, etc.), the secondary dimension (e.g. day, week, month, etc.), and optionally the ID of an Onfleet team or driver.

`getSchema` returns the list of columns and the columns' data types that are available from the data source based on the configuration parameters provided by the user.

Finally, `getData` authenticates Onfleet's analytics API using the user's credentials, fetches the data from the API using an HTTP request, and returns the data in a format that is readable by Data Studio. 

## Example Usage
### Connecting to Onfleet from Data Studio:

![Connecting to Onfleet](https://github.com/MichailParaskevopoulos/onfleet-datastudio-connector/blob/main/connecting.gif "Connecting to Onfleet")

### Visualizing Onfleet data with a date filter:
![Creating a Graph](https://github.com/MichailParaskevopoulos/onfleet-datastudio-connector/blob/main/creating_graph.gif "Creating a Graph")
