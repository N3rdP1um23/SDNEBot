/**
 *
 * N3rdP1um23
 * November 17, 2020
 * The following file is used to handle displaying the current version of the bot
 *
 */

// Import the requried items
import * as Discord from 'discord.js';
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

/**
 *
 * The following function is used to handle displaying the version info
 *
 * @param message: is the message to handle
 *
 */
export async function displayVersionDetails(message: Discord.Message) {
    // Grab the required variables
    var repo_url = await exec('git config --get remote.origin.url');
    let current_commit_hash = await exec('git rev-parse HEAD');
    var repo_status = await exec('git status -uno');
    let last_update = await exec('git log -1 --format=%cd ');

    // Format the respective variables
    repo_url = repo_url.stdout.replace('.git', '').replace('\n', '');
    repo_status = repo_status.stdout.split('\n')[1];

    // Formulate the version embed
    let version_embed = {
        embed: {
            title: `SDNE Version Info`,
            url: `${repo_url}/commits/${current_commit_hash.stdout}`,
            description: `The following will display some version information of the SDNE bot.`,
            color: 4886754,
            footer: {
                text: "SDNE Bot - Version Info"
            },
            fields: [
                {
                    name: "Status",
                    value: `\`\`\`${repo_status}\`\`\``,
                },
                {
                    name: "Latest Update",
                    value: `\`\`\`${last_update.stdout}\`\`\``,
                }
            ]
        }
    };

    // Send the version embed to the channel that the respective message was from
    message.channel.send(version_embed);
}