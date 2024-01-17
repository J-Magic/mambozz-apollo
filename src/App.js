import { AuthContextProvider } from './context/auth';
import Client from './apollo/Client';
import React from 'react';
import './App.css';
import valley from './assets/valley.jpeg';
import {
  IoChatbox,
  IoScanCircleOutline,
  IoEllipsisVertical,
  IoSearch,
  IoSearchOutline,
  IoHappyOutline,
  IoAttachOutline,
  IoMic,
} from 'react-icons/io5';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from '../src/aws-exports';
import '@aws-amplify/ui-react/styles.css';
import chatPage from './pages/chatPage';
import Sidebar from './components/Sidebar';
import { SidebarItem } from './components/Sidebar';
import {
  LifeBuoy,
  Receipt,
  Boxes,
  Package,
  UserCircle,
  BarChart3,
  LayoutDashboard,
  Settings,
} from 'lucide-react';

Amplify.configure(awsconfig);

function App() {
  return (
    <AuthContextProvider>
      <Client>
        {/* <chatPage /> */}
        <main className='App'>
          <Sidebar>
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              text='Dashboard'
              alert
            />
            <SidebarItem
              icon={<BarChart3 size={20} />}
              text='Statistics'
              active
            />
            <SidebarItem icon={<UserCircle size={20} />} text='Users' active />
            <SidebarItem icon={<Boxes size={20} />} text='Inventory' active />
            <SidebarItem icon={<Package size={20} />} text='Orders' active />
            <SidebarItem icon={<Receipt size={20} />} text='Billings' active />
            <hr className='my-3' />
            <SidebarItem icon={<Settings size={20} />} text='Settings' active />
            <SidebarItem icon={<LifeBuoy size={20} />} text='Help' active />
          </Sidebar>
        </main>
      </Client>
    </AuthContextProvider>
  );
}

export default withAuthenticator(App);
