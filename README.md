# elastic-datatables
Binds Jquery Datatables with ElasticSearch

## Example

```js
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
    'fnServerData': $.fn.dataTable.elasticSearch( {
      index: 'test',
      type: 'test',
      client: client,
      query: ''
    } )
} );
```
