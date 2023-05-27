import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  FormControl,
  IconButton,
  ImageList,
  ImageListItem,
  InputBase,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import { ChangeEventHandler, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AudienceType } from 'shared';
import { v4 as uuid } from 'uuid';
import { CustomDialog } from '../../../common/components/CustomDialog';
import FormProvider from '../../../common/components/hook-forms/FormProvider';
import { headerHeight } from '../../../common/constants/index.constant';
import { useAuth } from '../../../common/hooks/useAuth';
import { addSnackBar } from '../../../common/utils/snackbar.util';
import { uploadFile } from '../../../file/common/utils/upload-file.util';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import {
  createPostSelector,
  setCreatePost,
} from '../../../redux/slices/post.slice';
import { useCreatePost } from '../hooks/use-create-post.hook';
import {
  ICreatePostForm,
  createPostSchema,
} from '../schemas/create-post.schema';

export default function CreatePostDialog() {
  const dispatch = useAppDispatch();
  const createPostData = useAppSelector(createPostSelector);
  const { user, avatarUrl } = useAuth();
  const onCloseDialog = () =>
    dispatch(setCreatePost({ ...createPostData, isShow: false }));

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);

  const methods = useForm<ICreatePostForm>({
    defaultValues: {},
    resolver: yupResolver(createPostSchema),
  });
  const { register, control, formState, handleSubmit, reset, getValues } =
    methods;

  const { mutate, isLoading } = useCreatePost({
    onSuccess(data, variables, context) {
      addSnackBar({ variant: 'success', message: 'Post created' });
      reset();
      images.forEach((item) => URL.revokeObjectURL(item.url));
      setImages([]);
    },
    onError(error, variables, context) {
      addSnackBar({ variant: 'success', message: 'Create post failed' });
    },
  });

  const handleAddImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newFile = e.target.files?.[0];
    if (newFile) {
      const url = URL.createObjectURL(newFile);
      setImages((images) => [...images, { file: newFile, url }]);
    }
  };

  const handleRemoveImage = (idx: number) => {
    setImages((images) =>
      images.filter((_, index) => {
        const isRemoved = index === idx;
        if (isRemoved) URL.revokeObjectURL(_.url);

        return !isRemoved;
      }),
    );
  };

  const handleCreatePost: Parameters<typeof handleSubmit>[0] = async (
    value,
    e,
  ) => {
    const files = await Promise.all(
      images.map(async (item) => {
        return await uploadFile(getValues('audienceType'), item.file);
      }),
    );
    mutate({ ...value, fileIds: files.map((item) => item.id) });
  };

  return (
    <Box>
      <CustomDialog
        open={createPostData.isShow}
        onClose={onCloseDialog}
        title="Create Post"
        sx={{ marginTop: headerHeight }}
        PaperProps={{
          sx: {
            backgroundColor: 'darkAccent.main',
            color: 'white',
            width: '100%',
            maxWidth: '500px',
          },
        }}
      >
        <Box padding="20px">
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(handleCreatePost)}
          >
            <Stack direction="row" spacing="10px" alignItems="center">
              <Avatar src={avatarUrl} />
              <Stack>
                <Typography fontSize="0.9375rem" fontWeight="600">
                  {user?.name}
                </Typography>
                <Select
                  variant="standard"
                  defaultValue={AudienceType.PUBLIC}
                  sx={{
                    color: 'white',
                    fontSize: '0.85rem',
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    },
                  }}
                  {...register('audienceType')}
                >
                  <MenuItem value={AudienceType.PUBLIC}>Public</MenuItem>
                  <MenuItem value={AudienceType.FRIEND}>Friend</MenuItem>
                  <MenuItem value={AudienceType.ONLY_ME}>Only me</MenuItem>
                </Select>
              </Stack>
            </Stack>

            <Box mt="20px">
              <FormControl fullWidth>
                <InputBase
                  multiline
                  sx={{
                    outline: 'none',
                    bgcolor: 'unset',
                    color: 'inherit',
                  }}
                  fullWidth
                  {...register('content')}
                />
              </FormControl>
            </Box>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              borderRadius="6px"
              border="1px solid #3E4042"
              mt="20px"
              padding="14px"
            >
              <Typography sx={{ cursor: 'default' }}>
                Add to your post
              </Typography>
              <Box component="label">
                <IconButton
                  sx={{
                    width: '36px',
                    height: '36px',
                    '&:hover': { backgroundColor: 'hoverColor.main' },
                  }}
                  onClick={(e) => fileRef.current?.click()}
                >
                  <Image
                    width={24}
                    height={24}
                    src="/images/photo-icon.png"
                    alt=""
                  />
                  <input
                    ref={fileRef}
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleAddImage}
                  />
                </IconButton>
              </Box>
            </Stack>

            <ImageList cols={2} rowHeight={150}>
              {images.map((item, idx) => (
                <ImageListItem key={uuid()} sx={{ position: 'relative' }}>
                  <IconButton
                    color="primary"
                    sx={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      backgroundColor: 'darkAccent.main',
                      color: 'secondaryText.main',
                      padding: '4px',
                      '&:hover': { backgroundColor: 'darkAccent.main' },
                    }}
                    onClick={() => handleRemoveImage(idx)}
                  >
                    <CloseIcon />
                  </IconButton>
                  <img src={item.url} height="100%" />
                </ImageListItem>
              ))}
            </ImageList>

            <LoadingButton
              loading={isLoading}
              variant="contained"
              fullWidth
              type="submit"
              color={formState.isValid ? 'primary' : 'secondaryButton'}
              sx={{
                mt: '16px',
                cursor: formState.isValid ? 'pointer' : 'not-allowed',
              }}
            >
              Post
            </LoadingButton>
          </FormProvider>
        </Box>
      </CustomDialog>
    </Box>
  );
}
