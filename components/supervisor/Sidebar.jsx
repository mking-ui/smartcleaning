import React from 'react';
import Link from 'next/link';
import { assets } from '../../assets/assets';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const SideBar = () => {
    const pathname = usePathname()
    const menuItems = [

        { name: 'Overview', path: '/supervisor', icon: assets.product_list_icon },
        { name: 'Manage Report', path: '/supervisor/reports', icon: assets.add_icon },
        { name: 'Approved Report', path: '/supervisor/approved', icon: assets.product_list_icon },
        { name: 'Pending Report', path: '/supervisor/pending', icon: assets.add_icon },
        { name: 'In-progress', path: '/supervisor/progress', icon: assets.add_icon },
        { name: 'Completed', path: '/supervisor/complete', icon: assets.add_icon },
        { name: 'Staff Management', path: '/supervisor/staff', icon: assets.product_list_icon },
        { name: 'Profile', path: '/supervisor/profile', icon: assets.order_icon },
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
                                width={28}   // 👈 consistent width
                                height={28}  // 👈 consistent height
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
