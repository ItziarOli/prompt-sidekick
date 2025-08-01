#!/bin/bash
set -e

STACK_NAME="prompt-sidekick-v2"
TEMPLATE_FILE="infrastructure/template.yaml"
REGION="us-east-1"

echo "🏄‍♂️ Deploying PROMPT SIDEKICK Infrastructure..."

# Deploy CloudFormation stack
aws cloudformation deploy \
    --template-file $TEMPLATE_FILE \
    --stack-name $STACK_NAME \
    --capabilities CAPABILITY_IAM \
    --region $REGION \
    --no-fail-on-empty-changeset

# Get outputs
BUCKET_NAME=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --region $REGION \
    --query 'Stacks[0].Outputs[?OutputKey==`BucketName`].OutputValue' \
    --output text)

WEBSITE_URL=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --region $REGION \
    --query 'Stacks[0].Outputs[?OutputKey==`WebsiteURL`].OutputValue' \
    --output text)

CLOUDFRONT_URL=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --region $REGION \
    --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontURL`].OutputValue' \
    --output text)

echo "📤 Uploading website files..."
aws s3 sync . s3://$BUCKET_NAME \
    --region $REGION \
    --exclude "*.git*" \
    --exclude "infrastructure/*" \
    --exclude "*.zip" \
    --exclude "*.sh" \
    --exclude "node_modules/*" \
    --exclude "README.md"

echo "✅ Deployment Complete!"
echo "🌐 S3 Website URL: $WEBSITE_URL"
echo "⚡ CloudFront URL: $CLOUDFRONT_URL"
echo "📊 DynamoDB Table: prompt-sidekick-users"