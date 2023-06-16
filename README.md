# HPAPI - Harry Potter API

HPAPI is an API using [Fastify](https://www.fastify.io/) and queries a [Supabase](https://supabase.com/) database. It provides information about the Harry Potter universe: Characters, Movies, Books, Spells and Potions.

The data is taken from the [danielschuster-muc/potter-db](https://github.com/danielschuster-muc/potter-db) repo, converted to csv using [this python script](https://gist.github.com/jouwdan/4abd3ba46993a73b5bac14a6a54dfa6f) and imported to Supabase.

## Usage

This API is deployed on [Render](https://render.com/) and can be publically accessed and used at [https://hpapi.onrender.com/](https://hpapi.onrender.com/). RLS has been enabled on Supabase to allow anyone to read the data.

## Support

If you need any support feel free to open a [GitHub issue](#) or ask your question on [GitHub Discussions](#).

## Authors & Contributors

This repository was set up by [Jordan Harrison](https://github.com/jouwdan).

For a full list of all authors and contributors, see [the contributors page](https://github.com/jouwdan/hpapi/contributors).

## License

This project is licensed under the **MIT license**.

See [LICENSE](LICENSE) for more information.