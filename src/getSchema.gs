function getFields(request) {
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;

  const secondaryDimension = request.configParams.secondaryDimension; 
  const table = request.configParams.table; 
  
  if (table == 'taskCompletionResult') {
    fields.newMetric().setId('Failed').setName('Failed').setType(types.NUMBER).setAggregation(aggregations.SUM);
    fields.newMetric().setId('Succeeded').setName('Succeeded').setType(types.NUMBER).setAggregation(aggregations.SUM);
  }
  else if (table == 'taskDelayedOnCompletion') {
    fields.newMetric().setId('OnTime').setName('On Time').setType(types.NUMBER).setAggregation(aggregations.SUM);
    fields.newMetric().setId('Delayed10min').setName('Delayed < 10 min').setType(types.NUMBER).setAggregation(aggregations.SUM);
    fields.newMetric().setId('Delayed1030mins').setName('Delayed 10-30 mins').setType(types.NUMBER).setAggregation(aggregations.SUM);
    fields.newMetric().setId('Delayed3060mins').setName('Delayed 30-60 mins').setType(types.NUMBER).setAggregation(aggregations.SUM);
    fields.newMetric().setId('Delayed60mins').setName('Delayed > 60 mins').setType(types.NUMBER).setAggregation(aggregations.SUM);
  }
  else if (table == 'taskType') {
    fields.newMetric().setId('DropOff').setName('Drop-Off').setType(types.NUMBER).setAggregation(aggregations.SUM);
    fields.newMetric().setId('Pickup').setName('Pickup').setType(types.NUMBER).setAggregation(aggregations.SUM);
  }
  else if (table == 'taskServiceTime') {
    fields.newMetric().setId('Less than 1 min').setName('Less than 1 min').setType(types.NUMBER).setAggregation(aggregations.SUM);
    fields.newMetric().setId('15min').setName('1-5 min').setType(types.NUMBER).setAggregation(aggregations.SUM);
    fields.newMetric().setId('510min').setName('5-10 min').setType(types.NUMBER).setAggregation(aggregations.SUM);
    fields.newMetric().setId('1020min').setName('10-20 min').setType(types.NUMBER).setAggregation(aggregations.SUM);
    fields.newMetric().setId('Morethan20min').setName('More than 20 min').setType(types.NUMBER).setAggregation(aggregations.SUM);
  }
  else if (table == 'workerDuration') {
    fields.newMetric().setId('Intransit').setName('In transit').setType(types.NUMBER).setAggregation(aggregations.SUM);
    fields.newMetric().setId('Idle').setName('Idle').setType(types.NUMBER).setAggregation(aggregations.SUM);
  }
  else if (table == 'workerDistance') {
    fields.newMetric().setId('Intransit').setName('In transit').setType(types.NUMBER).setAggregation(aggregations.SUM);
    fields.newMetric().setId('Idle').setName('Idle').setType(types.NUMBER).setAggregation(aggregations.SUM);
  };

  fields.newDimension().setId(secondaryDimension).setName(secondaryDimension).setType(types.TEXT);

  return fields;
}

function getSchema(request) {
  return {schema: getFields(request).build()};
}
