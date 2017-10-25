const request = require('request');
const URL = 'https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/';
const mongojs = require('mongojs');
const db = mongojs('mongodb://rolando:rolando@ds117830.mlab.com:17830/soccer_app_db', ['leagues']);


class Routes {
    static setRoutes(app) {
        app.use('/api/leagues', Routes.getLeagues);
        app.use('/api/league/:league_slug', Routes.getLeague);
        app.use('/api/:league_slug/seasons/:season_slug', Routes.getLeagueScorers);
        app.use('/api/seasons/:league_slug', Routes.getSeasons);
    }


    static getLeagues(req, res) {

        db.leagues.find(function (err, leagues) {
            if (err) {
                res.send(err);
            } else {
                if (leagues.length === 0) {
                    request({
                        url: URL + 'leagues',
                        headers: {
                            'X-Mashape-Key': 'MvFdCo1lf9msh9xJnjlCGVjiXNufp179CZajsnABvSoi9vdYQJ',
                            'Accept': 'application/json'
                        }
                    }, (error, response) => {
                        if (error) {
                            throw new Error(error);
                        }
                        const arrayOfLeagues = JSON.parse(response.body).data.leagues;


                        db.leagues.save(arrayOfLeagues, function (err, result) {
                            if (err) {
                                res.send(err);
                            } else {
                                res.json(result);
                            }
                        });
                        // Save response.body to mongo before sending it to the ui

                        //res.send(response.body);
                    })
                } else {
                    res.json(leagues);
                }
            }
        });
    }

    static getLeague(req, res) {
        db.leagues.findOne({
            league_slug: req.params.league_slug
        }, function (err, league) {
            if (err) {
                res.send(err);
            } else {
                if (league.league_slug === null) {
                    request({
                        url: URL + 'leagues/' + req.params.league_slug,
                        headers: {
                            'X-Mashape-Key': 'x2l0pN8e5Mmsh5YEdqH6UxwP8CX0p11iro6jsnufrIxDLIu5mN',
                            'Accept': 'application/json'
                        }
                    }, (error, response) => {
                        if (error) {
                            throw new Error(error);
                        }
                        res.json(response);
                    })
                } else {
                    res.json(league);
                }

            }
        });
    }


    static getLeagueScorers(req, res) {
        //key the parameters passed in the request
        const key = req.params.league_slug + req.params.season_slug;

        db.topscorers.findOne({key},
            function (err, topscorers) {
                if (err) {
                    res.send(err);
                } else {
                    if (!topscorers || !topscorers.key) {
                        request({
                            url: URL + 'leagues/' + req.params.league_slug + '/seasons/' + req.params.season_slug + '/topscorers',
                            headers: {
                                'X-Mashape-Key': 'x2l0pN8e5Mmsh5YEdqH6UxwP8CX0p11iro6jsnufrIxDLIu5mN',
                                'Accept': 'application/json'
                            }
                        }, (error, response) => {
                            if (error) {
                                throw new Error(error);
                            }
                            const arrayOfTopscorers = JSON.parse(response.body).data;
                            arrayOfTopscorers.key = key;

                            db.topscorers.save(arrayOfTopscorers, function (err, result) {
                                if (err) {
                                    res.send(err);
                                } else {
                                    res.json(result.topscorers);
                                }
                            });

                        })
                    } else {
                        res.json(topscorers.topscorers);
                    }
                }
            });
    }

    static getSeasons(req, res){
        db.seasons.find(function(err, seasons){
            if(err){
                res.send(err);
            }else{
                if(seasons.length === 0){
                    request({
                        url: URL + 'leagues/' + req.params.league_slug + '/seasons',
                        headers: {
                            'X-Mashape-Key': 'x2l0pN8e5Mmsh5YEdqH6UxwP8CX0p11iro6jsnufrIxDLIu5mN',
                            'Accept': 'application/json'
                        }
                    }, (error, response)=>{
                        if(error){
                            throw new Error(error);
                        }
                        const arrayOfSeasons = JSON.parse(response.body).data.seasons;
                        db.seasons.save(arrayOfSeasons, function(err, result){
                            if(err){
                                res.send(err);
                            }else{
                                res.json(result);
                            }
                        });
                    })
                }else{
                    res.json(seasons);
                }
            }
        });
    }

}


module.exports = Routes;