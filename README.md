# Club Sponsorship Management System

A modern web application built with React and Firebase to help sports clubs manage their sponsorship packages, invite sponsors, and track engagements.

## Tech Stack

- **Frontend**: React 19 (TypeScript)
- **UI Framework**: [Mantine 8](https://mantine.dev/)
- **Query Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Bundler**: Webpack 5
- **Backend / Database**: Firebase (Authentication & Cloud Firestore)
- **Forms & Validation**: Mantine Form & Zod
---

## Project Structure

```text
src/
├── components/          # Reusable UI components
├── hooks/               # Custom React hooks (e.g., useAuth)
├── lib/                 # Core library initializations (Firebase)
├── pages/               # Individual page components (Login, Signup, etc.)
├── schemas/             # Zod schemas for validation
└── routes.tsx           # Centralized routing configuration
```

---

## Local Development Setup

### Prerequisites
- **Node.js**: v22 or higher (Check version: `node -v`)
- **Yarn**: v1.22.x (Check version: `yarn -v`)

### 1. Clone the repository
```bash
git clone https://github.com/manufac-analytics/club.git
cd <project-folder>
```

### 2. Install dependencies
```bash
yarn install
```

### 3. Start the development server
```bash
yarn start
```
The app will be available at `http://localhost:8080` (or the next available port).

### 4. Other useful commands
- `yarn build`: Create a production-ready bundle.
- `yarn lint`: Run ESLint to check for code quality issues.
- `yarn pretty`: Run Prettier to format the code.

---

## Firebase Configuration & Setup

If you need to switch to a new Firebase account or project, follow these steps:

### 1. Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** and follow the setup wizard.
3. Once the project is created, click the add app button (You will see after your project name) and then click the **Web** icon (`</>`) to add a web app.
4. Register the app (e.g., "Club Management").
5. Copy the `firebaseConfig` object provided in the setup.

### 2. Enable Required Services

#### Authentication
1. Go to **Firebase Console → Build → Authentication → Get Started**.
2. Enable the **Email/Password** sign-in provider.
---

### Firebase Authentication: Allowing email sign in and password reset
  
Understanding Email Enumeration Protection

  Firebase’s email enumeration protection hides whether an email is registered, preventing attackers from discovering valid user accounts.

Why Turn This Protection Off?

  - While it’s safer to hide if an email exists, it can mess with how users log in.
  - With this protection **on**, Firebase won't tell you if the email exists.
  - So when a user enters their email, FirebaseUI jumps right to "**Create Account**". [Reference 1](https://github.com/firebase/firebaseui-web/issues/1040) [Reference 2](https://stackoverflow.com/questions/77475409/firebase-authentication-email-provider-only-allows-new-account-creation)
  - If you **turn the protection off**, the app will redirect existing email users to login screen where they can either login or reset their password.

Steps

  - This needs to be turned off in the firebase console.
  - Go to **Authentication → Settings -> User actions** in the Firebase console.
  - Make sure **Email enumeration protection** is turned **OFF**.

- **Firestore Database**:
  1. Go to **Firestore Database** > **Create Database**.
  2. Start in **Production Mode** or **Test Mode** (Note: Test mode expires in 30 days).
  3. Choose the desired region.

### 3. Update the Project Config (Web)
Locate the file `src/lib/firebase-config.ts` and replace the existing `FirebaseConfig` object with your new credentials.

## Deployment

The project is configured to deploy to Firebase Hosting.

### 1. Install Firebase CLI
```bash
yarn global add firebase-tools
```

### 2. Login and Initialize
```bash
firebase login
firebase use --add  # Select your new firebase project
```

### 3. Build and Deploy
```bash
yarn build
firebase deploy
```
The project will be deployed from the `dist/bundle` directory as specified in `firebase.json`.

---

---

## Email Service (Firestore → Send Email)

The application uses the **Firebase “Trigger Email from Firestore” extension** to send sponsor invitation emails when a Firestore document is created.

Extension reference:  
https://extensions.dev/extensions/firebase/firestore-send-email

---

### Extension Setup Locally

To install and manage extensions, you can also use the Firebase CLI:

#### Step 1: 
Run the following command to install the CLI or update to the latest CLI version.
```bash
yarn global add firebase-tools
```

#### Step 2: 
Set up a new Firebase project directory or navigate to an existing one

#### Step 3: 
Add this extension to your extension manifest by running 
```bash
firebase ext:install firebase/firestore-send-email --project=projectId_or_alias
```

#### Step 4 (Optional): 
Test this extension locally with the Emulator Suite 
```bash
firebase emulators:start
```

#### Step 5: 
Deploy the extension instances in your manifest to your project 
```bash
firebase deploy --only extensions --project=projectId_or_alias
```

OR

### Extension Setup From Firebase Console

#### 1. Install the Extension
1. Go to **Firebase Console** → **Extensions**
2. Click **Install Extension**
3. Search for **Trigger Email from Firestore**
4. Select your Firebase project and complete the installation

---

#### 2. Extension Configuration

Configure the extension with the following values during installation:

- **Firestore collection path**
  ```text
  mail
  ```

- **Email provider**
  - Gmail or SMTP
  - Ensure the sender email is verified

- **Default sender**
  ```text
  Club Sponsorship Team <noreply@yourclub.com>
  ```

- **Authorized users**
  - Keep default unless custom access control is required

---

### Sending Emails

Emails are automatically sent whenever a document is added to the `mail` collection in Firestore.

#### Example Firestore Document
```ts
{
  to: ["sponsor@email.com"],
  message: {
    subject: "You're invited to sponsor our club!",
    html: "<p>Please click the link below to view the sponsorship package.</p>"
  }
}
```

Email documents can be created from:
- Client-side logic after validation
- Firebase Cloud Functions (recommended for secure flows)

---

### Deployment Notes

- The extension is deployed automatically when installed
- No additional deployment steps are required
- Emails work in both development and production environments as long as Firestore writes succeed



