import store from 'store';

import date from 'utils/date/date';

class Store {
    constructor(storeId) {
        this.storeId = storeId;
    }

    saveLevel(level) {
        const { storeId } = this;

        const levelUID = `maze-${date.getTime()}`;

        const levels =
            store.get(storeId) && store.get(storeId).length > 0
                ? store.get(storeId).concat([{ [levelUID]: level }])
                : [
                      {
                          [levelUID]: level,
                      },
                  ];

        store.set(storeId, levels);
    }
}

export default Store;
