const cashingFabric = (func) => {
  let prevArgs = [];
  let prevValue = [];

  return (...args) => {
    if (args.every((arg, i) => arg === prevArgs[i])) {
      return prevValue;
    }

    prevArgs = args;
    prevValue = func(...args);

    return prevValue;
  };
};

export default cashingFabric;
