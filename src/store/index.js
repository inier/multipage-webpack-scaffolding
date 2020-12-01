import { toast } from '@/utils/utils';

export default {
    state: { token: '123123' },
    commit: (action, isShow) => {
        switch (action) {
            case 'changeNetwork': {
                if (navigator.onLine) {
                    isShow ? toast('online') : console.log('online');
                } else {
                    isShow ? toast('offline') : console.log('offline');
                }

                break;
            }
            case 'loginSuccess': {
                isShow ? toast('loginSuccess') : console.log('loginSuccess');

                break;
            }
            default: {
                console.log('default action');
            }
        }
    },
};
