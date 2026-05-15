import React from 'react'

jest.mock("./Editor", () => {
  const _React: typeof React = require("react");
  const Editor = ({ initialValue, onChange }: any) => {
    const [value, setValue] = _React.useState(initialValue);

    return (
      <textarea
        data-testid={`texteditor`}
        value={value}
        onChange={e => {
          const newValue = e.target.value;
          setValue(newValue);
          onChange(newValue);
        }}
      />
    );
  };

  return { Editor };
});
