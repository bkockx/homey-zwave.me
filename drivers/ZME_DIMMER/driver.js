"use strict";

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

module.exports = new ZwaveDriver(path.basename(__dirname), {
  debug: false,
  capabilities: {
    'onoff': {
      'command_class': 'COMMAND_CLASS_SWITCH_MULTILEVEL',
      'command_get': 'SWITCH_MULTILEVEL_GET',
      'command_set': 'SWITCH_MULTILEVEL_SET',
      'command_set_parser': function(value) {
        return {
          'Value': value ? 99 : 0,
          "Dimming Duration": 1
        }
      },
      'command_report': 'SWITCH_MULTILEVEL_REPORT',
      'command_report_parser': function(report) {
        return report['Value (Raw)'][0] > 0;
      }
    },
    'dim': {
      'command_class': 'COMMAND_CLASS_SWITCH_MULTILEVEL',
      'command_get': 'SWITCH_MULTILEVEL_GET',
      'command_set': 'SWITCH_MULTILEVEL_SET',
      'command_set_parser': function(value) {
        return {
          "Value": Math.min(value * 100, 99),
          "Dimming Duration": 1
        }
      },
      'command_report': 'SWITCH_MULTILEVEL_REPORT',
      'command_report_parser': function(report) {
        let value = report['Value (Raw)'][0];
        return value / 100;
      }
    }
  },
  settings: {
  }
})