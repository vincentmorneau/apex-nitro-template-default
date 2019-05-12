const spawn = require('cross-spawn');

/**
 * @exports build
 */
module.exports = build;

/**
 * @function build
 * @returns {PromiseLike}
 * @description Entry point for building the project in production mode
 */
function build() {
    return new Promise((resolve, reject) => {
        let command;

        command = 'npm run build';

        const child = spawn(command, [], { stdio: 'inherit' });
        child.on('close', code => {
            if (code !== 0) {
                reject({
                    command: `${command} ${args.join(' ')}`,
                });
                return;
            }
            resolve('done');
        });
    });
}
