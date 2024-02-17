import React, { useContext, useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Editor as ClassicEditor } from "ckeditor5-custom-build/build/ckeditor";

//import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { GlobalContext } from "../contexts/GlobalContext";

function Editor({ initialData, onChange }) {
  useEffect(() => {}, []);
  return (
    <>
      <div className="col-12">
        <div className="p-3 bg-white mt-3 shadow-default rounded">
          <CKEditor
            editor={ClassicEditor}
            data={initialData}
            config={{
              ckfinder: {
                uploadUrl: "http://localhost:8081/v1/files",
              },
            }}
            onReady={(editor) => console.log("Editor ready to use !")}
            onChange={(event, editor) => {
              const data = editor.getData();
              // console.log(data);
              onChange(data);
            }}
            onBlur={(event, editor) => {
              //console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              //console.log("Focus.", editor);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Editor;
