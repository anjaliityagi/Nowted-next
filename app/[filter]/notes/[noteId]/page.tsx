import { MainLayout } from "@/components/layouts/MainLayout";
import { NoteView } from "@/components/NoteDetails/Noteview";

export default function Page() {
  return (
    <MainLayout>
      <NoteView />
    </MainLayout>
  );
}
