import express  from 'express';
import scrape from 'website-scraper';

const app = express();
const port = 3000;

const domain = process.argv[2];

const options = {
    "urls": [`https://${domain}`],
    "directory": `./${domain}`,
};

// static from current directory / domain
app.use(express.static('./' + domain + '/'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: `./${domain}`});
});

scrape(options).then((result) => {
    console.log(`Website ${domain} downloaded successfully`);
    app.listen(port, ()=>{
        console.log(`App started on port ${port}`);
    })
});

