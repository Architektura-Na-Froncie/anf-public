import React, { useEffect, useRef } from 'react';
import SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css';

import EditorStyles from './Editor.module.css';

interface EditorProps {
  onChange: (content: string) => void
}

export const Editor: React.FC<EditorProps> = (props) => {
  const { onChange } = props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const element = textareaRef.current!
    const simplemde = new SimpleMDE({ element });
    const handleChange = () => onChange(simplemde.value());
    // simplemde.codemirror // internal types: any 😞
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    simplemde.codemirror.on("change", handleChange);

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      simplemde.codemirror.off("change", handleChange);
      simplemde.toTextArea();
    }
  }, [onChange]);

  return <div className={EditorStyles.editor}>
    <textarea ref={textareaRef}></textarea>
  </div>
}
