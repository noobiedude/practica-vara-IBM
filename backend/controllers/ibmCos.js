const { cos } = require('../config/ibmCosConfig');
const BUCKET_NAME = `summerinternship`;

const getFile = (name) => {
    const object =  cos.getObject({
        Bucket: BUCKET_NAME,
        Key: `${name}.jpg`
    })
    return object.createReadStream();
}

const uploadFile = (name, file) => {
    return cos.putObject({
        Bucket: BUCKET_NAME,
        Key: name,
        Body: file
    }).promise();
}

module.exports = {getFile, uploadFile};