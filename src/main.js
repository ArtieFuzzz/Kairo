const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler, Command } = require('discord-akairo');
require('dotenv').config()

class KairoClient extends AkairoClient {
    constructor() {
        super({
           ownerID: process.env.OWNERID,
        }, {
            disableMentions: 'everyone'
        });
        this.commandHandler = new CommandHandler(this, {
            directory: './src/commands/',
            prefix: process.env.PREFIX,
            handleEdits: true,
            commandUtil: true,
            classToHandle: Command,
            argumentDefaults: {
                prompt: {
                    modifyStart: (message, str) => `${message.author}, ${str}\n\nType: \`cancel\` to cancel the command...`,
                    modifyRetry: (message, str) => `${message.author}, ${str}\n\nType: \`cancel\` to cancel the command...`,
                    cancel: `You have cancelled the command successfully.`,
                    timeout: 'Your time has ran out. Command was cancelled...',
                    ended: 'You took too many tries. Command was cancelled...',
                    retries: 4,
                    time: 30000,
                },
                otherwise: ""
            },
                    ignoreCooldown: this.ownerID,
                    ignorePermissions: this.ownerID,
                    automateCategories: true,
                    defaultCooldown: 2000,
                    commandUtilLifetime: 300000,
        });
        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: './src/inhibitors/'
        });
        this.listenerHandler = new ListenerHandler(this, {
            directory: './src/listeners/'
        });
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.commandHandler.loadAll();
        this.inhibitorHandler.loadAll();
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            process: process
        });
        this.listenerHandler.loadAll();
    }
}

const client = new KairoClient();
client.login(process.env.TOKEN);