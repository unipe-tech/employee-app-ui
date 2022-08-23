# employee-app

## Install and run on android
```
cd employee-app
npm install
npx react-native start

# start after reset cache
npx react-native start --reset-cache

# build and start emulator
npx react-native run-android
```


## Gradle
```
# cleanup
cd android && ./gradlew clean

# assemble release for building an APK
cd android && ./gradlew assembleRelease

```



## Install and run on ios
```
npm install -g react-native-cli
cd employee-app
npm install
react-native run-ios
```


## Build Strategies
` STAGE = "dev" | "test" | "prod" `

```
start:dev
- Emulator for developers while building a feature or making a fix with `dev` STAGE [DB]

start:test
- Emulator for developers while building a feature or making a fix with `test` STAGE [DB]

build:dev
- Test out an APK for developers while building a feature or making a fix with `dev` STAGE [DB]

build:test
- Test out an APK for Client Servicing Team while building a feature or making a fix with `test` STAGE [DB]

build:prod
- AAB to be released to PlayStore `prod` STAGE [DB]

test:dev
- to test out the version using jest
```

## For any errors in the debug mode

1. Open android studio
2. Go to SDK Manager
3. Open SDK tools
4. Check the 3.18.1 version for cmake instead of all the other ones. 
5. Hit apply and then click ok