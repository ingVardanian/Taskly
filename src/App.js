import { useState } from 'react';

import UseEffectHooks from './useEffectHooks';
import './App.css';

function App() {
  const [isShowComponent, setIsShowComponent] = useState(true);


  return (
    <div className="App">

      <button onClick={() => setIsShowComponent(!isShowComponent)}>
        {isShowComponent ? 'Hide Component': 'Show Component'}
      </button>
      {
        isShowComponent && <UseEffectHooks />
      }
      
    </div>
  );
}

export default App;
