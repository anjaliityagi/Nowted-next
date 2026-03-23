import Image from "next/image";

export function Logo() {
  return (
    <div className="w-[101px] h-[38px]">
      <Image
        src="/assets/Sidebarlogo.svg"
        alt="Nowted"
        width={101}
        height={38}
        className="w-full h-full logo-theme"
      />
    </div>
  );
}
