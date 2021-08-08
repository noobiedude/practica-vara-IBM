const { cos } = require('../config/ibmCosConfig');
const BUCKET_NAME = `summerinternship`;

const getFile = (name) => {
    const object =  cos.getObject({
        Bucket: BUCKET_NAME,
        Key: `${name}.jpg`
    })
    return object.createReadStream();
}

module.exports = {getFile};