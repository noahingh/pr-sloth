import browser from 'webextension-polyfill';

const PR_SLOTH_TOKEN = 'PR_SLOTH_TOKEN';
const PR_SLOTH_LOGIN = 'PR_SLOTH_LOGIN';

export function cacheTokenLogin({token, login}) {
    return new Promise(function(resolve, reject) {
        browser.storage.local.set({ 
            PR_SLOTH_TOKEN: token,
            PR_SLOTH_LOGIN: login,
        })
            .then((() => resolve()))
    });
}

export function retrieveTokenLogin() {
    return new Promise(function(resolve, reject) {
        browser.storage.local.get([ PR_SLOTH_TOKEN, PR_SLOTH_LOGIN ])
            .then((values) => {
                const { PR_SLOTH_TOKEN, PR_SLOTH_LOGIN } = values;
                resolve({
                    token: PR_SLOTH_TOKEN,
                    login: PR_SLOTH_LOGIN,
                })
            });
    })
}
