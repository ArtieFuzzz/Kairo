/* eslint-disable no-undef */
const { Command } = require('discord-akairo');
const { DiscordSnowflake } = require('@sapphire/snowflake');
const { MessageEmbed } = require('discord.js');

class SnowFlakeCommand extends Command {

	constructor() {
		super('snowflake', {
			aliases: ['snowflake', 'genflake', 'gensnowflake', 'gsf'],
			category: 'Owner',
			description: {
				usage: 'snowflake',
				examples: ['snowflake', 'genflake', 'gensnowflake'],
				description: 'Generates a discord snowflake (Not a real discord snowflake but can deconstruct one).',
			},
			ownerOnly: true,
			args: [
				{
					id: 'snowflake',
					type: 'string',
					match: 'content',
				} ],
		});
	}

	async exec(message, args) {
		if (!args.snowflake) {
			const snowflake = DiscordSnowflake.generate();
			const flake = DiscordSnowflake.deconstruct(snowflake);

			const embed = new MessageEmbed()
				.setTitle('SnowFlake Generated!')
				.addFields(
					{ name: 'SnowFlake', value: flake.id },
					{ name: 'Timestamp', value: flake.timestamp },
					{ name: 'WorkerID', value: flake.workerID },
					{ name: 'ProcessID', value: flake.processID },
					{ name: 'Epoch', value: flake.epoch },
				)
				.setFooter('Use this to convert your Timestamp: https://www.epochconverter.com/');
			return message.channel.send(embed);
		}
		else if (args.snowflake) {
			const flake = DiscordSnowflake.deconstruct(args.snowflake);

			const embed = new MessageEmbed()
				.setTitle('SnowFlake Deconstructed!')
				.addFields(
					{ name: 'SnowFlake', value: flake.id },
					{ name: 'Timestamp', value: flake.timestamp },
					{ name: 'WorkerID', value: flake.workerID },
					{ name: 'ProcessID', value: flake.processID },
					{ name: 'Epoch', value: flake.epoch },
				)
				.setFooter('Use this to convert your Timestamp: https://www.epochconverter.com/');
			message.channel.send(embed);
		}
	}

}

module.exports = SnowFlakeCommand;
