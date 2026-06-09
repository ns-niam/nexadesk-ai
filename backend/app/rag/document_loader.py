import os


def load_documents():

    documents = []

    docs_path = "docs"

    for filename in os.listdir(docs_path):

        if filename.endswith(".txt"):

            with open(
                os.path.join(
                    docs_path,
                    filename
                ),
                "r",
                encoding="utf-8"
            ) as f:

                documents.append(
                    f.read()
                )

    return documents