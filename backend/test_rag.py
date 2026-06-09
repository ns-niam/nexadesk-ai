from app.rag.document_loader import load_documents
from app.rag.vector_store import create_vector_store
from app.rag.retriever import retrieve_context

documents = load_documents()

index, docs = create_vector_store(
    documents
)

query = "How can I get a loan?"

result = retrieve_context(
    query,
    index,
    docs
)

print(result)