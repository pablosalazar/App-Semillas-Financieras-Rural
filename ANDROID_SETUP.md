# Android Setup Guide

This project includes custom Android configurations for landscape orientation and fullscreen immersive mode.

## Prerequisites

- Node.js and pnpm installed
- Android Studio (optional, for advanced debugging)
- Android device or emulator

## Initial Setup

When cloning this repository for the first time, follow these steps:

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Sync Capacitor

The Android configuration files are already included in the repository. Simply sync Capacitor to ensure everything is up to date:

```bash
npx cap sync android
```

### 3. Build and Run

Build the web assets and deploy to your Android device:

```bash
pnpm android:run
```

Or build separately:

```bash
pnpm build
npx cap sync android
npx cap open android
```

## Custom Android Configurations

### Landscape Orientation

The app is configured to force landscape orientation in [AndroidManifest.xml](android/app/src/main/AndroidManifest.xml):

```xml
<activity
    android:screenOrientation="landscape"
    ...>
```

### Fullscreen Immersive Mode

The [MainActivity.java](android/app/src/main/java/com/semillasfinancieras/urbano/MainActivity.java) implements immersive fullscreen mode to hide system UI bars:

- Hides status bar (top)
- Hides navigation bar (bottom)
- Keeps screen on during app usage
- Allows users to swipe from edges to temporarily reveal system bars

## Version Control

The Android folder is **partially tracked** in git:

**Tracked files:**
- Source code (`MainActivity.java`, `AndroidManifest.xml`)
- Gradle configuration files
- Resources (icons, splash screens)
- Build configuration

**Ignored files:**
- Build artifacts (`build/`, `.gradle/`)
- Local configuration (`local.properties`)
- IDE files (`.idea/`, `*.iml`)

This ensures that custom configurations are shared across the team while avoiding merge conflicts from generated files.

## Troubleshooting

### Build Errors

If you encounter build errors after pulling changes:

```bash
# Clean and rebuild
cd android
./gradlew clean
cd ..
npx cap sync android
```

### Configuration Not Applied

If landscape or fullscreen mode isn't working:

1. Verify the changes are present in `android/app/src/main/AndroidManifest.xml` and `android/app/src/main/java/com/semillasfinancieras/urbano/MainActivity.java`
2. Rebuild the app: `pnpm android:run`
3. Uninstall the old app from your device before installing the new one

## Modifying Android Configuration

If you need to modify Android-specific settings:

1. Edit the files in `android/app/src/`
2. Commit the changes to git
3. Other developers will receive the changes when they pull and run `npx cap sync android`
