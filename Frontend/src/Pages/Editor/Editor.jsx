import React from 'react';
import 'tailwindcss/tailwind.css';
import EDtor from '../../Components/EDtor';
import { EditorNav } from '../../Components';


const Editor = () => {
  return (
    <section className=' max-h-screen overflow-hidden w-full'>
      <EditorNav />
      <EDtor />
    </section>
  );
}

export default Editor;