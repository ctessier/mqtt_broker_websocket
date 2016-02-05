var mosca = require('mosca');

var settings = {
    port: 1883,
};

var server = new mosca.Server({
    http: {
        port: 3000,
        bundle: true,
        static: './'
    }
});

var db = new mosca.persistence.Mongo({
    url: "mongodb://localhost:27017/mqtt",
    ttl: {
        subscription: 1000*24*3600,
        packets: 1000*24*3600
    },
    mongo: {}
});

db.wire(server);

// fired when a client is connected
server.on('clientConnected', function(client) {
    console.log('Client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published', packet.payload);
});

server.on('ready', setup);

function setup() {
  console.log('MQTT server is up and running...');
}
