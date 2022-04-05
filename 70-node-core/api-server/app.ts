import express from 'express'
import { DataStore } from './data';

const app = express()

app.get('/', (req, res)=>{
	res.json(DataStore.list);
})

app.listen(3000, ()=> {
	console.log('listen on http://localhost:3000');
})