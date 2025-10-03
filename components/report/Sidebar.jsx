import React from 'react';
import Link from 'next/link';
import { assets } from '../../assets/assets';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const SideBar = () => {
    const pathname = usePathname()
    const menuItems = [
        { name: 'Add Report', path: '/report', icon: assets.add_icon },
        { name: 'Report History', path: '/report/history', icon: assets.product_list_icon },
        { name: 'Settings', path: '/report/settings', icon: assets.order_icon },
    ];

    return (
        <div className='md:w-64 w-16 border-r min-h-screen text-slate-100 bg-emerald-800 border-gray-300 py-2 flex flex-col'>
            {menuItems.map((item) => {

                const isActive = pathname === item.path;

                return (
                    <Link href={item.path} key={item.name} passHref>
                        <div
                            className={
                                `flex items-center py-3 px-4 gap-3 ${isActive
                                    ? "border-r-4 md:border-r-[6px] bg-yellow-400/10 border-yellow-500"
                                    : "hover:bg-yellow-400/50 border-white"
                                }`
                            }
                        >
                            <Image
                                src={item.icon}
                                alt={`${item.name.toLowerCase()}_icon`}
                                className="w-7 h-7 text-yellow-400"
                            />
                            <p className='md:block hidden text-center'>{item.name}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default SideBar;
