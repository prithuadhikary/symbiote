
import React, { useCallback, useEffect } from 'react';
import { Modal, Button, Label, TextInput, Select } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { useUsernameAvailableMutation } from '../../store/signupSlice';
import { useTranslation } from 'react-i18next';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { useCreateUserMutation } from '../../store/userApiSlice';
import { useLazyListRealmsQuery } from '../../store/realmApiSlice';
import { useLazyListRolesQuery } from '../../store/roleApiSlice';

const UserCreationModal = ({ isOpen, setIsOpen, loadUsers }) => {
  const { t } = useTranslation();
  const [isUsernameAvailable] = useUsernameAvailableMutation();
  const [createUser] = useCreateUserMutation();

  const [loadRealms, { data: realmList }] = useLazyListRealmsQuery();

  const [loadRoles, { data: roles, isLoading: roleIsLoading }] = useLazyListRolesQuery();


  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm();

  const toggleModal = () => {
    setIsOpen(!isOpen);
    reset(); // Reset form on close
  };

  const onSubmit = (data) => {
    console.log(data);
    createUser(data).then((response) => {
      toggleModal(); // Close modal on submit
      //TODO: check for error response and show it in modal.
      loadUsers();
    })
  };

  // Watch password and confirm password for matching validation
  const password = watch('password', '');

  const realmId = watch('realmId', '');

  useEffect(() => {
    if (realmId) {
      loadRoles(realmId);
    }
  }, [realmId]);

  useEffect(() => {
    loadRealms()
      .then(realms => loadRoles(realms.data[0].id));
  }, [])


  const usernameAvailable = useCallback(async (username) => {
    try {
      const { data: { available } } = await isUsernameAvailable(username);
      return available;
    } catch (error) {
      console.log(error);
      return false;
    }
  }, [isUsernameAvailable]);


  return (
    <>
      {/* Modal Component */}
      <Modal show={isOpen} size="lg" popup={true} onClose={toggleModal}>
        <Modal.Header />
        <Modal.Body>
          <h3 className="text-xl font-medium text-gray-900 mb-4">Create New User</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Username (Email) */}
            <div className="mb-4">
              <Label htmlFor="username" value="Username (Email)" />
              <TextInput
                id="username"
                type="text"
                placeholder="you@example.com"
                {...register('username', {
                  required: t('Username is required'),
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: t('Invalid email format'),
                  },
                  validate: AwesomeDebouncePromise(async (value) => {
                    return await usernameAvailable(value) || t("Username is already taken.");
                  }, 500),
                })}
                color={errors.username ? 'failure' : 'default'}
                helperText={errors.username && <span className="text-red-500">{errors.username.message}</span>}
              />
            </div>

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

            {/* Password */}
            <div className="mb-4">
              <Label htmlFor="password" value="Password" />
              <TextInput
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <Label htmlFor="confirmPassword" value="Confirm Password" />
              <TextInput
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Select Realm */}
            <div className="mb-4">
              <Label htmlFor="realmId" value="Select Realm" />
              <Select
                id="realmId"
                {...register('realmId', {
                  required: 'Please select a realm to create user in.'
                })}
              >
                {realmList && realmList.map(realm => (<option value={realm.id}>{realm.name}</option>))}
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
                  required: 'Please select a role.',
                  validate: () => !!realmId || 'Select a realm first'
                })}
              >
                {roles && roles.map(role => (<option value={role.id}>{role.displayName}</option>))}
              </Select>

              {errors.roles && (
                <p className="text-red-500 text-sm mt-1">{errors.roles.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit">Create User</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserCreationModal;
