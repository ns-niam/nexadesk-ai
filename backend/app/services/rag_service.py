from app.rag.document_loader import load_documents
from app.rag.vector_store import create_vector_store
from app.rag.retriever import retrieve_context

documents = load_documents()

index, docs = create_vector_store(
    documents
)


def get_rag_context(
    query: str
):

    return retrieve_context(
        query,
        index,
        docs
    )