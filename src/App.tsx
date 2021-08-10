import React from 'react';

import Index from 'pages';

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <div className="header">
        <h1>Pokémons</h1>
      </div>
      <div className="pokemonsIndex">
        <Index />
      </div>
    </div>
  );
};

export default App;
