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
        app.use('/api/standings/:league_slug/:season_slug', Routes.getStandings);
        app.use('/api/rounds/:league_slug/:season_slug', Routes.getRounds);
        app.use('/api/referees/:league_slug/:season_slug', Routes.getReferees);
        app.use('/api/teams/:league_slug/:season_slug/:team_name', Routes.getTeams);
        app.use('/api/roundMatches/:league_slug/:season_slug/:round_slug', Routes.getRoundMatches);
        app.use('/api/teamPlayers/:league_slug/:season_slug/:team_slug', Routes.getTeamPlayers);
        app.use('/api/teamMatches/:league_slug/:season_slug/:team_identifier', Routes.getTeamMatches);
        app.use('/api/player/:league_slug/:season_slug/:player_identifier', Routes.getPlayer);
        app.use('/api/teamPlayer/:league_slug/:season_slug/:team_slug/:player_identifier', Routes.getPlayerFromTeam);
        app.use('/api/match/:league_slug/:season_slug/:round_slug/:match_slug', Routes.getSpecifiedMatch);
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

    static getSeasons(req, res) {
        db.seasons.find(function (err, seasons) {
            if (err) {
                res.send(err);
            } else {
                if (seasons.length === 0) {
                    request({
                        url: URL + 'leagues/' + req.params.league_slug + '/seasons',
                        headers: {
                            'X-Mashape-Key': 'x2l0pN8e5Mmsh5YEdqH6UxwP8CX0p11iro6jsnufrIxDLIu5mN',
                            'Accept': 'application/json'
                        }
                    }, (error, response) => {
                        if (error) {
                            throw new Error(error);
                        }
                        const arrayOfSeasons = JSON.parse(response.body).data.seasons;
                        db.seasons.save(arrayOfSeasons, function (err, result) {
                            if (err) {
                                res.send(err);
                            } else {
                                res.json(result);
                            }
                        });
                    })
                } else {
                    res.json(seasons);
                }
            }
        });
    }

    static getStandings(req, res) {
        const key = req.params.league_slug + req.params.season_slug;

        db.standings.findOne({key},
            function (err, standings) {
                if (err) {
                    res.send(err);
                } else {
                    if (!standings || !standings.key) {
                        request({
                            url: URL + 'leagues/' + req.params.league_slug + '/seasons/' + req.params.season_slug + '/standings',
                            headers: {
                                'X-Mashape-Key': 'x2l0pN8e5Mmsh5YEdqH6UxwP8CX0p11iro6jsnufrIxDLIu5mN',
                                'Accept': 'application/json'
                            }
                        }, (error, response) => {
                            if (error) {
                                throw new Error(error);
                            }
                            const arrayOfStandings = JSON.parse(response.body).data;
                            arrayOfStandings.key = key;

                            db.standings.save(arrayOfStandings, function (err, result) {
                                if (err) {
                                    res.send(err);
                                } else {
                                    res.json(result.standings)
                                }
                            });
                        })
                    } else {
                        res.json(standings.standings);
                    }
                }
            });
    }

    static getRounds(req, res) {
        const key = req.params.league_slug + req.params.season_slug;

        db.rounds.findOne({key},
            function (err, rounds) {
                if (err) {
                    res.send(err);
                } else {
                    if (!rounds || !rounds.key) {
                        request({
                            url: URL + 'leagues/' + req.params.league_slug + '/seasons/' + req.params.season_slug + '/rounds',
                            headers: {
                                'X-Mashape-Key': 'x2l0pN8e5Mmsh5YEdqH6UxwP8CX0p11iro6jsnufrIxDLIu5mN',
                                'Accept': 'application/json'
                            }
                        }, (error, response) => {
                            if (error) {
                                throw new Error(error);
                            }
                            const arrayOfRounds = JSON.parse(response.body).data;
                            arrayOfRounds.key = key;

                            db.rounds.save(arrayOfRounds, function (err, result) {
                                if (err) {
                                    res.send(err);
                                } else {
                                    res.json(result.rounds)
                                }
                            });
                        })
                    } else {
                        res.json(rounds.rounds);
                    }
                }
            });
    }

    static getReferees(req, res) {
        const key = req.params.league_slug + req.params.season_slug;

        db.referees.findOne({key},
            function (err, referees) {
                if (err) {
                    res.send(err);
                } else {
                    if (!referees || !referees.key) {
                        request({
                            url: URL + 'leagues/' + req.params.league_slug + '/seasons/' + req.params.season_slug + '/referees',
                            headers: {
                                'X-Mashape-Key': 'x2l0pN8e5Mmsh5YEdqH6UxwP8CX0p11iro6jsnufrIxDLIu5mN',
                                'Accept': 'application/json'
                            }
                        }, (error, response) => {
                            if (error) {
                                throw new Error(error);
                            }
                            const arrayOfReferees = JSON.parse(response.body).data;
                            arrayOfReferees.key = key;

                            db.referees.save(arrayOfReferees, function (err, result) {
                                if (err) {
                                    res.send(err);
                                } else {
                                    res.json(result.referees)
                                }
                            });
                        })
                    } else {
                        res.json(referees.referees);
                    }
                }
            });
    }

    static getTeams(req, res) {
        const key = req.params.league_slug + req.params.season_slug;
        const teamName = req.params.team_name;

        db.teams.findOne({key},
            function (err, teams) {
                if (err) {
                    res.send(err);
                } else {
                    if (!teams || !teams.key) {
                        request({
                            url: URL + 'leagues/' + req.params.league_slug + '/seasons/' + req.params.season_slug + '/teams',
                            headers: {
                                'X-Mashape-Key': 'x2l0pN8e5Mmsh5YEdqH6UxwP8CX0p11iro6jsnufrIxDLIu5mN',
                                'Accept': 'application/json'
                            }
                        }, (error, response) => {
                            if (error) {
                                throw new Error(error);
                            }
                            const arrayOfTeams = JSON.parse(response.body).data;
                            arrayOfTeams.key = key;

                            db.teams.save(arrayOfTeams, function (err, result) {
                                if (err) {
                                    res.send(err);
                                } else {
                                    res.json(result.teams.filter(team => (team.name === teamName)));
                                }
                            });
                        })
                    } else {
                        res.json(teams.teams.filter(team => (team.name === teamName)));
                    }
                }
            });
    }


    static getRoundMatches(req, res) {
        const key = req.params.league_slug + req.params.season_slug + req.params.round_slug;

        db.round_matches.findOne({key},
            function (err, roundMatches) {
                if (err) {
                    res.send(err);
                } else {
                    if (!roundMatches || !roundMatches.key) {
                        request({
                            url: URL + 'leagues/' + req.params.league_slug + '/seasons/' + req.params.season_slug + '/rounds/' + req.params.round_slug + '/matches',
                            headers: {
                                'X-Mashape-Key': 'x2l0pN8e5Mmsh5YEdqH6UxwP8CX0p11iro6jsnufrIxDLIu5mN',
                                'Accept': 'application/json'
                            }
                        }, (error, response) => {
                            if (error) {
                                throw new Error(error);
                            }
                            const arrayOfMatches = JSON.parse(response.body).data;
                            arrayOfMatches.key = key;

                            db.round_matches.save(arrayOfMatches, function (err, result) {
                                if (err) {
                                    res.send(err);
                                } else {
                                    res.json(result.matches);
                                }
                            });
                        })
                    } else {
                        res.json(roundMatches.matches);
                    }
                }
            });
    }

    static getTeamPlayers(req, res) {
        const key = req.params.league_slug + req.params.season_slug + req.params.team_slug;

        db.team_players.findOne({key},
            function (err, teamPlayers) {
                if (err) {
                    res.send(err);
                } else {
                    if (!teamPlayers || !teamPlayers.key) {
                        request({
                            url: URL + 'leagues/' + req.params.league_slug + '/seasons/' + req.params.season_slug + '/teams/' + req.params.team_slug + '/players',
                            headers: {
                                'X-Mashape-Key': 'x2l0pN8e5Mmsh5YEdqH6UxwP8CX0p11iro6jsnufrIxDLIu5mN',
                                'Accept': 'application/json'
                            }
                        }, (error, response) => {
                            if (error) {
                                throw new Error(error);
                            }
                            const arrayOfPlayers = JSON.parse(response.body).data;
                            arrayOfPlayers.key = key;

                            db.team_players.save(arrayOfPlayers, function (err, result) {
                                if (err) {
                                    res.send(err)
                                } else {
                                    res.json(result.players);
                                }
                            });
                        })
                    } else {
                        res.json(teamPlayers.players);
                    }
                }
            });
    }

    static getTeamMatches(req, res) {
        const key = req.params.league_slug + req.params.season_slug + req.params.team_identifier;

        db.team_matches.findOne({key},
            function (err, teamMatches) {
                if (err) {
                    res.send(err);
                } else {
                    if (!teamMatches || !teamMatches.key) {
                        request({
                            url: URL + 'leagues/' + req.params.league_slug + '/seasons/' + req.params.season_slug + '/rounds?team_identifier=' + req.params.team_identifier,
                            headers: {
                                'X-Mashape-Key': 'x2l0pN8e5Mmsh5YEdqH6UxwP8CX0p11iro6jsnufrIxDLIu5mN',
                                'Accept': 'application/json'
                            }
                        }, (error, response) => {
                            if (error) {
                                throw new Error(error);
                            }
                            const arrayOfMatches = JSON.parse(response.body).data;
                            arrayOfMatches.key = key;

                            db.team_matches.save(arrayOfMatches, function (err, result) {
                                if (err) {
                                    res.send(err)
                                } else {
                                    res.json(result.rounds);
                                }
                            });
                        })
                    } else {
                        res.json(teamMatches.rounds);
                    }
                }
            });
    }

    static getPlayer(req, res) {
        const key = req.params.league_slug + req.params.season_slug;
        const playerIdentifier = req.params.player_identifier;

        db.topscorers.findOne({key},
            function (err, topscorersList) {
                if (err) {
                    res.send(err);
                } else {
                    if (topscorersList.key) {
                        res.json(topscorersList.topscorers.filter(player => (player.player_identifier === playerIdentifier)));
                    }
                }
            });
    }

    static getPlayerFromTeam(req, res) {
        const key = req.params.league_slug + req.params.season_slug + req.params.team_slug;
        const playerIdentifier = req.params.player_identifier;

        db.team_players.findOne({key},
            function (err, teamPlayers) {
                if (err) {
                    res.send(err);
                } else {
                    if (!teamPlayers || !teamPlayers.key) {
                        request({
                            url: URL + 'leagues/' + req.params.league_slug + '/seasons/' + req.params.season_slug + '/teams/' + req.params.team_slug + '/players',
                            headers: {
                                'X-Mashape-Key': 'x2l0pN8e5Mmsh5YEdqH6UxwP8CX0p11iro6jsnufrIxDLIu5mN',
                                'Accept': 'application/json'
                            }
                        }, (error, response) => {
                            if (error) {
                                throw new Error(error);
                            }
                            const arrayOfPlayers = JSON.parse(response.body).data;
                            arrayOfPlayers.key = key;

                            db.team_players.save(arrayOfPlayers, function (err, result) {
                                if (err) {
                                    res.send(err)
                                } else {
                                    res.json(result.players.filter(player => (player.identifier === playerIdentifier)));
                                }
                            });
                        })
                    } else {
                        res.json(teamPlayers.players.filter(player => (player.identifier === playerIdentifier)));
                    }
                }
            });
    }

    static getSpecifiedMatch(req, res) {
        //key the parameters passed in the request
        const key = req.params.league_slug + req.params.season_slug + req.params.round_slug + req.params.match_slug;

        db.match.findOne({key},
            function (err, match) {
                if (err) {
                    res.send(err);
                } else {
                    if (!match || !match.key) {
                        request({
                            url: URL + 'leagues/' + req.params.league_slug + '/seasons/' + req.params.season_slug + '/rounds/' + req.params.round_slug + '/matches/' + req.params.match_slug,
                            headers: {
                                'X-Mashape-Key': 'x2l0pN8e5Mmsh5YEdqH6UxwP8CX0p11iro6jsnufrIxDLIu5mN',
                                'Accept': 'application/json'
                            }
                        }, (error, response) => {
                            if (error) {
                                throw new Error(error);
                            }
                            const matchDetails = JSON.parse(response.body).data;
                            matchDetails.key = key;

                            db.match.save(matchDetails, function (err, result) {
                                if (err) {
                                    res.send(err);
                                } else {
                                    res.json(result.matches);
                                }
                            });

                        })
                    } else {
                        res.json(match.matches);
                    }
                }
            });
    }
}


module.exports = Routes;