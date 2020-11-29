import QS from 'qs';

const router = {
    currentRoute: {
        fullPath: location.href,
    },
    replace(obj) {
        location.replace(`${obj.path}?${QS.stringify(obj.query)}`);
    },
};

export default router;
