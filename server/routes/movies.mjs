import { Router } from "express";
import getTermEmbeddings from "../embeddings/index.mjs";
import MovieController from "../controllers/movies.mjs";

const router = Router();
const movieController = new MovieController();

router.post("/semantic/advanced", async (req, res) => {
  const { semanticSearchTerms } = req.body;

  try {
    const embedding = await getTermEmbeddings(semanticSearchTerms);

    if (embedding !== null) {
      const movies = await movieController.vectorSearchAdvanced(
        embedding,
        req.body
      );

      res.json(movies);
    }
  } catch (err) {
    console.error(`Something went wrong from POST: ${err}\n`);
    res.json(err);
  }
});

router.get("/semantic", async (req, res) => {
  const searchTerms = req.query.searchTerms;
  try {
    const movies = await movieController.vectorSearch(searchTerms);
    return res.json(movies);
  } catch (err) {
    console.error(`Something went wrong in semantic endpoint: ${err}\n`);
    res.json(err);
  }
});

router.get("/find", async (req, res) => {
  const searchTerms = req.query.searchTerms;
  try {
    const movies = await movieController.find(searchTerms);
    return res.json(movies);
  } catch (err) {
    console.error(`Something went wrong in find endpoint: ${err}\n`);
    res.json(err);
  }
});

router.get("/regex", async (req, res) => {
  const searchTerms = req.query.searchTerms;
  try {
    const movies = await movieController.findWithRegex(searchTerms);
    return res.json(movies);
  } catch (err) {
    console.error(`Something went wrong in find endpoint: ${err}\n`);
    res.json(err);
  }
});

router.get("/search", async (req, res) => {
  const searchTerms = req.query.searchTerms;
  try {
    const movies = await movieController.search(searchTerms);
    return res.json(movies);
  } catch (err) {
    console.error(`Something went wrong in search endpoint: ${err}\n`);
    res.json(err);
  }
});

router.get("/fuzzy", async (req, res) => {
  const searchTerms = req.query.searchTerms;
  try {
    const movies = await movieController.fuzzySearch(searchTerms);
    return res.json(movies);
  } catch (err) {
    console.error(`Something went wrong in fuzzy endpoint: ${err}\n`);
    res.json(err);
  }
});

router.get("/scored", async (req, res) => {
  const searchTerms = req.query.searchTerms;
  try {
    const movies = await movieController.scoredSearch(searchTerms);
    return res.json(movies);
  } catch (err) {
    console.error(`Something went wrong in fuzzy endpoint: ${err}\n`);
    res.json(err);
  }
});

export default router;
