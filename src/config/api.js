/*
* In javascript the variables are declared in camelcase but I like use snake case,
* if you want you can rename them as you want and remove the rule in .eslintrc line 35
*/
const api_url = env('BASE_URL', 'http://localhost:8000/') + 'api/'
export default {
  api_url,
  token_url: env('BASE_URL', 'http://localhost:8000/') + 'oauth/token',
  current_user_url: api_url + 'me', // you can change it as you want
  endpoints: {
    users_url: api_url + 'users'
    // resource_url : api_url + 'resource'
  }
}
