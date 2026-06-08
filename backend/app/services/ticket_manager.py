ticket_counter = 1000


def create_ticket():

    global ticket_counter

    ticket_counter += 1

    return f"NXD-{ticket_counter}"