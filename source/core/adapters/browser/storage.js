import browser from 'webextension-polyfill';

const PR_SLOTH_TOKEN = 'PR_SLOTH_TOKEN';

// TODO: test with mock.
export function storeToken(token) {
    return new Promise(function(resolve, reject) {
        browser.storage.local.set({ PR_SLOTH_TOKEN: token })
            .then((() => resolve()))
    });
}

export function fetchToken() {
    return new Promise(function(resolve, reject) {
        browser.storage.local.get([ PR_SLOTH_TOKEN ])
            .then((values) => {
                const { PR_SLOTH_TOKEN } = values;
                resolve(PR_SLOTH_TOKEN)
            });
    })
}
