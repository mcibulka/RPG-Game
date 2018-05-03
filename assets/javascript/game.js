window.onload = function() {
    $("#attack-button").click(game.attack);
};


// Global Variables
var $teams = $("#team-selection");
var $opponentSelection = $("#opponent-selection");
var startGame = false;
var opponentSel = false;
var remainingOpps = 3;

// Array indices align with how teams are structured in HTML
var allTeams = ["Toronto Maple Leafs", "Boston Bruins", "Winnipeg Jets", "Nashville Predators"];
var allImgs = ["TML-logo-225x225.png", "BB-logo-225x225.png", "WJ-logo-225x225.png", "NP-logo-225x225.png"];
var allHealth = [80, 90, 105, 95];
var allAttack = [12, 8, 10, 6];
var allCounter = [14, 10, 12, 8];


var game = {
    oppNames: [],
    oppImgs: [],
    oppHealth: [],
    oppCounter: [],
    currOpp: 0,

    $playerTeamName: $("#player-team-name"),
    $playerImg: $("#player-img"),
    $playerHealth: $("#player-health"),

    pHealth: 0,
    pAttack: 0,
    baseAttack: 0,


    attack: function () {
        game.oppHealth[game.currOpp] -= game.pAttack;
        $("#opponent" + (game.currOpp + 1) + "-health").text("Health: " + game.oppHealth[game.currOpp]);

        if (game.oppHealth[game.currOpp] <= 0) {
            $("#opponent" + (game.currOpp + 1) + "-health").text("DEFEATED");
            $("#opponent" + (game.currOpp + 1) + "-health").css("color", "red");
            $("#opponent" + (game.currOpp + 1)).css("border-color", "green");
            remainingOpps--;
        }
        
        if (remainingOpps === 0) {
            alert("Congratulations, you win!");
            game.$playerHealth.text("WINNER");
            game.$playerHealth.css("color", "green");
        }
        else {
            game.pHealth -= game.oppCounter[game.currOpp];
            game.$playerHealth.text("Health: " + game.pHealth)

            game.pAttack += game.baseAttack;
            opponentSel = false;
        }

        if (game.pHealth <= 0) {
            alert("You lost!");
            game.$playerHealth.text("DEFEATED");
            game.$playerHealth.css("color", "red");
        }
    },


    initialise: function (playerTeam, playerHealth, playerImg, playerAttack) {
        this.$playerTeamName.text(playerTeam);
        this.$playerImg.attr("src", "assets/images/" + playerImg)
        this.$playerHealth.text("Health: " + playerHealth);

        this.pAttack = playerAttack;
        this.pHealth = playerHealth;
        this.baseAttack = playerAttack;

        for (var i = 0 ; i < allTeams.length ; i++) {
            if (allTeams[i] !== playerTeam) {
                this.oppNames.push(allTeams[i]);
                this.oppImgs.push(allImgs[i]);
                this.oppHealth.push(allHealth[i]);
                this.oppCounter.push(allCounter[i]);  
            }
        }

        for (var i = 0 ; i < 3 ; i++) {
            // add 1 to index since opponent IDs use 1, 2, 3 naming convention
            $("#opponent" + (i + 1) + "-name").text(this.oppNames[i]);  
            $("#opponent" + (i + 1) + "-img").attr("src", "assets/images/" + this.oppImgs[i]);
            $("#opponent" + (i + 1) + "-health").text("Health: " + this.oppHealth[i]);
        }

        $("#instructions").text("Select An Opponent");
        $("#team-selection").hide();

        $("#game-subheading").removeAttr("hidden");
        $("#opponent-selection").removeAttr("hidden");
        $("#attack-button").removeAttr("hidden");
    },


    selectOpponent: function(opponent, id) {
        game.currOpp = id;
        $("#" + opponent).css("border", "1.5pt solid red");
    }
};


$teams.on("click", ".team-img", function() {
    var name = ($(this).attr("data-name"));
    var health = parseInt( ($(this).attr("data-health")) );
    var img = ($(this).attr("data-img"));
    var attack = parseInt( ($(this).attr("data-attack")) )

    if (!startGame) {
        game.initialise(name, health, img, attack);
        startGame = true;
    }
});


$opponentSelection.on("click", ".opponent-img", function () {
    var id = $(this).attr("data-div-id");
    var oppIndex = parseInt($(this).attr("data-opp-index"));

    if (!opponentSel) {
        game.selectOpponent(id, oppIndex);
        opponentSel = true;
    }
});

