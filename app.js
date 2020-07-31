const express = require('express')
const config = require('config')
const axios = require('axios')

const app = express()

app.use(express.json({ extended: true }))


app.get('/', async function(req, res) {
  try {
    const otvet = await axios
        .get('http://timetable.tsu.ru/m2/'+req.query.link)
        .then(response => response.data);
    res.json(otvet)
  } catch (e) {
    res.status(400).json({ message: 'Что-то пошло не так' })
  }
});



const PORT = config.get('port') || 5000

async function start() {
  try {
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()

