import express from 'express';

const app = express();

app.get('/users', (req, res)=>{
    res.json(['Diego', 'Marcos', 'Cleiton'])
    console.log('listagem de usuários');
})

app.listen(3333)