import uuid


def create_ticket():

    return f"NXD-{str(uuid.uuid4())[:8]}"