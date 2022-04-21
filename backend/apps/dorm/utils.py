from dorm.models import Organization


def get_organization(creator_or_dorm_manager):
    organizations = Organization.objects.filter(
        creator=creator_or_dorm_manager)
    if organizations.exists():
        return organizations.first()

    return None
