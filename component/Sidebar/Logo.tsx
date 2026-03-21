import logo from "@Sidebarlogo.svg";
import Image from "next/image";
export function Logo() {
  return (
    <div className="w-[101px] h-[38px]">
      <Image src={logo} alt="Nowted" className="w-full h-full logo-theme" />
    </div>
  );
}
