import React from 'react';

const StoreContext = React.createContext({
  "folders":[],
  "notes":[],
});
StoreContext.displayName = "Store Context";
export default StoreContext;