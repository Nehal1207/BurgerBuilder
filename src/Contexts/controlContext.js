import React from 'react';

const controlContext = React.createContext({
    moreIngredientHandler: () => { },
    lessIngredientHandler: () => { }
})

export default controlContext;