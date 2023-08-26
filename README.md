## MongoDB Netflix Clone

This is the repository that contains the code for the "Join the Search Party!" Lab. You can do the self-paced version of this lab [here](https://joellord.github.io/vector-search-lab/docs/intro).

### See the code in action
You can see the code running in a [CodeSanbox](https://codesandbox.io/p/github/joellord/vector-search-lab-code/final?file=/server/controllers/movies.mjs:9,33&workspaceId=ee4f50cb-0dc2-4500-9812-9f080aabd73c).

You will need to update your `server/.env` file with the following values:

```bash
PORT=5050
ATLAS_URI=mongodb+srv://username:password@clustername?retryWrites=true&w=majority
EMBEDDINGS_SOURCE=openai
EMBEDDING_API_KEY=<your OpenAI developer API key>
```