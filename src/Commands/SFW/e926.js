const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const yiff = require('yiff');
const config = require('../../Config/yiff.config.js');


class E926Command extends Command {
	constructor() {
		super('e926', {
			aliases: ['e926'],
			category: 'SFW',
			args: [
				{
					id: 'tags',
					type: 'string',
					match: 'content',
				}],
			description: {
				usage: 'e926 [tags]',
				examples: ['e926', 'example2'],
				description: 'Example.',
			},
		});
	}

	async exec(message, args) {
		// eslint-disable-next-line prefer-const
		let e9 = new yiff.e926(config);
		if (!args.tags) return message.channel.send('No tags were specified');
		const { image, page, score, artist } = await e9.request(args.tags);

		const embed = new MessageEmbed()
			.setTitle('Source')
			.setURL(page)
			.setFooter(`Artist(s): ${artist} | Upvotes: ${score.up} | Downvotes: ${score.down} | Total Score: ${score.total}`)
			.setImage(image)
			.setColor('RANDOM');
		message.channel.send(embed);
	}
}

module.exports = E926Command;