const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js');

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class KappaCommand extends Command {

	constructor() {
		super('kappa', {
			aliases: ['kappa'],
			category: 'Images',
			description: {
				usage: 'kappa',
				examples: ['kappa'],
				description: 'Returns kappa image.',
			},
			ratelimit: '3',
			cooldown: '3000',
		});
	}

	async exec(message) {
		const { url } = await ksoft.images.random('kappa');
		const embed = new MessageEmbed()
			.setTitle('Kappa')
			.setFooter('Powered by api.ksoft.si')
			.setTimestamp()
			.setImage(url)
			.setColor('RANDOM');
		message.channel.send(embed);
	}

}

module.exports = KappaCommand;
