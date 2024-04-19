import React from 'react';
import 'tailwindcss/tailwind.css';
import EDtor from '../../Components/EDtor';
import { EditorNav } from '../../Components';


const Editor = () => {
  return (
    <>
      <EditorNav />
      <EDtor />
    </>
  );
}

export default Editor;