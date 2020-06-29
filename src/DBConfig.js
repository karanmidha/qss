export const DBConfig = {
  name: 'qsstest',
  version: 1,
  objectStoresMeta: [
    {
      store: 'people',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'addressLine1', keypath: 'addressLine1', options: { unique: false } },
        { name: 'addressLine2', keypath: 'addressLine2', options: { unique: false } },
        { name: 'zipCode', keypath: 'zipCode', options: { unique: false } },
        { name: 'suiteNumber', keypath: 'suiteNumber', options: { unique: false } },
        { name: 'city', keypath: 'city', options: { unique: false } },
        { name: 'state', keypath: 'state', options: { unique: false } },
        { name: 'timeZone', keypath: 'timeZone', options: { unique: false } },          
        { name: 'facilityTimings', keypath: 'facilityTimings', options: { unique: false } },          
        { name: 'phone', keypath: 'phone', options: { unique: false } }
      ]
    }
  ]
};