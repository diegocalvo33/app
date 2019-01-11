var app = require( 'express' )();
var http = require( 'http' ).Server( app );
var io = require( 'socket.io' )( http );
var port = process.env.PORT || 3000;
var mysql = require( 'mysql' );
var con = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});

con.connect(function( err ){
    if ( err ) throw err;
});

app.get( '/', function( req, res ) {
    res.sendFile( __dirname + '/index.html' );
});

io.on( 'connection', function( socket ) {
    socket.on( 'chat message', function( msg ) {
        io.emit( 'chat message', msg );
        con.query( 'INSERT INTO msg ( msg ) VALUES ( "'+msg+'" )' );
    });
});

http.listen( port, function() {
    console.log( 'listening on *:' + port );
});
