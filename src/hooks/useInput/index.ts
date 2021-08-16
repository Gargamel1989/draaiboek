import React from "react";

export type IInput<T> = {
  value: T;
  setValue: (value: T) => void;
  reset: () => void;
  bind: {
    value: T;
    onChange: (value: T) => void;
  };
};

export default function useInput<T>(initialValue: T): IInput<T> {
  const [value, setValue] = React.useState<T>(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(initialValue),
    bind: {
      value,
      onChange: (value: T) => {
        setValue(value);
      },
    },
  };
}
