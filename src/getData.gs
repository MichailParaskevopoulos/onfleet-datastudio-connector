function getData(request) {
  // Fetch and parse data from Onfleet API using the credentials provided by the user  
  const startDate = request.dateRange.startDate;
  const endDate= request.dateRange.endDate;
  var teams = request.configParams.teams;
  if (teams == null) { teams = '' };
  var workers = request.configParams.workers;
  if (workers == null) { workers = '' };
  const secondaryDimension = request.configParams.secondaryDimension;
  const table = request.configParams.table;
  
  var headers = {'trak-access-token': getAccessToken()};
  var url = `https://onfleet.com/api/analytics?startDate=${startDate}&endDate=${endDate}&teams=${teams}&workers=${workers}&secondaryDimension=${secondaryDimension}`;
  var response = UrlFetchApp.fetch(url, { headers: headers });
  
  // Process HTTP Response to parse data
  var primaryDimensionNames = JSON.parse(response)[table].primaryDimensionNames;
  var raw_data = JSON.parse(response)[table].secondaryValues;
  var arrObject = new Array();
  raw_data.forEach(function (entry) {
    var row = {};
    row[secondaryDimension] = entry['name'];
    for (var j = 0; j < primaryDimensionNames.length; j++) {
      row[primaryDimensionNames[j].replace(/[^\w\s]/gi, '').split(" ").join("")] = entry['value'][j];
    }
    arrObject.push(row);
  });
    
  var requestedFieldIds = request.fields.map(function(field) {return field.name;});
  var requestedFields = getFields(request).forIds(requestedFieldIds);
  var rows = responseToRows(requestedFields, arrObject, secondaryDimension, primaryDimensionNames);

  return {
    schema: requestedFields.build(),
    rows: rows
  };
}

function getAccessToken() {
  var formData = {}
  formData['email'] = PropertiesService.getUserProperties().getProperty('dscc.username');
  formData['password'] = PropertiesService.getUserProperties().getProperty('dscc.password');
  
  var options = {'method' : 'post', 'payload' : formData};
  
  var authenticate = UrlFetchApp.fetch('https://onfleet.com/api/auth/login/admin', options);
  var access_Token = JSON.parse(authenticate).accessToken;  
  return access_Token;
}

function responseToRows(requestedFields, response, secondaryDimension, primaryDimensionNames) {
  // Transform parsed data and return an array with values for the requested fields
  return response.map(function(dataParsing) {
    var row = [];
    requestedFields.asArray().forEach(function (field) {
      return row.push( dataParsing[field.getId()] );
    });
    return { values: row };
  });
}
