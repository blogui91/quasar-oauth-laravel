# Quasar App With Authentication using Laravel Passport (Not Laravel project included)

## Considerations to make oauth work in this project
- Duplicate env.example to .env
There you have to add the keys for your API. Maybe you want to take a look into src/config/auth.js
- Set the configuration to get the current user in src/config/api.js, basicly is to define a route where our app will make the call the get the current user in your server.

That's it, that's well enough to make your app work with Authentication using Laravel Passport
