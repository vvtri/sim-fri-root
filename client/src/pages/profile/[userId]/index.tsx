import { Stack } from '@mui/system';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { PostCard } from '../../../common/components/posts/PostCard';
import ProfileLayout from '../../../common/layouts/ProfileLayout';
import CreatePostDialog from '../../../post/create/components/CreatePostDialog';
import { UserProfileFriendCard } from '../../../profile/detail/components/UserProfileFriendCard';
import { UserProfileIntroCard } from '../../../profile/detail/components/UserProfileIntroCard';
import { UserProfilePhotoCard } from '../../../profile/detail/components/UserProfilePhotoCard';
import { UserProfilePostCreateSection } from '../../../profile/detail/components/UserProfilePostCreateSection';

export default function Profile() {
  const router = useRouter();

  return (
    <Stack direction="row" spacing="14px" mt="14px" paddingBottom="40px">
      <Stack direction="column" flexGrow="3" spacing="14px">
        <UserProfileIntroCard />
        <UserProfilePhotoCard />
        <UserProfileFriendCard />
      </Stack>
      <Stack flexGrow="7" spacing="18px">
        <CreatePostDialog />
        <UserProfilePostCreateSection />

        <PostCard />
        <PostCard />
      </Stack>
    </Stack>
  );
}

Profile.getLayout = (page: ReactElement) => {
  return <ProfileLayout>{page}</ProfileLayout>;
};
