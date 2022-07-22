export const isEmpty = (value) => {
    if (!value) {
        return true;
    } else {
        return false;
    }
};

export const isEmail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; /* eslint-disable-line */
    return re.test(email);
};

export const isLength = (password) => {
    if (password.length < 6) {
        return true;
    } else {
        return false;
    }
};

export const isMatch = (password, cf_password) => {
    if (password === cf_password) {
        return true;
    } else {
        return false;
    }
};
