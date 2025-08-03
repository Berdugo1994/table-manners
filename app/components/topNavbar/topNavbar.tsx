import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@heroui/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/app/assets/logo.png";
import React from "react";

export const TableMannersLogo = () => {
  return <Image src={logo} alt="Table Manners" width={36} height={36} />;
};

export default function TopNavbar() {
  const currentPath = usePathname();
  const isHome = currentPath === "/";
  const isSetup = currentPath === "/setup";
  const isPolicy = currentPath === "/policy";
  const isContact = currentPath === "/contact";
  return (
    <Navbar>
      <NavbarBrand>
        <Link color="foreground" href="/">
          <TableMannersLogo />
          <p className="font-bold text-inherit">Table Manners</p>
        </Link>
      </NavbarBrand>

      <NavbarMenu>
        <NavbarContent className="hidden flex gap-4" justify="center">
          <NavbarMenuItem>
            <NavbarItem isActive={isHome}>
              <Link color="foreground" href="/">
                Home
              </Link>
            </NavbarItem>
            <NavbarItem isActive={isSetup}>
              <Link color="foreground" href="/setup">
                New Game
              </Link>
            </NavbarItem>
            <NavbarItem isActive={isPolicy}>
              <Link color="foreground" href="/policy">
                Policy
              </Link>
            </NavbarItem>
            <NavbarItem isActive={isContact}>
              <Link color="foreground" href="/contact">
                Contact
              </Link>
            </NavbarItem>
          </NavbarMenuItem>
        </NavbarContent>
      </NavbarMenu>
      <NavbarContent justify="end">
        <NavbarMenuToggle />
      </NavbarContent>
    </Navbar>
  );
}
