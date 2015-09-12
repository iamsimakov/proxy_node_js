Установка node.js 
Ставим зависимости
sudo apt-get install g++ curl libssl-dev
Идем http://nodejs.org/dist/
Смотрим какая там последняя версия, в моем случае это файл node-v0.12.2.tar.gz
качаем его
wget http://nodejs.org/dist/v0.12.2/node-v0.12.2.tar.gz
распаковываем
tar -xzf node-v0.12.2.tar.gz
собираем
cd node-v0.12.2.tar.gz
./configure
make
Устанавливаем
sudo make install

Пишем скрипт, который на любой запрос отвечает «Hello World!»
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!\n');
}).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');
Сохраняем
Запускаем сервер
node hello-world.js
где .js это наш файл скрипта
Делаем запрос серверу
curl http://127.0.0.1:1337
Видим ответ
Hello World!


Прокси-сервер считает сколько ядер в вашей системе и создает столько процессов.

var http = require('http');
var fs = require("fs");
var textFile = "";
var url = require("url");
var cluster = require('cluster');

if (cluster.isMaster) {
  var numCPUs = require('os').cpus().length;
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  Object.keys(cluster.workers).forEach(function(id) {
    console.log(cluster.workers[id].process.pid);
  });
} else{
	
	http.createServer(function (req, res) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
	
	var 
	dateObj = new Date(),
	strMonth = ((dateObj.getMonth()+1) < 10) ? "0"+String(dateObj.getMonth()+1) : String(dateObj.getMonth()+1),
	strDay = (dateObj.getDate() < 10) ? "0"+String(dateObj.getDate()) : String(dateObj.getDate()),
	strHour = (dateObj.getHours() < 10) ? "0"+String(dateObj.getHours()) : String(dateObj.getHours()),
	strMinutes = (dateObj.getMinutes() < 10) ? "0"+String(dateObj.getMinutes()) : String(dateObj.getMinutes()),
	strSeconds = (dateObj.getSeconds() < 10) ? "0"+String(dateObj.getSeconds()) : String(dateObj.getSeconds()),
	strDate = "[<" + dateObj.getFullYear() + "-" + strMonth + "-" + strDay + "> " + strHour + ":" + strMinutes + ":" + strSeconds + "] ";
	
	//[<YYYY-MM-DD> hh:mm:ss] <ip пользователя> <тип запроса> <url>
    var ssilka = url.parse(req.url);
	
	var stroka = strDate + " " + req.connection.remoteAddress + " " + req.method + " " +  ssilka.href + "\n";
	
	fs.open("./log.txt", "a", 0644, function(err, file_handle) {
		if (!err) {
			fs.write(file_handle, stroka, null, 'utf8', function(err, written) {
			if (err) // Произошла ошибка при записи
				{
				res.write("\nПроизошла ошибка при записи");
				fs.close;
				}
			});
		} else {
		// Обработка ошибок при открытии
		res.write("\nПроизошла ошибка при открытии");
		fs.close;
		}
	});
	
	res.write("Your request: " + stroka + "\nIt was been added.");
	res.write("\nThis answer comes from the process " + process.pid);
	
	res.end();

	}).listen(8080);
}


console.log('Server running at http://localhost:8080/');

/*
	url.href + '\n' +           // the full URL
    url.protocol + '\n' +       // http:
    url.hostname + '\n' +       // site.com
    url.port + '\n' +           // 81
    url.pathname + '\n' +       // /path/page
    url.search + '\n' +         // ?a=1&b=2
    url.hash                    // #hash
*/
