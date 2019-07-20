const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./util/geocode')
const weather = require('./util/weather')

const port = process.env.PORT || 3000
const app = express()
const publicDirectoryPath = path.join(__dirname, `../public`)
const viewsDirectoryPath = path.join(__dirname, `../public/views`)
const partialsDirectoryPath = path.join(__dirname, `../public/partials`)
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
app.use(express.static(publicDirectoryPath))

hbs.registerPartials(partialsDirectoryPath)

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Welcom to the Weather app',
        desc: 'Kudos to Node.js',
    });
});
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'Welcom to the About page',
        desc: 'Created by Tyrion404',
    });
});
app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Welcom to the Help page',
        desc: 'Contact us at tyrionsblood@gmail.com',
    });
});
app.get('/weather', (req, res)=>{
    if(!req.query.address)
        {
            return  res.send({error : `you must provide a address term`})
        }

    geocode.geocodeAddress(req.query.address, (errorMessage, results)=>{
            if(errorMessage)
            {
                res.send({errorMessage})
            }
            else
            {
                weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherresults)=>{
                    if(errorMessage)
                     {
                        res.send({error})
                     }
                     else
                     {
                        res.send({weatherresults})
                     }
                });
            }
        
        });
});
app.get('/what', (req, res)=>{
    
        
    // else{
    //     return  res.send({products: []})
    // }
});
app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        desc: 'Page not found!',
    })
});

app.listen(port, ()=>{
    console.log('Server is up on port: '+ port);
})