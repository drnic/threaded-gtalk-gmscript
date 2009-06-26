Screw.Matchers['includes'] = {
  match: function(expected, actual) {
    return actual.indexOf(expected) != -1;
  },
  failure_message: function(expected, actual, not) {
    return 'expected ' + $.print(actual) + (not ? ' not' : '') + ' to include ' + $.print(expected);
  }
};
