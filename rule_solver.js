$(function() {
  var suspects = {
    "a":{ had_contact:false,
      "statements":[
        function(i) {return [true, !suspects.a.had_contact];},
        function(i) {
          // every one to b's statments is true.
          var no_contradiction = true;
          var all_statements_are_true = true;
          if (i > 3) {
            return [false, null];
          }
          $.each(suspects.b.statements, function(k, statement) {
            // statements return and array:
            //  [0] is an indicator that no_contradictions have been encountered.
            //  [1] is the truth value of the statement.
            var st_result = statement(i+1);
            if (st_result[0] && !st_result[1]) {
              all_statements_are_true = false;
            }
            else {
              no_contradiction = false;
            }
          });
          return [no_contradiction, all_statements_are_true];
        },
        function (i) {
          // every one to c's statments is true.
          var no_contradiction = true;
          var all_statements_are_true = true;
          if (i > 3) {
            return [false, null];
          }
          $.each(suspects.c.statements, function(k, statement) {
            // statements return and array:
            //  [0] is an indicator that no_contradictions have been encountered.
            //  [1] is the truth value of the statement.
            var st_result = statement(i+1);
            if (st_result[0] && !st_result[1]) {
              all_statements_are_true = false;
            }
            else {
              no_contradiction = false;
            }
          });
          return [no_contradiction, all_statements_are_true];
        }
      ]
    },
    "b":{ handled_daggar:false,
      "statements":[
        function(i) {return [true, !suspects.b.handled_daggar];},
        function(i) {
          // every one to a's statments is false.
          var no_contradiction = true;
          var all_statements_are_false = true;
          if (i > 3) {
            return [false, null];
          }

          $.each(suspects.a.statements, function(k, statement) {
            // statements return and array:
            //  [0] is an indicator that no_contradictions have been encountered.
            //  [1] is the truth value of the statement.
            var st_result = statement(i+1);
            if (st_result[0] && st_result[1]) {
              all_statements_are_false = false;
            }
            else {
              no_contradiction = false;
            }
          });
          return [no_contradiction, all_statements_are_false];
        },
        function (i) {
          // every one to c's statments is false.
          var no_contradiction = true;
          var all_statements_are_false = true;
          if (i > 3) {
            return [false, null];
          }
          $.each(suspects.c.statements, function(k, statement) {
            // statements return and array:
            //  [0] is an indicator that no_contradictions have been encountered.
            //  [1] is the truth value of the statement.
            var st_result = statement(i+1);
            if (st_result[0] && st_result[1]) {
              all_statements_are_false = false;
            }
            else {
              no_contradiction = false;
            }
          });
          return [no_contradiction, all_statements_are_false];
        }
      ]
    },
    "c":{
      "statements":[
        function(i) {return [true, suspects.b.handeled_dagger];},
        function(i) {return [true, suspects.a.had_contact];}
      ]
    }
  };

  var consistant_counts = function() {
      var a_true_st_count = 0;
      var b_true_st_count = 0;
      $.each(suspects.a.statements, function(k, statement) {
        // statements return and array:
        //  [0] is an indicator that no_contradictions have been encountered.
        //  [1] is the truth value of the statement.
        var st_result = statement(0);
        if (st_result[0] && st_result[1]) {
          a_true_st_count += 1;
        }
      });
      $.each(suspects.b.statements, function(k, statement) {
        // statements return and array:
        //  [0] is an indicator that no_contradictions have been encountered.
        //  [1] is the truth value of the statement.
        var st_result = statement(0);
        if (st_result[0] && st_result[1]) {
          b_true_st_count += 1;
        }
      });
      alert(a_true_st_count + ' ' + b_true_st_count)
      return (a_true_st_count === b_true_st_count);
  };

  var who_done_it = function() {
      // conclusive forced guilt.
      // one of the three (a, b or c) did it.
      var c_statement_count = 0;
      var c_true_statements = 0;
      $.each(suspects.c.statements, function(k, statement) {
        // statements return and array:
        //  [0] is an indicator that no_contradictions have been encountered.
        //  [1] is the truth value of the statement.
        var st_result = statement(0);
        c_statement_count += 1;
        if (st_result[0] && st_result[1]) {
          c_true_statements += 1;
        }
      });
      if (suspects.a.had_contact && !suspects.b.handeled_dagger) {
        return "a did have contact, c made " + c_true_statements + " of " + c_statement_count + " true statements";
      }
      if (!suspects.a.had_contact && suspects.b.handeled_dagger) {
        return "b handeled a dagger, c made " + c_true_statements + " of " + c_statement_count + " true statements";
      }
      if (!suspects.a.had_contact && !suspects.b.handeled_dagger) {
        return "c did it, c made " + c_true_statements + " of " + c_statement_count + " true statements";
      }
      return "what?";
  };

  var truth_table = [[false, false],
                     [false, true],
                     [true, false],
                     [true, true]];

  var results = [];

  $.each(truth_table, function(i, trial) {
    suspects.a.had_contact = trial[0];
    suspects.b.handeled_dagger = trial[1];
    if (consistant_counts()) {
      results.push(who_done_it());
    }
    else {
      results.push("inconsistant");
    }
  });

  alert(results);

});