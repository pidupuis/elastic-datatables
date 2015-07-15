# Elastic Datatables

Binds Jquery Datatables with ElasticSearch

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/pidupuis/elastic-datatables/master/dist/jquery.elastic-datatables.min.js
[max]: https://raw.github.com/pidupuis/elastic-datatables/master/dist/jquery.elastic-datatables.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="jquery.dataTables.min.js"></script>
<script src="elasticsearch.js"></script>
<script src="dist/jquery.elastic-datatables.min.js"></script>
<script>
var client = elasticsearch.Client({
  host: 'localhost:9200'
});

$('#example').dataTable( {
    'columns': [
        { 'sTitle': 'First name', 'sName': 'firstname' },
        { 'sTitle': 'Last name', 'sName': 'lastname' }
    ],
    'bProcessing': true,
    'bServerSide': true,
    'fnServerData': $.fn.dataTable.elastic_datatables( {
      index: 'test',
      type: 'test',
      client: client,
      query: ''
    } )
} );
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Release History
_(Nothing yet)_
