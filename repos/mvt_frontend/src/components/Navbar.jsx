// Navbar.jsx
import React, { useContext } from 'react'
import { Link, useLocation } from "react-router-dom"
import Image from "./CustomImage"
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  User,
  TvMinimalPlayIcon,
  Moon,
  Sun,
  Focus,
  Sticker,
} from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import AuthContext from '../context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { Separator } from './ui/separator'

import ConfirmDeleteToaster from './ConfirmDeleteToasterComponent'
import { useDeleteAccount } from '@/hooks/useDeleteAccount'
import { toast } from 'sonner'

const Navbar = ( props ) => {

    // USER
    let { user, logoutUser } = useContext(AuthContext)

    // LOCATION
    const location = useLocation();

    // THEME
    const { theme, changeTheme } = useTheme();
    const handleThemeToggle = () => {
      changeTheme(theme === 'light' ? 'dark' : 'light');
    };

    // DELETE ACCOUNT

    const deleteAccount = useDeleteAccount();

    const handleDeleteAccount = async () => {
        toast.promise(deleteAccount(), {
            loading: 'Deleting account...',
            success: 'Goodbye, your account is now deleted!',
            error: 'Error deleting account.',
        });
    };

    // BREADCRUMBS
    const getBreadcrumbs = () => {
      const { pathname } = location;
    
      switch (true) {
        case pathname === '/tth':
          return (
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          );
        case pathname === '/':
          return (
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Analytics</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Tracked Videos</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          );
        case /^\/analytics\/focus\/\d+$/.test(pathname):
          // const id = pathname.match(/^\/analytics\/focus\/(\d+)$/)[1]; // Extract the id
          return (
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Analytics</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Tracked Videos</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Focus</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          );
        case pathname === '/about':
          return (
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/about">About</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                  <Link to="/about">About this website</Link>
              </BreadcrumbItem>
            </BreadcrumbList>

          );
        case pathname === '/discovery':
          return (
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/discovery">Discovery</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/discovery">Community Gems</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          );
        // Add more cases for other routes
        default:
          return null;
      }
    };
    // const getBreadcrumbs = () => {
    //   switch (location.pathname) {
    //     case '/tth':
    //       return (
    //         <BreadcrumbList>
    //           <BreadcrumbItem>
    //             <BreadcrumbLink asChild>
    //               <Link to="/">Dashboard</Link>
    //             </BreadcrumbLink>
    //           </BreadcrumbItem>
    //         </BreadcrumbList>
    //       );
    //     case '/':
    //       return (
    //         <BreadcrumbList>
    //           <BreadcrumbItem>
    //             <BreadcrumbLink asChild>
    //               <Link to="/">Analytics</Link>
    //             </BreadcrumbLink>
    //           </BreadcrumbItem>
    //           <BreadcrumbSeparator />
    //           <BreadcrumbItem>
    //             <BreadcrumbLink asChild>
    //               <Link to="/">Tracked Videos</Link>
    //             </BreadcrumbLink>
    //           </BreadcrumbItem>
    //         </BreadcrumbList>
    //       );
    //       case '/analytics/focus':
    //         return (
    //           <BreadcrumbList>
    //             <BreadcrumbItem>
    //               <BreadcrumbLink asChild>
    //                 <Link to="/">Analytics</Link>
    //               </BreadcrumbLink>
    //             </BreadcrumbItem>
    //             <BreadcrumbSeparator />
    //             <BreadcrumbItem>
    //               <BreadcrumbLink asChild>
    //                 <Link to="/">Tracked Videos</Link>
    //               </BreadcrumbLink>
    //             </BreadcrumbItem>
    //             <BreadcrumbSeparator />
    //             <BreadcrumbItem>
    //               <BreadcrumbPage>Focus</BreadcrumbPage>
    //             </BreadcrumbItem>
    //           </BreadcrumbList>
    //         );
    //         case '/about':
    //           return (
    //             <BreadcrumbList>
    //               <BreadcrumbItem>
    //                 <BreadcrumbLink asChild>
    //                   <Link to="/about">About</Link>
    //                 </BreadcrumbLink>
    //               </BreadcrumbItem>
    //             </BreadcrumbList>
    //           );
    //           case '/discovery':
    //             return (
    //               <BreadcrumbList>
    //               <BreadcrumbItem>
    //                 <BreadcrumbLink asChild>
    //                   <Link to="/discovery">Discovery</Link>
    //                 </BreadcrumbLink>
    //               </BreadcrumbItem>
    //               <BreadcrumbSeparator />
    //               <BreadcrumbItem>
    //                 <BreadcrumbLink asChild>
    //                   <Link to="/discovery">Community Gems</Link>
    //                 </BreadcrumbLink>
    //               </BreadcrumbItem>
    //             </BreadcrumbList>
    //             );
    //     // Add more cases for other routes
    //     default:
    //       return null;
    //   }
    // };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <TvMinimalPlayIcon className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Music Video Tracker</span>
          </Link>
          <Separator />
          <TooltipProvider>
            {/* <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip> */}
            {/* <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Orders</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Orders</TooltipContent>
            </Tooltip> */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to='/'
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LineChart className="h-5 w-5" />
                  <span className="sr-only">Analytics</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Analytics</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to='/discovery'
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Focus className="h-5 w-5" />
                  <span className="sr-only">Discovery</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Discovery</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to='/about'
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Sticker className="h-5 w-5" />
                  <span className="sr-only">About</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">About</TooltipContent>
            </Tooltip>
            </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Separator />
          <TooltipProvider>
            {/* <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip> */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  onClick={handleThemeToggle}
                >
                  {theme === 'light' ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                {theme === 'light' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <TvMinimalPlayIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Music Video Tracker</span>
                </Link>
                <Separator />
                {/* <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link> */}
                {/* <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link> */}
                <Link
                  to='/'
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </Link>

                <Link
                  to='/discovery'
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Focus className="h-5 w-5" />
                  Discovery
                </Link>

                <Link
                  to='/about'
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Sticker className="h-5 w-5" />
                  About
                </Link>
                <Separator />
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 !text-muted-foreground hover:text-foreground"
                  onClick={handleThemeToggle}
                >
                  {theme === 'light' ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                  {theme === 'light' ? 'Switch Theme' : 'Switch Theme'}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Breadcrumb className="hidden md:flex">

            {getBreadcrumbs()}

          </Breadcrumb>

          <div className="relative ml-auto flex-1 md:grow-0">
            {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            /> */}
          </div>
          
          {/* PROFILE MENU */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <User className="h-5 w-5 transition-all group-hover:scale-110" />
                {/* <Image
                  src="/placeholder-user.jpg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                /> */}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to="/request-password-reset"><DropdownMenuItem>Update Password</DropdownMenuItem></Link>
              <DropdownMenuItem className="bg-accent-foreground text-accent">
                {/* Delete Account */}
                <ConfirmDeleteToaster onConfirm={handleDeleteAccount} />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link onClick={ logoutUser } > <DropdownMenuItem> Logout </DropdownMenuItem> </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {props.children}
        </main>
      
      </div>
    </div>
  );
};

export default Navbar;