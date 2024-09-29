import { Alert, Button, Card, Table, Tooltip } from 'flowbite-react';
import React from 'react';
import { useListUsersQuery } from '../../store/userApiSlice';
import { InformationCircleIcon } from '@heroicons/react/outline'

const UsersPage = () => {
    const { data, isLoading, isError } = useListUsersQuery();

    if (isLoading) {
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
        <Card className="w-full">
            <div className="mb-4 flex items-center justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">User Management</h5>
                <Button size="sm" className='bg-amber-500 hover:bg-amber-600'>
                    Create
                </Button>
            </div>
            <Table>
                <Table.Head>
                    <Table.HeadCell>Username</Table.HeadCell>
                    <Table.HeadCell>First Name</Table.HeadCell>
                    <Table.HeadCell>Last Name</Table.HeadCell>
                    <Table.HeadCell>Role</Table.HeadCell>
                    <Table.HeadCell>Active</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {data.content.map((user, idx) => {
                        return (
                            <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {user.username}
                                </Table.Cell>
                                <Table.Cell>{user.firstName}</Table.Cell>
                                <Table.Cell>{user.lastName}</Table.Cell>
                                <Table.Cell>
                                    <div className="flex items-center space-x-2">                                        
                                        <span className="text-gray-700">{user.role.displayName}</span>

                                        <Tooltip content={user.role.description}>
                                            <InformationCircleIcon className="w-5 h-5 text-gray-500" />
                                        </Tooltip>
                                    </div>

                                </Table.Cell>
                                <Table.Cell>
                                    <label class="inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={user.active} class="sr-only peer" />
                                        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                                    </label>
                                </Table.Cell>
                                <Table.Cell>
                                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Edit
                                    </a>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}

                </Table.Body>
            </Table>
        </Card >

    )
};

export default UsersPage;
