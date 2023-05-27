import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { ChangeEventHandler } from 'react';
import { useForm } from 'react-hook-form';
import { AudienceType, UserProfileRelationshipStatus } from 'shared';
import { CustomDialog } from '../../../common/components/CustomDialog';
import FormProvider from '../../../common/components/hook-forms/FormProvider';
import RHFDateField from '../../../common/components/hook-forms/RHFDateField';
import { emptyAvatarUrl } from '../../../common/constants/index.constant';
import { addSnackBar } from '../../../common/utils/snackbar.util';
import { uploadFile } from '../../../file/common/utils/upload-file.util';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { authUserSelector, setAuth } from '../../../redux/slices/auth.slice';
import {
  editProfileSelector,
  setEditProfile,
  setEditProfileAvatar,
} from '../../../redux/slices/profile.slice';
import { IUserProfile } from '../../common/models/user-profile.model';
import { useUpdateProfile } from '../hooks/use-update-profile.hook';
import {
  IEditProfileForm,
  editProfileSchema,
} from '../schemas/edit-profile.schema';
import { getProfile } from '../services/profile-detail.service';

export const UserProfileEditDialog = () => {
  const dispatch = useAppDispatch();
  const { isShowModal, avatar } = useAppSelector(editProfileSelector);
  const user = useAppSelector(authUserSelector) as IUserProfile;
  const onCloseModal = () => dispatch(setEditProfile({ isShowModal: false }));

  const avatarUrl = avatar?.url || user.avatar?.url || emptyAvatarUrl;

  const defaultFormValues: IEditProfileForm = {
    ...user,
    birthDate: user.birthDate ? (dayjs(user.birthDate) as any) : undefined,
    avatarId: user.avatar?.id,
  };

  const methods = useForm<IEditProfileForm>({
    resolver: yupResolver(editProfileSchema),
    defaultValues: defaultFormValues,
  });
  const { register, control, formState, handleSubmit, reset, watch, setValue } =
    methods;
  const { errors } = formState;

  const { mutate, isLoading } = useUpdateProfile({
    async onSuccess(data, variables, context) {
      addSnackBar({ variant: 'success', message: 'Profile updated' });
      const profile = await getProfile();
      dispatch(setAuth({ isLoading: false, user: profile }));
      dispatch(setEditProfile({ avatar: { ...avatar, file: undefined } }));
    },
    onError(error, variables, context) {
      addSnackBar({ variant: 'error', message: 'Update profile failed' });
    },
  });

  const resetForm = () => {
    reset(defaultFormValues);
  };

  const handleUploadImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newImage = e.target.files?.[0];
    if (newImage) {
      dispatch(
        setEditProfileAvatar({
          url: URL.createObjectURL(newImage),
          file: newImage,
        }),
      );
    }
  };

  const handleUpdateProfile: Parameters<typeof handleSubmit>[0] = async (
    value,
    e,
  ) => {
    const newFile = avatar.file;
    if (newFile) {
      const file = await uploadFile(AudienceType.PUBLIC, newFile);
      value.avatarId = file.id;
    }

    mutate(value);
  };

  return (
    <Box>
      <CustomDialog
        open={isShowModal}
        onClose={onCloseModal}
        sx={{ mt: '65px' }}
        title="Edit profile"
        PaperProps={{
          sx: {
            backgroundColor: 'darkAccent.main',
            color: 'white',
            width: '100%',
            maxWidth: '700px',
          },
        }}
      >
        <FormProvider
          onSubmit={handleSubmit(handleUpdateProfile)}
          methods={methods}
        >
          <Stack paddingX="20px" my="20px" spacing="18px">
            <Stack>
              <Typography mb="6px">Name: </Typography>
              <FormControl>
                <TextField
                  variant="standard"
                  inputProps={{ style: { color: 'white' } }}
                  fullWidth
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message as any}
                  sx={{ ml: '8px' }}
                  {...register('name')}
                />
              </FormControl>
            </Stack>
            <Stack>
              <Typography mb="6px">Avatar: </Typography>
              <Box
                component="label"
                display="inline-block"
                sx={{ cursor: 'pointer' }}
                width="fit-content"
              >
                <Avatar
                  src={avatarUrl}
                  sx={{ width: '100px', height: '100px' }}
                ></Avatar>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleUploadImage}
                />
              </Box>
            </Stack>
            <Stack>
              <Typography mb="6px">Address: </Typography>
              <FormControl>
                <TextField
                  variant="standard"
                  inputProps={{ style: { color: 'white' } }}
                  fullWidth
                  error={Boolean(errors.address)}
                  helperText={errors.address?.message as any}
                  sx={{ ml: '8px' }}
                  {...register('address')}
                />
              </FormControl>
            </Stack>
            <Stack>
              <Typography mb="6px">Birth date: </Typography>
              <RHFDateField
                name="birthDate"
                textFieldProps={{ inputProps: { style: { color: 'white' } } }}
              />
            </Stack>
            <Stack>
              <Typography mb="6px">Workplace: </Typography>
              <FormControl>
                <TextField
                  variant="standard"
                  inputProps={{ style: { color: 'white' } }}
                  fullWidth
                  error={Boolean(errors.workplace)}
                  helperText={errors.workplace?.message as any}
                  sx={{ ml: '8px' }}
                  {...register('workplace')}
                />
              </FormControl>
            </Stack>
            <Stack>
              <Typography mb="6px">School: </Typography>
              <FormControl>
                <TextField
                  variant="standard"
                  inputProps={{ style: { color: 'white' } }}
                  fullWidth
                  error={Boolean(errors.school)}
                  helperText={errors.school?.message as any}
                  sx={{ ml: '8px' }}
                  {...register('school')}
                />
              </FormControl>
            </Stack>
            <Stack>
              <Typography mb="6px">Hometown: </Typography>
              <FormControl>
                <TextField
                  variant="standard"
                  inputProps={{ style: { color: 'white' } }}
                  fullWidth
                  error={Boolean(errors.hometown)}
                  helperText={errors.hometown?.message as any}
                  sx={{ ml: '8px' }}
                  {...register('hometown')}
                />
              </FormControl>
            </Stack>
            <Stack>
              <Typography mb="6px">Relationship status: </Typography>
              <FormControl>
                <Select
                  defaultValue={UserProfileRelationshipStatus.SINGLE}
                  sx={{
                    color: 'white',
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    },
                  }}
                  {...register('relationshipStatus')}
                >
                  <MenuItem value={UserProfileRelationshipStatus.SINGLE}>
                    Single
                  </MenuItem>
                  <MenuItem
                    value={UserProfileRelationshipStatus.IN_RELATIONSHIP}
                  >
                    In a Relationship
                  </MenuItem>
                  <MenuItem value={UserProfileRelationshipStatus.MARRIED}>
                    Married
                  </MenuItem>
                  <MenuItem value={UserProfileRelationshipStatus.SECRET}>
                    Secret
                  </MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing="12px"
              paddingTop="20px"
            >
              <Button
                color="secondaryButton"
                variant="contained"
                fullWidth
                sx={{ fontSize: '16px' }}
                type="button"
                onClick={resetForm}
              >
                Reset
              </Button>
              <LoadingButton
                color="primary"
                variant="contained"
                fullWidth
                sx={{ fontSize: '16px' }}
                type="submit"
                loading={isLoading}
              >
                Save
              </LoadingButton>
            </Stack>
          </Stack>
        </FormProvider>

        <DevTool
          control={control}
          styles={{ panel: { zIndex: 99999, marginTop: '65px' } }}
        />
      </CustomDialog>
    </Box>
  );
};
