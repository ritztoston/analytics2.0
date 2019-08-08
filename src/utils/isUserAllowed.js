const isUserAllowed = (is_superuser, is_staff, item) => {
    // Note: Do not interchange statements!
    // Admin Only
    if(is_superuser) return is_superuser;
    // Staff And User
    else if(is_staff && item.is_staff && item.user === true) return is_staff;
    // Staff Only
    else if(is_staff && item.is_staff && item.user === false) return is_staff;
    // User Only
    else if(is_staff === false && item.user) return item.user;

    return false;
};

export default isUserAllowed;
