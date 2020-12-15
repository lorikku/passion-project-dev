# Lucidy
Lucidy is een app die mensen helpt met lucide dromen ervaren.

## Omschrijving

### Doelpubliek en onderzoeksvraag

Heel vaak hoor ik van mensen rond me heen dat ze totaal niet dromen, laat staan lucide dromen hebben. Daarom koos ik deze mensen als mijn doelpubliek. 


Is het mogelijk om hun te helpen met lucide dromen? Hoe kan ik mensen helpen hun dromen onthouden? Hoe kan iemand weten wanneer hij/zij aan het dromen is?

### Wat zijn lucide dromen?

Iedereen droomt. De ene meer dan het andere. Maar dan heb je ook mensen die vaak lucide dromen ondervinden. Maar wat is dat juist?

Een lucide droom is eigenlijk een droom waarbij iemand van het feit bewust is dat hij/zij aan het dromen is. Hierdoor heeft de dromer totale controle over zijn droom, en kan de dromer kiezen wat hij/zij wil doen in de droom.

### Core Project Statement

Een Expo React Native app dat mensen zal assisteren om beter hun dromen te onthouden EN in het bijzonder 'lucide dromen' te ervaren. De app zal hun slaapritme snachts tracken en op verschillende manieren de gebruiker aanleren hoe ze lucide dromen kunnen ervaren.

### Opsomming van de deliverables

- Week 1: Research & app design
- Week 2: Uitwerking van de algemene flow (navigatie, design)
- Week 3: Integratie van de nodige native API
- Week 4: Koppeling van redux state management aan de app
- Week 5: Afwerking & indienen

### Blog Url

https://lorikku.wixsite.com/mysite

## Installation

This app is meant for **physical** iOS and Android devices. The Tracker function will not work on simulators, since they don't have an accelerometer.  
Follow these steps to install and run it.

### Expo CLI
You will first need the Expo CLI to run this project:  
```
yarn global add expo-cli
```

1. Register using `expo register` or , if you already have an account, login using `expo login`.  
More info on this: https://docs.expo.io/workflow/expo-cli/#auth

2. After you've done that, go ahead and install the **Expo App** on your smartphone.  
iOS: https://apps.apple.com/us/app/expo-client/id982107779  
Android: https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US

3. Login on the Expo App using your Expo login credentials.

### Starting project

First of all, make sure you smartphone is on the same network as your PC.  
After cloning this repo, open the folder and type following commands in terminal:
```
cd ./app
yarn && yarn prod
```
The Metro Bundler should start, and you should be able to see the project availible in your Expo App. You can now access it by opening it. If you don't see it, try refreshing the Expo App or scanning the QR code in the Metro Bundler.

If you get "There was a problem..." just retry until it works. This is because the app 'too long to load' and 'timed out', but it's normal when you start up the project for the first time.

`yarn prod` will run the app as if it was completely built as a standalone version.  
Alternatively, you can also run `yarn dev` if you want to access development mode instead.

That's it! Enjoy your sleep! &#128513;
