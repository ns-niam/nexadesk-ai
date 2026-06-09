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

    query_embedding = model.encode(
        [query]
    )

    distances, indices = index.search(
        np.array(
            query_embedding,
            dtype="float32"
        ),
        k=1
    )

    return documents[
        indices[0][0]
    ]