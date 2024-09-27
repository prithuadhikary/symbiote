import LanguageSelect from "./LanguageSelect";
import UserAvatar from "./UserAvatar";

export const Header = () => {
    return (<header className="h-16 w-full bg-white shadow-md flex justify-between items-center px-6">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className='flex space-x-4'>
            <LanguageSelect />
            <UserAvatar />
        </div>
    </header>);
}