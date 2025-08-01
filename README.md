# 🏄‍♂️ PROMPT SIDEKICK

**AI-powered browser extension landing page with complete AWS infrastructure deployment**

A modern, responsive landing page featuring a surfer theme with animated waves, glassmorphism design, and full AWS cloud infrastructure. Built with Infrastructure as Code (IaC) for scalable, secure, and professional deployment.

![Surfer Theme](https://img.shields.io/badge/Theme-Surfer%20🏄‍♂️-blue)
![AWS](https://img.shields.io/badge/AWS-CloudFormation-orange)
![Infrastructure](https://img.shields.io/badge/Infrastructure-as%20Code-green)

## 🌊 Project Overview

PROMPT SIDEKICK is a complete web application showcasing modern web development practices with cloud-native architecture. The project demonstrates:

- **Modern Frontend**: Responsive design with CSS animations and glassmorphism effects
- **Cloud Architecture**: Serverless infrastructure using AWS managed services
- **Infrastructure as Code**: Complete automation with CloudFormation
- **Security Best Practices**: CloudFront OAC, secure S3 access, and proper IAM roles
- **Scalability**: Auto-scaling DynamoDB and global CDN distribution

## 🎨 Landing Page Features

### Visual Design
- **Surfer Theme**: Ocean-inspired design with animated wave backgrounds
- **Glassmorphism UI**: Modern frosted glass effects for forms and cards
- **Responsive Layout**: Mobile-first design that works on all devices
- **Smooth Animations**: CSS keyframe animations for engaging user experience

### Functionality
- **Dual Authentication Forms**: Sign-in and sign-up with tab switching
- **Real-time Validation**: Client-side form validation with user feedback
- **DynamoDB Integration**: Secure user data storage with AWS SDK
- **Smooth Navigation**: Scroll-to-section navigation with smooth scrolling
- **Error Handling**: Graceful error handling with user-friendly messages

### User Experience
- **Progressive Enhancement**: Works without JavaScript, enhanced with it
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Performance**: Optimized assets and CDN delivery
- **Cross-browser**: Compatible with all modern browsers

## 🏗️ Infrastructure Components

### Core AWS Services

#### 🗄️ **Amazon DynamoDB**
- **Purpose**: User data storage and management
- **Configuration**: 
  - Table Name: `prompt-sidekick-users`
  - Primary Key: `userId` (String)
  - Billing Mode: Pay-per-request (serverless)
  - Point-in-time Recovery: Enabled
- **Data Schema**:
  ```json
  {
    "userId": "user_1234567890_abc123def",
    "email": "user@example.com",
    "signupDate": "2024-01-15T10:30:00.000Z",
    "membership": "free"
  }
  ```

#### 🪣 **Amazon S3**
- **Purpose**: Static website hosting and asset storage
- **Configuration**:
  - Website hosting enabled
  - CORS configured for cross-origin requests
  - Private bucket (accessed via CloudFront only)
  - Automatic index.html serving
- **Security**: No public access, secured via CloudFront OAC

#### ⚡ **Amazon CloudFront**
- **Purpose**: Global CDN for fast content delivery and HTTPS
- **Features**:
  - Global edge locations for low latency
  - Automatic HTTPS certificate
  - Origin Access Control (OAC) for S3 security
  - Custom error pages (404 → index.html for SPA routing)
  - Gzip compression enabled
- **Performance**: PriceClass_100 (US, Canada, Europe)

#### 🔐 **Security Architecture**
- **Origin Access Control**: CloudFront-only access to S3 bucket
- **IAM Policies**: Least-privilege access principles
- **HTTPS Enforcement**: All traffic redirected to HTTPS
- **CORS Configuration**: Controlled cross-origin access

### Infrastructure Diagram
```
┌─────────────┐    HTTPS    ┌──────────────┐    OAC    ┌─────────────┐
│   Users     │ ──────────► │ CloudFront   │ ────────► │ S3 Bucket   │
│ (Global)    │             │ Distribution │           │ (Website)   │
└─────────────┘             └──────────────┘           └─────────────┘
                                     │
                                     │ AWS SDK
                                     ▼
                            ┌──────────────┐
                            │  DynamoDB    │
                            │   Table      │
                            └──────────────┘
```

## 📁 Project Structure

```
prompt-sidekick-v2/
├── 🌐 Frontend Files
│   ├── index.html              # Main landing page with forms
│   ├── styles.css              # Surfer theme styling & animations
│   ├── script.js               # Form handling & user interactions
│   └── aws-config.js           # AWS SDK configuration
│
├── ☁️ Infrastructure
│   └── infrastructure/
│       └── template.yaml       # CloudFormation IaC template
│
├── 🚀 Deployment
│   ├── deploy.sh               # Automated deployment script
│   └── package.json            # NPM scripts & project config
│
├── 📋 Configuration
│   ├── .env.example            # Environment variables template
│   └── README.md               # This documentation
│
└── 🔧 Development
    └── .gitignore              # Git ignore patterns
```

## 🚀 Deployment Guide

### Prerequisites

1. **AWS Account**: Active AWS account with appropriate permissions
2. **AWS CLI**: Installed and configured
   ```bash
   # Install AWS CLI
   curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
   sudo installer -pkg AWSCLIV2.pkg -target /
   
   # Configure credentials
   aws configure
   ```
3. **Required Permissions**: Your AWS user/role needs:
   - CloudFormation: Full access
   - S3: Full access
   - DynamoDB: Full access
   - CloudFront: Full access
   - IAM: Limited access for role creation

### Step-by-Step Deployment

#### 1. Clone and Setup
```bash
# Clone the repository
git clone https://github.com/ItziarOli/prompt-sidekick-v2.git
cd prompt-sidekick-v2

# Make deployment script executable
chmod +x deploy.sh
```

#### 2. Deploy Infrastructure
```bash
# Deploy everything with one command
./deploy.sh

# The script will:
# 1. Create CloudFormation stack
# 2. Deploy all AWS resources
# 3. Upload website files to S3
# 4. Display access URLs
```

#### 3. Verify Deployment
```bash
# Check deployment status
npm run status

# View all stack outputs
npm run outputs

# Get specific URLs
aws cloudformation describe-stacks \
  --stack-name prompt-sidekick-v2 \
  --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontURL`].OutputValue' \
  --output text
```

### 🛠️ Available Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `npm run deploy` | Deploy infrastructure and website | `npm run deploy` |
| `npm run destroy` | Delete all AWS resources | `npm run destroy` |
| `npm run status` | Check deployment status | `npm run status` |
| `npm run outputs` | View CloudFormation outputs | `npm run outputs` |

### 🔧 Configuration Options

#### Environment Variables
Create `.env` file from `.env.example`:
```bash
# AWS Configuration
AWS_REGION=us-east-1
AWS_PROFILE=default

# DynamoDB Configuration
DYNAMODB_TABLE_NAME=prompt-sidekick-users

# S3 Configuration
S3_BUCKET_NAME=prompt-sidekick-ACCOUNT-REGION
```

#### Customization
- **Stack Name**: Edit `STACK_NAME` in `deploy.sh`
- **AWS Region**: Change `REGION` in `deploy.sh`
- **Project Name**: Modify `ProjectName` parameter in CloudFormation
- **DynamoDB Table**: Update table name in `aws-config.js`

## 🧪 Testing the Application

### 1. Access the Website
- Use the CloudFront URL from deployment output
- Verify HTTPS is working
- Test responsive design on different devices

### 2. Test User Registration
```javascript
// Test signup flow
1. Click "Sign Up" tab
2. Enter email and password
3. Confirm password
4. Submit form
5. Verify success message
```

### 3. Verify Data Storage
```bash
# Check DynamoDB table
aws dynamodb scan --table-name prompt-sidekick-users

# Verify user data structure
{
  "Items": [
    {
      "userId": {"S": "user_1234567890_abc123def"},
      "email": {"S": "test@example.com"},
      "signupDate": {"S": "2024-01-15T10:30:00.000Z"},
      "membership": {"S": "free"}
    }
  ]
}
```

## 📊 Monitoring and Maintenance

### CloudWatch Monitoring
- **DynamoDB**: Read/write capacity, throttling, errors
- **CloudFront**: Cache hit ratio, origin latency, error rates
- **S3**: Request metrics, data transfer, error rates

### Cost Optimization
- **DynamoDB**: Pay-per-request billing (no idle costs)
- **CloudFront**: PriceClass_100 (cost-effective regions)
- **S3**: Standard storage class (optimize for access patterns)

### Maintenance Tasks
```bash
# Update website content
aws s3 sync . s3://YOUR-BUCKET-NAME --exclude "infrastructure/*"

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR-DISTRIBUTION-ID \
  --paths "/*"

# Backup DynamoDB table
aws dynamodb create-backup \
  --table-name prompt-sidekick-users \
  --backup-name "backup-$(date +%Y%m%d)"
```

## 🔒 Security Considerations

### Implemented Security Measures
- **HTTPS Only**: All traffic encrypted in transit
- **Origin Access Control**: S3 bucket not publicly accessible
- **CORS Policy**: Controlled cross-origin requests
- **IAM Least Privilege**: Minimal required permissions
- **DynamoDB Encryption**: Data encrypted at rest

### Additional Security Recommendations
- Implement AWS WAF for CloudFront
- Add Cognito for proper user authentication
- Enable AWS Config for compliance monitoring
- Set up CloudTrail for audit logging
- Implement backup and disaster recovery

## 🚨 Troubleshooting

### Common Issues

#### Deployment Failures
```bash
# Stack in ROLLBACK_COMPLETE state
aws cloudformation delete-stack --stack-name prompt-sidekick-v2
# Wait for deletion, then redeploy

# Permission errors
# Verify AWS credentials and permissions
aws sts get-caller-identity
```

#### Website Access Issues
```bash
# CloudFront distribution not ready
# Wait 10-15 minutes for global deployment

# 403 Forbidden errors
# Check S3 bucket policy and OAC configuration
```

#### DynamoDB Connection Issues
```javascript
// Update aws-config.js with correct region and credentials
AWS.config.update({
    region: 'us-east-1',
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'YOUR_IDENTITY_POOL_ID'
    })
});
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- AWS CloudFormation for Infrastructure as Code
- Modern CSS techniques for glassmorphism effects
- AWS SDK for JavaScript for seamless cloud integration

---

**🏄‍♂️ Ready to ride the wave of AI-powered productivity!**

*Built with ❤️ by [ItziarOli](https://github.com/ItziarOli)*