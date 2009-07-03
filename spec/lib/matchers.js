Screw.Matchers['includes'] = {
  match: function(expected, actual) {
    return actual.indexOf(expected) != -1;
  },
  failure_message: function(expected, actual, not) {
    return 'expected ' + $.print(actual) + (not ? ' not' : '') + ' to include ' + $.print(expected);
  }
};

Screw.Matchers['have_size'] = {
  match: function(expected, actual) {
    if (actual.size == undefined) {
      throw(actual.toString() + " does not respond to size()");
    }
    return actual.size() == expected;
  },

  failure_message: function(expected, actual, not) {
    return 'expected ' + $.print(actual) + (not ? ' to not' : ' to') + ' have size ' + expected;
  }
};
