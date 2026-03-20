import { MainLayout } from "@/components/layouts/MainLayout";
import { EmptyNote } from "@/components/NoteDetails/EmptyNote";

export default function Page() {
  return (
    <MainLayout>
      <EmptyNote />
    </MainLayout>
  );
}
