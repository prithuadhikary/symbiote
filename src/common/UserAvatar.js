import React from 'react';
import { Avatar, Button, Dropdown } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { selectProfile } from '../store/authSlice';

const UserAvatar = ({ name, avatarUrl }) => {

    const profile = useSelector(selectProfile);

    return (
         profile && <Dropdown renderTrigger={() => (<Button className='flex justify-center items-center' size="sm" color="white">
                    {/* Flowbite Avatar Component */}
                    <Avatar
                        img={avatarUrl}
                        alt={`${name}'s avatar`}
                        size="sm"
                        className='pr-3'
                    />
                    <div className='flex justify-center items-center'>
                        {profile.givenName} {profile.familyName}
                    </div>                    
                </Button>)}>
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
        </Dropdown>
    );
};

export default UserAvatar;
