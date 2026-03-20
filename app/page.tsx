import { MainLayout } from "@/component/layouts/MainLayout";
import { EmptyNote } from "@/component/NoteDetails/EmptyNote";

export default function Page() {
  return (
    <MainLayout>
      <EmptyNote />
    </MainLayout>
  );
}
