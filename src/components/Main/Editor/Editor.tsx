import CodeMirror, {
  BasicSetupOptions,
  Extension,
} from '@uiw/react-codemirror';

type EditorProps = {
  editable: boolean;
  readOnly: boolean;
  theme?: 'light' | 'dark' | 'none' | Extension;
  value: string;
  extensions?: Extension[];
  basicSetup?: boolean | BasicSetupOptions;
  onChange?: (value: string) => void;
};

function Editor({
  editable,
  readOnly,
  theme,
  value,
  extensions,
  basicSetup,
  onChange,
}: EditorProps) {
  return (
    <CodeMirror
      editable={editable}
      readOnly={readOnly}
      theme={theme}
      value={value}
      extensions={extensions}
      basicSetup={basicSetup}
      onChange={onChange}
    />
  );
}

export default Editor;
