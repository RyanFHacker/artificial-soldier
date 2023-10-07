const sequelize = require("../config/database");
const Games = require("../models/Games");
const Matches = require("../models/Matches");
const Subjects = require("../models/Subjects");
const Bounties = require("../models/Bounties");
const MatchOutcomes = require("../models/MatchOutcomes");

Games;
Matches;
Subjects;
Bounties;
MatchOutcomes;

sequelize.sync();
