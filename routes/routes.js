
// var cheerio = require('cheerio');

// require Schemas
var Page = require('../models/page.js');
var Note = require('../models/note.js');

module.exports = function(app){

    app.get('/', function(req, res) {
        res.send(index.html);
    });


    app.get('/scrape', function(req, res) {
        request('http://www.echojs.com/', function(error, response, html) {
            var $ = cheerio.load(html);
            $('article h2').each(function(i, element) {

                var result = {};

                result.title = $(this).children('a').text();
                result.link = $(this).children('a').attr('href');

                var entry = new Page (result);

                entry.save(function(err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(doc);
                    }
                });


            });
        });
        res.send("Scrape Complete");
    });


    app.get('/pages', function(req, res){
        Page.find({}, function(err, doc){
            if (err){
                console.log(err);
            } else {
                res.json(doc);
            }
        });
    });


    app.get('/pages/:id', function(req, res){
        Page.findOne({'_id': req.params.id})
            .populate('note')
            .exec(function(err, doc){
                if (err){
                    console.log(err);
                } else {
                    res.json(doc);
                }
            });
    });


    app.post('/pages/:id', function(req, res){
        var newNote = new Note(req.body);

        newNote.save(function(err, doc){
            if(err){
                console.log(err);
            } else {
                Page.findOneAndUpdate({'_id': req.params.id}, {'note':doc._id})
                    .exec(function(err, doc){
                        if (err){
                            console.log(err);
                        } else {
                            res.send(doc);
                        }
                    });

            }
        });
    });
};