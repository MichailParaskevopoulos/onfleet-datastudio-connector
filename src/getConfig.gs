function getConfig(request) {
  var config = cc.getConfig();
  
  config
      .newSelectSingle()
      .setId('table')
      .setName('Table')
      .addOption(config.newOptionBuilder().setLabel('Task Completion Result').setValue('taskCompletionResult'))
      .addOption(config.newOptionBuilder().setLabel('Task Delayed On Completion').setValue('taskDelayedOnCompletion'))
      .addOption(config.newOptionBuilder().setLabel('Task Service Time').setValue('taskServiceTime'))
      .addOption(config.newOptionBuilder().setLabel('Worker Duration').setValue('workerDuration'))
      .addOption(config.newOptionBuilder().setLabel('Worker Distance').setValue('workerDistance'))
      .addOption(config.newOptionBuilder().setLabel('Task Type').setValue('taskType'));

  config
      .newSelectSingle()
      .setId('secondaryDimension')
      .setName('Secondary Dimension')
      .addOption(config.newOptionBuilder().setLabel('Day').setValue('day'))
      .addOption(config.newOptionBuilder().setLabel('Week').setValue('week'))
      .addOption(config.newOptionBuilder().setLabel('Month').setValue('month'))
      .addOption(config.newOptionBuilder().setLabel('D/Week').setValue('dayOfWeek'))
      .addOption(config.newOptionBuilder().setLabel('H/Day').setValue('hourOfDay'))
      .addOption(config.newOptionBuilder().setLabel('Worker').setValue('worker'));
  
  config
      .newTextInput()
      .setId('teams')
      .setName('Teams ID')
      .setHelpText('Onfleet Team ID')
      .setPlaceholder('Onfleet Team ID (Optional)');
  
  config
      .newTextInput()
      .setId('workers')
      .setName('Driver ID')
      .setHelpText('Onfleet Driver ID')
      .setPlaceholder('Onfleet Driver ID (Optional)');
  
  config.setDateRangeRequired(true);  
  
  return config.build();
}
