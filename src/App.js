import React from 'react';
import { initDB, IndexedDB } from 'react-indexed-db';
import { DBConfig } from './DBConfig';
import './App.css';

import DisplayAddress from './DisplayAddress';


initDB(DBConfig);
function App() {
  return (
    <div className="App">
      <IndexedDB
          name="QSS_test"
          version={1}
          objectStoresMeta={[
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
          ]}>
        <DisplayAddress/>
    </IndexedDB>
    </div>
  );
}
export default App;
