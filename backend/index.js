var SpotifyWebApi = require('spotify-web-api-node');


var client_id = ''; // Your client id
var client_secret = ''; // Your secret
var redirect_uri = ''; // Your redirect uri
var your_access_token = "";


// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri
});

spotifyApi.setAccessToken(your_access_token);

spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
    function(data) {
      // console.log('Artist albums', data.body);
      console.log("success");
    },
    function(err) {
      console.error(err);
    }
  );