import { Button, Label, Modal, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormErrors } from '../../common/FormErrors';
import { useLazyListRealmsQuery } from '../../store/realmApiSlice';
import { useLazyListRolesQuery } from '../../store/roleApiSlice';
import { useUpdateUserMutation } from '../../store/userApiSlice';

export const UserEditModal =({ isOpen, setIsOpen, userToEdit, loadUsers }) => {
    const { t } = useTranslation();
    const [updateUser] = useUpdateUserMutation();
    const [loadRealms, { data: realmList }] = useLazyListRealmsQuery();
    const [loadRoles, { data: roles, isLoading: roleIsLoading }] = useLazyListRolesQuery();
    const [error, setError] = useState(null);
  
  
    // React Hook Form setup
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
      reset
    } = useForm({
        defaultValues: {
            givenName: userToEdit.givenName,
            familyName: userToEdit.familyName,
            realmId: userToEdit.realm.id,
            role: userToEdit.roles[0].id
        }
    });
  
    const toggleModal = () => {
      setIsOpen(!isOpen);
      setError(null);
      reset(); // Reset form on close
    };
  
    const onSubmit = (data) => {
      console.log(data);
      updateUser({id: userToEdit.id, request: data}).then((response) => {
        console.log(response.data);
        if (!response.error) {
          toggleModal(); // Close modal on submit
          loadUsers();
        } else {
          setError(response.error.data)
        }     
      })
    };
  
    const realmId = watch('realmId', '');
  
    useEffect(() => {
      if (realmId) {
        loadRoles(realmId, true);
      }
    }, [realmId]);
  
    useEffect(() => {
      loadRealms(null, true)
        .then(realms => loadRoles(realms.data[0].id, true));
    }, [])

    useEffect(() => {
        userToEdit && reset({
            givenName: userToEdit.givenName,
            familyName: userToEdit.familyName,
            realmId: userToEdit.realm.id,
            role: userToEdit.roles[0].id
        })
    }, [userToEdit])
  
    return (
      <>
        {/* Modal Component */}
        <Modal show={isOpen} size="lg" popup={true} onClose={toggleModal}>
          <Modal.Header>
            <h3 className="text-xl font-medium text-gray-900 m-4">Update User</h3>
          </Modal.Header>
          <Modal.Body>
            <div className='mb-4'>
              {error && <FormErrors error={error}/>}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>            
              {/* First Name */}
              <div className="mb-4">
                <Label htmlFor="givenName" value="First Name" />
                <TextInput
                  id="givenName"
                  type="text"
                  placeholder="John"
                  {...register('givenName', { required: 'First name is required' })}
                />
                {errors.givenName && (
                  <p className="text-red-500 text-sm mt-1">{errors.givenName.message}</p>
                )}
              </div>
  
              {/* Last Name */}
              <div className="mb-4">
                <Label htmlFor="familyName" value="Last Name" />
                <TextInput
                  id="familyName"
                  type="text"
                  placeholder="Doe"
                  {...register('familyName', { required: 'Last name is required' })}
                />
                {errors.familyName && (
                  <p className="text-red-500 text-sm mt-1">{errors.familyName.message}</p>
                )}
              </div>
  
              {/* Select Realm */}
              <div className="mb-4">
                <Label htmlFor="realmId" value="Select Realm" />
                <Select
                  id="realmId"
                  {...register('realmId', {
                    required: t('Please select a realm to create user in.')
                  })}
                >
                  {realmList && realmList.map(realm => (<option selected={userToEdit.realm.id === realm.id} value={realm.id}>{realm.name}</option>))}
                </Select>
  
                {errors.realmId && (
                  <p className="text-red-500 text-sm mt-1">{errors.realmId.message}</p>
                )}
              </div>
  
              {/* Select Role */}
              <div className="mb-4">
                <Label htmlFor="roleId" value="Select Role" />
                <Select
                  id="roleId"
                  {...register('roleId', {
                    required: t('Please select a role.'),
                    validate: () => !!realmId || t('Select a realm first')
                  })}
                >
                  {roles && roles.map(role => (<option value={role.id}>{role.displayName}</option>))}
                </Select>
  
                {errors.roleId && (
                  <p className="text-red-500 text-sm mt-1">{errors.roleId.message}</p>
                )}
              </div>
  
              {/* Submit Button */}
              <div className="flex justify-end">
                <Button type="submit">Update User</Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  };