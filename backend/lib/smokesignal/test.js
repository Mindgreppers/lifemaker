var io = require('socket.io-client');
var client = io.connect("http://0.0.0.0:3000");

client.emit('u-smokesignal.comment', {
    _id: 'AVDiy9qffOG7glyvY3KR',
    commentId: '14469583714271',
    text: 'pankaj ji ji',
    thanks: 0,
    nothanks: 0,
    userId: 'Pankaj'
  });

client.on('r-smokesignal.'+ 'AVDiy9qffOG7glyvY3KR' +'.done', function(data) {
	console.log("djghadshgjkdfh kdfghfhgj ");
	console.log(data);
});

client.on('r-smokesignal.error', function(data) {
	console.log(data);
});