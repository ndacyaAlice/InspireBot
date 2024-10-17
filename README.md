# InspireBot

**InspireBot: Unleash Your Creativity**

InspireBot combines AI and the ICP blockchain to help users generate innovative business ideas from simple prompts. The platform not only provides tailored concepts but also enables collaboration by allowing users to invite contributors to refine and develop their ideas together. Every contribution is securely recorded on the ICP blockchain, ensuring transparency and ownership. Whether you’re an entrepreneur seeking inspiration or a team aiming to innovate, InspireBot offers a seamless and secure environment to explore and develop impactful ventures. Join us and transform your ideas into reality!

## Features

### Key Features
- **AI-Generated Ideas**: Generate business models, marketing strategies, or creative concepts based on user input.
- **Blockchain-Based Idea Storage**: Store generated ideas immutably on the blockchain, ensuring ownership and tamper-proof records.
- **Collaboration Tools**: Invite collaborators, comment, and iterate on ideas.
- **Ownership & Transparency**: Log every user and collaborator’s contributions on the blockchain for clear ownership and version tracking.


## System Architecture

### Frontend
- **Framework**: React
- **UI Components**:
  - Idea generation form
  - Idea display board
  - Collaboration interface (contributions)
  - **AI Engine**: GPT-based API for idea generation.

### Backend
- **Blockchain**: ICP canisters to store business idea, invite contributors, contribute, read your own ideas.

## Setup Instructions

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **dfx**: You have installed the latest version of the DFINITY Canister SDK, `dfx`. You can download it from the DFINITY SDK page. [installation guide](https://demergent-labs.github.io/azle/get_started.html#installation)

 ```
  use version dfx 0.22.0
 ```
- **Node.js**: You have installed Node.js, version 18 or above.
```
 v20.12.2

```
- Azle version use 
 ```
  azle 0.24.1
 ```

 - podman verion use

 ```
  podman version 3.4.4
  
 ```
Please ensure all these prerequisites are met before proceeding with the setup of the project.

 # Installation 
  `
  - Clone the repository
  - install dependencies using `npm install`
  - Run the project using `dfx start --host 127.0.0.1:8000 --clean --background`
  - deploy locally `dfx deploy`
    
  
  `

  ,
  
 


