const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');




var client_id = '34cf4eb736ef4ee3bfb0b75fba0465df'; // Your client id
var client_secret = '16eb24e721eb48709d54868df85a7214'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri
var your_access_token = "BQCOuUHJo28ltAYS6TT39os-0abb3cfo5JeJia-axSsOTKgbRkUk15xZ-wbWrWXWzDPTJ8VZH3Gj83kHOqNX8svA9jjBoXdALDNO5x-FuZCgoaby9XguQjZRxjIwMorUdoa_1tWzr4Dr9jIzJSnF6oIzhwq1JtIzN3mQHxSy38G-hYTvjQ";
const port = "8888"

const app = express();

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri
});


const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
  ];



  app.get('/login', (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
  });
  
  app.get('/callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;
  
    if (error) {
      console.error('Callback Error:', error);
      res.send(`Callback Error: ${error}`);
      return;
    }
  
    spotifyApi
      .authorizationCodeGrant(code)
      .then(data => {
        const access_token = data.body['access_token'];
        const refresh_token = data.body['refresh_token'];
        const expires_in = data.body['expires_in'];
  
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);
  
        console.log('access_token:', access_token);
        console.log('refresh_token:', refresh_token);
  
        console.log(
          `Sucessfully retreived access token. Expires in ${expires_in} s.`
        );
        res.send('Success! You can now close the window.');
  
        setInterval(async () => {
          const data = await spotifyApi.refreshAccessToken();
          const access_token = data.body['access_token'];
  
          console.log('The access token has been refreshed!');
          console.log('access_token:', access_token);
          spotifyApi.setAccessToken(access_token);
        }, expires_in / 2 * 1000);
      })
      .catch(error => {
        console.error('Error getting Tokens:', error);
        res.send(`Error getting Tokens: ${error}`);
      });
  });
  
  app.listen(port, () =>
    console.log(
      'HTTP Server up. Now go to http://localhost:8888/login in your browser.'
    )
  );


  // spotifyApi.setAccessToken(your_access_token);

// const albumData = spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
//     function(data) {
//       // console.log('Artist albums', data.body);
//       console.log("success");
//       // console.log(albumData);
//     },
//     function(err) {
//       console.error(err);
//     }
//   );

//   app.get("/", (req, res) => {
//     return res.send(albumData);
// })

//   app.get("/home", (req, res) => {
//       return res.send("this is the home page");
//   })

//   app.listen(port, () => {
//       console.log("running on port: " + port);
//   })