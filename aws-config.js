// AWS SDK Configuration
AWS.config.update({
    region: 'us-east-1',
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:YOUR_IDENTITY_POOL_ID' // Replace with actual Identity Pool ID
    })
});

// DynamoDB configuration
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'prompt-sidekick-users';

// Utility function to generate user ID
function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}