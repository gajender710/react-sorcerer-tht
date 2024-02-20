import React, { useState } from "react";
import {
  Editor,
  EditorState,
  Modifier,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";

const styleMap = {
  red: {
    color: "red",
  },
};

export default function MyEditor() {
  const [title, setTitle] = useState("");

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const editor = React.useRef<any>(null);
  function focusEditor() {
    editor.current.focus();
  }

  const handleBeforeInput = (chars: any) => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const currentBlock = contentState.getBlockForKey(selection.getStartKey());
    const text = currentBlock.getText();

    if (chars === " " && text.endsWith("#")) {
      const styleAlreadyApplied = editorState
        .getCurrentInlineStyle()
        .has("header-one");

      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: styleAlreadyApplied ? text.length - 1 : 0,
          focusOffset: text.length,
        }),
        styleAlreadyApplied ? "" : text.slice(0, text.length - 1)
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "change-inline-style"
      );

      setEditorState(RichUtils.toggleBlockType(newEditorState, "header-one"));
      return "handled";
    }

    if (chars === " " && text.endsWith("***")) {
      const styleAlreadyApplied = editorState
        .getCurrentInlineStyle()
        .has("UNDERLINE");

      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: styleAlreadyApplied ? text.length - 3 : 0,
          focusOffset: text.length,
        }),
        styleAlreadyApplied ? "" : text.slice(0, text.length - 3)
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "change-inline-style"
      );

      setEditorState(RichUtils.toggleInlineStyle(newEditorState, "UNDERLINE"));

      return "handled";
    }

    if (chars === " " && text.startsWith("**")) {
      const styleAlreadyApplied = editorState
        .getCurrentInlineStyle()
        .has("red");

      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: styleAlreadyApplied ? text.length - 2 : 0,
          focusOffset: text.length,
        }),
        styleAlreadyApplied ? "" : text.slice(0, text.length - 2)
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "change-inline-style"
      );
      setEditorState(RichUtils.toggleInlineStyle(newEditorState, "red"));
      return "handled";
    }

    if (chars === " " && text.startsWith("*")) {
      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({ anchorOffset: 0, focusOffset: text.length }),
        ""
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "change-inline-style"
      );
      setEditorState(RichUtils.toggleInlineStyle(newEditorState, "BOLD"));
      return "handled";
    }

    return "not-handled";
  };

  const handleReset = () => {
    setEditorState(EditorState.createEmpty());
    setTitle("");
  };

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const draftPayload = {
      title,
      editorContent: convertToRaw(contentState),
    };
    const contentStateJSON = JSON.stringify(draftPayload);
    localStorage.setItem("draft", contentStateJSON);
    alert("Saved");
    handleReset();
  };

  const handleRead = () => {
    const draft = localStorage.getItem("draft");
    if (!draft) {
      alert("No draft saved yet");
      return;
    }
    const parsedData = JSON.parse(draft);
    setTitle(parsedData.title);
    setEditorState(
      EditorState.createWithContent(convertFromRaw(parsedData.editorContent))
    );
  };

  return (
    <div className=" p-4 space-y-2">
      <div className="flex justify-between space-x-28">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Please enter the title"
          className="p-1 border border-gray-400 rounded-lg w-1/2 focus:outline-none"
        />
        <div className="flex space-x-2 w-1/2">
          <button
            onClick={handleReset}
            className="w-full rounded-md border border-transparent px-3  text-base font-semibold text-white bg-gray-800 hover:border-gray-700 focus:outline-none focus:border-gray-700 "
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            className="w-full rounded-md border border-transparent px-3  text-base font-semibold text-white bg-blue-500 hover:border-blue-400 focus:outline-none focus:border-gray-700 "
          >
            Save
          </button>
          <button
            onClick={handleRead}
            className="w-full max-w-72 rounded-md border border-transparent px-3 text-base font-semibold text-white bg-yellow-500 hover:border-yellow-400 focus:outline-none focus:border-gray-700 "
          >
            Read Older Draft
          </button>
        </div>
      </div>
      <div
        className="border border-gray-400 min-h-28 cursor-text p-2 rounded-lg"
        onClick={focusEditor}
      >
        <Editor
          ref={editor}
          editorState={editorState}
          handleBeforeInput={handleBeforeInput}
          onChange={setEditorState}
          placeholder="Write something!"
          customStyleMap={styleMap}
        />
      </div>
    </div>
  );
}
