//Require thư viện
const express = require('express');
const app = express();
const config = require('./config.json');
//Require module tự tạo
const fileController = require('./fileController');

console.log(fileController.readFileSync('testFileController.txt'));

//Đặt folder public là folder static của server
app.use(express.static('public'));

//Xử lý respone trả về khi người dùng request đến đường dẫn /
app.get('/', (req, res)=>{
    console.log(__dirname)
    res.sendFile(__dirname + "/public/index.html");
});

//Xử lý respone trả về khi người dùng request đến đường dẫn /menu
app.get('/menu', (req, res)=>{
    res.sendFile(__dirname + "/public/menu_2.html");
});

//Xử lý respone trả về khi người dùng request đến đường dẫn /about
app.get('/about', (req, res)=>{
    res.send("Hi! I'm Huy hihi");
});

//Start server ở địa chỉ http://localhost:config.port với config.port thiết lập trong file config.json
app.listen(config.port, (err) => {
    if (err) { console.log(err); };
    console.log(`App is listening at port ${config.port}`);
});