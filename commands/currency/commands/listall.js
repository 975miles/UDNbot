var requireDir = require('require-dir');
var functions = requireDir("../../../functions", {recurse: true});
var fs=require('fs');

module.exports = {
	"d":"List all employees of a user.",
	"a":["@user"],
	"g":"e",
	"f":function (msg, bot, args, bal) {
		var output = "";
		var lsit = [];
		for (i in bal.currency[msg.guild.id].bank){
			lsit.push([bal.currency[msg.guild.id].bank[i].bal,bal.currency[msg.guild.id].bank[i].name]);
		}
		lsit.sort();
		lsit.reverse();
		for (var i = 0; i < lsit.length; i++){
			output = output + "Balance of " + lsit[i][1] + ": **" + bal.currency[msg.guild.id].config.sym + lsit[i][0] + "**\n";
		}
		if (output.length > 1995) {
			fs.writeFile('all.txt', output);
			msg.channel.send("Here it is, I guess.", {file: 'all.txt'});
		}	
		else {
			msg.channel.send(output);
		}
		return bal;
	}
}