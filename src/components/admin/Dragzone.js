import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function MyDropzone(props) {
  const onDrop = useCallback(acceptedFiles => {
    props.handleFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const link = props.file ? props.file.name : props.href;
  return (
    <div style={{ marginBottom: "20px" }}>
      <p>{link}</p>
      <div {...getRootProps()} style={{ border: "1px dotted black" }}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>גרור קובץ לכאן ...</p>
        ) : (
          <p>גרור קובץ לכאן או לחץ לבחירת קובץ</p>
        )}
      </div>
    </div>
  );
}
