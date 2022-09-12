import { NextPage } from "next";
import { LogoutIcon, DocumentTextIcon } from "@heroicons/react/solid";
import { GetStaticProps } from "next";
import { supabase } from "../utils/supabase";

import { Note } from "../types/types";
import Layout from "components/template/Layout";
import { NoteItem } from "components/molecule/NoteItem";
import { NoteForm } from "components/molecule/NoteForm";

export const getStaticProps: GetStaticProps = async () => {
  console.log("ISR invoked - notes page");
  const { data: notes, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) {
    throw new Error(`${error.message}: ${error.details}`);
  }
  return {
    props: { notes },
    revalidate: false,
  };
};
type StaticProps = {
  notes: Note[];
};
const Notes: NextPage<StaticProps> = ({ notes }) => {
  const signOut = () => {
    supabase.auth.signOut();
  };
  return (
    <Layout title="Notes">
      <LogoutIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />
      <DocumentTextIcon className="h-8 w-8 text-blue-500" />
      <ul className="my-2">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            user_id={note.user_id}
          />
        ))}
      </ul>
      <NoteForm />
    </Layout>
  );
};

export default Notes;
