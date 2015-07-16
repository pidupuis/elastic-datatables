# Elastic Datatables

When dealing with [DataTables](https://github.com/DataTables/DataTables) and [ElasticSearch](https://www.elastic.co/), one can quickly think about two things:

* By its ability to return almost instantaneously a set of result **and** the total amount of matching results, ElasticSearch is a perfect fit for [server-side processing](https://www.datatables.net/examples/data_sources/server_side.html)
* But ElasticSearch is a search engine, not a server in which we can code as we want.

So we can't simply give an ElasticSearch request to DataTables ajax config and hope for the pagination/filter/sort to be handled automagically. We can't modify the server code so we need to fake the system. We need to develop the server-side magic on client-side.

DataTables allow us to override the *fnServerData* function to have access to the internal state of our datatable before sending a request, which allows us to add the pagination/filter/sort information to the ElasticSearch request. See [here](http://legacy.datatables.net/ref#fnServerData) for more informations.

The fact is that in every case, the same code will be used for that. The DataTable parameters (*i.e. aoData.length*: the number of row to display) will always be used the same way to construct the ElasticSearch request (*i.e. { size: aoData.length }*). This is a door for automation, and this plug-in is made for it.

## TL;DR

Focus on your [ElasticSearch](https://www.elastic.co/) request. Let this plug-in handle the pagination, filters and sorting of your [DataTables](https://github.com/DataTables/DataTables).

## Getting Started
Download the [production version][min] or the [development version][max].

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
      body: {
        query: {
          match: {
            title: 'test'
          }
        }
      }
    } )
} );
</script>
```

## Documentation
_(Coming soon)_

## Release History
_(Nothing yet)_

[min]: https://raw.github.com/pidupuis/elastic-datatables/master/dist/jquery.elastic-datatables.min.js
[max]: https://raw.github.com/pidupuis/elastic-datatables/master/dist/jquery.elastic-datatables.js
