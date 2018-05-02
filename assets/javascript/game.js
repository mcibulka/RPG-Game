window.onload = function() {
    $("#attack-button").click(game.attack);
};

/* Global Variables */
var $teams = $("#team-selection");
var startGame = false;

var allTeams = ["Toronto Maple Leafs", "Boston Bruins", "Winnipeg Jets", "Nashville Predators"];
var allImgs = ["TML-logo-225x225.png", "BB-logo-225x225.png", "WJ-logo-225x225.png", "NP-logo-225x225.png"];
var allHealth = [80, 90, 105, 95];


var game = {
    oppNames: [],
    oppImgs: [],
    oppHealth: [],

    $playerTeamName: $("#player-team-name"),
    $playerImg: $("#player-img"),
    $playerHealth: $("#player-health"),


    attack: function () {
        console.log("ATTACK");
    },


    initialise: function (playerTeam, playerHealth, playerImg) {
        this.$playerTeamName.text(playerTeam);
        this.$playerImg.attr("src", "assets/images/" + playerImg)
        this.$playerHealth.text("Health: " + playerHealth);

        var oppIndex = 0;

        for (var i = 0 ; i < allTeams.length ; i++) {
            if (allTeams[i] !== playerTeam) {
                this.oppNames.push(allTeams[i]);
                this.oppImgs.push(allImgs[i]);
                this.oppHealth.push(allHealth[i]);    
            }
        }

        for (var i = 0 ; i < 3 ; i++) {
            // add 1 to index since opponent IDs use 1, 2, 3 naming convention
            $("#opponent" + (i + 1) + "-name").text(this.oppNames[i]);  
            $("#opponent" + (i + 1) + "-img").attr("src", "assets/images/" + this.oppImgs[i]);
            $("#opponent" + (i + 1) + "-health").text("Health: " + this.oppHealth[i]);
        }

        $("#choose-team").hide();
        $("#team-selection").hide();
    }
};


$teams.on("click", ".team-img", function() {
    var name = ($(this).attr("data-name"));
    var health = parseInt( ($(this).attr("data-health")) );
    var img = ($(this).attr("data-img"));

    if (!startGame) {
        game.initialise(name, health, img);
        startGame = true;
    }
});


