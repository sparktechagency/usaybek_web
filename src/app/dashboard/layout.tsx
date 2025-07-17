import Sidebar from '@/components/common/dashboard/sideber'
import { childrenProps } from '@/types';


export default function ServiceLayout({ children }:childrenProps) {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar/>
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <main>
                    <div className="p-4">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )}