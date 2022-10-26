 const allAreNull=(arr)=>{
    let result = true;
  
    // eslint-disable-next-line no-restricted-syntax
    for (const value of arr) {
      if (value !== null) {
        result = false;
        break;
      }
    }
  
    return result;
  }

  export default allAreNull;