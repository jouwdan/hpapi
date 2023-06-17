# HPAPI - Harry Potter API

Welcome to the Monorepo of the Harry Potter API. This repo houses the API itself, the data used and an example Frontend.

The API itself uses [Fastify](https://www.fastify.io/) and queries a [Supabase](https://supabase.com/) database. It provides information about the Harry Potter universe: Characters, Movies, Books, Spells and Potions.

The data is taken from the [danielschuster-muc/potter-db](https://github.com/danielschuster-muc/potter-db) repo, converted to csv using [this python script](https://gist.github.com/jouwdan/4abd3ba46993a73b5bac14a6a54dfa6f) and imported to Supabase.

The frontend is a [React](https://react.dev/) app that uses [Vite](https://vitejs.dev/), [react-router](https://reactrouter.com/) for routing, [React Query](https://react-query.tanstack.com/) to fetch data from the API and display it, and [Chakra UI](https://chakra-ui.com/) for the interface.

## Usage

The API is deployed on [Render](https://render.com/) and can be publically accessed and used at [https://hpapi.onrender.com/](https://hpapi.onrender.com/). RLS has been enabled on Supabase to allow anyone to read the data.

The frontend is also deployed on [Render](https://render.com/) and can be accessed at [https://hpapi-web.onrender.com/](https://hpapi-web.onrender.com/).

## Development

If you would like to work on this, you will need to set up the data on your own Supabase instance. You can do this by following these steps:

1. Clone this repo
2. Create a new Supabase project
3. Create a new table for each csv file in the `data` folder
4. Import the csv files into the tables
5. Create a new `.env` file in the `packages/api` folder of the project and add the following variables:
    - `SUPABASE_URL` - The URL of your Supabase project
    - `SUPABASE_KEY` - The public key of your Supabase project
6. Run `npm install` to install the dependencies
7. Run `cd packages/api && npm run dev` to start the API development server
8. The development server should now be running on `localhost:3000`

To work on the frontend, simply run `cd packages/web && npm run dev` to start the development server. The frontend should now be running on `localhost:5173`.

## Support

If you need any support feel free to open a [GitHub issue](#) or ask your question on [GitHub Discussions](#).

## Authors & Contributors

This repository was set up by [Jordan Harrison](https://github.com/jouwdan).

For a full list of all authors and contributors, see [the contributors page](https://github.com/jouwdan/hpapi/contributors).

## License

This project is licensed under the **MIT license**.

See [LICENSE](LICENSE) for more information.