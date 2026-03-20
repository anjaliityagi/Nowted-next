import { MainLayout } from "@/component/layouts/MainLayout";
import { NoteView } from "@/component/NoteDetails/Noteview";

export default function Page() {
  return (
    <MainLayout>
      <NoteView />
    </MainLayout>
  );
}
