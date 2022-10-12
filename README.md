## **Suggestion Command v14**:

![image](https://user-images.githubusercontent.com/94427416/195375759-9e3aa213-11bf-442a-a50f-353a19255ce6.png)


## **Dependencies**:
> - `npm i discord.js` OR `yarn install discord.js`
> - `npm i mongoose` OR `yarn install mongoose`

## **Shields.io**
![GitHub Repo stars](https://img.shields.io/github/stars/whois-MidNight/Suggest-Cmd-v14?style=for-the-badge)
![Relative date](https://img.shields.io/date/1665583200?style=for-the-badge)
## Installation

- 1.Install all the dependencies.     
- 2.Copy the command files into your command folder.  
- 3.Copy the Event files into your event folder.  
- 4.Copy The Schema file into your schema folder.    
- 5.Replace the channelID in the Command/Suggest File `client.channels.cache.get("here")` 
- 6.Replace the channel link in Command/Suggest file 
- 7.Try the commands!
## Mongo DB Code
> be sure to add this to your ready.js file.    

    // Add this to the top of the file
    const { connect } = require('mongoose')
    
    // Add this to your ready.js file
    await connect(MONGO_URI)
      .then(() => {
        console.log(`✅ >>> Successfully connected to MongoDB!`);
      })
      .catch((err) => {
        console.log(err);
      });

## Contributing

Contributions are always welcome!

- Button Handler by **[RoaldDahl](https://github.com/RoaldDahl/Button-Handler)**
    

## Support

**MidNight Bot**
- [Click Me](https://discord.gg/aXnJp96cUz) To reach my support Server
- [Click Me](https://discord.com/api/oauth2/authorize?client_id=933628005987795035&permissions=1426197654646&scope=bot%20applications.commands) to Invite The Bot

## Previews
![image](https://user-images.githubusercontent.com/94427416/195374990-c6d075b4-90ff-491e-86fe-df680e02f060.png)
