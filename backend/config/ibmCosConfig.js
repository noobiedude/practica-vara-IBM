const ibm  = require('ibm-cos-sdk');

const MANAGER_CREDENTIALS = {
  "apikey": "SR-yRIyLPqYpk5MuaPGkWBcV0f1wjYeV4e9br9JUi_VY",
  "apiKeyId": `d5aa7c16-04a4-49d3-9b14-99169a8479e1`,
  "endpoints": "https://control.cloud-object-storage.cloud.ibm.com/v2/endpoints",
  "iam_apikey_description": "Auto-generated for key d5aa7c16-04a4-49d3-9b14-99169a8479e1",
  "endpoint": "s3.eu-de.cloud-object-storage.appdomain.cloud",
  "iam_apikey_name": "Service credentials-1",
  "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
  "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/eff525d4f66a4f8ab86418f09a8552e2::serviceid:ServiceId-d0e26fd4-3723-4dd1-b903-ffdd11d04b29",
  "resource_instance_id": "crn:v1:bluemix:public:cloud-object-storage:global:a/eff525d4f66a4f8ab86418f09a8552e2:374a26be-7270-48c7-bb81-a28d956f5a31::",
 }

const config = {
  "endpoint": MANAGER_CREDENTIALS.endpoint,
  "apiKeyId": MANAGER_CREDENTIALS.apikey,
  serviceInstanceId: MANAGER_CREDENTIALS.iam_serviceid_crn
}
const cos = new ibm.S3(config);
console.log(`connected to IBM cloud!`);

module.exports = { cos };