import { collection } from "../db/conn.mjs";
import getTermEmbeddings from "../embeddings/index.mjs";

export default class MovieController {
  async find(searchTerm) {
    // Write the code to query the database using a simple find() method.
    // More on the find method in the documentation: https://docs.mongodb.com/manual/reference/method/db.collection.find/
    // const movies = await collection.find();
    const movies = [];

    return movies;
  }

  async findWithRegex(searchTerm) {
    // Write the code to query the database using a regular expression.
    // More on regular expressions in the documentation: https://docs.mongodb.com/manual/reference/operator/query/regex/
    const movies = [];

    return movies;
  }

  async search(searchTerm) {
    // Write the code to perform a full text search on the database.
    // You will need to use an aggregation pipeline: https://docs.mongodb.com/manual/core/aggregation-pipeline/
    const movies = [];

    return movies;
  }

  async fuzzySearch(searchTerm) {
    // Write the code to improve your search experience with fuzzy matching
    // More on fuzzy matching in the documentation: https://www.mongodb.com/docs/atlas/atlas-search/text/
    const movies = [];

    return movies;
  }

  async scoredSearch(searchTerm) {
    // Write the code to improve your search experience with scored search
    // More on scored search in the documentation: https://www.mongodb.com/docs/atlas/atlas-search/text/
    const movies = [];

    return movies;
  }

  async vectorSearch(searchTerms) {
    // Write the code to do a semantic search using vector embeddings
    // You can use the getTermEmbeddings function to convert the searchTerms into embeddings
    // More on the knnBeta operator in the documentation: https://www.mongodb.com/docs/atlas/atlas-search/knn-beta/
    const movies = [];
    
    return movies;
  }

  async vectorSearchAdvanced(embeddedSearchTerms, data) {
    const { start, end, genre, rating } = data;
    const ratingInt = parseInt(rating);

    const ratingObject = {
      range: {
        path: "imdb.rating",
        gte: ratingInt,
        lte: 10,
      },
    };

    const genreObject = {
      text: {
        query: genre,
        path: "genres",
      },
    };
    const releaseObject = {
      range: {
        path: "released",
        gte: new Date(start),
        lte: new Date(end),
      },
    };

    let compoundFilterObject = {
      compound: {
        filter: [ratingObject, releaseObject],
      },
    };

    if (genre.length > 0) {
      compoundFilterObject = {
        compound: {
          filter: [ratingObject, genreObject, releaseObject],
        },
      };
    }
    const filteredMovies = await collection
      .aggregate([
        {
          $search: {
            index: "default",
            knnBeta: {
              vector: embeddedSearchTerms,
              path: "plot_embedding",
              k: 3,
              filter: compoundFilterObject,
            },
          },
        },

        {
          $project: {
            title: 1,
            year: 1,
            "imdb.rating": 1,
            fullplot: 1,
            poster: 1,
            released: 1,
            genres: 1,
            score: {
              $meta: "searchScore",
            },
          },
        },
      ])
      .toArray();

    return filteredMovies;
  }
}
