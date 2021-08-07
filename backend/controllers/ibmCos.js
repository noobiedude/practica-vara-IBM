const { cos } = require('../config/ibmCosConfig');
const BUCKET_NAME = `summerinternship`;

const getFile = (name) => {
    return cos.getObject({
        Bucket: BUCKET_NAME,
        Key: name
    }).createReadStream();
}

module.exports = {getFile};