"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { backgroundMenuColor, fontColorMenu } from "../constants/constants";
import { useRouter } from "next/navigation";

// Define a type for menu items
type MenuItem = {
  id: number;
  name: string;
  path: string;
  parentId: number | null;
  isOpen?: boolean; // Optional, as it will be added later
};

const menus: MenuItem[] = [
  { id: 1, name: "Home", path: "/", parentId: null },
  { id: 2, name: "Podcast", path: "/audio", parentId: null },
  { id: 3, name: "Audio", path: "/audio", parentId: 2 },
  { id: 4, name: "Media", path: "/media", parentId: 2 },
  { id: 5, name: "Banner", path: "/banner", parentId: null },
  { id: 6, name: "Top", path: "/top", parentId: null },
  { id: 7, name: "Feature", path: "/feature", parentId: null },
  { id: 8, name: "Hot", path: "/hot", parentId: null },
];

const Menu: React.FC = () => {
  // State with MenuItem type
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const router = useRouter();
  const handleOpenMenu = async (menuItem: MenuItem) => {
    // If it's a parent item without child items
    const hasChildren = menuList.some((item) => item.parentId === menuItem.id);

    if (menuItem.parentId === null) {
      if (hasChildren) {
        // If it has children, toggle visibility of the submenu
        const updatedMenus: MenuItem[] = menus.map((menu) => {
          if (menu.id === menuItem.id) {
            return {
              ...menu,
              isOpen: !menuItem.isOpen,
            };
          } else {
            return menu;
          }
        });
        setMenuList(updatedMenus);
      } else {
        // If it has no children, navigate to the page
        router.push(menuItem.path);
      }
    } else {
      // For child items, navigate to the path
      router.push(menuItem.path);
    }
  };

  useEffect(() => {
    // Map and add `isOpen` property
    const updatedMenus: MenuItem[] = menus.map((menu) => ({
      ...menu,
      isOpen: false,
    }));
    setMenuList(updatedMenus);
  }, []);

  return (
    <div className='h-screen min-w-[350px] bg-[#222324] font-semibold text-white text-xl'>
      <div className='flex flex-col'>
        <div className='flex p-4 border-b-white border'>
          <h1>Mongolic</h1>
          <MenuOpenIcon className='font-bold text-[30px]' />
        </div>
        {menuList
          ?.filter((menu) => menu?.parentId === null) // Render parent menus
          .map((menu, index) => (
            <div key={menu.id} className='pl-4 pr-4'>
              <div className='border-b-4 border-gray-300 p-4 cursor-pointer' onClick={(e) => handleOpenMenu(menu)}>
                <div>{menu?.name}</div>
              </div>
              <div
                className={`${menu.isOpen ? "block" : "hidden"} flex flex-col`}
                // onClick={() => {
                //   router.push(menu.path);
                //   console.log("object");
                // }}
              >
                {menuList
                  .filter((sub) => sub?.parentId === menu.id)
                  .map((sub) => (
                    <Link href={sub?.path} key={sub.id} className='pl-10 pt-3 pb-3 border-b-2 border-gray-200 text-lg'>
                      {sub?.name}
                    </Link>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Menu;
