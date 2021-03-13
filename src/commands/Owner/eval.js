/* eslint-disable complexity */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-mixed-operators */
const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { inspect } = require('util');
const { Stopwatch } = require('@sapphire/stopwatch');
const prefix = process.env.PREFIX;

class EvalCommand extends Command {

	constructor() {
		super('eval', {
			aliases: ['eval', 'e', 'ev', 'evaluate'],
			ownerOnly: true,
			category: 'Owner',
			description: {
				usage: 'eval <code>',
				examples: ['eval console.log(\'hello!\')', 'eval this.client.token'],
				description: 'Evaluate javascript with the bot',
			},
		});
	}

	exec(message) {
		const embed = new MessageEmbed()
			.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));

		const args = message.content.slice(prefix.length).trim()
			// eslint-disable-next-line require-unicode-regexp
			.split(/ +/g); args.shift();
		const query = args.join(' ');
		// eslint-disable-next-line no-shadow
		const code = (lang, code) => `\`\`\`${lang}\n${String(code).slice(0, 1000) + (code.length >= 1000 ? '...' : '')}\n\`\`\``.replace(this.client.token, 'Uh oh! I can\'t do that!');
		const stopwatch = new Stopwatch();

		if (!query) {
			message.channel.send('Please, write something so I can evaluate!');
		}
		else {
			try {
				// eslint-disable-next-line no-eval
				const time = stopwatch.toString();
				const evald = eval(query);
				const res = typeof evald === 'string' ? evald : inspect(evald, { depth: 0 });

				embed.addField('Result', code('js', res));


				stopwatch.stop();
				embed.addField('Time ⏱', time);
				if (!Boolean(res) || !Boolean(evald) && evald !== 0) {
					embed.setColor('RED');
				}
				else {
					embed
						.addField('Type', code('css', typeof evald))
						.setColor('GREEN');
				}
			}
			catch (error) {
				embed
					.addField('Error', code('js', error))
					.addField('Time ⏱', stopwatch.stop().toString())
					.setColor('RED');
			}
			finally {
				message.channel.send(embed).catch(error => {
					message.channel.send(`There was an error while displaying the eval result! ${error.message}`);
				});
			}
		}
	}

}

module.exports = EvalCommand;
