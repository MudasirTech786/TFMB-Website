# Public website deployment

Vercel project domain: `https://www.trustforevermarriagebureau.com`

Set this environment variable for the **Production** environment in the Vercel project, then redeploy:

```dotenv
NEXT_PUBLIC_API_URL=https://api.trustforevermarriagebureau.com/api
```

The public profile listing, search, and detail requests use this API base URL. For local development, see `.env.example`.
