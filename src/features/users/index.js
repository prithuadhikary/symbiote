import { Alert, Button, Card, Pagination, Table, Tooltip } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useLazyListUsersQuery } from '../../store/userApiSlice';
import { InformationCircleIcon } from '@heroicons/react/outline'
import UserCreationModal from './UserCreationModal';
import { UserEditModal } from './UserEditModal';

const UsersPage = () => {
    const [isCreateOpen, setCreateOpen] = useState(false);
    const [isEditOpen, setEditOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [userToEdit, setUserToEdit] = useState(null);

    const onPageChange = page => {
        loadUsers(page - 1, true);
        setCurrentPage(page);
    }

    const [loadUsers, { data: userPage, isLoading, isError, isUninitialized }] = useLazyListUsersQuery();

    useEffect(() => {
        loadUsers(0, true);
    }, []);

    if (isLoading || isUninitialized) {
        return (<div className='h-full w-full flex items-center justify-center'>
            <h2>Loading...</h2>
        </div>)
    }

    if (isError) {
        return (<div className='h-full w-full flex items-center justify-center'>
            <Alert>Error occurred.</Alert>
        </div>)
    }

    return (
        <>
            <Card className="p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">User Management</h5>
                    <Button size="md" color="primary" onClick={() => setCreateOpen(true)}>
                        Create
                    </Button>
                </div>
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Username</Table.HeadCell>
                        <Table.HeadCell>First Name</Table.HeadCell>
                        <Table.HeadCell>Last Name</Table.HeadCell>
                        <Table.HeadCell>Role</Table.HeadCell>
                        <Table.HeadCell>Realm</Table.HeadCell>
                        <Table.HeadCell>Active</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {userPage && userPage.content.map((user, idx) => {
                            return (
                                <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {user.username}
                                    </Table.Cell>
                                    <Table.Cell>{user.givenName}</Table.Cell>
                                    <Table.Cell>{user.familyName}</Table.Cell>
                                    <Table.Cell>
                                        {user.roles.map(role => {
                                            return (
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-gray-700">{role.displayName}</span>

                                                    <Tooltip content={role.description}>
                                                        <InformationCircleIcon className="w-5 h-5 text-gray-500" />
                                                    </Tooltip>
                                                </div>
                                            );
                                        })}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user.realm.name}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <label class="inline-flex items-center cursor-pointer">
                                            <input type="checkbox" checked={user.active} class="sr-only peer" />
                                            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                                        </label>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button 
                                            color="white"
                                            onClick={() => {
                                                setUserToEdit(user);
                                                setEditOpen(true);
                                            }}                                            
                                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                            Edit
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}

                    </Table.Body>
                </Table>
                <div className='flex justify-end'>
                    <Pagination currentPage={currentPage} totalPages={userPage.page.totalPages} onPageChange={onPageChange} showIcons />
                </div>
            </Card>
            <UserCreationModal isOpen={isCreateOpen} setIsOpen={setCreateOpen} loadUsers={loadUsers} />
            {userToEdit && <UserEditModal isOpen={isEditOpen} setIsOpen={setEditOpen} userToEdit={userToEdit} loadUsers={loadUsers} />}
        </>
    )
};

export default UsersPage;
