from app.services.customer_profile import customer_profile


def is_authenticated():

    return customer_profile["customer_id"] is not None