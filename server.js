const express = require ('express');
const cors = require('cors');
const mysql =require('mysql');

const app = express();
app.use(cors({origin: 'http://localhost:3000'}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const db = mysql.createConnection({
    host:'sql7.freemysqlhosting.net',
    user:'sql7621968',
    password:'qgfY2Iiu5k',
    database:'sql7621968'
});

db.connect((err)=>{
    if (err) throw err;
    console.log('Connected to MySQL database');
});

app.get('/todos', (req, res) =>{
    db.query('SELECT * FROM todos', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/todos', (req, res) => {
    const newTodo =req.body.todo;
    // INGEN escaping eller validering af input. MEGET usikker.
    const query = `INSERT INTO todos (text) VALUES ('${newTodo}')`;
    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.delete('/todos/:id', (req, res) =>{
    const id = req.params.id;
    const query = `DELETE FROM todos WHERE id_T = '${id}'`;
    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});



app.listen(5000, () => console.log('Server running on port 5000'));

