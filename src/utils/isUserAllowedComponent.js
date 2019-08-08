const isUserAllowedComponent = (component, user_level, staff_level) => {
    if(user_level.is_superuser && staff_level === 'admin') return component;
    else if(user_level.is_staff && staff_level === 'staff') return component;
    else if(!user_level.is_staff && staff_level === 'user') return component;

    return null;
};

export default isUserAllowedComponent;
