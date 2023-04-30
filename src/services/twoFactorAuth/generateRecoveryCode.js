const crypto = require('crypto');

//Generate array of 3 random recovery codes

const GenerateRecoveryCodes = () => {
    const recoveryCodes = [];

    for(let i=0; i<3;i++){
        const code = crypto.randomBytes(32).toString('hex');
        recoveryCodes.push(code);
    }
    //convert recoveryCodes array into string
    return recoveryCodes.toString();
}

module.exports = GenerateRecoveryCodes