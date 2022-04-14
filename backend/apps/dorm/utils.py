from dorm.models import Organization, OrganizationDormManager


def get_organization(creator_or_dorm_manager):
    organizations = Organization.objects.filter(
        creator=creator_or_dorm_manager)
    if organizations.exists():
        return organizations.first()

    organizations = OrganizationDormManager.objects.filter(
        dorm_manager=creator_or_dorm_manager)
    if organizations.exists():
        return organizations.first()

    return None
