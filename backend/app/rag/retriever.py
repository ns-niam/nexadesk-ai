from sentence_transformers import SentenceTransformer
import numpy as np


model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def retrieve_context(
    query,
    index,
    documents
):

    try:

        query_embedding = model.encode(
            [query]
        )

        distances, indices = index.search(
            np.array(
                query_embedding,
                dtype="float32"
            ),
            k=3
        )

        best_score = float(
            distances[0][0]
        )

        print(
            "RAG SCORE:",
            best_score
        )

        # No relevant document

        if best_score > 1.2:

            return ""

        contexts = []

        for idx in indices[0]:

            if idx >= 0:

                contexts.append(
                    documents[idx]
                )

        return "\n\n".join(
            contexts
        )

    except Exception as e:

        print(
            "RAG ERROR:",
            str(e)
        )

        return ""
