const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const path = require('path');

const SortMiddleware = require('./app/middlewares/SortMiddleware');

const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

//connect DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Custom middlewares
app.use(SortMiddleware);

//HTTP logger
app.use(morgan('combined'));

//template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b, //ở đây ta định nghĩa hàm sum để sử dụng
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };
                const icon = icons[sortType];
                const type = types[sort.type];
                return `<a href="?_sort&column=${field}&type=${type}">
                            
                <span class="${icon}"></span>
                    </a>`;
            },
        },
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
