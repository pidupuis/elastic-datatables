/*
 * elastic-datatables
 * https://github.com/pidupuis/elastic-datatables
 *
 * Copyright (c) 2015 pidupuis
 * Licensed under the MIT license.
 */

(function($) {

	$.fn.dataTable.elastic_datatables = function(opts) {
		// CONFIGURATION OPTIONS
		var conf = $.extend({
			index: '',
			type: '',
			client: elasticsearch.Client({ // Default elasticsearch instance
				host: 'localhost:9200'
			}),
			body: ''
		}, opts);

		return function(sSource, aoData, fnCallback) {
			// EXTRACT DATATABLE STATE
			var draw = aoData.filter(function(obj) {
				return obj.name === 'draw';
			})[0].value;
			var columns = aoData.filter(function(obj) {
				return obj.name === 'columns';
			})[0].value;
			var order = aoData.filter(function(obj) {
				return obj.name === 'order';
			})[0].value;
			var start = aoData.filter(function(obj) {
				return obj.name === 'start';
			})[0].value;
			var length = aoData.filter(function(obj) {
				return obj.name === 'length';
			})[0].value;
			var search = aoData.filter(function(obj) { // TODO: find a way to use search param to filter results
				return obj.name === 'search';
			})[0].value;

			// SORTING PARAMETERS
			var sort = [];
			order.forEach(function(c) {
				var colSort = {};
				colSort[columns[c.column]] = {
					'order': c.dir
				};
				sort.push(colSort);
			});

			// ELASTICSEARCH QUERY
			conf.client.search({
				'index': conf.index,
				'type': conf.type,
				'from': start,
				'size': length,
				'body': conf.body,
				'sort': sort
			}, function(error, response) {
				var dataSet = [];
				response.hits.hits.forEach(function(hit) {
					var row = [];
					columns.forEach(function(col) {
						row.push(hit._source[col.name]);
					});
					dataSet.push(row);
				});

				// RETURN RESULTS
				fnCallback({
					'draw': draw,
					'recordsTotal': dataSet.length,
					'recordsFiltered': dataSet.length, // TODO: Adapt this number once the search param is used
					'data': dataSet
				});
			});
		};
	};

}(jQuery));
