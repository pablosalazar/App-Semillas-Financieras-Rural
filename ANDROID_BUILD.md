# Building Android APK

This guide explains how to build and export your app as an Android APK for installation on Android tablets.

## Prerequisites

Before building the APK, ensure you have:

1. **Android Studio** - [Download here](https://developer.android.com/studio)
2. **Java Development Kit (JDK) 17+** - [Download here](https://www.oracle.com/java/technologies/downloads/)
3. **Android SDK** - Installed via Android Studio

## Development Workflow

### 1. Build Web App and Sync to Android

```bash
pnpm build:android
```

This command:
- Builds your React app (`pnpm build`)
- Syncs the build to the Android platform (`cap sync`)

### 2. Open in Android Studio

```bash
pnpm cap:open:android
```

Or use the combined development command:

```bash
pnpm android:dev
```

This builds, syncs, and opens Android Studio in one step.

## Building APK

### Debug APK (for testing)

1. Open the project in Android Studio:
   ```bash
   pnpm cap:open:android
   ```

2. In Android Studio:
   - Go to **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
   - Wait for the build to complete
   - Click "locate" in the notification to find the APK

3. Or use Gradle from terminal:
   ```bash
   cd android
   ./gradlew assembleDebug
   ```

**Output location**: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK (for distribution)

#### Step 1: Generate a Signing Key

```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

**Important**: Keep this keystore file safe! You'll need it for all future updates.

#### Step 2: Configure Signing

Create `android/key.properties`:

```properties
storePassword=YOUR_KEYSTORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=my-key-alias
storeFile=/absolute/path/to/my-release-key.keystore
```

**⚠️ Never commit this file to git!**

#### Step 3: Update Gradle Config

Edit `android/app/build.gradle` and add before the `android` block:

```gradle
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

Then update the `signingConfigs` inside the `android` block:

```gradle
android {
    ...
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword keystoreProperties['storePassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

#### Step 4: Build Release APK

```bash
cd android
./gradlew assembleRelease
```

**Output location**: `android/app/build/outputs/apk/release/app-release.apk`

## Installing APK on Tablets

### Via USB (ADB)

1. Enable Developer Options on your tablet
2. Enable USB Debugging
3. Connect tablet via USB
4. Run:
   ```bash
   adb install android/app/build/outputs/apk/debug/app-debug.apk
   ```

### Via File Transfer

1. Copy the APK to your tablet (email, cloud storage, USB, etc.)
2. On the tablet, open the APK file
3. Allow installation from unknown sources if prompted
4. Install the app

## Updating Your App

When you make changes to your React code:

1. Build and sync:
   ```bash
   pnpm build:android
   ```

2. Rebuild the APK in Android Studio or via Gradle

## Troubleshooting

### "Unable to locate a Java Runtime"

Install JDK 17 or higher from [Oracle](https://www.oracle.com/java/technologies/downloads/) or use:

```bash
brew install openjdk@17
```

### "SDK location not found"

Create `android/local.properties`:

```properties
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
```

Replace `YOUR_USERNAME` with your actual username.

### Build Fails

1. Clean the build:
   ```bash
   cd android
   ./gradlew clean
   ```

2. Rebuild:
   ```bash
   ./gradlew assembleDebug
   ```

### App Crashes on Launch

Check that:
- Firebase configuration is correct (if using Firebase)
- All required permissions are in `AndroidManifest.xml`
- Web assets are properly synced (`pnpm cap:sync`)

## App Configuration

### Change App Name

Edit `capacitor.config.ts`:

```typescript
appName: 'Your New App Name'
```

### Change App ID

Edit `capacitor.config.ts`:

```typescript
appId: 'com.yourcompany.yourapp'
```

**Note**: Changing the app ID requires removing and re-adding the Android platform:

```bash
npx cap remove android
npx cap add android
```

### App Icon and Splash Screen

Place your assets in:
- Icon: `android/app/src/main/res/mipmap-*/ic_launcher.png`
- Splash: `android/app/src/main/res/drawable/splash.png`

Or use the [Capacitor Assets](https://github.com/ionic-team/capacitor-assets) tool to generate all sizes automatically.

## Useful Commands

| Command | Description |
|---------|-------------|
| `pnpm build` | Build web app only |
| `pnpm cap:sync` | Sync web build to native platforms |
| `pnpm build:android` | Build and sync |
| `pnpm cap:open:android` | Open in Android Studio |
| `pnpm android:dev` | Build, sync, and open (full workflow) |

## Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Developer Guide](https://developer.android.com/studio/build/building-cmdline)
- [Capacitor Android Configuration](https://capacitorjs.com/docs/android/configuration)
