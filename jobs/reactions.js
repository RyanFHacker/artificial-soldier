module.exports = {
    cronTime: "* * * * *",
	// Send a message in a channel from config
    onTick: function () {
      console.log("You will see this message every minute");
    },
	onComplete: null,
	start: false
  };