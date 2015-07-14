/*! Elastic Datatables - v0.0.1 - 2015-07-14
* https://github.com/pidupuis/elastic-datatables
* Copyright (c) 2015 pidupuis; Licensed MIT */
(function($) {

  $.fn.dataTable.elastic_datatables = function ( opts ) {
    // Configuration options
    var conf = $.extend( {
      index: '',
      type: '',
      client: undefined,
      query: ''
    }, opts );

    return function ( sSource, aoData, fnCallback ) {
      var draw = $.grep(aoData, function( v, i ) { return v.name === 'draw'; })[0].value;
      var columns = $.grep(aoData, function( v, i ) { return v.name === 'columns'; })[0].value;
      var order = $.grep(aoData, function( v, i ) { return v.name === 'order'; })[0].value;
      var start = $.grep(aoData, function( v, i ) { return v.name === 'start'; })[0].value;
      var length = $.grep(aoData, function( v, i ) { return v.name === 'length'; })[0].value;
      var search = $.grep(aoData, function( v, i ) { return v.name === 'search'; })[0].value;

      conf.client.search({
        index: conf.index,
        type: conf.type
        // q: 'title:test'
      }, function (error, response) {
        var dataSet = [];
        response.hits.hits.forEach(function(hit) {
          var row = [];
          columns.forEach(function(col) {
            row.push(hit._source[col.name]);
          });
          dataSet.push(row);
        });

        fnCallback({
            'draw': draw,
            'recordsTotal': dataSet.length,
            'recordsFiltered': dataSet.length,
            'data': dataSet
        });
      });
    };
  };

}(jQuery));
